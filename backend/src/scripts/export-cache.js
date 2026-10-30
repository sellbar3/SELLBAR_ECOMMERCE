const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
require("../models/Category");
require("../models/Vendor");
const Product = require("../models/Product");

async function exportCache() {
  await mongoose.connect(process.env.MONGODB_URI);
  const products = await Product.find({ status: "active" })
    .populate("category", "name slug")
    .populate("vendor", "storeName")
    .lean();

  const dest = path.join(__dirname, "../../../sellbar-frontend/src/config/products-cache.json");
  fs.writeFileSync(dest, JSON.stringify(products, null, 2), "utf8");
  console.log(`Successfully cached ${products.length} products to ${dest}`);
  await mongoose.disconnect();
}

exportCache().catch(err => {
  console.error("Export cache error:", err);
  process.exit(1);
});
