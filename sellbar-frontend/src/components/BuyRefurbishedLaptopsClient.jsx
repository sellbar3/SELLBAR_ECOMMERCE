'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Truck, Heart, Star, ChevronDown, Flame, Award, ArrowRight, Clock, Sparkles, Laptop, Check, Headphones, } from 'lucide-react';
export default function BuyRefurbishedLaptopsClient({ initialProducts, }) {
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [selectedProcessor, setSelectedProcessor] = useState('all');
    const [selectedBudget, setSelectedBudget] = useState('all');
    const [selectedCondition, setSelectedCondition] = useState('all');
    const [wishlist, setWishlist] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);
    // Flash Sale Timer
    const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
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
            logo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80',
            count: 36,
        },
        {
            name: 'Apple MacBook',
            slug: 'apple',
            logo: 'https://s3ng.cashify.in/estore/d3abed491a974d0bae84c21e1f7c96bd.webp',
            count: 14,
        },
        {
            name: 'Dell',
            slug: 'dell',
            logo: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=120&q=80',
            count: 9,
        },
        {
            name: 'HP',
            slug: 'hp',
            logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=120&q=80',
            count: 8,
        },
        {
            name: 'Lenovo',
            slug: 'lenovo',
            logo: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=120&q=80',
            count: 7,
        },
        {
            name: 'ASUS',
            slug: 'asus',
            logo: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=120&q=80',
            count: 5,
        },
    ];
    // Curated Refurbished Laptops Inventory
    const laptopsCatalog = useMemo(() => {
        return [
            {
                id: 'laptop-mac-m1',
                name: 'Apple MacBook Air 13.3" Apple M1 Chip - Refurbished',
                slug: 'apple-macbook-air-m1',
                brand: 'Apple',
                brandSlug: 'apple',
                processor: 'Apple M1',
                processorType: 'apple-m',
                image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80',
                salePrice: 52999,
                originalPrice: 99900,
                discount: 47,
                rating: 4.8,
                reviewsCount: 1420,
                grade: 'Superb',
                specs: ['8GB Unified Memory', '256GB SSD', '13.3" Retina Display', 'Up to 18h Battery'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'BESTSELLER',
                batteryHealth: '92% Battery Health',
                href: '/product/apple-macbook-air-m1',
            },
            {
                id: 'laptop-mac-m2',
                name: 'Apple MacBook Air 13.6" M2 Chip - Refurbished',
                slug: 'apple-macbook-air-m2',
                brand: 'Apple',
                brandSlug: 'apple',
                processor: 'Apple M2',
                processorType: 'apple-m',
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
                salePrice: 72999,
                originalPrice: 114900,
                discount: 36,
                rating: 4.9,
                reviewsCount: 890,
                grade: 'Flawless',
                specs: ['8GB Unified RAM', '256GB SSD', 'Liquid Retina Display', 'MagSafe 3 Charging'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'FLAGSHIP',
                batteryHealth: '98% Battery Health',
                href: '/product/apple-macbook-air-m2',
            },
            {
                id: 'laptop-dell-xps13',
                name: 'Dell XPS 13 9310 Intel Core i7 11th Gen - Refurbished',
                slug: 'dell-xps-13',
                brand: 'Dell',
                brandSlug: 'dell',
                processor: 'Intel Core i7',
                processorType: 'intel-i7',
                image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
                salePrice: 48999,
                originalPrice: 109990,
                discount: 55,
                rating: 4.6,
                reviewsCount: 710,
                grade: 'Superb',
                specs: ['16GB LPDDR4x', '512GB NVMe SSD', '13.4" InfinityEdge FHD+', 'Backlit Keyboard'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: '55% OFF',
                batteryHealth: '89% Battery Health',
                href: '/product/dell-xps-13',
            },
            {
                id: 'laptop-hp-pavilion14',
                name: 'HP Pavilion 14 Intel Core i5 12th Gen - Refurbished',
                slug: 'hp-pavilion-14',
                brand: 'HP',
                brandSlug: 'hp',
                processor: 'Intel Core i5',
                processorType: 'intel-i5',
                image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
                salePrice: 32999,
                originalPrice: 62990,
                discount: 48,
                rating: 4.5,
                reviewsCount: 940,
                grade: 'Superb',
                specs: ['16GB DDR4', '512GB SSD', '14" FHD IPS Micro-Edge', 'B&O Audio'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: 'TOP VALUE',
                batteryHealth: '91% Battery Health',
                href: '/product/hp-pavilion-14',
            },
            {
                id: 'laptop-lenovo-t480',
                name: 'Lenovo ThinkPad T480 Intel Core i5 8th Gen - Refurbished',
                slug: 'lenovo-thinkpad-t480',
                brand: 'Lenovo',
                brandSlug: 'lenovo',
                processor: 'Intel Core i5',
                processorType: 'intel-i5',
                image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80',
                salePrice: 19999,
                originalPrice: 68900,
                discount: 71,
                rating: 4.6,
                reviewsCount: 2150,
                grade: 'Good',
                specs: ['16GB RAM', '256GB SSD', '14" FHD Anti-Glare', 'Legendary Spill-Proof Keys'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'UNDER ₹20K',
                batteryHealth: '86% Battery Health',
                href: '/product/lenovo-thinkpad-t480',
            },
            {
                id: 'laptop-mac-pro14',
                name: 'Apple MacBook Pro 14" M2 Pro 10-Core CPU - Refurbished',
                slug: 'apple-macbook-pro-14-m2',
                brand: 'Apple',
                brandSlug: 'apple',
                processor: 'Apple M2 Pro',
                processorType: 'apple-m',
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
                salePrice: 119999,
                originalPrice: 199900,
                discount: 40,
                rating: 4.9,
                reviewsCount: 320,
                grade: 'Flawless',
                specs: ['16GB Unified Memory', '512GB SSD', '120Hz Liquid Retina XDR', 'HDMI & SD Card'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: 'PRO WORKSTATION',
                batteryHealth: '99% Battery Health',
                href: '/product/apple-macbook-pro-14-m2',
            },
            {
                id: 'laptop-asus-zenbook14',
                name: 'ASUS ZenBook 14 OLED AMD Ryzen 7 5700U - Refurbished',
                slug: 'asus-zenbook-14-oled',
                brand: 'ASUS',
                brandSlug: 'asus',
                processor: 'AMD Ryzen 7',
                processorType: 'amd-ryzen',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
                salePrice: 42999,
                originalPrice: 82990,
                discount: 48,
                rating: 4.5,
                reviewsCount: 520,
                grade: 'Superb',
                specs: ['16GB LPDDR4x', '512GB NVMe SSD', '2.8K 90Hz OLED HDR', 'NumberPad 2.0'],
                warranty: '6 Months Warranty',
                isFlashSale: false,
                tag: 'OLED DISPLAY',
                batteryHealth: '93% Battery Health',
                href: '/product/asus-zenbook-14-oled',
            },
            {
                id: 'laptop-dell-latitude7490',
                name: 'Dell Latitude 7490 Intel Core i7 8th Gen - Refurbished',
                slug: 'dell-latitude-7490',
                brand: 'Dell',
                brandSlug: 'dell',
                processor: 'Intel Core i7',
                processorType: 'intel-i7',
                image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
                salePrice: 22499,
                originalPrice: 79990,
                discount: 72,
                rating: 4.4,
                reviewsCount: 1680,
                grade: 'Good',
                specs: ['16GB RAM', '512GB SSD', '14" FHD Display', 'Carbon Fiber Chassis'],
                warranty: '6 Months Warranty',
                isFlashSale: true,
                tag: 'OFFICE BEAST',
                batteryHealth: '87% Battery Health',
                href: '/product/dell-latitude-7490',
            },
        ];
    }, []);
    // Filtered laptops
    const filteredLaptops = useMemo(() => {
        return laptopsCatalog.filter((laptop) => {
            if (selectedBrand !== 'all' && laptop.brandSlug !== selectedBrand)
                return false;
            if (selectedProcessor !== 'all' && laptop.processorType !== selectedProcessor)
                return false;
            if (selectedCondition !== 'all' && laptop.grade.toLowerCase() !== selectedCondition.toLowerCase())
                return false;
            if (selectedBudget === 'under-25k' && laptop.salePrice >= 25000)
                return false;
            if (selectedBudget === '25k-40k' && (laptop.salePrice < 25000 || laptop.salePrice > 39999))
                return false;
            if (selectedBudget === '40k-60k' && (laptop.salePrice < 40000 || laptop.salePrice > 59999))
                return false;
            if (selectedBudget === 'above-60k' && laptop.salePrice < 60000)
                return false;
            return true;
        });
    }, [laptopsCatalog, selectedBrand, selectedProcessor, selectedCondition, selectedBudget]);
    const flashSaleLaptops = laptopsCatalog.filter((l) => l.isFlashSale);
    // Conditions Breakdown
    const conditions = [
        {
            grade: 'Superb',
            badge: 'Grade A+ (Like New)',
            bgClass: 'bg-teal-50 border-teal-200 text-teal-800',
            tagColor: 'bg-[#13b59b] text-white',
            desc: 'Looks and operates almost indistinguishable from a factory-fresh unit.',
            screen: 'Zero scratches or dead pixels. High brightness uniformity.',
            body: 'Negligible micro-marks on outer lid, pristine keyboard and palm rest.',
            battery: 'Over 90% health rating, tested charging cycle endurance.',
        },
        {
            grade: 'Good',
            badge: 'Grade A (Best Value)',
            bgClass: 'bg-blue-50 border-blue-200 text-blue-800',
            tagColor: 'bg-blue-600 text-white',
            desc: 'Light cosmetic wear on casing. Internal performance is 100% certified.',
            screen: 'Crisp display, no scratches on viewing area.',
            body: 'Minor faint scuffs on corners or bottom plate.',
            battery: 'Over 85% tested operational runtime.',
        },
        {
            grade: 'Fair',
            badge: 'Smart Value (Lowest Price)',
            bgClass: 'bg-amber-50 border-amber-200 text-amber-800',
            tagColor: 'bg-amber-600 text-white',
            desc: 'Visible signs of prior corporate usage, but 100% tested motherboard & screen.',
            screen: 'Fully functional, minor hairline marks outside active view.',
            body: 'Visible scratches or paint wear on chassis.',
            battery: 'Over 80% healthy battery capacity.',
        },
    ];
    // Companion Audio & Accessories
    const companionAudio = [
        {
            name: 'Apple AirPods 3rd Gen with MagSafe Case - Refurbished',
            price: 7999,
            originalPrice: 14900,
            discount: 46,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80',
            tag: '46% OFF',
            href: '/product/apple-airpods-3rd-gen',
        },
        {
            name: 'Sony WH-1000XM5 ANC Wireless Headphones - Refurbished',
            price: 18999,
            originalPrice: 34990,
            discount: 46,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
            tag: 'ANC CHAMP',
            href: '/product/sony-wh-1000xm5',
        },
        {
            name: 'Bose QuietComfort 45 Bluetooth Headphones - Unboxed',
            price: 14399,
            originalPrice: 26900,
            discount: 46,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
            tag: 'STUDIO SOUND',
            href: '/product/bose-qc45',
        },
        {
            name: 'Samsung Galaxy Buds 3 Active Noise Cancelling - Refurbished',
            price: 4999,
            originalPrice: 19999,
            discount: 75,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
            tag: '75% OFF',
            href: '/product/samsung-galaxy-buds-3',
        },
    ];
    // Laptop FAQs
    const faqs = [
        {
            q: 'Are refurbished laptops reliable for coding, design, and office work?',
            a: 'Absolutely. Every laptop at Sellbar goes through an exhaustive 32-step hardware inspection. Certified technicians stress-test the CPU, GPU, RAM, SSD health, thermal cooling, and battery cycle life. You receive a machine that performs with 100% factory efficiency.',
        },
        {
            q: 'Do refurbished laptops come with an original charger and operating system?',
            a: 'Yes! Every certified laptop includes an official high-speed power adapter and cord. The machine arrives pre-installed with licensed Windows 11 Pro or official Apple macOS, factory-wiped and ready for immediate plug-and-play use.',
        },
        {
            q: 'What is the warranty policy on Sellbar refurbished laptops?',
            a: 'All laptops come backed by a default 6-month comprehensive doorstep warranty out of the box. You also have the option to extend protection up to 12 months for complete peace of mind with free doorstep technician visits.',
        },
        {
            q: 'Can I return or exchange the laptop if I am unsatisfied?',
            a: 'Yes, Sellbar offers a 15-day refund and replacement window. If the device has any functional defect or does not match your expectations, you can request an instant pickup and refund.',
        },
        {
            q: 'What are the condition grades (Superb, Good, Fair) for laptops?',
            a: 'Superb (Grade A+) looks almost brand new with minimal micro-marks and battery health > 90%; Good (Grade A) exhibits light cosmetic casing marks but pristine screen and keys; Fair offers maximum financial savings with visible exterior scuffs but 100% functional excellence inside.',
        },
        {
            q: 'Are No Cost EMI and Cash on Delivery options available?',
            a: 'Yes! We provide Cash on Delivery across 19,000+ PIN codes in India and 0% No Cost EMI plans across 3, 6, 9 & 12 months through leading bank cards, Bajaj Finserv, and Snapmint.',
        },
    ];
    return (<div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* 1. HERO BREADCRUMB & HEADER */}
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
            <span className="text-slate-800 font-semibold">Buy Refurbished Laptops</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#13b59b] text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5"/> India&apos;s #1 Refurbished Laptop Store
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Buy Certified Refurbished Laptops Online
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Get Apple MacBooks, Dell XPS, HP Pavilion &amp; Lenovo ThinkPads at up to 70% off with
                32-step quality testing, 6 months warranty &amp; free doorstep delivery.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center shrink-0">
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">32-Step Check</div>
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
        {/* 2. POPULAR LAPTOP BRANDS */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-[#13b59b]"/> Favourite Laptop Brands
              </h2>
              <p className="text-xs text-slate-500">
                Filter Apple Silicon MacBooks, Dell Latitude, HP &amp; ThinkPads
              </p>
            </div>
            {selectedBrand !== 'all' && (<button onClick={() => setSelectedBrand('all')} className="text-xs font-bold text-[#13b59b] hover:underline">
                Reset Brand
              </button>)}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {brands.map((b) => {
            const isSelected = selectedBrand === b.slug;
            return (<button key={b.slug} onClick={() => setSelectedBrand(b.slug)} className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer ${isSelected
                    ? 'bg-teal-50 border-[#13b59b] shadow-md ring-2 ring-[#13b59b]/20 scale-105'
                    : 'bg-white border-slate-200 hover:border-[#13b59b] hover:shadow-sm'}`}>
                  <div className="relative w-12 h-12 mb-2 flex items-center justify-center">
                    <Image src={b.logo} alt={b.name} fill className="object-contain rounded-lg" sizes="48px"/>
                  </div>
                  <span className="text-xs font-bold text-slate-800 text-center truncate w-full">
                    {b.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">({b.count} models)</span>
                </button>);
        })}
          </div>
        </section>

        {/* 3. TODAY'S TOP DEALS & FLASH SALE */}
        <section className="bg-linear-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#13b59b]/10 rounded-full blur-3xl pointer-events-none"/>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-2">
                <Flame className="w-3.5 h-3.5 fill-white"/> Limited Stock Flash Sale
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Today&apos;s Top Laptop Deals
              </h2>
              <p className="text-xs text-slate-300">
                Massive price cuts on Apple MacBook Air M1, Dell XPS &amp; ThinkPad T-Series
              </p>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 self-start sm:self-auto">
              <Clock className="w-4 h-4 text-[#13b59b]"/>
              <span className="text-xs font-semibold text-slate-200">Deal ends in:</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
            {flashSaleLaptops.slice(0, 4).map((laptop) => (<div key={laptop.id} className="bg-white rounded-2xl p-4 text-slate-900 flex flex-col justify-between hover:shadow-2xl transition hover:-translate-y-1 group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-rose-50 text-rose-600 font-extrabold text-[10px] px-2 py-0.5 rounded">
                      {laptop.discount}% OFF
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Grade: {laptop.grade}
                    </span>
                  </div>

                  <Link href={laptop.href} className="block relative w-full h-36 my-2">
                    <Image src={laptop.image} alt={laptop.name} fill className="object-contain group-hover:scale-105 transition" sizes="180px"/>
                  </Link>

                  <h3 className="font-bold text-xs line-clamp-2 text-slate-800 group-hover:text-[#13b59b] transition">
                    <Link href={laptop.href}>{laptop.name}</Link>
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {laptop.specs.slice(0, 2).map((sp, idx) => (<span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {sp}
                      </span>))}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-black text-base text-slate-900">
                      ₹{laptop.salePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-400 line-through">
                      ₹{laptop.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Link href={laptop.href} className="mt-2.5 w-full bg-[#13b59b] hover:bg-[#0f957f] text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 transition">
                    Buy Certified <ArrowRight className="w-3 h-3"/>
                  </Link>
                </div>
              </div>))}
          </div>
        </section>

        {/* 4. SHOP BY BUDGET TILES */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Shop Laptops by Budget</h2>
              <p className="text-xs text-slate-500">
                Pick a budget bracket to see hand-picked certified machines
              </p>
            </div>
            {selectedBudget !== 'all' && (<button onClick={() => setSelectedBudget('all')} className="text-xs font-bold text-[#13b59b] hover:underline">
                Clear Budget
              </button>)}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {[
            { id: 'under-25k', label: 'BUDGET', amount: 'Under ₹25,000', subtitle: 'Students & Browsing' },
            { id: '25k-40k', label: 'MAINSTREAM', amount: '₹25,000 - ₹40,000', subtitle: 'Work From Home' },
            { id: '40k-60k', label: 'PERFORMANCE', amount: '₹40,000 - ₹60,000', subtitle: 'Coding & Multitasking' },
            { id: 'above-60k', label: 'FLAGSHIP', amount: 'Above ₹60,000', subtitle: 'Pro Creators & M2/M3 Mac' },
        ].map((tier) => {
            const active = selectedBudget === tier.id;
            return (<button key={tier.id} onClick={() => setSelectedBudget(active ? 'all' : tier.id)} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${active
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

        {/* 5. MAIN LAPTOPS CATALOG */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedBrand !== 'all'
            ? `${selectedBrand.toUpperCase()} Certified Laptops`
            : 'Bestselling Certified Refurbished Laptops'}
                </h2>
                <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                  {filteredLaptops.length} available
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Every unit includes an official charger, 32-step inspection certificate &amp; doorstep warranty
              </p>
            </div>

            {/* Processor filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs text-slate-400 font-medium mr-1">Chip:</span>
              {[
            { id: 'all', label: 'All Chips' },
            { id: 'apple-m', label: 'Apple Silicon' },
            { id: 'intel-i5', label: 'Core i5' },
            { id: 'intel-i7', label: 'Core i7' },
            { id: 'amd-ryzen', label: 'Ryzen' },
        ].map((p) => (<button key={p.id} onClick={() => setSelectedProcessor(p.id)} className={`text-xs px-3 py-1 rounded-full font-bold transition cursor-pointer whitespace-nowrap ${selectedProcessor === p.id
                ? 'bg-[#13b59b] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                  {p.label}
                </button>))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredLaptops.map((laptop) => {
            const isWishlisted = wishlist.includes(laptop.id);
            return (<div key={laptop.id} className="bg-white rounded-2xl border border-slate-200 hover:border-[#13b59b] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden relative group">
                  {/* Top tags */}
                  <div className="p-3 pb-0 flex items-center justify-between z-10">
                    <span className="bg-[#13b59b] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {laptop.tag || `${laptop.discount}% OFF`}
                    </span>
                    <button onClick={() => toggleWishlist(laptop.id)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition flex items-center justify-center cursor-pointer" aria-label="Wishlist">
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}/>
                    </button>
                  </div>

                  {/* Image */}
                  <Link href={laptop.href} className="px-6 py-4 block">
                    <div className="relative w-full h-44 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      <Image src={laptop.image} alt={laptop.name} fill className="object-contain drop-shadow-md" sizes="(max-width: 768px) 50vw, 25vw"/>
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="p-4 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Grade */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600"/>
                          <span>{laptop.rating}</span>
                          <span className="text-slate-400">({laptop.reviewsCount})</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${laptop.grade === 'Flawless'
                    ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                    : 'bg-teal-100 text-teal-900'}`}>
                          Grade: {laptop.grade}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-[#13b59b] transition">
                        <Link href={laptop.href}>{laptop.name}</Link>
                      </h3>

                      {/* Specs pills */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {laptop.specs.slice(0, 3).map((sp, idx) => (<span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {sp}
                          </span>))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900">
                          ₹{laptop.salePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{laptop.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          Save ₹{(laptop.originalPrice - laptop.salePrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#13b59b]"/>
                        {laptop.warranty} • Charger Included
                      </p>

                      <Link href={laptop.href} className="mt-3 w-full bg-[#13b59b] hover:bg-[#0f957f] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition shadow-sm">
                        Buy Certified <ArrowRight className="w-3.5 h-3.5"/>
                      </Link>
                    </div>
                  </div>
                </div>);
        })}
          </div>
        </section>

        {/* 6. CONDITIONS EXPLAINED FOR LAPTOPS */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Laptop Conditions Explained
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Every refurbished laptop at Sellbar is graded strictly on cosmetic parameters.
              Internally, each machine passes the full 32-step hardware diagnostic battery—display,
              trackpad, ports, thermals, and battery health are 100% operational.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                        <strong className="text-white">Display:</strong> {cond.screen}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#13b59b] shrink-0 mt-0.5"/>
                      <span className="text-slate-300">
                        <strong className="text-white">Chassis:</strong> {cond.body}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#13b59b] shrink-0 mt-0.5"/>
                      <span className="text-slate-300">
                        <strong className="text-white">Battery Health:</strong> {cond.battery}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-semibold text-[#13b59b] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5"/> Includes 6 Months Doorstep Warranty
                </div>
              </div>))}
          </div>
        </section>

        {/* 7. COMPANION AUDIO & ACCESSORIES CAROUSEL */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#13b59b] text-xs font-bold px-2.5 py-0.5 rounded-full mb-1">
                <Headphones className="w-3.5 h-3.5"/> Work &amp; Study Companions
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Best Selling Audio Devices
              </h2>
              <p className="text-xs text-slate-500">
                Pair your refurbished laptop with studio-grade noise-cancelling headphones and earbuds
              </p>
            </div>
            <Link href="/buy-refurbished-gadgets" className="text-xs font-bold text-[#13b59b] hover:underline">
              View All Audio
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {companionAudio.map((item, idx) => (<div key={idx} className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:border-[#13b59b] hover:shadow-md transition group">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] bg-rose-50 text-rose-600 font-extrabold px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400"/>
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="relative w-full h-36 my-2">
                    <Image src={item.image} alt={item.name} fill className="object-contain group-hover:scale-105 transition" sizes="180px"/>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 line-clamp-2 group-hover:text-[#13b59b] transition">
                    <Link href={item.href}>{item.name}</Link>
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-slate-900">
                      ₹{item.price.toLocaleString('en-IN')}
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

        {/* 8. IN THE NEWS */}
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

        {/* 9. FAQS ACCORDION */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Everything you need to know about purchasing certified refurbished laptops in India
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

        {/* 10. EDITORIAL GUIDE: WHAT MAKES REFURBISHED LAPTOPS GREAT? */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 prose prose-slate max-w-none text-xs text-slate-600 space-y-4">
          <h2 className="text-lg font-black text-slate-900 mb-2">
            Refurbished Laptops: What Makes Them Great?
          </h2>
          <p>
            Refurbished laptops are growing rapidly in popularity across India. You get high-caliber
            computing hardware at almost half the price of a brand-new showroom model. Enjoy blazing
            fast performance, crisp high-resolution displays, and all-day battery life without paying
            hefty brand premiums. Whether you need an Apple MacBook Air, MacBook Pro, Dell Latitude,
            HP Pavilion, or Lenovo ThinkPad, refurbished machines deliver the ultimate combination of
            power and value.
          </p>

          <h3 className="text-sm font-bold text-slate-800">Why Sellbar Is the Best Place to Buy?</h3>
          <p>
            Sellbar makes buying certified refurbished laptops safe, transparent, and affordable.
            Every machine is vetted across a comprehensive 32-step diagnostic inspection covering the
            battery runtime, motherboard thermals, keyboard key travel, screen backlight uniformity,
            and high-speed ports. Tech experts perform tests to ensure you always get a dependable,
            fully functional computer.
          </p>

          <h3 className="text-sm font-bold text-slate-800">
            Free Shipping, 15-Day Refunds &amp; 6-Month Doorstep Warranty
          </h3>
          <p>
            All laptops ship with free express doorstep delivery across 19,000+ PIN codes in India.
            Enjoy 6 months of comprehensive warranty with optional extension up to 12 months,
            accompanied by an original power adapter, clean OS installation, and 15 days no-hassle
            refund guarantee.
          </p>
        </section>
      </div>
    </div>);
}
