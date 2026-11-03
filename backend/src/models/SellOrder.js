const mongoose = require("mongoose");

const SellOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true, index: true },
      email: { type: String, default: "" },
    },
    device: {
      brand: { type: String, required: true },
      model: { type: String, required: true },
      slug: { type: String, required: true },
      image: { type: String, default: "" },
      variant: {
        ram: { type: String, default: "" },
        storage: { type: String, default: "" },
        color: { type: String, default: "" },
      },
      baseResalePrice: { type: Number, default: 0 },
    },
    conditionAssessment: {
      functional: { type: String, default: "flawless" },
      screen: { type: String, default: "flawless" },
      body: { type: String, default: "flawless" },
      battery: { type: String, default: "healthy" },
      accessories: [{ type: String }],
      priceBreakdown: { type: mongoose.Schema.Types.Mixed },
    },
    estimatedPrice: {
      type: Number,
      required: true,
    },
    finalOffer: {
      type: Number,
      default: function () {
        return this.estimatedPrice;
      },
    },
    pickupDetails: {
      address: { type: String, required: true },
      landmark: { type: String, default: "" },
      city: { type: String, default: "Bettiah" },
      pincode: { type: String, required: true },
      pickupDate: { type: String, required: true },
      timeSlot: { type: String, required: true },
    },
    payout: {
      method: { type: String, enum: ["upi", "bank"], default: "upi" },
      upiId: { type: String, default: "" },
      bankAccount: { type: String, default: "" },
      ifsc: { type: String, default: "" },
      accountHolder: { type: String, default: "" },
      paymentStatus: {
        type: String,
        enum: ["pending", "processing", "completed", "failed"],
        default: "pending",
      },
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "OTP Verified",
        "Pickup Scheduled",
        "Picked Up",
        "Under Inspection",
        "Price Revised",
        "Customer Approved",
        "Payment Processing",
        "Completed",
        "Cancelled",
      ],
      default: "Pickup Scheduled",
      index: true,
    },
    statusHistory: [
      {
        status: { type: String },
        timestamp: { type: Date, default: Date.now },
        note: { type: String, default: "" },
        updatedBy: { type: String, default: "System" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.SellOrder ||
  mongoose.model("SellOrder", SellOrderSchema);
