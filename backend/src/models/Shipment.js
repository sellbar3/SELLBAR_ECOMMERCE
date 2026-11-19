const mongoose = require("mongoose");

const shipmentEventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    remarks: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const shipmentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      index: true,
    },
    courierPartner: {
      type: String,
      default: "Delhivery Surface",
    },
    courierCode: {
      type: String,
      default: "delhivery", // shiprocket, delhivery, local_fleet
    },
    awbNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    shippingLabelUrl: {
      type: String,
      default: "",
    },
    trackingUrl: {
      type: String,
      default: "",
    },
    routingCode: {
      type: String,
      default: "DEL-PAT-BET-845438",
    },
    packageDimensions: {
      weight: { type: Number, default: 0.5 }, // kg
      length: { type: Number, default: 20 }, // cm
      breadth: { type: Number, default: 15 }, // cm
      height: { type: Number, default: 10 }, // cm
    },
    pickupAddress: {
      hubName: { type: String, default: "Sellbar Central Depot" },
      city: { type: String, default: "Bettiah" },
      state: { type: String, default: "Bihar" },
      pincode: { type: String, default: "845438" },
      phone: { type: String, default: "+91 98765 43210" },
    },
    deliveryAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    isCod: {
      type: Boolean,
      default: true,
    },
    codAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "manifest_pending",
        "awb_assigned",
        "picked_up",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "rto",
        "cancelled",
      ],
      default: "awb_assigned",
      index: true,
    },
    events: [shipmentEventSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

shipmentSchema.index({ order: 1, createdAt: -1 });

module.exports =
  mongoose.models.Shipment ||
  mongoose.model("Shipment", shipmentSchema);
