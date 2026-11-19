import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

// Barcode SVG generator
function generateBarcodeSVG(text, { width = 280, height = 65 } = {}) {
  const patterns = {
    '0': "11011001100", '1': "11001101100", '2': "11001100110", '3': "10010011000",
    '4': "10010001100", '5': "10001001100", '6': "10011001000", '7': "10011000100",
    '8': "10001100100", '9': "11001001000", 'A': "10110011100", 'B': "10011011100",
    'C': "10011001110", 'D': "10111001100", 'E': "10011101100", 'F': "10011100110",
    'G': "11001110010", 'H': "11001011100", 'I': "11001001110", 'J': "11011100100",
    'K': "11001110100", 'L': "11101101110", 'M': "11101001100", 'N': "11100101100",
    'O': "11100100110", 'P': "11101100100", 'Q': "11100110100", 'R': "11100110010",
    'S': "11011011000", 'T': "11011000110", 'U': "11000110110", 'V': "10100011000",
    'W': "10001011000", 'X': "10001000110", 'Y': "10110001000", 'Z': "10001101000",
    '-': "10000110110", '.': "10110010000", ' ': "11011001100"
  };

  const startPattern = "11010010000";
  const stopPattern = "1100011101011";

  const clean = String(text || "").toUpperCase().replace(/[^A-Z0-9-.]/g, "");
  let bitString = startPattern;
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    bitString += patterns[ch] || "11011001100";
  }
  bitString += stopPattern;

  const barWidth = width / bitString.length;
  let rects = "";
  for (let i = 0; i < bitString.length; i++) {
    if (bitString[i] === "1") {
      const x = (i * barWidth).toFixed(1);
      rects += `<rect x="${x}" y="0" width="${barWidth.toFixed(1)}" height="${height - 18}" fill="#000000"/>`;
    }
  }

  const textElement = `<text x="${width / 2}" y="${height - 3}" font-family="monospace, monospace" font-size="12" font-weight="700" text-anchor="middle" fill="#000000" letter-spacing="2">${clean}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#ffffff"/>${rects}${textElement}</svg>`;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { orderId, courierPreference = "delhivery", weight = 0.5 } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, message: "orderId is required" }, { status: 400 });
    }

    await connectToDatabase();
    const db = mongoose.connection.db;

    let order = null;
    if (mongoose.Types.ObjectId.isValid(orderId)) {
      order = await db.collection("orders").findOne({ _id: new mongoose.Types.ObjectId(orderId) });
    }

    const timestampPart = Date.now().toString().slice(-6);
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const isLocal = order?.shippingAddress?.postalCode?.startsWith("845");

    let awbNumber = "";
    let partnerName = "";
    let trackingUrl = "";

    if (courierPreference === "shiprocket") {
      awbNumber = `SR${timestampPart}${randomDigits}IN`;
      partnerName = "Shiprocket Express";
      trackingUrl = `https://shiprocket.co/tracking/${awbNumber}`;
    } else if (isLocal && courierPreference === "sellbar_local") {
      awbNumber = `SBEX${order?.shippingAddress?.postalCode || "845438"}${randomDigits}`;
      partnerName = "Sellbar Local Fleet (Bettiah Hub)";
      trackingUrl = `https://sellbar.in/track-order?awb=${awbNumber}`;
    } else {
      // Default Pan-India Delhivery
      awbNumber = `DEL${timestampPart}${randomDigits}IN`;
      partnerName = "Delhivery Surface";
      trackingUrl = `https://www.delhivery.com/track/package/${awbNumber}`;
    }

    const destPin = order?.shippingAddress?.postalCode || "845438";
    const routingCode = `DEL-PAT-${destPin.slice(0, 3)}-${destPin}`;
    const labelUrl = `/api/shipping/label/${orderId}`;

    if (order) {
      await db.collection("orders").updateOne(
        { _id: order._id },
        {
          $set: {
            awbNumber,
            shippingCarrier: partnerName,
            shippingLabelUrl: labelUrl,
            courierTrackingUrl: trackingUrl,
            shippingStatus: "awb_assigned",
            orderStatus: order.orderStatus === "pending" ? "confirmed" : order.orderStatus,
            updatedAt: new Date(),
          },
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: `AWB ${awbNumber} successfully generated via ${partnerName}!`,
      data: {
        orderId,
        awbNumber,
        courierPartner: partnerName,
        trackingUrl,
        shippingLabelUrl: labelUrl,
        routingCode,
        shippingStatus: "awb_assigned",
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
