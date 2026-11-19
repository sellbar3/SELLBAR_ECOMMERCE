import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    // Fetch vendor and their orders
    const orders = await db.collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()
      .catch(() => []);

    let totalGrossSales = 0;
    let totalCommissionDeducted = 0;
    let totalVendorEarnings = 0;
    let totalSettled = 0;
    let pendingBalance = 0;

    const commissionRate = 10; // Default 10% platform commission

    const formattedOrders = orders.map((o) => {
      const orderTotal = o.total || o.subtotal || 0;
      const rate = o.commissionRate !== undefined ? o.commissionRate : commissionRate;
      const commission = o.commissionAmount !== undefined ? o.commissionAmount : Math.round((orderTotal * rate) / 100);
      const earnings = o.vendorEarnings !== undefined ? o.vendorEarnings : Math.max(0, orderTotal - commission);
      const isSettled = o.payoutStatus === "settled";

      totalGrossSales += orderTotal;
      totalCommissionDeducted += commission;
      totalVendorEarnings += earnings;

      if (isSettled) {
        totalSettled += earnings;
      } else if (o.orderStatus !== "cancelled") {
        pendingBalance += earnings;
      }

      return {
        _id: String(o._id),
        orderNumber: String(o._id).slice(-8).toUpperCase(),
        createdAt: o.createdAt,
        orderStatus: o.orderStatus || "confirmed",
        paymentMethod: o.paymentMethod || "cod",
        paymentStatus: o.paymentStatus || "pending",
        total: orderTotal,
        commissionRate: rate,
        commissionAmount: commission,
        vendorEarnings: earnings,
        payoutStatus: o.payoutStatus || "pending",
        payoutRef: o.payoutRef || null,
        payoutSettledAt: o.payoutSettledAt || null,
        awbNumber: o.awbNumber || null,
        shippingCarrier: o.shippingCarrier || "Delhivery Surface",
      };
    });

    // Sample settlements ledger
    const settlements = [
      {
        payoutId: "PAY-2026-W45-001",
        settlementCycle: "Weekly Settlement (Nov 01 - Nov 07, 2026)",
        grossSales: 124990,
        commissionDeducted: 12499,
        netPayoutAmount: 112491,
        paymentMode: "IMPS",
        utrNumber: "SBUTR84920194821",
        status: "settled",
        settledAt: "2026-11-08T10:30:00.000Z",
        bankSnapshot: {
          accountHolder: "Sellbar Partner Vendor",
          bankName: "HDFC Bank Ltd",
          accountNumber: "••••••••4819",
          ifscCode: "HDFC0001842",
        },
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalGrossSales,
          totalCommissionDeducted,
          commissionRate,
          totalVendorEarnings,
          totalSettled,
          pendingBalance,
          ordersCount: formattedOrders.length,
          settlementsCount: settlements.length,
        },
        bankDetails: {
          accountHolder: "Sellbar Verified Store",
          accountNumber: "50100492819482",
          ifscCode: "HDFC0001842",
          bankName: "HDFC Bank Ltd, Bettiah Branch",
          branchName: "Bettiah Main Market",
          upiId: "sellbarvendor@okhdfcbank",
          panNumber: "ABCDE1234F",
          isVerified: true,
        },
        orders: formattedOrders,
        settlements,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
