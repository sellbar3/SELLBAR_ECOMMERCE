'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  ChevronRight, 
  Home, 
  Briefcase, 
  Building2,
  ShieldCheck,
  X
} from 'lucide-react';
import { getSession } from '@/lib/auth';

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    tag: 'Home',
    name: 'Aman Verma',
    phone: '+91 98765 43210',
    addressLine: 'House #14, Near Supriya Cinema Road, Lal Bazar',
    landmark: 'Opposite City Center',
    city: 'Bettiah',
    state: 'Bihar',
    pincode: '845438',
    isDefault: true,
  },
  {
    id: 'addr-2',
    tag: 'Work',
    name: 'Aman Verma (Office)',
    phone: '+91 98765 43210',
    addressLine: 'Plot 42, Commercial Complex, Station Road',
    landmark: 'Near Naraipur Chowk',
    city: 'Bagaha',
    state: 'Bihar',
    pincode: '845101',
    isDefault: false,
  }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  const [form, setForm] = useState({
    tag: 'Home',
    name: '',
    phone: '',
    addressLine: '',
    landmark: '',
    city: 'Bettiah',
    state: 'Bihar',
    pincode: '845438',
    isDefault: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sellbar_user_addresses');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed);
          return;
        }
      }
      const s = getSession();
      if (s?.user?.name) {
        const custom = INITIAL_ADDRESSES.map((a) => ({ ...a, name: s.user.name, phone: s.user.phone || a.phone }));
        setAddresses(custom);
        localStorage.setItem('sellbar_user_addresses', JSON.stringify(custom));
      }
    } catch {
      // fallback
    }
  }, []);

  const saveToStorage = (list) => {
    setAddresses(list);
    try {
      localStorage.setItem('sellbar_user_addresses', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({
      tag: 'Home',
      name: '',
      phone: '',
      addressLine: '',
      landmark: '',
      city: 'Bettiah',
      state: 'Bihar',
      pincode: '845438',
      isDefault: addresses.length === 0,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingId(addr.id);
    setForm({ ...addr });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this address?')) {
      const updated = addresses.filter((a) => a.id !== id);
      saveToStorage(updated);
      setAlertMsg('Address removed successfully');
      setTimeout(() => setAlertMsg(null), 3000);
    }
  };

  const handleSetDefault = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveToStorage(updated);
    setAlertMsg('Default delivery address updated');
    setTimeout(() => setAlertMsg(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.addressLine || !form.pincode) {
      alert('Please fill out all required fields.');
      return;
    }

    let updated = [...addresses];
    if (editingId) {
      updated = updated.map((item) => (item.id === editingId ? { ...form, id: editingId } : item));
    } else {
      const newAddr = {
        ...form,
        id: `addr-${Date.now()}`,
        isDefault: form.isDefault || addresses.length === 0,
      };
      if (newAddr.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      updated.push(newAddr);
    }

    if (form.isDefault) {
      updated = updated.map((a) => (a.id === (editingId || form.id) ? { ...a, isDefault: true } : { ...a, isDefault: false }));
    }

    saveToStorage(updated);
    setShowModal(false);
    setAlertMsg(editingId ? 'Address updated successfully!' : 'New address added successfully!');
    setTimeout(() => setAlertMsg(null), 3500);
  };

  const getTagIcon = (tag) => {
    if (tag === 'Home') return <Home size={16} className="text-teal-600" />;
    if (tag === 'Work') return <Briefcase size={16} className="text-blue-600" />;
    return <Building2 size={16} className="text-amber-600" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/account" className="hover:text-[#13b59b] transition">Account</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">Saved Addresses</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#13b59b] flex items-center justify-center">
                <MapPin size={22} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Delivery &amp; Pickup Addresses
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your saved shipping addresses for express courier delivery and doorstep old mobile evaluation.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
          >
            <Plus size={16} /> Add New Address
          </button>
        </div>

        {alertMsg && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
            <CheckCircle2 size={16} className="text-[#13b59b]" />
            <span>{alertMsg}</span>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 rounded-2xl border transition-all ${
                addr.isDefault 
                  ? 'bg-white border-[#13b59b]/50 shadow-md ring-1 ring-[#13b59b]/20' 
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-100">
                    {getTagIcon(addr.tag)}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    {addr.tag}
                  </span>
                  {addr.isDefault && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#13b59b] border border-emerald-200">
                      Default Address
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-xs font-bold text-slate-500 hover:text-[#13b59b] px-2.5 py-1 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    title="Edit"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="pt-3 text-xs sm:text-sm text-slate-700 space-y-1">
                <div className="font-bold text-slate-900 text-sm">{addr.name}</div>
                <div className="text-slate-600">{addr.addressLine}</div>
                {addr.landmark && <div className="text-slate-500 text-xs">Landmark: {addr.landmark}</div>}
                <div className="text-slate-800 font-semibold">
                  {addr.city}, {addr.state} - <span className="font-mono text-slate-900">{addr.pincode}</span>
                </div>
                <div className="text-slate-500 pt-1 text-xs font-medium">
                  Contact Phone: <span className="text-slate-900 font-bold">{addr.phone}</span>
                </div>
              </div>
            </div>
          ))}

          {addresses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <MapPin size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">No saved addresses found</p>
              <p className="text-xs text-slate-400 mt-1">Add your shipping address for quicker checkouts.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-black text-slate-900 mb-1">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Enter your residential or business address details for doorstep logistics.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 mb-2">
                {['Home', 'Work', 'Other'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, tag: t })}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${
                      form.tag === t 
                        ? 'bg-[#13b59b] text-white border-[#13b59b]' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                    placeholder="Recipient's Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Flat / House No. / Street / Area *</label>
                <textarea
                  required
                  rows={2}
                  value={form.addressLine}
                  onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  placeholder="e.g. House No. 24, Near City Hospital"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                    placeholder="845438"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                    placeholder="Bettiah"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                    placeholder="Bihar"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  value={form.landmark}
                  onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#13b59b]"
                  placeholder="Near School, Water Tank, etc."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="rounded text-[#13b59b] focus:ring-[#13b59b]"
                />
                <label htmlFor="defaultAddress" className="text-xs font-medium text-slate-700 cursor-pointer">
                  Make this my default shipping &amp; doorstep pickup address
                </label>
              </div>

              <div className="pt-3 flex gap-3">
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
                  {editingId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
