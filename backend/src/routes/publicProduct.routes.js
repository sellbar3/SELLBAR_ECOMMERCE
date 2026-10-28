const express = require("express");
const router = express.Router();

const publicProductController = require(
  "../controllers/customer/publicProduct.controller"
);

router.get(
  "/categories",
  publicProductController.getCategories
);

router.get(
  "/products/featured",
  publicProductController.getFeaturedProducts
);

router.get(
  "/products",
  publicProductController.getProducts
);

router.get(
  "/products/:id",
  publicProductController.getProductById
);

module.exports = router;