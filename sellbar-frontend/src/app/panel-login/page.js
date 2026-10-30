"use client";

import "@/css/panel.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../lib/api";
import { savePanelSession } from "../../lib/panel";

export default function PanelLogin() {
  const router = useRouter();
  const [role, setRole] = useState("vendor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: { email: email.trim(), password, role },
      });
      const session = { token: data.token, ...data.user };
      if (session.role !== role) throw new Error("Is role ke liye access nahi hai.");
      savePanelSession(session);
      router.replace(role === "admin" ? "/admin" : "/vendor");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form data-portal-shell="true" className="pn-login" onSubmit={submit}>
      <h2 style={{ margin: 0 }}>SELLBAR Panel Login</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="vendor">Vendor</option>
        <option value="admin">Admin</option>
      </select>
      <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="pn-err">{error}</p>}
      <button className="pn-btn" disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
    </form>
  );
}
