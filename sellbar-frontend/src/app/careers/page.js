"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  CheckCircle2, 
  Heart, 
  Award, 
  ArrowRight, 
  MapPin, 
  Building, 
  Clock, 
  Users, 
  Laptop, 
  Zap, 
  Send 
} from "lucide-react";

const DEPARTMENTS = ["All", "Quality & Refurbishment", "Engineering", "Operations & Logistics", "Growth & Sales"];

const OPEN_ROLES = [
  {
    id: 1,
    title: "Senior Mobile Diagnostic Technician",
    dept: "Quality & Refurbishment",
    location: "Bettiah / New Delhi",
    type: "Full-Time",
    experience: "2-4 Years",
    desc: "Perform 32-point hardware bench tests on incoming Apple & Android flagships, oversee screen replacements and battery diagnostics."
  },
  {
    id: 2,
    title: "Full-Stack Node.js & Next.js Engineer",
    dept: "Engineering",
    location: "Remote / Hybrid (Delhi NCR)",
    type: "Full-Time",
    experience: "3+ Years",
    desc: "Scale the recommerce pricing engine, real-time inventory management APIs, and mobile trade-in assessment flows."
  },
  {
    id: 3,
    title: "Doorstep Pickup Lead (District Operations)",
    dept: "Operations & Logistics",
    location: "West Champaran / Muzaffarpur",
    type: "Full-Time",
    experience: "1-3 Years",
    desc: "Manage executive field routes, on-site gadget evaluation SLAs, and customer instant payment disbursement."
  },
  {
    id: 4,
    title: "B2B Wholesale / Supersale Growth Executive",
    dept: "Growth & Sales",
    location: "Patna / Bettiah",
    type: "Full-Time",
    experience: "2+ Years",
    desc: "Onboard mobile retailers, bulk gadget resellers, and regional distributors to the Sellbar Supersale wholesale program."
  },
  {
    id: 5,
    title: "Refurbished Quality Lab Assistant",
    dept: "Quality & Refurbishment",
    location: "Bettiah Diagnostic Center",
    type: "Full-Time",
    experience: "Freshers / 1 Year",
    desc: "Assist senior hardware technicians with laser cleaning, grading, sanitization, and packaging of refurbished gadgets."
  }
];

const FAQS = [
  {
    q: "What is the typical hiring process at Sellbar?",
    a: "Our process typically involves 3 stages: 1) Initial profile review and HR introductory call, 2) Technical interview or hands-on diagnostic assessment, and 3) Final conversation with the functional department lead."
  },
  {
    q: "Does Sellbar offer remote or hybrid work options?",
    a: "Engineering, Product, and Marketing roles support hybrid or remote setups. Quality Lab and Logistics roles are based on-site at our Bettiah or Delhi diagnostic facilities."
  },
  {
    q: "Are freshers eligible to apply for hardware technician roles?",
    a: "Yes! We run the Sellbar Hardware Apprentice program for diploma holders and freshers with an interest in electronics diagnosis and repairs."
  }
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedRole, setSelectedRole] = useState(OPEN_ROLES[0].title);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredRoles = OPEN_ROLES.filter(r => 
    selectedDept === "All" || r.dept === selectedDept
  );

  function handleApply(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Careers at Sellbar</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-teal-950 rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/30 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              We&apos;re Hiring Leaders &amp; Builders
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Build India&apos;s Circular Tech Future with Sellbar
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Join a mission-driven team reducing electronic waste, making high-end technology affordable, and pioneering same-day recommerce across Bharat.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#open-roles"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-lg"
              >
                View {OPEN_ROLES.length} Open Positions
              </a>
              <a
                href="#application-form"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
              >
                Submit Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0 w-full sm:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">50+</div>
              <div className="text-xs text-gray-300 mt-1">Team Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">4.8★</div>
              <div className="text-xs text-gray-300 mt-1">Glassdoor Culture</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">₹0</div>
              <div className="text-xs text-gray-300 mt-1">Work Hierarchy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-[#2bbda3]">100%</div>
              <div className="text-xs text-gray-300 mt-1">Health Covered</div>
            </div>
          </div>
        </div>

        {/* Culture & Benefits */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Life at Sellbar</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Perks &amp; Growth That Matter</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">We take care of our teammates so they can build great things.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Health &amp; Family Care</h3>
              <p className="text-xs text-gray-500">Comprehensive medical insurance for employees and immediate dependents.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Gadget Allowances</h3>
              <p className="text-xs text-gray-500">Annual employee tech allowances and discounts on certified devices.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Rapid Promotion Track</h3>
              <p className="text-xs text-gray-500">Merit-based performance evaluations every 6 months with real equity.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Inclusive Culture</h3>
              <p className="text-xs text-gray-500">Collaborative, non-bureaucratic environment where every idea is heard.</p>
            </div>
          </div>
        </div>

        {/* Open Roles Section */}
        <div id="open-roles" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Current Job Openings</h2>
              <p className="text-xs text-gray-500 mt-0.5">Filter by department to find your best fit</p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {DEPARTMENTS.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedDept === dept
                      ? "bg-[#2bbda3] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredRoles.map(role => (
              <div
                key={role.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-50 text-[#2bbda3]">
                      {role.dept}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {role.location}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">Exp: {role.experience}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{role.title}</h3>
                  <p className="text-xs text-gray-600 max-w-2xl">{role.desc}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedRole(role.title);
                    const el = document.getElementById("application-form");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-[#2bbda3] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 self-start md:self-center"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thank you <span className="font-bold text-gray-900">{name}</span>. We have received your application for <span className="font-bold text-[#2bbda3]">{selectedRole}</span>. Our Talent Acquisition team will review your profile and reach out within 3 to 5 business days at <span className="font-bold text-gray-900">{phone}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
              >
                Apply for Another Role
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Fast Apply</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Direct Job Application</h3>
                <p className="text-xs text-gray-500">Fill in your information below to submit your candidacy directly to our hiring managers.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Applying For Position *</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm bg-white"
                  >
                    {OPEN_ROLES.map(r => (
                      <option key={r.id} value={r.title}>{r.title} ({r.location})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="priyanshu@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">LinkedIn or Portfolio URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Summary of Experience &amp; Skills</label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about your technical background or why you want to join Sellbar..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] outline-none text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Sending Application..." : <>Submit Job Application <Send className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>

        {/* Careers FAQs */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Careers FAQs</h3>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#f8fafc] border border-gray-100 space-y-1">
                <h4 className="font-semibold text-xs text-gray-900">{faq.q}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
