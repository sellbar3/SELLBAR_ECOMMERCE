import { apiRequest } from "./api";

export const CART_STORAGE_KEY = "sellbar_cart";

export function getLocalCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalCart(items) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("sellbar-cart-updated"));
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
}

export function addToCart(product, quantity = 1) {
  if (!product) return [];
  const items = getLocalCart();
  const prodId = product.id || product._id || product.slug;
  const existingIdx = items.findIndex((item) => {
    const itemId = item.id || item._id || item.slug;
    return (
      itemId === prodId &&
      item.color === product.color &&
      item.storage === product.storage &&
      item.conditionGrade === product.conditionGrade
    );
  });

  if (existingIdx > -1) {
    items[existingIdx].quantity = (items[existingIdx].quantity || 0) + Math.max(1, quantity);
  } else {
    items.push({
      ...product,
      quantity: Math.max(1, quantity),
    });
  }

  saveLocalCart(items);
  return items;
}

export function removeFromLocalCart(productId) {
  const items = getLocalCart().filter(
    (item) => (item.id || item._id || item.slug) !== productId
  );
  saveLocalCart(items);
  return items;
}

export function updateLocalCart(productId, quantity) {
  if (quantity <= 0) {
    return removeFromLocalCart(productId);
  }
  const items = getLocalCart().map((item) => {
    if ((item.id || item._id || item.slug) === productId) {
      return { ...item, quantity };
    }
    return item;
  });
  saveLocalCart(items);
  return items;
}

export function clearLocalCart() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event("sellbar-cart-updated"));
  } catch (err) {
    console.error("Failed to clear cart", err);
  }
}

export const getCart = (token) =>
  apiRequest("/cart", { token });

export const addCartItem = (productId, quantity, token) =>
  apiRequest("/cart/items", {
    method: "POST",
    token,
    body: { productId, quantity },
  });

export const removeCartItem = (productId, token) =>
  apiRequest(`/cart/items/${encodeURIComponent(productId)}`, {
    method: "DELETE",
    token,
  });

export const updateCartItem = (productId, quantity, token) =>
  quantity <= 0
    ? removeCartItem(productId, token)
    : apiRequest(`/cart/items/${encodeURIComponent(productId)}`, {
        method: "PATCH",
        token,
        body: { quantity },
      });
