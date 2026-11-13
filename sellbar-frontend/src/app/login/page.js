'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Loader2,
  Check,
  ArrowLeft,
  Eye,
  EyeOff,
  Zap,
  Star,
} from 'lucide-react';
import { saveSession } from '@/lib/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';

  const [mode, setMode] = useState('otp'); // 'otp' | 'password'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [debugOtp, setDebugOtp] = useState('');
  const [step, setStep] = useState('PHONE'); // 'PHONE' | 'OTP'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuthSuccess = (userData, token) => {
    saveSession({ token, user: userData });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('sellbar-cart-updated'));
      window.dispatchEvent(
        new CustomEvent('sellbar-user-logged-in', { detail: userData })
      );
    }
    router.push(redirect);
    router.refresh();
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const enteredEmail = window.prompt(
        "Enter your Google Account email to sign in:",
        email || "user@gmail.com"
      );
      if (!enteredEmail || !enteredEmail.includes('@')) {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: enteredEmail.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        handleAuthSuccess(data.user, data.token);
      } else {
        setError(data.message || 'Google sign-in failed');
      }
    } catch {
      setError('Connection to Google failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        setDebugOtp(data.debugOtp || '123456');
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
        handleAuthSuccess(data.user, data.token);
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
        handleAuthSuccess(data.user, data.token);
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-gray-50 to-gray-100/60 py-12 px-4 sm:px-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl bg-white border border-gray-200/80 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Brand Perks */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-[#0c4a41] via-[#115e54] to-[#0a3831] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden select-none">
          <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-[#2bbb9e]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#13b59b]/15 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <span className="text-2xl font-black tracking-tight text-white">SELLBAR</span>
            </Link>

            <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
              Welcome Back to Sellbar
            </h2>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              Log in to manage your buy orders, track pickup requests for sold devices, and access exclusive recommerce deals.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0">
                  <Zap className="w-4 h-4 text-[#2bbb9e]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Instant Doorstep Valuation</h4>
                  <p className="text-[11px] text-emerald-100/70">Track technician visits &amp; instant payouts live.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#2bbb9e]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">32-Point Quality Certified</h4>
                  <p className="text-[11px] text-emerald-100/70">Safe shopping with 100% genuine refurbished devices.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Data Wiping Guarantee</h4>
                  <p className="text-[11px] text-emerald-100/70">Military-grade data protection before resale.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100/80">
            <div className="flex items-center gap-1 font-semibold text-white">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>4.8/5 Rating</span>
            </div>
            <span className="text-[11px] opacity-75">250k+ Happy Users</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-[55%] p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Sign In</h1>
              <p className="text-xs text-gray-500 mt-1">
                New to Sellbar?{' '}
                <Link href="/register" className="text-[#2bbb9e] font-bold hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google One-Click Login Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-3 shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50 mb-5"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider - Clean Single Horizontal Row */}
            <div className="my-5 flex items-center justify-center gap-3 w-full">
              <div className="h-px bg-gray-200 flex-1 min-w-[20px]" />
              <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase whitespace-nowrap shrink-0 px-1 select-none">
                OR CONTINUE WITH
              </span>
              <div className="h-px bg-gray-200 flex-1 min-w-[20px]" />
            </div>

            {/* Switch Mode: OTP vs Password */}
            <div className="flex items-center gap-4 mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode('otp');
                  setError('');
                }}
                className={`pb-1 border-b-2 transition cursor-pointer ${
                  mode === 'otp'
                    ? 'border-[#2bbb9e] text-[#2bbb9e]'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('password');
                  setError('');
                }}
                className={`pb-1 border-b-2 transition cursor-pointer ${
                  mode === 'password'
                    ? 'border-[#2bbb9e] text-[#2bbb9e]'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                Email &amp; Password
              </button>
            </div>

            {/* OTP FLOW */}
            {mode === 'otp' && step === 'PHONE' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Mobile Number
                  </label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-3 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                    <span className="text-sm font-bold text-gray-900 pr-2 border-r border-gray-200 mr-2.5">
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
                      className="w-full text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                      placeholder="9876543210"
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>CONTINUE WITH OTP</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {mode === 'otp' && step === 'OTP' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-700">Enter 6-Digit OTP</label>
                    <button
                      type="button"
                      onClick={() => setStep('PHONE')}
                      className="text-[11px] text-[#2bbb9e] font-semibold hover:underline"
                    >
                      Change Number
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-[0.4em] text-xl font-bold bg-gray-50 border border-gray-200 rounded-2xl py-3 text-gray-900 focus:outline-none focus:border-[#2bbb9e] focus:bg-white"
                    placeholder="••••••"
                    autoFocus
                    required
                  />
                </div>

                {debugOtp && (
                  <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-[11px] flex items-center justify-between">
                    <span className="font-medium">
                      Demo OTP: <strong className="font-mono text-xs">{debugOtp}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setOtp(debugOtp)}
                      className="text-[10px] bg-white border border-teal-300 px-2 py-0.5 rounded font-bold text-[#2bbb9e] hover:bg-teal-100/50 cursor-pointer"
                    >
                      Auto-Fill
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>VERIFY &amp; CONTINUE</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* PASSWORD FLOW */}
            {mode === 'password' && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-3 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                    <Mail className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-700">Password</label>
                    <span className="text-[11px] text-gray-400 hover:text-gray-600 cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-3 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                    <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>SIGN IN</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400">
              🔒 100% Secure 256-bit Encrypted Login • Zero Data Leakage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-gray-500">Loading sign in...</div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
