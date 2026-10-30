import React from "react";
import Link from "next/link";
import { Handshake, Store, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Partner With Us | Become a Sellbar Partner",
  description: "Grow your retail or refurbishment business by joining the Sellbar multi-vendor and franchise network.",
};

export default function PartnerWithUsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Partner With Us</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#2bbda3]/20 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              B2B &amp; Merchant Partnerships
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Grow Your Business with India&apos;s Fastest Recommerce Brand
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Whether you are an authorized refurbished hardware merchant, mobile retailer, or corporate looking to liquidate employee IT assets, Sellbar provides seamless liquidity, catalog reach, and trust.
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <Link
              href="/vendor/login"
              className="px-6 py-3.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-semibold text-sm transition-colors text-center shadow-lg"
            >
              Vendor Partner Portal
            </Link>
            <a
              href="mailto:partners@sellbar.in"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors text-center"
            >
              Corporate Inquiries
            </a>
          </div>
        </div>

        {/* Partnership Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Marketplace Vendor</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              List certified refurbished smartphones, laptops, and tablets on Sellbar. Gain instant access to thousands of verified buyers with automated settlements.
            </p>
            <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> T+2 Bank Settlements</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> Integrated Logistics &amp; Shipping</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Supersale Merchant</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Buy wholesale lots of tested refurbished smartphones and laptops in bulk for your offline retail store or regional distribution.
            </p>
            <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> Competitive Bulk Wholesale Rates</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> 32-Point Quality Certified Batches</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Corporate IT Buyback</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Liquidate end-of-lifecycle company laptops, MacBooks, and monitors with enterprise-grade data wiping certificates (NIST 800-88 compliant).
            </p>
            <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> Certified Data Erasure Reports</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#2bbda3]" /> Pan-India On-Site Collection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
