"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PanelShell from "../../../components/PanelShell";
import { fmtDate, panelRequest, pickList } from "../../../lib/panel";

const USER_STATUS = ["active", "inactive", "blocked"];

function Users({ session }) {
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const filter = useSearchParams().get("role") || "all";
  const setFilter = (v) => router.replace(v === "all" ? "/admin/users" : `/admin/users?role=${v}`);
  const [msg, setMsg] = useState({ ok: "", err: "" });

  const load = useCallback(async () => {
    const params = new URLSearchParams({ limit: 100 });
    if (filter !== "all") params.set("role", filter);
    try {
      const d = await panelRequest(`/admin/users?${params}`, { token: session.token });
      setRows(pickList(d, "users"));
    } catch (e) {
      setMsg({ ok: "", err: e.message });
    }
  }, [session.token, filter]);

  useEffect(() => { load(); }, [load]);

  async function act(path, body, okText) {
    setMsg({ ok: "", err: "" });
    try {
      await panelRequest(path, { method: "PATCH", token: session.token, body });
      setMsg({ ok: okText, err: "" });
      load();
    } catch (e) {
      setMsg({ ok: "", err: e.message });
    }
  }

  return (
    <div className="pn-box">
      <div className="pn-row" style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Users ({rows.length})</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="customer">Customers</option>
          <option value="vendor">Vendors</option>
          <option value="admin">Admins</option>
        </select>
      </div>
      {msg.err && <p className="pn-err">{msg.err}</p>}
      {msg.ok && <p className="pn-ok">{msg.ok}</p>}

      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Vendor approval</th><th>Joined</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td><span className="pn-badge">{u.role}</span></td>
              <td>
                <select
                  value={u.status || "active"}
                  disabled={u.role === "admin"}
                  onChange={(e) => act(`/admin/users/${u._id}/status`, { status: e.target.value }, "Status update hua.")}
                >
                  {USER_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>
                {u.role === "vendor"
                  ? u.vendor
                    ? <span className="pn-badge">{u.vendor.approvalStatus}</span>
                    : "No vendor profile"
                  : "—"}
              </td>
              <td>{fmtDate(u.createdAt)}</td>
              <td className="pn-row">
                {u.role === "vendor" && u.vendor && (
                  <>
                    <button className="pn-btn green" onClick={() => act(`/admin/vendors/${u.vendor._id}/approval`, { approvalStatus: "approved" }, "Vendor approve ho gaya.")}>Approve</button>
                    <button className="pn-btn red" onClick={() => act(`/admin/vendors/${u.vendor._id}/approval`, { approvalStatus: "rejected" }, "Vendor reject ho gaya.")}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminUsers() {
  return (
    <Suspense fallback={null}>
      <PanelShell role="admin" title="Users & Vendors">{(s) => <Users session={s} />}</PanelShell>
    </Suspense>
  );
}