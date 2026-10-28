require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function resetAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000
    });

    const email = "admin@gmail.com";
    const newPassword = "123456";

    const user = await User.findOne({ email }).select("+password");

    if (!user || user.role !== "admin") {
      throw new Error("Admin account not found");
    }

    const rounds = Math.max(
      10,
      Math.min(14, Number(process.env.BCRYPT_ROUNDS) || 12)
    );

    user.password = await bcrypt.hash(newPassword, rounds);
    await user.save();

    console.log("Admin password reset successfully");
    console.log("Email:", user.email);
    console.log("Password: 123456");
  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

resetAdminPassword();