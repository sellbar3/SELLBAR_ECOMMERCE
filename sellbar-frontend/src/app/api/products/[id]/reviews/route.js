import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.id;

  try {
    const body = await request.json().catch(() => ({}));
    const { name, rating, title, comment, photos = [], verified = true } = body;

    const numRating = Number(rating);
    if (!name || !comment || !numRating || numRating < 1 || numRating > 5) {
      return NextResponse.json(
        { success: false, message: "Name, rating (1-5), and review text are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const db = mongoose.connection.db;

    const newReview = {
      _id: new mongoose.Types.ObjectId(),
      userName: String(name).trim(),
      rating: numRating,
      title: String(title || "").trim() || `${numRating} Star Review`,
      comment: String(comment).trim(),
      photos: Array.isArray(photos) ? photos.filter(Boolean) : [],
      verifiedPurchase: Boolean(verified),
      createdAt: new Date(),
    };

    let query = null;
    if (mongoose.Types.ObjectId.isValid(productId)) {
      query = { _id: new mongoose.Types.ObjectId(productId) };
    } else {
      query = { slug: productId };
    }

    // Append to product reviews
    const result = await db.collection("products").updateOne(query, {
      $push: { reviews: newReview },
      $inc: { reviewCount: 1 },
      $set: { updatedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your verified product review has been submitted.",
      data: newReview,
    });
  } catch (error) {
    console.error("Product review submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit review" },
      { status: 500 }
    );
  }
}
