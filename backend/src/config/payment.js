const Razorpay = require("razorpay");

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    const error = new Error(
      "Razorpay credentials are not configured"
    );

    error.statusCode = 503;
    throw error;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
}

module.exports = { getRazorpay };