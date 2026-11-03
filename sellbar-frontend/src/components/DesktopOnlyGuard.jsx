'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Laptop,
  AlertTriangle,
  RotateCcw,
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

/**
 * DesktopOnlyGuard:
 * Restricts Admin & Vendor Dashboards so they NEVER open on mobile viewports (< 1024px).
 * Requires desktop screen or "Desktop site" mode in mobile browser.
 */
export default function DesktopOnlyGuard({ children, portalTitle = 'Management Portal' }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const [viewportHeight, setViewportHeight] = useState(800);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkViewport = () => {
      if (typeof window !== 'undefined') {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setViewportWidth(w);
        setViewportHeight(h);
        // Requires desktop width (>= 1024px)
        setIsDesktop(w >= 1024);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    window.addEventListener('orientationchange', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('orientationchange', checkViewport);
    };
  }, []);

  // Avoid SSR hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center p-6 font-sans">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span>Verifying Display Hardware...</span>
        </div>
      </div>
    );
  }

  // If viewport is smaller than desktop (mobile or small portrait tablet)
  if (!isDesktop) {
    const progressPercent = Math.min(100, Math.round((viewportWidth / 1024) * 100));

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white flex flex-col justify-between p-4 sm:p-6 font-sans antialiased selection:bg-[#13b59b] selection:text-white">
        {/* Top Header Bar */}
        <header className="max-w-xl mx-auto w-full flex items-center justify-between py-3 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-white">
              SELL<span className="text-[#13b59b]">BAR</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-md text-teal-300 border border-white/10">
              Enterprise
            </span>
          </Link>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Shield size={12} /> Restricted
          </span>
        </header>

        {/* Center Main Card */}
        <main className="max-w-xl mx-auto w-full my-auto py-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Visual Icon Header */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-teal-500/20 to-emerald-500/20 border border-teal-400/30 flex items-center justify-center text-[#2dd4bf] shadow-inner">
                  <Monitor size={42} />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-rose-500 border-2 border-slate-900 flex items-center justify-center text-white shadow-md">
                  <Smartphone size={16} />
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Desktop Mode Required
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Desktop Screen Zaroori Hai
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                Sellbar <strong className="text-white font-semibold">{portalTitle}</strong> dense financial analytics, multi-column inventory tables, price revision workflows aur order dispatch engines ke liye bana hai jo mobile touchscreen par operate nahi ho sakte.
              </p>
            </div>

            {/* Resolution Meter */}
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">Current Viewport Width:</span>
                <span className="font-mono font-bold text-rose-400">{viewportWidth}px</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>0px</span>
                <span className="text-teal-400 font-bold">Minimum 1024px Required</span>
                <span>1920px</span>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="bg-teal-950/40 rounded-2xl p-4 border border-teal-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-xs">
                <Sparkles size={14} />
                <span>Mobile Browser Me Kaise Kholein (Desktop Site):</span>
              </div>
              <ol className="text-[11px] text-slate-300 space-y-1.5 list-decimal pl-4 font-medium leading-snug">
                <li>
                  Apne mobile browser ka menu tap karein (Chrome me top-right <strong className="text-white">⋮</strong> 3-dots, Safari me address bar me <strong className="text-white">aA</strong>).
                </li>
                <li>
                  <strong className="text-teal-300">&quot;Desktop site&quot;</strong> ya <strong className="text-teal-300">&quot;Request Desktop Website&quot;</strong> checkbox ko ON karein.
                </li>
                <li>
                  Page automatically reload hoga aur Dashboard unlock ho jayega!
                </li>
              </ol>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    setViewportWidth(window.innerWidth);
                    setViewportHeight(window.innerHeight);
                    setIsDesktop(window.innerWidth >= 1024);
                  }
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-[#13b59b] hover:bg-[#0fa088] active:scale-[0.98] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 cursor-pointer"
              >
                <RotateCcw size={14} /> Re-check Screen Resolution
              </button>

              <Link
                href="/"
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition text-center flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back to Storefront
              </Link>
            </div>
          </div>
        </main>

        {/* Bottom Footer Note */}
        <footer className="max-w-xl mx-auto w-full text-center py-3 text-[11px] text-slate-500 border-t border-white/5">
          Sellbar Technologies Security Policy • Workstation Display Rule v2.4
        </footer>
      </div>
    );
  }

  // Viewport is >= 1024px: Render Dashboard normally
  return <>{children}</>;
}
