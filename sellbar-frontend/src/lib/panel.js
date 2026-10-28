"use client";

import { API } from "./api";

export const PANEL_KEY = "sellbar_panel_session";

export function getPanelSession(role) {
  if (typeof window === "undefined") return null;
  try {
    const s = JSON.parse(localStorage.getItem(PANEL_KEY) || "null");
    if (!s?.token) return null;
    const payload = JSON.parse(
      atob(s.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem(PANEL_KEY);
      return null;
    }
    if (role && s.role !== role) return null;
    return s;
  } catch {
    return null;
  }
}

export const savePanelSession = (s) =>
  localStorage.setItem(PANEL_KEY, JSON.stringify(s));
export const clearPanelSession = () => localStorage.removeItem(PANEL_KEY);

// Like apiRequest, but also supports FormData (image uploads).
export async function panelRequest(path, { method = "GET", body, token } = {}) {
  const headers = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: payload,
    cache: "no-store",
  });
  const result = await res.json().catch(() => ({}));

  if (!res.ok || result.success === false) {
    throw new Error(result.message || `Request failed (${res.status})`);
  }
  return result.data ?? result;
}

// Finds the list inside a response like { products: [...] } or [...]
export function pickList(data, ...keys) {
  if (Array.isArray(data)) return data;
  for (const k of keys) if (Array.isArray(data?.[k])) return data[k];
  return Object.values(data || {}).find(Array.isArray) || [];
}

export const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export const fmtDate = (d) => (d ? new Date(d).toLocaleString("en-IN") : "");

export const label = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ").replace(/^./, (c) => c.toUpperCase());
