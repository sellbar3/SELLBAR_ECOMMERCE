import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import AbandonedCart from "@/models/AbandonedCart";

export async function POST(request) {
  try {
    await connectToDatabase();

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

    // Find carts idle for > 2 hours that haven't received recovery reminder yet
    const eligibleCarts = await AbandonedCart.find({
      $or: [{ status: "abandoned" }, { status: "active", lastActivity: { $lt: twoHoursAgo } }],
      recoveryCount: { $lt: 1 },
      phone: { $exists: true, $ne: "" },
    }).limit(25);

    const results = [];

    for (const cart of eligibleCarts) {
      const firstItem = cart.items?.[0]?.title || "Certified Refurbished Gadget";
      const totalAmount = `₹${(cart.total || 0).toLocaleString("en-IN")}`;
      const checkoutUrl = "https://sellbar.in/checkout";
      const customerName = cart.customerName || "Customer";
      const discountCode = cart.recoveryDiscountCode || "RECOVER5";

      const recoveryMessage =
        `👋 Namaste ${customerName}!\n\n` +
        `Aapka cart Sellbar par wait kar raha hai:\n` +
        `📱 *${firstItem}* (${totalAmount})\n\n` +
        `🎁 Special Offer: Complete your order today & get *Extra 5% OFF* using promo code *${discountCode}*.\n\n` +
        `👉 Complete Purchase: ${checkoutUrl}\n\n` +
        `12-Month Assured Warranty & Fast Doorstep Delivery included!`;

      // Call WhatsApp notification route
      let sent = false;
      try {
        const notifyRes = await fetch("https://sellbar.in/api/notifications/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: cart.phone,
            type: "custom_alert",
            customerName,
            customMessage: recoveryMessage,
          }),
        }).catch(() => null);

        if (notifyRes && notifyRes.ok) {
          sent = true;
        }
      } catch (err) {
        console.warn("Automated WhatsApp send failed:", err);
      }

      // Update cart status
      cart.status = "abandoned";
      cart.recoveryCount = (cart.recoveryCount || 0) + 1;
      cart.recoverySentAt = new Date();
      await cart.save();

      results.push({
        cartId: cart.cartId,
        phone: cart.phone,
        customerName: cart.customerName,
        sent,
        waUrl: `https://wa.me/91${cart.phone.replace(/\D/g, "")}?text=${encodeURIComponent(recoveryMessage)}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${eligibleCarts.length} abandoned carts`,
      recoveredAttempts: results,
    });
  } catch (error) {
    console.error("Abandoned cart cron error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Cron execution failed" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // Allow simple GET trigger as well for crons
  return POST(request);
}
