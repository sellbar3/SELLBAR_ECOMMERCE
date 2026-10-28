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
// Add this route alongside your existing admin routes
router.patch(
  "/vendors/:id/approval",
  adminController.updateVendorApproval
);

module.exports = router;