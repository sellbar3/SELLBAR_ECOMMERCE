'use client';

import React, { useState } from 'react';
import PanelShell from '@/components/PanelShell';
import {
  Smartphone,
  Search,
  Plus,
  Edit2,
  Trash2,
  DollarSign,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  X,
  TrendingUp,
  Tag
} from 'lucide-react';
import { MOBILE_MODELS } from '@/lib/sellMobileData';

export default function AdminSellModelsPage() {
  const [models, setModels] = useState(MOBILE_MODELS);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingModel, setEditingModel] = useState(null);

  const [form, setForm] = useState({
    name: '',
    brand: 'Apple',
    brandSlug: 'apple',
    basePrice: 20000,
    releaseYear: 2024,
    storageOptions: '128GB, 256GB, 512GB',
    image: '',
  });

  const brands = ['All', ...Array.from(new Set(models.map((m) => m.brand)))];

  const filteredModels = models.filter((m) => {
    const matchesBrand = brandFilter === 'All' || m.brand === brandFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.brand.toLowerCase().includes(search.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingModel(null);
    setForm({
      name: '',
      brand: 'Apple',
      brandSlug: 'apple',
      basePrice: 20000,
      releaseYear: 2024,
      storageOptions: '128GB, 256GB, 512GB',
      image: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (model) => {
    setEditingModel(model.id);
    setForm({
      name: model.name,
      brand: model.brand,
      brandSlug: model.brandSlug,
      basePrice: model.basePrice,
      releaseYear: model.releaseYear,
      storageOptions: Array.isArray(model.storageOptions) ? model.storageOptions.join(', ') : '128GB, 256GB',
      image: model.image || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this model from the sell catalog?')) {
      setModels(models.filter((m) => m.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.basePrice) return;

    const storages = form.storageOptions.split(',').map((s) => s.trim()).filter(Boolean);
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingModel) {
      setModels(
        models.map((m) =>
          m.id === editingModel
            ? {
                ...m,
                ...form,
                storageOptions: storages,
                basePrice: Number(form.basePrice),
                releaseYear: Number(form.releaseYear),
              }
            : m
        )
      );
    } else {
      setModels([
        ...models,
        {
          id: `mod-${Date.now()}`,
          slug,
          name: form.name,
          brand: form.brand,
          brandSlug: form.brand.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          basePrice: Number(form.basePrice),
          releaseYear: Number(form.releaseYear),
          storageOptions: storages,
          image: form.image || 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&auto=format&fit=crop&q=80',
        },
      ]);
    }
    setShowModal(false);
  };

  return (
    <PanelShell role="admin" title="SELL OLD MOBILES CATALOG - Admin Portal">
      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Smartphone className="text-[#13b59b]" size={24} /> Smartphone Resale Models &amp; Base Prices
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure supported mobile models, max buyback valuations, and available storage variant multipliers.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
          >
            <Plus size={16} /> Add Mobile Model
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Active Mobile Models</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{models.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Avg Base Resale Value</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              ₹{Math.round(models.reduce((a, b) => a + b.basePrice, 0) / (models.length || 1)).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Highest Valued Model</span>
            <div className="text-xl font-black text-slate-900 mt-1 truncate">
              iPhone 15 Pro Max
            </div>
            <div className="text-[11px] text-[#13b59b] font-bold">₹58,000 Base</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Supported Brands</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{brands.length - 1}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by model name or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setBrandFilter(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  brandFilter === b
                    ? 'bg-[#13b59b] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Models Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Smartphone Model</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Launch Year</th>
                  <th className="py-3 px-4">Storage Variants</th>
                  <th className="py-3 px-4">Max Base Valuation</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredModels.map((model) => (
                  <tr key={model.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center p-1 border border-slate-200 shrink-0">
                          {model.image ? (
                            <img src={model.image} alt={model.name} className="h-full w-auto object-contain" />
                          ) : (
                            <Smartphone size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{model.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">/{model.brandSlug}/{model.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {model.brand}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-semibold">
                      {model.releaseYear}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {model.storageOptions?.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-[10px] rounded text-slate-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-black text-slate-900 text-sm">
                        ₹{model.basePrice?.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(model)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(model.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-black text-slate-900 mb-1">
              {editingModel ? 'Edit Mobile Model' : 'Add Mobile Model'}
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Set device specifications, base cash valuation, and storage options.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Apple iPhone 15 Pro"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand *</label>
                  <select
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Realme">Realme</option>
                    <option value="Google">Google</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Base Valuation (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.basePrice}
                    onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                    placeholder="25000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Release Year</label>
                  <input
                    type="number"
                    value={form.releaseYear}
                    onChange={(e) => setForm({ ...form, releaseYear: e.target.value })}
                    placeholder="2023"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Storage Variants (comma separated)</label>
                <input
                  type="text"
                  value={form.storageOptions}
                  onChange={(e) => setForm({ ...form, storageOptions: e.target.value })}
                  placeholder="128GB, 256GB, 512GB"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Save Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PanelShell>
  );
}
