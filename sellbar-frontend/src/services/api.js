const API = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, token } = options;

  const headers = { Accept: "application/json" };
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;

  if (body !== undefined && !isForm) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: isForm ? body : JSON.stringify(body) } : {}),
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }

  return result.data ?? result;
}

export { API };