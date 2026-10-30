'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, Zap, Smartphone } from 'lucide-react';
export default function SeoEditorialSection() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs">
        
        {/* Main Title */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
              Complete Re-Commerce Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-0.5">
              Sell Your Old Phone &amp; Buy Refurbished Mobile Phones with Sellbar
            </h2>
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs font-bold text-[#13b59b] hover:text-[#0f947f] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf7f5] transition shrink-0">
            <span>{isExpanded ? 'Read Less' : 'Read Full Guide'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
          </button>
        </div>

        {/* Intro */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-4">
          Sellbar is the best platform if you are looking to sell your old mobile phone or upgrade to certified refurbished devices. It offers a hassle-free experience, allowing you to evaluate your smartphone in less than 60 seconds with instant doorstep cash payout and military-grade certified data wipe.
        </p>

        {/* Expandable Content */}
        <div className={`space-y-6 pt-5 ${isExpanded ? 'block' : 'hidden sm:block'}`}>
          
          {/* Section 1: Sell Your Old Phone */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#13b59b]"/>
              <span>Sell Your Old Phone in 3 Simple Steps</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Ready to sell your old mobile phone? With Sellbar, you can easily get cash for your old mobile phone without leaving your home. Just share your phone’s details, and our dynamic AI pricing engine calculates the highest market resale value:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <li className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 space-y-1">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b]"/> 1. Get Instant Quote
                </span>
                <span>Select brand and model to get an accurate price estimate based on exact functional condition.</span>
              </li>
              <li className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 space-y-1">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b]"/> 2. Free Home Pickup
                </span>
                <span>Book your preferred time slot; our background-verified field executive visits your location.</span>
              </li>
              <li className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 space-y-1">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b]"/> 3. Instant Cash Payment
                </span>
                <span>Receive 100% upfront transfer via UPI, Bank IMPS, or Wallet before handing over the device.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Brands Supported */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#13b59b]"/>
              <span>Which Mobile Phone Brands Can Be Sold and Bought On Sellbar?</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Sellbar covers 25+ leading smartphone, laptop, and tablet brands across India. Whether you have an Apple iPhone 15, Samsung Galaxy S24, OnePlus 12, Google Pixel 8, or Xiaomi Redmi device, you get:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
            'Apple iPhones',
            'Samsung Galaxy',
            'OnePlus',
            'Xiaomi Redmi',
            'Google Pixel',
            'Vivo',
            'Oppo',
            'Realme',
            'Motorola',
            'Apple MacBook',
            'Dell Laptops',
            'Lenovo ThinkPad',
            'HP Pavilion',
            'iPad Tablets',
        ].map((brand) => (<span key={brand} className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                  {brand}
                </span>))}
            </div>
          </div>

          {/* Section 3: Buy Old Mobile Phones */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#13b59b]"/>
              <span>How To Buy Certified Refurbished Phones With Complete Peace of Mind</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Buying refurbished is the smartest way to own premium flagship tech at up to 70% discount. Every device undergoes a strict 32-point hardware and software diagnostic inspection, comes with a 15-day replacement guarantee, up to 12 months comprehensive warranty, and free doorstep delivery with Cash on Delivery (COD) options.
            </p>
          </div>

        </div>

        {/* Toggle Button for Mobile */}
        <div className="sm:hidden pt-4 text-center">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs font-bold text-[#13b59b] underline">
            {isExpanded ? 'Collapse Guide' : 'Read More About Selling & Buying'}
          </button>
        </div>

      </div>
    </section>);
}
