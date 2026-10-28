const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
const { generateToken } = require("../../utils/generateToken");
exports.registerCustomer = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    const rounds = Math.max(
      10,
      Math.min(14, Number(process.env.BCRYPT_ROUNDS) || 12)
    );

    const hashedPassword = await bcrypt.hash(
      password,
      rounds
    );

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "customer",
      status: "active"
    });

    return res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required"
      });
    }

    const user = await User.findOne({
      email: String(email).trim().toLowerCase()
    }).select("+password");

    if (!user || user.role !== role) {
      return res.status(401).json({
        success: false,
        message: "Invalid email, password or role"
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email, password or role"
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
exports.registerVendor = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      storeName,
      storeDescription,
      phone,
      address
    } = req.body;

    if (!name || !email || !password || !storeName) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and store name are required"
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    const rounds = Math.max(
      10,
      Math.min(14, Number(process.env.BCRYPT_ROUNDS) || 12)
    );

    const hashedPassword = await bcrypt.hash(
      password,
      rounds
    );

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "vendor",
      status: "active"
    });

    try {
      const vendor = await Vendor.create({
        user: user._id,
        storeName: String(storeName).trim(),
        storeDescription: storeDescription || "",
        phone: phone || "",
        address: address || "",
        approvalStatus: "pending"
      });

      return res.status(201).json({
        success: true,
        message: "Vendor registered; awaiting admin approval",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          vendor: {
            id: vendor._id,
            storeName: vendor.storeName,
            approvalStatus: vendor.approvalStatus
          }
        }
      });
    } catch (error) {
      await User.deleteOne({ _id: user._id });
      throw error;
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or vendor profile already exists"
      });
    }

    next(error);
  }
};