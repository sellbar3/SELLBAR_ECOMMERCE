/**
 * Sellbar Centralized Mobile Valuation & Resale Price Estimation Engine
 *
 * Implements deterministic, transparent valuation logic based on:
 * 1. Base model resale index
 * 2. Hardware variant tier (RAM + Storage)
 * 3. Functional operational condition
 * 4. Screen / Display physical integrity
 * 5. Body / Frame cosmetic condition
 * 6. Battery health retention
 * 7. Original box, charger, and bill accessories
 */

export const FUNCTIONAL_CONDITIONS = [
  {
    id: "flawless",
    label: "Everything Works Perfectly",
    desc: "Calls, cameras, Face ID / fingerprint, touch screen, speakers, WiFi and Bluetooth work 100%.",
    deductionPct: 0,
    badge: "Full Value",
  },
  {
    id: "minor",
    label: "Minor Functional Issue",
    desc: "One minor part has issue (e.g. front camera blurry, volume button stiff, or slight speaker crackle).",
    deductionPct: 15,
    badge: "-15% Deduction",
  },
  {
    id: "major",
    label: "Major Functional Issue",
    desc: "Network/SIM issue, Face ID dead, overheating, or camera sensor failure.",
    deductionPct: 35,
    badge: "-35% Deduction",
  },
  {
    id: "dead",
    label: "Phone Does Not Turn On",
    desc: "Device is dead, stuck in boot-loop, or has liquid motherboard damage.",
    deductionPct: 65,
    badge: "-65% Deduction",
  },
];

export const SCREEN_CONDITIONS = [
  {
    id: "flawless",
    label: "Flawless / Pristine",
    desc: "No scratches, zero cracks, perfect touch response, zero discoloration or dead pixels.",
    deductionPct: 0,
  },
  {
    id: "minor-scratches",
    label: "Minor Hairline Scratches",
    desc: "1-2 faint micro-scratches visible only under bright angle light. No screen cracks.",
    deductionPct: 8,
  },
  {
    id: "visible-scratches",
    label: "Heavy Scratches / Shading",
    desc: "Deep visible scratches or light screen bleeding/yellow tint, but touch works properly.",
    deductionPct: 20,
  },
  {
    id: "cracked",
    label: "Cracked Glass or Display Lines",
    desc: "Glass is shattered, black ink spot, white line on display, or broken touch digitizer.",
    deductionPct: 42,
  },
];

export const BODY_CONDITIONS = [
  {
    id: "flawless",
    label: "Flawless / Like New",
    desc: "No dents, no paint peel, edges and back glass are pristine.",
    deductionPct: 0,
  },
  {
    id: "minor-scratches",
    label: "Minor Usage Scratches",
    desc: "Normal pocket wear, tiny scuffs on edges. Clean back panel.",
    deductionPct: 6,
  },
  {
    id: "dents",
    label: "Visible Dents or Chipped Corners",
    desc: "Corners have drops or dents, or back panel has visible paint peeling.",
    deductionPct: 18,
  },
  {
    id: "cracked-body",
    label: "Cracked Back Glass / Bent Frame",
    desc: "Rear glass is shattered, camera glass broken, or body chassis is visibly bent.",
    deductionPct: 32,
  },
];

export const BATTERY_CONDITIONS = [
  {
    id: "healthy",
    label: "Healthy (85% - 100% Health)",
    desc: "Lasts a full day on regular use. No unexpected shutdowns.",
    deductionPct: 0,
  },
  {
    id: "average",
    label: "Average (75% - 84% Health)",
    desc: "Requires charging twice a day. Normal battery degradation.",
    deductionPct: 8,
  },
  {
    id: "poor",
    label: "Poor / Needs Service (<75% Health)",
    desc: "Drains rapidly within a few hours or prompts Service Battery warning.",
    deductionPct: 18,
  },
  {
    id: "unknown",
    label: "Not Sure",
    desc: "Standard nominal allowance applied.",
    deductionPct: 5,
  },
];

export const ACCESSORIES_OPTIONS = [
  { id: "box", label: "Original Brand Box", bonus: 500 },
  { id: "charger", label: "Original OEM Fast Charger & Cable", bonus: 800 },
  { id: "bill", label: "Valid Purchase Bill / Invoice", bonus: 600 },
  { id: "warranty", label: "Under Official Brand Warranty (>3 Months)", bonus: 1500 },
];

/**
 * Calculates estimated device price based on inputs and business rules.
 */
export function calculateEstimatedPrice({
  baseResalePrice = 20000,
  variantPriceDelta = 0,
  functionalId = "flawless",
  screenId = "flawless",
  bodyId = "flawless",
  batteryId = "healthy",
  selectedAccessories = [],
}) {
  const adjustedBase = Math.max(2000, Number(baseResalePrice) + Number(variantPriceDelta));

  const func = FUNCTIONAL_CONDITIONS.find((f) => f.id === functionalId) || FUNCTIONAL_CONDITIONS[0];
  const screen = SCREEN_CONDITIONS.find((s) => s.id === screenId) || SCREEN_CONDITIONS[0];
  const body = BODY_CONDITIONS.find((b) => b.id === bodyId) || BODY_CONDITIONS[0];
  const battery = BATTERY_CONDITIONS.find((b) => b.id === batteryId) || BATTERY_CONDITIONS[0];

  const funcDeduction = Math.round((adjustedBase * func.deductionPct) / 100);
  const screenDeduction = Math.round((adjustedBase * screen.deductionPct) / 100);
  const bodyDeduction = Math.round((adjustedBase * body.deductionPct) / 100);
  const batteryDeduction = Math.round((adjustedBase * battery.deductionPct) / 100);

  const totalDeductions = funcDeduction + screenDeduction + bodyDeduction + batteryDeduction;

  // Calculate accessory bonuses
  let accessoryBonusTotal = 0;
  const accessoryBreakdown = [];
  selectedAccessories.forEach((accId) => {
    const acc = ACCESSORIES_OPTIONS.find((a) => a.id === accId);
    if (acc) {
      accessoryBonusTotal += acc.bonus;
      accessoryBreakdown.push({ label: acc.label, bonus: acc.bonus });
    }
  });

  // Calculate preliminary final price
  let estimatedPrice = adjustedBase - totalDeductions + accessoryBonusTotal;

  // Business boundaries: Minimum floor price of 10% of base or ₹1,200 (for scrap/parts)
  const minFloor = Math.max(1200, Math.round(adjustedBase * 0.12));
  if (estimatedPrice < minFloor) {
    estimatedPrice = minFloor;
  }

  // Round off to nearest ₹50 for clean Indian currency presentation
  estimatedPrice = Math.round(estimatedPrice / 50) * 50;

  return {
    baseResalePrice: adjustedBase,
    variantAdjustment: variantPriceDelta,
    estimatedPrice,
    breakdown: {
      functional: { label: func.label, deduction: funcDeduction },
      screen: { label: screen.label, deduction: screenDeduction },
      body: { label: body.label, deduction: bodyDeduction },
      battery: { label: battery.label, deduction: batteryDeduction },
      accessories: accessoryBreakdown,
      totalDeductions,
      totalBonus: accessoryBonusTotal,
    },
  };
}
