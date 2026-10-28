
const mongoose = require("mongoose");
const Product = require("../../models/Product");
const Vendor = require("../../models/Vendor");
const Category = require("../../models/Category");

const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 100;
const MAX_SEARCH_LENGTH = 100;

async function getApprovedVendorIds() {
  return Vendor.find({
    approvalStatus: "approved",
    isStoreActive: true,
  }).distinct("_id");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parsePrice(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const price = Number(value);

  if (!Number.isFinite(price) || price < 0) {
    return null;
  }

  return price;
}

// GET /api/public/products
exports.getProducts = async (req, res, next) => {
  try {
    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      MAX_PAGE_SIZE,
      Math.max(
        1,
        Number.parseInt(req.query.limit, 10) || DEFAULT_PAGE_SIZE
      )
    );

    const filter = {
      status: "active",
      vendor: { $in: await getApprovedVendorIds() },
    };

    // Filter by category ObjectId
    if (req.query.category !== undefined) {
      const categoryId = String(req.query.category).trim();

      if (!mongoose.isValidObjectId(categoryId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      const categoryExists = await Category.exists({
        _id: categoryId,
        isActive: true,
      });

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid or inactive category",
        });
      }

      filter.category = new mongoose.Types.ObjectId(categoryId);
    }

    // Search products
    if (req.query.search !== undefined) {
      const search = String(req.query.search)
        .trim()
        .slice(0, MAX_SEARCH_LENGTH);

      if (search) {
        const escaped = escapeRegex(search);

        filter.$or = [
          { name: { $regex: escaped, $options: "i" } },
          { description: { $regex: escaped, $options: "i" } },
          { brand: { $regex: escaped, $options: "i" } },
          { tags: { $regex: escaped, $options: "i" } },
        ];
      }
    }

    // Filter by price range
    if (
      req.query.minPrice !== undefined ||
      req.query.maxPrice !== undefined
    ) {
      const price = {};

      if (req.query.minPrice !== undefined) {
        const min = parsePrice(String(req.query.minPrice));

        if (min === null) {
          return res.status(400).json({
            success: false,
            message: "Invalid minPrice",
          });
        }

        price.$gte = min;
      }

      if (req.query.maxPrice !== undefined) {
        const max = parsePrice(String(req.query.maxPrice));

        if (max === null) {
          return res.status(400).json({
            success: false,
            message: "Invalid maxPrice",
          });
        }

        price.$lte = max;
      }

      if (
        price.$gte !== undefined &&
        price.$lte !== undefined &&
        price.$gte > price.$lte
      ) {
        return res.status(400).json({
          success: false,
          message: "minPrice cannot exceed maxPrice",
        });
      }

      filter.price = price;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .select(
          "name description category brand price compareAtPrice stock images tags vendor createdAt"
        )
        .populate("category", "name slug")
        .populate("vendor", "storeName")
        .sort({ createdAt: -1, _id: -1 })
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
    return next(error);
  }
};

// GET /api/public/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const vendorIds = await getApprovedVendorIds();

    const product = await Product.findOne({
      _id: id,
      status: "active",
      vendor: { $in: vendorIds },
    })
      .select(
        "name description category brand price compareAtPrice stock images tags vendor createdAt"
      )
      .populate("category", "name slug")
      .populate("vendor", "storeName")
      .lean();

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
    return next(error);
  }
};

// GET /api/public/products/featured
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const vendorIds = await getApprovedVendorIds();

    const products = await Product.find({
      status: "active",
      isFeatured: true,
      vendor: { $in: vendorIds },
    })
      .select(
        "name description category brand price compareAtPrice stock images tags vendor createdAt"
      )
      .populate("category", "name slug")
      .populate("vendor", "storeName")
      .sort({ createdAt: -1, _id: -1 })
      .limit(12)
      .lean();

    return res.status(200).json({
      success: true,
      data: { products },
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/public/categories
exports.getCategories = async (req, res, next) => {
  try {
    const vendorIds = await getApprovedVendorIds();

    const productCategories = await Product.distinct("category", {
      status: "active",
      vendor: { $in: vendorIds },
    });

    const categories = await Category.find({
      _id: { $in: productCategories },
      isActive: true,
    })
      .select("name slug")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    return next(error);
  }
};
