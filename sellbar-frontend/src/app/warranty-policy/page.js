import React from "react";
import Link from "next/link";
import { Award, CheckCircle2, ShieldCheck, HelpCircle, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Warranty Policy | Sellbar.in",
  description: "Comprehensive 6 to 12 months warranty terms on certified refurbished gadgets from Sellbar.",
};

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Warranty Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bbda3]/10 text-[#2bbda3] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Warranty Policy</h1>
              <p className="text-sm text-gray-500">Up to 12 Months Sellbar Assured Comprehensive Warranty</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Every certified refurbished device purchased from Sellbar is backed by our dedicated warranty promise, giving you peace of mind with original certified replacement parts and doorstep repair support.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 1. Warranty Periods by Product Type
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-gray-200 mt-2">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 font-semibold text-gray-900">Product Category</th>
                    <th className="border border-gray-200 p-3 font-semibold text-gray-900">Condition Grade</th>
                    <th className="border border-gray-200 p-3 font-semibold text-gray-900">Warranty Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3">Smartphones &amp; iPhones</td>
                    <td className="border border-gray-200 p-3">Flawless / Like New</td>
                    <td className="border border-gray-200 p-3 font-bold text-[#2bbda3]">12 Months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3">Smartphones &amp; iPhones</td>
                    <td className="border border-gray-200 p-3">Good / Fair</td>
                    <td className="border border-gray-200 p-3 font-bold text-[#2bbda3]">6 Months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3">Laptops &amp; MacBooks</td>
                    <td className="border border-gray-200 p-3">All Grades</td>
                    <td className="border border-gray-200 p-3 font-bold text-[#2bbda3]">6 to 12 Months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3">Smartwatches &amp; Tablets</td>
                    <td className="border border-gray-200 p-3">All Grades</td>
                    <td className="border border-gray-200 p-3 font-bold text-[#2bbda3]">6 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. What Is Covered
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Motherboard, chipset, and internal processing defects.</li>
              <li>Display touch functionality, screen banding, and dead pixel failures (not caused by drops).</li>
              <li>Camera sensor, speaker, microphone, and charging port functionality.</li>
              <li>Battery health degradation below 70% within warranty period.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#2bbda3]" /> 3. How to Claim Warranty
            </h2>
            <p>
              To claim warranty, log into your Sellbar account, visit your Orders page, and click &quot;Claim Warranty&quot; or reach out via WhatsApp at <span className="font-semibold text-gray-900">+91-77175-17777</span> with your Order ID. A technician pickup or diagnostic will be arranged within 24-48 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
