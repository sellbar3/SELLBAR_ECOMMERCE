'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronRight,
  Filter,
  ArrowUpDown,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { POPULAR_BRANDS, MOBILE_MODELS, queryMobileModels } from '@/lib/sellMobileData';
import SellSearchBar from '@/components/sell/SellSearchBar';
import MobileModelCard from '@/components/sell/MobileModelCard';
import SellFiltersSidebar from '@/components/sell/SellFiltersSidebar';

function SellBrandContent() {
  const params = useParams();
  const router = useRouter();
  const rawBrand = params?.brand ? String(params.brand).toLowerCase() : '';
  const brandSlug = rawBrand.replace(/^sell-/, '').trim();

  // If visitor navigated directly to a model slug under /sell-old-mobile-phone/[slug]
  React.useEffect(() => {
    if (!brandSlug) return;
    const directModel = MOBILE_MODELS.find(
      (m) =>
        m.slug.toLowerCase() === brandSlug ||
        m.id.toLowerCase() === brandSlug ||
        rawBrand.includes(m.slug.toLowerCase()) ||
        m.slug.toLowerCase().includes(brandSlug.replace(/^used-/, ''))
    );
    if (directModel) {
      router.replace(`/sell-old-mobile-phone/${directModel.brandSlug}/${directModel.slug}`);
    }
  }, [brandSlug, rawBrand, router]);

  const brandInfo = POPULAR_BRANDS.find(
    (b) =>
      b.slug.toLowerCase() === brandSlug ||
      b.name.toLowerCase() === brandSlug ||
      b.slug.toLowerCase() === rawBrand
  ) || {
    name: brandSlug ? brandSlug.toUpperCase() : 'Brand',
    slug: brandSlug,
    logo: '',
    count: 0,
  };

  // Filter States
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle RAM
  const handleToggleRam = (ram) => {
    setSelectedRam((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  // Toggle Storage
  const handleToggleStorage = (stg) => {
    setSelectedStorage((prev) =>
      prev.includes(stg) ? prev.filter((s) => s !== stg) : [...prev, stg]
    );
  };

  const handleResetFilters = () => {
    setSelectedRam([]);
    setSelectedStorage([]);
    setSelectedNetwork('all');
    setPriceRange({ min: 0, max: 100000 });
    setSortBy('popularity');
  };

  // Filter models
  const models = useMemo(() => {
    return queryMobileModels({
      brand: brandSlug,
      ram: selectedRam,
      storage: selectedStorage,
      network: selectedNetwork,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sortBy,
    });
  }, [brandSlug, selectedRam, selectedStorage, selectedNetwork, priceRange, sortBy]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Sell Old ${brandInfo.name} Mobile Phones | Best Resale Price | Sellbar.in`,
    description: `Sell your used ${brandInfo.name} smartphone online for instant cash payout and free doorstep evaluation in Bettiah & West Champaran.`,
    itemListElement: models.map((m, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: m.name,
      url: `https://sellbar.in/sell-old-mobile-phone/${m.brandSlug}/${m.slug}`,
    })),
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
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/sell-old-mobile-phone" className="hover:text-[#13b59b] transition">Sell Old Mobile</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-900 font-semibold">{brandInfo.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header for Brand */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Official Valuation Partner
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {models.length} Models Available
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Sell Old {brandInfo.name} Phone. <br />
              <span className="text-[#13b59b]">Get Instant Doorstep Cash in 24 Hours.</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Find your {brandInfo.name} smartphone model below to unlock real-time market value based on screen condition, battery health, and accessories.
            </p>

            {/* In-Hero Search Bar */}
            <div className="mt-8 max-w-xl">
              <SellSearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog with Filters & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar & Mobile Drawer */}
          <SellFiltersSidebar
            selectedBrand={brandSlug}
            onSelectBrand={(b) => {
              if (b === 'all') router.push('/sell-old-mobile-phone');
              else router.push(`/sell-old-mobile-phone/${b}`);
            }}
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

          {/* Product Cards Column */}
          <div className="flex-1">
            {/* Control Bar: Count, Mobile Filter Trigger, Sort */}
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
                  Showing <span className="text-slate-900">{models.length}</span> {brandInfo.name} Models
                </p>
              </div>

              {/* Sorting Selector */}
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

            {/* Models Grid */}
            {models.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {models.map((model) => (
                  <MobileModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <Smartphone size={44} className="text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-lg text-slate-900">No {brandInfo.name} Models Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No devices matched your selected RAM, storage, or price criteria. Try adjusting or clearing your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="py-2.5 px-5 bg-[#13b59b] text-white rounded-xl text-xs font-bold shadow hover:bg-[#0fa088] transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SellBrandPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-sm">Loading Brand Models...</div>}>
      <SellBrandContent />
    </Suspense>
  );
}
