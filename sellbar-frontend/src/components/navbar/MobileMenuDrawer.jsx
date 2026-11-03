'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  ChevronDown, 
  MapPin, 
  User, 
  ShoppingCart, 
  Heart, 
  Smartphone, 
  Laptop, 
  Tag, 
  Sparkles, 
  Flame, 
  PhoneCall, 
  ShieldCheck, 
  Package, 
  LogOut,
  HelpCircle,
  Building2,
  Clock
} from 'lucide-react';
import SearchBar from './SearchBar';

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  currentUser,
  onOpenLogin,
  onLogout,
  selectedCity,
  onOpenLocationModal,
  cartCount,
  wishlistCount,
}) {
  const [openAccordion, setOpenAccordion] = useState(null);

  // Prevent background scrolling while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Support Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div 
        className="fixed inset-y-0 left-0 w-[88vw] max-w-[380px] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#13b59b] flex items-center justify-center text-white font-black text-sm">
              S
            </div>
            <span className="text-xl font-black text-[#13b59b] tracking-tight">
              SELLBAR
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close menu drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Account / Login Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          {currentUser ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#13b59b] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs truncate">
                    {currentUser.name || 'Customer Account'}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {currentUser.email || currentUser.phone}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
                <Link
                  href="/account"
                  onClick={onClose}
                  className="p-2 bg-white rounded-xl border border-slate-200 text-center text-slate-700 hover:border-[#13b59b]"
                >
                  My Account
                </Link>
                <Link
                  href="/orders"
                  onClick={onClose}
                  className="p-2 bg-white rounded-xl border border-slate-200 text-center text-slate-700 hover:border-[#13b59b]"
                >
                  Orders
                </Link>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="w-full py-2.5 px-4 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <User size={16} /> Sign In or Register
            </button>
          )}
        </div>

        {/* Location Selector Button */}
        <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLocationModal();
            }}
            className="flex items-center gap-1.5 hover:text-[#13b59b] transition min-h-[44px] cursor-pointer"
          >
            <MapPin size={16} className="text-[#13b59b]" />
            <span>Delivering to: <strong className="text-slate-900">{selectedCity}</strong></span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLocationModal();
            }}
            className="text-[11px] text-[#13b59b] font-bold"
          >
            Change
          </button>
        </div>

        {/* Search Field */}
        <div className="p-4 border-b border-slate-100">
          <SearchBar onSearchSubmit={onClose} isMobile={true} />
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs font-bold">
          {/* Direct Home Link */}
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-between p-3 rounded-xl text-slate-800 hover:bg-slate-50 min-h-[44px]"
          >
            <span>Home</span>
          </Link>

          {/* 1. Shop Accordion */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('shop')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 min-h-[44px] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Tag size={15} className="text-[#13b59b]" />
                Shop Catalog
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 text-slate-400 ${
                  openAccordion === 'shop' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openAccordion === 'shop' && (
              <div className="p-3 bg-white space-y-1 border-t border-slate-100">
                <Link href="/shop" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  All Products
                </Link>
                <Link href="/shop?filter=new-arrivals" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  New Arrivals
                </Link>
                <Link href="/shop?filter=best-sellers" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Best Sellers
                </Link>
                <Link href="/supersale" onClick={onClose} className="block p-2 rounded-lg text-rose-600 hover:bg-rose-50 min-h-[44px] flex items-center">
                  Best Deals &amp; Discounts
                </Link>
              </div>
            )}
          </div>

          {/* 2. Categories Accordion */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('categories')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 min-h-[44px] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Smartphone size={15} className="text-[#13b59b]" />
                Categories
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 text-slate-400 ${
                  openAccordion === 'categories' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openAccordion === 'categories' && (
              <div className="p-3 bg-white space-y-1 border-t border-slate-100">
                <Link href="/buy-refurbished-mobile-phones" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Mobiles &amp; Smartphones
                </Link>
                <Link href="/buy-refurbished-laptops" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Laptops
                </Link>
                <Link href="/buy-refurbished-tablets" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Tablets &amp; iPads
                </Link>
                <Link href="/buy-refurbished-smart-watches" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Smart Watches
                </Link>
                <Link href="/buy-accessories" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Accessories (Chargers, Cables, Covers)
                </Link>
              </div>
            )}
          </div>

          {/* 3. Brands Accordion */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('brands')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 text-slate-900 min-h-[44px] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#13b59b]" />
                Top Brands
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 text-slate-400 ${
                  openAccordion === 'brands' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openAccordion === 'brands' && (
              <div className="p-3 bg-white grid grid-cols-2 gap-2 border-t border-slate-100">
                {['Apple', 'Samsung', 'Vivo', 'Oppo', 'Xiaomi', 'OnePlus', 'Realme', 'Motorola'].map((b) => (
                  <Link
                    key={b}
                    href={`/shop/brands?brand=${b.toLowerCase()}`}
                    onClick={onClose}
                    className="p-2.5 rounded-xl border border-slate-100 text-slate-700 font-bold hover:bg-teal-50 text-center min-h-[44px] flex items-center justify-center"
                  >
                    {b}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 4. Sell Old Mobile Accordion (Highlighted) */}
          <div className="border border-emerald-200 rounded-2xl overflow-hidden bg-emerald-50/50">
            <button
              type="button"
              onClick={() => toggleAccordion('sell')}
              className="w-full flex items-center justify-between p-3.5 text-[#13b59b] font-black min-h-[44px] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Smartphone size={15} />
                Sell Old Mobile
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  openAccordion === 'sell' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openAccordion === 'sell' && (
              <div className="p-3 bg-white space-y-1 border-t border-emerald-100">
                <Link href="/sell-old-mobile-phone/apple" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Sell Apple iPhone
                </Link>
                <Link href="/sell-old-mobile-phone/samsung" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Sell Samsung Phone
                </Link>
                <Link href="/sell-old-mobile-phone/vivo" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Sell Vivo Phone
                </Link>
                <Link href="/sell-old-mobile-phone/oppo" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Sell Oppo Phone
                </Link>
                <Link href="/sell-old-mobile-phone/xiaomi" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Sell Xiaomi Phone
                </Link>
                <Link href="/sell-old-mobile-phone/oneplus" onClick={onClose} className="block p-2 rounded-lg text-slate-700 hover:bg-teal-50 min-h-[44px] flex items-center">
                  Sell OnePlus Phone
                </Link>
                <Link href="/sell-old-mobile-phone" onClick={onClose} className="block p-2 rounded-lg text-[#13b59b] font-black hover:underline min-h-[44px] flex items-center">
                  View All Brands →
                </Link>
              </div>
            )}
          </div>

          {/* Quick Support Links */}
          <div className="pt-4 border-t border-slate-100 space-y-1">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-2 p-2.5 rounded-xl text-slate-600 hover:text-[#13b59b] min-h-[44px]"
            >
              <PhoneCall size={16} /> Contact Us
            </Link>
            <Link
              href="/about-us"
              onClick={onClose}
              className="flex items-center gap-2 p-2.5 rounded-xl text-slate-600 hover:text-[#13b59b] min-h-[44px]"
            >
              <Building2 size={16} /> About Sellbar
            </Link>
            <Link
              href="/faq"
              onClick={onClose}
              className="flex items-center gap-2 p-2.5 rounded-xl text-slate-600 hover:text-[#13b59b] min-h-[44px]"
            >
              <HelpCircle size={16} /> Frequently Asked Questions
            </Link>
            <Link
              href="/track-order"
              onClick={onClose}
              className="flex items-center gap-2 p-2.5 rounded-xl text-slate-600 hover:text-[#13b59b] min-h-[44px]"
            >
              <Package size={16} /> Track Order
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center gap-1.5 font-bold text-slate-800"
          >
            <ShoppingCart size={16} className="text-[#13b59b]" />
            <span>Cart ({cartCount})</span>
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-1.5 font-bold text-slate-800"
          >
            <Heart size={16} className="text-rose-500" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
