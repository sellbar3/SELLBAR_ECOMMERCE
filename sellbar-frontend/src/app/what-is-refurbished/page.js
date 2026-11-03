"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Cpu, 
  BatteryCharging, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Camera, 
  Wifi, 
  Smartphone, 
  Scale, 
  Layers, 
  HelpCircle,
  Truck,
  RotateCcw,
  BadgeIndianRupee
} from "lucide-react";

const LAB_STATIONS = [
  {
    id: "display",
    title: "1. OLED & Touch Panel",
    icon: Smartphone,
    tests: [
      "Dead pixel & white spot digital spectrum analysis",
      "Touch digitizer latency & ghost touch check",
      "TrueTone calibration & 60Hz/120Hz refresh test",
      "Polarizer & oleophobic coating scratch check"
    ]
  },
  {
    id: "battery",
    title: "2. Battery & Thermals",
    icon: BatteryCharging,
    tests: [
      "OEM charging cycle count verification (<500 cycles)",
      "Guaranteed minimum 80% to 95% battery health",
      "Fast charging IC protocol & reverse charge test",
      "Thermal stress test under heavy 4K video load"
    ]
  },
  {
    id: "logic",
    title: "3. Motherboard & Chipset",
    icon: Cpu,
    tests: [
      "Geekbench CPU & GPU benchmark validation",
      "RAM & NVMe flash read/write speed benchmark",
      "Liquid Contact Indicator (LCI) inspection",
      "Power management IC short-circuit diagnosis"
    ]
  },
  {
    id: "cameras",
    title: "4. Optics & Sensors",
    icon: Camera,
    tests: [
      "Optical Image Stabilization (OIS) gyro test",
      "Main, ultra-wide & telephoto sensor clarity",
      "FaceID / TouchID biometric secure enclave test",
      "Ambient light, proximity & gyroscope sensors"
    ]
  },
  {
    id: "connectivity",
    title: "5. Wireless & Calling",
    icon: Wifi,
    tests: [
      "5G & 4G LTE dual-SIM network band reception",
      "Wi-Fi 6 & Bluetooth 5.3 range testing",
      "Stereo loudspeaker decibel & audio clarity",
      "Noise-cancelling microphone array check"
    ]
  },
  {
    id: "sanitization",
    title: "6. Data Wipe & Polish",
    icon: ShieldCheck,
    tests: [
      "DoD 5220.22-M military-grade permanent data erase",
      "iCloud / Google FRP account locks unlinked",
      "Hospital-grade UV sterilization & acoustic clean",
      "Tamper-proof holographic warranty seal applied"
    ]
  }
];

const GRADES = [
  {
    id: "flawless",
    name: "Grade A+ (Flawless)",
    badge: "Like New",
    screen: "100% spotless. No scratches, micro-marks or blemishes.",
    body: "Mint chassis. Indistinguishable from brand-new retail unit.",
    battery: "90% - 100% Original Battery Health.",
    savings: "Save 30% - 40% vs Retail MRP",
    warranty: "12 Months Comprehensive Sellbar Assured Warranty"
  },
  {
    id: "very-good",
    name: "Grade A (Very Good)",
    badge: "Most Popular",
    screen: "Spotless screen. Zero visible marks during normal use.",
    body: "1-2 microscopic marks on frame barely visible from 12 inches.",
    battery: "85% - 92% Original Battery Health.",
    savings: "Save 40% - 55% vs Retail MRP",
    warranty: "12 Months Comprehensive Sellbar Assured Warranty"
  },
  {
    id: "good",
    name: "Grade B (Fair Value)",
    badge: "Maximum Savings",
    screen: "100% functionally sound. Minor micro-scratches on glass.",
    body: "Light cosmetic signs of gentle previous usage.",
    battery: "80% - 85% Guaranteed Battery Health.",
    savings: "Save 55% - 70% vs Retail MRP",
    warranty: "6 Months Comprehensive Sellbar Assured Warranty"
  }
];

export default function WhatIsRefurbishedPage() {
  const [activeStation, setActiveStation] = useState(LAB_STATIONS[0]);
  const [activeGrade, setActiveGrade] = useState(GRADES[0]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Refurbished Standard</span>
        </nav>

        {/* Hero */}
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/40 text-[#2bbda3] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Certified Quality Engineering
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              What Does &ldquo;Sellbar Certified Refurbished&rdquo; Really Mean?
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Refurbished is <strong>not</strong> second-hand. It is factory-tested, component-certified, and rigorously restored electronics backed by a 12-month warranty — delivering flagship performance at up to 70% less.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/buy-refurbished"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg flex items-center gap-2"
              >
                Shop Certified Refurbished <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#inspection-lab"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Explore 32-Point Lab Tests
              </a>
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#2bbda3]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* 3-Way Comparison Table (Brand New vs Refurbished vs Random Used) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Clear Distinction</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Refurbished vs Brand New vs Unverified Used</h2>
            <p className="text-xs text-slate-500 mt-1">See why certified recommerce is the smartest way to buy flagship hardware.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-3.5 font-bold text-slate-900 rounded-l-xl">Feature</th>
                  <th className="p-3.5 font-bold text-[#2bbda3] bg-teal-50/50 border-x border-teal-100">
                    Sellbar Certified Refurbished
                  </th>
                  <th className="p-3.5 font-bold text-slate-700">Brand New (Retail)</th>
                  <th className="p-3.5 font-bold text-slate-500 rounded-r-xl">Unverified Second-Hand (OLX / Local)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3.5 font-semibold text-slate-800">Price &amp; Savings</td>
                  <td className="p-3.5 font-bold text-emerald-700 bg-teal-50/30 border-x border-teal-100">
                    30% to 70% Off Retail MRP
                  </td>
                  <td className="p-3.5 text-slate-600">Full 100% Retail Price</td>
                  <td className="p-3.5 text-slate-600">Variable / Unpredictable</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-800">Hardware Testing</td>
                  <td className="p-3.5 text-slate-900 bg-teal-50/30 border-x border-teal-100 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2bbda3]" /> 32-Point Quality Lab Diagnostic
                  </td>
                  <td className="p-3.5 text-slate-600">Factory sealed</td>
                  <td className="p-3.5 text-rose-600 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" /> Zero Testing / High Risk
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-800">Warranty Protection</td>
                  <td className="p-3.5 text-slate-900 bg-teal-50/30 border-x border-teal-100 font-semibold">
                    Up to 12 Months Comprehensive
                  </td>
                  <td className="p-3.5 text-slate-600">12 Months Brand Warranty</td>
                  <td className="p-3.5 text-rose-600 font-medium">None / Expired</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-800">Return &amp; Replacement</td>
                  <td className="p-3.5 text-slate-900 bg-teal-50/30 border-x border-teal-100 font-semibold">
                    7 Days Hassle-Free Doorstep
                  </td>
                  <td className="p-3.5 text-slate-600">Limited to Service Center visit</td>
                  <td className="p-3.5 text-rose-600 font-medium">No Returns (Cash &amp; Gone)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-800">Battery Health</td>
                  <td className="p-3.5 text-slate-900 bg-teal-50/30 border-x border-teal-100 font-semibold">
                    Guaranteed &gt;80% to 98% Health
                  </td>
                  <td className="p-3.5 text-slate-600">100% Brand New</td>
                  <td className="p-3.5 text-slate-500">Often Degraded (&lt;70%)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-slate-800">Data Sanitization</td>
                  <td className="p-3.5 text-slate-900 bg-teal-50/30 border-x border-teal-100 font-semibold">
                    DoD 5220.22-M Permanent Erase
                  </td>
                  <td className="p-3.5 text-slate-600">Fresh Factory State</td>
                  <td className="p-3.5 text-rose-600 font-medium">Risk of Hidden iCloud / FRP Locks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive 32-Point Quality Lab Inspector */}
        <div id="inspection-lab" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Engineering Rigor</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">The 32-Point Diagnostic Lab Workflow</h2>
              <p className="text-xs text-slate-500 mt-0.5">Click each station to see the exact hardware benchmark tests performed</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-[#2bbda3] rounded-xl text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> ISO 9001 Certified Diagnostic Facility
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Station Tabs */}
            <div className="space-y-2">
              {LAB_STATIONS.map((station) => {
                const isSelected = activeStation.id === station.id;
                const Icon = station.icon;
                return (
                  <button
                    key={station.id}
                    onClick={() => setActiveStation(station)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-[#2bbda3] text-white border-[#2bbda3] shadow-md shadow-teal-500/20"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-white/20 text-white" : "bg-white text-slate-600"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold">{station.title}</span>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Test Checks */}
            <div className="lg:col-span-2 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2bbda3] text-white flex items-center justify-center">
                  <activeStation.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{activeStation.title}</h3>
                  <p className="text-xs text-slate-500">Automated diagnostic bench inspection parameters</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeStation.tests.map((t, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-start gap-2.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#2bbda3] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Grading Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Transparent Grading</span>
            <h2 className="text-2xl font-bold text-slate-900">Choose the Condition That Fits Your Budget</h2>
            <p className="text-xs text-slate-500">Every grade is 100% functionally perfect. Only cosmetic appearance varies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GRADES.map((grade) => {
              const isSelected = activeGrade.id === grade.id;
              return (
                <div
                  key={grade.id}
                  onClick={() => setActiveGrade(grade)}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-[#2bbda3] bg-teal-50/30 ring-2 ring-[#2bbda3] shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2bbda3] text-white">
                        {grade.badge}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">{grade.savings}</span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900">{grade.name}</h3>
                    
                    <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Screen Glass:</strong>
                        <span>{grade.screen}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Body &amp; Frame:</strong>
                        <span>{grade.body}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Battery Capacity:</strong>
                        <span>{grade.battery}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2bbda3]" />
                    <span>{grade.warranty}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What Comes in the Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Unboxing Experience</span>
            <h3 className="text-2xl sm:text-3xl font-black">What&apos;s Inside Every Sellbar Box?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every refurbished phone is shipped in a custom Sellbar Assured shock-proof eco-box with tamper-evident seal, brand-certified fast charging cable, SIM ejector pin, and official GST warranty invoice.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/buy-refurbished"
              className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg text-center"
            >
              Explore Refurbished Catalog
            </Link>
            <Link
              href="/warranty-policy"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors text-center"
            >
              Read Warranty Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
