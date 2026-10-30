import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const phone = String(body.phone || "").trim();
    const code = String(body.code || "").trim();
    const name = body.name ? String(body.name).trim() : "";

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Valid 10-digit phone number is required." },
        { status: 400 }
      );
    }

    if (!code || code !== "123456") {
      return NextResponse.json(
        { success: false, message: "Invalid or expired OTP. Please use 123456." },
        { status: 400 }
      );
    }

    // Build user object
    const user = {
      id: `usr_${phone.slice(-6)}`,
      name: name || `User ${phone.slice(-4)}`,
      phone: phone,
      email: `${phone}@sellbar.in`,
      role: "CUSTOMER",
      createdAt: new Date().toISOString(),
    };

    // Simple signed-like JWT structure for client / backend compatibility
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64");
    const payload = Buffer.from(
      JSON.stringify({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
      })
    ).toString("base64");
    const signature = Buffer.from("sellbar_verified_signature").toString("base64");
    const token = `${header}.${payload}.${signature}`;

    const sessionData = {
      token,
      user,
    };

    const response = NextResponse.json({
      success: true,
      message: "Successfully logged in",
      user,
      token,
    });

    // Set HTTP cookie so Next.js server components & API routes can read it
    response.cookies.set({
      name: "sellbar_session",
      value: encodeURIComponent(JSON.stringify(sessionData)),
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Verification failed." },
      { status: 500 }
    );
  }
}
