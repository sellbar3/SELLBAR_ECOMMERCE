const express = require("express");
const router = express.Router();
const {
  SERVICEABLE_PINCODES,
  PINCODE_DIRECTORY,
  isServiceablePincode,
  checkServiceability,
} = require("../utils/serviceability");

// GET /api/shipping/check?pincode=845438
router.get("/check", (req, res) => {
  const { pincode } = req.query;
  const result = checkServiceability(pincode);
  return res.status(200).json({
    success: true,
    data: result,
  });
});

// GET /api/shipping/pincodes
router.get("/pincodes", (req, res) => {
  return res.status(200).json({
    success: true,
    serviceablePincodes: SERVICEABLE_PINCODES,
    directory: PINCODE_DIRECTORY,
  });
});

module.exports = router;
