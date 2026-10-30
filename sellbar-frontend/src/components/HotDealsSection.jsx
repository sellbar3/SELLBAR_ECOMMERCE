'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { getCloudinaryUrl } from '@/lib/cloudinary';

const HOT_DEALS = [
  {
    id: 'buyback-offers',
    bannerTitle: 'Buyback\nOffers',
    title: 'Mega Exchange Carnival',
    subtitle: 'Extra ₹3,000 Bonus on Exchange',
    bgClass: 'bg-[#fde2e4]',
    arrowColor: 'text-[#f43f5e]',
    image: '/cashify/hot-deal-1.webp',
    href: '/sell',
  },
  {
    id: 'exchange-offers',
    bannerTitle: 'Exchange\nOffers',
    title: 'Refurbished iPhone Bonanza',
    subtitle: 'Up to 60% OFF + 12M Warranty',
    bgClass: 'bg-[#d8f5ef]',
    arrowColor: 'text-[#13b59b]',
    image: '/cashify/hot-deal-2.webp',
    href: '/buy-refurbished-mobile-phones',
  },
  {
    id: 'refurbished-device-offers',
    bannerTitle: 'Refurbished\nDevice\nOffers',
    title: 'Doorstep Repair Special',
    subtitle: 'Free Screen Protector on Every Repair',
    bgClass: 'bg-[#e2e1f9]',
    arrowColor: 'text-[#6366f1]',
    image: '/cashify/hot-deal-3.webp',
    href: '/buy-refurbished',
  },
  {
    id: 'repair-offers',
    bannerTitle: 'Repair\nOffers',
    title: 'Laptops & MacBooks Sale',
    subtitle: 'Premium Core i5 & M-Series From ₹24,499',
    bgClass: 'bg-[#fef2c7]',
    arrowColor: 'text-[#eab308]',
    image: '/cashify/hot-deal-4.webp',
    href: '/buy-refurbished-laptops',
  },
];

export default function HotDealsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#13b59b] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#13b59b]" />
            <span>LIMITED PERIOD OFFERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Hot Deals
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Exciting offers for more value</p>
        </div>
        <Link
          href="/buy-refurbished"
          className="text-xs sm:text-sm font-bold text-[#13b59b] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View All Deals</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HOT_DEALS.map((deal) => (
          <Link
            key={deal.id}
            href={deal.href}
            className="group block rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {/* Top Colored Banner Container */}
            <div className={`p-5 h-44 relative flex items-start justify-between ${deal.bgClass} overflow-hidden`}>
              <div className="flex flex-col justify-between h-full z-10">
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight whitespace-pre-line tracking-tight">
                  {deal.bannerTitle}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <ChevronRight className={`w-4.5 h-4.5 ${deal.arrowColor}`} />
                </div>
              </div>

              {/* Promo Device Mockups Image */}
              <div className="absolute right-1 bottom-0 h-36 w-44 flex items-end justify-end pointer-events-none">
                <img
                  src={getCloudinaryUrl(deal.image)}
                  alt={deal.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom White Info Box */}
            <div className="p-4 sm:p-5 bg-white">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#13b59b] transition-colors leading-tight">
                {deal.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{deal.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
