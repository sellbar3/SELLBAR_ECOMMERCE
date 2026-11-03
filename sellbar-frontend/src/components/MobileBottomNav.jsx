'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Smartphone,
  Sparkles,
  ShoppingCart,
  User,
} from 'lucide-react';
import { getLocalCart } from '@/lib/cart';

export default function MobileBottomNav() {
  const pathname = usePathname() || '';
  const [cartCount, setCartCount] = useState(0);

  // Sync cart count
  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = getLocalCart();
        const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    updateCount();
    window.addEventListener('cart-updated', updateCount);
    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('cart-updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  // Do not show on portal pages (admin/vendor)
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor') || pathname.startsWith('/panel-login')) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Sell Device',
      href: '/sell-old-mobile-phone',
      icon: Smartphone,
      isActive: pathname.startsWith('/sell'),
      badge: 'Cash',
    },
    {
      label: 'Refurbished',
      href: '/buy-refurbished',
      icon: Sparkles,
      isActive: pathname.startsWith('/buy-refurbished') || pathname.startsWith('/shop') || pathname.startsWith('/product'),
    },
    {
      label: 'Cart',
      href: '/cart',
      icon: ShoppingCart,
      isActive: pathname === '/cart',
      count: cartCount,
    },
    {
      label: 'Account',
      href: '/account',
      icon: User,
      isActive: pathname.startsWith('/account') || pathname.startsWith('/orders') || pathname === '/login' || pathname === '/register',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around safe-area-pb"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = item.isActive;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
              active
                ? 'text-[#13b59b] font-bold scale-105'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            <div className="relative">
              <Icon size={20} className={active ? 'stroke-[2.4]' : 'stroke-[1.8]'} />

              {/* Cart Counter Badge */}
              {item.count > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#13b59b] text-white text-[9px] font-black rounded-full h-4 min-w-4 px-1 flex items-center justify-center border-2 border-white shadow-xs">
                  {item.count > 99 ? '99+' : item.count}
                </span>
              )}

              {/* Promo Badge (e.g. Cash) */}
              {item.badge && !active && (
                <span className="absolute -top-2 -right-3 bg-emerald-600 text-white text-[8px] font-black uppercase px-1 py-0.2 rounded-full scale-90">
                  {item.badge}
                </span>
              )}
            </div>

            <span className="text-[10px] mt-1 tracking-tight leading-none">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
