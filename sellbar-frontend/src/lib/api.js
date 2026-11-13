
const API = (
  process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost:5000")
    ? process.env.NEXT_PUBLIC_API_URL
    : "https://app.sellbar.in/api"
).replace(/\/+$/, "");

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, token } = options;

  const headers = { Accept: "application/json" };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Use internal Next.js API routes when available in the browser (e.g. /orders)
  const isInternal = typeof window !== "undefined" && (path.startsWith("/orders") || path.startsWith("/api/orders"));
  const requestUrl = isInternal
    ? (path.startsWith("/api") ? path : `/api${path}`)
    : `${API}${path}`;

  const response = await fetch(requestUrl, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    // Graceful handling for 401 token invalid/expired
    if (response.status === 401) {
      console.warn(`[Sellbar API 401] ${path}: ${result.message || "Unauthorized"}`);
      return { success: false, unauthorized: true, message: result.message || "Session expired", orders: [] };
    }
    throw new Error(result.message || `Request failed (${response.status})`);
  }

  return result.data ?? result;
}

export { API };
