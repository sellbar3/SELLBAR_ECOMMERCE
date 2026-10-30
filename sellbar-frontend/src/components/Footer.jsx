'use client';
import Link from 'next/link';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';
export default function Footer() {
  return (<footer className="bg-[#f7f8f9] text-[#555555] border-t border-gray-200/80 text-[13px] mt-16 antialiased">
    {/* Main Footer Container */}
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 items-start">

        {/* Column 1: Brand Logo & Social Icons */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col space-y-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-10 h-10 rounded-full bg-[#2bbda3] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0">
              <svg className="w-5 h-5 text-white stroke-[3.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-[25px] font-black tracking-tight text-[#2bbda3]">
              SELLBAR
            </span>
          </Link>

          {/* Follow Us On */}
          <div className="pt-1">
            <p className="text-[13px] font-semibold text-[#444444] mb-3.5">
              Follow us on
            </p>

            {/* Circular Social Icons */}
            <div className="flex items-center gap-2.5">
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter (opens in a new tab)" className="w-8 h-8 rounded-full bg-[#54595f] hover:bg-[#2bbda3] text-white flex items-center justify-center transition-colors duration-200">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)" className="w-8 h-8 rounded-full bg-[#54595f] hover:bg-[#2bbda3] text-white flex items-center justify-center transition-colors duration-200">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="w-8 h-8 rounded-full bg-[#54595f] hover:bg-[#2bbda3] text-white flex items-center justify-center transition-colors duration-200">
                <svg className="w-3.5 h-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube (opens in a new tab)" className="w-8 h-8 rounded-full bg-[#54595f] hover:bg-[#2bbda3] text-white flex items-center justify-center transition-colors duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.782C18.254 4 12 4 12 4s-6.254 0-7.814.404a2.506 2.506 0 0 0-1.768 1.782C2 7.76 2 12 2 12s0 4.24.418 5.814a2.506 2.506 0 0 0 1.768 1.782C5.746 20 12 20 12 20s6.254 0 7.814-.404a2.506 2.506 0 0 0 1.768-1.782C22 16.24 22 12 22 12s0-4.24-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Services */}
        <div>
          <h4 className="text-[14px] font-semibold text-[#333333] mb-4">
            Services
          </h4>
          <ul className="space-y-2.5 text-[#555555]">
            <li>
              <Link href="/sell-old-mobile-phone" className="hover:text-[#2bbda3] transition-colors">
                Sell Phone
              </Link>
            </li>
            <li>
              <Link href="/sell-old-television" className="hover:text-[#2bbda3] transition-colors">
                Sell Television
              </Link>
            </li>
            <li>
              <Link href="/sell-old-smart-watch" className="hover:text-[#2bbda3] transition-colors">
                Sell Smart Watch
              </Link>
            </li>
            <li>
              <Link href="/sell-old-smart-speaker" className="hover:text-[#2bbda3] transition-colors">
                Sell Smart Speakers
              </Link>
            </li>
            <li>
              <Link href="/sell-old-dslr-camera" className="hover:text-[#2bbda3] transition-colors">
                Sell DSLR Camera
              </Link>
            </li>
            <li>
              <Link href="/sell-old-earbuds" className="hover:text-[#2bbda3] transition-colors">
                Sell Earbuds
              </Link>
            </li>
            <li>
              <Link href="/repair" className="hover:text-[#2bbda3] transition-colors">
                Repair Phone
              </Link>
            </li>
            <li>
              <Link href="/buy-refurbished-gadgets" className="hover:text-[#2bbda3] transition-colors">
                Buy Gadgets
              </Link>
            </li>
            <li>
              <Link href="/recycle-old-mobile-phone" className="hover:text-[#2bbda3] transition-colors">
                Recycle Phone
              </Link>
            </li>
            <li>
              <Link href="/find-new-phone" className="hover:text-[#2bbda3] transition-colors">
                Find New Phone
              </Link>
            </li>
            <li>
              <Link href="/partner-with-us" className="hover:text-[#2bbda3] transition-colors">
                Partner With Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="text-[14px] font-semibold text-[#333333] mb-4">
            Company
          </h4>
          <ul className="space-y-2.5 text-[#555555]">
            <li>
              <Link href="/about-us" className="hover:text-[#2bbda3] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-[#2bbda3] transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/articles" className="hover:text-[#2bbda3] transition-colors">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/press-releases" className="hover:text-[#2bbda3] transition-colors">
                Press Releases
              </Link>
            </li>
            <li>
              <Link href="/partner-with-us" className="hover:text-[#2bbda3] transition-colors">
                Become Cashify Partner
              </Link>
            </li>
            <li>
              <Link href="/supersale" className="hover:text-[#2bbda3] transition-colors">
                Become Supersale Partner
              </Link>
            </li>
            <li>
              <Link href="/corporate-information" className="hover:text-[#2bbda3] transition-colors">
                Corporate Information
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Sell Device */}
        <div>
          <h4 className="text-[14px] font-semibold text-[#333333] mb-4">
            Sell Device
          </h4>
          <ul className="space-y-2.5 text-[#555555]">
            <li>
              <Link href="/sell-old-mobile-phone" className="hover:text-[#2bbda3] transition-colors">
                Mobile Phone
              </Link>
            </li>
            <li>
              <Link href="/sell-old-laptop" className="hover:text-[#2bbda3] transition-colors">
                Laptop
              </Link>
            </li>
            <li>
              <Link href="/sell-old-tablet" className="hover:text-[#2bbda3] transition-colors">
                Tablet
              </Link>
            </li>
            <li>
              <Link href="/sell-old-imac" className="hover:text-[#2bbda3] transition-colors">
                iMac
              </Link>
            </li>
            <li>
              <Link href="/sell-old-gaming-consoles" className="hover:text-[#2bbda3] transition-colors">
                Gaming Consoles
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Help & Support */}
        <div>
          <h4 className="text-[14px] font-semibold text-[#333333] mb-4">
            Help &amp; Support
          </h4>
          <ul className="space-y-2.5 text-[#555555]">
            <li>
              <Link href="/faq" className="hover:text-[#2bbda3] transition-colors">
                FAQ
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
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 6: More Info & Chat With Us Badge */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h4 className="text-[14px] font-semibold text-[#333333] mb-4">
              More Info
            </h4>
            <ul className="space-y-2.5 text-[#555555]">
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
                <Link href="/terms-of-use" className="hover:text-[#2bbda3] transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/e-waste-policy" className="hover:text-[#2bbda3] transition-colors">
                  E-Waste Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-[#2bbda3] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/what-is-refurbished" className="hover:text-[#2bbda3] transition-colors">
                  What is Refurbished
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#2bbda3] transition-colors">
                  Sellbar Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Chat With Us Card / Widget */}
          <div className="mt-8 pt-2">
            <Link href="/contact" className="flex items-center gap-3.5 bg-[#2bbda3] hover:bg-[#24a991] text-white px-4 py-3 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 group">
              {/* Speech Bubble Icon Box */}
              <div className="w-9 h-9 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              {/* Text */}
              <div className="text-left">
                <div className="text-[14px] font-bold leading-tight">
                  Chat with Us
                </div>
                <div className="text-[11px] text-white/90 leading-tight mt-0.5 font-normal">
                  Got questions? Just ask.
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* Bottom Copyright & Trust Badges */}
        <div className="border-t border-gray-200/90 mt-10 pt-6 space-y-4">
          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2bbda3]" />
              <span>100% Safe Payments</span>
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#2bbda3]" />
              <span>Free Doorstep Pickup</span>
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2bbda3]" />
              <span>Verified Refurbished Tech</span>
            </span>
          </div>

          {/* Copyright & Creator Credit */}
          <div className="pt-4 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#666666]">
            <p className="text-center sm:text-left">
              &copy; 2026 <span className="font-semibold text-gray-800">Sellbar</span>. All rights reserved.
            </p>
            <p className="text-center sm:text-right">
              Created By{' '}
              <a
                href="https://maajankiwebtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-800 hover:text-[#2bbda3] transition-colors underline decoration-[#2bbda3]/40 underline-offset-2 hover:decoration-[#2bbda3]"
              >
                Maajanki Web Tech
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  </footer>);
}
