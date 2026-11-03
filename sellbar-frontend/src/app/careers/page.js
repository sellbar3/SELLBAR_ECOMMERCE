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
  Send,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Search
} from "lucide-react";

const DEPARTMENTS = ["All", "Quality & Refurbishment", "Engineering", "Operations & Logistics", "Growth & Sales"];

const ROLES = [
  {
    id: "role-1",
    title: "Senior Mobile Diagnostic Technician",
    dept: "Quality & Refurbishment",
    location: "Bettiah / New Delhi",
    type: "Full-Time",
    experience: "2-4 Years",
    salary: "₹3.5L - ₹5.5L CTC + Incentives",
    summary: "Perform 32-point automated and manual hardware diagnostics on incoming Apple and Android flagship smartphones.",
    responsibilities: [
      "Operate digital display spectrum analyzers and battery charging cycle testers.",
      "Diagnose motherboard thermal issues, short circuits, and micro-soldering defects.",
      "Execute certified DoD 5220.22-M military-grade data sanitization.",
      "Assign accurate cosmetic and functional grades (A+, A, B) according to Sellbar lab standards."
    ],
    requirements: [
      "Diploma / Certification in Electronics or relevant hardware troubleshooting experience.",
      "Minimum 2 years hands-on experience repairing iPhones, Samsung Galaxy, or iPads.",
      "Strong attention to detail and knowledge of OEM display and battery specifications."
    ]
  },
  {
    id: "role-2",
    title: "Full-Stack Node.js & Next.js Engineer",
    dept: "Engineering",
    location: "Remote / Hybrid (Delhi NCR)",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "₹8L - ₹14L CTC + ESOPs",
    summary: "Build and scale real-time algorithmic device buyback valuation engines, inventory APIs, and responsive customer portals.",
    responsibilities: [
      "Develop responsive Next.js frontend pages and robust Node.js / Express backend services.",
      "Maintain and optimize PostgreSQL / MongoDB databases tracking 50,000+ refurbished serial numbers.",
      "Integrate payment gateways (Razorpay, Cashfree UPI payouts) and logistics APIs (BlueDart, Delhivery).",
      "Ensure web Core Web Vitals (LCP < 1.8s, INP < 150ms) and accessible clean interfaces."
    ],
    requirements: [
      "Proficient with React, Next.js (App Router), TypeScript/JavaScript, and Node.js.",
      "Experience with high-volume transactional e-commerce APIs and state management.",
      "Familiarity with cloud hosting, CI/CD pipelines, and security best practices."
    ]
  },
  {
    id: "role-3",
    title: "District Doorstep Pickup & Inspection Lead",
    dept: "Operations & Logistics",
    location: "West Champaran / Muzaffarpur",
    type: "Full-Time",
    experience: "1-3 Years",
    salary: "₹2.8L - ₹4.2L CTC + Fuel Allowance",
    summary: "Manage localized customer evaluation routes, doorstep gadget verifications, and instant customer UPI payout approvals.",
    responsibilities: [
      "Conduct in-person device evaluation using the Sellbar mobile diagnostic field app.",
      "Verify IMEI numbers, physical glass condition, and issue instant digital receipts.",
      "Handle customer queries politely and uphold company brand trust at the doorstep.",
      "Reconcile daily collected gadgets with regional hub dispatch managers."
    ],
    requirements: [
      "Valid two-wheeler driving license and basic smartphone operating literacy.",
      "Strong communication skills in Hindi / local languages.",
      "Punctual, trustworthy, and customer-centric demeanor."
    ]
  },
  {
    id: "role-4",
    title: "B2B Supersale & Wholesale Accounts Manager",
    dept: "Growth & Sales",
    location: "Patna / Bettiah",
    type: "Full-Time",
    experience: "2+ Years",
    salary: "₹4.5L - ₹7.0L CTC + Performance Bonus",
    summary: "Expand Sellbar's wholesale refurbished smartphone and laptop supply network among mobile retailers across Bihar and UP.",
    responsibilities: [
      "Onboard regional mobile shop owners to the Sellbar Supersale B2B procurement portal.",
      "Manage weekly wholesale lot manifests (MOQ 25-100 units) and GST ITC tax invoices.",
      "Coordinate wholesale delivery logistics and handle retailer re-order inquiries."
    ],
    requirements: [
      "Prior experience in consumer electronics sales, telecom distribution, or B2B sales.",
      "Strong negotiation and relationship-building abilities.",
      "Demonstrated track record of achieving monthly trade-in and sales targets."
    ]
  }
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedRoleId, setExpandedRoleId] = useState("role-1");
  const [applyingFor, setApplyingFor] = useState(ROLES[0].title);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredRoles = ROLES.filter(r => {
    const matchesDept = selectedDept === "All" || r.dept === selectedDept;
    const matchesSearch = search === "" || 
      r.title.toLowerCase().includes(search.toLowerCase()) || 
      r.summary.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  function handleApplication(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Careers at Sellbar</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-16 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/40 text-[#2bbda3] text-xs font-bold tracking-wider uppercase">
              <Briefcase className="w-3.5 h-3.5" /> Join the Recommerce Revolution
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Build the Future of Sustainable Electronics in India
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We&apos;re looking for problem solvers, diagnostic engineers, and ambitious operators to scale our certified refurbished marketplace and same-day device buyback network across India.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#open-roles"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg flex items-center gap-2"
              >
                Browse {ROLES.length} Open Positions <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#application-modal"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Direct Application Form
              </a>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#2bbda3]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Perks & Benefits Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Life at Sellbar</span>
            <h2 className="text-2xl font-bold text-slate-900">Perks &amp; Growth That Truly Matter</h2>
            <p className="text-xs text-slate-500">We invest heavily in our team so they can build with pride and autonomy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Health &amp; Family Cover</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Full medical insurance covering you and your immediate dependents with zero co-pay.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Gadget Stipend</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Annual allowance and 30% employee discounts on all certified iPhones and MacBooks.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Merit Increments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Bi-annual performance evaluations with genuine salary revisions and company ESOPs.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">No Bureaucracy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Direct access to founders and department heads. Rapid decision making without red tape.</p>
            </div>
          </div>
        </div>

        {/* Open Roles Section */}
        <div id="open-roles" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Live Opportunities</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Explore Open Roles</h2>
              <p className="text-xs text-slate-500">Find the position where you can create maximum impact.</p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
              />
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDept === dept
                    ? "bg-[#2bbda3] text-white shadow-xs"
                    : "bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Role Cards List */}
          <div className="space-y-4">
            {filteredRoles.map((role) => {
              const isExpanded = expandedRoleId === role.id;
              return (
                <div
                  key={role.id}
                  className="rounded-2xl border border-slate-200/80 overflow-hidden transition-all bg-white hover:border-[#2bbda3]/50"
                >
                  <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3] font-bold text-[11px]">
                          {role.dept}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> {role.location}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 font-semibold">{role.salary}</span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900">{role.title}</h3>
                      <p className="text-xs text-slate-500 max-w-2xl">{role.summary}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                      <button
                        onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                      <a
                        href="#application-modal"
                        onClick={() => setApplyingFor(role.title)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#2bbda3] text-white text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        Apply <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Expanded Responsibilities & Requirements */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-[#fbfdfc] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <strong className="text-slate-900 block font-bold">Key Responsibilities:</strong>
                        <ul className="space-y-1 text-slate-600">
                          {role.responsibilities.map((r, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#2bbda3] font-bold">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-1.5">
                        <strong className="text-slate-900 block font-bold">Candidate Requirements:</strong>
                        <ul className="space-y-1 text-slate-600">
                          {role.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#2bbda3] font-bold">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Job Application Form */}
        <div id="application-modal" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you <span className="font-bold text-slate-900">{candidateName}</span>! Our Talent Acquisition team has received your application for <span className="font-bold text-[#2bbda3]">{applyingFor}</span>. If shortlisted, our hiring manager will connect with you via <span className="font-bold text-slate-900">{candidatePhone}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplication} className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Fast Apply</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Direct Job Application</h3>
                <p className="text-xs text-slate-500">Apply directly to our hiring managers with zero middle-agent delays.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Applying For Position *</label>
                  <select
                    value={applyingFor}
                    onChange={(e) => setApplyingFor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs bg-white"
                  >
                    {ROLES.map((r) => (
                      <option key={r.id} value={r.title}>{r.title} ({r.location})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="anand@example.com"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Portfolio / LinkedIn Link</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Why are you a great fit for Sellbar? *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share a brief overview of your hardware, development, or logistics experience..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#2bbda3] outline-none text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? "Submitting Application..." : <>Submit Job Application <Send className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
