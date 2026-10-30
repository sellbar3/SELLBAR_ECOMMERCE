'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Heart, Star, ChevronDown, Flame, Clock, Sparkles, Tablet, Check, BatteryCharging, SlidersHorizontal, PenTool, Volume2, } from 'lucide-react';
export default function BuyRefurbishedTabletsClient({ initialProducts = [], }) {
    const [selectedSeries, setSelectedSeries] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [selectedConnectivity, setSelectedConnectivity] = useState('all');
    const [selectedScreenSize, setSelectedScreenSize] = useState('all');
    const [selectedCondition, setSelectedCondition] = useState('all');
    const [selectedBudget, setSelectedBudget] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [wishlist, setWishlist] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);
    // Flash Sale Timer
    const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 35, seconds: 48 });
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
    // Top Tablet Series & Categories from Cashify
    const seriesCategories = [
        {
            name: 'All Tablets',
            slug: 'all',
            image: 'https://s3ng.cashify.in/estore/957d575f98ac4a1798309e08b67a5dcf.webp',
            count: 24,
        },
        {
            name: 'Apple iPad',
            slug: 'ipad',
            image: 'https://s3ng.cashify.in/estore/ae324b10a5b44c7bb8094e01f9212699.webp',
            count: 14,
        },
        {
            name: 'Apple iPad Air',
            slug: 'ipad-air',
            image: 'https://s3ng.cashify.in/estore/e0195e65e9ce4f6cb8872df53f8d0f4e.webp',
            count: 5,
        },
        {
            name: 'Apple iPad Pro',
            slug: 'ipad-pro',
            image: 'https://s3ng.cashify.in/estore/4622d3109d1e449d84c274c78f336e12.webp',
            count: 4,
        },
        {
            name: 'Apple iPad Mini',
            slug: 'ipad-mini',
            image: 'https://s3ng.cashify.in/estore/2369ce31833642249b7469ec79829127.webp',
            count: 3,
        },
        {
            name: 'Samsung Galaxy Tab',
            slug: 'samsung-tab',
            image: 'https://s3ng.cashify.in/estore/7c6d063f1c9a4975ab2eae7381895669.webp',
            count: 6,
        },
        {
            name: 'Lenovo Tab',
            slug: 'lenovo-tab',
            image: 'https://s3ng.cashify.in/estore/20390480af374538ab16b74508c8016e.webp',
            count: 4,
        },
    ];
    // Authentic Tablets Catalog from Cashify CDN
    const tabletsCatalog = useMemo(() => {
        return [
            {
                id: 'ipad-air-13-m3-2025',
                name: 'Apple iPad Air M3 2025 (13 inch, Wifi+Cellular) - Refurbished',
                slug: 'apple-ipad-air-13-m3-refurbished',
                brand: 'apple',
                series: 'ipad-air',
                screenSize: '13-inch',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/ffe0f1ac-b106.jpg',
                salePrice: 54999,
                originalPrice: 79900,
                discount: 31,
                rating: 4.9,
                reviewsCount: 420,
                grade: 'Flawless',
                specs: ['13-inch Liquid Retina', 'Apple M3 Chip Powerhouse', '5G Cellular & eSIM', 'Apple Pencil Pro Support'],
                tag: 'FLAGSHIP LAUNCH',
                batteryHealth: '97% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-air-13-m3-refurbished',
            },
            {
                id: 'ipad-air-11-m3-2025',
                name: 'Apple iPad Air 11 M3 2025 (11 inch, Wifi+Cellular) - Refurbished',
                slug: 'apple-ipad-air-11-m3-refurbished',
                brand: 'apple',
                series: 'ipad-air',
                screenSize: '11-inch',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/store/product/44773136fdf04d2782d83247619d2037.jpg',
                salePrice: 44999,
                originalPrice: 64900,
                discount: 30,
                rating: 4.9,
                reviewsCount: 680,
                grade: 'Flawless',
                specs: ['11-inch Liquid Retina TrueTone', 'Apple M3 Processor', 'Ultra-fast Wi-Fi 6E + 5G', 'Landscape Stereo Speakers'],
                tag: 'HOTTEST DEAL',
                batteryHealth: '96% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-air-11-m3-refurbished',
            },
            {
                id: 'ipad-pro-11-m2',
                name: 'Apple iPad Pro 11 M2 (11 inch, Wifi Only, 128GB) - Refurbished',
                slug: 'apple-ipad-pro-11-m2-refurbished',
                brand: 'apple',
                series: 'ipad-pro',
                screenSize: '11-inch',
                connectivity: 'wifi',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/b0ccba44-3e9c.jpg',
                salePrice: 51999,
                originalPrice: 81900,
                discount: 36,
                rating: 4.9,
                reviewsCount: 1240,
                grade: 'Flawless',
                specs: ['120Hz ProMotion Display', 'Apple M2 Silicon (8-Core CPU)', 'Face ID & Thunderbolt 4', 'Pencil Hover Support'],
                tag: 'CREATOR BEAST',
                batteryHealth: '94% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-pro-11-m2-refurbished',
            },
            {
                id: 'ipad-9th-gen-wifi',
                name: 'Apple iPad 2021 9th Generation (10.2 inch, Wifi Only) - Refurbished',
                slug: 'apple-ipad-9th-gen-wifi-refurbished',
                brand: 'apple',
                series: 'ipad',
                screenSize: '10.2-inch',
                connectivity: 'wifi',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/2d59a72d-f0d2.jpg',
                salePrice: 18499,
                originalPrice: 30900,
                discount: 40,
                rating: 4.8,
                reviewsCount: 4890,
                grade: 'Superb',
                specs: ['10.2-inch Retina True Tone', 'A13 Bionic Neural Engine', '12MP Ultra Wide Center Stage', 'Apple Pencil 1st Gen'],
                tag: 'STUDENT BESTSELLER',
                batteryHealth: '91% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-9th-gen-wifi-refurbished',
            },
            {
                id: 'ipad-9th-gen-cellular',
                name: 'Apple iPad 2021 9th Generation (10.2 inch, Wifi+Cellular) - Refurbished',
                slug: 'apple-ipad-9th-gen-cellular-refurbished',
                brand: 'apple',
                series: 'ipad',
                screenSize: '10.2-inch',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/447b51ea-312e.jpg',
                salePrice: 22999,
                originalPrice: 42900,
                discount: 46,
                rating: 4.8,
                reviewsCount: 2130,
                grade: 'Superb',
                specs: ['4G LTE Standalone Calling/Data', 'Touch ID Fingerprint Sensor', 'Up to 10h All-Day Battery', 'Lightning to USB-C Cable'],
                tag: 'POPULAR CHOICE',
                batteryHealth: '90% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-9th-gen-cellular-refurbished',
            },
            {
                id: 'ipad-8th-gen-wifi',
                name: 'Apple iPad 2020 8th Generation (10.2 inch, Wifi Only) - Refurbished',
                slug: 'apple-ipad-8th-gen-wifi-refurbished',
                brand: 'apple',
                series: 'ipad',
                screenSize: '10.2-inch',
                connectivity: 'wifi',
                image: 'https://s3ng.cashify.in/estore/12fa42dc63bf480c80c966de4ab0a2f5.jpg',
                salePrice: 14999,
                originalPrice: 29900,
                discount: 50,
                rating: 4.7,
                reviewsCount: 3820,
                grade: 'Superb',
                specs: ['10.2-inch Crisp Retina Display', 'A12 Bionic Chip', 'Stereo Speakers & 3.5mm Jack', 'Full iPadOS 18 Support'],
                tag: 'SUPER VALUE',
                batteryHealth: '88% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-8th-gen-wifi-refurbished',
            },
            {
                id: 'ipad-8th-gen-cellular',
                name: 'Apple iPad 2020 8th Generation (10.2 inch, Wifi+Cellular) - Refurbished',
                slug: 'apple-ipad-8th-gen-cellular-refurbished',
                brand: 'apple',
                series: 'ipad',
                screenSize: '10.2-inch',
                connectivity: 'cellular',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/26fdd97f-eec2.jpg',
                salePrice: 17999,
                originalPrice: 41900,
                discount: 57,
                rating: 4.7,
                reviewsCount: 1840,
                grade: 'Good',
                specs: ['Nano SIM Slot 4G LTE', 'Dual Mics for Clear Calls', 'Apple Smart Keyboard Support', 'Space Gray & Silver'],
                tag: 'BEST VALUE LTE',
                batteryHealth: '87% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-8th-gen-cellular-refurbished',
            },
            {
                id: 'ipad-7th-gen-wifi',
                name: 'Apple iPad 2019 7th Generation (10.2 inch, Wifi Only) - Refurbished',
                slug: 'apple-ipad-7th-gen-wifi-refurbished',
                brand: 'apple',
                series: 'ipad',
                screenSize: '10.2-inch',
                connectivity: 'wifi',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/43c73038-bc50.jpg',
                salePrice: 12999,
                originalPrice: 28000,
                discount: 53,
                rating: 4.6,
                reviewsCount: 5120,
                grade: 'Good',
                specs: ['10.2-inch Retina Screen', 'A10 Fusion Processor', 'Smart Connector for Keyboards', 'Gold & Space Gray'],
                tag: 'LOWEST PRICE IPAD',
                batteryHealth: '86% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-7th-gen-wifi-refurbished',
            },
            {
                id: 'ipad-mini-6-wifi',
                name: 'Apple iPad Mini 6 (8.3 inch, Wifi Only, 64GB) - Refurbished',
                slug: 'apple-ipad-mini-6-wifi-refurbished',
                brand: 'apple',
                series: 'ipad-mini',
                screenSize: '8.3-inch',
                connectivity: 'wifi',
                image: 'https://s3ng.cashify.in/estore/2369ce31833642249b7469ec79829127.webp',
                salePrice: 32999,
                originalPrice: 49900,
                discount: 34,
                rating: 4.8,
                reviewsCount: 1540,
                grade: 'Flawless',
                specs: ['8.3-inch All-Screen Liquid Retina', 'A15 Bionic with Neural Engine', 'Apple Pencil 2nd Gen Magnetic Snap', 'USB-C Fast Charging'],
                tag: 'POCKET POWER',
                batteryHealth: '93% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/apple-ipad-mini-6-wifi-refurbished',
            },
            {
                id: 'samsung-galaxy-tab-s9-fe',
                name: 'Samsung Galaxy Tab S9 FE (10.9 inch, Wifi, 128GB) - Refurbished',
                slug: 'samsung-galaxy-tab-s9-fe-refurbished',
                brand: 'samsung',
                series: 'samsung-tab',
                screenSize: '10.9-inch',
                connectivity: 'wifi',
                image: 'https://s3ng.cashify.in/estore/7c6d063f1c9a4975ab2eae7381895669.webp',
                salePrice: 24999,
                originalPrice: 44999,
                discount: 44,
                rating: 4.8,
                reviewsCount: 940,
                grade: 'Flawless',
                specs: ['S-Pen Stylus Included in Box', 'IP68 Water & Dust Resistance', '90Hz 10.9" Vivid Display', '8000mAh Massive Battery'],
                tag: 'S-PEN INCLUDED',
                batteryHealth: '95% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/samsung-galaxy-tab-s9-fe-refurbished',
            },
            {
                id: 'samsung-galaxy-tab-a9-plus',
                name: 'Samsung Galaxy Tab A9+ (11.0 inch, 5G SIM, 64GB) - Refurbished',
                slug: 'samsung-galaxy-tab-a9-plus-refurbished',
                brand: 'samsung',
                series: 'samsung-tab',
                screenSize: '11-inch',
                connectivity: 'cellular',
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80',
                salePrice: 13999,
                originalPrice: 20999,
                discount: 33,
                rating: 4.7,
                reviewsCount: 1890,
                grade: 'Superb',
                specs: ['11-inch 90Hz Smooth Display', '5G Standalone SIM Support', 'Quad Speakers Dolby Atmos', 'Samsung DeX Multi-window'],
                tag: '5G ENTERTAINMENT',
                batteryHealth: '94% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/samsung-galaxy-tab-a9-plus-refurbished',
            },
            {
                id: 'lenovo-tab-p11-pro-gen2',
                name: 'Lenovo Tab P11 Pro Gen 2 (11.2 inch, 2.5K OLED, 128GB) - Refurbished',
                slug: 'lenovo-tab-p11-pro-gen-2-refurbished',
                brand: 'lenovo',
                series: 'lenovo-tab',
                screenSize: '11.2-inch',
                connectivity: 'wifi',
                image: 'https://s3ng.cashify.in/estore/20390480af374538ab16b74508c8016e.webp',
                salePrice: 16999,
                originalPrice: 39999,
                discount: 57,
                rating: 4.7,
                reviewsCount: 1420,
                grade: 'Superb',
                specs: ['11.2-inch 120Hz 2.5K OLED Screen', 'JBL Quad Speakers with Dolby Atmos', 'Kompanio 1300T Gaming SoC', 'Precision Pen 3 Support'],
                tag: 'OLED CINEMA',
                batteryHealth: '92% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/lenovo-tab-p11-pro-gen-2-refurbished',
            },
            {
                id: 'xiaomi-pad-6',
                name: 'Xiaomi Pad 6 (11.0 inch, 144Hz 2.8K, 128GB) - Refurbished',
                slug: 'xiaomi-pad-6-refurbished',
                brand: 'xiaomi',
                series: 'all',
                screenSize: '11-inch',
                connectivity: 'wifi',
                image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=80',
                salePrice: 17999,
                originalPrice: 26999,
                discount: 33,
                rating: 4.8,
                reviewsCount: 2260,
                grade: 'Flawless',
                specs: ['144Hz 2.8K Ultra-Smooth Display', 'Snapdragon 870 Flagship SoC', '8840mAh Battery + 33W Fast Charge', 'Metal Unibody Design'],
                tag: 'SPEED DEMON',
                batteryHealth: '95% Guaranteed',
                warranty: '6 Months Warranty',
                href: '/product/xiaomi-pad-6-refurbished',
            },
        ];
    }, []);
    // Filter & Sort
    const filteredTablets = useMemo(() => {
        return tabletsCatalog
            .filter((tab) => {
            if (selectedSeries !== 'all' && tab.series !== selectedSeries)
                return false;
            if (selectedBrand !== 'all' && tab.brand !== selectedBrand)
                return false;
            if (selectedConnectivity !== 'all' && tab.connectivity !== selectedConnectivity)
                return false;
            if (selectedScreenSize !== 'all') {
                if (selectedScreenSize === 'compact' && tab.screenSize !== '8.3-inch')
                    return false;
                if (selectedScreenSize === 'standard' && !['10.2-inch', '10.9-inch', '11-inch', '11.2-inch'].includes(tab.screenSize))
                    return false;
                if (selectedScreenSize === 'large' && tab.screenSize !== '13-inch')
                    return false;
            }
            if (selectedCondition !== 'all' && tab.grade.toLowerCase() !== selectedCondition.toLowerCase())
                return false;
            if (selectedBudget !== 'all') {
                if (selectedBudget === 'under15k' && tab.salePrice >= 15000)
                    return false;
                if (selectedBudget === '15k-30k' && (tab.salePrice < 15000 || tab.salePrice > 30000))
                    return false;
                if (selectedBudget === '30k-50k' && (tab.salePrice < 30000 || tab.salePrice > 50000))
                    return false;
                if (selectedBudget === 'above50k' && tab.salePrice <= 50000)
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
        tabletsCatalog,
        selectedSeries,
        selectedBrand,
        selectedConnectivity,
        selectedScreenSize,
        selectedCondition,
        selectedBudget,
        sortBy,
    ]);
    const faqs = [
        {
            q: 'Do refurbished iPads support Apple Pencil and Magic Keyboards?',
            a: 'Yes, absolutely! All iPad models are thoroughly verified for Apple Pencil compatibility (1st gen, 2nd gen, USB-C, or Apple Pencil Pro depending on the model), including pressure sensitivity, palm rejection, magnetic snap charging, and Smart Connector keyboard docking.',
        },
        {
            q: 'What is the screen condition and touch latency on refurbished tablets?',
            a: 'Every tablet display undergoes a thorough 32-point inspection checking for uniform pixel brightness, touch digitizer latency, True Tone calibration, and zero dead pixels or ghost touches. Flawless models have completely scratch-free screens.',
        },
        {
            q: 'What is the battery health on refurbished iPads and Galaxy Tabs?',
            a: 'Sellbar guarantees a minimum of 85%+ battery health on all renewed tablets. This ensures full 8 to 10 hours of video playback or note-taking endurance, backed by our 6-month battery warranty.',
        },
        {
            q: 'What accessories come inside the box with a refurbished tablet?',
            a: 'Every tablet comes packed in a secure Sellbar Assured box containing an OEM-grade high-speed charger, braided Type-C or Lightning cable, SIM ejector pin (for cellular models), and your 6-month warranty card. On select Galaxy Tab models (e.g., S9 FE), the original S-Pen stylus is also included.',
        },
        {
            q: 'Can I use cellular SIM calling and 4G/5G on these tablets?',
            a: 'Yes! Models marked "Wifi + Cellular" support physical SIM or eSIM cards from Airtel, Jio, and Vi, enabling standalone mobile data, FaceTime, and WhatsApp calling without needing a Wi-Fi router.',
        },
        {
            q: 'What return or replacement guarantee do I get?',
            a: 'You get a 15-Day Hassle-Free Refund Policy. If you notice any technical fault or are unsatisfied with the device condition, you can initiate a doorstep return or replacement with zero deductions.',
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
          <span className="text-slate-800 font-semibold">Buy Refurbished Tablets</span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="bg-linear-to-r from-teal-900 via-slate-900 to-teal-950 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,181,155,0.2),transparent_50%)] pointer-events-none"/>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-teal-500/30">
              <Tablet className="w-4 h-4 text-teal-400"/>
              Sellbar Assured Tablets
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              India&apos;s Largest Refurbished <span className="text-teal-400">Tablet Store</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Buy certified Apple iPad Pro, iPad Air, iPad Mini, Samsung Galaxy Tab &amp; Lenovo tablets at up to{' '}
              <strong className="text-teal-300">55% off</strong> retail prices. Every device is tested through 32 quality
              checks with 85%+ battery health, fast charger included, 6 months warranty, and 15 days refund.
            </p>

            {/* Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">6 Months Warranty</span>
                <span className="text-[11px] text-slate-300">Free Doorstep Fix</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <PenTool className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">32-Point QA Check</span>
                <span className="text-[11px] text-slate-300">Pencil &amp; Digitizer OK</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <BatteryCharging className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">85%+ Battery Health</span>
                <span className="text-[11px] text-slate-300">10h Video Run Time</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 text-center">
                <RefreshCw className="w-5 h-5 text-teal-400 mx-auto mb-1"/>
                <span className="text-xs font-bold block text-white">15-Day Refund</span>
                <span className="text-[11px] text-slate-300">100% Money Back</span>
              </div>
            </div>
          </div>

          {/* Flash Deal Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm mb-2">
              <Flame className="w-5 h-5 animate-bounce"/>
              LIMITED STOCK TABLET DEALS
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
              Instant ₹2,000 Off on ICICI &amp; HDFC Cards | Free Fast 20W/30W Charger Included
            </p>
            <a href="#catalog" className="inline-block w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition-all shadow-lg hover:shadow-teal-500/25">
              Shop Tablets Now
            </a>
          </div>
        </div>
      </div>

      {/* 3. Shop By Series / Category Hub */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Tablet className="w-5 h-5 text-teal-600"/>
              Shop Refurbished Tablets by Series
            </h2>
            <span className="text-xs text-slate-500">{tabletsCatalog.length} Devices In Stock</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {seriesCategories.map((item) => (<button key={item.slug} onClick={() => setSelectedSeries(item.slug)} className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${selectedSeries === item.slug
                ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}>
                <div className="w-14 h-14 relative rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                  <Image src={item.image} alt={item.name} width={56} height={56} className="object-contain"/>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">{item.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.count} items</p>
              </button>))}
          </div>
        </div>
      </div>

      {/* 4. Filter Toolbar & Catalog */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-teal-600"/>
              <span className="font-bold text-slate-900 text-sm">Tablet Filters</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                Showing {filteredTablets.length} tablets
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
                <option value="all">All (Wi-Fi &amp; Cellular 4G/5G)</option>
                <option value="wifi">Wi-Fi Only</option>
                <option value="cellular">Wi-Fi + Cellular (SIM Slot)</option>
              </select>
            </div>

            {/* Screen Size */}
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Screen Size</label>
              <select value={selectedScreenSize} onChange={(e) => setSelectedScreenSize(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-1 focus:ring-teal-500">
                <option value="all">All Screen Sizes</option>
                <option value="compact">Compact (&lt;9 inch iPad Mini)</option>
                <option value="standard">Standard (10 - 11 inch)</option>
                <option value="large">Large (12 - 13 inch Air/Pro)</option>
              </select>
            </div>

            {/* Condition Grade */}
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Condition Grade</label>
              <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-1 focus:ring-teal-500">
                <option value="all">All Grades</option>
                <option value="flawless">Flawless (Grade A+ Pristine)</option>
                <option value="superb">Superb (Micro Signs)</option>
                <option value="good">Good (Light Cosmetic Wear)</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-slate-500 font-medium mb-1.5">Price Budget</label>
              <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:ring-1 focus:ring-teal-500">
                <option value="all">All Budgets</option>
                <option value="under15k">Under ₹15,000</option>
                <option value="15k-30k">₹15,000 - ₹30,000</option>
                <option value="30k-50k">₹30,000 - ₹50,000</option>
                <option value="above50k">Above ₹50,000 (Pro &amp; Air)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Tablets Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTablets.map((tab) => {
            const isWish = wishlist.includes(tab.id);
            const monthlyEmi = Math.round(tab.salePrice / 6);
            return (<div key={tab.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-teal-500/50 transition-all flex flex-col group relative">
                {/* Badges Bar */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="bg-slate-900/80 backdrop-blur-sm text-teal-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-teal-500/30">
                    {tab.tag}
                  </span>
                  <button onClick={() => toggleWishlist(tab.id)} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center text-slate-600 hover:text-rose-500 transition-colors">
                    <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`}/>
                  </button>
                </div>

                {/* Tablet Image */}
                <Link href={tab.href} className="block relative pt-12 pb-6 px-6 bg-slate-50/50 group-hover:bg-teal-50/20 transition-colors">
                  <div className="h-52 w-full relative flex items-center justify-center">
                    <Image src={tab.image} alt={tab.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"/>
                  </div>
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px]">
                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      {tab.grade}
                    </span>
                    <span className="bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      <BatteryCharging className="w-3 h-3"/>
                      {tab.batteryHealth}
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-1.5">
                      <div className="flex items-center">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>
                        <span className="ml-1 text-slate-800 font-bold">{tab.rating}</span>
                      </div>
                      <span className="text-slate-400">({tab.reviewsCount} reviews)</span>
                    </div>

                    <Link href={tab.href}>
                      <h3 className="font-bold text-slate-900 text-sm hover:text-teal-600 transition-colors line-clamp-2 leading-snug">
                        {tab.name}
                      </h3>
                    </Link>

                    {/* Specs Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tab.specs.map((spec, idx) => (<span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                          {spec}
                        </span>))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-slate-900">
                        ₹{tab.salePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{tab.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {tab.discount}% OFF
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600"/>
                      No Cost EMI from <strong className="text-slate-700">₹{monthlyEmi.toLocaleString('en-IN')}/mo</strong>
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link href={tab.href} className="w-full text-center py-2 px-3 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs transition-colors">
                        View Specs
                      </Link>
                      <Link href={tab.href} className="w-full text-center py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-sm">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>);
        })}
        </div>

        {filteredTablets.length === 0 && (<div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Tablet className="w-12 h-12 text-slate-300 mx-auto mb-3"/>
            <h3 className="text-base font-bold text-slate-700">No Tablets Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Try adjusting your series, screen size, or connectivity filters to view available inventory.
            </p>
            <button onClick={() => {
                setSelectedSeries('all');
                setSelectedBrand('all');
                setSelectedConnectivity('all');
                setSelectedScreenSize('all');
                setSelectedCondition('all');
                setSelectedBudget('all');
            }} className="text-xs bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg">
              Reset All Filters
            </button>
          </div>)}
      </div>

      {/* 6. Sellbar Assured 32-Point Tablet Inspection Protocol */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-400"/>
              Sellbar Assured Certification
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              The 32-Point Tablet Quality Inspection
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Every iPad and Android tablet is audited across hardware, battery cycles, display digitizer, and stylus compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <PenTool className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">1. Display &amp; Stylus Digitizer</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Liquid Retina color calibration &amp; TrueTone</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Apple Pencil / S-Pen pressure sensitivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Zero dead pixels, back-light bleed, or burn</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>10-point multi-touch and palm rejection</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <BatteryCharging className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">2. Battery Life &amp; Charging</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>85%+ verified battery health capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Fast USB-C / Lightning power intake audit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>10-hour continuous HD playback test</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Zero swelling, zero thermal throttling</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <Volume2 className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">3. Quad Audio &amp; Cameras</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Quad landscape stereo speaker balance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Center Stage 12MP ultra-wide video calling</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Dual beamforming microphone test</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Rear camera 4K document scan clarity</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5"/>
              </div>
              <h3 className="font-bold text-sm text-white mb-2">4. Biometrics &amp; Casing</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Touch ID / Face ID sensor accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Smart Connector keyboard docking lock</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>4G/5G SIM tray &amp; eSIM activation check</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5"/>
                  <span>Hospital-grade UV sterilization &amp; wipe</span>
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
            Refurbished Tablet Grades Explained
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every tablet functions 100% like new with original performance and 6 months warranty. Grades reflect cosmetic condition only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-500 shadow-lg relative">
            <span className="absolute -top-3 left-6 bg-emerald-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase">
              Flawless (Like New)
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Flawless Grade</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Pristine glass &amp; metal back, virtually indistinguishable from a new boxed tablet.</p>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>Zero scratches on Retina display or aluminum back</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>93%+ Battery Health guaranteed</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>6 Months Doorstep Warranty</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600"/>
                <span>OEM fast charger &amp; braided cable included</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="absolute -top-3 left-6 bg-teal-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase">
              Superb (Best Value)
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Superb Grade</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Display is pristine. Barely visible micro-scratches on back aluminum under close light.</p>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600"/>
                <span>Flawless touchscreen glass with zero marks</span>
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
                <span>OEM fast charger &amp; braided cable included</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative">
            <span className="absolute -top-3 left-6 bg-slate-700 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase">
              Good (Maximum Savings)
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">Good Grade</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Light cosmetic scuffs on edges/back. 100% functional display, sensors, and battery.</p>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-slate-700"/>
                <span>Fully functional touch digitizer &amp; Pencil support</span>
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
                <span>OEM fast charger &amp; braided cable included</span>
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
              Verified Tablet Buyer Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Over 35,000+ happy students, creators, and professionals using Sellbar certified tablets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400"/>))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &quot;Bought the iPad 9th Gen for my UPSC preparation. Taking notes on Goodnotes with Apple Pencil is buttery smooth. The battery easily lasts two full days of PDF reading. Fast charger was included in the box!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                  AY
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Ananya Yadav</h4>
                  <p className="text-[11px] text-teal-600 font-medium">Verified Buyer • Prayagraj</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400"/>))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &quot;Got the iPad Pro 11 M2 for graphic design work on Procreate. 120Hz ProMotion display is unbelievable. The condition was Flawless — zero scratches anywhere. Saved over ₹30,000!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                  KD
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Karan Deshmukh</h4>
                  <p className="text-[11px] text-teal-600 font-medium">Verified Buyer • Pune</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400"/>))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                &quot;Ordered Samsung Galaxy Tab S9 FE. The original S-Pen was included and magnetic charging worked right away. Netflix watching on the 90Hz screen with stereo speakers is amazing.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                  SM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Sameer Mathur</h4>
                  <p className="text-[11px] text-teal-600 font-medium">Verified Buyer • Jaipur</p>
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
            Everything you need to know about purchasing a certified refurbished tablet from Sellbar.
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
