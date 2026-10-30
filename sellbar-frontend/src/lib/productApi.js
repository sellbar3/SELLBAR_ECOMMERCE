/**
 * Dynamic Product API Service
 * Fetches real product data from the Sellbar backend API with graceful offline cache fallback.
 */

import cachedProducts from "@/config/products-cache.json";

// In-flight request deduplication map to prevent redundant concurrent fetches
const inFlightRequests = new Map();

function normalizeCategory(cat) {
  if (!cat) return "";
  const s = String(cat).toLowerCase().trim();
  if (s === "laptop" || s === "laptops") return "laptop";
  if (
    s === "mobile-phone" ||
    s === "mobile-phones" ||
    s === "phone" ||
    s === "phones" ||
    s === "mobile" ||
    s === "mobiles"
  )
    return "mobile-phones";
  if (s === "tablet" || s === "tablets") return "tablets";
  if (
    s === "smart-watch" ||
    s === "smart-watches" ||
    s === "smartwatch" ||
    s === "smartwatches" ||
    s === "watches"
  )
    return "smart-watches";
  if (s === "camera" || s === "cameras") return "cameras";
  if (
    s === "gaming-console" ||
    s === "gaming-consoles" ||
    s === "gaming" ||
    s === "console" ||
    s === "consoles"
  )
    return "gaming-consoles";
  return s;
}

function getFallbackFiltered(params = {}) {
  let list = Array.isArray(cachedProducts) ? [...cachedProducts] : [];

  if (params.category) {
    const targetCat = normalizeCategory(params.category);
    list = list.filter((p) => {
      const pCat = (
        typeof p.category === "object"
          ? p.category?.slug || p.category?.name
          : p.category || ""
      ).toLowerCase();
      const normPCat = normalizeCategory(pCat);
      return (
        normPCat === targetCat ||
        pCat === targetCat ||
        pCat.includes(targetCat) ||
        targetCat.includes(pCat)
      );
    });
  }

  if (params.brand) {
    const b = String(params.brand).toLowerCase().trim();
    list = list.filter((p) => {
      const pBrand = (
        typeof p.brand === "object"
          ? p.brand?.name || p.brand?.slug
          : p.brand || ""
      ).toLowerCase();
      return pBrand === b || pBrand.includes(b);
    });
  }

  if (params.featuredType) {
    list = list.filter((p) => p.featuredType === params.featuredType);
  }

  if (params.isFeatured !== undefined) {
    const isF =
      params.isFeatured === true ||
      params.isFeatured === "true" ||
      params.isFeatured === "1";
    list = list.filter((p) => Boolean(p.isFeatured) === isF);
  }

  if (params.search) {
    const q = String(params.search).toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  if (params.minPrice) {
    const min = Number(params.minPrice);
    if (!isNaN(min)) list = list.filter((p) => Number(p.price) >= min);
  }

  if (params.maxPrice) {
    const max = Number(params.maxPrice);
    if (!isNaN(max)) list = list.filter((p) => Number(p.price) <= max);
  }

  // Sorting
  if (params.sort === "price-asc") {
    list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (params.sort === "price-desc") {
    list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  } else if (params.sort === "rating") {
    list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
  } else if (params.sort === "popular") {
    list.sort(
      (a, b) => (Number(b.reviewsCount) || 0) - (Number(a.reviewsCount) || 0)
    );
  }

  const total = list.length;
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(params.limit) || 12));
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

  return {
    products: paginated,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.brand) query.set("brand", params.brand);
  if (params.isFeatured !== undefined)
    query.set("isFeatured", String(params.isFeatured));
  if (params.featuredType) query.set("featuredType", params.featuredType);
  if (params.search) query.set("search", params.search);
  if (params.minPrice) query.set("minPrice", String(params.minPrice));
  if (params.maxPrice) query.set("maxPrice", String(params.maxPrice));
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const cacheKey = `products_${query.toString()}`;
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const fetchPromise = (async () => {
    try {
      const url = `/api/public/products${
        query.toString() ? `?${query.toString()}` : ""
      }`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.data?.products) {
          return json.data;
        }
      }
      return getFallbackFiltered(params);
    } catch {
      return getFallbackFiltered(params);
    } finally {
      setTimeout(() => inFlightRequests.delete(cacheKey), 800);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
}

export async function fetchProductByIdOrSlug(idOrSlug) {
  try {
    if (!idOrSlug) return null;
    const cleanId = String(idOrSlug).trim();

    const res = await fetch(
      `/api/public/products/${encodeURIComponent(cleanId)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.product) {
        return json.data;
      }
    }

    // Comprehensive Fallback lookup from cache
    const target = cleanId.toLowerCase();
    const cleanSlugTarget = target.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const product = cachedProducts.find((p) => {
      if (p._id === cleanId) return true;
      if (p.slug?.toLowerCase() === target) return true;
      if (p.sku?.toLowerCase() === target) return true;
      const pClean = p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (pClean === cleanSlugTarget) return true;
      if (p.slug && (p.slug.toLowerCase().includes(target) || target.includes(p.slug.toLowerCase()))) return true;
      return false;
    });

    if (!product) return null;

    const relatedProducts = cachedProducts
      .filter((p) => p._id !== product._id)
      .slice(0, 4);

    return { product, relatedProducts };
  } catch {
    const target = String(idOrSlug || "").toLowerCase().trim();
    const product = cachedProducts.find(
      (p) =>
        p._id === idOrSlug ||
        p.slug?.toLowerCase() === target ||
        p.sku?.toLowerCase() === target
    );
    if (!product) return null;
    const relatedProducts = cachedProducts
      .filter((p) => p._id !== product._id)
      .slice(0, 4);
    return { product, relatedProducts };
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

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json?.data?.products)) {
        return json.data.products;
      }
    }

    const fallback = getFallbackFiltered({ featuredType: type || undefined });
    return fallback.products;
  } catch {
    const fallback = getFallbackFiltered({ featuredType: type || undefined });
    return fallback.products;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`/api/public/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json?.data?.categories)) {
        return json.data.categories;
      }
    }

    return [
      { name: "Mobile Phones", slug: "mobile-phones", count: 9 },
      { name: "Laptops", slug: "laptop", count: 6 },
      { name: "Tablets", slug: "tablets", count: 2 },
      { name: "Smart Watches", slug: "smart-watches", count: 3 },
      { name: "Cameras", slug: "cameras", count: 2 },
      { name: "Gaming Consoles", slug: "gaming-consoles", count: 2 },
    ];
  } catch {
    return [
      { name: "Mobile Phones", slug: "mobile-phones", count: 9 },
      { name: "Laptops", slug: "laptop", count: 6 },
      { name: "Tablets", slug: "tablets", count: 2 },
      { name: "Smart Watches", slug: "smart-watches", count: 3 },
      { name: "Cameras", slug: "cameras", count: 2 },
      { name: "Gaming Consoles", slug: "gaming-consoles", count: 2 },
    ];
  }
}
