const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
exports.getDashboard = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalAdmins,
      totalCustomers,
      totalVendors,
      activeUsers,
      blockedUsers
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "vendor" }),
      User.countDocuments({ status: "active" }),
      User.countDocuments({ status: "blocked" })
    ]);

    return res.status(200).json({
      success: true,
      message: "Admin dashboard fetched successfully",
      data: {
        users: {
          total: totalUsers,
          admins: totalAdmins,
          customers: totalCustomers,
          vendors: totalVendors,
          active: activeUsers,
          blocked: blockedUsers
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 20)
    );

    const filter = {};

    if (["admin", "customer", "vendor"].includes(req.query.role)) {
      filter.role = req.query.role;
    }

    if (
      ["active", "inactive", "blocked"].includes(req.query.status)
    ) {
      filter.status = req.query.status;
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      User.countDocuments(filter)
    ]);

    return res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin accounts cannot be modified using this endpoint"
      });
    }

    user.status = status;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    next(error);
  }
};



// Add this function without removing existing exports
exports.updateVendorApproval = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approvalStatus } = req.body;

    // Validate MongoDB ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vendor ID",
      });
    }

    // Only approved or rejected status can be set by admin
    if (!["approved", "rejected"].includes(approvalStatus)) {
      return res.status(400).json({
        success: false,
        message: "approvalStatus must be approved or rejected",
      });
    }

    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor profile not found",
      });
    }

    vendor.approvalStatus = approvalStatus;
    await vendor.save();

    return res.status(200).json({
      success: true,
      message: `Vendor ${approvalStatus} successfully`,
      data: {
        vendor: {
          id: vendor._id,
          user: vendor.user,
          storeName: vendor.storeName,
          approvalStatus: vendor.approvalStatus,
          isStoreActive: vendor.isStoreActive,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin Product Management
exports.getProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit, 10) || 100));
    const search = req.query.search ? String(req.query.search).trim() : "";

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } }
      ];
    }
    if (req.query.status && req.query.status !== "all") {
      filter.status = req.query.status;
    }
    if (req.query.category && req.query.category !== "all") {
      filter.category = req.query.category;
    }

    const [products, total, categories] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
      Category.find({ isActive: true }).select("_id name slug").lean()
    ]);

    return res.status(200).json({
      success: true,
      data: {
        products,
        categories,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit) || 1
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, compareAtPrice, stock, category, brand, description, status, badge, condition, warranty, isFeatured, featuredType, images, imageUrl } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ success: false, message: "Name and price are required" });
    }

    let categoryId = category;
    if (!categoryId || !categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      const foundCat = await Category.findOne({
        $or: [
          { slug: String(category || "mobile-phones").toLowerCase() },
          { name: { $regex: String(category || "Mobile"), $options: "i" } }
        ]
      });
      categoryId = foundCat ? foundCat._id : (await Category.findOne({}))?._id;
    }

    const cleanSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const uniqueSlug = cleanSlug + "-" + Date.now().toString().slice(-4);

    let formattedImages = [];
    if (Array.isArray(images) && images.length > 0) {
      formattedImages = images.map(img => typeof img === 'string' ? { url: img, publicId: '', alt: name } : img);
    } else if (imageUrl) {
      formattedImages = [{ url: imageUrl.trim(), publicId: '', alt: name }];
    } else {
      formattedImages = [{ url: 'https://res.cloudinary.com/dbd4anwt/image/upload/v1793174711/sellbar/products/placeholder.webp', publicId: '', alt: name }];
    }

    const product = await Product.create({
      name: name.trim(),
      slug: uniqueSlug,
      description: description || (name + ' - Certified Refurbished with Warranty'),
      category: categoryId,
      brand: brand?.trim() || 'Sellbar Certified',
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      stock: stock !== undefined ? Number(stock) : 10,
      status: status || 'active',
      badge: badge || 'Lowest Price',
      condition: condition || 'Flawless',
      warranty: warranty || '12 Months Doorstep Warranty',
      isFeatured: Boolean(isFeatured),
      featuredType: featuredType || 'regular',
      images: formattedImages,
      rating: 4.8,
      reviewsCount: 10
    });

    const populated = await Product.findById(product._id).populate('category', 'name slug').lean();
    return res.status(201).json({ success: true, message: 'Product created successfully', data: { product: populated } });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updated = await Product.findByIdAndUpdate(id, body, { new: true })
      .populate('category', 'name slug')
      .lean();

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, message: 'Product updated successfully', data: { product: updated } });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
