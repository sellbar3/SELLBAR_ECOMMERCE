'use client';
import React from 'react';
import Link from 'next/link';
import { Wrench, ShieldCheck, Clock, CheckCircle2, ChevronRight, Sparkles, } from 'lucide-react';
export default function RepairServiceView({ serviceName, serviceDescription, basePrice, slug, }) {
    const brand = slug?.[0] ? slug[0].toUpperCase() : '';
    const model = slug?.[1]
        ? slug[1]
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
        : '';
    const displayTitle = model
        ? `${brand} ${model} ${serviceName}`
        : `${serviceName} at Doorstep`;
    return (<div className="bg-[#f7f9fa] min-h-screen text-slate-900 pb-16 antialiased">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#13b59b]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400"/>
          <Link href="/repair" className="hover:text-[#13b59b]">
            Repair Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400"/>
          <span className="text-[#13b59b] font-semibold">{displayTitle}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Service Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#13b59b]/10 text-[#13b59b] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5"/>
              <span>30-Minute Doorstep Mobile Repair</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {displayTitle}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              {serviceDescription} Repaired right in front of your eyes by certified expert technicians using OEM-grade quality components.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-teal-50 via-emerald-50 to-[#f0faf8] border border-[#13b59b]/25 flex items-center justify-between max-w-lg">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Starting Price
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#13b59b] mt-0.5">
                  {basePrice}
                </div>
              </div>
              <button type="button" onClick={() => {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('open-login-modal'));
            }
        }} className="bg-[#2bbb9e] hover:bg-[#23a58c] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer">
                Book Repair Slot →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#13b59b] shrink-0"/>
                <span>30-Min Fast Repair</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0"/>
                <span>6 Months Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0"/>
                <span>Doorstep Service</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-28 h-28 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center p-4">
              <Wrench className="w-16 h-16 text-[#13b59b]"/>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-base">{serviceName}</div>
              <div className="text-xs text-slate-500 mt-0.5">100% Genuine Certified Replacement Parts</div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
