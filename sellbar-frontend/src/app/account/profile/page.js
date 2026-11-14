"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronRight, FiHome, FiUser } from "react-icons/fi";
import { getSession, saveSession, clearSession } from "@/lib/auth";
import UserProfileWidget from "@/components/UserProfileWidget";

export default function CustomerProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          setLoading(false);
          return;
        }
      } catch {
        // ignore
      }

      const s = getSession();
      if (s?.user) {
        setCurrentUser(s.user);
      } else {
        setCurrentUser({
          name: "Sellbar Customer",
          email: "customer@sellbar.in",
          phone: "9876543210",
        });
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const handleSaveProfile = (updatedData) => {
    const existing = getSession() || {};
    const updated = {
      ...(existing.user || {}),
      ...updatedData,
    };
    saveSession({
      ...existing,
      user: updated,
    });
    setCurrentUser(updated);

    // Notify other components (Navbar, Account Dashboard)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("sellbar-user-logged-in"));
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    clearSession();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-3 border-[#13b59b] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pb-2 border-b border-slate-100">
        <Link href="/" className="hover:text-[#13b59b] transition flex items-center gap-1">
          <FiHome /> Home
        </Link>
        <FiChevronRight className="text-slate-400" />
        <Link href="/account" className="hover:text-[#13b59b] transition">
          Account
        </Link>
        <FiChevronRight className="text-slate-400" />
        <span className="text-slate-900 font-bold flex items-center gap-1">
          <FiUser className="text-[#13b59b]" /> User Profile &amp; Settings
        </span>
      </div>

      {/* Main User Profile Component using HeroUI User, React Icons, and Descope Widget */}
      <UserProfileWidget
        user={currentUser}
        onSaveProfile={handleSaveProfile}
        onLogout={handleLogout}
      />
    </div>
  );
}
