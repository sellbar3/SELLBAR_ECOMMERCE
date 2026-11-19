import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    let order = null;
    let awb = id;

    if (mongoose.Types.ObjectId.isValid(id)) {
      order = await db.collection("orders").findOne({ _id: new mongoose.Types.ObjectId(id) });
      if (order?.awbNumber) {
        awb = order.awbNumber;
      }
    }

    const isShiprocket = awb.startsWith("SR");
    const isDelhivery = awb.startsWith("DEL");
    const partner = isShiprocket
      ? "Shiprocket Express"
      : isDelhivery
      ? "Delhivery Surface"
      : "Sellbar Local Fleet";

    const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

    return NextResponse.json({
      success: true,
      data: {
        awbNumber: awb,
        courierPartner: partner,
        status: order?.orderStatus === "delivered" ? "Delivered" : "In Transit",
        currentLocation: "Patna Central Sorting Hub, Bihar",
        expectedDelivery: new Date(Date.now() + 48 * 3600 * 1000).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        origin: "Bettiah, West Champaran, Bihar",
        milestones: [
          { status: "Manifest Generated & Packed", location: "Bettiah Central Hub", timestamp: hoursAgo(24), done: true },
          { status: "Picked Up by Courier Partner", location: "Bettiah Depot", timestamp: hoursAgo(18), done: true },
          { status: "Arrived at Transshipment Center", location: "Patna Sorting Hub", timestamp: hoursAgo(6), done: true },
          { status: "In Transit to Local Delivery Unit", location: "Destination Regional Hub", timestamp: hoursAgo(1), done: true },
          { status: "Out for Delivery", location: "Local Hub", timestamp: "Pending", done: false },
          { status: "Delivered to Customer", location: "Doorstep", timestamp: "Pending", done: false },
        ],
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
