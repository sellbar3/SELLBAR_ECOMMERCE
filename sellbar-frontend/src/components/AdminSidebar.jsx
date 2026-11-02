"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Search,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Sparkles,
} from "lucide-react";
import { ADMIN_SIDEBAR_MODULES } from "../lib/adminNavigationConfig";

/**
 * Determine the active module based on current pathname.
 */
function getActiveModuleId(pathname) {
  if (!pathname || pathname === "/admin") return "dashboard";

  // Check direct sub-item match first (most accurate)
  for (const mod of ADMIN_SIDEBAR_MODULES) {
    if (mod.id === "dashboard") continue;
    for (const item of mod.items) {
      const itemBase = item.href.split("?")[0];
      if (itemBase === pathname) {
        return mod.id;
      }
    }
  }

  // Check by module basePath (longest match)
  const nonDashboard = ADMIN_SIDEBAR_MODULES.filter((m) => m.id !== "dashboard");
  const match = nonDashboard
    .filter((m) => pathname.startsWith(m.basePath))
    .sort((a, b) => b.basePath.length - a.basePath.length)[0];

  if (match) return match.id;
  if (pathname.startsWith("/admin/dashboard")) return "dashboard";

  return "dashboard";
}

export default function AdminSidebar({
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterQuery, setFilterQuery] = useState("");

  // Determine currently active module from route
  const currentActiveModuleId = useMemo(
    () => getActiveModuleId(pathname),
    [pathname]
  );

  // Accordion state: ONLY ONE section open at a time (defaults to active module)
  const [openSectionId, setOpenSectionId] = useState(currentActiveModuleId);

  // When route changes, automatically sync and open ONLY the newly active module
  useEffect(() => {
    setOpenSectionId(currentActiveModuleId);
  }, [currentActiveModuleId]);

  // Hover state for collapsed flyout popover
  const [hoveredModId, setHoveredModId] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0 });
  const hoverTimeoutRef = useRef(null);

  const toggleSection = (id) => {
    // If clicking already open section, close it; otherwise open it and close all others
    setOpenSectionId((prev) => (prev === id ? null : id));
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
    if (pathname !== itemPath) return false;

    if (itemQuery) {
      const qParams = new URLSearchParams(itemQuery);
      let allMatch = true;
      qParams.forEach((val, key) => {
        if (searchParams?.get(key) !== val) allMatch = false;
      });
      return allMatch;
    }

    // Link has no query: active only if current URL doesn't match an active sibling query
    const hasSearch = searchParams && Array.from(searchParams.keys()).length > 0;
    if (hasSearch) {
      const currentMod = ADMIN_SIDEBAR_MODULES.find((m) => m.basePath === itemPath);
      const hasSpecificSiblingMatch = currentMod?.items?.some((it) => {
        const [, itQuery] = it.href.split("?");
        if (!itQuery) return false;
        const itParams = new URLSearchParams(itQuery);
        let match = true;
        itParams.forEach((v, k) => {
          if (searchParams.get(k) !== v) match = false;
        });
        return match;
      });
      if (hasSpecificSiblingMatch) return false;
    }

    return true;
  };

  const handleMouseEnterIcon = (modId, e) => {
    if (!isCollapsed) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPos({ top: Math.max(10, Math.min(rect.top - 10, window.innerHeight - 340)) });
    setHoveredModId(modId);
  };

  const handleMouseLeaveIcon = () => {
    if (!isCollapsed) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredModId(null);
    }, 150);
  };

  const handlePopoverMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handlePopoverMouseLeave = () => {
    setHoveredModId(null);
  };

  const hoveredMod = useMemo(
    () => ADMIN_SIDEBAR_MODULES.find((m) => m.id === hoveredModId),
    [hoveredModId]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: isCollapsed ? 74 : 270,
        background: "#0f172a",
        color: "#f8fafc",
        borderRight: "1px solid #1e293b",
        userSelect: "none",
        transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
      }}
    >
      {/* Brand & Collapse Header */}
      <div
        style={{
          padding: isCollapsed ? "14px 8px" : "16px 18px",
          display: "flex",
          flexDirection: isCollapsed ? "column" : "row",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          borderBottom: "1px solid #1e293b",
          minHeight: isCollapsed ? 92 : 65,
          gap: isCollapsed ? 8 : 0,
        }}
      >
        <Link
          href="/admin"
          title="Sellbar Admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#DC2564",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 18,
              color: "#fff",
              boxShadow: "0 0 14px rgba(220, 37, 100, 0.45)",
              flexShrink: 0,
            }}
          >
            S
          </div>

          {!isCollapsed && (
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.5px" }}>
                SELL<span style={{ color: "#DC2564" }}>BAR</span>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 700,
                }}
              >
                Enterprise Admin
              </div>
            </div>
          )}
        </Link>

        {/* Desktop Collapse / Expand Toggle Button */}
        {onToggleCollapse && !onCloseMobile && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            style={{
              width: isCollapsed ? 38 : "auto",
              height: isCollapsed ? 28 : "auto",
              background: isCollapsed ? "#1e293b" : "transparent",
              border: isCollapsed ? "1px solid #334155" : "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 6,
              color: isCollapsed ? "#cbd5e1" : "#94a3b8",
              cursor: "pointer",
              padding: isCollapsed ? 0 : 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = isCollapsed ? "#334155" : "#1e293b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isCollapsed ? "#cbd5e1" : "#94a3b8";
              e.currentTarget.style.background = isCollapsed ? "#1e293b" : "transparent";
            }}
          >
            {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        )}

        {/* Mobile Close Button */}
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

      {/* Quick Menu Filter Search (Expanded Mode Only) */}
      {!isCollapsed && (
        <div suppressHydrationWarning style={{ padding: "12px 14px", borderBottom: "1px solid #1e293b" }}>
          <div
            suppressHydrationWarning
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              background: "#1e293b",
              borderRadius: 8,
              padding: "7px 10px",
            }}
          >
            <Search size={14} style={{ color: "#64748b", marginRight: 8, flexShrink: 0 }} />
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search 20 modules..."
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
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: 11,
                  padding: "0 2px",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Collapsed Search Icon Shortcut */}
      {isCollapsed && onToggleCollapse && (
        <div style={{ padding: "8px 0", display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Search modules (Click to expand)"
            style={{
              width: 42,
              height: 42,
              borderRadius: 8,
              background: "#1e293b",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#DC2564";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#94a3b8";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
            }}
          >
            <Search size={16} />
          </button>
        </div>
      )}

      {/* Navigation Scrollable Tree */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isCollapsed ? "8px 6px" : "12px 10px",
          scrollbarWidth: "thin",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            // In accordion mode: strictly ONLY open if user clicked it OR if searching
            const isOpen = filterQuery ? true : openSectionId === mod.id;
            const isParentActive = mod.id === currentActiveModuleId;

            // ==========================================
            // COLLAPSED SIDEBAR ITEM
            // ==========================================
            if (isCollapsed) {
              return (
                <div
                  key={mod.id}
                  onMouseEnter={(e) => handleMouseEnterIcon(mod.id, e)}
                  onMouseLeave={handleMouseLeaveIcon}
                  style={{ position: "relative" }}
                >
                  <Link
                    href={mod.items[0]?.href || mod.basePath}
                    onClick={() => onCloseMobile && onCloseMobile()}
                    style={{
                      width: 44,
                      height: 44,
                      margin: "0 auto",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isParentActive ? "rgba(220, 37, 100, 0.22)" : "transparent",
                      color: isParentActive ? "#ff4081" : "#94a3b8",
                      border: isParentActive ? "1px solid rgba(220, 37, 100, 0.45)" : "1px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      position: "relative",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isParentActive) {
                        e.currentTarget.style.background = "#1e293b";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isParentActive) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#94a3b8";
                      }
                    }}
                  >
                    <Icon size={19} style={{ color: isParentActive ? "#DC2564" : "currentColor" }} />
                    {isParentActive && (
                      <span
                        style={{
                          position: "absolute",
                          right: 2,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 4,
                          height: 18,
                          borderRadius: 2,
                          background: "#DC2564",
                        }}
                      />
                    )}
                  </Link>
                </div>
              );
            }

            // ==========================================
            // EXPANDED SIDEBAR ACCORDION ITEM
            // ==========================================
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
                    background: isParentActive
                      ? "rgba(220, 37, 100, 0.14)"
                      : isOpen
                      ? "rgba(255, 255, 255, 0.05)"
                      : "transparent",
                    color: isParentActive ? "#ff4081" : isOpen ? "#f8fafc" : "#cbd5e1",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: isParentActive ? 700 : 600,
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isParentActive && !isOpen) {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isParentActive && !isOpen) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#cbd5e1";
                    }
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <Icon
                      size={17}
                      style={{
                        color: isParentActive ? "#DC2564" : "#94a3b8",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {mod.title}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
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
                        transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        color: isParentActive ? "#ff4081" : "#64748b",
                      }}
                    />
                  </div>
                </button>

                {/* Sub-items list: ONLY rendered for the active/open module */}
                {isOpen && (
                  <div
                    style={{
                      paddingLeft: 24,
                      paddingTop: 4,
                      paddingBottom: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      borderLeft: "2px solid rgba(220, 37, 100, 0.3)",
                      marginLeft: 20,
                      marginTop: 3,
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
                            transition: "all 0.12s ease",
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.color = "#fff";
                              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!active) {
                              e.currentTarget.style.color = "#94a3b8";
                              e.currentTarget.style.background = "transparent";
                            }
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

      {/* Floating Flyout Popover for Collapsed Mode */}
      {isCollapsed && hoveredMod && (
        <div
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          style={{
            position: "fixed",
            left: 78,
            top: popoverPos.top,
            width: 230,
            background: "#0b1120",
            border: "1px solid #334155",
            borderRadius: 10,
            padding: "12px",
            boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(220, 37, 100, 0.2)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Header */}
          <div
            style={{
              paddingBottom: 8,
              borderBottom: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
              {hoveredMod.title}
            </div>
            {hoveredMod.badge && (
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  padding: "1px 6px",
                  borderRadius: 10,
                  background: hoveredMod.badge === "AI Powered" ? "#7c3aed" : "#DC2564",
                  color: "#fff",
                }}
              >
                {hoveredMod.badge}
              </span>
            )}
          </div>

          {/* Subpages Links */}
          <div
            style={{
              maxHeight: 280,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              paddingTop: 6,
            }}
          >
            {hoveredMod.items.map((subItem) => {
              const active = isLinkActive(subItem.href);
              return (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  onClick={() => {
                    setHoveredModId(null);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  style={{
                    padding: "6px 8px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: active ? 700 : 500,
                    color: active ? "#fff" : "#94a3b8",
                    background: active ? "#DC2564" : "transparent",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "#1e293b";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {subItem.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Profile / Session Status */}
      <div
        style={{
          padding: isCollapsed ? "12px 6px" : "14px 16px",
          borderTop: "1px solid #1e293b",
          background: "#0b1120",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
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
              flexShrink: 0,
            }}
          >
            AD
          </div>

          {!isCollapsed && (
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>Super Admin</div>
              <div
                style={{
                  fontSize: 10,
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10b981",
                  }}
                />
                MongoDB Live
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
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
        )}

        {isCollapsed && (
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
              display: "none",
            }}
          >
            <LogOut size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
