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
  ChevronRight,
  CheckCircle2,
  Clock,
  Truck,
  ShoppingBag,
  FileText,
  UserCheck,
  Edit2,
  ArrowRight,
  X,
  Save,
  Phone,
  Mail,
  Check,
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { getMyOrders } from '@/lib/checkout';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

export default function AccountOverviewPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Edit Profile Modal
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Load User & Orders
  const loadUserData = useCallback(async () => {
    try {
      setLoading(true);
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

        const currentSession = getSession();
        const authToken = token || currentSession?.token;
        if (authToken) {
          setLoadingOrders(true);
          try {
            const orderData = await getMyOrders(authToken);
            if (orderData?.orders) {
              setRecentOrders(orderData.orders);
            }
          } catch (e) {
            console.error('Failed to load orders:', e);
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

    setProfileSuccessMsg('Profile updated successfully!');
    setTimeout(() => {
      setProfileSuccessMsg('');
      setIsEditProfileOpen(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-3 border-[#13b59b] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-semibold tracking-wide">
          Loading dashboard overview...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 bg-emerald-50 text-[#13b59b] rounded-full flex items-center justify-center mx-auto">
          <UserCheck size={32} />
        </div>
        <h2 className="text-xl font-black text-slate-900">Please Sign In</h2>
        <p className="text-xs text-slate-500">
          Sign in to view your orders, live tracking, doorstep sell requests, and warranty coverage.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl shadow-xs transition"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  // Find latest active order for live tracking display
  const activeOrder = recentOrders.find(
    (o) => o.orderStatus && !['delivered', 'cancelled'].includes(o.orderStatus.toLowerCase())
  ) || recentOrders[0] || null;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* 1. Clean Profile Greeting Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#13b59b] to-[#2bbda3] text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
            {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Welcome, {currentUser.name || 'Sellbar Customer'}!
              </h1>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <CheckCircle2 size={12} className="text-[#13b59b]" />
                Verified Account
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              {currentUser.phone && (
                <span className="flex items-center gap-1 font-mono">
                  <Phone size={12} className="text-slate-400" />
                  +91 {currentUser.phone.replace('+91', '')}
                </span>
              )}
              {currentUser.email && (
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-slate-400" />
                  {currentUser.email}
                </span>
              )}
              <span className="text-slate-400">•</span>
              <span className="text-[#13b59b] font-bold">12-Month Doorstep Warranty Protected</span>
            </div>
          </div>
        </div>

        <Link
          href="/account/profile"
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          <Edit2 size={13} />
          <span>Edit Profile &amp; Settings</span>
        </Link>
      </div>

      {/* 2. Key Account Summary Metric Cards (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Purchases */}
        <Link
          href="/account/orders"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#13b59b]/50 hover:shadow-xs transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Purchases
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#13b59b] flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 group-hover:text-[#13b59b] transition">
            {recentOrders.length}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1 flex items-center justify-between">
            <span>Orders Placed</span>
            <ChevronRight size={14} className="text-slate-400" />
          </div>
        </Link>

        {/* Card 2: Sell Orders */}
        <Link
          href="/account/sell-orders"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#13b59b]/50 hover:shadow-xs transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Buyback / Sell
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Smartphone size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 group-hover:text-[#13b59b] transition">
            Doorstep
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1 flex items-center justify-between">
            <span>Instant Cash Payout</span>
            <ChevronRight size={14} className="text-slate-400" />
          </div>
        </Link>

        {/* Card 3: Warranty */}
        <Link
          href="/account/warranty"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#13b59b]/50 hover:shadow-xs transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Warranty
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 group-hover:text-[#13b59b] transition">
            12 Months
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1 flex items-center justify-between">
            <span>Doorstep Protection</span>
            <ChevronRight size={14} className="text-slate-400" />
          </div>
        </Link>

        {/* Card 4: Payouts */}
        <Link
          href="/account/payouts"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-[#13b59b]/50 hover:shadow-xs transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
              Payout Method
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 group-hover:text-[#13b59b] transition">
            UPI / IMPS
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1 flex items-center justify-between">
            <span>Direct Bank Transfer</span>
            <ChevronRight size={14} className="text-slate-400" />
          </div>
        </Link>
      </div>

      {/* 3. Live Active Order Spotlight (If order exists) */}
      {activeOrder && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Truck className="text-[#13b59b]" size={20} />
              <h2 className="text-base font-black text-slate-900">
                Latest Order Activity &amp; Live Tracking
              </h2>
            </div>
            <Link
              href="/account/orders"
              className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-4">
              {activeOrder.items?.[0] ? (
                <img
                  src={getProductImageUrl(activeOrder.items[0], activeOrder.items[0].category)}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getCategoryFallbackImage(activeOrder.items[0]?.category);
                  }}
                  alt=""
                  className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white shrink-0 shadow-2xs"
                />
              ) : (
                <div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  🛍️
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 font-mono">
                    #{String(activeOrder._id).slice(-8).toUpperCase()}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {activeOrder.orderStatus || 'Confirmed'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1 line-clamp-1">
                  {activeOrder.items?.[0]?.productName || 'Refurbished Device'}
                  {activeOrder.items?.length > 1 && ` (+${activeOrder.items.length - 1} more)`}
                </h3>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Ordered on {activeOrder.createdAt ? new Date(activeOrder.createdAt).toLocaleDateString('en-IN') : 'Recent'} • Total Amount: <strong className="text-slate-900 font-mono">₹{Number(activeOrder.total || 0).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <Link
                href="/account/orders"
                className="px-4 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-2xs"
              >
                Track Package
              </Link>
              <Link
                href="/account/orders"
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
              >
                <FileText size={13} className="text-[#13b59b]" />
                <span>Tax Invoice</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Quick Profile & Address Snapshot (2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Column 1: Default Address */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="text-[#13b59b]" size={18} />
                <h3 className="text-sm font-black text-slate-900">Default Delivery Address</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#13b59b]">
                Active
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900">{currentUser.name || 'Sellbar Customer'}</div>
              <p>House #14, Near Supriya Cinema Road, Lal Bazar</p>
              <p>Bettiah, West Champaran, Bihar - 845438</p>
              <p className="text-[11px] text-slate-400 font-mono pt-1">
                Mobile: {currentUser.phone || '+91 98765 43210'}
              </p>
            </div>
          </div>

          <Link
            href="/account/addresses"
            className="text-xs font-bold text-[#13b59b] hover:text-[#0fa088] hover:underline flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Manage Saved Addresses</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Column 2: Payout UPI Account */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="text-[#13b59b]" size={18} />
                <h3 className="text-sm font-black text-slate-900">Instant Buyback Payout</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                Direct IMPS / UPI
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400">Linked UPI ID</div>
              <div className="text-sm font-mono font-bold text-slate-800">
                {currentUser.phone ? `${currentUser.phone.replace('+91', '')}@paytm` : 'user@okhdfcbank'}
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold pt-1 flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#13b59b]" />
                <span>Ready for instant doorstep cash credit</span>
              </div>
            </div>
          </div>

          <Link
            href="/account/payouts"
            className="text-xs font-bold text-[#13b59b] hover:text-[#0fa088] hover:underline flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Manage Payout UPI &amp; Bank Details</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* 5. Sellbar Protection Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 shrink-0 border border-white/20">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black">
              Sellbar Recommerce Protection &amp; Guarantee
            </h4>
            <p className="text-xs text-emerald-100 mt-0.5">
              12 Months Doorstep Warranty • 7 Days Replacement • Instant Bank Payouts
            </p>
          </div>
        </div>

        <Link
          href="/account/warranty"
          className="px-4 py-2 bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-black rounded-xl transition shadow-2xs shrink-0"
        >
          Warranty Details
        </Link>
      </div>

      {/* ======================================================== */}
      {/* EDIT PROFILE MODAL                                       */}
      {/* ======================================================== */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-[#13b59b]" size={20} />
                <h3 className="text-base font-black text-slate-900">Edit Profile</h3>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {profileSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#13b59b]" />
                <span>{profileSuccessMsg}</span>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Registered Phone</label>
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
    </div>
  );
}
