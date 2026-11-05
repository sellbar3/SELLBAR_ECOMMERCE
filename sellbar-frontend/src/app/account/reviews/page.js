'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { getCloudinaryUrl } from '@/lib/cloudinary';

const SAMPLE_REVIEWS = [
  {
    id: 'rev-1',
    productName: 'Apple iPhone 13 (128GB) - Starlight',
    productGrade: 'Superb (Refurbished)',
    productImage: getCloudinaryUrl('/sellbar/guide-iphone13-mini.webp'),
    orderId: 'ORD-SB-89211',
    rating: 5,
    title: 'Almost like brand new, battery health at 96%!',
    comment: 'Received within 2 days in Bettiah. Super clean packaging, original charging cable included, and not a single scratch on the screen. Highly recommended over Olx!',
    date: '30 Oct 2026',
    helpfulCount: 14,
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    productName: 'OnePlus 9 Pro 5G (8GB/128GB)',
    productGrade: 'Sold Device (Trade-In)',
    productImage: getCloudinaryUrl('/sellbar/phone-oneplus-12.jpg'),
    orderId: 'SB-SELL-49534',
    rating: 5,
    title: 'Instant doorstep pickup and immediate UPI payment',
    comment: 'The executive arrived on time at Supriya Cinema road, inspected the phone in 10 minutes, and transferred ₹19,500 directly into my bank account without any unnecessary bargaining.',
    date: '24 Oct 2026',
    helpfulCount: 9,
    verifiedPurchase: true,
  }
];

export default function AccountReviewsPage() {
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [likedReviews, setLikedReviews] = useState({});

  const handleHelpful = (id) => {
    if (likedReviews[id]) return;
    setReviews(reviews.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)));
    setLikedReviews({ ...likedReviews, [id]: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/account" className="hover:text-[#13b59b] transition">Account</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">My Reviews &amp; Ratings</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Star size={22} className="fill-amber-400 text-amber-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Reviews &amp; Experiences
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your honest feedback on purchased refurbished gadgets and sell-order doorstep pickups.
            </p>
          </div>

          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            Review More Orders
          </Link>
        </div>

        <div className="mt-8 space-y-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Product header */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1">
                  {rev.productImage ? (
                    <img src={rev.productImage} alt={rev.productName} className="h-full w-auto object-contain" />
                  ) : (
                    <Smartphone size={24} className="text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {rev.productName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      {rev.productGrade}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Order #{rev.orderId}</span>
                    <span>•</span>
                    <span>Reviewed on {rev.date}</span>
                  </div>
                </div>

                {rev.verifiedPurchase && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-[#13b59b] border border-emerald-200 rounded-full text-[11px] font-bold">
                    <CheckCircle2 size={13} /> Verified Transaction
                  </span>
                )}
              </div>

              {/* Review body */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                      />
                    ))}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{rev.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>

                <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={() => handleHelpful(rev.id)}
                    disabled={likedReviews[rev.id]}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                      likedReviews[rev.id]
                        ? 'bg-emerald-50 border-emerald-200 text-[#13b59b] font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp size={13} />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck size={14} className="text-[#13b59b]" /> Publicly displayed
                  </span>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <MessageSquare size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">No reviews published yet</p>
              <p className="text-xs text-slate-400 mt-1">Once you complete an order or sell a phone, write a review to help others.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
