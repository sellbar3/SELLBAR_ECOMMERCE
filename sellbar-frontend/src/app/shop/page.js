'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

export default function ShopPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        let url = '/api/public/products?limit=24';
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
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <ShoppingBag size={14} /> Official Store Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Shop Certified Pre-Owned Electronics.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore India&apos;s verified inventory of refurbished smartphones, MacBooks, tablets, and OEM accessories backed by our 12-month replacement warranty and 7-day refund guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Pills & Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
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
            Showing <span className="text-slate-900">{products.length}</span> verified devices
          </p>
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
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => {
              const img = p.images?.[0]?.url || '/products/iphone-14.webp';
              const pId = p._id || p.id;
              const isAdded = addedId === pId;

              return (
                <div
                  key={pId}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-square bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {p.condition || 'Flawless'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <Link
                        href={`/product/${p.slug || pId}`}
                        className="font-bold text-sm text-slate-900 group-hover:text-[#13b59b] transition line-clamp-2 mt-0.5"
                      >
                        {p.name}
                      </Link>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xl font-black text-slate-900">
                          ₹{Number(p.price || 0).toLocaleString('en-IN')}
                        </span>
                        {p.compareAtPrice > p.price && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{Number(p.compareAtPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleAdd(p)}
                          className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#13b59b] hover:bg-[#0fa088] text-white shadow-sm'
                          }`}
                        >
                          {isAdded ? 'Added ✓' : 'Add to Cart'}
                        </button>
                        <Link
                          href={`/product/${p.slug || pId}`}
                          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs text-center transition"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Package size={44} className="text-slate-300 mx-auto" />
            <h3 className="font-bold text-lg text-slate-900">No Products in This Category</h3>
            <p className="text-xs text-slate-500">Try selecting another category or check back later.</p>
          </div>
        )}
      </section>
    </div>
  );
}
