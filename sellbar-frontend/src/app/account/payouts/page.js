'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Save,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { getSession } from '@/lib/auth';

export default function AccountPayoutsPage() {
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('upi'); // 'upi' or 'bank'
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const session = getSession();
    if (session?.user?.name) {
      setAccountHolder(session.user.name);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMsg('✓ Payout details saved successfully! Your doorstep buyback money will be transferred to this account.');
    setTimeout(() => setSuccessMsg(''), 4500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <CreditCard className="text-[#13b59b]" size={24} />
          Instant Payout &amp; Bank Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure where you want to receive your instant cash payment when you sell an old device at doorstep.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 size={16} className="text-[#13b59b]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Instant Payout Promise Card */}
      <div className="bg-gradient-to-tr from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs text-emerald-200 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-400" />
            Sellbar Doorstep Instant Transfer Guarantee
          </span>
          <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-white text-[10px]">
            100% Secure
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-black tracking-tight font-mono">
          Instant UPI / IMPS Payout
        </div>
        <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
          The moment our certified technician inspects your device and confirms its condition, payment is initiated on the spot. Money reflects in your account within 60 seconds with valid bank UTR proof.
        </p>
      </div>

      {/* Payout Method Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
            Select Preferred Payout Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPayoutMethod('upi')}
              className={`p-4 rounded-2xl border-2 text-left transition flex items-center gap-3 cursor-pointer ${
                payoutMethod === 'upi'
                  ? 'border-[#13b59b] bg-emerald-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#13b59b]">
                <Smartphone size={20} />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">Instant UPI (Recommended)</div>
                <div className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPayoutMethod('bank')}
              className={`p-4 rounded-2xl border-2 text-left transition flex items-center gap-3 cursor-pointer ${
                payoutMethod === 'bank'
                  ? 'border-[#13b59b] bg-emerald-50/50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600">
                <Building size={20} />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">Direct Bank NEFT / IMPS</div>
                <div className="text-[11px] text-slate-500">Account Number &amp; IFSC Code</div>
              </div>
            </button>
          </div>
        </div>

        {payoutMethod === 'upi' ? (
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your UPI ID (VPA) *
              </label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. mobileNumber@upi or yourname@okhdfcbank"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold focus:outline-none focus:border-[#13b59b] focus:bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Make sure your UPI ID is active and accepts incoming payments from business accounts.
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Account Holder Name *
              </label>
              <input
                type="text"
                required
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="Name as per bank passbook"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#13b59b] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bank Account Number *
              </label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="9-18 digit account number"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold focus:outline-none focus:border-[#13b59b] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                IFSC Code *
              </label>
              <input
                type="text"
                required
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                placeholder="e.g. HDFC0001234"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono uppercase font-semibold focus:outline-none focus:border-[#13b59b] focus:bg-white"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-slate-100">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#13b59b]" />
            <span>Encrypted with 256-bit bank-grade protocol</span>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Save size={15} />
            <span>Save Payout Method</span>
          </button>
        </div>
      </form>
    </div>
  );
}
