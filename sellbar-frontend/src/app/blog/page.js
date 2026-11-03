'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Search, 
  ChevronRight, 
  User, 
  Tag 
} from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogData';

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Selling Guide', 'Refurbished Tech', 'Buying Guide', 'Sustainability'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">Blog &amp; Knowledge Base</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#13b59b] text-xs font-bold">
            <Sparkles size={14} /> Tech Insights &amp; Valuation Secrets
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Sellbar Tech Journal
          </h1>
          <p className="text-sm text-slate-600">
            Expert guides, smartphone valuation strategies, refurbished gadgets buying advice, and recommerce sustainability news.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, guides, device tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-[#13b59b] shadow-xs"
              />
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#13b59b] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#13b59b] text-xs font-black border border-emerald-100">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={13} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#13b59b] transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {post.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {post.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[10px] font-semibold">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                    <User size={13} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{post.author}</div>
                    <div className="text-[10px] text-slate-400">{post.date}</div>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#13b59b] hover:text-[#0fa088] group-hover:translate-x-1 transition-transform"
                >
                  Read Guide <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 mt-8">
            <BookOpen size={36} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-700">No guides match your search</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for keywords like &quot;iPhone&quot;, &quot;battery&quot;, or &quot;laptop&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
}
