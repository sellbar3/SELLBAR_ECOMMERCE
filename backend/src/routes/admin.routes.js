const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

const adminController = require("../controllers/admin/admin.controller");

// All routes below require a valid Admin JWT.
router.use(authenticate);
router.use(authorizeRoles("admin"));

router.get("/dashboard", adminController.getDashboard);
router.get("/users", adminController.getUsers);

router.patch(
  "/users/:id/status",
  adminController.updateUserStatus
);

router.patch(
  "/vendors/:id/approval",
  adminController.updateVendorApproval
);

// Admin Product Management
router.get("/products", adminController.getProducts);
router.post("/products", adminController.createProduct);
router.patch("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);

// Universal fallback for sub-routes and telemetry endpoints
router.use((req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin endpoint active",
    data: { endpoint: req.originalUrl, status: "active", items: [] }
  });
});

module.exports = router;
