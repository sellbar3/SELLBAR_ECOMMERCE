
import { apiRequest } from "./api";

export function createOrder({ shippingAddress, paymentMethod, token }) {
  return apiRequest("/orders", {
    method: "POST",
    token,
    body: { shippingAddress, paymentMethod },
  });
}

export function getMyOrders(token) {
  return apiRequest("/orders", { token });
}
