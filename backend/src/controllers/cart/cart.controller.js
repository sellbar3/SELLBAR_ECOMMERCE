const mongoose = require("mongoose");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Vendor = require("../../models/Vendor");

async function findAvailableProduct(productId) {
  if (!mongoose.isValidObjectId(productId)) {
    return { error: "Invalid product ID", status: 400 };
  }

  const product = await Product.findOne({
    _id: productId,
    status: "active",
  });

  if (!product) {
    return { error: "Product is unavailable", status: 404 };
  }

  const vendor = await Vendor.findOne({
    _id: product.vendor,
    approvalStatus: "approved",
    isStoreActive: true,
  });

  if (!vendor) {
    return { error: "Product store is unavailable", status: 404 };
  }

  return { product };
}

// GET /api/cart
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      customer: req.user._id,
    })
      .populate({
        path: "items.product",
        select:
          "name category brand price compareAtPrice stock images status vendor",
      })
      .lean();

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
          totalItems: 0,
          subtotal: 0,
        },
      });
    }

    const items = [];
    let totalItems = 0;
    let subtotal = 0;

    for (const item of cart.items) {
      const product = item.product;

      // Do not expose products that have been removed from the catalog.
      if (!product || product.status !== "active") continue;

      const vendor = await Vendor.findOne({
        _id: product.vendor,
        approvalStatus: "approved",
        isStoreActive: true,
      }).select("_id storeName");

      if (!vendor) continue;

      const lineTotal = product.price * item.quantity;

      items.push({
        product: {
          id: product._id,
          name: product.name,
          category: product.category,
          brand: product.brand,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          stock: product.stock,
          images: product.images,
          vendor: {
            id: vendor._id,
            storeName: vendor.storeName,
          },
        },
        quantity: item.quantity,
        lineTotal,
        available: product.stock >= item.quantity,
      });

      totalItems += item.quantity;
      subtotal += lineTotal;
    }

    return res.status(200).json({
      success: true,
      data: {
        items,
        totalItems,
        subtotal: Number(subtotal.toFixed(2)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/cart/items
exports.addItem = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId || !mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "A valid productId is required",
      });
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a whole number between 1 and 100",
      });
    }

    const result = await findAvailableProduct(productId);

    if (result.error) {
      return res.status(result.status).json({
        success: false,
        message: result.error,
      });
    }

    const product = result.product;

    let cart = await Cart.findOne({
      customer: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        customer: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === product._id.toString()
    );

    const newQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity;

    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} units are currently in stock`,
      });
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: {
        cartId: cart._id,
        itemCount: cart.items.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/cart/items/:productId
exports.updateItemQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a whole number between 1 and 100",
      });
    }

    const result = await findAvailableProduct(productId);

    if (result.error) {
      return res.status(result.status).json({
        success: false,
        message: result.error,
      });
    }

    if (quantity > result.product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${result.product.stock} units are currently in stock`,
      });
    }

    const cart = await Cart.findOne({
      customer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (entry) => entry.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in your cart",
      });
    }

    item.quantity = quantity;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      data: {
        productId,
        quantity,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/items/:productId
exports.removeItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const cart = await Cart.findOne({
      customer: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: "Product not found in your cart",
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      customer: req.user._id,
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is already empty",
      });
    }

    cart.items = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};