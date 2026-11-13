'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  ChevronRight,
  Clock,
  CheckCircle2,
  Calendar,
  Phone,
  ShieldCheck,
  Plus,
  ArrowRight,
  Truck,
  UserCheck,
  Check,
  CreditCard,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { money } from '@/lib/panel';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

const SELL_STEPS = [
  { key: 'placed', label: 'Pickup Booked', desc: 'Slot confirmed' },
  { key: 'assigned', label: 'Agent Assigned', desc: 'Technician on way' },
  { key: 'inspected', label: 'Device Inspected', desc: '32-point diagnostics' },
  { key: 'completed', label: 'Payment Done', desc: 'Instant cash/UPI' },
];

function getStepIndex(status) {
  const s = String(status || '').toLowerCase();
  if (s.includes('completed') || s.includes('paid')) return 3;
  if (s.includes('inspect') || s.includes('approved') || s.includes('revised') || s.includes('price')) return 2;
  if (s.includes('picked') || s.includes('assigned') || s.includes('out for pickup')) return 1;
  return 0; // 'Pickup Scheduled' / 'Placed'
}

export default function CustomerSellOrdersHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function loadSellHistory() {
      try {
        setLoading(true);
        const session = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('sellbar_session') || '{}') : {};
        const phone = session?.user?.phone;
        const url = phone ? `/api/sell-orders?phone=${encodeURIComponent(phone)}` : '/api/sell-orders';
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && json.data) {
          setOrders(json.data);
          if (json.data.length > 0) {
            setExpandedId(json.data[0].orderId);
          }
        }
      } catch (err) {
        console.error('Failed to load sell history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSellHistory();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <Link href="/account" className="hover:text-[#13b59b] transition">Account</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 font-bold">Sell Requests &amp; Payouts</span>
          </nav>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Trade-In &amp; Sell Orders
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Live status tracking, technician assignment &amp; payment confirmation for your sold gadgets.
            </p>
          </div>

          <Link
            href="/sell-old-mobile-phone"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-[0.99]"
          >
            <Plus size={15} />
            <span>Sell Another Device</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse h-40" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map((o) => {
              const currentStep = getStepIndex(o.status);
              const isExpanded = expandedId === o.orderId;
              const imgUrl = getProductImageUrl(o.device, 'mobile');
              const isCompleted = currentStep === 3;

              return (
                <div
                  key={o.orderId}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-slate-300"
                >
                  {/* Order Top Bar */}
                  <div
                    onClick={() => toggleExpand(o.orderId)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                        <img
                          src={imgUrl}
                          alt={o.device?.model || "Device"}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getCategoryFallbackImage('mobile');
                          }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                            {o.device?.model || 'Smartphone Trade-In'}
                          </h3>
                          <span
                            className={`px-3 py-0.5 rounded-full text-xs font-bold border ${
                              isCompleted
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-teal-50 text-[#13b59b] border-teal-200'
                            }`}
                          >
                            {o.status || 'Pickup Scheduled'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1.5">
                          <span>
                            Order ID: <strong className="text-slate-800 font-mono">#{o.orderId}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {o.pickupDetails?.pickupDate || 'Scheduled Soon'} ({o.pickupDetails?.timeSlot || '10:00 AM - 01:00 PM'})
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:border-l sm:border-slate-100 sm:pl-6">
                      <div className="text-left sm:text-right">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Payout Amount
                        </span>
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                          {money(o.finalOffer || o.estimatedPrice)}
                        </span>
                        <span className="text-[11px] font-bold text-[#13b59b] block uppercase">
                          Via {o.payout?.method || 'UPI Transfer'}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition shrink-0"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Visual Step Tracker & Order Details Panel */}
                  <div className="border-t border-slate-100 bg-slate-50/60 p-6 sm:p-8">
                    {/* Visual Stepper */}
                    <div className="mb-8">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                        Live Pickup &amp; Inspection Status
                      </h4>

                      <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0 hidden sm:block">
                          <div
                            className="h-full bg-[#13b59b] transition-all duration-500"
                            style={{ width: `${(currentStep / (SELL_STEPS.length - 1)) * 100}%` }}
                          />
                        </div>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                          {SELL_STEPS.map((st, idx) => {
                            const isDone = idx < currentStep;
                            const isCurrent = idx === currentStep;
                            const isPending = idx > currentStep;

                            return (
                              <div
                                key={st.key}
                                className="flex sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-2"
                              >
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                                    isDone
                                      ? 'bg-[#13b59b] text-white shadow-xs'
                                      : isCurrent
                                      ? 'bg-white border-2 border-[#13b59b] text-[#13b59b] ring-4 ring-[#13b59b]/20 shadow-sm animate-pulse'
                                      : 'bg-white border border-slate-300 text-slate-400'
                                  }`}
                                >
                                  {isDone ? (
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  ) : (
                                    <span>{idx + 1}</span>
                                  )}
                                </div>

                                <div>
                                  <span
                                    className={`text-xs font-bold block ${
                                      isDone || isCurrent ? 'text-slate-900' : 'text-slate-400'
                                    }`}
                                  >
                                    {st.label}
                                  </span>
                                  <span className="text-[11px] text-slate-500 block leading-tight">
                                    {st.desc}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Step Details & Field Agent Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200/60">
                      {/* Left: Pickup Address & Time */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                          <MapPin className="w-4 h-4 text-[#13b59b]" />
                          <span>Pickup Address</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {o.pickupDetails?.address || 'Doorstep Pickup'}, {o.pickupDetails?.pincode}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-2">
                          Contact: <strong>+91 {o.pickupDetails?.phone || o.customer?.phone || 'Provided'}</strong>
                        </p>
                      </div>

                      {/* Right: Payment & Verification Details */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                          <CreditCard className="w-4 h-4 text-[#13b59b]" />
                          <span>Payout Details</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>Payment Mode:</span>
                          <strong className="text-slate-900 uppercase">
                            {o.payout?.method || 'Instant UPI'}
                          </strong>
                        </div>
                        {o.payout?.upiId && (
                          <div className="flex items-center justify-between text-xs text-slate-600 mt-1">
                            <span>UPI ID:</span>
                            <span className="font-mono text-slate-800">{o.payout.upiId}</span>
                          </div>
                        )}
                        {o.payout?.utrNumber && (
                          <div className="flex items-center justify-between text-xs text-slate-600 mt-1">
                            <span>Bank UTR / Ref:</span>
                            <span className="font-mono font-bold text-emerald-700">{o.payout.utrNumber}</span>
                          </div>
                        )}
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Expected Payout Date:</span>
                          <span className="font-semibold text-slate-700">{o.pickupDetails?.pickupDate || 'Today'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-4 shadow-xs">
            <Smartphone size={44} className="text-slate-300 mx-auto" />
            <h3 className="font-bold text-lg text-slate-900">No Selling Requests Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Ready to upgrade? Check the live market valuation for your old phone and schedule free doorstep pickup today.
            </p>
            <Link
              href="/sell-old-mobile-phone"
              className="inline-block py-2.5 px-6 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              Get My Phone Value Now
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
