import { apiRequest } from "./api";

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