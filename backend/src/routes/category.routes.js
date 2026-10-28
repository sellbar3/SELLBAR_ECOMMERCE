const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category/category.controller");
const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware"); // apni multer file

// Public read-only endpoints
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

// Admin-only write endpoints
router.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  upload.single("image"),
  categoryController.createCategory
);

router.patch(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  upload.single("image"),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  categoryController.deleteCategory
);

module.exports = router;