import React from "react";
import Link from "next/link";
import { RotateCcw, CheckCircle2, Clock, AlertTriangle, CreditCard } from "lucide-react";

export const metadata = {
  title: "Refund & Replacement Policy | Sellbar.in",
  description: "7-Day hassle-free return, replacement, and refund policy on refurbished tech from Sellbar.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Refund Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bbda3]/10 text-[#2bbda3] flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Refund &amp; Replacement Policy</h1>
              <p className="text-sm text-gray-500">7 Days Money-Back &amp; Replacement Assurance</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We want you to love your refurbished tech. If you receive an item with any functional defect or physical discrepancy from what was described, you can request an easy replacement or complete refund within 7 days of delivery.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#2bbda3]" /> 1. 7-Day Return Window
            </h2>
            <p>
              You have 7 calendar days from the date of package delivery to inspect and test your device. If any technical, battery, or hardware issue arises, initiate a return from your Sellbar Orders dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. Replacement or Refund
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Free Replacement:</strong> If available in inventory, an identical model in matching or superior condition grade will be dispatched immediately.</li>
              <li><strong>Full Refund:</strong> If a replacement is unavailable or preferred, 100% of the purchase price will be refunded to your original payment method.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#2bbda3]" /> 3. Refund Timelines
            </h2>
            <p>
              Once our verification team receives and inspects the returned device at our warehouse, your refund is processed within <strong>24 to 48 hours</strong>:
            </p>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-2 space-y-1 text-sm">
              <p>• <strong>UPI / Netbanking:</strong> 2 to 4 hours after approval</p>
              <p>• <strong>Credit / Debit Cards:</strong> 3 to 5 business days (depending on your bank)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
