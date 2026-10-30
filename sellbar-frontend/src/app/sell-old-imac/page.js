import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Apple iMac & Mac Mini | Sellbar.in",
  description: "Sell your Apple iMac 24-inch, iMac 27-inch 5K, Mac Studio, or Mac Mini with doorstep evaluation and immediate payment.",
};

const brands = ["Apple"];

const models = [
  { id: "imac-m3", brand: "Apple", name: "Apple iMac 24-inch M3 (2023)", specs: "8-Core GPU / 256GB", max: 74000 },
  { id: "imac-m1", brand: "Apple", name: "Apple iMac 24-inch M1 (2021)", specs: "8-Core GPU / 256GB", max: 52000 },
  { id: "imac-27", brand: "Apple", name: "Apple iMac 27-inch 5K Retina (2020)", specs: "Core i7 / 512GB SSD", max: 38000 },
  { id: "mac-mini-m2", brand: "Apple", name: "Apple Mac Mini M2 (2023)", specs: "8GB / 256GB", max: 32000 },
  { id: "mac-studio", brand: "Apple", name: "Apple Mac Studio M1 Max (2022)", specs: "32GB / 512GB", max: 88000 },
];

const faqs = [
  ["Do I need to sign out of iCloud?", "Yes, please sign out of Apple ID, turn off Find My Mac, and unenroll from MDM if it was a company device."],
  ["Is the Magic Keyboard and Magic Mouse included in the valuation?", "Yes, original accessories will fetch you the highest quote."],
];

export default function SellImacPage() {
  return (
    <SellCategory
      name="iMac & Desktop"
      emoji="🖥️"
      title="Sell Your Old Apple iMac or Mac Mini for Top Value"
      subtitle="Select your Mac desktop model, get a quote, and enjoy safe doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
