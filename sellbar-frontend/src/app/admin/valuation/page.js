'use client';

import React, { useState } from 'react';
import PanelShell from '@/components/PanelShell';
import {
  Sliders,
  DollarSign,
  ShieldCheck,
  Smartphone,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Percent
} from 'lucide-react';

export default function AdminValuationRulesPage() {
  const [savedMsg, setSavedMsg] = useState(false);

  // Valuation algorithm parameters
  const [rates, setRates] = useState({
    // Physical Condition deductions (%)
    flawlessDeduction: 0,
    goodDeduction: 12,
    averageDeduction: 28,
    belowAverageDeduction: 45,

    // Functional defect deductions (₹ flat or %)
    screenTouchDefect: 2500,
    cameraDefect: 1800,
    speakerMicDefect: 1200,
    batteryDegraded: 1500,
    motherboardIssue: 4500,

    // Accessory bonuses (₹ addition to cash offer)
    bonusCharger: 400,
    bonusBox: 300,
    bonusBill: 500,

    // Device age depreciation (% per year after release)
    annualDepreciation: 15,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3500);
  };

  const handleReset = () => {
    if (confirm('Reset valuation algorithm parameters to factory defaults?')) {
      setRates({
        flawlessDeduction: 0,
        goodDeduction: 12,
        averageDeduction: 28,
        belowAverageDeduction: 45,
        screenTouchDefect: 2500,
        cameraDefect: 1800,
        speakerMicDefect: 1200,
        batteryDegraded: 1500,
        motherboardIssue: 4500,
        bonusCharger: 400,
        bonusBox: 300,
        bonusBill: 500,
        annualDepreciation: 15,
      });
    }
  };

  return (
    <PanelShell role="admin" title="VALUATION ENGINE RULES - Admin Portal">
      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Sliders className="text-[#13b59b]" size={24} /> Resale Valuation Engine &amp; Depreciation Matrix
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Adjust AI valuation deductions, cosmetic condition penalties, and accessory bonuses applied during user device assessment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <RotateCcw size={14} /> Reset Defaults
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
            >
              <Save size={15} /> Save Valuation Rules
            </button>
          </div>
        </div>

        {savedMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
            <CheckCircle2 size={16} className="text-[#13b59b]" />
            <span>Valuation parameters saved successfully! Live estimation wizard will now use updated rates.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Cosmetic Condition Deductions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Percent size={16} className="text-[#13b59b]" /> Cosmetic Physical Condition Penalty (%)
                </h2>
                <p className="text-xs text-slate-500">
                  Percentage deducted from device base value based on physical exterior condition.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-teal-50 text-[#13b59b] rounded-lg">
                Screen &amp; Body Condition
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Flawless (Like New)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rates.flawlessDeduction}
                    onChange={(e) => setRates({ ...rates, flawlessDeduction: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                </div>
                <span className="text-[10px] text-slate-400">Zero scratches or dents</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Good (Minor Wear)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rates.goodDeduction}
                    onChange={(e) => setRates({ ...rates, goodDeduction: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                </div>
                <span className="text-[10px] text-slate-400">1-2 minor micro scratches</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Average (Visible Scratches)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rates.averageDeduction}
                    onChange={(e) => setRates({ ...rates, averageDeduction: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                </div>
                <span className="text-[10px] text-slate-400">Multiple scratches, paint peel</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Below Average (Heavy Dents)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rates.belowAverageDeduction}
                    onChange={(e) => setRates({ ...rates, belowAverageDeduction: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                </div>
                <span className="text-[10px] text-slate-400">Cracked glass or corner dents</span>
              </div>
            </div>
          </div>

          {/* Section 2: Functional Defects */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" /> Functional Hardware Defect Penalties (₹ Flat)
                </h2>
                <p className="text-xs text-slate-500">
                  Fixed cost subtracted to cover hardware repair and part replacements.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg">
                Repair Part Replacement
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Screen Touch / Display Dead Pixels
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.screenTouchDefect}
                    onChange={(e) => setRates({ ...rates, screenTouchDefect: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Camera Lens / Blur Defect
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.cameraDefect}
                    onChange={(e) => setRates({ ...rates, cameraDefect: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Speaker / Microphone / Ear-piece Defect
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.speakerMicDefect}
                    onChange={(e) => setRates({ ...rates, speakerMicDefect: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Battery Degraded (&lt; 80% Health)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.batteryDegraded}
                    onChange={(e) => setRates({ ...rates, batteryDegraded: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Motherboard / FaceID / Fingerprint Defect
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.motherboardIssue}
                    onChange={(e) => setRates({ ...rates, motherboardIssue: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Accessory Bonuses */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <DollarSign size={16} className="text-emerald-600" /> Original Accessory Incentive Bonus (₹)
                </h2>
                <p className="text-xs text-slate-500">
                  Cash incentive added directly to customer buyback quote when box or accessories are present.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg">
                Cash Value Boost
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Original Charger &amp; Cable
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.bonusCharger}
                    onChange={(e) => setRates({ ...rates, bonusCharger: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <span className="text-[10px] text-slate-400">+₹{rates.bonusCharger} to valuation</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Original Brand Retail Box (Matching IMEI)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.bonusBox}
                    onChange={(e) => setRates({ ...rates, bonusBox: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <span className="text-[10px] text-slate-400">+₹{rates.bonusBox} to valuation</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Valid GST Retail Purchase Bill
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={rates.bonusBill}
                    onChange={(e) => setRates({ ...rates, bonusBill: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <span className="text-[10px] text-slate-400">+₹{rates.bonusBill} to valuation</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PanelShell>
  );
}
