"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Smartphone, CheckCircle2, ArrowRight } from "lucide-react";

const PHONES = [
  {
    name: "Apple iPhone 15",
    brand: "Apple",
    price: 52999,
    mrp: 79900,
    specs: "Dynamic Island, A16 Bionic, 48MP Camera",
    score: 9.4,
    link: "/buy-refurbished",
  },
  {
    name: "Apple iPhone 14",
    brand: "Apple",
    price: 41999,
    mrp: 69900,
    specs: "A15 Bionic, All-Day Battery, Ceramic Shield",
    score: 9.1,
    link: "/buy-refurbished",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 74999,
    mrp: 129999,
    specs: "Galaxy AI, 200MP Camera, Snapdragon 8 Gen 3",
    score: 9.6,
    link: "/buy-refurbished",
  },
  {
    name: "OnePlus 12 5G",
    brand: "OnePlus",
    price: 45999,
    mrp: 64999,
    specs: "Hasselblad Camera, 100W Charging, 16GB RAM",
    score: 9.2,
    link: "/buy-refurbished",
  },
  {
    name: "Google Pixel 8",
    brand: "Google",
    price: 38999,
    mrp: 75999,
    specs: "Google Tensor G3, Best-in-Class AI Photography",
    score: 9.0,
    link: "/buy-refurbished",
  },
  {
    name: "Apple iPhone 13",
    brand: "Apple",
    price: 34999,
    mrp: 59900,
    specs: "Super Retina XDR, A15 Bionic, Cinematic Mode",
    score: 8.9,
    link: "/buy-refurbished",
  },
];

export default function FindNewPhonePage() {
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const filtered = PHONES.filter((p) => {
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchesQuery = query === "" || p.name.toLowerCase().includes(query.toLowerCase());
    return matchesBrand && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Find New Phone</span>
        </nav>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto mb-2">
            <Smartphone className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Find &amp; Compare Flagship Phones</h1>
          <p className="text-gray-500 text-sm">
            Discover the best flagship smartphones available as certified refurbished with up to 50% savings.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search phone name (e.g. iPhone 15, S24, OnePlus)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-[#2bbda3] outline-none text-sm shadow-xs"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {["All", "Apple", "Samsung", "OnePlus", "Google"].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedBrand === b
                    ? "bg-[#2bbda3] text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Phone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((phone, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {phone.brand}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Score: {phone.score}/10
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{phone.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{phone.specs}</p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-[#2bbda3]">
                    ₹{phone.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{phone.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">
                    Save {Math.round(((phone.mrp - phone.price) / phone.mrp) * 100)}%
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href="/buy-refurbished"
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-[#2bbda3] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  View Refurbished Deals <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
