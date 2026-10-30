"use client";

import { useCallback, useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { money, panelRequest, pickList } from "../../../lib/panel";

function AdminProductsList({ session }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const d = await panelRequest("/products?limit=100", { token: session?.token });
      setRows(pickList(d, "products"));
    } catch (e) {
      setError(e.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = rows.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pn-box">
      <div className="pn-row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Products ({filtered.length})</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      {error && <p className="pn-err">{error}</p>}

      {loading ? (
        <p>Loading products...</p>
      ) : filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id || p.id}>
                <td>
                  {p.images?.[0]?.url || p.images?.[0] ? (
                    <img
                      className="th"
                      src={typeof p.images[0] === "string" ? p.images[0] : p.images[0].url}
                      alt=""
                    />
                  ) : (
                    "🛍️"
                  )}
                </td>
                <td>{p.name || p.title}</td>
                <td>{money(p.price || p.sellbarPrice || 0)}</td>
                <td>{p.stock ?? p.stockCount ?? "—"}</td>
                <td>
                  <span className="pn-badge">{p.status || (p.isActive ? "active" : "inactive")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <PanelShell role="admin" title="Products">
      {(session) => <AdminProductsList session={session} />}
    </PanelShell>
  );
}
