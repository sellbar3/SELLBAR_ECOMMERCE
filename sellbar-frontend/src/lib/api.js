
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

  const response = await fetch(`${API}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }

  return result.data ?? result;
}

export { API };
