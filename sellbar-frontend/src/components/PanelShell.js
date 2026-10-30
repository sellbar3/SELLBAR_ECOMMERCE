"use client";

import "@/css/panel.css";
import { Suspense, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getPanelSession, clearPanelSession } from "../lib/panel";
import AdminNav from "./AdminNav";

const VENDOR_NAV = [
  ["/vendor", "📊 Dashboard"],
  ["/vendor/products", "📦 Products"],
  ["/vendor/orders", "🧾 Orders"],
  ["/vendor/profile", "🏪 Store Profile"],
];

export default function PanelShell({ role, title, children }) {
  const router = useRouter();
  const path = usePathname();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const s = getPanelSession(role);
    if (!s) {
      router.replace(role === "admin" ? "/admin/login" : "/vendor/login");
      return;
    }
    setSession(s);
  }, [role, router]);

  if (!session) return <p className="pn-loading">Loading...</p>;

  return (
    <div data-portal-shell="true" className="pn">
      <aside className="pn-side">
        <div className="pn-brand">
          SELL<span>BAR</span>
        </div>
        <div className="pn-role">{role} panel</div>

        {role === "admin" ? (
          <Suspense fallback={null}>
            <AdminNav />
          </Suspense>
        ) : (
          VENDOR_NAV.map(([href, text]) => (
            <Link key={href} href={href} className={path === href ? "on" : ""}>
              {text}
            </Link>
          ))
        )}

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
  );
}