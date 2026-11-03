"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CreditCard,
  Wrench,
  UserCheck,
  ShoppingBag,
  PhoneCall,
  CheckCircle2
} from "lucide-react";

const FAQ_CATEGORIES = [
  "All",
  "Orders & Payments",
  "Selling Old Devices",
  "Buying Refurbished",
  "Repairs",
  "Pickup & Delivery",
  "Warranty",
  "Refunds & Returns",
  "Account & Security"
];

const FAQS = [
  // 1. Orders & Payments
  {
    category: "Orders & Payments",
    q: "What payment methods are accepted on Sellbar?",
    a: "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking across 50+ Indian banks, and Cash on Delivery (COD) for eligible pincodes across Bihar and Delhi NCR."
  },
  {
    category: "Orders & Payments",
    q: "Is Cash on Delivery (COD) available for refurbished gadgets?",
    a: "Yes! COD is available for refurbished smartphones, tablets, and smartwatches up to ₹40,000. An OTP verification is completed at your doorstep prior to package handover."
  },
  {
    category: "Orders & Payments",
    q: "How can I track my order status?",
    a: "Once your order is dispatched, you receive a WhatsApp notification and SMS with a live BlueDart or Delhivery tracking link. You can also visit our Track Order page with your Order ID."
  },

  // 2. Selling Old Devices
  {
    category: "Selling Old Devices",
    q: "How does the Sellbar device buyback process work?",
    a: "Simply select your device (phone, laptop, tablet, TV, console, etc.), answer simple hardware assessment questions to see your instant calculated valuation, and choose a free doorstep pickup slot. Our executive arrives, runs a 10-minute diagnostic check, and sends instant payment via UPI or IMPS before taking the gadget."
  },
  {
    category: "Selling Old Devices",
    q: "Is the doorstep inspection free if I choose not to sell?",
    a: "Yes, our doorstep inspection is 100% free with zero obligation. If the on-site physical evaluation differs and you decline the revised quote, there are zero cancellation or visiting charges."
  },
  {
    category: "Selling Old Devices",
    q: "Do I need to erase my personal photos and accounts before selling?",
    a: "Yes, please sign out of Apple iCloud, Google Account, or Samsung Knox, back up your photos, and perform a factory reset. In addition, our field technician executes an enterprise-grade DOD data wipe on-site for certified data privacy."
  },

  // 3. Buying Refurbished
  {
    category: "Buying Refurbished",
    q: "What is a 32-Point Quality Lab Inspection?",
    a: "Every certified refurbished device undergoes 32 diagnostic tests covering OLED touch responsiveness, dead pixel inspection, battery health (>80% guaranteed), front/rear camera sensors, biometric FaceID / fingerprint, Wi-Fi, Bluetooth, speaker clarity, and motherboard thermals."
  },
  {
    category: "Buying Refurbished",
    q: "What are the different condition grades available?",
    a: "We categorize devices into: 'Flawless' (like-new condition with zero scratches), 'Very Good' (faint micro-marks invisible from 12 inches away), and 'Good' (light cosmetic signs of gentle prior use, 100% functional, highest savings)."
  },
  {
    category: "Buying Refurbished",
    q: "Do refurbished phones come in original packaging?",
    a: "Refurbished devices are packaged in premium Sellbar Assured tamper-evident boxes, along with a certified USB charging cable, SIM ejector tool, and your official GST warranty invoice."
  },

  // 4. Repairs
  {
    category: "Repairs",
    q: "Do you repair smartphones and laptops at the customer's doorstep?",
    a: "Yes! Our certified engineers can perform screen replacements, battery swaps, and charging port repairs right in front of you at your home or office in 30 to 45 minutes."
  },
  {
    category: "Repairs",
    q: "What kind of warranty is provided on repaired parts?",
    a: "All screen and battery replacements carry up to a 6-month comprehensive warranty. If the replaced component exhibits touch latency or failure, we provide free doorstep replacement."
  },
  {
    category: "Repairs",
    q: "Are the replacement screens and batteries original OEM grade?",
    a: "Yes, we exclusively use factory-grade OEM specification parts tested for high color accuracy, 60Hz/120Hz refresh rates, and authentic lithium-ion capacity."
  },

  // 5. Pickup & Delivery
  {
    category: "Pickup & Delivery",
    q: "Which areas in West Champaran and Bihar have doorstep pickup?",
    a: "We cover Bettiah, Motihari, Bagaha, Narkatiaganj, Muzaffarpur, Patna, and adjacent districts with same-day and next-day doorstep pickup slots. Express courier pickup is active across Pan-India."
  },
  {
    category: "Pickup & Delivery",
    q: "How fast is delivery for refurbished orders?",
    a: "Orders in Bettiah & West Champaran are delivered same-day or next-day. Tier-1 metros and major cities are delivered within 2-4 business days via express air shipping."
  },

  // 6. Warranty
  {
    category: "Warranty",
    q: "How long is the warranty on Sellbar refurbished devices?",
    a: "Smartphones, MacBooks, and laptops carry a 6 to 12-month Sellbar Assured warranty. Smartwatches, tablets, and gaming consoles include a 6-month warranty."
  },
  {
    category: "Warranty",
    q: "How do I claim a warranty if my device has an issue?",
    a: "Simply message us on WhatsApp (+91-77175-17777) or email support@sellbar.in with your Order ID. A technician will assist with remote troubleshooting or schedule a free doorstep pickup for repair or exchange."
  },

  // 7. Refunds & Returns
  {
    category: "Refunds & Returns",
    q: "What is the Sellbar 7-Day Return & Replacement Policy?",
    a: "If your refurbished device develops a hardware defect or does not match the purchased condition grade within 7 days of delivery, you can request an instant doorstep replacement or full money refund."
  },
  {
    category: "Refunds & Returns",
    q: "How long does it take to process my refund?",
    a: "Once our logistics partner picks up the device and verification is completed, refunds to UPI or original payment methods are credited within 24 to 48 hours."
  },

  // 8. Account & Security
  {
    category: "Account & Security",
    q: "Do I need an account to buy or sell on Sellbar?",
    a: "You can browse products and check trade-in prices freely. When completing an order or scheduling a pickup, an account is automatically created using your verified mobile number."
  },
  {
    category: "Account & Security",
    q: "How does Sellbar protect my personal and payment data?",
    a: "All web traffic and database interactions are protected via 256-bit TLS encryption, PCI-DSS compliant payment gateways, and zero storage of credit card credentials on our servers."
  }
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

        {/* Hero */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto mb-2">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">How Can We Help You?</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Find quick answers about buying certified refurbished tech, instant buyback valuations, doorstep pickup, and warranties.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search question (e.g. warranty, return, pickup, inspection)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-[#2bbda3] outline-none text-sm shadow-xs"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setOpenIdx(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === cat
                  ? "bg-[#2bbda3] text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-500">No questions found matching &ldquo;{search}&rdquo;.</p>
              <button
                onClick={() => { setSearch(""); setActiveTab("All"); }}
                className="mt-3 text-xs font-bold text-[#2bbda3] hover:underline"
              >
                Clear Search &amp; Filters
              </button>
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
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-gray-900 text-sm sm:text-base hover:text-[#2bbda3] transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#2bbda3]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 bg-[#fafcfb]">
                      <p>{item.a}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#2bbda3]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sellbar Assured Guarantee
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-lg text-white">Still have questions?</h3>
            <p className="text-xs text-gray-300">Our customer support specialists are available 6 days a week to assist you.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white text-xs font-semibold transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="https://wa.me/917717517777"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
