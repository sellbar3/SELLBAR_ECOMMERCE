"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function RefundPolicyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. The 7-Day Inspection Window" },
    { id: "sec-2", title: "2. Eligible Return Conditions" },
    { id: "sec-3", title: "3. Replacement vs. Full Refund" },
    { id: "sec-4", title: "4. Return Pickup & Inspection" },
    { id: "sec-5", title: "5. Payout Mode Timelines" },
    { id: "sec-6", title: "6. How to Trigger Return" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Refund &amp; Returns</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <RotateCcw className="w-3.5 h-3.5" /> 7-Day Money-Back Assurance
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Return, Replacement &amp; Refund Policy
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We want you to love your certified refurbished tech. If the device does not match your expectations or exhibits any hardware defect within 7 days of delivery, you can request an instant doorstep replacement or 100% money refund with zero restocking fees.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span><strong>Updated:</strong> January 1, 2026</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ₹0 Restocking / Processing Fees
              </span>
            </div>
          </div>
        </div>

        {/* Plain English Summary for Customers */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <h2 className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Plain English Rules for Buyers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">7 Full Days to Test</strong>
              <p className="text-slate-300">Test the camera, battery, display, and calls. If anything is amiss, initiate return from your account.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">Free Doorstep Pickup</strong>
              <p className="text-slate-300">Our courier collects the device directly from your home. No postage or shipping costs to you.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">Fast UPI / Bank Refund</strong>
              <p className="text-slate-300">Refunds are credited to your UPI ID or original payment source within 24 to 48 hours of inspection.</p>
            </div>
          </div>
        </div>

        {/* Two-Column Layout with Sticky Sidebar */}
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

            {/* Support Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">Initiate Return Easily</h4>
              <p className="text-slate-500">Go to My Orders or ping support directly with your Order ID.</p>
              <div className="pt-2">
                <Link
                  href="/orders"
                  className="block text-center py-2 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-[#2bbda3] transition-colors"
                >
                  Go to My Orders
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section id="sec-1" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2bbda3]" /> 1. The 7-Day Inspection Window
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You have 7 full calendar days starting from the timestamp your parcel is handed over by the courier partner. We encourage you to thoroughly test all features (touchscreen, camera lenses, battery longevity, wireless connections, microphones) to ensure complete satisfaction.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. Eligible Return Conditions
              </h2>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbda3] shrink-0 mt-0.5" />
                  <span><strong>Original Accessories:</strong> Must include the Sellbar Assured box, certified charging cable, and warranty invoice.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbda3] shrink-0 mt-0.5" />
                  <span><strong>Account Sign-Out:</strong> Device must be signed out of Apple iCloud, Google Account, or Samsung Knox.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbda3] shrink-0 mt-0.5" />
                  <span><strong>No Post-Delivery Physical Damage:</strong> Devices dropped, cracked, or exposed to liquid after delivery will be serviced under standard warranty rather than return/refund.</span>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#2bbda3]" /> 3. Replacement vs. Full Refund Choice
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">Option A: Express Replacement</strong>
                  <p className="text-slate-600">If in stock, an identical or higher cosmetic grade model is dispatched within 24 hours of return collection.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">Option B: 100% Money-Back</strong>
                  <p className="text-slate-600">If preferred or if replacement stock is unavailable, 100% of the invoice amount is refunded back to your account.</p>
                </div>
              </div>
            </section>

            {/* Section 4 & 5 */}
            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#2bbda3]" /> 4 &amp; 5. Payout Mode Timelines
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-bold text-slate-900">Payment Channel</th>
                      <th className="p-3 font-bold text-[#2bbda3]">Credit Turnaround</th>
                      <th className="p-3 font-bold text-slate-700">Destination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-medium text-slate-800">UPI / QR Payment</td>
                      <td className="p-3 font-bold text-emerald-700">2 to 4 Hours</td>
                      <td className="p-3 text-slate-600">GPay, PhonePe, Paytm, BHIM</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Credit / Debit Cards</td>
                      <td className="p-3 font-bold text-emerald-700">3 to 5 Business Days</td>
                      <td className="p-3 text-slate-600">Issuing Bank Statement</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Cash on Delivery (COD)</td>
                      <td className="p-3 font-bold text-emerald-700">Within 24 Hours</td>
                      <td className="p-3 text-slate-600">Customer Verified UPI / Bank Account</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
              <h2 className="text-lg font-bold text-slate-900">6. How to Trigger Return</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log into your account, open <Link href="/account" className="text-[#2bbda3] font-bold underline">My Orders</Link>, click &ldquo;Request Return&rdquo;, and select the reason. Alternatively, WhatsApp our helpline directly at <strong>+91-77175-17777</strong> with your Order ID for instant booking.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
