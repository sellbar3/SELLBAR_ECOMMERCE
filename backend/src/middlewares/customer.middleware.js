function requireCustomer(req, res, next) {
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Customer access only",
    });
  }

  if (req.user.status !== "active") {
    return res.status(403).json({
      success: false,
      message: "Customer account is not active",
    });
  }

  next();
}

module.exports = requireCustomer;