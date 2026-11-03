'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';

const BRANDS = [
  { name: 'Apple', slug: 'apple', desc: 'iPhones, MacBooks, iPads & Apple Watches', query: 'apple' },
  { name: 'Samsung', slug: 'samsung', desc: 'Galaxy S Series, Z Fold/Flip & Galaxy Tabs', query: 'samsung' },
  { name: 'Dell', slug: 'dell', desc: 'Latitude, Inspiron & XPS Business Laptops', query: 'dell' },
  { name: 'Lenovo', slug: 'lenovo', desc: 'ThinkPad, IdeaPad & Legion Series', query: 'lenovo' },
  { name: 'HP', slug: 'hp', desc: 'Pavilion, ProBook & EliteBook Laptops', query: 'hp' },
  { name: 'OnePlus', slug: 'oneplus', desc: 'Flagship Smartphones & Nord Series', query: 'oneplus' },
  { name: 'Sony', slug: 'sony', desc: 'PlayStation 5 Consoles & Alpha Cameras', query: 'sony' },
  { name: 'Xiaomi', slug: 'xiaomi', desc: 'Redmi Note Series & POCO Performance Phones', query: 'xiaomi' },
  { name: 'Google Pixel', slug: 'google', desc: 'Tensor Powered Pixel 8 & Pixel 7 Series', query: 'google' },
];

export default function BrandsShowcasePage() {
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
            <span className="text-slate-900 font-semibold">Featured Brands</span>
          </nav>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider block">
            Certified Hardware Brands
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Shop by Global OEM Brand
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every device carries genuine manufacturer hardware, certified battery health, and a 12-month Sellbar replacement warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/shop?search=${b.query}`}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-base text-slate-900 mb-4 group-hover:bg-[#13b59b] group-hover:text-white transition-colors">
                  {b.name.slice(0, 2).toUpperCase()}
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#13b59b] transition">
                  {b.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{b.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#13b59b]">
                <span>View Products</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
