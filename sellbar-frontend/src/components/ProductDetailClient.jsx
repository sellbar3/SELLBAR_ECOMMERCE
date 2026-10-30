'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Truck, RotateCcw, Zap, ShoppingCart, Check, Star, CheckCircle2, ChevronRight, CreditCard, Layers, Box, Rotate3d, Sliders, CheckCheck } from 'lucide-react';
import { addToCart } from '@/lib/cart';
import { lookupPincode } from '@/lib/pincodes';
import RefurbishedProductCard from '@/components/RefurbishedProductCard';
import FoldText from '@/components/FoldText';
// Dynamically import ModelViewer with SSR disabled for Three.js / WebGL compatibility
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
    loading: () => (<div className="w-full h-full min-h-95 flex flex-col items-center justify-center text-slate-400 gap-3 bg-slate-950/60 rounded-3xl">
      <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"/>
      <span className="text-xs font-semibold tracking-wide">Loading 3D interactive model...</span>
    </div>),
});
export default function ProductDetailClient({ product, related }) {
    const router = useRouter();
    // Gallery state: '3d' or image index (number)
    const [activeMedia, setActiveMedia] = useState('3d');
    const [selectedStorage, setSelectedStorage] = useState(product.storage || '128GB');
    const [selectedGrade, setSelectedGrade] = useState(product.conditionGrade || 'FLAWLESS');
    const [selectedColor, setSelectedColor] = useState(product.color || 'Space Black');
    const [autoRotate3D, setAutoRotate3D] = useState(true);
    const [added, setAdded] = useState(false);
    // Pincode speed checker
    const [pincode, setPincode] = useState('845438');
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    useEffect(() => {
        if (pincode.length === 6) {
            setDeliveryInfo(lookupPincode(pincode));
        }
    }, [pincode]);
    // Calculate pricing based on storage fit offset
    const storageOffset = selectedStorage === '512GB' ? 14000 : selectedStorage === '256GB' ? 6500 : selectedStorage === '1TB' ? 22000 : 0;
    const gradeDiscount = selectedGrade === 'LIKE_NEW' ? 4000 : selectedGrade === 'SMART_VALUE' ? 8500 : 0;
    const currentSellbarPrice = Math.max(1000, product.sellbarPrice + storageOffset - gradeDiscount);
    const currentMrpPrice = product.mrpPrice + storageOffset;
    const discountPercent = Math.round(((currentMrpPrice - currentSellbarPrice) / currentMrpPrice) * 100);
    const savingsAmount = currentMrpPrice - currentSellbarPrice;
    const emiMonthly = Math.round(currentSellbarPrice / 24);
    const model3dUrl = product.model3dUrl || '/assets/3d/smartphone.glb';
    const availableStorages = product.availableStorages || ['128GB', '256GB', '512GB'];
    const colorsList = product.colors || [product.color || 'Space Black', 'Natural Titanium', 'Deep Blue'];
    const handleAddToCart = () => {
        addToCart({
            ...product,
            sellbarPrice: currentSellbarPrice,
            storage: selectedStorage,
            conditionGrade: selectedGrade,
            color: selectedColor
        }, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2200);
    };
    const handleBuyNow = () => {
        addToCart({
            ...product,
            sellbarPrice: currentSellbarPrice,
            storage: selectedStorage,
            conditionGrade: selectedGrade,
            color: selectedColor
        }, 1);
        router.push('/checkout');
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600"/>
        <Link href="/buy-refurbished" className="hover:text-white transition">Refurbished</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600"/>
        <span className="text-white font-medium line-clamp-1">{product.title}</span>
      </div>

      {/* Main Grid: Ecommerce 1 Layout (Interactive 3D Stage + Buy Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Visual Showcase & ModelViewer */}
        <div className="lg:col-span-7 space-y-5">
          <div className="relative bg-linear-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 min-h-115 flex items-center justify-center">
            
            {/* Top Bar Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5"/>
                <span>{selectedGrade === 'FLAWLESS' ? 'Flawless Grade A+' : selectedGrade === 'LIKE_NEW' ? 'Like New Grade A' : 'Smart Value'}</span>
              </span>

              {activeMedia === '3d' && (<span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md animate-pulse">
                  <Rotate3d className="w-3.5 h-3.5"/>
                  <span>360° Interactive 3D</span>
                </span>)}
            </div>

            {/* Quick 3D Control Pill */}
            {activeMedia === '3d' && (<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button type="button" onClick={() => setAutoRotate3D(!autoRotate3D)} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition backdrop-blur-md flex items-center gap-1.5 ${autoRotate3D
                ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800/60 text-slate-400 border-slate-700'}`} title="Toggle Auto Rotation">
                  <RotateCcw className={`w-3 h-3 ${autoRotate3D ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}/>
                  <span>{autoRotate3D ? 'Auto-Turn ON' : 'Paused'}</span>
                </button>
              </div>)}

            {/* Main Stage: 3D ModelViewer OR 2D Photo */}
            <div className="w-full h-105 sm:h-115 flex items-center justify-center relative">
              {activeMedia === '3d' ? (<div className="w-full h-full flex items-center justify-center relative">
                  <ModelViewer url={model3dUrl} width="100%" height="100%" environment="studio" environmentIntensity={1.2} exposure={1} autoRotate={autoRotate3D} autoRotateSpeed={0.5} dragRotate={true} turntable={false} zoom={true} shadow={true} shadowOpacity={0.45} hoverTilt={0.12} fit={0.82} className="w-full h-full"/>
                  {/* Gentle helper overlay on bottom */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none bg-slate-950/70 border border-slate-800 backdrop-blur-md text-slate-400 text-[11px] px-3 py-1 rounded-full flex items-center gap-2">
                    <Rotate3d className="w-3.5 h-3.5 text-emerald-400"/>
                    <span>Drag to rotate • Pinch / Ctrl+Scroll to zoom</span>
                  </div>
                </div>) : (<img src={product.images[activeMedia] || product.images[0]} alt={product.title} className="max-h-95 max-w-full object-contain drop-shadow-2xl transition duration-300"/>)}
            </div>
          </div>

          {/* Interactive Thumbnails Rail (Photos + 3D View option) */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 3D Model Thumbnail */}
            <button type="button" onClick={() => setActiveMedia('3d')} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition group ${activeMedia === '3d'
            ? 'bg-indigo-500/15 border-indigo-400 text-white shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-400/30'
            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'}`}>
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Box className="w-4 h-4 group-hover:rotate-12 transition"/>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold leading-tight">3D Model</div>
                <div className="text-[10px] text-indigo-400 font-semibold leading-none">360° View</div>
              </div>
            </button>

            {/* Standard 2D Image Thumbnails */}
            {product.images && product.images.map((img, i) => (<button key={i} type="button" onClick={() => setActiveMedia(i)} className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border p-2 flex items-center justify-center transition overflow-hidden ${activeMedia === i
                ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg'
                : 'border-slate-800 hover:border-slate-700'}`}>
                <img src={img} alt={`Angle ${i + 1}`} className="max-h-12 max-w-full object-contain"/>
              </button>))}
          </div>

          {/* 32-Point Quality Diagnostic Certificate Card */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
                <span>Sellbar 32-Point Certified Diagnostic Certificate</span>
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                100% Passed
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0"/>
                <span>Original Battery ({product.batteryHealth}% Tested Health)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0"/>
                <span>OLED Screen & 120Hz Touch Digitizer</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0"/>
                <span>Biometric / Face ID Sensor</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800/60">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0"/>
                <span>Motherboard & Thermal Stress Bench</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: React Bits "Ecommerce 1" Buy Box, Fit Toggles & Specs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & FoldText Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                {product.brandName} Certified
              </span>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400"/>
                <span className="font-bold text-white">{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* FoldText Animated Headline */}
            <div className="pt-1">
              <FoldText text={product.title} foldStyle="paper" splitBy="word" hinge="top" trigger="mount" duration={0.65} stagger={0.04} foldAngle={90} fontSize="clamp(1.5rem, 3vw, 2.1rem)" fontWeight={900} color="#ffffff" className="leading-tight"/>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-black text-white">
                ₹{currentSellbarPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-slate-500 line-through">
                MRP ₹{currentMrpPrice.toLocaleString('en-IN')}
              </span>
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-extrabold px-2.5 py-0.5 rounded-lg">
                Save ₹{savingsAmount.toLocaleString('en-IN')} ({discountPercent}% OFF)
              </span>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
              <CreditCard className="w-4 h-4 text-emerald-400 shrink-0"/>
              <span>
                No Cost EMI available from <strong className="text-white">₹{emiMonthly.toLocaleString('en-IN')}/mo</strong> on major credit cards & Bajaj Finserv.
              </span>
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              <span className="text-emerald-400 font-bold">
                In Stock ({product.stockCount} units ready for immediate insured dispatch)
              </span>
            </div>

            {/* Ecommerce 1 Block: Fit / Storage Variant Toggle */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400"/>
                  <span>Storage / Fit Variant</span>
                </span>
                <span className="text-slate-400 text-[11px]">Selected: {selectedStorage}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {availableStorages.map((storage) => (<button key={storage} type="button" onClick={() => setSelectedStorage(storage)} className={`py-2 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center border ${selectedStorage === storage
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'}`}>
                    <span>{storage}</span>
                  </button>))}
              </div>
            </div>

            {/* Condition Grade Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400"/>
                  <span>Condition Grade</span>
                </span>
                <span className="text-emerald-400 text-[11px] font-semibold">12-Mo Warranty</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button type="button" onClick={() => setSelectedGrade('FLAWLESS')} className={`py-2 px-2 rounded-xl text-xs font-bold transition border text-center ${selectedGrade === 'FLAWLESS'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'}`}>
                  Flawless A+
                </button>
                <button type="button" onClick={() => setSelectedGrade('LIKE_NEW')} className={`py-2 px-2 rounded-xl text-xs font-bold transition border text-center ${selectedGrade === 'LIKE_NEW'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'}`}>
                  Like New A
                </button>
                <button type="button" onClick={() => setSelectedGrade('SMART_VALUE')} className={`py-2 px-2 rounded-xl text-xs font-bold transition border text-center ${selectedGrade === 'SMART_VALUE'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'}`}>
                  Smart Value
                </button>
              </div>
            </div>

            {/* Color Finish Swatches */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Color Finish</span>
                <span className="text-slate-400 text-[11px]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {colorsList.map((col) => (<button key={col} type="button" onClick={() => setSelectedColor(col)} className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${selectedColor === col
                ? 'bg-slate-800 text-white border-emerald-400 ring-2 ring-emerald-500/20'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'}`}>
                    {col}
                  </button>))}
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <button type="button" onClick={handleAddToCart} className={`py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${added
            ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20'
            : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700'}`}>
                {added ? (<>
                    <Check className="w-4 h-4"/> Added to Cart!
                  </>) : (<>
                    <ShoppingCart className="w-4 h-4"/> Add to Cart
                  </>)}
              </button>

              <button type="button" onClick={handleBuyNow} className="py-3.5 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition hover:scale-[1.02] active:scale-[0.98]">
                <Zap className="w-4 h-4"/>
                <span>Buy Now (Instant)</span>
              </button>
            </div>
          </div>

          {/* Delivery & Pincode Speed Checker */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400"/> Delivery Speed & Pincode
              </span>
              <span className="text-[11px] text-slate-400">Doorstep Insured</span>
            </div>

            <div className="flex gap-2">
              <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Enter 6-digit PIN code" maxLength={6} className="flex-1 bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"/>
              <button type="button" className="py-2 px-4 bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold rounded-xl transition">
                Check
              </button>
            </div>

            {deliveryInfo && (
              <div className="text-xs space-y-1 pt-1">
                {deliveryInfo.isServiceable ? (
                  <>
                    <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400"/>
                      <span>
                        Serviceable in {deliveryInfo.city}, West Champaran ({deliveryInfo.state})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Estimated Delivery: <strong>24 - 48 Hours</strong> with Free Doorstep Verification & COD.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-rose-400 font-bold flex items-center gap-1.5">
                      <span>Delivery Not Available for PIN {pincode}</span>
                    </div>
                    <p className="text-[11px] text-rose-300/80">
                      Sellbar currently delivers exclusively to West Champaran (Bihar).
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400"/> Certified Specifications
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-850 text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (<div key={key} className="grid grid-cols-3 p-3">
                  <span className="text-slate-400 font-medium">{key}</span>
                  <span className="col-span-2 text-white font-semibold">{val}</span>
                </div>))}
            </div>
          </div>
        </div>

      </div>

      {/* Related Products with FoldText Section Title */}
      {related.length > 0 && (<div className="space-y-6 pt-10 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <FoldText text="Similar Refurbished Deals" foldStyle="paper" splitBy="word" hinge="top" trigger="scroll" duration={0.6} stagger={0.03} fontSize="1.6rem" fontWeight={800} color="#ffffff"/>
              <p className="text-xs text-slate-400">Verified Grade A+ refurbished devices with same-day dispatch</p>
            </div>
            <Link href="/buy-refurbished" className="text-xs font-bold text-emerald-400 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (<RefurbishedProductCard key={p.id} product={p}/>))}
          </div>
        </div>)}
    </div>);
}
