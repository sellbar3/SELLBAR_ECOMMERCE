import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  Leaf, 
  TrendingUp, 
  HeartHandshake,
  ArrowRight,
  MapPin,
  Star
} from "lucide-react";

export const metadata = {
  title: "About Us | Sellbar.in - India's Trusted Recommerce Platform",
  description: "Learn about Sellbar's mission, leadership, 32-point inspection lab, and journey toward circular electronics across India.",
};

const TIMELINE = [
  {
    year: "2022",
    title: "Founded in West Champaran",
    desc: "Sellbar was started in Bettiah to solve a systemic problem: consumers selling old devices were being shortchanged by local shops, while buyers had zero warranty on pre-owned electronics."
  },
  {
    year: "2023",
    title: "Bettiah Central Diagnostic Lab",
    desc: "Built our first centralized 32-point hardware testing facility, equipped with automated display spectrum analyzers, battery cycle counters, and DoD-grade data wiping software."
  },
  {
    year: "2024",
    title: "Bihar Doorstep Buyback Fleet",
    desc: "Rolled out free doorstep pickup routes across Bettiah, Motihari, Muzaffarpur, and Patna, providing instant UPI payments within 15 minutes of testing."
  },
  {
    year: "2025",
    title: "Pan-India Expansion & Supersale B2B",
    desc: "Launched insured national fulfillment, 12-month Sellbar Assured warranty, and the B2B Supersale wholesale program supplying 500+ mobile retailers across 14 states."
  },
  {
    year: "2026",
    title: "Pioneering Circular Recommerce",
    desc: "Diverted over 12,000 kg of electronic scrap, refurbished 50,000+ smartphones and MacBooks, and paid out ₹10 Cr+ in instant seller payments."
  }
];

const LEADERSHIP = [
  {
    name: "Rahul",
    role: "Founder & Chief Executive Officer",
    desc: "Leading Sellbar's vision to democratize premium technology and build India's most trusted circular recommerce infrastructure.",
    initials: "R"
  },
  {
    name: "Dr. Sumit Sen",
    role: "Head of Hardware Diagnostics & QC",
    desc: "Ex-OEM electronics reliability engineer with 12+ years expertise in display spectrum calibration and micro-soldering.",
    initials: "SS"
  },
  {
    name: "Anand Verma",
    role: "Lead Valuation Architect",
    desc: "Architects algorithmic pricing engines analyzing live market demand, depreciation curves, and cosmetic grading across 2,000+ SKUs.",
    initials: "AV"
  },
  {
    name: "Pooja Mehta",
    role: "Director of Customer Care & Warranty",
    desc: "Oversees 12-month Sellbar Assured warranty fulfillment, rapid doorstep pickup SLAs, and human customer support.",
    initials: "PM"
  }
];

const TESTIMONIALS = [
  {
    quote: "Got ₹31,000 instant UPI payment at my doorstep in Bettiah for my old iPhone 13. The technician was polite and testing took under 12 minutes.",
    author: "Alok Tiwari",
    city: "Bettiah, West Champaran",
    rating: 5
  },
  {
    quote: "Bought a refurbished MacBook Air M1 for coding. The machine arrived in flawless condition with 94% battery health and full 1-year warranty.",
    author: "Neha Sharma",
    city: "Patna, Bihar",
    rating: 5
  },
  {
    quote: "Our retail shop in Muzaffarpur buys Supersale Grade A refurbished handsets every week. 100% genuine GST invoices and zero customer complaints.",
    author: "Rajesh Singhania",
    city: "Muzaffarpur",
    rating: 5
  }
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-16 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/40 text-[#2bbda3] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" /> India&apos;s Smart Recommerce Platform
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Sell Smart. Buy Better. Live Tech-Forward.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Sellbar bridges the gap between premium flagship hardware and everyday consumers. We turn pre-owned electronics into certified, warranty-backed devices while giving sellers the fastest, highest doorstep valuations in India.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/sell"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg"
              >
                Sell Your Device
              </Link>
              <Link
                href="/buy-refurbished"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Browse Refurbished Deals
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#2bbda3]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">50,000+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Devices Restored</div>
            <p className="text-[11px] text-slate-500">Passed 32-point lab certification</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">₹10 Cr+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Instant Cash Paid</div>
            <p className="text-[11px] text-slate-500">Transferred via UPI at doorsteps</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">12,000 kg</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">E-Waste Diverted</div>
            <p className="text-[11px] text-slate-500">Kept out of Indian landfills</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">12 Months</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Standard Warranty</div>
            <p className="text-[11px] text-slate-500">Backed by genuine OEM components</p>
          </div>
        </div>

        {/* Mission & Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Our Mission</span>
            <h2 className="text-2xl font-bold text-slate-900">Democratizing Access to Flagship Tech</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We believe a student, young professional, or creator shouldn&apos;t have to spend ₹80,000 to own an iPhone or MacBook capable of powering their career. Certified refurbishment delivers identical capability at up to 70% lower prices.
            </p>
          </div>
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Our Circular Promise</span>
            <h2 className="text-2xl font-bold text-slate-900">A Zero-E-Waste Digital Economy</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every phone repaired or refurbished prevents toxic lithium, cadmium, and cobalt from being mined and discarded. Through responsible recommerce, we extend the usable lifecycle of high-grade electronics by 3 to 5 additional years.
            </p>
          </div>
        </div>

        {/* Company Journey Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Our Journey</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">From Bettiah to All of India</h2>
            <p className="text-xs text-slate-500 mt-1">Milestones in building India&apos;s most reliable circular tech infrastructure.</p>
          </div>

          <div className="relative border-l-2 border-teal-200 ml-3 sm:ml-8 space-y-8 pl-6 sm:pl-8">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#2bbda3] group-hover:scale-125 transition-transform" />
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-[#2bbda3] font-bold text-xs mb-1">
                  {item.year}
                </span>
                <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Executive Team</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Meet the Builders Behind Sellbar</h2>
            <p className="text-xs text-slate-500">Engineers, operators, and recommerce architects dedicated to quality.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((lead, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  {lead.initials}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{lead.name}</h3>
                  <div className="text-xs font-semibold text-[#2bbda3]">{lead.role}</div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-100">{lead.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Wall of Trust */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Verified Feedback</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">What Real Customers Say</h2>
            <p className="text-xs text-slate-500">Trusted by over 50,000 sellers and buyers across Bihar and Pan-India.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="pt-3 border-t border-slate-200/60">
                  <strong className="text-xs font-bold text-slate-900 block">{t.author}</strong>
                  <span className="text-[10px] text-slate-500">{t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black">Experience Smarter Recommerce Today</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Get an instant valuation for your gadget or upgrade to certified refurbished with 12 months warranty.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/sell"
              className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg"
            >
              Sell My Device
            </Link>
            <Link
              href="/buy-refurbished"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
            >
              Explore Refurbished Tech
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
