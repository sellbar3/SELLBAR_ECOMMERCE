'use client';
import React from 'react';
import Link from 'next/link';
import { Store, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import FoldText from '@/components/FoldText';
export default function ExclusiveStoresSection() {
    const stores = [
        {
            id: 1,
            city: 'Gurgaon',
            name: 'Sellbar Experience Store - Airia Mall',
            address: 'Ground Floor, Reach AIRIA Mall, Badshahpur Sohna Rd Hwy, Sector 68, Gurugram, Haryana 122101',
            timings: '11:00 AM - 10:00 PM',
            rating: '4.8',
            reviews: '1,420+ ratings',
            phone: '+91 72900 68900',
        },
        {
            id: 2,
            city: 'Gurgaon',
            name: 'Sellbar Buy, Sell & Repair - Galleria Market',
            address: 'Shop SF-42, 1st Floor, DLF Galleria Market, DLF Phase IV, Gurugram, Haryana 122009',
            timings: '11:00 AM - 09:30 PM',
            rating: '4.9',
            reviews: '2,850+ ratings',
            phone: '+91 72900 68901',
        },
        {
            id: 3,
            city: 'Gurgaon',
            name: 'Sellbar Flagship Store - Ambience Mall',
            address: 'Level 2, Near Food Court, Ambience Mall, NH 8, Gurugram, Haryana 122002',
            timings: '11:00 AM - 10:00 PM',
            rating: '4.8',
            reviews: '3,100+ ratings',
            phone: '+91 72900 68902',
        },
        {
            id: 4,
            city: 'Gurgaon',
            name: 'Sellbar Hub - Cyber Hub DLF Phase 2',
            address: 'Shop 14, Building 10, DLF Cyber City, Sector 24, Gurugram, Haryana 122002',
            timings: '10:30 AM - 09:30 PM',
            rating: '4.7',
            reviews: '1,890+ ratings',
            phone: '+91 72900 68903',
        },
    ];
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              <Store className="w-4 h-4 text-[#13b59b]"/>
              <span>200+ Experience Centres</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <img src="/cashify/store-star.webp" alt="star" className="w-3 h-3"/>
              <span>4.5+ Star Ratings</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            <FoldText text="Our Exclusive Stores" foldStyle="paper" splitBy="word" hinge="top" trigger="scroll" duration={0.65} stagger={0.05} fontSize="inherit" fontWeight="inherit" color="#111827"/>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Walk into any nearest store for instant inspection, cash on spot, and hands-on testing
          </p>
        </div>
        <Link href="/about" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center gap-1 shrink-0">
          <span>View All 200+ Stores</span>
          <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stores.map((store) => (<div key={store.id} className="group bg-white rounded-2xl border border-gray-200/80 hover:border-[#13b59b] p-4 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div>
              {/* City Pill & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold text-[#13b59b] bg-[#edf7f5] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#13b59b]"/>
                  {store.city}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                  <img src="/cashify/store-star.webp" alt="star" className="w-3.5 h-3.5"/>
                  <span>{store.rating}</span>
                </div>
              </div>

              {/* Store Name */}
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#13b59b] transition mb-2 line-clamp-2">
                {store.name}
              </h3>

              {/* Address */}
              <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">
                {store.address}
              </p>

              {/* Timings */}
              <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium mb-3">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                <span>Timings : {store.timings}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
              <Link href="/about" className="flex-1 py-2 px-3 text-center text-xs font-bold text-[#13b59b] bg-[#edf7f5] hover:bg-[#13b59b] hover:text-white rounded-xl transition">
                View Details
              </Link>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-[#13b59b] bg-gray-50 hover:bg-[#edf7f5] rounded-xl border border-gray-200 transition" title="Get Directions">
                <ExternalLink className="w-4 h-4"/>
              </a>
            </div>
          </div>))}
      </div>
    </section>);
}
