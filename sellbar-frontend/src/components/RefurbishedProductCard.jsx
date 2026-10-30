'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, BatteryCharging, ShoppingCart, Check } from 'lucide-react';
import { addToCart } from '@/lib/cart';
import FoldText from '@/components/FoldText';
export default function RefurbishedProductCard({ product }) {
    const [added, setAdded] = useState(false);
    const discountPercent = Math.round(((product.mrpPrice - product.sellbarPrice) / product.mrpPrice) * 100);
    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
    const getGradeBadge = (grade) => {
        switch (grade) {
            case 'FLAWLESS':
                return (<span className="bg-[#13b59b]/10 text-[#13b59b] border border-[#13b59b]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Flawless (Grade A+)
          </span>);
            case 'LIKE_NEW':
                return (<span className="bg-cyan-50 text-cyan-700 border border-cyan-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Like New (Grade A)
          </span>);
            default:
                return (<span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Superb
          </span>);
        }
    };
    return (<Link href={`/product/${product.slug}`} className="group bg-white border border-gray-200 hover:border-[#13b59b] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl shadow-xs">
      <div>
        {/* Top Badges */}
        <div className="p-3 pb-0 flex items-center justify-between gap-1 z-10 relative">
          {getGradeBadge(product.conditionGrade)}
          <span className="bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Product Image */}
        <div className="p-4 flex items-center justify-center relative overflow-hidden h-48 bg-gray-50/70">
          <img src={product.images[0]} alt={product.title} className="max-h-40 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"/>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] text-gray-700 border border-gray-200 shadow-xs">
            <BatteryCharging className="w-3 h-3 text-[#13b59b]"/>
            <span>{product.batteryHealth}% Battery</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-3 space-y-1.5">
          <div className="text-[11px] text-gray-500 font-medium">
            {product.brandName} • {product.storage} {product.ram ? `• ${product.ram}` : ''}
          </div>

          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#13b59b] transition">
            <FoldText text={product.title} foldStyle="paper" splitBy="word" hinge="top" trigger="hover" duration={0.45} stagger={0.02} fontSize="inherit" fontWeight="inherit" color="inherit"/>
          </h3>

          {/* Pricing */}
          <div className="pt-1 flex items-baseline gap-2">
            <span className="text-lg font-black text-gray-900">
              ₹{product.sellbarPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{product.mrpPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Trust points */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-500">
            <span className="inline-flex items-center gap-1 text-[#13b59b] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5"/> {product.warrantyMonths}M Warranty
            </span>
            <span>•</span>
            <span>32-pt tested</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 pt-0">
        <button onClick={handleAdd} className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${added
            ? 'bg-emerald-600 text-white'
            : 'bg-[#2bbb9e] hover:bg-[#23a58c] active:scale-[0.98] text-white shadow-xs'}`}>
          {added ? (<>
              <Check className="w-4 h-4"/> Added to Cart
            </>) : (<>
              <ShoppingCart className="w-3.5 h-3.5"/> Add to Cart
            </>)}
        </button>
      </div>
    </Link>);
}
