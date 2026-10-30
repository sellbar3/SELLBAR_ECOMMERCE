import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, FileCheck, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Corporate Information | Sellbar Technologies India",
  description: "Official corporate details, registered office address, CIN, and statutory compliance information for Sellbar.",
};

export default function CorporateInformationPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Corporate Information</span>
        </nav>

        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Corporate Information</h1>
              <p className="text-sm text-gray-500">Statutory &amp; Entity Details</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm">
            Sellbar operates under Sellbar Technologies India Private Limited, an incorporated entity duly registered under the Companies Act, 2013, with the Registrar of Companies (ROC), Delhi.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xs space-y-6 text-sm text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Company Legal Name</span>
              <p className="font-bold text-gray-900">Sellbar Technologies India Private Limited</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Corporate Identification Number (CIN)</span>
              <p className="font-bold text-gray-900">U72900DL2024PTC398241</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">GST Registration Number</span>
              <p className="font-bold text-gray-900">07AAECS9824L1Z8</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-1">Entity Classification</span>
              <p className="font-bold text-gray-900">Private Limited Company (E-Commerce / Recommerce)</p>
            </div>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2bbda3]" /> Registered Office Address
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sellbar Technologies India Pvt. Ltd.<br />
              Plot 14, Okhla Industrial Area Phase-III, New Delhi, Delhi - 110020, India.
            </p>
          </div>

          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2bbda3]" /> Grievance &amp; Compliance Officer
            </h3>
            <p className="text-gray-600 text-sm">
              In accordance with Information Technology Act 2000 and Consumer Protection (E-Commerce) Rules, 2020:
            </p>
            <p className="text-xs text-gray-500">
              Email: <a href="mailto:grievance@sellbar.in" className="text-[#2bbda3] font-medium underline">grievance@sellbar.in</a> | Phone: +91-77175-17777
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
