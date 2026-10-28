
"use client";

export const SESSION_KEY = "sellbar_session";

export function getSession() {
  if (typeof window === "undefined") return null;

  try {
    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY) || "null"
    );

    if (!session?.token) return null;

    const parts = session.token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );

    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
