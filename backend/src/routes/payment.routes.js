const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const requireCustomer = require("../middlewares/customer.middleware");

const paymentController = require("../controllers/payment/payment.controller");

router.use(authenticate, requireCustomer);

router.post("/create-order", paymentController.createRazorpayOrder);
router.post("/verify", paymentController.verifyPayment);

module.exports = router;