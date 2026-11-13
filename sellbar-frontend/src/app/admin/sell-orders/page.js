'use client';

import React, { useState, useEffect } from 'react';
import PanelShell from '@/components/PanelShell';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Smartphone,
  Phone,
  MapPin,
  RefreshCw,
  Edit,
  Eye,
  AlertTriangle,
  X,
  ShieldCheck,
  CreditCard,
  Building,
  ArrowRight,
} from 'lucide-react';
import { money, getPanelSession } from '@/lib/panel';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

const STATUS_OPTIONS = [
  'All',
  'Pickup Scheduled',
  'Picked Up',
  'Under Inspection',
  'Price Revised',
  'Customer Approved',
  'Payment Processing',
  'Completed',
  'Cancelled',
];

export default function AdminSellOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  // Status update modal state
  const [newStatus, setNewStatus] = useState('');
  const [revisedPrice, setRevisedPrice] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [technicianName, setTechnicianName] = useState('');
  const [technicianPhone, setTechnicianPhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const session = getPanelSession('admin');
      const headers = { Accept: 'application/json' };
      if (session?.token) headers.Authorization = `Bearer ${session.token}`;

      let url = '/api/admin/sell-orders';
      const params = [];
      if (statusFilter !== 'All') params.push(`status=${encodeURIComponent(statusFilter)}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      if (params.length > 0) url += `?${params.join('&')}`;

      const res = await fetch(url, { headers, cache: 'no-store' });
      const json = await res.json();
      if (json.success && json.data) {
        setOrders(json.data);
      }
    } catch (err) {
      console.error('Failed to load sell orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const handleOpenUpdate = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setRevisedPrice(String(order.finalOffer || order.estimatedPrice));
    setAdminNote('');
    setTechnicianName(order.technician?.name || '');
    setTechnicianPhone(order.technician?.phone || '');
    setUtrNumber(order.payout?.utrNumber || '');
    setUpdateModalOpen(true);
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    try {
      setUpdating(true);
      const res = await fetch('/api/admin/sell-orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrder.orderId,
          status: newStatus,
          finalOffer: Number(revisedPrice),
          note: adminNote,
          technician: technicianName.trim()
            ? { name: technicianName.trim(), phone: technicianPhone.trim() }
            : undefined,
          utrNumber: utrNumber.trim() || undefined,
          updatedBy: 'Admin Desk',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setUpdateModalOpen(false);
        fetchOrders();
      } else {
        alert(json.message || 'Update failed');
      }
    } catch (err) {
      alert(err.message || 'Error updating order');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pickup Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Inspection':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Price Revised':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <PanelShell role="admin" title="Customer Sell Orders">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Customer Smartphone Sell Orders
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live trade-in evaluation requests, doorstep dispatch status, and on-site instant payouts.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh List</span>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {STATUS_OPTIONS.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, customer, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
            />
          </form>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Order ID &amp; Date</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Device &amp; Variant</th>
                  <th className="py-3.5 px-4">Condition</th>
                  <th className="py-3.5 px-4">Offered Payout</th>
                  <th className="py-3.5 px-4">Pickup Window</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {orders.length > 0 ? (
                  orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-slate-900 block">{o.orderId}</span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(o.createdAt || Date.now()).toLocaleDateString('en-IN')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{o.customer?.name}</span>
                        <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone size={11} className="text-[#13b59b]" /> {o.customer?.phone}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            <img
                              src={getProductImageUrl(o.device, 'mobile')}
                              alt={o.device?.model || "Device"}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getCategoryFallbackImage('mobile');
                              }}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{o.device?.model}</span>
                            <span className="text-[11px] text-slate-500">
                              {o.device?.variant?.ram} / {o.device?.variant?.storage}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 text-[11px]">
                          <div>Func: <span className="font-bold capitalize">{o.conditionAssessment?.functional}</span></div>
                          <div>Screen: <span className="font-bold capitalize">{o.conditionAssessment?.screen}</span></div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-black text-slate-900 block text-sm">
                          {money(o.finalOffer || o.estimatedPrice)}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold uppercase">
                          {o.payout?.method || 'UPI'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">
                          {o.pickupDetails?.pickupDate}
                        </span>
                        <span className="text-[11px] text-slate-400 line-clamp-1">
                          {o.pickupDetails?.timeSlot}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(
                            o.status
                          )}`}
                        >
                          {o.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenUpdate(o)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400">
                      {loading ? 'Loading orders...' : 'No selling requests match this criteria.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Status & Price Modal */}
        {updateModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Order Inspection Desk
                  </span>
                  <h3 className="font-black text-lg text-slate-900">{selectedOrder.orderId}</h3>
                </div>
                <button
                  onClick={() => setUpdateModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <div><span className="font-bold text-slate-800">Customer:</span> {selectedOrder.customer?.name} ({selectedOrder.customer?.phone})</div>
                <div><span className="font-bold text-slate-800">Device:</span> {selectedOrder.device?.model} ({selectedOrder.device?.variant?.ram}/{selectedOrder.device?.variant?.storage})</div>
                <div><span className="font-bold text-slate-800">Address:</span> {selectedOrder.pickupDetails?.address}, {selectedOrder.pickupDetails?.pincode}</div>
              </div>

              <form onSubmit={handleSaveUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Update Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  >
                    {STATUS_OPTIONS.filter((s) => s !== 'All').map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Final Payout Offer (₹)</label>
                  <input
                    type="number"
                    value={revisedPrice}
                    onChange={(e) => setRevisedPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Initial estimated quote: {money(selectedOrder.estimatedPrice)}
                  </span>
                </div>

                {/* Technician Assignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Field Agent</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={technicianName}
                      onChange={(e) => setTechnicianName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#13b59b]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Agent Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={technicianPhone}
                      onChange={(e) => setTechnicianPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#13b59b]"
                    />
                  </div>
                </div>

                {/* Bank / UPI Payout UTR */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Payout Transaction UTR / Ref No
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UPI/420194829103 or IMPS-291048291"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Customer can see this UTR on their dashboard to confirm payout credit.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inspection Note / Reason for Revision</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Technician verified device condition. Battery health was 82%. Payout approved."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setUpdateModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow transition"
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PanelShell>
  );
}
