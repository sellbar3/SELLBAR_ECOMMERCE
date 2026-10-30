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
  ChevronRight,
  Package,
} from "lucide-react";
import { addToCart } from "@/lib/cart";
import { fetchProductByIdOrSlug } from "@/lib/productApi";
import { getCloudinaryUrl } from "@/lib/cloudinary";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug ? String(params.slug) : "";

  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState("Flawless");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await fetchProductByIdOrSlug(slug);
        if (data && data.product) {
          setProductData(data.product);
          setRelatedProducts(data.relatedProducts || []);
          if (data.product.condition) {
            setSelectedGrade(data.product.condition);
          }
        }
      } catch (err) {
        console.error("Failed to load product detail:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 h-96 bg-gray-100 rounded-2xl" />
            <div className="lg:col-span-7 space-y-4">
              <div className="h-6 w-32 bg-gray-100 rounded" />
              <div className="h-8 w-3/4 bg-gray-100 rounded" />
              <div className="h-16 w-full bg-gray-100 rounded" />
              <div className="h-12 w-full bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center max-w-md space-y-4">
          <Package className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">Product Not Found</h2>
          <p className="text-xs text-gray-500">
            The refurbished device you are looking for might have been sold out or moved.
          </p>
          <Link
            href="/buy-refurbished"
            className="inline-block py-2.5 px-6 bg-[#2bbda3] text-white font-bold rounded-xl text-xs hover:bg-[#249e88] transition"
          >
            Browse Refurbished Store
          </Link>
        </div>
      </div>
    );
  }

  const images = productData.images && productData.images.length > 0
    ? productData.images.map((img) => img.url)
    : [getCloudinaryUrl("/products/iphone-14.webp")];

  const currentImage = images[activeImageIndex] || images[0];
  const compareAtPrice = productData.compareAtPrice || Math.round(productData.price * 1.4);
  const savingsAmount = compareAtPrice > productData.price ? compareAtPrice - productData.price : 0;
  const savingsPercent = compareAtPrice > productData.price
    ? Math.round(((compareAtPrice - productData.price) / compareAtPrice) * 100)
    : 0;

  function handleAddToCart() {
    addToCart({
      id: productData._id,
      name: productData.name,
      price: productData.price,
      quantity: 1,
      image: currentImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleBuyNow() {
    addToCart({
      id: productData._id,
      name: productData.name,
      price: productData.price,
      quantity: 1,
      image: currentImage,
    });
    router.push("/cart");
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <Link href="/buy-refurbished" className="hover:text-[#2bbda3] transition-colors">
            Buy Refurbished
          </Link>
          {productData.category?.name && (
            <>
              <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
              <span className="hover:text-[#2bbda3] transition-colors">
                {productData.category.name}
              </span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{productData.name}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image / Device Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-full aspect-square bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
              <span className="absolute top-4 left-4 bg-teal-50 text-[#2bbda3] text-xs font-bold px-3 py-1 rounded-full border border-teal-100 z-10">
                Grade: {selectedGrade}
              </span>
              {productData.badge && (
                <span className="absolute top-4 right-4 bg-[#1d3d93] text-white text-[10px] font-bold px-2.5 py-1 rounded-md z-10">
                  {productData.badge}
                </span>
              )}
              <img
                src={currentImage}
                alt={productData.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl border-2 p-1 bg-white shrink-0 transition ${
                      activeImageIndex === idx
                        ? "border-[#2bbda3] ring-2 ring-[#2bbda3]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

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
                  <Star className="w-3.5 h-3.5 fill-current" /> {productData.rating || 4.8}
                </div>
                <span className="text-xs text-gray-400">
                  ({productData.reviewsCount || 142} verified reviews)
                </span>
                <span className="text-xs text-emerald-600 font-semibold ml-auto flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {productData.stock > 0 ? "In Stock (Ready to Ship)" : "Limited Stock"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {productData.name}
              </h1>
              {productData.brand && (
                <p className="text-xs text-gray-500 mt-1">Brand: <strong className="text-gray-700">{productData.brand}</strong></p>
              )}
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#2bbda3]">
                ₹{productData.price?.toLocaleString("en-IN")}
              </span>
              {compareAtPrice > productData.price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ₹{compareAtPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Save {savingsPercent}% (₹{savingsAmount.toLocaleString("en-IN")})
                  </span>
                </>
              )}
              <p className="text-xs text-gray-500 w-full mt-1">
                Inclusive of 18% GST &amp; free insured doorstep delivery
              </p>
            </div>

            {/* Condition Grade Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                Select Condition Grade
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Flawless", "Superb", "Good"].map((grade) => (
                  <button
                    key={grade}
                    type="button"
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

            {/* Description */}
            {productData.description && (
              <div className="space-y-1.5 pt-2">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Overview</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {productData.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl border-2 border-[#2bbda3] text-[#2bbda3] hover:bg-[#2bbda3]/5 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
        {productData.specs && productData.specs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Device Specifications &amp; Quality Report</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {productData.specs.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between text-xs sm:text-sm"
                >
                  <span className="font-semibold text-gray-600">{s.label}</span>
                  <span className="text-gray-900 font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Similar Refurbished Devices</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => {
                const img = rel.images?.[0]?.url || getCloudinaryUrl("/products/iphone-14.webp");
                return (
                  <Link
                    key={rel._id}
                    href={`/product/${rel.slug || rel._id}`}
                    className="p-3 rounded-2xl border border-gray-100 hover:border-[#2bbda3] hover:shadow-md transition bg-white block group"
                  >
                    <div className="aspect-square w-full bg-gray-50 rounded-xl p-3 flex items-center justify-center mb-2 overflow-hidden">
                      <img
                        src={img}
                        alt={rel.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                      />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">
                      {rel.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-gray-900">
                        ₹{rel.price?.toLocaleString("en-IN")}
                      </span>
                      {rel.compareAtPrice && (
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹{rel.compareAtPrice?.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
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
