const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["admin", "customer", "vendor"],
      default: "customer",
      required: true
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active"
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports =
  mongoose.models.User ||
  mongoose.model("User", userSchema);