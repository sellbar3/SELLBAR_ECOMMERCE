"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles, 
  Send,
  Smartphone,
  Laptop,
  Tablet,
  Battery,
  Camera,
  Volume2,
  Plug,
  Cpu,
  BadgeIndianRupee
} from "lucide-react";

const ISSUES_CONFIG = [
  {
    id: "screen",
    title: "Screen / Touch Replacement",
    icon: Smartphone,
    estTime: "30 Mins",
    estPrice: "₹1,999 - ₹4,999",
    warranty: "6 Months Warranty",
    desc: "Fixed in front of you. High color gamut OEM glass & digitizer."
  },
  {
    id: "battery",
    title: "Battery Drain / Replacement",
    icon: Battery,
    estTime: "20 Mins",
    estPrice: "₹1,299 - ₹2,499",
    warranty: "6 Months Warranty",
    desc: "New authentic high-cycle lithium-ion battery. Zero heating."
  },
  {
    id: "charging",
    title: "Charging Port / Loose Jack",
    icon: Plug,
    estTime: "25 Mins",
    estPrice: "₹699 - ₹1,299",
    warranty: "3 Months Warranty",
    desc: "Type-C / Lightning port cleaning or complete flex cable replacement."
  },
  {
    id: "camera",
    title: "Camera Glass / Sensor Blur",
    icon: Camera,
    estTime: "30 Mins",
    estPrice: "₹1,499 - ₹3,299",
    warranty: "6 Months Warranty",
    desc: "Autofocus optical stabilizer fix and lens glass scratch removal."
  },
  {
    id: "speaker",
    title: "Speaker / Mic Distortion",
    icon: Volume2,
    estTime: "25 Mins",
    estPrice: "₹799 - ₹1,499",
    warranty: "3 Months Warranty",
    desc: "Loudspeaker, earpiece, and noise-cancellation microphone repair."
  },
  {
    id: "motherboard",
    title: "Dead Phone / Logic Board",
    icon: Cpu,
    estTime: "24-48 Hours",
    estPrice: "Quote on Diagnostic",
    warranty: "3 Months Warranty",
    desc: "IC re-balling, power-management chip fix, and short-circuit repair."
  }
];

export default function RepairPage() {
  const [deviceType, setDeviceType] = useState("Mobile Phone");
  const [brand, setBrand] = useState("Apple");
  const [model, setModel] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(ISSUES_CONFIG[0]);
  const [phone, setPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("Today, 2:00 PM - 5:00 PM");
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Doorstep Repair Service</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/30 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              Doorstep Repair in Bettiah &amp; Bihar
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Expert Device Repair at Your Doorstep in 30 Minutes
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Cracked screen? Dead battery? Water damage? Our certified engineers repair your smartphone or laptop in front of your eyes using 100% genuine parts with up to 6 months warranty.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-2 w-full sm:w-auto">
            <div className="text-3xl font-black text-[#2bbda3]">30 Mins</div>
            <div className="text-xs text-gray-200">On-Site Screen Fix</div>
            <div className="text-2xl font-black text-white pt-2">₹0</div>
            <div className="text-xs text-gray-200">Visiting Fee if Unrepaired</div>
            <div className="text-xs text-emerald-400 font-bold pt-1">6-Month Part Warranty</div>
          </div>
        </div>

        {/* Repair Booking Wizard */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs">
          {booked ? (
            <div className="text-center py-12 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Repair Appointment Scheduled!</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Thank you <span className="font-bold text-gray-900">{customerName}</span>! Our certified repair engineer will visit your location (<span className="font-medium text-gray-800">{address}</span>) during <span className="font-bold text-[#2bbda3]">{preferredSlot}</span>. We will call you at <span className="font-bold text-gray-900">{phone}</span> 15 minutes before arrival.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setBooked(false)}
                  className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
                >
                  Book Another Repair
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Schedule Doorstep Diagnostic &amp; Repair</h2>
                <p className="text-xs text-gray-500 mt-1">Select your hardware issue to view estimated pricing and technician turnaround</p>
              </div>

              {/* Step 1: Device Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Device Type *</label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="Mobile Phone">Mobile Phone / Smartphone</option>
                    <option value="Laptop / MacBook">Laptop / MacBook</option>
                    <option value="Tablet / iPad">Tablet / Apple iPad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Brand *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="Apple">Apple (iPhone / MacBook)</option>
                    <option value="Samsung">Samsung</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Xiaomi / Redmi">Xiaomi / Redmi</option>
                    <option value="Realme / Vivo / Oppo">Realme / Vivo / Oppo</option>
                    <option value="Dell / HP / Lenovo">Dell / HP / Lenovo Laptop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Exact Model Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 13 or Dell Inspiron 15"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              {/* Step 2: Issue Selection Cards */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Select Repair Issue (Click to see estimate)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ISSUES_CONFIG.map((issue) => {
                    const isSelected = selectedIssue.id === issue.id;
                    const Icon = issue.icon;
                    return (
                      <div
                        key={issue.id}
                        onClick={() => setSelectedIssue(issue)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? "border-[#2bbda3] bg-teal-50/40 shadow-xs ring-1 ring-[#2bbda3]"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                              isSelected ? "bg-[#2bbda3] text-white" : "bg-gray-100 text-gray-600"
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-bold text-[#2bbda3] bg-white px-2 py-0.5 rounded-full border border-teal-100">
                              {issue.estTime}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-gray-900">{issue.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{issue.desc}</p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-800">{issue.estPrice}</span>
                          <span className="text-[11px] font-semibold text-emerald-600">{issue.warranty}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Customer Location & Slot */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Customer Contact &amp; Doorstep Slot</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                    />
                  </div>
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
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred Time Slot *</label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                    >
                      <option value="Today, 2:00 PM - 5:00 PM">Today, 2:00 PM - 5:00 PM</option>
                      <option value="Tomorrow, 10:00 AM - 1:00 PM">Tomorrow, 10:00 AM - 1:00 PM</option>
                      <option value="Tomorrow, 2:00 PM - 6:00 PM">Tomorrow, 2:00 PM - 6:00 PM</option>
                      <option value="Weekend Slot (Saturday / Sunday)">Weekend Slot (Saturday / Sunday)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Doorstep Address (Bettiah / West Champaran / Bihar) *</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Street / Landmark in Bettiah, Motihari, etc."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  ⚡ <strong>Selected Issue:</strong> {selectedIssue.title} ({selectedIssue.estPrice}) • 6-Month Warranty
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? "Scheduling Technician..." : <>Confirm Repair Slot <Wrench className="w-4 h-4" /></>}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Repair Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">30-Minute Screen Fix</h3>
            <p className="text-xs text-gray-500">Screen &amp; battery replacements performed right in front of you at your home.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Genuine OEM Parts</h3>
            <p className="text-xs text-gray-500">Factory-grade original replacement screens, batteries, and camera modules.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">6-Month Warranty</h3>
            <p className="text-xs text-gray-500">If replaced parts show any defect, free doorstep re-service is guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
