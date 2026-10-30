import { NextResponse } from "next/server";
import cachedProducts from "@/config/products-cache.json";

const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
let backendOfflineUntil = 0;

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || [];
  const endpoint = slugArray.join("/");
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const targetUrl = `${backendUrl}/public/${endpoint}${queryString ? `?${queryString}` : ""}`;

  // 1. Try live backend if not currently in offline cooldown
  const now = Date.now();
  if (now > backendOfflineUntil) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 350);

      const res = await fetch(targetUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        cache: "no-store",
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
      }
    } catch {
      // Backend not running locally -> enter silent cache-serving mode for 30 seconds
      backendOfflineUntil = Date.now() + 30000;
    }
  }

  // 2. Offline / resilient fallback using certified electronics cache
  if (endpoint.startsWith("categories")) {
    return NextResponse.json({
      success: true,
      data: {
        categories: [
          { name: "Mobile Phones", slug: "mobile-phones", count: 9 },
          { name: "Laptops", slug: "laptop", count: 6 },
          { name: "Tablets", slug: "tablets", count: 2 },
          { name: "Smart Watches", slug: "smart-watches", count: 3 },
          { name: "Cameras", slug: "cameras", count: 2 },
          { name: "Gaming Consoles", slug: "gaming-consoles", count: 2 },
        ],
      },
    });
  }

  if (endpoint === "products/featured") {
    const type = searchParams.get("type");
    let list = Array.isArray(cachedProducts) ? [...cachedProducts] : [];
    if (type) {
      list = list.filter((p) => p.featuredType === type);
    } else {
      list = list.filter((p) => p.isFeatured || p.featuredType !== "regular");
    }
    return NextResponse.json({
      success: true,
      data: { products: list.slice(0, 12) },
    });
  }

  if (endpoint.startsWith("products/")) {
    // Single product lookup
    const rawIdOrSlug = decodeURIComponent(endpoint.replace("products/", "")).trim();
    const idOrSlug = rawIdOrSlug.toLowerCase();

    // 1. Exact match by _id, slug, or sku
    let product = cachedProducts.find(
      (p) =>
        p._id === rawIdOrSlug ||
        p.slug?.toLowerCase() === idOrSlug ||
        p.sku?.toLowerCase() === idOrSlug
    );

    // 2. Normalized name match
    if (!product) {
      const cleanTarget = idOrSlug.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      product = cachedProducts.find((p) => {
        const pClean = p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        return (
          pClean === cleanTarget ||
          pClean?.includes(cleanTarget) ||
          cleanTarget?.includes(pClean)
        );
      });
    }

    // 3. Fallback partial slug match
    if (!product) {
      product = cachedProducts.find(
        (p) =>
          p.slug &&
          (p.slug.toLowerCase().includes(idOrSlug) || idOrSlug.includes(p.slug.toLowerCase()))
      );
    }

    if (product) {
      const relatedProducts = cachedProducts
        .filter((p) => p._id !== product._id)
        .slice(0, 4);
      return NextResponse.json({
        success: true,
        data: { product, relatedProducts },
      });
    }

    return NextResponse.json(
      { success: false, message: "Product not found in cache" },
      { status: 404 }
    );
  }

  // Products listing with robust category & filters handling
  let list = Array.isArray(cachedProducts) ? [...cachedProducts] : [];
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const featuredType = searchParams.get("featuredType");
  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 12));

  if (category) {
    const cat = category.toLowerCase().trim();
    list = list.filter((p) => {
      const pCatSlug = (typeof p.category === "object" ? p.category?.slug : p.category || "").toLowerCase();
      const pCatName = (typeof p.category === "object" ? p.category?.name : "").toLowerCase();
      return (
        pCatSlug === cat ||
        pCatName === cat ||
        (cat.includes("laptop") && (pCatSlug.includes("laptop") || pCatName.includes("laptop"))) ||
        (cat.includes("phone") && (pCatSlug.includes("phone") || pCatName.includes("phone"))) ||
        (cat.includes("tablet") && (pCatSlug.includes("tablet") || pCatName.includes("tablet"))) ||
        (cat.includes("watch") && (pCatSlug.includes("watch") || pCatName.includes("watch"))) ||
        (cat.includes("camera") && (pCatSlug.includes("camera") || pCatName.includes("camera"))) ||
        (cat.includes("console") && (pCatSlug.includes("console") || pCatName.includes("console")))
      );
    });
  }

  if (brand) {
    const b = brand.toLowerCase().trim();
    list = list.filter((p) => {
      const pBrand = (typeof p.brand === "object" ? p.brand?.name || p.brand?.slug : p.brand || "").toLowerCase();
      return pBrand === b || pBrand.includes(b);
    });
  }

  if (featuredType) {
    list = list.filter((p) => p.featuredType === featuredType);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    list = list.filter((p) => Number(p.price) >= Number(minPrice));
  }
  if (maxPrice) {
    list = list.filter((p) => Number(p.price) <= Number(maxPrice));
  }

  if (sort === "price-asc") {
    list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (sort === "price-desc") {
    list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  } else if (sort === "rating") {
    list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: {
      products: paginated,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
      },
    },
  });
}
