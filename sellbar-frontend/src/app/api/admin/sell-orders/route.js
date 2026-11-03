import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SellOrder from "@/models/SellOrder";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase().trim();

    await connectToDatabase();

    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    let orders = await SellOrder.find(query).sort({ createdAt: -1 }).lean();

    // If database has few or none, supply mock initial orders for admin preview
    if (!orders || orders.length === 0) {
      orders = [
        {
          orderId: "SB-SELL-89421",
          customer: { name: "Aman Verma", phone: "9876543210", email: "aman@example.com" },
          device: {
            brand: "Apple",
            model: "Apple iPhone 14",
            variant: { ram: "6GB", storage: "128GB", color: "Midnight" },
            baseResalePrice: 36000,
          },
          conditionAssessment: {
            functional: "flawless",
            screen: "flawless",
            body: "minor-scratches",
            battery: "healthy",
            accessories: ["box", "charger"],
          },
          estimatedPrice: 34500,
          finalOffer: 34500,
          pickupDetails: {
            address: "House 24, Supriya Chowk, Bettiah",
            pincode: "845438",
            pickupDate: "2026-11-04",
            timeSlot: "10:00 AM - 01:00 PM",
          },
          payout: { method: "upi", upiId: "aman@okaxis", paymentStatus: "pending" },
          status: "Pickup Scheduled",
          createdAt: new Date(),
        },
        {
          orderId: "SB-SELL-89420",
          customer: { name: "Priya Sundaram", phone: "9812345678", email: "priya@example.com" },
          device: {
            brand: "Samsung",
            model: "Samsung Galaxy S23 5G",
            variant: { ram: "8GB", storage: "256GB", color: "Phantom Black" },
            baseResalePrice: 33000,
          },
          conditionAssessment: {
            functional: "flawless",
            screen: "minor-scratches",
            body: "flawless",
            battery: "healthy",
            accessories: ["box"],
          },
          estimatedPrice: 31000,
          finalOffer: 31000,
          pickupDetails: {
            address: "Main Market, Bagaha",
            pincode: "845101",
            pickupDate: "2026-11-03",
            timeSlot: "02:00 PM - 05:00 PM",
          },
          payout: { method: "upi", upiId: "priya@paytm", paymentStatus: "completed" },
          status: "Completed",
          createdAt: new Date(Date.now() - 86400000),
        },
      ];
    }

    if (search) {
      orders = orders.filter(
        (o) =>
          o.orderId.toLowerCase().includes(search) ||
          o.customer?.name.toLowerCase().includes(search) ||
          o.customer?.phone.includes(search) ||
          o.device?.model.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      total: orders.length,
      data: orders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load sell orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { orderId, status, finalOffer, note, updatedBy } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const order = await SellOrder.findOne({ orderId });
    if (!order) {
      return NextResponse.json(
        { success: false, message: `Sell order ${orderId} not found.` },
        { status: 404 }
      );
    }

    if (status) {
      order.status = status;
      order.statusHistory.push({
        status,
        timestamp: new Date(),
        note: note || `Status updated to ${status}`,
        updatedBy: updatedBy || "Admin",
      });
    }

    if (finalOffer !== undefined && !isNaN(finalOffer)) {
      order.finalOffer = Number(finalOffer);
    }

    await order.save();

    return NextResponse.json({
      success: true,
      message: `Sell order ${orderId} successfully updated.`,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sell order" },
      { status: 500 }
    );
  }
}
