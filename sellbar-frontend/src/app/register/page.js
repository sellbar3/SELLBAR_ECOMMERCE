'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Lock,
  Phone,
  User,
  ShieldCheck,
  Zap,
  Star,
  Loader2,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import { saveSession } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
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
    router.push('/account');
    router.refresh();
  };

  // Google One-Click Registration
  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const enteredEmail = window.prompt(
        "Enter your Google Account email to register with Google:",
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
        setError(data.message || 'Google registration failed');
      }
    } catch {
      setError('Connection to Google failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Form Submit Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms of Service & Privacy Policy');
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
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-gray-50 to-gray-100/60 py-12 px-4 sm:px-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl bg-white border border-gray-200/80 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Brand Perks & Value Proposition */}
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
              Join India's Smartest Recommerce Platform
            </h2>
            <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
              Create your account today to unlock exclusive selling bonuses, free doorstep pickups &amp; verified refurbished warranties.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0">
                  <Zap className="w-4 h-4 text-[#2bbb9e]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">₹500 Extra on First Sell</h4>
                  <p className="text-[11px] text-emerald-100/70">Instant bonus credited with your device payout.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#2bbb9e]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">12 Months Extended Warranty</h4>
                  <p className="text-[11px] text-emerald-100/70">On all certified refurbished phones &amp; laptops.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2bbb9e] shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Free Doorstep Pickup</h4>
                  <p className="text-[11px] text-emerald-100/70">Zero hassle doorstep pickup across 28,000+ pincodes.</p>
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

        {/* Right Side: Registration Form */}
        <div className="w-full md:w-[55%] p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Create Account</h1>
              <p className="text-xs text-gray-500 mt-1">
                Already a user?{' '}
                <Link href="/login" className="text-[#2bbb9e] font-bold hover:underline">
                  Sign in to your account
                </Link>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google One-Click Registration Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
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
              <span>Sign up with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                OR SIGN UP WITH EMAIL
              </span>
              <div className="border-t border-gray-200 w-full" />
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Full Name *
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                  <User className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    className="w-full text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address *
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                  <Mail className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    className="w-full text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
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
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password *
                </label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 focus-within:border-[#2bbb9e] focus-within:bg-white transition-all">
                  <Lock className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
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

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition cursor-pointer shrink-0 ${
                    agreed
                      ? 'bg-[#2bbb9e] border-[#2bbb9e] text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {agreed && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <label className="text-[11px] text-gray-600 leading-tight">
                  I agree to Sellbar's{' '}
                  <Link
                    href="/terms-conditions"
                    target="_blank"
                    className="text-[#2bbb9e] font-semibold hover:underline"
                  >
                    Terms of Use
                  </Link>{' '}
                  &amp;{' '}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="text-[#2bbb9e] font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !agreed}
                className="w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 bg-[#2bbb9e] hover:bg-[#23a58c] text-white shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>CREATE ACCOUNT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-400">
              🔒 100% Secure 256-bit Encrypted Signup • Zero Spam Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
