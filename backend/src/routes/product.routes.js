const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const requireApprovedVendor = require("../middlewares/vendor.middleware");
const upload = require("../middlewares/upload.middleware");

const productController = require("../controllers/product/product.controller");

// All routes below require an authenticated, approved vendor.
router.use(authenticate, requireApprovedVendor);

// Static route must be registered before "/:id".
router.get("/my-products", productController.getMyProducts);

router.post(
  "/",
  upload.array("images", 10),
  productController.createProduct
);

router.get("/:id", productController.getMyProductById);

router.patch(
  "/:id",
  upload.array("images", 10),
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

module.exports = router;