"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Printer, 
  HelpCircle, 
  PhoneCall, 
  ChevronRight,
  ArrowRight,
  Clock,
  Wrench,
  Sparkles
} from "lucide-react";

export default function WarrantyPolicyPage() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const TOC = [
    { id: "sec-1", title: "1. Warranty Periods by Category" },
    { id: "sec-2", title: "2. Full Coverage Inclusions" },
    { id: "sec-3", title: "3. Exclusions & Void Conditions" },
    { id: "sec-4", title: "4. Step-by-Step Claim Flow" },
    { id: "sec-5", title: "5. Resolution SLA & Pickup" },
    { id: "sec-6", title: "6. Grievance Redressal" }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Warranty Policy</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Sellbar Assured Protection
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Official Warranty Policy &amp; Repair Guarantee
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every certified refurbished gadget purchased on Sellbar comes with our comprehensive 6 to 12 months hardware warranty, free doorstep diagnostic pickup, and factory OEM replacement components.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span><strong>Effective Date:</strong> January 1, 2026</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Doorstep Servicing Included
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary Card (Plain English for Buyers) */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <h2 className="text-xs font-bold text-[#2bbda3] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Plain English Summary for Customers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">12 Months Protection</strong>
              <p className="text-slate-300">Grade A+ smartphones, MacBooks, and premium laptops carry a full 1-year hardware warranty.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">Doorstep Pickup &amp; Return</strong>
              <p className="text-slate-300">No need to travel to repair centers. Our courier picks up the faulty unit right from your doorstep.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <strong className="text-white text-sm block">Free Repair or Replacement</strong>
              <p className="text-slate-300">If parts cannot be repaired within 7 working days, you receive an equivalent replacement unit.</p>
            </div>
          </div>
        </div>

        {/* Two-Column Layout with Sticky Sidebar */}
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

            {/* Support Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">Need Help with a Claim?</h4>
              <p className="text-slate-500">Our customer care engineers are on standby 6 days a week.</p>
              <div className="pt-2 space-y-1">
                <a
                  href="https://wa.me/917717517777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 px-3 rounded-xl bg-[#2bbda3] text-white font-bold text-xs shadow-xs"
                >
                  WhatsApp: +91-77175-17777
                </a>
                <a
                  href="mailto:support@sellbar.in"
                  className="block text-center py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-100"
                >
                  support@sellbar.in
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section id="sec-1" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2bbda3]" /> 1. Warranty Periods by Product Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Warranty coverage begins on the calendar date the shipment is delivered to your designated address as logged by courier records.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-3 font-bold text-slate-900">Device Category</th>
                      <th className="p-3 font-bold text-slate-900">Cosmetic Grade</th>
                      <th className="p-3 font-bold text-[#2bbda3]">Warranty Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Apple iPhone &amp; Premium Android</td>
                      <td className="p-3 text-slate-600">Grade A+ (Flawless)</td>
                      <td className="p-3 font-bold text-emerald-700">12 Months Comprehensive</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Apple iPhone &amp; Android Phones</td>
                      <td className="p-3 text-slate-600">Grade A (Very Good) / Grade B</td>
                      <td className="p-3 font-bold text-emerald-700">6 Months Comprehensive</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">MacBooks &amp; Business Laptops</td>
                      <td className="p-3 text-slate-600">All Certified Grades</td>
                      <td className="p-3 font-bold text-emerald-700">12 Months (Parts &amp; Labor)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">iPads &amp; Android Tablets</td>
                      <td className="p-3 text-slate-600">All Certified Grades</td>
                      <td className="p-3 font-bold text-emerald-700">6 Months Comprehensive</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Gaming Consoles (PS5 / Xbox Series)</td>
                      <td className="p-3 text-slate-600">All Certified Grades</td>
                      <td className="p-3 font-bold text-emerald-700">6 Months Comprehensive</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-800">Smartwatches &amp; Audio Gear</td>
                      <td className="p-3 text-slate-600">All Certified Grades</td>
                      <td className="p-3 font-bold text-emerald-700">6 Months Comprehensive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 */}
            <section id="sec-2" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. Full Coverage Inclusions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 block font-bold">Display &amp; Digitizer</strong>
                  <p className="text-slate-600">Ghost touch, touch responsiveness failure, unprovoked vertical lines, or display flickering not resulting from drops.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 block font-bold">Motherboard &amp; Chipset</strong>
                  <p className="text-slate-600">Power IC failure, CPU throttling, internal storage read errors, Wi-Fi / Bluetooth chip malfunction.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 block font-bold">Battery &amp; Power</strong>
                  <p className="text-slate-600">Rapid power drain (&gt;20% drop per hour on standby), failure to accept charge, or abnormal thermal shutdown.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <strong className="text-slate-900 block font-bold">Cameras &amp; Sensors</strong>
                  <p className="text-slate-600">Autofocus failure, sensor blur, FaceID / Fingerprint biometric failure, proximity sensor defects.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="sec-3" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" /> 3. Exclusions &amp; Void Conditions
              </h2>
              <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200/60 text-xs space-y-2 text-slate-700">
                <p>• <strong>Accidental &amp; Physical Impact:</strong> Cracked glass, shattered back panel, bent chassis from drops or heavy external pressure.</p>
                <p>• <strong>Liquid / Moisture Ingress:</strong> Damage caused by immersion in water or chemical exposure (Liquid Contact Indicator triggered inside chassis).</p>
                <p>• <strong>Unauthorized Third-Party Repair:</strong> Opening device screws or repairs carried out by unauthorized roadside technicians voids all Sellbar coverage.</p>
                <p>• <strong>Firmware Jailbreaking / Custom ROMs:</strong> Unofficial OS modifications causing bootloops or bricked motherboard security keys.</p>
              </div>
            </section>

            {/* Section 4 & 5 */}
            <section id="sec-4" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#2bbda3]" /> 4 &amp; 5. Step-by-Step Claim Flow &amp; SLA
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#2bbda3] text-white font-bold text-xs flex items-center justify-center">1</span>
                  <strong className="text-slate-900 block font-bold">Submit Ticket</strong>
                  <p className="text-slate-600">Provide Order ID and short video clip of the defect to support@sellbar.in or WhatsApp.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#2bbda3] text-white font-bold text-xs flex items-center justify-center">2</span>
                  <strong className="text-slate-900 block font-bold">Doorstep Pickup</strong>
                  <p className="text-slate-600">Free reverse pickup scheduled at your address within 24 hours (West Champaran / Pan-India).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#2bbda3] text-white font-bold text-xs flex items-center justify-center">3</span>
                  <strong className="text-slate-900 block font-bold">Resolution in 5-7 Days</strong>
                  <p className="text-slate-600">Unit is repaired with certified OEM parts or exchanged for an equivalent replacement.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="sec-6" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-2">
              <h2 className="text-lg font-bold text-slate-900">6. Customer Grievance Redressal</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your warranty repair is not concluded within 7 working days, your case is automatically escalated to our Operations Lead at <a href="mailto:grievance@sellbar.in" className="text-[#2bbda3] font-bold underline">grievance@sellbar.in</a> for priority dispatch or replacement approval.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
