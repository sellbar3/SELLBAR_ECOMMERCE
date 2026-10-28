const mongoose = require("mongoose");
const Order = require("../../models/Order");

const ALLOWED_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_FLOW = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

// GET /api/vendor/orders
exports.getVendorOrders = async (req, res, next) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
    );

    const filter = { vendor: req.vendor._id };

    if (req.query.status) {
      if (!ALLOWED_STATUSES.includes(req.query.status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status.",
        });
      }

      filter.orderStatus = req.query.status;
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("customer", "name email")
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
    next(error);
  }
};

// GET /api/vendor/orders/:id
exports.getVendorOrderById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    })
      .populate("customer", "name email")
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
    next(error);
  }
};

// PATCH /api/vendor/orders/:id/status
exports.updateVendorOrderStatus = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID.",
      });
    }

    const { orderStatus } = req.body;

    if (
      typeof orderStatus !== "string" ||
      !ALLOWED_STATUSES.includes(orderStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid orderStatus.",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const nextStatuses = STATUS_FLOW[order.orderStatus] || [];

    if (!nextStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${order.orderStatus} to ${orderStatus}.`,
        allowedNextStatuses: nextStatuses,
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      data: {
        order: {
          _id: order._id,
          orderStatus: order.orderStatus,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          updatedAt: order.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};