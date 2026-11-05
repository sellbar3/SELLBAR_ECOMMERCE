import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

// GET /api/admin/products - List all products for Admin Dashboard
export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim();
    const status = searchParams.get("status")?.trim();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(200, Math.max(1, Number(searchParams.get("limit")) || 100));

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    // Also fetch categories so admin can filter or assign categories
    const categories = await Category.find({ isActive: true }).select("_id name slug").lean();

    return NextResponse.json({
      success: true,
      data: {
        products,
        categories,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit) || 1,
        },
      },
    });
  } catch (err) {
    console.error("Admin products GET error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - Create a new product in MongoDB
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const {
      name,
      price,
      compareAtPrice,
      stock,
      category,
      brand,
      description,
      status,
      badge,
      condition,
      warranty,
      isFeatured,
      featuredType,
      images,
    } = body;

    if (!name || price === undefined || price === null) {
      return NextResponse.json(
        { success: false, message: "Product name and price are required" },
        { status: 400 }
      );
    }

    // Resolve category ObjectId
    let categoryId = category;
    if (!categoryId || !categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      // Find category by slug or name, or default to first category
      const foundCat = await Category.findOne({
        $or: [
          { slug: String(category || "mobile-phones").toLowerCase() },
          { name: { $regex: String(category || "Mobile"), $options: "i" } },
        ],
      });
      if (foundCat) {
        categoryId = foundCat._id;
      } else {
        const firstCat = await Category.findOne({});
        categoryId = firstCat?._id;
      }
    }

    // Generate slug
    const cleanSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const uniqueSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;

    // Format images
    let formattedImages = [];
    if (Array.isArray(images) && images.length > 0) {
      formattedImages = images.map((img) =>
        typeof img === "string" ? { url: img, publicId: "", alt: name } : img
      );
    } else if (typeof body.imageUrl === "string" && body.imageUrl.trim()) {
      formattedImages = [{ url: body.imageUrl.trim(), publicId: "", alt: name }];
    } else {
      const catSlug = String(category || "").toLowerCase();
      let fallbackUrl = "/products/iphone-14.webp";
      if (catSlug.includes("laptop")) fallbackUrl = "/sellbar/laptop-macbook-pro-m3.webp";
      else if (catSlug.includes("watch")) fallbackUrl = "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80";
      else if (catSlug.includes("tablet")) fallbackUrl = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80";
      else if (catSlug.includes("gaming")) fallbackUrl = "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80";
      else if (catSlug.includes("camera")) fallbackUrl = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80";
      else if (catSlug.includes("access")) fallbackUrl = "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80";

      formattedImages = [
        { url: fallbackUrl, publicId: "", alt: name },
      ];
    }

    const newProduct = await Product.create({
      name: name.trim(),
      slug: uniqueSlug,
      description: description || `${name} - Certified Refurbished with Doorstep Warranty`,
      category: categoryId,
      brand: brand?.trim() || "Sellbar Certified",
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
      stock: stock !== undefined ? Number(stock) : 10,
      status: status || "active",
      badge: badge || "Lowest Price",
      condition: condition || "Flawless",
      warranty: warranty || "12 Months Doorstep Warranty",
      isFeatured: Boolean(isFeatured),
      featuredType: featuredType || "regular",
      images: formattedImages,
      rating: 4.8,
      reviewsCount: 12,
    });

    const populated = await Product.findById(newProduct._id)
      .populate("category", "name slug")
      .lean();

    return NextResponse.json({
      success: true,
      message: "Product added successfully to database",
      data: { product: populated },
    });
  } catch (err) {
    console.error("Admin products POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/products - Update product details or status
export async function PATCH(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const id = body.id || body._id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.price !== undefined) updateData.price = Number(body.price);
    if (body.compareAtPrice !== undefined)
      updateData.compareAtPrice = body.compareAtPrice ? Number(body.compareAtPrice) : null;
    if (body.stock !== undefined) updateData.stock = Number(body.stock);
    if (body.status !== undefined) updateData.status = body.status;
    if (body.brand !== undefined) updateData.brand = body.brand.trim();
    if (body.description !== undefined) updateData.description = body.description;
    if (body.condition !== undefined) updateData.condition = body.condition;
    if (body.warranty !== undefined) updateData.warranty = body.warranty;
    if (body.badge !== undefined) updateData.badge = body.badge;
    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.featuredType !== undefined) updateData.featuredType = body.featuredType;

    if (body.category && body.category.match(/^[0-9a-fA-F]{24}$/)) {
      updateData.category = body.category;
    }

    if (body.imageUrl) {
      updateData.images = [{ url: body.imageUrl.trim(), publicId: "", alt: body.name || "" }];
    } else if (Array.isArray(body.images)) {
      updateData.images = body.images;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true })
      .populate("category", "name slug")
      .lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: { product: updated },
    });
  } catch (err) {
    console.error("Admin products PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products - Delete product from database
export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id || body._id;
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully from database",
    });
  } catch (err) {
    console.error("Admin products DELETE error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
