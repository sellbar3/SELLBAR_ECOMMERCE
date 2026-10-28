const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth/auth.controller");

console.log("Auth controller exports:", Object.keys(authController));

router.post("/login", authController.login);
router.post("/register/customer", authController.registerCustomer);
router.post("/register/vendor", authController.registerVendor);

module.exports = router;