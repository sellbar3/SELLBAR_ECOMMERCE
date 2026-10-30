'use client';
import React from 'react';
import Link from 'next/link';
import FoldText from '@/components/FoldText';
export default function SellYourOldDeviceSection() {
    const sellCategories = [
        {
            title: 'Sell Phone',
            href: '/sell-old-mobile-phone',
            icon: '/sell-icons/sell-phone.webp',
        },
        {
            title: 'Sell Laptop',
            href: '/sell-old-laptop',
            icon: '/sell-icons/sell-laptop.webp',
        },
        {
            title: 'Sell TV',
            href: '/sell-old-television',
            icon: '/sell-icons/sell-tv.webp',
        },
        {
            title: 'Sell Tablet',
            href: '/sell-old-tablet',
            icon: '/sell-icons/sell-tablet.webp',
        },
        {
            title: 'Sell Gaming Consoles',
            href: '/sell-old-gaming-consoles',
            icon: '/sell-icons/sell-gaming.webp',
        },
        {
            title: 'Sell Smartwatch',
            href: '/sell-old-smart-watch',
            icon: '/sell-icons/sell-smartwatch.webp',
        },
        {
            title: 'Sell Smart Speakers',
            href: '/sell-old-smart-speaker',
            icon: '/sell-icons/sell-smart-speaker.webp',
        },
        {
            title: 'Sell More',
            href: '/sell-old-mobile-phone',
            icon: '/sell-icons/sell-more.webp',
        },
    ];
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4 px-1">
        <FoldText text="Sell Your Old Device Now" foldStyle="paper" splitBy="word" hinge="top" trigger="scroll" duration={0.65} stagger={0.04} fontSize="inherit" fontWeight="inherit" color="#111827"/>
      </h2>

      {/* 8 Category Cards Row */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 px-1">
        {sellCategories.map((cat, idx) => (<Link key={idx} href={cat.href} className="group flex flex-col items-center text-center cursor-pointer">
            {/* Mint Rounded Box for Image */}
            <div className="w-full aspect-4/3 sm:aspect-square bg-[#edf7f5] hover:bg-[#e4f3ef] border border-[#d8ece7] group-hover:border-[#13b59b]/50 rounded-2xl flex items-center justify-center p-3 sm:p-4 transition-all duration-200 group-hover:scale-105 group-hover:shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cat.icon} alt={cat.title} loading="lazy" className="w-full h-full object-contain"/>
            </div>

            {/* Label Below Box */}
            <span className="text-xs sm:text-[13px] font-bold text-gray-900 mt-2 sm:mt-2.5 group-hover:text-[#13b59b] transition line-clamp-2 leading-snug">
              {cat.title}
            </span>
          </Link>))}
      </div>
    </section>);
}
