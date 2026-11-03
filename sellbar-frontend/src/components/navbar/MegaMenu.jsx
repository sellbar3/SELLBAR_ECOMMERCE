'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight, 
  Sparkles, 
  Smartphone, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Tag, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';
import {
  SHOP_MENU_ITEMS,
  CATEGORIES_MEGA_MENU,
  BRAND_ITEMS,
  SELL_OLD_MOBILE_MENU,
  NEW_ARRIVALS_MENU,
  BEST_DEALS_MENU,
} from './navData';

export default function MegaMenu({ activeMenu, onClose }) {
  if (!activeMenu) return null;

  return (
    <div 
      className="absolute top-full left-0 right-0 z-50 pt-2 animate-in fade-in slide-in-from-top-1 duration-150"
      onMouseLeave={onClose}
    >
      {/* Viewport & Container Constraint Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] p-6 sm:p-8 overflow-hidden"
          style={{
            maxWidth: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* ======================================================== */}
          {/* 1. SHOP MEGA MENU                                        */}
          {/* ======================================================== */}
          {activeMenu === 'shop' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SHOP_MENU_ITEMS.map((item) => {
                  const Icon = item.icon || Sparkles;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={onClose}
                      className="p-4 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-[#13b59b] group-hover:text-white transition flex items-center justify-center">
                            <Icon size={16} />
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#13b59b] border border-emerald-200">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#13b59b] transition">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-[#13b59b]">
                        <span>Browse Collection</span>
                        <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Shop Spotlight Card */}
              <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-[#2dd4bf] border border-emerald-500/30">
                    Quality Promise
                  </span>
                  <h4 className="text-base font-black mt-3 leading-snug">
                    Certified Refurbished Guarantee
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Every gadget undergoes 32 hardware checks, battery performance audits, and arrives with 6-12 months replacement warranty.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-[#2dd4bf]" />
                    <span>Free Doorstep Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-[#2dd4bf]" />
                    <span>7 Days Return Policy</span>
                  </div>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="inline-flex items-center justify-center w-full mt-3 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold transition shadow"
                  >
                    View All Refurbished Tech
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. CATEGORIES MULTI-COLUMN MEGA MENU (4 Columns)         */}
          {/* ======================================================== */}
          {activeMenu === 'categories' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CATEGORIES_MEGA_MENU.columns.map((col) => {
                const Icon = col.icon;
                return (
                  <div key={col.title} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <div className="p-1.5 rounded-lg bg-teal-50 text-[#13b59b]">
                        <Icon size={16} />
                      </div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        {col.title}
                      </h4>
                    </div>

                    <ul className="space-y-1.5">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="flex items-center justify-between p-2 rounded-xl text-xs text-slate-700 hover:text-[#13b59b] hover:bg-slate-50 transition group"
                          >
                            <span className="font-semibold">{link.label}</span>
                            {link.badge && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-teal-50 text-[#13b59b]">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {/* Column 4: Featured Promo Banner */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white">
                    {CATEGORIES_MEGA_MENU.featured.tag}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 mt-2.5">
                    {CATEGORIES_MEGA_MENU.featured.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {CATEGORIES_MEGA_MENU.featured.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <Link
                    href={CATEGORIES_MEGA_MENU.featured.ctaHref}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#13b59b] hover:text-[#0fa088] group"
                  >
                    <span>{CATEGORIES_MEGA_MENU.featured.ctaText}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. BRANDS MEGA MENU                                      */}
          {/* ======================================================== */}
          {activeMenu === 'brands' && (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Shop by Smartphone &amp; Gadget Brands
                  </h3>
                  <p className="text-xs text-slate-500">
                    Genuine certified refurbished stock from tier-1 original equipment manufacturers.
                  </p>
                </div>
                <Link
                  href="/shop/brands"
                  onClick={onClose}
                  className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1"
                >
                  View All Brands <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                {BRAND_ITEMS.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={brand.href}
                    onClick={onClose}
                    className="p-3.5 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition group flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-800 text-sm mb-2 group-hover:scale-105 transition-transform border border-slate-200/60">
                      {brand.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-[#13b59b] transition">
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {brand.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. SELL OLD MOBILE MEGA MENU                             */}
          {/* ======================================================== */}
          {activeMenu === 'sell-old-mobile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Smartphone size={18} className="text-[#13b59b]" />
                      Sell Smartphone by Brand
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select your mobile brand to get an instant AI valuation and free doorstep pickup.
                    </p>
                  </div>
                  <Link
                    href="/sell-old-mobile-phone"
                    onClick={onClose}
                    className="text-xs font-bold text-[#13b59b] hover:underline"
                  >
                    All Mobile Brands →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SELL_OLD_MOBILE_MENU.brands.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition flex items-center justify-between group"
                    >
                      <span className="font-bold text-xs text-slate-800 group-hover:text-[#13b59b] transition">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        Up to {item.max}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Promotional Panel */}
              <div className="bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 text-teal-300 border border-white/20">
                    Highest Buyback Value
                  </span>
                  <h4 className="text-lg font-black mt-3 leading-snug">
                    {SELL_OLD_MOBILE_MENU.promo.heading}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {SELL_OLD_MOBILE_MENU.promo.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-[#2dd4bf]" />
                    <span>Instant Doorstep UPI / Cash Transfer</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-[#2dd4bf]" />
                    <span>Free Home Pickup in 24 Hours</span>
                  </div>
                  <Link
                    href={SELL_OLD_MOBILE_MENU.promo.href}
                    onClick={onClose}
                    className="inline-flex items-center justify-center w-full mt-3 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold transition shadow cursor-pointer"
                  >
                    {SELL_OLD_MOBILE_MENU.promo.cta}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. NEW ARRIVALS DROPDOWN                                 */}
          {/* ======================================================== */}
          {activeMenu === 'new-arrivals' && (
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#13b59b]" />
                  Freshly Certified Gadgets
                </h3>
                <p className="text-xs text-slate-500">
                  New inventory added and certified by our Bettiah diagnostics lab this week.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {NEW_ARRIVALS_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="p-4 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition group"
                  >
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#13b59b] transition">
                      {item.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 6. BEST DEALS DROPDOWN                                   */}
          {/* ======================================================== */}
          {activeMenu === 'best-deals' && (
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Flame size={18} className="text-rose-500" />
                    Supersale &amp; Limited-Time Price Drops
                  </h3>
                  <p className="text-xs text-slate-500">
                    Exclusive discounts on open-box and refurbished electronics.
                  </p>
                </div>
                <Link
                  href="/supersale"
                  onClick={onClose}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  View All Deals →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BEST_DEALS_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="p-4 rounded-xl border border-slate-100 hover:border-rose-200 hover:bg-rose-50/30 transition flex items-start justify-between group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition">
                        {item.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {item.desc}
                      </p>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-50 text-rose-600 border border-rose-200 shrink-0 ml-2">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
