import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Articles & Buying Guides | Sellbar.in",
  description: "Read expert guides on buying refurbished laptops, selling old phones for max cash, and device care tips.",
};

const ARTICLES = [
  {
    title: "How to Get Maximum Cash When Selling Your Old iPhone in 2026",
    excerpt: "Learn the top physical preparation tips, battery optimization, and timing tricks to lock in the highest buyback price for your iPhone.",
    date: "Jan 18, 2026",
    readTime: "4 min read",
    tag: "Selling Guide",
    href: "/sell-old-mobile-phone",
  },
  {
    title: "Refurbished vs Used vs Second-Hand: What You Must Know",
    excerpt: "Understand the critical differences between unverified second-hand devices and 32-point certified refurbished gadgets backed by warranty.",
    date: "Jan 12, 2026",
    readTime: "6 min read",
    tag: "Refurbished Tech",
    href: "/what-is-refurbished",
  },
  {
    title: "Best Budget Refurbished Laptops for Students and Coders",
    excerpt: "A breakdown of Lenovo ThinkPad X1 Carbon vs Dell Latitude series for durability, keyboard quality, and multitasking value under ₹35,000.",
    date: "Dec 29, 2025",
    readTime: "5 min read",
    tag: "Buying Guide",
    href: "/buy-refurbished",
  },
  {
    title: "E-Waste Crisis in India: Why Recommerce Is the Ultimate Solution",
    excerpt: "Explore how recycling and buying renewed gadgets helps reduce electronic waste while keeping top-tier flagships affordable.",
    date: "Dec 20, 2025",
    readTime: "5 min read",
    tag: "Sustainability",
    href: "/e-waste-policy",
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Articles &amp; Guides</span>
        </nav>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Sellbar Insights &amp; Guides</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Expert knowledge to help you buy certified refurbished gadgets and sell old devices like a pro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((art, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#2bbda3] text-xs font-semibold">
                    {art.tag}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{art.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 leading-snug hover:text-[#2bbda3] transition-colors">
                  <Link href={art.href}>{art.title}</Link>
                </h2>
                <p className="text-sm text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {art.date}
                </span>
                <Link
                  href={art.href}
                  className="font-semibold text-[#2bbda3] hover:text-[#249e88] flex items-center gap-1 text-sm"
                >
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
