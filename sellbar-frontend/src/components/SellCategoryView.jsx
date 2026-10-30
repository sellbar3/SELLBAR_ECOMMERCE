'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Zap, ArrowRight, ChevronDown, Star, Truck, BadgeCheck, ChevronRight, } from 'lucide-react';
export default function SellCategoryView({ categorySlug, categoryName, deviceType, title, subtitle, brands, topModels, faqs, seoGuideTitle, seoGuideContent, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('ALL');
    const [openFaq, setOpenFaq] = useState(0);
    const [conditionTier, setConditionTier] = useState('flawless');
    // Filter models by brand and search query
    const filteredModels = topModels.filter((model) => {
        const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrand === 'ALL' || model.brand.toLowerCase() === selectedBrand.toLowerCase();
        return matchesSearch && matchesBrand;
    });
    // Calculate dynamic price based on simulated condition tier
    const getAdjustedPrice = (basePrice) => {
        if (conditionTier === 'flawless')
            return basePrice;
        if (conditionTier === 'good')
            return Math.round(basePrice * 0.88);
        return Math.round(basePrice * 0.72);
    };
    return (<div className="bg-[#f7f9fa] min-h-screen text-gray-900 pb-20 antialiased selection:bg-[#13b59b]/20 selection:text-[#13b59b]">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#13b59b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400"/>
          <Link href="/sell" className="hover:text-[#13b59b] transition-colors">
            Sell Old Device
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400"/>
          <span className="text-[#13b59b] font-semibold">{categoryName}</span>
        </div>
      </div>

      {/* Hero Section: Cashify Split Layout */}
      <section className="bg-white border-b border-gray-200 pt-8 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading + Brand Selection Grid (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13b59b]/10 text-[#13b59b] text-xs font-bold mb-3">
                  <Zap className="w-3.5 h-3.5 fill-current"/>
                  Instant AI Valuation &amp; Doorstep Cash
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </div>

              {/* Search Box */}
              <div className="relative max-w-xl">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"/>
                <input type="text" placeholder={`Search ${categoryName} model (e.g. iPhone 13, Galaxy S23, MacBook M2)...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#13b59b] focus:bg-white text-gray-900 transition-all shadow-xs"/>
              </div>

              {/* Select Brand Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <span>Select Brand</span>
                    <span className="text-xs font-normal text-gray-500">
                      ({brands.length} brands available)
                    </span>
                  </h3>
                  {selectedBrand !== 'ALL' && (<button onClick={() => setSelectedBrand('ALL')} className="text-xs font-bold text-[#13b59b] hover:underline">
                      Show All Brands
                    </button>)}
                </div>

                {/* Brand Logo Tiles */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3">
                  {brands.slice(0, 12).map((b) => {
            const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
            return (<button key={b.slug} type="button" onClick={() => setSelectedBrand(isSelected ? 'ALL' : b.name)} className={`group p-2 sm:p-2.5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all duration-200 ${isSelected
                    ? 'border-[#13b59b] bg-[#13b59b]/5 shadow-md scale-102 ring-2 ring-[#13b59b]/20'
                    : 'border-gray-200 bg-white hover:border-[#13b59b]/60 hover:shadow-sm hover:-translate-y-0.5'}`}>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 flex items-center justify-center p-2 mb-1.5 overflow-hidden group-hover:scale-105 transition-transform">
                          {b.logoUrl ? (<img src={b.logoUrl} alt={b.name} className="max-h-full max-w-full object-contain"/>) : (<span className="text-xs font-black text-gray-700">
                              {b.name.slice(0, 4)}
                            </span>)}
                        </div>
                        <span className={`text-[11px] font-bold tracking-tight line-clamp-1 ${isSelected ? 'text-[#13b59b]' : 'text-gray-800'}`}>
                          {b.name}
                        </span>
                      </button>);
        })}
                </div>
              </div>
            </div>

            {/* Right Column: Cashify 3D Hero Graphic + Trust Floating Badges (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-md aspect-4/3 flex items-center justify-center">
                {/* Mint Glow Backdrop */}
                <div className="absolute w-72 h-72 rounded-full bg-[#13b59b]/15 blur-3xl -z-10"/>

                {/* Official Cashify Phone Selling Hero Graphic */}
                <img src="https://s3ng.cashify.in/cashify/web/1bf13dcba9414a7ebe6e7a7afdc10f41.webp" alt="Sell Old Device Online on Sellbar" className="max-h-80 w-auto object-contain drop-shadow-xl animate-float"/>

                {/* Floating Card 1: Instant Cash */}
                <div className="absolute top-4 -left-2 sm:left-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-3 shadow-lg flex items-center gap-3 animate-pulse-subtle">
                  <div className="w-9 h-9 rounded-xl bg-[#13b59b]/15 flex items-center justify-center text-[#13b59b]">
                    <Zap className="w-5 h-5 fill-current"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">
                      Payout Method
                    </p>
                    <p className="text-xs font-black text-gray-900">
                      Instant UPI / Cash
                    </p>
                  </div>
                </div>

                {/* Floating Card 2: 1500+ Cities Free Pickup */}
                <div className="absolute bottom-4 -right-2 sm:right-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Truck className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase">
                      Doorstep Pickup
                    </p>
                    <p className="text-xs font-black text-gray-900">
                      100% Free &amp; Insured
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Trust Metrics Strip */}
              <div className="grid grid-cols-4 gap-2 w-full mt-4 text-center">
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="block text-sm font-black text-gray-900">1500+</span>
                  <span className="text-[10px] text-gray-500 font-medium">Cities</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="block text-sm font-black text-[#13b59b]">₹1200Cr+</span>
                  <span className="text-[10px] text-gray-500 font-medium">Disbursed</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="block text-sm font-black text-gray-900">60L+</span>
                  <span className="text-[10px] text-gray-500 font-medium">Sold</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="block text-sm font-black text-amber-500">4.8★</span>
                  <span className="text-[10px] text-gray-500 font-medium">Reviews</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: How Sellbar Works (3-Step 3D Process with Cashify 3D Assets) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight">
              How to Sell Your Old {categoryName} on Sellbar
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Three effortless steps to unlock the highest doorstep value in under 24 hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="group bg-[#f8fbfa] border border-[#d2f3ed] rounded-2xl p-6 text-center space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <img src="https://s3ng.cashify.in/estore/0cbe53723c3f453b9129991ca35df5f0.png" alt="Step 1: Check Price" className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"/>
                <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#13b59b] text-white text-xs font-black flex items-center justify-center shadow-xs">
                  1
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900">Check Instant Price</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Select your exact model and answer a few quick diagnostic questions regarding physical
                condition and functional state.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group bg-[#f8fbfa] border border-[#d2f3ed] rounded-2xl p-6 text-center space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <img src="https://s3ng.cashify.in/estore/11c121e3650747689b22301209b725a4.png" alt="Step 2: Schedule Pickup" className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"/>
                <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#13b59b] text-white text-xs font-black flex items-center justify-center shadow-xs">
                  2
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900">Schedule Free Pickup</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pick a convenient time slot and doorstep address. Our certified inspection agent visits
                your home or office at zero charge.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group bg-[#f8fbfa] border border-[#d2f3ed] rounded-2xl p-6 text-center space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <img src="https://s3ng.cashify.in/estore/b9d74e87eedd4de3b47531e13a033fb2.png" alt="Step 3: Get Paid Instantly" className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"/>
                <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#13b59b] text-white text-xs font-black flex items-center justify-center shadow-xs">
                  3
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900">Get Paid Instantly</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                After a 5-minute transparent inspection, receive instant money via UPI, IMPS, or cash
                right before you hand over the device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Popular Models Catalog with Live Condition Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Popular {selectedBrand === 'ALL' ? categoryName : selectedBrand} Models
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Showing {filteredModels.length} models benchmarked to real secondary market prices
            </p>
          </div>

          {/* Interactive Condition Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-gray-200 w-fit">
            <span className="text-[11px] font-bold text-gray-500 px-2.5">Simulate Condition:</span>
            <button type="button" onClick={() => setConditionTier('flawless')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${conditionTier === 'flawless'
            ? 'bg-[#13b59b] text-white shadow-xs'
            : 'text-gray-600 hover:text-gray-900'}`}>
              Flawless (100%)
            </button>
            <button type="button" onClick={() => setConditionTier('good')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${conditionTier === 'good'
            ? 'bg-[#13b59b] text-white shadow-xs'
            : 'text-gray-600 hover:text-gray-900'}`}>
              Good (88%)
            </button>
            <button type="button" onClick={() => setConditionTier('average')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${conditionTier === 'average'
            ? 'bg-[#13b59b] text-white shadow-xs'
            : 'text-gray-600 hover:text-gray-900'}`}>
              Average (72%)
            </button>
          </div>
        </div>

        {filteredModels.length === 0 ? (<div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <Search className="w-8 h-8"/>
            </div>
            <h4 className="text-base font-bold text-gray-900">
              No matching models found for &quot;{searchQuery}&quot;
            </h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try searching with another keyword or reset the active brand filter to see all devices.
            </p>
            <button onClick={() => {
                setSearchQuery('');
                setSelectedBrand('ALL');
            }} className="py-2 px-5 rounded-xl bg-[#13b59b] text-white text-xs font-bold hover:bg-[#119e87] transition shadow-xs">
              Reset Search Filters
            </button>
          </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredModels.map((m) => {
                const adjustedPrice = getAdjustedPrice(m.maxPrice);
                return (<Link key={m.id} href={`/sell/device/${m.slug}`} className="group bg-white border border-gray-200 hover:border-[#13b59b] rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
                  {/* Brand Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">
                      {m.brand}
                    </span>
                    <span className="text-[10px] text-[#13b59b] font-bold">
                      Verified
                    </span>
                  </div>

                  {/* Device Cutout Image */}
                  <div className="w-full aspect-square bg-[#f8fafc] rounded-2xl flex items-center justify-center p-3 mb-3 relative overflow-hidden group-hover:bg-[#f0faf8] transition-colors">
                    <img src={m.imageUrl} alt={m.name} className="max-h-28 max-w-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"/>
                  </div>

                  {/* Device Details & Price */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#13b59b] transition-colors leading-snug">
                      {m.name}
                    </h4>
                    {m.specs && (<p className="text-[10px] text-gray-400 line-clamp-1">{m.specs}</p>)}

                    <div className="pt-2 border-t border-gray-100 mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-medium">
                          Get up to
                        </span>
                        <span className="text-sm sm:text-base font-black text-gray-900">
                          ₹{adjustedPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-[#13b59b]/10 group-hover:bg-[#13b59b] text-[#13b59b] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs">
                        <ArrowRight className="w-4 h-4"/>
                      </span>
                    </div>
                  </div>
                </Link>);
            })}
          </div>)}
      </section>

      {/* Section 4: Why Sell to Sellbar (6 3D Feature Cards matching Cashify) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Why Sell Old {categoryName} to Sellbar?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              India&apos;s highest-rated recommerce platform backed by institutional safety and technology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfdfc] hover:border-[#13b59b]/50 transition-all duration-300 hover:shadow-md flex items-start gap-4">
              <img src="https://s3ng.cashify.in/estore/99953fd419e2416ba7dc25e0164372c3.png" alt="Best Price Guarantee" className="w-14 h-14 object-contain shrink-0"/>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">Best Price Guarantee</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our algorithmic pricing model analyzes secondary market demands across 200+ Indian
                  hubs to ensure you always get maximum value.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfdfc] hover:border-[#13b59b]/50 transition-all duration-300 hover:shadow-md flex items-start gap-4">
              <img src="https://s3ng.cashify.in/estore/acef68f939a84a8884640ae56f70867f.png" alt="Instant Payment" className="w-14 h-14 object-contain shrink-0"/>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">Instant Direct Payout</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Receive 100% of the funds credited directly into your Google Pay, PhonePe, Paytm,
                  or bank account before the device is handed over.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfdfc] hover:border-[#13b59b]/50 transition-all duration-300 hover:shadow-md flex items-start gap-4">
              <img src="https://s3ng.cashify.in/estore/7989ad6b9431414481a1e9dcda098d45.png" alt="Free Doorstep Pickup" className="w-14 h-14 object-contain shrink-0"/>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">Free Doorstep Pickup</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Zero delivery or convenience fee across 1500+ Indian cities and towns. Pick the exact
                  slot that fits your schedule.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfdfc] hover:border-[#13b59b]/50 transition-all duration-300 hover:shadow-md flex items-start gap-4">
              <img src="https://s3ng.cashify.in/estore/3c0a0e2e0f4945c09e941a10bcf66e83.png" alt="Factory Grade Data Wipe" className="w-14 h-14 object-contain shrink-0"/>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">Factory-Grade Data Wipe</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Military-grade NIST 800-88 cryptographic sanitization ensures your personal files,
                  accounts, and photos are permanently wiped.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfdfc] hover:border-[#13b59b]/50 transition-all duration-300 hover:shadow-md flex items-start gap-4">
              <img src="https://s3ng.cashify.in/estore/09bf461127cd48acb409f207e1664438.png" alt="Valid Purchase Invoice" className="w-14 h-14 object-contain shrink-0"/>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">Valid Purchase Invoice</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  A legally binding digital Bill of Sale and GST invoice is emailed to you instantly,
                  confirming the lawful transfer of ownership.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfdfc] hover:border-[#13b59b]/50 transition-all duration-300 hover:shadow-md flex items-start gap-4">
              <img src="https://s3ng.cashify.in/estore/4413e4f7e0e448f88a73bd4e6047e93d.png" alt="100% Hassle-Free" className="w-14 h-14 object-contain shrink-0"/>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900">100% Hassle-Free</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  No endless negotiations, zero scam messages, and no welcoming unverified strangers
                  into your personal residence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Real Verified Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500"/>
                4.8 / 5 Rating from 60+ Lakh Customers
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                What Customers Say About Selling to Sellbar
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-[#13b59b]"/>
              <span className="text-xs font-bold text-gray-700">100% Verified Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-gray-100 bg-[#f8fafc] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <span className="text-[10px] text-gray-400 font-medium">2 days ago</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                &quot;Sold my old iPhone 13. The valuation on Sellbar was ₹4,000 higher than local
                vendors. Executive arrived right on time, inspected in 5 minutes, and GPayed the amount
                immediately.&quot;
              </p>
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">Rohit Verma</span>
                <span className="text-gray-500">Mumbai • iPhone 13</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-[#f8fafc] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <span className="text-[10px] text-gray-400 font-medium">1 week ago</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                &quot;The data destruction guarantee gave me total peace of mind. Great experience
                selling my MacBook Air M1. No bargaining or deductions from the online quote.&quot;
              </p>
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">Sneha Kulkarni</span>
                <span className="text-gray-500">Bengaluru • MacBook Air</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-[#f8fafc] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <span className="text-[10px] text-gray-400 font-medium">3 days ago</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                &quot;Doorstep pickup was so smooth! Executive was professional, gave a verified
                invoice, and money reached my bank before he left the door. Highly recommend
                Sellbar.&quot;
              </p>
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">Ankit Saxena</span>
                <span className="text-gray-500">Delhi NCR • Galaxy S22</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Category FAQs Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Frequently Asked Questions About Selling Old {categoryName}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Everything you need to know about pricing, doorstep audit, and instant payout
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (<div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200">
                  <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-gray-50 text-xs sm:text-sm font-bold text-gray-900 transition-colors">
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[#13b59b]' : ''}`}/>
                  </button>
                  {openFaq === idx && (<div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed bg-white border-t border-gray-100">
                      {faq.a}
                    </div>)}
                </div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: SEO & Circular Economy Editorial Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900">{seoGuideTitle}</h3>
          <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
            {seoGuideContent.map((paragraph, idx) => (<p key={idx}>{paragraph}</p>))}
          </div>
        </div>
      </section>
    </div>);
}
