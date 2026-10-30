'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, Truck, Heart, Star, ChevronDown, Sparkles, Camera, ArrowRight, } from 'lucide-react';
export default function BuyRefurbishedCamerasClient({ initialProducts, }) {
    const [selectedType, setSelectedType] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [wishlist, setWishlist] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);
    const toggleWishlist = (id) => {
        setWishlist((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    const types = [
        { id: 'all', label: 'All Gear' },
        { id: 'dslr', label: 'DSLR Cameras' },
        { id: 'lens', label: 'Camera Lenses' },
        { id: 'action', label: 'Action & 360° Cameras' },
    ];
    const brands = [
        {
            name: 'Canon',
            slug: 'canon',
            logo: 'https://s3ng.cashify.in/estore/e8d5ffd02b3e475dbb8204f29b10b4ef.webp',
            count: 14,
        },
        {
            name: 'Nikon',
            slug: 'nikon',
            logo: 'https://s3ng.cashify.in/estore/a260101e197c433d8e863755a0651b86.webp',
            count: 11,
        },
        {
            name: 'Sony',
            slug: 'sony',
            logo: 'https://s3ng.cashify.in/estore/0e68fb42ea3e453fb88d4accdc0f51bd.webp',
            count: 8,
        },
        {
            name: 'GoPro',
            slug: 'gopro',
            logo: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/d0207218-1403.jpg',
            count: 5,
        },
    ];
    const cameraCatalog = useMemo(() => {
        if (initialProducts && initialProducts.length > 0) {
            return initialProducts.map((p) => ({
                id: p._id || p.id,
                name: p.name,
                slug: p.slug || p._id,
                type: 'dslr',
                brand: (typeof p.brand === 'object' ? p.brand?.slug || p.brand?.name : p.brand || 'canon').toLowerCase(),
                image: p.images?.[0]?.url || 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/c56062f0-04ee.jpg',
                salePrice: Number(p.price) || 0,
                originalPrice: Number(p.compareAtPrice) || Math.round((Number(p.price) || 0) * 1.4),
                discount: Math.round((((Number(p.compareAtPrice) || (Number(p.price) || 0) * 1.4) - (Number(p.price) || 0)) / (Number(p.compareAtPrice) || (Number(p.price) || 0) * 1.4)) * 100),
                rating: Number(p.rating) || 4.7,
                reviewsCount: Number(p.reviewsCount) || 540,
                grade: p.condition || 'Superb',
                specs: Array.isArray(p.specs) ? p.specs.map((s) => typeof s === 'string' ? s : `${s.label}: ${s.value}`) : ['Optical Tested', '12 Months Warranty'],
                tag: p.badge || 'CERTIFIED',
                href: `/product/${p.slug || p._id}`,
            }));
        }
        return [
            {
                id: 'cam-canon-1500d',
                name: 'Canon EOS 1500D 24.1MP DSLR (18-55mm IS II Lens)',
                slug: 'canon-eos-1500d',
                type: 'dslr',
                brand: 'canon',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/c56062f0-04ee.jpg',
                salePrice: 22999,
                originalPrice: 41995,
                discount: 45,
                rating: 4.7,
                reviewsCount: 890,
                grade: 'Superb',
                specs: ['24.1 MP APS-C CMOS', 'Full HD 1080p Video', 'Wi-Fi & NFC Built-in', 'Shutter < 6,000'],
                tag: 'BESTSELLER',
                href: '/product/canon-eos-1500d',
            },
            {
                id: 'cam-canon-1300d',
                name: 'Canon EOS 1300D 18MP DSLR (18-55mm IS II Lens)',
                slug: 'canon-eos-1300d',
                type: 'dslr',
                brand: 'canon',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/61b26b2e-8311.jpg',
                salePrice: 17499,
                originalPrice: 34995,
                discount: 50,
                rating: 4.5,
                reviewsCount: 1250,
                grade: 'Good',
                specs: ['18 MP APS-C Sensor', 'DIGIC 4+ Processor', '9-Point AF System', 'Shutter < 12,000'],
                tag: '50% OFF',
                href: '/product/canon-eos-1300d',
            },
            {
                id: 'cam-canon-700d',
                name: 'Canon EOS 700D 18MP DSLR Dual Lens Kit',
                slug: 'canon-eos-700d',
                type: 'dslr',
                brand: 'canon',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/26623124-1240.jpg',
                salePrice: 24999,
                originalPrice: 49995,
                discount: 50,
                rating: 4.6,
                reviewsCount: 640,
                grade: 'Superb',
                specs: ['Vari-Angle Touchscreen', 'Hybrid CMOS AF', '18-55mm + 55-250mm Lenses', 'Shutter < 9,000'],
                tag: 'DUAL LENS',
                href: '/product/canon-eos-700d',
            },
            {
                id: 'cam-nikon-d3500',
                name: 'Nikon D3500 24.2MP DSLR (AF-P DX 18-55mm VR)',
                slug: 'nikon-d3500',
                type: 'dslr',
                brand: 'nikon',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/a80eea2f-2d1b.jpg',
                salePrice: 23999,
                originalPrice: 44950,
                discount: 46,
                rating: 4.8,
                reviewsCount: 780,
                grade: 'Superb',
                specs: ['24.2 MP DX Sensor', 'EXPEED 4 Engine', '1,550 Shots per Charge', 'Shutter < 7,500'],
                tag: 'MARATHON BATTERY',
                href: '/product/nikon-d3500',
            },
            {
                id: 'cam-gopro-hero13',
                name: 'GoPro Hero 13 Bundle Pack 27MP Action Camera',
                slug: 'gopro-hero-13',
                type: 'action',
                brand: 'gopro',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/d0207218-1403.jpg',
                salePrice: 31999,
                originalPrice: 44990,
                discount: 28,
                rating: 4.9,
                reviewsCount: 310,
                grade: 'Flawless',
                specs: ['5.3K 60fps / 4K 120fps', 'HyperSmooth 6.0', 'Waterproof 10m', 'Dual Extra Batteries'],
                tag: 'LATEST 2026',
                href: '/product/gopro-hero-13',
            },
            {
                id: 'cam-insta360-go3',
                name: 'Insta360 Go 3 (64GB) Tiny Action Cam with Action Pod',
                slug: 'insta360-go-3',
                type: 'action',
                brand: 'gopro',
                image: 'https://s3ng.cashify.in/cashify/store/product/9c0286dfe4364980bae2c31791ed7fb6.webp',
                salePrice: 24999,
                originalPrice: 36990,
                discount: 32,
                rating: 4.7,
                reviewsCount: 410,
                grade: 'Superb',
                specs: ['35g Magnetic Body', 'FlowState Stabilization', 'Flip Touchscreen Pod', 'Hands-Free POV'],
                tag: 'VLOGGING HERO',
                href: '/product/insta360-go-3',
            },
            {
                id: 'cam-canon-50mm',
                name: 'Canon EF 50mm f/1.8 STM Prime Portrait Lens',
                slug: 'canon-ef-50mm-stm',
                type: 'lens',
                brand: 'canon',
                image: 'https://s3ng.cashify.in/estore/7ac4d4c8cd704b4d8f66c2d6b9156249.webp',
                salePrice: 6499,
                originalPrice: 9995,
                discount: 35,
                rating: 4.9,
                reviewsCount: 1890,
                grade: 'Flawless',
                specs: ['f/1.8 Large Aperture', 'Stepping Motor (STM)', 'Beautiful Creamy Bokeh', 'Metal Mount'],
                tag: 'BOKEH MASTER',
                href: '/product/canon-ef-50mm-stm',
            },
            {
                id: 'cam-canon-55-250',
                name: 'Canon EF-S 55-250mm f/4-5.6 IS II Telephoto Zoom Lens',
                slug: 'canon-ef-s-55-250mm',
                type: 'lens',
                brand: 'canon',
                image: 'https://s3ng.cashify.in/estore/d83addbc3eaf4717aad19996899378b2.webp',
                salePrice: 9999,
                originalPrice: 17995,
                discount: 44,
                rating: 4.6,
                reviewsCount: 520,
                grade: 'Superb',
                specs: ['4-Stop Image Stabilizer', 'UD Glass Element', 'Telephoto Wildlife Zoom', 'Clean Optics'],
                tag: 'WILDLIFE ZOOM',
                href: '/product/canon-ef-s-55-250mm',
            },
        ];
    }, [initialProducts]);
    const filteredItems = useMemo(() => {
        return cameraCatalog.filter((item) => {
            if (selectedType !== 'all' && item.type !== selectedType)
                return false;
            if (selectedBrand !== 'all' && item.brand !== selectedBrand)
                return false;
            return true;
        });
    }, [cameraCatalog, selectedType, selectedBrand]);
    const faqs = [
        {
            q: 'How is the shutter count checked on refurbished cameras?',
            a: 'We connect each DSLR body to official camera diagnostic software to verify its true mechanical actuation count. Only cameras with less than 20% of their rated shutter lifespan used pass our certification.',
        },
        {
            q: 'Are the camera sensors free from dust spots and scratches?',
            a: 'Yes, every camera CMOS sensor undergoes laboratory high-aperture tests (shot at f/22 against clean light) and is professionally ultrasonic-cleaned to ensure zero spots, fungus, or dead pixels.',
        },
        {
            q: 'What accessories are included in the box with a refurbished camera?',
            a: 'Every camera comes with an official rechargeable battery, genuine wall charger, neck strap, body cap, and bundled lens if purchased as a kit. Ready to shoot right out of the box!',
        },
        {
            q: 'What warranty is offered on refurbished cameras and lenses?',
            a: 'Sellbar provides a 6-month comprehensive doorstep warranty on all refurbished cameras and lenses, covering autofocus motors, shutter assemblies, motherboard electronics, and sensors.',
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
            <span className="text-slate-800 font-semibold">Buy Refurbished DSLR Cameras</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#13b59b] text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5"/> India&apos;s Largest Refurbished Camera Store
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                India&apos;s Largest Refurbished Camera Store
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Certified Canon EOS, Nikon &amp; Sony Alpha DSLRs, lenses, and GoPro action cameras with
                shutter count audit, clean sensor guarantee &amp; 6 months warranty.
              </p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center shrink-0">
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">Clean Sensor</div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                <Camera className="w-5 h-5 text-[#13b59b] mx-auto mb-1"/>
                <div className="text-[11px] font-bold text-slate-800">Shutter Audited</div>
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
        {/* 2. SHOP BY TYPE TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
                id: 'dslr',
                title: 'Digital SLR Cameras',
                desc: 'Canon EOS, Nikon D-Series with kit lenses',
                image: 'https://s3ng.cashify.in/estore/c0572d666a1b4f5a8cefbdd7cb7c858b.webp',
            },
            {
                id: 'lens',
                title: 'Camera Lenses',
                desc: 'Prime portrait & telephoto zoom lenses',
                image: 'https://s3ng.cashify.in/estore/d83addbc3eaf4717aad19996899378b2.webp',
            },
            {
                id: 'action',
                title: 'Action & 360° Cameras',
                desc: 'GoPro Hero & Insta360 pocket cams',
                image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/d0207218-1403.jpg',
            },
        ].map((cat) => {
            const active = selectedType === cat.id;
            return (<button key={cat.id} onClick={() => setSelectedType(active ? 'all' : cat.id)} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${active
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg ring-2 ring-[#13b59b]'
                    : 'bg-white border-slate-200 hover:border-[#13b59b] hover:shadow-md'}`}>
                <div>
                  <h3 className="text-sm font-black">{cat.title}</h3>
                  <p className={`text-xs mt-0.5 ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                    {cat.desc}
                  </p>
                </div>
                <div className="relative w-14 h-14 shrink-0">
                  <Image src={cat.image} alt={cat.title} fill className="object-contain" sizes="56px"/>
                </div>
              </button>);
        })}
        </div>

        {/* 3. POPULAR BRANDS */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#13b59b]"/> Favourite Camera Brands
              </h2>
              <p className="text-xs text-slate-500">Filter optics from leading Japanese camera makers</p>
            </div>
            {selectedBrand !== 'all' && (<button onClick={() => setSelectedBrand('all')} className="text-xs font-bold text-[#13b59b] hover:underline">
                Reset Brand
              </button>)}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {brands.map((b) => {
            const isSelected = selectedBrand === b.slug;
            return (<button key={b.slug} onClick={() => setSelectedBrand(isSelected ? 'all' : b.slug)} className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${isSelected
                    ? 'bg-teal-50 border-[#13b59b] shadow-md ring-2 ring-[#13b59b]/20'
                    : 'bg-white border-slate-200 hover:border-[#13b59b] hover:shadow-sm'}`}>
                  <div className="relative w-12 h-12 shrink-0">
                    <Image src={b.logo} alt={b.name} fill className="object-contain" sizes="48px"/>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">{b.name}</div>
                    <div className="text-[10px] text-slate-400 font-medium">({b.count} available)</div>
                  </div>
                </button>);
        })}
          </div>
        </section>

        {/* 4. MAIN CAMERA CATALOG */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Bestselling Cameras &amp; Lenses</h2>
              <p className="text-xs text-slate-500">
                Every unit includes a 32-step sensor audit certificate &amp; 6-month doorstep warranty
              </p>
            </div>
            <div className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full">
              {filteredItems.length} products available
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((cam) => {
            const isWishlisted = wishlist.includes(cam.id);
            return (<div key={cam.id} className="bg-white rounded-2xl border border-slate-200 hover:border-[#13b59b] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden relative group">
                  <div className="p-3 pb-0 flex items-center justify-between z-10">
                    <span className="bg-[#13b59b] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {cam.tag}
                    </span>
                    <button onClick={() => toggleWishlist(cam.id)} className="w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition flex items-center justify-center cursor-pointer" aria-label="Wishlist">
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}/>
                    </button>
                  </div>

                  <Link href={cam.href} className="px-6 py-4 block">
                    <div className="relative w-full h-44 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      <Image src={cam.image} alt={cam.name} fill className="object-contain drop-shadow-md" sizes="(max-width: 768px) 50vw, 25vw"/>
                    </div>
                  </Link>

                  <div className="p-4 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600"/>
                          <span>{cam.rating}</span>
                          <span className="text-slate-400">({cam.reviewsCount})</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-900">
                          Grade: {cam.grade}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-[#13b59b] transition">
                        <Link href={cam.href}>{cam.name}</Link>
                      </h3>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {cam.specs.slice(0, 2).map((sp, idx) => (<span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                            {sp}
                          </span>))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900">
                          ₹{cam.salePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{cam.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          Save ₹{(cam.originalPrice - cam.salePrice).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#13b59b]"/> 6 Months Doorstep Warranty
                      </p>

                      <Link href={cam.href} className="mt-3 w-full bg-[#13b59b] hover:bg-[#0f957f] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 transition shadow-sm">
                        Buy Certified <ArrowRight className="w-3.5 h-3.5"/>
                      </Link>
                    </div>
                  </div>
                </div>);
        })}
          </div>
        </section>

        {/* 5. IN THE NEWS */}
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

        {/* 6. FAQS */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Camera Questions Answered
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Common questions about buying certified refurbished cameras and lenses in India
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
