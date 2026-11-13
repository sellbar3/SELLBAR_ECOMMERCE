import { apiRequest } from "./api";

export async function createOrder({ shippingAddress, paymentMethod, items, total, subtotal, upiTransactionId, token }) {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ shippingAddress, paymentMethod, items, total, subtotal, upiTransactionId }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.order || data;
    }
  } catch (err) {
    console.warn("Internal createOrder failed, attempting fallback:", err);
  }

  // Fallback to legacy backend if needed
  return apiRequest("/orders", {
    method: "POST",
    token,
    body: { shippingAddress, paymentMethod },
  });
}

export async function getMyOrders(token) {
  try {
    const headers = { Accept: "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch("/api/orders", {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      // Gracefully return empty list instead of throwing auth error
      return { orders: [] };
    }

    const json = await res.json();
    const orders = json.orders || json.data?.orders || (Array.isArray(json.data) ? json.data : []);
    return { orders: Array.isArray(orders) ? orders : [] };
  } catch (err) {
    console.warn("getMyOrders fetch failed gracefully:", err);
    return { orders: [] };
  }
}
