'use client';

import React, { useState, useEffect } from 'react';
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
  Percent,
  Calculator,
  Layers,
} from 'lucide-react';

const DEFAULT_RATES = {
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
};

export default function AdminValuationRulesPage() {
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Simulator test inputs
  const [simBasePrice, setSimBasePrice] = useState(32000);
  const [simCondition, setSimCondition] = useState('good');
  const [simDefects, setSimDefects] = useState({
    screen: false,
    camera: false,
    speaker: false,
    battery: true,
    motherboard: false,
  });
  const [simAccessories, setSimAccessories] = useState({
    charger: true,
    box: true,
    bill: false,
  });

  // Fetch saved rates on mount
  useEffect(() => {
    async function loadRates() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/valuation');
        const json = await res.json();
        if (json.success && json.data) {
          setRates(json.data);
        }
      } catch (e) {
        console.error('Failed to load valuation rules:', e);
      } finally {
        setLoading(false);
      }
    }
    loadRates();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErrorMsg('');
      setSavedMsg('');

      const res = await fetch('/api/admin/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rates),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to update rules in database');
      }

      setSavedMsg('✓ Valuation rules successfully persisted to MongoDB Atlas!');
      setTimeout(() => setSavedMsg(''), 4500);
    } catch (err) {
      setErrorMsg(err.message || 'Error saving valuation rules');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset valuation algorithm parameters to factory defaults?')) {
      setRates(DEFAULT_RATES);
    }
  };

  // Calculate live valuation simulation
  const calcSimulatedOffer = () => {
    let price = Number(simBasePrice) || 0;
    // Condition deduction
    let condPct = 0;
    if (simCondition === 'flawless') condPct = rates.flawlessDeduction;
    else if (simCondition === 'good') condPct = rates.goodDeduction;
    else if (simCondition === 'average') condPct = rates.averageDeduction;
    else if (simCondition === 'belowAverage') condPct = rates.belowAverageDeduction;

    const conditionCut = (price * condPct) / 100;
    price -= conditionCut;

    // Defect deductions
    let defectCut = 0;
    if (simDefects.screen) defectCut += rates.screenTouchDefect;
    if (simDefects.camera) defectCut += rates.cameraDefect;
    if (simDefects.speaker) defectCut += rates.speakerMicDefect;
    if (simDefects.battery) defectCut += rates.batteryDegraded;
    if (simDefects.motherboard) defectCut += rates.motherboardIssue;
    price = Math.max(500, price - defectCut);

    // Accessory bonuses
    let bonusAdd = 0;
    if (simAccessories.charger) bonusAdd += rates.bonusCharger;
    if (simAccessories.box) bonusAdd += rates.bonusBox;
    if (simAccessories.bill) bonusAdd += rates.bonusBill;
    price += bonusAdd;

    return {
      conditionCut: Math.round(conditionCut),
      defectCut: Math.round(defectCut),
      bonusAdd: Math.round(bonusAdd),
      finalOffer: Math.round(price),
    };
  };

  const simResult = calcSimulatedOffer();

  return (
    <PanelShell role="admin" title="VALUATION ENGINE RULES - Admin Portal">
      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Sliders className="text-[#13b59b]" size={24} /> Valuation Engine &amp; Deduction Rules
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure dynamic depreciation percentages, hardware defect penalties, and accessory bonuses saved in MongoDB Atlas.
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
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
            >
              <Save size={15} />
              {saving ? 'Saving...' : 'Save Rules to Database'}
            </button>
          </div>
        </div>

        {savedMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
            <CheckCircle2 size={16} className="text-[#13b59b]" />
            <span>{savedMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertTriangle size={16} className="text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Simulator Preview Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-lg border border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2 text-sm font-black">
              <Calculator className="text-[#13b59b]" size={18} />
              <span>Live Algorithm Simulation Preview</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#13b59b]/20 text-[#13b59b] rounded border border-[#13b59b]/40">
              Interactive Test Mode
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block text-[11px] mb-1 font-semibold">Test Base Device Price (₹)</label>
              <input
                type="number"
                value={simBasePrice}
                onChange={(e) => setSimBasePrice(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-[#13b59b]"
              />
            </div>

            <div>
              <label className="text-slate-400 block text-[11px] mb-1 font-semibold">Cosmetic Condition</label>
              <select
                value={simCondition}
                onChange={(e) => setSimCondition(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
              >
                <option value="flawless">Flawless (-{rates.flawlessDeduction}%)</option>
                <option value="good">Good (-{rates.goodDeduction}%)</option>
                <option value="average">Average (-{rates.averageDeduction}%)</option>
                <option value="belowAverage">Below Average (-{rates.belowAverageDeduction}%)</option>
              </select>
            </div>

            <div className="md:col-span-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 flex flex-col justify-between">
              <div className="flex justify-between text-slate-300 text-[11px]">
                <span>Base: ₹{simBasePrice.toLocaleString('en-IN')}</span>
                <span className="text-rose-400">Cond: -₹{simResult.conditionCut.toLocaleString('en-IN')}</span>
                <span className="text-rose-400">Defects: -₹{simResult.defectCut.toLocaleString('en-IN')}</span>
                <span className="text-emerald-400">Accessories: +₹{simResult.bonusAdd.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-700">
                <span className="text-slate-300 font-bold">Estimated Buyback Payout:</span>
                <span className="text-xl font-black text-[#13b59b] font-mono">
                  ₹{simResult.finalOffer.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

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
              {/* Flawless */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">Flawless (Like New)</label>
                  <span className="text-xs font-extrabold text-[#13b59b]">{rates.flawlessDeduction}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={rates.flawlessDeduction}
                  onChange={(e) => setRates({ ...rates, flawlessDeduction: Number(e.target.value) })}
                  className="w-full accent-[#13b59b] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Zero scratches or dents</span>
              </div>

              {/* Good */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">Good (Minor Wear)</label>
                  <span className="text-xs font-extrabold text-[#13b59b]">{rates.goodDeduction}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={rates.goodDeduction}
                  onChange={(e) => setRates({ ...rates, goodDeduction: Number(e.target.value) })}
                  className="w-full accent-[#13b59b] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">1-2 micro scratches</span>
              </div>

              {/* Average */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">Average (Visible Scratches)</label>
                  <span className="text-xs font-extrabold text-[#13b59b]">{rates.averageDeduction}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={rates.averageDeduction}
                  onChange={(e) => setRates({ ...rates, averageDeduction: Number(e.target.value) })}
                  className="w-full accent-[#13b59b] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Multiple scratches, paint peel</span>
              </div>

              {/* Below Average */}
              <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">Below Average (Dents)</label>
                  <span className="text-xs font-extrabold text-[#13b59b]">{rates.belowAverageDeduction}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={rates.belowAverageDeduction}
                  onChange={(e) => setRates({ ...rates, belowAverageDeduction: Number(e.target.value) })}
                  className="w-full accent-[#13b59b] cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Cracked glass or corner dents</span>
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
                  Fixed repair and replacement cost subtracted from device quote when specific tests fail.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg">
                Hardware Replacement
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
                  Speaker / Mic / Audio Defect
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
                  Motherboard / FaceID / TouchID Defect
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Depreciation Rate (% per Year)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={rates.annualDepreciation}
                    onChange={(e) => setRates({ ...rates, annualDepreciation: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-7 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
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
                <span className="text-[10px] text-slate-400">+₹{rates.bonusCharger} added to payout</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Original Brand Box (Matching IMEI)
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
                <span className="text-[10px] text-slate-400">+₹{rates.bonusBox} added to payout</span>
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
                <span className="text-[10px] text-slate-400">+₹{rates.bonusBill} added to payout</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
            >
              <Save size={16} />
              {saving ? 'Saving Valuation Settings...' : 'Save Rules to Database'}
            </button>
          </div>
        </form>
      </div>
    </PanelShell>
  );
}
