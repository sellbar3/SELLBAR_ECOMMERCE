"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Laptop, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { fetchProducts } from "@/lib/productApi";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function BuyRefurbishedLaptopsPage() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLaptops() {
      try {
        setLoading(true);
        const data = await fetchProducts({ category: "laptop", limit: 50 });
        setLaptops(data.products || []);
      } catch (err) {
        console.error("Failed to load laptops:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLaptops();
  }, []);

  const filtered = laptops.filter(
    (l) => selectedBrand === "All" || (l.brand && l.brand.toLowerCase() === selectedBrand.toLowerCase())
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
            <div className="text-3xl font-extrabold text-[#2bbda3]">&gt; 80%</div>
            <div className="text-xs text-gray-300">Minimum Battery Capacity</div>
            <div className="text-xl font-bold text-white pt-2">Original</div>
            <div className="text-xs text-gray-300">Fast Charger Included</div>
          </div>
        </div>

        {/* Brand Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "Dell", "Apple", "Lenovo"].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBrand(b)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedBrand === b
                  ? "bg-[#2bbda3] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {b} Laptops
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs animate-pulse space-y-4">
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div className="w-full h-44 bg-gray-100 rounded-xl" />
                <div className="h-5 w-3/4 bg-gray-100 rounded" />
                <div className="h-4 w-1/2 bg-gray-100 rounded" />
                <div className="h-8 w-full bg-gray-100 rounded-xl" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
              No laptops found matching the selected brand.
            </div>
          ) : (
            filtered.map((item) => {
              const imageUrl = item.images?.[0]?.url || getCloudinaryUrl("/cashify/laptop-dell-3410-i5.png");
              const compareAtPrice = item.compareAtPrice || Math.round(item.price * 1.5);
              const percentOff = compareAtPrice > item.price
                ? Math.round(((compareAtPrice - item.price) / compareAtPrice) * 100)
                : null;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-[#2bbda3] text-xs font-bold">
                        Grade: {item.condition || "Flawless"}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" /> {item.rating || 4.8}
                      </div>
                    </div>

                    <div className="w-full h-44 bg-gray-50 rounded-xl mb-4 flex items-center justify-center p-3 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
                      />
                    </div>

                    <h3 className="font-bold text-gray-900 text-base line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 12 Months Comprehensive Warranty
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#2bbda3]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {compareAtPrice > item.price && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{compareAtPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs font-bold text-emerald-600">
                            Save {percentOff}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/product/${item.slug || item._id}`}
                      className="w-full py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      View Details &amp; Buy Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
