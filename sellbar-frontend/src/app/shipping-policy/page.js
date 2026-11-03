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
  PhoneCall
} from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy | Sellbar.in",
  description: "Express doorstep delivery, same-day delivery across Bettiah / Bihar, and zero-risk door-to-door transit insurance at Sellbar.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#13b59b] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Shipping Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#13b59b] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shipping &amp; Delivery Policy</h1>
              <p className="text-sm text-gray-500">Fast, Insured &amp; Tamper-Evident Doorstep Fulfillment</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            At Sellbar, every refurbished device and trade-in order is backed by speed, security, and real-time tracking. Whether you are purchasing certified smartphones or scheduling a doorstep old mobile pickup, our verified courier logistics ensure zero hassle.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#13b59b]" /> 1. Delivery Timelines &amp; Coverage
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Local &amp; West Champaran Region</h3>
                <p className="text-xs text-slate-600">
                  <strong>Same-Day or Next-Day Delivery:</strong> Orders placed for Bettiah, Bagaha, Motihari, and nearby pin codes before 2:00 PM are delivered within 24 hours.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">Pan-India Express Couriers</h3>
                <p className="text-xs text-slate-600">
                  <strong>2 to 4 Business Days:</strong> Shipped via tier-1 partners including BlueDart, Delhivery, DTDC, and Xpressbees with end-to-end SMS updates.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#13b59b]" /> 2. Tamper-Proof Packaging &amp; Unboxing
            </h2>
            <p className="text-sm">
              All refurbished products are packed in multi-layered, shock-absorbing foam with a tamper-evident holographic security seal. In the rare event that the outer carton appears torn or damaged upon arrival:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>Do not accept the shipment from the delivery agent.</li>
              <li>Ask the courier representative to note the package condition as &quot;Damaged upon delivery&quot;.</li>
              <li>Contact our support team immediately at <strong className="text-slate-900">+91 98765 43210</strong> or via email.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#13b59b]" /> 3. Doorstep Pickup for Selling Old Mobiles
            </h2>
            <p className="text-sm">
              When you sell your old smartphone on Sellbar:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li><strong>Free Pickup:</strong> Our pickup executive visits your home or office address at your chosen time slot.</li>
              <li><strong>Physical Diagnostic:</strong> The executive takes 5-10 minutes to run diagnostics on screen touch, camera, speakers, and battery.</li>
              <li><strong>Instant Payout:</strong> Once you accept the valuation, payment is transferred immediately via UPI, IMPS, or Cash before the device is collected.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#13b59b]" /> 4. Shipping Charges &amp; Free Delivery
            </h2>
            <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl text-xs sm:text-sm text-emerald-900">
              <p className="font-semibold">
                ✓ Free standard shipping on all refurbished gadget orders above ₹1,999.
              </p>
              <p className="mt-1">
                ✓ Zero hidden delivery charges. Doorstep old mobile evaluation pickups are 100% free of charge.
              </p>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Have questions regarding shipping tracking or doorstep pickup schedules?
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <PhoneCall size={14} /> Contact Support
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
