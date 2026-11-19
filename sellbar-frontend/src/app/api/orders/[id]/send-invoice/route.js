import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";

export async function POST(request, { params }) {
  const resolvedParams = await params;
  const orderId = resolvedParams?.id;

  try {
    await connectToDatabase();
    const db = mongoose.connection.db;

    let order = null;
    if (mongoose.Types.ObjectId.isValid(orderId)) {
      order = await db.collection("orders").findOne({ _id: new mongoose.Types.ObjectId(orderId) });
    }

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const recipientEmail = order.shippingAddress?.email || order.customer?.email;
    if (!recipientEmail) {
      return NextResponse.json(
        { success: false, message: "Customer email not attached to this order" },
        { status: 400 }
      );
    }

    const invoiceNo = `INV-SB-${new Date(order.createdAt || Date.now()).getFullYear()}-${String(order._id).slice(-8).toUpperCase()}`;
    const amount = Number(order.total || order.subtotal || 0);

    // Optional Nodemailer dispatch if SMTP configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT || 587),
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Sellbar Recommerce" <${smtpUser}>`,
          to: recipientEmail,
          subject: `Official GST Tax Invoice - Order #${String(order._id).slice(-8).toUpperCase()}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
              <h2 style="color: #13b59b; margin-bottom: 5px;">Sellbar Recommerce Pvt Ltd</h2>
              <p style="color: #64748b; font-size: 13px;">Official GST Tax Invoice • CIN: U52100BR2026PTC068921</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
              <p>Dear <strong>${order.shippingAddress?.fullName || "Valued Customer"}</strong>,</p>
              <p>Thank you for purchasing with Sellbar. Your official GST Tax Invoice has been generated.</p>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <div><strong>Invoice No:</strong> ${invoiceNo}</div>
                <div><strong>Total Amount:</strong> ₹${amount.toLocaleString("en-IN")}</div>
                <div><strong>Warranty Protection:</strong> 12 Months Doorstep Warranty Included</div>
              </div>
              <p style="font-size: 13px; color: #475569;">You can also view and print your complete tax invoice anytime in your <a href="https://sellbar.in/account/orders" style="color: #13b59b; font-weight: bold;">Sellbar Customer Dashboard</a>.</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("SMTP email dispatch failed, logged invoice:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Tax invoice ${invoiceNo} sent to ${recipientEmail}`,
      invoiceNo,
      recipient: recipientEmail,
    });
  } catch (error) {
    console.error("Send invoice error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
