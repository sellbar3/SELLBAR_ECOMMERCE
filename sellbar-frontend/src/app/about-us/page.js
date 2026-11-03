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
  Compass, 
  HeartHandshake,
  ArrowRight,
  Milestone
} from "lucide-react";

export const metadata = {
  title: "About Us | Sellbar.in - India's Trusted Recommerce Platform",
  description: "Learn about Sellbar's mission, leadership, 32-point inspection lab, and journey toward circular electronics across India.",
};

const TIMELINE = [
  {
    year: "2022",
    title: "The Seed in West Champaran",
    desc: "Sellbar was conceived in Bettiah to solve a glaring problem: local device sellers were being severely underpaid by unregulated shops, while buyers had no warranty on second-hand phones."
  },
  {
    year: "2023",
    title: "Bettiah Diagnostic Lab Established",
    desc: "Built our first centralized 32-point hardware testing facility, equipped with certified display analyzers, battery cycle testers, and DoD-grade data wiping stations."
  },
  {
    year: "2024",
    title: "Pan-Bihar Doorstep Buyback Network",
    desc: "Expanded free doorstep pickup routes across Bettiah, Motihari, Muzaffarpur, and Patna, delivering instant UPI payments within 15 minutes of testing."
  },
  {
    year: "2025",
    title: "National Refurbished Marketplace & Supersale",
    desc: "Launched Pan-India insured delivery, 12-month Sellbar Assured warranty, and the B2B Supersale wholesale program supplying 500+ mobile retailers."
  },
  {
    year: "2026",
    title: "Circular Tech & E-Waste Leader",
    desc: "Diverted over 12,000 kg of toxic electronic waste, refurbished 50,000+ smartphones and laptops, and disbursed ₹10 Cr+ in instant seller payouts."
  }
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality Rigor",
    desc: "We never sell uninspected or poorly repaired devices. Every gadget passes 32 hardware checks before earning the Sellbar Assured certification."
  },
  {
    icon: HeartHandshake,
    title: "Transparent & Honest Valuation",
    desc: "No aggressive bargaining. Our algorithmic pricing considers exact hardware condition and gives the maximum honest market value upfront."
  },
  {
    icon: Leaf,
    title: "Zero-Landfill Circular Mission",
    desc: "We believe the greenest phone is the one already manufactured. Every device refurbished saves precious rare earth metals from toxic dumping."
  },
  {
    icon: Users,
    title: "Customer First, Always",
    desc: "From 7-day hassle-free replacements to comprehensive 12-month warranties and human support, we stand behind everything we sell."
  }
];

const TEAM = [
  {
    name: "Ashish Kumar",
    role: "Founder & Chief Executive Officer",
    bio: "Pioneering organized recommerce and high-standard refurbishment across Tier-2 and Tier-3 India."
  },
  {
    name: "Dr. Sumit Sen",
    role: "Head of Hardware Diagnostics & QC",
    bio: "Ex-OEM electronics reliability engineer with 12+ years expertise in display calibration and micro-soldering."
  },
  {
    name: "Anand Verma",
    role: "Lead Recommerce Valuation Architect",
    bio: "Designs real-time pricing algorithms that calculate live market valuations across 2,000+ gadget variants."
  },
  {
    name: "Pooja Mehta",
    role: "Director of Customer Care & Warranty",
    bio: "Ensures seamless doorstep pickups, 24-hour turnaround on warranty claims, and zero-friction customer satisfaction."
  }
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">About Sellbar</span>
        </nav>

        {/* Editorial Hero */}
        <div className="bg-gradient-to-br from-[#13b59b] via-[#0f947e] to-gray-900 rounded-3xl p-8 sm:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wider uppercase">
              Our Story &amp; Purpose
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Making Premium Technology Affordable. Making Electronics Sustainable.
            </h1>
            <p className="text-emerald-50 text-base sm:text-lg leading-relaxed">
              Sellbar is India&apos;s fastest-growing recommerce platform, bridging the digital divide by transforming how people sell old electronics for instant cash and buy certified refurbished gadgets with total warranty trust.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12 pointer-events-none">
            <Sparkles className="w-96 h-96" />
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">50,000+</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800">Gadgets Refurbished</div>
            <p className="text-[11px] text-gray-500">Restored to factory performance</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">32 Points</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800">Diagnostic Check</div>
            <p className="text-[11px] text-gray-500">Automated hardware benchmarks</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">₹10 Cr+</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800">Instant Cash Paid</div>
            <p className="text-[11px] text-gray-500">Directly into seller bank accounts</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#2bbda3]">12,000 kg</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800">E-Waste Diverted</div>
            <p className="text-[11px] text-gray-500">Zero toxic landfill footprint</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Our Mission</span>
            <h2 className="text-2xl font-bold text-gray-900">Democratizing Access to Flagship Tech</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              To empower every Indian student, professional, and family with access to top-tier smartphones and laptops at 40-70% lower costs, without compromising on functionality, aesthetics, or warranty protection.
            </p>
          </div>
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xs space-y-3">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Our Vision</span>
            <h2 className="text-2xl font-bold text-gray-900">A Zero-E-Waste Digital Economy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              To become South Asia&apos;s most reliable circular tech infrastructure, where every piece of hardware is refurbished, repurposed, or responsibly recycled, extending the lifespan of digital devices for generations.
            </p>
          </div>
        </div>

        {/* Company Journey Timeline */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Our Milestones</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">The Sellbar Journey (2022 - 2026)</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">From a single diagnostic bench in Bettiah to a national circular electronics network.</p>
          </div>

          <div className="relative border-l-2 border-teal-200 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-[#2bbda3] group-hover:scale-110 transition-transform" />
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 text-[#2bbda3] font-black text-xs mb-1">
                  {item.year}
                </span>
                <h3 className="font-bold text-base text-gray-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Guiding Principles</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">What We Stand For</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">The fundamental beliefs guiding every device inspection, buyback quote, and customer interaction.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">{val.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Leadership</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Meet the Minds Behind Sellbar</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">Engineers, operators, and recommerce pioneers committed to customer delight.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-gray-900 to-teal-800 text-white flex items-center justify-center font-bold text-lg mb-3">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-gray-900 text-base">{member.name}</h3>
                <div className="text-xs font-semibold text-[#2bbda3]">{member.role}</div>
                <p className="text-xs text-gray-500 leading-relaxed pt-1">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black">Ready to Experience Smarter Recommerce?</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Get an instant doorstep buyback quote for your phone or explore certified refurbished tech with 12 months warranty.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/sell"
              className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg"
            >
              Sell My Old Device
            </Link>
            <Link
              href="/buy-refurbished"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
            >
              Shop Refurbished Deals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
