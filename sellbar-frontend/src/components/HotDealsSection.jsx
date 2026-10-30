'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import FoldText from '@/components/FoldText';
export default function HotDealsSection() {
    const deals = [
        {
            id: 1,
            title: 'Mega Exchange Carnival',
            subtitle: 'Extra ₹3,000 Bonus on Exchange',
            image: '/cashify/hot-deal-1.webp',
            href: '/sell',
        },
        {
            id: 2,
            title: 'Refurbished iPhone Bonanza',
            subtitle: 'Up to 60% OFF + 12M Warranty',
            image: '/cashify/hot-deal-2.webp',
            href: '/buy-refurbished',
        },
        {
            id: 3,
            title: 'Doorstep Repair Special',
            subtitle: 'Free Screen Protector on Every Repair',
            image: '/cashify/hot-deal-3.webp',
            href: '/repair',
        },
        {
            id: 4,
            title: 'Laptops & MacBooks Sale',
            subtitle: 'Premium Core i5 & M-Series From ₹24,499',
            image: '/cashify/hot-deal-4.webp',
            href: '/buy-refurbished/laptops',
        },
    ];
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#13b59b] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#13b59b]"/>
            <span>Limited Period Offers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            <FoldText text="Hot Deals" foldStyle="paper" splitBy="word" hinge="top" trigger="scroll" duration={0.65} stagger={0.05} fontSize="inherit" fontWeight="inherit" color="#111827"/>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Exciting offers for more value</p>
        </div>
        <Link href="/buy-refurbished" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1">
          <span>View All Deals</span>
          <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (<Link key={deal.id} href={deal.href} className="group block relative overflow-hidden rounded-2xl border border-gray-200/80 hover:border-[#13b59b] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
            <div className="aspect-video w-full overflow-hidden bg-gray-50 relative">
              <img src={deal.image} alt={deal.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="p-3.5 bg-white">
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#13b59b] transition line-clamp-1">
                {deal.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 font-medium">
                {deal.subtitle}
              </p>
            </div>
          </Link>))}
      </div>
    </section>);
}
