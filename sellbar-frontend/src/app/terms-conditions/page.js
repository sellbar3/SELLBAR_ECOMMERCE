import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Sellbar.in",
  description: "Read the official terms and conditions for using Sellbar recommerce and refurbished electronics platform.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Terms & Conditions</span>
        </nav>

        {/* Header Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bbda3]/10 text-[#2bbda3] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms &amp; Conditions</h1>
              <p className="text-sm text-gray-500">Last updated: January 2026</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Welcome to <strong>Sellbar.in</strong>. By accessing our website, purchasing certified refurbished tech, or using our device buyback and recycling services, you agree to abide by these Terms and Conditions.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 1. Eligibility &amp; User Account
            </h2>
            <p>
              To place orders or sell devices on Sellbar, you must be at least 18 years of age and legally competent to enter into binding contracts under the Indian Contract Act, 1872. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. Buying Refurbished Products
            </h2>
            <p>
              All refurbished products sold on Sellbar undergo rigorous 32-point quality testing. Products are categorized into condition grades (Flawless, Very Good, Good). Every device comes with up to 12 months comprehensive warranty and a 7-day replacement window subject to our Warranty and Refund policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 3. Selling Devices (Recommerce &amp; Buyback)
            </h2>
            <p>
              When selling a used device, you certify that you are the lawful owner of the device and have the full right to sell it. The device must not be stolen, blacklisted, financed with unpaid dues, or linked to illegal activities. You must erase all personal data and log out of iCloud, Google, or other accounts before handover.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              The initial online price quote is an estimate. Final valuation is confirmed during doorstep physical diagnosis by our certified inspection agent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 4. Pricing and Payments
            </h2>
            <p>
              Prices listed on the website are in Indian Rupees (INR) and inclusive of applicable GST. Payments can be made via UPI, Debit/Credit Cards, Net Banking, and authorized gateways. For device buyback, payout is transferred immediately to your verified UPI/bank account upon successful verification.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 5. Limitation of Liability
            </h2>
            <p>
              Sellbar Technologies India Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services or products beyond the total purchase or buyback value of the transaction.
            </p>
          </section>

          <section className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-gray-700" /> Contact Legal Department
            </h3>
            <p className="text-sm text-gray-600">
              Questions regarding our terms can be directed to <a href="mailto:legal@sellbar.in" className="text-[#2bbda3] font-medium underline">legal@sellbar.in</a> or by calling our customer care at <span className="font-semibold text-gray-800">+91-77175-17777</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
