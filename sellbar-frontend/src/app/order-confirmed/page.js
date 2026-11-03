'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Calendar,
  Truck,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || searchParams.get('orderId') || 'SB-ORD-98421';

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={44} />
        </div>

        <div>
          <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-2">
            Order Successfully Placed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Thank You for Shopping at Sellbar!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Your e-commerce order <span className="font-bold text-slate-900">{orderId}</span> has been confirmed. Our team in West Champaran is preparing your package for express dispatch.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Estimated Delivery:</span>
            <span className="font-bold text-slate-900">Within 24 - 48 Hours</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Warranty Coverage:</span>
            <span className="font-bold text-emerald-600">12 Months Sellbar Assured</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/orders"
            className="w-full sm:w-auto px-6 py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white font-bold rounded-xl text-xs shadow-md transition"
          >
            Track Order Details
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-sm">Loading Order Confirmation...</div>}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
