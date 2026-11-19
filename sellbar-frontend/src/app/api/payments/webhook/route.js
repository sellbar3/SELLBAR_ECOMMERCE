import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature if secret configured
    if (webhookSecret && signature) {
      const expected = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expected !== signature) {
        console.warn("Unauthorized webhook call: signature mismatch");
        return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody || "{}");
    const eventType = event.event;

    if (eventType === "payment.captured" || eventType === "order.paid") {
      const paymentEntity = event.payload?.payment?.entity || {};
      const rzpOrderId = paymentEntity.order_id || event.payload?.order?.entity?.id;
      const paymentId = paymentEntity.id;
      const internalOrderId = paymentEntity.notes?.orderId;

      await connectToDatabase();
      const db = mongoose.connection.db;

      let filter = null;
      if (internalOrderId && mongoose.Types.ObjectId.isValid(internalOrderId)) {
        filter = { _id: new mongoose.Types.ObjectId(internalOrderId) };
      } else if (rzpOrderId) {
        filter = { razorpayOrderId: rzpOrderId };
      }

      if (filter) {
        await db.collection("orders").updateOne(filter, {
          $set: {
            paymentStatus: "paid",
            orderStatus: "confirmed",
            upiTransactionId: paymentId,
            paidAt: new Date(),
            updatedAt: new Date(),
          },
        });
        console.log(`Webhook successfully updated order to paid: ${JSON.stringify(filter)}`);
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Payment webhook error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
