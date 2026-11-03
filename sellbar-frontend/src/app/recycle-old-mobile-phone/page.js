"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Recycle, 
  Leaf, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Smartphone, 
  Laptop, 
  Watch, 
  Plug, 
  Award,
  ArrowRight
} from "lucide-react";

const ACCEPTED_ELECTRONICS = [
  { name: "Dead Smartphones", desc: "Cracked, waterlogged or unrepairable", icon: Smartphone },
  { name: "Old Keypad Phones", desc: "2G/3G obsolete cellular handsets", icon: Smartphone },
  { name: "Broken Tablets & iPads", desc: "Shattered glass or non-booting OS", icon: Laptop },
  { name: "Scrap Laptops & Boards", desc: "Outdated business PCs & motherboards", icon: Laptop },
  { name: "Dead Smartwatches", desc: "Swollen batteries or failed sensors", icon: Watch },
  { name: "Adapters & Cables", desc: "Tangled copper wiring, old chargers", icon: Plug },
];

export default function RecycleOldPhonePage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Bettiah");
  const [address, setAddress] = useState("");
  const [deviceCount, setDeviceCount] = useState("1-2 Devices");
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
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Recycle E-Waste</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-950 rounded-3xl p-8 sm:p-14 text-white shadow-xl text-center space-y-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md">
            <Recycle className="w-8 h-8 text-emerald-200" />
          </div>
          <span className="inline-block px-3.5 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
            Zero-Landfill Circular Initiative
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Recycle Your Dead or Broken Phones for Free
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Dead phone lying in your drawer? Help save the planet by preventing toxic lithium, lead, and mercury from polluting groundwater. Book free doorstep pickup and receive an official Green Eco-Certificate.
          </p>
        </div>

        {/* Accepted Electronics */}
        <div className="space-y-4">
          <div className="text-center max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">What Electronics Do We Recycle?</h2>
            <p className="text-xs text-gray-500 mt-1">We accept dead, non-working, and obsolete electronic scrap of any brand.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ACCEPTED_ELECTRONICS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4-Step Process */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">4-Step Responsible Recycling</h3>
            <p className="text-xs text-gray-500 mt-1">Authorized under Central Pollution Control Board (CPCB) guidelines</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mx-auto">1</span>
              <h4 className="font-bold text-xs text-gray-900">Free Doorstep Pickup</h4>
              <p className="text-[11px] text-gray-500">Book online and our green rider collects your e-waste.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mx-auto">2</span>
              <h4 className="font-bold text-xs text-gray-900">Data Sanitization</h4>
              <p className="text-[11px] text-gray-500">Storage chips physically shredded or demagnetized.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mx-auto">3</span>
              <h4 className="font-bold text-xs text-gray-900">Material Extraction</h4>
              <p className="text-[11px] text-gray-500">Precious copper, gold, and aluminium are reclaimed.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mx-auto">4</span>
              <h4 className="font-bold text-xs text-gray-900">Green Eco-Certificate</h4>
              <p className="text-[11px] text-gray-500">Receive certified proof of diverted landfill waste.</p>
            </div>
          </div>
        </div>

        {/* Recycling Booking Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Thank You for Being an Eco-Hero! 🌿</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thank you <span className="font-bold text-gray-900">{fullName}</span>! Our green collection rider will contact you at <span className="font-bold text-gray-900">{phone}</span> to collect your {deviceCount} from <span className="font-bold text-gray-900">{address}, {city}</span>. Your Green E-Waste Certificate will be issued upon handover.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
              >
                Schedule Another Collection
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Free Doorstep Service</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Schedule E-Waste Collection</h3>
                <p className="text-xs text-gray-500">Zero visiting charge. 100% free doorstep collection across Bettiah &amp; Bihar.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alok Verma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity of E-Waste</label>
                  <select
                    value={deviceCount}
                    onChange={(e) => setDeviceCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none text-sm bg-white"
                  >
                    <option value="1-2 Devices">1 to 2 Devices</option>
                    <option value="3-5 Devices">3 to 5 Devices</option>
                    <option value="6-10 Devices">6 to 10 Devices</option>
                    <option value="10+ Bulk Scrap">10+ Bulk Electronics (Offices/Institutions)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bettiah, Motihari, Patna"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Doorstep Pickup Address *</label>
                <input
                  type="text"
                  required
                  placeholder="House / Street / Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Scheduling Green Pickup..." : <>Schedule Free E-Waste Collection <Recycle className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>

        {/* Environmental Guarantee */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Govt. EPR Certified</h3>
            <p className="text-xs text-gray-500">Recycled in compliance with MoEFCC environmental protocols.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Data Destruction</h3>
            <p className="text-xs text-gray-500">Memory chips physically degaussed and shredded.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">100% Free Doorstep</h3>
            <p className="text-xs text-gray-500">No pickup fee, ever. We take responsibility for your e-waste.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
