const Vendor = require("../../models/Vendor");
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const VendorPayout = require("../../models/VendorPayout");
const { uploadImageBuffer, deleteImage } = require("../../utils/cloudinary");

const VENDOR_FOLDER = "sellbar/vendors";

// GET /api/vendor/dashboard
exports.getDashboard = async (req, res, next) => {
  try {
    const vendor = req.vendor;

    const [
      totalProducts,
      activeProducts,
      draftProducts,
      outOfStockProducts,
    ] = await Promise.all([
      Product.countDocuments({ vendor: vendor._id }),
      Product.countDocuments({ vendor: vendor._id, status: "active" }),
      Product.countDocuments({ vendor: vendor._id, status: "draft" }),
      Product.countDocuments({ vendor: vendor._id, stock: 0 }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Vendor dashboard fetched successfully",
      data: {
        vendor: {
          id: vendor._id,
          storeName: vendor.storeName,
          logo: vendor.logo?.url || "",
          approvalStatus: vendor.approvalStatus,
          isStoreActive: vendor.isStoreActive,
        },
        products: {
          total: totalProducts,
          active: activeProducts,
          draft: draftProducts,
          outOfStock: outOfStockProducts,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/vendor/profile
exports.getProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Vendor profile fetched successfully",
      data: {
        vendor: req.vendor,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/vendor/profile
// multipart/form-data: storeName, storeDescription, phone, address,
// logo (file), removeLogo ("true")
exports.updateProfile = async (req, res, next) => {
  let uploaded = null;

  try {
    const body = req.body || {};
    const allowedFields = ["storeName", "storeDescription", "phone", "address"];
    const updates = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (typeof body[field] !== "string") {
          return res.status(400).json({
            success: false,
            message: `${field} must be text`,
          });
        }

        const value = body[field].trim();

        if (field === "storeName" && !value) {
          return res.status(400).json({
            success: false,
            message: "Store name cannot be empty",
          });
        }

        updates[field] = value;
      }
    }

    // Logo: nayi file -> replace | removeLogo=true -> hata do
    const oldPublicId = req.vendor.logo?.publicId;
    let deleteOld = false;

    if (req.file) {
      uploaded = await uploadImageBuffer(req.file.buffer, VENDOR_FOLDER);
      updates.logo = { url: uploaded.url, publicId: uploaded.publicId };
      deleteOld = true;
    } else if (body.removeLogo === "true" || body.removeLogo === true) {
      updates.logo = { url: "", publicId: "" };
      deleteOld = true;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one profile field to update",
      });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.vendor._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!vendor) {
      if (uploaded?.publicId) {
        await deleteImage(uploaded.publicId).catch(() => {});
      }
      return res.status(404).json({
        success: false,
        message: "Vendor profile not found",
      });
    }

    // DB update successful hone ke baad hi purana logo delete
    if (deleteOld && oldPublicId) {
      await deleteImage(oldPublicId).catch((e) =>
        console.error("Old logo delete failed:", e.message)
      );
    }

    return res.status(200).json({
      success: true,
      message: "Vendor profile updated successfully",
      data: { vendor },
    });
  } catch (error) {
    // DB fail ho to Cloudinary me orphan image na rahe
    if (uploaded?.publicId) {
      await deleteImage(uploaded.publicId).catch(() => {});
    }
    next(error);
  }
};

// GET /api/vendor/payouts
// Vendor Automated Commission & Settlement Ledger
exports.getPayouts = async (req, res, next) => {
  try {
    const vendorId = req.vendor._id;

    // Fetch all orders for this vendor
    const orders = await Order.find({ vendor: vendorId })
      .sort({ createdAt: -1 })
      .lean();

    // Commission & financial calculation
    const defaultCommRate = req.vendor.commissionRate !== undefined ? req.vendor.commissionRate : 10;
    let totalGrossSales = 0;
    let totalCommissionDeducted = 0;
    let totalVendorEarnings = 0;
    let totalSettled = 0;
    let pendingBalance = 0;

    const formattedOrders = orders.map((o) => {
      const orderTotal = o.total || o.subtotal || 0;
      const rate = o.commissionRate !== undefined ? o.commissionRate : defaultCommRate;
      const commission = o.commissionAmount !== undefined ? o.commissionAmount : Math.round((orderTotal * rate) / 100);
      const earnings = o.vendorEarnings !== undefined ? o.vendorEarnings : Math.max(0, orderTotal - commission);
      const isSettled = o.payoutStatus === "settled";

      totalGrossSales += orderTotal;
      totalCommissionDeducted += commission;
      totalVendorEarnings += earnings;

      if (isSettled) {
        totalSettled += earnings;
      } else if (o.orderStatus !== "cancelled") {
        pendingBalance += earnings;
      }

      return {
        _id: o._id,
        orderNumber: String(o._id).slice(-8).toUpperCase(),
        createdAt: o.createdAt,
        orderStatus: o.orderStatus,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        total: orderTotal,
        commissionRate: rate,
        commissionAmount: commission,
        vendorEarnings: earnings,
        payoutStatus: o.payoutStatus || "pending",
        payoutRef: o.payoutRef || null,
        payoutSettledAt: o.payoutSettledAt || null,
        awbNumber: o.awbNumber || null,
        shippingCarrier: o.shippingCarrier || "Delhivery Surface",
      };
    });

    // Fetch weekly settlement transfers
    const settlementHistory = await VendorPayout.find({ vendor: vendorId })
      .sort({ settledAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalGrossSales,
          totalCommissionDeducted,
          commissionRate: defaultCommRate,
          totalVendorEarnings,
          totalSettled,
          pendingBalance,
          ordersCount: orders.length,
          settlementsCount: settlementHistory.length,
        },
        bankDetails: req.vendor.bankDetails || {},
        orders: formattedOrders,
        settlements: settlementHistory,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/vendor/bank-details
// Update vendor bank account & UPI for weekly settlement transfers
exports.updateBankDetails = async (req, res, next) => {
  try {
    const { accountHolder, accountNumber, ifscCode, bankName, branchName, upiId, panNumber } = req.body;

    const vendor = await Vendor.findById(req.vendor._id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    vendor.bankDetails = {
      accountHolder: accountHolder ? String(accountHolder).trim() : vendor.bankDetails?.accountHolder || "",
      accountNumber: accountNumber ? String(accountNumber).trim() : vendor.bankDetails?.accountNumber || "",
      ifscCode: ifscCode ? String(ifscCode).trim().toUpperCase() : vendor.bankDetails?.ifscCode || "",
      bankName: bankName ? String(bankName).trim() : vendor.bankDetails?.bankName || "",
      branchName: branchName ? String(branchName).trim() : vendor.bankDetails?.branchName || "",
      upiId: upiId ? String(upiId).trim() : vendor.bankDetails?.upiId || "",
      panNumber: panNumber ? String(panNumber).trim().toUpperCase() : vendor.bankDetails?.panNumber || "",
      isVerified: true,
    };

    await vendor.save();

    return res.status(200).json({
      success: true,
      message: "Bank details saved successfully. Weekly settlements will be credited to this account.",
      data: { bankDetails: vendor.bankDetails },
    });
  } catch (error) {
    next(error);
  }
};
