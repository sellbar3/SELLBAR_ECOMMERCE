import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, FileCheck, Mail, MapPin, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Corporate Information | Sellbar Technologies India",
  description: "Official corporate details, registered office address, regional facilities, CIN, and statutory compliance information for Sellbar.",
};

export default function CorporateInformationPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <nav className="flex items-center text-xs font-medium text-slate-500 gap-1.5">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Corporate Information</span>
        </nav>

        {/* Header Dossier Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#2bbda3] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> Corporate Dossier &amp; Statutory Compliance
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sellbar Technologies India Private Limited
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Official corporate registration, registered office addresses, statutory officers, and legal compliance disclosures pursuant to the Companies Act, 2013 and Consumer Protection (E-Commerce) Rules, 2020.
            </p>
          </div>
        </div>

        {/* Corporate Entity Grid */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Company Legal Name</span>
              <p className="font-bold text-slate-900 text-xs">Sellbar Technologies India Private Limited</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Corporate ID (CIN)</span>
              <p className="font-mono font-bold text-slate-900 text-xs">U72900DL2024PTC398241</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">GST Registration</span>
              <p className="font-mono font-bold text-slate-900 text-xs">07AAECS9824L1Z8</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">ROC Jurisdiction</span>
              <p className="font-bold text-slate-900 text-xs">Registrar of Companies, Delhi</p>
            </div>
          </div>

          {/* Locations Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                Registered Office
              </span>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 pt-1">
                <MapPin className="w-4 h-4 text-[#2bbda3]" /> National Headquarters
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sellbar Technologies India Pvt. Ltd.<br />
                Plot 14, Okhla Industrial Area Phase-III,<br />
                New Delhi, Delhi - 110020, India.
              </p>
            </div>

            <div className="p-6 bg-teal-50/40 rounded-2xl border border-teal-100/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2bbda3] text-white">
                Operations &amp; Diagnostics
              </span>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 pt-1">
                <MapPin className="w-4 h-4 text-[#2bbda3]" /> Regional Diagnostic Center
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supriya Cinema Road, Near Station Chowk,<br />
                Bettiah, West Champaran, Bihar - 845438, India.
              </p>
            </div>
          </div>

          {/* Grievance Redressal Officer */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2bbda3]" /> Statutory Grievance Redressal Officer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In accordance with the Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020:
            </p>
            <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-700">
              <div><strong>Designation:</strong> Grievance Officer, Customer Redressal Cell</div>
              <div><strong>Email:</strong> <a href="mailto:grievance@sellbar.in" className="text-[#2bbda3] underline font-semibold">grievance@sellbar.in</a></div>
              <div><strong>Helpline:</strong> +91-77175-17777</div>
            </div>
          </div>

          {/* Statutory Policies & Certificates */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2bbda3]" /> Statutory Documents &amp; Policies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <Link href="/terms-conditions" className="p-3 rounded-xl border border-slate-200 hover:border-[#2bbda3] bg-white text-center font-semibold text-slate-700 shadow-2xs">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy-policy" className="p-3 rounded-xl border border-slate-200 hover:border-[#2bbda3] bg-white text-center font-semibold text-slate-700 shadow-2xs">
                Privacy Policy
              </Link>
              <Link href="/warranty-policy" className="p-3 rounded-xl border border-slate-200 hover:border-[#2bbda3] bg-white text-center font-semibold text-slate-700 shadow-2xs">
                Warranty Policy
              </Link>
              <Link href="/e-waste-policy" className="p-3 rounded-xl border border-slate-200 hover:border-[#2bbda3] bg-white text-center font-semibold text-slate-700 shadow-2xs">
                E-Waste Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
