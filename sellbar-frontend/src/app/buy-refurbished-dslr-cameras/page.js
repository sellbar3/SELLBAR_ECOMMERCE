'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Camera,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { addToLocalCart } from '@/lib/cart';

const CAMERAS = [
  {
    id: 'sony-a7iii',
    name: 'Sony Alpha A7 III Full-Frame Mirrorless (Body Only)',
    brand: 'Sony',
    condition: 'Flawless',
    price: 94999,
    mrp: 149990,
    specs: '24.2MP Exmor R CMOS, 4K HDR, 5-Axis In-Body Stabilization',
    shutterCount: '4,200 (Rated for 200k)',
    rating: 4.9,
    reviews: 86,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'canon-r6',
    name: 'Canon EOS R6 Mark II Mirrorless Camera Kit',
    brand: 'Canon',
    condition: 'Flawless',
    price: 154999,
    mrp: 215995,
    specs: '24.2MP Full Frame, 40fps Electronic Shutter, 6K RAW',
    shutterCount: '2,100 (Like New)',
    rating: 4.9,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nikon-z6ii',
    name: 'Nikon Z6 II Mirrorless with NIKKOR 24-70mm Lens',
    brand: 'Nikon',
    condition: 'Superb',
    price: 118000,
    mrp: 189999,
    specs: 'Dual EXPEED 6 Processors, 4K UHD 60p, Dual Card Slots',
    shutterCount: '6,800',
    rating: 4.8,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'canon-200d',
    name: 'Canon EOS 200D II DSLR with 18-55mm IS STM Lens',
    brand: 'Canon',
    condition: 'Good',
    price: 34999,
    mrp: 59995,
    specs: '24.1MP APS-C, Dual Pixel CMOS AF, 4K Video, Vari-Angle Touch LCD',
    shutterCount: '8,400',
    rating: 4.7,
    reviews: 140,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sony-zv-e10',
    name: 'Sony ZV-E10 Mirrorless Vlog Camera Kit',
    brand: 'Sony',
    condition: 'Flawless',
    price: 49999,
    mrp: 69990,
    specs: '24.2MP APS-C, Real-Time Eye AF, 4K Video, Product Showcase Mode',
    shutterCount: '1,500',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fuji-xt4',
    name: 'Fujifilm X-T4 Mirrorless Digital Camera (Black)',
    brand: 'Fujifilm',
    condition: 'Superb',
    price: 92000,
    mrp: 154999,
    specs: '26.1MP X-Trans CMOS 4, 6.5-Stop IBIS, Film Simulation Profiles',
    shutterCount: '5,200',
    rating: 4.9,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80',
  },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function BuyCamerasPage() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [addedId, setAddedId] = useState(null);

  const filtered = CAMERAS.filter(
    (c) => selectedBrand === 'All' || c.brand.toLowerCase() === selectedBrand.toLowerCase()
  );

  const handleAddToCart = (camera, e) => {
    e.preventDefault();
    addToLocalCart({
      id: camera.id,
      name: camera.name,
      price: camera.price,
      image: camera.image,
      quantity: 1,
    });
    setAddedId(camera.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-gray-900 pb-20 font-sans antialiased">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#13b59b] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/buy-refurbished" className="hover:text-[#13b59b] transition-colors">
            Buy Refurbished
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#13b59b] font-bold">DSLR &amp; Mirrorless Cameras</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-gray-950 via-slate-900 to-gray-900 text-white py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" /> Sensor &amp; Shutter Verified
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Certified Refurbished DSLR &amp; Mirrorless Cameras
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Clean sensors, verified low shutter counts, and 100% dust-free optics. Save up to 50% on professional gear from Sony, Canon, Nikon, and Fujifilm with 12 months warranty.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-bold text-gray-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Sensor Cleaning &amp; Calibration Done
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Verified Low Shutter Count
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> 7-Day Optical Trial
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Brand Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Sony', 'Canon', 'Nikon', 'Fujifilm'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedBrand.toLowerCase() === b.toLowerCase()
                  ? 'bg-[#13b59b] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#13b59b]/50'
              }`}
            >
              {b} {b === 'All' ? `(${CAMERAS.length})` : ''}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs hover:border-[#13b59b]/50 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#edf7f5] text-[#13b59b] text-[11px] font-extrabold">
                      {item.condition}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[11px] font-extrabold">
                      {discount}% OFF
                    </span>
                  </div>

                  <div className="w-full h-52 bg-[#f8fafc] rounded-xl overflow-hidden mb-3 group-hover:scale-102 transition-transform">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    {item.brand}
                  </div>
                  <h3 className="text-sm font-black text-gray-900 group-hover:text-[#13b59b] transition-colors leading-snug mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.specs}</p>

                  <div className="mt-3 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-center justify-between">
                    <span>Shutter Actuations:</span>
                    <strong className="text-gray-900">{item.shutterCount}</strong>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-extrabold text-[11px]">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">({item.reviews} verified reviews)</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-gray-900">{inr(item.price)}</div>
                    <div className="text-xs text-gray-400 line-through">{inr(item.mrp)}</div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      addedId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#13b59b] hover:bg-[#0fa088] text-white shadow-xs'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {addedId === item.id ? 'Added!' : 'Buy Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
