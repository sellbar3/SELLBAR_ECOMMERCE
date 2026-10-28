const Vendor = require("../../models/Vendor");
const Product = require("../../models/Product");
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