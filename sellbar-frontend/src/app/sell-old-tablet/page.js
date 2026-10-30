import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Tablet & iPad | Instant Cash | Sellbar.in",
  description: "Get the best resale value for your used Apple iPad, Samsung Galaxy Tab, or Android tablet with free doorstep pickup.",
};

const brands = ["Apple", "Samsung", "Lenovo", "Xiaomi", "OnePlus"];

const models = [
  { id: "ipad-pro", brand: "Apple", name: "Apple iPad Pro 11 M4 (2024)", specs: "256GB / Wi-Fi", max: 72000 },
  { id: "ipad-air", brand: "Apple", name: "Apple iPad Air 11 M2 (2024)", specs: "128GB / Wi-Fi", max: 46000 },
  { id: "ipad-10", brand: "Apple", name: "Apple iPad 10th Gen (2022)", specs: "64GB / Wi-Fi", max: 24000 },
  { id: "ipad-9", brand: "Apple", name: "Apple iPad 9th Gen (2021)", specs: "64GB / Wi-Fi", max: 16000 },
  { id: "tab-s9", brand: "Samsung", name: "Samsung Galaxy Tab S9 5G", specs: "128GB", max: 38000 },
  { id: "tab-s8", brand: "Samsung", name: "Samsung Galaxy Tab S8", specs: "128GB", max: 26000 },
  { id: "op-pad", brand: "OnePlus", name: "OnePlus Pad (128GB)", specs: "8GB / 128GB", max: 21000 },
  { id: "xi-pad6", brand: "Xiaomi", name: "Xiaomi Pad 6 (128GB)", specs: "6GB / 128GB", max: 15000 },
];

const faqs = [
  ["Do I need to include the Apple Pencil or S-Pen?", "Stylus accessories can be added to your quote to increase the final payout."],
  ["Does screen scratch lower the tablet value?", "Minor cosmetic scratches are graded as 'Good' or 'Fair', allowing you to still get great cash."],
];

export default function SellTabletPage() {
  return (
    <SellCategory
      name="Tablet"
      emoji="📱"
      title="Sell Your Old iPad or Tablet for Instant Money"
      subtitle="Select your tablet brand and lock in top resale value with doorstep collection."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
