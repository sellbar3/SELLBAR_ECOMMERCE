const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const requireApprovedVendor = require("../middlewares/vendor.middleware");

const orderController = require("../controllers/vendor/order.controller");

router.use(authenticate, requireApprovedVendor);

router.get("/", orderController.getVendorOrders);
router.get("/:id", orderController.getVendorOrderById);
router.patch("/:id/status", orderController.updateVendorOrderStatus);

module.exports = router;