"use client";

import { useEffect, useState, useCallback } from "react";
import PanelShell from "@/components/PanelShell";
import {
  ShoppingCart,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send,
  ExternalLink,
  Percent,
  Copy,
  Check,
} from "lucide-react";

function AbandonedCartsView({ session }) {
  const [carts, setCarts] = useState([]);
  const [stats, setStats] = useState({
    totalTracked: 0,
    abandonedCount: 0,
    activeCount: 0,
    recoveredCount: 0,
    totalLostRevenue: 0,
    recoveredRevenue: 0,
    recoveryRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [runningCron, setRunningCron] = useState(false);
  const [cronResult, setCronResult] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fetchCarts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart/abandoned", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setCarts(data.carts || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load abandoned carts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  const handleRunCron = async () => {
    setRunningCron(true);
    setCronResult("");
    try {
      const res = await fetch("/api/cart/abandoned/cron", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setCronResult(`✅ Sent automated reminders to ${data.recoveredAttempts?.length || 0} abandoned cart(s).`);
        fetchCarts();
      } else {
        setCronResult(`⚠️ ${data.message || "Failed to run cron"}`);
      }
    } catch (err) {
      setCronResult(`❌ Error: ${err.message}`);
    } finally {
      setRunningCron(false);
      setTimeout(() => setCronResult(""), 6000);
    }
  };

  const handleSendReminder = async (cart) => {
    setBusyId(cart._id);
    try {
      const res = await fetch(`/api/cart/abandoned/${cart._id}/send-reminder`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        if (data.whatsappWebUrl) {
          window.open(data.whatsappWebUrl, "_blank");
        }
        alert("✅ Recovery WhatsApp alert dispatched to " + cart.phone);
        fetchCarts();
      } else {
        alert(data.message || "Failed to send reminder");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setBusyId(null);
    }
  };

  const copyCheckoutLink = (cartId) => {
    navigator.clipboard.writeText("https://sellbar.in/checkout?code=RECOVER5");
    setCopiedId(cartId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return "recently";
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Cron Trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-teal-500/20 rounded-xl text-teal-400">
              <ShoppingCart size={24} />
            </span>
            <h1 className="text-xl font-black tracking-tight">Abandoned Cart Recovery Hub</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Customers jo checkout par phone number daal kar bina purchase ke nikal jaate hain, unhe 2 ghante baad automated 5% discount ke sath WhatsApp reminder bhejna.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCarts}
            disabled={loading}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            onClick={handleRunCron}
            disabled={runningCron}
            className="px-4 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm cursor-pointer"
          >
            <Send size={14} />
            {runningCron ? "Dispatching 2-Hr Reminders..." : "Run 2-Hour Auto-Recovery"}
          </button>
        </div>
      </div>

      {cronResult && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl animate-fade-in">
          {cronResult}
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Abandoned Carts (&gt;2 hrs)</div>
          <div className="text-2xl font-black text-rose-600 mt-2">{stats.abandonedCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Ready for automated recovery</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Potential Lost Revenue</div>
          <div className="text-2xl font-black text-amber-600 mt-2">
            ₹{stats.totalLostRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Pending in customer carts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recovered Revenue</div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            ₹{stats.recoveredRevenue.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{stats.recoveredCount} orders saved</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recovery Success Rate</div>
          <div className="text-2xl font-black text-[#13b59b] mt-2">{stats.recoveryRate}%</div>
          <div className="text-[11px] text-slate-400 mt-1">Converted via recovery vouchers</div>
        </div>
      </div>

      {/* Abandoned Carts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-800">Tracked Customer Carts ({carts.length})</h2>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Auto-checks every 2 hours
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs font-semibold animate-pulse">
            Loading abandoned cart records...
          </div>
        ) : carts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <ShoppingCart size={32} className="mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-700">No Abandoned Carts Right Now</p>
            <p className="text-xs text-slate-400">All customer carts have either completed checkout or are fresh.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Customer &amp; Phone</th>
                  <th className="py-3 px-4">Items in Cart</th>
                  <th className="py-3 px-4">Cart Value</th>
                  <th className="py-3 px-4">Idle Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {carts.map((cart) => {
                  const firstItem = cart.items?.[0];
                  const isRecovered = cart.status === "recovered";
                  const isAbandoned = cart.status === "abandoned";

                  return (
                    <tr key={cart._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{cart.customerName || "Customer"}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                          <PhoneCall size={10} className="text-slate-400" />
                          {cart.phone || "No phone provided"}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-slate-800 truncate">
                          {firstItem?.title || "Refurbished Gadget"}
                        </div>
                        {cart.items?.length > 1 && (
                          <div className="text-[10px] text-slate-400">
                            +{cart.items.length - 1} more item(s)
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-black text-slate-900">
                          ₹{Number(cart.total || 0).toLocaleString("en-IN")}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Clock size={12} className="text-slate-400" />
                          {formatTimeAgo(cart.lastActivity)}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {isRecovered ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 size={10} /> Recovered
                          </span>
                        ) : isAbandoned ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <AlertCircle size={10} /> Abandoned ({cart.recoveryCount || 0} Sent)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            Active in Cart
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => copyCheckoutLink(cart._id)}
                            title="Copy 5% OFF recovery link"
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition cursor-pointer"
                          >
                            {copiedId === cart._id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                          </button>

                          {cart.phone && !isRecovered && (
                            <button
                              onClick={() => handleSendReminder(cart)}
                              disabled={busyId === cart._id}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                            >
                              <Send size={12} />
                              {busyId === cart._id ? "Sending..." : "Send WhatsApp"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminAbandonedCarts() {
  return (
    <PanelShell role="admin" title="Abandoned Cart Recovery">
      {(session) => <AbandonedCartsView session={session} />}
    </PanelShell>
  );
}
