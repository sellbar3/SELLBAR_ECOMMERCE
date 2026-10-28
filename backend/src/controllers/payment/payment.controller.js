const crypto = require("node:crypto");
const Razorpay = require("razorpay");
const Order = require("../../models/Order");

let razorpayClient = null;

// Create the Razorpay client lazily so a missing key gives a clear error.
function getRazorpay() {
  const keyId = (process.env.RAZORPAY_KEY_ID || "").trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

  if (!keyId || !keySecret) {
    const error = new Error(
      "Razorpay keys are not configured on the server (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET)."
    );
    error.statusCode = 500;
    throw error;
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }

  return razorpayClient;
}

// Razorpay SDK throws plain objects like { statusCode, error: { description } }.
// Show them as 502 so they are never confused with a customer-login 401.
function handleError(error, res, next) {
  if (error && typeof error === "object" && error.error?.description) {
    console.error("RAZORPAY ERROR:", error.error);

    const authFailed = error.statusCode === 401;

    return res.status(502).json({
      success: false,
      message: authFailed
        ? "Razorpay authentication failed. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the server."
        : `Razorpay: ${error.error.description}`,
    });
  }

  return next(error);
}

// POST /api/payments/create-order
exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const razorpay = getRazorpay();
    const { checkoutGroupId } = req.body;

    if (typeof checkoutGroupId !== "string" || !checkoutGroupId.trim()) {
      return res.status(400).json({
        success: false,
        message: "checkoutGroupId is required.",
      });
    }

    const orders = await Order.find({
      checkoutGroupId,
      customer: req.user._id,
    });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Checkout orders not found.",
      });
    }

    if (orders.some((order) => order.orderStatus === "cancelled")) {
      return res.status(409).json({
        success: false,
        message: "Cancelled orders cannot be paid.",
      });
    }

    if (orders.some((order) => order.paymentMethod !== "online")) {
      return res.status(400).json({
        success: false,
        message: "These orders were not created for online payment.",
      });
    }

    if (orders.some((order) => order.paymentStatus !== "pending")) {
      return res.status(409).json({
        success: false,
        message: "These orders are not awaiting payment.",
      });
    }

    const existingIds = [
      ...new Set(orders.map((order) => order.razorpayOrderId).filter(Boolean)),
    ];

    if (existingIds.length > 1) {
      return res.status(409).json({
        success: false,
        message: "Inconsistent payment order state. Contact support.",
      });
    }

    const amountPaise = Math.round(
      orders.reduce((sum, order) => sum + order.total, 0) * 100
    );

    if (!Number.isSafeInteger(amountPaise) || amountPaise <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid checkout amount.",
      });
    }

    let razorpayOrder;

    if (existingIds.length === 1) {
      // Reuse the existing Razorpay order on retry.
      razorpayOrder = await razorpay.orders.fetch(existingIds[0]);

      if (
        razorpayOrder.amount !== amountPaise ||
        razorpayOrder.currency !== "INR"
      ) {
        return res.status(409).json({
          success: false,
          message: "Payment amount mismatch. Contact support.",
        });
      }
    } else {
      razorpayOrder = await razorpay.orders.create({
        amount: amountPaise,
        currency: "INR",
        receipt: `sb_${crypto.randomUUID().replace(/-/g, "").slice(0, 32)}`,
        notes: {
          checkoutGroupId,
          customerId: String(req.user._id),
        },
      });

      // Store the same Razorpay order ID on every vendor order of this checkout.
      await Order.updateMany(
        {
          checkoutGroupId,
          customer: req.user._id,
          paymentMethod: "online",
          paymentStatus: "pending",
          orderStatus: { $ne: "cancelled" },
          razorpayOrderId: null,
        },
        { $set: { razorpayOrderId: razorpayOrder.id } }
      );

      const savedCount = await Order.countDocuments({
        checkoutGroupId,
        customer: req.user._id,
        razorpayOrderId: razorpayOrder.id,
      });

      if (savedCount !== orders.length) {
        return res.status(409).json({
          success: false,
          message: "Could not save payment details consistently. Please retry.",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Razorpay order created successfully.",
      data: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID.trim(),
      },
    });
  } catch (error) {
    return handleError(error, res, next);
  }
};

// POST /api/payments/verify
exports.verifyPayment = async (req, res, next) => {
  try {
    const razorpay = getRazorpay();

    const {
      checkoutGroupId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      typeof checkoutGroupId !== "string" ||
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Required payment verification fields are missing.",
      });
    }

    const orders = await Order.find({
      checkoutGroupId,
      customer: req.user._id,
    });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Checkout orders not found.",
      });
    }

    if (
      orders.some(
        (order) =>
          order.paymentMethod !== "online" ||
          order.razorpayOrderId !== razorpay_order_id
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment order does not match this checkout.",
      });
    }

    // Idempotent retry: the same payment must not be processed twice.
    if (orders.every((order) => order.paymentStatus === "paid")) {
      if (orders.every((order) => order.razorpayPaymentId === razorpay_payment_id)) {
        return res.status(200).json({
          success: true,
          message: "Payment was already verified.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "These orders have already been paid.",
      });
    }

    if (
      orders.some(
        (order) =>
          order.paymentStatus !== "pending" || order.orderStatus === "cancelled"
      )
    ) {
      return res.status(409).json({
        success: false,
        message: "These orders are not eligible for payment verification.",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET.trim())
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const supplied = Buffer.from(razorpay_signature, "hex");
    const expected = Buffer.from(expectedSignature, "hex");

    if (
      supplied.length !== expected.length ||
      !crypto.timingSafeEqual(supplied, expected)
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed.",
      });
    }

    // Confirm with Razorpay itself; do not trust the browser alone.
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const expectedAmount = Math.round(
      orders.reduce((sum, order) => sum + order.total, 0) * 100
    );

    if (
      payment.order_id !== razorpay_order_id ||
      payment.amount !== expectedAmount ||
      payment.currency !== "INR" ||
      payment.status !== "captured"
    ) {
      return res.status(409).json({
        success: false,
        message: "Payment is not captured or its details do not match.",
      });
    }

    const updateResult = await Order.updateMany(
      {
        checkoutGroupId,
        customer: req.user._id,
        paymentMethod: "online",
        paymentStatus: "pending",
        orderStatus: { $ne: "cancelled" },
        razorpayOrderId: razorpay_order_id,
      },
      {
        $set: {
          paymentStatus: "paid",
          razorpayPaymentId: razorpay_payment_id,
        },
      }
    );

    if (updateResult.modifiedCount !== orders.length) {
      return res.status(409).json({
        success: false,
        message: "Order payment state changed. Please check your orders.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      data: {
        checkoutGroupId,
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    return handleError(error, res, next);
  }
};