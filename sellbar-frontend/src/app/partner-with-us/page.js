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
  FileCheck
} from "lucide-react";

export default function PartnerWithUsPage() {
  const [partnerType, setPartnerType] = useState("Retail & Franchise Store");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Bettiah");
  const [gstin, setGstin] = useState("");
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

  const MODELS = [
    {
      icon: Store,
      title: "Retail & Franchise Store",
      desc: "Open a branded Sellbar kiosk or authorized counter in your mobile shop. Offer certified refurbished sales and instant buyback to walk-in customers.",
      benefits: ["High commissions on device buybacks", "Exclusive wholesale inventory supply", "Branding & store display collateral"]
    },
    {
      icon: Truck,
      title: "Logistics & Doorstep Franchise",
      desc: "Become a city-level inspection & pickup partner in your district. Run local evaluation routes with our automated diagnostic software.",
      benefits: ["Per-pickup payout incentives", "Exclusive territory pin codes", "Full diagnostic training & toolkits"]
    },
    {
      icon: TrendingUp,
      title: "Marketplace Refurb Merchant",
      desc: "Sell your certified refurbished inventory on Sellbar. Reach thousands of verified buyers with automated T+2 payment settlements.",
      benefits: ["Low commission rates", "Integrated BlueDart & Delhivery logistics", "Zero upfront listing fees"]
    },
    {
      icon: Building2,
      title: "Corporate Asset Liquidation",
      desc: "Bulk IT asset disposal for companies upgrading employee laptops, MacBooks, and work equipment with DOD data sanitization certificates.",
      benefits: ["Highest bulk residual value", "Certified data wiping certificates", "Pan-India single-vendor pickup"]
    }
  ];

  const FAQS = [
    {
      q: "What is the minimum investment required to become a Sellbar Retail Franchise?",
      a: "For existing mobile retailers adding an authorized Sellbar kiosk counter, investment starts at ₹25,000 for display collateral, branding, and initial marketing materials. Standalone franchise stores require ₹2 Lakhs to ₹5 Lakhs depending on square footage."
    },
    {
      q: "How often are marketplace vendor payouts processed?",
      a: "Vendor payouts are automatically deposited into your registered bank account on a T+2 cycle (2 business days post delivery confirmation)."
    },
    {
      q: "Is GST registration mandatory for becoming a partner?",
      a: "GST registration is mandatory for Marketplace Refurbished Merchants and Corporate Liquidators. For local logistics rider partners, individual PAN and Aadhar verification is sufficient."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Partner With Us</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-teal-950 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/30 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              B2B &amp; Franchise Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Grow Your Business with India&apos;s Fastest Recommerce Brand
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Whether you are an electronics retailer, regional distributor, logistics entrepreneur, or corporate IT team, Sellbar offers unmatched scale, trust, and margins.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#apply-form"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-lg"
              >
                Apply for Partnership
              </a>
              <a
                href="#partnership-models"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
              >
                Explore Models
              </a>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-4 shrink-0 w-full sm:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">500+</div>
              <div className="text-xs text-gray-300 mt-1">Retail Partners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">T+2</div>
              <div className="text-xs text-gray-300 mt-1">Fast Settlements</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">₹50 Cr+</div>
              <div className="text-xs text-gray-300 mt-1">Annual Recommerce</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">100%</div>
              <div className="text-xs text-gray-300 mt-1">Genuine Invoicing</div>
            </div>
          </div>
        </div>

        {/* Partnership Models */}
        <div id="partnership-models" className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Choose Your Track</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">4 High-Growth Partnership Programs</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Pick the model that aligns with your existing retail footprint or business capabilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MODELS.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="bg-white p-7 rounded-2xl border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{m.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
                    <div className="pt-2 space-y-1.5 border-t border-gray-50">
                      {m.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-5">
                    <button
                      onClick={() => {
                        setPartnerType(m.title);
                        const el = document.getElementById("apply-form");
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-[#2bbda3] hover:underline flex items-center gap-1"
                    >
                      Apply for this Model &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4-Step Onboarding Process */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">How to Become an Authorized Partner</h3>
            <p className="text-xs text-gray-500 mt-1">Get approved and live within 48 to 72 business hours</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#2bbda3] text-white text-xs font-bold flex items-center justify-center mx-auto">1</span>
              <h4 className="font-bold text-xs text-gray-900">Online Application</h4>
              <p className="text-[11px] text-gray-500">Submit your store and contact details below.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#2bbda3] text-white text-xs font-bold flex items-center justify-center mx-auto">2</span>
              <h4 className="font-bold text-xs text-gray-900">KYC &amp; Verification</h4>
              <p className="text-[11px] text-gray-500">Our team verifies your GST, store photos, and address.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#2bbda3] text-white text-xs font-bold flex items-center justify-center mx-auto">3</span>
              <h4 className="font-bold text-xs text-gray-900">Agreement Sign</h4>
              <p className="text-[11px] text-gray-500">Sign digital partner MoU and set up bank account.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-[#2bbda3] text-white text-xs font-bold flex items-center justify-center mx-auto">4</span>
              <h4 className="font-bold text-xs text-gray-900">Start Transacting</h4>
              <p className="text-[11px] text-gray-500">Access partner portal, receive inventory, earn payouts.</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply-form" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Partnership Application Received!</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thank you <span className="font-bold text-gray-900">{fullName}</span>. Our Regional Business Development team has received your application for <span className="font-bold text-[#2bbda3]">{partnerType}</span> in <span className="font-bold text-gray-900">{city}</span>. We will call you within 24 hours at <span className="font-bold text-gray-900">{phone}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Fast Approval</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Apply for Sellbar Partnership</h3>
                <p className="text-xs text-gray-500">Fill in the form below and our partnership manager will connect with you.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Business / Store Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Champaran Mobile Care"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
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
                    placeholder="ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bettiah, Motihari"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Partnership Model *</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="Retail & Franchise Store">Retail &amp; Franchise Kiosk Store</option>
                    <option value="Logistics & Doorstep Franchise">Logistics &amp; Doorstep Franchise</option>
                    <option value="Marketplace Refurb Merchant">Marketplace Refurbished Merchant</option>
                    <option value="Corporate Asset Liquidation">Corporate Asset Liquidation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">GST Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="15-digit GSTIN if available"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Submitting Application..." : <>Submit Partnership Application <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Frequently Asked Questions for Partners</h3>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#f8fafc] border border-gray-100 space-y-1">
                <h4 className="font-semibold text-xs text-gray-900">{faq.q}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
