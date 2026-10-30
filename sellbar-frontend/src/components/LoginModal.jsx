'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Check, ArrowLeft, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
export default function LoginModal({ isOpen, onClose, onSuccess }) {
    const [phone, setPhone] = useState('');
    const [agreed, setAgreed] = useState(true);
    const [step, setStep] = useState('PHONE');
    const [otp, setOtp] = useState('');
    const [debugOtp, setDebugOtp] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(30);
    // Reset states when opened
    useEffect(() => {
        if (isOpen) {
            setStep('PHONE');
            setOtp('');
            setError('');
            setLoading(false);
        }
    }, [isOpen]);
    // Resend countdown timer
    useEffect(() => {
        let interval;
        if (step === 'OTP' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);
    if (!isOpen)
        return null;
    const handleSendOtp = async (e) => {
        if (e)
            e.preventDefault();
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
                setStep('OTP');
                setTimer(30);
            }
            else {
                setError(data.message || 'Failed to send OTP. Please try again.');
            }
        }
        catch {
            setError('Network connection error. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleVerifyOtp = async (e) => {
        if (e)
            e.preventDefault();
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
                body: JSON.stringify({ phone, code: otp, name: name.trim() || undefined }),
            });
            const data = await res.json();
            if (data.success) {
                // Trigger cart / auth sync across the application
                if (typeof window !== 'undefined') {
                    if (data.token) {
                        localStorage.setItem('sellbar_session', JSON.stringify({ token: data.token, user: data.user }));
                    }
                    window.dispatchEvent(new Event('sellbar-cart-updated'));
                    window.dispatchEvent(new CustomEvent('sellbar-user-logged-in', { detail: data.user }));
                }
                if (onSuccess) {
                    onSuccess(data.user);
                }
                onClose();
            }
            else {
                setError(data.message || 'Invalid OTP. Please check and re-enter.');
            }
        }
        catch {
            setError('Error verifying OTP. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div className="bg-white rounded-3xl w-full max-w-190 shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200 min-h-115" onClick={(e) => e.stopPropagation()}>
        {/* ========================================================= */}
        {/* LEFT COLUMN: Cashify Mint-Teal Brand Banner with Characters */}
        {/* ========================================================= */}
        <div className="w-full md:w-[42%] bg-[#2bbb9e] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden select-none shrink-0">
          
          {/* Subtle floating background brick accents */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-12 left-8 w-12 h-2.5 bg-white/40 rounded-xs"/>
            <div className="absolute top-28 right-6 w-8 h-2 bg-white/30 rounded-xs"/>
            <div className="absolute top-44 left-14 w-10 h-2 bg-white/35 rounded-xs"/>
            <div className="absolute bottom-36 right-10 w-14 h-2.5 bg-white/30 rounded-xs"/>
            <div className="absolute bottom-20 left-6 w-9 h-2 bg-white/25 rounded-xs"/>
          </div>

          {/* Top Title */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Login/Signup
            </h2>
            <p className="text-xs text-white/80 mt-1.5 font-medium">
              Join millions of smart shoppers &amp; sellers on Sellbar.
            </p>
          </div>

          {/* Bottom Illustration: 2 Characters holding giant key towards padlock */}
          <div className="relative z-10 w-full mt-8 pt-4">
            <svg viewBox="0 0 320 220" className="w-full h-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Floor Baseline */}
              <line x1="10" y1="210" x2="310" y2="210" stroke="#1da18a" strokeWidth="2" strokeDasharray="3 3"/>

              {/* Floating Padlock on Right */}
              <g transform="translate(225, 125)">
                {/* Padlock Shackle */}
                <path d="M14 26 V14 C14 6 22 0 30 0 C38 0 46 6 46 14 V26" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none"/>
                {/* Padlock Body */}
                <rect x="0" y="24" width="60" height="48" rx="8" fill="#173e43"/>
                {/* Keyhole */}
                <circle cx="30" cy="44" r="5" fill="#2bbb9e"/>
                <path d="M28 47 L32 47 L33 58 L27 58 Z" fill="#2bbb9e"/>
              </g>

              {/* Character 1 (Woman on Left holding key loop) */}
              <g transform="translate(20, 135)">
                {/* Hair */}
                <path d="M14 6 C10 6 7 10 7 16 C7 24 10 28 14 30 C19 30 24 26 24 18 C24 10 20 6 14 6 Z" fill="#1a2e35"/>
                {/* Face */}
                <circle cx="16" cy="18" r="8" fill="#ffd1b3"/>
                {/* Body / Shirt */}
                <path d="M9 28 L23 28 L25 58 L7 58 Z" fill="#e5e7eb"/>
                {/* Arm reaching for key */}
                <path d="M18 36 L40 40 L40 46 L18 42 Z" fill="#ffd1b3"/>
                {/* Dark Trousers */}
                <path d="M7 58 L15 58 L12 90 L5 90 Z" fill="#173e43"/>
                <path d="M16 58 L24 58 L26 92 L19 92 Z" fill="#173e43"/>
                {/* Shoes */}
                <ellipse cx="8" cy="91" rx="5" ry="2" fill="#0f262a"/>
                <ellipse cx="23" cy="93" rx="5" ry="2" fill="#0f262a"/>
              </g>

              {/* Character 2 (Man on Right carrying key shaft) */}
              <g transform="translate(115, 130)">
                {/* Hair */}
                <path d="M18 2 C12 2 10 6 10 11 C10 16 12 18 18 18 C24 18 26 14 26 8 C26 3 22 2 18 2 Z" fill="#1a2e35"/>
                {/* Face */}
                <circle cx="18" cy="14" r="7.5" fill="#ffd1b3"/>
                {/* Body / Shirt */}
                <path d="M10 24 L28 24 L30 58 L8 58 Z" fill="#f3f4f6"/>
                {/* Arm holding key aloft */}
                <path d="M14 30 L22 18 L26 21 L18 36 Z" fill="#ffd1b3"/>
                <path d="M24 32 L34 22 L38 25 L28 38 Z" fill="#ffd1b3"/>
                {/* Dark Trousers */}
                <path d="M8 58 L18 58 L12 95 L5 95 Z" fill="#173e43"/>
                <path d="M19 58 L29 58 L38 92 L30 92 Z" fill="#173e43"/>
                {/* Shoes */}
                <ellipse cx="8" cy="96" rx="6" ry="2.5" fill="#0f262a"/>
                <ellipse cx="35" cy="93" rx="6" ry="2.5" fill="#0f262a"/>
              </g>

              {/* Giant White Key Carried by Both */}
              <g transform="translate(52, 140) rotate(-14)">
                {/* Key Ring Handle */}
                <circle cx="20" cy="20" r="18" stroke="#ffffff" strokeWidth="8" fill="none"/>
                {/* Key Stem */}
                <rect x="36" y="16" width="125" height="8" rx="3" fill="#ffffff"/>
                {/* Key Notches/Bits */}
                <rect x="135" y="8" width="8" height="12" fill="#ffffff"/>
                <rect x="148" y="4" width="8" height="18" fill="#ffffff"/>
              </g>
            </svg>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Interactive Phone / OTP Verification Form    */}
        {/* ========================================================= */}
        <div className="w-full md:w-[58%] p-7 sm:p-10 flex flex-col justify-between relative bg-white">
          
          {/* Top-Right Close Button */}
          <button type="button" onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 transition p-1.5 rounded-full hover:bg-gray-100 cursor-pointer" aria-label="Close modal">
            <X className="w-5 h-5 stroke-[2.2]"/>
          </button>

          {/* Error Message Toast */}
          {error && (<div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"/>
              <span>{error}</span>
            </div>)}

          {/* ======================================================= */}
          {/* STEP 1: PHONE NUMBER INPUT SCREEN (Matching Screenshot) */}
          {/* ======================================================= */}
          {step === 'PHONE' ? (<form onSubmit={handleSendOtp} className="my-auto space-y-6 pt-4">
              <div className="space-y-3">
                <label htmlFor="sellbar-login-mobile" className="block text-sm font-medium text-gray-500">
                  Enter your phone number
                </label>

                {/* Underline Style Input Field with +91 Prefix */}
                <div className="flex items-baseline border-b-2 border-gray-300 focus-within:border-[#2bbb9e] pb-2 transition-colors">
                  <span className="text-xl sm:text-2xl font-normal text-gray-900 mr-2.5 select-none tracking-tight">
                    +91
                  </span>
                  <input id="sellbar-login-mobile" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} value={phone} onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                if (digits.length <= 10)
                    setPhone(digits);
            }} placeholder="Enter your Mobile" className="w-full text-xl sm:text-2xl font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent" autoFocus/>
                </div>
              </div>

              {/* Terms and Privacy Checkbox */}
              <div className="pt-4 pb-2">
                <div className="flex items-center gap-2.5">
                  <button type="button" onClick={() => setAgreed(!agreed)} className={`w-4.5 h-4.5 rounded-sm border flex items-center justify-center transition cursor-pointer shrink-0 ${agreed
                ? 'bg-[#2bbb9e] border-[#2bbb9e] text-white'
                : 'border-gray-400 bg-white hover:border-gray-600'}`}>
                    {agreed && <Check className="w-3.5 h-3.5 stroke-3"/>}
                  </button>
                  <label className="text-xs text-gray-700 leading-snug">
                    I agree to the{' '}
                    <Link href="/terms-conditions" target="_blank" className="text-[#2bbb9e] hover:underline font-semibold">
                      Terms and Conditions
                    </Link>{' '}
                    &amp;{' '}
                    <Link href="/privacy-policy" target="_blank" className="text-[#2bbb9e] hover:underline font-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {/* CONTINUE Button */}
              <button type="submit" disabled={phone.length !== 10 || !agreed || loading} className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition flex items-center justify-center gap-2 ${phone.length === 10 && agreed && !loading
                ? 'bg-[#2bbb9e] hover:bg-[#25ab8f] text-white shadow-md active:scale-[0.99] cursor-pointer'
                : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'}`}>
                {loading ? (<>
                    <Loader2 className="w-4 h-4 animate-spin"/>
                    <span>Sending OTP...</span>
                  </>) : (<span>CONTINUE</span>)}
              </button>
            </form>) : (
        /* ======================================================= */
        /* STEP 2: VERIFY OTP SCREEN                               */
        /* ======================================================= */
        <form onSubmit={handleVerifyOtp} className="my-auto space-y-5 pt-2">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <button type="button" onClick={() => setStep('PHONE')} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#2bbb9e] cursor-pointer">
                  <ArrowLeft className="w-3.5 h-3.5"/>
                  <span>Change Number</span>
                </button>
                <span className="text-xs text-gray-400 font-mono">+91 {phone}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  Verify Mobile Number
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enter 6-digit OTP code sent to your phone.
                </p>
              </div>

              {/* Debug OTP Quick helper pill */}
              {debugOtp && (<div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#2bbb9e]"/>
                    <span>Demo OTP: <strong className="font-mono text-sm text-[#2bbb9e]">{debugOtp}</strong></span>
                  </div>
                  <button type="button" onClick={() => setOtp(debugOtp)} className="text-[11px] bg-white border border-teal-300 px-2 py-0.5 rounded-md font-bold text-[#2bbb9e] hover:bg-teal-100/50 cursor-pointer">
                    Auto Fill
                  </button>
                </div>)}

              {/* OTP Input */}
              <div className="space-y-1.5">
                <label htmlFor="otp-input" className="block text-xs font-semibold text-gray-600">
                  6-Digit OTP
                </label>
                <input id="otp-input" type="text" maxLength={6} inputMode="numeric" value={otp} onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                if (digits.length <= 6)
                    setOtp(digits);
            }} placeholder="• • • • • •" className="w-full text-center tracking-[0.5em] text-2xl font-bold font-mono py-2.5 border-2 border-gray-300 rounded-xl focus:border-[#2bbb9e] focus:outline-none bg-gray-50/50" autoFocus/>
              </div>

              {/* Optional Full Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="user-name" className="block text-xs font-semibold text-gray-600">
                  Full Name (Optional)
                </label>
                <input id="user-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" className="w-full text-sm py-2 px-3.5 border border-gray-300 rounded-xl focus:border-[#2bbb9e] focus:outline-none"/>
              </div>

              {/* Resend Timer */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-gray-400">Didn't receive code?</span>
                {timer > 0 ? (<span className="text-gray-500 font-medium">Resend in {timer}s</span>) : (<button type="button" onClick={handleSendOtp} className="font-bold text-[#2bbb9e] hover:underline cursor-pointer">
                    Resend OTP
                  </button>)}
              </div>

              {/* VERIFY Button */}
              <button type="submit" disabled={otp.length !== 6 || loading} className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition flex items-center justify-center gap-2 ${otp.length === 6 && !loading
                ? 'bg-[#2bbb9e] hover:bg-[#25ab8f] text-white shadow-md active:scale-[0.99] cursor-pointer'
                : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'}`}>
                {loading ? (<>
                    <Loader2 className="w-4 h-4 animate-spin"/>
                    <span>Verifying...</span>
                  </>) : (<span>VERIFY &amp; LOGIN</span>)}
              </button>
            </form>)}

          {/* Bottom Security Assurance Note */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600"/>
            <span>100% Safe &amp; Secure 256-bit Encrypted Login</span>
          </div>
        </div>
      </div>
    </div>);
}
