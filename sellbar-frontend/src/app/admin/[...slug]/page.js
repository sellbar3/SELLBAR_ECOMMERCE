"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import PanelShell from "../../../components/PanelShell";
import { money } from "../../../lib/panel";
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  FileText,
  Printer,
  X,
  ExternalLink,
} from "lucide-react";

function UniversalAdminModuleContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slugArray = params?.slug || [];
  const moduleKey = slugArray[0] || "dashboard";
  const subPageKey = slugArray[1] || "";
  const filterParam = searchParams.get("status") || searchParams.get("type") || searchParams.get("filter") || "";
  const actionParam = searchParams.get("action") || "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");

  // Modals
  const [activeModal, setActiveModal] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  // AI Generator state
  const [aiPrompt, setAiPrompt] = useState("Apple iPhone 15 Pro");
  const [aiResult, setAiResult] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);

  // Forms
  const [formData, setFormData] = useState({});

  const loadModuleData = async () => {
    try {
      setLoading(true);
      setError("");
      const queryString = searchParams.toString();
      const res = await fetch(`/api/admin/${slugArray.join("/")}${queryString ? `?${queryString}` : ""}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else {
        throw new Error(json.message || "Failed to load module data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModuleData();
    if (actionParam === "new") {
      setActiveModal("create");
    }
  }, [moduleKey, subPageKey, filterParam, actionParam]);

  const notify = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // CSV Exporter
  const exportToCSV = (filename, rows) => {
    if (!rows || rows.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = Object.keys(rows[0]).join(",");
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows.map((r) => Object.values(r).map((v) => `"${String(v ?? "")}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename || moduleKey}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify("CSV file generated and downloaded successfully!");
  };

  // ========================================================
  // MODULE RENDERERS
  // ========================================================

  return (
    <PanelShell role="admin" title={`${moduleKey.toUpperCase()} - Admin Panel`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Banner Alert */}
        {successMsg && (
          <div style={{ background: "#dcfce7", color: "#166534", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: "bold" }}>
            ✓ {successMsg}
          </div>
        )}
        {error && (
          <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "10px 16px", borderRadius: 8, fontSize: 13 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Top Control Bar */}
        <div
          style={{
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0f172a", textTransform: "capitalize" }}>
              {subPageKey ? `${subPageKey.replace(/-/g, " ")} (${moduleKey})` : moduleKey.replace(/-/g, " ")}
            </h2>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
              Manage {moduleKey} configurations, live status, and database persistence.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              onClick={() => setActiveModal("create")}
              style={{
                padding: "8px 14px",
                background: "#DC2564",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Plus size={14} /> Add New Entry
            </button>
            <button
              type="button"
              onClick={() => {
                const list = data?.orders || data?.customers || data?.inventory || data?.coupons || data?.tickets || data?.returns || data?.transactions || [];
                exportToCSV(moduleKey, list);
              }}
              style={{
                padding: "8px 14px",
                background: "#f8fafc",
                color: "#334155",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: ORDERS                                   */}
        {/* ======================================================== */}
        {moduleKey === "orders" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16 }}>
            {/* Search and Status Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Search by Order ID, customer, product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: "1 1 240px", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 13 }}
              />
              <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                {["all", "new", "confirmed", "processing", "shipped", "delivered", "returned", "refunded"].map((st) => (
                  <button
                    key={st}
                    onClick={() => router.push(`/admin/orders${st === "all" ? "" : `?status=${st}`}`)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      background: (filterParam || "all") === st ? "#DC2564" : "#f1f5f9",
                      color: (filterParam || "all") === st ? "#fff" : "#475569",
                      textTransform: "capitalize",
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 12px" }}>Order ID</th>
                    <th style={{ padding: "10px 12px" }}>Customer &amp; Contact</th>
                    <th style={{ padding: "10px 12px" }}>Ordered Item</th>
                    <th style={{ padding: "10px 12px" }}>Amount</th>
                    <th style={{ padding: "10px 12px" }}>Payment</th>
                    <th style={{ padding: "10px 12px" }}>Status</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.orders || [])
                    .filter((o) => !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase()))
                    .map((o) => (
                      <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0f172a" }}>{o.id}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <div style={{ fontWeight: 600, color: "#1e293b" }}>{o.customer}</div>
                          <div style={{ fontSize: 11, color: "#64748b" }}>{o.phone}</div>
                        </td>
                        <td style={{ padding: "10px 12px", color: "#334155" }}>{o.product}</td>
                        <td style={{ padding: "10px 12px", fontWeight: 700 }}>{money(o.amount)}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: o.paymentStatus === "paid" ? "#dcfce7" : "#fef3c7", color: o.paymentStatus === "paid" ? "#166534" : "#b45309" }}>
                            {o.paymentMethod} • {o.paymentStatus}
                          </span>
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: o.orderStatus === "delivered" ? "#dcfce7" : o.orderStatus === "returned" ? "#fee2e2" : "#e0f2fe", color: o.orderStatus === "delivered" ? "#166534" : o.orderStatus === "returned" ? "#b91c1c" : "#0369a1", textTransform: "capitalize" }}>
                            {o.orderStatus}
                          </span>
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: 6 }}>
                            <button
                              type="button"
                              onClick={() => {
                                setModalItem(o);
                                setActiveModal("invoice");
                              }}
                              title="Print Invoice"
                              style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
                            >
                              🧾 Invoice
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const next = o.orderStatus === "processing" ? "shipped" : o.orderStatus === "shipped" ? "delivered" : "processing";
                                o.orderStatus = next;
                                notify(`Order ${o.id} transitioned to ${next}!`);
                              }}
                              title="Next status"
                              style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
                            >
                              Status ↷
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: CUSTOMERS                                */}
        {/* ======================================================== */}
        {moduleKey === "customers" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16 }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 12px" }}>Customer</th>
                    <th style={{ padding: "10px 12px" }}>Contact</th>
                    <th style={{ padding: "10px 12px" }}>City</th>
                    <th style={{ padding: "10px 12px" }}>Total Orders</th>
                    <th style={{ padding: "10px 12px" }}>Total Spent</th>
                    <th style={{ padding: "10px 12px" }}>Tier</th>
                    <th style={{ padding: "10px 12px" }}>Status</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.customers || []).map((c) => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0f172a" }}>{c.name}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <div>{c.email}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{c.phone}</div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>{c.city}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 600 }}>{c.totalOrders}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 700 }}>{money(c.totalSpent)}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: c.type === "vip" ? "#fef3c7" : "#e0f2fe", color: c.type === "vip" ? "#b45309" : "#0369a1", textTransform: "uppercase" }}>
                          {c.type}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: c.status === "active" ? "#dcfce7" : "#fee2e2", color: c.status === "active" ? "#166534" : "#b91c1c" }}>
                          {c.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => {
                            c.status = c.status === "active" ? "blocked" : "active";
                            notify(`Customer ${c.name} ${c.status}!`);
                          }}
                          style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontSize: 11 }}
                        >
                          {c.status === "active" ? "Block" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: INVENTORY                                */}
        {/* ======================================================== */}
        {moduleKey === "inventory" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {["all", "available", "low-stock", "out-of-stock"].map((st) => (
                <button
                  key={st}
                  onClick={() => router.push(`/admin/inventory${st === "all" ? "" : `?status=${st}`}`)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    background: (filterParam || "all") === st ? "#DC2564" : "#f1f5f9",
                    color: (filterParam || "all") === st ? "#fff" : "#475569",
                    textTransform: "capitalize",
                  }}
                >
                  {st.replace(/-/g, " ")}
                </button>
              ))}
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 12px" }}>Product Name</th>
                    <th style={{ padding: "10px 12px" }}>SKU</th>
                    <th style={{ padding: "10px 12px" }}>Category</th>
                    <th style={{ padding: "10px 12px" }}>Stock</th>
                    <th style={{ padding: "10px 12px" }}>Unit Price</th>
                    <th style={{ padding: "10px 12px" }}>Total Worth</th>
                    <th style={{ padding: "10px 12px" }}>Status</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.inventory || []).map((inv) => (
                    <tr key={inv.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0f172a" }}>{inv.name}</td>
                      <td style={{ padding: "10px 12px", color: "#64748b" }}>{inv.sku}</td>
                      <td style={{ padding: "10px 12px" }}>{inv.category}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 800, color: inv.stock <= 3 ? "#dc2626" : "#16a34a" }}>
                        {inv.stock}
                      </td>
                      <td style={{ padding: "10px 12px" }}>{money(inv.unitPrice)}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 700 }}>{money(inv.totalValue)}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: inv.stock <= 0 ? "#fee2e2" : inv.stock <= 3 ? "#fef3c7" : "#dcfce7", color: inv.stock <= 0 ? "#b91c1c" : inv.stock <= 3 ? "#b45309" : "#166534" }}>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => {
                            const add = prompt(`Add stock quantity for ${inv.name}:`, "5");
                            if (add && !isNaN(Number(add))) {
                              inv.stock += Number(add);
                              inv.totalValue = inv.stock * inv.unitPrice;
                              notify(`Added ${add} units to ${inv.name}`);
                            }
                          }}
                          style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600 }}
                        >
                          + Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: COUPONS                                  */}
        {/* ======================================================== */}
        {moduleKey === "coupons" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {(data?.coupons || []).map((cpn) => (
                <div key={cpn.id} style={{ border: "2px dashed #cbd5e1", borderRadius: 10, padding: 16, background: "#f8fafc" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#DC2564", letterSpacing: 1 }}>{cpn.code}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: 10 }}>
                      {cpn.status}
                    </span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 13, color: "#334155" }}>
                    {cpn.type === "percentage" ? `${cpn.value}% OFF` : cpn.type === "fixed" ? `₹${cpn.value} Flat Discount` : "Free Shipping Coupon"}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                    Min Order: ₹{cpn.minOrder} • Used {cpn.usageCount} times • Valid till {cpn.expiry}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: AI & AUTOMATION STUDIO                   */}
        {/* ======================================================== */}
        {moduleKey === "ai" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Sparkles size={20} color="#7c3aed" />
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
                AI Product Copy &amp; SEO Meta Generator (Gemini Powered)
              </h3>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px" }}>
              Generate certified product descriptions, technical condition specifications, and Google-optimized meta tags automatically.
            </p>

            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Enter product model, e.g. Samsung Galaxy S24 Ultra 5G"
                style={{ flex: 1, padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13 }}
              />
              <button
                type="button"
                disabled={aiGenerating}
                onClick={async () => {
                  setAiGenerating(true);
                  try {
                    const res = await fetch("/api/admin/ai/generate-copy", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ title: aiPrompt }),
                    });
                    const d = await res.json();
                    setAiResult(d.data);
                    notify("AI content generated successfully!");
                  } catch (e) {
                    setError("AI generation failed");
                  } finally {
                    setAiGenerating(false);
                  }
                }}
                style={{
                  padding: "10px 20px",
                  background: "#7c3aed",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {aiGenerating ? "Generating..." : "✨ Generate AI Copy"}
              </button>
            </div>

            {aiResult && (
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16 }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 800, color: "#0f172a" }}>{aiResult.title}</h4>
                <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.5, margin: "0 0 12px" }}>{aiResult.shortDescription}</p>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>
                  <strong>SEO Title:</strong> {aiResult.seoTitle}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  <strong>Meta Description:</strong> {aiResult.metaDescription}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: SUPPORT TICKETS                          */}
        {/* ======================================================== */}
        {moduleKey === "support" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16 }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 12px" }}>Ticket ID</th>
                    <th style={{ padding: "10px 12px" }}>Customer</th>
                    <th style={{ padding: "10px 12px" }}>Subject</th>
                    <th style={{ padding: "10px 12px" }}>Priority</th>
                    <th style={{ padding: "10px 12px" }}>Assigned</th>
                    <th style={{ padding: "10px 12px" }}>Status</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.tickets || []).map((t) => (
                    <tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 700 }}>{t.id}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ fontWeight: 600 }}>{t.customer}</div>
                        <div style={{ fontSize: 11, color: "#64748b" }}>{t.email}</div>
                      </td>
                      <td style={{ padding: "10px 12px", maxWidth: 220 }}>{t.subject}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: t.priority === "high" ? "#fee2e2" : "#fef3c7", color: t.priority === "high" ? "#b91c1c" : "#b45309" }}>
                          {t.priority}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>{t.assignedTo}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: t.status === "resolved" ? "#dcfce7" : "#e0f2fe", color: t.status === "resolved" ? "#166534" : "#0369a1" }}>
                          {t.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => {
                            t.status = t.status === "resolved" ? "open" : "resolved";
                            notify(`Ticket ${t.id} marked as ${t.status}!`);
                          }}
                          style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid #cbd5e1", background: "#fff", cursor: "pointer", fontSize: 11 }}
                        >
                          {t.status === "resolved" ? "Reopen" : "Resolve"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: RETURNS & REFUNDS                        */}
        {/* ======================================================== */}
        {moduleKey === "returns" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 16 }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 12px" }}>Return ID</th>
                    <th style={{ padding: "10px 12px" }}>Order</th>
                    <th style={{ padding: "10px 12px" }}>Customer</th>
                    <th style={{ padding: "10px 12px" }}>Product</th>
                    <th style={{ padding: "10px 12px" }}>Reason</th>
                    <th style={{ padding: "10px 12px" }}>Refund Amount</th>
                    <th style={{ padding: "10px 12px" }}>Status</th>
                    <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.returns || []).map((ret) => (
                    <tr key={ret.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 700 }}>{ret.id}</td>
                      <td style={{ padding: "10px 12px", color: "#64748b" }}>{ret.orderId}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 600 }}>{ret.customer}</td>
                      <td style={{ padding: "10px 12px" }}>{ret.product}</td>
                      <td style={{ padding: "10px 12px", color: "#64748b" }}>{ret.reason}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 700 }}>{money(ret.refundAmount)}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: ret.status === "approved" ? "#dcfce7" : "#fef3c7", color: ret.status === "approved" ? "#166534" : "#b45309" }}>
                          {ret.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>
                        {ret.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => {
                              ret.status = "approved";
                              notify(`Return ${ret.id} approved and stock restoration triggered!`);
                            }}
                            style={{ padding: "4px 8px", borderRadius: 4, background: "#166534", color: "#fff", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700 }}
                          >
                            ✓ Approve Return
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SPECIFIC VIEW: SETTINGS & GENERAL MODULES               */}
        {/* ======================================================== */}
        {["settings", "tax", "seo"].includes(moduleKey) && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 20 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
              Enterprise Configuration: {moduleKey.toUpperCase()}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {moduleKey === "tax" && data?.taxSettings && (
                <>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Company GSTIN</label>
                    <input defaultValue={data.taxSettings.gstin} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Standard IGST Rate (%)</label>
                    <input defaultValue={data.taxSettings.igst} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }} />
                  </div>
                </>
              )}

              {moduleKey === "seo" && data?.seoSettings && (
                <>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Global SEO Meta Title</label>
                    <input defaultValue={data.seoSettings.metaTitle} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Meta Description</label>
                    <textarea defaultValue={data.seoSettings.metaDescription} rows={3} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }} />
                  </div>
                </>
              )}

              {moduleKey === "settings" && data?.settings && (
                <>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Store Legal Name</label>
                    <input defaultValue={data.settings.storeName} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Support Contact Email</label>
                    <input defaultValue={data.settings.storeEmail} style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }} />
                  </div>
                </>
              )}
            </div>

            <div style={{ marginTop: 20 }}>
              <button
                type="button"
                onClick={() => notify(`${moduleKey.toUpperCase()} settings saved successfully!`)}
                style={{ padding: "10px 20px", background: "#DC2564", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}
              >
                Save {moduleKey.toUpperCase()} Settings
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* INVOICE MODAL (PRINTABLE / DOWNLOADABLE)                */}
        {/* ======================================================== */}
        {activeModal === "invoice" && modalItem && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: 16,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                maxWidth: 640,
                width: "100%",
                padding: 24,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: 12, marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#0f172a" }}>Tax Invoice - {modalItem.id}</h3>
                  <div style={{ fontSize: 11, color: "#64748b" }}>SELLBAR Certified Refurbished Recommerce</div>
                </div>
                <button type="button" onClick={() => setActiveModal(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>
                  ✕
                </button>
              </div>

              <div style={{ fontSize: 13, lineHeight: 1.6, color: "#334155", marginBottom: 16 }}>
                <div><strong>Billed To:</strong> {modalItem.customer}</div>
                <div><strong>Phone / Contact:</strong> {modalItem.phone}</div>
                <div><strong>Delivery Address:</strong> {modalItem.address || "West Champaran, Bihar - 845438"}</div>
                <div><strong>Tracking Number:</strong> {modalItem.trackingNumber || "TRK-IN-849201"}</div>
              </div>

              <div style={{ background: "#f8fafc", padding: 12, borderRadius: 8, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                  <span>{modalItem.product}</span>
                  <span>{money(modalItem.amount)}</span>
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>Qty: 1 • Includes 18% GST &amp; 12M Doorstep Warranty</div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{ padding: "8px 16px", background: "#DC2564", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <Printer size={14} /> Print Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{ padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelShell>
  );
}

export default function UniversalAdminModulePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-slate-500 font-medium">Loading module...</div>}>
      <UniversalAdminModuleContent />
    </React.Suspense>
  );
}

