'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getSession } from '@/lib/auth';

export default function CustomerProfilePage() {
  const [user, setUser] = useState({ name: 'Aman Verma', email: 'aman@example.com', phone: '+91 98765 43210' });
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (s?.user) {
      setUser((prev) => ({
        ...prev,
        name: s.user.name || prev.name,
        email: s.user.email || prev.email,
        phone: s.user.phone || prev.phone,
      }));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/account" className="hover:text-[#13b59b] transition">Account</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Personal Profile</span>
          </nav>
        </div>
      </div>

      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#13b59b] flex items-center justify-center font-bold">
              <User size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">Personal Information</h1>
              <p className="text-xs text-slate-500">Manage your contact details and communication preferences.</p>
            </div>
          </div>

          {savedMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} /> Profile changes saved successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Registered Phone Number</label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
