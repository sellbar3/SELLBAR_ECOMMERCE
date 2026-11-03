'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Search 
} from 'lucide-react';
import { 
  lookupPincode, 
  searchLocations, 
  POPULAR_CITIES, 
  WEST_CHAMPARAN_BLOCKS, 
  isServiceablePincode 
} from '@/lib/pincodes';

export default function LocationModal({ isOpen, onClose, selectedCity, onSelectLocation }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSelect = (city, pin) => {
    const info = lookupPincode(pin);
    if (!info.isServiceable) {
      setError(`Delivery is currently unavailable in ${city} (${pin}). Sellbar offers express service across West Champaran, Bihar.`);
      return;
    }
    onSelectLocation(city, pin);
    setError('');
    setInput('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pin = input.trim();
    if (!pin) return;

    if (!/^\d+$/.test(pin)) {
      const matches = searchLocations(pin);
      if (matches.length > 0) {
        handleSelect(matches[0].name, matches[0].pincode);
        return;
      }
    }

    const info = lookupPincode(pin);
    if (!info.isServiceable) {
      setError(
        `PIN code ${pin} is outside our direct doorstep delivery zone. Please choose a location in West Champaran, Bihar.`
      );
      return;
    }

    handleSelect(info.blockName || info.district, pin);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#13b59b] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Select Delivery Location
              </h3>
              <p className="text-xs text-slate-500">
                West Champaran (Pashchim Champaran), Bihar
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coverage Banner */}
        <div className="mb-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 flex items-center justify-between text-xs text-emerald-900">
          <span className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#13b59b]" />
            18 Blocks • 19 Express PIN Codes
          </span>
          <span className="text-[10px] bg-white text-[#13b59b] font-black px-2 py-0.5 rounded-md border border-emerald-200">
            Active Zone
          </span>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Search Town, Block or 6-digit PIN Code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Bettiah, Bagaha, Lauriya, 845438"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#13b59b] focus:bg-white transition"
                autoFocus
              />
              {input && (
                <button
                  type="button"
                  onClick={() => {
                    setInput('');
                    setError('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              Verify
            </button>
          </div>

          {error && (
            <div className="mt-2.5 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Popular Blocks */}
        <div className="pt-2">
          <div className="text-xs font-bold text-slate-600 mb-2">
            Frequently Chosen Towns in West Champaran:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {POPULAR_CITIES.map((c) => {
              const isSelected = selectedCity === c.name;
              return (
                <button
                  key={c.pincode}
                  type="button"
                  onClick={() => handleSelect(c.name, c.pincode)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/60 border-[#13b59b] text-[#13b59b] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between w-full">
                    <span>{c.name}</span>
                    {isSelected && <CheckCircle2 size={12} className="text-[#13b59b]" />}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {c.pincode}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Same-day doorstep delivery available</span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#13b59b] font-bold hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
