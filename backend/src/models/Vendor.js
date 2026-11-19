const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },

    storeDescription: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: ""
    },

    logo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" }
    },

    phone: {
      type: String,
      trim: true,
      default: ""
    },

    address: {
      type: String,
      trim: true,
      default: ""
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    isStoreActive: {
      type: Boolean,
      default: true
    },

    // Automated Commission & Settlement Configuration
    commissionRate: {
      type: Number,
      default: 10, // Default 10% platform commission (configurable per vendor)
      min: 0,
      max: 100,
    },

    bankDetails: {
      accountHolder: { type: String, trim: true, default: "" },
      accountNumber: { type: String, trim: true, default: "" },
      ifscCode: { type: String, trim: true, uppercase: true, default: "" },
      bankName: { type: String, trim: true, default: "" },
      branchName: { type: String, trim: true, default: "" },
      upiId: { type: String, trim: true, default: "" },
      panNumber: { type: String, trim: true, uppercase: true, default: "" },
      isVerified: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports =
  mongoose.models.Vendor ||
  mongoose.model("Vendor", vendorSchema);