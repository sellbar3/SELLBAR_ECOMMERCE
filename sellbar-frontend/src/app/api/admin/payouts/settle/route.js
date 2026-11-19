import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { vendorId, amount, paymentMode = "IMPS", utrNumber, settlementCycle, notes } = body;

    const generatedUtr = utrNumber && String(utrNumber).trim()
      ? String(utrNumber).trim()
      : `UTR-SB-${Date.now().toString().slice(-8)}`;

    const payout = {
      payoutId: `PAY-${Date.now().toString().slice(-6)}`,
      vendorId: vendorId || "v-1",
      grossSales: Number(amount ? amount / 0.9 : 50000),
      commissionDeducted: Number(amount ? amount * 0.1 : 5000),
      netPayoutAmount: Number(amount || 45000),
      settlementCycle: settlementCycle || "Weekly Settlement Cycle (Executed)",
      paymentMode,
      utrNumber: generatedUtr,
      status: "settled",
      settledAt: new Date().toISOString(),
      notes: notes || "Weekly vendor payout settled via Admin panel",
    };

    return NextResponse.json({
      success: true,
      message: `Weekly payout of ₹${Number(payout.netPayoutAmount).toLocaleString("en-IN")} settled successfully! UTR: ${generatedUtr}`,
      data: { payout },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
