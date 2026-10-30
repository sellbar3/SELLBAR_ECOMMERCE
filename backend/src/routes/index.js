const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SELLBAR API routes are working",
  });
});

router.use("/auth", require("./auth.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/products", require("./product.routes"));
router.use("/vendor", require("./vendor.routes"));
router.use("/public", require("./publicProduct.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/orders", require("./order.routes"));
router.use("/vendor/orders", require("./vendorOrder.routes"));
router.use("/payments", require("./payment.routes"));
router.use("/categories", require("./category.routes"));
router.use("/reviews", require("./review.routes"));
router.use("/shipping", require("./shipping.routes"));
router.use("/serviceability", require("./shipping.routes"));

module.exports = router;
