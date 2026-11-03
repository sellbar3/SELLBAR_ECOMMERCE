import React from "react";
import Link from "next/link";
import { 
  Truck, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  BadgeIndianRupee
} from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy | Sellbar.in",
  description: "Express doorstep delivery, same-day delivery across West Champaran & Bihar, free shipping on orders above ₹999, and real-time tracking.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Shipping Policy</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shipping &amp; Delivery Policy</h1>
              <p className="text-xs sm:text-sm text-gray-500">Fast, Insured &amp; Tamper-Evident Doorstep Fulfillment Across India</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            At Sellbar, every refurbished device and trade-in order is backed by speed, security, and real-time tracking. Whether you are purchasing certified smartphones or scheduling a doorstep old mobile pickup, our verified courier logistics ensure zero hassle.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Last Updated: January 1, 2026</span>
            <span className="font-semibold text-emerald-600">Transit Insurance Included</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2bbda3]" /> Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
            <a href="#section-1" className="hover:text-[#2bbda3] transition-colors">1. Delivery Zones &amp; Timelines</a>
            <a href="#section-2" className="hover:text-[#2bbda3] transition-colors">2. Shipping Charges &amp; Free Delivery</a>
            <a href="#section-3" className="hover:text-[#2bbda3] transition-colors">3. Tamper-Proof Packaging &amp; Open Box Delivery</a>
            <a href="#section-4" className="hover:text-[#2bbda3] transition-colors">4. Real-Time Tracking &amp; Notifications</a>
            <a href="#section-5" className="hover:text-[#2bbda3] transition-colors">5. Doorstep Buyback Pickup Timelines</a>
            <a href="#section-6" className="hover:text-[#2bbda3] transition-colors">6. Failed Deliveries &amp; Re-attempt SLA</a>
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-sm">
          {/* Section 1 */}
          <section id="section-1" className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#2bbda3]" /> 1. Delivery Zones &amp; Timelines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#2bbda3] text-white">Local Hub</span>
                <h3 className="font-bold text-gray-900 text-sm mt-1.5 mb-1">West Champaran &amp; North Bihar</h3>
                <p className="text-xs text-gray-600">
                  <strong>Same-Day or Next-Day Delivery:</strong> Orders placed for Bettiah, Bagaha, Motihari, and nearby pin codes before 2:00 PM are delivered within 24 hours by Sellbar Express riders.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-200 text-gray-800">Pan-India Express</span>
                <h3 className="font-bold text-gray-900 text-sm mt-1.5 mb-1">Metros &amp; All Other States</h3>
                <p className="text-xs text-gray-600">
                  <strong>2 to 4 Business Days:</strong> Shipped via tier-1 air logistics partners (BlueDart, Delhivery, DTDC) with insured transit and end-to-end SMS &amp; WhatsApp alerts.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <BadgeIndianRupee className="w-5 h-5 text-[#2bbda3]" /> 2. Shipping Charges &amp; Free Delivery
            </h2>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Order Value</th>
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Delivery Charge</th>
                    <th className="border border-gray-200 p-2.5 font-bold text-gray-900">Applicable Region</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Orders ₹999 and above</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-emerald-600">FREE SHIPPING</td>
                    <td className="border border-gray-200 p-2.5">All 19,000+ Pincodes across India</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Orders below ₹999</td>
                    <td className="border border-gray-200 p-2.5 font-medium text-gray-800">₹49 Standard</td>
                    <td className="border border-gray-200 p-2.5">Pan-India</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2.5 font-medium">Doorstep Buyback Pickups</td>
                    <td className="border border-gray-200 p-2.5 font-bold text-emerald-600">100% FREE ALWAYS</td>
                    <td className="border border-gray-200 p-2.5">All Serviceable Towns</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#2bbda3]" /> 3. Tamper-Proof Packaging &amp; Open Box Delivery
            </h2>
            <p>
              All refurbished products are packed in multi-layered, shock-absorbing foam with a tamper-evident holographic security seal. In selected pincodes in West Champaran and Patna, we offer <strong>Open Box Delivery</strong> where you can visually inspect the gadget before sharing the OTP.
            </p>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 4. Real-Time Tracking &amp; Courier Partners
            </h2>
            <p className="text-xs text-gray-600">
              As soon as your package leaves our fulfillment warehouse, you receive a direct tracking link via SMS, WhatsApp and email. You can also visit <Link href="/track-order" className="text-[#2bbda3] font-semibold underline">Track Order</Link> anytime using your Order ID.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
