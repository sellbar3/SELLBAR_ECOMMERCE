"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Recycle, Leaf, HeartHandshake, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export default function RecycleOldPhonePage() {
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Delhi NCR");
  const [deviceCount, setDeviceCount] = useState("1-2");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Recycle E-Waste</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md">
            <Recycle className="w-8 h-8 text-emerald-200" />
          </div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
            Zero-Landfill Initiative
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Recycle Your Dead or Broken Phones for Free
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Dead phone lying in your drawer? Help save the planet by preventing toxic lithium, lead, and mercury from polluting groundwater. Book free doorstep pickup.
          </p>
        </div>

        {/* Recycling Booking Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Thank You for Being an Eco-Hero!</h2>
              <p className="text-sm text-gray-600">
                Our green logistics rider will contact you at <span className="font-bold text-gray-900">{phone}</span> to schedule contactless doorstep collection.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold transition-colors"
              >
                Schedule Another Collection
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Book Free Recycling Doorstep Pickup</h2>
                <p className="text-xs text-gray-500 mt-1">Free collection for dead phones, broken chargers, tablets, and cables</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Number of Devices</label>
                  <select
                    value={deviceCount}
                    onChange={(e) => setDeviceCount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    <option value="1-2">1 to 2 Devices</option>
                    <option value="3-5">3 to 5 Devices</option>
                    <option value="6+">6+ Devices (Bulk E-Waste)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Delhi NCR, Mumbai, Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Schedule Free E-Waste Pickup <Recycle className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Environmental Impact */}
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
