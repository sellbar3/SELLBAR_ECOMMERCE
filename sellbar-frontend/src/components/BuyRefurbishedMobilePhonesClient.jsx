'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Truck, Heart, Star, ChevronDown, Zap, Flame, Award, ArrowRight, Clock, Sparkles, Smartphone, Check, } from 'lucide-react';
export default function BuyRefurbishedMobilePhonesClient({ initialProducts, }) {
    // Brand selection filter
    const [selectedBrand, setSelectedBrand] = useState('all');
    // Price filter
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    // Condition filter
    const [selectedCondition, setSelectedCondition] = useState('all');
    // Wishlist state
    const [wishlist, setWishlist] = useState([]);
    // FAQ accordion open state
    const [openFaq, setOpenFaq] = useState(0);
    // Flash Sale Countdown (5 hours, 42 mins, 18 secs default)
    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });
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
    // Brands list matching Cashify's exact top brands
    const brands = [
        {
            name: 'All Brands',
            slug: 'all',
            icon: 'https://s3ng.cashify.in/estore/d3abed491a974d0bae84c21e1f7c96bd.webp',
            count: 48,
        },
        {
            name: 'Apple',
            slug: 'apple',
            icon: 'https://s3ng.cashify.in/estore/d3abed491a974d0bae84c21e1f7c96bd.webp',
            count: 18,
        },
        {
            name: 'Samsung',
            slug: 'samsung',
            icon: 'https://s3ng.cashify.in/estore/009c40d8abce40ce9bbfe1dc31cc4588.webp',
            count: 14,
        },
        {
            name: 'OnePlus',
            slug: 'oneplus',
            icon: 'https://s3ng.cashify.in/estore/074194479ff645c887be8de00e55a40b.webp',
            count: 9,
        },
        {
            name: 'Google Pixel',
            slug: 'google',
            icon: 'https://s3ng.cashify.in/estore/2c9b1a6a6b364548b6d034ee2066f1a8.webp',
            count: 6,
        },
        {
            name: 'Xiaomi',
            slug: 'xiaomi',
            icon: 'https://s3ng.cashify.in/estore/77dd0b0b75654d4399d6c654669e8df7.webp',
            count: 12,
        },
        {
            name: 'Vivo',
            slug: 'vivo',
            icon: 'https://s3ng.cashify.in/estore/882fd9f1a1264daa8f214ee81f0b279e.webp',
            count: 8,
        },
        {
            name: 'OPPO',
            slug: 'oppo',
            icon: 'https://s3ng.cashify.in/estore/5dd67bb05ef34fc58a4ec87e988f12c8.webp',
            count: 8,
        },
        {
            name: 'Realme',
            slug: 'realme',
            icon: 'https://s3ng.cashify.in/estore/43bac286e28f49fba0098618a2bd558d.webp',
            count: 7,
        },
        {
            name: 'Motorola',
            slug: 'motorola',
            icon: 'https://s3ng.cashify.in/estore/c015eeb0d7da4268ac82e0bc66ec1043.webp',
            count: 5,
        },
        {
            name: 'POCO',
            slug: 'poco',
            icon: 'https://s3ng.cashify.in/estore/a77a0220333f40f2b82096c2980c362e.webp',
            count: 6,
        },
        {
            name: 'IQOO',
            slug: 'iqoo',
            icon: 'https://s3ng.cashify.in/estore/82f1f4383e7e4d048d13bca9d5e17945.webp',
            count: 4,
        },
    ];
    // Curated Flash Sale & Bestselling Refurbished Mobiles with Cashify images & verified prices
    const catalogProducts = useMemo(() => {
        return [
            {
                id: 'phone-ip13-128',
                name: 'Apple iPhone 13 - Refurbished',
                slug: 'apple-iphone-13',
                brand: 'Apple',
                brandSlug: 'apple',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/96a67b00-9389.jpg',
                salePrice: 38999,
                originalPrice: 59900,
                discount: 35,
                rating: 4.6,
                reviewsCount: 1842,
                grade: 'Superb',
                condition: 'SUPERB',
                specs: ['128GB Storage', 'A15 Bionic', 'Super Retina XDR OLED', '12MP Dual Camera'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'HOT DEAL',
                isAndroid: false,
                href: '/product/apple-iphone-13-128gb',
            },
            {
                id: 'phone-ip14-128',
                name: 'Apple iPhone 14 - Refurbished',
                slug: 'apple-iphone-14',
                brand: 'Apple',
                brandSlug: 'apple',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/36ea82c3-6d6a.jpg',
                salePrice: 46999,
                originalPrice: 69900,
                discount: 33,
                rating: 4.8,
                reviewsCount: 1290,
                grade: 'Flawless',
                condition: 'FLAWLESS',
                specs: ['128GB Storage', 'Photonic Engine', 'Action Mode', 'All-Day Battery'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'FLASH SALE',
                isAndroid: false,
                href: '/product/apple-iphone-14-128gb',
            },
            {
                id: 'phone-ip15-128',
                name: 'Apple iPhone 15 - Refurbished',
                slug: 'apple-iphone-15',
                brand: 'Apple',
                brandSlug: 'apple',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/e2c7dff8-23a0.jpg',
                salePrice: 54999,
                originalPrice: 79900,
                discount: 31,
                rating: 4.9,
                reviewsCount: 890,
                grade: 'Flawless',
                condition: 'FLAWLESS',
                specs: ['Dynamic Island', '48MP Main Camera', 'USB-C Charging', 'A16 Bionic'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: 'FLAGSHIP',
                isAndroid: false,
                href: '/product/apple-iphone-15-128gb',
            },
            {
                id: 'phone-ip12-64',
                name: 'Apple iPhone 12 - Refurbished',
                slug: 'apple-iphone-12',
                brand: 'Apple',
                brandSlug: 'apple',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/bf8ed21e-96c9.jpg',
                salePrice: 24999,
                originalPrice: 49900,
                discount: 50,
                rating: 4.5,
                reviewsCount: 3120,
                grade: 'Good',
                condition: 'GOOD',
                specs: ['64GB Storage', 'Ceramic Shield', '5G Capable', 'MagSafe Ready'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: '50% OFF',
                isAndroid: false,
                href: '/product/apple-iphone-12-64gb',
            },
            {
                id: 'phone-s23u-256',
                name: 'Samsung Galaxy S23 Ultra 5G - Refurbished',
                slug: 'samsung-galaxy-s23-ultra',
                brand: 'Samsung',
                brandSlug: 'samsung',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/39e11015-6847.jpg',
                salePrice: 69999,
                originalPrice: 124999,
                discount: 44,
                rating: 4.9,
                reviewsCount: 1450,
                grade: 'Flawless',
                condition: 'FLAWLESS',
                specs: ['200MP Camera', 'Snapdragon 8 Gen 2', 'Embedded S-Pen', '5000mAh'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'POWERHOUSE',
                isAndroid: true,
                href: '/product/samsung-galaxy-s23-ultra',
            },
            {
                id: 'phone-op11-256',
                name: 'OnePlus 11 5G - Refurbished',
                slug: 'oneplus-11-5g',
                brand: 'OnePlus',
                brandSlug: 'oneplus',
                image: 'https://s3ng.cashify.in/cashify/store/product/fd8a3454f2594ebfa6b420172a2bb882.webp',
                salePrice: 34999,
                originalPrice: 56999,
                discount: 39,
                rating: 4.7,
                reviewsCount: 934,
                grade: 'Superb',
                condition: 'SUPERB',
                specs: ['Hasselblad Optics', '100W SUPERVOOC', '16GB RAM / 256GB', 'Snapdragon 8 Gen 2'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'BEST BUY',
                isAndroid: true,
                href: '/product/oneplus-11-5g',
            },
            {
                id: 'phone-pixel7p-128',
                name: 'Google Pixel 7 Pro 5G - Refurbished',
                slug: 'google-pixel-7-pro',
                brand: 'Google Pixel',
                brandSlug: 'google',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/3f3c7d71-3cf7.jpg',
                salePrice: 32999,
                originalPrice: 84999,
                discount: 61,
                rating: 4.6,
                reviewsCount: 780,
                grade: 'Superb',
                condition: 'SUPERB',
                specs: ['Google Tensor G2', '5x Optical Telephoto', 'Magic Eraser', 'Clean Android 15'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: '61% OFF',
                isAndroid: true,
                href: '/product/google-pixel-7-pro',
            },
            {
                id: 'phone-ip11-64',
                name: 'Apple iPhone 11 - Refurbished',
                slug: 'apple-iphone-11',
                brand: 'Apple',
                brandSlug: 'apple',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/d8394bf8-e922.jpg',
                salePrice: 18999,
                originalPrice: 39900,
                discount: 52,
                rating: 4.4,
                reviewsCount: 4210,
                grade: 'Good',
                condition: 'GOOD',
                specs: ['64GB Storage', 'Liquid Retina HD', 'Night Mode Dual Camera', 'Face ID'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'UNDER ₹20K',
                isAndroid: false,
                href: '/product/apple-iphone-11-64gb',
            },
            {
                id: 'phone-reno15p',
                name: 'OPPO Reno15 Pro 5G - Refurbished',
                slug: 'renewed-oppo-reno15-pro',
                brand: 'OPPO',
                brandSlug: 'oppo',
                image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
                salePrice: 55599,
                originalPrice: 74999,
                discount: 26,
                rating: 4.8,
                reviewsCount: 412,
                grade: 'Flawless',
                condition: 'FLAWLESS',
                specs: ['12GB RAM / 256GB', '200MP Triple Camera', '80W SuperVOOC', 'Dimensity 8450'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: 'LATEST 2026',
                isAndroid: true,
                href: '/product/renewed-oppo-reno15-pro',
            },
            {
                id: 'phone-rn12p',
                name: 'Xiaomi Redmi Note 12 Pro 5G - Refurbished',
                slug: 'redmi-note-12-pro',
                brand: 'Xiaomi',
                brandSlug: 'xiaomi',
                image: 'https://s3ng.cashify.in/cashify/store/product/14c8228b80c24fd894a6f26831b3013d.png',
                salePrice: 13499,
                originalPrice: 24999,
                discount: 46,
                rating: 4.4,
                reviewsCount: 1680,
                grade: 'Superb',
                condition: 'SUPERB',
                specs: ['50MP Sony IMX766 OIS', '120Hz Pro AMOLED', '67W Turbo Charge', 'Dimensity 1080'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'VALUE CHAMP',
                isAndroid: true,
                href: '/product/redmi-note-12-pro',
            },
            {
                id: 'phone-v29-128',
                name: 'Vivo V29 5G - Refurbished',
                slug: 'vivo-v29-5g',
                brand: 'Vivo',
                brandSlug: 'vivo',
                image: 'https://s3ng.cashify.in/cashify/store/product/23fec87352d94b0a889910346f9ebc78.png',
                salePrice: 21999,
                originalPrice: 32999,
                discount: 33,
                rating: 4.5,
                reviewsCount: 650,
                grade: 'Superb',
                condition: 'SUPERB',
                specs: ['Smart Aura Light', '50MP Eye AF Selfie', '3D Curved AMOLED', '80W FlashCharge'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: 'PORTRAIT KING',
                isAndroid: true,
                href: '/product/vivo-v29-5g',
            },
            {
                id: 'phone-poco-x5p',
                name: 'POCO X5 Pro 5G - Refurbished',
                slug: 'poco-x5-pro',
                brand: 'POCO',
                brandSlug: 'poco',
                image: 'https://s3ng.cashify.in/cashify/store/product/64fa5b28a748498183a284f438b5681a.webp',
                salePrice: 14499,
                originalPrice: 22999,
                discount: 37,
                rating: 4.5,
                reviewsCount: 1120,
                grade: 'Good',
                condition: 'GOOD',
                specs: ['Snapdragon 778G', '108MP Studio Camera', '120Hz X-finity AMOLED', 'Dolby Vision'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: 'GAMING VALUE',
                isAndroid: true,
                href: '/product/poco-x5-pro',
            },
        ];
    }, []);
    // Filter products based on active filters
    const filteredProducts = useMemo(() => {
        return catalogProducts.filter((product) => {
            // Brand filter
            if (selectedBrand !== 'all' && product.brandSlug !== selectedBrand) {
                return false;
            }
            // Condition filter
            if (selectedCondition !== 'all' && product.grade.toLowerCase() !== selectedCondition.toLowerCase()) {
                return false;
            }
            // Price range filter
            if (selectedPriceRange === 'under-9999' && product.salePrice > 9999)
                return false;
            if (selectedPriceRange === '10k-15k' && (product.salePrice < 10000 || product.salePrice > 14999))
                return false;
            if (selectedPriceRange === '15k-20k' && (product.salePrice < 15000 || product.salePrice > 19999))
                return false;
            if (selectedPriceRange === '20k-30k' && (product.salePrice < 20000 || product.salePrice > 29999))
                return false;
            if (selectedPriceRange === 'above-30k' && product.salePrice < 30000)
                return false;
            return true;
        });
    }, [catalogProducts, selectedBrand, selectedCondition, selectedPriceRange]);
    // Flash sale products slice
    const flashSaleProducts = catalogProducts.filter((p) => p.isFlashSale);
    // Android highlights
    const androidDeals = catalogProducts.filter((p) => p.isAndroid);
    // Conditions detailed
    const conditions = [
        {
            grade: 'Flawless',
            badge: 'Like New (Grade A++)',
            bgClass: 'bg-emerald-50 border-emerald-200 text-emerald-800',
            tagColor: 'bg-emerald-600 text-white',
            desc: 'Virtually indistinguishable from brand new. Zero scratches or scuffs.',
            screen: '100% scratch-free pristine OLED / AMOLED',
            body: 'Zero visible signs of prior use',
            battery: '95% to 100% original battery health',
            warranty: 'Up to 12 Months Doorstep Warranty',
        },
        {
            grade: 'Superb',
            badge: 'Grade A+ (Best Seller)',
            bgClass: 'bg-teal-50 border-teal-200 text-teal-800',
            tagColor: 'bg-[#13b59b] text-white',
            desc: 'Minimal faint micro-scratches invisible from 20cm viewing distance.',
            screen: 'Clean glass, zero cracks or touch defects',
            body: 'Negligible micro-marks on frame',
            battery: '90%+ high-capacity battery health',
            warranty: '6 Months Doorstep Warranty',
        },
        {
            grade: 'Good',
            badge: 'Grade A (High Value)',
            bgClass: 'bg-blue-50 border-blue-200 text-blue-800',
            tagColor: 'bg-blue-600 text-white',
            desc: 'Minor cosmetic hairline scratches easily hidden under a phone case or skin.',
            screen: '100% fully responsive, minor hairline marks',
            body: 'Light pocket wear on rear cover or bezel',
            battery: '85%+ reliable battery health',
            warranty: '6 Months Doorstep Warranty',
        },
        {
            grade: 'Fair',
            badge: 'Smart Value (Maximum Savings)',
            bgClass: 'bg-amber-50 border-amber-200 text-amber-800',
            tagColor: 'bg-amber-600 text-white',
            desc: 'Visible cosmetic wear on edges or back, but 100% functional excellence inside.',
            screen: 'Fully operational touch & display',
            body: 'Noticeable signs of previous usage',
            battery: '80%+ tested operational battery',
            warranty: '6 Months Doorstep Warranty',
        },
    ];
    // Verified Customer Reviews / Earth Heroes
    const reviews = [
        {
            name: 'Dharam Rathore',
            location: 'New Delhi',
            device: 'Apple iPhone 13 (Superb)',
            avatar: 'https://s3bg.cashify.in/gpro/uploads/2024/02/19132918/pexels-yan-krukau-8819260%403x.webp',
            rating: 5,
            date: 'Verified Buyer • 3 days ago',
            comment: 'Refurbished phones from Sellbar are top tier! Got my iPhone 13 in Superb condition at almost half of original showroom price. Battery health is at 94% and camera is stunning. Thank you Sellbar!',
        },
        {
            name: 'Pooja Venkatesh',
            location: 'Bengaluru',
            device: 'Samsung Galaxy S23 Ultra (Flawless)',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
            rating: 5,
            date: 'Verified Buyer • 1 week ago',
            comment: 'I was skeptical about buying refurbished electronics online, but Sellbar exceeded every expectation. The 32-point checklist certificate was inside the box and phone looks 100% brand new. Will buy again!',
        },
        {
            name: 'Aditya Malhotra',
            location: 'Mumbai',
            device: 'OnePlus 11 5G (Superb)',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            rating: 5,
            date: 'Verified Buyer • 2 weeks ago',
            comment: 'Saved ₹22,000 on OnePlus 11 with 16GB RAM! Blazing fast, 100W fast charging works flawlessly and got 6 months doorstep warranty. Best site for refurbished phones in India.',
        },
        {
            name: 'Meenakshi Sundaram',
            location: 'Chennai',
            device: 'Apple iPhone 12 (Good)',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
            rating: 5,
            date: 'Verified Buyer • 3 weeks ago',
            comment: 'Bought an iPhone 12 for my daughter under ₹25,000. Super clean screen, battery backup is solid and delivery was completed in 48 hours. Genuine accessories included.',
        },
    ];
    // Exact FAQs from live Cashify page
    const faqs = [
        {
            q: 'Why should I buy refurbished phones instead of new ones?',
            a: "Because it helps you save a lot of money. It's not just a 5 to 10 percent discount. With Sellbar, you can get refurbished phones at almost half the MRP price. You don't have to pay the full price anymore! Plus, you get a 6-month warranty and 32-point inspection.",
        },
        {
            q: 'Is Sellbar the best site for refurbished phones in India?',
            a: 'Yes! Lots of users consider Sellbar the most trusted destination for refurbished phones in India. This is because every device undergoes strict 32-point hardware and software diagnostics, transparent condition grades (Flawless, Superb, Good, Fair), 6 months doorstep warranty, 15-day refund window, and free pan-India express shipping.',
        },
        {
            q: 'Are refurbished mobiles reliable for long-term use?',
            a: 'Since all refurbished phones go through 32-point quality checks by certified technicians, these checks ensure all devices work smoothly. Tech experts test screen responsiveness, cameras, battery cycles, speakers, and wireless modules so every device is fully functional. This rigorous process makes them dependable for years of daily use.',
        },
        {
            q: 'Can I find premium second hand phones at affordable prices?',
            a: 'Yes, you can easily find premium second-hand flagships like Apple iPhone 13, iPhone 14, iPhone 15 Pro, and Samsung Galaxy S23 Ultra models at up to 50% lower prices compared to new retail units.',
        },
        {
            q: 'How does buying refurbished phones help the environment?',
            a: 'Buying refurbished phones prevents e-waste from piling up in landfills and extends the life of existing hardware. Electronic manufacturing generates heavy carbon emissions and mines rare earth minerals. Choosing renewed phones is a practical, eco-friendly way to support sustainability while saving substantial money.',
        },
        {
            q: 'Are Refurbished Phones reliable?',
            a: 'Yes, refurbished mobile phones from Sellbar are highly reliable. These phones go through 32-step quality checks and come with a six-month warranty for complete peace of mind. You also enjoy free shipping and a 15-day refund option.',
        },
        {
            q: 'Is there any delivery charge on Refurbished mobiles?',
            a: 'There is free shipping available on all refurbished phones across 19,000+ PIN codes in India. You won’t have to pay any extra delivery charges.',
        },
        {
            q: 'Does Sellbar offer No Cost EMI on Mobile phones?',
            a: 'Yes, Sellbar offers No Cost EMI options on leading credit cards, debit cards, and partner NBFCs like Bajaj Finserv and Snapmint. You can split payments across 3, 6, 9, or 12 months with zero interest.',
        },
        {
            q: 'Can I get a refurbished iPhone for under Rs. 20,000?',
            a: 'Yes! You can buy a certified refurbished iPhone for under Rs. 20,000 on Sellbar. Popular models like the iPhone 11 and iPhone XR are readily available in tested, fully functioning condition.',
        },
        {
            q: 'Are flagship refurbished phones expensive?',
            a: 'No, flagship refurbished phones are very affordable compared to new retail units. Sellbar provides massive discounts on top-tier brands like Apple, Samsung, Google Pixel, and OnePlus.',
        },
        {
            q: 'Is it safe to buy a refurbished phone from Sellbar?',
            a: 'Yes, it is 100% safe. Every device is backed by a 6-month comprehensive doorstep warranty, is IMEI-cleared against blacklists, sanitized with UV-C grade sterilizers, and tested across 32 quality checkpoints.',
        },
        {
            q: 'Why should I choose Sellbar over peer-to-peer marketplaces?',
            a: 'Peer-to-peer portals carry high risks of stolen devices, hidden water damage, counterfeit parts, and zero warranty. Sellbar gives you certified genuine hardware, an invoice with GST, comprehensive warranty, and doorstep technical support.',
        },
    ];
    return (<div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* 1. HERO BREADCRUMB & BANNER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#13b59b] transition">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/buy-refurbished-gadgets" className="hover:text-[#13b59b] transition">
              Refurbished Gadgets
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Buy Refurbished Mobile Phones</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#13b59b] text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5"/> India&apos;s #1 Refurbished Smartphone Hub
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                India&apos;s Largest Refurbished Mobile Phone Store
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Upgrade to certified Apple iPhones, Samsung Galaxy, and Android flagships at up to 60%
                off with 32-point quality testing, 6 months warranty &amp; free doorstep pickup.
              </p>
            </div>

            {/* 4 Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center shrink-0">
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">32-Point Check</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <Award className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">6M Warranty</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <RefreshCw className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">15-Day Refund</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <Truck className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">Free Express</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* 2. FAVOURITE BRANDS */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#13b59b]"/> Favourite Brands
              </h2>
              <p className="text-xs text-slate-500">
                Filter India&apos;s most sought-after pre-owned smartphone brands
              </p>
            </div>
            {selectedBrand !== 'all' && (<button onClick={() => setSelectedBrand('all')} className="text-xs font-bold text-[#13b59b] hover:underline">
                Reset Brand Filter
              </button>)}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
            {brands.map((b) => {
            const isSelected = selectedBrand === b.slug;
            return (<button key={b.slug} onClick={() => setSelectedBrand(b.slug)} className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${isSelected
                    ? 'bg-teal-50 border-[#13b59b] shadow-md ring-2 ring-[#13b59b]/20 scale-105'
                    : 'bg-white border-slate-200 hover:border-[#13b59b] hover:shadow-sm'}`}>
                  <div className="relative w-10 h-10 mb-1.5 flex items-center justify-center">
                    <Image src={b.icon} alt={b.name} fill className="object-contain" sizes="40px"/>
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 text-center truncate w-full">
                    {b.name}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">({b.count})</span>
                </button>);
        })}
          </div>
        </section>

        {/* 3. FLASH SALE BANNER & CAROUSEL */}
        <section className="bg-linear-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#13b59b]/10 rounded-full blur-3xl pointer-events-none"/>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-2">
                <Flame className="w-3.5 h-3.5 fill-white"/> Limited Time Flash Sale
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Super Deals on Flagship Devices
              </h2>
              <p className="text-xs text-slate-300">
                Exclusive price drops on certified iPhones, Samsung Galaxies &amp; OnePlus phones
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 self-start sm:self-auto">
              <Clock className="w-4 h-4 text-[#13b59b]"/>
              <span className="text-xs font-semibold text-slate-200">Ending in:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-sm text-white">
                <span className="bg-black/40 px-2 py-0.5 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-black/40 px-2 py-0.5 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-black/40 px-2 py-0.5 rounded text-[#13b59b]">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {flashSaleProducts.slice(0, 5).map((phone) => (<div key={phone.id} className="bg-white rounded-2xl p-4 text-slate-900 flex flex-col justify-between hover:shadow-2xl transition hover:-translate-y-1 group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-rose-50 text-rose-600 font-extrabold text-[10px] px-2 py-0.5 rounded">
                      {phone.discount}% OFF
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Grade: {phone.grade}
                    </span>
                  </div>

                  <Link href={phone.href} className="block relative w-full h-36 my-2">
                    <Image src={phone.image} alt={phone.name} fill className="object-contain group-hover:scale-105 transition" sizes="180px"/>
                  </Link>

                  <h3 className="font-bold text-xs line-clamp-2 text-slate-800 group-hover:text-[#13b59b] transition">
                    <Link href={phone.href}>{phone.name}</Link>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">{phone.specs[0]}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-black text-base text-slate-900">
                      ₹{phone.salePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-400 line-through">
                      ₹{phone.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Link href={phone.href} className="mt-2.5 w-full bg-[#13b59b] hover:bg-[#0f957f] text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 transition">
                    Grab Deal <ArrowRight className="w-3 h-3"/>
                  </Link>
                </div>
              </div>))}
          </div>
        </section>

        {/* 4. SHOP BY PRICE TILES */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Shop By Price</h2>
              <p className="text-xs text-slate-500">
                Explore handpicked refurbished phones tailored to your exact budget
              </p>
            </div>
            {selectedPriceRange !== 'all' && (<button onClick={() => setSelectedPriceRange('all')} className="text-xs font-bold text-[#13b59b] hover:underline">
                Clear Price Filter
              </button>)}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {[
            { id: 'under-9999', label: 'UNDER', amount: '₹9,999', subtitle: 'Ultra Budget' },
            { id: '10k-15k', label: 'BETWEEN', amount: '₹10k - ₹15k', subtitle: 'Best Value' },
            { id: '15k-20k', label: 'BETWEEN', amount: '₹15k - ₹20k', subtitle: 'Mid-Range Champs' },
            { id: '20k-30k', label: 'BETWEEN', amount: '₹20k - ₹30k', subtitle: 'Premium Flagship' },
            { id: 'above-30k', label: 'ABOVE', amount: '₹30,000+', subtitle: 'Pro & Ultra Class' },
        ].map((tier) => {
            const active = selectedPriceRange === tier.id;
            return (<button key={tier.id} onClick={() => setSelectedPriceRange(active ? 'all' : tier.id)} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${active
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg ring-2 ring-[#13b59b]'
                    : 'bg-white border-slate-200 hover:border-[#13b59b] hover:shadow-md'}`}>
                  <div>
                    <span className={`text-[10px] font-black tracking-wider uppercase ${active ? 'text-[#13b59b]' : 'text-slate-400'}`}>
                      {tier.label}
                    </span>
                    <div className="text-lg font-black mt-0.5 tracking-tight">{tier.amount}</div>
                  </div>
                  <div className={`mt-4 text-[11px] font-medium flex items-center justify-between ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                    <span>{tier.subtitle}</span>
                    <ArrowRight className="w-3.5 h-3.5"/>
                  </div>
                </button>);
        })}
          </div>
        </section>

        {/* 5. SELLING FAST / ALL MOBILES CATALOG */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedBrand !== 'all'
            ? `${selectedBrand.toUpperCase()} Refurbished Phones`
            : 'Selling Fast & Certified Refurbished Mobiles'}
                </h2>
                <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                  {filteredProducts.length} devices available
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Each phone is certified by Sellbar Assured with 32-point inspection &amp; warranty
              </p>
            </div>

            {/* Quick condition tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs text-slate-400 font-medium mr-1">Condition:</span>
              {['all', 'Flawless', 'Superb', 'Good'].map((c) => (<button key={c} onClick={() => setSelectedCondition(c)} className={`text-xs px-3 py-1 rounded-full font-bold transition cursor-pointer whitespace-nowrap ${selectedCondition === c
                ? 'bg-[#13b59b] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                  {c === 'all' ? 'All Grades' : c}
                </button>))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (<div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Smartphone className="w-12 h-12 text-slate-300 mx-auto mb-3"/>
              <h3 className="text-base font-bold text-slate-800">No matching smartphones found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try loosening your filters or resetting the brand and price selections to see the
                complete inventory.
              </p>
              <button onClick={() => {
                setSelectedBrand('all');
                setSelectedPriceRange('all');
                setSelectedCondition('all');
            }} className="mt-4 bg-[#13b59b] text-white text-xs font-bold px-4 py-2 rounded-xl">
                Reset All Filters
              </button>
            </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((phone) => {
                const isWishlisted = wishlist.includes(phone.id);
                return (<div key={phone.id} className="bg-white rounded-2xl border border-slate-200 hover:border-[#13b59b] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden relative group">
                    {/* Top tags */}
                    <div className="p-3 pb-0 flex items-center justify-between z-10">
                      <span className="bg-[#13b59b] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {phone.tag || `${phone.discount}% OFF`}
                      </span>
                      <button onClick={() => toggleWishlist(phone.id)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition flex items-center justify-center cursor-pointer" aria-label="Add to wishlist">
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}/>
                      </button>
                    </div>

                    {/* Image */}
                    <Link href={phone.href} className="px-6 py-3 block">
                      <div className="relative w-full h-44 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        <Image src={phone.image} alt={phone.name} fill className="object-contain drop-shadow-md" sizes="(max-width: 768px) 50vw, 25vw"/>
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="p-4 pt-0 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating & Grade */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            <Star className="w-3 h-3 fill-emerald-600 text-emerald-600"/>
                            <span>{phone.rating}</span>
                            <span className="text-slate-400">({phone.reviewsCount})</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${phone.grade === 'Flawless'
                        ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                        : phone.grade === 'Superb'
                            ? 'bg-teal-100 text-teal-900'
                            : 'bg-blue-100 text-blue-900'}`}>
                            Grade: {phone.grade}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-[#13b59b] transition">
                          <Link href={phone.href}>{phone.name}</Link>
                        </h3>

                        {/* Specs Pills */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {phone.specs.slice(0, 2).map((sp, idx) => (<span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                              {sp}
                            </span>))}
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-slate-900">
                            ₹{phone.salePrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ₹{phone.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-bold text-emerald-600">
                            Save ₹{(phone.originalPrice - phone.salePrice).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#13b59b]"/>
                          {phone.warranty} • Free Doorstep Delivery
                        </p>

                        <Link href={phone.href} className="mt-3 w-full bg-[#13b59b] hover:bg-[#0f957f] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition shadow-sm">
                          Buy Certified <ArrowRight className="w-3.5 h-3.5"/>
                        </Link>
                      </div>
                    </div>
                  </div>);
            })}
            </div>)}
        </section>

        {/* 6. BEST ANDROID DEALS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1">
                <Zap className="w-3.5 h-3.5 fill-emerald-600"/> Snapdragon &amp; Dimensity Flagships
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Best Android Deals</h2>
              <p className="text-xs text-slate-500">
                Premium Android flagships from Samsung, OnePlus, Google &amp; Xiaomi with massive savings
              </p>
            </div>
            <Link href="/buy-refurbished-mobile-phones" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1">
              View All Androids <ChevronDown className="w-3.5 h-3.5 -rotate-90"/>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {androidDeals.map((item) => (<div key={item.id} className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#13b59b] hover:shadow-md transition group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                      {item.brand}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">{item.discount}% OFF</span>
                  </div>

                  <Link href={item.href} className="block relative w-full h-40 my-2">
                    <Image src={item.image} alt={item.name} fill className="object-contain group-hover:scale-105 transition" sizes="180px"/>
                  </Link>

                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-[#13b59b] transition">
                    <Link href={item.href}>{item.name}</Link>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{item.specs.join(' • ')}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-slate-900">
                      ₹{item.salePrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400 line-through">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <Link href={item.href} className="bg-[#13b59b] hover:bg-[#0f957f] text-white p-2 rounded-xl transition" aria-label={`Buy ${item.name}`}>
                    <ArrowRight className="w-4 h-4"/>
                  </Link>
                </div>
              </div>))}
          </div>
        </section>

        {/* 7. CONDITIONS EXPLAINED */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Transparency First
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Conditions Explained
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Every refurbished smartphone at Sellbar is graded strictly on cosmetic parameters.
              Internally, each phone undergoes the same rigorous 32-point hardware inspection so that
              100% of hardware and software features function flawlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {conditions.map((cond) => (<div key={cond.grade} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition flex flex-col justify-between">
                <div>
                  <span className={`inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-3 ${cond.tagColor}`}>
                    {cond.badge}
                  </span>
                  <h3 className="text-lg font-black text-white">{cond.grade}</h3>
                  <p className="text-xs text-slate-300 mt-1 mb-4 leading-relaxed">{cond.desc}</p>

                  <div className="space-y-2 text-[11px] border-t border-white/10 pt-3">
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#13b59b] shrink-0 mt-0.5"/>
                      <span className="text-slate-300">
                        <strong className="text-white">Screen:</strong> {cond.screen}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#13b59b] shrink-0 mt-0.5"/>
                      <span className="text-slate-300">
                        <strong className="text-white">Body:</strong> {cond.body}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#13b59b] shrink-0 mt-0.5"/>
                      <span className="text-slate-300">
                        <strong className="text-white">Battery:</strong> {cond.battery}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-semibold text-[#13b59b] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5"/> {cond.warranty}
                </div>
              </div>))}
          </div>
        </section>

        {/* 8. 32-POINT QUALITY CHECKLIST */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Zero Compromise
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Sellbar 32-Point Diagnostic Inspection
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Before reaching your doorstep, every single phone goes through certified technician
              audits across all internal and external subsystems.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
            { title: 'Display & Touch', desc: 'Dead pixel test, multi-touch, TrueTone & brightness' },
            { title: 'Camera Optics', desc: 'Main, ultra-wide, telephoto, front lens & video stabilization' },
            { title: 'Battery Health', desc: 'Capacity benchmark, charge cycles & thermal stability' },
            { title: 'Connectivity', desc: '5G, 4G LTE, dual SIM, Wi-Fi 6, Bluetooth & GPS precision' },
            { title: 'Audio & Microphones', desc: 'Stereo speakers, earpiece clarity & noise cancellation' },
            { title: 'Biometrics & Sensors', desc: 'Face ID, fingerprint sensor, proximity & accelerometer' },
        ].map((checkItem, idx) => (<div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-[#13b59b] font-black text-xs flex items-center justify-center mx-auto mb-2">
                  ✓
                </div>
                <div className="font-bold text-xs text-slate-900">{checkItem.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 leading-snug">{checkItem.desc}</div>
              </div>))}
          </div>
        </section>

        {/* 9. CUSTOMER STORIES / 10+ LAKH HEROES OF EARTH */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5"/> 10+ Lakh Happy Earth Heroes
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Trusted by 10+ Lakh Smart Smartphone Buyers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Real stories from users who saved thousands while preventing e-waste with Sellbar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {reviews.map((rev, idx) => (<div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#13b59b] transition">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image src={rev.avatar} alt={rev.name} fill className="object-cover" sizes="36px"/>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{rev.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {rev.location} • {rev.device}
                    </div>
                  </div>
                </div>
              </div>))}
          </div>
        </section>

        {/* 10. IN THE NEWS */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Featured In The Press
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 text-slate-400 font-black text-sm tracking-widest uppercase">
            <span className="hover:text-slate-800 transition">The Economic Times</span>
            <span className="hover:text-slate-800 transition">TechCrunch</span>
            <span className="hover:text-slate-800 transition">NDTV Gadgets 360</span>
            <span className="hover:text-slate-800 transition">Mint</span>
            <span className="hover:text-slate-800 transition">YourStory</span>
          </div>
        </section>

        {/* 11. FAQS ACCORDION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Have Questions?
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Everything you need to know about purchasing certified refurbished mobile phones in India
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (<div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition">
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer">
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#13b59b]' : ''}`}/>
                  </button>
                  {isOpen && (<div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>)}
                </div>);
        })}
          </div>
        </section>

        {/* 12. SEO BUYING GUIDE / EDITORIAL */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 prose prose-slate max-w-none text-xs text-slate-600 space-y-4">
          <h2 className="text-lg font-black text-slate-900 mb-2">
            Buy Refurbished and Second Hand Mobile Phone Online in India
          </h2>
          <p>
            Getting flagship smartphones no longer has to feel like an expensive luxury. Through
            Sellbar, you can pick them up at nearly half the cost of a brand-new device. New phone
            models launch every few weeks, and upgrading regularly can drain your wallet. That is
            precisely why certified refurbished phones are the smartest option, giving you direct
            access to cutting-edge technology at a fraction of showroom MRP.
          </p>

          <h3 className="text-sm font-bold text-slate-800">Why Go for Refurbished Phones?</h3>
          <p>
            Contrary to common misconceptions, refurbished does not mean outdated or defective. Every
            phone at Sellbar goes through an exhaustive 32-point hardware and software diagnostic
            battery to guarantee reliable daily performance, factory-level battery efficiency, and a
            like-new feel. These tests are conducted by certified electronics technicians. Choosing
            refurbished benefits your bank balance and our planet by preventing toxic heavy metals
            from electronic waste landfills.
          </p>

          <h3 className="text-sm font-bold text-slate-800">Tons of Options to Choose From</h3>
          <p>
            A massive collection of certified pre-owned smartphones is available at Sellbar. Whether
            you are looking for an Apple iPhone 11, iPhone 12, iPhone 13, iPhone 14, or iPhone 15 Pro,
            or prefer Android champions from Samsung Galaxy S Series, OnePlus, Google Pixel, Xiaomi,
            Vivo, OPPO, and POCO—there is something tailored for every requirement and budget.
          </p>

          <h3 className="text-sm font-bold text-slate-800">
            Unmatched Warranty, 15-Day Refunds &amp; COD
          </h3>
          <p>
            Every device arrives with up to 12 months comprehensive doorstep warranty, genuine
            accessories, factory data-wipe certification, and a 15-day refund window. Experience
            hassle-free shopping with Cash on Delivery across 19,000+ Indian PIN codes and 0% No Cost
            EMI through leading banks.
          </p>
        </section>
      </div>
    </div>);
}
