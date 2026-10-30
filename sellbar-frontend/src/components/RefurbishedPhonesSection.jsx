'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
export default function RefurbishedPhonesSection() {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    // Exact Refurbished Mobile Phones matching Cashify's live website & HTML
    const phones = [
        {
            id: 'phone-oppo-reno15',
            title: 'OPPO Reno15 Pro 5G - Refurbished',
            href: '/buy-refurbished-mobile-phones/renewed-oppo-reno15-pro/sale/171757',
            price: '₹54,999',
            mrp: '₹79,999',
            discountOff: '₹25,000 OFF',
            percentOff: '-31%',
            rating: '4.0',
            image: '/cashify/phone-oppo-reno15.jpg',
            badge: 'Lowest Price',
        },
        {
            id: 'phone-samsung-s21',
            title: 'Samsung Galaxy S21 Ultra 5G - Refurbished',
            href: '/buy-refurbished-mobile-phones/samsung-galaxy-s21-ultra-5g-refurbished',
            price: '₹36,699',
            mrp: '₹73,600',
            discountOff: '₹36,901 OFF',
            percentOff: '-50%',
            rating: '4.5',
            image: '/cashify/phone-samsung-s21.jpg',
            badge: 'Lowest Price',
        },
        {
            id: 'phone-samsung-s24',
            title: 'Samsung Galaxy S24 Ultra 5G - Refurbished',
            href: '/buy-refurbished-mobile-phones/sellbar-certified-samsung-s24-ultra-512gb-titanium-gray-flawless',
            price: '₹63,999',
            mrp: '₹1,34,999',
            discountOff: '₹71,000 OFF',
            percentOff: '-53%',
            rating: '4.8',
            image: '/cashify/phone-samsung-s24.jpg',
            badge: 'Lowest Price',
            isSelect: true,
        },
        {
            id: 'phone-oneplus-12',
            title: 'OnePlus 12 - Refurbished',
            href: '/buy-refurbished-mobile-phones/sellbar-certified-oneplus-12-16gb-512gb-silky-black',
            price: '₹39,299',
            mrp: '₹69,999',
            discountOff: '₹30,700 OFF',
            percentOff: '-44%',
            rating: '4.8',
            image: '/cashify/phone-oneplus-12.jpg',
            badge: 'Lowest Price',
        },
        {
            id: 'phone-samsung-fold5',
            title: 'Samsung Galaxy Z Fold5 - Refurbished',
            href: '/buy-refurbished-mobile-phones/samsung-galaxy-z-fold5-5g-refurbished',
            price: '₹69,499',
            mrp: '₹84,399',
            discountOff: '₹14,900 OFF',
            percentOff: '-18%',
            rating: '4.9',
            image: '/cashify/phone-samsung-fold5.jpg',
            badge: 'Lowest Price',
        },
        {
            id: 'phone-samsung-flip6',
            title: 'Samsung Galaxy Z Flip6 5G - Refurbished',
            href: '/buy-refurbished-mobile-phones/samsung-galaxy-z-flip6-5g-refurbished',
            price: '₹48,899',
            mrp: '₹1,09,999',
            discountOff: '₹61,100 OFF',
            percentOff: '-56%',
            rating: '4.9',
            image: 'https://s3ng.cashify.in/cashify/product/img/xxhdpi/49733b41-913f.jpg',
            badge: 'Lowest Price',
        },
        {
            id: 'phone-oneplus-nord2',
            title: 'OnePlus Nord 2 5G - Refurbished',
            href: '/buy-refurbished-mobile-phones/oneplus-nord-2-5g-refurbished',
            price: '₹16,699',
            mrp: '₹33,200',
            discountOff: '₹16,501 OFF',
            percentOff: '-50%',
            rating: '4.0',
            image: '/cashify/phone-oneplus-nord2.jpg',
            badge: 'Lowest Price',
        },
        {
            id: 'phone-iphone-14',
            title: 'Apple iPhone 14 (128GB) - Refurbished',
            href: '/buy-refurbished-mobile-phones/sellbar-certified-apple-iphone-14-128gb-midnight-like-new',
            price: '₹38,999',
            mrp: '₹69,900',
            discountOff: '₹30,901 OFF',
            percentOff: '-44%',
            rating: '4.9',
            image: '/products/iphone-14.webp',
            badge: 'Lowest Price',
        },
        {
            id: 'phone-iphone-13',
            title: 'Apple iPhone 13 (128GB) - Refurbished',
            href: '/buy-refurbished-mobile-phones/sellbar-certified-apple-iphone-13-128gb-starlight',
            price: '₹32,999',
            mrp: '₹59,900',
            discountOff: '₹26,901 OFF',
            percentOff: '-45%',
            rating: '4.8',
            image: '/products/iphone-13.webp',
            badge: 'Lowest Price',
        },
    ];
    const checkScroll = () => {
        if (!scrollRef.current)
            return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };
    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);
    const handleScroll = (direction) => {
        if (!scrollRef.current)
            return;
        const container = scrollRef.current;
        const scrollAmount = container.clientWidth * 0.75;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Section Header: Title on Left, View All on Right */}
      <div className="flex flex-row justify-between items-center mb-3 sm:mb-4 px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Buy Refurbished Devices
        </h2>
        <Link href="/buy-refurbished-mobile-phones" className="text-xs sm:text-sm font-semibold text-[#13b59b] hover:text-[#0ea38a] hover:underline">
          View All
        </Link>
      </div>

      {/* Slider Carousel Container */}
      <div className="relative group/slider">
        {/* Left Arrow Button */}
        {canScrollLeft && (<button type="button" onClick={() => handleScroll('left')} className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition cursor-pointer" aria-label="Previous Devices">
            <ChevronLeft className="w-5 h-5"/>
          </button>)}

        {/* Right Arrow Button */}
        {canScrollRight && (<button type="button" onClick={() => handleScroll('right')} className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition cursor-pointer" aria-label="Next Devices">
            <ChevronRight className="w-5 h-5"/>
          </button>)}

        {/* Horizontal Scrollable Row */}
        <div ref={scrollRef} onScroll={checkScroll} className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-none py-1 px-1">
          {phones.map((phone) => (<Link key={phone.id} href={phone.href} className="w-48 sm:w-60 shrink-0 bg-white rounded-md border-2 border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-3 relative cursor-pointer">
              <div>
                {/* Top: Sellbar Assured badge */}
                <div className="flex items-center justify-between mb-1 min-h-5 px-1">
                  {phone.isSelect ? (<span className="inline-flex items-center gap-1 bg-black text-amber-300 text-[10px] font-black italic px-2 py-0.5 rounded-full border border-amber-400/40">
                      ★ Select
                    </span>) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="/sellbar-assured.svg" alt="Sellbar Assured" className="h-5 w-16 object-contain"/>)}
                </div>

                {/* Product Image */}
                <div className="w-28 h-28 sm:w-40 sm:h-40 mx-auto flex items-center justify-center my-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={phone.image} alt={phone.title} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-105"/>
                </div>

                {/* Savings Green Badge */}
                <div className="mx-2 min-h-7 mb-1 flex items-center">
                  <div className="text-[11px] font-bold rounded-xs text-[#008f5d] px-1.5 py-0.5 bg-[#e6f7f1] self-start">
                    {phone.discountOff}
                  </div>
                </div>

                {/* Title */}
                <h3 title={phone.title} className="text-xs sm:text-[13px] font-semibold text-gray-900 line-clamp-2 min-h-7 sm:min-h-10 mx-2 mb-2 leading-snug">
                  {phone.title}
                </h3>

                {/* Lowest Price badge & Rating */}
                <div className="flex items-center gap-1.5 mx-2 mb-2">
                  <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-xs" style={{ backgroundColor: '#1d3d93' }}>
                    {phone.badge}
                  </span>
                  <div className="flex items-center gap-0.5 border border-gray-200 px-1 py-0.5 rounded-xs text-[11px] font-bold text-gray-800">
                    <span>{phone.rating}</span>
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400"/>
                  </div>
                </div>

                {/* Pricing: -31% ₹54,999 ₹79,999 */}
                <div className="flex items-baseline gap-2 mx-2 pt-1 border-t border-gray-50">
                  <span className="text-xs sm:text-sm font-bold text-red-500">
                    {phone.percentOff}
                  </span>
                  <span className="text-sm sm:text-base font-black text-gray-950">
                    {phone.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {phone.mrp}
                  </span>
                </div>
              </div>
            </Link>))}
        </div>
      </div>
    </section>);
}
