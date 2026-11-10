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

          {/* WhatsApp Owner Contact Option */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <span className="text-xs text-emerald-900 font-semibold block">
              Want immediate pickup confirmation or faster cash payout?
            </span>
            <a
              href={`https://wa.me/917717517777?text=${encodeURIComponent(
                `Hello Sellbar! I have submitted sell order ${orderId} for ₹${amount}. Registered phone: +91 ${phone}. Please confirm my doorstep pickup window.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-black shadow-md transition cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Connect with Owner on WhatsApp (+91 77175 17777)</span>
            </a>
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
