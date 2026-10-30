'use client';
import React, { useState } from 'react';
import { ShieldCheck, CreditCard, QrCode, Building2, CheckCircle2, X, AlertTriangle, Lock, } from 'lucide-react';
export default function PaymentSandboxModal({ orderId, orderNumber, amount, onSuccess, onClose, }) {
    const [method, setMethod] = useState('UPI_QR');
    const [processing, setProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
    const [selectedBank, setSelectedBank] = useState('HDFC Bank');
    const handleSimulatePayment = async () => {
        setProcessing(true);
        try {
            const paymentId = `pay_sb_test_${Date.now()}`;
            const res = await fetch('/api/checkout/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    paymentId,
                }),
            });
            const data = await res.json();
            if (data.success) {
                onSuccess(paymentId);
            }
            else {
                alert(data.message || 'Payment verification failed');
            }
        }
        catch {
            alert('Error verifying payment.');
        }
        finally {
            setProcessing(false);
        }
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative text-white">
        {/* Top Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Lock className="w-4 h-4"/>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Sellbar Secure Pay</div>
              <div className="text-sm font-black text-white">₹{amount.toLocaleString('en-IN')}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* Test Mode Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-amber-300 text-[11px]">
          <AlertTriangle className="w-4 h-4 shrink-0"/>
          <span>
            <strong>Sandbox Mode:</strong> Fully verified test checkout simulation. No real funds debited.
          </span>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <button type="button" onClick={() => setMethod('UPI_QR')} className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${method === 'UPI_QR'
            ? 'border-emerald-500 bg-emerald-500/15 text-white'
            : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
              <QrCode className="w-4 h-4 text-emerald-400"/>
              <span>UPI / QR</span>
            </button>

            <button type="button" onClick={() => setMethod('CARD')} className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${method === 'CARD'
            ? 'border-emerald-500 bg-emerald-500/15 text-white'
            : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
              <CreditCard className="w-4 h-4 text-cyan-400"/>
              <span>Cards</span>
            </button>

            <button type="button" onClick={() => setMethod('NET_BANKING')} className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${method === 'NET_BANKING'
            ? 'border-emerald-500 bg-emerald-500/15 text-white'
            : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
              <Building2 className="w-4 h-4 text-purple-400"/>
              <span>NetBanking</span>
            </button>
          </div>

          {/* UPI View */}
          {method === 'UPI_QR' && (<div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-center space-y-3">
              <div className="w-32 h-32 bg-white rounded-xl mx-auto p-2 flex items-center justify-center">
                {/* QR graphic */}
                <div className="w-full h-full border-2 border-dashed border-slate-900 flex flex-col items-center justify-center text-[10px] text-slate-900 font-bold">
                  <QrCode className="w-12 h-12 text-slate-900 mb-1"/>
                  <span>Scan to Pay</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Scan with any UPI app (Google Pay, PhonePe, Paytm, CRED)
              </p>
            </div>)}

          {/* Cards View */}
          {method === 'CARD' && (<div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Card Number</label>
                <input type="text" value={cardNumber} readOnly className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"/>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Expiry</label>
                  <input type="text" value="12/28" readOnly className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"/>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">CVV</label>
                  <input type="password" value="•••" readOnly className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"/>
                </div>
              </div>
            </div>)}

          {/* Netbanking View */}
          {method === 'NET_BANKING' && (<div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
              <label className="text-[10px] text-slate-400 uppercase font-bold block">Select Bank</label>
              <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white">
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Kotak Mahindra">Kotak Mahindra</option>
              </select>
            </div>)}

          {/* Security badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400"/>
            <span>256-Bit Bank-Grade Encryption • RBI Compliant</span>
          </div>

          {/* Pay Button */}
          <button onClick={handleSimulatePayment} disabled={processing} className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
            {processing ? (<span>Verifying Signature...</span>) : (<>
                <CheckCircle2 className="w-4 h-4"/>
                <span>Pay ₹{amount.toLocaleString('en-IN')} (Complete Test Payment)</span>
              </>)}
          </button>
        </div>
      </div>
    </div>);
}
