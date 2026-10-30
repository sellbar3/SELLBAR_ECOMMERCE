'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
export default function CashifyGuidesSection() {
    const buyGuides = [
        {
            id: 1,
            title: 'Apple iPhone 13 Mini Refurbished Deal: Warranty Included',
            category: 'Smart Buy Guide',
            image: '/cashify/guide-iphone13-mini.webp',
            href: '/buy-refurbished',
        },
        {
            id: 2,
            title: 'Get Refurbished Bose Portable Smart Speaker With Alexa: Specs, Price & Performance',
            category: 'Audio Deals',
            image: '/cashify/guide-bose-speaker.webp',
            href: '/buy-refurbished',
        },
        {
            id: 3,
            title: 'Best Deal On Refurbished Xiaomi Redmi Note 11S: Budget Powerhouse You Can’t Miss!',
            category: 'Budget Value',
            image: '/cashify/guide-redmi-note11s.webp',
            href: '/buy-refurbished',
        },
        {
            id: 4,
            title: 'Get Refurbished Samsung Galaxy S20 FE: Flagship Camera & Performance',
            category: 'Flagship Deal',
            image: '/cashify/guide-galaxy-s20fe.webp',
            href: '/buy-refurbished',
        },
    ];
    const sellGuides = [
        {
            id: 1,
            title: '512GB Phones: The Sweet Spot For Resale Value In 2026',
            category: 'Resale Intelligence',
            image: '/cashify/sell-guide-512gb.webp',
            href: '/sell',
        },
        {
            id: 2,
            title: 'Why iPhones Hold 15% More Resale Value Than Android In India',
            category: 'Market Trends',
            image: '/cashify/sell-guide-iphone-value.webp',
            href: '/sell',
        },
        {
            id: 3,
            title: 'Verify Your Phone’s ‘Clean’ Status Before Selling - Avoid Surprises',
            category: 'Safety Checklist',
            image: '/cashify/sell-guide-clean-status.webp',
            href: '/sell',
        },
        {
            id: 4,
            title: '3 Steps To Ensure Your Digital eSIM Doesn’t Go With Sold Phones',
            category: 'Privacy & Security',
            image: '/cashify/sell-guide-digital-sim.webp',
            href: '/sell',
        },
    ];
    return (<div className="space-y-12">
      {/* 1. Better For Pocket. Buy Refurbished */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#13b59b] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#13b59b]"/>
              <span>Smart Savings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Better For Pocket. Buy Refurbished
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Expert guides and insider buying tips</p>
          </div>
          <Link href="/buy-refurbished" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1 shrink-0">
            <span>See All Deals</span>
            <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buyGuides.map((guide) => (<Link key={guide.id} href={guide.href} className="group block relative overflow-hidden rounded-2xl border border-gray-200/80 hover:border-[#13b59b] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="aspect-16/10 w-full overflow-hidden bg-gray-100 relative">
                <img src={guide.image} alt={guide.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {guide.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#13b59b] transition line-clamp-2 leading-snug">
                  {guide.title}
                </h3>
                <div className="mt-2 text-[11px] font-bold text-[#13b59b] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5"/>
                </div>
              </div>
            </Link>))}
        </div>
      </section>

      {/* 2. Be Smart. Sell Smart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#13b59b] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-[#13b59b]"/>
              <span>Resale Wisdom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Be Smart. Sell Smart
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Maximize payout and protect your personal privacy</p>
          </div>
          <Link href="/sell" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1 shrink-0">
            <span>See All Sell Tips</span>
            <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sellGuides.map((guide) => (<Link key={guide.id} href={guide.href} className="group block relative overflow-hidden rounded-2xl border border-gray-200/80 hover:border-[#13b59b] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="aspect-16/10 w-full overflow-hidden bg-gray-100 relative">
                <img src={guide.image} alt={guide.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {guide.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#13b59b] transition line-clamp-2 leading-snug">
                  {guide.title}
                </h3>
                <div className="mt-2 text-[11px] font-bold text-[#13b59b] flex items-center gap-1">
                  <span>Explore Tips</span>
                  <ArrowRight className="w-3.5 h-3.5"/>
                </div>
              </div>
            </Link>))}
        </div>
      </section>
    </div>);
}
