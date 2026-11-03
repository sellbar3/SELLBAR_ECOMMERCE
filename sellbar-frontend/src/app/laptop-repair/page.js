'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles,
  MapPin,
  Laptop,
  Check,
  PhoneCall,
  Calendar,
  AlertCircle,
} from 'lucide-react';

const REPAIR_SERVICES = [
  {
    id: 'screen',
    name: 'Screen & Display Replacement',
    estTime: '45 mins',
    price: 'From ₹2,499',
    desc: 'Original OEM IPS/OLED display panels for broken, flickering, or line-marked laptop screens.',
    badge: 'Most Popular',
  },
  {
    id: 'battery',
    name: 'Battery Replacement',
    estTime: '30 mins',
    price: 'From ₹1,899',
    desc: 'High-capacity, safety-certified Li-ion batteries with 6-month backup warranty.',
    badge: 'Same-day',
  },
  {
    id: 'keyboard',
    name: 'Keyboard & Trackpad Repair',
    estTime: '40 mins',
    price: 'From ₹1,199',
    desc: 'Replacement for sticky, non-responsive, or water-damaged laptop keyboards and multi-touch trackpads.',
    badge: 'Quick Fix',
  },
  {
    id: 'ram-ssd',
    name: 'SSD & RAM Performance Upgrade',
    estTime: '25 mins',
    price: 'From ₹1,499',
    desc: 'Speed up sluggish laptops up to 10x with NVMe M.2 SSD clones and dual-channel RAM upgrades.',
    badge: '10x Speed',
  },
  {
    id: 'hinge',
    name: 'Hinge & Body Fabrication Repair',
    estTime: '60 mins',
    price: 'From ₹999',
    desc: 'Precision laser welding, internal bracket reinforcement, and body panel replacement.',
    badge: 'Structural',
  },
  {
    id: 'motherboard',
    name: 'Chip-Level Motherboard Diagnostics',
    estTime: '24-48 hrs',
    price: 'From ₹2,199',
    desc: 'Micro-soldering, IC replacement, short-circuit recovery, and liquid damage recovery.',
    badge: 'Expert Level',
  },
];

const BRANDS = ['Dell', 'HP', 'Lenovo', 'Apple MacBook', 'Asus', 'Acer', 'MSI'];

export default function LaptopRepairPage() {
  const [selectedBrand, setSelectedBrand] = useState('Dell');
  const [selectedService, setSelectedService] = useState('screen');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('845438');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/repair" className="hover:text-[#13b59b] transition">Repair</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Laptop Repair</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner with Booking Card */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
                <Wrench size={14} /> Doorstep Laptop Repair Specialist
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Certified Laptop Repair. <br />
                <span className="text-[#13b59b]">At Your Doorstep in 60 Minutes.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Tired of leaving your confidential laptop with unknown local shops? Sellbar certified technicians repair your MacBook, Dell, HP, Lenovo or Asus right in front of your eyes at your home or office.
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold">
                <div className="bg-white/10 px-3.5 py-2.5 rounded-xl backdrop-blur flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#13b59b] shrink-0" />
                  <span>6 Months Repair Warranty</span>
                </div>
                <div className="bg-white/10 px-3.5 py-2.5 rounded-xl backdrop-blur flex items-center gap-2">
                  <Clock size={18} className="text-amber-400 shrink-0" />
                  <span>45-Min Express Service</span>
                </div>
                <div className="bg-white/10 px-3.5 py-2.5 rounded-xl backdrop-blur flex items-center gap-2">
                  <MapPin size={18} className="text-cyan-400 shrink-0" />
                  <span>Free Doorstep Pickup/Drop</span>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Booking Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Repair Slot Reserved!</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Our West Champaran certified repair coordinator will call you at <span className="font-bold text-slate-900">{phone}</span> within 15 minutes to confirm technician arrival.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
                    >
                      Book Another Repair
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">Schedule Doorstep Repair</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Transparent pricing. No fix, no fee policy.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Select Laptop Brand</label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                      >
                        {BRANDS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Repair Issue / Requirement</label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                      >
                        {REPAIR_SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Kumar"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Doorstep Pincode</label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar size={16} /> Book Doorstep Technician Now
                    </button>
                    <p className="text-[11px] text-center text-slate-400">
                      Zero visiting fee with any repair job • 100% genuine parts guarantee
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-900">Common Laptop Repair Services</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Genuine replacement parts with 6 months peace-of-mind warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPAIR_SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-50 text-[#13b59b] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {serv.badge}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                    <Clock size={12} /> {serv.estTime}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">{serv.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{serv.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-base font-black text-slate-900">{serv.price}</span>
                <span className="text-xs font-bold text-[#13b59b] flex items-center gap-1">
                  Includes 6M Warranty
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
