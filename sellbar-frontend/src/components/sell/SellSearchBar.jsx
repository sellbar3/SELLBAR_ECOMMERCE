'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, Flame, ChevronRight } from 'lucide-react';
import { MOBILE_MODELS } from '@/lib/sellMobileData';

const POPULAR_SEARCHES = [
  'iPhone 15 Pro',
  'Galaxy S24 Ultra',
  'iPhone 14',
  'OnePlus 12',
  'Galaxy S23',
  'iPhone 13',
  'Redmi Note 13',
  'Pixel 8',
];

const RECENT_KEY = 'sellbar_recent_phone_searches';

export default function SellSearchBar({ onSelectModel, className = '' }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5));
    } catch {}
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = (text) => {
    try {
      const updated = [text, ...recentSearches.filter((s) => s.toLowerCase() !== text.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleSelect = (model) => {
    saveRecentSearch(model.name);
    setIsOpen(false);
    setQuery('');
    if (onSelectModel) {
      onSelectModel(model);
    } else {
      router.push(`/sell-old-mobile-phone/${model.brandSlug}/${model.slug}`);
    }
  };

  const handleQuerySubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    saveRecentSearch(query.trim());
    setIsOpen(false);
    // Find best match
    const match = MOBILE_MODELS.find(
      (m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.slug.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      router.push(`/sell-old-mobile-phone/${match.brandSlug}/${match.slug}`);
    } else {
      router.push(`/sell-old-mobile-phone?search=${encodeURIComponent(query.trim())}`);
    }
  };

  // Filter models for autocomplete
  const suggestions = query.trim()
    ? MOBILE_MODELS.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.brand.toLowerCase().includes(query.toLowerCase()) ||
          m.slug.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  // Helper to highlight matching text
  const highlightMatch = (text, match) => {
    if (!match.trim()) return text;
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <span key={i} className="text-[#13b59b] font-black underline decoration-emerald-400">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <form onSubmit={handleQuerySubmit} className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search your phone model (e.g. iPhone 14, Galaxy S23, OnePlus 12)..."
          className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-semibold rounded-2xl pl-12 pr-28 py-3.5 sm:py-4 shadow-lg border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-[#13b59b] focus:border-transparent transition"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-20 text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 sm:right-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition cursor-pointer"
        >
          Check Value
        </button>
      </form>

      {/* Autocomplete & Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Live Autocomplete Results */}
          {query.trim() ? (
            <div>
              {suggestions.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  <div className="px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Matching Phones ({suggestions.length})
                  </div>
                  {suggestions.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => handleSelect(model)}
                      className="px-4 py-3 flex items-center justify-between hover:bg-emerald-50/60 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-[#13b59b] transition">
                            {highlightMatch(model.name, query)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {model.brand} • Up to ₹{model.baseResalePrice.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-[#13b59b] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500">
                  <p className="text-sm font-semibold">No direct match found for &quot;{query}&quot;</p>
                  <p className="text-xs mt-1 text-slate-400">
                    Try searching by brand (e.g. &apos;Apple&apos; or &apos;Samsung&apos;) or check all brands below.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> Recent Searches
                    </span>
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem(RECENT_KEY);
                      }}
                      className="text-[11px] text-slate-400 hover:text-rose-500 font-medium cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQuery(s);
                          handleQuerySubmit();
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2">
                  <Flame size={13} className="text-amber-500" /> Trending Mobile Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(item);
                        handleQuerySubmit();
                      }}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
