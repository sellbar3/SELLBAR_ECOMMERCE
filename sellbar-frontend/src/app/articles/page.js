"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Search, 
  User, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Mail,
  CheckCircle2
} from "lucide-react";

const CATEGORIES = ["All", "Selling Guides", "Refurbished Tech", "Buying Guides", "Sustainability"];

const ARTICLES = [
  {
    id: 1,
    title: "How to Get Maximum Cash When Selling Your Old iPhone in 2026",
    excerpt: "Learn the top physical preparation tips, battery optimization, and timing tricks to lock in the highest buyback price for your iPhone before the next flagship launch.",
    date: "Jan 18, 2026",
    readTime: "4 min read",
    tag: "Selling Guides",
    author: { name: "Anand Verma", role: "Valuation Architect" },
    featured: true,
    href: "/sell-old-mobile-phone",
  },
  {
    id: 2,
    title: "Refurbished vs Used vs Second-Hand: What You Must Know Before Buying",
    excerpt: "Understand the critical differences between unverified second-hand devices from classifieds and 32-point certified refurbished gadgets backed by 12 months warranty.",
    date: "Jan 12, 2026",
    readTime: "6 min read",
    tag: "Refurbished Tech",
    author: { name: "Dr. Sumit Sen", role: "Head of QC & Lab" },
    href: "/what-is-refurbished",
  },
  {
    id: 3,
    title: "Best Budget Refurbished Laptops for Students and Coders in 2026",
    excerpt: "A breakdown of Lenovo ThinkPad X1 Carbon vs Dell Latitude series for durability, keyboard quality, and multitasking value under ₹35,000.",
    date: "Dec 29, 2025",
    readTime: "5 min read",
    tag: "Buying Guides",
    author: { name: "Rohan Das", role: "Tech Writer" },
    href: "/buy-refurbished",
  },
  {
    id: 4,
    title: "E-Waste Crisis in India: Why Recommerce Is the Ultimate Solution",
    excerpt: "Explore how recycling and buying renewed gadgets helps divert toxic lithium batteries and heavy metals from Indian landfills while keeping premium flagships accessible.",
    date: "Dec 20, 2025",
    readTime: "5 min read",
    tag: "Sustainability",
    author: { name: "Pooja Mehta", role: "Sustainability Lead" },
    href: "/e-waste-policy",
  },
  {
    id: 5,
    title: "The Step-by-Step Guide to Selling Your MacBook Safely",
    excerpt: "From Apple Silicon activation lock unlinking to filevault decryption and physical key cleaning: how to prep your MacBook for top valuation.",
    date: "Dec 15, 2025",
    readTime: "7 min read",
    tag: "Selling Guides",
    author: { name: "Anand Verma", role: "Valuation Architect" },
    href: "/sell-old-laptop",
  },
  {
    id: 6,
    title: "Top 5 Camera Smartphones Under ₹25,000 (Certified Refurbished)",
    excerpt: "Pixel 7A vs Galaxy S21 FE vs iPhone 11: Which pre-owned flagship delivers the best night mode, portrait mode, and 4K 60FPS video?",
    date: "Dec 05, 2025",
    readTime: "6 min read",
    tag: "Buying Guides",
    author: { name: "Rohan Das", role: "Tech Writer" },
    href: "/find-new-phone",
  }
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  const filtered = ARTICLES.filter((a) => {
    const matchesCat = activeCategory === "All" || a.tag === activeCategory;
    const matchesSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  function handleSubscribe(e) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Articles &amp; Tech Guides</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Sellbar Tech Journal
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Insights, Buying Guides &amp; Smart Tech Advice
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Expert knowledge from certified technicians on getting top cash for old devices, testing refurbished hardware, and circular electronics.
          </p>
        </div>

        {/* Featured Article Hero Banner */}
        {featured && (
          <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#2bbda3] text-white text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Featured Guide
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300">{featured.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                <Link href={featured.href} className="hover:text-[#2bbda3] transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#2bbda3] text-white flex items-center justify-center font-bold text-xs">
                    {featured.author.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{featured.author.name}</div>
                    <div className="text-[10px] text-slate-400">{featured.author.role} • {featured.date}</div>
                  </div>
                </div>
                <Link
                  href={featured.href}
                  className="px-5 py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
                >
                  Read Full Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#2bbda3]/20 blur-3xl rounded-full pointer-events-none" />
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-[#2bbda3] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#2bbda3] outline-none text-xs shadow-xs"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-[#2bbda3]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3] font-bold text-[11px]">
                    {art.tag}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-[#2bbda3] transition-colors">
                  <Link href={art.href}>{art.title}</Link>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800 text-[11px]">{art.author.name}</div>
                  <div className="text-[10px] text-slate-400">{art.date}</div>
                </div>
                <Link
                  href={art.href}
                  className="font-bold text-[#2bbda3] hover:text-[#249e88] flex items-center gap-1 text-xs"
                >
                  Read &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider">Weekly Tech Digest</span>
            <h3 className="text-2xl font-black">Get First Access to Refurbished Drops</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Join 25,000+ tech lovers receiving weekly price reduction alerts and device trade-in valuation trends.</p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-white/10 px-4 py-2.5 rounded-xl border border-white/20">
                <CheckCircle2 className="w-4 h-4" /> You&apos;re subscribed to Sellbar Tech Journal!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:border-[#2bbda3] outline-none w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-xs transition-colors shrink-0 shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
