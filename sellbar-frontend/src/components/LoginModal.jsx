'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Check,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Loader2,
  Mail,
  Lock,
  Phone,
  User,
  Zap,
  Eye,
  EyeOff,
  CheckCircle2,
  Star,
  Shield,
  Truck,
} from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  // Tab: 'login' | 'register'
  const [tab, setTab] = useState('login');
  
  // Login Sub-mode: 'otp' | 'password'
  const [loginMode, setLoginMode] = useState('otp');
  const [otpStep, setOtpStep] = useState('PHONE'); // 'PHONE' | 'OTP'

  // Form Fields
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [debugOtp, setDebugOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setError('');
      setLoading(false);
      setOtpStep('PHONE');
      setOtp('');
      setShowPassword(false);
    }
  }, [isOpen, tab]);

  // Resend Countdown Timer
  useEffect(() => {
    let interval;
    if (otpStep === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, timer]);

  if (!isOpen) return null;

  // Handle Successful Login
  const handleAuthSuccess = (userData, token) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(
          'sellbar_session',
          JSON.stringify({ token, user: userData })
        );
      }
      window.dispatchEvent(new Event('sellbar-cart-updated'));
      window.dispatchEvent(
        new CustomEvent('sellbar-user-logged-in', { detail: userData })
      );
    }
    if (onSuccess) onSuccess(userData);
    onClose();
  };

  // 1. Google Sign-In / Sign-Up
  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      const enteredEmail = window.prompt(
        "Enter your Google Account email to continue with Google:",
        email || "user@gmail.com"
      );
      if (!enteredEmail || !enteredEmail.includes('@')) {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enteredEmail.trim(),
          name: name.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        handleAuthSuccess(data.user, data.token);
      } else {
        setError(data.message || 'Google authentication failed');
      }
    } catch {
      setError('Connection to Google Auth failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Send Mobile OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!agreed) {
      setError('Please agree to Terms & Conditions and Privacy Policy');
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
        setDebugOtp(data.debugOtp || '123456');
        setOtp(data.debugOtp || '123456');
        setOtpStep('OTP');
        setTimer(30);
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch {
      setError('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Verify OTP
  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          code: otp,
          name: name.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        handleAuthSuccess(data.user, data.token);
      } else {
        setError(data.message || 'Invalid OTP. Please check and re-enter.');
      }
    } catch {
      setError('Error verifying OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Email/Password Login
  const handlePasswordLogin = async (e) => {
    if (e) e.preventDefault();
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
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 5. User Registration (Create Account)
  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setError('Full name is required');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agreed) {
      setError('Please agree to Terms & Conditions and Privacy Policy');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || undefined,
          password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        handleAuthSuccess(data.user, data.token);
      } else {
        setError(data.message || 'Registration failed. Email might already exist.');
      }
    } catch {
      setError('Connection error during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200 min-h-[580px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================= */}
        {/* LEFT COLUMN: Modern Emerald Gradient Brand & Trust Panel */}
        {/* ========================================================= */}
        <div className="w-full md:w-[44%] bg-gradient-to-br from-[#0c4a41] via-[#115e54] to-[#0a3831] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden select-none shrink-0">
          {/* Subtle Ambient Glow Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#2bbb9e]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#13b59b]/15 blur-3xl pointer-events-none" />

          {/* Top Brand & Header */}
          <div className="relative z-10">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#2bbb9e] animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-200">
                SELLBAR AUTHENTICATION
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {tab === 'login' ? 'Welcome Back!' : 'Start With Sellbar'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 font-normal leading-relaxed">
              {tab === 'login'
                ? 'Sell old gadgets instantly or shop certified refurbished smartphones with 1-year warranty.'
                : 'Create your account to unlock ₹500 welcome bonus, instant doorstep pickups & order tracking.'}
            </p>
          </div>

          {/* Value Props Bullet List */}
          <div className="relative z-10 space-y-4 my-8">
            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0 transition-transform group-hover:scale-105">
                <Zap className="w-4 h-4 text-[#2bbb9e]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">
                  Instant Doorstep Cash
                </h4>
                <p className="text-[11px] text-emerald-100/70 leading-normal">
                  Sell in 60 seconds with instant UPI or Cash transfer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0 transition-transform group-hover:scale-105">
                <ShieldCheck className="w-4 h-4 text-[#2bbb9e]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">
                  32-Point Quality Certified
                </h4>
                <p className="text-[11px] text-emerald-100/70 leading-normal">
                  Refurbished gadgets with up to 12 months comprehensive warranty.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 group">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0 transition-transform group-hover:scale-105">
                <Truck className="w-4 h-4 text-[#2bbb9e]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">
                  Free Pickup & 7-Day Returns
                </h4>
                <p className="text-[11px] text-emerald-100/70 leading-normal">
                  Serviceable across 28,000+ pincodes in India.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100/80">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>4.8/5 Rated</span>
            </div>
            <span className="text-[11px] opacity-75">250k+ Happy Users</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Interactive Sign In / Register Tabs & Forms */}
        {/* ========================================================= */}
        <div className="w-full md:w-[56%] p-7 sm:p-10 flex flex-col justify-between relative bg-white overflow-y-auto">
          {/* Top-Right Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* TOP SEGMENTED CONTROL: Sign In / Create Account */}
          <div>
            <div className="flex items-center bg-gray-100/80 p-1 rounded-2xl mb-6 max-w-xs">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                  tab === 'login'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                  tab === 'register'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message Toast */}
            {error && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span className="flex-1">{error}</span>
              </div>
            )}

            {/* GOOGLE AUTH BUTTON (Available in both tabs) */}
            <div className="mb-5">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-3 shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50"
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
                <span>
                  {tab === 'login' ? 'Continue with Google' : 'Sign up with Google'}
                </span>
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                {tab === 'login' ? 'OR CONTINUE WITH' : 'OR FILL IN DETAILS'}
              </span>
              <div className="border-t border-gray-200 w-full" />
            </div>

            {/* ========================================================= */}
            {/* VIEW A: SIGN IN TAB (OTP or Password)                     */}
            {/* ========================================================= */}
            {tab === 'login' && (
              <div>
                {/* Mode Selector: Mobile OTP vs Password */}
                <div className="flex items-center gap-4 mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('otp');
                      setError('');
                    }}
                    className={`pb-1 border-b-2 transition cursor-pointer ${
                      loginMode === 'otp'
                        ? 'border-[#2bbb9e] text-[#2bbb9e]'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Mobile OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('password');
                      setError('');
                    }}
                    className={`pb-1 border-b-2 transition cursor-pointer ${
                      loginMode === 'password'
                        ? 'border-[#2bbb9e] text-[#2bbb9e]'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    Email &amp; Password
                  </button>
                </div>

                {/* Sub-Flow 1: OTP Login */}
                {loginMode === 'otp' && (
                  <div>
                    {otpStep === 'PHONE' ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Enter your mobile number
                          </label>
                          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-3 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                            <span className="text-sm font-bold text-gray-900 pr-2 border-r border-gray-200 mr-2.5">
                              🇮🇳 +91
                            </span>
                            <input
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value.replace(/\D/g, ''));
                                setError('');
                              }}
                              placeholder="9876543210"
                              className="w-full text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                              autoFocus
                            />
                          </div>
                        </div>

                        {/* Terms & Privacy Checkbox */}
                        <div className="flex items-center gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={() => setAgreed(!agreed)}
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition cursor-pointer shrink-0 ${
                              agreed
                                ? 'bg-[#2bbb9e] border-[#2bbb9e] text-white'
                                : 'border-gray-300 bg-white hover:border-gray-500'
                            }`}
                          >
                            {agreed && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                          <label className="text-[11px] text-gray-600 leading-snug">
                            I agree to the{' '}
                            <Link
                              href="/terms-conditions"
                              target="_blank"
                              className="text-[#2bbb9e] hover:underline font-semibold"
                            >
                              Terms
                            </Link>{' '}
                            &amp;{' '}
                            <Link
                              href="/privacy-policy"
                              target="_blank"
                              className="text-[#2bbb9e] hover:underline font-semibold"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>

                        {/* Continue Button */}
                        <button
                          type="submit"
                          disabled={phone.length !== 10 || !agreed || loading}
                          className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                            phone.length === 10 && agreed && !loading
                              ? 'bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending OTP...</span>
                            </>
                          ) : (
                            <span>CONTINUE WITH OTP</span>
                          )}
                        </button>
                      </form>
                    ) : (
                      /* Sub-Step: Verify OTP */
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                          <button
                            type="button"
                            onClick={() => setOtpStep('PHONE')}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#2bbb9e] cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Change Number</span>
                          </button>
                          <span className="text-xs font-mono font-bold text-gray-700">
                            +91 {phone}
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Enter 6-digit OTP
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="••••••"
                            className="w-full text-center tracking-[0.4em] text-xl font-bold bg-gray-50 border border-gray-200 rounded-2xl py-3 text-gray-900 focus:outline-none focus:border-[#2bbb9e] focus:bg-white"
                            autoFocus
                          />
                        </div>

                        {/* Demo OTP Helper */}
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
                          disabled={otp.length !== 6 || loading}
                          className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                            otp.length === 6 && !loading
                              ? 'bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Verifying OTP...</span>
                            </>
                          ) : (
                            <span>VERIFY &amp; SIGN IN</span>
                          )}
                        </button>

                        <div className="text-center pt-1">
                          {timer > 0 ? (
                            <span className="text-[11px] text-gray-400">
                              Resend code in {timer}s
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="text-[11px] font-bold text-[#2bbb9e] hover:underline cursor-pointer"
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* Sub-Flow 2: Email & Password Login */}
                {loginMode === 'password' && (
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
                      disabled={!email || !password || loading}
                      className="w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <span>SIGN IN WITH EMAIL</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW B: CREATE ACCOUNT (REGISTER) TAB                     */}
            {/* ========================================================= */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                    <User className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Number (Optional)
                  </label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                    <span className="text-xs font-bold text-gray-900 pr-2 border-r border-gray-200 mr-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Create Password *
                  </label>
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                    <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setAgreed(!agreed)}
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition cursor-pointer shrink-0 ${
                      agreed
                        ? 'bg-[#2bbb9e] border-[#2bbb9e] text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {agreed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </button>
                  <label className="text-[10px] text-gray-600 leading-tight">
                    I agree to Sellbar's{' '}
                    <Link
                      href="/terms-conditions"
                      target="_blank"
                      className="text-[#2bbb9e] font-semibold"
                    >
                      Terms
                    </Link>{' '}
                    &amp;{' '}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="text-[#2bbb9e] font-semibold"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !agreed}
                  className="w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>CREATE FREE ACCOUNT</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer Security Badge */}
          <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <Shield className="w-3.5 h-3.5 text-[#2bbb9e]" />
            <span>100% Safe &amp; Secure 256-bit Encrypted Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}
