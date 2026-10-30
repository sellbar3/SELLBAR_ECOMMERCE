const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    brand: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    sku: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 100,
      default: undefined,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    compareAtPrice: {
      type: Number,
      min: 0,
      default: null,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Stock must be a whole number",
      },
    },

    images: {
      type: [productImageSchema],
      default: [],
      validate: {
        validator: (images) => images.length <= 10,
        message: "A product can have at most 10 images",
      },
    },

    tags: {
      type: [
        {
          type: String,
          trim: true,
          lowercase: true,
          maxlength: 50,
        },
      ],
      default: [],
    },

    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    featuredType: {
      type: String,
      enum: ["hot-deal", "featured", "trending", "best-seller", "new-arrival", "regular"],
      default: "regular",
      index: true,
    },

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    badge: {
      type: String,
      trim: true,
      default: "",
    },

    condition: {
      type: String,
      trim: true,
      default: "Flawless",
    },

    specs: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],

    modelNumber: {
      type: String,
      trim: true,
      default: "",
    },

    warranty: {
      type: String,
      trim: true,
      default: "12 Months Doorstep Replacement Warranty",
    },

    whatInTheBox: {
      type: [String],
      default: [],
    },

    variants: [
      {
        name: { type: String, trim: true },
        sku: { type: String, trim: true },
        price: { type: Number, required: true },
        compareAtPrice: { type: Number },
        stock: { type: Number, default: 5 },
        attributes: { type: mongoose.Schema.Types.Mixed, default: {} },
        image: { type: String, trim: true },
      },
    ],

    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    customerReviews: [
      {
        reviewerName: { type: String, required: true },
        rating: { type: Number, default: 5 },
        title: { type: String, default: "" },
        comment: { type: String, default: "" },
        date: { type: String, default: "" },
        verifiedBuyer: { type: Boolean, default: true },
        photos: [{ type: String }],
      },
    ],

    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// SKU same vendor ke andar unique hona chahiye, alag vendors same SKU use kar sakte hain.
productSchema.index(
  { vendor: 1, sku: 1 },
  {
    unique: true,
    partialFilterExpression: { sku: { $type: "string" } },
  }
);

productSchema.index({
  vendor: 1,
  status: 1,
  createdAt: -1,
});

productSchema.index({
  category: 1,
  status: 1,
  createdAt: -1,
});

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);
