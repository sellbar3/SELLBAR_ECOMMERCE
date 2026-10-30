'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Zap, ArrowRight, ArrowLeft, Tag, Check, } from 'lucide-react';
import { lookupPincode } from '@/lib/pincodes';
export default function BuybackWizard({ model }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(model.variants[0] || { id: 'v-def', modelId: model.id, title: 'Standard', priceOffset: 0 });
    // Step 2 Questionnaire
    const [powersOn, setPowersOn] = useState(true);
    const [screenCondition, setScreenCondition] = useState('FLAWLESS');
    const [bodyCondition, setBodyCondition] = useState('FLAWLESS');
    const [functionalDefects, setFunctionalDefects] = useState([]);
    const [accessories, setAccessories] = useState(['ORIGINAL_BOX', 'ORIGINAL_CHARGER', 'VALID_BILL']);
    // Promo code
    const [promoCodeInput, setPromoCodeInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState('');
    const [promoMessage, setPromoMessage] = useState('');
    // Valuation Quote
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [quoteData, setQuoteData] = useState(null);
    // Step 4: Doorstep Pickup & Payout
    const [pincode, setPincode] = useState('560034');
    const [pinCity, setPinCity] = useState('Bengaluru');
    const [pinState, setPinState] = useState('Karnataka');
    const [pinError, setPinError] = useState('');
    const [address, setAddress] = useState('Flat 402, Prestige Palms, Koramangala 4th Block');
    const [landmark, setLandmark] = useState('Opposite Sony Signal');
    const [pickupDate, setPickupDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    const [timeSlot, setTimeSlot] = useState('09:00 AM - 01:00 PM');
    const [payoutMethod, setPayoutMethod] = useState('UPI_VPA');
    const [upiId, setUpiId] = useState('arjun@okaxis');
    const [bankAccount, setBankAccount] = useState('');
    const [bankIfsc, setBankIfsc] = useState('');
    // Step 5: Confirmed Order
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState(null);
    const fetchQuote = async (promo) => {
        setQuoteLoading(true);
        try {
            const questionnaire = {
                powersOn,
                screenCondition,
                bodyCondition,
                functionalDefects,
                accessories,
            };
            const res = await fetch('/api/buyback/valuation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    modelId: model.id,
                    variantId: selectedVariant.id,
                    questionnaire,
                    promoCode: promo || appliedPromo,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setQuoteData(data.quote);
            }
        }
        catch {
            // ignore
        }
        finally {
            setQuoteLoading(false);
        }
    };
    useEffect(() => {
        if (step === 3) {
            fetchQuote();
        }
    }, [step, selectedVariant, powersOn, screenCondition, bodyCondition, functionalDefects, accessories]);
    const handleApplyPromo = () => {
        if (!promoCodeInput.trim())
            return;
        const code = promoCodeInput.trim().toUpperCase();
        if (code === 'SELLSMART' || code === 'SELLBARBONUS') {
            setAppliedPromo(code);
            setPromoMessage(`+5% Valuation Boost (${code}) Applied!`);
            fetchQuote(code);
        }
        else {
            setPromoMessage('Invalid coupon code. Try SELLSMART or SELLBARBONUS');
        }
    };
    const handlePincodeChange = (val) => {
        const clean = val.replace(/\D/g, '').slice(0, 6);
        setPincode(clean);
        if (clean.length === 6) {
            const info = lookupPincode(clean);
            if (info.buybackPickupAvailable) {
                setPinCity(info.city.split('(')[0].trim());
                setPinState(info.state.split('/')[0].trim());
                setPinError('');
            }
            else {
                setPinError('Doorstep pickup currently unavailable in this PIN code.');
            }
        }
    };
    const toggleDefect = (defect) => {
        setFunctionalDefects((prev) => prev.includes(defect) ? prev.filter((d) => d !== defect) : [...prev, defect]);
    };
    const toggleAccessory = (acc) => {
        setAccessories((prev) => prev.includes(acc) ? prev.filter((a) => a !== acc) : [...prev, acc]);
    };
    const handleSubmitOrder = async () => {
        setSubmittingOrder(true);
        try {
            const payoutDetails = payoutMethod === 'UPI_VPA'
                ? upiId
                : payoutMethod === 'IMPS_BANK_TRANSFER'
                    ? `${bankAccount} (IFSC: ${bankIfsc})`
                    : 'Sellbar Wallet Balance (+5% bonus)';
            const res = await fetch('/api/buyback/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    modelId: model.id,
                    variantId: selectedVariant.id,
                    questionnaire: {
                        powersOn,
                        screenCondition,
                        bodyCondition,
                        functionalDefects,
                        accessories,
                    },
                    basePrice: quoteData?.basePrice || model.baseResalePrice,
                    deductions: quoteData?.deductions || 0,
                    promotionalBonus: quoteData?.promotionalBonus || 0,
                    quotedPrice: quoteData?.quotedPrice || model.baseResalePrice,
                    payoutMethod,
                    payoutDetails,
                    pickupAddress: `${address}, ${landmark ? 'Landmark: ' + landmark + ', ' : ''}${pinCity}, ${pinState}`,
                    pickupPincode: pincode,
                    pickupDate,
                    pickupTimeSlot: timeSlot,
                }),
            });
            const data = await res.json();
            if (data.success && data.order) {
                setConfirmedOrder(data.order);
                setStep(5);
            }
            else {
                alert(data.message || 'Failed to schedule pickup.');
            }
        }
        catch (e) {
            alert('Network error. Please try again.');
        }
        finally {
            setSubmittingOrder(false);
        }
    };
    return (<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
        <div className="w-24 h-24 bg-slate-950 rounded-2xl p-2 flex items-center justify-center border border-slate-800 shrink-0">
          <img src={model.imageUrl} alt={model.name} className="max-h-20 max-w-full object-contain"/>
        </div>
        <div className="text-center sm:text-left space-y-1 flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Zap className="w-3 h-3"/> Sell Old Device
          </div>
          <h1 className="text-2xl font-black text-white">{model.name}</h1>
          <p className="text-xs text-slate-400">
            Get up to <strong className="text-emerald-400 font-bold text-sm">₹{model.baseResalePrice.toLocaleString('en-IN')}</strong> instant cash at your doorstep.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="hidden lg:flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (<div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${step === s
                ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20'
                : step > s
                    ? 'bg-emerald-900/60 text-emerald-300'
                    : 'bg-slate-800 text-slate-500'}`}>
              {step > s ? <Check className="w-4 h-4"/> : s}
            </div>))}
        </div>
      </div>

      {/* STEP 1: VARIANT SELECTION */}
      {step === 1 && (<div className="py-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 1: Select Device Storage / RAM Variant</h2>
            <p className="text-xs text-slate-400">Choose the exact storage capacity of your {model.name}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {model.variants.map((v) => (<button key={v.id} onClick={() => setSelectedVariant(v)} className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between h-24 ${selectedVariant.id === v.id
                    ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-lg shadow-emerald-500/10'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-300'}`}>
                <div className="font-bold text-base">{v.title}</div>
                <div className="text-xs text-emerald-400 font-medium">
                  Base quote: ₹{(model.baseResalePrice + (v.priceOffset || 0)).toLocaleString('en-IN')}
                </div>
              </button>))}
          </div>

          <div className="pt-4 flex justify-end">
            <button onClick={() => setStep(2)} className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 transition">
              <span>Next: Diagnostic Questions</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>)}

      {/* STEP 2: CONDITION QUESTIONS */}
      {step === 2 && (<div className="py-6 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 2: Tell Us About Device Condition</h2>
            <p className="text-xs text-slate-400">Accurate answers guarantee the exact price our technician pays at your doorstep</p>
          </div>

          {/* Q1: Power */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 block">1. Does the device switch on properly?</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setPowersOn(true)} className={`p-3.5 rounded-xl border text-sm font-semibold text-center transition ${powersOn
                ? 'border-emerald-500 bg-emerald-500/15 text-white'
                : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                Yes, boots to home screen
              </button>
              <button type="button" onClick={() => setPowersOn(false)} className={`p-3.5 rounded-xl border text-sm font-semibold text-center transition ${!powersOn
                ? 'border-rose-500 bg-rose-500/15 text-white'
                : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                No / Stuck on boot logo / Dead
              </button>
            </div>
          </div>

          {/* Q2: Screen */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 block">2. What is the screen / display condition?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'FLAWLESS', label: 'Flawless', desc: 'No scratches or marks' },
                { key: 'MINOR_SCRATCHES', label: 'Minor Scratches', desc: '1-2 hairline scratches' },
                { key: 'CRACKED', label: 'Cracked Glass', desc: 'Shattered front glass' },
                { key: 'TOUCH_ISSUE', label: 'Touch / Lines', desc: 'Color bleeding or dead pixels' },
            ].map((item) => (<button key={item.key} type="button" onClick={() => setScreenCondition(item.key)} className={`p-3 rounded-xl border text-left transition ${screenCondition === item.key
                    ? 'border-emerald-500 bg-emerald-500/15 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{item.desc}</div>
                </button>))}
            </div>
          </div>

          {/* Q3: Body */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 block">3. What is the physical body / frame condition?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { key: 'FLAWLESS', label: 'Pristine Flawless', desc: 'Looks like brand new' },
                { key: 'SCRATCHES', label: 'Normal Scratches', desc: 'Light pocket wear' },
                { key: 'DENTS', label: 'Heavy Dents', desc: 'Impact dents on corners' },
                { key: 'BENT', label: 'Bent Frame', desc: 'Curve or frame detachment' },
            ].map((item) => (<button key={item.key} type="button" onClick={() => setBodyCondition(item.key)} className={`p-3 rounded-xl border text-left transition ${bodyCondition === item.key
                    ? 'border-emerald-500 bg-emerald-500/15 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                  <div className="font-bold text-xs">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{item.desc}</div>
                </button>))}
            </div>
          </div>

          {/* Q4: Functional Defects */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 block">
              4. Select any functional defects (Leave empty if fully working):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { key: 'FRONT_CAMERA', label: 'Front Camera Not Working' },
                { key: 'REAR_CAMERA', label: 'Rear Camera Blurred / Damaged' },
                { key: 'BIOMETRICS', label: 'Face ID / Fingerprint Faulty' },
                { key: 'BATTERY_DEGRADED', label: 'Battery Health <80%' },
                { key: 'SPEAKER_MIC', label: 'Earpiece / Mic Distorted' },
                { key: 'CHARGING_PORT', label: 'Charging Port Faulty' },
            ].map((defect) => (<button key={defect.key} type="button" onClick={() => toggleDefect(defect.key)} className={`p-2.5 rounded-xl border text-xs font-medium text-left transition flex items-center justify-between ${functionalDefects.includes(defect.key)
                    ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                  <span>{defect.label}</span>
                  {functionalDefects.includes(defect.key) && <Check className="w-3.5 h-3.5 shrink-0"/>}
                </button>))}
            </div>
          </div>

          {/* Q5: Accessories */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 block">
              5. Do you have original accessories? (Get up to ₹1,500 extra bonus)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'ORIGINAL_BOX', label: 'Original Box with IMEI' },
                { key: 'ORIGINAL_CHARGER', label: 'Original Charger Cable' },
                { key: 'VALID_BILL', label: 'Valid Purchase Bill' },
            ].map((acc) => (<button key={acc.key} type="button" onClick={() => toggleAccessory(acc.key)} className={`p-3 rounded-xl border text-xs font-semibold text-center transition flex flex-col items-center gap-1 ${accessories.includes(acc.key)
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                    : 'border-slate-800 bg-slate-950 text-slate-500'}`}>
                  <span>{acc.label}</span>
                  {accessories.includes(acc.key) ? (<span className="text-[10px] text-emerald-400 font-normal">Included (+Extra)</span>) : (<span className="text-[10px] text-slate-500">Missing</span>)}
                </button>))}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button onClick={() => setStep(1)} className="py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4"/> Back to Variants
            </button>
            <button onClick={() => setStep(3)} className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 transition">
              <span>Calculate Instant Quote</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>)}

      {/* STEP 3: INSTANT VALUATION QUOTE BREAKDOWN */}
      {step === 3 && (<div className="py-6 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Verified Algorithmic Quote
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white pt-2">
              {quoteLoading ? (<span className="animate-pulse text-slate-500">Calculating...</span>) : (`₹${quoteData?.quotedPrice?.toLocaleString('en-IN') || '...'}`)}
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Indicative Doorstep Resale Price for {model.name} ({selectedVariant.title})
            </p>
          </div>

          {/* Transparent Line-Item Breakdown */}
          {quoteData && (<div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-850 pb-2">
                Transparent Price Breakdown
              </h3>
              <div className="space-y-2 text-xs">
                {quoteData.breakdown?.map((item, idx) => (<div key={idx} className="flex items-center justify-between py-1">
                    <span className={item.isDeduction ? 'text-slate-400' : 'text-white font-medium'}>
                      {item.label}
                    </span>
                    <span className={item.isDeduction ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-bold'}>
                      {item.isDeduction ? `- ₹${item.amount.toLocaleString('en-IN')}` : `+ ₹${item.amount.toLocaleString('en-IN')}`}
                    </span>
                  </div>))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm font-black">
                <span className="text-white">Total Guaranteed Payout</span>
                <span className="text-emerald-400 text-lg">
                  ₹{quoteData.quotedPrice?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>)}

          {/* Coupon boost input */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Tag className="w-4 h-4 text-emerald-400"/>
              <span>Apply Valuation Boost Code</span>
            </div>
            <div className="flex gap-2">
              <input type="text" value={promoCodeInput} onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())} placeholder="Enter coupon (e.g. SELLSMART)" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white uppercase focus:outline-none focus:border-emerald-500"/>
              <button type="button" onClick={handleApplyPromo} className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition">
                Apply
              </button>
            </div>
            {promoMessage && (<p className={`text-[11px] ${appliedPromo ? 'text-emerald-400' : 'text-amber-400'}`}>
                {promoMessage}
              </p>)}
          </div>

          {/* Navigation */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button onClick={() => setStep(2)} className="py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4"/> Edit Condition
            </button>
            <button onClick={() => setStep(4)} className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 transition">
              <span>Book Free Doorstep Pickup</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>)}

      {/* STEP 4: DOORSTEP PICKUP & PAYOUT */}
      {step === 4 && (<div className="py-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Step 4: Doorstep Pickup & Payout Details</h2>
            <p className="text-xs text-slate-400">Our certified technician arrives at your location with instant money transfer</p>
          </div>

          {/* Pincode & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">PIN Code</label>
              <input type="text" value={pincode} onChange={(e) => handlePincodeChange(e.target.value)} maxLength={6} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"/>
              {pinError && <p className="text-[10px] text-rose-400 mt-1">{pinError}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">City</label>
              <input type="text" value={pinCity} readOnly className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300"/>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">State</label>
              <input type="text" value={pinState} readOnly className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-300"/>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Doorstep Address</label>
            <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/Flat number, building name, street..." className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"/>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Pickup Date</label>
              <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"/>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Time Slot</label>
              <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500">
                <option value="09:00 AM - 01:00 PM">Morning (09:00 AM - 01:00 PM)</option>
                <option value="01:00 PM - 05:00 PM">Afternoon (01:00 PM - 05:00 PM)</option>
                <option value="05:00 PM - 08:00 PM">Evening (05:00 PM - 08:00 PM)</option>
              </select>
            </div>
          </div>

          {/* Payout Method */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-200 block uppercase tracking-wider">
              Select Payout Method (Paid Instantly at Pickup)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'UPI_VPA', label: 'Instant UPI', desc: 'GooglePay / PhonePe / Paytm' },
                { key: 'IMPS_BANK_TRANSFER', label: 'Bank IMPS', desc: 'Direct NEFT/IMPS to Account' },
                { key: 'SELLBAR_WALLET_CREDIT', label: 'Sellbar Wallet', desc: '+5% Extra Bonus Credit' },
            ].map((pm) => (<button key={pm.key} type="button" onClick={() => setPayoutMethod(pm.key)} className={`p-3 rounded-xl border text-left transition ${payoutMethod === pm.key
                    ? 'border-emerald-500 bg-emerald-500/15 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400'}`}>
                  <div className="font-bold text-xs">{pm.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{pm.desc}</div>
                </button>))}
            </div>

            {payoutMethod === 'UPI_VPA' && (<div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Enter UPI VPA ID</label>
                <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="e.g. mobile@upi, username@okhdfcbank" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"/>
              </div>)}

            {payoutMethod === 'IMPS_BANK_TRANSFER' && (<div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Bank Account Number</label>
                  <input type="text" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} placeholder="Enter account number" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"/>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Bank IFSC Code</label>
                  <input type="text" value={bankIfsc} onChange={(e) => setBankIfsc(e.target.value.toUpperCase())} placeholder="HDFC0001234" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white"/>
                </div>
              </div>)}
          </div>

          {/* Navigation */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button onClick={() => setStep(3)} className="py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4"/> Back to Quote
            </button>
            <button onClick={handleSubmitOrder} disabled={submittingOrder} className="py-3 px-8 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-sm flex items-center gap-2 transition shadow-lg shadow-emerald-500/20">
              {submittingOrder ? (<span>Confirming Appointment...</span>) : (<>
                  <CheckCircle2 className="w-4 h-4"/>
                  <span>Confirm Doorstep Pickup</span>
                </>)}
            </button>
          </div>
        </div>)}

      {/* STEP 5: CONFIRMATION & LIVE TRACKING */}
      {step === 5 && confirmedOrder && (<div className="py-8 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8"/>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Pickup Scheduled Successfully!
            </span>
            <h2 className="text-2xl font-black text-white">Order Ref: {confirmedOrder.orderNumber}</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto pt-1">
              Our technician <strong className="text-white">{confirmedOrder.assignedTechnicianName}</strong> will arrive at your address on{' '}
              <strong className="text-white">{confirmedOrder.pickupDate}</strong> ({confirmedOrder.pickupTimeSlot}).
            </p>
          </div>

          {/* Card Summary */}
          <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 max-w-lg mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Device</span>
              <span className="text-white font-bold">{confirmedOrder.modelName} ({confirmedOrder.variantTitle})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Estimated Payout</span>
              <span className="text-emerald-400 font-bold text-sm">₹{confirmedOrder.quotedPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Payout Mode</span>
              <span className="text-white">{confirmedOrder.payoutMethod} ({confirmedOrder.payoutDetails})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Doorstep Location</span>
              <span className="text-white text-right max-w-xs">{confirmedOrder.pickupAddress}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/account/sell-orders" className="w-full sm:w-auto py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition">
              <span>View in My Sell Orders</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>
            <Link href="/" className="w-full sm:w-auto py-3 px-6 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold rounded-xl text-xs transition">
              Back to Home
            </Link>
          </div>
        </div>)}
    </div>);
}
