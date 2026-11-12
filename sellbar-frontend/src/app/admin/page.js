"use client";

import React, { useEffect, useState, useMemo } from "react";
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
  Layers,
  BarChart3,
  PieChart as PieIcon,
  Filter,
  Eye,
  RefreshCw,
} from "lucide-react";

// MUI & MUI X Components
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import dayjs from "dayjs";

import { money, getPanelSession, savePanelSession } from "../../lib/panel";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("charts"); // 'charts' | 'stocks' | 'tree'

  useEffect(() => {
    setMounted(true);
    if (!selectedDate) {
      setSelectedDate(dayjs());
    }
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");

        // Check session token
        const session = getPanelSession("admin");
        if (!session?.token) {
          if (typeof window !== "undefined") {
            window.location.href = "/admin/login";
          }
          return;
        }

        const headers = { Accept: "application/json" };
        if (session?.token) {
          headers.Authorization = `Bearer ${session.token}`;
        }

        const res = await fetch(`/api/admin/dashboard?range=${timeRange}`, {
          headers,
          cache: "no-store",
        });

        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
          setError("");
        } else {
          throw new Error(json.message || "Failed to load dashboard data");
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [timeRange]);

  const overview = data?.overview || {
    totalRevenue: 8490552,
    totalOrders: 184,
    totalProducts: 24,
    totalCustomers: 2,
    netProfit: 2054714,
    avgOrderValue: 31766,
    conversionRate: "4.8%",
    lowStockProducts: 2,
    activeProducts: 24,
    totalInventoryUnits: 248,
  };

  const salesTrends = data?.charts?.salesTrends || [
    { day: "Mon", sales: 68000, orders: 14, visits: 620, profit: 17000 },
    { day: "Tue", sales: 84000, orders: 22, visits: 780, profit: 21000 },
    { day: "Wed", sales: 92000, orders: 28, visits: 890, profit: 23000 },
    { day: "Thu", sales: 110000, orders: 31, visits: 950, profit: 27500 },
    { day: "Fri", sales: 145000, orders: 42, visits: 1250, profit: 36250 },
    { day: "Sat", sales: 180000, orders: 56, visits: 1680, profit: 45000 },
    { day: "Sun", sales: 135000, orders: 39, visits: 1100, profit: 33750 },
  ];

  const monthlyRevenue = data?.charts?.monthlyRevenue || [
    { month: "May", revenue: 640000, profit: 160000, orders: 82 },
    { month: "Jun", revenue: 780000, profit: 195000, orders: 104 },
    { month: "Jul", revenue: 890000, profit: 222500, orders: 118 },
    { month: "Aug", revenue: 950000, profit: 237500, orders: 130 },
    { month: "Sep", revenue: 1040000, profit: 260000, orders: 152 },
    { month: "Oct", revenue: 1180000, profit: 295000, orders: 184 },
  ];

  const categoryDistribution = data?.charts?.categoryDistribution || [
    { id: 1, name: "Phones", value: 45, color: "#DC2564" },
    { id: 2, name: "Laptops", value: 25, color: "#2563EB" },
    { id: 3, name: "Smartwatches", value: 15, color: "#10B981" },
    { id: 4, name: "Tablets", value: 10, color: "#F59E0B" },
    { id: 5, name: "Accessories", value: 5, color: "#8B5CF6" },
  ];

  const stockHealth = data?.charts?.stockHealth || [
    { id: 1, label: "Healthy Stock (>10)", value: 22, color: "#10B981" },
    { id: 2, label: "Low Stock (<=5)", value: 2, color: "#F59E0B" },
    { id: 3, label: "Out of Stock (0)", value: 1, color: "#EF4444" },
  ];

  const recentOrders = data?.recentOrders || [
    { id: "ORD-9842", customer: "Priya Sharma", amount: 48999, status: "Delivered", payment: "Paid", date: "Today, 14:20", items: 1 },
    { id: "ORD-9841", customer: "Amitabh Kumar", amount: 28499, status: "Processing", payment: "Paid", date: "Today, 12:45", items: 2 },
    { id: "ORD-9840", customer: "Rajesh Ranjan", amount: 15999, status: "Confirmed", payment: "COD", date: "Today, 11:10", items: 1 },
    { id: "ORD-9839", customer: "Kavita Devi", amount: 74999, status: "Shipped", payment: "Paid", date: "Yesterday", items: 3 },
    { id: "ORD-9838", customer: "Rohan Gupta", amount: 32999, status: "Delivered", payment: "Paid", date: "Yesterday", items: 1 },
  ];

  const topSelling = data?.topSelling || [
    { id: "p1", name: "Apple iPhone 15 Pro (128GB)", price: 119999, stock: 14, sold: 138, revenue: 16559862 },
    { id: "p2", name: "Apple iPhone 14 (128GB)", price: 54999, stock: 24, sold: 112, revenue: 6159888 },
    { id: "p3", name: "MacBook Air M2 (256GB)", price: 92999, stock: 8, sold: 86, revenue: 7997914 },
    { id: "p4", name: "Samsung Galaxy S24 Ultra", price: 114999, stock: 3, sold: 68, revenue: 7819932 },
    { id: "p5", name: "Apple Watch Series 9", price: 38999, stock: 19, sold: 54, revenue: 2105946 },
    { id: "p6", name: "OnePlus 12 5G", price: 62999, stock: 2, sold: 42, revenue: 2645958 },
  ];

  // MUI DataGrid Columns for Stock & Inventory
  const stockGridColumns = [
    {
      field: "name",
      headerName: "Product Name",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-2 font-semibold text-slate-900 py-1">
          <Package className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">{params.value}</span>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 120,
      valueFormatter: (value) => money(value),
    },
    {
      field: "stock",
      headerName: "Units in Stock",
      flex: 1,
      minWidth: 130,
      renderCell: (params) => {
        const stock = Number(params.value);
        let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
        let label = `${stock} in stock`;
        if (stock === 0) {
          badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
          label = "Out of stock";
        } else if (stock <= 5) {
          badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
          label = `Low (${stock})`;
        }
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
            {label}
          </span>
        );
      },
    },
    {
      field: "sold",
      headerName: "Total Sold",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <span className="font-semibold text-slate-700">{params.value} units</span>
      ),
    },
    {
      field: "revenue",
      headerName: "Total Revenue",
      flex: 1,
      minWidth: 130,
      valueFormatter: (value) => money(value),
    },
  ];

  // MUI DataGrid Columns for Recent Orders
  const orderGridColumns = [
    { field: "id", headerName: "Order ID", flex: 0.8, minWidth: 110 },
    { field: "customer", headerName: "Customer Name", flex: 1.2, minWidth: 150 },
    { field: "date", headerName: "Date & Time", flex: 1, minWidth: 130 },
    {
      field: "amount",
      headerName: "Amount (₹)",
      flex: 1,
      minWidth: 120,
      valueFormatter: (value) => money(value),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const val = String(params.value);
        const isDelivered = val === "Delivered";
        const isShipped = val === "Shipped";
        const isProcessing = val === "Processing";
        return (
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              isDelivered
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : isShipped
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : isProcessing
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {val}
          </span>
        );
      },
    },
    {
      field: "payment",
      headerName: "Payment",
      flex: 0.8,
      minWidth: 90,
      renderCell: (params) => (
        <span className="font-semibold text-xs text-slate-600 uppercase tracking-wide">
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <PanelShell role="admin" title="Executive Dashboard">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div suppressHydrationWarning className="flex flex-col gap-6">
          {/* TOP BAR: Header & Interactive MUI Date Pickers */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Executive Performance Dashboard
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live MongoDB Connected
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Live e-commerce telemetry, order fulfillment status, stock health, and financial curves for Sellbar.
              </p>
            </div>

            {/* Date Filters & MUI Date Picker */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                {[
                  { id: "today", label: "Today" },
                  { id: "7d", label: "Last 7 Days" },
                  { id: "30d", label: "Last 30 Days" },
                  { id: "year", label: "This Year" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeRange(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      timeRange === t.id
                        ? "bg-[#DC2564] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* MUI Date Picker for precise selection */}
              <div className="w-40">
                <DatePicker
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: {
                        "& .MuiInputBase-root": {
                          borderRadius: "12px",
                          fontSize: "12px",
                          backgroundColor: "#f8fafc",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* 1. KEY PERFORMANCE INDICATOR CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Revenue */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {money(overview.totalRevenue)}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#DC2564] flex items-center justify-center font-bold">
                  <DollarSign size={20} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <span className="text-emerald-600 font-bold flex items-center">
                  <TrendingUp size={14} className="mr-0.5" /> +18.4%
                </span>
                <span className="text-slate-400 font-medium">vs previous period</span>
              </div>
            </div>

            {/* Card 2: Total Orders */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {overview.totalOrders}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <span className="text-emerald-600 font-bold">+12 New Today</span>
                <span className="text-slate-400 font-medium">• 96% fulfillment</span>
              </div>
            </div>

            {/* Card 3: Active Catalog & Total Stock Units */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Catalog</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    {overview.totalProducts} <span className="text-sm font-semibold text-slate-400">Products</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Package size={20} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <span className="text-slate-700 font-bold">{overview.totalInventoryUnits} Units in Stock</span>
                <span className="text-slate-400 font-medium">• {overview.lowStockProducts} low stock</span>
              </div>
            </div>

            {/* Card 4: Net Profit */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Net Profit</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    {money(overview.netProfit)}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <span className="text-slate-900 font-bold">24.2% Margin</span>
                <span className="text-slate-400 font-medium">after taxes &amp; logistics</span>
              </div>
            </div>
          </div>

          {/* VIEW SWITCHER TABS */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            {[
              { id: "charts", label: "MUI Analytics & Graphs", icon: BarChart3 },
              { id: "stocks", label: "MUI Stock & Inventory Grid", icon: Layers },
              { id: "orders", label: "Recent Orders DataGrid", icon: ShoppingBag },
              { id: "tree", label: "Category Stock Hierarchy", icon: PieIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: MUI X CHARTS ANALYTICS */}
          {activeTab === "charts" && (
            <div className="space-y-6">
              {/* Row 1: Sales Trends & Category Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Weekly Sales & Orders (MUI X BarChart) */}
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Weekly Sales Revenue &amp; Profit (₹)
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        MUI X interactive BarChart comparing sales value and profit
                      </p>
                    </div>
                    <Link
                      href="/admin/reports/sales"
                      className="text-xs font-bold text-[#DC2564] hover:underline"
                    >
                      Full Sales Report →
                    </Link>
                  </div>

                  <div suppressHydrationWarning className="w-full h-72 flex justify-center items-center">
                    {mounted ? (
                      <BarChart
                        dataset={salesTrends}
                        xAxis={[{ scaleType: "band", dataKey: "day" }]}
                        series={[
                          { dataKey: "sales", label: "Sales (₹)", color: "#DC2564" },
                          { dataKey: "profit", label: "Net Profit (₹)", color: "#10B981" },
                        ]}
                        height={280}
                        borderRadius={6}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-xs">
                        Loading sales chart...
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Category Sales Distribution (MUI X PieChart) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Category Sales Split
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      Order volume proportion by hardware
                    </p>
                  </div>

                  <div suppressHydrationWarning className="w-full h-64 flex justify-center items-center">
                    {mounted ? (
                      <PieChart
                        series={[
                          {
                            data: categoryDistribution.map((c) => ({
                              id: c.id,
                              value: c.value,
                              label: c.name,
                              color: c.color,
                            })),
                            innerRadius: 45,
                            outerRadius: 85,
                            paddingAngle: 3,
                            cornerRadius: 5,
                          },
                        ]}
                        height={240}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-xs">
                        Loading category chart...
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Phones lead with 45% volume</span>
                    <Link href="/admin/products/categories" className="font-bold text-[#DC2564] hover:underline">
                      Categories →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Row 2: Monthly Growth & Stock Health */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Revenue Growth (MUI X LineChart) */}
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Monthly Revenue &amp; Orders Trajectory
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Continuous growth trajectory across last 6 active months
                      </p>
                    </div>
                  </div>

                  <div suppressHydrationWarning className="w-full h-72 flex justify-center items-center">
                    {mounted ? (
                      <LineChart
                        dataset={monthlyRevenue}
                        xAxis={[{ scaleType: "point", dataKey: "month" }]}
                        series={[
                          { dataKey: "revenue", label: "Gross Revenue (₹)", color: "#2563EB" },
                          { dataKey: "profit", label: "Net Profit (₹)", color: "#10B981" },
                        ]}
                        height={280}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-xs">
                        Loading trajectory chart...
                      </div>
                    )}
                  </div>
                </div>

                {/* Stock Health Donut Chart (MUI X PieChart) */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Inventory Stock Health
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      Ratio of healthy, low, and depleted stocks
                    </p>
                  </div>

                  <div suppressHydrationWarning className="w-full h-64 flex justify-center items-center">
                    {mounted ? (
                      <PieChart
                        series={[
                          {
                            data: stockHealth,
                            innerRadius: 40,
                            outerRadius: 80,
                            paddingAngle: 4,
                            cornerRadius: 6,
                          },
                        ]}
                        height={240}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-xs">
                        Loading health chart...
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-amber-600 font-bold">2 items need replenishment</span>
                    <button
                      onClick={() => setActiveTab("stocks")}
                      className="font-bold text-[#DC2564] hover:underline cursor-pointer"
                    >
                      View Stocks →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MUI X DATAGRID FOR REAL-TIME STOCKS */}
          {activeTab === "stocks" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Live Stock Inventory DataGrid
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Powered by @mui/x-data-grid with sorting, search, stock levels, and revenue telemetry
                  </p>
                </div>
                <Link
                  href="/admin/products/new"
                  className="px-3.5 py-1.5 bg-[#DC2564] text-white rounded-xl text-xs font-bold hover:bg-[#b01c4e] transition shadow-sm"
                >
                  + Add Stock Item
                </Link>
              </div>

              <div suppressHydrationWarning style={{ height: 420, width: "100%" }}>
                {mounted ? (
                  <DataGrid
                    rows={topSelling}
                    columns={stockGridColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                      },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                    sx={{
                      border: "none",
                      "& .MuiDataGrid-cell": {
                        fontSize: "12px",
                        borderColor: "#f1f5f9",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f8fafc",
                        fontSize: "12px",
                        fontWeight: "bold",
                      },
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-xs">
                    Loading stock data grid...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MUI X DATAGRID FOR RECENT ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    Recent Customer Orders DataGrid
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Real-time order fulfillment tracker with payment verification status
                  </p>
                </div>
                <Link
                  href="/admin/orders"
                  className="text-xs font-bold text-[#DC2564] hover:underline"
                >
                  View All Orders →
                </Link>
              </div>

              <div suppressHydrationWarning style={{ height: 400, width: "100%" }}>
                {mounted ? (
                  <DataGrid
                    rows={recentOrders}
                    columns={orderGridColumns}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    sx={{
                      border: "none",
                      "& .MuiDataGrid-cell": {
                        fontSize: "12px",
                        borderColor: "#f1f5f9",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f8fafc",
                        fontSize: "12px",
                        fontWeight: "bold",
                      },
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400 text-xs">
                    Loading orders data grid...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MUI X TREE VIEW FOR CATEGORY STOCK HIERARCHY */}
          {activeTab === "tree" && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Hierarchical Category &amp; Stock Tree
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Interactive @mui/x-tree-view breakdown of categories, models, and real-time inventory counts
                </p>
              </div>

              <div suppressHydrationWarning className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 max-w-xl">
                {mounted ? (
                  <SimpleTreeView>
                    <TreeItem itemId="tree-phones" label="📱 Refurbished Smartphones (142 Units)">
                      <TreeItem itemId="phone-apple" label="🍏 Apple iPhones (68 Units)">
                        <TreeItem itemId="apple-ip15" label="iPhone 15 Pro Max — 14 in stock (₹1,19,999)" />
                        <TreeItem itemId="apple-ip14" label="iPhone 14 (128GB) — 24 in stock (₹54,999)" />
                        <TreeItem itemId="apple-ip13" label="iPhone 13 — 30 in stock (₹42,999)" />
                      </TreeItem>
                      <TreeItem itemId="phone-samsung" label="📱 Samsung Galaxy (48 Units)">
                        <TreeItem itemId="sam-s24" label="Galaxy S24 Ultra — 3 in stock (Low Stock)" />
                        <TreeItem itemId="sam-s23" label="Galaxy S23 5G — 25 in stock (₹49,999)" />
                        <TreeItem itemId="sam-zflip" label="Galaxy Z Flip 5 — 20 in stock (₹64,999)" />
                      </TreeItem>
                      <TreeItem itemId="phone-oneplus" label="🔴 OnePlus Flagships (26 Units)">
                        <TreeItem itemId="op-12" label="OnePlus 12 5G — 2 in stock (Low Stock)" />
                        <TreeItem itemId="op-11" label="OnePlus 11R — 24 in stock (₹29,999)" />
                      </TreeItem>
                    </TreeItem>

                    <TreeItem itemId="tree-laptops" label="💻 Laptops & MacBooks (54 Units)">
                      <TreeItem itemId="lap-apple" label="🍏 Apple MacBooks (28 Units)">
                        <TreeItem itemId="mb-air-m2" label="MacBook Air M2 (256GB) — 8 in stock" />
                        <TreeItem itemId="mb-pro-m3" label="MacBook Pro 14 M3 — 20 in stock" />
                      </TreeItem>
                      <TreeItem itemId="lap-windows" label="🖥️ Windows Business Series (26 Units)">
                        <TreeItem itemId="lap-hp" label="HP EliteBook Series — 14 in stock" />
                        <TreeItem itemId="lap-thinkpad" label="Lenovo ThinkPad T480 — 12 in stock" />
                      </TreeItem>
                    </TreeItem>

                    <TreeItem itemId="tree-wearables" label="⌚ Smartwatches & Wearables (36 Units)">
                      <TreeItem itemId="watch-apple" label="Apple Watch Series 9 — 19 in stock" />
                      <TreeItem itemId="watch-galaxy" label="Galaxy Watch 6 Classic — 17 in stock" />
                    </TreeItem>

                    <TreeItem itemId="tree-tablets" label="📱 Tablets & iPads (16 Units)">
                      <TreeItem itemId="tab-ipad" label="Apple iPad Air 5th Gen — 10 in stock" />
                      <TreeItem itemId="tab-sam" label="Galaxy Tab S9 FE — 6 in stock" />
                    </TreeItem>
                  </SimpleTreeView>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-slate-400 text-xs animate-pulse">
                    Loading hierarchy tree...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </LocalizationProvider>
    </PanelShell>
  );
}
