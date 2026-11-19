const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const requireApprovedVendor = require("../middlewares/vendor.middleware");
const upload = require("../middlewares/upload.middleware");

const vendorController = require("../controllers/vendor/vendor.controller");

router.use(authenticate, requireApprovedVendor);

router.get("/dashboard", vendorController.getDashboard);
router.get("/profile", vendorController.getProfile);
router.patch("/profile", upload.single("logo"), vendorController.updateProfile);

// Automated Commission & Weekly Payout Ledger
router.get("/payouts", vendorController.getPayouts);
router.patch("/bank-details", vendorController.updateBankDetails);

module.exports = router;