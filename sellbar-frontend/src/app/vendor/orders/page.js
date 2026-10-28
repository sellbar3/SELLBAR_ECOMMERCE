"use client";

import { useCallback, useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { fmtDate, money, panelRequest, pickList } from "../../../lib/panel";

const STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

function Orders({ session }) {
  const [rows, setRows] = useState([]);
  const [next, setNext] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(null);

  const load = useCallback(async () => {
    try {
      const d = await panelRequest("/vendor/orders", { token: session.token });
      setRows(pickList(d, "orders"));
    } catch (e) {
      setError(e.message);
    }
  }, [session.token]);

  useEffect(() => { load(); }, [load]);

  async function update(o) {
    const value = next[o._id];
    if (!value || value === o.orderStatus) return;
    setBusy(o._id);
    setError("");
    try {
      await panelRequest(`/vendor/orders/${o._id}/status`, {
        method: "PATCH",
        token: session.token,
        body: { orderStatus: value, status: value },
      });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      {error && <p className="pn-err">{error}</p>}
      {rows.length === 0 && !error && <div className="pn-box">Abhi koi order nahi hai.</div>}
      {rows.map((o) => (
        <div className="pn-box" key={o._id}>
          <div className="pn-row" style={{ justifyContent: "space-between" }}>
            <strong>#{String(o._id).slice(-8).toUpperCase()}</strong>
            <span>{fmtDate(o.createdAt)}</span>
            <span className="pn-badge">{o.orderStatus}</span>
            <span className="pn-badge">{o.paymentMethod} · {o.paymentStatus}</span>
            <strong>{money(o.total)}</strong>
          </div>
          <p style={{ margin: "8px 0", fontSize: 13 }}>
            {o.shippingAddress?.fullName}, {o.shippingAddress?.addressLine1}, {o.shippingAddress?.city},{" "}
            {o.shippingAddress?.state} - {o.shippingAddress?.postalCode} · 📞 {o.shippingAddress?.phone}
          </p>
          <ul style={{ margin: "0 0 10px", paddingLeft: 18, fontSize: 13 }}>
            {(o.items || []).map((it, i) => (
              <li key={i}>{it.productName} × {it.quantity} — {money(it.lineTotal)}</li>
            ))}
          </ul>
          <div className="pn-row">
            <select
              value={next[o._id] ?? o.orderStatus}
              onChange={(e) => setNext({ ...next, [o._id]: e.target.value })}
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="pn-btn" disabled={busy === o._id} onClick={() => update(o)}>
              {busy === o._id ? "Updating..." : "Update status"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default function VendorOrders() {
  return <PanelShell role="vendor" title="Orders">{(s) => <Orders session={s} />}</PanelShell>;
}
