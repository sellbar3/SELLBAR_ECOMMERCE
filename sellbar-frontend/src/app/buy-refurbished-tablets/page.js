'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Tablet,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { addToLocalCart } from '@/lib/cart';

const TABLETS = [
  {
    id: 'ipad-pro-11-m2',
    name: 'Apple iPad Pro 11" (4th Gen, M2 Chip, WiFi 128GB, Space Grey)',
    brand: 'Apple',
    condition: 'Flawless',
    price: 58999,
    mrp: 81900,
    specs: 'Apple M2 8-Core CPU, 120Hz ProMotion Liquid Retina, Apple Pencil hover support',
    screenTest: '100% Zero Dead Pixels, True Tone Active',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ipad-air-5-m1',
    name: 'Apple iPad Air (5th Gen, M1 Chip, WiFi 64GB, Blue)',
    brand: 'Apple',
    condition: 'Flawless',
    price: 41999,
    mrp: 59900,
    specs: 'Apple M1 Chip with Neural Engine, 10.9" Liquid Retina display, Touch ID in top button',
    screenTest: 'Certified Flawless Panel & 96% Battery Health',
    rating: 4.9,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'galaxy-tab-s9-fe',
    name: 'Samsung Galaxy Tab S9 FE (10.9", 6GB/128GB, WiFi, Gray with S-Pen)',
    brand: 'Samsung',
    condition: 'Superb',
    price: 27999,
    mrp: 44999,
    specs: 'IP68 water/dust resistant, Bundled Low-Latency S-Pen, 90Hz display, 8,000mAh battery',
    screenTest: 'Includes Original S-Pen & High-Speed Charger',
    rating: 4.8,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ipad-10th-gen',
    name: 'Apple iPad (10th Gen, 10.9" Liquid Retina, WiFi 64GB, Silver)',
    brand: 'Apple',
    condition: 'Superb',
    price: 29999,
    mrp: 39900,
    specs: 'A14 Bionic chip, All-screen design with USB-C, Landscape 12MP Center Stage camera',
    screenTest: 'Full Multi-Touch & Digitizer Certified',
    rating: 4.8,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'galaxy-tab-s8-ultra',
    name: 'Samsung Galaxy Tab S8 Ultra (14.6" Super AMOLED, 12GB/256GB, 5G)',
    brand: 'Samsung',
    condition: 'Flawless',
    price: 67999,
    mrp: 122999,
    specs: 'Massive 14.6" 120Hz Super AMOLED, Snapdragon 8 Gen 1, Quad AKG Dolby Atmos speakers',
    screenTest: 'Gorgeous AMOLED Panel with zero burn-in',
    rating: 4.9,
    reviews: 54,
    image: 'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'lenovo-tab-p12',
    name: 'Lenovo Tab P12 (12.7" 3K Display, 8GB/128GB, Octa-Core with Stylus)',
    brand: 'Lenovo',
    condition: 'Good',
    price: 18999,
    mrp: 34999,
    specs: '12.7" 3K (2944x1840) LTPS display, Quad JBL speakers, 10200mAh battery, Tab Pen Plus',
    screenTest: 'Tested 100% Functioning Stylus & Speakers',
    rating: 4.7,
    reviews: 69,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80',
  },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function BuyTabletsPage() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [addedId, setAddedId] = useState(null);

  const brands = ['All', 'Apple', 'Samsung', 'Lenovo'];
  const filtered = selectedBrand === 'All' ? TABLETS : TABLETS.filter((t) => t.brand === selectedBrand);

  const handleAddToCart = (tablet) => {
    addToLocalCart({
      id: tablet.id,
      name: tablet.name,
      price: tablet.price,
      image: tablet.image,
      condition: tablet.condition,
    });
    setAddedId(tablet.id);
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
            <Link href="/buy-refurbished" className="hover:text-[#13b59b] transition">Refurbished</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Tablets &amp; iPads</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
              <Tablet size={14} /> Certified Refurbished iPads &amp; Android Tablets
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Work, Create &amp; Study. <br />
              <span className="text-[#13b59b]">Uncompromised Tablets at Half the Price.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Every iPad and Android tablet passes our stringent 32-step hardware assessment: stylus pressure latency, 10-point multi-touch digitizer test, quad speaker fidelity, and battery health retention verification.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <CheckCircle2 size={16} className="text-[#13b59b]" /> 12 Months Replacement Warranty
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <Sparkles size={16} className="text-amber-400" /> Stylus &amp; Touch Digitizer Certified
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <Cpu size={16} className="text-cyan-400" /> Free OEM High-Speed Charger
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                  selectedBrand === b
                    ? 'bg-[#13b59b] text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> certified tablets
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tablet) => {
            const savings = tablet.mrp - tablet.price;
            const discountPct = Math.round((savings / tablet.mrp) * 100);

            return (
              <div
                key={tablet.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={tablet.image}
                    alt={tablet.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {tablet.condition}
                    </span>
                    <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {discountPct}% OFF
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    {tablet.rating} ({tablet.reviews})
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{tablet.brand}</span>
                    <h3 className="font-bold text-base text-slate-900 line-clamp-2 mt-0.5 group-hover:text-[#13b59b] transition">
                      {tablet.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {tablet.specs}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100">
                      <Sparkles size={14} className="text-indigo-600 shrink-0" />
                      <span>{tablet.screenTest}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="text-2xl font-black text-slate-900">{inr(tablet.price)}</div>
                        <div className="text-xs text-slate-400 line-through">MRP {inr(tablet.mrp)}</div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Save {inr(savings)}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(tablet)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                        addedId === tablet.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#13b59b] hover:bg-[#0fa088] text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {addedId === tablet.id ? (
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
