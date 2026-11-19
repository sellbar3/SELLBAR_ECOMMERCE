'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import PanelShell from '@/components/PanelShell';
import {
  ShoppingBag,
  Search,
  Filter,
  Truck,
  Printer,
  Download,
  Volume2,
  VolumeX,
  CheckCircle2,
  Clock,
  RotateCcw,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Eye,
  X,
  FileText,
  DollarSign,
  TrendingUp,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { money, getPanelSession } from '@/lib/panel';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

const STATUS_FILTERS = [
  'All',
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  processing: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  shipped: 'bg-purple-50 text-purple-700 border-purple-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

// Web Audio API chime generator (no external mp3 dependency)
function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    osc2.frequency.setValueAtTime(880, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.25); // D6

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
  } catch (err) {
    console.warn('Audio chime playback failed:', err);
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [soundTriggered, setSoundTriggered] = useState(false);

  // Modals & Action States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [labelModalOrder, setLabelModalOrder] = useState(null);
  const [generatingAwbId, setGeneratingAwbId] = useState(null);
  const [busyStatusId, setBusyStatusId] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  const previousCountRef = useRef(0);

  // Fetch orders from API
  const loadOrders = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const session = getPanelSession('admin');
      const res = await fetch('/api/orders', {
        headers: {
          Accept: 'application/json',
          ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
        },
        cache: 'no-store',
      });
      const data = await res.json();
      const list = data.orders || (Array.isArray(data.data) ? data.data : []);

      if (silent && list.length > previousCountRef.current && previousCountRef.current > 0) {
        if (audioEnabled) {
          playNotificationChime();
          setSoundTriggered(true);
          setTimeout(() => setSoundTriggered(false), 3000);
        }
      }

      previousCountRef.current = list.length;
      setOrders(list);
    } catch (err) {
      console.warn('Failed to load orders:', err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // Live polling interval for new orders every 20 seconds
    const interval = setInterval(() => {
      loadOrders(true);
    }, 20000);
    return () => clearInterval(interval);
  }, [audioEnabled]);

  // Update Order Status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setBusyStatusId(orderId);
      const session = getPanelSession('admin');
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      // Update locally
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      setSuccessToast(`Order #${String(orderId).slice(-8).toUpperCase()} updated to ${newStatus}`);
      setTimeout(() => setSuccessToast(''), 3000);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setBusyStatusId(null);
    }
  };

  // 1-Click Generate AWB (Shiprocket / Delhivery)
  const handleGenerateAwb = async (order, carrier = 'delhivery') => {
    try {
      setGeneratingAwbId(order._id);
      const res = await fetch('/api/shipping/generate-awb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order._id,
          courierPreference: carrier,
          weight: 0.5,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === order._id
              ? {
                  ...o,
                  awbNumber: json.data.awbNumber,
                  shippingCarrier: json.data.courierPartner,
                  shippingStatus: 'awb_assigned',
                  shippingLabelUrl: json.data.shippingLabelUrl,
                }
              : o
          )
        );
        setSuccessToast(`AWB ${json.data.awbNumber} generated via ${json.data.courierPartner}!`);
        setTimeout(() => setSuccessToast(''), 4000);
      } else {
        alert(json.message || 'AWB generation failed');
      }
    } catch (err) {
      alert('AWB error: ' + err.message);
    } finally {
      setGeneratingAwbId(null);
    }
  };

  // Export Sales & Profit Ledger (CSV)
  const handleExportCsv = () => {
    if (!orders || orders.length === 0) {
      alert('No orders to export');
      return;
    }

    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Customer Phone',
      'Delivery City',
      'Pincode',
      'Items',
      'Subtotal',
      'GST (18%)',
      'Grand Total (INR)',
      'Platform Commission (10%)',
      'Vendor Payout',
      'Payment Mode',
      'Payment Status',
      'Order Status',
      'Shipping Carrier',
      'AWB Number',
    ];

    const rows = orders.map((o) => {
      const total = Number(o.total || o.subtotal || 0);
      const taxable = Math.round(total / 1.18);
      const gst = total - taxable;
      const commission = Math.round(total * 0.1);
      const vendorCut = total - commission;
      const itemsStr = (o.items || []).map((i) => `${i.productName} (x${i.quantity})`).join('; ');

      return [
        `#${String(o._id).slice(-8).toUpperCase()}`,
        o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN') : '',
        `"${o.shippingAddress?.fullName || o.customer?.name || 'Customer'}"`,
        `"${o.shippingAddress?.phone || o.customer?.phone || ''}"`,
        `"${o.shippingAddress?.city || 'Bettiah'}"`,
        `"${o.shippingAddress?.postalCode || '845438'}"`,
        `"${itemsStr}"`,
        taxable,
        gst,
        total,
        commission,
        vendorCut,
        o.paymentMethod || 'cod',
        o.paymentStatus || 'pending',
        o.orderStatus || 'pending',
        o.shippingCarrier || 'Sellbar Local',
        o.awbNumber || 'Pending',
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Sellbar_Sales_Profit_Ledger_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus =
        statusFilter === 'All' ||
        String(o.orderStatus || '').toLowerCase() === statusFilter.toLowerCase();
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        String(o._id).toLowerCase().includes(q) ||
        (o.shippingAddress?.fullName || '').toLowerCase().includes(q) ||
        (o.shippingAddress?.phone || '').includes(q) ||
        (o.awbNumber || '').toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, search]);

  return (
    <PanelShell role="admin" title="Order Management & Logistics">
      <div className="space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Total Orders
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {orders.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingBag size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Gross GMV
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {money(orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0))}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#13b59b] flex items-center justify-center font-bold">
              <DollarSign size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Shipped &amp; In Transit
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {orders.filter((o) => ['shipped', 'confirmed'].includes(o.orderStatus)).length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Truck size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Net Platform Cut (10%)
              </span>
              <span className="text-2xl font-black text-[#13b59b] mt-1 block">
                {money(
                  Math.round(
                    orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0) * 0.1
                  )
                )}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Order ID, Customer, Phone, AWB..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
              {STATUS_FILTERS.map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition capitalize cursor-pointer shrink-0 ${
                    statusFilter === st
                      ? 'bg-[#13b59b] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                const next = !audioEnabled;
                setAudioEnabled(next);
                if (next) playNotificationChime();
              }}
              title={audioEnabled ? 'Audio alerts active' : 'Audio alerts muted'}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                audioEnabled
                  ? 'bg-emerald-50 text-[#13b59b] border-emerald-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden sm:inline">
                {audioEnabled ? 'Audio Alert On' : 'Muted'}
              </span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Download size={14} />
              <span>Export Ledger (CSV)</span>
            </button>

            {/* Refresh */}
            <button
              onClick={() => loadOrders()}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 size={16} className="text-[#13b59b]" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Order ID &amp; Date</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Carrier &amp; AWB</th>
                  <th className="py-3 px-4">Order Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                      Loading orders &amp; shipments...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No matching orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => {
                    const formattedDate = o.createdAt
                      ? new Date(o.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—';

                    return (
                      <tr key={o._id} className="hover:bg-slate-50/50 transition">
                        {/* Order ID & Date */}
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 font-mono block">
                            #{String(o._id).slice(-8).toUpperCase()}
                          </strong>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {formattedDate}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800">
                            {o.shippingAddress?.fullName || o.customer?.name || 'Customer'}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {o.shippingAddress?.phone || o.customer?.phone || '—'}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                            {o.shippingAddress?.city || 'Bettiah'} ({o.shippingAddress?.postalCode || '845438'})
                          </div>
                        </td>

                        {/* Items */}
                        <td className="py-3 px-4">
                          <div className="text-slate-800 font-medium line-clamp-2 max-w-xs">
                            {(o.items || []).map((i) => i.productName).join(', ') || 'Gadget'}
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                            Qty: {(o.items || []).reduce((acc, i) => acc + (i.quantity || 1), 0)} unit(s)
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-3 px-4">
                          <strong className="text-slate-900 text-sm font-black font-mono">
                            {money(o.total || o.subtotal || 0)}
                          </strong>
                        </td>

                        {/* Payment */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                              o.paymentStatus === 'paid'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {o.paymentMethod || 'COD'} • {o.paymentStatus || 'pending'}
                          </span>
                        </td>

                        {/* Carrier & AWB */}
                        <td className="py-3 px-4">
                          {o.awbNumber ? (
                            <div>
                              <span className="font-mono text-xs font-bold text-[#13b59b] block">
                                {o.awbNumber}
                              </span>
                              <span className="text-[10px] text-slate-500 block">
                                {o.shippingCarrier || 'Delhivery Surface'}
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleGenerateAwb(o)}
                              disabled={generatingAwbId === o._id}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-[#13b59b] hover:text-white text-slate-700 rounded-lg text-[11px] font-bold border border-slate-200 transition cursor-pointer"
                            >
                              {generatingAwbId === o._id ? 'Generating...' : '+ Generate AWB'}
                            </button>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3 px-4">
                          <select
                            value={o.orderStatus || 'pending'}
                            disabled={busyStatusId === o._id}
                            onChange={(e) => handleStatusChange(o._id, e.target.value)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border capitalize focus:outline-none cursor-pointer ${
                              STATUS_STYLES[o.orderStatus] || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {STATUS_FILTERS.filter((s) => s !== 'All').map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* 1-Click Print Shipping Label */}
                            <button
                              onClick={() => {
                                if (!o.awbNumber) {
                                  handleGenerateAwb(o).then(() => setLabelModalOrder(o));
                                } else {
                                  setLabelModalOrder(o);
                                }
                              }}
                              title="Print Official Courier Shipping Label"
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                            >
                              <Printer size={15} />
                            </button>

                            {/* View Full Order Details */}
                            <button
                              onClick={() => setSelectedOrder(o)}
                              title="View Order Details"
                              className="p-1.5 bg-teal-50 hover:bg-teal-100 text-[#13b59b] rounded-lg transition cursor-pointer"
                            >
                              <Eye size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRINTABLE SHIPPING LABEL MODAL */}
        {labelModalOrder && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <Printer size={18} className="text-[#13b59b]" />
                  <span>Courier Shipping Label Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`/api/shipping/label/${labelModalOrder._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <ExternalLink size={13} /> Open Printable Label
                  </a>
                  <button
                    onClick={() => setLabelModalOrder(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
                <iframe
                  src={`/api/shipping/label/${labelModalOrder._id}`}
                  title="Shipping Label"
                  className="w-full h-[450px] bg-white rounded-lg border border-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* ORDER DETAILS MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Order Details #{String(selectedOrder._id).slice(-8).toUpperCase()}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900">
                    {selectedOrder.shippingAddress?.fullName || 'Customer'}
                  </div>
                  <div>Phone: {selectedOrder.shippingAddress?.phone || '—'}</div>
                  <div>
                    Address: {selectedOrder.shippingAddress?.addressLine1 || '—'},{' '}
                    {selectedOrder.shippingAddress?.city || 'Bettiah'} -{' '}
                    {selectedOrder.shippingAddress?.postalCode || '845438'}
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-3 space-y-2">
                  <div className="font-bold text-slate-800">Items Ordered:</div>
                  {(selectedOrder.items || []).map((i, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-50">
                      <span>{i.productName} x {i.quantity}</span>
                      <strong className="font-mono">{money(i.lineTotal)}</strong>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-sm text-slate-900 pt-1">
                    <span>Grand Total:</span>
                    <span className="text-[#13b59b] font-mono">{money(selectedOrder.total)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-teal-50 rounded-xl border border-teal-100 text-teal-900 font-semibold">
                  <span>AWB Tracking:</span>
                  <span className="font-mono font-bold">{selectedOrder.awbNumber || 'Not Generated'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelShell>
  );
}
