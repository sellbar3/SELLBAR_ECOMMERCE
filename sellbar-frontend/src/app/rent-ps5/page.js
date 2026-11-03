'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Gamepad2,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Clock,
  RotateCcw,
  Zap,
  Check,
} from 'lucide-react';
import { getCloudinaryUrl } from '@/lib/cloudinary';

const RENTAL_PLANS = [
  {
    id: 'weekend',
    name: 'Weekend Gamer Pass',
    duration: '3 Days (Fri - Mon)',
    price: 999,
    perDay: 333,
    popular: false,
    perks: ['1x DualSense Controller', '2 Pre-installed Blockbusters', 'Free Doorstep Delivery & Setup', '100% Refundable Deposit'],
  },
  {
    id: 'weekly',
    name: 'Weekly Marathon',
    duration: '7 Days',
    price: 1899,
    perDay: 271,
    popular: true,
    perks: ['2x DualSense Wireless Controllers', '4 Latest PS5 Games (FIFA, Spiderman)', 'Express Setup in 2 Hours', 'Sanitized & Fully Tested Hardware'],
  },
  {
    id: 'monthly',
    name: 'Monthly Pro Pass',
    duration: '30 Days',
    price: 4999,
    perDay: 166,
    popular: false,
    perks: ['2x DualSense Controllers', 'Full PS Plus Deluxe Library Access', 'Free Controller Battery Station', 'Zero Hassle Swap Guarantee'],
  },
];

const GAMES = [
  'EA Sports FC 24',
  'Marvel Spider-Man 2',
  'God of War Ragnarök',
  'Grand Theft Auto V',
  'Call of Duty: Modern Warfare III',
  'Mortal Kombat 1',
];

export default function RentPs5Page() {
  const [selectedPlan, setSelectedPlan] = useState('weekly');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Gurgaon / Delhi NCR');
  const [booked, setBooked] = useState(false);

  const activePlanObj = RENTAL_PLANS.find((p) => p.id === selectedPlan) || RENTAL_PLANS[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-gray-900 pb-20 font-sans antialiased">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#13b59b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/buy-refurbished" className="hover:text-[#13b59b] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#13b59b] font-bold">Rent PlayStation 5</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#0d1b2a] via-[#1b263b] to-[#0f172a] text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                <Gamepad2 className="w-3.5 h-3.5" /> Doorstep Console Rental
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Rent PlayStation 5 from Just <br />
                <span className="text-[#2bbb9e]">₹166 / Day</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Experience next-gen 4K 120FPS gaming without spending ₹54,999 upfront. Free doorstep delivery, 2 wireless DualSense controllers, and pre-loaded AAA blockbusters.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-bold text-gray-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Zero-Waiting Delivery in 2 Hrs
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> 100% Refundable Security Deposit
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Clean &amp; Sanitized Consoles
                </span>
              </div>
            </div>

            {/* Quick Hero Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center space-y-4 max-w-sm w-full shadow-2xl">
                <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gamepad2 className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Sony PlayStation 5 Console</h3>
                  <p className="text-xs text-blue-200 mt-1">4K HDR • 825GB SSD • Ultra High Speed</p>
                </div>
                <div className="p-3 bg-black/30 rounded-xl text-xs text-gray-300">
                  Includes 2 Controllers + HDMI 2.1 + 4 Games
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Main Rental Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Pricing Plans */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Flexible Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Choose Your PS5 Rental Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RENTAL_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer relative flex flex-col justify-between ${
                  selectedPlan === plan.id
                    ? 'border-[#13b59b] ring-2 ring-[#13b59b]/30 shadow-lg -translate-y-1'
                    : 'border-gray-200 hover:border-gray-300 shadow-xs'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-6 bg-[#13b59b] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-900">{plan.name}</h3>
                    <p className="text-xs text-gray-500">{plan.duration}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900">₹{plan.price}</span>
                    <span className="text-xs text-gray-400 font-semibold">total (₹{plan.perDay}/day)</span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {plan.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check className="w-4 h-4 text-[#13b59b] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    selectedPlan === plan.id
                      ? 'bg-[#13b59b] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Free Pre-Loaded Games */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-black text-gray-900">Included AAA Game Titles</h3>
              <p className="text-xs text-gray-500">Pick any 2 to 4 titles pre-loaded and updated before delivery</p>
            </div>
            <span className="text-xs font-bold text-[#13b59b] bg-[#13b59b]/10 px-3 py-1 rounded-full w-fit">
              100% Free With All Plans
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {GAMES.map((game, i) => (
              <div
                key={i}
                className="bg-[#f8fafc] border border-gray-200 rounded-xl p-3 text-center space-y-1 hover:border-[#13b59b] transition"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-900 line-clamp-1">{game}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Installed</div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-gray-900">Book PS5 Doorstep Delivery</h3>
            <p className="text-xs text-gray-500">
              Selected: <strong className="text-[#13b59b]">{activePlanObj.name} (₹{activePlanObj.price})</strong>
            </p>
          </div>

          {booked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-[#13b59b] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-black text-gray-900">Rental Request Received!</h4>
              <p className="text-xs text-gray-600">
                Our gaming logistics team will call you at <strong className="text-gray-900">{phone}</strong> within 15 minutes to confirm delivery slot and ID verification for {city}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Vikram Batra"
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">WhatsApp / Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9812345678"
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">City / Region</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Gurgaon, Noida, Bettiah, Delhi NCR"
                  className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                Confirm Rental Slot (Pay On Delivery)
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-gray-400 text-center">
                🔒 Valid Govt Photo ID required at delivery. Deposit refunded immediately upon pickup.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
