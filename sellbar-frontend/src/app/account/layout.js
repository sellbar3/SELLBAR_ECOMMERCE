'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Smartphone,
  MapPin,
  CreditCard,
  Award,
  Star,
  Heart,
  User,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  RotateCcw,
  RefreshCw,
  ShoppingBag,
  Bell,
  CheckCircle2,
  FileText,
  Truck,
  Calculator,
} from 'lucide-react';
import { getSession, clearSession } from '@/lib/auth';

export default function AccountLayout({ children }) {
  const pathname = usePathname() || '';
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Load User on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          return;
        }
      } catch {
        // ignore
      }

      const session = getSession();
      if (session?.user) {
        setCurrentUser(session.user);
      }
    }
    loadUser();
  }, []);

  // Close sidebar on path change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    clearSession();
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('sellbar-cart-updated'));
    }
    router.push('/');
    router.refresh();
  };

  // Nav Groups & Subpages (Account-only, no public pages)
  const navSections = [
    {
      group: 'MAIN',
      items: [
        {
          label: 'Dashboard Overview',
          href: '/account',
          icon: LayoutDashboard,
          exact: true,
        },
      ],
    },
    {
      group: 'ORDERS & PURCHASES',
      items: [
        {
          label: 'My Orders',
          href: '/account/orders',
          icon: Package,
          subpages: [
            { label: 'All Orders', href: '/account/orders' },
            { label: 'Order Tracking', href: '/account/orders' },
            { label: 'GST Tax Invoices', href: '/account/orders' },
          ],
        },
        {
          label: 'Saved Wishlist',
          href: '/account/wishlist',
          icon: Heart,
        },
        {
          label: 'My Reviews',
          href: '/account/reviews',
          icon: Star,
        },
      ],
    },
    {
      group: 'SELL & BUYBACK',
      items: [
        {
          label: 'Sell Orders & Pickups',
          href: '/account/sell-orders',
          icon: Smartphone,
          badge: 'Cash Payout',
          subpages: [
            { label: 'Active Pickup Requests', href: '/account/sell-orders' },
            { label: 'Payout UTR Proofs', href: '/account/sell-orders' },
          ],
        },
      ],
    },
    {
      group: 'SETTINGS & PREFERENCES',
      items: [
        {
          label: 'Personal Profile',
          href: '/account/profile',
          icon: User,
        },
        {
          label: 'Saved Addresses',
          href: '/account/addresses',
          icon: MapPin,
        },
        {
          label: 'Bank & UPI Payouts',
          href: '/account/payouts',
          icon: CreditCard,
        },
        {
          label: 'Warranty Protection',
          href: '/account/warranty',
          icon: Award,
        },
      ],
    },
    {
      group: 'SUPPORT',
      items: [
        {
          label: 'Customer Support',
          href: 'https://wa.me/917717517777',
          icon: MessageCircle,
          external: true,
          badge: '+91 77175 17777',
        },
      ],
    },
  ];

  const getPageTitle = () => {
    if (pathname === '/account') return 'Customer Dashboard';
    if (pathname.startsWith('/account/orders')) return 'Your Orders & Invoices';
    if (pathname.startsWith('/account/sell-orders')) return 'Sell Orders & Pickup Tracking';
    if (pathname.startsWith('/account/addresses')) return 'Saved Addresses';
    if (pathname.startsWith('/account/profile')) return 'Personal Profile';
    if (pathname.startsWith('/account/payouts')) return 'Instant Payout Accounts';
    if (pathname.startsWith('/account/warranty')) return '12-Month Warranty Coverage';
    if (pathname.startsWith('/account/reviews')) return 'Your Reviews & Ratings';
    if (pathname.startsWith('/account/wishlist')) return 'Saved Wishlist';
    return 'Your Account';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row text-slate-800 antialiased font-sans">
      {/* ======================================================== */}
      {/* 1. SIDEBAR (Persistent Desktop & Drawer Mobile)           */}
      {/* ======================================================== */}
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header with Brand */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/account" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#13b59b] to-[#2bbda3] flex items-center justify-center text-white font-black text-lg shadow-sm">
              S
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-slate-900 leading-none">
                SELLBAR
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#13b59b] mt-0.5">
                Customer Account
              </div>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Profile Mini Snapshot */}
        <div className="p-4 mx-3 my-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#13b59b] to-[#2bbda3] text-white flex items-center justify-center font-black text-lg shadow-xs shrink-0">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-slate-900 truncate">
              {currentUser?.name || 'Sellbar Customer'}
            </div>
            <div className="text-[11px] text-slate-500 font-mono truncate">
              {currentUser?.phone || currentUser?.email || 'Logged In'}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-0.5">
              <CheckCircle2 size={11} className="text-[#13b59b]" />
              <span>Verified Account</span>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-5 text-xs">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                {sec.group}
              </div>

              {sec.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || (item.href !== '/account' && pathname.startsWith(item.href));

                return (
                  <div key={iIdx} className="space-y-1">
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl font-bold transition group ${
                        isActive
                          ? 'bg-[#13b59b] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          size={16}
                          className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-emerald-50 text-[#13b59b] border border-emerald-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Subpages links (if parent is active) */}
                    {item.subpages && isActive && (
                      <div className="ml-7 pl-2 border-l border-emerald-200 space-y-0.5 my-1">
                        {item.subpages.map((sub, subIdx) => (
                          <Link
                            key={subIdx}
                            href={sub.href}
                            className="block py-1 text-[11px] font-semibold text-slate-500 hover:text-[#13b59b] transition"
                          >
                            • {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer: Back to Store & Logout */}
        <div className="p-3 border-t border-slate-100 space-y-1.5 bg-slate-50/50">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
          >
            <ArrowLeft size={15} className="text-slate-400" />
            <span>Return to Storefront</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT VIEWPORT                                 */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top App Bar inside Account Portal */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 lg:hidden"
              aria-label="Open Sidebar"
            >
              <Menu size={20} />
            </button>

            {/* Current Page Title & Breadcrumbs */}
            <div>
              <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                {getPageTitle()}
              </div>
              <div className="text-[11px] text-slate-400 font-medium hidden sm:flex items-center gap-1.5">
                <Link href="/" className="hover:text-slate-600">
                  Sellbar
                </Link>
                <span>/</span>
                <Link href="/account" className="hover:text-slate-600">
                  Account Hub
                </Link>
                <span>/</span>
                <span className="text-[#13b59b] font-semibold">{getPageTitle()}</span>
              </div>
            </div>
          </div>

          {/* Top Bar Quick Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              <ArrowLeft size={13} className="text-slate-500" />
              <span>Back to Store</span>
            </Link>

            {/* User Avatar Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#13b59b] to-[#2bbda3] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 hidden md:inline transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
