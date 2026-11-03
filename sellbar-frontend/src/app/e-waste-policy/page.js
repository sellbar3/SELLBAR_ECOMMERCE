"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Recycle, Leaf, ShieldCheck, HeartHandshake, FileText, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export default function EWastePolicyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. Our Circular Mission & Goal" },
    { id: "sec-2", title: "2. Free Doorstep E-Waste Collection" },
    { id: "sec-3", title: "3. Harmful Substances & Hazards" },
    { id: "sec-4", title: "4. Consumer Do's and Don'ts" },
    { id: "sec-5", title: "5. Authorized Recycler Channel" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">E-Waste Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Recycle className="w-3.5 h-3.5" /> Zero-Landfill Initiative
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              E-Waste Management &amp; Recycling Compliance
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Sellbar operates in full compliance with the <strong>E-Waste (Management) Rules, 2022</strong>, under the Ministry of Environment, Forest and Climate Change (MoEFCC), Government of India.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <span><strong>Updated:</strong> January 1, 2026</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" /> Navigation
              </h3>
              <nav className="space-y-1">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-emerald-50 text-emerald-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="bg-emerald-950 text-white rounded-2xl p-5 space-y-3 text-xs">
              <h4 className="font-bold">Book Free Pickup</h4>
              <p className="text-emerald-200">Got a dead mobile phone or laptop? We collect it from your doorstep for free.</p>
              <Link
                href="/recycle-old-mobile-phone"
                className="block text-center py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors"
              >
                Schedule E-Waste Pickup
              </Link>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <section id="sec-1" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" /> 1. Our Circular Mission &amp; Impact
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By refurbishing, repairing, and re-homing electronics across India, Sellbar has successfully diverted over 12,000 kg of electronic waste away from soil and groundwater ecosystems. Devices beyond repair are systematically disassembled to reclaim rare earth minerals, gold, copper, and recyclable aluminum.
              </p>
            </section>

            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-600" /> 2. Free Doorstep Device Recycling
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sellbar operates a zero-cost doorstep collection service across Bettiah, West Champaran, and major Bihar towns. Consumers can hand over dead keypad phones, swollen batteries, broken laptops, and defunct power adapters to our riders, receiving a verifiable Green Recycling Certificate.
              </p>
            </section>

            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> 3. Hazardous Substances &amp; Environmental Risk
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Electronic waste contains toxic heavy metals including Lead (Pb), Mercury (Hg), Cadmium (Cd), and Hexavalent Chromium. When discarded in regular municipal trash bins or burned by informal scrap collectors, these toxins leach into the drinking water supply and atmosphere.
              </p>
            </section>

            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900">4. Consumer Do&apos;s and Don&apos;ts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <h3 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> DO&apos;s
                  </h3>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Always segregate electronic waste from organic garbage.</li>
                    <li>• Hand over defunct gadgets only to authorized e-waste channels.</li>
                    <li>• Disconnect and store batteries in cool, dry places.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <h3 className="font-bold text-rose-900 flex items-center gap-1.5 text-sm">
                    <XCircle className="w-4 h-4 text-rose-600" /> DON&apos;Ts
                  </h3>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Do not dispose of lithium batteries in household bins.</li>
                    <li>• Do not burn electronic cables or plastics in the open.</li>
                    <li>• Do not dismantle phone screens or batteries with home tools.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="sec-5" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
              <h2 className="text-lg font-bold text-slate-900">5. Authorized Recycler Channel</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                All unusable scrap processed by Sellbar is delivered to CPCB-registered recycling facilities equipped with automated shredders, electrostatic separators, and safe smelting ovens operating under zero-emission standards.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
