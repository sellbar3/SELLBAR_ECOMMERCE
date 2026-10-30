import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Truck, CheckCircle2, Users, Sparkles, PhoneCall } from "lucide-react";

export const metadata = {
  title: "About Us | Sellbar.in - India's Trusted Recommerce Platform",
  description: "Learn about Sellbar's mission to make premium electronics affordable through certified refurbishment and instant doorstep buyback.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">About Us</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#2bbda3] to-[#13b59b] rounded-3xl p-8 sm:p-14 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wider uppercase mb-4">
              India&apos;s Smart Recommerce Platform
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Sell Smart. Buy Better. Live Tech-Forward.
            </h1>
            <p className="mt-4 text-emerald-50 text-base sm:text-lg leading-relaxed">
              Sellbar is bridging the gap between high-priced flagship tech and budget-conscious consumers through certified refurbished gadgets and frictionless device buybacks.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12 pointer-events-none">
            <Sparkles className="w-96 h-96" />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2bbda3]">50,000+</div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1">Devices Refurbished</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2bbda3]">32 Points</div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1">Rigorous Inspection</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2bbda3]">12 Months</div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1">Comprehensive Warranty</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#2bbda3]">₹10 Cr+</div>
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1">Instant Payouts Delivered</div>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Customers Trust Sellbar</h2>
            <p className="text-sm text-gray-500 mt-2">Every gadget is verified by tech specialists before delivery or resale</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">32-Point Quality Lab</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                From motherboard thermal performance to battery cycles, biometric sensors, and OLED color calibration, every device is rigorously certified.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Free Doorstep Pickup</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No need to bargain with shady local shops. Our certified representative comes to your home or office, runs a 10-minute diagnostic, and transfers instant cash.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Risk-Free Ownership</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Enjoy 7-day hassle-free replacements and up to 12 months comprehensive warranty backed by certified technicians and genuine components.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Ready to Upgrade or Sell Your Tech?</h3>
            <p className="text-gray-400 text-sm mt-1">Get an instant quote for your phone or browse our verified refurbished deals.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sell"
              className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-semibold text-sm transition-colors shadow-md"
            >
              Sell My Device
            </Link>
            <Link
              href="/buy-refurbished"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
            >
              Explore Refurbished Tech
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
