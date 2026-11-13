'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  RotateCcw,
  Phone,
  MessageCircle,
  HelpCircle,
  FileCheck2,
  Cpu,
  Battery,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

export default function AccountWarrantyPage() {
  const WARRANTY_BENEFITS = [
    {
      title: '12 Months Doorstep Coverage',
      desc: 'Free doorstep pickup, technician inspection, and genuine repair for all certified refurbished phones, laptops & gadgets.',
      icon: ShieldCheck,
    },
    {
      title: '7-Day No-Questions Return',
      desc: 'Not 100% satisfied with your purchase? Raise a return or replacement request within 7 days of delivery.',
      icon: RotateCcw,
    },
    {
      title: '32-Point Diagnostic Tested',
      desc: 'Display, Touch, Motherboard, Battery health (>85%), Cameras, Microphones, Wi-Fi & Biometrics verified.',
      icon: Cpu,
    },
    {
      title: 'Doorstep Warranty Claim',
      desc: 'No need to visit crowded service centers. Technician visits your home or office for repair or replacement.',
      icon: Wrench,
    },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="text-[#13b59b]" size={24} />
          Sellbar Assured 12-Month Warranty
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Every device sold on Sellbar includes our 12-month comprehensive warranty and 7-day replacement guarantee.
        </p>
      </div>

      {/* Hero Badge */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shrink-0">
            <Award size={36} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
              Active Protection
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1">Sellbar Protection Plan</h2>
            <p className="text-xs text-emerald-100 mt-1 max-w-md">
              Valid on all purchases from authorized Sellbar certified refurbished sellers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://wa.me/917717517777?text=Hello%20Sellbar!%20I%20want%20to%20claim%20doorstep%20warranty%20service%20for%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <MessageCircle size={14} />
            <span>Claim on WhatsApp</span>
          </a>
          <Link
            href="/orders"
            className="px-4 py-2.5 bg-white text-slate-800 hover:bg-slate-100 text-xs font-bold rounded-xl transition shadow-xs"
          >
            View Order Invoices
          </Link>
        </div>
      </div>

      {/* 4 Pillars of Warranty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WARRANTY_BENEFITS.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 hover:border-[#13b59b]/50 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#13b59b] flex items-center justify-center">
                <Icon size={20} />
              </div>
              <h3 className="text-sm font-black text-slate-900">{b.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Claim Guidelines Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
          <FileCheck2 className="text-[#13b59b]" size={18} />
          How to Raise a Doorstep Warranty Claim?
        </h3>

        <ol className="relative border-l-2 border-slate-200 ml-4 space-y-4 text-xs">
          <li className="ml-5">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#13b59b] text-white flex items-center justify-center text-[9px] font-bold">
              1
            </span>
            <strong className="text-slate-900 font-bold block">Keep your GST Tax Invoice Handy</strong>
            <span className="text-slate-500">
              Download your official Tax Invoice from{' '}
              <Link href="/orders" className="text-[#13b59b] font-bold underline">
                Your Orders
              </Link>{' '}
              section.
            </span>
          </li>

          <li className="ml-5">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#13b59b] text-white flex items-center justify-center text-[9px] font-bold">
              2
            </span>
            <strong className="text-slate-900 font-bold block">Message us on WhatsApp (+91 77175 17777)</strong>
            <span className="text-slate-500">
              Send your Order ID and a 10-second video clip describing the hardware issue.
            </span>
          </li>

          <li className="ml-5">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#13b59b] text-white flex items-center justify-center text-[9px] font-bold">
              3
            </span>
            <strong className="text-slate-900 font-bold block">Doorstep Technician Visit within 24-48 Hours</strong>
            <span className="text-slate-500">
              Our technician inspects your device at home and completes resolution or replacement under warranty.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}
