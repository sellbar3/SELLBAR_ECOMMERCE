
const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review/review.controller");

// अपने project के actual middleware path और export के अनुसार बदलें।
const authenticate = require("../middlewares/auth.middleware");

// Public: list reviews for a product
router.get(
  "/products/:productId",
  reviewController.getProductReviews
);

// Customer-authenticated operations
router.post(
  "/products/:productId",
  authenticate,
  reviewController.createReview
);

router.patch(
  "/:id",
  authenticate,
  reviewController.updateMyReview
);

router.delete(
  "/:id",
  authenticate,
  reviewController.deleteMyReview
);

module.exports = router;
