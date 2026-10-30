'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Star, Zap, RotateCcw, SlidersHorizontal, ChevronRight, ChevronDown, ChevronUp, Heart, Truck, CheckCircle2, CreditCard, Award, } from 'lucide-react';
import { addToCart } from '@/lib/cart';
export default function RefurbishedCategoryHub({ categorySlug, categoryTitle, categorySubtitle, badgeText, popularBrands, products, faqs, buyingGuideTitle, buyingGuideContent, }) {
    const [selectedBrand, setSelectedBrand] = useState('ALL');
    const [selectedGrade, setSelectedGrade] = useState('ALL');
    const [selectedPriceRange, setSelectedPriceRange] = useState('ALL');
    const [sortBy, setSortBy] = useState('popular');
    const [openFaq, setOpenFaq] = useState(0);
    const [wishlist, setWishlist] = useState({});
    const [addedToast, setAddedToast] = useState(null);
    const toggleWishlist = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const handleQuickAdd = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        setAddedToast(product.title);
        setTimeout(() => setAddedToast(null), 2500);
    };
    // Filter products
    const filteredProducts = products.filter((p) => {
        // Brand filter
        if (selectedBrand !== 'ALL' && p.brandName.toLowerCase() !== selectedBrand.toLowerCase()) {
            return false;
        }
        // Grade filter
        if (selectedGrade !== 'ALL') {
            if (selectedGrade === 'Superb' && p.conditionGrade !== 'FLAWLESS')
                return false;
            if (selectedGrade === 'Good' && p.conditionGrade !== 'LIKE_NEW')
                return false;
            if (selectedGrade === 'Fair' && p.conditionGrade !== 'SMART_VALUE')
                return false;
        }
        // Price range filter
        if (selectedPriceRange === 'UNDER_20K' && p.sellbarPrice >= 20000)
            return false;
        if (selectedPriceRange === '20K_40K' && (p.sellbarPrice < 20000 || p.sellbarPrice > 40000))
            return false;
        if (selectedPriceRange === '40K_60K' && (p.sellbarPrice < 40000 || p.sellbarPrice > 60000))
            return false;
        if (selectedPriceRange === 'ABOVE_60K' && p.sellbarPrice <= 60000)
            return false;
        return true;
    });
    // Sort products
    filteredProducts.sort((a, b) => {
        if (sortBy === 'price-asc')
            return a.sellbarPrice - b.sellbarPrice;
        if (sortBy === 'price-desc')
            return b.sellbarPrice - a.sellbarPrice;
        if (sortBy === 'rating')
            return (b.rating || 4.5) - (a.rating || 4.5);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
    return (<div className="bg-[#f7f9fa] min-h-screen text-gray-800 font-sans pb-20">
      
      {/* Toast Notification */}
      {addedToast && (<div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#13b59b]"/>
          <div>
            <div className="text-sm font-bold">Added to Cart!</div>
            <div className="text-xs text-gray-300 truncate max-w-xs">{addedToast}</div>
          </div>
          <Link href="/cart" className="ml-2 text-xs font-bold text-[#13b59b] hover:underline">
            View Bag &rarr;
          </Link>
        </div>)}

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
            <Link href="/buy-refurbished-gadgets" className="hover:text-[#13b59b] transition">Buy Gadgets</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
            <span className="text-gray-900 font-medium">{categoryTitle}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#13b59b] text-xs font-bold px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5"/>
              <span>{badgeText}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              {categoryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
              {categorySubtitle}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-200/80 shrink-0">
            <div className="text-center px-3 border-r border-gray-200">
              <div className="text-lg font-black text-gray-900">32-Point</div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Checks</div>
            </div>
            <div className="text-center px-3 border-r border-gray-200">
              <div className="text-lg font-black text-emerald-600">Up to 12M</div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Warranty</div>
            </div>
            <div className="text-center px-3">
              <div className="text-lg font-black text-gray-900">15 Days</div>
              <div className="text-[10px] text-gray-500 uppercase font-semibold">Refund</div>
            </div>
          </div>
        </div>

        {/* Brand Selector Pills Row */}
        {popularBrands.length > 0 && (<div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-gray-100">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Shop by Top Brand
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              <button type="button" onClick={() => setSelectedBrand('ALL')} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${selectedBrand === 'ALL'
                ? 'bg-[#13b59b] text-white shadow-xs'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
                All Brands ({products.length})
              </button>

              {popularBrands.map((b) => {
                const count = products.filter((p) => p.brandName.toLowerCase() === b.slug.toLowerCase()).length;
                const isSelected = selectedBrand.toLowerCase() === b.slug.toLowerCase();
                return (<button key={b.slug} type="button" onClick={() => setSelectedBrand(isSelected ? 'ALL' : b.slug)} className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${isSelected
                        ? 'bg-[#13b59b] text-white shadow-xs'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
                    {b.name} {count > 0 && <span className="opacity-80">({count})</span>}
                  </button>);
            })}
            </div>
          </div>)}
      </div>

      {/* Filter & Sort Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Left: Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-400 uppercase tracking-wider text-[11px] mr-1">
              Filter:
            </span>

            {/* Condition Grade Filter */}
            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-semibold text-gray-700 focus:outline-none focus:border-[#13b59b]">
              <option value="ALL">All Conditions</option>
              <option value="Superb">Superb (Like New)</option>
              <option value="Good">Good (Minor Wear)</option>
              <option value="Fair">Fair (Value)</option>
            </select>

            {/* Price Range Filter */}
            <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-semibold text-gray-700 focus:outline-none focus:border-[#13b59b]">
              <option value="ALL">All Price Ranges</option>
              <option value="UNDER_20K">Under ₹20,000</option>
              <option value="20K_40K">₹20,000 - ₹40,000</option>
              <option value="40K_60K">₹40,000 - ₹60,000</option>
              <option value="ABOVE_60K">Above ₹60,000</option>
            </select>

            {(selectedBrand !== 'ALL' || selectedGrade !== 'ALL' || selectedPriceRange !== 'ALL') && (<button type="button" onClick={() => {
                setSelectedBrand('ALL');
                setSelectedGrade('ALL');
                setSelectedPriceRange('ALL');
            }} className="text-[#13b59b] font-bold hover:underline ml-1">
                Reset Filters
              </button>)}
          </div>

          {/* Right: Sort By */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-500">Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-semibold text-gray-700 focus:outline-none focus:border-[#13b59b]">
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>
      </div>

      {/* Main Product Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {filteredProducts.length === 0 ? (<div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <SlidersHorizontal className="w-8 h-8"/>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No products match your filters</h3>
            <p className="text-xs text-gray-500 mb-6">
              Try resetting your brand, condition or price filter to view all available devices.
            </p>
            <button type="button" onClick={() => {
                setSelectedBrand('ALL');
                setSelectedGrade('ALL');
                setSelectedPriceRange('ALL');
            }} className="px-5 py-2.5 bg-[#13b59b] text-white text-xs font-bold rounded-xl shadow-xs">
              Show All Devices
            </button>
          </div>) : (<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
                const discount = Math.round(((product.mrpPrice - product.sellbarPrice) / product.mrpPrice) * 100);
                const savings = product.mrpPrice - product.sellbarPrice;
                const emi = Math.round(product.sellbarPrice / 12);
                const isWish = wishlist[product.id];
                const pLink = categorySlug === 'phones'
                    ? `/buy-refurbished-mobile-phones/${product.slug}`
                    : `/product/${product.slug}`;
                return (<div key={product.id} className="bg-white rounded-2xl border border-gray-200 hover:border-[#13b59b] hover:shadow-xl transition flex flex-col justify-between group overflow-hidden">
                  <Link href={pLink} className="p-4 flex flex-col flex-1">
                    
                    {/* Top Row: Savings badge & Wishlist Heart */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-teal-50 text-[#13b59b] px-2 py-0.5 rounded">
                        ₹{savings.toLocaleString('en-IN')} OFF
                      </span>

                      <button type="button" onClick={(e) => toggleWishlist(product.id, e)} className={`p-1.5 rounded-full hover:bg-gray-100 transition ${isWish ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}>
                        <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`}/>
                      </button>
                    </div>

                    {/* Image Showcase */}
                    <div className="relative w-full h-40 sm:h-48 my-2">
                      <Image src={product.images[0] || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'} alt={product.title} fill className="object-contain group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 250px"/>
                    </div>

                    {/* Details */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-1">
                        <span>{product.brandName}</span>
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded">
                          {product.conditionGrade === 'FLAWLESS' ? 'Superb' : product.conditionGrade === 'LIKE_NEW' ? 'Good' : 'Fair'}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#13b59b] transition">
                        {product.title}
                      </h3>

                      {/* Ratings */}
                      <div className="flex items-center gap-1.5 mt-1.5 mb-2.5">
                        <div className="inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                          <span>{product.rating || 4.5}</span>
                          <Star className="w-2.5 h-2.5 fill-white"/>
                        </div>
                        <span className="text-[11px] text-gray-400">({product.reviewsCount || 10})</span>
                      </div>

                      {/* Prices */}
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xs font-bold text-rose-600">-{discount}%</span>
                        <span className="text-base sm:text-lg font-black text-gray-900">
                          ₹{product.sellbarPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.mrpPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* EMI Subtitle */}
                      <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                        <CreditCard className="w-3 h-3 text-[#13b59b]"/>
                        <span>EMI from <strong>₹{emi.toLocaleString('en-IN')}</strong>/mo</span>
                      </div>
                    </div>
                  </Link>

                  {/* Quick Add CTA */}
                  <div className="p-3 pt-0">
                    <button type="button" onClick={(e) => handleQuickAdd(product, e)} className="w-full py-2 bg-gray-50 hover:bg-[#13b59b] text-gray-900 hover:text-white border border-gray-200 hover:border-[#13b59b] font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs">
                      <Zap className="w-3.5 h-3.5 fill-current"/>
                      <span>Quick Add to Bag</span>
                    </button>
                  </div>
                </div>);
            })}
          </div>)}

      </div>

      {/* Sellbar Trust Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">The Sellbar Promise</h2>
            <p className="text-xs sm:text-sm text-gray-500">Every refurbished gadget is inspected, cleaned & certified</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-sm text-gray-900">32-Point Inspection</h3>
              <p className="text-xs text-gray-500 mt-0.5">Battery, screen, camera & hardware diagnostics passed 100%.</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <Award className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-sm text-gray-900">Up to 12M Warranty</h3>
              <p className="text-xs text-gray-500 mt-0.5">Doorstep repair and replacement assistance across India.</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <RotateCcw className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-sm text-gray-900">15 Days Refund*</h3>
              <p className="text-xs text-gray-500 mt-0.5">Easy returns and doorstep pickup if you aren&apos;t fully satisfied.</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#13b59b] flex items-center justify-center mb-2">
                <Truck className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-sm text-gray-900">Free Express Delivery</h3>
              <p className="text-xs text-gray-500 mt-0.5">Prompt 24-48h dispatch with Cash on Delivery (COD) available.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buying Guide Text Section */}
      {buyingGuideContent.length > 0 && (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight mb-3">
              {buyingGuideTitle}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {buyingGuideContent.map((paragraph, idx) => (<p key={idx}>{paragraph}</p>))}
            </div>
          </div>
        </div>)}

      {/* FAQ Accordion */}
      {faqs.length > 0 && (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (<div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-900 bg-white hover:bg-gray-50 transition cursor-pointer">
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#13b59b]"/> : <ChevronDown className="w-4 h-4 text-gray-400"/>}
                    </button>
                    {isOpen && (<div className="p-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed bg-[#fbfcfc] border-t border-gray-100">
                        {faq.a}
                      </div>)}
                  </div>);
            })}
            </div>
          </div>
        </div>)}

    </div>);
}
