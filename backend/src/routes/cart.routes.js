const express = require("express");
const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");
const requireCustomer = require("../middlewares/customer.middleware");

const cartController = require("../controllers/cart/cart.controller");

// Every cart route requires an authenticated, active Customer.
router.use(authenticate, requireCustomer);

router.get("/", cartController.getCart);

router.post("/items", cartController.addItem);

router.patch(
  "/items/:productId",
  cartController.updateItemQuantity
);

router.delete(
  "/items/:productId",
  cartController.removeItem
);

router.delete("/", cartController.clearCart);

module.exports = router;