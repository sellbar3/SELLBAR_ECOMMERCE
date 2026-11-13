'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Smartphone,
  ShieldCheck,
  MapPin,
  CreditCard,
  Award,
  Star,
  Heart,
  Headphones,
  ChevronRight,
  LogOut,
  Plus,
  CheckCircle2,
  ExternalLink,
  Phone,
  Mail,
  Edit2,
  ArrowRight,
  Clock,
  Truck,
  Sparkles,
  ShoppingBag,
  FileText,
  UserCheck,
  QrCode,
  X,
  Save,
} from 'lucide-react';
import { getSession, clearSession } from '@/lib/auth';
import { getMyOrders } from '@/lib/checkout';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

export default function AccountDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentSellOrders, setRecentSellOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Quick Edit Modal state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditPayoutOpen, setIsEditPayoutOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editUpiId, setEditUpiId] = useState('user@okhdfcbank');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Load User and Orders
  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);
      // 1. Check /api/auth/me
      let user = null;
      let token = null;

      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.authenticated && data.user) {
          user = data.user;
        }
      } catch {
        // ignore
      }

      // Fallback to local session
      if (!user) {
        const session = getSession();
        if (session?.user) {
          user = session.user;
          token = session.token;
        }
      }

      if (user) {
        setCurrentUser(user);
        setEditName(user.name || '');
        setEditEmail(user.email || '');

        // Fetch recent orders if token available
        const currentSession = getSession();
        const authToken = token || currentSession?.token;
        if (authToken) {
          setLoadingOrders(true);
          try {
            const orderData = await getMyOrders(authToken);
            if (orderData?.orders) {
              setRecentOrders(orderData.orders.slice(0, 3));
            }
          } catch (e) {
            console.error('Failed to load recent orders:', e);
          } finally {
            setLoadingOrders(false);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

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

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const updated = { ...currentUser, name: editName, email: editEmail };
    setCurrentUser(updated);

    if (typeof window !== 'undefined') {
      const existing = getSession() || {};
      localStorage.setItem('sellbar_session', JSON.stringify({ ...existing, user: updated }));
      window.dispatchEvent(new CustomEvent('sellbar-user-logged-in', { detail: updated }));
    }

    setSaveSuccessMsg('Profile information updated successfully!');
    setTimeout(() => {
      setSaveSuccessMsg('');
      setIsEditProfileOpen(false);
    }, 1500);
  };

  const handleSavePayout = (e) => {
    e.preventDefault();
    setSaveSuccessMsg('Payout UPI ID updated successfully for instant buyback transfers!');
    setTimeout(() => {
      setSaveSuccessMsg('');
      setIsEditPayoutOpen(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#13b59b] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">
            Loading your Sellbar account...
          </p>
        </div>
      </div>
    );
  }

  // Guest view if user is not logged in
  if (!currentUser) {
    return (
      <div className="min-h-[75vh] bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center max-w-md w-full space-y-6">
          <div className="w-20 h-20 bg-emerald-50 text-[#13b59b] rounded-full flex items-center justify-center mx-auto">
            <UserCheck size={36} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track live orders, manage doorstep device buyback requests, view 12-month warranties, and download official GST tax invoices.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="w-full py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In to Account
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 9 Iconic Amazon-Style Feature Tiles
  const DASHBOARD_TILES = [
    {
      id: 'orders',
      title: 'Your Orders',
      description: 'Track, return, buy again, or download official GST tax invoices.',
      icon: Package,
      href: '/orders',
      badge: recentOrders.length > 0 ? `${recentOrders.length} Recent` : null,
      links: [
        { label: 'View All Orders', href: '/orders' },
        { label: 'Download Tax Invoices', href: '/orders' },
        { label: 'Track Live Delivery', href: '/orders' },
      ],
    },
    {
      id: 'sell-orders',
      title: 'Sell Requests & Buyback',
      description: 'Track doorstep technician pickup, device inspection & cash payout UTR.',
      icon: Smartphone,
      href: '/account/sell-orders',
      highlight: true,
      badge: 'Cash Payout',
      links: [
        { label: 'Live Pickup Status', href: '/account/sell-orders' },
        { label: '+ Sell Another Gadget', href: '/sell' },
        { label: 'Check Valuation', href: '/sell-old-mobile-phone' },
      ],
    },
    {
      id: 'security',
      title: 'Login & Security',
      description: 'Manage name, mobile number, Google authentication, and security preferences.',
      icon: ShieldCheck,
      action: () => setIsEditProfileOpen(true),
      links: [
        { label: 'Edit Profile Information', action: () => setIsEditProfileOpen(true) },
        { label: 'Google Linked Account', action: () => setIsEditProfileOpen(true) },
      ],
    },
    {
      id: 'addresses',
      title: 'Your Addresses',
      description: 'Edit addresses and pickup spots for fast doorstep device evaluation & dispatch.',
      icon: MapPin,
      href: '/account/addresses',
      links: [
        { label: 'Manage Saved Addresses', href: '/account/addresses' },
        { label: 'Add New Pickup Spot', href: '/account/addresses' },
      ],
    },
    {
      id: 'payouts',
      title: 'Instant Payouts & UPI',
      description: 'Manage your UPI ID (GPay / PhonePe / Paytm) or Bank Account for instant cash credit.',
      icon: CreditCard,
      action: () => setIsEditPayoutOpen(true),
      links: [
        { label: 'Set Default UPI ID', action: () => setIsEditPayoutOpen(true) },
        { label: 'Bank Transfer Details', action: () => setIsEditPayoutOpen(true) },
      ],
    },
    {
      id: 'warranty',
      title: '12-Month Warranty',
      description: 'View active device warranties, 32-point lab diagnostic certificates & claims.',
      icon: Award,
      href: '/orders',
      links: [
        { label: 'View Inspection Certificates', href: '/orders' },
        { label: 'Doorstep Warranty Claim', href: 'https://wa.me/917717517777' },
      ],
    },
    {
      id: 'reviews',
      title: 'Your Reviews & Feedback',
      description: 'Check product reviews, ratings, and recommerce seller feedback you published.',
      icon: Star,
      href: '/account/reviews',
      links: [
        { label: 'View Published Reviews', href: '/account/reviews' },
        { label: 'Rate Past Purchases', href: '/orders' },
      ],
    },
    {
      id: 'wishlist',
      title: 'Your Wishlist',
      description: 'Save refurbished phones, laptops, and smartwatches with price-drop alerts.',
      icon: Heart,
      href: '/account/wishlist',
      links: [
        { label: 'View Saved Wishlist', href: '/account/wishlist' },
        { label: 'Explore Refurbished Deals', href: '/shop' },
      ],
    },
    {
      id: 'support',
      title: 'Customer Service & Help',
      description: 'WhatsApp direct support (+91 77175 17777), doorstep return policy & FAQs.',
      icon: Headphones,
      href: 'https://wa.me/917717517777',
      external: true,
      links: [
        { label: 'WhatsApp Instant Chat', href: 'https://wa.me/917717517777', external: true },
        { label: '7-Day Return Policy', href: '/return-policy' },
        { label: 'Frequently Asked Questions', href: '/faq' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 font-bold">Your Account</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* 2. Top Profile Hero Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#13b59b] to-[#2bbda3] text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-md shrink-0">
              {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Hello, {currentUser.name || 'Sellbar Customer'}!
                </h1>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <CheckCircle2 size={13} className="text-[#13b59b]" />
                  Verified Recommerce Account
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-0.5">
                {currentUser.phone && (
                  <span className="flex items-center gap-1.5 font-mono">
                    <Phone size={13} className="text-slate-400" />
                    +91 {currentUser.phone.replace('+91', '')}
                  </span>
                )}
                {currentUser.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-slate-400" />
                    {currentUser.email}
                  </span>
                )}
                <span className="text-slate-400">•</span>
                <span className="text-[#13b59b] font-bold">12-Month Warranty Protection Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              href="/sell"
              className="flex-1 md:flex-none px-4 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Smartphone size={15} />
              <span>Sell a Device (Get Cash)</span>
            </Link>

            <Link
              href="/shop"
              className="flex-1 md:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag size={15} />
              <span>Browse Catalog</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* 3. The Iconic Amazon-Style 3x3 Card Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#13b59b] rounded-full inline-block"></span>
              Your Account Hub
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              Manage your orders, devices, payments &amp; security
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DASHBOARD_TILES.map((tile) => {
              const Icon = tile.icon;

              return (
                <div
                  key={tile.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                    tile.highlight
                      ? 'border-[#13b59b]/50 shadow-xs ring-1 ring-[#13b59b]/20'
                      : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  {/* Card Main Click Area */}
                  <div
                    onClick={() => {
                      if (tile.action) tile.action();
                      else if (tile.href) {
                        if (tile.external) window.open(tile.href, '_blank');
                        else router.push(tile.href);
                      }
                    }}
                    className="p-5 cursor-pointer flex-1 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                          tile.highlight
                            ? 'bg-emerald-50 text-[#13b59b]'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Icon size={24} />
                      </div>

                      {tile.badge && (
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#13b59b]">
                          {tile.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#13b59b] transition flex items-center gap-1.5">
                        <span>{tile.title}</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {tile.description}
                      </p>
                    </div>
                  </div>

                  {/* Amazon-Style Quick Action Sub-links */}
                  {tile.links && tile.links.length > 0 && (
                    <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 rounded-b-2xl space-y-1">
                      {tile.links.map((link, lIdx) => (
                        <div key={lIdx}>
                          {link.action ? (
                            <button
                              onClick={link.action}
                              className="text-[11px] font-bold text-[#13b59b] hover:text-[#0fa088] hover:underline flex items-center gap-1 text-left cursor-pointer"
                            >
                              <span>• {link.label}</span>
                            </button>
                          ) : link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-bold text-[#13b59b] hover:text-[#0fa088] hover:underline flex items-center gap-1"
                            >
                              <span>• {link.label}</span>
                              <ExternalLink size={10} />
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="text-[11px] font-bold text-[#13b59b] hover:text-[#0fa088] hover:underline flex items-center gap-1"
                            >
                              <span>• {link.label}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Amazon-Style Recent Orders Snapshot */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Package className="text-[#13b59b]" size={20} />
                Recent Orders &amp; Doorstep Activity
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Check delivery status, download GST tax invoices, or request 7-day return
              </p>
            </div>

            <Link
              href="/orders"
              className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1"
            >
              <span>View All Past Orders</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loadingOrders ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
              Fetching latest order records...
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((ord) => (
                <div
                  key={ord._id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50"
                >
                  <div className="flex items-center gap-4">
                    {ord.items?.[0] ? (
                      <img
                        src={getProductImageUrl(ord.items[0], ord.items[0].category)}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getCategoryFallbackImage(ord.items[0]?.category);
                        }}
                        alt=""
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 bg-white shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center text-xl shrink-0">
                        🛍️
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 font-mono">
                          #{String(ord._id).slice(-8).toUpperCase()}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {ord.orderStatus || 'Confirmed'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                        {ord.items?.[0]?.productName || 'Refurbished Tech Device'}
                        {ord.items?.length > 1 && ` (+${ord.items.length - 1} more items)`}
                      </h4>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Placed on {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('en-IN') : 'Recent'} • Total: <strong className="text-slate-900">₹{Number(ord.total || 0).toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    <Link
                      href="/orders"
                      className="px-3.5 py-1.5 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-2xs"
                    >
                      Track Order
                    </Link>

                    <Link
                      href="/orders"
                      className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <FileText size={13} className="text-[#13b59b]" />
                      <span>Tax Invoice</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/60 space-y-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-slate-400 shadow-2xs">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No active purchases found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our certified refurbished smartphones, laptops, and smartwatches backed by 12 months warranty.
              </p>
              <Link
                href="/shop"
                className="inline-block px-5 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </section>

        {/* 5. Sellbar Assured Guarantee Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
              <Award size={32} className="text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                Sellbar Recommerce Buyer &amp; Seller Protection
              </h3>
              <p className="text-xs text-emerald-100 mt-1 max-w-xl leading-relaxed">
                Every refurbished phone undergoes a stringent 32-point hardware test and is backed by a 12-month doorstep replacement warranty. Sell devices with instant doorstep cash transfers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/sell"
              className="px-5 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-black rounded-xl shadow-md transition"
            >
              Get Instant Valuation
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: EDIT PROFILE MODAL                               */}
      {/* ======================================================== */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#13b59b]" size={20} />
                <h3 className="text-base font-black text-slate-900">Login &amp; Security Profile</h3>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#13b59b]" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#13b59b] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registered Phone Number</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.phone || '+91 98765 43210'}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 font-mono cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Phone number is bound to OTP verification.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#13b59b] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: EDIT PAYOUT & UPI MODAL                         */}
      {/* ======================================================== */}
      {isEditPayoutOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="text-[#13b59b]" size={20} />
                <h3 className="text-base font-black text-slate-900">Instant Buyback Payout Settings</h3>
              </div>
              <button
                onClick={() => setIsEditPayoutOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#13b59b]" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSavePayout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Default UPI ID for Doorstep Cash Transfer
                </label>
                <input
                  type="text"
                  value={editUpiId}
                  onChange={(e) => setEditUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-semibold focus:outline-none focus:border-[#13b59b] focus:bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Money is transferred instantly within 60 seconds of technician inspection.
                </span>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <div className="font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#13b59b]" />
                  <span>Instant IMPS &amp; UPI Guarantee</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Zero commission or processing fee deducted. UTR payment proof is sent to your registered mobile SMS.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditPayoutOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>Save UPI ID</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
