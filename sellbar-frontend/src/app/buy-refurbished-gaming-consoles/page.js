'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Gamepad2,
  ShieldCheck,
  Star,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { addToLocalCart } from '@/lib/cart';

const CONSOLES = [
  {
    id: 'ps5-disc',
    name: 'Sony PlayStation 5 Disc Edition (825GB SSD)',
    brand: 'Sony',
    condition: 'Flawless',
    price: 39999,
    mrp: 54990,
    specs: '4K 120Hz Ultra HD Blu-Ray, Ray Tracing, 1x DualSense Wireless Controller',
    rating: 4.9,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'xbox-series-x',
    name: 'Microsoft Xbox Series X Console (1TB SSD)',
    brand: 'Microsoft',
    condition: 'Flawless',
    price: 38499,
    mrp: 55990,
    specs: '12 Teraflops GPU, 4K Gaming up to 120FPS, Quick Resume, Xbox Controller',
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'nintendo-switch-oled',
    name: 'Nintendo Switch OLED Model (White Joy-Con)',
    brand: 'Nintendo',
    condition: 'Superb',
    price: 24999,
    mrp: 34999,
    specs: '7-inch Vibrant OLED Screen, 64GB Internal Storage, Enhanced Audio Dock',
    rating: 4.9,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ps4-pro',
    name: 'Sony PlayStation 4 Pro (1TB HDR Edition)',
    brand: 'Sony',
    condition: 'Good',
    price: 19999,
    mrp: 38990,
    specs: 'Dynamic 4K Gaming, Faster Frame Rates, 1x DualShock 4 Controller',
    rating: 4.7,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'xbox-series-s',
    name: 'Microsoft Xbox Series S All-Digital (512GB SSD)',
    brand: 'Microsoft',
    condition: 'Flawless',
    price: 21999,
    mrp: 34990,
    specs: 'Next-Gen Digital Speed, 1440p up to 120FPS, Compact Form Factor',
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'steam-deck',
    name: 'Valve Steam Deck Handheld Gaming PC (512GB NVMe)',
    brand: 'Valve',
    condition: 'Superb',
    price: 36999,
    mrp: 59999,
    specs: '7-inch Anti-Glare Display, Zen 2 RDNA 2 APU, SteamOS Console Experience',
    rating: 4.9,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1612287232269-8f352125bb2a?auto=format&fit=crop&w=600&q=80',
  },
];

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function BuyGamingConsolesPage() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [addedId, setAddedId] = useState(null);

  const filtered = CONSOLES.filter(
    (c) => selectedBrand === 'All' || c.brand.toLowerCase() === selectedBrand.toLowerCase()
  );

  const handleAddToCart = (item, e) => {
    e.preventDefault();
    addToLocalCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    setAddedId(item.id);
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
          <span className="text-[#13b59b] font-bold">Gaming Consoles</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5" /> Thermal Paste Refreshed &amp; Cleaned
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Refurbished PlayStation 5, Xbox &amp; Switch
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              Save up to ₹18,000 on tested next-gen consoles. Every console undergoes deep fan de-dusting, laser disc drive testing, HDMI port inspection, and includes a 12-month replacement warranty.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-bold text-gray-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Genuine Wireless Controller Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> 12 Months Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> 7-Day Replacement
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Sony', 'Microsoft', 'Nintendo', 'Valve'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedBrand.toLowerCase() === b.toLowerCase()
                  ? 'bg-[#13b59b] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#13b59b]/50'
              }`}
            >
              {b} {b === 'All' ? `(${CONSOLES.length})` : ''}
            </button>
          ))}
        </div>

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

                  <div className="w-full h-52 bg-[#f8fafc] rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    {item.brand}
                  </div>
                  <h3 className="text-sm font-black text-gray-900 group-hover:text-[#13b59b] transition-colors leading-snug mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.specs}</p>

                  <div className="flex items-center gap-1.5 mt-3">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-extrabold text-[11px]">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">({item.reviews} reviews)</span>
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
                    {addedId === item.id ? 'Added!' : 'Buy Console'}
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
