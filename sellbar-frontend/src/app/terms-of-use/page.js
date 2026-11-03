"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, ShieldCheck, CheckCircle2, Lock, FileText, AlertCircle } from "lucide-react";

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. Acceptance of Digital Terms" },
    { id: "sec-2", title: "2. Authorized Platform Access" },
    { id: "sec-3", title: "3. Intellectual Property Rights" },
    { id: "sec-4", title: "4. Prohibited System Activities" },
    { id: "sec-5", title: "5. Termination of Access" },
    { id: "sec-6", title: "6. Disclaimers & Indemnification" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Terms of Use</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" /> Platform Governance
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Website &amp; Digital Portal Terms of Use
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              These terms govern all user interactions with the Sellbar website, mobile progressive web application, diagnostic valuation tools, and APIs.
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
                <FileText className="w-4 h-4 text-[#2bbda3]" /> Navigation
              </h3>
              <nav className="space-y-1">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      activeSection === item.id
                        ? "bg-teal-50 text-[#2bbda3] font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <section id="sec-1" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Digital Terms</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By browsing or creating an account on Sellbar.in, you agree to these Terms of Use. If you disagree with any provision, please immediately cease using our digital services.
              </p>
            </section>

            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">2. Authorized Platform Access</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sellbar grants you a revocable, non-exclusive, non-transferable license to access our platform solely for personal retail browsing, placing refurbished gadget orders, and scheduling lawful trade-in pickups.
              </p>
            </section>

            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property Rights</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The Sellbar name, logo, graphic assets, price estimation algorithms, UI layouts, and software source code are the proprietary intellectual property of Sellbar Technologies India Private Limited and protected under Indian Copyright and Trademark Acts.
              </p>
            </section>

            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">4. Prohibited System Activities</h2>
              <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200/60 text-xs text-slate-700 space-y-1.5">
                <p>• Automated scraping, data extraction, or programmatic querying of live pricing algorithms.</p>
                <p>• Attempting to probe, bypass, or test vulnerabilities of our authentication APIs or payment gateways.</p>
                <p>• Uploading malicious payloads, exploits, or attempting denial of service (DoS) attacks.</p>
              </div>
            </section>

            <section id="sec-5" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">5 &amp; 6. Termination &amp; Disclaimers</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We reserve the right to suspend or block access to any IP address or user account that violates these terms. Sellbar provides digital interfaces on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of uninterrupted service during scheduled maintenance.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
