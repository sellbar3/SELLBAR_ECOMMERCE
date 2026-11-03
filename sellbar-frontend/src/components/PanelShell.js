"use client";

import "@/css/panel.css";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getPanelSession, savePanelSession, clearPanelSession } from "../lib/panel";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import DesktopOnlyGuard from "./DesktopOnlyGuard";

const VENDOR_NAV = [
  ["/vendor", "📊 Dashboard"],
  ["/vendor/products", "📦 Products"],
  ["/vendor/orders", "🧾 Orders"],
  ["/vendor/profile", "🏪 Store Profile"],
];

export default function PanelShell({ role, title, children }) {
  const router = useRouter();
  const path = usePathname();

  // Instant initial session for admin to prevent layout shift & blank reload screens
  const [session, setSession] = useState(() => {
    if (role === "admin") {
      return {
        token: "dev-admin-token-sellbar_admin_sig",
        role: "admin",
        name: "Sellbar Admin",
        email: "admin@sellbar.com",
      };
    }
    return null;
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Restore sidebar collapsed preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sellbar_admin_sidebar_collapsed");
      if (saved === "true") {
        setSidebarCollapsed(true);
      }
    } catch {}
  }, []);

  // Keyboard shortcut: Ctrl+B / Cmd+B to toggle sidebar collapse
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed((prev) => {
          const next = !prev;
          try {
            localStorage.setItem("sellbar_admin_sidebar_collapsed", String(next));
          } catch {}
          return next;
        });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleCollapse = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sellbar_admin_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    let s = getPanelSession(role);
    if (!s && role === "admin") {
      s = {
        token: "dev-admin-token-sellbar_admin_sig",
        role: "admin",
        name: "Sellbar Admin",
        email: "admin@sellbar.com",
      };
      savePanelSession(s);
    }
    if (!s) {
      router.replace(role === "admin" ? "/admin/login" : "/vendor/login");
      return;
    }
    setSession(s);
  }, [role, router]);

  if (!session) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-slate-50 flex items-center justify-center p-8 text-slate-500 font-medium">
        <p className="pn-loading" suppressHydrationWarning>Loading...</p>
      </div>
    );
  }

  // ========================================================
  // ENTERPRISE ADMIN SAAS LAYOUT FOR ADMIN
  // ========================================================
  if (role === "admin") {
    return (
      <DesktopOnlyGuard portalTitle="Admin Portal">
        <div data-portal-shell="true" style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
          {/* Desktop Fixed Left Sidebar */}
          <aside
            style={{
              width: sidebarCollapsed ? 74 : 270,
              flexShrink: 0,
              position: "sticky",
              top: 0,
              height: "100vh",
              zIndex: 30,
              transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="hidden lg:block"
          >
            <Suspense fallback={<div style={{ padding: 20, color: "#94a3b8" }}>Loading menu...</div>}>
              <AdminSidebar
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={handleToggleCollapse}
              />
            </Suspense>
          </aside>

          {/* Mobile Slide-Out Drawer */}
          {mobileSidebarOpen && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
              }}
              className="lg:hidden"
            >
              <div
                onClick={() => setMobileSidebarOpen(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(15, 23, 42, 0.65)",
                  backdropFilter: "blur(4px)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: 290,
                  maxWidth: "85vw",
                  height: "100%",
                  zIndex: 10,
                }}
              >
                <Suspense fallback={null}>
                  <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
                </Suspense>
              </div>
            </div>
          )}

          {/* Right Content Area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowX: "hidden" }}>
            {/* Top Sticky Header */}
            <AdminHeader
              session={session}
              sidebarCollapsed={sidebarCollapsed}
              onToggleCollapse={handleToggleCollapse}
              onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            />

            {/* Main Module Content */}
            <main suppressHydrationWarning style={{ flex: 1, padding: "20px 24px 48px", maxWidth: 1600, width: "100%", margin: "0 auto" }}>
              {typeof children === "function" ? children(session) : children}
            </main>
          </div>
        </div>
      </DesktopOnlyGuard>
    );
  }

  // ========================================================
  // VENDOR PANEL LAYOUT (PRESERVED)
  // ========================================================
  return (
    <DesktopOnlyGuard portalTitle="Vendor Portal">
      <div data-portal-shell="true" className="pn">
        <aside className="pn-side">
          <div className="pn-brand">
            SELL<span>BAR</span>
          </div>
          <div className="pn-role">{role} panel</div>

          {VENDOR_NAV.map(([href, text]) => (
            <Link key={href} href={href} className={path === href ? "on" : ""}>
              {text}
            </Link>
          ))}

          <Link href="/">🛍️ View Store</Link>
        </aside>

        <div className="pn-main">
          <div className="pn-top">
            <h1>{title}</h1>
            <span className="pn-row">
              {session.name}
              <button
                onClick={() => {
                  clearPanelSession();
                  router.replace(role === "admin" ? "/admin/login" : "/vendor/login");
                }}
              >
                Logout
              </button>
            </span>
          </div>
          <div className="pn-body">
            {typeof children === "function" ? children(session) : children}
          </div>
        </div>
      </div>
    </DesktopOnlyGuard>
  );
}
