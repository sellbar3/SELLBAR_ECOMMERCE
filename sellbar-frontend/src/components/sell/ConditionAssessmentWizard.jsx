'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  ShieldCheck,
  Battery,
  Layers,
  Sparkles,
  Zap,
  Box,
  FileText,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import {
  FUNCTIONAL_CONDITIONS,
  SCREEN_CONDITIONS,
  BODY_CONDITIONS,
  BATTERY_CONDITIONS,
  ACCESSORIES_OPTIONS,
  calculateEstimatedPrice,
} from '@/lib/valuationEngine';

const STEPS = [
  { id: 1, title: 'Variant', subtitle: 'Select RAM & Storage' },
  { id: 2, title: 'Functionality', subtitle: 'Operational Health' },
  { id: 3, title: 'Screen', subtitle: 'Display & Glass' },
  { id: 4, title: 'Body', subtitle: 'Back & Frame' },
  { id: 5, title: 'Battery', subtitle: 'Battery Backup' },
  { id: 6, title: 'Accessories', subtitle: 'Box & Charger' },
];

export default function ConditionAssessmentWizard({ model, onProceedToBooking }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Assessment Selection States
  const [selectedVariant, setSelectedVariant] = useState(model.variants[0]);
  const [functionalId, setFunctionalId] = useState('flawless');
  const [screenId, setScreenId] = useState('flawless');
  const [bodyId, setBodyId] = useState('flawless');
  const [batteryId, setBatteryId] = useState('healthy');
  const [selectedAccessories, setSelectedAccessories] = useState(['box', 'charger']);

  // Real-time valuation calculation
  const valuation = useMemo(() => {
    return calculateEstimatedPrice({
      baseResalePrice: model.baseResalePrice,
      variantPriceDelta: selectedVariant?.priceDelta || 0,
      functionalId,
      screenId,
      bodyId,
      batteryId,
      selectedAccessories,
    });
  }, [model, selectedVariant, functionalId, screenId, bodyId, batteryId, selectedAccessories]);

  const toggleAccessory = (id) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed wizard: trigger booking flow with complete payload
      if (onProceedToBooking) {
        onProceedToBooking({
          model,
          variant: selectedVariant,
          conditionAssessment: {
            functional: functionalId,
            screen: screenId,
            body: bodyId,
            battery: batteryId,
            accessories: selectedAccessories,
            priceBreakdown: valuation.breakdown,
          },
          estimatedPrice: valuation.estimatedPrice,
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Top Wizard Steps Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Step {currentStep} of 6
            </span>
            <h2 className="text-2xl font-black tracking-tight mt-0.5">
              Device Condition Assessment
            </h2>
          </div>

          {/* Live Floating Quote in Header */}
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-right">
            <span className="text-[11px] text-slate-300 font-bold uppercase tracking-wider block">
              Live Estimated Value
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-300">
              ₹{valuation.estimatedPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-6 gap-2">
          {STEPS.map((s) => {
            const isDone = s.id < currentStep;
            const isCurrent = s.id === currentStep;

            return (
              <div
                key={s.id}
                onClick={() => setCurrentStep(s.id)}
                className="cursor-pointer group flex flex-col gap-1.5"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#13b59b]'
                      : isDone
                      ? 'bg-emerald-500/60'
                      : 'bg-white/20'
                  }`}
                />
                <span
                  className={`hidden sm:block text-[11px] font-bold truncate ${
                    isCurrent ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Content & Options */}
      <div className="p-6 sm:p-8">
        {/* STEP 1: VARIANT SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Select Exact RAM &amp; Storage Variant</h3>
              <p className="text-xs text-slate-500 mt-1">
                Prices differ based on the internal hardware tier of your phone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {model.variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#13b59b] bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        isSelected ? 'bg-[#13b59b] text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          {v.ram} RAM • {v.storage} Storage
                        </div>
                        <div className="text-xs text-slate-500">Color: {v.color}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      {v.priceDelta > 0 && (
                        <span className="text-xs font-bold text-emerald-600">
                          +₹{v.priceDelta.toLocaleString('en-IN')}
                        </span>
                      )}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-auto mt-1 ${
                        isSelected ? 'border-[#13b59b] bg-[#13b59b] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 size={16} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: FUNCTIONAL CONDITION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Functional &amp; Hardware Health</h3>
              <p className="text-xs text-slate-500 mt-1">
                Test cameras, microphones, cellular calls, and fingerprint / Face ID.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FUNCTIONAL_CONDITIONS.map((cond) => {
                const isSelected = functionalId === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => setFunctionalId(cond.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#13b59b] bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm text-slate-900">{cond.label}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          cond.deductionPct === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {cond.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cond.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#13b59b] bg-[#13b59b] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 size={14} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SCREEN CONDITION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Screen &amp; Display Condition</h3>
              <p className="text-xs text-slate-500 mt-1">
                Inspect glass surface, scratches, touch response, and color spots.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCREEN_CONDITIONS.map((cond) => {
                const isSelected = screenId === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => setScreenId(cond.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#13b59b] bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm text-slate-900">{cond.label}</span>
                        {cond.deductionPct > 0 ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            -{cond.deductionPct}%
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            0% Deduction
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cond.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#13b59b] bg-[#13b59b] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 size={14} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: BODY & FRAME CONDITION */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Body &amp; Frame Condition</h3>
              <p className="text-xs text-slate-500 mt-1">
                Inspect corner dents, back glass cracks, camera ring scuffs, or bent chassis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BODY_CONDITIONS.map((cond) => {
                const isSelected = bodyId === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => setBodyId(cond.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#13b59b] bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm text-slate-900">{cond.label}</span>
                        {cond.deductionPct > 0 ? (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            -{cond.deductionPct}%
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            0% Deduction
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cond.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#13b59b] bg-[#13b59b] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 size={14} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: BATTERY HEALTH */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Battery Backup &amp; Health</h3>
              <p className="text-xs text-slate-500 mt-1">
                Check iOS Battery Health % or daily discharge rate on Android.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BATTERY_CONDITIONS.map((cond) => {
                const isSelected = batteryId === cond.id;
                return (
                  <div
                    key={cond.id}
                    onClick={() => setBatteryId(cond.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#13b59b] bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-sm text-slate-900">{cond.label}</span>
                        {cond.deductionPct > 0 && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                            -{cond.deductionPct}%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cond.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#13b59b] bg-[#13b59b] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 size={14} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: ACCESSORIES & INVOICE */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Original Accessories &amp; Invoice</h3>
              <p className="text-xs text-slate-500 mt-1">
                Check all accessories you have to unlock cash bonuses.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACCESSORIES_OPTIONS.map((acc) => {
                const isChecked = selectedAccessories.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccessory(acc.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isChecked
                        ? 'border-[#13b59b] bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 block">{acc.label}</span>
                      <span className="text-xs font-bold text-emerald-600 mt-0.5 block">
                        +₹{acc.bonus.toLocaleString('en-IN')} Cash Bonus
                      </span>
                    </div>

                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                      isChecked ? 'border-[#13b59b] bg-[#13b59b] text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <CheckCircle2 size={16} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Valuation Summary Breakdown Box */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-900 text-sm">Transparent Valuation Summary</span>
            <span className="font-black text-base text-[#13b59b]">
              ₹{valuation.estimatedPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <div>
              Base Value: <span className="font-bold text-slate-900">₹{valuation.baseResalePrice.toLocaleString('en-IN')}</span>
            </div>
            <div>
              Variant: <span className="font-bold text-slate-900">{selectedVariant.ram} / {selectedVariant.storage}</span>
            </div>
            <div>
              Total Deductions: <span className="font-bold text-rose-600">-₹{valuation.breakdown.totalDeductions.toLocaleString('en-IN')}</span>
            </div>
            <div>
              Accessories Bonus: <span className="font-bold text-emerald-600">+₹{valuation.breakdown.totalBonus.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              className="py-3 px-6 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <ChevronLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="py-3 px-8 rounded-xl bg-[#13b59b] hover:bg-[#0fa088] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-2 transition cursor-pointer"
          >
            {currentStep === 6 ? (
              <>
                <span>Lock Price &amp; Schedule Free Pickup</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                <span>Continue</span>
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
