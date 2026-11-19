import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import AbandonedCart from "@/models/AbandonedCart";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const cart = await AbandonedCart.findById(id);
    if (!cart) {
      return NextResponse.json({ success: false, message: "Cart not found" }, { status: 404 });
    }

    if (!cart.phone) {
      return NextResponse.json(
        { success: false, message: "Cart does not have a customer phone number" },
        { status: 400 }
      );
    }

    const firstItem = cart.items?.[0]?.title || "Certified Refurbished Gadget";
    const totalAmount = `₹${(cart.total || 0).toLocaleString("en-IN")}`;
    const checkoutUrl = "https://sellbar.in/checkout";
    const customerName = cart.customerName || "Customer";
    const discountCode = cart.recoveryDiscountCode || "RECOVER5";

    const recoveryMessage =
      `👋 Namaste ${customerName}!\n\n` +
      `Aapka cart Sellbar par wait kar raha hai:\n` +
      `📱 *${firstItem}* (${totalAmount})\n\n` +
      `🎁 Special Offer: Complete your order now & get *Extra 5% OFF* using coupon *${discountCode}*.\n\n` +
      `👉 Instant Checkout: ${checkoutUrl}\n\n` +
      `Sellbar Assured: 12 Months Warranty & Free Express Delivery included!`;

    // Attempt automated API trigger
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
    } catch {
      // Ignore
    }

    cart.recoveryCount = (cart.recoveryCount || 0) + 1;
    cart.recoverySentAt = new Date();
    await cart.save();

    const cleanPhone = cart.phone.replace(/\D/g, "");
    const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(recoveryMessage)}`;

    return NextResponse.json({
      success: true,
      message: "Recovery message dispatched successfully",
      automatedSent: sent,
      whatsappWebUrl: waLink,
    });
  } catch (error) {
    console.error("Single cart recovery error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send recovery message" },
      { status: 500 }
    );
  }
}
