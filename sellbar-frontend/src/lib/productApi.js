/**
 * Dynamic Product API Service
 * Fetches real product data from the Sellbar backend API
 */

const API_BASE = ""; // Next.js rewrites /api/* to the backend URL

export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.category) query.set("category", params.category);
    if (params.brand) query.set("brand", params.brand);
    if (params.isFeatured !== undefined) query.set("isFeatured", String(params.isFeatured));
    if (params.featuredType) query.set("featuredType", params.featuredType);
    if (params.search) query.set("search", params.search);
    if (params.minPrice) query.set("minPrice", String(params.minPrice));
    if (params.maxPrice) query.set("maxPrice", String(params.maxPrice));
    if (params.sort) query.set("sort", params.sort);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const url = `/api/public/products${query.toString() ? `?${query.toString()}` : ""}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data || { products: [], pagination: {} };
  } catch (error) {
    console.error("fetchProducts error:", error);
    return { products: [], pagination: {} };
  }
}

export async function fetchProductByIdOrSlug(idOrSlug) {
  try {
    if (!idOrSlug) return null;
    const res = await fetch(`/api/public/products/${encodeURIComponent(idOrSlug)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("fetchProductByIdOrSlug error:", error);
    return null;
  }
}

export async function fetchFeaturedProducts(type = "") {
  try {
    const query = type ? `?type=${encodeURIComponent(type)}` : "";
    const res = await fetch(`/api/public/products/featured${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch featured products: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data?.products || [];
  } catch (error) {
    console.error("fetchFeaturedProducts error:", error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`/api/public/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const json = await res.json();
    return json.data?.categories || [];
  } catch (error) {
    console.error("fetchCategories error:", error);
    return [];
  }
}
