'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  ChevronRight,
  Package,
  Smartphone,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { MOBILE_MODELS } from '@/lib/sellMobileData';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const qParam = searchParams.get('q') || searchParams.get('search') || '';

  const [query, setQuery] = useState(qParam);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (qParam) {
      setQuery(qParam);
      searchStore(qParam);
    }
  }, [qParam]);

  const searchStore = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/public/products?search=${encodeURIComponent(searchTerm)}&limit=16`);
      const json = await res.json();
      if (json.success && json.data) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error('Search fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchStore(query);
  };

  // Filter sell models matching the search query
  const matchingSellModels = query.trim()
    ? MOBILE_MODELS.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.brand.toLowerCase().includes(query.toLowerCase()) ||
          m.slug.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Search Store</span>
          </nav>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, phones to sell, or accessories..."
              className="w-full bg-white text-slate-900 text-sm sm:text-base font-semibold rounded-2xl pl-12 pr-28 py-3.5 shadow-md border border-slate-200 focus:outline-none focus:border-[#13b59b]"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs sm:text-sm font-bold shadow transition cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        {/* Sell Old Device Match Highlights */}
        {matchingSellModels.length > 0 && (
          <div className="mb-12 p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-[#13b59b] uppercase tracking-wider block">
                  Looking to Sell?
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Trade-In Your Used Device for Instant Cash
                </h3>
              </div>
              <Link
                href="/sell-old-mobile-phone"
                className="text-xs font-bold text-[#13b59b] hover:underline"
              >
                All Models →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {matchingSellModels.map((m) => (
                <Link
                  key={m.id}
                  href={`/sell-old-mobile-phone/${m.brandSlug}/${m.slug}`}
                  className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getProductImageUrl(m, 'mobile')}
                      alt={m.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getCategoryFallbackImage('mobile');
                      }}
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#13b59b] line-clamp-1">
                        {m.name}
                      </h4>
                      <span className="text-xs font-black text-[#13b59b]">
                        Up to ₹{m.baseResalePrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* E-Commerce Products Search Results */}
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-6">
            {query.trim() ? `Products Matching "${query}"` : 'Popular Products'}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200 animate-pulse space-y-4">
                  <div className="aspect-square bg-slate-100 rounded-2xl" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => {
                const img = getProductImageUrl(p, p.category);
                return (
                  <div
                    key={p._id || p.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
                  >
                    <div className="aspect-square bg-slate-50 rounded-2xl p-4 flex items-center justify-center mb-4 overflow-hidden">
                      <img
                        src={img}
                        alt={p.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getCategoryFallbackImage(p.category);
                        }}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <Link
                        href={`/product/${p.slug || p._id}`}
                        className="font-bold text-sm text-slate-900 hover:text-[#13b59b] transition line-clamp-2 mt-0.5"
                      >
                        {p.name}
                      </Link>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-lg font-black text-slate-900">
                        ₹{Number(p.price || 0).toLocaleString('en-IN')}
                      </span>
                      <Link
                        href={`/product/${p.slug || p._id}`}
                        className="px-3 py-1.5 bg-[#13b59b] text-white rounded-xl text-xs font-bold shadow hover:bg-[#0fa088] transition"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <Package size={44} className="text-slate-300 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900">No Products Found</h3>
              <p className="text-xs text-slate-500">Try a different keyword or explore our categories.</p>
              <Link
                href="/shop"
                className="inline-block py-2.5 px-6 bg-[#13b59b] text-white rounded-xl text-xs font-bold shadow"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-sm">Loading Search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
