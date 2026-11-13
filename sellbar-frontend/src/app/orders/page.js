"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession } from "../../lib/auth";
import { apiRequest } from "../../lib/api";
import { getMyOrders } from "../../lib/checkout";
import { getProductImageUrl, getCategoryFallbackImage } from "@/lib/productImageHelper";
import {
  FileText,
  Printer,
  X,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  ArrowLeft,
  ShieldCheck,
  Building,
  QrCode,
} from "lucide-react";

const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

const statusColor = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-rose-100 text-rose-800 border-rose-200",
  paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  failed: "bg-rose-100 text-rose-800 border-rose-200",
};

const STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

function Tracker({ order }) {
  if (order.orderStatus === "cancelled") {
    return (
      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-semibold my-3">
        ⚠️ This order has been cancelled.
      </div>
    );
  }

  const current = Math.max(
    0,
    STEPS.findIndex((step) => step.key === order.orderStatus)
  );

  return (
    <div className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
        Live Order Milestones
      </div>
      <ol className="relative border-l-2 border-slate-200 ml-3 space-y-4">
        {STEPS.map((step, index) => {
          const done = index <= current;

          return (
            <li key={step.key} className="ml-5 relative">
              <span
                className={`absolute -left-[27px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  done
                    ? "bg-[#13b59b] text-white ring-4 ring-emerald-50"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {done ? "✓" : index + 1}
              </span>
              <div>
                <strong
                  className={`text-xs font-bold ${
                    done ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </strong>
                {index === 0 && order.createdAt && (
                  <div className="text-[11px] text-slate-500">
                    {new Date(order.createdAt).toLocaleString("en-IN")}
                  </div>
                )}
                {index === current && index !== 0 && order.updatedAt && (
                  <div className="text-[11px] text-[#13b59b] font-medium">
                    Updated: {new Date(order.updatedAt).toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {order.paymentMethod === "online" && order.paymentStatus === "pending" && (
        <p className="text-xs text-amber-700 font-semibold mt-3">
          ⏳ Payment is pending. Your order will be dispatched once payment confirmation is received.
        </p>
      )}
    </div>
  );
}

// Full GST Tax Invoice Printable Modal
function TaxInvoiceModal({ order, onClose }) {
  if (!order) return null;

  const invoiceNo = `INV-SB-${new Date(order.createdAt || Date.now()).getFullYear()}-${String(order._id).slice(-8).toUpperCase()}`;
  const invoiceDate = new Date(order.createdAt || Date.now()).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const subtotal = Number(order.total || 0);
  // Calculate 18% GST (9% CGST + 9% SGST) included
  const taxableValue = Math.round(subtotal / 1.18);
  const gstAmount = subtotal - taxableValue;
  const cgst = Math.round(gstAmount / 2);
  const sgst = gstAmount - cgst;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative print:p-0 print:m-0 print:max-w-none print:shadow-none print:rounded-none">
        {/* Modal Top Actions (Hidden during print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <FileText className="text-[#13b59b]" size={18} />
            <span>Tax Invoice Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Printer size={14} /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="sellbar-invoice-printable" className="text-slate-800 text-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-5">
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                <span className="text-[#13b59b]">SELLBAR</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-[#13b59b] rounded">
                  TAX INVOICE
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-600 mt-1">
                Sellbar Recommerce Private Limited
              </p>
              <p className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
                CIN: U52100BR2026PTC068921 • GSTIN: <strong className="text-slate-700">10AAACS7717P1Z5</strong>
                <br />
                Registered Office: Main Road, Supriya Cinema Chowk, Bettiah, West Champaran, Bihar - 845438
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <div className="text-xs font-black text-slate-900">
                Invoice No: <span className="font-mono text-[#13b59b]">{invoiceNo}</span>
              </div>
              <div className="text-[11px] text-slate-600">
                Date: <strong className="text-slate-900">{invoiceDate}</strong>
              </div>
              <div className="text-[11px] text-slate-600">
                Place of Supply: <strong className="text-slate-900">Bihar (10)</strong>
              </div>
              <div className="text-[11px] text-slate-600">
                Payment: <strong className="uppercase text-slate-900">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Prepaid Online"}</strong>
              </div>
            </div>
          </div>

          {/* Bill To & Ship To Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Billed &amp; Shipped To:
              </div>
              <div className="font-bold text-slate-900 text-xs">
                {order.shippingAddress?.fullName || order.customer?.name || "Sellbar Customer"}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                {order.shippingAddress?.addressLine1 || "Registered Customer Address"}
                {order.shippingAddress?.city && `, ${order.shippingAddress.city}`}
                {order.shippingAddress?.state && ` - ${order.shippingAddress.state}`}
                {order.shippingAddress?.postalCode && ` (${order.shippingAddress.postalCode})`}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Phone: {order.shippingAddress?.phone || order.customer?.phone || "+91-XXXXXXXXXX"}
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Order References:
              </div>
              <div className="text-[11px] text-slate-600 space-y-1">
                <div>Order ID: <strong className="text-slate-900 font-mono">#{String(order._id).slice(-8).toUpperCase()}</strong></div>
                <div>Fulfillment Status: <strong className="text-emerald-700 capitalize">{order.orderStatus}</strong></div>
                <div>Warranty Coverage: <strong className="text-[#13b59b]">12 Months Doorstep Warranty</strong></div>
              </div>
            </div>
          </div>

          {/* Product Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Description of Goods</th>
                  <th className="py-2.5 px-3">HSN Code</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Taxable (₹)</th>
                  <th className="py-2.5 px-3 text-right">GST (18%)</th>
                  <th className="py-2.5 px-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(order.items || []).map((item, index) => {
                  const lineTotal = Number(item.lineTotal || 0);
                  const itemTaxable = Math.round(lineTotal / 1.18);
                  const itemGst = lineTotal - itemTaxable;

                  return (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 text-slate-400">{index + 1}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {item.productName}
                        <div className="text-[10px] text-slate-500 font-normal">
                          Certified Refurbished • 32-Point Quality Passed
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 text-[11px]">85171300</td>
                      <td className="py-3 px-3 text-center font-bold text-slate-700">{item.quantity}</td>
                      <td className="py-3 px-3 text-right font-medium text-slate-700">
                        ₹{itemTaxable.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-600 text-[11px]">
                        ₹{itemGst.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tax Breakdown & Grand Total */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-2 max-w-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-500 space-y-1">
                <div className="font-bold text-slate-700 flex items-center gap-1">
                  <ShieldCheck size={12} className="text-[#13b59b]" />
                  Official Sellbar Warranty Certificate
                </div>
                <p>
                  This invoice acts as valid proof of warranty for 12 months from the date of purchase. For doorstep claims, call +91 77175 17777.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Amount:</span>
                <span className="font-semibold">₹{taxableValue.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span className="font-semibold">₹{cgst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span className="font-semibold">₹{sgst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping / Packaging:</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 border-t-2 border-slate-900 pt-2">
                <span>Grand Total:</span>
                <span className="text-[#13b59b]">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Footer & Authorized Signatory */}
          <div className="flex justify-between items-end border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                <QrCode size={40} className="text-slate-600" />
              </div>
              <div className="text-[10px] text-slate-400">
                <div>Scan QR to verify authentic GST e-invoice</div>
                <div className="font-mono text-[9px] text-slate-500">IRN: 8f4a7c...29b1</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">For Sellbar Recommerce Pvt Ltd</div>
              <div className="my-2 text-[10px] font-serif italic text-slate-400">
                [Digitally Signed by Authorized Officer]
              </div>
              <div className="text-[10px] text-slate-500">Authorized Signatory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const load = useCallback(async (token) => {
    const data = await getMyOrders(token);
    setOrders(data.orders || []);
  }, []);

  useEffect(() => {
    const current = getSession();

    if (!current?.token) {
      setLoading(false);
      return;
    }

    setSession(current);

    load(current.token)
      .catch((err) => setError(err.message || "Could not load orders."))
      .finally(() => setLoading(false));
  }, [load]);

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setBusyId(id);
    setError("");

    try {
      await apiRequest(`/orders/${encodeURIComponent(id)}/cancel`, {
        method: "PATCH",
        token: session.token,
      });
      await load(session.token);
    } catch (err) {
      setError(err.message || "Failed to cancel order.");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-slate-500 font-semibold text-sm animate-pulse">
          <Package className="text-[#13b59b]" size={24} />
          <span>Loading your orders &amp; invoices...</span>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-14 h-14 bg-emerald-50 text-[#13b59b] rounded-full flex items-center justify-center mx-auto">
            <Package size={28} />
          </div>
          <h1 className="text-xl font-black text-slate-900">Login Required</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please log in to view your orders, live tracking, and download official GST tax invoices.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            Go to Homepage
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition mb-2"
            >
              <ArrowLeft size={14} /> Continue Shopping
            </Link>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Package className="text-[#13b59b]" size={24} /> My Orders &amp; Purchases
            </h1>
          </div>

          <span className="text-xs font-bold px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full shadow-2xs">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"} Placed
          </span>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl">
            {error}
          </div>
        )}

        {orders.length === 0 && !error && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Package size={32} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">No Orders Placed Yet</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore our certified refurbished smartphones, laptops, and smartwatches with 12 months warranty.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              Browse Catalog
            </Link>
          </div>
        )}

        {/* Order Cards List */}
        <div className="space-y-4">
          {orders.map((order) => {
            const canCancel =
              order.paymentStatus === "pending" &&
              ["pending", "confirmed"].includes(order.orderStatus);

            return (
              <section
                key={order._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden p-5 sm:p-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-black text-slate-900 font-mono">
                        #{String(order._id).slice(-8).toUpperCase()}
                      </strong>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${
                          statusColor[order.orderStatus] || "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN") : ""}
                      {order.vendor?.storeName ? ` • Fulfilled by ${order.vendor.storeName}` : " • Sold by Sellbar"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        order.paymentStatus === "paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"} • {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <ul className="divide-y divide-slate-100 my-3">
                  {(order.items || []).map((item, index) => (
                    <li
                      key={`${item.product}-${index}`}
                      className="py-3 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        {getProductImageUrl(item, item.category) ? (
                          <img
                            src={getProductImageUrl(item, item.category)}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = getCategoryFallbackImage(item.category);
                            }}
                            alt=""
                            className="w-12 h-12 object-cover rounded-xl border border-slate-100 shadow-2xs"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">
                            🛍️
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {item.productName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Qty: <strong className="text-slate-700">{item.quantity}</strong> • 12M Warranty
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-extrabold text-slate-900 font-mono">
                        {money(item.lineTotal)}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Tracking Milestones Tracker */}
                {trackId === order._id && <Tracker order={order} />}

                {/* Card Actions Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-slate-100 pt-4 mt-2">
                  <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <span className="text-xs font-normal text-slate-500">Total Paid:</span>
                    <span className="text-[#13b59b]">{money(order.total)}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* GST Tax Invoice Button */}
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      <FileText size={14} className="text-[#13b59b]" />
                      <span>Tax Invoice</span>
                    </button>

                    {/* Tracking Toggle */}
                    <button
                      onClick={() => setTrackId(trackId === order._id ? null : order._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#13b59b] rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      <Truck size={14} />
                      <span>{trackId === order._id ? "Hide Tracking" : "Track Order"}</span>
                    </button>

                    {/* Cancel Order (if pending) */}
                    {canCancel && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        disabled={busyId === order._id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        <span>{busyId === order._id ? "Cancelling..." : "Cancel"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <TaxInvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </main>
  );
}
