"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  ShoppingCart,
  Zap,
  Smartphone,
  ChevronRight,
  Share2,
} from "lucide-react";
import { addToCart } from "@/lib/cart";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug ? String(params.slug) : "refurbished-device";

  const [added, setAdded] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("Flawless");

  // Format clean title from slug
  const cleanTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Determine estimated price
  const isMac = cleanTitle.toLowerCase().includes("macbook") || cleanTitle.toLowerCase().includes("thinkpad") || cleanTitle.toLowerCase().includes("dell");
  const isUltra = cleanTitle.toLowerCase().includes("ultra") || cleanTitle.toLowerCase().includes("pro");
  const basePrice = isMac ? (isUltra ? 119999 : 49999) : (isUltra ? 68999 : 36999);
  const mrp = Math.round(basePrice * 1.55);

  const product = {
    id: slug,
    name: cleanTitle,
    price: basePrice,
    mrp: mrp,
    rating: 4.8,
    reviews: 142,
    inStock: true,
    warranty: "12 Months Comprehensive Sellbar Warranty",
    specs: [
      { label: "Quality Grade", val: selectedGrade },
      { label: "Battery Health", val: "Certified > 85% Maximum Capacity" },
      { label: "Inspection", val: "Passed 32-Point Quality Lab Check" },
      { label: "Accessories", val: "Original Compatible Cable & Adapter" },
      { label: "Operating System", val: "Original Stock OS (Updated to Latest Version)" },
      { label: "Warranty", val: "12 Months Doorstep Replacement Warranty" },
    ],
  };

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleBuyNow() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: "",
    });
    router.push("/cart");
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <Link href="/buy-refurbished" className="hover:text-[#2bbda3] transition-colors">Buy Refurbished</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{cleanTitle}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image / Device Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-full aspect-square bg-[#f8fafc] rounded-2xl border border-gray-100 flex flex-col items-center justify-center p-8 relative">
              <span className="absolute top-4 left-4 bg-teal-50 text-[#2bbda3] text-xs font-bold px-3 py-1 rounded-full border border-teal-100">
                Grade: {selectedGrade}
              </span>
              <Smartphone className="w-32 h-32 text-gray-300" />
              <p className="text-xs text-gray-400 mt-4">Certified Refurbished Hardware</p>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck className="w-5 h-5 text-[#2bbda3] mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-gray-700 block">12M Warranty</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <RotateCcw className="w-5 h-5 text-[#2bbda3] mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-gray-700 block">7-Day Return</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Truck className="w-5 h-5 text-[#2bbda3] mx-auto mb-1" />
                <span className="text-[11px] font-semibold text-gray-700 block">Free Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1 bg-amber-50 px-2.5 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-current" /> {product.rating}
                </div>
                <span className="text-xs text-gray-400">({product.reviews} verified reviews)</span>
                <span className="text-xs text-emerald-600 font-semibold ml-auto flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock (Ready to Ship)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#2bbda3]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-base text-gray-400 line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              </span>
              <p className="text-xs text-gray-500 w-full mt-1">Inclusive of all taxes &amp; free doorstep delivery</p>
            </div>

            {/* Condition Grade Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                Select Condition Grade
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Flawless", "Very Good", "Good"].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedGrade === grade
                        ? "border-[#2bbda3] bg-[#2bbda3]/5 text-[#2bbda3] font-bold shadow-xs"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xs sm:text-sm block">{grade}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl border-2 border-[#2bbda3] text-[#2bbda3] hover:bg-[#2bbda3]/5 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> Buy Now
              </button>
            </div>

            {/* 32-Point Quality Lab Guarantee */}
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2bbda3] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-700 leading-relaxed">
                <strong>Sellbar Assured Guarantee:</strong> Every unit is backed by a 32-point inspection, tested battery capacity, and a 12-month doorstep replacement warranty.
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Device Specifications &amp; Quality Report</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {product.specs.map((s, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between text-xs sm:text-sm">
                <span className="font-semibold text-gray-600">{s.label}</span>
                <span className="text-gray-900 font-bold">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
          <p className="text-sm font-semibold text-gray-500 animate-pulse">Loading Sellbar Certified Product...</p>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
