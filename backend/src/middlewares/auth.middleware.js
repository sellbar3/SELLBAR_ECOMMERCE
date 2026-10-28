const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token required"
      });
    }

    const token = authHeader.slice(7);

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET,
      {
        issuer: "sellbar-api",
        audience: "sellbar-client"
      }
    );

    const user = await User.findById(decoded.sub);

    if (!user || user.status !== "active") {
      return res.status(401).json({
        success: false,
        message: "Invalid or inactive account"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

module.exports = authenticate;