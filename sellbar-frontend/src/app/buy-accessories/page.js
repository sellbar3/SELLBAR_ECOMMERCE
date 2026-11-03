'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  Zap,
  Cable,
  Headphones,
} from 'lucide-react';
import { addToLocalCart } from '@/lib/cart';

const ACCESSORIES = [
  {
    id: 'apple-20w-charger',
    name: 'Apple 20W USB-C Fast Power Adapter (Original OEM)',
    category: 'Chargers',
    price: 1499,
    mrp: 1900,
    specs: 'Supports Fast Charging for iPhone 8 or later, iPad Pro, and iPad Air',
    warranty: '6 Months Replacement Warranty',
    rating: 4.9,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'samsung-25w-pd-adapter',
    name: 'Samsung 25W Type-C Super Fast Charging Wall Charger',
    category: 'Chargers',
    price: 999,
    mrp: 1499,
    specs: 'Power Delivery 3.0 PPS fast charging for Galaxy S24, S23, A55, and Note series',
    warranty: '6 Months Replacement Warranty',
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'braided-c-to-c-cable',
    name: 'Heavy Duty 60W Braided USB-C to USB-C Cable (1.5M)',
    category: 'Cables',
    price: 399,
    mrp: 899,
    specs: 'Kevlar reinforced nylon braiding, 480Mbps data sync, 20,000+ bend lifespan',
    warranty: '12 Months Warranty',
    rating: 4.8,
    reviews: 440,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'magsafe-clear-case-iphone-15',
    name: 'Shockproof MagSafe Magnetic Clear Case for iPhone 15 / 15 Pro',
    category: 'Cases',
    price: 599,
    mrp: 1299,
    specs: 'Strong N52 neodymium magnets, anti-yellowing German Bayer TPU, raised camera lip',
    warranty: 'Anti-Yellow Guarantee',
    rating: 4.7,
    reviews: 185,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'laptop-protective-sleeve',
    name: 'Waterproof Felt Laptop Sleeve with Accessory Pouch (13"-15.6")',
    category: 'Cases',
    price: 799,
    mrp: 1699,
    specs: 'Plush velvet interior lining, spill-resistant polyester fabric, YKK zippers',
    warranty: '6 Months Warranty',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'oneplus-supervooc-80w',
    name: 'OnePlus SUPERVOOC 80W Fast Power Adapter + Red Cable Kit',
    category: 'Chargers',
    price: 1899,
    mrp: 2999,
    specs: 'Flash charge OnePlus 12/11/10 Pro to 100% in 30 minutes, 10-layer smart safety',
    warranty: '6 Months Replacement Warranty',
    rating: 4.9,
    reviews: 140,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
  },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function BuyAccessoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedId, setAddedId] = useState(null);

  const categories = ['All', 'Chargers', 'Cables', 'Cases'];
  const filtered = selectedCategory === 'All' ? ACCESSORIES : ACCESSORIES.filter((a) => a.category === selectedCategory);

  const handleAddToCart = (acc) => {
    addToLocalCart({
      id: acc.id,
      name: acc.name,
      price: acc.price,
      image: acc.image,
      condition: 'Brand New',
    });
    setAddedId(acc.id);
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
            <span className="text-slate-900 font-semibold">Genuine Accessories</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
              <Zap size={14} /> 100% Certified Genuine Accessories
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Fast Chargers &amp; Gear. <br />
              <span className="text-[#13b59b]">Built to Last. Protected by Warranty.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Don&apos;t risk expensive smartphones with fake charging adapters. Sellbar brings OEM authentic chargers, high-speed nylon braided cables, and military-grade drop cases tested for safety.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <CheckCircle2 size={16} className="text-[#13b59b]" /> 6 to 12 Months Warranty
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <ShieldCheck size={16} className="text-amber-400" /> Over-Voltage &amp; Heat Protection
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <Zap size={16} className="text-cyan-400" /> Same-Day Doorstep Dispatch
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-[#13b59b] text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> accessories
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((acc) => {
            const savings = acc.mrp - acc.price;
            const discountPct = Math.round((savings / acc.mrp) * 100);

            return (
              <div
                key={acc.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      Brand New
                    </span>
                    <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {discountPct}% OFF
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    {acc.rating} ({acc.reviews})
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{acc.category}</span>
                    <h3 className="font-bold text-base text-slate-900 line-clamp-2 mt-0.5 group-hover:text-[#13b59b] transition">
                      {acc.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {acc.specs}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span>{acc.warranty}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="text-2xl font-black text-slate-900">{inr(acc.price)}</div>
                        <div className="text-xs text-slate-400 line-through">MRP {inr(acc.mrp)}</div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Save {inr(savings)}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(acc)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                        addedId === acc.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#13b59b] hover:bg-[#0fa088] text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {addedId === acc.id ? (
                        <>
                          <CheckCircle2 size={16} /> Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
