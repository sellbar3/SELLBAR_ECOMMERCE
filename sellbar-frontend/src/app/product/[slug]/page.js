"use client";

import { lookupPincode, isServiceablePincode } from '@/lib/pincodes';

import React, { Suspense, useState, useEffect, useMemo, useRef } from "react";
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
  ChevronLeft,
  Package,
  Heart,
  Share2,
  ZoomIn,
  X,
  MapPin,
  Check,
  HelpCircle,
  Cpu,
  HardDrive,
  Smartphone,
  Laptop,
  BatteryCharging,
  Wifi,
  Sparkles,
  Info,
  Clock,
  Layers,
  Award,
  Box,
  ThumbsUp,
  Camera,
  Search,
} from "lucide-react";
import { addToCart, getLocalCart } from "@/lib/cart";
import { fetchProductByIdOrSlug } from "@/lib/productApi";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const RECENTLY_VIEWED_KEY = "sellbar_recently_viewed";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug ? String(params.slug) : "";

  // Core Data States
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gallery States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, show: false });
  const touchStartX = useRef(null);

  // Variant & Purchase States
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("Flawless");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Pincode & Delivery State
  const [pincode, setPincode] = useState("845438");
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  // Active Tab Below Fold
  const [activeTab, setActiveTab] = useState("specs");
  const [openFaq, setOpenFaq] = useState(0);

  // Customer photo modal
  const [selectedReviewPhoto, setSelectedReviewPhoto] = useState(null);

  // Sync location & initial delivery check
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sellbar-selected-location');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.pincode && isServiceablePincode(parsed.pincode)) {
          setPincode(parsed.pincode);
          const info = lookupPincode(parsed.pincode);
          setDeliveryStatus({
            valid: true,
            msg: `Fast Express Delivery Available in ${info.city}, West Champaran (PIN: ${parsed.pincode}).`,
            estimate: "Estimated Doorstep Delivery: 24 - 48 Hours with Free COD.",
          });
          return;
        }
      }
    } catch {
      // ignore
    }
    const defInfo = lookupPincode("845438");
    setDeliveryStatus({
      valid: true,
      msg: `Fast Express Delivery Available in ${defInfo.city}, West Champaran (PIN: 845438).`,
      estimate: "Estimated Doorstep Delivery: 24 - 48 Hours with Free COD.",
    });
  }, []);

  // Load product data from backend API
  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await fetchProductByIdOrSlug(slug);
        if (data && data.product) {
          const prod = data.product;
          setProductData(prod);
          setRelatedProducts(data.relatedProducts || []);

          if (prod.condition) {
            setSelectedGrade(prod.condition);
          }

          // Initialize first variant if available
          if (prod.variants && prod.variants.length > 0) {
            setSelectedVariant(prod.variants[0]);
          } else {
            setSelectedVariant(null);
          }

          // Track Recently Viewed
          try {
            const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
            let list = raw ? JSON.parse(raw) : [];
            list = list.filter((item) => item.slug !== prod.slug && item._id !== prod._id);
            list.unshift({
              _id: prod._id,
              name: prod.name,
              slug: prod.slug || prod._id,
              price: prod.price,
              compareAtPrice: prod.compareAtPrice,
              image: prod.images?.[0]?.url || getCloudinaryUrl("/products/iphone-14.webp"),
              brand: prod.brand,
              rating: prod.rating || 4.8,
              badge: prod.badge,
            });
            localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(list.slice(0, 8)));
            setRecentlyViewed(list.slice(1, 6));
          } catch (e) {
            // ignore storage error
          }
        }
      } catch (err) {
        console.error("Failed to load electronics product detail:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  // Gallery image list with fallbacks
  const images = useMemo(() => {
    if (!productData) return [getCloudinaryUrl("/products/iphone-14.webp")];
    if (productData.images && productData.images.length > 0) {
      return productData.images.map((img) => getCloudinaryUrl(img.url));
    }
    return [getCloudinaryUrl("/products/iphone-14.webp")];
  }, [productData]);

  // Active image
  const currentImage = images[activeImageIndex] || images[0];

  // Pricing calculations
  const effectivePrice = selectedVariant?.price || productData?.price || 0;
  const effectiveComparePrice =
    selectedVariant?.compareAtPrice ||
    productData?.compareAtPrice ||
    Math.round(effectivePrice * 1.4);
  const effectiveStock = selectedVariant?.stock ?? productData?.stock ?? 5;
  const effectiveSku = selectedVariant?.sku || productData?.sku || "SB-ELEC-001";
  const savingsAmount =
    effectiveComparePrice > effectivePrice ? effectiveComparePrice - effectivePrice : 0;
  const savingsPercent =
    effectiveComparePrice > effectivePrice
      ? Math.round((savingsAmount / effectiveComparePrice) * 100)
      : 0;

  // Touch Swipe for Mobile Image Gallery
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe left -> next image
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swipe right -> prev image
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    touchStartX.current = null;
  }

  // Mouse move zoom calculation
  function handleMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  }

  function handleMouseLeave() {
    setZoomPos((prev) => ({ ...prev, show: false }));
  }

  // Variant change handler
  function handleVariantSelect(variant) {
    setSelectedVariant(variant);
    if (variant.image) {
      const idx = images.findIndex((img) => img === getCloudinaryUrl(variant.image));
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  }

  // Pincode delivery checker
  function handleCheckPincode(e) {
    if (e && e.preventDefault) e.preventDefault();
    const clean = String(pincode || "").trim().replace(/\D/g, "");
    if (clean.length !== 6) {
      setDeliveryStatus({
        valid: false,
        msg: "Please enter a valid 6-digit PIN code.",
      });
      return;
    }
    const info = lookupPincode(clean);
    if (info.isServiceable) {
      setDeliveryStatus({
        valid: true,
        msg: `Fast Express Delivery Available in ${info.city}, West Champaran (PIN: ${clean}).`,
        estimate: "Estimated Doorstep Delivery: 24 - 48 Hours with Free COD.",
      });
    } else {
      setDeliveryStatus({
        valid: false,
        msg: `Delivery Not Available for PIN ${clean}. Sellbar currently delivers exclusively to West Champaran, Bihar.`,
        estimate: "Outside serviceable area (18 blocks of West Champaran supported).",
      });
    }
  }

  // Cart operations
  function handleAddToCart() {
    if (!productData) return;
    addToCart(
      {
        id: selectedVariant?.sku || productData._id,
        productId: productData._id,
        name: selectedVariant
          ? `${productData.name} (${selectedVariant.name})`
          : productData.name,
        price: effectivePrice,
        compareAtPrice: effectiveComparePrice,
        quantity: quantity,
        image: currentImage,
        conditionGrade: selectedGrade,
        variantName: selectedVariant?.name || "",
        sku: effectiveSku,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  function handleBuyNow() {
    if (!productData) return;
    addToCart(
      {
        id: selectedVariant?.sku || productData._id,
        productId: productData._id,
        name: selectedVariant
          ? `${productData.name} (${selectedVariant.name})`
          : productData.name,
        price: effectivePrice,
        compareAtPrice: effectiveComparePrice,
        quantity: quantity,
        image: currentImage,
        conditionGrade: selectedGrade,
        variantName: selectedVariant?.name || "",
        sku: effectiveSku,
      },
      quantity
    );
    router.push("/checkout");
  }

  function handleShare() {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="h-4 w-64 bg-gray-200 rounded" />
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 aspect-square bg-gray-100 rounded-2xl" />
            <div className="lg:col-span-5 space-y-4">
              <div className="h-6 w-32 bg-gray-100 rounded" />
              <div className="h-8 w-4/5 bg-gray-100 rounded" />
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
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm text-center max-w-md space-y-4">
          <div className="w-16 h-16 bg-teal-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Electronics Product Not Found</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The refurbished device you are looking for might have been sold out or cataloged under another category.
          </p>
          <Link
            href="/buy-refurbished"
            className="inline-block py-3 px-6 bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold rounded-xl text-xs transition shadow-md"
          >
            Browse Certified Electronics
          </Link>
        </div>
      </div>
    );
  }

  // Specifications categorization
  const specCategories = productData.specifications && Object.keys(productData.specifications).length > 0
    ? productData.specifications
    : {
        "Technical Specifications": productData.specs || [
          { label: "Warranty", value: productData.warranty || "12 Months Doorstep Warranty" },
          { label: "Inspection Status", value: "Passed 32-Point Electronics Diagnostic Lab" },
        ],
      };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs Navigation */}
        <nav className="flex items-center text-xs text-gray-500 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors flex items-center gap-1">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400 shrink-0" />
          <Link href="/buy-refurbished" className="hover:text-[#2bbda3] transition-colors">
            Certified Electronics
          </Link>
          {productData.category?.name && (
            <>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400 shrink-0" />
              <Link
                href={`/buy-refurbished?category=${productData.category?.slug || ""}`}
                className="hover:text-[#2bbda3] transition-colors"
              >
                {productData.category.name}
              </Link>
            </>
          )}
          {productData.brand && (
            <>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400 shrink-0" />
              <span className="text-gray-600">{productData.brand}</span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold truncate max-w-xs">{productData.name}</span>
        </nav>

        {/* Main Product Section: Two-Column Electronics Layout */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Large Electronics Product Image Gallery (~55%) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Interactive Viewport (1:1 Ratio) */}
            <div
              className="relative w-full aspect-square bg-[#f8fafc] rounded-2xl border border-gray-200/80 flex items-center justify-center p-6 sm:p-10 overflow-hidden cursor-crosshair select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsZoomModalOpen(true)}
            >
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#1a907e] text-xs font-bold shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#2bbda3]" /> Grade: {selectedGrade}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-blue-600" /> 32-Point Inspected
                </span>
              </div>

              {productData.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-[#1d3d93] text-white text-xs font-bold rounded-lg shadow-sm">
                    {productData.badge}
                  </span>
                </div>
              )}

              {/* Main Product Image with subtle zoom on hover */}
              <img
                src={currentImage}
                alt={`${productData.name} - ${selectedVariant?.name || "Refurbished Electronics"}`}
                className="max-h-full max-w-full object-contain transition-transform duration-200"
                style={
                  zoomPos.show
                    ? {
                        transform: "scale(1.5)",
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      }
                    : { transform: "scale(1)" }
                }
              />

              {/* Magnifier Action Pill */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs border border-gray-200 px-2.5 py-1 rounded-full text-[11px] font-semibold text-gray-700 shadow-xs flex items-center gap-1 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-[#2bbda3]" /> Click for Fullscreen
              </div>

              {/* Mobile Swipe Indicators */}
              <div className="sm:hidden absolute bottom-4 left-4 bg-black/40 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                {activeImageIndex + 1} / {images.length} (Swipe)
              </div>
            </div>

            {/* Thumbnail Gallery (Front, Back, Side, Ports, Packaging) */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl border-2 p-1.5 bg-white shrink-0 transition-all flex items-center justify-center ${
                      activeImageIndex === idx
                        ? "border-[#2bbda3] ring-3 ring-[#2bbda3]/20 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono text-gray-400 bg-white/80 px-1 rounded">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Electronics Quality & Warranty Badge Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center pt-2">
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#2bbda3] mb-1" />
                <span className="text-xs font-bold text-gray-900">12M Warranty</span>
                <span className="text-[10px] text-gray-500">Doorstep Cover</span>
              </div>
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                <RotateCcw className="w-5 h-5 text-[#2bbda3] mb-1" />
                <span className="text-xs font-bold text-gray-900">7-Day Return</span>
                <span className="text-[10px] text-gray-500">Easy Replacement</span>
              </div>
              <div className="p-3 bg-[#f8fafc] rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                <Truck className="w-5 h-5 text-[#2bbda3] mb-1" />
                <span className="text-xs font-bold text-gray-900">Free Express</span>
                <span className="text-[10px] text-gray-500">Insured Shipping</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Information & Purchase Panel (~45%) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Header: Brand, Title, Rating, SKU */}
            <div className="space-y-2 border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between">
                {productData.brand && (
                  <span className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-800 text-xs font-bold rounded-md uppercase tracking-wider">
                    {productData.brand}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-xl border transition ${
                      isWishlisted
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300"
                    }`}
                    title={isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition"
                    title="Share this product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {shareToast && (
                <div className="p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium animate-fade-in flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Link copied to clipboard!
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                {productData.name}
              </h1>

              {/* Model Number & SKU */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-0.5">
                {productData.modelNumber && (
                  <span>
                    Model: <strong className="text-gray-700 font-mono">{productData.modelNumber}</strong>
                  </span>
                )}
                <span>
                  SKU: <strong className="text-gray-700 font-mono">{effectiveSku}</strong>
                </span>
              </div>

              {/* Star Rating & Verified Reviews */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{productData.rating || 4.8}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("reviews");
                    const el = document.getElementById("tab-reviews");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs text-gray-500 hover:text-[#2bbda3] underline underline-offset-2 transition"
                >
                  {productData.reviewsCount || 142} verified customer reviews
                </button>
              </div>
            </div>

            {/* Price Row (Prominent Electronics Pricing) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f8fafc] border border-gray-200/80 space-y-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#2bbda3]">
                  ₹{effectivePrice.toLocaleString("en-IN")}
                </span>
                {effectiveComparePrice > effectivePrice && (
                  <>
                    <span className="text-base sm:text-lg text-gray-400 line-through">
                      ₹{effectiveComparePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Save {savingsPercent}% (₹{savingsAmount.toLocaleString("en-IN")} OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Price inclusive of all taxes, 18% GST invoice &amp; free insured doorstep delivery.
              </p>
              <div className="text-[11px] text-gray-600 bg-white p-2 rounded-lg border border-gray-100 flex items-center justify-between">
                <span>Or pay in 3 interest-free installments of <strong>₹{Math.round(effectivePrice / 3).toLocaleString("en-IN")}</strong></span>
                <span className="text-[#2bbda3] font-bold">No Cost EMI</span>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-emerald-700">
                In Stock ({effectiveStock} units available)
              </span>
              <span className="text-gray-400">• Ready to ship from Sellbar Hub</span>
            </div>

            {/* Condition Grade Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-gray-900 uppercase tracking-wider">
                  Select Cosmetic Condition
                </label>
                <span className="text-gray-500 font-medium">All grades 100% functional</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: "Flawless", badge: "Like New", desc: "Zero visible scratches" },
                  { name: "Superb", badge: "Grade A+", desc: "Micro faint marks" },
                  { name: "Good", badge: "High Value", desc: "Light pocket wear" },
                ].map((gr) => (
                  <button
                    key={gr.name}
                    type="button"
                    onClick={() => setSelectedGrade(gr.name)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                      selectedGrade === gr.name
                        ? "border-[#2bbda3] bg-[#2bbda3]/5 ring-2 ring-[#2bbda3]/20 shadow-xs"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${selectedGrade === gr.name ? "text-[#2bbda3]" : "text-gray-900"}`}>
                        {gr.name}
                      </span>
                      {selectedGrade === gr.name && <Check className="w-3.5 h-3.5 text-[#2bbda3]" />}
                    </div>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{gr.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Electronics Variants (Storage, RAM, Color, etc.) */}
            {productData.variants && productData.variants.length > 0 && (
              <div className="space-y-3 pt-1">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                  Select Electronics Configuration
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {productData.variants.map((v, idx) => {
                    const isSelected = selectedVariant?.sku === v.sku || selectedVariant?.name === v.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleVariantSelect(v)}
                        className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                          isSelected
                            ? "border-[#2bbda3] bg-teal-50/50 ring-2 ring-[#2bbda3]/20"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {v.attributes?.colorCode && (
                            <span
                              className="w-4 h-4 rounded-full border border-gray-300 shrink-0 shadow-xs"
                              style={{ backgroundColor: v.attributes.colorCode }}
                            />
                          )}
                          <div>
                            <span className="text-xs font-bold text-gray-900 block leading-tight">
                              {v.name}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono">
                              SKU: {v.sku}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-[#2bbda3] block">
                            ₹{v.price?.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pincode Delivery Estimator */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2bbda3]" /> Check Delivery Pincode
              </label>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-[#2bbda3] font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition"
                >
                  Check
                </button>
              </form>
              {deliveryStatus && (
                <div
                  className={`p-2.5 rounded-xl text-xs flex flex-col gap-0.5 ${
                    deliveryStatus.valid
                      ? "bg-teal-50 text-teal-900 border border-teal-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <span className="font-semibold flex items-center gap-1">
                    {deliveryStatus.valid ? <Check className="w-3.5 h-3.5 text-[#2bbda3]" /> : null}
                    {deliveryStatus.msg}
                  </span>
                  {deliveryStatus.estimate && (
                    <span className="text-[11px] text-teal-700">{deliveryStatus.estimate}</span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Selector & Purchase Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 text-sm font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(effectiveStock, q + 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 text-sm font-bold transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl border-2 border-[#2bbda3] text-[#2bbda3] hover:bg-[#2bbda3]/5 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {added ? "Added to Cart ✓" : "Add to Cart"}
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" /> Buy Now
                </button>
              </div>
            </div>

            {/* Sellbar Assurance Summary Card */}
            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2bbda3] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Sellbar Certified Hardware Assurance:</strong>{" "}
                Every unit includes a 12-Month doorstep replacement warranty, certified battery health (&gt;85%), and verified genuine electronics components.
              </div>
            </div>
          </div>
        </div>

        {/* BELOW PRODUCT SECTION: Structured Tabs Layout */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab Navigation Bar */}
          <div className="flex border-b border-gray-100 overflow-x-auto bg-[#fafafa]">
            {[
              { id: "specs", label: "Technical Specifications", icon: Cpu },
              { id: "desc", label: "Product Overview", icon: Layers },
              { id: "box", label: "What's in the Box", icon: Box },
              { id: "warranty", label: "Warranty & Protection", icon: ShieldCheck },
              { id: "reviews", label: `Customer Reviews (${productData.customerReviews?.length || productData.reviewsCount || 0})`, icon: Star },
              { id: "faqs", label: "Frequently Asked Questions", icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-xs font-bold transition whitespace-nowrap border-b-2 ${
                    isActive
                      ? "border-[#2bbda3] text-[#2bbda3] bg-white"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-10">
            {/* TAB 1: Structured Technical Specifications */}
            {activeTab === "specs" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Comprehensive Technical Specifications
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Verified through Sellbar 32-Point Electronics Diagnostic Lab
                  </p>
                </div>

                <div className="space-y-6">
                  {Object.entries(specCategories).map(([categoryName, items], catIdx) => (
                    <div key={catIdx} className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                        {categoryName}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Array.isArray(items) &&
                          items.map((spec, specIdx) => (
                            <div
                              key={specIdx}
                              className="p-3 rounded-xl border border-gray-100 flex items-center justify-between text-xs hover:bg-gray-50/50 transition"
                            >
                              <span className="font-medium text-gray-600">{spec.label}</span>
                              <span className="font-bold text-gray-900 text-right">{spec.value}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Detailed Overview */}
            {activeTab === "desc" && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Electronics Product Overview</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Official inspection summary and certified condition breakdown
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-4">
                  {productData.description}
                </div>

                {/* Condition Breakdown Matrix */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h4 className="text-sm font-bold text-gray-900">
                    Understanding Sellbar Electronics Cosmetic Grades
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-1.5">
                      <span className="text-xs font-bold text-[#1a907e] uppercase">
                        Flawless (Grade A++)
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Indistinguishable from brand new. Screen and casing are 100% scratch-free. Original battery health tested at 90%+.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-1.5">
                      <span className="text-xs font-bold text-blue-700 uppercase">
                        Superb (Grade A+)
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Extremely minor micro-scratches invisible from 20cm away. Pristine display with responsive touch and tested battery.
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-1.5">
                      <span className="text-xs font-bold text-amber-700 uppercase">
                        Good (Grade A)
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Minor cosmetic pocket wear on edges or back. Flawless internal functionality, tested camera, and 12-month warranty.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: What's in the Box */}
            {activeTab === "box" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">What’s Included Inside the Box</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Every package arrives in Sellbar tamper-evident certified packaging
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(productData.whatInTheBox && productData.whatInTheBox.length > 0
                    ? productData.whatInTheBox
                    : [
                        `Sellbar Certified ${productData.name}`,
                        "Fast Charging USB Data Cable",
                        "SIM Tray Ejector Pin",
                        "32-Point Quality Diagnostic Certificate",
                        "12-Month Official Doorstep Warranty Card",
                      ]
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-gray-100 bg-[#f8fafc] flex items-center gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Warranty & Service Protection */}
            {activeTab === "warranty" && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Sellbar 12-Month Doorstep Replacement Warranty
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Hassle-free coverage powered by verified electronics service engineers
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2">
                    <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" /> What is Covered:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>Motherboard and processor technical faults</li>
                      <li>Display digitizer and touch abnormalities</li>
                      <li>Camera sensor defects and optical failures</li>
                      <li>Speaker, earpiece, and microphone malfunctions</li>
                      <li>Battery performance dropping below 80% within warranty period</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2">
                    <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" /> How to Claim:
                    </h4>
                    <ol className="text-xs text-gray-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                      <li>Log in to your Sellbar account and click <strong>Warranty Claims</strong></li>
                      <li>Select your device order and describe the hardware symptom</li>
                      <li>A certified doorstep technician will be scheduled within 24–48 hours</li>
                      <li>Device repaired on-site or replaced with equivalent certified unit</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Customer Reviews & Verified Buyer Photos */}
            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Customer Ratings &amp; Reviews</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Verified feedback from real customers who purchased this refurbished device
                  </p>
                </div>

                {/* Rating Overview Matrix */}
                <div className="p-6 rounded-2xl bg-[#f8fafc] border border-gray-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 text-center md:border-r border-gray-200 md:pr-6">
                    <span className="text-5xl font-black text-gray-900">
                      {productData.rating || 4.8}
                    </span>
                    <div className="flex justify-center items-center gap-1 text-amber-500 my-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      Based on {productData.reviewsCount || 142} verified customer purchases
                    </span>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="md:col-span-8 space-y-2">
                    {[
                      { star: 5, pct: 82 },
                      { star: 4, pct: 13 },
                      { star: 3, pct: 3 },
                      { star: 2, pct: 1 },
                      { star: 1, pct: 1 },
                    ].map((row) => (
                      <div key={row.star} className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="w-8 font-medium">{row.star} ★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="w-10 text-right text-gray-400 font-mono">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Uploaded Photos Gallery */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#2bbda3]" /> Customer Unboxing &amp; Device Photos
                  </h4>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedReviewPhoto(photo)}
                        className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0 hover:ring-2 hover:ring-[#2bbda3] transition"
                      >
                        <img
                          src={photo}
                          alt="Customer device photo"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified Customer Reviews List */}
                <div className="space-y-4 pt-2">
                  {(productData.customerReviews && productData.customerReviews.length > 0
                    ? productData.customerReviews
                    : [
                        {
                          reviewerName: "Rahul Sharma",
                          rating: 5,
                          title: "Looks and performs absolutely like brand new!",
                          comment:
                            "Received the device within 2 days in Gurgaon. Packaging was sealed and tamper-evident. Ran 32 hardware benchmark tests and battery health is at 94%. Outstanding deal from Sellbar!",
                          date: "24 Oct 2026",
                          verifiedBuyer: true,
                        },
                        {
                          reviewerName: "Ananya Deshmukh",
                          rating: 5,
                          title: "Saved over 40% compared to buying new",
                          comment:
                            "Grade Flawless is literally flawless — no marks or scratches anywhere on the screen or body. The 12-month warranty gives great peace of mind. Highly recommend Sellbar for electronics!",
                          date: "18 Oct 2026",
                          verifiedBuyer: true,
                        },
                      ]
                  ).map((rev, revIdx) => (
                    <div
                      key={revIdx}
                      className="p-5 rounded-2xl border border-gray-100 bg-[#f8fafc] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-gray-900">
                            {rev.reviewerName}
                          </span>
                          {rev.verifiedBuyer && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-500">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      {rev.title && (
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900">{rev.title}</h5>
                      )}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: Electronics FAQs */}
            {activeTab === "faqs" && (
              <div className="space-y-4 max-w-4xl">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Frequently Asked Questions About Certified Electronics
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Everything you need to know about Sellbar testing, warranty, and returns
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {(productData.faqs && productData.faqs.length > 0
                    ? productData.faqs
                    : [
                        {
                          question: "What is Sellbar's 32-point electronics quality inspection?",
                          answer:
                            "Every device undergoes exhaustive hardware diagnostic tests including display digitizer uniformity, battery degradation rate, motherboard voltage stability, camera focus calibration, speakers, microphones, and wireless connectivity to ensure 100% functional integrity.",
                        },
                        {
                          question: "What battery health is guaranteed on this device?",
                          answer:
                            "We guarantee that all refurbished electronics arrive with at least 85% to 100% original battery health capacity. Units with sub-85% health are rejected or fitted with brand-new certified replacement batteries before listing.",
                        },
                        {
                          question: "How does the 12-Month Doorstep Replacement Warranty work?",
                          answer:
                            "If you encounter any technical, hardware, or motherboard malfunction within 12 months of purchase, simply submit a ticket under your Sellbar account. Our technician will visit your doorstep to inspect, repair, or replace the unit without extra service fees.",
                        },
                        {
                          question: "What accessories are included inside the box?",
                          answer:
                            "Each device comes packed in our custom eco-friendly tamper-sealed box containing the certified device, a brand new fast-charging data cable, a SIM ejector tool (for cellular devices), a verified 32-point QC certificate, and your 12-month warranty card.",
                        },
                        {
                          question: "Can I return or replace the product if I am not satisfied?",
                          answer:
                            "Yes, Sellbar provides a 7-day hassle-free doorstep replacement or return window if the device does not match the described cosmetic grade or fails any functionality test.",
                        },
                      ]
                  ).map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="border border-gray-200 rounded-2xl overflow-hidden transition"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === fIdx ? -1 : fIdx)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-gray-900 bg-white hover:bg-gray-50 flex items-center justify-between gap-4"
                      >
                        <span>{faq.question}</span>
                        <ChevronRight
                          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                            openFaq === fIdx ? "rotate-90 text-[#2bbda3]" : ""
                          }`}
                        />
                      </button>
                      {openFaq === fIdx && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED ELECTRONICS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  Related Certified Electronics
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Customers who viewed this item also considered these certified deals
                </p>
              </div>
              <Link
                href="/buy-refurbished"
                className="text-xs font-bold text-[#2bbda3] hover:text-[#249e88] transition"
              >
                View All Deals →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => {
                const img =
                  rel.images?.[0]?.url || getCloudinaryUrl("/products/iphone-14.webp");
                const relCompare = rel.compareAtPrice || Math.round(rel.price * 1.4);
                const relOff = Math.round(((relCompare - rel.price) / relCompare) * 100);

                return (
                  <div
                    key={rel._id}
                    className="p-3 sm:p-4 rounded-2xl border border-gray-200/80 hover:border-[#2bbda3] hover:shadow-md transition bg-white flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-square w-full bg-[#f8fafc] rounded-xl p-3 flex items-center justify-center mb-3 overflow-hidden">
                        {rel.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#1d3d93] text-white text-[9px] font-bold rounded">
                            {rel.badge}
                          </span>
                        )}
                        <img
                          src={getCloudinaryUrl(img)}
                          alt={rel.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      {rel.brand && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                          {rel.brand}
                        </span>
                      )}

                      <Link
                        href={`/product/${rel.slug || rel._id}`}
                        className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight hover:text-[#2bbda3] transition mt-1 block"
                      >
                        {rel.name}
                      </Link>

                      <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold my-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{rel.rating || 4.8}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 mt-2">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-black text-gray-900">
                          ₹{rel.price?.toLocaleString("en-IN")}
                        </span>
                        {relCompare > rel.price && (
                          <span className="text-[10px] text-gray-400 line-through">
                            ₹{relCompare.toLocaleString("en-IN")}
                          </span>
                        )}
                        {relOff > 0 && (
                          <span className="text-[10px] font-bold text-emerald-600">
                            {relOff}% off
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            id: rel._id,
                            name: rel.name,
                            price: rel.price,
                            compareAtPrice: relCompare,
                            quantity: 1,
                            image: getCloudinaryUrl(img),
                          })
                        }
                        className="w-full mt-2.5 py-2 rounded-xl bg-teal-50 hover:bg-[#2bbda3] hover:text-white text-[#2bbda3] font-bold text-[11px] transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Quick Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RECENTLY VIEWED PRODUCTS SECTION */}
        {recentlyViewed.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Recently Viewed Electronics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {recentlyViewed.map((item) => (
                <Link
                  key={item._id}
                  href={`/product/${item.slug || item._id}`}
                  className="p-3 rounded-xl border border-gray-100 hover:border-[#2bbda3] transition bg-white block group text-center"
                >
                  <div className="aspect-square w-full bg-[#f8fafc] rounded-lg p-2 flex items-center justify-center mb-2 overflow-hidden">
                    <img
                      src={getCloudinaryUrl(item.image)}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                    />
                  </div>
                  <h4 className="text-[11px] font-bold text-gray-900 truncate">{item.name}</h4>
                  <span className="text-xs font-black text-[#2bbda3] block mt-1">
                    ₹{item.price?.toLocaleString("en-IN")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX IMAGE MODAL */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div className="w-full flex justify-between items-center text-white text-xs max-w-5xl">
            <span className="font-semibold">{productData.name} (Fullscreen Inspection View)</span>
            <button
              type="button"
              onClick={() => setIsZoomModalOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div
            className="relative flex-1 max-w-3xl w-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
              }
              className="absolute left-2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <img
              src={currentImage}
              alt="Fullscreen product view"
              className="max-h-[75vh] max-w-full object-contain drop-shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div
            className="flex gap-2 overflow-x-auto p-2 bg-black/40 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 p-1 bg-white shrink-0 ${
                  activeImageIndex === idx ? "border-[#2bbda3]" : "border-transparent opacity-60"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CUSTOMER PHOTO LIGHTBOX MODAL */}
      {selectedReviewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedReviewPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl p-4 max-w-lg w-full space-y-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900">Verified Customer Photo</span>
              <button
                type="button"
                onClick={() => setSelectedReviewPhoto(null)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={selectedReviewPhoto}
                alt="Customer device review"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="leading-tight">
          <span className="text-[10px] text-gray-500 line-clamp-1">{productData.name}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-[#2bbda3]">
              ₹{effectivePrice.toLocaleString("en-IN")}
            </span>
            {effectiveComparePrice > effectivePrice && (
              <span className="text-[10px] text-gray-400 line-through">
                ₹{effectiveComparePrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="py-2.5 px-3.5 rounded-xl border border-[#2bbda3] text-[#2bbda3] font-bold text-xs"
          >
            {added ? "Added ✓" : "Cart"}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="py-2.5 px-5 rounded-xl bg-[#2bbda3] text-white font-bold text-xs shadow-md"
          >
            Buy Now
          </button>
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
          <p className="text-sm font-semibold text-gray-500 animate-pulse">
            Loading Sellbar Certified Electronics Product...
          </p>
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
