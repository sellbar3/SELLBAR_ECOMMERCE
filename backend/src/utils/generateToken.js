const jwt = require("jsonwebtoken");

function generateToken(user) {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_ACCESS_SECRET must be configured with at least 32 characters"
    );
  }

  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role
    },
    secret,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
      issuer: "sellbar-api",
      audience: "sellbar-client"
    }
  );
}

module.exports = { generateToken };