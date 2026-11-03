'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShieldCheck,
  Star,
  ArrowRight,
  Filter,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Truck,
  Sparkles,
  Zap,
  ShoppingBag,
} from 'lucide-react';
import { fetchProducts, fetchCategories } from '@/lib/productApi';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { addToLocalCart } from '@/lib/cart';

const PRICES = [
  { val: 0, label: 'Any Price' },
  { val: 15000, label: 'Under ₹15,000' },
  { val: 30000, label: 'Under ₹30,000' },
  { val: 50000, label: 'Under ₹50,000' },
  { val: 100000, label: 'Under ₹1,00,000' },
];

const SORTS = [
  { val: 'popular', label: 'Most Popular' },
  { val: 'low', label: 'Price: Low to High' },
  { val: 'high', label: 'Price: High to Low' },
  { val: 'rating', label: 'Customer Rating' },
];

const GRADES = [
  {
    grade: 'Flawless',
    badge: 'Grade A+ • Like New',
    desc: 'Zero scratches or dents. Battery health 90%+. Handled like a brand new flagship.',
  },
  {
    grade: 'Superb',
    badge: 'Grade A • Best Value',
    desc: 'Minor hairline marks barely noticeable at arm’s length. Display 100% spotless.',
  },
  {
    grade: 'Good',
    badge: 'Grade B • Pocket Saver',
    desc: 'Light cosmetic scuffs on edges. Hardware tested 100% functional with full warranty.',
  },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function BuyRefurbishedPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState('popular');
  const [search, setSearch] = useState('');
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const [pData, cData] = await Promise.all([
          fetchProducts({ limit: 100 }),
          fetchCategories(),
        ]);

        const list = (pData.products || []).map((p) => {
          const price = Number(p.price) || 0;
          const mrp = Number(p.compareAtPrice) || Math.round(price * 1.4);
          return {
            id: p._id,
            slug: p.slug || p._id,
            name: p.name || 'Refurbished Device',
            category: typeof p.category === 'object' ? p.category?.name || 'Gadgets' : p.category || 'Gadgets',
            categorySlug: typeof p.category === 'object' ? p.category?.slug : '',
            brand: typeof p.brand === 'object' ? p.brand?.name || '' : p.brand || '',
            condition: p.condition || 'Flawless',
            price,
            mrp,
            rating: Number(p.rating || p.averageRating) || 4.8,
            reviews: Number(p.reviewsCount || p.totalReviews) || 124,
            stock: Math.max(0, Number(p.stock) || 10),
            image: p.images?.[0]?.url || getCloudinaryUrl('/products/iphone-14.webp'),
          };
        });

        if (!cancelled) {
          setProducts(list);
          setCategories(cData || []);
        }
      } catch (err) {
        console.warn('Products fallback loaded:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter based on category from URL if present
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wanted = new URLSearchParams(window.location.search).get('category');
    if (!wanted || !categories.length) return;
    const match = categories.find(
      (c) => c.slug === wanted || c.name.toLowerCase() === wanted.toLowerCase()
    );
    if (match) setCategory(match.name);
  }, [categories]);

  const shown = useMemo(() => {
    let list = [...products];

    if (category !== 'All') {
      const target = category.toLowerCase().trim();
      list = list.filter((p) => {
        const catName = p.category.toLowerCase();
        const catSlug = (p.categorySlug || '').toLowerCase();
        return (
          catName === target ||
          catSlug === target ||
          (target.includes('laptop') && (catSlug.includes('laptop') || catName.includes('laptop'))) ||
          (target.includes('phone') && (catSlug.includes('phone') || catName.includes('phone'))) ||
          (target.includes('tablet') && (catSlug.includes('tablet') || catName.includes('tablet'))) ||
          (target.includes('watch') && (catSlug.includes('watch') || catName.includes('watch'))) ||
          (target.includes('camera') && (catSlug.includes('camera') || catName.includes('camera'))) ||
          (target.includes('console') && (catSlug.includes('console') || catName.includes('console')))
        );
      });
    }

    if (maxPrice > 0) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'high') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, category, maxPrice, search, sort]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToLocalCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
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
          <span className="text-[#13b59b] font-bold">Buy Refurbished Devices</span>
        </div>
      </div>

      {/* 2. HERO BANNER */}
      <section className="bg-gradient-to-r from-[#0f2e29] via-[#13443d] to-[#12554b] py-10 sm:py-14 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/20 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> 32-Point Quality Certified
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Refurbished Tech That Feels Brand New, <br />
              <span className="text-[#2bbb9e]">Up to 70% Off</span>
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              Buy certified iPhones, MacBooks, ThinkPads, and smartwatches. Every device is backed by up to 12 months comprehensive warranty and 7-day hassle-free replacement.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-bold text-gray-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Up to 12 Months Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> 7-Day Easy Returns
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Free Express Doorstep Shipping
              </span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#2bbb9e]/10 rounded-full blur-3xl pointer-events-none translate-x-12 translate-y-12" />
      </section>

      {/* 3. CATALOG & FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              category === 'All'
                ? 'bg-[#13b59b] text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#13b59b]/50'
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((c) => (
            <button
              key={c._id || c.name}
              onClick={() => setCategory(c.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                category.toLowerCase() === c.name.toLowerCase()
                  ? 'bg-[#13b59b] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#13b59b]/50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search, Price & Sort Controls Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* Search Input */}
          <div className="flex-1 min-w-[240px] max-w-md relative flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#13b59b] focus-within:bg-white transition">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product name, brand or model..."
              className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Controls: Price & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 rounded-xl px-3 py-1.5 text-xs">
              <span className="font-bold text-gray-500">Price:</span>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                {PRICES.map((p) => (
                  <option key={p.val} value={p.val}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-gray-200 rounded-xl px-3 py-1.5 text-xs">
              <span className="font-bold text-gray-500">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.val} value={s.val}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs animate-pulse space-y-3">
                  <div className="w-full h-44 bg-gray-100 rounded-xl" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-5 bg-gray-100 rounded w-1/2" />
                  <div className="h-8 bg-gray-100 rounded-xl w-full" />
                </div>
              ))}
            </div>
          ) : shown.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
              <div className="text-4xl">📱</div>
              <h3 className="text-base font-bold text-gray-900">No refurbished items found</h3>
              <p className="text-xs text-gray-500">
                Try selecting a different category or clearing search filters.
              </p>
              <button
                onClick={() => {
                  setCategory('All');
                  setMaxPrice(0);
                  setSearch('');
                }}
                className="px-4 py-2 bg-[#13b59b] text-white text-xs font-bold rounded-xl hover:bg-[#0fa088] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {shown.map((item) => {
                const discount =
                  item.mrp > item.price
                    ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
                    : 0;

                return (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs hover:border-[#13b59b]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Badge Row */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#edf7f5] text-[#13b59b] text-[11px] font-extrabold">
                          {item.condition}
                        </span>
                        {discount > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-extrabold">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Image Preview */}
                      <div className="w-full h-44 sm:h-48 bg-[#f8fafc] rounded-xl flex items-center justify-center p-3 mb-3 group-hover:bg-white transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      {/* Title & Brand */}
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                        {item.brand}
                      </div>
                      <h3 className="text-sm font-black text-gray-900 line-clamp-2 group-hover:text-[#13b59b] transition-colors leading-snug mt-0.5">
                        {item.name}
                      </h3>

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-extrabold text-[11px]">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">({item.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-base font-black text-gray-900 leading-none">
                          {inr(item.price)}
                        </div>
                        {item.mrp > item.price && (
                          <div className="text-[11px] text-gray-400 line-through mt-0.5">
                            {inr(item.mrp)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(item, e)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                          addedId === item.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#13b59b] hover:bg-[#0fa088] text-white shadow-xs'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {addedId === item.id ? 'Added!' : 'Buy'}
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. CONDITION GRADING GUIDE */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Sellbar Refurbished Quality Grades
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Clear cosmetic standards so you always know exactly what arrives at your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GRADES.map((g) => (
              <div
                key={g.grade}
                className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-gray-900">{g.grade}</h3>
                  <span className="text-[11px] font-bold text-[#13b59b] bg-[#13b59b]/10 px-2.5 py-0.5 rounded-full">
                    {g.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{g.desc}</p>
                <div className="pt-2 border-t border-gray-200/60 text-xs text-gray-700 font-semibold space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b]" /> 32-Point Quality Checklist Passed
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b]" /> 12 Months Warranty Protection
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
