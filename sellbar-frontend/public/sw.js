// Sellbar Service Worker for PWA & Web Push Notifications
const CACHE_NAME = "sellbar-cache-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for incoming Push Events from backend
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: "Sellbar Order Alert", body: event.data.text() };
    }
  }

  const title = data.title || "🛍️ Naya Order Received!";
  const options = {
    body: data.body || "A new order has been placed on Sellbar.",
    icon: data.icon || "/sellbar-assured.svg",
    badge: data.badge || "/sellbar-assured.svg",
    vibrate: [300, 100, 300, 100, 300],
    data: {
      url: data.url || "/admin/orders",
    },
    actions: [
      { action: "open", title: "View Order" },
      { action: "close", title: "Dismiss" },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click to open target dashboard order page
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "close") return;

  const targetUrl = event.notification.data?.url || "/admin/orders";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("/admin") || client.url.includes("/vendor")) {
          return client.focus();
        }
      }
      return self.clients.openWindow(targetUrl);
    })
  );
});
