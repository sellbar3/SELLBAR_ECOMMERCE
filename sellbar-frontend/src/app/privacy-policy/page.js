import React from "react";
import Link from "next/link";
import { Lock, ShieldCheck, Eye, Database, Bell } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Sellbar.in",
  description: "Learn how Sellbar collects, protects, and handles your personal information with strict data privacy standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bbda3]/10 text-[#2bbda3] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-sm text-gray-500">Committed to protecting your privacy &amp; data security</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            At <strong>Sellbar</strong>, we value your trust and take the security of your personal information very seriously. This policy details how your data is collected, stored, and protected in compliance with the Digital Personal Data Protection (DPDP) Act.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#2bbda3]" /> 1. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact &amp; Account Data:</strong> Name, phone number, email address, and saved delivery/pickup addresses.</li>
              <li><strong>Transaction Data:</strong> Details of products purchased, devices sold, payment status, and bank/UPI details for buyback payouts.</li>
              <li><strong>Device &amp; Usage Data:</strong> IP address, device specs, browser type, and diagnostic logs to enhance platform performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#2bbda3]" /> 2. How We Use Your Information
            </h2>
            <p>
              Your data is exclusively used to fulfill your orders, dispatch doorstep technicians for device evaluation, process instant payouts, provide warranty support, and send order tracking updates. We <strong>never sell your personal data</strong> to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2bbda3]" /> 3. Data Protection &amp; Device Sanitization
            </h2>
            <p>
              For all devices collected through our buyback and recommerce channels, Sellbar enforces a <strong>military-grade data erasure protocol</strong> (DoD 5220.22-M / NIST 800-88 standard) to ensure no residual personal data remains on any recycled or refurbished device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#2bbda3]" /> 4. Your Rights
            </h2>
            <p>
              You have the right to review, update, or request deletion of your account and personal records at any time. Simply email <a href="mailto:privacy@sellbar.in" className="text-[#2bbda3] underline font-medium">privacy@sellbar.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
