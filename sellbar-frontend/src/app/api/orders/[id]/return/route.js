import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const resolvedParams = await params;
  const orderId = resolvedParams?.id;

  try {
    const body = await request.json().catch(() => ({}));
    const { reason, notes, photos = [] } = body;

    if (!reason) {
      return NextResponse.json(
        { success: false, message: "Reason for replacement/return is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const db = mongoose.connection.db;

    const query = mongoose.Types.ObjectId.isValid(orderId)
      ? { _id: new mongoose.Types.ObjectId(orderId) }
      : { _id: orderId };

    const order = await db.collection("orders").findOne(query);
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const returnRequest = {
      requestId: `RET-${Date.now().toString().slice(-6)}`,
      reason,
      notes: notes || "",
      photos,
      status: "requested",
      requestedAt: new Date(),
    };

    await db.collection("orders").updateOne(query, {
      $set: {
        returnStatus: "replacement_requested",
        returnRequest,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your 7-day replacement request has been raised successfully. Our support team will contact you within 24 hours.",
      data: returnRequest,
    });
  } catch (error) {
    console.error("Return order error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
