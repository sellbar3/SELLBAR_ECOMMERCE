"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wrench, ShieldCheck, Clock, CheckCircle2, PhoneCall, Sparkles, Send } from "lucide-react";

export default function RepairPage() {
  const [deviceType, setDeviceType] = useState("Mobile Phone");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("Screen Replacement");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setBooked(true);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Doorstep Repair</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#2bbda3]/20 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              Doorstep Mobile &amp; Laptop Repair
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Expert Repairs at Your Doorstep in 30 Minutes
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Cracked screen? Dead battery? Water damage? Our certified engineers repair your smartphone or laptop in front of you using 100% genuine parts with up to 6 months warranty.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-2">
            <div className="text-2xl font-black text-[#2bbda3]">6 Months</div>
            <div className="text-xs text-gray-200">Warranty on All Replaced Parts</div>
            <div className="text-2xl font-black text-white pt-2">₹0</div>
            <div className="text-xs text-gray-200">Zero Visiting Fee if Unrepaired</div>
          </div>
        </div>

        {/* Repair Booking Wizard */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs">
          {booked ? (
            <div className="text-center py-12 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Repair Appointment Requested!</h2>
              <p className="text-sm text-gray-600">
                A Sellbar certified repair engineer will call you at <span className="font-bold text-gray-900">{phone}</span> within 15 minutes to confirm diagnostic slot and technician dispatch.
              </p>
              <button
                onClick={() => setBooked(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition-colors"
              >
                Book Another Repair
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Schedule Doorstep Repair</h2>
                <p className="text-xs text-gray-500 mt-1">Select your gadget and the common issue you&apos;re facing</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Device Type</label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="Mobile Phone">Mobile Phone</option>
                    <option value="Laptop / MacBook">Laptop / MacBook</option>
                    <option value="Tablet / iPad">Tablet / iPad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Brand &amp; Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 13 or Dell XPS"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Issue Faced</label>
                  <select
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="Screen Replacement">Screen / Touch Replacement</option>
                    <option value="Battery Replacement">Battery Draining / Dead Battery</option>
                    <option value="Charging Port">Charging Port / Cable Loose</option>
                    <option value="Camera Issue">Camera Blurry / Broken Glass</option>
                    <option value="Speaker / Mic">Speaker or Mic Distortion</option>
                    <option value="Motherboard">Motherboard / Won&apos;t Turn On</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit phone number for appointment"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    Confirm Repair Slot <Wrench className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">30-Minute Screen Fix</h3>
            <p className="text-xs text-gray-500">Screen &amp; battery replacements performed right in front of you.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Genuine OEM Parts</h3>
            <p className="text-xs text-gray-500">Factory-grade original replacement screens, batteries, and connectors.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">6-Month Warranty</h3>
            <p className="text-xs text-gray-500">If replaced parts show any defect, free doorstep replacement is guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
