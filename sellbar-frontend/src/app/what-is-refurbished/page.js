import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Award, ShieldCheck, Cpu, BatteryCharging, ArrowRight } from "lucide-react";

export const metadata = {
  title: "What is Refurbished? | Complete Guide to Certified Tech | Sellbar.in",
  description: "Learn what certified refurbished electronics are, how Sellbar tests devices across 32 points, and how it differs from second-hand.",
};

export default function WhatIsRefurbishedPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">What is Refurbished?</span>
        </nav>

        {/* Hero */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
            Consumer Tech Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            What Does &quot;Certified Refurbished&quot; Really Mean?
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Many shoppers confuse <strong>refurbished</strong> with simple &quot;second-hand&quot; or &quot;used&quot;. In reality, certified refurbished devices from Sellbar are professionally tested, graded, and restored to perform like brand-new hardware at up to 70% off retail pricing.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Sellbar Certified Refurbished vs Random Used Gadget</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 font-semibold text-gray-900">Feature</th>
                  <th className="border border-gray-200 p-3 font-semibold text-[#2bbda3]">Sellbar Certified Refurbished</th>
                  <th className="border border-gray-200 p-3 font-semibold text-gray-500">Unverified Used / OLX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Diagnostic Testing</td>
                  <td className="border border-gray-200 p-3 text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2bbda3]" /> 32-Point Lab Diagnostic
                  </td>
                  <td className="border border-gray-200 p-3 text-red-600 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400" /> None / Risky
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Warranty Coverage</td>
                  <td className="border border-gray-200 p-3 text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2bbda3]" /> Up to 12 Months Warranty
                  </td>
                  <td className="border border-gray-200 p-3 text-red-600 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400" /> Zero Warranty
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Return Window</td>
                  <td className="border border-gray-200 p-3 text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2bbda3]" /> 7-Day Hassle-Free Replacement
                  </td>
                  <td className="border border-gray-200 p-3 text-red-600 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400" /> No Returns Accepted
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Battery Health</td>
                  <td className="border border-gray-200 p-3 text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2bbda3]" /> Certified &gt; 80% Health
                  </td>
                  <td className="border border-gray-200 p-3 text-red-600 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400" /> Unknown / Degraded
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">Data Sanitization</td>
                  <td className="border border-gray-200 p-3 text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2bbda3]" /> 100% Military Grade Wipe
                  </td>
                  <td className="border border-gray-200 p-3 text-red-600 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400" /> Potential iCloud/Google Lock
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 32-Point Quality Lab Highlight */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-white space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2bbda3] flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">The Sellbar 32-Point Quality Checklist</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Our certified engineers run automated and hardware benchmark tests on every incoming device before classifying it into one of our transparent grades:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <strong className="text-white block mb-1">Display &amp; Touch</strong>
              OLED touch responsiveness, dead pixel scan, TrueTone &amp; backlight uniformity.
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <strong className="text-white block mb-1">Battery &amp; Charging</strong>
              Battery charging cycles, health percentage (&gt;80%), thermal dissipation.
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <strong className="text-white block mb-1">Cameras &amp; Sensors</strong>
              Main, ultra-wide &amp; selfie autofocus, optical image stabilization, LiDAR.
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <strong className="text-white block mb-1">Connectivity &amp; Audio</strong>
              Dual SIM/eSIM, 5G/4G bands, Wi-Fi 6, Bluetooth, stereo speakers &amp; mics.
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/buy-refurbished"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-semibold text-sm transition-colors shadow-lg"
            >
              Browse Certified Refurbished Gadgets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
