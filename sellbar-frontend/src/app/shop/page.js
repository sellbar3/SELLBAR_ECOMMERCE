'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ShoppingBag,
  Filter,
  Star,
  ShieldCheck,
  ChevronRight,
  Package,
  CheckCircle2,
  Zap,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
  ShoppingCart
} from 'lucide-react';
import { addToLocalCart } from '@/lib/cart';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'mobile-phones', label: 'Smartphones' },
  { id: 'laptop', label: 'Laptops' },
  { id: 'smart-watch', label: 'Smartwatches' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'dslr-cameras', label: 'Cameras' },
  { id: 'gaming-consoles', label: 'Consoles' },
];

const SORTS = [
  { val: 'popular', label: 'Most Popular' },
  { val: 'low', label: 'Price: Low to High' },
  { val: 'high', label: 'Price: High to Low' },
  { val: 'rating', label: 'Highest Rated' },
];

const PRICE_TIERS = [
  { val: 0, label: 'Any Price' },
  { val: 15000, label: 'Under ₹15,000' },
  { val: 30000, label: 'Under ₹30,000' },
  { val: 50000, label: 'Under ₹50,000' },
  { val: 100000, label: 'Under ₹1,00,000' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const filterQuery = searchParams.get('filter') || '';
  const brandQuery = searchParams.get('brand') || '';
  const discountQuery = searchParams.get('discount') || '';

  const [selectedCat, setSelectedCat] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        let url = '/api/public/products?limit=48';
        if (selectedCat !== 'all') {
          url += `&category=${selectedCat}`;
        }
        const res = await fetch(url);
        const json = await res.json();
        if (json.success && json.data) {
          setProducts(json.data);
        }
      } catch (err) {
        console.error('Failed to load shop products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [selectedCat]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter query from navigation (e.g. ?filter=best-sellers)
    if (filterQuery === 'best-sellers') {
      list = list.filter((p) => (p.rating || 0) >= 4.7);
    } else if (filterQuery === 'new-arrivals') {
      list.reverse();
    } else if (filterQuery === 'featured-deals' || discountQuery === 'min-40') {
      list = list.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
    }

    // Brand query
    if (brandQuery) {
      list = list.filter((p) => p.brand && p.brand.toLowerCase() === brandQuery.toLowerCase());
    }

    // Live Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Max Price
    if (maxPrice > 0) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    // Sort
    if (sort === 'low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [products, filterQuery, brandQuery, discountQuery, search, maxPrice, sort]);

  const handleAdd = (p) => {
    addToLocalCart({
      id: p._id || p.id,
      name: p.name,
      price: p.price,
      image: p.images?.[0]?.url || '/products/iphone-14.webp',
      conditionGrade: p.condition || 'Flawless',
    });
    setAddedId(p._id || p.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Shop Certified Gadgets</span>
            {filterQuery && (
              <>
                <ChevronRight size={14} />
                <span className="text-[#13b59b] font-bold capitalize">{filterQuery.replace('-', ' ')}</span>
              </>
            )}
            {brandQuery && (
              <>
                <ChevronRight size={14} />
                <span className="text-[#13b59b] font-bold capitalize">{brandQuery}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <ShoppingBag size={14} /> Official Store Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Shop Certified Pre-Owned Electronics
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore India&apos;s verified inventory of refurbished smartphones, MacBooks, tablets, and OEM accessories backed by 12-month replacement warranty and 7-day refund guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Category Pills & Count */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full lg:w-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedCat === c.id
                    ? 'bg-[#13b59b] text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-slate-500">
            Showing <span className="text-slate-900">{filteredProducts.length}</span> verified devices
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, brand or feature..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <SlidersHorizontal size={14} className="text-[#13b59b]" />
              <span>Sort:</span>
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

        {/* Budget Filter Bar */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Budget:</span>
          {PRICE_TIERS.map((tier) => (
            <button
              key={tier.val}
              onClick={() => setMaxPrice(tier.val)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                maxPrice === tier.val
                  ? 'bg-teal-50 border border-[#13b59b] text-[#13b59b] font-bold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tier.label}
            </button>
          ))}
          {(maxPrice > 0 || search) && (
            <button
              onClick={() => {
                setMaxPrice(0);
                setSearch('');
              }}
              className="text-xs font-bold text-rose-500 hover:underline ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 animate-pulse space-y-4">
                <div className="aspect-square bg-slate-100 rounded-2xl" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-6 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const img = p.images?.[0]?.url || '/products/iphone-14.webp';
              const pId = p._id || p.id;
              const isAdded = addedId === pId;

              return (
                <div
                  key={pId}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Badge row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#13b59b] border border-emerald-100">
                        {p.condition || 'Flawless'}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 text-xs font-bold border border-amber-200/50">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>{p.rating || 4.8}</span>
                      </div>
                    </div>

                    {/* Image */}
                    <Link href={`/product/${p.slug || pId}`}>
                      <div className="relative aspect-square w-full bg-slate-50/50 rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-teal-50/30 transition">
                        <img
                          src={img}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Title */}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {p.brand || 'Certified'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#13b59b] transition line-clamp-2 mt-0.5 min-h-[40px]">
                      <Link href={`/product/${p.slug || pId}`}>
                        {p.name}
                      </Link>
                    </h3>

                    {/* Warranty */}
                    <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                      <ShieldCheck size={13} className="text-[#13b59b]" /> 12 Months Warranty
                    </p>

                    {/* Price */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-black text-slate-900">
                        ₹{p.price?.toLocaleString('en-IN')}
                      </span>
                      {p.compareAtPrice && p.compareAtPrice > p.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{p.compareAtPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleAdd(p)}
                      disabled={isAdded}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#13b59b] hover:bg-[#0fa088] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 size={15} /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={15} /> Add to Cart
                        </>
                      )}
                    </button>
                    <Link
                      href={`/product/${p.slug || pId}`}
                      className="p-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl transition"
                      title="View Details"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <Package size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-900">No electronics found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any certified devices matching your active filters. Try adjusting your search query or price tier.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 py-20 text-center font-bold text-slate-400">Loading Shop Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
