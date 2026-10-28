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