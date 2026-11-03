'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname() || '';

  // Do not render storefront footer within Admin or Vendor enterprise portals
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor')) {
    return null;
  }

  return (
    <footer className="bg-[#0b1329] text-slate-300 text-xs mt-20 antialiased border-t border-slate-800">
      {/* 1. Value Proposition & Trust Badges Strip */}
      <div className="border-b border-slate-800/80 bg-[#070d1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-[#2dd4bf] flex items-center justify-center shrink-0 border border-teal-500/20">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Free Express Shipping</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">West Champaran same-day &amp; Pan-India courier</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-[#2dd4bf] flex items-center justify-center shrink-0 border border-teal-500/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">6-12 Months Warranty</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Certified refurbished hardware assurance</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-[#2dd4bf] flex items-center justify-center shrink-0 border border-teal-500/20">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">7-Day Easy Returns</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Replacement or 100% money-back guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-[#2dd4bf] flex items-center justify-center shrink-0 border border-teal-500/20">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">32-Point Quality Audit</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Tested by certified electronics engineers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-start">
          
          {/* Column 1: Brand & Socials */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-2xl bg-[#13b59b] flex items-center justify-center text-white font-black text-sm shadow-xs">
                S
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                SELLBAR
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bihar&apos;s leading recommerce platform for selling old smartphones at instant value and buying certified refurbished gadgets.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Follow us on
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#13b59b] text-white flex items-center justify-center transition"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#13b59b] text-white flex items-center justify-center transition"
                >
                  <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#13b59b] text-white flex items-center justify-center transition"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#13b59b] text-white flex items-center justify-center transition"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.782C18.254 4 12 4 12 4s-6.254 0-7.814.404a2.506 2.506 0 0 0-1.768 1.782C2 7.76 2 12 2 12s0 4.24.418 5.814a2.506 2.506 0 0 0 1.768 1.782C5.746 20 12 20 12 20s6.254 0 7.814-.404a2.506 2.506 0 0 0 1.768-1.782C22 16.24 22 12 22 12s0-4.24-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/sell-old-mobile-phone" className="hover:text-[#2dd4bf] transition">Sell Phone</Link></li>
              <li><Link href="/sell-old-television" className="hover:text-[#2dd4bf] transition">Sell Television</Link></li>
              <li><Link href="/sell-old-smart-watch" className="hover:text-[#2dd4bf] transition">Sell Smart Watch</Link></li>
              <li><Link href="/sell-old-smart-speaker" className="hover:text-[#2dd4bf] transition">Sell Smart Speakers</Link></li>
              <li><Link href="/sell-old-dslr-camera" className="hover:text-[#2dd4bf] transition">Sell DSLR Camera</Link></li>
              <li><Link href="/sell-old-earbuds" className="hover:text-[#2dd4bf] transition">Sell Earbuds</Link></li>
              <li><Link href="/repair" className="hover:text-[#2dd4bf] transition">Repair Phone</Link></li>
              <li><Link href="/buy-refurbished-gadgets" className="hover:text-[#2dd4bf] transition">Buy Gadgets</Link></li>
              <li><Link href="/recycle-old-mobile-phone" className="hover:text-[#2dd4bf] transition">Recycle Phone</Link></li>
              <li><Link href="/find-new-phone" className="hover:text-[#2dd4bf] transition">Find New Phone</Link></li>
              <li><Link href="/partner-with-us" className="hover:text-[#2dd4bf] transition">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about-us" className="hover:text-[#2dd4bf] transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#2dd4bf] transition">Careers</Link></li>
              <li><Link href="/articles" className="hover:text-[#2dd4bf] transition">Articles</Link></li>
              <li><Link href="/press-releases" className="hover:text-[#2dd4bf] transition">Press Releases</Link></li>
              <li><Link href="/partner-with-us" className="hover:text-[#2dd4bf] transition">Become Sellbar Partner</Link></li>
              <li><Link href="/supersale" className="hover:text-[#2dd4bf] transition">Become Supersale Partner</Link></li>
              <li><Link href="/corporate-information" className="hover:text-[#2dd4bf] transition">Corporate Information</Link></li>
            </ul>
          </div>

          {/* Column 4: Sell Device */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Sell Device
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/sell-old-mobile-phone" className="hover:text-[#2dd4bf] transition">Mobile Phone</Link></li>
              <li><Link href="/sell-old-laptop" className="hover:text-[#2dd4bf] transition">Laptop</Link></li>
              <li><Link href="/sell-old-tablet" className="hover:text-[#2dd4bf] transition">Tablet</Link></li>
              <li><Link href="/sell-old-imac" className="hover:text-[#2dd4bf] transition">iMac</Link></li>
              <li><Link href="/sell-old-gaming-consoles" className="hover:text-[#2dd4bf] transition">Gaming Consoles</Link></li>
            </ul>
          </div>

          {/* Column 5: Help & Support */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
              Help &amp; Support
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/faq" className="hover:text-[#2dd4bf] transition">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-[#2dd4bf] transition">Contact Us</Link></li>
              <li><Link href="/warranty-policy" className="hover:text-[#2dd4bf] transition">Warranty Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[#2dd4bf] transition">Refund Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#2dd4bf] transition">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Column 6: More Info & Support Widget */}
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">
                More Info
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/terms-conditions" className="hover:text-[#2dd4bf] transition">Terms &amp; Conditions</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-[#2dd4bf] transition">Privacy Policy</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-[#2dd4bf] transition">Terms of Use</Link></li>
                <li><Link href="/e-waste-policy" className="hover:text-[#2dd4bf] transition">E-Waste Policy</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-[#2dd4bf] transition">Cookie Policy</Link></li>
                <li><Link href="/what-is-refurbished" className="hover:text-[#2dd4bf] transition">What is Refurbished</Link></li>
                <li><Link href="/about" className="hover:text-[#2dd4bf] transition">Sellbar Community</Link></li>
              </ul>
            </div>

            {/* Support Box */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center gap-2 text-[#2dd4bf] font-bold text-xs">
                <PhoneCall size={14} /> Need Help?
              </div>
              <p className="text-[11px] text-slate-300 mt-1 font-semibold">
                +91 98765 43210
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                10:00 AM - 7:00 PM (Mon - Sat)
              </p>
              <Link
                href="/contact"
                className="mt-3 block text-center py-1.5 px-3 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-[11px] font-bold transition shadow-xs"
              >
                Chat with Us
              </Link>
            </div>
          </div>

        </div>

        {/* 3. Bottom Copyright & Credits */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            &copy; 2026 <strong className="text-white font-bold">Sellbar Recommerce Pvt Ltd</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Crafted with care in West Champaran, Bihar</span>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy</Link>
            <span>•</span>
            <Link href="/terms-conditions" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
