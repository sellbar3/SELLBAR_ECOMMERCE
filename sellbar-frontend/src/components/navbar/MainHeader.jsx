'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  MapPin, 
  ChevronDown, 
  Heart, 
  ShoppingCart, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  Tag, 
  Smartphone, 
  Search,
  Package
} from 'lucide-react';
import SearchBar from './SearchBar';

export default function MainHeader({
  onOpenMobileMenu,
  onOpenLocationModal,
  selectedCity,
  currentUser,
  onOpenLogin,
  onLogout,
  cartCount,
  wishlistCount,
}) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 md:gap-6">
          {/* ======================================================== */}
          {/* LEFT: Mobile Menu Button & Brand Logo                     */}
          {/* ======================================================== */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Hamburger Button (Mobile / Tablet) */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#13b59b] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0">
                <svg
                  className="w-5 h-5 text-white stroke-[2.8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#13b59b]">
                  SELLBAR
                </span>
                <span className="hidden sm:block text-[9px] font-black uppercase tracking-widest text-slate-400 -mt-1">
                  Recommerce
                </span>
              </div>
            </Link>
          </div>

          {/* ======================================================== */}
          {/* CENTER: Large Responsive Search Field (Desktop)          */}
          {/* ======================================================== */}
          <div className="hidden md:flex flex-1 max-w-2xl px-2">
            <SearchBar />
          </div>

          {/* ======================================================== */}
          {/* RIGHT: Location Selector, Wishlist, Cart & Account       */}
          {/* ======================================================== */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle search field"
            >
              <Search size={20} />
            </button>

            {/* Location Selector (Desktop/Tablet) */}
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-800 hover:text-[#13b59b] hover:bg-slate-50 transition cursor-pointer border border-transparent hover:border-slate-200"
              title="Change Delivery Location"
            >
              <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#13b59b]" />
              </div>
              <span className="text-xs font-bold tracking-tight truncate max-w-[100px] lg:max-w-none" suppressHydrationWarning>
                {selectedCity}
              </span>
              <ChevronDown size={13} className="text-slate-400" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl text-slate-700 hover:text-[#13b59b] hover:bg-slate-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Wishlist (${wishlistCount} items)`}
              title="My Wishlist"
            >
              <Heart size={20} className="stroke-[2.2]" />
              {wishlistCount > 0 && (
                <span 
                  className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs"
                  suppressHydrationWarning
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-slate-700 hover:text-[#13b59b] hover:bg-slate-100 transition min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Shopping Cart (${cartCount} items)`}
              title="Shopping Cart"
            >
              <ShoppingCart size={20} className="stroke-[2.2]" />
              {cartCount > 0 && (
                <span 
                  className="absolute top-1.5 right-1.5 bg-[#13b59b] text-white text-[10px] font-black rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs"
                  suppressHydrationWarning
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Profile Menu */}
            {currentUser ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition text-slate-800 text-xs font-bold cursor-pointer"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#13b59b] text-white flex items-center justify-center text-xs font-black shadow-xs">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline font-bold truncate max-w-[90px]">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}
                  </span>
                  <ChevronDown size={13} className="text-slate-400 hidden sm:inline" />
                </button>

                {/* Account Popover Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2 text-xs font-semibold animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <div className="font-black text-slate-900 truncate">
                        {currentUser.name || 'Valued Customer'}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {currentUser.email || currentUser.phone}
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                      >
                        <UserIcon size={14} className="text-[#13b59b]" />
                        <span>My Profile &amp; Details</span>
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                      >
                        <Package size={14} className="text-blue-500" />
                        <span>Order History</span>
                      </Link>
                      <Link
                        href="/account/sell-orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                      >
                        <Smartphone size={14} className="text-[#13b59b]" />
                        <span>Sell Phone Requests</span>
                      </Link>
                      <Link
                        href="/account/addresses"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                      >
                        <MapPin size={14} className="text-amber-500" />
                        <span>Saved Addresses</span>
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-slate-700"
                      >
                        <Heart size={14} className="text-rose-500" />
                        <span>My Wishlist</span>
                      </Link>

                      {currentUser.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-teal-50 text-[#13b59b] font-bold border-t border-slate-100 mt-1"
                        >
                          <ShieldCheck size={14} />
                          <span>Admin Portal</span>
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenLogin}
                className="px-4 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer min-h-[40px] flex items-center justify-center"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Dropdown Row (When toggled on small screens) */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-3 pt-1 animate-in fade-in duration-150">
            <SearchBar onSearchSubmit={() => setMobileSearchOpen(false)} isMobile={true} />
          </div>
        )}
      </div>
    </div>
  );
}
