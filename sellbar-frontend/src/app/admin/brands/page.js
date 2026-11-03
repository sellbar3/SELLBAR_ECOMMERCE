'use client';

import React, { useState } from 'react';
import PanelShell from '@/components/PanelShell';
import {
  Tag,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';
import { SELL_BRANDS } from '@/lib/sellMobileData';

const INITIAL_BRANDS = [
  { id: 'b-apple', name: 'Apple', slug: 'apple', tier: 'Flagship', activeInSell: true, activeInShop: true, modelsCount: 28, logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-samsung', name: 'Samsung', slug: 'samsung', tier: 'Flagship', activeInSell: true, activeInShop: true, modelsCount: 42, logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-oneplus', name: 'OnePlus', slug: 'oneplus', tier: 'Premium', activeInSell: true, activeInShop: true, modelsCount: 19, logo: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-xiaomi', name: 'Xiaomi', slug: 'xiaomi', tier: 'Budget / Midrange', activeInSell: true, activeInShop: true, modelsCount: 35, logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-vivo', name: 'Vivo', slug: 'vivo', tier: 'Midrange', activeInSell: true, activeInShop: true, modelsCount: 22, logo: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-oppo', name: 'Oppo', slug: 'oppo', tier: 'Midrange', activeInSell: true, activeInShop: true, modelsCount: 20, logo: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-realme', name: 'Realme', slug: 'realme', tier: 'Budget', activeInSell: true, activeInShop: true, modelsCount: 25, logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-google', name: 'Google Pixel', slug: 'google-pixel', tier: 'Flagship', activeInSell: true, activeInShop: true, modelsCount: 12, logo: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-motorola', name: 'Motorola', slug: 'motorola', tier: 'Budget / Midrange', activeInSell: true, activeInShop: true, modelsCount: 16, logo: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=100&auto=format&fit=crop&q=80' },
  { id: 'b-nothing', name: 'Nothing', slug: 'nothing', tier: 'Premium', activeInSell: true, activeInShop: true, modelsCount: 4, logo: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&auto=format&fit=crop&q=80' },
];

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    tier: 'Premium',
    activeInSell: true,
    activeInShop: true,
    modelsCount: 0,
  });

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.tier.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id, field) => {
    setBrands(brands.map((b) => (b.id === id ? { ...b, [field]: !b[field] } : b)));
  };

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setForm({
      name: '',
      slug: '',
      tier: 'Premium',
      activeInSell: true,
      activeInShop: true,
      modelsCount: 0,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (brand) => {
    setEditingBrand(brand.id);
    setForm({ ...brand });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      setBrands(brands.filter((b) => b.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const generatedSlug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingBrand) {
      setBrands(brands.map((b) => (b.id === editingBrand ? { ...form, slug: generatedSlug, id: editingBrand } : b)));
    } else {
      setBrands([
        ...brands,
        {
          ...form,
          id: `b-${Date.now()}`,
          slug: generatedSlug,
        },
      ]);
    }
    setShowModal(false);
  };

  return (
    <PanelShell role="admin" title="BRANDS MANAGEMENT - Admin Portal">
      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Tag className="text-[#13b59b]" size={24} /> Brand Directory &amp; Channels
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure brand visibility across Sell Old Mobile portal, Refurbished Shop, and device catalog counts.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
          >
            <Plus size={16} /> Add New Brand
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Total Brands Listed</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{brands.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Active in Sell Old Mobile</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {brands.filter((b) => b.activeInSell).length}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Total Supported Models</span>
            <div className="text-2xl font-black text-[#13b59b] mt-1">
              {brands.reduce((acc, b) => acc + (b.modelsCount || 0), 0)}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search brands by name or tier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredBrands.length} of {brands.length} brands
          </span>
        </div>

        {/* Brands Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Category Tier</th>
                  <th className="py-3 px-4">Supported Models</th>
                  <th className="py-3 px-4">Sell Old Mobile Portal</th>
                  <th className="py-3 px-4">Refurbished Shop</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-200">
                          {brand.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{brand.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">/{brand.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        {brand.tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {brand.modelsCount} devices
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(brand.id, 'activeInSell')}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition ${
                          brand.activeInSell
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {brand.activeInSell ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        <span>{brand.activeInSell ? 'Active' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(brand.id, 'activeInShop')}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition ${
                          brand.activeInShop
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {brand.activeInShop ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        <span>{brand.activeInShop ? 'Active' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(brand)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-black text-slate-900 mb-1">
              {editingBrand ? 'Edit Brand' : 'Add New Brand'}
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Set brand name, catalog category tier, and device visibility rules.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Motorola"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. motorola"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tier / Class</label>
                <select
                  value={form.tier}
                  onChange={(e) => setForm({ ...form, tier: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                >
                  <option value="Flagship">Flagship</option>
                  <option value="Premium">Premium</option>
                  <option value="Midrange">Midrange</option>
                  <option value="Budget / Midrange">Budget / Midrange</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>

              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.activeInSell}
                    onChange={(e) => setForm({ ...form, activeInSell: e.target.checked })}
                    className="rounded text-[#13b59b] focus:ring-[#13b59b]"
                  />
                  <span className="text-xs font-bold text-slate-700">Enable in Sell Old Mobile portal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.activeInShop}
                    onChange={(e) => setForm({ ...form, activeInShop: e.target.checked })}
                    className="rounded text-[#13b59b] focus:ring-[#13b59b]"
                  />
                  <span className="text-xs font-bold text-slate-700">Enable in Refurbished Shop</span>
                </label>
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
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PanelShell>
  );
}
