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
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Sparkles
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
    id: 1,
    category: "Orders & Payments",
    q: "What payment methods are supported on Sellbar?",
    a: "We accept all standard digital payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit cards (Visa, MasterCard, RuPay), Net Banking across 50+ major banks, and Cash on Delivery (COD) for eligible pincodes across Bihar and Delhi NCR."
  },
  {
    id: 2,
    category: "Orders & Payments",
    q: "Is Cash on Delivery (COD) available for refurbished phones?",
    a: "Yes! COD is enabled for refurbished smartphones, iPads, and accessories up to ₹40,000. An OTP delivery verification code is required at your doorstep prior to parcel handover."
  },
  {
    id: 3,
    category: "Orders & Payments",
    q: "How can I obtain an official GST tax invoice for business ITC?",
    a: "During checkout, check the &ldquo;Add Business GSTIN&rdquo; box. Your digital tax invoice containing company name, GSTIN, and device IMEI serial numbers will be generated and emailed instantly upon order dispatch."
  },

  // 2. Selling Old Devices
  {
    id: 4,
    category: "Selling Old Devices",
    q: "How does the doorstep device buyback process work?",
    a: "Select your device model, answer simple hardware condition questions to see your instant calculated valuation, and pick a convenient doorstep slot. Our executive arrives, runs a 10-minute diagnostic check on the phone, and transfers instant payment via UPI or IMPS before taking the gadget."
  },
  {
    id: 5,
    category: "Selling Old Devices",
    q: "Is doorstep inspection free if I choose not to sell?",
    a: "Yes! Doorstep evaluation is 100% free with zero cancellation or visiting fees. If our on-site diagnosis reveals discrepancies and you decline the revised valuation, you pay nothing."
  },
  {
    id: 6,
    category: "Selling Old Devices",
    q: "Do I need to sign out of iCloud or Google Accounts before selling?",
    a: "Yes, you must unlink your Apple ID, Google Account, or Samsung Knox and perform a factory reset. In addition, our field technician executes a certified DoD 5220.22-M cryptographic data wipe on-site."
  },

  // 3. Buying Refurbished
  {
    id: 7,
    category: "Buying Refurbished",
    q: "What does the 32-Point Quality Lab check cover?",
    a: "Every certified device undergoes 32 benchmark tests covering OLED touch responsiveness, dead pixel scan, battery health (>80% guaranteed), front/rear camera optics, biometric sensors, Wi-Fi 6 / 5G, stereo speakers, and motherboard thermals."
  },
  {
    id: 8,
    category: "Buying Refurbished",
    q: "What is the difference between Grade A+ (Flawless) and Grade A (Very Good)?",
    a: "Grade A+ (Flawless) looks completely brand new with zero micro-marks. Grade A (Very Good) is functionally identical but may have 1 or 2 faint micro-scratches barely visible from 12 inches away, offering higher savings."
  },
  {
    id: 9,
    category: "Buying Refurbished",
    q: "What accessories come in the refurbished packaging box?",
    a: "Refurbished phones arrive in our custom Sellbar Assured shock-absorbing box, along with a certified USB charging cable, SIM tray ejector tool, and warranty registration card."
  },

  // 4. Repairs
  {
    id: 10,
    category: "Repairs",
    q: "Can repairs be performed at my home in Bettiah or Patna?",
    a: "Yes! Our certified doorstep repair technicians carry specialized diagnostic toolkits and perform screen, battery, and charging port repairs right in front of you in 30 to 45 minutes."
  },
  {
    id: 11,
    category: "Repairs",
    q: "What warranty do replaced screens and batteries have?",
    a: "All replaced screens and batteries are backed by up to a 6-month comprehensive Sellbar warranty. If any touch latency or battery degradation occurs, we replace it for free."
  },

  // 5. Pickup & Delivery
  {
    id: 12,
    category: "Pickup & Delivery",
    q: "Which areas in West Champaran and Bihar have doorstep pickup?",
    a: "We provide same-day and next-day doorstep pickup in Bettiah, Motihari, Bagaha, Narkatiaganj, Muzaffarpur, and Patna. Pan-India shipments are handled via BlueDart and Delhivery express air."
  },
  {
    id: 13,
    category: "Pickup & Delivery",
    q: "How long does shipping take for refurbished electronics?",
    a: "Local deliveries within Bettiah and West Champaran are delivered same-day or next-day. All other cities across India are delivered within 2 to 4 business days."
  },

  // 6. Warranty
  {
    id: 14,
    category: "Warranty",
    q: "How long is the warranty on refurbished iPhones & laptops?",
    a: "Flawless smartphones and all MacBooks / laptops carry an industry-leading 12-month comprehensive warranty. Other condition grades include a 6-month comprehensive warranty."
  },
  {
    id: 15,
    category: "Warranty",
    q: "How do I claim warranty if an issue occurs after 4 months?",
    a: "Simply WhatsApp our support desk (+91-77175-17777) with your Order ID and a short video clip. We will arrange a free reverse pickup from your home, service the device, and return it to you."
  },

  // 7. Refunds & Returns
  {
    id: 16,
    category: "Refunds & Returns",
    q: "What is the Sellbar 7-Day Return & Replacement Policy?",
    a: "If your device develops any hardware defect or does not match the purchased cosmetic grade within 7 days of delivery, you can request an instant doorstep replacement or 100% money refund."
  },
  {
    id: 17,
    category: "Refunds & Returns",
    q: "How quickly are refund amounts credited?",
    a: "Once our return diagnostic inspection is completed, UPI refunds are credited within 2 to 4 hours. Credit/Debit card refunds appear on your statement within 3 to 5 business days."
  },

  // 8. Account & Security
  {
    id: 18,
    category: "Account & Security",
    q: "Is my payment information stored on Sellbar servers?",
    a: "No. All transactions are processed through RBI-approved, PCI-DSS compliant payment gateways with 256-bit TLS encryption. We never store credit card numbers or CVVs on our servers."
  },
  {
    id: 19,
    category: "Account & Security",
    q: "Do I need to create a password to access Sellbar?",
    a: "No! Sellbar uses passwordless, high-security mobile OTP authentication for all logins, checkout, and trade-in tracking, ensuring zero risk of credential theft."
  }
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(1);
  const [feedback, setFeedback] = useState({});

  const filtered = FAQS.filter((f) => {
    const matchesTab = activeTab === "All" || f.category === activeTab;
    const matchesSearch =
      search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  function handleFeedback(id, isHelpful) {
    setFeedback({ ...feedback, [id]: isHelpful ? "helpful" : "not-helpful" });
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Help &amp; Support</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Frequently Asked Questions</span>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto mb-2">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Everything you need to know about buying certified refurbished electronics, instant doorstep valuations, and warranties.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. warranty, return, pickup, inspection)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:border-[#2bbda3] outline-none text-xs sm:text-sm shadow-xs"
          />
        </div>

        {/* Category Pills with Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FAQ_CATEGORIES.map((cat) => {
            const count = cat === "All" ? FAQS.length : FAQS.filter(f => f.category === cat).length;
            const isSelected = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  setOpenId(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#2bbda3] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-2">
              <p className="text-sm text-slate-600 font-medium">No questions found matching &ldquo;{search}&rdquo;.</p>
              <button
                onClick={() => { setSearch(""); setActiveTab("All"); }}
                className="text-xs font-bold text-[#2bbda3] hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filtered.map((item) => {
              const isOpen = openId === item.id;
              const userVote = feedback[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base hover:text-[#2bbda3] transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#2bbda3]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-[#fafcfb] space-y-3">
                      <p>{item.a}</p>
                      
                      {/* Helpfulness Feedback Bar */}
                      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                        <span className="text-[11px]">Was this answer helpful?</span>
                        {userVote ? (
                          <span className="text-[11px] font-semibold text-[#2bbda3]">
                            ✓ Thank you for your feedback!
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleFeedback(item.id, true)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center gap-1 text-[11px] text-slate-600"
                            >
                              <ThumbsUp className="w-3 h-3 text-[#2bbda3]" /> Yes
                            </button>
                            <button
                              onClick={() => handleFeedback(item.id, false)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 flex items-center gap-1 text-[11px] text-slate-600"
                            >
                              <ThumbsDown className="w-3 h-3 text-slate-400" /> No
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Need Assistance CTA */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-lg text-white">Couldn&apos;t find your answer?</h3>
            <p className="text-xs text-slate-300">Our customer care engineers are on live chat 6 days a week.</p>
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
