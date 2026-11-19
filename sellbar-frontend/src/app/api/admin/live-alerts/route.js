import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";
import SellOrder from "@/models/SellOrder";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sinceParam = searchParams.get("since");
    const sinceDate = sinceParam ? new Date(Number(sinceParam)) : new Date(Date.now() - 35000);

    await connectToDatabase();
    const db = mongoose.connection.db;

    // Check both Collections: orders (E-commerce store purchase) and sellorders (Sell old device / buyback)
    const [recentOrders, recentSellOrders] = await Promise.all([
      db.collection("orders")
        .find({ createdAt: { $gt: sinceDate } })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray()
        .catch(() => []),
      SellOrder.find({ createdAt: { $gt: sinceDate } })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
        .catch(() => []),
    ]);

    const formattedPurchase = (recentOrders || []).map((o) => ({
      type: "purchase_order",
      id: String(o._id),
      orderNumber: `ORD-${String(o._id).slice(-6).toUpperCase()}`,
      customer: o.shippingAddress?.fullName || "Valued Customer",
      total: o.total || o.subtotal || 0,
      paymentMethod: o.paymentMethod || "COD",
      itemsCount: (o.items || []).length || 1,
      createdAt: o.createdAt,
    }));

    const formattedSell = (recentSellOrders || []).map((so) => ({
      type: "sell_device_order",
      id: String(so._id),
      orderNumber: so.orderId || `SB-SELL-${String(so._id).slice(-5)}`,
      customer: so.customer?.name || "Customer",
      device: `${so.device?.brand || ""} ${so.device?.model || "Device"}`.trim(),
      estimatedPrice: so.finalOffer || so.estimatedPrice || 0,
      city: so.pickupDetails?.city || "West Champaran",
      createdAt: so.createdAt,
    }));

    const totalNew = formattedPurchase.length + formattedSell.length;

    return NextResponse.json({
      success: true,
      data: {
        hasNew: totalNew > 0,
        totalNew,
        serverTime: Date.now(),
        purchaseOrders: formattedPurchase,
        sellOrders: formattedSell,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch live alerts" },
      { status: 500 }
    );
  }
}
