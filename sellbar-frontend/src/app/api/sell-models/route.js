import { NextResponse } from "next/server";
import { queryMobileModels, POPULAR_BRANDS, MOBILE_MODELS } from "@/lib/sellMobileData";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand") || "all";
    const search = searchParams.get("search") || "";
    const network = searchParams.get("network") || "all";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000000;
    const sortBy = searchParams.get("sortBy") || "popularity";

    const ramParam = searchParams.get("ram");
    const ram = ramParam ? ramParam.split(",").filter(Boolean) : [];

    const storageParam = searchParams.get("storage");
    const storage = storageParam ? storageParam.split(",").filter(Boolean) : [];

    const filtered = queryMobileModels({
      brand,
      search,
      ram,
      storage,
      network,
      minPrice,
      maxPrice,
      sortBy,
    });

    // Compute dynamic brand counts
    const brandCounts = POPULAR_BRANDS.map((b) => ({
      ...b,
      count: MOBILE_MODELS.filter(
        (m) => m.brandSlug.toLowerCase() === b.slug.toLowerCase()
      ).length,
    }));

    return NextResponse.json({
      success: true,
      total: filtered.length,
      brands: brandCounts,
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load mobile models" },
      { status: 500 }
    );
  }
}
