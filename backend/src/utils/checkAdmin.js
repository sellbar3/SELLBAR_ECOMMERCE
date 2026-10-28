require("dotenv").config();

const dns = require("node:dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function checkAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000
    });

    const user = await User.findOne({
      email: "admin@gmail.com"
    }).select("+password");

    if (!user) {
      console.log("Admin email not found");
      return;
    }

    console.log("Email found:", user.email);
    console.log("Role:", user.role);
    console.log("Status:", user.status);

    const matches = await bcrypt.compare(
      "123456",
      user.password
    );

    console.log("Password matches:", matches);
  } catch (error) {
    console.error("Admin check failed:", error.message);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

checkAdmin();