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
  ChevronUp,
  ChevronDown,
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
  SlidersHorizontal,
  Star,
  Cpu,
  Laptop,
  Tablet,
  Tv,
  Gamepad2,
  Monitor,
  Check,
  Package,
} from 'lucide-react';
import { DEVICE_CATEGORIES_CONFIG } from '@/lib/deviceAssessmentData';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

export default function UniversalDeviceSellView({ categoryKey }) {
  const config = DEVICE_CATEGORIES_CONFIG[categoryKey] || DEVICE_CATEGORIES_CONFIG['laptop'];

  // Step state: 0: select model, 1: assessment, 2: booking, 3: confirmed
  const [stepIndex, setStepIndex] = useState(0);

  // Model & Filter states
  const [search, setSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 0, max: 250000 });
  const [sortBy, setSortBy] = useState('val-high');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  // Sidebar accordions
  const [openSections, setOpenSections] = useState({
    brand: true,
    price: true,
  });

  const toggleSection = (sec) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

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

  // Available brands with counts
  const availableBrands = useMemo(() => {
    const counts = {};
    (config.models || []).forEach((m) => {
      const b = m.brand || 'Other';
      counts[b] = (counts[b] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [config.models]);

  const visibleBrands = useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const q = brandSearch.toLowerCase();
    return availableBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [availableBrands, brandSearch]);

  const toggleBrand = (bName) => {
    setSelectedBrands((prev) =>
      prev.includes(bName) ? prev.filter((x) => x !== bName) : [...prev, bName]
    );
  };

  const applyPriceInputs = (e) => {
    if (e) e.preventDefault();
    const minVal = minPrice !== '' ? Number(minPrice) : 0;
    const maxVal = maxPrice !== '' ? Number(maxPrice) : 250000;
    setAppliedPriceRange({ min: Math.max(0, minVal), max: Math.max(minVal, maxVal) });
  };

  const applyQuickPrice = (min, max) => {
    setMinPrice(min.toString());
    setMaxPrice(max ? max.toString() : '');
    setAppliedPriceRange({ min, max: max || 250000 });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      selectedBrands.length > 0 ||
      appliedPriceRange.min > 0 ||
      appliedPriceRange.max < 250000 ||
      search.trim().length > 0
    );
  }, [selectedBrands, appliedPriceRange, search]);

  const resetAllFilters = () => {
    setSelectedBrands([]);
    setBrandSearch('');
    setMinPrice('');
    setMaxPrice('');
    setAppliedPriceRange({ min: 0, max: 250000 });
    setSearch('');
  };

  // Filtered and sorted models
  const filteredModels = useMemo(() => {
    let list = [...(config.models || [])];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.brand.toLowerCase().includes(q));
    }

    // Brands multi-select
    if (selectedBrands.length > 0) {
      const lowerBrands = selectedBrands.map((b) => b.toLowerCase());
      list = list.filter((m) => lowerBrands.includes(m.brand.toLowerCase()));
    }

    // Price range
    list = list.filter((m) => {
      const val = m.basePrice || 0;
      return val >= appliedPriceRange.min && val <= appliedPriceRange.max;
    });

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'val-high') return (b.basePrice || 0) - (a.basePrice || 0);
      if (sortBy === 'val-low') return (a.basePrice || 0) - (b.basePrice || 0);
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [config.models, search, selectedBrands, appliedPriceRange, sortBy]);

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
    window.scrollTo({ top: 320, behavior: 'smooth' });
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

  // Render Filter Sidebar Panel (Amazon/Flipkart style)
  const renderFilterPanel = () => (
    <div className="space-y-6 text-slate-800">
      {/* 1. Brands Section */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
        >
          <span>Brand ({selectedBrands.length > 0 ? `${selectedBrands.length} selected` : 'All'})</span>
          {openSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.brand && (
          <div className="space-y-2">
            {availableBrands.length > 4 && (
              <div className="relative mb-2">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brand..."
                  className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#13b59b]"
                />
              </div>
            )}

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
              {visibleBrands.map(({ name, count }) => {
                const isChecked = selectedBrands.includes(name);
                return (
                  <label
                    key={name}
                    onClick={() => toggleBrand(name)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition select-none ${
                      isChecked
                        ? 'bg-teal-50 text-[#13b59b] font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                          isChecked
                            ? 'bg-[#13b59b] border-[#13b59b] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span>{name}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. Valuation Price Range */}
      <div className="border-b border-slate-200 pb-5">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-900 mb-3"
        >
          <span>Estimated Valuation (₹)</span>
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openSections.price && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Under ₹20K', min: 0, max: 20000 },
                { label: '₹20K - ₹40K', min: 20000, max: 40000 },
                { label: '₹40K - ₹70K', min: 40000, max: 70000 },
                { label: '₹70K+', min: 70000, max: 250000 },
              ].map((tier, idx) => {
                const isActive =
                  appliedPriceRange.min === tier.min && appliedPriceRange.max === tier.max;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyQuickPrice(tier.min, tier.max)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-[#13b59b] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={applyPriceInputs} className="flex items-center gap-2 pt-1">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#13b59b]"
                />
              </div>
              <span className="text-slate-400 text-xs font-semibold">to</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#13b59b]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer shrink-0"
              >
                Go
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Selling Guarantees Badge */}
      <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-black text-slate-900">
          <ShieldCheck size={16} className="text-[#13b59b]" />
          <span>Sellbar Valuation Promise</span>
        </div>
        <ul className="text-[11px] text-slate-600 space-y-1 font-medium">
          <li>✓ Guaranteed highest payout in Bihar</li>
          <li>✓ Free doorstep diagnostic inspection</li>
          <li>✓ Instant UPI / Cash on the spot</li>
        </ul>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} /> Reset All Filters
        </button>
      )}
    </div>
  );

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

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center shrink-0 w-full sm:w-auto">
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

            <div className="bg-slate-50 p-5 rounded-2xl text-left text-xs space-y-3 border border-slate-200">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-200">
                <div className="w-14 h-14 bg-white rounded-xl p-1.5 border border-slate-200 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={getProductImageUrl(selectedModel, categoryKey)}
                    alt={selectedModel?.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getCategoryFallbackImage(categoryKey);
                    }}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{selectedModel?.name}</div>
                  <div className="text-[11px] text-teal-700 font-semibold">Doorstep Pickup Scheduled</div>
                </div>
              </div>
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

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 bg-white rounded-xl p-1.5 border border-teal-100 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={getProductImageUrl(selectedModel, categoryKey)}
                    alt={selectedModel.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getCategoryFallbackImage(categoryKey);
                    }}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{selectedModel.name}</div>
                  <div className="text-[11px] text-teal-800 font-semibold">100% Guaranteed Doorstep Payout</div>
                </div>
              </div>
              <div className="text-xl font-black text-[#13b59b] shrink-0">
                ₹{calculatedPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (For OTP Verification)</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Address</label>
                <input
                  type="text"
                  required
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={customer.pincode}
                    onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time Slot</label>
                  <select
                    value={customer.pickupDate}
                    onChange={(e) => setCustomer({ ...customer, pickupDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
                  >
                    <option>Tomorrow (10:00 AM - 1:00 PM)</option>
                    <option>Tomorrow (2:00 PM - 5:00 PM)</option>
                    <option>Day After Tomorrow (10:00 AM - 1:00 PM)</option>
                    <option>Express Pickup (Within 4 Hours in Bettiah)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={customer.paymentMode}
                    onChange={(e) => setCustomer({ ...customer, paymentMode: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13b59b]"
                  >
                    <option>Instant UPI (@okhdfcbank / GPay / Paytm)</option>
                    <option>Instant Bank NEFT / IMPS Transfer</option>
                    <option>Instant Doorstep Cash Payout</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500">Free cancellation anytime before pickup</span>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Schedule Free Pickup &amp; Lock Value
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 1: DEVICE-SPECIFIC CONDITION ASSESSMENT */}
        {stepIndex === 1 && selectedModel && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-200 rounded-2xl p-2 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={getProductImageUrl(selectedModel, categoryKey)}
                    alt={selectedModel.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getCategoryFallbackImage(categoryKey);
                    }}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#13b59b] tracking-wider">Step 2: Condition Assessment</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {selectedModel.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Brand: <strong className="text-slate-800">{selectedModel.brand}</strong> • Base Value: <strong className="text-slate-800">₹{selectedModel.basePrice.toLocaleString('en-IN')}</strong>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center sm:text-right w-full sm:w-auto shrink-0">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Current Estimated Valuation</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-0.5">
                  ₹{calculatedPrice.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">Updates dynamically based on answers</span>
              </div>
            </div>

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

        {/* STEP 0: MODEL DISCOVERY WITH AMAZON/FLIPKART STYLE FILTER SIDEBAR */}
        {stepIndex === 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* DESKTOP FILTER SIDEBAR */}
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-20 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                      <SlidersHorizontal size={16} className="text-[#13b59b]" />
                      <span>Refine Models</span>
                    </div>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetAllFilters}
                        className="text-xs font-bold text-rose-500 hover:text-rose-600 transition cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {renderFilterPanel()}
                </div>
              </aside>

              {/* MAIN MODEL CATALOG GRID */}
              <main className="lg:col-span-3 space-y-5">
                {/* Search & Sort Toolbar */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={`Search ${config.categoryName} model name...`}
                        className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#13b59b]"
                      />
                      {search && (
                        <button
                          type="button"
                          onClick={() => setSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <button
                        type="button"
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <SlidersHorizontal size={14} className="text-[#13b59b]" />
                        <span>Filter Models</span>
                        {hasActiveFilters && (
                          <span className="w-2 h-2 rounded-full bg-[#13b59b]"></span>
                        )}
                      </button>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400 font-semibold hidden sm:inline">Sort:</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="bg-slate-50 border border-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs focus:outline-none focus:border-[#13b59b] cursor-pointer"
                        >
                          <option value="val-high">Highest Valuation</option>
                          <option value="val-low">Lowest Valuation</option>
                          <option value="alpha">Model Name (A-Z)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Active Filter Chips */}
                  {hasActiveFilters && (
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                        Active:
                      </span>
                      {selectedBrands.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold"
                        >
                          <span>Brand: {b}</span>
                          <button type="button" onClick={() => toggleBrand(b)}>
                            <X size={12} />
                          </button>
                        </span>
                      ))}

                      {(appliedPriceRange.min > 0 || appliedPriceRange.max < 250000) && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold">
                          <span>
                            ₹{appliedPriceRange.min.toLocaleString('en-IN')} - ₹
                            {appliedPriceRange.max.toLocaleString('en-IN')}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setMinPrice('');
                              setMaxPrice('');
                              setAppliedPriceRange({ min: 0, max: 250000 });
                            }}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={resetAllFilters}
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 underline underline-offset-2 ml-1"
                      >
                        Clear All
                      </button>
                    </div>
                  )}

                  <div className="text-xs text-slate-500 pt-1">
                    Showing <strong className="text-slate-900">{filteredModels.length}</strong> eligible models for doorstep resale in West Champaran
                  </div>
                </div>

                {/* Models Grid */}
                {filteredModels.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#13b59b] flex items-center justify-center mx-auto">
                      <Package size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">No device models matched your filters</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Try clearing active filters or searching for another brand or model name.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="px-5 py-2.5 bg-[#13b59b] text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredModels.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleSelectModel(m)}
                        className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#13b59b] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                              {m.brand}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              Instant Cash
                            </span>
                          </div>

                          <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#13b59b] transition line-clamp-2 leading-snug">
                            {m.name}
                          </h3>
                          {m.specs && <p className="text-[11px] text-slate-400 mt-1">{m.specs}</p>}

                          <div className="relative aspect-[4/3] w-full bg-[#f8fafc] rounded-2xl p-4 my-3 overflow-hidden flex items-center justify-center border border-slate-100">
                            <img
                              src={getProductImageUrl(m, categoryKey)}
                              alt={m.name}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getCategoryFallbackImage(categoryKey);
                              }}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Get Up To</span>
                            <span className="text-base font-black text-[#13b59b]">
                              ₹{m.basePrice.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <span className="px-3 py-1.5 bg-teal-50 group-hover:bg-[#13b59b] group-hover:text-white text-[#13b59b] rounded-xl text-xs font-bold transition flex items-center gap-1">
                            <span>Sell Now</span>
                            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            </div>

            {/* Selling Process Steps */}
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-xl font-black text-slate-900">How Selling Works in 3 Simple Steps</h3>
                <p className="text-xs text-slate-500 mt-1">From online price check to instant payment at your doorstep</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="text-center space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#13b59b] font-black text-sm mx-auto flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Check Price Online</h4>
                  <p className="text-[11px] text-slate-500">Answer 3-4 hardware questions regarding your device to see instant guaranteed valuation.</p>
                </div>

                <div className="text-center space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#13b59b] font-black text-sm mx-auto flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Book Free Doorstep Pickup</h4>
                  <p className="text-[11px] text-slate-500">Pick your convenient date &amp; time slot. Our technician arrives at your home or office address.</p>
                </div>

                <div className="text-center space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-[#13b59b] font-black text-sm mx-auto flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">Instant Cash or UPI</h4>
                  <p className="text-[11px] text-slate-500">Technician inspects the device in 10 minutes and transfers money before device collection.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* MOBILE SLIDE-OVER FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>

          <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <SlidersHorizontal size={18} className="text-[#13b59b]" />
                <span>Filter Models</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterPanel()}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                Show Results ({filteredModels.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
