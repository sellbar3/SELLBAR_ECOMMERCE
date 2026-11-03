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
} from 'lucide-react';
import { money } from '@/lib/panel';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

export default function CustomerSellOrdersHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSellHistory() {
      try {
        setLoading(true);
        const res = await fetch('/api/sell-orders');
        const json = await res.json();
        if (json.success && json.data) {
          setOrders(json.data);
        }
      } catch (err) {
        console.error('Failed to load sell history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSellHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/account" className="hover:text-[#13b59b] transition">Account</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Sell Old Mobile Requests</span>
          </nav>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Trade-In &amp; Sell History
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track doorstep pickup appointments, physical diagnostics, and cash payouts.
            </p>
          </div>

          <Link
            href="/sell-old-mobile-phone"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow transition"
          >
            <Plus size={14} /> Sell Another Phone
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse h-36" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.orderId}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1.5 overflow-hidden">
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
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-slate-900">{o.device?.model}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {o.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      Order ID: <span className="font-bold text-slate-700">{o.orderId}</span> • Pickup Slot: {o.pickupDetails?.pickupDate} ({o.pickupDetails?.timeSlot})
                    </p>

                    <p className="text-xs text-slate-400 mt-0.5">
                      Pickup Address: {o.pickupDetails?.address}, {o.pickupDetails?.pincode}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6 shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">Expected Payout</span>
                    <span className="text-2xl font-black text-slate-900">{money(o.finalOffer || o.estimatedPrice)}</span>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-600 mt-1 uppercase">
                    Via {o.payout?.method || 'UPI'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Smartphone size={44} className="text-slate-300 mx-auto" />
            <h3 className="font-bold text-lg text-slate-900">No Selling Requests Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Ready to upgrade? Check the live market valuation for your old phone and schedule free doorstep pickup today.
            </p>
            <Link
              href="/sell-old-mobile-phone"
              className="inline-block py-2.5 px-6 bg-[#13b59b] text-white rounded-xl text-xs font-bold shadow"
            >
              Get My Phone Value Now
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
