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
  DollarSign,
  AlertTriangle,
  Sliders,
  Star,
  Cpu,
  Laptop,
  Tablet,
  Tv,
  Gamepad2,
  Monitor
} from 'lucide-react';
import { DEVICE_CATEGORIES_CONFIG } from '@/lib/deviceAssessmentData';

export default function UniversalDeviceSellView({ categoryKey }) {
  const config = DEVICE_CATEGORIES_CONFIG[categoryKey] || DEVICE_CATEGORIES_CONFIG['laptop'];

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedModel, setSelectedModel] = useState(null);
  const [stepIndex, setStepIndex] = useState(0); // 0: select model, 1: assessment, 2: booking, 3: confirmed

  // Assessment answers map: { [stepId]: selectedOption }
  const [answers, setAnswers] = useState({});

  // Booking details
  const [customer, setCustomer] = useState({
    name: 'Aman Verma',
    phone: '9876543210',
    email: 'aman@example.com',
    address: 'Near Supriya Cinema Road, Lal Bazar',
    city: 'Bettiah',
    pincode: '845438',
    pickupDate: 'Tomorrow (10:00 AM - 1:00 PM)',
    paymentMode: 'Instant UPI (@okhdfcbank)',
  });
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  // Filtered models
  const filteredModels = useMemo(() => {
    let list = config.models;
    if (selectedBrand !== 'All') {
      list = list.filter((m) => m.brand.toLowerCase() === selectedBrand.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.brand.toLowerCase().includes(q));
    }
    return list;
  }, [config.models, selectedBrand, search]);

  // Dynamic Valuation calculation
  const calculatedPrice = useMemo(() => {
    if (!selectedModel) return 0;
    let base = selectedModel.basePrice || 20000;
    let multiplier = 1.0;
    let bonusSum = 0;
    let deductionSum = 0;

    config.assessmentSteps.forEach((step) => {
      const chosen = answers[step.id];
      if (chosen) {
        if (chosen.factor !== undefined) multiplier *= chosen.factor;
        if (chosen.bonus) bonusSum += chosen.bonus;
        if (chosen.deduction) deductionSum += chosen.deduction;
      }
    });

    let finalPrice = Math.round(base * multiplier + bonusSum - deductionSum);
    return Math.max(1500, finalPrice);
  }, [selectedModel, answers, config.assessmentSteps]);

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setAnswers({});
    setStepIndex(1);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleAnswerSelect = (stepId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [stepId]: option,
    }));
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const orderId = `SB-${categoryKey.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderId(orderId);
    setStepIndex(3);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/sell" className="hover:text-[#13b59b] transition">Sell Gadgets</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">{config.categoryName}</span>
          </nav>
        </div>
      </div>

      {/* 2. Device Category Hero */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Zap size={14} /> Free Doorstep Pickup &amp; Instant Cash
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {config.heroTitle}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs">
                <CheckCircle2 size={16} className="text-[#13b59b]" /> 10-Minute On-Site Diagnostic
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs">
                <ShieldCheck size={16} className="text-[#2dd4bf]" /> Instant UPI / Bank Transfer
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shrink-0 space-y-2 w-full sm:w-auto">
            <div className="text-3xl font-black text-[#2dd4bf]">₹0 Fee</div>
            <div className="text-xs text-slate-300">100% Free Doorstep Valuation</div>
            <div className="text-xl font-bold text-white pt-2">24 Hours</div>
            <div className="text-[11px] text-teal-300 font-semibold">Bettiah &amp; West Champaran SLA</div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        {/* STEP 3: BOOKING CONFIRMED SCREEN */}
        {stepIndex === 3 && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-2xl mx-auto shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#13b59b] mx-auto flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 text-[#13b59b] border border-emerald-200">
                Doorstep Pickup Scheduled
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-3">
                Sell Request Confirmed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Order ID: <strong className="font-mono text-slate-900">{confirmedOrderId}</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Device:</span>
                <span className="text-slate-900">{selectedModel?.name}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Quoted Valuation:</span>
                <span className="text-emerald-700 text-sm">₹{calculatedPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Pickup Schedule:</span>
                <span className="text-slate-900">{customer.pickupDate}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="text-slate-900">{customer.paymentMode}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Address:</span>
                <span className="text-slate-900">{customer.address}, {customer.city} ({customer.pincode})</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Our certified inspection executive will arrive at your address with diagnostic equipment. Once on-site inspection is completed, the payment is transferred immediately.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 justify-center">
              <Link
                href="/orders"
                className="px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow transition"
              >
                Track My Requests
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSelectedModel(null);
                  setStepIndex(0);
                }}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Sell Another Device
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOMER DETAILS & PICKUP SCHEDULING */}
        {stepIndex === 2 && selectedModel && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-[#13b59b] tracking-wider">Step 3 of 3</span>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">
                  Confirm Doorstep Pickup &amp; Payment Details
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setStepIndex(1)}
                className="text-xs font-bold text-slate-500 hover:text-[#13b59b]"
              >
                ← Back to Assessment
              </button>
            </div>

            {/* Valuation Snapshot Bar */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500">{selectedModel.name}</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">
                  Estimated Cash: <span className="text-[#13b59b]">₹{calculatedPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-white text-[#13b59b] border border-teal-200 rounded-full text-xs font-bold">
                Guaranteed Price Quote
              </span>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Doorstep Pickup Street Address *</label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                  <select
                    value={customer.pickupDate}
                    onChange={(e) => setCustomer({ ...customer, pickupDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  >
                    <option value="Tomorrow (10:00 AM - 1:00 PM)">Tomorrow (10:00 AM - 1:00 PM)</option>
                    <option value="Tomorrow (2:00 PM - 6:00 PM)">Tomorrow (2:00 PM - 6:00 PM)</option>
                    <option value="Day After Tomorrow (Morning)">Day After Tomorrow (Morning)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Payout Method</label>
                <select
                  value={customer.paymentMode}
                  onChange={(e) => setCustomer({ ...customer, paymentMode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                >
                  <option value="Instant UPI (@okhdfcbank)">Instant UPI (GPay / PhonePe / Paytm)</option>
                  <option value="Direct IMPS / Bank Transfer">Instant IMPS Bank Transfer</option>
                  <option value="Cash Payment at Doorstep">Cash on Handover</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStepIndex(1)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Schedule Free Doorstep Pickup →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 1: DEVICE-SPECIFIC CONDITION ASSESSMENT */}
        {stepIndex === 1 && selectedModel && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* Header & Device Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-black uppercase text-[#13b59b] tracking-wider">Step 2: Condition Assessment</span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {selectedModel.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Brand: <strong className="text-slate-800">{selectedModel.brand}</strong> • Base Value: <strong className="text-slate-800">₹{selectedModel.basePrice.toLocaleString('en-IN')}</strong>
                </p>
              </div>

              {/* Live Price Estimation Display */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center sm:text-right w-full sm:w-auto">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Current Estimated Valuation</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-0.5">
                  ₹{calculatedPrice.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">Updates dynamically based on answers</span>
              </div>
            </div>

            {/* Assessment Questions (Device-Specific) */}
            <div className="space-y-6">
              {config.assessmentSteps.map((step, idx) => {
                const currentAnswer = answers[step.id];
                return (
                  <div key={step.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-teal-50 text-[#13b59b] font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                        <p className="text-xs text-slate-500">{step.subtitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {step.options.map((opt) => {
                        const isSelected = currentAnswer?.label === opt.label;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleAnswerSelect(step.id, opt)}
                            className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-teal-50/70 border-[#13b59b] text-[#13b59b] shadow-xs ring-1 ring-[#13b59b]'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                            }`}
                          >
                            <span className="text-xs font-semibold">{opt.label}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              {opt.bonus ? (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                                  +₹{opt.bonus}
                                </span>
                              ) : opt.deduction ? (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md">
                                  -₹{opt.deduction}
                                </span>
                              ) : null}
                              {isSelected && <CheckCircle2 size={16} className="text-[#13b59b]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Assessment Action Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500">Ready to lock in your payout?</span>
                <div className="text-lg font-black text-slate-900">
                  Total Guaranteed Value: <span className="text-[#13b59b]">₹{calculatedPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setStepIndex(0)}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Change Model
                </button>
                <button
                  type="button"
                  onClick={() => setStepIndex(2)}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Continue to Booking →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 0: MODEL DISCOVERY & SEARCH */}
        {stepIndex === 0 && (
          <div className="space-y-10">
            {/* Search & Brands Selector Toolbar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-md">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search ${config.categoryName} model...`}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <X size={13} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Brand:</span>
                  {['All', ...config.brands].map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        selectedBrand === b
                          ? 'bg-[#13b59b] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Models Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Select Your Device Model</h2>
                  <p className="text-xs text-slate-500">Pick your device from the catalog below to begin condition evaluation.</p>
                </div>
                <span className="text-xs font-bold text-slate-400">{filteredModels.length} models listed</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredModels.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleSelectModel(m)}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#13b59b] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                          {m.brand}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Up to ₹{m.basePrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#13b59b] transition line-clamp-2">
                        {m.name}
                      </h3>
                      {m.specs && <p className="text-[11px] text-slate-400 mt-1">{m.specs}</p>}
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#13b59b]">
                      <span>Evaluate Device</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selling Process Steps */}
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-xl font-black text-slate-900">How Selling Works in 3 Simple Steps</h3>
                <p className="text-xs text-slate-500 mt-1">From online price check to instant payment at your doorstep</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="text-center space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#13b59b] font-black text-sm mx-auto flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Check Price Online</h4>
                  <p className="text-[11px] text-slate-500">Answer 3-4 hardware questions regarding your device to see instant guaranteed valuation.</p>
                </div>

                <div className="text-center space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#13b59b] font-black text-sm mx-auto flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Book Free Doorstep Pickup</h4>
                  <p className="text-[11px] text-slate-500">Pick your convenient date &amp; time slot. Our technician arrives at your home or office address.</p>
                </div>

                <div className="text-center space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#13b59b] font-black text-sm mx-auto flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Instant Cash or UPI</h4>
                  <p className="text-[11px] text-slate-500">Technician inspects the device in 10 minutes and transfers money before device collection.</p>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <div className="bg-slate-100/60 rounded-3xl p-8 border border-slate-200/80">
              <h3 className="text-base font-black text-slate-900 mb-4 text-center">Verified Customer Experiences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} className="fill-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    &quot;Sold my used MacBook Air in Bettiah. The technician arrived on time, ran thermal checks, and sent ₹42,000 directly to my Google Pay account. Incredible service!&quot;
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 block pt-1">— Rahul K., Bettiah Lal Bazar</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} className="fill-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    &quot;Much better than negotiating with lowballers on OLX. Sellbar offered fair valuation for my iPad Pro and picked it up from Bagaha.&quot;
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 block pt-1">— Ananya M., Bagaha</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
