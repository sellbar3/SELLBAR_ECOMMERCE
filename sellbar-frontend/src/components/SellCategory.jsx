'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Zap,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  Clock,
  RotateCcw,
  Sparkles,
  X,
  CreditCard,
  Building2,
  Calendar,
} from 'lucide-react';

const CONDITIONS = [
  { id: 'flawless', label: 'Flawless', factor: 1.0, desc: 'Like new, 0 scratches, 100% functional' },
  { id: 'good', label: 'Good', factor: 0.88, desc: 'Minor hairline scratches, fully functional' },
  { id: 'average', label: 'Average', factor: 0.72, desc: 'Visible body dents/scuffs, working display' },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function SellCategory({
  name,
  emoji,
  title,
  subtitle,
  brands = [],
  models = [],
  faqs = [],
}) {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [condition, setCondition] = useState('flawless');
  const [selectedModel, setSelectedModel] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Booking Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pincode, setPincode] = useState('122001');
  const [pickupDate, setPickupDate] = useState('Tomorrow');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const activeFactor = CONDITIONS.find((c) => c.id === condition)?.factor || 1;

  // Filter models
  const filteredModels = useMemo(() => {
    const q = search.trim().toLowerCase();
    return models.filter((m) => {
      const matchBrand = selectedBrand === 'All' || m.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        (m.specs && m.specs.toLowerCase().includes(q));
      return matchBrand && matchSearch;
    });
  }, [models, selectedBrand, search]);

  const calculatePrice = (baseMax) => Math.round((baseMax || 0) * activeFactor);

  const handleOpenBooking = (model) => {
    setSelectedModel(model);
    setBookedSuccess(false);
    setBookingOpen(true);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    setBookedSuccess(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-gray-900 pb-20 font-sans antialiased">
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#13b59b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/sell" className="hover:text-[#13b59b] transition-colors">
            Sell Old Device
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#13b59b] font-bold">{name}</span>
        </div>
      </div>

      {/* 2. HERO BANNER */}
      <section className="bg-white border-b border-gray-200 py-8 sm:py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13b59b]/10 text-[#13b59b] text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Instant AI Valuation & Doorstep Payout
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {subtitle}
            </p>

            {/* Quick Live Search Bar */}
            <div className="pt-2 max-w-xl">
              <div className="relative flex items-center bg-[#f1f5f9] border border-gray-200 rounded-2xl p-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#13b59b]/30 focus-within:border-[#13b59b] transition">
                <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search your ${name.toLowerCase()} model (e.g. iPhone 14, Dell XPS, Galaxy S23)...`}
                  className="w-full bg-transparent px-3 py-1.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="mr-2 text-xs font-bold text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Blob */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#13b59b]/5 rounded-full blur-3xl pointer-events-none -translate-y-12 translate-x-12" />
      </section>

      {/* 3. MAIN CATALOG SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Brand Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              1. Select Brand
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              {brands.length} brands available
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setSelectedBrand('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedBrand === 'All'
                  ? 'bg-[#13b59b] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#13b59b]/50'
              }`}
            >
              All Brands
            </button>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedBrand.toLowerCase() === b.toLowerCase()
                    ? 'bg-[#13b59b] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#13b59b]/50'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Condition Selector Toggle */}
        <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                2. Device Working Condition
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Valuation adapts dynamically based on cosmetic and hardware quality
              </p>
            </div>
            <span className="text-xs font-semibold text-[#13b59b] bg-[#13b59b]/10 px-2.5 py-1 rounded-full w-fit">
              Current: {CONDITIONS.find((c) => c.id === condition)?.desc}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {CONDITIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCondition(c.id)}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  condition === c.id
                    ? 'border-[#13b59b] bg-[#edf7f5] shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-900">{c.label}</span>
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                      condition === c.id
                        ? 'bg-[#13b59b] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {Math.round(c.factor * 100)}% Value
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">{c.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Model Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight">
              Popular {selectedBrand === 'All' ? name : selectedBrand} Models
            </h2>
            <span className="text-xs text-gray-500 font-semibold">
              {filteredModels.length} models listed
            </span>
          </div>

          {filteredModels.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3">
              <div className="text-3xl">🔍</div>
              <h3 className="text-base font-bold text-gray-900">No models match your query</h3>
              <p className="text-xs text-gray-500">
                Try searching with a different brand or clearing the search filter.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedBrand('All');
                }}
                className="px-4 py-2 bg-[#13b59b] text-white text-xs font-bold rounded-xl hover:bg-[#0fa088] transition"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredModels.map((m) => {
                const livePrice = calculatePrice(m.max);
                return (
                  <div
                    key={m.id}
                    className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs hover:border-[#13b59b]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                          {m.brand}
                        </span>
                        <span className="text-lg">{emoji}</span>
                      </div>

                      {/* Device Title & Specs */}
                      <h3 className="text-sm font-black text-gray-900 group-hover:text-[#13b59b] transition-colors leading-snug">
                        {m.name}
                      </h3>
                      {m.specs && (
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {m.specs}
                        </p>
                      )}
                    </div>

                    {/* Valuation & CTA */}
                    <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                          Get Up To
                        </span>
                        <span className="text-lg font-black text-[#13b59b]">
                          {inr(livePrice)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenBooking(m)}
                        className="px-3.5 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        Sell Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. THREE SIMPLE STEPS */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Quick &amp; Hassle-Free
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              How Selling on Sellbar Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Get paid in 3 simple steps without visiting physical shops or haggling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#13b59b]/10 text-[#13b59b] flex items-center justify-center font-black text-lg mx-auto">
                1
              </div>
              <h3 className="text-base font-bold text-gray-900">Check Instant Price</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Select your device model, answer a few quick questions about its working condition, and receive a guaranteed valuation quote.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#13b59b]/10 text-[#13b59b] flex items-center justify-center font-black text-lg mx-auto">
                2
              </div>
              <h3 className="text-base font-bold text-gray-900">Free Doorstep Pickup</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Choose a comfortable date and time slot. Our verified logistic partner visits your home or office for contactless evaluation.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#13b59b]/10 text-[#13b59b] flex items-center justify-center font-black text-lg mx-auto">
                3
              </div>
              <h3 className="text-base font-bold text-gray-900">Instant Cash or UPI Transfer</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Once physical inspection is completed in front of you, the agreed funds are instantly sent to your UPI ID or bank account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY SELL ON SELLBAR (TRUST GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
            Trust &amp; Security
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Why 50,000+ Customers Trust Sellbar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#DC2564] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Guaranteed Highest Quote</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Our dynamic AI price engine matches real-time pan-India demand to guarantee maximum value.
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Instant Spot Payment</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Zero delays. Funds reflect in your bank account before our technician steps out of your door.
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">100% Free Doorstep Pickup</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              No convenience fees, no transportation costs, and zero cancellation penalty if you change your mind.
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">NIST 800-88 Data Wipe</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enterprise-grade military standard zero-fill data erasure ensures complete privacy of your personal data.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQS ACCORDION */}
      {faqs && faqs.length > 0 && (
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map(([q, a], idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={q}
                    className="border border-gray-200 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-gray-900 flex justify-between items-center bg-[#f8fafc] hover:bg-[#f1f5f9] transition cursor-pointer"
                    >
                      <span>{q}</span>
                      <span className="text-xl font-bold text-[#13b59b] ml-4">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 text-xs sm:text-sm text-gray-600 bg-white border-t border-gray-100 leading-relaxed">
                        {a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. INSTANT BOOKING DRAWER / MODAL */}
      {bookingOpen && selectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-1.5 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            {bookedSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-[#13b59b] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Pickup Slot Confirmed!
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We have locked your estimated price of{' '}
                  <strong className="text-[#13b59b] font-black">
                    {inr(calculatePrice(selectedModel.max))}
                  </strong>{' '}
                  for <span className="font-bold text-gray-900">{selectedModel.name}</span>.
                </p>
                <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-500">
                  Technician scheduled for: <b>{pickupDate}</b> in PIN: <b>{pincode}</b>. A confirmation SMS has been sent to <b>{customerPhone}</b>.
                </div>
                <button
                  onClick={() => setBookingOpen(false)}
                  className="w-full py-3 bg-[#13b59b] text-white text-xs font-bold rounded-xl hover:bg-[#0fa088] transition shadow-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#13b59b] uppercase tracking-wider block">
                    Instant Price Lock
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mt-0.5">
                    Schedule Free Doorstep Pickup
                  </h3>
                  <div className="mt-2 p-3 bg-[#edf7f5] rounded-xl border border-[#d8ece7] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-900">{selectedModel.name}</div>
                      <div className="text-[11px] text-gray-500 capitalize">Condition: {condition}</div>
                    </div>
                    <div className="text-base font-black text-[#13b59b]">
                      {inr(calculatePrice(selectedModel.max))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Mobile Number (for UPI Payout &amp; Verification)
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Pickup Pincode
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 122001"
                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">
                        Preferred Day
                      </label>
                      <select
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                      >
                        <option value="Today">Today (Within 2 hrs)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="This Weekend">This Weekend</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Confirm Doorstep Appointment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-2">
                    🔒 Free pickup with zero commitment. Pay after full on-site satisfaction.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
