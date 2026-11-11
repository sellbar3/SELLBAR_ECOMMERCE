import { NextResponse } from "next/server";
import { verifyJwtSession } from "@/lib/authCrypto";

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
        // Fall through
      }
    }

    if (!user && bearerToken) {
      const decoded = verifyJwtSession(bearerToken);
      if (decoded) {
        user = {
          id: decoded.id || decoded.sub,
          name: decoded.name || "Sellbar User",
          email: decoded.email,
          phone: decoded.phone,
          role: decoded.role || "customer",
        };
      }
    }

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
