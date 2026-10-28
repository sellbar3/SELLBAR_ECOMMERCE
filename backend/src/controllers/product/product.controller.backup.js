const mongoose = require("mongoose");
const { Readable } = require("node:stream");

const Product = require("../../models/Product");
const cloudinary = require("../../config/cloudinary");
const Category = require("../../models/Category");
const ALLOWED_STATUSES = ["draft", "active", "archived"];

function isValidObjectId(id) {
  return mongoose.isValidObjectId(id);
}

function parseNumber(value, fieldName) {
  const number = Number(value);

  if (value === "" || value === null || value === undefined ||
      !Number.isFinite(number)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  
  return number;
}

function parseArray(value, fieldName) {
  if (value === undefined) return undefined;

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) throw new Error();
    return parsed;
  } catch {
    throw new Error(`${fieldName} must be a JSON array`);
  }
}

function uploadBuffer(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Image upload failed"));
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          alt: "",
        });
      }
    );

    Readable.from(buffer).pipe(stream);
  });
}

async function uploadImages(files, vendorId) {
  const uploaded = [];

  try {
    for (const file of files || []) {
      const image = await uploadBuffer(
        file.buffer,
        `sellbar/products/${vendorId}`
      );

      uploaded.push(image);
    }

    return uploaded;
  } catch (error) {
    await Promise.allSettled(
      uploaded.map((image) =>
        cloudinary.uploader.destroy(image.publicId)
      )
    );

    throw error;
  }
}

async function deleteCloudinaryImages(images) {
  return Promise.allSettled(
    (images || [])
      .filter((image) => image.publicId)
      .map((image) =>
        cloudinary.uploader.destroy(image.publicId)
      )
  );
}

function handleError(res, error) {
  if (error.message && (
    error.message.includes("must be a valid number") ||
    error.message.includes("must be a JSON array")
  )) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "This SKU already exists for this vendor",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Product operation failed",
  });
}

// POST /api/products
exports.createProduct = async (req, res, next) => {
  let uploadedImages = [];

  try {
    const {
      name,
      description,
      category,
      brand,
      sku,
      price,
      compareAtPrice,
      stock,
      status,
      tags,
    } = req.body;

    if (
      !name?.trim() ||
      !description?.trim() ||
      !category?.trim() ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, description, category, price and stock are required",
      });
    }

    const productPrice = parseNumber(price, "price");
    const productStock = parseNumber(stock, "stock");

    if (productPrice < 0 || productStock < 0 ||
        !Number.isInteger(productStock)) {
      return res.status(400).json({
        success: false,
        message: "Price must be non-negative and stock a whole non-negative number",
      });
    }

    let comparePrice;

    if (compareAtPrice !== undefined && compareAtPrice !== "") {
      comparePrice = parseNumber(compareAtPrice, "compareAtPrice");

      if (comparePrice < 0) {
        return res.status(400).json({
          success: false,
          message: "compareAtPrice cannot be negative",
        });
      }
    }

    const productStatus = status || "draft";

    if (!ALLOWED_STATUSES.includes(productStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product status",
      });
    }

    const productTags = parseArray(tags, "tags") || [];

    if (productTags.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Maximum 20 tags are allowed",
      });
    }

    if (sku?.trim()) {
      const duplicate = await Product.findOne({
        vendor: req.vendor._id,
        sku: sku.trim().toUpperCase(),
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "SKU already exists for this vendor",
        });
      }
    }

    uploadedImages = await uploadImages(
      req.files,
      req.vendor._id.toString()
    );

    const product = await Product.create({
      vendor: req.vendor._id,
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      brand: brand?.trim() || "",
      ...(sku?.trim() ? { sku: sku.trim().toUpperCase() } : {}),
      price: productPrice,
      compareAtPrice: comparePrice ?? null,
      stock: productStock,
      images: uploadedImages,
      tags: productTags,
      status: productStatus,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: { product },
    });
  } catch (error) {
    await deleteCloudinaryImages(uploadedImages);
    if (error instanceof mongoose.Error) return handleError(res, error);
    if (error.message?.includes("must be")) return handleError(res, error);
    return next(error);
  }
};

// GET /api/products/my-products
exports.getMyProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const filter = { vendor: req.vendor._id };

    if (req.query.status) {
      if (!ALLOWED_STATUSES.includes(req.query.status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status filter",
        });
      }

      filter.status = req.query.status;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
exports.getMyProductById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/products/:id
exports.updateProduct = async (req, res, next) => {
  let newlyUploadedImages = [];

  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const allowedFields = [
      "name",
      "description",
      "category",
      "brand",
      "sku",
      "price",
      "compareAtPrice",
      "stock",
      "status",
      "tags",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    for (const field of ["name", "description", "category", "brand"]) {
      if (updates[field] !== undefined) {
        if (typeof updates[field] !== "string") {
          return res.status(400).json({
            success: false,
            message: `${field} must be text`,
          });
        }

        updates[field] = updates[field].trim();

        if (["name", "description", "category"].includes(field) &&
            !updates[field]) {
          return res.status(400).json({
            success: false,
            message: `${field} cannot be empty`,
          });
        }
      }
    }

    if (updates.price !== undefined) {
      updates.price = parseNumber(updates.price, "price");

      if (updates.price < 0) {
        return res.status(400).json({
          success: false,
          message: "Price cannot be negative",
        });
      }
    }

    if (updates.compareAtPrice !== undefined) {
      if (updates.compareAtPrice === "") {
        updates.compareAtPrice = null;
      } else {
        updates.compareAtPrice = parseNumber(
          updates.compareAtPrice,
          "compareAtPrice"
        );

        if (updates.compareAtPrice < 0) {
          return res.status(400).json({
            success: false,
            message: "compareAtPrice cannot be negative",
          });
        }
      }
    }

    if (updates.stock !== undefined) {
      updates.stock = parseNumber(updates.stock, "stock");

      if (updates.stock < 0 || !Number.isInteger(updates.stock)) {
        return res.status(400).json({
          success: false,
          message: "Stock must be a whole non-negative number",
        });
      }
    }

    if (updates.status !== undefined &&
        !ALLOWED_STATUSES.includes(updates.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product status",
      });
    }

    if (updates.sku !== undefined) {
      if (typeof updates.sku !== "string") {
        return res.status(400).json({
          success: false,
          message: "SKU must be text",
        });
      }

      updates.sku = updates.sku.trim().toUpperCase() || undefined;

      if (updates.sku) {
        const duplicate = await Product.findOne({
          _id: { $ne: product._id },
          vendor: req.vendor._id,
          sku: updates.sku,
        });

        if (duplicate) {
          return res.status(409).json({
            success: false,
            message: "SKU already exists for this vendor",
          });
        }
      }
    }

    if (updates.tags !== undefined) {
      updates.tags = parseArray(updates.tags, "tags");

      if (updates.tags.length > 20) {
        return res.status(400).json({
          success: false,
          message: "Maximum 20 tags are allowed",
        });
      }
    }

    // Upload new images, retaining existing ones by default.
    newlyUploadedImages = await uploadImages(
      req.files,
      req.vendor._id.toString()
    );

    let images = [...product.images, ...newlyUploadedImages];

    if (images.length > 10) {
      await deleteCloudinaryImages(newlyUploadedImages);
      return res.status(400).json({
        success: false,
        message: "A product can have at most 10 images",
      });
    }

    // Optional JSON array of Cloudinary public IDs to remove.
    let removedImages = [];

    if (req.body.removeImagePublicIds !== undefined) {
      const publicIds = parseArray(
        req.body.removeImagePublicIds,
        "removeImagePublicIds"
      );

      if (publicIds.some((id) => typeof id !== "string")) {
        return res.status(400).json({
          success: false,
          message: "Image public IDs must be strings",
        });
      }

      removedImages = product.images.filter((image) =>
        publicIds.includes(image.publicId)
      );

      images = images.filter(
        (image) => !publicIds.includes(image.publicId)
      );
    }

    if (images.length > 10) {
      await deleteCloudinaryImages(newlyUploadedImages);
      return res.status(400).json({
        success: false,
        message: "A product can have at most 10 images",
      });
    }

    Object.assign(product, updates);
    product.images = images;

    await product.save();

    // Delete removed Cloudinary assets only after database save succeeds.
    await deleteCloudinaryImages(removedImages);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: { product },
    });
  } catch (error) {
    await deleteCloudinaryImages(newlyUploadedImages);

    if (error instanceof mongoose.Error || error.code === 11000) {
      return handleError(res, error);
    }

    if (error.message?.includes("must be")) {
      return handleError(res, error);
    }

    return next(error);
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await deleteCloudinaryImages(product.images);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};