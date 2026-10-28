const Vendor = require("../models/Vendor");

async function requireApprovedVendor(req, res, next) {
  try {
    // Authentication middleware must run first.
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (req.user.role !== "vendor") {
      return res.status(403).json({
        success: false,
        message: "Vendor access only",
      });
    }

    if (req.user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active",
      });
    }

    const vendor = await Vendor.findOne({
      user: req.user._id,
    });

    if (!vendor) {
      return res.status(403).json({
        success: false,
        message: "Vendor profile not found",
      });
    }

    if (vendor.approvalStatus !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Your store is awaiting admin approval",
      });
    }

    if (!vendor.isStoreActive) {
      return res.status(403).json({
        success: false,
        message: "Your store is currently inactive",
      });
    }

    // Make the verified vendor profile available to controllers.
    req.vendor = vendor;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = requireApprovedVendor;