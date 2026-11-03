import React from "react";
import Link from "next/link";
import { RotateCcw, CheckCircle2, Clock, AlertTriangle, CreditCard, FileText, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Refund & Replacement Policy | 7 Days Assurance | Sellbar.in",
  description: "7-Day hassle-free return, replacement, and refund policy on certified refurbished tech from Sellbar.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Refund Policy</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bbda3]/10 text-[#2bbda3] flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Refund &amp; Replacement Policy</h1>
              <p className="text-xs sm:text-sm text-gray-500">7 Days Hassle-Free Exchange or 100% Money-Back Assurance</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            We want you to feel complete confidence when purchasing refurbished gadgets from Sellbar. If your gadget has any operational defect or does not match the purchased cosmetic grade, you are protected by our simple 7-day refund and replacement window.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Last Updated: January 1, 2026</span>
            <span className="font-semibold text-emerald-600">Zero Restocking Fees</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2bbda3]" /> Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
            <a href="#section-1" className="hover:text-[#2bbda3] transition-colors">1. The 7-Day Inspection Window</a>
            <a href="#section-2" className="hover:text-[#2bbda3] transition-colors">2. Conditions for Eligible Returns</a>
            <a href="#section-3" className="hover:text-[#2bbda3] transition-colors">3. Replacement vs. Full Refund Choice</a>
            <a href="#section-4" className="hover:text-[#2bbda3] transition-colors">4. Return Pickup &amp; Verification</a>
            <a href="#section-5" className="hover:text-[#2bbda3] transition-colors">5. Payment Method Timelines</a>
            <a href="#section-6" className="hover:text-[#2bbda3] transition-colors">6. How to Initiate a Return</a>
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-sm">
          {/* Section 1 */}
          <section id="section-1" className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#2bbda3]" /> 1. The 7-Day Inspection Window
            </h2>
            <p>
              You have 7 calendar days starting from the official date of courier delivery to test all features of your refurbished device (cameras, display, battery longevity, Wi-Fi, calling, sound). If you identify any discrepancy, you may trigger a return request within this period.
            </p>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. Conditions for Eligible Returns
            </h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>The device must be returned in the original condition it was delivered in.</li>
              <li>Must include the original Sellbar retail box, certified charging cable, and warranty card.</li>
              <li>Device must be free of user passcodes, Apple iCloud / Apple ID, Google Account, or Samsung Knox locks.</li>
              <li>No signs of customer-induced physical damage, cracked glass, or liquid immersion.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#2bbda3]" /> 3. Replacement vs. Full Refund Choice
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-2">
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                <strong className="text-gray-900 text-sm block mb-1">Option A: Express Replacement</strong>
                If identical stock is available in our warehouse, we dispatch a replacement unit via priority courier within 24 hours of return pickup.
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <strong className="text-gray-900 text-sm block mb-1">Option B: 100% Refund</strong>
                If an identical model is out of stock or you prefer your money back, we refund 100% of the purchase amount with zero deductions.
              </div>
            </div>
          </section>

          {/* Section 4 & 5 */}
          <section id="section-4" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#2bbda3]" /> 4 &amp; 5. Return Pickup &amp; Refund Timelines
            </h2>
            <p>
              Once your return is picked up from your address and arrives at our diagnostic hub, inspection is completed within 24 hours. The refund is processed to your original payment mode:
            </p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Payment Channel</th>
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Credit Timeline</th>
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">UPI / Instant Transfer</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">2 to 4 Hours</td>
                    <td className="border border-gray-200 p-2.5">Direct to GPay / PhonePe / Paytm</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Credit / Debit Cards</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">3 to 5 Business Days</td>
                    <td className="border border-gray-200 p-2.5">Original issuing bank statement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Cash on Delivery (COD)</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">Within 24 Hours</td>
                    <td className="border border-gray-200 p-2.5">Customer-provided UPI ID or NEFT/IMPS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900">6. How to Initiate a Return</h2>
            <p className="text-xs text-gray-600">
              Go to your Sellbar account under <Link href="/account" className="text-[#2bbda3] font-semibold underline">My Orders</Link>, click &ldquo;Request Return&rdquo;, and select the reason. Alternatively, WhatsApp our helpline directly at <strong>+91-77175-17777</strong> with your Order ID.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
