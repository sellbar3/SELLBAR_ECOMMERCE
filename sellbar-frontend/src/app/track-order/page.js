"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Search, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleTrack(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus({
        orderNumber: orderId.toUpperCase(),
        date: "Today",
        currentStatus: "In Transit",
        estimatedDelivery: "Tomorrow by 6:00 PM",
        carrier: "Sellbar Express Logistics",
        steps: [
          { title: "Order Verified & 32-Point Quality Lab Passed", date: "Completed", done: true },
          { title: "Dispatched from Central Warehouse", date: "Completed", done: true },
          { title: "Out for Doorstep Delivery", date: "In Progress", done: false, active: true },
          { title: "Delivered & Warranty Activated", date: "Pending", done: false },
        ],
      });
    }, 800);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2bbda3] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Track Order</span>
        </nav>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#2bbda3] flex items-center justify-center mx-auto mb-2">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Track Your Order Status</h1>
          <p className="text-gray-500 text-sm">
            Enter your Order ID (from SMS/email) and registered mobile number to check real-time courier updates.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white p-7 sm:p-9 rounded-2xl border border-gray-100 shadow-xs">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Order ID / Tracking # *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SB-89241"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2bbda3] focus:ring-1 focus:ring-[#2bbda3] outline-none text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            >
              {loading ? "Searching..." : <>Check Status <Search className="w-4 h-4" /></>}
            </button>
          </form>
        </div>

        {/* Tracking Result */}
        {status && (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold">Order Reference</span>
                <h3 className="text-xl font-extrabold text-gray-900">{status.orderNumber}</h3>
              </div>
              <div className="sm:text-right">
                <span className="text-xs text-gray-500 uppercase font-semibold">Estimated Delivery</span>
                <p className="text-sm font-bold text-[#2bbda3]">{status.estimatedDelivery}</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-6 pt-2">
              {status.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      step.done
                        ? "bg-[#2bbda3] text-white"
                        : step.active
                        ? "bg-[#2bbda3]/20 text-[#2bbda3] border-2 border-[#2bbda3]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${step.active || step.done ? "text-gray-900" : "text-gray-400"}`}>
                      {step.title}
                    </h4>
                    <span className="text-xs text-gray-400">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
