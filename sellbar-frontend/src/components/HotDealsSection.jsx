'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import FoldText from '@/components/FoldText';
import { fetchFeaturedProducts } from '@/lib/productApi';
import { getCloudinaryUrl } from '@/lib/cloudinary';

export default function HotDealsSection() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDeals() {
      try {
        setLoading(true);
        const data = await fetchFeaturedProducts('hot-deal');
        setDeals(data.slice(0, 4));
      } catch (err) {
        console.warn("Notice: Hot deals loaded with fallback:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#13b59b] uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#13b59b]" />
            <span>Limited Period Offers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            <FoldText
              text="Hot Deals"
              foldStyle="paper"
              splitBy="word"
              hinge="top"
              trigger="scroll"
              duration={0.65}
              stagger={0.05}
              fontSize="inherit"
              fontWeight="inherit"
              color="#111827"
            />
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Exciting offers for more value</p>
        </div>
        <Link
          href="/buy-refurbished"
          className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1"
        >
          <span>View All Deals</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200/80 p-3 bg-white animate-pulse space-y-3"
            >
              <div className="aspect-video w-full bg-gray-100 rounded-xl" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
              <div className="h-3 w-1/2 bg-gray-100 rounded" />
            </div>
          ))
        ) : (
          deals.map((deal) => {
            const imageUrl = deal.images?.[0]?.url || getCloudinaryUrl("/cashify/hot-deal-1.webp");
            const discountOff = deal.compareAtPrice && deal.compareAtPrice > deal.price
              ? `Save ₹${(deal.compareAtPrice - deal.price).toLocaleString("en-IN")}`
              : "Best Value Deal";

            return (
              <Link
                key={deal._id}
                href={`/product/${deal.slug || deal._id}`}
                className="group block relative overflow-hidden rounded-2xl border border-gray-200/80 hover:border-[#13b59b] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <div className="aspect-video w-full overflow-hidden bg-gray-50 relative">
                  <img
                    src={imageUrl}
                    alt={deal.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  {deal.badge && (
                    <span className="absolute top-2 left-2 bg-[#1d3d93] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      {deal.badge}
                    </span>
                  )}
                </div>
                <div className="p-3.5 bg-white">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#13b59b] transition line-clamp-1">
                    {deal.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-black text-gray-900">
                      ₹{deal.price?.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-emerald-600 font-bold">
                      {discountOff}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
