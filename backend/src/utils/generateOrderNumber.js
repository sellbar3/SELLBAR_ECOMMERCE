const crypto = require("crypto");

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();

  const randomPart = crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase();

  return `SB-${timestamp}-${randomPart}`;
}

module.exports = generateOrderNumber;