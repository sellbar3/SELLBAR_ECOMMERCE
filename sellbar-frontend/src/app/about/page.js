"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Heart, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Laptop,
  Smartphone,
  Gift
} from "lucide-react";

export default function SellbarCommunityPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Apple Ecosystem");
  const [joined, setJoined] = useState(false);
  const [activeForumTab, setActiveForumTab] = useState("All");

  const DISCUSSIONS = [
    {
      id: 1,
      category: "Buying Advice",
      title: "Is iPhone 13 still worth buying refurbished in 2026?",
      author: "Aditya Verma",
      city: "Patna",
      likes: 42,
      replies: 18,
      tag: "Trending",
      snippet: "Bought a Grade A Refurbished iPhone 13 from Sellbar last month for ₹31,000. Battery health was at 92%. Performance on iOS 19 is butter smooth.",
      time: "2 hours ago"
    },
    {
      id: 2,
      category: "Selling Experience",
      title: "Doorstep executive pickup in Bettiah was under 15 minutes!",
      author: "Rahul Kumar",
      city: "West Champaran",
      likes: 35,
      replies: 12,
      tag: "Verified Sell",
      snippet: "Scheduled pickup for my OnePlus 9 Pro. The technician tested display, cameras and ports on his portable diagnostic app and sent UPI payment instantly.",
      time: "5 hours ago"
    },
    {
      id: 3,
      category: "Laptops & MacBooks",
      title: "MacBook Air M1 vs M2 for computer science engineering students",
      author: "Sneha Roy",
      city: "Delhi NCR",
      likes: 64,
      replies: 29,
      tag: "Hot Debate",
      snippet: "Compared both in terms of thermals and Xcode compile times. The M1 at ₹45k refurbished is unmatched value, but M2's MagSafe is great if budget permits.",
      time: "1 day ago"
    },
    {
      id: 4,
      category: "Eco Impact",
      title: "Recycled 3 old keypad phones and got an eco-hero voucher",
      author: "Vikram Singhania",
      city: "Muzaffarpur",
      likes: 28,
      replies: 7,
      tag: "Green Tech",
      snippet: "Prevented heavy metals from hitting local landfills. Love that Sellbar gives free doorstep collection even for dead e-waste.",
      time: "2 days ago"
    }
  ];

  const PERKS = [
    {
      icon: Gift,
      title: "₹500 Bonus Trade-In Voucher",
      desc: "Community members get an extra ₹500 cashback coupon on every smartphone or laptop trade-in."
    },
    {
      icon: Flame,
      title: "2-Hour Early Access to Drops",
      desc: "Get first pick on rare refurbished inventory like MacBook Pro 16 or iPhone Pro Max before general public sale."
    },
    {
      icon: ShieldCheck,
      title: "Extended 15-Day Return Window",
      desc: "Standard buyers get 7 days; registered community members enjoy an extended 15-day return & exchange policy."
    },
    {
      icon: Users,
      title: "Exclusive Meetups & Swaps",
      desc: "Join hands-on diagnostic workshops, gadget showdowns, and meet fellow tech enthusiasts in Bettiah, Patna & Delhi."
    }
  ];

  function handleJoin(e) {
    e.preventDefault();
    setJoined(true);
  }

  const filteredDiscussions = DISCUSSIONS.filter(d => 
    activeForumTab === "All" || d.category === activeForumTab
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Sellbar Community</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-950 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/30 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> Sellbar Insiders Circle
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Where Gadget Enthusiasts, Tinkers &amp; Eco-Warriors Connect.
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Join 25,000+ members exchanging real gadget advice, buying tips, honest refurbished reviews, and participating in the green recommerce revolution across India.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#join-section"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-lg"
              >
                Join Community Free
              </a>
              <a
                href="#discussions"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors"
              >
                Explore Discussions
              </a>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 100% Free Forever
              </span>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12 pointer-events-none">
            <Sparkles className="w-96 h-96" />
          </div>
        </div>

        {/* Community Pillars / Perks */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Insider Privileges</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Why Tech Lovers Join Our Circle</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1.5">Free perks and rewards designed for smart device owners and savvy shoppers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base">{perk.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discussions Section */}
        <div id="discussions" className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Community Discussions &amp; Real Reviews</h2>
              <p className="text-xs text-gray-500 mt-1">Real device owners sharing honest diagnostics, trade-in values and tips</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {["All", "Buying Advice", "Selling Experience", "Laptops & MacBooks", "Eco Impact"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveForumTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeForumTab === tab
                      ? "bg-[#2bbda3] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDiscussions.map((d) => (
              <div key={d.id} className="p-5 rounded-2xl border border-gray-100 bg-[#f8fafc] hover:bg-white hover:border-[#2bbda3]/40 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3]">
                    {d.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{d.time}</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm leading-snug">{d.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{d.snippet}</p>
                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-800">{d.author}</span>
                    <span className="text-[10px] text-gray-400">({d.city})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-gray-600"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {d.likes}</span>
                    <span className="flex items-center gap-1 text-gray-600"><MessageSquare className="w-3.5 h-3.5 text-teal-600" /> {d.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Community Registration */}
        <div id="join-section" className="bg-gradient-to-r from-teal-900 to-gray-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl mx-auto">
            {joined ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto border border-[#2bbda3]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome to Sellbar Circle! 🎉</h2>
                <p className="text-sm text-gray-300">
                  Welcome <span className="font-bold text-white">{name}</span>! Your Member ID is <span className="font-mono text-[#2bbda3] font-bold">#SBC-{Math.floor(100000 + Math.random() * 900000)}</span>. We&apos;ve sent your exclusive ₹500 trade-in welcome voucher to <span className="font-bold text-white">{email}</span>.
                </p>
                <div className="pt-4">
                  <Link
                    href="/buy-refurbished"
                    className="inline-block px-6 py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white text-xs font-semibold transition-colors"
                  >
                    Start Exploring Refurbished Deals
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Fast &amp; Free Registration</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Claim Your Free VIP Membership</h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Get instant access to community drops, ₹500 bonus trade-in credit, and private tech discussions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aman Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#2bbda3] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="aman@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#2bbda3] outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-[#2bbda3] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Tech Interest</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-white/20 text-white focus:border-[#2bbda3] outline-none text-sm"
                    >
                      <option value="Apple Ecosystem">Apple Ecosystem (iPhone, Mac, iPad)</option>
                      <option value="Android Flagships">Android Flagships (Samsung, Pixel, OnePlus)</option>
                      <option value="Gaming & Laptops">Gaming Consoles &amp; High-End Laptops</option>
                      <option value="Sustainable Tech">Sustainable Tech &amp; E-Waste Recycling</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  Join Sellbar Community &amp; Get ₹500 Coupon <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-3 text-xs text-gray-600">
          <h4 className="font-bold text-gray-900 text-sm">Sellbar Community Principles</h4>
          <p>
            1. <strong>Respect &amp; Constructive Advice:</strong> All members share unbiased diagnostics, fair market pricing insights, and hardware optimization tips.
          </p>
          <p>
            2. <strong>Zero Spam / Unauthorized Dealings:</strong> To protect buyers and sellers, all commercial device buybacks and refurbished sales must be transacted through Sellbar&apos;s verified 32-point inspection channels.
          </p>
          <p>
            3. <strong>Environmental Responsibility:</strong> We encourage responsible disposal of dead electronics and sharing circular tech practices across towns and cities.
          </p>
        </div>
      </div>
    </div>
  );
}
