"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Building, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    subject: "Device Buyback / Pickup", 
    message: "" 
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Contact Us</span>
        </nav>

        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Customer Support &amp; Offices</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">Get in Touch with Sellbar</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Have questions about selling your old device, tracking refurbished orders, or claiming your 12-month warranty? Our support team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Details Cards */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Customer Helpline</h3>
                <p className="text-sm text-gray-800 mt-1 font-semibold">+91-77175-17777</p>
                <p className="text-xs text-gray-500 mt-0.5">Mon - Sat: 9:30 AM - 7:30 PM</p>
                <a
                  href="https://wa.me/917717517777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-[#2bbda3] hover:underline mt-2"
                >
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Email Support</h3>
                <p className="text-sm text-gray-800 mt-1 font-medium">support@sellbar.in</p>
                <p className="text-xs text-gray-500 mt-0.5">Corporate: contact@sellbar.in</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">Average response: &lt; 2 hours</p>
              </div>
            </div>

            {/* Bettiah Operational Office */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-[#2bbda3]">Regional Hub</span>
                <h3 className="font-bold text-gray-900 text-sm mt-1">Bettiah Diagnostic Center</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Supriya Cinema Road, Near Station Chowk,<br />
                  Bettiah, West Champaran, Bihar - 845438
                </p>
              </div>
            </div>

            {/* Delhi HQ */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">Registered Office</span>
                <h3 className="font-bold text-gray-900 text-sm mt-1">Sellbar Technologies India</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Plot 14, Okhla Industrial Area Phase-III,<br />
                  New Delhi - 110020
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you <span className="font-bold text-gray-800">{formData.name}</span>. A Sellbar specialist has been assigned to your ticket regarding &ldquo;{formData.subject}&rdquo; and will reach out via call/WhatsApp at <span className="font-bold text-gray-800">{formData.phone}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Send an Inquiry or Ticket</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Please provide your details below and select the appropriate category.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Support Category *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm bg-white"
                    >
                      <option value="Device Buyback / Pickup">Device Buyback / Doorstep Pickup</option>
                      <option value="Refurbished Order & Tracking">Refurbished Order &amp; Delivery Tracking</option>
                      <option value="Warranty Claim & Repairs">Warranty Claim &amp; Repairs</option>
                      <option value="7-Day Return / Replacement">7-Day Return / Replacement Request</option>
                      <option value="Become Retail Partner">Become Retail / Franchise Partner</option>
                      <option value="Corporate E-Waste Disposal">Corporate E-Waste &amp; Bulk Procurement</option>
                      <option value="General Inquiry">General Feedback &amp; Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">How Can We Help You? *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your query, device model or order ID..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? "Sending Ticket..." : <>Submit Ticket <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
