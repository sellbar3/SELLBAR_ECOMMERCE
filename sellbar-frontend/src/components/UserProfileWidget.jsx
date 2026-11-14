"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// React Icons
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiEdit3,
  FiLogOut,
  FiCheckCircle,
  FiCalendar,
  FiSmartphone,
  FiPackage,
  FiCreditCard,
  FiAward,
  FiSettings,
  FiKey,
  FiExternalLink,
} from "react-icons/fi";
import {
  FaGoogle,
  FaShieldAlt,
  FaRegCheckCircle,
  FaUserCheck,
} from "react-icons/fa";
import {
  MdOutlineVerified,
  MdOutlineSecurity,
  MdQrCodeScanner,
} from "react-icons/md";
import { RiShieldUserLine, RiUserSettingsLine } from "react-icons/ri";

// HeroUI User Component (with safe fallback if rendered on server)
let HeroUser = null;
try {
  const heroui = require("@heroui/user");
  HeroUser = heroui.User || heroui.default;
} catch {
  // Graceful fallback to custom styled user badge
  HeroUser = null;
}

export default function UserProfileWidget({
  user,
  onSaveProfile,
  onLogout,
  descopeProjectId = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || "",
}) {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "security" | "descope"
  const [mounted, setMounted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Sellbar Customer",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "Verified Sellbar Recommerce Member",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [descopeIdInput, setDescopeIdInput] = useState(descopeProjectId);

  useEffect(() => {
    setMounted(true);
    // Dynamically register Descope web component on client
    if (typeof window !== "undefined") {
      import("@descope/user-profile-widget").catch((err) => {
        console.warn("Descope widget script load:", err?.message);
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "Sellbar Customer",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "Verified Sellbar Recommerce Member",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveProfile) {
      onSaveProfile(formData);
    }
    setSaveSuccess(true);
    setEditMode(false);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const userInitials = (formData.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      {/* 1. Header Banner & HeroUI User Badge */}
      <div className="bg-gradient-to-r from-emerald-600 via-[#13b59b] to-teal-500 p-6 sm:p-8 text-white relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            {/* Avatar using HeroUI or custom gradient ring */}
            {HeroUser ? (
              <div className="bg-white/10 p-1.5 rounded-2xl backdrop-blur-sm">
                <HeroUser
                  name={
                    <span className="text-white font-black text-lg flex items-center gap-1.5">
                      {formData.name}
                      <MdOutlineVerified className="text-emerald-200 text-lg shrink-0 inline" />
                    </span>
                  }
                  description={
                    <span className="text-emerald-100 text-xs font-medium flex items-center gap-2">
                      <FaRegCheckCircle className="text-xs shrink-0" />
                      {formData.email || formData.phone || "Sellbar Verified Account"}
                    </span>
                  }
                  avatarProps={{
                    name: userInitials,
                    className:
                      "w-16 h-16 text-lg font-black bg-white text-[#13b59b] ring-4 ring-white/30 rounded-2xl shadow-md",
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white text-[#13b59b] flex items-center justify-center text-xl font-black shadow-md ring-4 ring-white/30">
                  {userInitials}
                </div>
                <div>
                  <h2 className="text-xl font-black flex items-center gap-1.5">
                    {formData.name}
                    <MdOutlineVerified className="text-emerald-200" />
                  </h2>
                  <p className="text-xs text-emerald-100 font-medium">
                    {formData.email || formData.phone || "Sellbar Verified Account"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition backdrop-blur-xs cursor-pointer"
            >
              <FiEdit3 className="text-sm" />
              <span>{editMode ? "Cancel Editing" : "Edit Profile"}</span>
            </button>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                <FiLogOut className="text-sm" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Badges row */}
        <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center gap-3 text-xs text-emerald-100">
          <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full">
            <FaShieldAlt className="text-emerald-200" /> 256-bit Secure
          </span>
          <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full">
            <FiAward className="text-emerald-200" /> 12-Month Warranty Protection
          </span>
          <span className="flex items-center gap-1.5 bg-black/15 px-3 py-1 rounded-full">
            <MdOutlineSecurity className="text-emerald-200" /> Doorstep Verified
          </span>
        </div>
      </div>

      {/* 2. Navigation Tabs with React Icons */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
            activeTab === "overview"
              ? "border-[#13b59b] text-[#13b59b]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <FiUser className="text-sm" />
          <span>Profile Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
            activeTab === "security"
              ? "border-[#13b59b] text-[#13b59b]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <MdOutlineSecurity className="text-base" />
          <span>Security &amp; Logins</span>
        </button>

        <button
          onClick={() => setActiveTab("descope")}
          className={`py-3.5 px-3 flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
            activeTab === "descope"
              ? "border-[#13b59b] text-[#13b59b]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <RiShieldUserLine className="text-base" />
          <span>Descope Profile Widget</span>
          <span className="text-[10px] bg-emerald-100 text-[#13b59b] px-1.5 py-0.5 rounded font-black">
            SDK
          </span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="p-6 sm:p-8">
        {saveSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in duration-200">
            <FiCheckCircle className="text-base text-[#13b59b] shrink-0" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW & PROFILE FORM */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <FiUser className="text-[#13b59b]" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <FiMail className="text-[#13b59b]" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#13b59b]"
                    placeholder="user@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <FiPhone className="text-[#13b59b]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#13b59b]"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <FiEdit3 className="text-[#13b59b]" /> Bio / Headline
                  </label>
                  <textarea
                    rows={2}
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#13b59b]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiUser className="text-[#13b59b]" /> Full Name
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {formData.name}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiMail className="text-[#13b59b]" /> Email Address
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {formData.email || "No email linked"}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiPhone className="text-[#13b59b]" /> Registered Mobile
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {formData.phone ? `+91 ${formData.phone.replace("+91", "")}` : "No phone added"}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiAward className="text-[#13b59b]" /> Account Status
                  </span>
                  <p className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                    <FaUserCheck className="text-xs" /> Active Recommerce Customer
                  </p>
                </div>
              </div>
            )}

            {/* Quick Shortcuts */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                Quick Shortcuts
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  href="/account/orders"
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-[#13b59b] transition flex items-center gap-2.5 text-xs font-bold text-slate-800 shadow-2xs"
                >
                  <FiPackage className="text-[#13b59b]" />
                  <span>Your Orders</span>
                </Link>

                <Link
                  href="/account/sell-orders"
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-[#13b59b] transition flex items-center gap-2.5 text-xs font-bold text-slate-800 shadow-2xs"
                >
                  <FiSmartphone className="text-[#13b59b]" />
                  <span>Sell Requests</span>
                </Link>

                <Link
                  href="/account/payouts"
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-[#13b59b] transition flex items-center gap-2.5 text-xs font-bold text-slate-800 shadow-2xs"
                >
                  <FiCreditCard className="text-[#13b59b]" />
                  <span>UPI / Bank</span>
                </Link>

                <Link
                  href="/account/warranty"
                  className="p-3 bg-white border border-slate-200 rounded-xl hover:border-[#13b59b] transition flex items-center gap-2.5 text-xs font-bold text-slate-800 shadow-2xs"
                >
                  <FiAward className="text-[#13b59b]" />
                  <span>Warranty</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & CONNECTED LOGINS */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#13b59b] flex items-center justify-center text-lg">
                    <FaGoogle className="text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">
                      Google Authentication
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Sign in seamlessly with your Google Account across all devices.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-[#13b59b] text-[10px] font-bold rounded-full">
                  Enabled
                </span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                    <FiPhone className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">
                      Mobile OTP Verification
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Instant 4-digit SMS OTP verification for password-free login.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-[#13b59b] text-[10px] font-bold rounded-full">
                  Active
                </span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                    <FiKey className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">
                      256-Bit Encrypted Session
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Active cryptographic token stored safely with 30-day auto-refresh.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full font-mono">
                  HMAC-SHA256
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DESCOPE USER PROFILE WIDGET */}
        {activeTab === "descope" && (
          <div className="space-y-6">
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-teal-900">
                <RiShieldUserLine className="text-base text-[#13b59b]" />
                <span>Descope User Profile Widget Integration</span>
              </div>
              <p className="text-teal-700 leading-relaxed">
                This widget renders the official{" "}
                <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px]">
                  @descope/user-profile-widget
                </code>{" "}
                allowing end-users to manage Passkeys, MFA, biometrics, and SSO identities natively.
              </p>
            </div>

            {/* Project ID Config Box */}
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Descope Project ID
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={descopeIdInput}
                  onChange={(e) => setDescopeIdInput(e.target.value)}
                  placeholder="e.g. P2XXXXXXXXXXXXXXXXXXXXXXXXXX"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#13b59b]"
                />
                <button
                  type="button"
                  onClick={() => alert(`Descope Project ID set to: ${descopeIdInput || "None"}`)}
                  className="px-4 py-2 bg-[#13b59b] hover:bg-[#0fa088] text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Save ID
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Tip: Set{" "}
                <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">
                  NEXT_PUBLIC_DESCOPE_PROJECT_ID
                </code>{" "}
                in your environment variables or Hostinger panel for automated setup.
              </p>
            </div>

            {/* Widget Container */}
            {mounted && descopeIdInput ? (
              <div className="border border-slate-200 rounded-2xl p-6 bg-white min-h-[300px]">
                {/* Custom Web Component from @descope/user-profile-widget */}
                <descope-user-profile-widget
                  project-id={descopeIdInput}
                  widget-id="user-profile-widget"
                  theme="light"
                ></descope-user-profile-widget>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-3 bg-slate-50">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-[#13b59b] shadow-2xs">
                  <RiShieldUserLine className="text-2xl" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  Descope Project ID Not Set
                </h4>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Enter your Descope Project ID above to render the live Passkeys &amp; MFA self-service widget directly.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
