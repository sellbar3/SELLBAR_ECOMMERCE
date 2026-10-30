import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Check cookies for session
    const sessionCookie = request.cookies.get("sellbar_session");
    
    // 2. Check Authorization header
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    let user = null;

    if (sessionCookie?.value) {
      try {
        const parsed = JSON.parse(decodeURIComponent(sessionCookie.value));
        user = parsed.user || parsed;
      } catch {
        // If not JSON, it might be raw token
      }
    }

    if (!user && bearerToken) {
      try {
        const parts = bearerToken.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            Buffer.from(parts[1], "base64").toString("utf-8")
          );
          user = {
            id: payload.id || payload.sub,
            name: payload.name || "Sellbar User",
            email: payload.email,
            phone: payload.phone,
            role: payload.role || "CUSTOMER",
          };
        }
      } catch {
        // invalid token
      }
    }

    // Always return HTTP 200 (never 404)
    if (user) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        user,
      });
    }

    return NextResponse.json({
      success: false,
      authenticated: false,
      user: null,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, authenticated: false, user: null, message: error.message },
      { status: 200 }
    );
  }
}
