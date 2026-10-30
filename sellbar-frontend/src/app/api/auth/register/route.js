import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const password = String(body.password || "").trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = {
      id: `usr_${Date.now()}`,
      name: name || "Customer",
      email: email,
      phone: phone || "9876543210",
      role: "CUSTOMER",
    };

    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64");
    const payload = Buffer.from(
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      })
    ).toString("base64");
    const token = `${header}.${payload}.sellbar_token`;

    const sessionData = { token, user };

    const response = NextResponse.json({
      success: true,
      message: "Registration successful",
      user,
      token,
    });

    response.cookies.set({
      name: "sellbar_session",
      value: encodeURIComponent(JSON.stringify(sessionData)),
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
