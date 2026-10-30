"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Search, ShieldCheck, Truck, RefreshCw, CreditCard } from "lucide-react";

const FAQ_CATEGORIES = ["All", "Selling Devices", "Buying Refurbished", "Warranty & Returns", "Payments & Payouts"];

const FAQS = [
  {
    category: "Selling Devices",
    q: "How does Sellbar device buyback work?",
    a: "Select your device model, answer a few simple questions regarding its physical condition, and get an instant online price quote. Choose a convenient date/time for free doorstep pickup. Our technician tests the device on-site and transfers instant money to your UPI or bank account.",
  },
  {
    category: "Selling Devices",
    q: "Is doorstep device evaluation free?",
    a: "Yes, doorstep pickup and physical evaluation are 100% free with zero hidden convenience fees. If you decide not to sell after the on-site inspection, there are no cancellation charges.",
  },
  {
    category: "Selling Devices",
    q: "Do I need to erase my personal data before selling?",
    a: "Yes, we strongly recommend backing up your data and performing a factory reset. For maximum peace of mind, our certified inspection executives also run a certified military-grade data wipe before the device enters our refurbishment facility.",
  },
  {
    category: "Buying Refurbished",
    q: "What does 32-point inspection mean?",
    a: "Every certified device is tested through 32 automated and manual diagnostic checks covering display color/touch, camera sensors, biometric fingerprint/FaceID, battery health (guaranteed >80%), speaker clarity, Wi-Fi/Bluetooth, and thermal performance.",
  },
  {
    category: "Buying Refurbished",
    q: "What condition grades are available on Sellbar?",
    a: "We offer three transparent grades: 'Flawless' (looks & feels brand new with zero visible marks), 'Very Good' (minimal micro-scratches barely visible from 12 inches), and 'Good' (light cosmetic signs of previous use, 100% functional, best budget value).",
  },
  {
    category: "Warranty & Returns",
    q: "What is the warranty period on refurbished products?",
    a: "Refurbished smartphones, laptops, and MacBooks come with up to 12 months comprehensive Sellbar Assured warranty. Smartwatches and tablets include 6 months warranty.",
  },
  {
    category: "Warranty & Returns",
    q: "Can I return the product if I don't like it?",
    a: "Yes! We offer a 7-day hassle-free replacement or refund window. If the device has any defect or discrepancy, we will exchange it or refund your full purchase amount.",
  },
  {
    category: "Payments & Payouts",
    q: "How quickly do I get paid when selling my old phone?",
    a: "Payout is instant! As soon as our technician completes the 10-minute diagnostic check and you sign the handover receipt, payment is transferred immediately via UPI, IMPS, or bank transfer.",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState(0);

  const filtered = FAQS.filter((f) => {
    const matchesTab = activeTab === "All" || f.category === activeTab;
    const matchesSearch =
      search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Frequently Asked Questions</span>
        </nav>

        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">How Can We Help You?</h1>
          <p className="text-gray-500 text-sm">Find instant answers to common questions about buying and selling on Sellbar.</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. warranty, pickup, payment)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] shadow-xs outline-none text-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center no-scrollbar">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === cat
                  ? "bg-[#2bbda3] text-white shadow-xs"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center text-gray-500 text-sm border border-gray-100">
              No matching questions found. Try searching with different keywords.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm sm:text-base hover:text-[#2bbda3] transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#2bbda3]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Need More Help */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center space-y-2">
          <h3 className="font-bold text-gray-900 text-sm">Still have questions?</h3>
          <p className="text-xs text-gray-500">
            Our support experts are ready to assist you. <Link href="/contact" className="text-[#2bbda3] font-semibold underline">Contact Us</Link> or WhatsApp us at <span className="font-semibold text-gray-800">+91-77175-17777</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
