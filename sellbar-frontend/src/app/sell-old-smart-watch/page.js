import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Smart Watch | Instant Payout | Sellbar.in",
  description: "Sell your used Apple Watch, Samsung Galaxy Watch, or Fossil smartwatch for instant cash.",
};

const brands = ["Apple", "Samsung", "Garmin", "Fossil", "OnePlus", "Amazfit"];

const models = [
  { id: "aw-u2", brand: "Apple", name: "Apple Watch Ultra 2 (49mm)", specs: "Cellular / Titanium", max: 48000 },
  { id: "aw-s9", brand: "Apple", name: "Apple Watch Series 9 (45mm)", specs: "GPS / Aluminum", max: 24000 },
  { id: "aw-s8", brand: "Apple", name: "Apple Watch Series 8 (45mm)", specs: "GPS", max: 18000 },
  { id: "aw-se2", brand: "Apple", name: "Apple Watch SE 2nd Gen (44mm)", specs: "GPS", max: 13000 },
  { id: "gw-6c", brand: "Samsung", name: "Samsung Galaxy Watch 6 Classic", specs: "47mm / Bluetooth", max: 15000 },
  { id: "gw-5p", brand: "Samsung", name: "Samsung Galaxy Watch 5 Pro", specs: "45mm / Titanium", max: 12000 },
  { id: "gar-fen", brand: "Garmin", name: "Garmin Fenix 7 Solar", specs: "47mm Multisport", max: 32000 },
];

const faqs = [
  ["Do I need to unpair the Apple Watch or Galaxy Watch?", "Yes, please unpair from your iPhone/Android and turn off Find My / Activation Lock before the executive arrives."],
  ["Does the charging cable need to be included?", "Original magnetic chargers help provide the highest valuation."],
];

export default function SellSmartWatchPage() {
  return (
    <SellCategory
      name="Smart Watch"
      emoji="⌚"
      title="Sell Your Old Smartwatch for Instant Cash"
      subtitle="Select your watch brand, check instant valuation, and enjoy doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
