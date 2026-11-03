'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

export default function MobileModelCard({ model }) {
  const brandSlug = model.brandSlug.toLowerCase();
  const modelSlug = model.slug.toLowerCase();
  const detailUrl = `/sell-old-mobile-phone/${brandSlug}/${modelSlug}`;

  // Formatted price
  const formattedPrice = `₹${model.baseResalePrice.toLocaleString('en-IN')}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      {/* Top Banner & Device Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={getProductImageUrl(model, 'mobile')}
          alt={model.name}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getCategoryFallbackImage('mobile');
          }}
        />

        {/* Brand Tag */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-slate-800 text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm border border-slate-200/60 uppercase tracking-wide">
          {model.brand}
        </span>

        {/* 5G Badge */}
        {model.network === '5G' && (
          <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
            <Zap size={10} /> 5G
          </span>
        )}
      </div>

      {/* Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {model.series} • {model.launchYear}
          </span>
          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#13b59b] transition line-clamp-1 mt-0.5">
            {model.name}
          </h3>

          {/* Variants chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {model.variants.slice(0, 3).map((v) => (
              <span
                key={v.id}
                className="bg-slate-50 border border-slate-200/80 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md"
              >
                {v.ram} / {v.storage}
              </span>
            ))}
            {model.variants.length > 3 && (
              <span className="text-slate-400 text-[10px] font-bold self-center">
                +{model.variants.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price & Action CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">Get Up To</span>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {formattedPrice}
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Instant Cash
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={detailUrl}
              className="py-2.5 px-3 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-1.5 transition text-center"
            >
              <span>Get Best Price</span>
              <ArrowRight size={13} />
            </Link>

            <Link
              href={detailUrl}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
