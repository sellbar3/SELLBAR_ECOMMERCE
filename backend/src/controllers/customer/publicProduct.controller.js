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
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, Number.parseInt(req.query.limit, 10) || DEFAULT_PAGE_SIZE)
    );

    const vendorIds = await getApprovedVendorIds();
    const filter = {
      status: "active",
      vendor: { $in: vendorIds },
    };

    // Filter by category (Accepts ObjectId OR category slug / name)
    if (req.query.category !== undefined && req.query.category.trim()) {
      const catInput = String(req.query.category).trim();

      if (mongoose.isValidObjectId(catInput)) {
        filter.category = new mongoose.Types.ObjectId(catInput);
      } else {
        // Query by slug or case-insensitive name
        const matchedCategory = await Category.findOne({
          $or: [
            { slug: catInput.toLowerCase() },
            { name: { $regex: new RegExp(`^${escapeRegex(catInput)}$`, "i") } }
          ],
          isActive: true,
        }).lean();

        if (matchedCategory) {
          filter.category = matchedCategory._id;
        } else {
          // If no category matched by exact slug, return empty list cleanly
          return res.status(200).json({
            success: true,
            data: {
              products: [],
              pagination: { total: 0, page, limit, pages: 0 },
            },
          });
        }
      }
    }

    // Filter by Brand
    if (req.query.brand !== undefined && req.query.brand.trim()) {
      const brandVal = String(req.query.brand).trim();
      filter.brand = { $regex: new RegExp(escapeRegex(brandVal), "i") };
    }

    // Filter by isFeatured
    if (req.query.isFeatured !== undefined) {
      filter.isFeatured = req.query.isFeatured === "true" || req.query.isFeatured === "1";
    }

    // Filter by featuredType (hot-deal, featured, trending, best-seller, etc.)
    if (req.query.featuredType !== undefined && req.query.featuredType.trim()) {
      filter.featuredType = String(req.query.featuredType).trim();
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
    if (req.query.minPrice !== undefined || req.query.maxPrice !== undefined) {
      const price = {};

      if (req.query.minPrice !== undefined) {
        const min = parsePrice(String(req.query.minPrice));
        if (min !== null) price.$gte = min;
      }

      if (req.query.maxPrice !== undefined) {
        const max = parsePrice(String(req.query.maxPrice));
        if (max !== null) price.$lte = max;
      }

      if (price.$gte !== undefined || price.$lte !== undefined) {
        filter.price = price;
      }
    }

    // Sorting
    let sortObj = { createdAt: -1, _id: -1 };
    const sortParam = req.query.sort;
    if (sortParam === "price-asc") {
      sortObj = { price: 1, _id: -1 };
    } else if (sortParam === "price-desc") {
      sortObj = { price: -1, _id: -1 };
    } else if (sortParam === "rating") {
      sortObj = { rating: -1, _id: -1 };
    } else if (sortParam === "popular") {
      sortObj = { reviewsCount: -1, rating: -1 };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .select(
          "name slug description category brand price compareAtPrice stock images tags vendor rating reviewsCount badge condition featuredType specs isFeatured createdAt"
        )
        .populate("category", "name slug")
        .populate("vendor", "storeName")
        .sort(sortObj)
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

// GET /api/public/products/:id (Accepts ID or slug)
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vendorIds = await getApprovedVendorIds();

    let query = {
      status: "active",
      vendor: { $in: vendorIds },
    };

    if (mongoose.isValidObjectId(id)) {
      query._id = id;
    } else {
      query.$or = [
        { slug: id.toLowerCase() },
        { sku: id.toUpperCase() },
        { name: { $regex: new RegExp(`^${escapeRegex(id.replace(/-/g, " "))}$`, "i") } }
      ];
    }

    const product = await Product.findOne(query)
      .select(
        "name slug description category brand sku modelNumber price compareAtPrice stock images tags vendor rating reviewsCount badge condition featuredType specs specifications warranty whatInTheBox variants customerReviews faqs isFeatured createdAt"
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

    // Fetch related products (same category or brand, excluding current product)
    const relatedProducts = await Product.find({
      status: "active",
      vendor: { $in: vendorIds },
      _id: { $ne: product._id },
      $or: [
        { category: product.category?._id },
        { brand: product.brand }
      ]
    })
      .select("name slug brand price compareAtPrice images rating reviewsCount badge condition stock category")
      .limit(4)
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        product,
        relatedProducts
      },
    });
  } catch (error) {
    return next(error);
  }
};

// GET /api/public/products/featured
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const vendorIds = await getApprovedVendorIds();
    const limit = Math.min(50, Number.parseInt(req.query.limit, 10) || 12);
    const filter = {
      status: "active",
      vendor: { $in: vendorIds },
    };

    if (req.query.type) {
      filter.featuredType = req.query.type;
    } else {
      filter.$or = [{ isFeatured: true }, { featuredType: { $ne: "regular" } }];
    }

    const products = await Product.find(filter)
      .select(
        "name slug description category brand price compareAtPrice stock images tags vendor rating reviewsCount badge condition featuredType isFeatured createdAt"
      )
      .populate("category", "name slug")
      .populate("vendor", "storeName")
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit)
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
      isActive: true,
    })
      .select("name slug image description parent sortOrder")
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    // Attach product count to each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({
          category: cat._id,
          status: "active",
          vendor: { $in: vendorIds },
        });
        return {
          ...cat,
          productCount: count,
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: { categories: categoriesWithCount },
    });
  } catch (error) {
    return next(error);
  }
};
