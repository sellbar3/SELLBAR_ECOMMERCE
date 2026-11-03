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
  TrendingUp
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
    author: { name: "Anand Verma", role: "Hardware Valuation Lead" },
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
    author: { name: "Pooja Mehta", role: "Quality Assurance Specialist" },
    href: "/what-is-refurbished",
  },
  {
    id: 3,
    title: "Best Budget Refurbished Laptops for Students and Coders in 2026",
    excerpt: "A breakdown of Lenovo ThinkPad X1 Carbon vs Dell Latitude series for durability, keyboard quality, and multitasking value under ₹35,000.",
    date: "Dec 29, 2025",
    readTime: "5 min read",
    tag: "Buying Guides",
    author: { name: "Rohan Das", role: "Senior Tech Editor" },
    href: "/buy-refurbished",
  },
  {
    id: 4,
    title: "E-Waste Crisis in India: Why Recommerce Is the Ultimate Solution",
    excerpt: "Explore how recycling and buying renewed gadgets helps divert toxic lithium batteries and heavy metals from Indian landfills while keeping premium flagships accessible.",
    date: "Dec 20, 2025",
    readTime: "5 min read",
    tag: "Sustainability",
    author: { name: "Dr. Sumit Sen", role: "Sustainability Advisor" },
    href: "/e-waste-policy",
  },
  {
    id: 5,
    title: "The Step-by-Step Guide to Selling Your MacBook Safely",
    excerpt: "From Apple Silicon activation lock unlinking to filevault decryption and physical key cleaning: how to prep your MacBook for top valuation.",
    date: "Dec 15, 2025",
    readTime: "7 min read",
    tag: "Selling Guides",
    author: { name: "Anand Verma", role: "Hardware Valuation Lead" },
    href: "/sell-old-laptop",
  },
  {
    id: 6,
    title: "Top 5 Camera Smartphones Under ₹25,000 (Certified Refurbished)",
    excerpt: "Pixel 7A vs Galaxy S21 FE vs iPhone 11: Which pre-owned flagship delivers the best night mode, portrait mode, and 4K 60FPS video?",
    date: "Dec 05, 2025",
    readTime: "6 min read",
    tag: "Buying Guides",
    author: { name: "Rohan Das", role: "Senior Tech Editor" },
    href: "/find-new-phone",
  }
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  const filtered = ARTICLES.filter((a) => {
    const matchesCat = activeCategory === "All" || a.tag === activeCategory;
    const matchesSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Articles &amp; Tech Guides</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
            Sellbar Tech Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Insights, Buying Guides &amp; Smart Tech Advice
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Expert knowledge from certified technicians on getting top cash for old devices, testing refurbished hardware, and circular electronics.
          </p>
        </div>

        {/* Featured Article Banner */}
        {featured && (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#2bbda3] text-white text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Featured Guide
                </span>
                <span className="text-xs text-gray-300">{featured.readTime}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                <Link href={featured.href} className="hover:text-[#2bbda3] transition-colors">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-[#2bbda3]">
                    {featured.author.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{featured.author.name}</div>
                    <div className="text-[11px] text-gray-400">{featured.author.role} • {featured.date}</div>
                  </div>
                </div>
                <Link
                  href={featured.href}
                  className="px-5 py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 focus:border-[#2bbda3] outline-none text-xs shadow-xs"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:border-[#2bbda3]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3] font-semibold">
                    {art.tag}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-[#2bbda3] transition-colors">
                  <Link href={art.href}>{art.title}</Link>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-gray-800 text-[11px]">{art.author.name}</div>
                  <div className="text-[10px] text-gray-400">{art.date}</div>
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

        {/* Pagination Bar */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100 text-xs text-gray-600">
          <span>Showing 1 to {filtered.length} of {filtered.length} articles</span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-lg bg-teal-50 text-[#2bbda3] font-bold">1</span>
            <button
              disabled={true}
              className="p-2 rounded-lg border border-gray-200 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
