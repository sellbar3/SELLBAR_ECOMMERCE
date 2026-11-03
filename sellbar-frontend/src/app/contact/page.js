"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  HelpCircle,
  Headphones
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    subject: "Device Buyback / Pickup", 
    orderId: "",
    message: "" 
  });
  const [ticketId, setTicketId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const generated = "SB-" + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generated);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Help &amp; Support</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Contact Us</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Support Online • Response Time &lt; 15 Mins
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              We&apos;re Here to Help You Buy, Sell &amp; Repair
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Have a question about a refurbished device warranty, trade-in pickup slot, or bulk wholesale lot? Connect with our dedicated support team via WhatsApp, phone, or instant ticket.
            </p>
          </div>
        </div>

        {/* Quick Contact Action Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://wa.me/917717517777"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#2bbda3] hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Fastest Response</div>
              <div className="text-sm font-bold text-slate-900">WhatsApp Chat</div>
              <div className="text-xs text-[#2bbda3] font-semibold mt-0.5">+91-77175-17777 &rarr;</div>
            </div>
          </a>

          <a
            href="tel:+917717517777"
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#2bbda3] hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Mon - Sat: 9:30 AM - 7:30 PM</div>
              <div className="text-sm font-bold text-slate-900">Direct Helpline</div>
              <div className="text-xs text-[#2bbda3] font-semibold mt-0.5">+91-77175-17777 &rarr;</div>
            </div>
          </a>

          <a
            href="mailto:support@sellbar.in"
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#2bbda3] hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Official Ticketing</div>
              <div className="text-sm font-bold text-slate-900">Email Support</div>
              <div className="text-xs text-[#2bbda3] font-semibold mt-0.5">support@sellbar.in &rarr;</div>
            </div>
          </a>
        </div>

        {/* Main Grid: Form + Office Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Office Locations */}
          <div className="space-y-4">
            {/* Bettiah Operational Hub */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3]">
                  Diagnostic &amp; Dispatch Hub
                </span>
                <span className="text-xs text-emerald-600 font-semibold">Active Lab</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">Bettiah Diagnostic Center</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supriya Cinema Road, Near Station Chowk,<br />
                Bettiah, West Champaran, Bihar - 845438
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div><strong>Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM</div>
                <div><strong>Service Radius:</strong> West Champaran, Motihari, Bagaha, Patna</div>
              </div>
            </div>

            {/* Delhi Registered Office */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Corporate Headquarters
              </span>
              <h3 className="font-bold text-base text-slate-900">Sellbar Technologies India</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Plot 14, Okhla Industrial Area Phase-III,<br />
                New Delhi - 110020, India.
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <div><strong>CIN:</strong> U72900DL2024PTC398241</div>
                <div><strong>Email:</strong> contact@sellbar.in</div>
              </div>
            </div>

            {/* Quick FAQ Crosslink */}
            <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 rounded-3xl space-y-3">
              <HelpCircle className="w-6 h-6 text-[#2bbda3]" />
              <h4 className="font-bold text-sm">Need Instant Answers?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Browse our comprehensive FAQ section covering buyback evaluation steps, warranty claims, and shipping.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2bbda3] hover:underline pt-1"
              >
                Browse FAQs &rarr;
              </Link>
            </div>
          </div>

          {/* Interactive Ticket Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Support Ticket Generated!</h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-slate-400">Your Support Ticket ID:</span>
                  <div className="font-mono text-lg font-black text-[#2bbda3]">{ticketId}</div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thank you <span className="font-bold text-slate-900">{formData.name}</span>! A Sellbar senior support specialist has been assigned to your query regarding &ldquo;{formData.subject}&rdquo; and will respond within 2 business hours at <span className="font-bold text-slate-900">{formData.phone}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Send an Inquiry or Support Ticket</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Please provide your order details so our team can pull up your records immediately.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Order ID (If applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. SB-10492"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Support Category *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs bg-white"
                  >
                    <option value="Device Buyback / Pickup">Device Buyback / Doorstep Evaluation</option>
                    <option value="Refurbished Order Tracking">Refurbished Order Tracking &amp; Delivery</option>
                    <option value="Warranty Claim & Repair">Warranty Claim &amp; Hardware Support</option>
                    <option value="7-Day Return / Replacement">7-Day Replacement / Refund Request</option>
                    <option value="B2B Supersale & Franchise">B2B Supersale &amp; Wholesale Inquiries</option>
                    <option value="Corporate E-Waste Disposal">Corporate E-Waste &amp; Bulk Buyback</option>
                    <option value="Other / General Query">General Feedback &amp; Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Detailed Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your issue, device model, or question in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? "Generating Ticket..." : <>Generate Ticket &amp; Send <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
