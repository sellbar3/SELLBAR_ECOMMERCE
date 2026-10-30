'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
export default function RefurbishedLaptopsSection() {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    // Exact Refurbished Laptops matching Cashify's live website & HTML
    const laptops = [
        {
            id: 'laptop-lenovo-t14',
            title: 'Lenovo Thinkpad T Series T14 GEN 1 (Amd Ryzen5 Pro 4000U Series 14 Inch)- Refurbished',
            href: '/buy-refurbished-laptops/lenovo-thinkpad-t-series-t14-gen-1-refurbished',
            price: '₹27,299',
            mrp: '₹47,849',
            discountOff: '₹20,550 OFF',
            percentOff: '-43%',
            rating: '4.7',
            image: '/cashify/laptop-lenovo-thinkpad.webp',
            badge: 'Dussehra Sale',
        },
        {
            id: 'laptop-dell-3410-i5',
            title: 'Dell Latitude 3000 Series 3410 (Intel Core i5 10th Gen 14 Inch)- Refurbished',
            href: '/buy-refurbished-laptops/dell-latitude-3000-series-3410-intel-core-i5-refurbished',
            price: '₹24,499',
            mrp: '₹39,999',
            discountOff: '₹15,500 OFF',
            percentOff: '-39%',
            rating: '4.6',
            image: '/cashify/laptop-dell-3410-i5.png',
            badge: 'Dussehra Sale',
        },
        {
            id: 'laptop-dell-5310',
            title: 'Dell Latitude 5000 Series 5310 (Intel Core i5 10th Gen 13.3 Inch)- Refurbished',
            href: '/buy-refurbished-laptops/dell-latitude-5000-series-5310-intel-core-i5-refurbished',
            price: '₹29,999',
            mrp: '₹42,999',
            discountOff: '₹13,000 OFF',
            percentOff: '-30%',
            rating: '4.8',
            image: '/cashify/laptop-dell-5310.png',
            badge: 'Dussehra Sale',
        },
        {
            id: 'laptop-dell-3410-i7',
            title: 'Dell Latitude 3000 Series 3410 (Intel Core i7 10th Gen 14 Inch)- Refurbished',
            href: '/buy-refurbished-laptops/dell-latitude-3000-series-3410-intel-core-i7-refurbished',
            price: '₹30,199',
            mrp: '₹44,999',
            discountOff: '₹14,800 OFF',
            percentOff: '-33%',
            rating: '4.3',
            image: '/cashify/laptop-dell-3410-i7.png',
            badge: 'Dussehra Sale',
        },
        {
            id: 'laptop-macbook-pro-m3',
            title: 'Apple MacBook Pro 2023 A2991 (Apple M3 Max 16-inch)- Refurbished',
            href: '/buy-refurbished-laptops/apple-macbook-pro-2023-a2991-m3-max-16-inch-refurbished',
            price: '₹2,18,499',
            mrp: '₹3,65,399',
            discountOff: '₹1,46,900 OFF',
            percentOff: '-40%',
            rating: '4.6',
            image: '/cashify/laptop-macbook-pro-m3.webp',
            badge: 'Dussehra Sale',
        },
        {
            id: 'laptop-dell-5320',
            title: 'Dell Latitude 5000 Series 5320 (Intel Core i5 11th Gen 13.3 Inch)- Refurbished',
            href: '/buy-refurbished-laptops/dell-latitude-5000-series-5320-intel-core-i5-refurbished',
            price: '₹34,499',
            mrp: '₹55,000',
            discountOff: '₹20,501 OFF',
            percentOff: '-37%',
            rating: '4.8',
            image: '/cashify/laptop-dell-5320.png',
            badge: 'Dussehra Sale',
        },
        {
            id: 'laptop-macbook-air-m1',
            title: 'Apple MacBook Air 2020 (Apple M1 / 8GB / 256GB SSD)- Refurbished',
            href: '/buy-refurbished-laptops/apple-macbook-air-2020-m1-8gb-256gb-refurbished',
            price: '₹46,999',
            mrp: '₹92,900',
            discountOff: '₹45,901 OFF',
            percentOff: '-49%',
            rating: '4.9',
            image: '/cashify/laptop-macbook-pro-m3.webp',
            badge: 'Dussehra Sale',
        },
        {
            id: 'laptop-lenovo-x1-carbon',
            title: 'Lenovo ThinkPad X1 Carbon Gen 9 (Intel Core i7 11th Gen)- Refurbished',
            href: '/buy-refurbished-laptops/lenovo-thinkpad-x1-carbon-gen-9-refurbished',
            price: '₹44,999',
            mrp: '₹89,999',
            discountOff: '₹45,000 OFF',
            percentOff: '-50%',
            rating: '4.7',
            image: '/cashify/laptop-lenovo-thinkpad.webp',
            badge: 'Dussehra Sale',
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
          Refurbished Laptops
        </h2>
        <Link href="/buy-refurbished-laptops" className="text-xs sm:text-sm font-semibold text-[#13b59b] hover:text-[#0ea38a] hover:underline">
          View All
        </Link>
      </div>

      {/* Slider Carousel Container */}
      <div className="relative group/slider">
        {/* Left Arrow Button */}
        {canScrollLeft && (<button type="button" onClick={() => handleScroll('left')} className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition cursor-pointer" aria-label="Previous Laptops">
            <ChevronLeft className="w-5 h-5"/>
          </button>)}

        {/* Right Arrow Button */}
        {canScrollRight && (<button type="button" onClick={() => handleScroll('right')} className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition cursor-pointer" aria-label="Next Laptops">
            <ChevronRight className="w-5 h-5"/>
          </button>)}

        {/* Horizontal Scrollable Row */}
        <div ref={scrollRef} onScroll={checkScroll} className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-none py-1 px-1">
          {laptops.map((laptop) => (<Link key={laptop.id} href={laptop.href} className="w-48 sm:w-60 shrink-0 bg-white rounded-md border-2 border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-3 relative cursor-pointer">
              <div>
                {/* Top: Sellbar Assured badge */}
                <div className="flex items-center justify-between mb-1 min-h-5 px-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/sellbar-assured.svg" alt="Sellbar Assured" className="h-5 w-16 object-contain"/>
                </div>

                {/* Product Image */}
                <div className="w-28 h-28 sm:w-40 sm:h-40 mx-auto flex items-center justify-center my-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={laptop.image} alt={laptop.title} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-105"/>
                </div>

                {/* Savings Green Badge */}
                <div className="mx-2 min-h-7 mb-1 flex items-center">
                  <div className="text-[11px] font-bold rounded-xs text-[#008f5d] px-1.5 py-0.5 bg-[#e6f7f1] self-start">
                    {laptop.discountOff}
                  </div>
                </div>

                {/* Title */}
                <h3 title={laptop.title} className="text-xs sm:text-[13px] font-semibold text-gray-900 line-clamp-2 min-h-7 sm:min-h-10 mx-2 mb-2 leading-snug">
                  {laptop.title}
                </h3>

                {/* Dussehra Sale badge & Rating */}
                <div className="flex items-center gap-1.5 mx-2 mb-2">
                  <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-xs" style={{ backgroundColor: '#1d3d93' }}>
                    {laptop.badge}
                  </span>
                  <div className="flex items-center gap-0.5 border border-gray-200 px-1 py-0.5 rounded-xs text-[11px] font-bold text-gray-800">
                    <span>{laptop.rating}</span>
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400"/>
                  </div>
                </div>

                {/* Pricing: -43% ₹27,299 ₹47,849 */}
                <div className="flex items-baseline gap-2 mx-2 pt-1 border-t border-gray-50">
                  <span className="text-xs sm:text-sm font-bold text-red-500">
                    {laptop.percentOff}
                  </span>
                  <span className="text-sm sm:text-base font-black text-gray-950">
                    {laptop.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {laptop.mrp}
                  </span>
                </div>
              </div>
            </Link>))}
        </div>
      </div>
    </section>);
}
