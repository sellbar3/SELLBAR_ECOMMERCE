'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import { addToCart } from '@/lib/cart';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';

const SAMPLE_WISHLIST = [
  {
    id: 'prod-iphone-14-128',
    name: 'Apple iPhone 14 (128 GB) - Midnight',
    brand: 'Apple',
    category: 'Mobiles',
    salePrice: 42999,
    originalPrice: 69900,
    discount: '38% OFF',
    rating: 4.8,
    reviewsCount: 342,
    conditionGrade: 'Superb',
    image: getCloudinaryUrl('/sellbar/guide-iphone13-mini.webp'),
    inStock: true,
  },
  {
    id: 'prod-oneplus-11-256',
    name: 'OnePlus 11 5G (16GB RAM / 256GB) - Titan Black',
    brand: 'OnePlus',
    category: 'Mobiles',
    salePrice: 32499,
    originalPrice: 61999,
    discount: '47% OFF',
    rating: 4.7,
    reviewsCount: 189,
    conditionGrade: 'Flawless',
    image: getCloudinaryUrl('/sellbar/phone-oneplus-12.jpg'),
    inStock: true,
  },
  {
    id: 'prod-galaxy-s22-ultra',
    name: 'Samsung Galaxy S22 Ultra 5G (12GB / 256GB) - Phantom Black',
    brand: 'Samsung',
    category: 'Mobiles',
    salePrice: 45999,
    originalPrice: 109999,
    discount: '58% OFF',
    rating: 4.9,
    reviewsCount: 421,
    conditionGrade: 'Superb',
    image: getCloudinaryUrl('/sellbar/phone-s24-ultra.jpg'),
    inStock: true,
  }
];

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sellbar_wishlist');
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(Array.isArray(parsed) && parsed.length > 0 ? parsed : SAMPLE_WISHLIST);
      } else {
        setItems(SAMPLE_WISHLIST);
        localStorage.setItem('sellbar_wishlist', JSON.stringify(SAMPLE_WISHLIST));
      }
    } catch {
      setItems(SAMPLE_WISHLIST);
    }
  }, []);

  const handleRemove = (id) => {
    const updated = items.filter((item) => (item.id || item._id) !== id);
    setItems(updated);
    try {
      localStorage.setItem('sellbar_wishlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[#13b59b] transition">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">My Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart size={22} className="fill-rose-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Wishlist <span className="text-slate-400 text-lg font-semibold">({items.length} items)</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Devices you have saved to compare or purchase later. Prices update in real time.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>

        {addedItem && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
            <CheckCircle2 size={16} className="text-[#13b59b]" />
            <span>&quot;{addedItem}&quot; added to your cart successfully!</span>
            <Link href="/cart" className="ml-auto underline text-[#13b59b]">View Cart</Link>
          </div>
        )}

        {items.length === 0 ? (
          <div className="mt-12 bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
              <Heart size={28} />
            </div>
            <h2 className="text-lg font-black text-slate-900">Your wishlist is empty</h2>
            <p className="text-xs text-slate-500 mt-2 mb-6">
              Explore our wide range of refurbished mobile phones, laptops, and gadgets and click the heart icon to save items.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition"
            >
              Explore Shop <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const itemId = item.id || item._id;
              return (
                <div
                  key={itemId}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-4 sm:p-5">
                    {/* Badge row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#13b59b] border border-emerald-100">
                        {item.conditionGrade || 'Refurbished'}
                      </span>
                      <button
                        onClick={() => handleRemove(itemId)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative h-44 w-full flex items-center justify-center bg-slate-50/50 rounded-xl overflow-hidden mb-4 p-2">
                      <img
                        src={getProductImageUrl(item, item.category)}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getCategoryFallbackImage(item.category);
                        }}
                        className="h-36 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.discount && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-rose-500 text-white rounded-md text-[10px] font-black">
                          {item.discount}
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.brand || 'Certified'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-0.5 min-h-[40px] hover:text-[#13b59b] transition">
                      <Link href={`/product/${item.slug || itemId}`}>
                        {item.name}
                      </Link>
                    </h3>

                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 text-xs font-bold border border-amber-200/60">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span>{item.rating}</span>
                        </div>
                        {item.reviewsCount && (
                          <span className="text-[11px] text-slate-400">({item.reviewsCount})</span>
                        )}
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-black text-slate-900">
                        ₹{(item.salePrice || item.price || 0).toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && item.originalPrice > item.salePrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 py-2.5 px-3 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart size={15} /> Move to Cart
                    </button>
                    <Link
                      href={`/product/${item.slug || itemId}`}
                      className="p-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl transition"
                      title="View Details"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Benefits bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
          <div className="flex items-center gap-3.5 bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#13b59b] flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">6-12 Months Warranty</h4>
              <p className="text-[11px] text-slate-500">Comprehensive warranty with doorstep support.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#13b59b] flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">32-Point Quality Check</h4>
              <p className="text-[11px] text-slate-500">Inspected by certified hardware engineers.</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 bg-white p-5 rounded-2xl border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#13b59b] flex items-center justify-center shrink-0">
              <ShoppingCart size={22} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">7-Day Easy Returns</h4>
              <p className="text-[11px] text-slate-500">No questions asked refund if not satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
