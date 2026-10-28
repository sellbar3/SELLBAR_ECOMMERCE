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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// SKU same vendor ke andar unique hona chahiye, alag vendors same SKU use kar sakte hain.
// SKU optional hai, isliye sirf string SKU wale products par unique rule lagta hai.
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

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);