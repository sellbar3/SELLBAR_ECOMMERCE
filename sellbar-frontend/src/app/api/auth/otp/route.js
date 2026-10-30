import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const phone = String(body.phone || "").trim();

    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    // Default development / test OTP
    const debugOtp = "123456";

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to +91 ${phone}`,
      debugOtp,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}
