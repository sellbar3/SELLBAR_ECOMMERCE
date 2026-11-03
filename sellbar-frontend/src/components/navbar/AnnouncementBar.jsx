'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Truck, 
  HelpCircle, 
  Package, 
  Sparkles, 
  PhoneCall, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { PROMOTIONAL_ANNOUNCEMENTS } from './navData';

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMOTIONAL_ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentPromo = PROMOTIONAL_ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-[#0f172a] text-slate-200 border-b border-slate-800/80 text-[11px] sm:text-xs antialiased relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 sm:h-8.5 flex items-center justify-between gap-3">
        {/* Left: Free Shipping / Service Zone badge */}
        <div className="hidden md:flex items-center gap-2 text-slate-300">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#2dd4bf] text-[10px] font-bold border border-emerald-500/30">
            <Truck size={12} className="stroke-[2.5]" /> Free Express Shipping
          </span>
          <span className="text-slate-400">West Champaran &amp; Pan-India</span>
        </div>

        {/* Center: Rotating Announcement Ticker */}
        <div className="flex-1 flex justify-center text-center overflow-hidden">
          <Link
            href={currentPromo.link}
            className="inline-flex items-center gap-1.5 font-medium hover:text-[#2dd4bf] transition-colors duration-200 truncate group"
          >
            <span className="truncate">{currentPromo.text}</span>
            <ChevronRight size={12} className="shrink-0 text-slate-500 group-hover:text-[#2dd4bf] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Right: Quick Utility Links */}
        <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 font-medium text-slate-400">
          <Link
            href="/track-order"
            className="hover:text-white transition flex items-center gap-1"
          >
            <Package size={12} className="text-[#2dd4bf]" />
            <span className="hidden sm:inline">Track Order</span>
          </Link>
          <span className="hidden sm:inline text-slate-700">|</span>
          <Link
            href="/contact"
            className="hover:text-white transition flex items-center gap-1"
          >
            <PhoneCall size={12} className="text-[#2dd4bf]" />
            <span className="hidden sm:inline">Support</span>
          </Link>
          <span className="hidden sm:inline text-slate-700">|</span>
          <Link
            href="/about"
            className="hover:text-white transition"
          >
            Community
          </Link>
        </div>
      </div>
    </div>
  );
}
