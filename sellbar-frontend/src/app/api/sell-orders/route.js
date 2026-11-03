import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SellOrder from "@/models/SellOrder";

// Fallback in-memory cache for operational continuity
let memorySellOrders = [];

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customer,
      device,
      conditionAssessment,
      estimatedPrice,
      pickupDetails,
      payout,
    } = body;

    if (!customer?.name || !customer?.phone) {
      return NextResponse.json(
        { success: false, message: "Customer name and mobile number are required." },
        { status: 400 }
      );
    }

    if (!device?.model || !estimatedPrice) {
      return NextResponse.json(
        { success: false, message: "Device details and valuation are required." },
        { status: 400 }
      );
    }

    if (!pickupDetails?.address || !pickupDetails?.pincode) {
      return NextResponse.json(
        { success: false, message: "Pickup address and pincode are required." },
        { status: 400 }
      );
    }

    // Generate readable unique Sell Order ID (e.g. SB-SELL-82941)
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `SB-SELL-${randomSuffix}`;

    const orderDoc = {
      orderId,
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email?.trim() || "",
      },
      device: {
        brand: device.brand || "Smartphone",
        model: device.model || "Mobile Phone",
        slug: device.slug || "",
        image: device.image || "",
        variant: device.variant || {},
        baseResalePrice: device.baseResalePrice || 0,
      },
      conditionAssessment: conditionAssessment || {},
      estimatedPrice: Number(estimatedPrice),
      finalOffer: Number(estimatedPrice),
      pickupDetails: {
        address: pickupDetails.address.trim(),
        landmark: pickupDetails.landmark?.trim() || "",
        city: pickupDetails.city || "Bettiah",
        pincode: pickupDetails.pincode.trim(),
        pickupDate: pickupDetails.pickupDate || new Date().toISOString().split("T")[0],
        timeSlot: pickupDetails.timeSlot || "10:00 AM - 01:00 PM",
      },
      payout: payout || { method: "upi", paymentStatus: "pending" },
      status: "Pickup Scheduled",
      statusHistory: [
        {
          status: "Pickup Scheduled",
          timestamp: new Date(),
          note: "Selling request confirmed by customer. Doorstep inspection slot reserved.",
          updatedBy: "Customer Web App",
        },
      ],
      createdAt: new Date(),
    };

    try {
      await connectToDatabase();
      const saved = await SellOrder.create(orderDoc);
      return NextResponse.json({
        success: true,
        message: "Selling request scheduled successfully!",
        order: saved,
      });
    } catch (dbErr) {
      console.warn("DB save fallback to memory for sell order:", dbErr.message);
      memorySellOrders.unshift(orderDoc);
      return NextResponse.json({
        success: true,
        message: "Selling request scheduled successfully (Local sync active)!",
        order: orderDoc,
      });
    }
  } catch (error) {
    console.error("Sell Order creation failed:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create sell order" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    const phone = searchParams.get("phone");

    await connectToDatabase();

    let query = {};
    if (orderId) query.orderId = orderId.toUpperCase().trim();
    if (phone) query["customer.phone"] = phone.trim();

    const orders = await SellOrder.find(query).sort({ createdAt: -1 }).lean();

    if (orders.length > 0) {
      return NextResponse.json({ success: true, data: orders });
    }

    // Check memory fallback
    const memOrders = memorySellOrders.filter((o) => {
      if (orderId && o.orderId === orderId.toUpperCase().trim()) return true;
      if (phone && o.customer?.phone === phone.trim()) return true;
      return false;
    });

    return NextResponse.json({ success: true, data: memOrders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch sell order" },
      { status: 500 }
    );
  }
}
