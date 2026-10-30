'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Edit2,
  Plus,
  CheckCircle2,
  Clock,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { getSession, clearSession } from '@/lib/auth';
import { getCloudinaryUrl } from '@/lib/cloudinary';

export default function AccountPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'profile', 'addresses', 'wallet'
  
  // Profile Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileMsg, setProfileMsg] = useState({ ok: '', err: '' });

  // Saved Addresses demo state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      tag: 'Home',
      name: 'Aman Verma',
      phone: '9876543210',
      address: 'Flat 402, Tower B, Green Glen Heights, Sector 49',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      isDefault: true,
    },
    {
      id: 'addr-2',
      tag: 'Office',
      name: 'Aman Verma',
      phone: '9876543210',
      address: 'DLF Cyber City, Building 10, 4th Floor',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122002',
      isDefault: false,
    },
  ]);

  // Demo orders
  const orders = [
    {
      id: 'ORD-SB-89211',
      type: 'BUY',
      title: 'Apple iPhone 13 (128GB) - Starlight (Flawless)',
      amount: 38999,
      status: 'Delivered',
      date: '28 Oct 2026',
      warranty: '12 Months Warranty Active',
      image: getCloudinaryUrl('/cashify/guide-iphone13-mini.webp'),
    },
    {
      id: 'ORD-SB-74102',
      type: 'SELL',
      title: 'Sold: OnePlus 9 Pro 5G (8GB/128GB)',
      amount: 19500,
      status: 'Completed',
      date: '15 Oct 2026',
      paymentMethod: 'Instant UPI (@okhdfcbank)',
      image: getCloudinaryUrl('/cashify/phone-oneplus-12.jpg'),
    },
  ];

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.success && data.user) {
          setCurrentUser(data.user);
          setName(data.user.name || '');
          setEmail(data.user.email || '');
        } else {
          const session = getSession();
          if (session?.user) {
            setCurrentUser(session.user);
            setName(session.user.name || '');
            setEmail(session.user.email || '');
          }
        }
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

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
    setProfileMsg({ ok: 'Profile updated successfully!', err: '' });
    if (currentUser) {
      const updated = { ...currentUser, name, email };
      setCurrentUser(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sellbar_session', JSON.stringify({ token: 'demo', user: updated }));
        window.dispatchEvent(new CustomEvent('sellbar-user-logged-in', { detail: updated }));
      }
    }
    setTimeout(() => setProfileMsg({ ok: '', err: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#2bbda3] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-gray-500 font-medium">Loading account details...</p>
        </div>
      </div>
    );
  }

  // Guest view if not logged in
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center font-sans">
        <div className="w-16 h-16 bg-[#2bbda3]/10 text-[#2bbda3] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Sellbar Account</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Please log in to manage your orders, check device buyback valuations, and view warranty status.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="px-6 py-2.5 bg-[#2bbda3] hover:bg-[#23a58c] text-white font-bold text-sm rounded-xl transition shadow-xs"
          >
            Login to Account
          </Link>
          <Link
            href="/"
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* 1. Header Profile Banner */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#2bbda3] to-[#40d4ba] text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-md shrink-0">
            {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {currentUser.name || 'Sellbar Customer'}
              </h1>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {currentUser.phone || '+91 98765 43210'}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                {currentUser.email || `${currentUser.phone || 'user'}@sellbar.in`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sell"
            className="px-4 py-2 bg-[#2bbda3]/10 hover:bg-[#2bbda3]/20 text-[#2bbda3] font-bold text-xs rounded-xl transition"
          >
            + Sell Another Device
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs rounded-xl transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* 2. Main Content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-3 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#2bbda3] text-white shadow-xs'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Orders & Buyback Requests</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
              2
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#2bbda3] text-white shadow-xs'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#2bbda3] text-white shadow-xs'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>Saved Pickup Addresses</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
              activeTab === 'wallet'
                ? 'bg-[#2bbda3] text-white shadow-xs'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4" />
              <span>Instant Payout & Bank Account</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>

        {/* Tab Content Details (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Orders & Buyback Activity</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Track your buy and sell status with live doorstep updates</p>
                </div>
                <Link href="/orders" className="text-xs font-bold text-[#2bbda3] hover:underline flex items-center gap-1">
                  View Full Tracker <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-gray-200 rounded-2xl p-4 sm:p-5 hover:border-[#2bbda3]/50 transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-1 shrink-0">
                          <img src={ord.image} alt="" className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${ord.type === 'SELL' ? 'bg-amber-100 text-amber-800' : 'bg-[#2bbda3]/10 text-[#2bbda3]'}`}>
                              {ord.type === 'SELL' ? 'DEVICE SOLD' : 'REFURBISHED PURCHASE'}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">{ord.id}</span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-900 mt-1">{ord.title}</h3>
                          <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-3">
                            <span>Date: {ord.date}</span>
                            <span>•</span>
                            <span className="font-bold text-gray-900">₹{ord.amount.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full shrink-0">
                        {ord.status}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span>{ord.warranty || ord.paymentMethod}</span>
                      <Link href={`/orders`} className="text-[#2bbda3] font-bold hover:underline">
                        Track Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Personal Details</h2>
              <p className="text-xs text-gray-500 mb-6">Manage your contact name and email address</p>

              {profileMsg.ok && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium">
                  {profileMsg.ok}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Registered Mobile Number</label>
                  <input
                    type="text"
                    value={currentUser.phone || ''}
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-500 cursor-not-allowed font-mono"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">Phone number is linked to your OTP authentication</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
                    placeholder="name@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2bbda3] hover:bg-[#23a58c] text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Saved Pickup &amp; Delivery Addresses</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Used for free doorstep device diagnostics & deliveries</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('New address addition is enabled during checkout/sell flow.')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#2bbda3] text-white text-xs font-bold rounded-lg hover:bg-[#23a58c] transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-gray-200 rounded-2xl p-4.5 relative hover:border-[#2bbda3]/50 transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                        {addr.tag}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold text-[#2bbda3] bg-[#2bbda3]/10 px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-gray-900">{addr.name}</div>
                    <div className="text-xs text-gray-600 mt-1 leading-relaxed">{addr.address}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">Mobile: +91 {addr.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WALLET / PAYOUTS */}
          {activeTab === 'wallet' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Instant Payout Details</h2>
              <p className="text-xs text-gray-500 mb-6">Bank accounts for receiving instant payment on doorstep device sale</p>

              <div className="p-5 bg-gradient-to-br from-emerald-500 to-[#2bbda3] text-white rounded-2xl shadow-sm mb-6 max-w-md">
                <div className="flex items-center justify-between text-xs opacity-90">
                  <span>Sellbar Instant Payout Account</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black mt-3">₹ 0.00</div>
                <div className="text-xs opacity-80 mt-1">Pending Buyback Balance</div>
                <div className="mt-4 pt-3 border-t border-white/20 text-[11px] flex justify-between">
                  <span>Linked UPI: 9876543210@paytm</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">ACTIVE</span>
                </div>
              </div>

              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2bbda3] hover:bg-[#23a58c] text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                <span>Sell a Device Now &amp; Get Cash</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
