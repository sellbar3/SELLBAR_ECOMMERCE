'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
    loading: () => (<div className="w-full h-full min-h-90 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl gap-3">
      <div className="w-8 h-8 border-3 border-[#13b59b] border-t-transparent rounded-full animate-spin"/>
      <span className="text-xs font-semibold text-gray-500">Loading 3D Studio...</span>
    </div>),
});
import AnimatedContent from '@/components/AnimatedContent';
import LogoLoop from '@/components/LogoLoop';
import Counter from '@/components/Counter';
import { ShieldCheck, Truck, RotateCcw, Zap, ShoppingCart, Check, Star, CheckCircle2, ChevronRight, ChevronDown, ChevronUp, CreditCard, Layers, Rotate3d, Heart, Share2, HelpCircle, ThumbsUp, MapPin, Sparkles, Award, Smartphone, X, } from 'lucide-react';
import { addToCart } from '@/lib/cart';
import { lookupPincode } from '@/lib/pincodes';
const certifiedPartners = [
    {
        node: <ShieldCheck className="w-4 h-4 text-[#13b59b]"/>,
        title: '32-Step Quality Lab',
        hoverColor: '#13b59b',
    },
    {
        node: <Award className="w-4 h-4 text-amber-500"/>,
        title: 'BIS Certified Refurbished',
        hoverColor: '#f59e0b',
    },
    {
        node: <Truck className="w-4 h-4 text-indigo-500"/>,
        title: 'Bluedart & Delhivery Express',
        hoverColor: '#6366f1',
    },
    {
        node: <CreditCard className="w-4 h-4 text-sky-500"/>,
        title: '256-Bit Razorpay Protected',
        hoverColor: '#0ea5e9',
    },
    {
        node: <RotateCcw className="w-4 h-4 text-emerald-500"/>,
        title: '15-Day Instant Replacement',
        hoverColor: '#10b981',
    },
    {
        node: <Sparkles className="w-4 h-4 text-violet-500"/>,
        title: '100% Genuine OEM Parts',
        hoverColor: '#8b5cf6',
    },
    {
        node: <CheckCircle2 className="w-4 h-4 text-teal-600"/>,
        title: 'Battery Health >85% Tested',
        hoverColor: '#0d9488',
    },
];
export default function CashifyStylePDP({ product, related }) {
    const router = useRouter();
    // Active image index & 3D viewer mode (defaults to 3D interactive view)
    const [activeImgIdx, setActiveImgIdx] = useState(0);
    const [viewMode, setViewMode] = useState('3d');
    const [autoRotate3D, setAutoRotate3D] = useState(true);
    const model3dUrl = product.model3dUrl || (product.categoryId === 'cat-accessories' ? '/assets/3d/sneaker.glb' : '/assets/3d/smartphone.glb');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    // Variant selections
    const [condition, setCondition] = useState('Superb');
    const [selectedStorage, setSelectedStorage] = useState(product.availableStorages && product.availableStorages.length > 0
        ? product.availableStorages[0]
        : `${product.ram || '12 GB RAM'} / ${product.storage || '256 GB'}`);
    const [selectedColor, setSelectedColor] = useState(product.color || 'Cocoa Brown');
    const [extendedWarranty, setExtendedWarranty] = useState(false);
    const [includeCombo, setIncludeCombo] = useState(false);
    // Modals
    const [gradeModalOpen, setGradeModalOpen] = useState(false);
    const [emiModalOpen, setEmiModalOpen] = useState(false);
    const [activeGradeTab, setActiveGradeTab] = useState('Superb');
    // FAQ Accordion open states
    const [openFaq, setOpenFaq] = useState(0);
    // Cart animation toast
    const [addedToast, setAddedToast] = useState(false);
    // Pincode speed checker
    const [pincode, setPincode] = useState('122001');
    const [pincodeChecked, setPincodeChecked] = useState(true);
    const [deliveryData, setDeliveryData] = useState(null);
    useEffect(() => {
        if (pincode.length === 6) {
            setDeliveryData(lookupPincode(pincode));
        }
    }, [pincode]);
    // Pricing calculations based on variant choices
    const conditionDelta = condition === 'Superb' ? 0 : condition === 'Good' ? -3500 : -7000;
    const storageDelta = selectedStorage.includes('512') ? 5500 : selectedStorage.includes('1TB') ? 12000 : 0;
    const warrantyPrice = 2299;
    const comboPriceOffset = 559; // ₹699 - ₹140 combo discount
    const baseSalePrice = Math.max(1000, product.sellbarPrice + conditionDelta + storageDelta);
    const baseMrpPrice = product.mrpPrice + storageDelta;
    const effectivePrice = baseSalePrice + (extendedWarranty ? warrantyPrice : 0) + (includeCombo ? comboPriceOffset : 0);
    const discountPercent = Math.round(((baseMrpPrice - baseSalePrice) / baseMrpPrice) * 100);
    const emiPerMonth = Math.round(effectivePrice / 12);
    // Color options
    const colorOptions = product.colors || [
        'Cocoa Brown',
        'Sunset Gold',
        'Starlight Black',
    ];
    const storageOptions = product.availableStorages || [
        '12 GB RAM / 256 GB',
        '12 GB RAM / 512 GB',
    ];
    // Images list
    const images = product.images && product.images.length > 0
        ? product.images
        : [
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
        ];
    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard?.writeText(window.location.href);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2500);
        }
    };
    const handleAddToCart = (withCombo = false) => {
        addToCart({
            ...product,
            sellbarPrice: baseSalePrice,
            color: selectedColor,
            storage: selectedStorage,
            conditionGrade: condition === 'Superb' ? 'FLAWLESS' : condition === 'Good' ? 'LIKE_NEW' : 'SMART_VALUE',
            warrantyMonths: extendedWarranty ? 12 : 6,
        }, 1);
        if (withCombo || includeCombo) {
            // add compatible fast charger
            addToCart({
                id: 'combo-charger-65w',
                slug: 'sellbar-compatible-65w-fast-charger',
                title: 'Sellbar 65W SuperVOOC Fast Charging Adapter',
                categoryId: 'cat-accessories',
                categoryName: 'Accessories',
                brandId: 'b-sellbar',
                brandName: 'Sellbar Care',
                mrpPrice: 1999,
                sellbarPrice: 559,
                stockCount: 50,
                conditionGrade: 'FLAWLESS',
                batteryHealth: 100,
                color: 'White',
                storage: '65W USB-C',
                warrantyMonths: 12,
                inspectionScore: 32,
                images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80'],
                specifications: { 'Output': '65W Max', 'Connector': 'Type-C' },
                description: 'Official Grade Certified 65W Rapid Charger with surge protection.',
                isFeatured: false,
                isActive: true,
                rating: 4.8,
                reviewsCount: 310,
                createdAt: new Date().toISOString(),
            }, 1);
        }
        setAddedToast(true);
        setTimeout(() => setAddedToast(false), 2500);
    };
    const handleBuyNow = () => {
        handleAddToCart(includeCombo);
        router.push('/checkout');
    };
    // Grade specifics
    const gradeSpecs = {
        Superb: {
            tag: 'Best Value',
            overall: 'No Functional Defects. 100% genuine components tested.',
            glass: 'Minimal scratches that are barely noticeable only when the screen is off.',
            display: 'Perfect condition with zero dead pixels, vibrant contrast & 120Hz smooth touch.',
            body: 'Minor signs of wear and light micro-scratches invisible from a 20 cm distance.',
        },
        Good: {
            tag: 'Popular Choice',
            overall: 'No Functional Defects. All features, sensors & biometric unlock 100% operational.',
            glass: 'Few fine micro-scratches visible when looking closely under direct light.',
            display: 'Crisp, clear, fully tested display with zero touch latency.',
            body: 'Moderate scratches or minor scuffs on the back panel/edges. Completely covered by a phone case.',
        },
        Fair: {
            tag: 'Maximum Savings',
            overall: 'No Functional Defects. Rigorous 32-point diagnostics passed.',
            glass: 'Noticeable surface scratches on screen glass that do not affect display readability.',
            display: '100% operational touch & colors. No cracks, lines or dark spots.',
            body: 'Visible scratches, scuffs or slight paint wear on metal edges/corners.',
        },
    };
    return (<div className="bg-[#f7f9fa] min-h-screen text-gray-800 font-sans pb-16">
      {/* Toast Notification */}
      {addedToast && (<div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#13b59b]"/>
          <div>
            <div className="text-sm font-bold">Added to Cart!</div>
            <div className="text-xs text-gray-300">Item successfully added to your shopping bag.</div>
          </div>
          <Link href="/cart" className="ml-2 text-xs font-bold text-[#13b59b] hover:underline">
            View Bag &rarr;
          </Link>
        </div>)}

      {copiedLink && (<div className="fixed top-20 right-6 z-50 bg-[#13b59b] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg">
          Product Link Copied to Clipboard!
        </div>)}

      {/* ========================================================= */}
      {/* 1. BREADCRUMBS                                            */}
      {/* ========================================================= */}
      {/* 1. BREADCRUMBS                                            */}
      {/* ========================================================= */}
      {(() => {
            const isLaptop = product.categoryId === 'cat-laptops';
            const isTablet = product.categoryId === 'cat-tablets';
            const isWatch = product.categoryId === 'cat-smartwatches';
            const catHref = isLaptop
                ? '/buy-refurbished-laptops'
                : isTablet
                    ? '/buy-refurbished-tablets'
                    : isWatch
                        ? '/buy-refurbished-smart-watches'
                        : '/buy-refurbished-mobile-phones';
            const catTitle = isLaptop
                ? 'Buy Refurbished Laptops'
                : isTablet
                    ? 'Buy Refurbished Tablets'
                    : isWatch
                        ? 'Buy Refurbished Smart Watches'
                        : 'Buy Refurbished Mobile Phones';
            const brandHref = `${catHref}?brand=${(product.brandName || '').toLowerCase()}`;
            return (<div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <nav className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                <Link href={catHref} className="hover:text-[#13b59b] transition">
                  {catTitle}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                <Link href={brandHref} className="hover:text-[#13b59b] transition">
                  {product.brandName}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
              </nav>
            </div>
          </div>);
        })()}

      {/* ========================================================= */}
      {/* 2. MAIN PRODUCT SECTION: Left Gallery + Right Buy Box     */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* LEFT COLUMN: Gallery & Highlights (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col">
              
              <div className="flex flex-col-reverse sm:flex-row gap-4 items-start">
                
                {/* Thumbnails vertical strip with 3D Interactive first */}
                <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 w-full sm:w-20">
                  {/* 3D 360° Studio Thumbnail Button */}
                  <button type="button" onClick={() => setViewMode('3d')} className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition p-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer ${viewMode === '3d'
            ? 'border-[#13b59b] bg-teal-50/70 text-[#13b59b] shadow-xs ring-2 ring-[#13b59b]/20'
            : 'border-gray-200 bg-white hover:border-gray-400 text-gray-600'}`} title="Interactive 3D 360° View">
                    <div className={`p-1.5 rounded-lg ${viewMode === '3d' ? 'bg-[#13b59b] text-white shadow-xs' : 'bg-gray-100 text-gray-600'}`}>
                      <Rotate3d className={`w-4 h-4 ${viewMode === '3d' && autoRotate3D ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}/>
                    </div>
                    <span className="text-[10px] font-bold tracking-tight uppercase leading-none">3D View</span>
                  </button>

                  {/* Standard Photo Thumbnails */}
                  {images.map((img, idx) => (<button key={idx} type="button" onClick={() => {
                setActiveImgIdx(idx);
                setViewMode('photos');
            }} className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition p-1 bg-white cursor-pointer ${viewMode === 'photos' && activeImgIdx === idx
                ? 'border-[#13b59b] shadow-xs ring-2 ring-[#13b59b]/20'
                : 'border-gray-200 hover:border-gray-400'}`}>
                      <Image src={img} alt={`${product.title} angle ${idx + 1}`} fill className="object-contain" sizes="80px"/>
                    </button>))}
                </div>

                {/* Main Image Viewport with Badges, 3D Canvas & Share/Wishlist */}
                <div className="relative flex-1 w-full bg-[#fbfcfc] rounded-2xl border border-gray-100 flex items-center justify-center p-4 sm:p-6 min-h-100 sm:min-h-120 overflow-hidden">
                  
                  {/* Grade / Assured Badge on Top-Left */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 bg-[#13b59b] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5"/>
                      Sellbar Assured
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                      Condition: {condition}
                    </span>
                  </div>

                  {/* Center Mode Switcher Pill */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xs rounded-full p-0.5">
                    <button type="button" onClick={() => setViewMode('3d')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${viewMode === '3d'
            ? 'bg-[#13b59b] text-white shadow-xs'
            : 'text-gray-600 hover:text-gray-900'}`}>
                      <Rotate3d className="w-3.5 h-3.5"/>
                      <span>3D 360°</span>
                    </button>
                    <button type="button" onClick={() => setViewMode('photos')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${viewMode === 'photos'
            ? 'bg-gray-900 text-white shadow-xs'
            : 'text-gray-600 hover:text-gray-900'}`}>
                      <Layers className="w-3.5 h-3.5"/>
                      <span>Photos</span>
                    </button>
                  </div>

                  {/* Actions on Top-Right: Share & Wishlist */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button type="button" onClick={handleShare} title="Share product" className="p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 text-gray-600 hover:text-[#13b59b] shadow-xs transition cursor-pointer">
                      <Share2 className="w-4 h-4"/>
                    </button>
                    <button type="button" onClick={() => setIsWishlisted(!isWishlisted)} title="Add to Wishlist" className={`p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-xs transition cursor-pointer ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-gray-600 hover:text-rose-500'}`}>
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}/>
                    </button>
                  </div>

                  {/* VIEW CONTAINER: 3D ModelViewer OR 2D Photo */}
                  {viewMode === '3d' ? (<div className="relative w-full h-90 sm:h-110 flex items-center justify-center">
                      <ModelViewer url={model3dUrl} width="100%" height="100%" environment="studio" environmentIntensity={1.2} exposure={1} autoRotate={autoRotate3D} autoRotateSpeed={0.5} autoRotateDelay={2} dragRotate={true} turntable={false} zoom={true} shadow={true} shadowOpacity={0.45} hoverTilt={0.15} float={0.25} fit={0.82} className="w-full h-full"/>

                      {/* 3D Interactive Helper Tooltip at bottom */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none bg-white/95 border border-gray-200 backdrop-blur-md text-gray-700 text-[11px] font-medium px-3.5 py-1 rounded-full shadow-xs flex items-center gap-2 whitespace-nowrap z-10">
                        <RotateCcw className="w-3.5 h-3.5 text-[#13b59b] animate-spin" style={{ animationDuration: '6s' }}/>
                        <span>Drag to rotate 360° • Pinch/Scroll to zoom • Double-click to reset</span>
                      </div>

                      {/* 3D Controls Top-Right beneath Share/Heart */}
                      <div className="absolute top-14 right-4 z-20 flex flex-col gap-1.5">
                        <button type="button" onClick={() => setAutoRotate3D(!autoRotate3D)} className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border shadow-xs transition flex items-center gap-1.5 cursor-pointer ${autoRotate3D
                ? 'bg-teal-50 border-teal-200 text-[#13b59b]'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`} title="Toggle Auto Rotation">
                          <RotateCcw className={`w-3 h-3 ${autoRotate3D ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}/>
                          <span>{autoRotate3D ? 'Auto-Turn ON' : 'Paused'}</span>
                        </button>
                      </div>
                    </div>) : (
        /* Main 2D Display Image */
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 transition-transform duration-300 hover:scale-105">
                      <Image src={images[activeImgIdx] || images[0]} alt={product.title} fill priority className="object-contain" sizes="(max-width: 768px) 100vw, 400px"/>
                    </div>)}
                </div>
              </div>

              {/* 3 Trust Checkpoints below image (Animated with React Bits AnimatedContent) */}
              <AnimatedContent distance={24} direction="vertical" duration={0.6} stagger={0.08} threshold={0.1} className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-teal-200 transition">
                  <div className="w-10 h-10 rounded-full bg-[#e6f9f6] text-[#13b59b] flex items-center justify-center font-bold text-sm mb-1.5">
                    32
                  </div>
                  <div className="text-xs font-bold text-gray-900 leading-tight">32 Point</div>
                  <div className="text-[11px] text-gray-500">Quality Check</div>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-teal-200 transition">
                  <div className="w-10 h-10 rounded-full bg-[#e6f9f6] text-[#13b59b] flex items-center justify-center font-bold text-sm mb-1.5">
                    15
                  </div>
                  <div className="text-xs font-bold text-gray-900 leading-tight">15 Days</div>
                  <div className="text-[11px] text-gray-500">Refund*</div>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-teal-200 transition">
                  <div className="w-10 h-10 rounded-full bg-[#e6f9f6] text-[#13b59b] flex items-center justify-center font-bold text-sm mb-1.5">
                    06
                  </div>
                  <div className="text-xs font-bold text-gray-900 leading-tight">06 Months</div>
                  <div className="text-[11px] text-gray-500">Warranty</div>
                </div>
              </AnimatedContent>

              {/* Sticky Action CTA Buttons (Cashify Style) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => setEmiModalOpen(true)} className="flex-1 py-3.5 px-4 rounded-xl border-2 border-[#13b59b] text-[#13b59b] font-bold text-sm hover:bg-[#e6f9f6] transition text-center flex flex-col items-center justify-center cursor-pointer shadow-xs">
                  <span>Pay with EMI</span>
                  <span className="text-[11px] font-normal text-gray-600">from ₹{emiPerMonth.toLocaleString('en-IN')}/month</span>
                </button>

                <button type="button" onClick={handleBuyNow} className="flex-1 py-3.5 px-6 rounded-xl bg-[#2bbb9e] hover:bg-[#23a389] active:scale-[0.99] text-white font-bold text-base transition text-center flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  <Zap className="w-4 h-4 fill-white"/>
                  <span>Buy Now</span>
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Product Configuration & Buy Box (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              
              {/* Product Header & Ratings */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Sellbar Warranty, {condition}, {selectedStorage}, {selectedColor}
                </p>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    <span>{product.rating || 4.0}</span>
                    <Star className="w-3 h-3 fill-white"/>
                  </div>
                  <a href="#reviews" className="text-xs text-gray-500 hover:text-[#13b59b] hover:underline">
                    {product.reviewsCount || 1} review
                  </a>
                </div>
              </div>

              {/* Pricing Box with React Bits Counter */}
              <div className="bg-[#f8fafb] border border-gray-200/80 rounded-xl p-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="bg-rose-50 text-rose-600 font-bold text-xs px-2 py-1 rounded inline-flex items-center gap-0.5">
                    <span>-</span>
                    <Counter value={discountPercent} fontSize={12} fontWeight={700} duration={0.5} direction="auto" suffix="%"/>
                  </span>
                  <span className="text-3xl font-black text-gray-900 inline-flex items-baseline">
                    <Counter value={effectivePrice} fontSize="1.875rem" fontWeight={900} prefix="₹" locale="en-IN" duration={0.6} direction="auto"/>
                  </span>
                  <span className="text-base text-gray-400 line-through font-normal">
                    ₹{baseMrpPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* EMI Subtext */}
                <div className="mt-2 text-xs text-gray-600 flex items-center gap-1.5 flex-wrap">
                  <CreditCard className="w-3.5 h-3.5 text-[#13b59b]"/>
                  <span className="font-semibold text-gray-900 inline-flex items-center">
                    <Counter value={emiPerMonth} fontSize={12} fontWeight={600} prefix="₹" suffix="/month" locale="en-IN" duration={0.6} direction="auto"/>
                  </span>
                  <span>EMI available.</span>
                  <button type="button" onClick={() => setEmiModalOpen(true)} className="text-[#13b59b] font-bold hover:underline cursor-pointer">
                    View Plans
                  </button>
                  <span className="text-gray-400 text-[11px]">(Bajaj, Snapmint, Instacred EMI available)</span>
                </div>
              </div>

              {/* ================= CONDITION SELECTOR ================= */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-gray-900">Condition</label>
                  <button type="button" onClick={() => setGradeModalOpen(true)} className="text-xs font-semibold text-[#13b59b] hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Learn More</span>
                    <HelpCircle className="w-3.5 h-3.5"/>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {['Fair', 'Good', 'Superb'].map((grade) => {
            const isSelected = condition === grade;
            const delta = grade === 'Superb' ? 0 : grade === 'Good' ? -3500 : -7000;
            const displayPrice = Math.max(1000, product.sellbarPrice + delta);
            return (<button key={grade} type="button" onClick={() => setCondition(grade)} className={`p-3 rounded-xl border text-left transition cursor-pointer relative ${isSelected
                    ? 'border-[#13b59b] bg-[#e6f9f6]/40 ring-1 ring-[#13b59b]'
                    : 'border-gray-200 hover:border-gray-400 bg-white'}`}>
                        {grade === 'Superb' && (<span className="absolute -top-2 right-2 bg-[#13b59b] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                            Best Value
                          </span>)}
                        <div className="font-bold text-sm text-gray-900">{grade}</div>
                        <div className="text-xs text-gray-600 font-semibold mt-0.5">
                          ₹{displayPrice.toLocaleString('en-IN')}
                        </div>
                      </button>);
        })}
                </div>
              </div>

              {/* Extended Warranty Add-on Box */}
              <div className="p-3.5 rounded-xl border border-teal-100 bg-teal-50/40 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#13b59b]"/>
                    <span>All devices have a default 6 Months warranty out of the box</span>
                  </div>
                  <div className="text-gray-600 mt-0.5">
                    Add <strong>6 Months</strong> extended warranty at <strong>₹{warrantyPrice.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button type="button" onClick={() => setExtendedWarranty(!extendedWarranty)} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition shrink-0 cursor-pointer ${extendedWarranty
            ? 'bg-[#13b59b] text-white'
            : 'bg-white border border-[#13b59b] text-[#13b59b] hover:bg-teal-50'}`}>
                  {extendedWarranty ? 'Added ✓' : 'Add +'}
                </button>
              </div>

              {/* ================= STORAGE SELECTOR ================= */}
              <div>
                <label className="text-sm font-bold text-gray-900 block mb-2">Storage</label>
                <div className="flex flex-wrap gap-2.5">
                  {storageOptions.map((st) => (<button key={st} type="button" onClick={() => setSelectedStorage(st)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${selectedStorage === st
                ? 'border-[#13b59b] bg-[#e6f9f6]/40 text-[#13b59b] ring-1 ring-[#13b59b]'
                : 'border-gray-200 text-gray-800 hover:border-gray-400 bg-white'}`}>
                      {st}
                    </button>))}
                </div>
              </div>

              {/* ================= COLOR SELECTOR ================= */}
              <div>
                <div className="text-sm font-bold text-gray-900 mb-2">
                  Color: <span className="text-gray-600 font-normal">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {colorOptions.map((c) => (<button key={c} type="button" onClick={() => setSelectedColor(c)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${selectedColor === c
                ? 'border-[#13b59b] bg-[#e6f9f6]/40 text-gray-900'
                : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'}`}>
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{
                backgroundColor: c.toLowerCase().includes('brown') ? '#6d4c41' :
                    c.toLowerCase().includes('gold') ? '#d4af37' :
                        c.toLowerCase().includes('silver') ? '#c0c0c0' :
                            c.toLowerCase().includes('white') ? '#f5f5f5' :
                                c.toLowerCase().includes('blue') ? '#1e3a8a' :
                                    c.toLowerCase().includes('titanium') ? '#71717a' :
                                        '#18181b'
            }}/>
                      <span>{c}</span>
                    </button>))}
                </div>
              </div>

              {/* ================= COMBO / BOUGHT TOGETHER ================= */}
              <div className="border border-dashed border-gray-300 rounded-xl p-3.5 bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-900">Save extra on buying these together</span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Up to ₹140 extra off
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
                    <Smartphone className="w-6 h-6 text-gray-600"/>
                  </div>
                  <span>+</span>
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-amber-500"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">Compatible 65W Fast Charging Adapter</div>
                    <div className="text-gray-500 text-[11px]">White - Surge Protected</div>
                  </div>
                  <button type="button" onClick={() => {
            setIncludeCombo(!includeCombo);
        }} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition shrink-0 cursor-pointer ${includeCombo
            ? 'bg-[#13b59b] text-white'
            : 'border border-[#13b59b] text-[#13b59b] bg-white hover:bg-[#e6f9f6]'}`}>
                    {includeCombo ? 'Combo Added ✓' : '+ Add Combo'}
                  </button>
                </div>
              </div>

              {/* ================= DELIVERY PINCODE CHECKER ================= */}
              <div className="pt-2">
                <div className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#13b59b]"/>
                  <span>Check Delivery Date & COD Availability</span>
                </div>

                <div className="flex items-center gap-2 max-w-sm">
                  <input type="text" maxLength={6} value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))} placeholder="Enter 6 digit PIN code" className="flex-1 bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#13b59b]"/>
                  <button type="button" onClick={() => setPincodeChecked(true)} className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition cursor-pointer">
                    Check
                  </button>
                </div>

                {pincodeChecked && deliveryData && (<div className="mt-2.5 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-3 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                      <Check className="w-3.5 h-3.5"/>
                      <span>Free Express Delivery to {deliveryData.city} ({deliveryData.pincode})</span>
                    </div>
                    <div className="text-gray-500">
                      Expected delivery within <strong>24 - 48 Hours</strong>. Cash on Delivery (COD) available with doorstep verification.
                    </div>
                  </div>)}
              </div>

              {/* Quick Add to Cart Button */}
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => handleAddToCart(includeCombo)} className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold text-sm transition text-center flex items-center justify-center gap-2 cursor-pointer">
                  <ShoppingCart className="w-4 h-4"/>
                  <span>Add to Cart</span>
                </button>
                <button type="button" onClick={handleBuyNow} className="flex-1 py-3 px-6 rounded-xl bg-[#13b59b] hover:bg-[#0fa088] text-white font-bold text-sm transition text-center flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  <Zap className="w-4 h-4 fill-white"/>
                  <span>Instant Checkout</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. SELLBAR TRUST BADGES ROW (Cashify Style)               */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Sellbar Trust</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">India&apos;s most reliable destination for certified refurbished electronics</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6"/>
              </div>
              <div className="text-lg font-black text-gray-900">50+ Lakh</div>
              <div className="text-xs text-gray-500 font-medium">Happy Customers</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <Smartphone className="w-6 h-6"/>
              </div>
              <div className="text-lg font-black text-gray-900">27+ Lakh</div>
              <div className="text-xs text-gray-500 font-medium">Devices Sold</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6"/>
              </div>
              <div className="text-lg font-black text-gray-900">32 Points</div>
              <div className="text-xs text-gray-500 font-medium">Quality Checks</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <RotateCcw className="w-6 h-6"/>
              </div>
              <div className="text-lg font-black text-gray-900">15 Days</div>
              <div className="text-xs text-gray-500 font-medium">Refund*</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <Award className="w-6 h-6"/>
              </div>
              <div className="text-lg font-black text-gray-900">Upto 12M</div>
              <div className="text-xs text-gray-500 font-medium">Warranty*</div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6"/>
              </div>
              <div className="text-lg font-black text-gray-900">200+</div>
              <div className="text-xs text-gray-500 font-medium">Sellbar Stores</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. GRADE EXPLAINED (Cashify Interactive Tabs)              */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Grade Explained</h2>
              <p className="text-xs sm:text-sm text-gray-500">Every refurbished device is thoroughly graded with complete transparency</p>
            </div>

            {/* Grade Switcher Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['Superb', 'Good', 'Fair'].map((tab) => (<button key={tab} type="button" onClick={() => setActiveGradeTab(tab)} className={`px-5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${activeGradeTab === tab
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'}`}>
                  {tab}
                </button>))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Overall</div>
              <div className="text-sm font-bold text-gray-900 mb-1">No Functional Defects</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                {gradeSpecs[activeGradeTab].overall}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Screen Glass</div>
              <div className="text-sm font-bold text-gray-900 mb-1">Visual Check</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                {gradeSpecs[activeGradeTab].glass}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Display</div>
              <div className="text-sm font-bold text-gray-900 mb-1">Zero Dead Pixels</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                {gradeSpecs[activeGradeTab].display}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Chrome / Body</div>
              <div className="text-sm font-bold text-gray-900 mb-1">Cosmetic Condition</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                {gradeSpecs[activeGradeTab].body}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. TOP SPECS GRID & DETAILED SPECIFICATIONS               */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8">
          
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-4">Top Specs</h2>
          
          {/* Quick highlight cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
            <div className="p-3.5 rounded-xl bg-[#f8fafb] border border-gray-200/80 flex flex-col justify-center">
              <div className="text-base font-black text-gray-900">6.78 inches</div>
              <div className="text-xs text-gray-500 font-medium">Screen Size</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafb] border border-gray-200/80 flex flex-col justify-center">
              <div className="text-base font-black text-gray-900 truncate">Dimensity 8450</div>
              <div className="text-xs text-gray-500 font-medium">Chipset</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafb] border border-gray-200/80 flex flex-col justify-center">
              <div className="text-base font-black text-gray-900">450 ppi</div>
              <div className="text-xs text-gray-500 font-medium">Pixel Density</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafb] border border-gray-200/80 flex flex-col justify-center">
              <div className="text-base font-black text-gray-900">5G Dual SIM</div>
              <div className="text-xs text-gray-500 font-medium">Network Support</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fafb] border border-gray-200/80 flex flex-col justify-center">
              <div className="text-base font-black text-gray-900">Triple 200MP</div>
              <div className="text-xs text-gray-500 font-medium">OIS Camera</div>
            </div>
          </div>

          {/* Full Specifications Table */}
          <h3 className="text-lg font-bold text-gray-900 mb-3">Product Details & Specifications</h3>
          <div className="overflow-hidden border border-gray-200 rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-gray-200">
                {Object.entries(product.specifications || {}).map(([key, val], idx) => (<tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="py-3 px-4 sm:px-6 font-semibold text-gray-700 w-1/3 sm:w-1/4 border-r border-gray-200">
                      {key}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-gray-900 font-normal">
                      {val}
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* Verified Sellbar Guarantee & Partners Bar (React Bits LogoLoop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-linear-to-r from-teal-50/70 via-white to-gray-50/70 border border-teal-100 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0 px-1">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#13b59b] animate-pulse"/>
              <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                Verified Refurbished Standard:
              </span>
            </div>
            <div className="w-full flex-1 overflow-hidden min-h-8">
              <LogoLoop logos={certifiedPartners} speed={50} direction="left" logoHeight={22} gap={44} labels="inline" hoverSpeed={0} scaleOnHover ariaLabel="Sellbar Verified Quality Partners and Guarantees"/>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. "YOU MAY ALSO LIKE" CAROUSEL (Cashify Reference)       */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">You May Also Like</h2>
              <p className="text-xs sm:text-sm text-gray-500">Hand-picked certified refurbished devices with warranty</p>
            </div>
            <Link href="/buy-refurbished-mobile-phones" className="text-xs font-bold text-[#13b59b] hover:underline">
              View All &rarr;
            </Link>
          </div>

          <AnimatedContent distance={36} direction="vertical" duration={0.7} stagger={0.06} threshold={0.1} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((item) => {
            const itemDiscount = Math.round(((item.mrpPrice - item.sellbarPrice) / item.mrpPrice) * 100);
            const savings = item.mrpPrice - item.sellbarPrice;
            return (<Link key={item.id} href={`/buy-refurbished-mobile-phones/${item.slug}`} className="group p-3.5 rounded-xl border border-gray-200 hover:border-[#13b59b] hover:shadow-lg transition bg-white flex flex-col justify-between">
                  <div className="relative">
                    {/* Savings tag */}
                    <span className="inline-block bg-teal-50 text-[#13b59b] font-bold text-[10px] px-2 py-0.5 rounded mb-2">
                      ₹{savings.toLocaleString('en-IN')} OFF
                    </span>

                    <div className="relative w-full h-36 mb-2">
                      <Image src={item.images[0]} alt={item.title} fill className="object-contain group-hover:scale-105 transition-transform duration-200" sizes="(max-width: 768px) 50vw, 220px"/>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 font-semibold mb-0.5">{item.brandName}</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#13b59b] transition">
                      {item.title}
                    </div>

                    <div className="flex items-center gap-1 mt-1.5 mb-2">
                      <div className="inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                        <span>{item.rating || 4.5}</span>
                        <Star className="w-2.5 h-2.5 fill-white"/>
                      </div>
                      <span className="text-[11px] text-gray-400">({item.reviewsCount || 10})</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-rose-600">-{itemDiscount}%</span>
                      <span className="text-sm sm:text-base font-extrabold text-gray-900">
                        ₹{item.sellbarPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-gray-400 line-through">
                        ₹{item.mrpPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </Link>);
        })}
          </AnimatedContent>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7. CUSTOMER REVIEWS & RATINGS                             */}
      {/* ========================================================= */}
      <div id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-6">Customer Reviews</h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Ratings Summary */}
            <div className="md:col-span-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
              <div className="text-5xl font-black text-gray-900">4.0</div>
              <div className="flex items-center gap-1 text-amber-400 my-2">
                {[...Array(4)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-amber-400"/>))}
                <Star className="w-5 h-5 text-gray-300"/>
              </div>
              <div className="text-xs text-gray-500">Based on verified customer orders</div>

              {/* Progress bars */}
              <div className="w-full space-y-1.5 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right font-medium">5 ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[60%]"/>
                  </div>
                  <span className="w-8 text-gray-500">60%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right font-medium">4 ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[30%]"/>
                  </div>
                  <span className="w-8 text-gray-500">30%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right font-medium">3 ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[10%]"/>
                  </div>
                  <span className="w-8 text-gray-500">10%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right font-medium">2 ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 w-[0%]"/>
                  </div>
                  <span className="w-8 text-gray-500">0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 text-right font-medium">1 ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 w-[0%]"/>
                  </div>
                  <span className="w-8 text-gray-500">0%</span>
                </div>
              </div>
            </div>

            {/* Right Review Cards */}
            <div className="md:col-span-8 space-y-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#13b59b] text-white flex items-center justify-center font-bold text-xs">
                      R
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Rohit Verma</div>
                      <div className="text-[11px] text-gray-400">Verified Buyer • Gurgaon</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    <span>4.0</span>
                    <Star className="w-3 h-3 fill-white"/>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Received in pristine condition just like brand new. Battery health is 100% and cameras work flawlessly. Packed securely in Sellbar Eco packaging with charging cable and warranty document. Super fast delivery in 24 hours. Highly recommended!
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                  <button type="button" className="flex items-center gap-1 hover:text-[#13b59b] transition">
                    <ThumbsUp className="w-3.5 h-3.5"/>
                    <span>Helpful (14)</span>
                  </button>
                  <span>Reviewed on 12 Jan 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS (ACCORDION)                 */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Got questions about Sellbar refurbished mobile phones? We have got you covered.
          </p>

          <div className="space-y-3">
            {[
            {
                q: 'What is a Sellbar Refurbished Mobile Phone?',
                a: 'A Sellbar refurbished mobile phone is a pre-owned device that has undergone a rigorous 32-point hardware and software diagnostic test. Any malfunctioning components are replaced with 100% genuine parts, cleaned and sanitized, and restored to full original working order backed by warranty.'
            },
            {
                q: 'What warranty is provided with this refurbished device?',
                a: 'Every refurbished phone includes a complimentary 6-month comprehensive doorstep warranty out of the box. You can also upgrade to a 12-month extended warranty during checkout for total peace of mind.'
            },
            {
                q: 'What is the return/replacement policy?',
                a: 'Sellbar provides an effortless 15-day refund/replacement guarantee. If you encounter any functional discrepancy, our technician will visit your doorstep for verification and an instant free replacement or 100% refund.'
            },
            {
                q: 'What accessories are included in the box?',
                a: 'Your phone arrives in safe, premium Sellbar Eco-Packaging and includes a compatible high-speed braided USB charging cable, SIM ejector tool, and a certified Sellbar warranty card.'
            },
            {
                q: 'Can I pay via Cash on Delivery or No-Cost EMI?',
                a: 'Yes! Sellbar supports Cash on Delivery (COD) across 19,000+ Indian pincodes as well as flexible No-Cost EMI options via Bajaj Finserv, Snapmint, Instacred, and all major credit/debit cards.'
            }
        ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (<div key={idx} className="border border-gray-200 rounded-xl overflow-hidden transition">
                  <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-900 bg-white hover:bg-gray-50 transition cursor-pointer">
                    <span>{faq.q}</span>
                    {isOpen ? (<ChevronUp className="w-4 h-4 text-[#13b59b]"/>) : (<ChevronDown className="w-4 h-4 text-gray-400"/>)}
                  </button>
                  {isOpen && (<div className="p-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed bg-[#fbfcfc] border-t border-gray-100">
                      {faq.a}
                    </div>)}
                </div>);
        })}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 9. GRADE EXPLAINED MODAL                                  */}
      {/* ========================================================= */}
      {gradeModalOpen && (<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button type="button" onClick={() => setGradeModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
              <X className="w-5 h-5"/>
            </button>

            <h3 className="text-xl font-black text-gray-900 mb-1">Condition Guide</h3>
            <p className="text-xs text-gray-500 mb-4">Compare what to expect from each condition grade</p>

            <div className="space-y-3">
              {['Superb', 'Good', 'Fair'].map((g) => (<div key={g} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-gray-900">{g}</span>
                    <span className="text-[10px] font-bold bg-[#13b59b]/10 text-[#13b59b] px-2 py-0.5 rounded">
                      {gradeSpecs[g].tag}
                    </span>
                  </div>
                  <div className="text-xs text-gray-700 space-y-1">
                    <div><strong>Screen:</strong> {gradeSpecs[g].glass}</div>
                    <div><strong>Body:</strong> {gradeSpecs[g].body}</div>
                  </div>
                </div>))}
            </div>

            <button type="button" onClick={() => setGradeModalOpen(false)} className="mt-5 w-full py-2.5 rounded-xl bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold transition">
              Got it, close
            </button>
          </div>
        </div>)}

      {/* ========================================================= */}
      {/* 10. EMI PLANS MODAL                                       */}
      {/* ========================================================= */}
      {emiModalOpen && (<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button type="button" onClick={() => setEmiModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
              <X className="w-5 h-5"/>
            </button>

            <h3 className="text-xl font-black text-gray-900 mb-1">EMI Options & Calculator</h3>
            <p className="text-xs text-gray-500 mb-4">Available on Bajaj Finserv, Snapmint, Instacred, and Major Banks</p>

            <div className="space-y-2.5">
              {[
                { months: 3, rate: '0% No-Cost', monthly: Math.round(effectivePrice / 3) },
                { months: 6, rate: '0% No-Cost', monthly: Math.round(effectivePrice / 6) },
                { months: 9, rate: '12% p.a.', monthly: Math.round((effectivePrice * 1.09) / 9) },
                { months: 12, rate: '14% p.a.', monthly: Math.round((effectivePrice * 1.14) / 12) },
                { months: 18, rate: '15% p.a.', monthly: Math.round((effectivePrice * 1.20) / 18) },
            ].map((plan) => (<div key={plan.months} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-[#13b59b] transition">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{plan.months} Months EMI</div>
                    <div className="text-xs text-[#13b59b] font-semibold">{plan.rate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-gray-900">₹{plan.monthly.toLocaleString('en-IN')}/mo</div>
                    <div className="text-[11px] text-gray-400">Total: ₹{(plan.monthly * plan.months).toLocaleString('en-IN')}</div>
                  </div>
                </div>))}
            </div>

            <button type="button" onClick={() => setEmiModalOpen(false)} className="mt-5 w-full py-2.5 rounded-xl bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold transition">
              Close Plans
            </button>
          </div>
        </div>)}

    </div>);
}
