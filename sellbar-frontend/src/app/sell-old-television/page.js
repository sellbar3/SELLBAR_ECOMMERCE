import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Television & Smart TV | Sellbar.in",
  description: "Sell your used LED, OLED, 4K Smart TV online. Free home inspection and heavy-lift pickup with instant cash.",
};

const brands = ["Sony", "Samsung", "LG", "Mi", "OnePlus", "TCL"];

const models = [
  { id: "sony-a80", brand: "Sony", name: "Sony Bravia 55-inch 4K OLED TV", specs: "55-inch / OLED", max: 45000 },
  { id: "lg-c2", brand: "LG", name: "LG 55-inch 4K OLED evo TV (C2/C3)", specs: "55-inch / 120Hz", max: 42000 },
  { id: "sam-qled", brand: "Samsung", name: "Samsung 55-inch 4K QLED TV", specs: "55-inch / Quantum HDR", max: 32000 },
  { id: "sam-cryst", brand: "Samsung", name: "Samsung 43-inch Crystal 4K Neo", specs: "43-inch / Smart TV", max: 14000 },
  { id: "mi-5a", brand: "Mi", name: "Xiaomi Smart TV 5A (43-inch)", specs: "43-inch / Full HD", max: 9500 },
  { id: "op-u1", brand: "OnePlus", name: "OnePlus TV U1S (55-inch)", specs: "55-inch / 4K UHD", max: 18000 },
];

const faqs = [
  ["How do you handle TV uninstallation and transportation?", "Our logistics team brings padded TV flight cases and unmounts the TV safely from your wall."],
  ["Is the remote controller required?", "Yes, original working remote controllers are needed to test display menus and sound."],
];

export default function SellTelevisionPage() {
  return (
    <SellCategory
      name="Television"
      emoji="📺"
      title="Sell Your Old Smart TV with Safe Home Pickup"
      subtitle="Select your TV brand and screen size, get a valuation, and we'll handle the heavy lifting."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
