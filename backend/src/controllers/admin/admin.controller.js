const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
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