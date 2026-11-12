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
  Gift,
  MapPin
} from "lucide-react";

export default function SellbarCommunityPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Apple Ecosystem");
  const [joined, setJoined] = useState(false);
  const [memberId, setMemberId] = useState("");
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
      snippet: "Bought a Grade A Refurbished iPhone 13 from Sellbar last month for ₹31,000. Battery health was at 92%. Performance on latest iOS is butter smooth.",
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
      snippet: "Compared both in terms of thermals and compile times. The M1 at ₹45k refurbished is unmatched value, but M2's MagSafe is great if budget permits.",
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
      title: "Bettiah & Bihar Meetups",
      desc: "Join hands-on diagnostic workshops, gadget showdowns, and meet fellow tech enthusiasts in Bettiah, Patna & Delhi."
    }
  ];

  const MEETUPS = [
    {
      title: "Bettiah Tech Swap & Free Diagnostic Camp",
      date: "Saturday, Feb 14, 2026 • 11:00 AM",
      venue: "Sellbar Diagnostic Hub, Station Chowk, Bettiah",
      status: "Registration Open"
    },
    {
      title: "Patna Recommerce & Gadget Creators Meet",
      date: "Sunday, Feb 22, 2026 • 2:00 PM",
      venue: "Frazer Road Tech Center, Patna",
      status: "Filling Fast"
    }
  ];

  function handleJoin(e) {
    e.preventDefault();
    const id = "SBC-" + Math.floor(100000 + Math.random() * 900000);
    setMemberId(id);
    setJoined(true);
  }

  const filteredDiscussions = DISCUSSIONS.filter(d => 
    activeForumTab === "All" || d.category === activeForumTab
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Sellbar Community Hub</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bbda3]/20 border border-[#2bbda3]/40 text-[#2bbda3] text-xs font-bold tracking-wider uppercase">
              <Users className="w-3.5 h-3.5" /> Sellbar Insiders &amp; Tech Circle
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Where Gadget Lovers, Tinkers &amp; Eco-Warriors Connect
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join 25,000+ members exchanging real gadget advice, buying tips, honest refurbished reviews, and participating in the green recommerce revolution across India.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#join-section"
                className="px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg"
              >
                Join Community Free (Get ₹500 Coupon)
              </a>
              <a
                href="#discussions"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Explore Discussions
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 space-y-3 shrink-0 w-full sm:w-auto text-center">
            <div className="text-3xl font-black text-[#2bbda3]">25,000+</div>
            <div className="text-xs text-slate-300 font-medium">Registered Community Members</div>
            <div className="pt-2 border-t border-white/10 text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 100% Free Lifetime Membership
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#2bbda3]/15 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Member Perks */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Insider Privileges</span>
            <h2 className="text-2xl font-bold text-slate-900">Why Tech Lovers Join Our Circle</h2>
            <p className="text-xs text-slate-500">Free perks and rewards designed for smart device owners and savvy shoppers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-[#2bbda3]/50 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{perk.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discussions Section */}
        <div id="discussions" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Community Voice</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Real Owner Discussions &amp; Reviews</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real users sharing honest device benchmarks, battery health, and trade-in experiences</p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {["All", "Buying Advice", "Selling Experience", "Laptops & MacBooks", "Eco Impact"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveForumTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeForumTab === tab
                      ? "bg-[#2bbda3] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDiscussions.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-[#2bbda3]/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3]">
                    {d.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{d.time}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">{d.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{d.snippet}</p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-800">{d.author}</span>
                    <span className="text-[11px] text-slate-400">({d.city})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-600"><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {d.likes}</span>
                    <span className="flex items-center gap-1 text-slate-600"><MessageSquare className="w-3.5 h-3.5 text-teal-600" /> {d.replies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Offline Meetups in Bihar */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">In-Person Swaps</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">Upcoming Offline Tech Meetups</h3>
            <p className="text-xs text-slate-500">Join free device diagnostic workshops and meet fellow enthusiasts in person.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEETUPS.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    {m.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Free Entry
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{m.title}</h4>
                <div className="text-xs text-slate-600 space-y-1">
                  <div><strong>Date &amp; Time:</strong> {m.date}</div>
                  <div className="flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{m.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Community Registration */}
        <div id="join-section" className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl mx-auto">
            {joined ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto border border-[#2bbda3]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome to Sellbar Circle! 🎉</h2>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-xs space-y-1">
                  <span className="text-slate-300">Your VIP Member ID:</span>
                  <div className="font-mono text-xl font-black text-[#2bbda3]">{memberId}</div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Welcome <span className="font-bold text-white">{name}</span>! We&apos;ve sent your exclusive ₹500 trade-in welcome voucher code to <span className="font-bold text-white">{email}</span>.
                </p>
                <div className="pt-2">
                  <Link
                    href="/buy-refurbished"
                    className="inline-block px-6 py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white text-xs font-semibold transition-colors shadow-md"
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
                  <p className="text-xs sm:text-sm text-slate-300">
                    Get instant access to community drops, ₹500 bonus trade-in credit, and private tech discussions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aman Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-[#2bbda3] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="aman@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-[#2bbda3] outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:border-[#2bbda3] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Tech Interest</label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/20 text-white focus:border-[#2bbda3] outline-none text-xs"
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
                  className="w-full py-3 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  Join Sellbar Community &amp; Get ₹500 Coupon <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
