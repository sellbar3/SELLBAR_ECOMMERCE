import mongoose from "mongoose";

const valuationSettingSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", unique: true },
    flawlessDeduction: { type: Number, default: 0 },
    goodDeduction: { type: Number, default: 12 },
    averageDeduction: { type: Number, default: 28 },
    belowAverageDeduction: { type: Number, default: 45 },

    screenTouchDefect: { type: Number, default: 2500 },
    cameraDefect: { type: Number, default: 1800 },
    speakerMicDefect: { type: Number, default: 1200 },
    batteryDegraded: { type: Number, default: 1500 },
    motherboardIssue: { type: Number, default: 4500 },

    bonusCharger: { type: Number, default: 400 },
    bonusBox: { type: Number, default: 300 },
    bonusBill: { type: Number, default: 500 },

    annualDepreciation: { type: Number, default: 15 },
  },
  { timestamps: true }
);

export default mongoose.models.ValuationSetting ||
  mongoose.model("ValuationSetting", valuationSettingSchema);
