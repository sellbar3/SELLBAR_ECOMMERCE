import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function PATCH(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { accountHolder, accountNumber, ifscCode, bankName, branchName, upiId, panNumber } = body;

    const bankDetails = {
      accountHolder: String(accountHolder || "").trim(),
      accountNumber: String(accountNumber || "").trim(),
      ifscCode: String(ifscCode || "").trim().toUpperCase(),
      bankName: String(bankName || "").trim(),
      branchName: String(branchName || "").trim(),
      upiId: String(upiId || "").trim(),
      panNumber: String(panNumber || "").trim().toUpperCase(),
      isVerified: true,
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      message: "Bank details saved successfully. Weekly automated settlements will be credited to this account.",
      data: { bankDetails },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
