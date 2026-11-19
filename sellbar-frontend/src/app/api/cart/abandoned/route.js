import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import AbandonedCart from "@/models/AbandonedCart";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      cartId,
      phone,
      email,
      customerName,
      items,
      total,
      subtotal,
      shippingAddress,
      action,
    } = body;

    await connectToDatabase();

    // If order was completed, mark the cart as recovered
    if (action === "recovered") {
      const query = cartId ? { cartId } : phone ? { phone } : null;
      if (query) {
        await AbandonedCart.updateMany(query, {
          $set: {
            status: "recovered",
            recoveredAt: new Date(),
          },
        });
      }
      return NextResponse.json({ success: true, message: "Cart marked as recovered" });
    }

    if (!phone && !email && !cartId) {
      return NextResponse.json(
        { success: false, message: "Missing identifier (phone, email, or cartId)" },
        { status: 400 }
      );
    }

    // Upsert or update existing cart session
    const filter = cartId ? { cartId } : phone ? { phone, status: { $ne: "recovered" } } : { email };

    const updateDoc = {
      $set: {
        customerName: customerName || "Valued Customer",
        phone: phone || "",
        email: email || "",
        items: items || [],
        total: Number(total) || 0,
        subtotal: Number(subtotal) || 0,
        shippingAddress: shippingAddress || {},
        lastActivity: new Date(),
      },
      $setOnInsert: {
        cartId: cartId || `CART-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        status: "active",
        recoveryDiscountCode: "RECOVER5",
        recoveryCount: 0,
      },
    };

    const cart = await AbandonedCart.findOneAndUpdate(filter, updateDoc, {
      upsert: true,
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Cart activity tracked successfully",
      cartId: cart.cartId,
    });
  } catch (error) {
    console.error("Abandoned cart tracking error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to track cart" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();

    // Mark any active carts older than 2 hours as 'abandoned'
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    await AbandonedCart.updateMany(
      { status: "active", lastActivity: { $lt: twoHoursAgo } },
      { $set: { status: "abandoned" } }
    );

    const carts = await AbandonedCart.find({})
      .sort({ lastActivity: -1 })
      .limit(100)
      .lean();

    const stats = {
      totalTracked: carts.length,
      abandonedCount: carts.filter((c) => c.status === "abandoned").length,
      activeCount: carts.filter((c) => c.status === "active").length,
      recoveredCount: carts.filter((c) => c.status === "recovered").length,
      totalLostRevenue: carts
        .filter((c) => c.status === "abandoned")
        .reduce((sum, c) => sum + (c.total || 0), 0),
      recoveredRevenue: carts
        .filter((c) => c.status === "recovered")
        .reduce((sum, c) => sum + (c.total || 0), 0),
    };

    stats.recoveryRate =
      stats.abandonedCount + stats.recoveredCount > 0
        ? Math.round(
            (stats.recoveredCount /
              (stats.abandonedCount + stats.recoveredCount)) *
              100
          )
        : 0;

    return NextResponse.json({
      success: true,
      stats,
      carts,
    });
  } catch (error) {
    console.error("Fetch abandoned carts error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch carts" },
      { status: 500 }
    );
  }
}
