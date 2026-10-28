"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../../lib/auth";
import { apiRequest } from "../../lib/api";
import { getMyOrders } from "../../lib/checkout";

const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

const badge = (text, color) => ({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 12,
  fontSize: 12,
  fontWeight: 600,
  background: color,
  color: "#fff",
  textTransform: "capitalize",
});

const statusColor = {
  pending: "#f59f00",
  confirmed: "#2874f0",
  processing: "#2874f0",
  shipped: "#6a5af9",
  delivered: "#2f9e44",
  cancelled: "#e03131",
  paid: "#2f9e44",
  failed: "#e03131",
};

const STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

function Tracker({ order }) {
  if (order.orderStatus === "cancelled") {
    return (
      <p style={{ color: "#e03131", margin: "8px 0" }}>
        Yeh order cancel ho chuka hai.
      </p>
    );
  }

  const current = Math.max(
    0,
    STEPS.findIndex((step) => step.key === order.orderStatus)
  );

  return (
    <div style={{ margin: "12px 0" }}>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {STEPS.map((step, index) => {
          const done = index <= current;

          return (
            <li
              key={step.key}
              style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: done ? "#2f9e44" : "#dee2e6",
                    color: "#fff",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {done ? "✓" : ""}
                </span>
                {index < STEPS.length - 1 && (
                  <span
                    style={{
                      width: 2,
                      height: 24,
                      background: index < current ? "#2f9e44" : "#dee2e6",
                    }}
                  />
                )}
              </div>

              <div style={{ paddingBottom: 10 }}>
                <strong style={{ color: done ? "#212529" : "#868e96" }}>
                  {step.label}
                </strong>
                {index === 0 && order.createdAt && (
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </div>
                )}
                {index === current && index !== 0 && order.updatedAt && (
                  <div style={{ fontSize: 12, color: "#666" }}>
                    Updated: {new Date(order.updatedAt).toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {order.paymentMethod === "online" && order.paymentStatus === "pending" && (
        <p style={{ fontSize: 13, color: "#e8590c" }}>
          Payment abhi pending hai. Payment poori hone par order aage badhega.
        </p>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [trackId, setTrackId] = useState(null);

  const load = useCallback(async (token) => {
    const data = await getMyOrders(token);
    setOrders(data.orders || []);
  }, []);

  useEffect(() => {
    const current = getSession();

    if (!current?.token) {
      setLoading(false);
      return;
    }

    setSession(current);

    load(current.token)
      .catch((err) => setError(err.message || "Orders load nahi hue."))
      .finally(() => setLoading(false));
  }, [load]);

  const cancelOrder = async (id) => {
    if (!window.confirm("Is order ko cancel karna hai?")) return;

    setBusyId(id);
    setError("");

    try {
      await apiRequest(`/orders/${encodeURIComponent(id)}/cancel`, {
        method: "PATCH",
        token: session.token,
      });
      await load(session.token);
    } catch (err) {
      setError(err.message || "Order cancel nahi hua.");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return <main style={{ padding: 24 }}><p>Loading orders...</p></main>;
  }

  if (!session) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Login Required</h1>
        <p>Orders dekhne ke liye login karna zaroori hai.</p>
        <button onClick={() => router.push("/")}>Go to Homepage</button>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <button onClick={() => router.push("/")} style={{ marginBottom: 12 }}>
        ← Continue Shopping
      </button>

      <h1>My Orders</h1>

      {error && (
        <p role="alert" style={{ color: "#e03131" }}>
          {error}
        </p>
      )}

      {orders.length === 0 && !error && <p>Abhi koi order nahi hai.</p>}

      {orders.map((order) => {
        const canCancel =
          order.paymentStatus === "pending" &&
          ["pending", "confirmed"].includes(order.orderStatus);

        return (
          <section
            key={order._id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <strong>Order #{String(order._id).slice(-8).toUpperCase()}</strong>
                <div style={{ fontSize: 13, color: "#666" }}>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("en-IN")
                    : ""}
                  {order.vendor?.storeName ? ` · ${order.vendor.storeName}` : ""}
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={badge(order.orderStatus, statusColor[order.orderStatus] || "#868e96")}>
                  {order.orderStatus}
                </span>
                <span style={badge(order.paymentStatus, statusColor[order.paymentStatus] || "#868e96")}>
                  {order.paymentMethod === "cod" ? "COD" : "Online"} · {order.paymentStatus}
                </span>
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "12px 0" }}>
              {(order.items || []).map((item, index) => (
                <li
                  key={`${item.product}-${index}`}
                  style={{ display: "flex", gap: 12, alignItems: "center", padding: "6px 0" }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      width={48}
                      height={48}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  ) : (
                    <span style={{ fontSize: 28 }}>🛍️</span>
                  )}
                  <span style={{ flex: 1 }}>
                    {item.productName} × {item.quantity}
                  </span>
                  <span>{money(item.lineTotal)}</span>
                </li>
              ))}
            </ul>

            {trackId === order._id && <Tracker order={order} />}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #eee",
                paddingTop: 10,
              }}
            >
              <strong>Total: {money(order.total)}</strong>

              <button
                onClick={() => setTrackId(trackId === order._id ? null : order._id)}
              >
                {trackId === order._id ? "Hide tracking" : "Track order"}
              </button>

              {canCancel && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  disabled={busyId === order._id}
                >
                  {busyId === order._id ? "Cancelling..." : "Cancel order"}
                </button>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}