import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    brand: {
      type: String,
      default: "",
    },
    sku: {
      type: String,
      default: undefined,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      default: 10,
    },
    images: {
      type: [productImageSchema],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "active",
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    featuredType: {
      type: String,
      default: "regular",
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 15,
    },
    badge: {
      type: String,
      default: "",
    },
    condition: {
      type: String,
      default: "Flawless",
    },
    warranty: {
      type: String,
      default: "12 Months Warranty",
    },
    specs: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
