"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Cookie, CheckCircle2, Sliders, Shield, FileText } from "lucide-react";

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. What Are Cookies" },
    { id: "sec-2", title: "2. Types of Cookies We Use" },
    { id: "sec-3", title: "3. Cookie Table & Lifespan" },
    { id: "sec-4", title: "4. Managing Preferences" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Cookie Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <Cookie className="w-3.5 h-3.5" /> Privacy &amp; Tracking
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cookie Policy &amp; Tracking Preferences
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              This policy explains how Sellbar uses cookies and local storage tokens to deliver secure shopping sessions, retain your cart items, and optimize site speed.
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
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 1. What Are Cookies?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cookies are small encrypted alphanumeric files stored in your web browser. They enable our web server to remember your active login session, maintain items in your shopping bag as you navigate, and preserve your city preference (e.g. Bettiah, Patna, Delhi).
              </p>
            </section>

            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#2bbda3]" /> 2. Types of Cookies We Use
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">Essential Session Cookies</strong>
                  <p className="text-slate-600">Strictly necessary for user login, cart persistence, and checkout token verification. Cannot be disabled.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">Analytics &amp; Performance</strong>
                  <p className="text-slate-600">Anonymous metrics tracking page load speeds, diagnostic calculation completion, and broken link reports.</p>
                </div>
              </div>
            </section>

            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900">3. Cookie Table &amp; Lifespan</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-bold text-slate-900">Cookie Name</th>
                      <th className="p-3 font-bold text-slate-900">Purpose</th>
                      <th className="p-3 font-bold text-[#2bbda3]">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-mono font-semibold text-slate-800">sb_session_id</td>
                      <td className="p-3 text-slate-600">Maintains secure user authentication</td>
                      <td className="p-3 text-slate-900 font-medium">Session (Closed on exit)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-semibold text-slate-800">sb_cart_token</td>
                      <td className="p-3 text-slate-600">Stores shopping cart items</td>
                      <td className="p-3 text-slate-900 font-medium">14 Days</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-semibold text-slate-800">sb_pref_city</td>
                      <td className="p-3 text-slate-600">Remembers selected delivery pin code</td>
                      <td className="p-3 text-slate-900 font-medium">30 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. Managing Your Cookie Preferences</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can configure your browser to block or alert you about cookies. Note that blocking essential cookies will disable the shopping cart and user login systems.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
