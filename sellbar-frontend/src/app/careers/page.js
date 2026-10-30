import React from "react";
import Link from "next/link";
import { Briefcase, CheckCircle2, Heart, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Careers at Sellbar | Join India's Leading Recommerce Team",
  description: "Explore open job opportunities in tech, hardware engineering, operations, and logistics at Sellbar.",
};

const OPEN_ROLES = [
  {
    title: "Senior Mobile Diagnostic Technician",
    dept: "Quality & Refurbishment",
    location: "New Delhi (On-site)",
    type: "Full-Time",
  },
  {
    title: "Full-Stack Node.js / React Engineer",
    dept: "Engineering",
    location: "Remote / Hybrid (Noida)",
    type: "Full-Time",
  },
  {
    title: "City Operations Manager (Buyback Logistics)",
    dept: "Logistics",
    location: "Bengaluru & Mumbai",
    type: "Full-Time",
  },
  {
    title: "B2B Vendor Relationship Specialist",
    dept: "Marketplace Growth",
    location: "New Delhi",
    type: "Full-Time",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Careers</span>
        </nav>

        {/* Hero */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs text-center max-w-3xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
            <Briefcase className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Build the Future of Sustainable Tech</h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            At Sellbar, we&apos;re revolutionizing how India buys, repairs, and recycles electronics. Join a passionate, fast-moving team driving the circular economy.
          </p>
        </div>

        {/* Open Roles */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Current Openings</h2>
          <div className="grid grid-cols-1 gap-4">
            {OPEN_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700 font-medium">{role.dept}</span>
                    <span>{role.location}</span>
                    <span>•</span>
                    <span>{role.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@sellbar.in?subject=Application for ${encodeURIComponent(role.title)}`}
                  className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-[#2bbda3] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Perks */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Life at Sellbar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2bbda3] flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900">Comprehensive Healthcare</h4>
              <p className="text-xs text-gray-500">Medical insurance for you and your dependents with wellness allowances.</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2bbda3] flex items-center justify-center mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900">Gadget Allowances</h4>
              <p className="text-xs text-gray-500">Discounts and employee stipends on certified refurbished gear.</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2bbda3] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900">Rapid Career Growth</h4>
              <p className="text-xs text-gray-500">Opportunity to lead teams in one of India&apos;s fastest growing recommerce sectors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
