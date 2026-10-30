import React from 'react';
import Link from 'next/link';
import { Smartphone, Zap, ShieldCheck, Truck, CheckCircle2, Star, Store, Clock, Check, X, CreditCard, Headphones, Wrench, } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import OurServicesSection from '@/components/OurServicesSection';
import HotDealsSection from '@/components/HotDealsSection';
import RefurbishedPhonesSection from '@/components/RefurbishedPhonesSection';
import RefurbishedLaptopsSection from '@/components/RefurbishedLaptopsSection';
import ExclusiveStoresSection from '@/components/ExclusiveStoresSection';
import CashifyGuidesSection from '@/components/CashifyGuidesSection';
import TrendingArticlesSection from '@/components/TrendingArticlesSection';
import SeoEditorialSection from '@/components/SeoEditorialSection';
import SellYourOldDeviceSection from '@/components/SellYourOldDeviceSection';
import BrandPartnersSlider from '@/components/BrandPartnersSlider';
import HomeFaq from '@/components/HomeFaq';
export default function HomePage() {
  // Customer Reviews
  const reviews = [
    {
      name: 'Aman Verma',
      city: 'Gurgaon, Sector 49',
      rating: 5,
      date: '2 days ago',
      title: 'Got cash in 20 minutes right at my doorstep!',
      review: 'Sold my iPhone 13. The technician arrived on time with an ID card, ran the quick 32-point diagnostics in front of me, and transferred ₹34,500 to my UPI account instantly.',
      device: 'Sold Apple iPhone 13 (128GB)',
    },
    {
      name: 'Priya Sundaram',
      city: 'Bengaluru, Indiranagar',
      rating: 5,
      date: '1 week ago',
      title: 'Refurbished MacBook Air looks 100% brand new',
      review: 'Was skeptical about buying refurbished electronics online, but Sellbar exceeded expectations. Battery health was 98% and condition is flawless. 12 months warranty gave me peace of mind.',
      device: 'Bought MacBook Air M2 (Space Grey)',
    },
    {
      name: 'Rohit Kulkarni',
      city: 'Mumbai, Andheri West',
      rating: 5,
      date: '3 days ago',
      title: 'Screen replaced in 30 mins at my office',
      review: 'Dropped my OnePlus 11 and shattered the glass. Booked doorstep repair and the engineer fixed it in the office cafeteria with OEM parts and gave a 6-month warranty card.',
      device: 'Repaired OnePlus 11 Display',
    },
  ];
  return (<div className="space-y-10 sm:space-y-12 pb-16 font-sans">

    {/* 1. HERO SLIDER CAROUSEL (6 Real Cashify Promotional Banners) */}
    <HeroCarousel />

    {/* 2. OUR SERVICES (Exact 16 Inspected Mint Cards in 2 Rows) */}
    <OurServicesSection />

    {/* 3. SELL YOUR OLD DEVICE NOW (Exact Match to Screenshot) */}
    <SellYourOldDeviceSection />

    {/* 4. HOT DEALS (Cashify Promotional Banners) */}
    <HotDealsSection />

    {/* 5. BUY REFURBISHED PHONES (Exact Certified Phones with Assured Badge & Filters) */}
    <RefurbishedPhonesSection />

    {/* 6. REFURBISHED LAPTOPS (MacBooks, ThinkPads, Dell Latitudes) */}
    <RefurbishedLaptopsSection />

    {/* 7. DOORSTEP MOBILE & LAPTOP REPAIR SERVICES (Cashify 30-Min Live Fix) */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-linear-to-r from-[#0d2a26] via-[#103a35] to-[#124942] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#13b59b]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/20 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" /> 30-Minute Doorstep Fix
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Phone Screen or Battery Broken? <br />
              <span className="text-[#2bbb9e]">We Repair At Your Doorstep</span>
            </h2>
            <p className="text-sm text-gray-200/90 max-w-xl leading-relaxed">
              Trained technician visits your home or office with OEM parts and fixes your device right in front of your eyes. Comes with 6 months warranty and free diagnostics.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-bold text-gray-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> 6 Months Repair Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Live Repair In Front Of You
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2bbb9e]" /> Pay After Full Satisfaction
              </span>
            </div>

            <div className="pt-3">
              <Link href="/repair" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2bbb9e] hover:bg-[#23a58c] active:scale-[0.98] text-slate-950 font-black rounded-xl text-sm shadow-xl transition">
                <Wrench className="w-4 h-4" />
                <span>Book Doorstep Repair Now</span>
              </Link>
            </div>
          </div>

          {/* Repair Services Quick Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {[
              { title: 'Screen Glass Fix', cost: 'From ₹1,499', icon: Smartphone },
              { title: 'Battery Replacement', cost: 'From ₹999', icon: Zap },
              { title: 'Charging Port Fix', cost: 'From ₹599', icon: Zap },
              { title: 'Mic & Speaker', cost: 'From ₹699', icon: Headphones },
            ].map((item, idx) => {
              const Icon = item.icon || Wrench;
              return (<div key={idx} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-[#2bbb9e]/50 transition">
                <Icon className="w-6 h-6 text-[#2bbb9e] mb-2" />
                <div className="text-xs font-bold text-white">{item.title}</div>
                <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">{item.cost}</div>
              </div>);
            })}
          </div>
        </div>
      </div>
    </section>

    {/* 8. OUR EXCLUSIVE STORES (200+ Experience Centres, Gurgaon Airia Mall, Ambience Mall, etc.) */}
    <ExclusiveStoresSection />

    {/* 8B. BRAND PARTNERS & ECOSYSTEM SLIDER (Left to right continuous marquee) */}
    <BrandPartnersSlider />

    {/* 9. BETTER FOR POCKET & BE SMART SELL SMART (Cashify's 8 Guide Cards) */}
    <CashifyGuidesSection />

    {/* 10. HOW TO SELL IN 3 STEPS */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
            Quick &amp; Hassle-Free
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How To Sell Your Old Phone in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 rounded-2xl bg-[#edf7f5] text-[#13b59b] flex items-center justify-center font-black text-2xl mb-4 border border-[#d8ece7] shadow-xs">
              1
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">Check Live Valuation</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
              Select your phone or gadget model and answer simple questions to get an algorithmic fair quote in 60 seconds.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 rounded-2xl bg-[#edf7f5] text-[#13b59b] flex items-center justify-center font-black text-2xl mb-4 border border-[#d8ece7] shadow-xs">
              2
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">Schedule Free Doorstep Pickup</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
              Choose your convenient pickup date and time slot. Our background-verified agent visits your home or office.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 rounded-2xl bg-[#edf7f5] text-[#13b59b] flex items-center justify-center font-black text-2xl mb-4 border border-[#d8ece7] shadow-xs">
              3
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1.5">Get Instant UPI / Bank Payment</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
              Technician performs a fast 3-minute check and instantly transfers 100% money before device handover.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 11. WHY 40 LAKH+ CUSTOMERS CHOOSE US (4 Trust Pillars) */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
        <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
          Re-Commerce You Can Trust
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Why 40 Lakh+ Customers Choose Us
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-[#13b59b]/15 text-[#13b59b] flex items-center justify-center mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Instant Price Quote</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Objective AI pricing engine ensures highest possible value for your device based on live market demand.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-4">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Free Doorstep Pickup</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            No need to travel to crowded markets. Our verified technician arrives at your home at your scheduled time.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Instant Spot Payment</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Receive 100% upfront cash transfer to your UPI or Bank account right on handover. Zero wait time.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs hover:shadow-md transition">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">100% Certified Data Wipe</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Military-standard NIST 800-88 data sanitization ensures zero recovery of your personal photos or documents.
          </p>
        </div>
      </div>
    </section>

    {/* 12. COMPARISON TABLE */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
        <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
          Transparent Comparison
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Selling On Sellbar vs Other Channels
        </h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 font-bold">
                <th className="p-4 sm:p-5">Feature</th>
                <th className="p-4 sm:p-5 text-[#13b59b] bg-[#edf7f5]">Sellbar.in</th>
                <th className="p-4 sm:p-5 text-gray-500">Online Classifieds</th>
                <th className="p-4 sm:p-5 text-gray-500">Offline Local Stores</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-gray-900">Valuation Transparency</td>
                <td className="p-4 sm:p-5 text-[#13b59b] font-bold bg-[#edf7f5]/40 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Algorithmic Fair Quote
                </td>
                <td className="p-4 sm:p-5 text-gray-500">Unrealistic lowballs</td>
                <td className="p-4 sm:p-5 text-gray-500">Arbitrary subjective cuts</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-gray-900">Doorstep Convenience</td>
                <td className="p-4 sm:p-5 text-[#13b59b] font-bold bg-[#edf7f5]/40 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Free Doorstep Pickup
                </td>
                <td className="p-4 sm:p-5 text-gray-500">Meet strangers in public</td>
                <td className="p-4 sm:p-5 text-gray-500">Travel to crowded market</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-gray-900">Payment Speed &amp; Security</td>
                <td className="p-4 sm:p-5 text-[#13b59b] font-bold bg-[#edf7f5]/40 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Instant Spot UPI / IMPS
                </td>
                <td className="p-4 sm:p-5 text-gray-500">Fake cheque / UPI fraud risks</td>
                <td className="p-4 sm:p-5 text-gray-500">Cash haggling</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-gray-900">Data Sanitization Guarantee</td>
                <td className="p-4 sm:p-5 text-[#13b59b] font-bold bg-[#edf7f5]/40 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> NIST 800-88 Certified
                </td>
                <td className="p-4 sm:p-5 text-rose-500 flex items-center gap-1 font-medium">
                  <X className="w-4 h-4" /> High privacy risk
                </td>
                <td className="p-4 sm:p-5 text-rose-500 flex items-center gap-1 font-medium">
                  <X className="w-4 h-4" /> No guarantee
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* 13. TRENDING ARTICLES & RECENT NEWS */}
    <TrendingArticlesSection />

    {/* 15. REAL CUSTOMER REVIEWS */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>4.8 / 5 Rated by 40 Lakh+ Customers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Real Experiences From Real Users
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((r, idx) => (<div key={idx} className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(r.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400" />))}
            </div>
            <h3 className="text-sm font-bold text-gray-900">{r.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{r.review}</p>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-900">{r.name}</div>
              <div className="text-[10px] text-gray-400">{r.city}</div>
            </div>
            <div className="text-[10px] font-semibold text-[#13b59b] bg-[#edf7f5] px-2 py-0.5 rounded-full">
              Verified Transaction
            </div>
          </div>
        </div>))}
      </div>
    </section>

    {/* 16. FREQUENTLY ASKED QUESTIONS (3 Cashify Category Tabs) */}
    <HomeFaq />

    {/* 17. SEO EDITORIAL GUIDE SECTION (Expandable Cashify Guide) */}
    <SeoEditorialSection />

    {/* 18. DOWNLOAD APP & STORE HUBS BANNER */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#edf7f5] border border-[#d8ece7] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider">
            200+ Hubs Across India
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Prefer In-Person Evaluation? Visit A Sellbar Store
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            Walk into any of our flagship experience hubs in Gurgaon, Delhi NCR, Bengaluru, Mumbai, or Pune for instant cash, free screen inspection, and hands-on refurbished demos.
          </p>
        </div>

        <Link href="/about" className="px-6 py-3.5 bg-[#2bbb9e] hover:bg-[#23a58c] active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-sm transition shrink-0 flex items-center gap-2">
          <Store className="w-4 h-4" />
          <span>Find Nearest Store</span>
        </Link>
      </div>
    </section>

  </div>);
}
