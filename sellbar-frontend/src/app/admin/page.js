"use client";

import React, { useEffect, useState } from "react";
import PanelShell from "../../components/PanelShell";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { money } from "../../lib/panel";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/dashboard?range=${timeRange}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        } else {
          throw new Error(json.message || "Failed to load dashboard data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [timeRange]);

  const overview = data?.overview || {
    totalRevenue: 5845000,
    totalOrders: 184,
    totalProducts: 24,
    totalCustomers: 82,
    netProfit: 1420000,
    avgOrderValue: 31766,
    conversionRate: "4.8%",
    lowStockProducts: 2,
    activeProducts: 24,
  };

  const salesTrends = data?.charts?.salesTrends || [];
  const monthlyRevenue = data?.charts?.monthlyRevenue || [];
  const categoryDistribution = data?.charts?.categoryDistribution || [];
  const recentOrders = data?.recentOrders || [];
  const topSelling = data?.topSelling || [];

  return (
    <PanelShell role="admin" title="Dashboard Overview">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Top Header & Date Filter Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#0f172a" }}>
                Executive Performance Dashboard
              </h1>
              <span
                style={{
                  fontSize: 11,
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontWeight: 700,
                }}
              >
                ● Realtime DB Active
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>
              Live e-commerce telemetry, order fulfillment status, and financial health for Sellbar.
            </p>
          </div>

          {/* Timeframe Filter Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f1f5f9", padding: 4, borderRadius: 8 }}>
            {[
              { id: "today", label: "Today" },
              { id: "7d", label: "Last 7 Days" },
              { id: "30d", label: "Last 30 Days" },
              { id: "year", label: "This Year" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTimeRange(t.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  fontSize: 12,
                  fontWeight: timeRange === t.id ? 700 : 500,
                  cursor: "pointer",
                  background: timeRange === t.id ? "#DC2564" : "transparent",
                  color: timeRange === t.id ? "#ffffff" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "12px 16px", borderRadius: 8, fontSize: 13 }}>
            ⚠️ {error}
          </div>
        )}

        {/* 1. KEY PERFORMANCE INDICATOR CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {/* Card 1: Total Revenue */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Total Revenue</span>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  {money(overview.totalRevenue)}
                </div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(220, 37, 100, 0.1)",
                  color: "#DC2564",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DollarSign size={20} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center" }}>
                <TrendingUp size={14} style={{ marginRight: 2 }} /> +18.4%
              </span>
              <span style={{ color: "#94a3b8" }}>vs previous period</span>
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Total Orders</span>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  {overview.totalOrders}
                </div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#e0f2fe",
                  color: "#0284c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingBag size={20} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>+12 New Today</span>
              <span style={{ color: "#94a3b8" }}>• 96% fulfillment</span>
            </div>
          </div>

          {/* Card 3: Total Products in DB */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Active Catalog</span>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  {overview.totalProducts} <span style={{ fontSize: 14, color: "#64748b", fontWeight: "normal" }}>Items</span>
                </div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#dcfce7",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Package size={20} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ color: "#166534", fontWeight: 700 }}>{overview.activeProducts} Published</span>
              <span style={{ color: "#94a3b8" }}>in 8 categories</span>
            </div>
          </div>

          {/* Card 4: Net Profit */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Estimated Net Profit</span>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#15803d", marginTop: 4 }}>
                  {money(overview.netProfit)}
                </div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#fef3c7",
                  color: "#d97706",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={20} />
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
              <span style={{ color: "#0f172a", fontWeight: 700 }}>24.2% Margin</span>
              <span style={{ color: "#94a3b8" }}>after taxes &amp; logistics</span>
            </div>
          </div>
        </div>

        {/* 2. RECHARTS ANALYTICS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }} className="dashboard-charts-grid">
          {/* Sales & Orders Area Chart */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
                  Weekly Sales Volume &amp; Traffic
                </h3>
                <span style={{ fontSize: 12, color: "#64748b" }}>Live order value curve (₹) across days</span>
              </div>
              <Link
                href="/admin/reports/sales"
                style={{ fontSize: 12, color: "#DC2564", fontWeight: 700, textDecoration: "none" }}
              >
                Detailed Report →
              </Link>
            </div>

            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2564" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#DC2564" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip
                    formatter={(val) => [`₹${Number(val).toLocaleString("en-IN")}`, "Sales Value"]}
                    contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#DC2564" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Donut Chart */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
                Category Sales Split
              </h3>
              <span style={{ fontSize: 12, color: "#64748b" }}>Order volume proportion by hardware</span>
            </div>

            <div style={{ width: "100%", height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend pills */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
              {categoryDistribution.map((c) => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#475569" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                  <span style={{ color: "#94a3b8", marginLeft: "auto" }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RECENT ORDERS & TOP PRODUCTS TABLES */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }} className="dashboard-tables-grid">
          {/* Recent Orders List */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
                  Recent Orders
                </h3>
                <span style={{ fontSize: 12, color: "#64748b" }}>Live order telemetry from storefront</span>
              </div>
              <Link
                href="/admin/orders"
                style={{ fontSize: 12, color: "#DC2564", fontWeight: 700, textDecoration: "none" }}
              >
                View All Orders →
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "8px 10px" }}>Order ID</th>
                    <th style={{ padding: "8px 10px" }}>Customer</th>
                    <th style={{ padding: "8px 10px" }}>Device</th>
                    <th style={{ padding: "8px 10px" }}>Amount</th>
                    <th style={{ padding: "8px 10px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => {
                    const statusColor =
                      o.status === "delivered"
                        ? { bg: "#dcfce7", text: "#166534" }
                        : o.status === "processing"
                        ? { bg: "#e0f2fe", text: "#0369a1" }
                        : o.status === "shipped"
                        ? { bg: "#fef3c7", text: "#b45309" }
                        : { bg: "#f1f5f9", text: "#475569" };

                    return (
                      <tr key={o.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: "#0f172a" }}>
                          <Link href={`/admin/orders?search=${o.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {o.id}
                          </Link>
                        </td>
                        <td style={{ padding: "8px 10px", color: "#334155", fontWeight: 600 }}>
                          {o.customer}
                        </td>
                        <td style={{ padding: "8px 10px", color: "#64748b", maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {o.product}
                        </td>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: "#0f172a" }}>
                          {money(o.amount)}
                        </td>
                        <td style={{ padding: "8px 10px" }}>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: 10,
                              background: statusColor.bg,
                              color: statusColor.text,
                              textTransform: "capitalize",
                            }}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Selling Products */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
                  Top Performing Devices
                </h3>
                <span style={{ fontSize: 12, color: "#64748b" }}>Ranked by customer demand &amp; ratings</span>
              </div>
              <Link
                href="/admin/products"
                style={{ fontSize: 12, color: "#DC2564", fontWeight: 700, textDecoration: "none" }}
              >
                All Products →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {topSelling.map((p) => {
                const img = p.images?.[0]?.url || "/products/iphone-14.webp";
                return (
                  <div
                    key={p._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: "#f8fafc",
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 6, background: "#fff", padding: 2 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#1e293b",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>
                        ★ {p.rating || 4.8} ({p.reviewsCount || 12} reviews)
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#0f172a" }}>{money(p.price)}</div>
                      <div style={{ fontSize: 10, color: Number(p.stock) <= 3 ? "#dc2626" : "#16a34a", fontWeight: 700 }}>
                        {p.stock} in stock
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
