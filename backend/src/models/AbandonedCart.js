const mongoose = require("mongoose");

const abandonedCartSchema = new mongoose.Schema(
  {
    cartId: { type: String, index: true },
    customerName: { type: String, default: "Valued Customer" },
    email: { type: String, default: "" },
    phone: { type: String, default: "", index: true },
    items: [
      {
        product: { type: String },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        color: { type: String, default: "" },
        storage: { type: String, default: "" },
        conditionGrade: { type: String, default: "" },
        image: { type: String, default: "" },
        category: { type: String, default: "" },
      },
    ],
    subtotal: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    shippingAddress: {
      addressLine1: String,
      city: String,
      state: String,
      postalCode: String,
    },
    status: {
      type: String,
      enum: ["active", "abandoned", "recovered", "expired"],
      default: "active",
      index: true,
    },
    recoveryDiscountCode: { type: String, default: "RECOVER5" },
    recoverySentAt: { type: Date },
    recoveryCount: { type: Number, default: 0 },
    lastActivity: { type: Date, default: Date.now, index: true },
    recoveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.AbandonedCart ||
  mongoose.model("AbandonedCart", abandonedCartSchema);
