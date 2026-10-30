const mongoose = require("mongoose");
const crypto = require("node:crypto");

const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Vendor = require("../../models/Vendor");
const { isServiceablePincode } = require("../../utils/serviceability");

// POST /api/orders
// Supports Cash on Delivery (COD) and Razorpay online payment.
const placeOrder = async (req, res, next) => {
  let session;

  try {
    const customerId = req.user._id;

    const {
      shippingAddress,
      paymentMethod = "cod",
    } = req.body;

    // Validate payment method.
    if (!["cod", "online"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method. Use cod or online.",
      });
    }

    const requiredFields = [
      "fullName",
      "phone",
      "addressLine1",
      "city",
      "state",
      "postalCode",
    ];

    if (!shippingAddress || typeof shippingAddress !== "object") {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required.",
      });
    }

    for (const field of requiredFields) {
      if (
        typeof shippingAddress[field] !== "string" ||
        !shippingAddress[field].trim()
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} is required in shippingAddress.`,
        });
      }
    }

    const address = {
      fullName: shippingAddress.fullName.trim(),
      phone: shippingAddress.phone.trim(),
      addressLine1: shippingAddress.addressLine1.trim(),
      addressLine2: (
        typeof shippingAddress.addressLine2 === "string"
          ? shippingAddress.addressLine2
          : ""
      ).trim(),
      city: shippingAddress.city.trim(),
      state: shippingAddress.state.trim(),
      postalCode: shippingAddress.postalCode.trim(),
      country:
        typeof shippingAddress.country === "string" &&
        shippingAddress.country.trim()
          ? shippingAddress.country.trim()
          : "India",
    };

    const phoneDigits = address.phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    if (!/^[a-zA-Z0-9 -]{4,12}$/.test(address.postalCode)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid postal code.",
      });
    }

    const cleanPin = address.postalCode.replace(/\D/g, "");
    if (!isServiceablePincode(cleanPin)) {
      return res.status(400).json({
        success: false,
        message: `Delivery is currently available exclusively in West Champaran, Bihar. PIN code ${cleanPin || address.postalCode} is outside our serviceable area.`,
      });
    }

    session = await mongoose.startSession();

    let createdOrders = [];

    await session.withTransaction(async () => {
      const cart = await Cart.findOne({
        customer: customerId,
      }).session(session);

      if (!cart || !cart.items || cart.items.length === 0) {
        const error = new Error("Your cart is empty.");
        error.statusCode = 400;
        throw error;
      }

      const vendorGroups = new Map();

      // Read current database prices and group items by vendor.
      for (const cartItem of cart.items) {
        const productId = cartItem.product;
        const quantity = Number(cartItem.quantity);

        if (
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          !mongoose.isValidObjectId(productId)
        ) {
          const error = new Error("Cart contains an invalid item.");
          error.statusCode = 400;
          throw error;
        }

        const product = await Product.findOne({
          _id: productId,
          status: "active",
        }).session(session);

        if (!product) {
          const error = new Error(
            "A product in your cart is no longer available."
          );
          error.statusCode = 409;
          throw error;
        }

        const vendor = await Vendor.findOne({
          _id: product.vendor,
          approvalStatus: "approved",
          isStoreActive: true,
        }).session(session);

        if (!vendor) {
          const error = new Error(
            `The store for "${product.name}" is unavailable.`
          );
          error.statusCode = 409;
          throw error;
        }

        if (product.stock < quantity) {
          const error = new Error(
            `Insufficient stock for "${product.name}". Available: ${product.stock}.`
          );
          error.statusCode = 409;
          throw error;
        }

        const vendorKey = vendor._id.toString();

        if (!vendorGroups.has(vendorKey)) {
          vendorGroups.set(vendorKey, {
            vendor: vendor._id,
            items: [],
            subtotal: 0,
          });
        }

        const group = vendorGroups.get(vendorKey);
        const price = product.price;
        const lineTotal =
          Math.round(price * quantity * 100) / 100;

        group.items.push({
          product: product._id,
          productName: product.name,
          sku: product.sku || "",
          image: product.images?.[0]?.url || "",
          price,
          quantity,
          lineTotal,
        });

        group.subtotal =
          Math.round((group.subtotal + lineTotal) * 100) / 100;
      }

      const checkoutGroupId = crypto.randomUUID();
      const ordersToCreate = [];

      for (const group of vendorGroups.values()) {
        // Atomic stock decrement prevents overselling.
        for (const item of group.items) {
          const stockUpdate = await Product.updateOne(
            {
              _id: item.product,
              status: "active",
              stock: { $gte: item.quantity },
            },
            {
              $inc: { stock: -item.quantity },
            },
            { session }
          );

          if (stockUpdate.modifiedCount !== 1) {
            const error = new Error(
              `Stock changed while checking out "${item.productName}". Please try again.`
            );
            error.statusCode = 409;
            throw error;
          }
        }

        ordersToCreate.push({
          checkoutGroupId,
          customer: customerId,
          vendor: group.vendor,
          items: group.items,
          shippingAddress: address,
          subtotal: group.subtotal,
          shippingFee: 0,
          total: group.subtotal,

          // Respect the customer's selected payment method.
          paymentMethod,
          paymentStatus: "pending",
          orderStatus: "pending",
          razorpayOrderId: null,
          razorpayPaymentId: null,
        });
      }

      const orders = await Order.create(ordersToCreate, {
        session,
      });

      // Clear cart only when all orders are successfully created.
      cart.items = [];
      await cart.save({ session });

      createdOrders = orders.map((order) => ({
        _id: order._id,
        checkoutGroupId: order.checkoutGroupId,
        vendor: order.vendor,
        subtotal: order.subtotal,
        shippingFee: order.shippingFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        items: order.items,
        createdAt: order.createdAt,
      }));
    });

    const totalAmount =
      Math.round(
        createdOrders.reduce(
          (sum, order) => sum + order.total,
          0
        ) * 100
      ) / 100;

    return res.status(201).json({
      success: true,
      message:
        paymentMethod === "cod"
          ? "Order placed successfully with Cash on Delivery."
          : "Order created. Continue to online payment.",
      data: {
        orders: createdOrders,
        totalOrders: createdOrders.length,
        totalAmount,
        paymentMethod,
        checkoutGroupId: createdOrders[0]?.checkoutGroupId,
        nextStep:
          paymentMethod === "online"
            ? "Call POST /api/payments/create-order with checkoutGroupId."
            : null,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return next(error);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

// GET /api/orders
const getMyOrders = async (req, res, next) => {
  try {
    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      50,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const filter = {
      customer: req.user._id,
    };

    if (req.query.status) {
      const allowedStatuses = [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ];

      if (!allowedStatuses.includes(req.query.status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status filter.",
        });
      }

      filter.orderStatus = req.query.status;
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("vendor", "storeName")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Order.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/orders/:id
const getMyOrderById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user._id,
    })
      .populate("vendor", "storeName")
      .lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: { order },
    });
  } catch (error) {
    return next(error);
  }
};

// PATCH /api/orders/:id/cancel
const cancelMyOrder = async (req, res, next) => {
  let session;

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    session = await mongoose.startSession();

    let cancelledOrders = [];
    let cancelledGroup = false;

    await session.withTransaction(async () => {
      const existingOrder = await Order.findOne({
        _id: req.params.id,
        customer: req.user._id,
      }).session(session);

      if (!existingOrder) {
        const error = new Error("Order not found.");
        error.statusCode = 404;
        throw error;
      }

      // Paid online orders must use a refund process.
      if (existingOrder.paymentStatus === "paid") {
        const error = new Error(
          "This order has already been paid. Refund processing is required before cancellation."
        );
        error.statusCode = 409;
        throw error;
      }

      if (
        !["pending", "confirmed"].includes(
          existingOrder.orderStatus
        )
      ) {
        const error = new Error(
          "Only pending or confirmed orders can be cancelled."
        );
        error.statusCode = 409;
        throw error;
      }

      let ordersToCancel;

      if (existingOrder.paymentMethod === "online") {
        // Online orders from one checkout share a payment.
        // Cancel the entire group together before payment.
        ordersToCancel = await Order.find({
          customer: req.user._id,
          checkoutGroupId: existingOrder.checkoutGroupId,
        }).session(session);

        if (
          ordersToCancel.length === 0 ||
          ordersToCancel.some(
            (order) =>
              order.paymentMethod !== "online" ||
              order.paymentStatus !== "pending" ||
              !["pending", "confirmed"].includes(
                order.orderStatus
              )
          )
        ) {
          const error = new Error(
            "This online checkout cannot be cancelled safely. Please contact support."
          );
          error.statusCode = 409;
          throw error;
        }

        cancelledGroup = true;
      } else {
        ordersToCancel = [existingOrder];
      }

      for (const orderToCancel of ordersToCancel) {
        // Conditional update prevents cancelling an order that
        // became paid while cancellation was in progress.
        const cancelledOrder = await Order.findOneAndUpdate(
          {
            _id: orderToCancel._id,
            customer: req.user._id,
            paymentStatus: "pending",
            orderStatus: {
              $in: ["pending", "confirmed"],
            },
          },
          {
            $set: {
              orderStatus: "cancelled",
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );

        if (!cancelledOrder) {
          const error = new Error(
            "Order status changed. Refresh your orders and try again."
          );
          error.statusCode = 409;
          throw error;
        }

        // Restore stock within the same transaction.
        for (const item of cancelledOrder.items) {
          const stockResult = await Product.updateOne(
            { _id: item.product },
            { $inc: { stock: item.quantity } },
            { session }
          );

          if (
            stockResult.matchedCount === 1 &&
            stockResult.modifiedCount !== 1
          ) {
            throw new Error(
              `Could not restore stock for product ${item.product}.`
            );
          }
        }

        cancelledOrders.push({
          _id: cancelledOrder._id,
          orderStatus: cancelledOrder.orderStatus,
          paymentMethod: cancelledOrder.paymentMethod,
          paymentStatus: cancelledOrder.paymentStatus,
          updatedAt: cancelledOrder.updatedAt,
        });
      }
    });

    return res.status(200).json({
      success: true,
      message: cancelledGroup
        ? "Online checkout cancelled. Stock has been restored where products still exist."
        : "Order cancelled successfully. Stock has been restored where products still exist.",
      data: {
        orders: cancelledOrders,
        totalCancelled: cancelledOrders.length,
      },
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return next(error);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getMyOrderById,
  cancelMyOrder,
};