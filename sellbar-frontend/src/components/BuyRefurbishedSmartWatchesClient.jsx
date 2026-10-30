'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Heart, Star, ChevronDown, Flame, Clock, Sparkles, Watch, Check, Activity, BatteryCharging, Wifi, SlidersHorizontal, } from 'lucide-react';
export default function BuyRefurbishedSmartWatchesClient({ initialProducts = [], }) {
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [selectedConnectivity, setSelectedConnectivity] = useState('all');
    const [selectedCaseSize, setSelectedCaseSize] = useState('all');
    const [selectedCondition, setSelectedCondition] = useState('all');
    const [selectedPriceTier, setSelectedPriceTier] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [wishlist, setWishlist] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);
    // Flash Sale Timer
    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0)
                    return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0)
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0)
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 6, minutes: 0, seconds: 0 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const toggleWishlist = (id) => {
        setWishlist((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    const brands = [
        {
            name: 'All Brands',
            slug: 'all',
            logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=120&q=80',
            count: 24,
        },
        {
            name: 'Apple Watch',
            slug: 'apple',
            logo: 'https://s3ng.cashify.in/estore/d3abed491a974d0bae84c21e1f7c96bd.webp',
            count: 14,
        },
        {
            name: 'Samsung Galaxy Watch',
            slug: 'samsung',
            logo: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/5f44f48b-82d1.jpg',
            count: 6,
        },
        {
            name: 'Fitbit',
            slug: 'fitbit',
            logo: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/17bf46be-d31e.jpg',
            count: 4,
        },
    ];
    // Authentic Smartwatches Inventory from Cashify CDN
    const smartwatchesCatalog = useMemo(() => {
        return [
            {
                id: 'apple-watch-ultra-2',
                name: 'Apple Watch Ultra 2 (49mm, GPS+Cellular) - Refurbished',
                slug: 'apple-watch-ultra-2-refurbished',
                brand: 'apple',
                series: 'Apple Watch Ultra',
                caseSize: '49mm',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/760ce3af-1754.jpg',
                salePrice: 58999,
                originalPrice: 89900,
                discount: 34,
                rating: 4.9,
                reviewsCount: 1420,
                grade: 'Flawless',
                specs: ['49mm Titanium Case', '3000 Nits Sapphire Screen', 'Dual-frequency GPS', 'Action Button & Siren'],
                tag: 'FLAGSHIP BEAST',
                batteryHealth: '94% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-ultra-2-refurbished',
            },
            {
                id: 'apple-watch-series-10-46-gps',
                name: 'Apple Watch Series 10 (46mm, GPS Only) - Refurbished',
                slug: 'apple-watch-series-10-46mm-refurbished',
                brand: 'apple',
                series: 'Apple Watch Series 10',
                caseSize: '46mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/434684d1-4337.jpg',
                salePrice: 38999,
                originalPrice: 49900,
                discount: 22,
                rating: 4.9,
                reviewsCount: 890,
                grade: 'Flawless',
                specs: ['46mm Jet Black Aluminum', 'Wide-Angle OLED Screen', 'Sleep Apnea Detection', 'Depth Gauge & Water Temp'],
                tag: 'LATEST LAUNCH',
                batteryHealth: '97% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-series-10-46mm-refurbished',
            },
            {
                id: 'apple-watch-series-10-46-cellular',
                name: 'Apple Watch Series 10 (46mm, GPS+Cellular) - Refurbished',
                slug: 'apple-watch-series-10-46mm-cellular-refurbished',
                brand: 'apple',
                series: 'Apple Watch Series 10',
                caseSize: '46mm',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/579a31a9-23c5.jpg',
                salePrice: 44999,
                originalPrice: 59900,
                discount: 25,
                rating: 4.9,
                reviewsCount: 640,
                grade: 'Superb',
                specs: ['Standalone 4G eSIM Support', 'Thin & Lightweight Design', 'Fast 80% Charge in 30 Min', 'S10 SiP Chip'],
                tag: 'HOTTEST DEAL',
                batteryHealth: '96% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-series-10-46mm-cellular-refurbished',
            },
            {
                id: 'apple-watch-series-9-45-gps',
                name: 'Apple Watch Series 9 (45mm, GPS Only) - Refurbished',
                slug: 'apple-watch-series-9-45mm-refurbished',
                brand: 'apple',
                series: 'Apple Watch Series 9',
                caseSize: '45mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/44221f2f-8770.jpg',
                salePrice: 28999,
                originalPrice: 44900,
                discount: 35,
                rating: 4.8,
                reviewsCount: 2310,
                grade: 'Superb',
                specs: ['45mm Midnight Aluminum', 'Double Tap Gesture Magic', 'S9 Chip with On-Device Siri', '2000 Nits Always-On Retina'],
                tag: 'MOST POPULAR',
                batteryHealth: '91% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-series-9-45mm-refurbished',
            },
            {
                id: 'apple-watch-series-8-45-gps',
                name: 'Apple Watch Series 8 (45mm, GPS Only) - Refurbished',
                slug: 'apple-watch-series-8-45mm-refurbished',
                brand: 'apple',
                series: 'Apple Watch Series 8',
                caseSize: '45mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/44e98ce3-58ae.jpg',
                salePrice: 22999,
                originalPrice: 45900,
                discount: 50,
                rating: 4.8,
                reviewsCount: 3120,
                grade: 'Superb',
                specs: ['Wrist Temperature Sensing', 'Crash Detection & Fall Alert', 'ECG & Blood Oxygen Apps', 'IP6X Dust Resistant'],
                tag: 'VALUE CHAMPION',
                batteryHealth: '89% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-series-8-45mm-refurbished',
            },
            {
                id: 'apple-watch-series-7-45-gps',
                name: 'Apple Watch Series 7 (45mm, GPS Only) - Refurbished',
                slug: 'apple-watch-series-7-45mm-refurbished',
                brand: 'apple',
                series: 'Apple Watch Series 7',
                caseSize: '45mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/27a767c6-6392.jpg',
                salePrice: 18999,
                originalPrice: 44900,
                discount: 58,
                rating: 4.7,
                reviewsCount: 4180,
                grade: 'Good',
                specs: ['Large Curved Edge Display', 'Full QWERTY Keyboard', 'Fast USB-C Magnetic Puck', 'WR50 Water Resistance'],
                tag: 'MEGA SAVER',
                batteryHealth: '87% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-series-7-45mm-refurbished',
            },
            {
                id: 'apple-watch-series-7-45-cellular',
                name: 'Apple Watch Series 7 (45mm, GPS+Cellular) - Refurbished',
                slug: 'apple-watch-series-7-45mm-cellular-refurbished',
                brand: 'apple',
                series: 'Apple Watch Series 7',
                caseSize: '45mm',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/34b63e16-f85c.jpg',
                salePrice: 21999,
                originalPrice: 50900,
                discount: 57,
                rating: 4.8,
                reviewsCount: 1950,
                grade: 'Superb',
                specs: ['eSIM Phone Calling Without iPhone', 'Stream Apple Music on Cellular', 'ECG Monitor & Heart Health', 'Midnight Black'],
                tag: 'BESTSELLER',
                batteryHealth: '88% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-series-7-45mm-cellular-refurbished',
            },
            {
                id: 'apple-watch-ultra-1',
                name: 'Apple Watch Ultra (49mm, GPS+Cellular) - Refurbished',
                slug: 'apple-watch-ultra-refurbished',
                brand: 'apple',
                series: 'Apple Watch Ultra',
                caseSize: '49mm',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/711f14c3-0efc.jpg',
                salePrice: 44999,
                originalPrice: 79900,
                discount: 44,
                rating: 4.9,
                reviewsCount: 2240,
                grade: 'Superb',
                specs: ['Rugged Aerospace Titanium', '36h Multi-day Battery', '100m Water Resistance & Dive Computer', 'Orange Alpine Loop'],
                tag: 'ADVENTURE READY',
                batteryHealth: '92% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-ultra-refurbished',
            },
            {
                id: 'apple-watch-se-2-44-gps',
                name: 'Apple Watch SE - 2nd Gen (44mm, GPS Only) - Refurbished',
                slug: 'apple-watch-se-2nd-gen-44mm-refurbished',
                brand: 'apple',
                series: 'Apple Watch SE',
                caseSize: '44mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/f8b8809d-2cff.jpg',
                salePrice: 16999,
                originalPrice: 29900,
                discount: 43,
                rating: 4.7,
                reviewsCount: 5210,
                grade: 'Flawless',
                specs: ['S8 SiP 20% Faster', 'Emergency SOS & Fall Detection', 'Swimproof 50m WR', 'Heart Rate Alerts'],
                tag: 'BEST BUDGET APPLE',
                batteryHealth: '93% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-se-2nd-gen-44mm-refurbished',
            },
            {
                id: 'apple-watch-series-6-44-gps',
                name: 'Apple Watch Series 6 (44mm, GPS Only) - Refurbished',
                slug: 'apple-watch-series-6-44mm-refurbished',
                brand: 'apple',
                series: 'Apple Watch Series 6',
                caseSize: '44mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/c39db3b0-db28.jpg',
                salePrice: 14499,
                originalPrice: 43900,
                discount: 67,
                rating: 4.6,
                reviewsCount: 6820,
                grade: 'Good',
                specs: ['SpO2 Sensor & ECG Included', 'Always-On Retina 2.5x Brighter', 'Space Gray Aluminum', 'Magnetic Fast Charger'],
                tag: 'LOWEST PRICE',
                batteryHealth: '86% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-watch-series-6-44mm-refurbished',
            },
            {
                id: 'samsung-galaxy-watch-7-44-lte',
                name: 'Samsung Galaxy Watch7 (44mm, LTE) - Refurbished',
                slug: 'samsung-galaxy-watch-7-44mm-lte-refurbished',
                brand: 'samsung',
                series: 'Samsung Galaxy Watch',
                caseSize: '44mm',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/83eca0ef-cf2c.jpg',
                salePrice: 19999,
                originalPrice: 32999,
                discount: 39,
                rating: 4.8,
                reviewsCount: 970,
                grade: 'Flawless',
                specs: ['3nm Exynos W1000 Processor', 'Galaxy AI Energy Score', 'Dual-Frequency GPS L1+L5', 'Standalone 4G LTE Calling'],
                tag: 'NEW GALAXY AI',
                batteryHealth: '95% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/samsung-galaxy-watch-7-44mm-lte-refurbished',
            },
            {
                id: 'samsung-galaxy-watch-7-40-lte',
                name: 'Samsung Galaxy Watch7 (40mm, LTE) - Refurbished',
                slug: 'samsung-galaxy-watch-7-40mm-lte-refurbished',
                brand: 'samsung',
                series: 'Samsung Galaxy Watch',
                caseSize: '40mm',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/5f44f48b-82d1.jpg',
                salePrice: 17499,
                originalPrice: 29999,
                discount: 42,
                rating: 4.8,
                reviewsCount: 780,
                grade: 'Superb',
                specs: ['Compact 40mm Green/Cream', 'BioActive Sensor 2.0', 'FDA-cleared Sleep Apnea', 'Wireless PowerShare Support'],
                tag: 'COMPACT FLAGSHIP',
                batteryHealth: '93% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/samsung-galaxy-watch-7-40mm-lte-refurbished',
            },
            {
                id: 'fitbit-charge-6-gps',
                name: 'Google Fitbit Charge 6 (26mm, GPS Only) - Refurbished',
                slug: 'google-fitbit-charge-6-refurbished',
                brand: 'fitbit',
                series: 'Fitbit Trackers',
                caseSize: '40mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/f8e637ec-e409.jpg',
                salePrice: 8999,
                originalPrice: 14999,
                discount: 40,
                rating: 4.7,
                reviewsCount: 1650,
                grade: 'Flawless',
                specs: ['Built-in GPS & GLONASS', 'Google Maps & Google Wallet', 'ECG & EDA Stress Sensor', '7 Days Battery Life'],
                tag: 'FITNESS ESSENTIAL',
                batteryHealth: '96% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/google-fitbit-charge-6-refurbished',
            },
            {
                id: 'fitbit-inspire-3-gps',
                name: 'Google Fitbit Inspire 3 (19mm, GPS Only) - Refurbished',
                slug: 'google-fitbit-inspire-3-refurbished',
                brand: 'fitbit',
                series: 'Fitbit Trackers',
                caseSize: '40mm',
                connectivity: 'gps',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/17bf46be-d31e.jpg',
                salePrice: 5499,
                originalPrice: 9999,
                discount: 45,
                rating: 4.6,
                reviewsCount: 2840,
                grade: 'Superb',
                specs: ['Up to 10 Days Battery Life', '24/7 Heart Rate & SpO2', 'Always-On Color AMOLED', 'Water Resistant to 50m'],
                tag: 'SUPER VALUE',
                batteryHealth: '95% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/google-fitbit-inspire-3-refurbished',
            },
        ];
    }, []);
    // Filter & Sort
    const filteredWatches = useMemo(() => {
        return smartwatchesCatalog
            .filter((watch) => {
            if (selectedBrand !== 'all' && watch.brand !== selectedBrand)
                return false;
            if (selectedConnectivity !== 'all' && watch.connectivity !== selectedConnectivity)
                return false;
            if (selectedCaseSize !== 'all') {
                if (selectedCaseSize === '40mm' && !['40mm', '19mm', '26mm'].includes(watch.caseSize))
                    return false;
                if (selectedCaseSize === '44mm' && !['44mm', '45mm'].includes(watch.caseSize))
                    return false;
                if (selectedCaseSize === '46mm' && watch.caseSize !== '46mm')
                    return false;
                if (selectedCaseSize === '49mm' && watch.caseSize !== '49mm')
                    return false;
            }
            if (selectedCondition !== 'all' && watch.grade.toLowerCase() !== selectedCondition.toLowerCase())
                return false;
            if (selectedPriceTier !== 'all') {
                if (selectedPriceTier === 'under15k' && watch.salePrice >= 15000)
                    return false;
                if (selectedPriceTier === '15k-25k' && (watch.salePrice < 15000 || watch.salePrice > 25000))
                    return false;
                if (selectedPriceTier === '25k-40k' && (watch.salePrice < 25000 || watch.salePrice > 40000))
                    return false;
                if (selectedPriceTier === 'above40k' && watch.salePrice <= 40000)
                    return false;
            }
            return true;
        })
            .sort((a, b) => {
            if (sortBy === 'price-low')
                return a.salePrice - b.salePrice;
            if (sortBy === 'price-high')
                return b.salePrice - a.salePrice;
            if (sortBy === 'discount')
                return b.discount - a.discount;
            return b.reviewsCount - a.reviewsCount;
        });
    }, [
        smartwatchesCatalog,
        selectedBrand,
        selectedConnectivity,
        selectedCaseSize,
        selectedCondition,
        selectedPriceTier,
        sortBy,
    ]);
    const faqs = [
        {
            q: 'Are heart rate, SpO2, and ECG sensors tested and accurate on refurbished smartwatches?',
            a: 'Yes, 100%! Every refurbished smartwatch at Sellbar goes through an extensive 32-point diagnostic test that includes biometric sensor calibration against certified medical pulse-oximeters and ECG monitors. Blood oxygen, heart rate frequency, rhythm alerts, accelerometer, and gyroscopes are confirmed fully accurate before packing.',
        },
        {
            q: 'What is the battery health guarantee on Sellbar refurbished smartwatches?',
            a: 'Sellbar guarantees a minimum of 85%+ battery health on all refurbished Apple Watch and Samsung Galaxy Watch models. The battery is tested for charge retention, overnight drain, and OEM magnetic wireless charging speeds to give you full-day uninterrupted usage.',
        },
        {
            q: 'Do refurbished smartwatches come with a charging cable and strap?',
            a: 'Yes! Every smartwatch includes a certified magnetic fast-charging cable and premium sanitized silicone straps. The device is safely packaged in a secure Sellbar Assured box along with your 6-month warranty card.',
        },
        {
            q: 'What is the difference between GPS Only and GPS + Cellular (LTE) smartwatches?',
            a: 'GPS Only models need to be near your smartphone (paired over Bluetooth/Wi-Fi) to receive calls, messages, and streaming notifications. GPS + Cellular models feature an embedded eSIM that allows you to make/receive calls, send messages, and stream music directly from your watch, even if your phone is left at home.',
        },
        {
            q: 'What warranty and return policy do I get with Sellbar Assured smartwatches?',
            a: 'All Sellbar Assured smartwatches come with a 6-Month Hassle-Free Doorstep Warranty covering hardware and sensor malfunctions, plus a 15-Day Money-Back Refund Policy if the device does not meet your expectations.',
        },
        {
            q: 'Can I swim or shower with a refurbished smartwatch?',
            a: 'While most smartwatches (like Apple Watch Series 7/8/9/10 and Ultra) originally have 50m water resistance, water seals on refurbished watches can naturally degrade over time. We recommend avoiding hot showers, saunas, and scuba diving to preserve your hardware and protect your 6-month warranty.',
        },
    ];
    return (<div className="min-h-screen bg-slate-50 text-slate-800">
      {/* 1. Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs sm:text-sm text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/buy-refurbished-gadgets" className="hover:text-teal-600 transition-colors">
            Buy Refurbished Gadgets
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Buy Refurbished Smart Watches</span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="bg-linear-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,181,155,0.2),transparent_50%)] pointer-events-none"/>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-500/30">
              <Watch className="w-4 h-4 text-teal-400"/>
              Sellbar Assured Wearables
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              India&apos;s Largest Refurbished <span className="text-teal-400">Smartwatch Store</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Buy certified Apple Watch, Samsung Galaxy Watch &amp; Google Fitbit wearables at up to{' '}
              <strong className="text-teal-300">60% off</strong> retail MRP. Each watch features 85%+ guaranteed battery
              health, clinically calibrated heart rate &amp; ECG sensors, 6 months warranty, and 15-day easy refund.
            </p>

            {/* Key Value Prop Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">6 Months Warranty</span>
                <span className="text-[11px] text-slate-300">Free Doorstep Fix</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <Activity className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">32-Point Health QA</span>
                <span className="text-[11px] text-slate-300">ECG &amp; SpO2 Certified</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <BatteryCharging className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">85%+ Battery Health</span>
                <span className="text-[11px] text-slate-300">All-Day Endurance</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <RefreshCw className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">15-Day Refund</span>
                <span className="text-[11px] text-slate-300">100% Money Back</span>
              </div>
            </div>
          </div>

          {/* Flash Sale Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm mb-2">
              <Flame className="w-5 h-5 animate-bounce"/>
              FLASH DEALS END IN
            </div>
            <div className="flex items-center justify-center gap-3 text-2xl font-black text-white font-mono bg-black/40 py-3 rounded-xl border border-white/10 mb-4">
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 font-sans uppercase">Hours</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 font-sans uppercase">Mins</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 font-sans uppercase">Secs</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Extra ₹1,500 Instant Discount on UPI &amp; Credit Cards | Free Magnetic Fast Charger
            </p>
            <a href="#catalog" className="inline-block w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition-all shadow-lg hover:shadow-teal-500/25">
              Shop Smartwatches Now
            </a>
          </div>
        </div>
      </div>

      {/* 3. Shop by Brand Bar */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Watch className="w-5 h-5 text-teal-600"/>
              Shop Refurbished Watches by Brand
            </h2>
            <span className="text-xs text-slate-500">{smartwatchesCatalog.length} Models In Stock</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brands.map((brand) => (<button key={brand.slug} onClick={() => setSelectedBrand(brand.slug)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedBrand === brand.slug
                ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                <div className="w-12 h-12 relative rounded-lg bg-slate-100 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                  <Image src={brand.logo} alt={brand.name} width={48} height={48} className="object-contain"/>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-tight">{brand.name}</h4>
                  <p className="text-xs text-slate-500">{brand.count} watches</p>
                </div>
              </button>))}
          </div>
        </div>
      </div>

      {/* 4. Filter Toolbar & Catalog */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Pills */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-teal-600"/>
              <span className="font-bold text-slate-900 text-sm">Smartwatch Filters</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                Showing {filteredWatches.length} devices
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 text-xs">Sort By:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500">
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Biggest Discount %</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {/* Connectivity */}
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Connectivity</label>
              <select value={selectedConnectivity} onChange={(e) => setSelectedConnectivity(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-1 focus:ring-teal-500">
                <option value="all">All (GPS &amp; Cellular)</option>
                <option value="gps">GPS Only</option>
                <option value="cellular">GPS + Cellular (LTE eSIM)</option>
              </select>
            </div>

            {/* Case Size */}
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Case Size</label>
              <select value={selectedCaseSize} onChange={(e) => setSelectedCaseSize(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-1 focus:ring-teal-500">
                <option value="all">All Sizes</option>
                <option value="40mm">Compact (40mm / 41mm)</option>
                <option value="44mm">Medium (44mm / 45mm)</option>
                <option value="46mm">Large (46mm)</option>
                <option value="49mm">Ultra (49mm Titanium)</option>
              </select>
            </div>

            {/* Condition Grade */}
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Condition Grade</label>
              <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-1 focus:ring-teal-500">
                <option value="all">All Grades</option>
                <option value="flawless">Flawless (Zero Scratches)</option>
                <option value="superb">Superb (Micro Signs)</option>
                <option value="good">Good (Light Wear)</option>
              </select>
            </div>

            {/* Price Tier */}
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Price Budget</label>
              <select value={selectedPriceTier} onChange={(e) => setSelectedPriceTier(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-1 focus:ring-teal-500">
                <option value="all">All Budgets</option>
                <option value="under15k">Under ₹15,000</option>
                <option value="15k-25k">₹15,000 - ₹25,000</option>
                <option value="25k-40k">₹25,000 - ₹40,000</option>
                <option value="above40k">Above ₹40,000 (Ultra &amp; Flagship)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWatches.map((watch) => {
            const isWish = wishlist.includes(watch.id);
            const monthlyEmi = Math.round(watch.salePrice / 6);
            return (<div key={watch.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-teal-500/50 transition-all flex flex-col group relative">
                {/* Badges Bar */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="bg-slate-900/80 backdrop-blur-sm text-teal-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-teal-500/30">
                    {watch.tag}
                  </span>
                  <button onClick={() => toggleWishlist(watch.id)} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors">
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`}/>
                  </button>
                </div>

                {/* Product Image */}
                <Link href={watch.href} className="block relative pt-12 pb-6 px-6 bg-slate-50/50 group-hover:bg-teal-50/20 transition-colors">
                  <div className="h-52 w-full relative flex items-center justify-center">
                    <Image src={watch.image} alt={watch.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"/>
                  </div>
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px]">
                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      {watch.grade}
                    </span>
                    <span className="bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <BatteryCharging className="w-3 h-3"/>
                      {watch.batteryHealth}
                    </span>
                  </div>
                </Link>

                {/* Product Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-1.5">
                      <div className="flex items-center">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>
                        <span className="ml-1 text-slate-800 font-bold">{watch.rating}</span>
                      </div>
                      <span className="text-slate-400">({watch.reviewsCount} reviews)</span>
                    </div>

                    <Link href={watch.href}>
                      <h3 className="font-bold text-slate-900 text-sm hover:text-teal-600 transition-colors line-clamp-2 leading-snug">
                        {watch.name}
                      </h3>
                    </Link>

                    {/* Specs Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {watch.specs.map((spec, idx) => (<span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {spec}
                        </span>))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-slate-900">
                        ₹{watch.salePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{watch.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {watch.discount}% OFF
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600"/>
                      No Cost EMI from <strong className="text-slate-700">₹{monthlyEmi.toLocaleString('en-IN')}/mo</strong>
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link href={watch.href} className="w-full text-center py-2 px-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs transition-colors">
                        View Specs
                      </Link>
                      <Link href={watch.href} className="w-full text-center py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-sm">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>);
        })}
        </div>

        {filteredWatches.length === 0 && (<div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Watch className="w-12 h-12 text-slate-300 mx-auto mb-3"/>
            <h3 className="text-base font-bold text-slate-700">No Smartwatches Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Try adjusting your filters for connectivity, size, or brand to see available inventory.
            </p>
            <button onClick={() => {
                setSelectedBrand('all');
                setSelectedConnectivity('all');
                setSelectedCaseSize('all');
                setSelectedCondition('all');
                setSelectedPriceTier('all');
            }} className="text-xs bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg">
              Reset All Filters
            </button>
          </div>)}
      </div>

      {/* 6. Sellbar Assured 32-Point Biometric & Hardware QA Matrix */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-400"/>
              Sellbar Assured Certification
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              The 32-Point Smartwatch Quality Inspection
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Every refurbished Apple Watch, Galaxy Watch &amp; fitness band undergoes rigorous clinical and hardware testing before earning the Sellbar Assured seal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">1. Biometric Sensors</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>ECG rhythm &amp; sinus trace calibration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Optical Heart Rate sensor precision</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>SpO2 Blood Oxygen saturation check</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Wrist temperature &amp; sleep cycle sensor</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">2. OLED Display &amp; Crown</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Always-On Retina display brightness</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Zero dead pixels or OLED burn-in</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Digital Crown haptic feedback &amp; click</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Multi-touch capacitive touch grid</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <BatteryCharging className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">3. Battery &amp; Wireless Induction</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>85%+ battery health guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Magnetic puck wireless fast charge speed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>24-hour continuous standby drain audit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Thermal management during fast charge</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <Wifi className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">4. Connectivity &amp; Audio</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>eSIM &amp; 4G LTE cellular antenna test</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Dual-frequency GPS lock accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Speaker decibel output for phone calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Microphone noise cancellation audit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Condition Grades Comparison */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Refurbished Smartwatch Grades Explained
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every watch performs 100% like new with certified sensors and 6 months warranty. Grades reflect cosmetic appearance only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-500 shadow-lg relative">
            <span className="absolute -top-3 left-6 bg-emerald-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase">
              Flawless (Like New)
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Flawless Grade</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Pristine display &amp; casing, indistinguishable from a brand-new boxed watch.</p>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>Zero scratches on screen or sapphire crystal</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>92%+ Battery Health guaranteed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>6 Months Doorstep Warranty</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>OEM magnetic charger &amp; new strap included</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="absolute -top-3 left-6 bg-teal-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase">
              Superb (Best Value)
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Superb Grade</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Screen is scratch-free. Tiny micro-scratches on casing visible only under direct light.</p>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600"/>
                <span>Flawless display glass with zero marks</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600"/>
                <span>88%+ Battery Health guaranteed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600"/>
                <span>6 Months Doorstep Warranty</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600"/>
                <span>OEM magnetic charger &amp; new strap included</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="absolute -top-3 left-6 bg-slate-700 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase">
              Good (Maximum Savings)
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Good Grade</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Moderate daily cosmetic wear on body rim. 100% functional sensors and OLED screen.</p>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-700"/>
                <span>Fully functional sensors &amp; touch screen</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-700"/>
                <span>85%+ Battery Health guaranteed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-700"/>
                <span>6 Months Doorstep Warranty</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-700"/>
                <span>OEM magnetic charger &amp; new strap included</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 8. Customer Reviews */}
      <div className="bg-slate-100 py-16 px-4 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Verified Buyer Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Over 28,000+ smartwatches delivered across India with 4.8/5 average satisfaction rating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400"/>))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &quot;Bought the Apple Watch Ultra 2 in Flawless condition. Literally looked brand new out of the box! Battery health was at 98%, ECG test worked immediately, and the orange loop strap was pristine. Saved ₹30,000!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                  VK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Vikram Kapoor</h4>
                  <p className="text-[11px] text-teal-600 font-medium">Verified Buyer • Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400"/>))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &quot;Upgraded to Galaxy Watch 7 LTE from Sellbar. LTE eSIM setup on Jio was seamless. Heart rate monitoring and sleep scores match my Samsung Health app perfectly. Arrived in 2 days in Delhi.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                  NM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Neha Mukherjee</h4>
                  <p className="text-[11px] text-teal-600 font-medium">Verified Buyer • New Delhi</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400"/>))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &quot;Got an Apple Watch Series 8 45mm for ₹22,999. Fast charger was original Apple magnetic puck. Battery easily lasts 1.5 days. Super happy with Sellbar Assured service and 6 months warranty!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                  RS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Rohan Sharma</h4>
                  <p className="text-[11px] text-teal-600 font-medium">Verified Buyer • Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 9. FAQs Accordion */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Everything you need to know about buying a refurbished smartwatch at Sellbar.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (<div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-sm">
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full px-5 py-4 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-teal-600' : ''}`}/>
              </button>
              {openFaq === idx && (<div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>)}
            </div>))}
        </div>
      </div>
    </div>);
}
