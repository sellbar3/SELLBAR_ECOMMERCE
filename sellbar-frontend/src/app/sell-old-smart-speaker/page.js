import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Smart Speaker (Amazon Echo, Apple HomePod) | Sellbar.in",
  description: "Get instant cash for your used Amazon Echo Dot, Apple HomePod, or Google Nest smart speaker.",
};

const brands = ["Amazon Echo", "Apple HomePod", "Google Nest", "Sonos", "JBL"];

const models = [
  { id: "hp-2", brand: "Apple HomePod", name: "Apple HomePod (2nd Generation)", specs: "High-Excursion Woofer", max: 16000 },
  { id: "hp-mini", brand: "Apple HomePod", name: "Apple HomePod mini", specs: "Full-Range Driver", max: 5500 },
  { id: "echo-dot5", brand: "Amazon Echo", name: "Amazon Echo Dot (5th Gen) with Clock", specs: "Alexa Smart Speaker", max: 2400 },
  { id: "echo-show8", brand: "Amazon Echo", name: "Amazon Echo Show 8 (2nd Gen)", specs: "8-inch HD Touchscreen", max: 4800 },
  { id: "nest-hub", brand: "Google Nest", name: "Google Nest Hub (2nd Gen)", specs: "7-inch Smart Display", max: 3600 },
  { id: "sonos-era100", brand: "Sonos", name: "Sonos Era 100 Smart Speaker", specs: "Stereo / AirPlay 2", max: 14000 },
];

const faqs = [
  ["Do I need to deregister the smart speaker?", "Yes, please deregister from your Amazon Alexa, Apple Home, or Google Home app before pickup."],
  ["Is the power adapter required?", "Yes, the original power adapter is needed to power and test the unit on-site."],
];

export default function SellSmartSpeakerPage() {
  return (
    <SellCategory
      name="Smart Speaker"
      emoji="🔊"
      title="Sell Your Old Smart Speaker for Instant Cash"
      subtitle="Select your speaker model, check valuation, and schedule free doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
