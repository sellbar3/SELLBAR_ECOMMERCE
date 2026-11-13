import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: "Order ID required" }, { status: 400 });
    }

    await connectToDatabase();

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: "cancelled" },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error("[Cancel Order Error]:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
