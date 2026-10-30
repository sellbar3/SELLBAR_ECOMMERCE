"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Star, Truck, ArrowRight, Smartphone, Filter } from "lucide-react";
import { API } from "@/lib/api";

const FEATURED_PHONES = [
  {
    id: "iph-15",
    name: "Sellbar Certified Apple iPhone 15 (128GB)",
    brand: "Apple",
    price: 51999,
    mrp: 79900,
    grade: "Flawless",
    warranty: "12 Months Warranty",
    rating: 4.8,
  },
  {
    id: "iph-14",
    name: "Sellbar Certified Apple iPhone 14 (128GB)",
    brand: "Apple",
    price: 41499,
    mrp: 69900,
    grade: "Very Good",
    warranty: "12 Months Warranty",
    rating: 4.7,
  },
  {
    id: "iph-13",
    name: "Sellbar Certified Apple iPhone 13 (128GB)",
    brand: "Apple",
    price: 33999,
    mrp: 59900,
    grade: "Good",
    warranty: "6 Months Warranty",
    rating: 4.6,
  },
  {
    id: "sam-s24u",
    name: "Sellbar Certified Samsung Galaxy S24 Ultra (512GB)",
    brand: "Samsung",
    price: 78999,
    mrp: 139999,
    grade: "Flawless",
    warranty: "12 Months Warranty",
    rating: 4.9,
  },
  {
    id: "op-12",
    name: "Sellbar Certified OnePlus 12 5G (256GB)",
    brand: "OnePlus",
    price: 43999,
    mrp: 64999,
    grade: "Very Good",
    warranty: "12 Months Warranty",
    rating: 4.7,
  },
  {
    id: "sam-s21u",
    name: "Sellbar Certified Samsung Galaxy S21 Ultra 5G",
    brand: "Samsung",
    price: 28999,
    mrp: 105999,
    grade: "Good",
    warranty: "6 Months Warranty",
    rating: 4.5,
  },
];

export default function BuyRefurbishedMobilePhonesPage() {
  const [selectedBrand, setSelectedBrand] = useState("All");

  const filtered = FEATURED_PHONES.filter(
    (p) => selectedBrand === "All" || p.brand === selectedBrand
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/buy-refurbished" className="hover:text-[#2bbda3] transition-colors">Buy Refurbished</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Mobile Phones</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-teal-900 via-[#1a907e] to-[#2bbda3] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
              32-Point Quality Inspected
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Buy Refurbished Smartphones with 12 Months Warranty
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Save up to 60% on flagship iPhones, Samsung Galaxy, and OnePlus phones. Every device includes genuine accessories, tested battery health, and a 7-day replacement guarantee.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-1">
            <div className="text-3xl font-extrabold text-white">&gt; 80%</div>
            <div className="text-xs text-emerald-100">Guaranteed Battery Health</div>
            <div className="text-xl font-bold text-white pt-2">7 Days</div>
            <div className="text-xs text-emerald-100">Free Replacement Window</div>
          </div>
        </div>

        {/* Brand Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "Apple", "Samsung", "OnePlus"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedBrand === b
                  ? "bg-[#2bbda3] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {b} Phones
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
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
                  <Smartphone className="w-16 h-16 text-gray-300" />
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
