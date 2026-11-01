"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, Search, X, ShieldAlert } from "lucide-react";
import { ADMIN_SIDEBAR_MODULES } from "../lib/adminNavigationConfig";

export default function AdminSidebar({ onCloseMobile }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterQuery, setFilterQuery] = useState("");
  const [openSections, setOpenSections] = useState(() => {
    // Automatically open the section matching the current URL
    const map = {};
    ADMIN_SIDEBAR_MODULES.forEach((m) => {
      if (pathname.startsWith(m.basePath)) {
        map[m.id] = true;
      }
    });
    // Default open dashboard
    if (Object.keys(map).length === 0) map["dashboard"] = true;
    return map;
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter modules and sub-items based on search input
  const filteredModules = useMemo(() => {
    if (!filterQuery.trim()) return ADMIN_SIDEBAR_MODULES;
    const q = filterQuery.toLowerCase().trim();
    return ADMIN_SIDEBAR_MODULES.map((mod) => {
      const titleMatches = mod.title.toLowerCase().includes(q);
      const matchedItems = mod.items.filter((item) =>
        item.label.toLowerCase().includes(q)
      );
      if (titleMatches || matchedItems.length > 0) {
        return {
          ...mod,
          items: matchedItems.length > 0 ? matchedItems : mod.items,
        };
      }
      return null;
    }).filter(Boolean);
  }, [filterQuery]);

  const isLinkActive = (itemHref) => {
    const [itemPath, itemQuery] = itemHref.split("?");
    if (itemPath === "/admin") {
      return pathname === "/admin" && !itemQuery;
    }
    if (itemQuery) {
      const qParams = new URLSearchParams(itemQuery);
      let allMatch = true;
      qParams.forEach((val, key) => {
        if (searchParams.get(key) !== val) allMatch = false;
      });
      return pathname === itemPath && allMatch;
    }
    return pathname === itemPath;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#0f172a",
        color: "#f8fafc",
        borderRight: "1px solid #1e293b",
        userSelect: "none",
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#DC2564",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 16,
              color: "#fff",
              boxShadow: "0 0 14px rgba(220, 37, 100, 0.4)",
            }}
          >
            S
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.5px" }}>
              SELL<span style={{ color: "#DC2564" }}>BAR</span>
            </div>
            <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>
              Enterprise Admin
            </div>
          </div>
        </div>

        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Quick Menu Filter Search */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e293b" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: "#1e293b",
            borderRadius: 8,
            padding: "6px 10px",
          }}
        >
          <Search size={14} style={{ color: "#64748b", marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search all 20 modules..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: 12,
              width: "100%",
            }}
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery("")}
              style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Navigation Scrollable Tree */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 8px",
          scrollbarWidth: "thin",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            const isOpen = filterQuery ? true : !!openSections[mod.id];
            const isParentActive = pathname.startsWith(mod.basePath);

            return (
              <div key={mod.id} style={{ marginBottom: 2 }}>
                {/* Module Heading / Accordion trigger */}
                <button
                  type="button"
                  onClick={() => toggleSection(mod.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 12px",
                    borderRadius: 8,
                    background: isParentActive ? "rgba(220, 37, 100, 0.12)" : "transparent",
                    color: isParentActive ? "#ff4081" : "#cbd5e1",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon size={17} style={{ color: isParentActive ? "#DC2564" : "#94a3b8", flexShrink: 0 }} />
                    <span>{mod.title}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {mod.badge && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          padding: "1px 6px",
                          borderRadius: 10,
                          background: mod.badge === "AI Powered" ? "#7c3aed" : "#DC2564",
                          color: "#fff",
                        }}
                      >
                        {mod.badge}
                      </span>
                    )}
                    <ChevronDown
                      size={14}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: "#64748b",
                      }}
                    />
                  </div>
                </button>

                {/* Sub-items list */}
                {isOpen && (
                  <div
                    style={{
                      paddingLeft: 28,
                      paddingTop: 4,
                      paddingBottom: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderLeft: "2px solid rgba(255, 255, 255, 0.08)",
                      marginLeft: 18,
                      marginTop: 2,
                    }}
                  >
                    {mod.items.map((item) => {
                      const active = isLinkActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => onCloseMobile && onCloseMobile()}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: active ? 700 : 500,
                            color: active ? "#fff" : "#94a3b8",
                            background: active ? "#DC2564" : "transparent",
                            textDecoration: "none",
                            transition: "all 0.15s ease",
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Profile / Session Status */}
      <div
        style={{
          padding: "14px 16px",
          borderTop: "1px solid #1e293b",
          background: "#0b1120",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            AD
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>Super Admin</div>
            <div style={{ fontSize: 10, color: "#10b981", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              MongoDB Connected
            </div>
          </div>
        </div>

        <Link
          href="/admin/login"
          onClick={() => {
            try {
              localStorage.removeItem("sellbar_panel_session");
            } catch {}
          }}
          title="Sign out of Admin"
          style={{
            color: "#94a3b8",
            fontSize: 11,
            textDecoration: "none",
            padding: "4px 8px",
            borderRadius: 6,
            background: "#1e293b",
            fontWeight: 600,
          }}
        >
          Exit
        </Link>
      </div>
    </div>
  );
}
