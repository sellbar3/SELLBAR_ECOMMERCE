import React from "react";
import Link from "next/link";
import { Recycle, Leaf, ShieldCheck, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "E-Waste Management & Recycling Policy | Sellbar.in",
  description: "Learn about Sellbar's eco-friendly commitment to responsible e-waste recycling and circular economy in India.",
};

export default function EWastePolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">E-Waste Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">E-Waste Management Policy</h1>
              <p className="text-sm text-gray-500">Committed to a Greener Planet &amp; Circular Electronics</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Sellbar is committed to the environmentally sound management of electronic waste in full compliance with the <strong>E-Waste (Management) Rules, 2022</strong>, notified by the Ministry of Environment, Forest and Climate Change (MoEFCC), Government of India.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" /> 1. Our Circular Mission
            </h2>
            <p>
              By repairing, refurbishing, and extending the lifespan of mobile devices and laptops, Sellbar has diverted thousands of metric tons of toxic electronic components from municipal landfills. Unusable gadgets are channeled to authorized EPR-certified recyclers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" /> 2. Free Doorstep Device Recycling
            </h2>
            <p>
              Have a dead, broken, or obsolete mobile phone, tablet, or charger? Use our <Link href="/recycle-old-mobile-phone" className="text-[#2bbda3] underline font-semibold">Free Recycle Program</Link> to schedule a zero-cost doorstep collection.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> 3. Do&apos;s and Don&apos;ts for Consumers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <h3 className="font-semibold text-emerald-800 mb-2">DO&apos;s</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>Hand over end-of-life gadgets to authorized collection points.</li>
                  <li>Keep products disconnected from power before disposal.</li>
                  <li>Back up and erase personal data before handing over for recycling.</li>
                </ul>
              </div>
              <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
                <h3 className="font-semibold text-rose-800 mb-2">DON&apos;Ts</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                  <li>Do not throw electronic devices in regular household trash bins.</li>
                  <li>Do not dispose of lithium-ion batteries by burning or crushing.</li>
                  <li>Do not sell non-functional electronics to informal ragpickers.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
