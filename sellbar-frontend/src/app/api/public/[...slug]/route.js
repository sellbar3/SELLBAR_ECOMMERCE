import { NextResponse } from "next/server";
import cachedProducts from "@/config/products-cache.json";

const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || [];
  const endpoint = slugArray.join("/");
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const targetUrl = `${backendUrl}/public/${endpoint}${queryString ? `?${queryString}` : ""}`;

  // 1. Try to fetch from live backend with a 1.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

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
    // Backend offline / connection refused -> seamlessly fallback to cache
  }

  // 2. Offline / resilient fallback using cached electronics database
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
    const idOrSlug = decodeURIComponent(endpoint.replace("products/", "")).toLowerCase().trim();
    const product = cachedProducts.find(
      (p) =>
        p._id === idOrSlug ||
        p.slug?.toLowerCase() === idOrSlug ||
        p.sku?.toLowerCase() === idOrSlug
    );

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

  // Products listing with filters
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
      const pCat = (typeof p.category === "object" ? p.category?.slug || p.category?.name : p.category || "").toLowerCase();
      return pCat === cat || pCat.includes(cat);
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
