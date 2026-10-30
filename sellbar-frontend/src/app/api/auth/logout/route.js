import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Expire session cookie
  response.cookies.set({
    name: "sellbar_session",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
