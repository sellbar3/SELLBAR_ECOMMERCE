import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ValuationSetting from "@/models/ValuationSetting";

const DEFAULT_RATES = {
  flawlessDeduction: 0,
  goodDeduction: 12,
  averageDeduction: 28,
  belowAverageDeduction: 45,
  screenTouchDefect: 2500,
  cameraDefect: 1800,
  speakerMicDefect: 1200,
  batteryDegraded: 1500,
  motherboardIssue: 4500,
  bonusCharger: 400,
  bonusBox: 300,
  bonusBill: 500,
  annualDepreciation: 15,
};

// GET /api/admin/valuation - Fetch current valuation rates
export async function GET() {
  try {
    await connectToDatabase();
    let setting = await ValuationSetting.findOne({ key: "default" }).lean();

    if (!setting) {
      return NextResponse.json({
        success: true,
        data: DEFAULT_RATES,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        flawlessDeduction: setting.flawlessDeduction ?? DEFAULT_RATES.flawlessDeduction,
        goodDeduction: setting.goodDeduction ?? DEFAULT_RATES.goodDeduction,
        averageDeduction: setting.averageDeduction ?? DEFAULT_RATES.averageDeduction,
        belowAverageDeduction: setting.belowAverageDeduction ?? DEFAULT_RATES.belowAverageDeduction,
        screenTouchDefect: setting.screenTouchDefect ?? DEFAULT_RATES.screenTouchDefect,
        cameraDefect: setting.cameraDefect ?? DEFAULT_RATES.cameraDefect,
        speakerMicDefect: setting.speakerMicDefect ?? DEFAULT_RATES.speakerMicDefect,
        batteryDegraded: setting.batteryDegraded ?? DEFAULT_RATES.batteryDegraded,
        motherboardIssue: setting.motherboardIssue ?? DEFAULT_RATES.motherboardIssue,
        bonusCharger: setting.bonusCharger ?? DEFAULT_RATES.bonusCharger,
        bonusBox: setting.bonusBox ?? DEFAULT_RATES.bonusBox,
        bonusBill: setting.bonusBill ?? DEFAULT_RATES.bonusBill,
        annualDepreciation: setting.annualDepreciation ?? DEFAULT_RATES.annualDepreciation,
      },
    });
  } catch (err) {
    console.error("Valuation GET error:", err);
    return NextResponse.json({
      success: true,
      data: DEFAULT_RATES,
    });
  }
}

// POST /api/admin/valuation - Save updated valuation rates
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const updated = await ValuationSetting.findOneAndUpdate(
      { key: "default" },
      {
        flawlessDeduction: Number(body.flawlessDeduction) || 0,
        goodDeduction: Number(body.goodDeduction) || 12,
        averageDeduction: Number(body.averageDeduction) || 28,
        belowAverageDeduction: Number(body.belowAverageDeduction) || 45,
        screenTouchDefect: Number(body.screenTouchDefect) || 2500,
        cameraDefect: Number(body.cameraDefect) || 1800,
        speakerMicDefect: Number(body.speakerMicDefect) || 1200,
        batteryDegraded: Number(body.batteryDegraded) || 1500,
        motherboardIssue: Number(body.motherboardIssue) || 4500,
        bonusCharger: Number(body.bonusCharger) || 400,
        bonusBox: Number(body.bonusBox) || 300,
        bonusBill: Number(body.bonusBill) || 500,
        annualDepreciation: Number(body.annualDepreciation) || 15,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Valuation rules saved successfully to database",
      data: updated,
    });
  } catch (err) {
    console.error("Valuation POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save valuation rules" },
      { status: 500 }
    );
  }
}
