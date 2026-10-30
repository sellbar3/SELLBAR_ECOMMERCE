import React from "react";
import Link from "next/link";
import { Shield, CheckCircle2, Globe, Lock } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Sellbar.in",
  description: "Terms governing the use of Sellbar's website, portals, and digital services.",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Terms of Use</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bbda3]/10 text-[#2bbda3] flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms of Use</h1>
              <p className="text-sm text-gray-500">Effective Date: January 1, 2026</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">
            These Terms of Use govern your access to and interaction with the Sellbar digital platform, web application, and related software.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-gray-100 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 1. Acceptable Use
            </h2>
            <p>
              You agree to use Sellbar exclusively for lawful purposes. You shall not attempt to reverse engineer, scrape, introduce malicious code, compromise security, or overload our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 2. Intellectual Property
            </h2>
            <p>
              All trademarks, logos, content, software, illustrations, and design elements on Sellbar.in are the exclusive intellectual property of Sellbar Technologies India Pvt. Ltd. and protected under applicable copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 3. Third-Party Links &amp; Integrations
            </h2>
            <p>
              Our website may link to third-party services such as payment gateways (Razorpay) and logistics partners. Sellbar does not control or assume responsibility for external content or privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2bbda3]" /> 4. Disclaimers &amp; Governing Law
            </h2>
            <p>
              Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. These terms are governed by the laws of India, with exclusive jurisdiction in the courts of New Delhi.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
