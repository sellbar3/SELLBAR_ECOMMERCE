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
  PhoneCall
} from "lucide-react";

export default function SupersalePage() {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Bettiah");
  const [monthlyVolume, setMonthlyVolume] = useState("25 - 50 Units");
  const [preferredBrands, setPreferredBrands] = useState("Apple & Samsung Flagships");
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

  const LOT_CATEGORIES = [
    {
      grade: "Grade A - Like New Lots",
      desc: "Zero scratches or cosmetic marks. 100% original screens, battery health strictly >85%, 32-point QC passed.",
      moq: "25 Units",
      bestFor: "Premium retail showrooms & direct counter sales"
    },
    {
      grade: "Grade B - Very Good Lots",
      desc: "Minor micro-scratches barely noticeable. 100% functional, all sensors active, authentic parts verified.",
      moq: "50 Units",
      bestFor: "High-volume budget buyers seeking peak margin"
    },
    {
      grade: "Grade C / As-Is Assorted",
      desc: "Cosmetically worn or minor battery degradation. Fully functional motherboards, tested cameras & ports.",
      moq: "100 Units",
      bestFor: "Hardware repair centers & secondary regional wholesalers"
    }
  ];

  const FAQS = [
    {
      q: "What is the Minimum Order Quantity (MOQ) for Supersale B2B batches?",
      a: "Our baseline MOQ begins at 25 units for Grade A flagship smartphones and 10 units for commercial laptops / MacBooks. Larger volumes unlock tier-2 wholesale discounts."
    },
    {
      q: "Do Supersale bulk orders come with GST tax invoices?",
      a: "Yes, 100% of all bulk orders are issued with official GST tax invoices detailing the IMEI / Serial Number of each unit, enabling full Input Tax Credit (ITC) claiming."
    },
    {
      q: "What happens if a device arrives with a hardware defect (DOA)?",
      a: "We offer a 15-day DOA (Dead on Arrival) warranty on all wholesale batches. If any handset fails hardware diagnosis upon unboxing, return it for an instant replacement or credit note."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Supersale B2B Wholesale</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-[#13b59b] via-[#0f947e] to-gray-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              Wholesale Recommerce Engine
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Buy Refurbished Tech in Bulk at Wholesale Margins
            </h1>
            <p className="text-emerald-50 text-sm sm:text-base leading-relaxed">
              Empowering India&apos;s mobile shop owners, regional electronics traders, and refurbishers with pre-inspected, IMEI-verified batches of iPhones, Samsungs, and MacBooks.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#register-supersale"
                className="px-6 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-sm transition-colors shadow-lg"
              >
                Register for Wholesale Price List
              </a>
              <a
                href="#lot-grades"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
              >
                View Lot Grades
              </a>
            </div>
          </div>

          {/* Quick Wholesale Benefits */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-3 shrink-0 w-full sm:w-auto">
            <div className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-300" /> 100% Tested Batches
            </div>
            <p className="text-xs text-emerald-100">Every unit comes with an automated diagnostic test sheet.</p>
            <div className="pt-2 border-t border-white/10 text-xs text-emerald-100 space-y-1">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> 15-Day DOA Replacement Guarantee</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Full GST ITC Invoices with IMEI</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Pan-India Insured Transit</div>
            </div>
          </div>
        </div>

        {/* Lot Grades */}
        <div id="lot-grades" className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Inventory Quality</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Pre-Graded Wholesale Batches</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">No mystery boxes. Clear grading and transparent unit-by-unit pricing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOT_CATEGORIES.map((lot, idx) => (
              <div key={idx} className="bg-white p-7 rounded-2xl border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-teal-50 text-[#2bbda3]">MOQ: {lot.moq}</span>
                  <h3 className="text-lg font-bold text-gray-900">{lot.grade}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{lot.desc}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-4 text-[11px] text-gray-500">
                  <strong className="text-gray-800">Ideal For:</strong> {lot.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wholesale Registration Form */}
        <div id="register-supersale" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Wholesale Account Registered!</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thank you <span className="font-bold text-gray-900">{contactName}</span> from <span className="font-bold text-gray-900">{businessName}</span>. Our Wholesale Accounts Executive will email the live weekly Supersale stock sheet to <span className="font-bold text-[#2bbda3]">{email}</span> and contact you at <span className="font-bold text-gray-900">{phone}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
              >
                Register Another Business
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">B2B Wholesale Portal</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Access Live Supersale Inventory</h3>
                <p className="text-xs text-gray-500">Receive weekly Excel/WhatsApp price lists with IMEI test sheets.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Business / Firm Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Telecom Wholesalers"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Singhania"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sales@apextelecom.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">City &amp; State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patna, Bihar"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expected Monthly Volume</label>
                  <select
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="25 - 50 Units">25 - 50 Units / Month</option>
                    <option value="50 - 100 Units">50 - 100 Units / Month</option>
                    <option value="100 - 500 Units">100 - 500 Units / Month</option>
                    <option value="500+ Units">500+ Units (Enterprise Bulk)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Target Inventory Interest</label>
                  <select
                    value={preferredBrands}
                    onChange={(e) => setPreferredBrands(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="Apple & Samsung Flagships">Apple iPhones &amp; Samsung Galaxy</option>
                    <option value="Budget Android (Redmi / Realme / Vivo)">Budget Android (Xiaomi, Realme, Vivo)</option>
                    <option value="MacBooks & Business Laptops">MacBooks &amp; Business Laptops (Dell, Lenovo)</option>
                    <option value="iPads & Smartwatches">iPads &amp; Smartwatches</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Registering Account..." : <>Get Live Stock &amp; Wholesale Pricing <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>

        {/* Supersale FAQs */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Supersale B2B Wholesale FAQs</h3>
          <div className="space-y-3">
            {FAQS.map((f, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#f8fafc] border border-gray-100 space-y-1">
                <h4 className="font-semibold text-xs text-gray-900">{f.q}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
