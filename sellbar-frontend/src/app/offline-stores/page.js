'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Store,
} from 'lucide-react';

const STORES = [
  {
    id: 'bettiah-hub',
    city: 'Bettiah (Flagship Hub)',
    state: 'Bihar',
    address: 'Hospital Road, Near Supriya Chowk, Bettiah, West Champaran, Bihar - 845438',
    landmark: 'Opposite State Bank of India Main Branch',
    phone: '+91 98765 43210',
    hours: '10:00 AM – 08:30 PM (Open All 7 Days)',
    services: [
      'Instant Cash for Old Phones & Laptops',
      'Refurbished Device Experience Lounge',
      'Doorstep Express Repair Hub',
      'Free 32-Point Diagnostics Test',
    ],
    mapUrl: 'https://maps.google.com/?q=Bettiah+Supriya+Chowk',
    isFlagship: true,
  },
  {
    id: 'bagaha-store',
    city: 'Bagaha Store',
    state: 'Bihar',
    address: 'Station Road, Near Main Market Gate, Bagaha-1, West Champaran, Bihar - 845101',
    landmark: 'Near Railway Station Road Crossing',
    phone: '+91 98765 43211',
    hours: '10:00 AM – 08:00 PM (Monday to Saturday)',
    services: [
      'Sell Used Phones & Get Instant UPI',
      'Buy Certified Refurbished Gadgets',
      'Express Screen & Battery Replacement',
    ],
    mapUrl: 'https://maps.google.com/?q=Bagaha+Railway+Station',
    isFlagship: false,
  },
  {
    id: 'motihari-store',
    city: 'Motihari Experience Center',
    state: 'Bihar',
    address: 'Court Road, Near Gandhi Chowk, Motihari, East Champaran, Bihar - 845401',
    landmark: 'Beside LIC Divisional Office',
    phone: '+91 98765 43212',
    hours: '10:00 AM – 08:00 PM (Open All 7 Days)',
    services: [
      'Instant Cash on Old Gadgets',
      'Refurbished Laptops & iPhones',
      'Quick Repair Counter',
    ],
    mapUrl: 'https://maps.google.com/?q=Motihari+Gandhi+Chowk',
    isFlagship: false,
  },
  {
    id: 'patna-center',
    city: 'Patna Regional Store',
    state: 'Bihar',
    address: '2nd Floor, Grand Plaza, Boring Road Crossing, Patna, Bihar - 800001',
    landmark: 'Near Alankar Jewellers',
    phone: '+91 98765 43213',
    hours: '10:30 AM – 09:00 PM (Open All 7 Days)',
    services: [
      'Corporate Gadget Buyback & Exchange',
      'Premium Refurbished Showcase',
      'Warranty Claim & Diagnostic Center',
    ],
    mapUrl: 'https://maps.google.com/?q=Patna+Boring+Road+Crossing',
    isFlagship: false,
  },
  {
    id: 'delhi-ncr',
    city: 'Delhi NCR Fulfillment Center',
    state: 'Delhi',
    address: 'Sector 18, Commercial Plaza, Noida, Gautam Buddha Nagar, UP - 201301',
    landmark: 'Near Wave Silver Tower & Metro Station',
    phone: '+91 98765 43214',
    hours: '11:00 AM – 09:00 PM (Open All 7 Days)',
    services: [
      'Doorstep Delivery Fulfillment Hub',
      'Apple & Dell Motherboard Lab',
      'Bulk Trade-In Assessments',
    ],
    mapUrl: 'https://maps.google.com/?q=Noida+Sector+18',
    isFlagship: false,
  },
];

export default function OfflineStoresPage() {
  const [selectedCity, setSelectedCity] = useState('All');

  const cities = ['All', 'Bettiah', 'Bagaha', 'Motihari', 'Patna', 'Delhi NCR'];
  const filtered = selectedCity === 'All' ? STORES : STORES.filter((s) => s.city.includes(selectedCity));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Offline Experience Stores</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
              <Store size={14} /> Sellbar Retail Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Visit Our Experience Stores. <br />
              <span className="text-[#13b59b]">Touch, Test &amp; Trade In-Person.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Prefer testing a certified refurbished MacBook or iPhone before buying? Walk into any Sellbar Experience Center across West Champaran and Bihar for instant evaluations, live gadget testing lounges, and immediate UPI cashouts.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <CheckCircle2 size={16} className="text-[#13b59b]" /> Instant Cash on the Spot
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <ShieldCheck size={16} className="text-amber-400" /> Live 32-Point Diagnostics
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur">
                <Building2 size={16} className="text-cyan-400" /> 1-on-1 Device Specialists
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                  selectedCity === c
                    ? 'bg-[#13b59b] text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-slate-500">
            {filtered.length} verified physical centers open today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((store) => (
            <div
              key={store.id}
              className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between ${
                store.isFlagship ? 'border-emerald-300 ring-2 ring-emerald-500/20' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    {store.isFlagship && (
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
                        ★ Official Flagship Store
                      </span>
                    )}
                    <h3 className="text-xl font-black text-slate-900">{store.city}</h3>
                    <p className="text-xs text-slate-400 font-medium">{store.state}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#13b59b] flex items-center justify-center shrink-0">
                    <Building2 size={24} />
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#13b59b] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">{store.address}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Landmark: {store.landmark}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-[#13b59b] shrink-0" />
                    <a href={`tel:${store.phone}`} className="font-bold text-slate-800 hover:text-[#13b59b]">
                      {store.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-[#13b59b] shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Services Available In-Store
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {store.services.map((serv, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                        <CheckCircle2 size={13} className="text-[#13b59b] shrink-0" />
                        <span className="truncate">{serv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Navigation size={14} /> Get Directions
                </a>
                <a
                  href={`tel:${store.phone}`}
                  className="px-4 py-2.5 bg-emerald-50 text-[#13b59b] hover:bg-emerald-100 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Phone size={14} /> Call Store
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
