'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Truck,
  RotateCcw,
  MessageSquare,
  Mail,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f7f9fa] text-[#4b5563] border-t border-gray-200 mt-16 text-[13px] antialiased">
      {/* 1. TOP TRUST HIGHLIGHTS BAR */}
      <div className="border-b border-gray-200/80 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#2bbda3]/10 border border-[#2bbda3]/20 flex items-center justify-center shrink-0 text-[#2bbda3]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm leading-snug">32-Step Quality Lab</h4>
                <p className="text-xs text-gray-500 mt-0.5">Rigorous hardware diagnostics</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm leading-snug">Instant Doorstep Cash</h4>
                <p className="text-xs text-gray-500 mt-0.5">Direct UPI or bank transfer</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0 text-indigo-600">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm leading-snug">Free Home Pickup</h4>
                <p className="text-xs text-gray-500 mt-0.5">Verified pickup technicians</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm leading-snug">Up to 12M Warranty</h4>
                <p className="text-xs text-gray-500 mt-0.5">15-day hassle-free replacement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER LINKS CONTAINER */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info & Chat With Us (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group w-fit">
                <div className="w-10 h-10 rounded-full bg-[#2bbda3] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0">
                  <svg
                    className="w-5 h-5 text-white stroke-[3.2]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-[26px] font-black tracking-tight text-[#2bbda3]">
                  SELLBAR
                </span>
              </Link>

              {/* Tagline */}
              <p className="mt-3.5 text-xs text-gray-600 leading-relaxed max-w-sm">
                India&apos;s leading tech re-commerce destination. Sell old gadgets for instant cash, buy certified refurbished devices with warranty, and book convenient doorstep repairs.
              </p>
            </div>

            {/* Quick Contact & Chat Card */}
            <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs space-y-3 max-w-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Customer Support
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Now
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#2bbda3] shrink-0" />
                  <span>support@sellbar.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#2bbda3] shrink-0" />
                  <span>10:00 AM – 7:00 PM (All 7 Days)</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 w-full bg-[#2bbda3] hover:bg-[#23a58c] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs group"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with Us</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter (opens in a new tab)"
                  className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-[#2bbda3] text-gray-700 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook (opens in a new tab)"
                  className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-[#2bbda3] text-gray-700 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (opens in a new tab)"
                  className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-[#2bbda3] text-gray-700 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube (opens in a new tab)"
                  className="w-8 h-8 rounded-full bg-gray-200/80 hover:bg-[#2bbda3] text-gray-700 hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.782C18.254 4 12 4 12 4s-6.254 0-7.814.404a2.506 2.506 0 0 0-1.768 1.782C2 7.76 2 12 2 12s0 4.24.418 5.814a2.506 2.506 0 0 0 1.768 1.782C5.746 20 12 20 12 20s6.254 0 7.814-.404a2.506 2.506 0 0 0 1.768-1.782C22 16.24 22 12 22 12s0-4.24-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Sell Devices (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Sell Device
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/sell" className="hover:text-[#2bbda3] transition-colors">
                  Sell Phone
                </Link>
              </li>
              <li>
                <Link href="/sell/laptops" className="hover:text-[#2bbda3] transition-colors">
                  Sell Laptop
                </Link>
              </li>
              <li>
                <Link href="/sell/tablets" className="hover:text-[#2bbda3] transition-colors">
                  Sell Tablet
                </Link>
              </li>
              <li>
                <Link href="/sell-old-smart-watch" className="hover:text-[#2bbda3] transition-colors">
                  Sell Smartwatch
                </Link>
              </li>
              <li>
                <Link href="/sell-old-television" className="hover:text-[#2bbda3] transition-colors">
                  Sell Television
                </Link>
              </li>
              <li>
                <Link href="/sell-old-gaming-consoles" className="hover:text-[#2bbda3] transition-colors">
                  Sell Gaming Consoles
                </Link>
              </li>
              <li>
                <Link href="/sell-old-dslr-camera" className="hover:text-[#2bbda3] transition-colors">
                  Sell DSLR Camera
                </Link>
              </li>
              <li>
                <Link href="/sell-old-smart-speaker" className="hover:text-[#2bbda3] transition-colors">
                  Sell Smart Speaker
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Buy Refurbished (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Buy Refurbished
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/buy-refurbished" className="hover:text-[#2bbda3] transition-colors">
                  Refurbished Phones
                </Link>
              </li>
              <li>
                <Link href="/buy-refurbished-gadgets" className="hover:text-[#2bbda3] transition-colors">
                  Refurbished Laptops
                </Link>
              </li>
              <li>
                <Link href="/buy-refurbished-gadgets" className="hover:text-[#2bbda3] transition-colors">
                  Refurbished Tablets
                </Link>
              </li>
              <li>
                <Link href="/buy-refurbished-gadgets" className="hover:text-[#2bbda3] transition-colors">
                  Refurbished Watches
                </Link>
              </li>
              <li>
                <Link href="/buy-refurbished-gadgets" className="hover:text-[#2bbda3] transition-colors">
                  Gaming Consoles
                </Link>
              </li>
              <li>
                <Link href="/what-is-refurbished" className="hover:text-[#2bbda3] transition-colors">
                  What is Refurbished?
                </Link>
              </li>
              <li>
                <Link href="/buy-refurbished" className="text-[#2bbda3] font-semibold hover:underline">
                  View All Deals &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Services & Company (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/about" className="hover:text-[#2bbda3] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-[#2bbda3] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-[#2bbda3] transition-colors">
                  Articles &amp; News
                </Link>
              </li>
              <li>
                <Link href="/press-releases" className="hover:text-[#2bbda3] transition-colors">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link href="/partner-with-us" className="hover:text-[#2bbda3] transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/supersale" className="hover:text-[#2bbda3] transition-colors">
                  Supersale Partner
                </Link>
              </li>
              <li>
                <Link href="/recycle-old-mobile-phone" className="hover:text-[#2bbda3] transition-colors">
                  Recycle Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Help & Policies (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Help &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link href="/faq" className="hover:text-[#2bbda3] transition-colors">
                  FAQ &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2bbda3] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/warranty-policy" className="hover:text-[#2bbda3] transition-colors">
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#2bbda3] transition-colors">
                  Refund &amp; Returns
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-[#2bbda3] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#2bbda3] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/e-waste-policy" className="hover:text-[#2bbda3] transition-colors">
                  E-Waste Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. STRICTLY 1-ROW COPYRIGHT SECTION */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex items-center justify-center text-center text-xs text-gray-500">
          <p className="m-0 whitespace-nowrap">
            &copy; 2026 <strong className="font-semibold text-gray-800">Sellbar</strong>. Created By{' '}
            <a
              href="https://maajankiwebtech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-800 hover:text-[#2bbda3] transition-colors underline decoration-[#2bbda3]/40 underline-offset-2 hover:decoration-[#2bbda3]"
            >
              Maajanki Web Tech
            </a>
            . All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
