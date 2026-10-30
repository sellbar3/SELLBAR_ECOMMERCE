import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Wireless Earbuds & Headphones | Sellbar.in",
  description: "Sell your used Apple AirPods, Samsung Galaxy Buds, Sony WH-1000XM5 headphones for instant cash.",
};

const brands = ["Apple", "Sony", "Samsung", "Bose", "JBL", "Sennheiser"];

const models = [
  { id: "ap-pro2", brand: "Apple", name: "Apple AirPods Pro (2nd Gen, USB-C)", specs: "ANC / MagSafe Case", max: 12000 },
  { id: "ap-max", brand: "Apple", name: "Apple AirPods Max Wireless Headphones", specs: "Over-Ear / Spatial Audio", max: 24000 },
  { id: "ap-3", brand: "Apple", name: "Apple AirPods (3rd Generation)", specs: "Lightning / MagSafe", max: 7000 },
  { id: "sony-xm5", brand: "Sony", name: "Sony WH-1000XM5 Noise Canceling Headphones", specs: "Hi-Res / 30hr Battery", max: 16000 },
  { id: "sony-wfxm5", brand: "Sony", name: "Sony WF-1000XM5 Wireless Earbuds", specs: "ANC / IPX4", max: 11000 },
  { id: "sam-buds2p", brand: "Samsung", name: "Samsung Galaxy Buds2 Pro", specs: "24-bit Hi-Fi / ANC", max: 6000 },
  { id: "bose-qc45", brand: "Bose", name: "Bose QuietComfort 45 Headphones", specs: "Over-Ear ANC", max: 14000 },
];

const faqs = [
  ["Do the earbuds need to be sanitized?", "Our team professionally cleans and sanitizes all audio equipment, but please clean away any surface earwax before inspection."],
  ["Is the charging case required?", "Yes, the original wireless charging case is necessary for testing and pairing."],
];

export default function SellEarbudsPage() {
  return (
    <SellCategory
      name="Earbuds & Headphones"
      emoji="🎧"
      title="Sell Your Old Wireless Earbuds or Headphones for Instant Cash"
      subtitle="Select your brand, check estimated valuation, and book doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
