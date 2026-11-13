"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { money, panelRequest, pickList } from "../../../lib/panel";
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Layers,
  Filter,
} from "lucide-react";
import { getProductImageUrl, getCategoryFallbackImage } from "@/lib/productImageHelper";

function ProductList({ session }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const d = await panelRequest("/products/my-products", { token: session.token });
      setRows(pickList(d, "products"));
    } catch (e) {
      setError(e.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [session.token]);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(id) {
    if (!window.confirm("Are you sure you want to delete this product listing?")) return;
    try {
      setDeletingId(id);
      await panelRequest(`/products/${id}`, { method: "DELETE", token: session.token });
      await load();
    } catch (e) {
      setError(e.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  }

  // Filter products by search and status
  const filtered = rows.filter((p) => {
    const matchesSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    if (statusFilter === "all") return true;
    if (statusFilter === "active") return p.status === "active" && Number(p.stock) > 0;
    if (statusFilter === "low_stock") return Number(p.stock) > 0 && Number(p.stock) <= 5;
    if (statusFilter === "out_of_stock") return Number(p.stock) === 0;
    return p.status === statusFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              My Listed Products
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#13b59b]/10 text-[#13b59b] border border-[#13b59b]/20">
              {rows.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your certified refurbished device catalog, real-time stock &amp; pricing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
            title="Refresh product list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#13b59b]" : ""}`} />
          </button>
          <Link
            href="/vendor/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#13b59b] hover:bg-[#0f9f87] text-white font-bold text-xs tracking-wide shadow-sm transition active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#13b59b] focus:bg-white transition"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Items" },
            { id: "active", label: "In Stock" },
            { id: "low_stock", label: "Low Stock (≤5)" },
            { id: "out_of_stock", label: "Out of Stock" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Content */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-xs text-slate-500 shadow-xs">
          <RefreshCw className="w-6 h-6 animate-spin text-[#13b59b] mx-auto mb-2" />
          <span>Loading products catalog...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center shadow-xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No products found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {search || statusFilter !== "all"
              ? "No products match the selected filters. Try resetting the search."
              : "You have not listed any products yet. Start listing refurbished gadgets to receive customer orders."}
          </p>
          <div className="mt-5">
            <Link
              href="/vendor/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#13b59b] hover:bg-[#0f9f87] text-white text-xs font-bold shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>List Your First Product</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Product Info</th>
                  <th className="py-3.5 px-4">Selling Price</th>
                  <th className="py-3.5 px-4">Inventory</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((p) => {
                  const stockNum = Number(p.stock || 0);
                  const isOutOfStock = stockNum === 0;
                  const isLowStock = stockNum > 0 && stockNum <= 5;
                  const imgUrl = getProductImageUrl(p, p.category);

                  return (
                    <tr key={p._id} className="hover:bg-slate-50/50 transition">
                      {/* Product Thumbnail & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            <img
                              src={imgUrl}
                              alt={p.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getCategoryFallbackImage(p.category);
                              }}
                            />
                          </div>
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <h4 className="font-bold text-slate-900 truncate tracking-tight">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                              <span className="capitalize">{p.category || "Refurbished"}</span>
                              {p.condition && (
                                <>
                                  <span>•</span>
                                  <span className="font-medium text-slate-600">{p.condition}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Selling Price */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                        {money(p.price)}
                      </td>

                      {/* Inventory Stock */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            isOutOfStock
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : isLowStock
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOutOfStock
                                ? "bg-rose-500"
                                : isLowStock
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                          />
                          {stockNum} units
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                            p.status === "active" && !isOutOfStock
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {isOutOfStock ? "Out of Stock" : p.status || "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/vendor/products/${p._id}`}
                            className="p-2 rounded-lg border border-slate-200 hover:border-[#13b59b] hover:text-[#13b59b] text-slate-600 transition"
                            title="Edit Listing"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => remove(p._id)}
                            disabled={deletingId === p._id}
                            className="p-2 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition cursor-pointer disabled:opacity-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VendorProducts() {
  return (
    <PanelShell role="vendor" title="Products">
      {(s) => <ProductList session={s} />}
    </PanelShell>
  );
}
