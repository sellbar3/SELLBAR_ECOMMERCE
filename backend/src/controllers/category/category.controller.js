const mongoose = require("mongoose");
const Category = require("../../models/Category");
const { uploadImageBuffer, deleteImage } = require("../../utils/cloudinary");

const CATEGORY_FOLDER = "sellbar/categories";

const makeSlug = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// multipart/form-data me sab values string aati hain
const parseBool = (v) =>
  v === true || v === "true" ? true : v === false || v === "false" ? false : undefined;

const handleError = (error, res) => {
  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Category name or slug already exists",
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  console.error("Category error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

// POST /api/categories
exports.createCategory = async (req, res) => {
  let uploaded = null;

  try {
    const { name, description, parent, sortOrder } = req.body;
    const isActive = parseBool(req.body.isActive);

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const slug = makeSlug(name);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid category name",
      });
    }

    if (parent) {
      if (!mongoose.isValidObjectId(parent)) {
        return res.status(400).json({
          success: false,
          message: "Invalid parent category ID",
        });
      }

      const parentCategory = await Category.findById(parent);

      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found",
        });
      }
    }

    // Saari validation ke baad hi Cloudinary par upload
    if (req.file) {
      uploaded = await uploadImageBuffer(req.file.buffer, CATEGORY_FOLDER);
    }

    const category = await Category.create({
      name: String(name).trim(),
      slug,
      description,
      image: uploaded
        ? { url: uploaded.url, publicId: uploaded.publicId }
        : undefined,
      parent: parent || null,
      isActive: isActive ?? true,
      sortOrder: Number(sortOrder) || 0,
      createdBy: req.user?._id || req.user?.id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: { category },
    });
  } catch (error) {
    // DB fail ho to Cloudinary me orphan image na rahe
    if (uploaded?.publicId) await deleteImage(uploaded.publicId).catch(() => {});
    return handleError(error, res);
  }
};

// GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 20)
    );

    const filter = {};

    if (req.query.active === "true") filter.isActive = true;
    if (req.query.active === "false") filter.isActive = false;

    if (req.query.parent === "root") {
      filter.parent = null;
    } else if (req.query.parent && mongoose.isValidObjectId(req.query.parent)) {
      filter.parent = req.query.parent;
    }

    if (req.query.search) {
      filter.name = {
        $regex: String(req.query.search)
          .trim()
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      };
    }

    const [categories, total] = await Promise.all([
      Category.find(filter)
        .populate("parent", "name slug")
        .sort({ sortOrder: 1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      Category.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        categories,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// GET /api/categories/:id
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = mongoose.isValidObjectId(id)
      ? { _id: id }
      : { slug: String(id).trim().toLowerCase() };

    const category = await Category.findOne(filter)
      .populate("parent", "name slug")
      .lean();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { category },
    });
  } catch (error) {
    return handleError(error, res);
  }
};

// PATCH /api/categories/:id
exports.updateCategory = async (req, res) => {
  let uploaded = null;

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const existing = await Category.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const allowed = ["name", "description", "parent", "isActive", "sortOrder"];
    const updates = {};

    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updates[key] = req.body[key];
      }
    }

    if (updates.isActive !== undefined) {
      const b = parseBool(updates.isActive);
      if (b === undefined) delete updates.isActive;
      else updates.isActive = b;
    }

    if (updates.sortOrder !== undefined) {
      updates.sortOrder = Number(updates.sortOrder) || 0;
    }

    if (updates.name !== undefined) {
      if (!String(updates.name).trim()) {
        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }

      updates.name = String(updates.name).trim();
      updates.slug = makeSlug(updates.name);

      if (!updates.slug) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid category name",
        });
      }
    }

    if (updates.parent !== undefined && updates.parent !== null && updates.parent !== "") {
      if (!mongoose.isValidObjectId(updates.parent)) {
        return res.status(400).json({
          success: false,
          message: "Invalid parent category ID",
        });
      }

      if (String(updates.parent) === String(id)) {
        return res.status(400).json({
          success: false,
          message: "A category cannot be its own parent",
        });
      }

      const parentCategory = await Category.findById(updates.parent);

      if (!parentCategory) {
        return res.status(404).json({
          success: false,
          message: "Parent category not found",
        });
      }
    } else if (updates.parent === "") {
      updates.parent = null;
    }

    // Image: nayi file -> replace | removeImage=true -> hata do
    const oldPublicId = existing.image?.publicId;
    let deleteOld = false;

    if (req.file) {
      uploaded = await uploadImageBuffer(req.file.buffer, CATEGORY_FOLDER);
      updates.image = { url: uploaded.url, publicId: uploaded.publicId };
      deleteOld = true;
    } else if (parseBool(req.body.removeImage) === true) {
      updates.image = { url: "", publicId: "" };
      deleteOld = true;
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    // DB update successful hone ke baad hi purani image delete
    if (deleteOld && oldPublicId) {
      await deleteImage(oldPublicId).catch((e) =>
        console.error("Old image delete failed:", e.message)
      );
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: { category },
    });
  } catch (error) {
    if (uploaded?.publicId) await deleteImage(uploaded.publicId).catch(() => {});
    return handleError(error, res);
  }
};

// DELETE /api/categories/:id
// Soft delete: products ke references safe rehte hain, image bhi rehti hai.
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deactivated successfully",
      data: { category },
    });
  } catch (error) {
    return handleError(error, res);
  }
};