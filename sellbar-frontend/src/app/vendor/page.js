"use client";

import React, { useEffect, useState } from "react";
import PanelShell from "../../components/PanelShell";
import Link from "next/link";
import {
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  ShoppingBag,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
} from "lucide-react";

// MUI & MUI X Components
import { BarChart, PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { money, panelRequest } from "../../lib/panel";

export default function VendorDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!selectedDate) setSelectedDate(dayjs());
  }, [selectedDate]);

  const loadVendorData = async (session) => {
    try {
      setLoading(true);
      setError("");
      const res = await panelRequest("/vendor/dashboard", { token: session?.token });
      setData(res?.stats || res?.data || res);
    } catch (err) {
      console.warn("Using sample vendor telemetry fallback:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const stats = data || {
    totalProducts: 18,
    activeProducts: 15,
    draftProducts: 2,
    outOfStockProducts: 1,
    totalEarnings: 845000,
    monthlySales: 168000,
    fulfillmentRate: "98.5%",
  };

  const vendorSalesTrends = [
    { day: "Mon", sales: 24000, orders: 4 },
    { day: "Tue", sales: 38000, orders: 7 },
    { day: "Wed", sales: 29000, orders: 5 },
    { day: "Thu", sales: 42000, orders: 8 },
    { day: "Fri", sales: 58000, orders: 11 },
    { day: "Sat", sales: 74000, orders: 15 },
    { day: "Sun", sales: 49000, orders: 9 },
  ];

  const vendorStatusBreakdown = [
    { id: 1, value: stats.activeProducts || 15, label: "Active Listed", color: "#10B981" },
    { id: 2, value: stats.draftProducts || 2, label: "Draft / In Review", color: "#F59E0B" },
    { id: 3, value: stats.outOfStockProducts || 1, label: "Out of Stock", color: "#EF4444" },
  ];

  const vendorProducts = [
    { id: "vp-1", name: "Apple iPhone 13 (128GB - Midnight)", category: "Smartphones", price: 42999, stock: 12, sold: 48, status: "Active" },
    { id: "vp-2", name: "Samsung Galaxy S22 5G (Phantom White)", category: "Smartphones", price: 34999, stock: 8, sold: 34, status: "Active" },
    { id: "vp-3", name: "MacBook Air M1 (2020 - 8GB / 256GB)", category: "Laptops", price: 58999, stock: 4, sold: 19, status: "Low Stock" },
    { id: "vp-4", name: "Apple Watch SE (2nd Gen - 44mm)", category: "Smartwatches", price: 21999, stock: 15, sold: 26, status: "Active" },
    { id: "vp-5", name: "Dell Latitude 7490 (Core i5 8th Gen)", category: "Laptops", price: 22499, stock: 0, sold: 14, status: "Out of Stock" },
  ];

  const productColumns = [
    {
      field: "name",
      headerName: "Product Name",
      flex: 1.5,
      minWidth: 220,
      renderCell: (params) => (
        <div className="flex items-center gap-2 font-semibold text-slate-900 py-1">
          <Package className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">{params.value}</span>
        </div>
      ),
    },
    { field: "category", headerName: "Category", flex: 1, minWidth: 120 },
    {
      field: "price",
      headerName: "Selling Price",
      flex: 1,
      minWidth: 120,
      valueFormatter: (value) => money(value),
    },
    {
      field: "stock",
      headerName: "In Stock",
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => {
        const val = Number(params.value);
        return (
          <span className={`font-bold ${val === 0 ? "text-rose-600" : val <= 5 ? "text-amber-600" : "text-emerald-700"}`}>
            {val} units
          </span>
        );
      },
    },
    {
      field: "status",
      headerName: "Listing Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const val = String(params.value);
        const isActive = val === "Active";
        const isLow = val === "Low Stock";
        return (
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : isLow
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
          >
            {val}
          </span>
        );
      },
    },
  ];

  return (
    <PanelShell role="vendor" title="Vendor Partner Hub">
      {(session) => {
        if (!data && !error && session) {
          loadVendorData(session);
        }

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-col gap-6">
              {/* Top Bar Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                      Vendor Merchant Dashboard
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Store Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Welcome back, {session?.name || "Merchant Partner"}! Track your sales, stock levels, and payout timelines.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/vendor/products/new"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#DC2564] text-white rounded-xl text-xs font-bold hover:bg-[#b01c4e] transition shadow-sm"
                  >
                    <Plus size={14} />
                    <span>Upload Product</span>
                  </Link>
                </div>
              </div>

              {/* 1. KPI PERFORMANCE CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Earnings</span>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {money(stats.totalEarnings || 845000)}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#DC2564] flex items-center justify-center font-bold">
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                    <TrendingUp size={14} /> +14.2% this month
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Catalog</span>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {stats.activeProducts || 15} <span className="text-sm font-semibold text-slate-400">Items</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package size={20} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    {stats.draftProducts || 2} in review • 1 out of stock
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weekly Dispatches</span>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        59 <span className="text-sm font-semibold text-slate-400">Orders</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ShoppingBag size={20} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                    98.5% on-time fulfillment
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Payout</span>
                      <div className="text-2xl font-black text-emerald-600 mt-1">
                        {money(142500)}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Sparkles size={20} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    Scheduled for Friday via NEFT
                  </div>
                </div>
              </div>

              {/* 2. MUI X CHARTS FOR VENDOR */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Vendor Weekly Sales Volume (₹)
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Powered by @mui/x-charts BarChart
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-72 flex justify-center items-center">
                    <BarChart
                      dataset={vendorSalesTrends}
                      xAxis={[{ scaleType: "band", dataKey: "day" }]}
                      series={[
                        { dataKey: "sales", label: "Gross Sales (₹)", color: "#DC2564" },
                      ]}
                      height={280}
                      borderRadius={6}
                    />
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Listing Status Split
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      Ratio of published, draft &amp; depleted items
                    </p>
                  </div>

                  <div className="w-full h-64 flex justify-center items-center">
                    <PieChart
                      series={[
                        {
                          data: vendorStatusBreakdown,
                          innerRadius: 40,
                          outerRadius: 80,
                          paddingAngle: 4,
                          cornerRadius: 6,
                        },
                      ]}
                      height={240}
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>15 items generating revenue</span>
                    <Link href="/vendor/products" className="font-bold text-[#DC2564] hover:underline">
                      View All →
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3. MUI X DATAGRID FOR VENDOR PRODUCTS */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Vendor Inventory &amp; Live Stock Tracker
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Powered by @mui/x-data-grid with sorting, status indicators, and price management
                    </p>
                  </div>
                  <Link
                    href="/vendor/products"
                    className="text-xs font-bold text-[#DC2564] hover:underline"
                  >
                    Manage Catalog →
                  </Link>
                </div>

                <div style={{ height: 350, width: "100%" }}>
                  <DataGrid
                    rows={vendorProducts}
                    columns={productColumns}
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
                </div>
              </div>
            </div>
          </LocalizationProvider>
        );
      }}
    </PanelShell>
  );
}
