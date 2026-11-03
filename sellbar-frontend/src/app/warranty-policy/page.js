import React from "react";
import Link from "next/link";
import { Award, CheckCircle2, ShieldCheck, HelpCircle, RefreshCw, AlertCircle, FileText } from "lucide-react";

export const metadata = {
  title: "Warranty Policy | 6-12 Months Coverage | Sellbar.in",
  description: "Comprehensive 6 to 12 months warranty terms, claim process, and coverage details on certified refurbished gadgets from Sellbar.",
};

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Warranty Policy</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bbda3]/10 text-[#2bbda3] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sellbar Assured Warranty Policy</h1>
              <p className="text-xs sm:text-sm text-gray-500">Comprehensive 6 to 12 Months Hardware &amp; Component Protection</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            Every certified refurbished device purchased from Sellbar is backed by our dedicated warranty promise, giving you complete peace of mind with original certified replacement parts, free doorstep pickup for servicing, and rapid turnaround.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Effective Date: January 1, 2026</span>
            <span className="font-semibold text-emerald-600">Status: Active &amp; Valid Across India</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2bbda3]" /> Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
            <a href="#section-1" className="hover:text-[#2bbda3] transition-colors">1. Warranty Periods by Product Category</a>
            <a href="#section-2" className="hover:text-[#2bbda3] transition-colors">2. What is Covered under Warranty</a>
            <a href="#section-3" className="hover:text-[#2bbda3] transition-colors">3. What is Excluded (Void Conditions)</a>
            <a href="#section-4" className="hover:text-[#2bbda3] transition-colors">4. Step-by-Step Claim &amp; Pickup Process</a>
            <a href="#section-5" className="hover:text-[#2bbda3] transition-colors">5. Turnaround Time &amp; Resolution SLA</a>
            <a href="#section-6" className="hover:text-[#2bbda3] transition-colors">6. Customer Support &amp; Grievance Redressal</a>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-sm">
          {/* Section 1 */}
          <section id="section-1" className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 1. Warranty Periods by Product Category
            </h2>
            <p>
              The warranty period begins on the day the device is delivered to your designated address as confirmed by courier delivery records.
            </p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Category</th>
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Condition Grade</th>
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Warranty Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Smartphones &amp; iPhones</td>
                    <td className="border border-gray-200 p-2.5">Flawless (Like New)</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">12 Months Comprehensive</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Smartphones &amp; iPhones</td>
                    <td className="border border-gray-200 p-2.5">Good / Fair</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">6 Months Comprehensive</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">MacBooks &amp; Laptops</td>
                    <td className="border border-gray-200 p-2.5">All Certified Grades</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">12 Months (Parts &amp; Labor)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">iPads &amp; Android Tablets</td>
                    <td className="border border-gray-200 p-2.5">All Certified Grades</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">6 Months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Smartwatches &amp; Audio</td>
                    <td className="border border-gray-200 p-2.5">All Certified Grades</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">6 Months</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Gaming Consoles (PS5 / Xbox)</td>
                    <td className="border border-gray-200 p-2.5">All Certified Grades</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-[#2bbda3]">6 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. What is Covered under Warranty
            </h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Display Hardware &amp; Touch Digitizer:</strong> Ghost touch, touch latency, or unprompted display line failure not caused by physical drop or impact.</li>
              <li><strong>Motherboard &amp; Internal Components:</strong> Processor, internal memory, charging IC, Wi-Fi / Bluetooth chip, and audio DAC.</li>
              <li><strong>Battery Health Assurance:</strong> Rapid battery drainage or failure to charge under normal daily usage conditions.</li>
              <li><strong>Cameras &amp; Sensors:</strong> Hardware blur, autofocus mechanism failure, FaceID / fingerprint scanner malfunction.</li>
              <li><strong>Microphones &amp; Speakers:</strong> Sound distortion, low speaker volume, or non-functional earpiece.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" /> 3. What is Excluded (Void Conditions)
            </h2>
            <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 text-xs space-y-1.5 text-gray-700">
              <p>• <strong>Physical Damage:</strong> Shattered glass, chipped chassis, deep dents from accidental drops or external pressure.</p>
              <p>• <strong>Liquid / Water Ingress:</strong> Damage caused by immersion in water, moisture, or chemical exposure (Liquid Contact Indicator triggered).</p>
              <p>• <strong>Unauthorized Repairs:</strong> Opening the device casing, tampering with internal screws, or third-party unauthorized repairs.</p>
              <p>• <strong>Software Tampering:</strong> Custom ROMs, unofficial jailbreaks, or rooting that causes bootloop or firmware corruption.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#2bbda3]" /> 4. Step-by-Step Claim &amp; Pickup Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-[#2bbda3] block mb-1">Step 1: Contact Support</span>
                Send your Order ID and video proof of the issue to support@sellbar.in or WhatsApp +91-77175-17777.
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-[#2bbda3] block mb-1">Step 2: Free Pickup</span>
                We schedule a free reverse pickup from your doorstep across West Champaran or Pan-India express couriers.
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="font-bold text-[#2bbda3] block mb-1">Step 3: Repair or Replace</span>
                Certified engineers inspect, repair with genuine parts, or dispatch an equivalent replacement device within 3 to 5 business days.
              </div>
            </div>
          </section>

          {/* Section 5 & 6 */}
          <section id="section-5" className="space-y-2 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900">5. Turnaround Time &amp; Resolution SLA</h2>
            <p className="text-xs text-gray-600">
              For Bettiah &amp; West Champaran residents, doorstep technician diagnosis is scheduled within 24 to 48 hours. For Pan-India couriers, total diagnostic and repair turnaround is strictly capped at 5 to 7 business days from receipt.
            </p>
          </section>

          <section id="section-6" className="space-y-2 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900">6. Customer Support &amp; Grievance Redressal</h2>
            <p className="text-xs text-gray-600">
              If your warranty request has not been addressed within 48 hours, escalate directly to our Senior Operations Lead at <a href="mailto:grievance@sellbar.in" className="text-[#2bbda3] font-semibold underline">grievance@sellbar.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
