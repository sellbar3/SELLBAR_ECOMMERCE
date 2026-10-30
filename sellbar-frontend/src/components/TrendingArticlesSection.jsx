'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
export default function TrendingArticlesSection() {
    const articles = [
        {
            id: 1,
            title: 'All Details About Apple MacBook Ultra Launching In 2026!',
            date: '13th Mar 2026',
            summary: 'Being a MacBook fan, it gets pretty exciting when leaks surface regarding the MacBook Ultra. Discover the anticipated OLED display, M4 Ultra performance, and price predictions.',
            image: '/cashify/article-macbook-ultra.webp',
            href: '/blog',
        },
        {
            id: 2,
            title: 'iQOO Z11x vs OPPO K13: Confusion Solved, See Who Is Better Under 20K',
            date: '11th Mar 2026',
            summary: 'Detailed benchmark comparison of display refresh rates, Dimensity processor performance, battery endurance, and low-light camera capabilities under ₹20,000.',
            image: '/cashify/article-iqoo-oppo.webp',
            href: '/blog',
        },
    ];
    const newsItems = [
        {
            id: 1,
            title: 'iPhone Fold Repair Cost In India: Screen Replacement Priced At ₹1,49,900',
            date: '17th Oct 2026',
            image: '/cashify/news-iphone-repair.png',
            href: '/repair',
        },
        {
            id: 2,
            title: 'MacBook Pro Leak Hints at October Launch, OLED Display And Price Hike',
            date: '17th Oct 2026',
            image: '/cashify/news-macbook-leak.png',
            href: '/buy-refurbished',
        },
        {
            id: 3,
            title: 'Nothing Phone 4a Deal: Get The Phone At ₹36,999 With Bank Offers',
            date: '16th Oct 2026',
            image: '/cashify/news-nothing-phone.png',
            href: '/buy-refurbished',
        },
    ];
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Trending Articles (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between pb-1 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
                Tech Analysis
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Trending Articles
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1">
              <span>See All Articles</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>

          <div className="space-y-4">
            {articles.map((item) => (<Link key={item.id} href={item.href} className="group p-4 bg-white rounded-2xl border border-gray-200/80 hover:border-[#13b59b] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <Calendar className="w-3 h-3"/>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#13b59b] transition line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </Link>))}
          </div>
        </div>

        {/* Right Column: Recent News (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between pb-1 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
                Latest Updates
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Recent News
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1">
              <span>See All News</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>

          <div className="space-y-3">
            {newsItems.map((news) => (<Link key={news.id} href={news.href} className="group p-3 bg-white rounded-2xl border border-gray-200/80 hover:border-[#13b59b] shadow-xs hover:shadow-md transition-all flex gap-3 items-center">
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={news.image} alt={news.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-[10px] text-gray-400 font-semibold">{news.date}</div>
                  <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#13b59b] transition line-clamp-2 leading-tight">
                    {news.title}
                  </h3>
                </div>
              </Link>))}
          </div>
        </div>

      </div>
    </section>);
}
