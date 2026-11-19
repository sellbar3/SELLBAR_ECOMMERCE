"use client";

export async function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    return registration;
  } catch (err) {
    console.warn("ServiceWorker registration failed:", err);
    return null;
  }
}

export async function requestPushPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch {
    return "denied";
  }
}

export async function sendLocalPushNotification({
  title = "🛍️ Naya Order Received!",
  body = "New customer order placed on Sellbar",
  icon = "/sellbar-assured.svg",
  url = "/admin/orders",
}) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    // If Service Worker is active, use showNotification for full mobile push support
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      if (registration && registration.showNotification) {
        return registration.showNotification(title, {
          body,
          icon,
          badge: icon,
          vibrate: [300, 100, 300, 100, 300],
          data: { url },
          tag: `sellbar-order-${Date.now()}`,
          renotify: true,
        });
      }
    }

    // Standard Desktop / Browser Notification fallback
    const notif = new Notification(title, {
      body,
      icon,
      badge: icon,
      data: { url },
    });

    notif.onclick = function (e) {
      e.preventDefault();
      window.focus();
      if (url && typeof window !== "undefined") {
        window.location.href = url;
      }
    };
  } catch (err) {
    console.warn("Push notification display error:", err);
  }
}
