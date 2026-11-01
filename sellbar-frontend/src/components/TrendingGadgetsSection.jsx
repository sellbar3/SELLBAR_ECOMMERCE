'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { fetchProducts } from '@/lib/productApi';
import { getCloudinaryUrl } from '@/lib/cloudinary';

const TABS = [
  { id: 'all', label: 'All Gadgets' },
  { id: 'smart-watches', label: 'Smart Watches' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'gaming-consoles', label: 'Gaming Consoles' },
  { id: 'cameras', label: 'Cameras' },
];

export default function TrendingGadgetsSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGadgets() {
      try {
        setLoading(true);
        const params = { limit: 16 };
        if (activeTab !== 'all') {
          params.category = activeTab;
        }
        const data = await fetchProducts(params);
        let list = data.products || [];

        // If 'all', filter out mobile-phones and laptops so this section highlights other gadgets
        if (activeTab === 'all') {
          const filtered = list.filter((p) => {
            const cat = (typeof p.category === 'object' ? p.category?.slug : p.category || '').toLowerCase();
            return !cat.includes('phone') && !cat.includes('laptop');
          });
          setProducts(filtered.length > 0 ? filtered : list);
        } else {
          setProducts(list);
        }
      } catch (err) {
        console.warn('Notice: Trending gadgets loaded with fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGadgets();
  }, [activeTab]);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3 sm:mb-4 px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#13b59b] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#13b59b]" />
            <span>CERTIFIED ELECTRONICS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Trending Smartwatches, Tablets &amp; Consoles
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#13b59b] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slider Carousel Container */}
      <div className="relative group/slider">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition cursor-pointer"
            aria-label="Previous Gadgets"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 transition cursor-pointer"
            aria-label="Next Gadgets"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Horizontal Scrollable Row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-none py-1 px-1"
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-48 sm:w-60 shrink-0 bg-white rounded-md border-2 border-gray-100 p-3 animate-pulse space-y-3"
              >
                <div className="h-5 w-16 bg-gray-100 rounded" />
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-gray-100 rounded-md" />
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div className="h-5 w-full bg-gray-100 rounded" />
                <div className="h-6 w-28 bg-gray-100 rounded" />
              </div>
            ))
          ) : products.length === 0 ? (
            <div className="w-full py-8 text-center text-xs text-gray-500">
              No gadgets available under this category right now.
            </div>
          ) : (
            products.map((item) => {
              const imageUrl =
                item.images?.[0]?.url ||
                item.imageUrl ||
                getCloudinaryUrl('/products/iphone-14.webp');
              const discountAmount =
                item.compareAtPrice && item.compareAtPrice > item.price
                  ? item.compareAtPrice - item.price
                  : null;
              const percentOff =
                item.compareAtPrice && item.compareAtPrice > item.price
                  ? Math.round(
                      ((item.compareAtPrice - item.price) / item.compareAtPrice) * 100
                    )
                  : null;

              return (
                <Link
                  key={item._id}
                  href={`/product/${item.slug || item._id}`}
                  className="w-48 sm:w-60 shrink-0 bg-white rounded-md border-2 border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-3 relative cursor-pointer"
                >
                  <div>
                    {/* Top: Sellbar Assured badge */}
                    <div className="flex items-center justify-between mb-1 min-h-5 px-1">
                      <img
                        src={getCloudinaryUrl('/sellbar-assured.svg')}
                        alt="Sellbar Assured"
                        className="h-5 w-16 object-contain"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="w-28 h-28 sm:w-40 sm:h-40 mx-auto flex items-center justify-center my-2">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-200 hover:scale-105"
                      />
                    </div>

                    {/* Savings Green Badge */}
                    <div className="mx-2 min-h-7 mb-1 flex items-center">
                      {discountAmount ? (
                        <div className="text-[11px] font-bold rounded-xs text-[#008f5d] px-1.5 py-0.5 bg-[#e6f7f1] self-start">
                          ₹{discountAmount.toLocaleString('en-IN')} OFF
                        </div>
                      ) : (
                        <div className="text-[11px] font-bold rounded-xs text-[#008f5d] px-1.5 py-0.5 bg-[#e6f7f1] self-start">
                          Sellbar Assured
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      title={item.name}
                      className="text-xs sm:text-[13px] font-semibold text-gray-900 line-clamp-2 min-h-7 sm:min-h-10 mx-2 mb-2 leading-snug"
                    >
                      {item.name}
                    </h3>

                    {/* Lowest Price badge & Rating */}
                    <div className="flex items-center gap-1.5 mx-2 mb-2">
                      <span
                        className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-xs"
                        style={{ backgroundColor: '#1d3d93' }}
                      >
                        {item.badge || 'Certified'}
                      </span>
                      <div className="flex items-center gap-0.5 border border-gray-200 px-1 py-0.5 rounded-xs text-[11px] font-bold text-gray-800">
                        <span>{item.rating || 4.8}</span>
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mx-2 pt-1 border-t border-gray-50">
                      {percentOff && (
                        <span className="text-xs sm:text-sm font-bold text-red-500">
                          -{percentOff}%
                        </span>
                      )}
                      <span className="text-sm sm:text-base font-black text-gray-950">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      {item.compareAtPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{item.compareAtPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
