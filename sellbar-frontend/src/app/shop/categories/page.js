'use client';

import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  Laptop,
  Watch,
  Tablet,
  Camera,
  Gamepad2,
  Headphones,
  Zap,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  {
    slug: 'mobile-phones',
    name: 'Smartphones & iPhones',
    desc: 'Apple iPhone, Samsung Galaxy, OnePlus, and Google Pixel verified devices with 12M warranty.',
    icon: Smartphone,
    count: '32 Models',
    href: '/buy-refurbished-mobile-phones',
    gradient: 'from-pink-500/10 to-rose-500/10 text-rose-600',
  },
  {
    slug: 'laptop',
    name: 'Laptops & MacBooks',
    desc: 'Apple MacBook Air, Pro, Dell Latitude, Lenovo ThinkPad, and HP Pavilion laptops.',
    icon: Laptop,
    count: '24 Models',
    href: '/buy-refurbished-laptops',
    gradient: 'from-blue-500/10 to-indigo-500/10 text-blue-600',
  },
  {
    slug: 'smart-watch',
    name: 'Smartwatches & Wearables',
    desc: 'Apple Watch Series 9, Ultra 2, Galaxy Watch 6, and Garmin running watches.',
    icon: Watch,
    count: '16 Models',
    href: '/buy-refurbished-smart-watches',
    gradient: 'from-emerald-500/10 to-teal-500/10 text-emerald-600',
  },
  {
    slug: 'tablets',
    name: 'iPads & Android Tablets',
    desc: 'Apple iPad Pro M2, iPad Air, and Samsung Galaxy Tab S9 with stylus support.',
    icon: Tablet,
    count: '14 Models',
    href: '/buy-refurbished-tablets',
    gradient: 'from-purple-500/10 to-violet-500/10 text-purple-600',
  },
  {
    slug: 'dslr-cameras',
    name: 'DSLR & Mirrorless Cameras',
    desc: 'Sony Alpha, Canon EOS, Nikon Z, and Fujifilm mirrorless cameras with shutter count audits.',
    icon: Camera,
    count: '12 Models',
    href: '/buy-refurbished-dslr-cameras',
    gradient: 'from-amber-500/10 to-orange-500/10 text-amber-600',
  },
  {
    slug: 'gaming-consoles',
    name: 'PlayStation & Gaming Consoles',
    desc: 'Sony PS5, Xbox Series X, Nintendo Switch OLED, and Steam Deck consoles.',
    icon: Gamepad2,
    count: '8 Models',
    href: '/buy-refurbished-gaming-consoles',
    gradient: 'from-cyan-500/10 to-blue-500/10 text-cyan-600',
  },
  {
    slug: 'accessories',
    name: 'Original Fast Chargers & Gear',
    desc: 'Apple 20W adapters, Samsung 25W chargers, braided cables, and MagSafe cases.',
    icon: Zap,
    count: '45 Items',
    href: '/buy-accessories',
    gradient: 'from-emerald-500/10 to-green-500/10 text-emerald-600',
  },
];

export default function CategoriesOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[#13b59b] transition">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">All Categories</span>
          </nav>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider block">
            Product Departments
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Browse Electronics by Category
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every product in every department is tested across 32 hardware metrics and backed by our replacement warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={cat.href}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#13b59b] transition">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-bold text-slate-400">{cat.count}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">{cat.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#13b59b]">
                  <span>Explore Department</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
