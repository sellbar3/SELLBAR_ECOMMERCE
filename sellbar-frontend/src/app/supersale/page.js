"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Box, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Building,
  HelpCircle,
  PhoneCall,
  BadgeIndianRupee,
  FileSpreadsheet,
  Sparkles
} from "lucide-react";

const LOT_CATEGORIES = [
  {
    grade: "Grade A+ (Like New Wholesale)",
    badge: "Top Seller",
    moq: "25 Handsets",
    margin: "18% - 25% Retail Margin",
    desc: "100% spotless screens and mint housing. Battery health guaranteed >88%. Every unit tested with diagnostic test sheets.",
    bestFor: "Flagship retail shops & high-street mobile showrooms"
  },
  {
    grade: "Grade A (Very Good Wholesale)",
    badge: "Best Value",
    moq: "50 Handsets",
    margin: "25% - 35% Retail Margin",
    desc: "Minor micro-marks on outer bezel invisible from 12 inches. 100% original OEM displays and healthy batteries.",
    bestFor: "High-volume budget buyers seeking maximum turnover"
  },
  {
    grade: "Grade B (Commercial As-Is Lots)",
    badge: "Volume Lots",
    moq: "100 Handsets",
    margin: "35% - 50% Resale Margin",
    desc: "Light cosmetic wear on casing. Fully working logic boards, cameras, and connectivity. Tested for zero functional defects.",
    bestFor: "Sub-distributors & regional hardware repair centers"
  }
];

export default function SupersalePage() {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Bettiah");
  const [monthlyVolume, setMonthlyVolume] = useState("25 - 50 Units");
  const [preferredBrands, setPreferredBrands] = useState("Apple iPhones & Samsung Galaxy");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Supersale B2B Wholesale</span>
        </nav>

        {/* Hero */}
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/40 text-[#2bbda3] text-xs font-bold tracking-wider uppercase">
              <Box className="w-3.5 h-3.5" /> B2B Recommerce Terminal
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Buy Refurbished Tech in Bulk at Wholesale Margins
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Supplying 500+ mobile shop owners and regional electronics traders with verified, pre-graded batches of iPhones, Samsungs, and MacBooks with 100% ITC-compliant GST invoices.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#register-supersale"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg flex items-center gap-1.5"
              >
                Request Weekly Stock Sheet (.XLS) <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#wholesale-lots"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                View Lot Grades
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 space-y-3 shrink-0 w-full sm:w-auto">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 100% Tested Batches
            </div>
            <div className="text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> 15-Day DOA Instant Replacement</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> IMEI / Serial Number Tagged Invoices</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> Insured Doorstep Cargo Fulfillment</div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#2bbda3]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Wholesale Lots Grid */}
        <div id="wholesale-lots" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Inventory Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Pre-Graded Wholesale Batches</h2>
            <p className="text-xs text-slate-500">Transparent pricing per lot. Detailed diagnostic sheets delivered for every device.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOT_CATEGORIES.map((lot, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:border-[#2bbda3]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3]">
                      {lot.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500">MOQ: {lot.moq}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{lot.grade}</h3>
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                    Expected Margin: {lot.margin}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{lot.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-500">
                  <strong className="text-slate-800">Best For:</strong> {lot.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wholesale Registration Form */}
        <div id="register-supersale" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Wholesale Account Registered!</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you <span className="font-bold text-slate-900">{contactName}</span> from <span className="font-bold text-slate-900">{businessName}</span>! Our Wholesale Accounts manager will email the live weekly Supersale stock sheet to <span className="font-bold text-[#2bbda3]">{email}</span> and contact you at <span className="font-bold text-slate-900">{phone}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Register Another Business
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Wholesale Registration</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Access Live Supersale Stock Sheets</h3>
                <p className="text-xs text-slate-500">Get weekly Excel price lists with IMEI test sheets and wholesale volume pricing.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Business / Firm Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Telecom Wholesalers"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Singhania"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sales@apextelecom.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">City &amp; State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patna, Bihar"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Expected Monthly Volume</label>
                  <select
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs bg-white"
                  >
                    <option value="25 - 50 Units">25 - 50 Units / Month</option>
                    <option value="50 - 100 Units">50 - 100 Units / Month</option>
                    <option value="100 - 500 Units">100 - 500 Units / Month</option>
                    <option value="500+ Units">500+ Units (Enterprise Bulk)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Inventory Focus</label>
                  <select
                    value={preferredBrands}
                    onChange={(e) => setPreferredBrands(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs bg-white"
                  >
                    <option value="Apple iPhones & Samsung Galaxy">Apple iPhones &amp; Samsung Galaxy</option>
                    <option value="Budget Android (Xiaomi / Realme / Vivo)">Budget Android (Xiaomi / Realme / Vivo)</option>
                    <option value="MacBooks & Business Laptops">MacBooks &amp; Business Laptops</option>
                    <option value="iPads & Smartwatches">iPads &amp; Smartwatches</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Registering Wholesale Account..." : <>Get Live Stock Sheet &amp; Wholesale Pricing <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
