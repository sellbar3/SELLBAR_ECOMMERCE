'use client';

import React from 'react';
import { Filter, X, RotateCcw, Check, Sparkles, ChevronDown } from 'lucide-react';
import { POPULAR_BRANDS } from '@/lib/sellMobileData';

const RAM_OPTIONS = ['4GB', '6GB', '8GB', '12GB', '16GB'];
const STORAGE_OPTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const NETWORK_OPTIONS = [
  { id: 'all', label: 'All Networks' },
  { id: '5G', label: '5G Ready' },
  { id: '4G', label: '4G VoLTE' },
];

export default function SellFiltersSidebar({
  selectedBrand,
  onSelectBrand,
  selectedRam,
  onToggleRam,
  selectedStorage,
  onToggleStorage,
  selectedNetwork,
  onSelectNetwork,
  priceRange,
  onChangePriceRange,
  onResetFilters,
  totalResults,
  isMobileOpen,
  onCloseMobile,
}) {
  const hasActiveFilters =
    (selectedBrand && selectedBrand !== 'all') ||
    selectedRam.length > 0 ||
    selectedStorage.length > 0 ||
    (selectedNetwork && selectedNetwork !== 'all') ||
    priceRange.min > 0 ||
    priceRange.max < 100000;

  const content = (
    <div className="space-y-6 text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-[#13b59b]" />
          <h3 className="font-extrabold text-base text-slate-900">Filters</h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
            {totalResults}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition cursor-pointer"
          >
            <RotateCcw size={12} /> Clear All
          </button>
        )}
      </div>

      {/* 1. Brands Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Brand</h4>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          <label
            onClick={() => onSelectBrand('all')}
            className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold cursor-pointer transition ${
              !selectedBrand || selectedBrand === 'all'
                ? 'bg-emerald-50 text-[#13b59b] border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <span>All Brands</span>
            {(!selectedBrand || selectedBrand === 'all') && <Check size={14} />}
          </label>

          {POPULAR_BRANDS.map((b) => (
            <label
              key={b.id}
              onClick={() => onSelectBrand(b.slug)}
              className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold cursor-pointer transition ${
                selectedBrand?.toLowerCase() === b.slug.toLowerCase()
                  ? 'bg-emerald-50 text-[#13b59b] border border-emerald-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>{b.name}</span>
              {selectedBrand?.toLowerCase() === b.slug.toLowerCase() && <Check size={14} />}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Network Filter (5G / 4G) */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Network</h4>
        <div className="flex flex-wrap gap-2">
          {NETWORK_OPTIONS.map((net) => (
            <button
              key={net.id}
              onClick={() => onSelectNetwork(net.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedNetwork === net.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {net.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. RAM Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">RAM Capacity</h4>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map((ram) => {
            const isSelected = selectedRam.includes(ram);
            return (
              <button
                key={ram}
                onClick={() => onToggleRam(ram)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  isSelected
                    ? 'bg-[#13b59b] text-white border-[#13b59b] shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {ram}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Storage Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Internal Storage</h4>
        <div className="flex flex-wrap gap-2">
          {STORAGE_OPTIONS.map((stg) => {
            const isSelected = selectedStorage.includes(stg);
            return (
              <button
                key={stg}
                onClick={() => onToggleStorage(stg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  isSelected
                    ? 'bg-[#13b59b] text-white border-[#13b59b] shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {stg}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Price Range Filter */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Resale Value</h4>
          <span className="text-xs font-bold text-[#13b59b]">
            ₹{priceRange.min.toLocaleString('en-IN')} - ₹{priceRange.max.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="2000"
          value={priceRange.max}
          onChange={(e) => onChangePriceRange({ ...priceRange, max: Number(e.target.value) })}
          className="w-full accent-[#13b59b] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
          <span>₹0</span>
          <span>₹50,000</span>
          <span>₹1,00,000+</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-24">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer (Bottom Sheet) */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />
          {/* Sheet */}
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl p-6 overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-end mb-2">
              <button
                onClick={onCloseMobile}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>
            {content}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 bg-[#13b59b] text-white font-bold rounded-xl text-sm shadow-md"
              >
                Apply Filters ({totalResults} Phones)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
