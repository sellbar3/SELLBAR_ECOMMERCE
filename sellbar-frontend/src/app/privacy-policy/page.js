"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  Database, 
  Bell, 
  FileText, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. Information We Collect" },
    { id: "sec-2", title: "2. How We Use Customer Data" },
    { id: "sec-3", title: "3. Device Data Sanitization" },
    { id: "sec-4", title: "4. Third-Party Sharing Rules" },
    { id: "sec-5", title: "5. Cookie & Tracking Controls" },
    { id: "sec-6", title: "6. Your DPDP Statutory Rights" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" /> Data Security &amp; Trust
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy &amp; Data Protection Standards
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Sellbar, we respect your privacy. This policy outlines how we collect, store, process, and protect your personal information in strict compliance with the Digital Personal Data Protection (DPDP) Act, 2023.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span><strong>Updated:</strong> January 1, 2026</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 256-Bit TLS Encryption &amp; Zero Data Selling
              </span>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sticky Left Sidebar */}
          <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#2bbda3]" /> Document Navigation
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

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">Privacy Officer</h4>
              <p className="text-slate-500">For data deletion requests or privacy grievances:</p>
              <a href="mailto:privacy@sellbar.in" className="text-[#2bbda3] font-bold underline block pt-1">
                privacy@sellbar.in
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section id="sec-1" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#2bbda3]" /> 1. Information We Collect
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 block font-bold">Contact &amp; Account Data</strong>
                  <p className="text-slate-600">Your name, phone number, email address, and saved doorstep pickup or delivery addresses.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 block font-bold">Transaction &amp; Payout Data</strong>
                  <p className="text-slate-600">Orders placed, buyback quotes calculated, and customer UPI IDs or bank account details for instant trade-in disbursements.</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-[#2bbda3]" /> 2. How We Use Customer Data
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your data is exclusively used to fulfill your e-commerce orders, dispatch certified evaluation riders for device inspections, disburse payouts, and handle warranty claims. We <strong>never sell, lease, or rent customer personal data</strong> to third-party telemarketers or advertisers.
              </p>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 3. Device Data Sanitization (DoD 5220.22-M)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For all devices traded in through Sellbar, we execute a certified DoD 5220.22-M / NIST 800-88 cryptographic wipe before any device enters the refurbishment or resale pipeline. No previous owner data can ever be recovered.
              </p>
            </section>

            {/* Section 4, 5, 6 */}
            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">4. Third-Party Service Providers</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We share relevant fulfillment data strictly with authorized logistics partners (BlueDart, Delhivery) and PCI-DSS compliant payment gateways (Razorpay, Cashfree). All partners operate under strict NDAs and data processing agreements.
              </p>
            </section>

            <section id="sec-5" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900">5. Cookies &amp; Tracking Technologies</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We use necessary session cookies for shopping cart memory, account authentication, and anonymous web analytics to improve website load speeds. You can adjust your browser cookie preferences at any time.
              </p>
            </section>

            <section id="sec-6" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#2bbda3]" /> 6. Your Statutory Rights under DPDP Act
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under the Indian Digital Personal Data Protection Act, you have the full right to access your stored data, request corrections, or request complete account erasure by emailing <a href="mailto:privacy@sellbar.in" className="text-[#2bbda3] font-bold underline">privacy@sellbar.in</a>.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
