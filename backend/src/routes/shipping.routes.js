const express = require("express");
const router = express.Router();
const shippingController = require("../controllers/shipping/shipping.controller");
const authenticate = require("../middlewares/auth.middleware");

// Public endpoints
router.get("/check", shippingController.checkPincode);
router.get("/pincodes", shippingController.getPincodes);
router.get("/label/:orderId", shippingController.getShippingLabel);
router.get("/track/:id", shippingController.trackShipment);

// Authenticated endpoints for 1-Click AWB Generation (Admin or Vendor)
router.post("/generate-awb", (req, res, next) => {
  // Allow optional auth header if token is present, else continue to controller
  if (req.headers.authorization) {
    return authenticate(req, res, next);
  }
  next();
}, shippingController.generateAWB);

module.exports = router;
