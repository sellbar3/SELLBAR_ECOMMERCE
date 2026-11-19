import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // internal database order ID
    } = body;

    if (!razorpay_payment_id) {
      return NextResponse.json(
        { success: false, message: "Payment details missing" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    let isValid = true;

    // Verify cryptographic signature if secret is present
    if (keySecret && razorpay_order_id && razorpay_signature) {
      const generated = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      isValid = generated === razorpay_signature;
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Update order in database if orderId is provided
    if (orderId) {
      await connectToDatabase();
      const db = mongoose.connection.db;
      const query = mongoose.Types.ObjectId.isValid(orderId)
        ? { _id: new mongoose.Types.ObjectId(orderId) }
        : { _id: orderId };

      await db.collection("orders").updateOne(query, {
        $set: {
          paymentStatus: "paid",
          orderStatus: "confirmed",
          paymentMethod: "online",
          upiTransactionId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          paidAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
