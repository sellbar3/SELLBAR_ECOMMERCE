"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ADMIN_MENU } from "../lib/adminMenu";

export default function AdminNav() {
  const path = usePathname();
  const sp = useSearchParams();

  function isActive(href) {
    const [base, query] = href.split("?");
    if (base === "/admin") return path === "/admin";
    if (query) {
      const want = new URLSearchParams(query).get("role");
      return path === base && sp.get("role") === want;
    }
    return path === base || path.startsWith(`${base}/`);
  }

  return (
    <>
      {ADMIN_MENU.map((m) => {
        const Icon = m.icon;
        return (
          <Link
            key={m.href}
            href={m.href}
            className={isActive(m.href) ? "on" : ""}
            style={{ display: "flex", alignItems: "center", gap: 10, opacity: m.ready ? 1 : 0.6 }}
          >
            <Icon size={18} strokeWidth={1.75} style={{ flexShrink: 0 }} />
            <span>{m.label}</span>
            {!m.ready && <small style={{ marginLeft: "auto", fontSize: 10, opacity: 0.8 }}>soon</small>}
          </Link>
        );
      })}
    </>
  );
}