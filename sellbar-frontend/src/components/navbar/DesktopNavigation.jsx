'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  Smartphone, 
  Sparkles, 
  Flame, 
  Tag 
} from 'lucide-react';
import MegaMenu from './MegaMenu';

export default function DesktopNavigation({
  activeMenu,
  onMenuEnter,
  onMenuLeave,
  onMenuToggle,
  onClose,
}) {
  const pathname = usePathname() || '/';

  const NAV_LINKS = [
    { id: 'home', label: 'Home', href: '/', isMega: false },
    { id: 'shop', label: 'Shop', href: '/shop', isMega: true },
    { id: 'categories', label: 'Categories', href: '/shop/categories', isMega: true },
    { id: 'brands', label: 'Brands', href: '/shop/brands', isMega: true },
    {
      id: 'sell-old-mobile',
      label: 'Sell Old Mobile',
      href: '/sell-old-mobile-phone',
      isMega: true,
      highlight: true,
    },
    { id: 'new-arrivals', label: 'New Arrivals', href: '/shop?filter=new-arrivals', isMega: true },
    { id: 'best-deals', label: 'Best Deals', href: '/supersale', isMega: true },
    { id: 'contact', label: 'Contact Us', href: '/contact', isMega: false },
  ];

  return (
    <div className="relative bg-white border-t border-slate-100 hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav 
          className="flex items-center justify-between h-11 text-xs font-bold"
          aria-label="Main Navigation"
        >
          <div className="flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const isMenuOpen = activeMenu === link.id;

              if (link.isMega) {
                return (
                  <div
                    key={link.id}
                    className="relative py-2"
                    onMouseEnter={() => onMenuEnter(link.id)}
                    onMouseLeave={onMenuLeave}
                  >
                    <button
                      type="button"
                      onClick={() => onMenuToggle(link.id)}
                      aria-expanded={isMenuOpen}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
                        link.highlight
                          ? 'bg-emerald-50 text-[#13b59b] border border-emerald-200/80 shadow-xs hover:bg-[#13b59b] hover:text-white'
                          : isMenuOpen || isActive
                          ? 'text-[#13b59b] bg-slate-50'
                          : 'text-slate-700 hover:text-[#13b59b] hover:bg-slate-50'
                      }`}
                    >
                      {link.highlight && <Smartphone size={13} className="shrink-0" />}
                      <span>{link.label}</span>
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 opacity-60 ${
                          isMenuOpen ? 'rotate-180 opacity-100' : ''
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`inline-flex items-center px-3 py-1.5 rounded-xl transition ${
                    isActive
                      ? 'text-[#13b59b] bg-slate-50 font-black'
                      : 'text-slate-700 hover:text-[#13b59b] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Utility Tag in Nav Bar */}
          <div className="hidden xl:flex items-center gap-2 text-slate-500 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Doorstep Pickup Active in West Champaran</span>
          </div>
        </nav>
      </div>

      {/* Render Active Mega Menu Dropdown */}
      <MegaMenu activeMenu={activeMenu} onClose={onClose} />
    </div>
  );
}
