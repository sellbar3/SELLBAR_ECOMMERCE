require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const Category = require("../models/Category");

async function migrate() {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL;

  if (!uri) {
    throw new Error("MongoDB connection URI is missing from .env");
  }

  await mongoose.connect(uri);

  const categories = await Category.find({})
    .select("_id name")
    .lean();

  let migrated = 0;

  for (const category of categories) {
    const result = await mongoose.connection
      .collection("products")
      .updateMany(
        { category: category.name },
        { $set: { category: category._id } }
      );

    migrated += result.modifiedCount;
    console.log(
      `${category.name}: ${result.modifiedCount} product(s) migrated`
    );
  }

  const remaining = await mongoose.connection
    .collection("products")
    .countDocuments({ category: { $type: "string" } });

  console.log("Total migrated:", migrated);
  console.log("Products still using string categories:", remaining);

  await mongoose.disconnect();

  if (remaining > 0) {
    console.log(
      "Resolve remaining category strings before changing Product.js."
    );
    process.exitCode = 1;
  }
}

migrate().catch(async (error) => {
  console.error("Migration failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exitCode = 1;
});
