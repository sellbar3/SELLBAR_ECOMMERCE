"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Sparkles, 
  Lock, 
  HelpCircle 
} from "lucide-react";

export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. Eligibility & User Account" },
    { id: "sec-2", title: "2. Buying Refurbished Products" },
    { id: "sec-3", title: "3. Device Buyback & Ownership" },
    { id: "sec-4", title: "4. Pricing, GST & Payouts" },
    { id: "sec-5", title: "5. Limitation of Liability" },
    { id: "sec-6", title: "6. Jurisdiction & Dispute Resolution" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Terms &amp; Conditions</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" /> Legal Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms and Conditions of Service
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              These terms govern your access to Sellbar.in, your purchases of certified refurbished electronics, and your transactions when selling used devices through our buyback service.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span><strong>Effective Date:</strong> January 1, 2026</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Governed under Indian Contract Act, 1872
              </span>
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
              <h4 className="font-bold text-slate-900">Legal Department</h4>
              <p className="text-slate-500">Inquiries regarding compliance, contracts, and IP rights:</p>
              <a href="mailto:legal@sellbar.in" className="text-[#2bbda3] font-bold underline block pt-1">
                legal@sellbar.in
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section id="sec-1" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 1. Eligibility &amp; User Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By using Sellbar, you represent that you are at least 18 years of age and legally competent to enter into binding agreements. You are responsible for safeguarding your login credentials and for all activities that occur under your mobile OTP-authenticated account.
              </p>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 2. Buying Refurbished Products
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All refurbished devices sold on Sellbar undergo rigorous 32-point diagnostic quality testing. Devices are categorized into condition grades (Flawless, Very Good, Good). Every device is accompanied by our 6 to 12 months warranty and 7-day doorstep replacement policy.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 3. Device Buyback &amp; Lawful Ownership
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When selling a pre-owned device to Sellbar, you explicitly warrant that you are the lawful owner with unencumbered rights to sell. The device must not be stolen, blacklisted, financed with pending EMIs, or subject to any police complaint.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
                <strong>Data Sanitization Clause:</strong> While our doorstep executives carry out a certified DoD data sanitization protocol, sellers are legally advised to log out of Apple iCloud, Google Accounts, and biometric passes prior to device handover.
              </div>
            </section>

            {/* Section 4 */}
            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 4. Pricing, GST &amp; Payouts
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All retail prices listed on Sellbar.in are in Indian Rupees (INR) and inclusive of 18% GST with applicable input tax credits. For trade-in sellers, initial online estimates are verified upon physical inspection; instant payout is transferred to the seller&apos;s verified UPI ID or IMPS bank account immediately upon digital signature.
              </p>
            </section>

            {/* Section 5 & 6 */}
            <section id="sec-5" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sellbar Technologies India Private Limited shall not be liable for any indirect, special, or consequential damages resulting from platform usage or hardware operations beyond the documented invoice purchase value of the product.
              </p>
            </section>

            <section id="sec-6" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">6. Jurisdiction &amp; Dispute Resolution</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                These terms are governed by the laws of India. Any legal dispute, arbitration, or statutory claim arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi or Bettiah, West Champaran, Bihar.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
