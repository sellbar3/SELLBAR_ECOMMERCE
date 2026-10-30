import React from "react";
import Link from "next/link";
import { Newspaper, Calendar, ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Press Releases & News | Sellbar.in",
  description: "Official press announcements, company milestones, and media mentions about Sellbar.",
};

const RELEASES = [
  {
    title: "Sellbar Expands Recommerce Doorstep Pickup Network to 40+ Indian Cities",
    date: "January 10, 2026",
    outlet: "Tech Wire India",
    desc: "With an expanded fleet of certified inspection executives, Sellbar now delivers same-day physical valuation and instant UPI payouts across tier-1 and tier-2 markets.",
  },
  {
    title: "Sellbar Launches 32-Point Quality Lab for Refurbished MacBooks & Laptops",
    date: "November 24, 2025",
    outlet: "Business Standard",
    desc: "New automated diagnostic hardware benchmark testing delivers zero-defect refurbished laptops with comprehensive 12 months manufacturer-grade warranty.",
  },
  {
    title: "Sellbar Partners with E-Waste Recyclers to Divert 10,000 Metric Tons of Gadget Waste",
    date: "September 15, 2025",
    outlet: "Green Tech Times",
    desc: "A milestone commitment toward circular electronics and zero-landfill electronic disposal in compliance with MoEFCC guidelines.",
  },
];

export default function PressReleasesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Press Releases</span>
        </nav>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto mb-3">
            <Newspaper className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Press &amp; Media Coverage</h1>
          <p className="text-gray-500 text-sm">Official announcements and news coverage about Sellbar Technologies.</p>
        </div>

        <div className="space-y-4">
          {RELEASES.map((pr, idx) => (
            <div key={idx} className="bg-white p-7 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{pr.outlet}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {pr.date}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">{pr.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center space-y-2">
          <h3 className="font-bold text-gray-900 text-sm">Media &amp; Press Inquiries</h3>
          <p className="text-xs text-gray-500">
            For interviews, press assets, and company spokespeople access, contact: <a href="mailto:press@sellbar.in" className="text-[#2bbda3] font-semibold underline">press@sellbar.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
