"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Laptop, ShieldCheck, Star, ArrowRight } from "lucide-react";

const FEATURED_LAPTOPS = [
  {
    id: "mba-m1",
    name: "Apple MacBook Air 2020 M1 (8GB / 256GB SSD)",
    brand: "Apple",
    price: 49999,
    mrp: 99900,
    grade: "Flawless",
    warranty: "12 Months Warranty",
    rating: 4.9,
  },
  {
    id: "len-x1",
    name: "Lenovo ThinkPad X1 Carbon Gen 9 (Intel Core i7 / 16GB / 512GB)",
    brand: "Lenovo",
    price: 44999,
    mrp: 145000,
    grade: "Very Good",
    warranty: "12 Months Warranty",
    rating: 4.8,
  },
  {
    id: "dell-5320",
    name: "Dell Latitude 5000 Series 5320 (Intel Core i5 / 16GB / 512GB)",
    brand: "Dell",
    price: 24999,
    mrp: 85000,
    grade: "Good",
    warranty: "6 Months Warranty",
    rating: 4.7,
  },
  {
    id: "mbp-16",
    name: "Apple MacBook Pro 2023 16-inch M3 Max (32GB / 1TB)",
    brand: "Apple",
    price: 189999,
    mrp: 349900,
    grade: "Flawless",
    warranty: "12 Months Warranty",
    rating: 5.0,
  },
  {
    id: "dell-3410",
    name: "Dell Latitude 3000 Series 3410 (Core i5 / 8GB / 256GB)",
    brand: "Dell",
    price: 18999,
    mrp: 58000,
    grade: "Good",
    warranty: "6 Months Warranty",
    rating: 4.6,
  },
  {
    id: "len-t14",
    name: "Lenovo ThinkPad T14 Gen 1 (Ryzen 5 PRO / 16GB / 512GB)",
    brand: "Lenovo",
    price: 27999,
    mrp: 89000,
    grade: "Very Good",
    warranty: "12 Months Warranty",
    rating: 4.8,
  },
];

export default function BuyRefurbishedLaptopsPage() {
  const [selectedBrand, setSelectedBrand] = useState("All");

  const filtered = FEATURED_LAPTOPS.filter(
    (l) => selectedBrand === "All" || l.brand === selectedBrand
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/buy-refurbished" className="hover:text-[#2bbda3] transition-colors">Buy Refurbished</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Laptops</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-3 py-1 bg-[#2bbda3]/20 text-[#2bbda3] rounded-full text-xs font-bold uppercase tracking-wider">
              Workstation &amp; Ultrabook Refurb Hub
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Certified Refurbished Laptops &amp; MacBooks
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Enterprise-grade ThinkPads, Dell Latitudes, and Apple MacBooks tested across thermals, SSD life, and battery health with up to 12 months warranty.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-1">
            <div className="text-3xl font-extrabold text-[#2bbda3]">Save 70%</div>
            <div className="text-xs text-gray-200">vs Brand-New Laptop MRP</div>
            <div className="text-xl font-bold text-white pt-2">Original OS</div>
            <div className="text-xs text-gray-200">Genuine Windows &amp; macOS</div>
          </div>
        </div>

        {/* Brand Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "Apple", "Lenovo", "Dell"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedBrand === b
                  ? "bg-[#2bbda3] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {b} Laptops
            </button>
          ))}
        </div>

        {/* Laptop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-[#2bbda3] text-xs font-bold">
                    Grade: {item.grade}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> {item.rating}
                  </div>
                </div>

                <div className="w-full h-44 bg-gray-50 rounded-xl mb-4 flex items-center justify-center">
                  <Laptop className="w-16 h-16 text-gray-300" />
                </div>

                <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {item.warranty}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#2bbda3]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{item.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    Save {Math.round(((item.mrp - item.price) / item.mrp) * 100)}%
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href="/buy-refurbished"
                  className="w-full py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  View Details &amp; Buy Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
