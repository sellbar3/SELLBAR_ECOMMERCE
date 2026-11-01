import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import cachedProducts from "@/config/products-cache.json";

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
  if (s === "electronics" || s === "audio" || s === "speaker" || s === "speakers")
    return "electronics";
  return s;
}

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || [];
  const endpoint = slugArray.join("/");
  const { searchParams } = new URL(request.url);

  try {
    await connectToDatabase();

    // 1. GET /api/public/categories
    if (endpoint.startsWith("categories")) {
      const categories = await Category.find({ isActive: true })
        .sort({ name: 1 })
        .lean();
      return NextResponse.json({
        success: true,
        data: { categories },
      });
    }

    // 2. GET /api/public/products/featured
    if (endpoint === "products/featured") {
      const type = searchParams.get("type");
      const filter = { status: "active" };
      if (type) {
        filter.featuredType = type;
      } else {
        filter.$or = [{ isFeatured: true }, { featuredType: { $ne: "regular" } }];
      }

      const products = await Product.find(filter)
        .populate("category", "name slug")
        .limit(16)
        .lean();

      return NextResponse.json({
        success: true,
        data: { products },
      });
    }

    // 3. GET /api/public/products/:idOrSlug
    if (endpoint.startsWith("products/")) {
      const rawIdOrSlug = decodeURIComponent(endpoint.replace("products/", "")).trim();
      const idOrSlug = rawIdOrSlug.toLowerCase();

      let product = null;
      if (rawIdOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(rawIdOrSlug)
          .populate("category", "name slug")
          .lean();
      }

      if (!product) {
        product = await Product.findOne({
          $or: [
            { slug: idOrSlug },
            { sku: idOrSlug.toUpperCase() },
            { name: { $regex: new RegExp(`^${idOrSlug}$`, "i") } },
          ],
        })
          .populate("category", "name slug")
          .lean();
      }

      if (!product) {
        // Partial search
        product = await Product.findOne({
          name: { $regex: new RegExp(idOrSlug.replace(/-/g, " "), "i") },
        })
          .populate("category", "name slug")
          .lean();
      }

      if (product) {
        const relatedProducts = await Product.find({
          _id: { $ne: product._id },
          category: product.category?._id || product.category,
          status: "active",
        })
          .populate("category", "name slug")
          .limit(4)
          .lean();

        return NextResponse.json({
          success: true,
          data: { product, relatedProducts },
        });
      }

      // Fallback from cache if not found in DB
      const cached = cachedProducts.find(
        (p) => p._id === rawIdOrSlug || p.slug === idOrSlug
      );
      if (cached) {
        return NextResponse.json({
          success: true,
          data: { product: cached, relatedProducts: [] },
        });
      }

      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // 4. GET /api/public/products (List with filters)
    const categoryQuery = searchParams.get("category");
    const brand = searchParams.get("brand");
    const featuredType = searchParams.get("featuredType");
    const isFeatured = searchParams.get("isFeatured");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));

    const filter = { status: "active" };

    if (categoryQuery) {
      const targetCat = normalizeCategory(categoryQuery);
      // Find category in DB by slug or name
      const matchedCats = await Category.find({
        $or: [
          { slug: targetCat },
          { slug: { $regex: targetCat, $options: "i" } },
          { name: { $regex: targetCat, $options: "i" } },
        ],
      }).select("_id");

      if (matchedCats.length > 0) {
        filter.category = { $in: matchedCats.map((c) => c._id) };
      } else if (targetCat.match(/^[0-9a-fA-F]{24}$/)) {
        filter.category = targetCat;
      }
    }

    if (brand) {
      filter.brand = { $regex: brand.trim(), $options: "i" };
    }

    if (featuredType) {
      filter.featuredType = featuredType;
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      filter.isFeatured = isFeatured === "true" || isFeatured === "1";
    }

    if (search) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortObj = { createdAt: -1 };
    if (sort === "price-asc") sortObj = { price: 1 };
    else if (sort === "price-desc") sortObj = { price: -1 };
    else if (sort === "rating") sortObj = { rating: -1 };
    else if (sort === "popular") sortObj = { reviewsCount: -1 };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort(sortObj)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit) || 1,
        },
      },
    });
  } catch (dbErr) {
    console.warn("Direct DB fetch fallback to cache:", dbErr?.message);

    // Fallback to static cache if DB encounters an issue
    let list = Array.isArray(cachedProducts) ? [...cachedProducts] : [];
    const category = searchParams.get("category");
    if (category) {
      const targetCat = normalizeCategory(category);
      list = list.filter((p) => {
        const pCat = (
          typeof p.category === "object"
            ? p.category?.slug || p.category?.name
            : p.category || ""
        ).toLowerCase();
        return pCat.includes(targetCat) || targetCat.includes(pCat);
      });
    }

    const total = list.length;
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));

    return NextResponse.json({
      success: true,
      data: {
        products: list.slice((page - 1) * limit, page * limit),
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit) || 1,
        },
      },
    });
  }
}
