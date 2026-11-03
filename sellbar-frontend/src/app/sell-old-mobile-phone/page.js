'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ChevronRight,
  Filter,
  ArrowUpDown,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  ThumbsUp,
  MapPin,
  Lock,
} from 'lucide-react';
import { POPULAR_BRANDS, MOBILE_MODELS, queryMobileModels } from '@/lib/sellMobileData';
import SellSearchBar from '@/components/sell/SellSearchBar';
import MobileModelCard from '@/components/sell/MobileModelCard';
import SellFiltersSidebar from '@/components/sell/SellFiltersSidebar';

function SellOldMobileMainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL param initializations
  const brandParam = searchParams.get('brand') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    if (brandParam) setSelectedBrand(brandParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [brandParam, searchParam]);

  const handleToggleRam = (ram) => {
    setSelectedRam((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  const handleToggleStorage = (stg) => {
    setSelectedStorage((prev) =>
      prev.includes(stg) ? prev.filter((s) => s !== stg) : [...prev, stg]
    );
  };

  const handleResetFilters = () => {
    setSelectedBrand('all');
    setSearchQuery('');
    setSelectedRam([]);
    setSelectedStorage([]);
    setSelectedNetwork('all');
    setPriceRange({ min: 0, max: 100000 });
    setSortBy('popularity');
    router.push('/sell-old-mobile-phone');
  };

  // Filtered models
  const models = useMemo(() => {
    return queryMobileModels({
      brand: selectedBrand,
      search: searchQuery,
      ram: selectedRam,
      storage: selectedStorage,
      network: selectedNetwork,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sortBy,
    });
  }, [selectedBrand, searchQuery, selectedRam, selectedStorage, selectedNetwork, priceRange, sortBy]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sell Old Mobile Phone Online | Best Price & Instant Cash | Sellbar',
    description: 'Sell your used smartphone online at the best price. Free doorstep evaluation, instant UPI/bank transfer, and 100% NIST certified data wiping across West Champaran.',
    url: 'https://sellbar.in/sell-old-mobile-phone',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Sell Old Mobile Phone</span>
          </nav>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-12 md:py-18 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
              <Zap size={14} /> India&apos;s Fastest Doorstep Re-Commerce Platform
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Sell Your Old Mobile at the <span className="text-[#13b59b]">Best Price</span>.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Get an accurate market evaluation in 60 seconds. Free doorstep pickup, on-site diagnostics, and instant UPI or bank transfer in Bettiah, Bagaha, and across Bihar.
            </p>

            {/* Live Autocomplete Search Bar */}
            <div className="mt-8 max-w-2xl">
              <SellSearchBar />
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur">
                <CheckCircle2 size={15} className="text-[#13b59b]" /> Instant Cash on Spot
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur">
                <ShieldCheck size={15} className="text-amber-400" /> Free Doorstep Pickup
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur">
                <Lock size={15} className="text-cyan-400" /> 100% Safe Data Wipe
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR BRANDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Select Your Phone Brand
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Choose your brand to view all eligible models and valuation quotes
            </p>
          </div>

          {selectedBrand !== 'all' && (
            <button
              onClick={() => setSelectedBrand('all')}
              className="text-xs font-bold text-[#13b59b] hover:underline cursor-pointer"
            >
              Show All Brands
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {POPULAR_BRANDS.map((b) => {
            const isSelected = selectedBrand?.toLowerCase() === b.slug.toLowerCase();
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBrand(isSelected ? 'all' : b.slug)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-[#13b59b] bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <span className="font-black text-base text-slate-900 group-hover:scale-110 transition-transform">
                    {b.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="font-extrabold text-xs text-slate-800 line-clamp-1">{b.name}</span>
                <span className="text-[10px] font-bold text-slate-400">
                  {MOBILE_MODELS.filter((m) => m.brandSlug.toLowerCase() === b.slug.toLowerCase()).length} Models
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. MAIN CATALOG WITH ADVANCED FILTERING & SORTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar & Mobile Drawer */}
          <SellFiltersSidebar
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            selectedRam={selectedRam}
            onToggleRam={handleToggleRam}
            selectedStorage={selectedStorage}
            onToggleStorage={handleToggleStorage}
            selectedNetwork={selectedNetwork}
            onSelectNetwork={setSelectedNetwork}
            priceRange={priceRange}
            onChangePriceRange={setPriceRange}
            onResetFilters={handleResetFilters}
            totalResults={models.length}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Product Listing Column */}
          <div className="flex-1">
            {/* Control Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition"
                >
                  <Filter size={14} />
                  <span>Filters</span>
                </button>

                <p className="text-xs sm:text-sm font-bold text-slate-600">
                  Showing <span className="text-slate-900 font-extrabold">{models.length}</span> Smartphone Models
                </p>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#13b59b] cursor-pointer"
                >
                  <option value="popularity">Popularity / Demand</option>
                  <option value="price-desc">Highest Resale Value</option>
                  <option value="price-asc">Lowest Resale Value</option>
                  <option value="newest">Newest Launch Year</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {models.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {models.map((model) => (
                  <MobileModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
                <Smartphone size={44} className="text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-lg text-slate-900">No Mobile Phones Match Your Filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try broadening your search term, clearing brand selections, or resetting RAM and price sliders.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="py-2.5 px-6 bg-[#13b59b] text-white rounded-xl text-xs font-bold shadow hover:bg-[#0fa088] transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. WHY SELL ON SELLBAR */}
      <section className="bg-white border-t border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-black text-slate-900">Why Customers Trust Sellbar</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              West Champaran&apos;s most reliable smartphone trade-in service with certified doorstep technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <Zap size={24} className="text-[#13b59b] mb-3" />
              <h4 className="font-bold text-sm text-slate-900">Instant UPI Cashout</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                No delayed vouchers or store credits. Receive direct cash or UPI in your account on the spot.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <ShieldCheck size={24} className="text-amber-500 mb-3" />
              <h4 className="font-bold text-sm text-slate-900">NIST Data Destruction</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Guaranteed zero residual data. All phones undergo certified multi-pass factory erasure.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <MapPin size={24} className="text-blue-500 mb-3" />
              <h4 className="font-bold text-sm text-slate-900">Free Doorstep Pickup</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Zero travel required. Our technician arrives at your home or office anywhere across the district.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <Clock size={24} className="text-purple-500 mb-3" />
              <h4 className="font-bold text-sm text-slate-900">Zero Cancellation Fee</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                If the physical condition inspection does not match your expectation, cancel freely at zero cost.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SellOldMobilePhonePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-sm">Loading Sellbar Mobile Marketplace...</div>}>
      <SellOldMobileMainContent />
    </Suspense>
  );
}
