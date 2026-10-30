const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const logger = require("./utils/logger");

async function bootstrapAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    logger.info(
      "Admin creation skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing",
    );
    return;
  }

  if (password.length < 6) {
    throw new Error("ADMIN_PASSWORD must be at least 6 characters");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingAdmin = await User.exists({
    email: normalizedEmail,
  });

  if (existingAdmin) {
    logger.info("Admin account already exists");
    return;
  }

  const rounds = Math.max(
    10,
    Math.min(14, Number(process.env.BCRYPT_ROUNDS) || 12),
  );

  const hashedPassword = await bcrypt.hash(password, rounds);

  const admin = await User.create({
    name: process.env.ADMIN_NAME || "SELLBAR Admin",
    email: normalizedEmail,
    password: hashedPassword,
    role: "admin",
    status: "active",
  });

  logger.info(`Initial admin created: ${admin.email}`);
}

async function startServer() {
  await connectDB();
  await bootstrapAdmin();

  const port = Number(process.env.PORT) || 5000;

  const server = app.listen(port, () => {
    logger.info(`SELLBAR API running on port ${port}`);
  });

  async function shutdown(signal) {
    logger.info(`${signal} received. Closing server...`);

    server.close(async () => {
      try {
        await mongoose.disconnect();
        process.exit(0);
      } catch (error) {
        logger.error("Shutdown error", error);
        process.exit(1);
      }
    });
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((error) => {
  logger.error("Server startup failed:", error);
  process.exit(1);
});
