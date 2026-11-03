'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Smartphone, 
  Search, 
  Filter, 
  ShoppingCart, 
  CheckCircle2, 
  ChevronRight,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { fetchProducts } from '@/lib/productApi';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { addToLocalCart } from '@/lib/cart';

const BRANDS = ['All', 'Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo', 'Realme', 'Google'];

const SORTS = [
  { val: 'popular', label: 'Most Popular' },
  { val: 'low', label: 'Price: Low to High' },
  { val: 'high', label: 'Price: High to Low' },
  { val: 'rating', label: 'Customer Rating' },
];

const PRICE_TIERS = [
  { val: 0, label: 'Any Price' },
  { val: 15000, label: 'Under ₹15,000' },
  { val: 30000, label: 'Under ₹30,000' },
  { val: 50000, label: 'Under ₹50,000' },
  { val: 80000, label: 'Under ₹80,000' },
];

export default function BuyRefurbishedMobilePhonesPage() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    async function loadPhones() {
      try {
        setLoading(true);
        const data = await fetchProducts({ category: 'mobile-phones', limit: 60 });
        setPhones(data.products || []);
      } catch (err) {
        console.warn('Notice: Mobile phones loaded with fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPhones();
  }, []);

  const filteredPhones = useMemo(() => {
    let list = [...phones];

    if (selectedBrand !== 'All') {
      list = list.filter((p) => p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    if (maxPrice > 0) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (selectedGrade !== 'All') {
      list = list.filter((p) => (p.condition || 'Flawless').toLowerCase() === selectedGrade.toLowerCase());
    }

    if (sort === 'low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [phones, selectedBrand, search, maxPrice, selectedGrade, sort]);

  const handleAddToCart = (product) => {
    addToLocalCart(product, 1);
    setAddedItem(product.name);
    setTimeout(() => setAddedItem(null), 3000);
  };

  const handleResetFilters = () => {
    setSelectedBrand('All');
    setSearch('');
    setSort('popular');
    setMaxPrice(0);
    setSelectedGrade('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-[#13b59b] transition">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-bold">Refurbished Mobile Phones</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-xl relative z-10">
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-teal-300 border border-white/20">
              32-Point Quality Certified
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Certified Refurbished Smartphones
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Save up to 60% on flagship iPhones, Samsung Galaxy, and OnePlus phones. Every phone includes original accessories, 90%+ battery health, and a 12-month doorstep warranty.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-1 relative z-10 w-full sm:w-auto">
            <div className="text-3xl font-black text-[#2dd4bf]">&gt; 90%</div>
            <div className="text-xs text-slate-300">Audited Battery Health</div>
            <div className="text-lg font-bold text-white pt-2">12 Months</div>
            <div className="text-[11px] text-teal-300 font-semibold">Free Doorstep Warranty</div>
          </div>
        </div>

        {/* Toast Alert */}
        {addedItem && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#13b59b]" />
              <span>&quot;{addedItem}&quot; added to your cart successfully!</span>
            </div>
            <Link href="/cart" className="underline text-[#13b59b]">View Cart</Link>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models e.g. iPhone 13, Galaxy S22..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort & Grade Filter */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <SlidersHorizontal size={14} className="text-[#13b59b]" />
                <span>Sort By:</span>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#13b59b]"
              >
                {SORTS.map((s) => (
                  <option key={s.val} value={s.val}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Brand Pills */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Brand:</span>
              {BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedBrand === b
                      ? 'bg-[#13b59b] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Active filters count & Reset */}
            {(selectedBrand !== 'All' || maxPrice > 0 || search || selectedGrade !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X size={13} /> Reset Filters
              </button>
            )}
          </div>

          {/* Price Range Pills */}
          <div className="pt-2 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Budget:</span>
            {PRICE_TIERS.map((tier) => (
              <button
                key={tier.val}
                onClick={() => setMaxPrice(tier.val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  maxPrice === tier.val
                    ? 'bg-teal-50 border border-[#13b59b] text-[#13b59b]'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Showing <strong>{filteredPhones.length}</strong> certified smartphones</span>
          <span>Fast Doorstep Delivery: <strong>24-48 Hours</strong></span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs animate-pulse space-y-3">
                <div className="h-4 w-20 bg-slate-100 rounded" />
                <div className="w-full h-44 bg-slate-100 rounded-xl" />
                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                <div className="h-4 w-1/2 bg-slate-100 rounded" />
                <div className="h-8 w-full bg-slate-100 rounded-xl" />
              </div>
            ))
          ) : filteredPhones.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
              <Smartphone size={36} className="mx-auto text-slate-300 mb-2" />
              <div className="font-bold text-slate-800 text-sm">No smartphones match your filters</div>
              <p className="text-xs text-slate-400 mt-1">Try resetting the budget or brand selection to see more devices.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-[#13b59b] text-white rounded-xl text-xs font-bold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredPhones.map((item) => {
              const imageUrl = item.images?.[0]?.url || item.image || getCloudinaryUrl('/cashify/guide-iphone13-mini.webp');
              const compareAtPrice = item.compareAtPrice || Math.round(item.price * 1.35);
              const percentOff = compareAtPrice > item.price
                ? Math.round(((compareAtPrice - item.price) / compareAtPrice) * 100)
                : null;

              return (
                <div
                  key={item._id || item.slug}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#13b59b] border border-emerald-100">
                        {item.condition || 'Flawless'}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating || 4.8}
                      </div>
                    </div>

                    <div className="w-full h-44 bg-slate-50/50 rounded-xl mb-3 flex items-center justify-center p-3 overflow-hidden relative">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                      />
                      {percentOff && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white rounded-md text-[10px] font-black">
                          {percentOff}% OFF
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.brand || 'Certified'}
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 min-h-[36px] hover:text-[#13b59b] transition">
                      <Link href={`/product/${item.slug || item._id}`}>
                        {item.name}
                      </Link>
                    </h3>

                    <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#13b59b]" /> 12 Months Warranty
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </span>
                      {compareAtPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{compareAtPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 py-2 px-3 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <Link
                      href={`/product/${item.slug || item._id}`}
                      className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:border-slate-300 transition"
                      title="View Details"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
