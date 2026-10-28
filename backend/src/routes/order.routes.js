const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const requireCustomer = require("../middlewares/customer.middleware");

const orderController = require("../controllers/order/order.controller");

router.use(authenticate, requireCustomer);

router.post("/", orderController.placeOrder);
router.get("/", orderController.getMyOrders);
router.get("/:id", orderController.getMyOrderById);
router.patch("/:id/cancel", orderController.cancelMyOrder);
module.exports = router;