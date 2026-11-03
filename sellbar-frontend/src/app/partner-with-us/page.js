"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Handshake, 
  Store, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  Building2, 
  PhoneCall, 
  Send,
  HelpCircle,
  FileCheck,
  Calculator,
  BadgePercent
} from "lucide-react";

export default function PartnerWithUsPage() {
  const [partnerType, setPartnerType] = useState("Retail & Franchise Store");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Bettiah");
  const [gstin, setGstin] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState(30);
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

  // Estimated monthly store earnings calculation
  const estimatedCommission = monthlyVolume * 650;

  const MODELS = [
    {
      icon: Store,
      title: "Retail & Franchise Kiosk",
      tag: "Best for Mobile Stores",
      desc: "Add an authorized Sellbar buyback counter inside your existing mobile shop. Earn lucrative commissions on every customer handset buyback and trade-in.",
      commission: "₹500 - ₹1,200 per device trade-in",
      benefits: ["High cash commissions on buybacks", "Wholesale stock supply for counter sales", "Sellbar branding & acrylic display stands", "Zero dead-inventory risk"]
    },
    {
      icon: Truck,
      title: "Logistics & Doorstep Franchise",
      tag: "Best for Logistics Leads",
      desc: "Own exclusive doorstep evaluation rights in your pin code. Run local pickup routes with our automated diagnostic software.",
      commission: "₹350 - ₹500 per doorstep collection",
      benefits: ["Guaranteed daily pickup bookings", "Exclusive district territory rights", "Mobile diagnostic field app training", "Rapid weekly payouts"]
    },
    {
      icon: TrendingUp,
      title: "Marketplace Refurb Merchant",
      tag: "Best for Gadget Wholesalers",
      desc: "List your certified refurbished inventory on Sellbar. Reach thousands of verified online buyers across India with automated bank settlements.",
      commission: "Competitive low 4-6% platform take-rate",
      benefits: ["T+2 bank account settlements", "Integrated BlueDart & Delhivery shipping", "Zero listing or subscription charges", "Pan-India buyer footprint"]
    },
    {
      icon: Building2,
      title: "Corporate IT Asset Liquidation",
      tag: "Best for Enterprises",
      desc: "Bulk IT asset disposal for IT firms, BPOs, and colleges upgrading employee laptops and MacBooks with DoD data sanitization certificates.",
      commission: "Highest bulk buyback market valuation",
      benefits: ["Highest bulk residual value", "Certified data wiping reports (NIST 800-88)", "Single-vendor Pan-India collection", "Full GST documentation"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">B2B Partnerships</span>
        </nav>

        {/* Hero */}
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/40 text-[#2bbda3] text-xs font-bold tracking-wider uppercase">
              <Handshake className="w-3.5 h-3.5" /> High-Margin B2B Programs
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Grow Your Business with India&apos;s Fastest Recommerce Brand
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you are an electronics retailer, mobile technician, regional distributor, or corporate IT administrator, partnering with Sellbar gives you instant liquidity, certified inventory, and high profit margins.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#apply-form"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg"
              >
                Apply for Partnership
              </a>
              <a
                href="#partnership-models"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                View 4 Partnership Tracks
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0 w-full sm:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">500+</div>
              <div className="text-xs text-slate-300 mt-1">Retail Partners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">T+2</div>
              <div className="text-xs text-slate-300 mt-1">Fast Settlements</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">₹50 Cr+</div>
              <div className="text-xs text-slate-300 mt-1">Annual Recommerce</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">100%</div>
              <div className="text-xs text-slate-300 mt-1">GST ITC Invoices</div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#2bbda3]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Partnership Models Grid */}
        <div id="partnership-models" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Choose Your Track</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">4 High-Growth Commercial Programs</h2>
            <p className="text-xs text-slate-500">Pick the model that aligns with your retail footprint or distribution capabilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODELS.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:border-[#2bbda3]/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {m.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>

                    <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100/80 text-xs font-semibold text-emerald-800">
                      💰 Earning Potential: {m.commission}
                    </div>

                    <div className="pt-2 space-y-1.5 border-t border-slate-100">
                      {m.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setPartnerType(m.title);
                        const el = document.getElementById("apply-form");
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-[#2bbda3] hover:underline flex items-center gap-1"
                    >
                      Apply for {m.title} &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Store Earnings Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="max-w-xl space-y-1">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4" /> Retail Kiosk Earnings Estimator
            </span>
            <h3 className="text-2xl font-bold">Calculate Your Store&apos;s Monthly Buyback Profit</h3>
            <p className="text-xs text-slate-300">See how much extra revenue you can generate each month simply by offering Sellbar trade-in at your counter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Estimated Devices Traded In Per Month:</span>
                <span className="font-bold text-lg text-[#2bbda3]">{monthlyVolume} Phones</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full accent-[#2bbda3] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 Phones</span>
                <span>75 Phones</span>
                <span>150 Phones</span>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-3xl border border-white/15 text-center space-y-2">
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Projected Monthly Store Profit</span>
              <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">
                ₹{estimatedCommission.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-emerald-300 font-medium">
                + Extra walk-in footfall purchasing your store accessories &amp; new phones!
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply-form" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Partnership Application Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you <span className="font-bold text-slate-900">{fullName}</span> from <span className="font-bold text-slate-900">{businessName}</span>! Our Business Development manager will review your submission for <span className="font-bold text-[#2bbda3]">{partnerType}</span> in <span className="font-bold text-slate-900">{city}</span> and connect with you at <span className="font-bold text-slate-900">{phone}</span> within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Fast Onboarding</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Apply for Sellbar Partnership</h3>
                <p className="text-xs text-slate-500">Zero upfront fees. Fast approval and live merchant access within 48 hours.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Store / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Champaran Mobile Hub"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
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
                    placeholder="ramesh@example.com"
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
                    placeholder="e.g. Bettiah, Bihar"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Partnership Model *</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs bg-white"
                  >
                    <option value="Retail & Franchise Kiosk">Retail &amp; Franchise Kiosk (Mobile Store)</option>
                    <option value="Logistics & Doorstep Franchise">Logistics &amp; Doorstep Franchise</option>
                    <option value="Marketplace Refurb Merchant">Marketplace Refurb Merchant</option>
                    <option value="Corporate IT Asset Liquidation">Corporate IT Asset Liquidation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">GST Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="15-digit GSTIN if available"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Submitting Application..." : <>Submit Partnership Application <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
