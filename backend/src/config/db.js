
const mongoose = require("mongoose");
const dns = require("node:dns");

// Configure DNS before Mongoose starts connecting
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is required in .env");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 15000,
  });

  console.log("MongoDB connected successfully");
}

module.exports = connectDB;
