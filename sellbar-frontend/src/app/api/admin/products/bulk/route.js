import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

// POST /api/admin/products/bulk - Batch import multiple products from CSV/Excel data
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { products } = body;

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { success: false, message: "Products array is empty or not provided" },
        { status: 400 }
      );
    }

    if (products.length > 500) {
      return NextResponse.json(
        { success: false, message: "Maximum 500 products can be imported in a single batch" },
        { status: 400 }
      );
    }

    // Pre-fetch all categories for quick resolution
    const allCategories = await Category.find({}).select("_id name slug").lean();
    const defaultCat = allCategories[0] || null;

    const resolveCategoryId = (catVal) => {
      if (!catVal) return defaultCat?._id;
      const clean = String(catVal).trim().toLowerCase();
      // Match by ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(catVal)) {
        return catVal;
      }
      // Match by slug or name
      const found = allCategories.find(
        (c) => c.slug.toLowerCase() === clean || c.name.toLowerCase() === clean
      );
      return found ? found._id : defaultCat?._id;
    };

    const validDocs = [];
    const skipped = [];

    for (let i = 0; i < products.length; i++) {
      const row = products[i];
      const name = String(row.name || row.Name || row.title || "").trim();
      const rawPrice = row.price !== undefined ? row.price : row.Price;
      const price = Number(rawPrice);

      if (!name || isNaN(price) || price < 0) {
        skipped.push({ row: i + 1, name: name || "Unknown", reason: "Missing name or valid price" });
        continue;
      }

      const rawComparePrice = row.compareAtPrice !== undefined ? row.compareAtPrice : (row.CompareAtPrice || row.mrp || row.MRP);
      const compareAtPrice = rawComparePrice ? Number(rawComparePrice) : Math.round(price * 1.3);

      const rawStock = row.stock !== undefined ? row.stock : (row.Stock || row.quantity || 10);
      const stock = Math.max(0, Number(rawStock) || 10);

      const brand = String(row.brand || row.Brand || "").trim();
      const rawCategory = row.category || row.Category;
      const categoryId = resolveCategoryId(rawCategory);

      const condition = String(row.condition || row.Condition || "Flawless").trim();
      const warranty = String(row.warranty || row.Warranty || "12 Months Doorstep Warranty").trim();
      const badge = String(row.badge || row.Badge || "Lowest Price").trim();
      const status = String(row.status || row.Status || "active").toLowerCase().trim() === "draft" ? "draft" : "active";
      const description = String(row.description || row.Description || `Certified pre-owned ${name}. Passed 32-point inspection with 12 months warranty.`).trim();

      const rawImg = row.imageUrl || row.ImageUrl || row.image || row.Image || "";
      const images = rawImg.trim() ? [{ url: rawImg.trim(), publicId: "", alt: name }] : [];

      const cleanSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      const uniqueSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}${i}`;

      validDocs.push({
        name,
        slug: uniqueSlug,
        brand,
        category: categoryId,
        price,
        compareAtPrice: isNaN(compareAtPrice) ? null : compareAtPrice,
        stock,
        condition,
        warranty,
        badge,
        status,
        description,
        images,
        isFeatured: Boolean(row.isFeatured || row.Featured),
        featuredType: String(row.featuredType || "regular"),
      });
    }

    if (validDocs.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No valid products found in batch. Ensure each row has 'name' and 'price'.",
          skipped,
        },
        { status: 400 }
      );
    }

    // Insert many into MongoDB
    const inserted = await Product.insertMany(validDocs, { ordered: false });

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${inserted.length} products to database.`,
      count: inserted.length,
      skippedCount: skipped.length,
      skipped,
    });
  } catch (err) {
    console.error("Bulk products import error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to import bulk products",
      },
      { status: 500 }
    );
  }
}
