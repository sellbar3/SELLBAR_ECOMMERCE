"use client";

import { useCallback, useEffect, useState } from "react";
import PanelShell from "../../../components/PanelShell";
import { fmtDate, money, panelRequest, pickList } from "../../../lib/panel";
import {
  ShoppingBag,
  RefreshCw,
  Search,
  Filter,
  MapPin,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
  User,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { getProductImageUrl, getCategoryFallbackImage } from "@/lib/productImageHelper";

const STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const STATUS_CONFIG = {
  pending: { label: "Pending", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  confirmed: { label: "Confirmed", bg: "bg-blue-50 text-blue-700 border-blue-200" },
  processing: { label: "Processing", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  shipped: { label: "Shipped", bg: "bg-purple-50 text-purple-700 border-purple-200" },
  delivered: { label: "Delivered", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Cancelled", bg: "bg-rose-50 text-rose-700 border-rose-200" },
};

function OrdersList({ session }) {
  const [rows, setRows] = useState([]);
  const [nextStatus, setNextStatus] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const d = await panelRequest("/vendor/orders", { token: session.token });
      setRows(pickList(d, "orders"));
    } catch (e) {
      setError(e.message || "Failed to load vendor orders");
    } finally {
      setLoading(false);
    }
  }, [session.token]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(o) {
    const value = nextStatus[o._id];
    if (!value || value === o.orderStatus) return;
    setBusyId(o._id);
    setError("");
    try {
      await panelRequest(`/vendor/orders/${o._id}/status`, {
        method: "PATCH",
        token: session.token,
        body: { orderStatus: value, status: value },
      });
      await load();
    } catch (e) {
      setError(e.message || "Failed to update status");
    } finally {
      setBusyId(null);
    }
  }

  // Filter orders
  const filtered = rows.filter((o) => {
    const idMatches = String(o._id).toLowerCase().includes(search.toLowerCase());
    const customerMatches = o.shippingAddress?.fullName?.toLowerCase().includes(search.toLowerCase());
    const phoneMatches = o.shippingAddress?.phone?.includes(search);
    const matchesSearch = !search || idMatches || customerMatches || phoneMatches;

    if (!matchesSearch) return false;
    if (statusFilter === "all") return true;
    return o.orderStatus === statusFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Customer Orders &amp; Fulfillment
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#13b59b]/10 text-[#13b59b] border border-[#13b59b]/20">
              {rows.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track customer orders, prepare dispatches, and update fulfillment tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#13b59b]" : ""}`} />
          <span>Refresh Orders</span>
        </button>
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
            placeholder="Search by order ID, customer, phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#13b59b] focus:bg-white transition"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["all", ...STATUSES].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition cursor-pointer ${
                statusFilter === st
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {st === "all" ? "All Orders" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Order Cards Content */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-xs text-slate-500 shadow-xs">
          <RefreshCw className="w-6 h-6 animate-spin text-[#13b59b] mx-auto mb-2" />
          <span>Loading orders...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center shadow-xs">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No orders found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {search || statusFilter !== "all"
              ? "No orders match your active filter."
              : "You have not received any orders yet. Once a customer purchases your listed products, they will appear here."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((o) => {
            const stConf = STATUS_CONFIG[o.orderStatus] || {
              label: o.orderStatus,
              bg: "bg-slate-100 text-slate-700 border-slate-200",
            };

            return (
              <div
                key={o._id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-slate-900">
                      #{String(o._id).slice(-8).toUpperCase()}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${stConf.bg}`}
                    >
                      {stConf.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{fmtDate(o.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                      <span>Total:</span>
                      <span className="text-[#13b59b]">{money(o.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Middle Section: Items + Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  {/* Left: Ordered Items List */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Purchased Items ({(o.items || []).length})
                    </h4>
                    <div className="space-y-2">
                      {(o.items || []).map((it, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100"
                        >
                          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            <img
                              src={getProductImageUrl(it, it.category)}
                              alt={it.productName || "Product"}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getCategoryFallbackImage(it.category);
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-xs text-slate-800 truncate">
                              {it.productName}
                            </h5>
                            <span className="text-[11px] text-slate-500 font-medium">
                              Qty: {it.quantity} × {money(it.price || it.lineTotal / (it.quantity || 1))}
                            </span>
                          </div>
                          <span className="font-bold text-xs text-slate-900 whitespace-nowrap">
                            {money(it.lineTotal)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Shipping & Customer Info */}
                  <div className="bg-slate-50/75 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Delivery Address
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{o.shippingAddress?.fullName || "Valued Customer"}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>
                            {o.shippingAddress?.addressLine1}
                            {o.shippingAddress?.addressLine2 ? `, ${o.shippingAddress.addressLine2}` : ""}
                            , {o.shippingAddress?.city}, {o.shippingAddress?.state} -{" "}
                            {o.shippingAddress?.postalCode}
                          </span>
                        </div>
                        {o.shippingAddress?.phone && (
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>+91 {o.shippingAddress?.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Payment Method:</span>
                      <span className="font-semibold text-slate-800 uppercase tracking-wider">
                        {o.paymentMethod || "COD"} • {o.paymentStatus || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar: Status Update */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 bg-slate-50/50 -mx-5 -mb-5 p-4 rounded-b-2xl">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Truck className="w-4 h-4 text-[#13b59b]" />
                    <span>Fulfillment Status:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={nextStatus[o._id] ?? o.orderStatus}
                        onChange={(e) =>
                          setNextStatus({ ...nextStatus, [o._id]: e.target.value })
                        }
                        className="appearance-none pl-3 pr-8 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b] cursor-pointer"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_CONFIG[s]?.label || s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <button
                      type="button"
                      disabled={busyId === o._id || (nextStatus[o._id] ?? o.orderStatus) === o.orderStatus}
                      onClick={() => updateStatus(o)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#13b59b] hover:bg-[#0f9f87] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {busyId === o._id ? "Saving..." : "Update Status"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function VendorOrders() {
  return (
    <PanelShell role="vendor" title="Orders">
      {(s) => <OrdersList session={s} />}
    </PanelShell>
  );
}
