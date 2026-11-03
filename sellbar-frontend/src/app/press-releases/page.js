"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Newspaper, Calendar, ArrowRight, ExternalLink, Download, Mail, Building, Award, Sparkles } from "lucide-react";

const CATEGORIES = ["All", "Corporate Milestones", "Quality Lab & Engineering", "Sustainability"];

const RELEASES = [
  {
    id: 1,
    title: "Sellbar Expands Recommerce Doorstep Pickup Network to 40+ Indian Cities",
    date: "January 10, 2026",
    outlet: "Tech Wire India",
    category: "Corporate Milestones",
    desc: "With an expanded fleet of certified inspection executives, Sellbar now delivers same-day physical valuation and instant UPI payouts across tier-1 and tier-2 markets.",
  },
  {
    id: 2,
    title: "Sellbar Launches 32-Point Quality Lab for Refurbished MacBooks & Laptops",
    date: "November 24, 2025",
    outlet: "Business Standard",
    category: "Quality Lab & Engineering",
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
    title: "Sellbar Crosses ₹10 Crore Milestone in Instant Customer Doorstep Payouts",
    date: "July 28, 2025",
    outlet: "Economic Times Retail",
    category: "Corporate Milestones",
    desc: "Achieved via rapid expansion across Bihar, Uttar Pradesh, and Delhi NCR with under-15-minute doorstep gadget testing and zero-friction payouts.",
  }
];

export default function PressReleasesPage() {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = RELEASES.filter(r => activeCat === "All" || r.category === activeCat);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Press &amp; Media Room</span>
        </nav>

        {/* Hero */}
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/40 text-[#2bbda3] text-xs font-bold tracking-wider uppercase">
              <Newspaper className="w-3.5 h-3.5" /> Official Newsroom
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              News, Announcements &amp; Media Coverage
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Official press announcements, growth milestones, circular recommerce initiatives, and media kits from Sellbar Technologies India.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center space-y-2 w-full md:w-auto">
            <Mail className="w-6 h-6 text-[#2bbda3] mx-auto" />
            <div className="text-xs font-bold text-white">Press &amp; Media Desk</div>
            <a href="mailto:press@sellbar.in" className="text-xs text-[#2bbda3] font-semibold underline block">
              press@sellbar.in
            </a>
            <div className="text-[11px] text-slate-400">Response within 2 business hours</div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#2bbda3]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCat === cat
                  ? "bg-[#2bbda3] text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Releases List */}
        <div className="space-y-4">
          {filtered.map((pr) => (
            <div
              key={pr.id}
              className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:border-[#2bbda3]/50 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full text-[11px]">
                    {pr.outlet}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3] font-bold text-[11px]">
                    {pr.category}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-slate-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" /> {pr.date}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">{pr.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>

        {/* Downloadable Media Resources Kit */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-slate-900 text-base">Download Media Kit &amp; Brand Assets</h3>
            <p className="text-xs text-slate-500">Official logos (SVG/PNG), brand guidelines, executive bios, and high-resolution photo assets.</p>
          </div>
          <a
            href="mailto:press@sellbar.in?subject=Requesting%20Official%20Sellbar%20Press%20Kit"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#2bbda3] text-white text-xs font-bold transition-colors flex items-center gap-2 shrink-0 shadow-md"
          >
            <Download className="w-4 h-4" /> Request Media Kit (.ZIP)
          </a>
        </div>
      </div>
    </div>
  );
}
