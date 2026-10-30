"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get in Touch with Sellbar</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Have questions about buying refurbished tech, selling old devices, or claiming your warranty? We&apos;re here to assist.
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
                <h3 className="font-bold text-gray-900 text-sm">Call &amp; WhatsApp</h3>
                <p className="text-sm text-gray-600 mt-1 font-medium">+91-77175-17777</p>
                <p className="text-xs text-gray-400 mt-0.5">Mon - Sat: 10:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Email Support</h3>
                <p className="text-sm text-gray-600 mt-1">support@sellbar.in</p>
                <p className="text-xs text-gray-400 mt-0.5">Response within 4 business hours</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Headquarters</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Sellbar Technologies India Pvt. Ltd.<br />
                  Plot 14, Okhla Industrial Area Phase-III, New Delhi, 110020
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
                <h3 className="text-2xl font-bold text-gray-900">Message Sent Successfully!</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Thank you for reaching out. A Sellbar customer support representative will review your message and contact you within 24 hours.
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
                <h2 className="text-xl font-bold text-gray-900">Send us a Message</h2>

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
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
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
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm bg-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Device Buyback / Pickup">Device Buyback / Pickup</option>
                      <option value="Refurbished Order Status">Refurbished Order Status</option>
                      <option value="Warranty Claim">Warranty Claim</option>
                      <option value="Franchise / Partner Inquiry">Franchise / Partner Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your query or order..."
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
                  {loading ? "Sending..." : <>Send Message <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
