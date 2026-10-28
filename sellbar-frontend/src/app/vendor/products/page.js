"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { money, panelRequest, pickList } from "../../../lib/panel";

function List({ session }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const d = await panelRequest("/products/my-products", { token: session.token });
      setRows(pickList(d, "products"));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [session.token]);

  useEffect(() => { load(); }, [load]);

  async function remove(id) {
    if (!window.confirm("Product delete karna hai?")) return;
    try {
      await panelRequest(`/products/${id}`, { method: "DELETE", token: session.token });
      load();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="pn-box">
      <div className="pn-row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>My Products ({rows.length})</h2>
        <Link className="pn-btn" href="/vendor/products/new">+ Add product</Link>
      </div>
      {error && <p className="pn-err">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table>
          <thead><tr><th></th><th>Name</th><th>Price</th><th>Stock</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p._id}>
                <td>{p.images?.[0]?.url ? <img className="th" src={p.images[0].url} alt="" /> : "🛍️"}</td>
                <td>{p.name}</td>
                <td>{money(p.price)}</td>
                <td>{p.stock}</td>
                <td><span className="pn-badge">{p.status}</span></td>
                <td className="pn-row">
                  <Link className="pn-btn" href={`/vendor/products/${p._id}`}>Edit</Link>
                  <button className="pn-btn red" onClick={() => remove(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function VendorProducts() {
  return <PanelShell role="vendor" title="Products">{(s) => <List session={s} />}</PanelShell>;
}
