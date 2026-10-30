/**
 * Dynamic Product API Service
 * Fetches real product data from the Sellbar backend API with graceful offline cache fallback.
 */

import cachedProducts from "@/config/products-cache.json";

function getFallbackFiltered(params = {}) {
  let list = Array.isArray(cachedProducts) ? [...cachedProducts] : [];

  if (params.category) {
    const cat = String(params.category).toLowerCase().trim();
    list = list.filter((p) => {
      const pCatSlug = (typeof p.category === "object" ? p.category?.slug || p.category?.name : p.category || "").toLowerCase();
      return pCatSlug === cat || pCatSlug.includes(cat);
    });
  }

  if (params.brand) {
    const b = String(params.brand).toLowerCase().trim();
    list = list.filter((p) => {
      const pBrand = (typeof p.brand === "object" ? p.brand?.name || p.brand?.slug : p.brand || "").toLowerCase();
      return pBrand === b || pBrand.includes(b);
    });
  }

  if (params.featuredType) {
    list = list.filter((p) => p.featuredType === params.featuredType);
  }

  if (params.isFeatured !== undefined) {
    const isF = params.isFeatured === true || params.isFeatured === "true" || params.isFeatured === "1";
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
    list.sort((a, b) => (Number(b.reviewsCount) || 0) - (Number(a.reviewsCount) || 0));
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

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.products) {
        return json.data;
      }
    }
    // Graceful fallback to verified certified electronics data
    return getFallbackFiltered(params);
  } catch (error) {
    return getFallbackFiltered(params);
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

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.product) {
        return json.data;
      }
    }

    // Fallback lookup from cache
    const target = String(idOrSlug).toLowerCase().trim();
    const product = cachedProducts.find(
      (p) =>
        p._id === idOrSlug ||
        p.slug?.toLowerCase() === target ||
        p.sku?.toLowerCase() === target ||
        p.name?.toLowerCase().replace(/\s+/g, "-") === target
    );

    if (!product) return null;

    const relatedProducts = cachedProducts
      .filter((p) => p._id !== product._id)
      .slice(0, 4);

    return { product, relatedProducts };
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
