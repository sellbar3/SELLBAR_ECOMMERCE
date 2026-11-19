"use client";

import { useEffect, useState, useCallback } from "react";
import PanelShell from "../../../components/PanelShell";
import { fmtDate, money, panelRequest } from "../../../lib/panel";
import {
  Wallet,
  TrendingUp,
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  ArrowDownRight,
  Receipt,
  Edit2,
  Save,
  X,
  ExternalLink,
} from "lucide-react";

function VendorPayoutsContent({ session }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Bank Edit State
  const [editingBank, setEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState({
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    upiId: "",
  });
  const [savingBank, setSavingBank] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/vendor/payouts", {
        headers: {
          Accept: "application/json",
          ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
        },
        cache: "no-store",
      });
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        if (json.data.bankDetails) {
          setBankForm({
            accountHolder: json.data.bankDetails.accountHolder || "",
            accountNumber: json.data.bankDetails.accountNumber || "",
            ifscCode: json.data.bankDetails.ifscCode || "",
            bankName: json.data.bankDetails.bankName || "",
            branchName: json.data.bankDetails.branchName || "",
            upiId: json.data.bankDetails.upiId || "",
          });
        }
      } else {
        throw new Error(json.message || "Failed to load payout data");
      }
    } catch (err) {
      setError(err.message || "Failed to load payout information");
    } finally {
      setLoading(false);
    }
  }, [session?.token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveBank = async (e) => {
    e.preventDefault();
    try {
      setSavingBank(true);
      setError("");
      const res = await fetch("/api/vendor/bank-details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
        },
        body: JSON.stringify(bankForm),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to update bank details");
      setSuccessMsg("✓ Bank details updated successfully. Weekly payouts will settle here.");
      setTimeout(() => setSuccessMsg(""), 5000);
      setEditingBank(false);
      await loadData();
    } catch (err) {
      setError(err.message || "Failed to save bank details");
    } finally {
      setSavingBank(false);
    }
  };

  const summary = data?.summary || {
    totalGrossSales: 0,
    totalCommissionDeducted: 0,
    commissionRate: 10,
    totalVendorEarnings: 0,
    totalSettled: 0,
    pendingBalance: 0,
  };

  const bank = data?.bankDetails || {};
  const orders = data?.orders || [];
  const settlements = data?.settlements || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Vendor Commission &amp; Payout Ledger
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Weekly Auto-Settlement
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated Sellbar commission calculation ({summary.commissionRate}% rate) &amp; direct bank transfer records.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#13b59b]" : ""}`} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Pending Balance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pending Balance
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {money(summary.pendingBalance)}
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            Scheduled for Next Weekly Settlement
          </div>
        </div>

        {/* Total Settled */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Settled to Bank
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight text-emerald-700">
            {money(summary.totalSettled)}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Transferred directly to Bank Account
          </div>
        </div>

        {/* Total Gross Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Gross Sales
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {money(summary.totalGrossSales)}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            From {orders.length} Customer Orders
          </div>
        </div>

        {/* Sellbar Commission Deducted */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Sellbar Fee ({summary.commissionRate}%)
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowDownRight size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight text-rose-600">
            -{money(summary.totalCommissionDeducted)}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Auto-deducted platform service fee
          </div>
        </div>
      </div>

      {/* Settlement Bank Account Details Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Building size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Registered Bank &amp; Settlement Account
              </h2>
              <p className="text-xs text-slate-500">
                Your weekly payout transfers are credited automatically to this verified account.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditingBank(!editingBank)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            {editingBank ? <X size={14} /> : <Edit2 size={14} />}
            <span>{editingBank ? "Cancel" : "Update Bank Account"}</span>
          </button>
        </div>

        {editingBank ? (
          <form onSubmit={handleSaveBank} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  required
                  value={bankForm.accountHolder}
                  onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                  placeholder="As per bank passbook..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  required
                  value={bankForm.accountNumber}
                  onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                  placeholder="Enter full bank account number..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  required
                  value={bankForm.ifscCode}
                  onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value.toUpperCase() })}
                  placeholder="e.g. HDFC0001842"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  placeholder="e.g. State Bank of India / HDFC"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Branch Location
                </label>
                <input
                  type="text"
                  value={bankForm.branchName}
                  onChange={(e) => setBankForm({ ...bankForm, branchName: e.target.value })}
                  placeholder="e.g. Bettiah Main Branch"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  UPI ID (Optional Instant Transfer)
                </label>
                <input
                  type="text"
                  value={bankForm.upiId}
                  onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                  placeholder="e.g. vendor@okaxis"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#13b59b]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingBank}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#13b59b] hover:bg-[#0f9f87] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Save size={14} />
                <span>{savingBank ? "Saving..." : "Save Bank Details"}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 font-semibold block text-[11px]">Account Holder</span>
              <span className="font-bold text-slate-800 text-sm">{bank.accountHolder || "Not Specified"}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 font-semibold block text-[11px]">Account Number</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                {bank.accountNumber ? `••••••••${String(bank.accountNumber).slice(-4)}` : "Not Configured"}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 font-semibold block text-[11px]">Bank &amp; IFSC</span>
              <span className="font-bold text-slate-800">
                {bank.bankName || "Bank Transfer"} ({bank.ifscCode || "IFSC Pending"})
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 font-semibold block text-[11px]">Payout UPI ID</span>
              <span className="font-mono font-bold text-slate-800">{bank.upiId || "N/A"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Settlement Transfer History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Weekly Bank Settlement Transfers
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Automated bank transfer audit records with UTR reference numbers and payment snapshots.
        </p>

        {settlements.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
            No bank transfers recorded yet. When the weekly payout cycle closes, transfers will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Settlement ID</th>
                  <th className="py-2.5 px-3">Cycle Period</th>
                  <th className="py-2.5 px-3">Settled Date</th>
                  <th className="py-2.5 px-3">Gross Sales</th>
                  <th className="py-2.5 px-3">Sellbar Fee</th>
                  <th className="py-2.5 px-3 font-bold text-slate-900">Net Bank Transfer</th>
                  <th className="py-2.5 px-3">Mode &amp; UTR</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {settlements.map((s) => (
                  <tr key={s.payoutId} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{s.payoutId}</td>
                    <td className="py-3 px-3 font-medium">{s.settlementCycle}</td>
                    <td className="py-3 px-3 text-slate-500">{fmtDate(s.settledAt)}</td>
                    <td className="py-3 px-3">{money(s.grossSales)}</td>
                    <td className="py-3 px-3 text-rose-600 font-semibold">-{money(s.commissionDeducted)}</td>
                    <td className="py-3 px-3 font-bold text-emerald-700 text-sm">
                      {money(s.netPayoutAmount)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900">{s.paymentMode}</span>
                      <span className="block font-mono text-[11px] text-slate-500">{s.utrNumber}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Settled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Itemized Order Commission Ledger */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Itemized Order Commission Ledger
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Real-time deduction breakdown for every customer order.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5 px-3">Order #</th>
                <th className="py-2.5 px-3">Order Date</th>
                <th className="py-2.5 px-3">Order Total</th>
                <th className="py-2.5 px-3">Platform Fee %</th>
                <th className="py-2.5 px-3">Sellbar Fee</th>
                <th className="py-2.5 px-3 font-bold text-slate-900">Your Net Earnings</th>
                <th className="py-2.5 px-3">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">#{o.orderNumber}</td>
                  <td className="py-3 px-3 text-slate-500">{fmtDate(o.createdAt)}</td>
                  <td className="py-3 px-3 font-bold text-slate-800">{money(o.total)}</td>
                  <td className="py-3 px-3 font-semibold text-slate-600">{o.commissionRate}%</td>
                  <td className="py-3 px-3 text-rose-600 font-semibold">-{money(o.commissionAmount)}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700 text-sm">
                    {money(o.vendorEarnings)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                        o.payoutStatus === "settled"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {o.payoutStatus === "settled" ? "✓ Settled" : "⏳ Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function VendorPayoutsPage() {
  return (
    <PanelShell role="vendor" title="Payouts & Ledger">
      {(session) => <VendorPayoutsContent session={session} />}
    </PanelShell>
  );
}
