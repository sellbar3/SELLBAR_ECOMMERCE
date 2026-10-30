'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { saveSession } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (data.success) {
        saveSession({ token: data.token, user: data.user });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('sellbar-cart-updated'));
          window.dispatchEvent(new CustomEvent('sellbar-user-logged-in', { detail: data.user }));
        }
        router.push('/account');
        router.refresh();
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white border border-gray-200 rounded-3xl shadow-xs font-sans">
      <div className="text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#2bbda3] flex items-center justify-center text-white font-black shadow-xs">
            ✓
          </div>
          <span className="text-2xl font-black tracking-tight text-[#2bbda3]">SELLBAR</span>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Create Your Account</h1>
        <p className="text-xs text-gray-500 mt-1">
          Join Sellbar to get instant cash on old devices &amp; certified warranties
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number</label>
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
            placeholder="9876543210 (Optional)"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
            placeholder="Min 6 characters"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[#2bbda3] hover:bg-[#23a58c] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? 'Creating account...' : 'Create Account'}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-100 text-center">
        <Link href="/login" className="text-xs text-gray-500 hover:text-gray-800">
          Already have an account? <span className="text-[#2bbda3] font-bold">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
