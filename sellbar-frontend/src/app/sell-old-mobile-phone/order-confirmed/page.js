'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Calendar,
  Phone,
  ShieldCheck,
  ArrowRight,
  Printer,
  Sparkles,
  Smartphone,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SB-SELL-89421';
  const phone = searchParams.get('phone') || '9876543210';
  const amount = searchParams.get('amount') || '36000';

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={44} />
          </div>

          <div>
            <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-2">
              Pickup Slot Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Selling Request Placed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Your request has been booked with Order ID{' '}
              <span className="font-extrabold text-slate-900">{orderId}</span>.
            </p>
          </div>

          {/* Amount Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Expected Doorstep Payout
            </span>
            <span className="text-3xl sm:text-4xl font-black text-[#13b59b] mt-1">
              ₹{Number(amount).toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 font-semibold">
              Instant UPI / Direct Bank Transfer upon on-site physical check
            </span>
          </div>

          {/* Next Steps Timeline */}
          <div className="text-left space-y-3 pt-2">
            <h3 className="font-extrabold text-sm text-slate-900">What Happens Next?</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  1
                </span>
                <div>
                  <span className="font-bold text-slate-900 block">Verification Call</span>
                  <span>Our Bettiah coordination desk will call your registered number (+91 {phone}) to confirm the arrival window.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  2
                </span>
                <div>
                  <span className="font-bold text-slate-900 block">Doorstep 32-Point Diagnostics</span>
                  <span>Certified technician performs quick screen and hardware check in front of your eyes (15-20 mins).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  3
                </span>
                <div>
                  <span className="font-bold text-emerald-900 block">Instant Payment Transfer</span>
                  <span>Payment is credited to your bank account or UPI ID immediately before technician takes device.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Device Preparation Notice */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-left space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <AlertTriangle size={15} /> Device Preparation Checklist:
            </div>
            <ul className="list-disc list-inside text-amber-800 space-y-1 pl-1">
              <li>Back up your photos and contacts to Google Drive or iCloud.</li>
              <li>Sign out of Apple ID / Google Account and disable Find My Device.</li>
              <li>Charge the phone to at least 50% battery for technician diagnostics.</li>
              <li>Keep original charger, box, and bill ready if selected for cash bonus.</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sell-old-mobile-phone"
              className="w-full sm:w-auto px-6 py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white font-bold rounded-xl text-xs shadow-md transition text-center"
            >
              Sell Another Phone
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition text-center"
            >
              Back to Storefront
            </Link>
          </div>
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
