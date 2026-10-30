const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const vendors = await mongoose.connection.db.collection("vendors").find({}).toArray();
  console.log("Vendors:", JSON.stringify(vendors, null, 2));
  process.exit(0);
}

check().catch(e => {
  console.error("DB check error:", e);
  process.exit(1);
});
