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
  Volume2,
  VolumeX,
  Smartphone,
  ShoppingBag,
  X,
  CheckCircle,
} from "lucide-react";
import { clearPanelSession } from "../lib/panel";
import {
  registerServiceWorker,
  requestPushPermission,
  sendLocalPushNotification,
} from "../lib/pushNotifications";

// Synthesizes a crisp, crystal-clear 2-tone audio chime bell (No external MP3 required)
function playAdminAudioChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // High strike tone (880 Hz - A5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.08);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.65);

    // Harmonic bell chime (1318.5 Hz - E6)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1318.51, now + 0.05);
    gain2.gain.setValueAtTime(0.4, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.95);
  } catch (err) {
    console.warn("Audio chime play error:", err);
  }
}

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

  // Audio Notification System for Admin
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pushPermission, setPushPermission] = useState("default");
  const [liveToast, setLiveToast] = useState(null);
  const [unreadCount, setUnreadCount] = useState(3);
  const lastPollRef = useRef(Date.now());

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const quickRef = useRef(null);

  // Load sound & push notification registration
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sellbar_admin_sound_enabled");
      if (saved !== null) setSoundEnabled(saved === "true");
    } catch {}

    registerServiceWorker();
    if (typeof window !== "undefined" && "Notification" in window) {
      setPushPermission(Notification.permission);
    }
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sellbar_admin_sound_enabled", String(next));
      } catch {}
      if (next) playAdminAudioChime();
      return next;
    });
  };

  const togglePushPermission = async () => {
    const res = await requestPushPermission();
    setPushPermission(res);
    if (res === "granted") {
      sendLocalPushNotification({
        title: "🔔 Mobile Push Notifications Active!",
        body: "Aapko naye orders aur device trade-in requests ke real-time pop-ups milte rahenge.",
        url: "/admin/orders",
      });
    }
  };

  // Real-time Order Monitoring: Polls for new Sell Orders & Purchase Orders every 7 seconds
  useEffect(() => {
    let active = true;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/admin/live-alerts?since=${lastPollRef.current}`, {
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        if (!active || !json?.success || !json?.data) return;

        const { hasNew, purchaseOrders = [], sellOrders = [], serverTime } = json.data;
        if (serverTime) lastPollRef.current = serverTime;

        if (hasNew) {
          if (soundEnabled) {
            playAdminAudioChime();
          }

          if (purchaseOrders.length > 0) {
            const first = purchaseOrders[0];
            setLiveToast({
              id: first.id,
              type: "purchase",
              title: `🛍️ New Purchase Order ${first.orderNumber}`,
              subtitle: `₹${Number(first.total).toLocaleString("en-IN")} • ${first.customer}`,
              link: "/admin/orders",
            });
            setUnreadCount((c) => c + purchaseOrders.length);

            // Native Mobile & Desktop Web Push Notification
            sendLocalPushNotification({
              title: `🛍️ New Order: ${first.orderNumber}`,
              body: `Total: ₹${Number(first.total).toLocaleString("en-IN")} • ${first.customer} • ${first.itemsCount} item(s)`,
              url: "/admin/orders",
            });
          } else if (sellOrders.length > 0) {
            const first = sellOrders[0];
            setLiveToast({
              id: first.id,
              type: "sell",
              title: `📱 New Sell Old Phone Request`,
              subtitle: `${first.device} • ₹${Number(first.estimatedPrice).toLocaleString("en-IN")} (${first.city})`,
              link: "/admin/sell-orders",
            });
            setUnreadCount((c) => c + sellOrders.length);

            // Native Mobile & Desktop Web Push Notification
            sendLocalPushNotification({
              title: `📱 Nayi Sell Request: ${first.orderNumber}`,
              body: `${first.device} • ₹${Number(first.estimatedPrice).toLocaleString("en-IN")} • ${first.customer}`,
              url: "/admin/sell-orders",
            });
          }
        }
      } catch (err) {
        // silent fallback
      }
    }, 7000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [soundEnabled]);

  // Auto-dismiss live toast after 6 seconds
  useEffect(() => {
    if (!liveToast) return;
    const timer = setTimeout(() => setLiveToast(null), 6000);
    return () => clearTimeout(timer);
  }, [liveToast]);

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
            className="hidden lg:flex items-center gap-1.5"
            title={sidebarCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            style={{
              background: sidebarCollapsed ? "#DC2564" : "#f1f5f9",
              border: sidebarCollapsed ? "1px solid #DC2564" : "1px solid #cbd5e1",
              borderRadius: 8,
              padding: "6px 10px",
              color: sidebarCollapsed ? "#ffffff" : "#334155",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!sidebarCollapsed) {
                e.currentTarget.style.background = "#e2e8f0";
                e.currentTarget.style.color = "#0f172a";
              }
            }}
            onMouseLeave={(e) => {
              if (!sidebarCollapsed) {
                e.currentTarget.style.background = "#f1f5f9";
                e.currentTarget.style.color = "#334155";
              }
            }}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            <span>{sidebarCollapsed ? "Expand" : "Collapse"}</span>
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
        suppressHydrationWarning
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
          suppressHydrationWarning
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

        {/* Audio Alert Bell Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          title={soundEnabled ? "Audio Bell Alert is Active (Click to mute)" : "Audio Bell Alert is Muted (Click to enable)"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            padding: "6px 10px",
            borderRadius: 8,
            cursor: "pointer",
            background: soundEnabled ? "#ecfdf5" : "#f1f5f9",
            border: soundEnabled ? "1px solid #10b981" : "1px solid #cbd5e1",
            color: soundEnabled ? "#047857" : "#64748b",
            transition: "all 0.15s ease",
          }}
        >
          {soundEnabled ? <Volume2 size={14} className="text-emerald-600 animate-pulse" /> : <VolumeX size={14} />}
          <span className="hidden md:inline">{soundEnabled ? "Sound ON" : "Muted"}</span>
        </button>

        {/* Real-Time Mobile & Desktop Web Push Notification Button */}
        <button
          type="button"
          onClick={togglePushPermission}
          title={pushPermission === "granted" ? "Push Notifications Active on this device" : "Click to enable Mobile Pop-Up Notifications on new orders"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            padding: "6px 10px",
            borderRadius: 8,
            cursor: "pointer",
            background: pushPermission === "granted" ? "#f0fdf4" : "#eff6ff",
            border: pushPermission === "granted" ? "1px solid #22c55e" : "1px solid #3b82f6",
            color: pushPermission === "granted" ? "#15803d" : "#1d4ed8",
            transition: "all 0.15s ease",
          }}
        >
          <Bell size={13} className={pushPermission === "granted" ? "text-emerald-600" : "animate-bounce text-blue-600"} />
          <span className="hidden sm:inline">
            {pushPermission === "granted" ? "Push Active" : "Enable Push"}
          </span>
        </button>

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
                  alignItems: "center",
                }}
              >
                <span>Live Admin Alerts</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => playAdminAudioChime()}
                    title="Play test audio chime"
                    style={{
                      fontSize: 10,
                      color: "#059669",
                      fontWeight: 700,
                      background: "#ecfdf5",
                      border: "1px solid #a7f3d0",
                      borderRadius: 6,
                      padding: "2px 8px",
                      cursor: "pointer",
                    }}
                  >
                    🔔 Test Sound
                  </button>
                  <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>Realtime</span>
                </div>
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

      {/* Real-time Order Audio Notification Toast */}
      {liveToast && (
        <div
          style={{
            position: "fixed",
            top: 76,
            right: 20,
            zIndex: 9999,
            background: "#ffffff",
            border: "2px solid #DC2564",
            borderRadius: 12,
            boxShadow: "0 12px 30px rgba(220, 37, 100, 0.25)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            maxWidth: 400,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "#DC2564",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {liveToast.type === "sell" ? <Smartphone size={18} /> : <ShoppingBag size={18} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#0f172a" }}>
              {liveToast.title}
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {liveToast.subtitle}
            </div>
          </div>
          <Link
            href={liveToast.link}
            onClick={() => setLiveToast(null)}
            style={{
              fontSize: 11,
              fontWeight: 800,
              background: "#DC2564",
              color: "#ffffff",
              padding: "6px 12px",
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View
          </Link>
          <button
            type="button"
            onClick={() => setLiveToast(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              padding: 2,
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </header>
  );
}
