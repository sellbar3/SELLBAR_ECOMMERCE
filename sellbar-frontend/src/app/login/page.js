'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { saveSession } from '@/lib/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';

  const [mode, setMode] = useState('otp'); // 'otp' | 'password'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('PHONE'); // 'PHONE' | 'OTP'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle OTP Send
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('OTP');
        setOtp(data.debugOtp || '123456');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verify
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otp }),
      });
      const data = await res.json();
      if (data.success) {
        saveSession({ token: data.token, user: data.user });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('sellbar-cart-updated'));
          window.dispatchEvent(new CustomEvent('sellbar-user-logged-in', { detail: data.user }));
        }
        router.push(redirect);
        router.refresh();
      } else {
        setError(data.message || 'Invalid OTP code');
      }
    } catch {
      setError('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Login
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        saveSession({ token: data.token, user: data.user });
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('sellbar-cart-updated'));
          window.dispatchEvent(new CustomEvent('sellbar-user-logged-in', { detail: data.user }));
        }
        router.push(redirect);
        router.refresh();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Connection error');
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
        <h1 className="text-xl font-bold text-gray-900">
          {mode === 'otp' ? (step === 'PHONE' ? 'Sign In / Register' : 'Verify Mobile Number') : 'Sign In with Password'}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {mode === 'otp' && step === 'PHONE'
            ? 'Enter your mobile number to get instant OTP'
            : mode === 'otp'
            ? `Enter the 6-digit OTP sent to +91 ${phone}`
            : 'Enter your email & password to access your account'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
          {error}
        </div>
      )}

      {/* OTP FLOW */}
      {mode === 'otp' && step === 'PHONE' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
                placeholder="9876543210"
                autoFocus
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#2bbda3] hover:bg-[#23a58c] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Continue with OTP'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {mode === 'otp' && step === 'OTP' && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700">6-Digit OTP</label>
              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="text-[11px] text-[#2bbda3] font-semibold hover:underline"
              >
                Change Number
              </button>
            </div>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center tracking-widest text-lg font-bold bg-gray-50 border border-gray-200 rounded-xl py-2.5 text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
              placeholder="123456"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#2bbda3] hover:bg-[#23a58c] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
            <CheckCircle2 className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {/* PASSWORD FLOW */}
      {mode === 'password' && (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#2bbda3] focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#2bbda3] hover:bg-[#23a58c] text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      {/* Switch mode */}
      <div className="mt-6 pt-5 border-t border-gray-100 text-center">
        {mode === 'otp' ? (
          <button
            type="button"
            onClick={() => {
              setMode('password');
              setError('');
            }}
            className="text-xs text-gray-600 hover:text-[#2bbda3] font-medium"
          >
            Or sign in with email &amp; password
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setMode('otp');
              setError('');
            }}
            className="text-xs text-[#2bbda3] font-semibold hover:underline"
          >
            Back to Mobile OTP Login
          </button>
        )}
      </div>

      <div className="mt-4 text-center">
        <Link href="/register" className="text-xs text-gray-500 hover:text-gray-800">
          Don&apos;t have an account? <span className="text-[#2bbda3] font-bold">Register here</span>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500">Loading sign in...</div>}>
      <LoginForm />
    </Suspense>
  );
}
