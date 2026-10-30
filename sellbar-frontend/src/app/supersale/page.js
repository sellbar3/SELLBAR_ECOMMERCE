import React from "react";
import Link from "next/link";
import { Sparkles, Layers, Box, CheckCircle2, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Sellbar Supersale | Wholesale B2B Refurbished Electronics",
  description: "Bulk wholesale procurement for retailers, distributors, and bulk gadget merchants.",
};

export default function SupersalePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Supersale B2B</span>
        </nav>

        <div className="bg-gradient-to-br from-[#1a907e] to-[#2bbda3] rounded-3xl p-8 sm:p-14 text-white shadow-xl text-center max-w-3xl mx-auto space-y-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md">
            <Box className="w-7 h-7" />
          </div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
            Sellbar Supersale Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Buy Refurbished Tech in Bulk at Wholesale Margins
          </h1>
          <p className="text-emerald-50 text-sm sm:text-base leading-relaxed">
            Supplying India&apos;s mobile shop owners, refurbished gadget retailers, and e-tailers with bulk batches of pre-inspected iPhones, Android flagships, and laptops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="text-2xl font-bold text-[#2bbda3]">50+ Units MOQ</div>
            <h3 className="font-bold text-gray-900 text-sm">Flexible Order Quantities</h3>
            <p className="text-xs text-gray-500">Mix and match smartphone models and laptop configurations according to your local demand.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="text-2xl font-bold text-[#2bbda3]">Pre-Graded Lots</div>
            <h3 className="font-bold text-gray-900 text-sm">Clear Grading Transparent Pricing</h3>
            <p className="text-xs text-gray-500">Choose between Grade A (Like New), Grade B (Good), and Certified As-Is inventory with detailed reports.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
            <div className="text-2xl font-bold text-[#2bbda3]">GST Invoicing</div>
            <h3 className="font-bold text-gray-900 text-sm">100% Legitimate Invoicing</h3>
            <p className="text-xs text-gray-500">Full Input Tax Credit (ITC) compliant tax invoices with IMEI/Serial tracking.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xs text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900">Request Supersale Catalog &amp; Rate Card</h2>
          <p className="text-sm text-gray-600">
            Contact our dedicated B2B wholesale desk for today&apos;s live bulk inventory list:
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:supersale@sellbar.in"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-[#2bbda3] text-white text-xs font-semibold transition-colors"
            >
              supersale@sellbar.in
            </a>
            <a
              href="tel:+917717517777"
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4 text-[#2bbda3]" /> +91-77175-17777
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
