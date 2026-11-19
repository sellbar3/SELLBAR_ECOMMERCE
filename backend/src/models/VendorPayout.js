const mongoose = require("mongoose");

const vendorPayoutSchema = new mongoose.Schema(
  {
    payoutId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    orderCount: {
      type: Number,
      default: 0,
    },
    grossSales: {
      type: Number,
      required: true,
      min: 0,
    },
    commissionDeducted: {
      type: Number,
      required: true,
      min: 0,
    },
    netPayoutAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    settlementCycle: {
      type: String,
      required: true, // e.g. "Weekly Cycle Nov W2 (Nov 08 - Nov 14, 2026)"
    },
    paymentMode: {
      type: String,
      enum: ["NEFT", "RTGS", "IMPS", "UPI", "Bank Transfer"],
      default: "IMPS",
    },
    utrNumber: {
      type: String,
      default: "", // Bank UTR Reference number
      trim: true,
    },
    bankSnapshot: {
      accountHolder: { type: String, default: "" },
      accountNumber: { type: String, default: "" },
      ifscCode: { type: String, default: "" },
      bankName: { type: String, default: "" },
      upiId: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "settled", "failed", "on_hold"],
      default: "settled",
      index: true,
    },
    notes: {
      type: String,
      default: "Automated weekly settlement transfer executed",
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    settledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

vendorPayoutSchema.index({ vendor: 1, createdAt: -1 });

module.exports =
  mongoose.models.VendorPayout ||
  mongoose.model("VendorPayout", vendorPayoutSchema);
