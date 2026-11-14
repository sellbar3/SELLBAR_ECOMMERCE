'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone,
  Cpu,
  Camera,
  BatteryCharging,
  Layers,
  HelpCircle,
  ArrowRight,
  Star,
  RotateCcw,
  Check,
} from 'lucide-react';
import { getMobileModelBySlug, MOBILE_MODELS } from '@/lib/sellMobileData';
import { getProductImageUrl, getCategoryFallbackImage } from '@/lib/productImageHelper';
import ConditionAssessmentWizard from '@/components/sell/ConditionAssessmentWizard';
import SellBookingModal from '@/components/sell/SellBookingModal';

function IndividualSellMobileContent() {
  const params = useParams();
  const router = useRouter();

  const brandSlug = params?.brand ? String(params.brand) : '';
  const modelSlug = params?.model ? String(params.model) : '';

  const [model, setModel] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (brandSlug && modelSlug) {
      const cleanBrand = brandSlug.replace(/^sell-/, '').trim();
      const cleanModel = modelSlug.replace(/^used-/, '').trim();

      const found =
        getMobileModelBySlug(cleanBrand, cleanModel) ||
        getMobileModelBySlug(cleanBrand, modelSlug) ||
        getMobileModelBySlug(brandSlug, modelSlug);

      if (found) {
        setModel(found);
      } else {
        // Fallback: try finding by model slug alone or partial match
        const fallback = MOBILE_MODELS.find(
          (m) =>
            m.slug.toLowerCase() === cleanModel.toLowerCase() ||
            m.slug.toLowerCase() === modelSlug.toLowerCase() ||
            modelSlug.toLowerCase().includes(m.slug.toLowerCase()) ||
            cleanModel.toLowerCase().includes(m.slug.toLowerCase())
        );
        setModel(fallback || null);
      }
    }
  }, [brandSlug, modelSlug]);

  if (!model) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center max-w-md space-y-4">
          <Smartphone size={40} className="text-[#13b59b] mx-auto" />
          <h2 className="text-xl font-bold">Mobile Model Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested smartphone model might have a different slug or is cataloged under another brand.
          </p>
          <Link
            href="/sell-old-mobile-phone"
            className="inline-block py-2.5 px-6 bg-[#13b59b] text-white rounded-xl text-xs font-bold shadow"
          >
            Browse All Phone Models
          </Link>
        </div>
      </div>
    );
  }

  // Related models from same brand
  const relatedModels = MOBILE_MODELS.filter(
    (m) => m.brandSlug.toLowerCase() === model.brandSlug.toLowerCase() && m.id !== model.id
  ).slice(0, 3);

  const handleProceedToBooking = (data) => {
    setBookingData(data);
    setIsBookingModalOpen(true);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: model.name,
    image: model.image,
    description: `Sell old ${model.name} online for best market value with instant doorstep cash and free pickup in Bettiah & West Champaran.`,
    brand: {
      '@type': 'Brand',
      name: model.brand,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: model.baseResalePrice,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/sell-old-mobile-phone" className="hover:text-[#13b59b] transition">Sell Old Mobile</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href={`/sell-old-mobile-phone/${model.brandSlug}`} className="hover:text-[#13b59b] transition capitalize">
              {model.brand}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-900 font-semibold">{model.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Overview Header */}
      <section className="bg-white border-b border-slate-200/80 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl p-6 border border-slate-200/80 flex items-center justify-center shadow-inner">
                <img
                  src={getProductImageUrl(model, 'mobile')}
                  alt={model.name}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getCategoryFallbackImage('mobile');
                  }}
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-slate-800 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-slate-200 uppercase">
                  {model.brand}
                </span>
                {model.network === '5G' && (
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Zap size={10} /> 5G Ready
                  </span>
                )}
              </div>
            </div>

            {/* Right Information */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {model.series} • Released in {model.launchYear}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  Sell Old {model.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Get exact market quote in 60 seconds with free doorstep evaluation and instant payout across West Champaran.
                </p>
              </div>

              {/* Price Callout */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex flex-wrap items-baseline gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">Get Up To</span>
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      ₹{model.baseResalePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 border-l border-emerald-300 pl-4">
                    <div>Original Launch Price: <span className="line-through">₹{model.launchPrice.toLocaleString('en-IN')}</span></div>
                    <div className="text-emerald-700 font-bold mt-0.5">Highest Resale Value Guarantee</div>
                  </div>
                </div>

                {/* Direct WhatsApp Call to Action */}
                <a
                  href={`https://wa.me/917717517777?text=${encodeURIComponent(
                    `Hello Sellbar! I want to sell my used ${model.name}. Expected valuation: ₹${model.baseResalePrice.toLocaleString('en-IN')}. Please confirm doorstep pickup and cash payout.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Quick Sell on WhatsApp</span>
                </a>
              </div>

              {/* Hardware Highlights Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 block font-semibold text-[10px]">Processor</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{model.specs.processor}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 block font-semibold text-[10px]">Display</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{model.specs.display}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 block font-semibold text-[10px]">Main Camera</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{model.specs.rearCamera}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 block font-semibold text-[10px]">Battery</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{model.specs.battery}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Condition Assessment Wizard Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ConditionAssessmentWizard
          model={model}
          onProceedToBooking={handleProceedToBooking}
        />
      </section>

      {/* 3-Step Selling Process Explanation */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider block">
              Quick &amp; Seamless Experience
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              How Selling Works on Sellbar
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              No endless listing chats or risky buyer haggling. Sell securely from the comfort of your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 relative">
              <span className="w-10 h-10 rounded-2xl bg-[#13b59b] text-white font-black text-sm flex items-center justify-center mb-4 shadow-md">
                1
              </span>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">Check Exact Quote</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select your phone storage, answer a few quick questions regarding screen and body condition to get an instant valuation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 relative">
              <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white font-black text-sm flex items-center justify-center mb-4 shadow-md">
                2
              </span>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">Schedule Free Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick a convenient date and time window. Our certified technician visits your doorstep in Bettiah or West Champaran for free.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 relative">
              <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4 shadow-md">
                3
              </span>
              <h3 className="font-extrabold text-base text-slate-900 mb-1">Instant On-Site Cash/UPI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technician verifies device functionality and transfers the money straight to your UPI ID or Bank account on the spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <ShieldCheck size={28} className="text-[#13b59b] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">100% Data Wipe Assurance</h4>
              <p className="text-xs text-slate-500 mt-1">NIST-compliant military grade factory data wipe prevents any data recovery.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <Clock size={28} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">Zero Cancellation Charge</h4>
              <p className="text-xs text-slate-500 mt-1">If you change your mind during physical inspection, cancel freely without paying a rupee.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <Zap size={28} className="text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">Instant UPI Credit</h4>
              <p className="text-xs text-slate-500 mt-1">Receive payment via GPay, PhonePe, or Paytm in under 60 seconds.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
            <CheckCircle2 size={28} className="text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">Valid Sale Receipt</h4>
              <p className="text-xs text-slate-500 mt-1">Receive an authorized e-waste &amp; sale agreement invoice for legal protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Models */}
      {relatedModels.length > 0 && (
        <section className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900">Other Popular {model.brand} Models</h3>
                <p className="text-xs text-slate-500 mt-0.5">Explore resale values for other devices in this lineup</p>
              </div>
              <Link
                href={`/sell-old-mobile-phone/${model.brandSlug}`}
                className="text-xs font-bold text-[#13b59b] hover:underline"
              >
                View All {model.brand} Phones →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedModels.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.name}</h4>
                      <span className="text-xs font-extrabold text-[#13b59b]">
                        Up to ₹{item.baseResalePrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/sell-old-mobile-phone/${item.brandSlug}/${item.slug}`}
                    className="p-2 bg-white hover:bg-slate-200 rounded-xl text-slate-700 transition"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Modal */}
      <SellBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        assessmentData={bookingData}
      />
    </div>
  );
}

export default function IndividualSellMobilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-sm">Loading Device Evaluation...</div>}>
      <IndividualSellMobileContent />
    </Suspense>
  );
}
