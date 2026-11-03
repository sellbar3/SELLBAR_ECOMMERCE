'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Watch,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  BatteryCharging,
  Heart,
  Droplets,
} from 'lucide-react';
import { addToLocalCart } from '@/lib/cart';

const WATCHES = [
  {
    id: 'apple-watch-s9',
    name: 'Apple Watch Series 9 GPS (45mm, Midnight Aluminium)',
    brand: 'Apple',
    condition: 'Flawless',
    price: 31999,
    mrp: 44900,
    specs: 'S9 SiP with Double Tap gesture, 2000 nits Always-On display, ECG & Blood Oxygen',
    batteryHealth: '98% OEM Health',
    rating: 4.9,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 GPS + Cellular (49mm Titanium, Ocean Band)',
    brand: 'Apple',
    condition: 'Flawless',
    price: 64999,
    mrp: 89900,
    specs: 'Aerospace-grade titanium, 3000 nits display, 100m water resistance, dual-freq GPS',
    batteryHealth: '100% Like New',
    rating: 4.9,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'samsung-galaxy-watch6-classic',
    name: 'Samsung Galaxy Watch 6 Classic LTE (47mm, Rotating Bezel)',
    brand: 'Samsung',
    condition: 'Superb',
    price: 21499,
    mrp: 40999,
    specs: 'Physical rotating bezel, Sapphire crystal, BioActive sensor with Body Composition',
    batteryHealth: '95% Health',
    rating: 4.8,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'apple-watch-se-2',
    name: 'Apple Watch SE (2nd Gen, GPS 44mm, Starlight Aluminium)',
    brand: 'Apple',
    condition: 'Good',
    price: 18499,
    mrp: 29900,
    specs: 'Crash Detection, Heart rate notifications, Swimproof to 50 meters, Retina OLED',
    batteryHealth: '92% Health',
    rating: 4.7,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'google-pixel-watch-2',
    name: 'Google Pixel Watch 2 WiFi (Polished Silver / Bay Active Band)',
    brand: 'Google',
    condition: 'Flawless',
    price: 24999,
    mrp: 39900,
    specs: 'Fitbit multi-path heart rate, cEDA stress detection, Safety Check, 24-hr battery',
    batteryHealth: '97% Health',
    rating: 4.8,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'garmin-forerunner-265',
    name: 'Garmin Forerunner 265 GPS Running Smartwatch (Black/Aqua)',
    brand: 'Garmin',
    condition: 'Superb',
    price: 36999,
    mrp: 50490,
    specs: 'Bright AMOLED touchscreen, Training Readiness metrics, 13-day battery, multi-band GNSS',
    batteryHealth: '99% Health',
    rating: 4.9,
    reviews: 44,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
  },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function BuySmartWatchesPage() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [addedId, setAddedId] = useState(null);

  const brands = ['All', 'Apple', 'Samsung', 'Google', 'Garmin'];
  const filtered = selectedBrand === 'All' ? WATCHES : WATCHES.filter((w) => w.brand === selectedBrand);

  const handleAddToCart = (watch) => {
    addToLocalCart({
      id: watch.id,
      name: watch.name,
      price: watch.price,
      image: watch.image,
      condition: watch.condition,
    });
    setAddedId(watch.id);
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
            <span className="text-slate-900 font-semibold">Smart Watches</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
              <Watch size={14} /> Certified Pre-Owned Smartwatches
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Premium Smartwatches. <br />
              <span className="text-[#13b59b]">32-Point Diagnostics &amp; 12-Month Warranty.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Every Apple Watch, Galaxy Watch, and Garmin undergoes comprehensive display sensor testing, ECG and optical pulse validation, water-resistance seals verification, and battery capacity benchmarking (guaranteed 90%+ health).
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <BatteryCharging size={16} className="text-[#13b59b]" /> 90%+ Verified Battery Health
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <Heart size={16} className="text-[#DC2564]" /> Optical Sensor &amp; ECG Tested
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <Droplets size={16} className="text-cyan-400" /> Ultrasonic Cleaned &amp; Sanitized
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Brand Selector */}
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
            Showing <span className="text-slate-900 font-bold">{filtered.length}</span> certified smartwatches
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((watch) => {
            const savings = watch.mrp - watch.price;
            const discountPct = Math.round((savings / watch.mrp) * 100);

            return (
              <div
                key={watch.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {watch.condition}
                    </span>
                    <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                      {discountPct}% OFF
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1 shadow-sm">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    {watch.rating} ({watch.reviews})
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{watch.brand}</span>
                    <h3 className="font-bold text-base text-slate-900 line-clamp-2 mt-0.5 group-hover:text-[#13b59b] transition">
                      {watch.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {watch.specs}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                      <BatteryCharging size={14} className="text-emerald-600 shrink-0" />
                      <span>{watch.batteryHealth}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="text-2xl font-black text-slate-900">{inr(watch.price)}</div>
                        <div className="text-xs text-slate-400 line-through">MRP {inr(watch.mrp)}</div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">Save {inr(savings)}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(watch)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                        addedId === watch.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#13b59b] hover:bg-[#0fa088] text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {addedId === watch.id ? (
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

      {/* Assurance Section */}
      <section className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-black text-slate-900">Why Buy Smartwatches from Sellbar?</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every pre-owned wearable comes certified with complete warranty peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: '32-Point Diagnostics',
                desc: 'Digital crown, touch digitizer, speaker, microphone, optical sensors, and gyro tested.',
              },
              {
                title: '12 Months Warranty',
                desc: 'Free doorstep replacement or repair if hardware defects arise within 1 year.',
              },
              {
                title: '7-Day Return Policy',
                desc: 'No questions asked 100% money back refund if cosmetic condition does not match expectations.',
              },
              {
                title: 'Genuine OEM Charging Cable',
                desc: 'Includes original or MFi/OEM certified magnetic fast charging puck.',
              },
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 size={24} className="text-[#13b59b] mb-3" />
                <h4 className="font-bold text-sm text-slate-900">{f.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
