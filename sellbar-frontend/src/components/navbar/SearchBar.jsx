'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  X, 
  Sparkles, 
  Smartphone, 
  Tag, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { SEARCH_SUGGESTIONS, TRENDING_TAGS } from './navData';

export default function SearchBar({ onSearchSubmit, isMobile = false }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Filter suggestions
  const filteredProducts = query.trim()
    ? SEARCH_SUGGESTIONS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_SUGGESTIONS.slice(0, 4);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredProducts.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && filteredProducts[selectedIndex]) {
        e.preventDefault();
        router.push(filteredProducts[selectedIndex].href);
        setIsOpen(false);
      } else if (query.trim()) {
        e.preventDefault();
        submitQuery(query.trim());
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const submitQuery = (q) => {
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setIsOpen(false);
    if (onSearchSubmit) onSearchSubmit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      submitQuery(query.trim());
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="flex items-center bg-slate-100/90 hover:bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#13b59b]/30 border border-slate-200/80 focus-within:border-[#13b59b] rounded-2xl transition duration-150 shadow-inner-xs">
          <div className="pl-3.5 pr-2 text-slate-400">
            <Search className="w-4 h-4 stroke-[2.2]" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for mobiles, laptops, accessories, brands..."
            className="w-full bg-transparent py-2.5 sm:py-2.5 pr-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none"
            aria-label="Search products, brands and electronics"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(-1);
                inputRef.current?.focus();
              }}
              className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
          <button
            type="submit"
            className="hidden sm:inline-flex items-center px-4 py-1.5 mr-1.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-98 duration-150 overflow-hidden">
          {/* Trending Searches */}
          <div className="mb-4">
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp size={12} className="text-[#13b59b]" /> Trending Right Now
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    submitQuery(tag);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-teal-50 hover:text-[#13b59b] text-slate-700 rounded-lg border border-slate-200/60 transition cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Matching Devices */}
          <div>
            <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
              <span>{query.trim() ? 'Matching Electronics' : 'Recommended Searches'}</span>
              <span className="text-[10px] text-slate-400 font-normal">Use ↑↓ keys to navigate</span>
            </div>

            <div className="space-y-1">
              {filteredProducts.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs transition ${
                      isSelected
                        ? 'bg-teal-50 text-[#13b59b] font-bold'
                        : 'hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                        <Smartphone size={14} />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.category} • Grade: {item.grade}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-slate-900 text-xs">
                        {item.price}
                      </span>
                      <ArrowRight size={13} className="text-slate-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Footer Link */}
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px] flex items-center gap-1">
              <Sparkles size={12} className="text-[#13b59b]" /> 32-point tested devices
            </span>
            <button
              type="button"
              onClick={() => submitQuery(query || 'phones')}
              className="text-xs font-bold text-[#13b59b] hover:underline"
            >
              See all results for &quot;{query || 'products'}&quot; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
