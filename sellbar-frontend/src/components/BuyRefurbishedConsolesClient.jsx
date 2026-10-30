'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Truck, Heart, Star, ChevronDown, Sparkles, Gamepad2, ArrowRight, } from 'lucide-react';
export default function BuyRefurbishedConsolesClient({ initialProducts, }) {
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [wishlist, setWishlist] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);
    const toggleWishlist = (id) => {
        setWishlist((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    const platforms = [
        { id: 'all', label: 'All Platforms' },
        { id: 'playstation', label: 'PlayStation (PS5 & PS4)' },
        { id: 'xbox', label: 'Microsoft Xbox' },
        { id: 'accessory', label: 'Controllers & Accessories' },
    ];
    const consoleCatalog = useMemo(() => {
        if (initialProducts && initialProducts.length > 0) {
            return initialProducts.map((p) => ({
                id: p._id || p.id,
                name: p.name,
                slug: p.slug || p._id,
                platform: 'playstation',
                image: p.images?.[0]?.url || 'https://s3ng.cashify.in/cashify/store/product/cf73bcbd1a084711b40776bfe103bf3d.png',
                salePrice: Number(p.price) || 0,
                originalPrice: Number(p.compareAtPrice) || Math.round((Number(p.price) || 0) * 1.4),
                discount: Math.round((((Number(p.compareAtPrice) || (Number(p.price) || 0) * 1.4) - (Number(p.price) || 0)) / (Number(p.compareAtPrice) || (Number(p.price) || 0) * 1.4)) * 100),
                rating: Number(p.rating) || 4.8,
                reviewsCount: Number(p.reviewsCount) || 1200,
                grade: p.condition || 'Flawless',
                specs: Array.isArray(p.specs) ? p.specs.map((s) => typeof s === 'string' ? s : `${s.label}: ${s.value}`) : ['High Performance', '12 Months Warranty'],
                tag: p.badge || 'CERTIFIED',
                warranty: '12 Months Warranty',
                href: `/product/${p.slug || p._id}`,
            }));
        }
        return [
            {
                id: 'ps5-slim',
                name: 'Sony PlayStation 5 Slim Gaming Console (PS5 Slim) - Refurbished',
                slug: 'ps5-slim-refurbished',
                platform: 'playstation',
                image: 'https://s3ng.cashify.in/cashify/store/product/cf73bcbd1a084711b40776bfe103bf3d.png',
                salePrice: 39999,
                originalPrice: 54990,
                discount: 27,
                rating: 4.9,
                reviewsCount: 1680,
                grade: 'Flawless',
                specs: ['1TB Custom SSD', '4K 120Hz Ray Tracing', 'DualSense Controller Included', 'Ultra HD Blu-ray'],
                tag: 'HOTTEST DEAL',
                warranty: '6 Months Warranty',
                href: '/product/ps5-slim-refurbished',
            },
            {
                id: 'ps5-standard',
                name: 'Sony PlayStation 5 Gaming Console (PS5 Standard) - Refurbished',
                slug: 'ps5-standard-refurbished',
                platform: 'playstation',
                image: 'https://s3ng.cashify.in/cashify/store/product/359aa372e8d4493a82e98d62a0d28421.png',
                salePrice: 37999,
                originalPrice: 49990,
                discount: 24,
                rating: 4.8,
                reviewsCount: 2450,
                grade: 'Superb',
                specs: ['825GB High-Speed SSD', 'Tempest 3D AudioTech', 'Haptic Feedback', 'HDMI 2.1 Ready'],
                tag: 'BESTSELLER',
                warranty: '6 Months Warranty',
                href: '/product/ps5-standard-refurbished',
            },
            {
                id: 'ps4-slim',
                name: 'Sony PlayStation 4 Slim Gaming Console (PS4 Slim 1TB) - Refurbished',
                slug: 'ps4-slim-1tb',
                platform: 'playstation',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/04d9a962-daae.jpg',
                salePrice: 18999,
                originalPrice: 29990,
                discount: 37,
                rating: 4.6,
                reviewsCount: 3120,
                grade: 'Superb',
                specs: ['1TB Storage', 'HDR Visuals', 'DualShock 4 Controller', 'Whisper-Quiet Fan'],
                tag: 'GREAT VALUE',
                warranty: '6 Months Warranty',
                href: '/product/ps4-slim-1tb',
            },
            {
                id: 'xbox-series-s',
                name: 'Microsoft Xbox Series S (512GB All-Digital) - Refurbished',
                slug: 'xbox-series-s',
                platform: 'xbox',
                image: 'https://s3ng.cashify.in/cashify/store/product/d81ecaefa5c3455a8e5df055b9584ce3.png',
                salePrice: 21999,
                originalPrice: 34990,
                discount: 37,
                rating: 4.7,
                reviewsCount: 1120,
                grade: 'Flawless',
                specs: ['Xbox Velocity Architecture', 'Quick Resume', '120 FPS Gaming', 'Wireless Controller Included'],
                tag: 'NEXT-GEN VALUE',
                warranty: '6 Months Warranty',
                href: '/product/xbox-series-s',
            },
            {
                id: 'ps4-pro',
                name: 'Sony PlayStation 4 Pro Gaming Console (PS4 Pro 4K) - Refurbished',
                slug: 'ps4-pro-4k',
                platform: 'playstation',
                image: 'https://s3ng.cashify.in/cashify/store/product/835713059280445cbe2927e9faf90e5c.png',
                salePrice: 22999,
                originalPrice: 38990,
                discount: 41,
                rating: 4.7,
                reviewsCount: 980,
                grade: 'Superb',
                specs: ['4K Dynamic Gaming', 'Boost Mode for Higher FPS', '1TB Storage', 'Optical Audio Out'],
                tag: '4K POWER',
                warranty: '6 Months Warranty',
                href: '/product/ps4-pro-4k',
            },
            {
                id: 'xbox-one-s',
                name: 'Microsoft Xbox One S (1TB Disc Edition) - Refurbished',
                slug: 'xbox-one-s',
                platform: 'xbox',
                image: 'https://s3ng.cashify.in/cashify/store/product/07861d0404d9404f9ba8678d90934eb4.png',
                salePrice: 14999,
                originalPrice: 29990,
                discount: 50,
                rating: 4.5,
                reviewsCount: 1540,
                grade: 'Good',
                specs: ['4K Ultra HD Blu-ray', 'Spatial Audio Dolby Atmos', '1TB HDD', 'Over 1,300 Games'],
                tag: '50% OFF',
                warranty: '6 Months Warranty',
                href: '/product/xbox-one-s',
            },
            {
                id: 'acc-dualsense',
                name: 'Sony DualSense Wireless Controller (PS5) - Refurbished',
                slug: 'dualsense-ps5-controller',
                platform: 'accessory',
                image: 'https://s3ng.cashify.in/cashify/store/product/5ec904e350904e27aeec2685b26ae9a0.png',
                salePrice: 4299,
                originalPrice: 6390,
                discount: 33,
                rating: 4.8,
                reviewsCount: 890,
                grade: 'Flawless',
                specs: ['Haptic Feedback', 'Dynamic Adaptive Triggers', 'Built-in Mic & Jack', 'USB-C Fast Charging'],
                tag: 'CO-OP ESSENTIAL',
                warranty: '6 Months Warranty',
                href: '/product/dualsense-ps5-controller',
            },
            {
                id: 'acc-dualshock4',
                name: 'Sony DualShock 4 Wireless Controller (PS4) - Refurbished',
                slug: 'dualshock-4-ps4-controller',
                platform: 'accessory',
                image: 'https://s3ng.cashify.in/cashify/store/product/3334c8539d4b42e592b1406b8a76a45f.png',
                salePrice: 2799,
                originalPrice: 4990,
                discount: 44,
                rating: 4.6,
                reviewsCount: 1450,
                grade: 'Superb',
                specs: ['Precision Thumbsticks', 'Integrated Light Bar', 'Share Button', 'Stereo Headset Jack'],
                tag: 'BEST BUY',
                warranty: '6 Months Warranty',
                href: '/product/dualshock-4-ps4-controller',
            },
            {
                id: 'acc-xbox-controller',
                name: 'Microsoft Xbox Series X/S Wireless Controller - Refurbished',
                slug: 'xbox-series-controller',
                platform: 'accessory',
                image: 'https://s3ng.cashify.in/estore/1042b10a18fa4cb1b47333777d0b2bd9.png',
                salePrice: 3899,
                originalPrice: 5990,
                discount: 35,
                rating: 4.7,
                reviewsCount: 780,
                grade: 'Superb',
                specs: ['Textured Grip', 'Hybrid D-Pad', 'Bluetooth for PC & Mobile', 'Share Button'],
                tag: 'PC & CONSOLE',
                warranty: '6 Months Warranty',
                href: '/product/xbox-series-controller',
            },
        ];
    }, [initialProducts]);
    const filteredConsoles = useMemo(() => {
        return consoleCatalog.filter((item) => {
            if (selectedPlatform !== 'all' && item.platform !== selectedPlatform)
                return false;
            return true;
        });
    }, [consoleCatalog, selectedPlatform]);
    const faqs = [
        {
            q: 'Are optical disc drives and controllers tested on refurbished consoles?',
            a: 'Yes, every console undergoes complete drive read/write testing with physical discs, HDMI 2.1 4K 120Hz signal verification, Wi-Fi latency testing, and full controller button and thumbstick drift calibration.',
        },
        {
            q: 'What cables and accessories are included in the console box?',
            a: 'Each console arrives with an official wireless controller, high-speed 4K HDMI cable, AC power cable, and USB charging cord, securely cushioned in Sellbar protective packaging.',
        },
        {
            q: 'Can I log into my PlayStation Network (PSN) or Xbox Live account?',
            a: 'Absolutely! All consoles are factory wiped and audited against manufacturer databases. We guarantee 100% clean hardware serials with zero network bans or restrictions.',
        },
        {
            q: 'What warranty is offered on refurbished gaming consoles?',
            a: 'Sellbar provides a default 6-month comprehensive doorstep warranty on all consoles and controllers, covering motherboard chips, disc drive lasers, HDMI ports, and power supply units.',
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
            <span className="text-slate-800 font-semibold">Buy Refurbished Gaming Consoles</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#13b59b] text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5"/> India&apos;s Largest Refurbished Gaming Store
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Buy Refurbished Gaming Consoles Online
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Certified Sony PS5 Slim, PlayStation 4, Xbox Series S &amp; wireless controllers with
                32-step inspection, 6 months warranty, zero network ban guarantee &amp; free shipping.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center shrink-0">
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">32-Step Check</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <Gamepad2 className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">Controller Included</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <RefreshCw className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">6M Warranty</div>
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
        {/* 2. PLATFORMS FILTER */}
        <div className="flex flex-wrap items-center gap-2">
          {platforms.map((p) => {
            const active = selectedPlatform === p.id;
            return (<button key={p.id} onClick={() => setSelectedPlatform(p.id)} className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${active
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'}`}>
                {p.label}
              </button>);
        })}
        </div>

        {/* 3. MAIN CATALOG */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Bestselling Consoles &amp; Controllers
              </h2>
              <p className="text-xs text-slate-500">
                Play 4K blockbuster titles at up to 50% lower prices with 100% factory reliability
              </p>
            </div>
            <div className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full">
              {filteredConsoles.length} in stock
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredConsoles.map((item) => {
            const isWishlisted = wishlist.includes(item.id);
            return (<div key={item.id} className="bg-white rounded-2xl border border-slate-200 hover:border-[#13b59b] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden relative group">
                  <div className="p-3 pb-0 flex items-center justify-between z-10">
                    <span className="bg-[#13b59b] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <button onClick={() => toggleWishlist(item.id)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition flex items-center justify-center cursor-pointer" aria-label="Wishlist">
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}/>
                    </button>
                  </div>

                  <Link href={item.href} className="px-6 py-4 block">
                    <div className="relative w-full h-44 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      <Image src={item.image} alt={item.name} fill className="object-contain drop-shadow-md" sizes="(max-width: 768px) 50vw, 25vw"/>
                    </div>
                  </Link>

                  <div className="p-4 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600"/>
                          <span>{item.rating}</span>
                          <span className="text-slate-400">({item.reviewsCount})</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                          Grade: {item.grade}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-[#13b59b] transition">
                        <Link href={item.href}>{item.name}</Link>
                      </h3>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.specs.slice(0, 2).map((sp, idx) => (<span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {sp}
                          </span>))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900">
                          ₹{item.salePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          Save ₹{(item.originalPrice - item.salePrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#13b59b]"/> {item.warranty}
                      </p>

                      <Link href={item.href} className="mt-3 w-full bg-[#13b59b] hover:bg-[#0f957f] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition shadow-sm">
                        Buy Certified <ArrowRight className="w-3.5 h-3.5"/>
                      </Link>
                    </div>
                  </div>
                </div>);
        })}
          </div>
        </section>

        {/* 4. IN THE NEWS */}
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

        {/* 5. FAQS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Gaming Questions
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Common questions about buying refurbished PlayStation and Xbox consoles in India
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
      </div>
    </div>);
}
