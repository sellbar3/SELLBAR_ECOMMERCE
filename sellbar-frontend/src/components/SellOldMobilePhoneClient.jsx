'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, ShieldCheck, Zap, ArrowRight, ChevronDown, Star, Truck, Sparkles, MapPin, Clock, FileText, ChevronRight, X, Smartphone, Check, Award, } from 'lucide-react';
export default function SellOldMobilePhoneClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('ALL');
    const [activeFaq, setActiveFaq] = useState(0);
    const [selectedModelForValuation, setSelectedModelForValuation] = useState(null);
    const [valuationStep, setValuationStep] = useState(1);
    const [screenCondition, setScreenCondition] = useState('flawless');
    const [bodyCondition, setBodyCondition] = useState('like_new');
    const [activeStoryIdx, setActiveStoryIdx] = useState(0);
    // Exact 15 Top Selling Brands matching Cashify
    const brands = [
        { name: 'Apple', slug: 'apple', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/2e7cdc22-5a5f.jpg', popular: true },
        { name: 'Xiaomi', slug: 'xiaomi', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/cb96df6e-080f.jpg', popular: true },
        { name: 'Samsung', slug: 'samsung', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/406a512d-e8dd.jpg', popular: true },
        { name: 'Vivo', slug: 'vivo', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/20922c34-8afc.jpg', popular: true },
        { name: 'OnePlus', slug: 'oneplus', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/ac5c9a7b-76b5.jpg', popular: true },
        { name: 'OPPO', slug: 'oppo', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/dfb6c340-010f.jpg', popular: true },
        { name: 'Realme', slug: 'realme', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/0124cc45-3a6c.jpg' },
        { name: 'Motorola', slug: 'motorola', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/1dcd7fda-0141.jpg' },
        { name: 'Lenovo', slug: 'lenovo', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/674d92eb-b24e.jpg' },
        { name: 'Nokia', slug: 'nokia', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/cfeaabff-69bf.jpg' },
        { name: 'Honor', slug: 'honor', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/92be5a86-7a7d.jpg' },
        { name: 'Asus', slug: 'asus', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/12a86ebf-1ecf.jpg' },
        { name: 'Google', slug: 'google', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/4834825a-7f10.jpg' },
        { name: 'POCO', slug: 'poco', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/fef4e5ae-6507.jpg' },
        { name: 'LG', slug: 'lg', logoUrl: 'https://s3ng.cashify.in/cashify/brand/img/xhdpi/426a8581-c30f.jpg' },
    ];
    // Exact 10 Top Selling Mobile Phones with Cashify transparent cutouts & prices
    const topSellingPhones = [
        {
            id: 'm-ip13-128',
            slug: 'used-apple-iphone-13',
            name: 'Apple iPhone 13 (4 GB/128 GB)',
            brand: 'Apple',
            maxPrice: 24260,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/75a0fd88-59b4.jpg',
            specs: 'A15 Bionic • Dual 12MP Camera • Super Retina XDR',
        },
        {
            id: 'm-ip14-128',
            slug: 'used-apple-iphone-14',
            name: 'Apple iPhone 14 (6 GB/128 GB)',
            brand: 'Apple',
            maxPrice: 41820,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/14fbb042-43bb.jpg',
            specs: 'A15 Bionic 5-Core GPU • Action Mode • Photonic Engine',
        },
        {
            id: 'm-op11-128',
            slug: 'used-oneplus-11-5g',
            name: 'OnePlus 11 5G (8 GB/128 GB)',
            brand: 'OnePlus',
            maxPrice: 27780,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/5168c8f4-246c.jpg',
            specs: 'Snapdragon 8 Gen 2 • Hasselblad Triple Camera • 100W SuperVOOC',
        },
        {
            id: 'm-ip15p-128',
            slug: 'used-apple-iphone-15-pro',
            name: 'Apple iPhone 15 Pro (8 GB/128 GB)',
            brand: 'Apple',
            maxPrice: 52390,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/4a861622-6b99.jpg',
            specs: 'A17 Pro Titanium • Action Button • 48MP ProRaw',
        },
        {
            id: 'm-rn12p-128',
            slug: 'used-redmi-note-12-pro',
            name: 'Xiaomi Redmi Note 12 Pro (6 GB/128 GB)',
            brand: 'Xiaomi',
            maxPrice: 12490,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/3e683ab8-839f.jpg',
            specs: 'Dimensity 1080 • 50MP Sony IMX766 OIS • 67W Turbo',
        },
        {
            id: 'm-s23-128',
            slug: 'used-samsung-galaxy-s23-5g',
            name: 'Samsung Galaxy S23 5G (8 GB/128 GB)',
            brand: 'Samsung',
            maxPrice: 42690,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/8dc6e36f-5309.jpg',
            specs: 'Snapdragon 8 Gen 2 for Galaxy • 50MP Nightography • 120Hz AMOLED',
        },
        {
            id: 'm-v29-128',
            slug: 'used-vivo-v29-5g',
            name: 'Vivo V29 5G (8 GB/128 GB)',
            brand: 'Vivo',
            maxPrice: 16490,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/67bc06e4-4a43.jpg',
            specs: 'Smart Aura Light Portrait • 3D Curved 1.5K Display • 80W FlashCharge',
        },
        {
            id: 'm-reno10-256',
            slug: 'used-oppo-reno-10-5g',
            name: 'OPPO Reno 10 5G (8 GB/256 GB)',
            brand: 'OPPO',
            maxPrice: 17420,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/a0ce4c12-be63.jpg',
            specs: '32MP Telephoto Portrait Camera • 67W SUPERVOOC • 120Hz 3D Screen',
        },
        {
            id: 'm-pocox5-128',
            slug: 'used-poco-x5-pro-5g',
            name: 'POCO X5 Pro 5G (6 GB/128 GB)',
            brand: 'POCO',
            maxPrice: 14150,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/981c2f21-bb5c.jpg',
            specs: 'Snapdragon 778G • 108MP Studio Camera • 120Hz FHD+ Dolby Vision',
        },
        {
            id: 'm-s22u-256',
            slug: 'used-samsung-galaxy-s22-ultra',
            name: 'Samsung Galaxy S22 Ultra (12 GB/256 GB)',
            brand: 'Samsung',
            maxPrice: 32940,
            imageUrl: 'https://s3ng.cashify.in/cashify/product/img/xhdpi/b25bf354-9464.jpg',
            specs: 'Built-in S-Pen • 108MP Quad Camera with 100x Space Zoom • Dynamic AMOLED 2X',
        },
    ];
    // Exact Customer Stories
    const customerStories = [
        {
            name: 'Ratikant Gokhale',
            city: 'Gurgaon',
            quote: 'I loved that Sellbar picked up my phone from my home and paid me instantly. It was super convenient since I’m always busy with office meetings.',
            device: 'Sold iPhone 13 (128GB)',
            rating: 5,
            date: 'Verified Order • 2 days ago',
        },
        {
            name: 'Harpreet Singh',
            city: 'Haldwani',
            quote: 'I tried selling my phone locally, but didn’t have any luck as shopkeepers were trying to exploit the price. Sellbar helped me sell it in just minutes without any stress.',
            device: 'Sold OnePlus 11 5G',
            rating: 5,
            date: 'Verified Order • 4 days ago',
        },
        {
            name: 'Bagesh Kumar',
            city: 'Patna',
            quote: 'My phone was in good condition, and I was surprised that Sellbar offered me more than I expected. Really happy with the deal and immediate UPI payment.',
            device: 'Sold Samsung Galaxy S22',
            rating: 5,
            date: 'Verified Order • 1 week ago',
        },
        {
            name: 'Priya Sharma',
            city: 'Bengaluru, Indiranagar',
            quote: 'Seamless experience! Executive arrived on time, completed 32-point inspection in front of me, and sent ₹41,800 directly to my Google Pay before taking the phone.',
            device: 'Sold iPhone 14 (128GB)',
            rating: 5,
            date: 'Verified Order • 3 days ago',
        },
    ];
    // Exact FAQs matching Cashify
    const faqs = [
        {
            q: 'How do I know the price of my old phone?',
            a: 'Just visit Sellbar.in, search or select your phone brand and model, answer a few quick questions regarding its physical and functional condition (screen, body, camera, battery), and our AI valuation engine generates an instant, guaranteed quote. Accept the quote, select your preferred date & time, and schedule free doorstep pickup.',
        },
        {
            q: 'What should I do if my sell old phone is not turning on?',
            a: 'Even if your phone is off, dead, or not booting, you can still sell it! Simply select "Does Not Turn On / Dead" under the device condition checklist. Sellbar will evaluate it for recoverable hardware parts and scrap metal and offer you a fair price.',
        },
        {
            q: 'Can I cancel my sale if I change my mind?',
            a: 'Yes, absolutely! You can cancel the sale order at any time before our field executive completes the on-site physical evaluation. There are zero cancellation charges or penalties.',
        },
        {
            q: 'Can I sell my phone if it’s locked to a specific network?',
            a: 'Yes, network-locked or carrier-specific phones are accepted on Sellbar. Please mention the network lock details during your valuation flow so our pricing engine computes the accurate offer.',
        },
        {
            q: 'Is there any fee for selling my phone or doorstep pickup?',
            a: 'No! When you sell your old phone on Sellbar, the entire evaluation, doorstep technician visit, and home pickup are 100% free. There are zero hidden fees, convenience deductions, or processing charges.',
        },
        {
            q: 'How and when do I receive payment for my phone?',
            a: 'Payment is disbursed instantly on the spot. Once our trained technician verifies your device at your doorstep, the agreed amount is transferred directly to your bank account via IMPS or your preferred UPI app (Google Pay, PhonePe, Paytm, BHIM) before the device is packed into our tamper-proof bag.',
        },
        {
            q: 'Is my personal data safe after selling my old phone?',
            a: 'Your digital privacy is our top priority. Every device acquired by Sellbar undergoes certified, military-grade data sanitization compliant with ISO/IEC 27001 & NIST 800-88 standards at our processing hub. We issue a formal Data Destruction Certificate releasing you of all privacy risks.',
        },
    ];
    // Editorial tech articles matching Cashify's "Be Smart. Sell Smart"
    const articles = [
        {
            title: '512GB Phones: The Sweet Spot For Resale Value In 2026',
            readTime: '4 min read',
            tag: 'Resale Tips',
            date: 'Oct 2026',
            snippet: 'High-capacity storage devices retain up to 28% higher value in Indian recommerce markets as 4K video recording and local AI models expand.',
        },
        {
            title: 'Why iPhones Hold 15% More Resale Value Than Android In India',
            readTime: '5 min read',
            tag: 'Market Trends',
            date: 'Oct 2026',
            snippet: 'Longer iOS firmware support cycles and high secondary buyer demand maintain Apple trade-in residual values significantly higher.',
        },
        {
            title: 'Verify Your Phone’s ‘Clean’ Status Before Selling - Avoid Surprises',
            readTime: '3 min read',
            tag: 'Checklist',
            date: 'Oct 2026',
            snippet: 'Ensure your iCloud, Google FRP, and Samsung Knox accounts are signed out prior to technician arrival to avoid valuation delays.',
        },
        {
            title: '3 Steps to Ensure Your Digital SIM Doesn’t Go With Sold Phones',
            readTime: '3 min read',
            tag: 'Security Guide',
            date: 'Oct 2026',
            snippet: 'How to safely de-register Jio, Airtel, and Vi eSIM profiles from your smartphone before handing over for doorstep recycling.',
        },
        {
            title: 'Does Phones With Dedicated Neural Engines Make You More Money?',
            readTime: '6 min read',
            tag: 'AI Insights',
            date: 'Oct 2026',
            snippet: 'Smartphones with dedicated NPU chips (Apple A17/A18, Snapdragon 8 Gen 3, Dimensity 9300) are commanding record premiums in the pre-owned market.',
        },
    ];
    // Filtered models
    const filteredModels = useMemo(() => {
        return topSellingPhones.filter((m) => {
            const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.brand.toLowerCase().includes(searchQuery.toLowerCase());
            const matchBrand = selectedBrand === 'ALL' || m.brand.toLowerCase() === selectedBrand.toLowerCase();
            return matchSearch && matchBrand;
        });
    }, [searchQuery, selectedBrand]);
    // Dynamic price calculation inside valuation modal
    const calculatedQuote = useMemo(() => {
        if (!selectedModelForValuation)
            return 0;
        let base = selectedModelForValuation.maxPrice;
        if (screenCondition === 'scratched')
            base *= 0.88;
        if (screenCondition === 'broken')
            base *= 0.65;
        if (bodyCondition === 'minor_scratches')
            base *= 0.94;
        if (bodyCondition === 'dents')
            base *= 0.82;
        return Math.round(base);
    }, [selectedModelForValuation, screenCondition, bodyCondition]);
    return (<div className="bg-[#f7f9fa] min-h-screen text-gray-900 pb-20 antialiased font-sans">
      
      {/* 1. BREADCRUMB */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400"/>
          <Link href="/sell" className="hover:text-[#13b59b] transition">Sell</Link>
          <ChevronRight className="w-3 h-3 text-gray-400"/>
          <span className="text-[#13b59b] font-semibold">Sell Old Mobile Phone</span>
        </div>
      </div>

      {/* 2. HERO SPLIT: Left Search & Brands + Right Promo Value */}
      <section className="bg-white border-b border-gray-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Title, Search, Brand Selector Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight">
                  Sell Old Mobile Phone for <span className="text-[#13b59b]">Instant Cash</span>
                </h1>
                
                {/* 3 Pills matching Cashify Hero */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-4 h-4 text-[#13b59b]"/> Maximum Value
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-[#13b59b]"/> Safe &amp; Hassle-free
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                    <Truck className="w-4 h-4 text-[#13b59b]"/> Free Doorstep Pickup
                  </span>
                </div>
              </div>

              {/* Instant Search Bar */}
              <div className="relative">
                <div className="relative flex items-center">
                  <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none"/>
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search your mobile phone model to sell (e.g. iPhone 14, Galaxy S23, OnePlus 11)..." className="w-full pl-11 pr-10 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-[#13b59b] focus:ring-2 focus:ring-[#13b59b]/20 transition"/>
                  {searchQuery && (<button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 rounded-full">
                      <X className="w-4 h-4"/>
                    </button>)}
                </div>
              </div>

              {/* Brands Grid (Exact 15 brands with logos matching Cashify) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Select Your Brand
                  </h2>
                  {selectedBrand !== 'ALL' && (<button type="button" onClick={() => setSelectedBrand('ALL')} className="text-xs font-semibold text-[#13b59b] hover:underline cursor-pointer">
                      Show All Brands
                    </button>)}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {brands.map((b) => {
            const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase();
            return (<button key={b.slug} type="button" onClick={() => setSelectedBrand(isSelected ? 'ALL' : b.name)} className={`p-3 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer group bg-white ${isSelected
                    ? 'border-[#13b59b] bg-teal-50/50 ring-2 ring-[#13b59b]/20'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-xs'}`}>
                        <div className="w-10 h-10 relative flex items-center justify-center mb-1.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={b.logoUrl} alt={b.name} className="max-h-8 max-w-full object-contain group-hover:scale-105 transition-transform"/>
                        </div>
                        <span className="text-xs font-semibold text-gray-800 text-center truncate max-w-full">
                          {b.name}
                        </span>
                      </button>);
        })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Promotional Card with Valuation Guarantee */}
            <div className="lg:col-span-5">
              <div className="bg-linear-to-br from-[#0c2a26] via-[#103a35] to-[#124942] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#13b59b]/20 rounded-full blur-2xl pointer-events-none"/>
                
                <div className="relative z-10 space-y-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
                    <Sparkles className="w-3.5 h-3.5"/> India’s #1 Phone Buyback
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                    Selling your old smartphone was never this easy.
                  </h3>

                  <p className="text-sm text-gray-200/90 leading-relaxed">
                    Get an instant AI-calculated quote based on 40+ hardware parameters. Instant cash credited to your UPI or Bank account at your doorstep.
                  </p>

                  <div className="pt-2 border-t border-white/10 space-y-2.5 text-xs text-gray-200 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2bbb9e] shrink-0"/>
                      <span>Certified Military-Grade Data Destruction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2bbb9e] shrink-0"/>
                      <span>Instant UPI Payment Before Handover</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2bbb9e] shrink-0"/>
                      <span>Zero Hassle, Zero Hidden Charges</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <a href="#top-models" className="block w-full text-center py-3.5 bg-[#2bbb9e] hover:bg-[#23a58c] active:scale-[0.98] text-slate-950 font-black rounded-xl text-sm shadow-md transition">
                      Calculate Resale Value Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HOW SELLBAR WORKS (3 Steps matching Cashify) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How Sellbar Works
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Sell your used smartphone in 3 quick, transparent and guaranteed steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
                step: '1',
                title: 'Check Price',
                desc: 'Select your device & tell us about its current condition, and our advanced AI tech will tailor-make the perfect price for you.',
                icon: Smartphone,
            },
            {
                step: '2',
                title: 'Schedule Pickup',
                desc: 'Book a free doorstep pickup slot at your preferred date and home or office time. Zero pickup fee.',
                icon: Clock,
            },
            {
                step: '3',
                title: 'Get Paid',
                desc: 'Receive instant payment via UPI, Bank Transfer or Cash right as our certified executive inspects the phone.',
                icon: Zap,
            },
        ].map((s) => (<div key={s.step} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs relative flex flex-col justify-between hover:border-[#13b59b] transition group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-[#13b59b] flex items-center justify-center font-black text-xl mb-4 group-hover:bg-[#13b59b] group-hover:text-white transition">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>))}
        </div>
      </section>

      {/* 4. HOT DEALS (Exchange Promos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-black tracking-wider bg-black/20 px-3 py-1 rounded-full">
              ★ Limited Time Hot Deals
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Get Up to ₹3,000 Extra Trade-in Exchange Bonus!
            </h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              Upgrade to Sellbar Certified refurbished or sell your old smartphone today and get instant cashback directly in your bank account.
            </p>
          </div>
          <button type="button" onClick={() => {
            if (topSellingPhones[0]) {
                setSelectedModelForValuation(topSellingPhones[0]);
                setValuationStep(1);
            }
        }} className="shrink-0 px-6 py-3.5 bg-white hover:bg-gray-100 text-gray-950 font-black rounded-xl text-sm transition shadow-md cursor-pointer">
            Claim Bonus Now
          </button>
        </div>
      </section>

      {/* 5. TOP SELLING MOBILE PHONES (Live Pricing Grid matching Cashify) */}
      <section id="top-models" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Top Selling Mobile Phones
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select your phone to calculate instant live valuation and book doorstep pickup
            </p>
          </div>
          <div className="text-xs text-gray-500 font-semibold">
            Showing {filteredModels.length} models
          </div>
        </div>

        {filteredModels.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-3"/>
            <h3 className="text-base font-bold text-gray-800">No models found</h3>
            <p className="text-xs text-gray-500 mt-1">Try searching with a different model or brand name.</p>
            <button type="button" onClick={() => {
                setSearchQuery('');
                setSelectedBrand('ALL');
            }} className="mt-4 px-4 py-2 bg-[#13b59b] text-white text-xs font-bold rounded-lg cursor-pointer">
              Reset Filters
            </button>
          </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredModels.map((phone) => (<div key={phone.id} className="bg-white rounded-2xl border border-gray-200 hover:border-[#13b59b] hover:shadow-lg transition flex flex-col justify-between p-4 group">
                <div>
                  {/* Phone Cutout Image */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto relative flex items-center justify-center my-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={phone.imageUrl} alt={phone.name} loading="lazy" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"/>
                  </div>

                  {/* Brand Tag */}
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {phone.brand}
                  </span>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 min-h-8 sm:min-h-10 mb-2 leading-snug">
                    {phone.name}
                  </h3>

                  {/* Valuation Tag: "Get Upto ₹XX,XXX" */}
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-lg p-2 mb-3">
                    <span className="text-[10px] font-medium text-emerald-700 block">Get Upto</span>
                    <span className="text-base sm:text-lg font-black text-emerald-900">
                      ₹{phone.maxPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button type="button" onClick={() => {
                    setSelectedModelForValuation(phone);
                    setValuationStep(1);
                    setScreenCondition('flawless');
                    setBodyCondition('like_new');
                }} className="w-full py-2.5 bg-[#13b59b] hover:bg-[#0ea38a] active:scale-[0.98] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                  <span>Sell Now</span>
                  <ArrowRight className="w-3.5 h-3.5"/>
                </button>
              </div>))}
          </div>)}
      </section>

      {/* 6. WHY US (6 Value Pillars matching Cashify) */}
      <section className="bg-white border-y border-gray-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Why Us
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Why over 60 Lakh+ happy Indians choose Sellbar to sell their smartphones
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
            {
                title: 'Best Prices',
                desc: 'Objective AI-based pricing engine calibrated against live secondary phone sales across 200+ Indian cities.',
                icon: Award,
            },
            {
                title: 'Instant Payment',
                desc: 'Funds transferred directly to your bank account or UPI app before our executive leaves your premises.',
                icon: Zap,
            },
            {
                title: 'Simple & Convenient',
                desc: '100% online valuation, zero physical store visits, and complete freedom from endless bargaining.',
                icon: CheckCircle2,
            },
            {
                title: 'Free Doorstep Pickup',
                desc: 'Trained pickup executive visits your home or office. Zero service fees, zero inspection deductions.',
                icon: Truck,
            },
            {
                title: 'Factory Grade Data Wipe',
                desc: 'Certified cryptographic data sanitization compliant with ISO/IEC 27001 & NIST 800-88 with certificate.',
                icon: ShieldCheck,
            },
            {
                title: 'Valid Purchase Invoice',
                desc: 'Formal GST invoice & legal bill of sale releasing you from all future device liabilities.',
                icon: FileText,
            },
        ].map((item, idx) => {
            const Icon = item.icon;
            return (<div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-[#fbfcfc] hover:border-gray-300 hover:shadow-xs transition">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#13b59b] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6"/>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>);
        })}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER STORIES (Testimonials) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Customer Stories
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Real experiences from real customers who sold their smartphones on Sellbar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerStories.map((story, idx) => (<div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:border-gray-300 transition">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(story.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400"/>))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="font-bold text-xs sm:text-sm text-gray-900">{story.name}</div>
                <div className="text-[11px] text-[#13b59b] font-semibold">{story.city}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{story.device}</div>
              </div>
            </div>))}
        </div>
      </section>

      {/* 8. WHAT PEOPLE HAVE TO SAY ABOUT STORE (Offline Footprint) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/> 4.5 / 5.0 Rating Across India
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight">
              Prefer Selling In-Person? <br />
              <span className="text-[#13b59b]">Visit 200+ Sellbar Retail Stores</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Walk into any of our certified offline experience kiosks in major malls and high-streets. Get instant diagnostics, device valuation, and immediate cash within 15 minutes.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link href="/offline-stores" className="px-6 py-3.5 bg-[#13b59b] hover:bg-[#0ea38a] text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm">
              <MapPin className="w-4 h-4"/>
              <span>Locate Nearest Store</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. BE SMART. SELL SMART (Editorial Articles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Be Smart. Sell Smart
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Expert advice, resale price trends, and smartphone trading guides
            </p>
          </div>
          <Link href="/articles" className="text-xs sm:text-sm font-semibold text-[#13b59b] hover:underline flex items-center gap-1">
            <span>See All Articles</span>
            <ChevronRight className="w-4 h-4"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {articles.map((art, idx) => (<div key={idx} className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#13b59b] hover:shadow-md transition flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#13b59b] uppercase tracking-wider block mb-2">
                  {art.tag} • {art.readTime}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                  {art.snippet}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>{art.date}</span>
                <span className="text-[#13b59b] font-bold flex items-center gap-0.5">
                  Read <ArrowRight className="w-3 h-3"/>
                </span>
              </div>
            </div>))}
        </div>
      </section>

      {/* 10. FAQS (Matching Cashify) */}
      <section className="bg-white border-y border-gray-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Everything you need to know about selling your used mobile phone on Sellbar
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (<div key={idx} className="rounded-2xl border border-gray-200 overflow-hidden transition">
                  <button type="button" onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-gray-900 flex items-center justify-between gap-4 bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer">
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#13b59b]' : ''}`}/>
                  </button>

                  {isOpen && (<div className="p-4 sm:p-5 text-xs sm:text-sm text-gray-600 bg-white leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>)}
                </div>);
        })}
          </div>
        </div>
      </section>

      {/* 11. WHY CHOOSE SELLBAR? COMPREHENSIVE EDITORIAL SEO GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-gray-700 space-y-8">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Why Choose Sellbar?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sell Old Phone And Get Instant Cash At Your Doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-gray-900">Check Your Phone’s Value In Seconds</h3>
            <p>
              Upgrading to the newest flagship smartphone shouldn&apos;t drain your wallet. With Sellbar&apos;s intelligent recommerce pricing engine, you can discover your smartphone&apos;s exact resale value within 60 seconds without having to upload photos or deal with haggling buyers.
            </p>
            <h3 className="text-base font-bold text-gray-900 pt-2">Sell Old Phone From Home With Free Doorstep Pickup</h3>
            <p>
              Gone are the days when you had to drive through congested city markets or hand over your personal phone to unverified neighborhood repair shops. Sellbar offers free doorstep pickup across 1,500+ Indian cities, bringing verified field technicians straight to your door.
            </p>
            <h3 className="text-base font-bold text-gray-900 pt-2">Get Paid Instantly, Without Delays</h3>
            <p>
              As soon as our technician completes a fast 32-point evaluation of your mobile phone, the agreed amount is credited directly to your bank account or UPI app on the spot. No delayed escrow holds, no discount surprises.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-gray-900">Phones Accepted In All Conditions</h3>
            <p>
              Whether your phone is in flawless condition with original accessories or has a broken display, scratched back panel, or dead battery, Sellbar buys it all. We ensure fair valuation even for damaged and non-working electronics.
            </p>
            <h3 className="text-base font-bold text-gray-900 pt-2">Your Privacy Comes First</h3>
            <p>
              Personal data security is paramount. Sellbar performs certified, military-grade cryptographic data sanitization compliant with ISO/IEC 27001 &amp; NIST 800-88 guidelines at our centralized processing center, ensuring your private photos, passwords, and banking apps are completely eradicated.
            </p>
            <h3 className="text-base font-bold text-gray-900 pt-2">Sell Smart. Sell Sustainably.</h3>
            <p>
              By selling your smartphone on Sellbar, you contribute directly to India&apos;s green circular economy. Working phones are refurbished to extend their lifecycle, while non-functional components are channeled into CPCB-certified e-waste recycling, preventing toxic heavy metals from contaminating local landfills.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE VALUATION MODAL (Instant 3-Step Doorstep Quote)              */}
      {/* ========================================================================= */}
      {selectedModelForValuation && (<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button type="button" onClick={() => setSelectedModelForValuation(null)} className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition cursor-pointer">
              <X className="w-5 h-5"/>
            </button>

            {/* Header with Model Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-16 h-16 relative flex items-center justify-center shrink-0 bg-gray-50 rounded-xl p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedModelForValuation.imageUrl} alt={selectedModelForValuation.name} className="max-h-full max-w-full object-contain"/>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#13b59b] uppercase tracking-wider">
                  Step {valuationStep} of 3 • Quick Valuation
                </span>
                <h3 className="text-base font-bold text-gray-900 leading-snug">
                  {selectedModelForValuation.name}
                </h3>
                <span className="text-xs text-gray-500">
                  Base Resale Value: ₹{selectedModelForValuation.maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Step 1: Screen Condition */}
            {valuationStep === 1 && (<div className="py-6 space-y-4">
                <h4 className="text-sm font-bold text-gray-900">
                  How is the screen condition of your device?
                </h4>
                <div className="space-y-2.5">
                  {[
                    { id: 'flawless', label: 'Flawless Display', desc: 'No scratches, cracks, dead pixels or discoloration.' },
                    { id: 'scratched', label: 'Minor Scratches', desc: 'Light hairline marks visible only under direct light.' },
                    { id: 'broken', label: 'Cracked or Broken Glass', desc: 'Visible cracks or touch unresponsive in certain areas.' },
                ].map((opt) => (<button key={opt.id} type="button" onClick={() => setScreenCondition(opt.id)} className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${screenCondition === opt.id
                        ? 'border-[#13b59b] bg-teal-50/40 ring-2 ring-[#13b59b]/20'
                        : 'border-gray-200 hover:border-gray-300'}`}>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900">{opt.label}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${screenCondition === opt.id ? 'border-[#13b59b] bg-[#13b59b]' : 'border-gray-300'}`}>
                        {screenCondition === opt.id && <Check className="w-3 h-3 text-white"/>}
                      </div>
                    </button>))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="button" onClick={() => setValuationStep(2)} className="px-6 py-3 bg-[#13b59b] hover:bg-[#0ea38a] text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs">
                    <span>Next: Body Condition</span>
                    <ArrowRight className="w-4 h-4"/>
                  </button>
                </div>
              </div>)}

            {/* Step 2: Body / Chassis Condition */}
            {valuationStep === 2 && (<div className="py-6 space-y-4">
                <h4 className="text-sm font-bold text-gray-900">
                  How is the physical body / frame condition?
                </h4>
                <div className="space-y-2.5">
                  {[
                    { id: 'like_new', label: 'Like New / Flawless', desc: 'No dents, scratches or color peeling.' },
                    { id: 'minor_scratches', label: 'Few Micro Scratches', desc: 'Normal daily usage signs on metal/plastic frame.' },
                    { id: 'dents', label: 'Heavy Dents or Cracks', desc: 'Noticeable drop dents or cracked back panel glass.' },
                ].map((opt) => (<button key={opt.id} type="button" onClick={() => setBodyCondition(opt.id)} className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${bodyCondition === opt.id
                        ? 'border-[#13b59b] bg-teal-50/40 ring-2 ring-[#13b59b]/20'
                        : 'border-gray-200 hover:border-gray-300'}`}>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-gray-900">{opt.label}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{opt.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${bodyCondition === opt.id ? 'border-[#13b59b] bg-[#13b59b]' : 'border-gray-300'}`}>
                        {bodyCondition === opt.id && <Check className="w-3 h-3 text-white"/>}
                      </div>
                    </button>))}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button type="button" onClick={() => setValuationStep(1)} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                    Back
                  </button>
                  <button type="button" onClick={() => setValuationStep(3)} className="px-6 py-3 bg-[#13b59b] hover:bg-[#0ea38a] text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs">
                    <span>Calculate Final Price</span>
                    <Sparkles className="w-4 h-4"/>
                  </button>
                </div>
              </div>)}

            {/* Step 3: Final Guaranteed Offer & Instant Pickup Booking */}
            {valuationStep === 3 && (<div className="py-6 space-y-5 text-center">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-7 h-7"/>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Calculated Doorstep Cash Offer
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-gray-950 mt-1">
                    ₹{calculatedQuote.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    Includes Free Doorstep Pickup + Certified Military-Grade Data Wipe
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 text-xs text-left text-gray-600 space-y-2 border border-gray-100">
                  <div className="flex justify-between">
                    <span>Device:</span>
                    <strong className="text-gray-900">{selectedModelForValuation.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Screen Status:</span>
                    <strong className="text-gray-900 capitalize">{screenCondition}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Body Condition:</span>
                    <strong className="text-gray-900 capitalize">{bodyCondition.replace('_', ' ')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Mode:</span>
                    <strong className="text-emerald-700">Instant UPI / Bank Transfer</strong>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Link href={`/checkout?sell=true&device=${encodeURIComponent(selectedModelForValuation.name)}&price=${calculatedQuote}`} className="block w-full py-3.5 bg-[#2bbb9e] hover:bg-[#23a58c] active:scale-[0.98] text-slate-950 font-black text-sm rounded-xl shadow-md transition">
                    Book Free Doorstep Pickup Now
                  </Link>

                  <button type="button" onClick={() => setValuationStep(1)} className="text-xs font-semibold text-gray-500 hover:text-gray-800">
                    Re-evaluate Condition
                  </button>
                </div>
              </div>)}

          </div>
        </div>)}

    </div>);
}
