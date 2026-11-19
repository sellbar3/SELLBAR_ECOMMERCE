import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { amount, currency = "INR", receipt = `rcpt_${Date.now()}`, notes = {} } = body;

    const amountInPaise = Math.round(Number(amount || 0) * 100);
    if (!amountInPaise || amountInPaise <= 0) {
      return NextResponse.json(
        { success: false, message: "Valid amount is required" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_sellbarDemoKey";
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If live credentials are provided in env, make real call to Razorpay
    if (keySecret && !keyId.includes("DemoKey")) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt,
          notes,
        }),
      });

      const rzpData = await rzpRes.json();
      if (!rzpRes.ok) {
        throw new Error(rzpData.error?.description || "Razorpay API error");
      }

      return NextResponse.json({
        success: true,
        orderId: rzpData.id,
        amount: rzpData.amount,
        currency: rzpData.currency,
        key: keyId,
      });
    }

    // High-fidelity fallback / sandbox order for immediate live testing
    const mockOrderId = `order_${crypto.randomBytes(8).toString("hex")}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: amountInPaise,
      currency,
      key: keyId,
      isSandbox: true,
      message: "Order initialized in sandbox mode",
    });
  } catch (error) {
    console.error("Razorpay create-order error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
