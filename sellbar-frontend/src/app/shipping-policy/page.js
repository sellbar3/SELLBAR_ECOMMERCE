"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Truck, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  FileText, 
  BadgeIndianRupee, 
  Sparkles,
  Search
} from "lucide-react";

export default function ShippingPolicyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. Delivery Zones & Timelines" },
    { id: "sec-2", title: "2. Shipping Charges & Free Delivery" },
    { id: "sec-3", title: "3. Packaging & Open Box Policy" },
    { id: "sec-4", title: "4. Live Tracking & Couriers" },
    { id: "sec-5", title: "5. Doorstep Buyback Timelines" },
    { id: "sec-6", title: "6. Non-Delivery & Redelivery SLA" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Shipping Policy</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" /> Fast, Insured Logistics
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Shipping, Fulfillment &amp; Delivery Policy
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every refurbished order and device buyback pickup is backed by insured transit, tamper-proof packaging, and live SMS/WhatsApp tracking across Bettiah, Bihar, and all 19,000+ Indian postal codes.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span><strong>Updated:</strong> January 1, 2026</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free Shipping on Orders ₹999+
              </span>
            </div>
          </div>
        </div>

        {/* Plain English Summary */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <h2 className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Shipping Key Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">Same-Day Local Delivery</strong>
              <p className="text-slate-300">Orders in Bettiah, Bagaha, and Motihari placed before 2:00 PM are delivered same-day or next-day.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">Pan-India Air Couriers</strong>
              <p className="text-slate-300">Shipped via BlueDart, Delhivery, and DTDC express air networks (2 to 4 business days).</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">100% Transit Insured</strong>
              <p className="text-slate-300">In the rare event of damage or loss during transit, you receive an immediate zero-cost replacement.</p>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sticky Left Sidebar */}
          <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#2bbda3]" /> Document Navigation
              </h3>
              <nav className="space-y-1">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-teal-50 text-[#2bbda3] font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">Track an Order</h4>
              <p className="text-slate-500">Enter your Order ID to get real-time live courier dispatch details.</p>
              <div className="pt-2">
                <Link
                  href="/track-order"
                  className="block text-center py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-[#2bbda3] transition-colors"
                >
                  Track Order Online
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section id="sec-1" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2bbda3]" /> 1. Delivery Zones &amp; Timelines
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#2bbda3] text-white">Local Hub</span>
                  <h3 className="font-bold text-slate-900 text-sm">West Champaran &amp; North Bihar</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Same-Day or Next-Day Delivery:</strong> Orders in Bettiah, Bagaha, Motihari, and nearby pin codes placed before 2:00 PM are delivered within 24 hours by Sellbar Express riders.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-800">Pan-India Express</span>
                  <h3 className="font-bold text-slate-900 text-sm">Metros &amp; All Other States</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>2 to 4 Business Days:</strong> Shipped via tier-1 air logistics partners (BlueDart, Delhivery, DTDC) with insured transit and end-to-end SMS &amp; WhatsApp alerts.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BadgeIndianRupee className="w-5 h-5 text-[#2bbda3]" /> 2. Shipping Charges &amp; Free Delivery
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-bold text-slate-900">Cart Total</th>
                      <th className="p-3 font-bold text-[#2bbda3]">Standard Shipping Fee</th>
                      <th className="p-3 font-bold text-slate-700">Estimated Transit Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Orders ₹999 and above</td>
                      <td className="p-3 font-bold text-emerald-700">FREE SHIPPING (₹0)</td>
                      <td className="p-3 text-slate-600">2-4 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Orders below ₹999</td>
                      <td className="p-3 font-medium text-slate-900">₹49 Flat Rate</td>
                      <td className="p-3 text-slate-600">2-4 Business Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Doorstep Device Buyback Pickup</td>
                      <td className="p-3 font-bold text-emerald-700">100% FREE ALWAYS</td>
                      <td className="p-3 text-slate-600">Same-Day / Next-Day Slot</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#2bbda3]" /> 3. Packaging &amp; Open Box Policy
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All refurbished devices are packed in multi-layered, shock-absorbing recyclable foam with a tamper-evident holographic security seal. In select pin codes in Bettiah and Patna, we provide <strong>Open Box Delivery</strong> where you can inspect the cosmetic condition before sharing the delivery confirmation OTP.
              </p>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 4. Live Tracking &amp; Couriers
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As soon as your package leaves our fulfillment warehouse, you receive an automated SMS, WhatsApp, and email update containing your active AWB tracking number. You can check the location and rider contact number live from our portal.
              </p>
            </section>

            {/* Section 5 & 6 */}
            <section id="sec-5" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">5 &amp; 6. Redelivery SLA &amp; Doorstep Buyback</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                If you miss your delivery, our courier will automatically attempt redelivery up to 3 times over consecutive days. For doorstep device selling, the inspection agent calls you 15 minutes prior to arriving at your premises.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
