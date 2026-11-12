import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { signJwt } from "@/lib/authCrypto";

export async function POST(request) {
  try {
    const body = await request.json();
    let email = "";
    let name = "";
    let picture = "";
    let googleId = "";

    // 1. If Google ID Token credential passed, decode safely
    if (body.credential && typeof body.credential === "string") {
      try {
        const parts = body.credential.split(".");
        if (parts.length >= 2) {
          const payload = JSON.parse(
            Buffer.from(parts[1], "base64").toString("utf-8")
          );
          email = payload.email || "";
          name = payload.name || "";
          picture = payload.picture || "";
          googleId = payload.sub || "";
        }
      } catch (decodeErr) {
        console.warn("[Google Auth] Error decoding credential token:", decodeErr);
      }
    }

    // 2. Fallbacks from direct payload
    if (!email && body.email) email = String(body.email).trim().toLowerCase();
    if (!name && body.name) name = String(body.name).trim();
    if (!picture && body.picture) picture = String(body.picture).trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid Google email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name || cleanEmail.split("@")[0] || "Google User";

    // 3. Connect to database and find or create User
    let dbUser = null;
    try {
      await connectToDatabase();
      dbUser = await User.findOne({ email: cleanEmail });

      if (!dbUser) {
        const randomPass = crypto.randomBytes(16).toString("hex");
        dbUser = await User.create({
          name: cleanName,
          email: cleanEmail,
          password: randomPass,
          role: "customer",
          status: "active",
          isEmailVerified: true,
        });
      }
    } catch (dbErr) {
      console.warn("[Google Auth] DB sync warning:", dbErr.message);
    }

    // 4. Construct user profile object
    const user = {
      id: dbUser?._id ? String(dbUser._id) : `usr_g_${cleanEmail.replace(/[^a-z0-9]/gi, "_")}`,
      name: dbUser?.name || cleanName,
      email: cleanEmail,
      picture: picture || null,
      role: dbUser?.role || "CUSTOMER",
      createdAt: dbUser?.createdAt || new Date().toISOString(),
    };

    // 5. Generate signed JWT token
    const token = signJwt({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      token,
      user,
      message: "Successfully signed in with Google",
    });
  } catch (error) {
    console.error("[Google Auth Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to authenticate with Google" },
      { status: 500 }
    );
  }
}
