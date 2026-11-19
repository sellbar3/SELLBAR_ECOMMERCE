import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      phone,
      type = "order_placed",
      customerName = "Customer",
      orderId = "",
      deviceName = "Device",
      amount = 0,
      technicianName = "Sellbar Field Agent",
      pickupTime = "Today, 3 PM - 6 PM",
      utr = "",
    } = body;

    const cleanPhone = String(phone || "").replace(/\D/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    let messageText = "";

    switch (type) {
      case "order_placed":
        messageText = `🎉 *Sellbar Order Confirmed!*\\n\\nHello *${customerName}*, your refurbished gadget order *#${orderId}* for *${deviceName}* (Total: ₹${Number(amount).toLocaleString("en-IN")}) is successfully confirmed.\\n\\n📍 Live Tracking: https://sellbar.in/track-order?id=${orderId}\\n\\n📞 Helpdesk: +91 77175 17777\\nSellbar Recommerce Pvt Ltd.`;
        break;

      case "technician_assigned":
        messageText = `🛵 *Doorstep Technician Assigned!*\\n\\nHello *${customerName}*, field expert *${technicianName}* is scheduled for your device evaluation (*${deviceName}*) on *${pickupTime}*.\\n\\n✅ Instant Cash Transfer on Spot\\n📍 Live Status: https://sellbar.in/track-order?id=${orderId}\\n\\nSellbar West Champaran Hub.`;
        break;

      case "payment_transferred":
        messageText = `💰 *Cash Payment Transferred!*\\n\\nHello *${customerName}*, payment of *₹${Number(amount).toLocaleString("en-IN")}* for your sell order *#${orderId}* (*${deviceName}*) has been sent to your bank account.\\n\\nBank UTR: *${utr || "SBX" + Date.now().toString().slice(-8)}*\\n\\nThank you for choosing Sellbar Recommerce!`;
        break;

      default:
        messageText = `Hello *${customerName}*, update regarding your Sellbar order *#${orderId}*: ${deviceName}. Check status: https://sellbar.in/track-order`;
        break;
    }

    const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText.replace(/\\n/g, "\n"))}`;

    // If WhatsApp Cloud API credentials are set in environment, send directly
    const waToken = process.env.WHATSAPP_API_TOKEN;
    const waPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (waToken && waPhoneId && formattedPhone) {
      try {
        await fetch(`https://graph.facebook.com/v19.0/${waPhoneId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${waToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: formattedPhone,
            type: "text",
            text: { body: messageText.replace(/\\n/g, "\n") },
          }),
        });
      } catch (err) {
        console.warn("Direct WhatsApp Cloud API call failed, fell back to link:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Notification generated successfully",
      data: {
        recipient: formattedPhone,
        type,
        messageText,
        whatsappDirectUrl: waLink,
      },
    });
  } catch (error) {
    console.error("WhatsApp notification error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to trigger notification" },
      { status: 500 }
    );
  }
}
