import React from "react";
import Link from "next/link";
import { Cookie, CheckCircle2, Sliders, Shield } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Sellbar.in",
  description: "Information regarding cookie usage and tracking technologies on Sellbar.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Cookie Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Cookie className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cookie Policy</h1>
              <p className="text-sm text-gray-500">How we use cookies to improve your shopping experience</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            This Cookie Policy explains what cookies are, how Sellbar uses them, and how you can manage your preferences on our website.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 1. What Are Cookies?
            </h2>
            <p>
              Cookies are small data files placed on your computer or mobile device when you visit websites. They help remember your preferences, keep your session active, and maintain items in your shopping cart.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#2bbda3]" /> 2. Types of Cookies We Use
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900">Essential &amp; Session Cookies</h3>
                <p className="text-sm text-gray-600 mt-1">Required for core website operations such as authentication, cart storage, and secure checkout.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900">Performance &amp; Analytics Cookies</h3>
                <p className="text-sm text-gray-600 mt-1">Help us understand page speed, navigation flow, and product discovery trends so we can optimize the interface.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#2bbda3]" /> 3. Managing Cookies
            </h2>
            <p>
              You can modify your browser settings to decline or delete cookies at any time. However, disabling essential cookies may impact certain features like keeping you logged in or persisting cart items across page refreshes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
