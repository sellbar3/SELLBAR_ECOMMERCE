"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Newspaper, Calendar, ArrowRight, ExternalLink, Download, Mail, Building, Award } from "lucide-react";

const CATEGORIES = ["All", "Corporate & Growth", "Refurbishment & Tech", "Sustainability"];

const RELEASES = [
  {
    id: 1,
    title: "Sellbar Expands Recommerce Doorstep Pickup Network to 40+ Indian Cities",
    date: "January 10, 2026",
    outlet: "Tech Wire India",
    category: "Corporate & Growth",
    desc: "With an expanded fleet of certified inspection executives, Sellbar now delivers same-day physical valuation and instant UPI payouts across tier-1 and tier-2 markets.",
  },
  {
    id: 2,
    title: "Sellbar Launches 32-Point Quality Lab for Refurbished MacBooks & Laptops",
    date: "November 24, 2025",
    outlet: "Business Standard",
    category: "Refurbishment & Tech",
    desc: "New automated diagnostic hardware benchmark testing delivers zero-defect refurbished laptops with comprehensive 12 months manufacturer-grade warranty.",
  },
  {
    id: 3,
    title: "Sellbar Partners with E-Waste Recyclers to Divert 10,000 Metric Tons of Gadget Waste",
    date: "September 15, 2025",
    outlet: "Green Tech Times",
    category: "Sustainability",
    desc: "A milestone commitment toward circular electronics and zero-landfill electronic disposal in compliance with Ministry of Environment (MoEFCC) guidelines.",
  },
  {
    id: 4,
    title: "Sellbar Crosses ₹10 Crore Milestone in Instant Customer Payouts",
    date: "July 28, 2025",
    outlet: "Economic Times Retail",
    category: "Corporate & Growth",
    desc: "Achieved via rapid expansion across Bihar, Uttar Pradesh, and Delhi NCR with under-15-minute doorstep gadget testing and zero-friction payouts.",
  }
];

export default function PressReleasesPage() {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = RELEASES.filter(r => activeCat === "All" || r.category === activeCat);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Newsroom &amp; Press Releases</span>
        </nav>

        {/* Newsroom Hero */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/30 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              Sellbar Press Room
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              News, Announcements &amp; Media Coverage
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Stay updated on company milestones, certified quality lab launches, sustainable circular recommerce initiatives, and executive announcements.
            </p>
          </div>
          <div className="shrink-0 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-2">
            <Mail className="w-6 h-6 text-[#2bbda3] mx-auto" />
            <div className="text-xs font-bold text-white">Press Desk</div>
            <a href="mailto:press@sellbar.in" className="text-xs text-[#2bbda3] underline font-semibold block">
              press@sellbar.in
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCat === cat
                  ? "bg-[#2bbda3] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Releases List */}
        <div className="space-y-4">
          {filtered.map((pr) => (
            <div key={pr.id} className="bg-white p-7 rounded-2xl border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    {pr.outlet}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#2bbda3] font-semibold text-[11px]">
                    {pr.category}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-gray-400">
                  <Calendar className="w-3.5 h-3.5" /> {pr.date}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">{pr.title}</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>

        {/* Media Resources / Press Kit */}
        <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-gray-900 text-base">Media Kit &amp; Brand Resources</h3>
            <p className="text-xs text-gray-500">Download official high-resolution logos, brand guidelines, and leadership photos.</p>
          </div>
          <a
            href="mailto:press@sellbar.in?subject=Requesting%20Sellbar%20Press%20Kit"
            className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-[#2bbda3] text-white text-xs font-semibold transition-colors flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" /> Request Press Kit
          </a>
        </div>
      </div>
    </div>
  );
}
