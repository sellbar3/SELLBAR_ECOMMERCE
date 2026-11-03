'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  CreditCard,
  Building,
  Smartphone,
  Check,
  ArrowRight,
} from 'lucide-react';

const TIME_SLOTS = [
  '10:00 AM - 01:00 PM (Morning Slot)',
  '01:00 PM - 04:00 PM (Afternoon Slot)',
  '04:00 PM - 07:00 PM (Evening Slot)',
];

export default function SellBookingModal({ isOpen, onClose, assessmentData }) {
  const router = useRouter();

  // Booking Flow Steps: 1: Details & OTP -> 2: Address & Slot -> 3: Payout Details
  const [step, setStep] = useState(1);

  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  // Address States
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('845438');
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);

  // Payout States
  const [payoutMethod, setPayoutMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  // Submitting & Feedback
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !assessmentData) return null;

  const { model, variant, conditionAssessment, estimatedPrice } = assessmentData;

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp === '9842' || otp.length === 4) {
      setOtpVerified(true);
      setErrorMsg('');
      setStep(2); // advance to address & pickup slot
    } else {
      setErrorMsg('Invalid OTP. Use test OTP: 9842');
    }
  };

  const handleSubmitBooking = async (e) => {
    if (e) e.preventDefault();

    if (!address.trim()) {
      setErrorMsg('Please enter your full pickup street address.');
      return;
    }

    if (payoutMethod === 'upi' && !upiId.trim()) {
      setErrorMsg('Please enter your UPI ID (e.g. mobile@upi).');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      const payload = {
        customer: { name, phone, email },
        device: {
          brand: model.brand,
          model: model.name,
          slug: model.slug,
          image: model.image,
          variant: { ram: variant?.ram, storage: variant?.storage, color: variant?.color },
          baseResalePrice: model.baseResalePrice,
        },
        conditionAssessment,
        estimatedPrice,
        pickupDetails: {
          address,
          landmark,
          city: 'Bettiah',
          pincode,
          pickupDate,
          timeSlot,
        },
        payout: {
          method: payoutMethod,
          upiId: payoutMethod === 'upi' ? upiId : '',
          bankAccount: payoutMethod === 'bank' ? bankAccount : '',
          ifsc: payoutMethod === 'bank' ? ifsc : '',
          accountHolder: payoutMethod === 'bank' ? accountHolder : '',
        },
      };

      const res = await fetch('/api/sell-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success && json.order) {
        onClose();
        router.push(`/sell-old-mobile-phone/order-confirmed?orderId=${json.order.orderId}&phone=${phone}&amount=${estimatedPrice}`);
      } else {
        throw new Error(json.message || 'Failed to submit selling request');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMsg(err.message || 'Could not schedule pickup. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Doorstep Pickup Scheduler
            </span>
            <h3 className="text-xl font-black mt-0.5">
              Sell {model.name} for ₹{estimatedPrice.toLocaleString('en-IN')}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: CUSTOMER DETAILS & OTP */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900">1. Customer Identification &amp; Verification</h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (For Technician Call)</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer shrink-0"
                    >
                      {otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  )}
                </div>
              </div>

              {otpSent && !otpVerified && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900">Enter 4-Digit Verification Code</span>
                    <button
                      type="button"
                      onClick={() => setOtp('9842')}
                      className="text-[#13b59b] underline font-bold cursor-pointer"
                    >
                      Use Demo OTP (9842)
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="9842"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="flex-1 bg-white border border-emerald-300 rounded-xl px-3.5 py-2 text-center text-base tracking-widest font-black text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-5 py-2 bg-[#13b59b] text-white rounded-xl text-xs font-bold hover:bg-[#0fa088] transition cursor-pointer"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              {otpVerified && (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} /> Mobile Number Verified (+91 {phone})
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional for Invoice)</label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!name || !phone}
                  onClick={() => {
                    if (!otpVerified) {
                      setOtpVerified(true); // Allow continuous dev testing
                    }
                    setStep(2);
                  }}
                  className="px-6 py-3 bg-[#13b59b] hover:bg-[#0fa088] disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Continue to Address &amp; Slot</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS & TIME SLOT */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900">2. Doorstep Pickup Address &amp; Slot</h4>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
                >
                  Edit Contact
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Doorstep Street Address</label>
                <textarea
                  rows={2}
                  required
                  placeholder="House / Flat No., Road, Mohalla, Supriya Chowk"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Landmark</label>
                  <input
                    type="text"
                    placeholder="Near SBI Bank"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!address.trim()}
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYOUT METHOD & CONFIRMATION */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900">3. Instant Payout Method on Doorstep Inspection</h4>
              <p className="text-xs text-slate-500">
                Payment is transferred instantly to your account in front of your eyes once our certified technician verifies device conditions.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setPayoutMethod('upi')}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    payoutMethod === 'upi'
                      ? 'border-[#13b59b] bg-emerald-50/50 shadow-sm'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone size={18} className="text-[#13b59b]" />
                    <span className="font-bold text-xs text-slate-900">Instant UPI</span>
                  </div>
                  <span className="text-[11px] text-slate-500">GPay, PhonePe, Paytm, BHIM</span>
                </div>

                <div
                  onClick={() => setPayoutMethod('bank')}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    payoutMethod === 'bank'
                      ? 'border-[#13b59b] bg-emerald-50/50 shadow-sm'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Building size={18} className="text-[#13b59b]" />
                    <span className="font-bold text-xs text-slate-900">Bank NEFT / IMPS</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Direct account transfer</span>
                </div>
              </div>

              {payoutMethod === 'upi' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your UPI ID / VPA</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9876543210@paytm or name@okaxis"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bank Account Holder Name</label>
                    <input
                      type="text"
                      placeholder="Account holder name"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        placeholder="Bank account number"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        placeholder="SBIN0001234"
                        value={ifsc}
                        onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#13b59b]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">{model.name}</span>
                  <span className="text-[11px] text-emerald-700">{variant.ram} / {variant.storage} • Doorstep Pickup</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 block">Total Payout</span>
                  <span className="text-xl font-black text-emerald-700">₹{estimatedPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmitBooking}
                  className="px-8 py-3 bg-[#13b59b] hover:bg-[#0fa088] disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg hover:shadow-xl transition cursor-pointer flex items-center gap-2"
                >
                  {submitting ? 'Confirming Order...' : 'Confirm Selling Request'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
