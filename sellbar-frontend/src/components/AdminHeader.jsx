"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Plus,
  ExternalLink,
  User,
  LogOut,
  Settings,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { clearPanelSession } from "../lib/panel";

export default function AdminHeader({
  onToggleMobileSidebar,
  session,
  sidebarCollapsed = false,
  onToggleCollapse,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const quickRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (quickRef.current && !quickRef.current.contains(event.target)) {
        setQuickActionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    router.push(`/admin/products?search=${encodeURIComponent(globalSearch.trim())}`);
  };

  const handleLogout = () => {
    clearPanelSession();
    router.replace("/admin/login");
  };

  // Generate breadcrumb items
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <header
      style={{
        height: 64,
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 40,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Left: Mobile Toggle, Desktop Collapse & Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Mobile Hamburger Drawer Toggle */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden"
          style={{
            background: "#f1f5f9",
            border: "1px solid #cbd5e1",
            borderRadius: 8,
            padding: "6px 8px",
            color: "#334155",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Menu size={18} />
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex"
            title={sidebarCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "6px 8px",
              color: "#475569",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#0f172a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f8fafc";
              e.currentTarget.style.color = "#475569";
            }}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>
        )}

        {/* Breadcrumb Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
          <Link
            href="/admin"
            style={{ color: "#64748b", textDecoration: "none", fontWeight: 600 }}
          >
            Admin
          </Link>
          {pathParts.slice(1).map((part, index) => (
            <React.Fragment key={index}>
              <span style={{ color: "#cbd5e1" }}>/</span>
              <span
                style={{
                  color: index === pathParts.length - 2 ? "#DC2564" : "#475569",
                  fontWeight: index === pathParts.length - 2 ? 700 : 500,
                  textTransform: "capitalize",
                }}
              >
                {part.replace(/-/g, " ")}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Center: Global Search */}
      <form
        onSubmit={handleGlobalSearch}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          padding: "6px 12px",
          width: "100%",
          maxWidth: 320,
          margin: "0 16px",
        }}
        className="hidden md:flex"
      >
        <Search size={15} style={{ color: "#94a3b8", marginRight: 8, flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Global search products, orders, customers..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 12,
            width: "100%",
            color: "#1e293b",
          }}
        />
      </form>

      {/* Right: Quick Actions, Website link, Notifications, Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* View Storefront Link */}
        <Link
          href="/"
          target="_blank"
          title="Open Public Website"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "#0f172a",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            padding: "6px 12px",
            borderRadius: 8,
            textDecoration: "none",
          }}
          className="hidden sm:inline-flex"
        >
          <span>Storefront</span>
          <ExternalLink size={13} style={{ color: "#64748b" }} />
        </Link>

        {/* Quick Actions Dropdown */}
        <div style={{ position: "relative" }} ref={quickRef}>
          <button
            type="button"
            onClick={() => setQuickActionOpen(!quickActionOpen)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              background: "#DC2564",
              border: "none",
              padding: "6px 12px",
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(220, 37, 100, 0.2)",
            }}
          >
            <Plus size={14} />
            <span>Create</span>
            <ChevronDown size={12} />
          </button>

          {quickActionOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: 8,
                width: 200,
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                padding: "6px 0",
                zIndex: 50,
              }}
            >
              <Link
                href="/admin/products?action=new"
                onClick={() => setQuickActionOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  fontSize: 13,
                  color: "#1e293b",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                📦 Add New Product
              </Link>
              <Link
                href="/admin/orders?action=new"
                onClick={() => setQuickActionOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  fontSize: 13,
                  color: "#1e293b",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                🧾 Create Manual Order
              </Link>
              <Link
                href="/admin/coupons?action=new"
                onClick={() => setQuickActionOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  fontSize: 13,
                  color: "#1e293b",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                🎟️ Create New Coupon
              </Link>
              <Link
                href="/admin/ai"
                onClick={() => setQuickActionOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  fontSize: 13,
                  color: "#7c3aed",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                ✨ AI Assistant Studio
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Icon & Drawer */}
        <div style={{ position: "relative" }} ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotificationOpen(!notificationOpen)}
            style={{
              position: "relative",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              width: 36,
              height: 36,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#475569",
              cursor: "pointer",
            }}
          >
            <Bell size={17} />
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#DC2564",
              }}
            />
          </button>

          {notificationOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: 8,
                width: 320,
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
                padding: "12px 0",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  padding: "0 16px 8px 16px",
                  borderBottom: "1px solid #f1f5f9",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#0f172a",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Live Admin Alerts</span>
                <span style={{ fontSize: 11, color: "#10b981" }}>Realtime</span>
              </div>
              <div style={{ maxHeight: 260, overflowY: "auto" }}>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #f8fafc", fontSize: 12 }}>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>📦 Low Stock Warning</div>
                  <div style={{ color: "#64748b", marginTop: 2 }}>
                    iPhone 14 (128GB) has only 2 units left in inventory.
                  </div>
                </div>
                <div style={{ padding: "10px 16px", borderBottom: "1px solid #f8fafc", fontSize: 12 }}>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>🛍️ New Order Received</div>
                  <div style={{ color: "#64748b", marginTop: 2 }}>
                    Order #ORD-8492 placed for MacBook Pro M3.
                  </div>
                </div>
                <div style={{ padding: "10px 16px", fontSize: 12 }}>
                  <div style={{ fontWeight: 600, color: "#0f172a" }}>🔒 System Health Green</div>
                  <div style={{ color: "#64748b", marginTop: 2 }}>
                    Database latency 18ms, all services operating normally.
                  </div>
                </div>
              </div>
              <div style={{ padding: "8px 16px 0", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                <Link
                  href="/admin/notifications"
                  onClick={() => setNotificationOpen(false)}
                  style={{ fontSize: 11, color: "#DC2564", fontWeight: 700, textDecoration: "none" }}
                >
                  View All Notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Dropdown */}
        <div style={{ position: "relative" }} ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              padding: "4px 8px 4px 4px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#DC2564",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              SA
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }} className="hidden sm:inline">
              Super Admin
            </span>
            <ChevronDown size={12} style={{ color: "#94a3b8" }} />
          </button>

          {profileOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: 8,
                width: 200,
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                padding: "6px 0",
                zIndex: 50,
              }}
            >
              <div style={{ padding: "8px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                  {session?.name || "Sellbar Admin"}
                </div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  {session?.email || "admin@sellbar.in"}
                </div>
              </div>
              <Link
                href="/admin/users/profile"
                onClick={() => setProfileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  fontSize: 12,
                  color: "#334155",
                  textDecoration: "none",
                }}
              >
                <User size={14} /> Profile &amp; Account
              </Link>
              <Link
                href="/admin/settings"
                onClick={() => setProfileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  fontSize: 12,
                  color: "#334155",
                  textDecoration: "none",
                }}
              >
                <Settings size={14} /> Store Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  fontSize: 12,
                  color: "#dc2626",
                  background: "transparent",
                  border: "none",
                  borderTop: "1px solid #f1f5f9",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: 600,
                }}
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
