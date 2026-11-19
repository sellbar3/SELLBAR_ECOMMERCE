import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

// Code 128 SVG Barcode generator
function generateBarcodeSVG(text, { width = 320, height = 70 } = {}) {
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

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const orderId = resolvedParams?.id;

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    let order = null;
    if (mongoose.Types.ObjectId.isValid(orderId)) {
      order = await db.collection("orders").findOne({ _id: new mongoose.Types.ObjectId(orderId) });
    }

    // Fallback sample order if previewing with custom ID
    if (!order) {
      order = {
        _id: orderId || "ORD-DEMO-9842",
        awbNumber: `DEL${Date.now().toString().slice(-9)}IN`,
        shippingCarrier: "Delhivery Surface",
        total: 34999,
        paymentMethod: "cod",
        shippingAddress: {
          fullName: "Valued Customer",
          phone: "9876543210",
          addressLine1: "Main Road, Near Gandhi Chowk",
          city: "Bettiah",
          state: "Bihar",
          postalCode: "845438",
        },
        items: [{ productName: "Apple iPhone 14 (128GB)", sku: "IP14-128-MID", quantity: 1, lineTotal: 34999 }],
      };
    }

    const awb = order.awbNumber || `DEL${Date.now().toString().slice(-9)}IN`;
    const barcodeSVG = generateBarcodeSVG(awb, { width: 330, height: 75 });
    const isCod = order.paymentMethod === "cod";
    const dest = order.shippingAddress || {};

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shipping Label - ${awb}</title>
  <style>
    @page { size: 4in 6in; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
    body { background: #f8fafc; display: flex; flex-direction: column; align-items: center; padding: 24px 10px; }
    .action-bar { margin-bottom: 16px; text-align: center; }
    .print-btn { background: #DC2564; color: #fff; border: none; padding: 9px 20px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .print-btn:hover { background: #b01c4e; }
    .label-box { width: 384px; background: #fff; border: 2.5px solid #000; padding: 14px; color: #000; }
    .head { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; padding-bottom: 6px; }
    .brand { font-size: 20px; font-weight: 900; letter-spacing: -0.5px; }
    .sub { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #334155; }
    .carrier { font-size: 11px; font-weight: 800; text-align: right; }
    .barcode { text-align: center; padding: 8px 0; border-bottom: 2px solid #000; }
    .routing { display: flex; justify-content: space-between; font-size: 11px; font-weight: 800; padding: 5px 0; border-bottom: 2px solid #000; background: #f8fafc; }
    .pay-box { margin: 8px 0; padding: 8px; border: 2px solid #000; text-align: center; background: ${isCod ? "#fef3c7" : "#ecfdf5"}; }
    .pay-type { font-size: 13px; font-weight: 900; }
    .pay-amt { font-size: 17px; font-weight: 900; }
    .addr { padding: 6px 0; border-bottom: 1px dashed #000; font-size: 11px; line-height: 1.4; }
    .addr-title { font-size: 9px; font-weight: 800; text-transform: uppercase; color: #475569; }
    .cust-name { font-size: 13px; font-weight: 800; margin-top: 1px; }
    .items { width: 100%; font-size: 10px; margin-top: 6px; border-collapse: collapse; }
    .items th, .items td { padding: 3px; border-bottom: 1px solid #cbd5e1; text-align: left; }
    .footer { font-size: 9px; margin-top: 8px; color: #334155; line-height: 1.3; }
    @media print {
      body { background: transparent; padding: 0; }
      .action-bar { display: none; }
      .label-box { width: 100%; max-width: 4in; border: 2px solid #000; }
    }
  </style>
</head>
<body>
  <div class="action-bar">
    <button class="print-btn" onclick="window.print()">🖨️ Print Label / Save PDF</button>
  </div>

  <div class="label-box">
    <div class="head">
      <div>
        <div class="brand">SELLBAR</div>
        <div class="sub">Certified Refurbished Recommerce</div>
      </div>
      <div class="carrier">
        <div>${order.shippingCarrier || "Delhivery Surface"}</div>
        <div style="font-size: 8px; font-weight: 600; color: #475569;">Pan-India Priority Express</div>
      </div>
    </div>

    <div class="barcode">
      ${barcodeSVG}
    </div>

    <div class="routing">
      <div>ROUTING: DEL-PAT-${dest.postalCode || "845438"}</div>
      <div>WT: 0.55 KG</div>
    </div>

    <div class="pay-box">
      <div class="pay-type">
        ${isCod ? "⚠️ CASH ON DELIVERY (COD)" : "✓ PREPAID ORDER - DO NOT COLLECT CASH"}
      </div>
      <div class="pay-amt">
        ${isCod ? `COLLECT: ₹${Number(order.total || 0).toLocaleString("en-IN")}` : `₹${Number(order.total || 0).toLocaleString("en-IN")} PAID ONLINE`}
      </div>
    </div>

    <div class="addr">
      <div class="addr-title">SHIP TO (DELIVERY ADDRESS):</div>
      <div class="cust-name">${dest.fullName || "Customer"}</div>
      <div>${dest.addressLine1 || ""}${dest.addressLine2 ? `, ${dest.addressLine2}` : ""}</div>
      <div>${dest.city || ""}, ${dest.state || "Bihar"} - <strong>${dest.postalCode || "845438"}</strong></div>
      <div style="font-weight: 700; margin-top: 2px;">Phone: +91 ${dest.phone || ""}</div>
    </div>

    <table class="items">
      <thead>
        <tr><th>Product Description</th><th>Qty</th><th>Value</th></tr>
      </thead>
      <tbody>
        ${(order.items || []).slice(0, 3).map((it) => `
          <tr>
            <td><strong>${it.productName || "Certified Gadget"}</strong></td>
            <td>${it.quantity || 1}</td>
            <td>₹${Number(it.lineTotal || it.price || 0).toLocaleString("en-IN")}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div><strong>Shipped From:</strong> Sellbar Logistics &amp; Certified Vendor Center</div>
      <div>Bettiah Central Depot, West Champaran, Bihar - 845438 • Support: support@sellbar.in</div>
      <div style="margin-top: 4px; font-size: 8px; color: #64748b;">
        Order #${String(order._id || "").slice(-8).toUpperCase()} • AWB: ${awb} • Standard Pan-India Dispatch
      </div>
    </div>
  </div>
</body>
</html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    return new Response(`<h3>Error generating shipping label: ${error.message}</h3>`, {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}
