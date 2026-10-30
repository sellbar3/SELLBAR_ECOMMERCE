'use client';
import React from 'react';
import Link from 'next/link';
import { Smartphone, ChevronRight, Tag } from 'lucide-react';
export default function MobilePriceListView({ brandName, tagline, models }) {
    return (<div className="bg-[#f7f9fa] min-h-screen text-slate-900 pb-16 antialiased">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#13b59b]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400"/>
          <Link href="/find-new-phone" className="hover:text-[#13b59b]">Price Lists</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400"/>
          <span className="text-[#13b59b] font-semibold">{brandName} Price List</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#13b59b]/10 text-[#13b59b] text-xs font-bold uppercase">
            <Tag className="w-3.5 h-3.5"/>
            <span>2026 Price List India</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">{brandName} Mobile Price List in India</h1>
          <p className="text-sm text-slate-600">{tagline}</p>
        </div>

        {/* Price Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">Latest {brandName} Smartphone Models</span>
            <span className="text-xs text-slate-400">Updated Daily</span>
          </div>
          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {models.map((m, i) => (<div key={i} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-[#13b59b]"/>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{m.name}</div>
                    <div className="text-xs text-slate-500">{m.ram}</div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div>
                    <div className="text-xs text-slate-400">MRP</div>
                    <div className="font-bold text-slate-900">{m.price}</div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs text-emerald-600 font-semibold">Sellbar Refurbished</div>
                    <div className="font-black text-[#13b59b]">{m.refurbishedPrice}</div>
                  </div>
                  <Link href="/buy-refurbished" className="bg-[#2bbb9e] hover:bg-[#23a58c] text-white px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-xs transition">
                    View Deals
                  </Link>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}
