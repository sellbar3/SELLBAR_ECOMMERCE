import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Laptop | Instant Doorstep Cash | Sellbar.in",
  description: "Sell your used laptop or MacBook online with guaranteed highest market valuation and instant UPI transfer.",
};

const brands = ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer"];

const models = [
  { id: "mba-m3", brand: "Apple", name: "Apple MacBook Air M3 (2024)", specs: "8GB / 256GB", max: 80000 },
  { id: "mba-m2", brand: "Apple", name: "Apple MacBook Air M2 (2022)", specs: "8GB / 256GB", max: 62000 },
  { id: "mba-m1", brand: "Apple", name: "Apple MacBook Air M1 (2020)", specs: "8GB / 256GB", max: 45000 },
  { id: "mbp-16", brand: "Apple", name: "Apple MacBook Pro 16 M2 Max", specs: "32GB / 1TB", max: 145000 },
  { id: "dell-xps", brand: "Dell", name: "Dell XPS 13 (Intel Core i7)", specs: "16GB / 512GB", max: 48000 },
  { id: "dell-lat", brand: "Dell", name: "Dell Latitude 5420 (Core i5)", specs: "16GB / 512GB", max: 22000 },
  { id: "hp-envy", brand: "HP", name: "HP Envy x360 (Ryzen 7)", specs: "16GB / 512GB", max: 34000 },
  { id: "len-tp", brand: "Lenovo", name: "Lenovo ThinkPad X1 Carbon Gen 9", specs: "16GB / 512GB", max: 38000 },
];

const faqs = [
  ["Do I need to include the original charger?", "Original chargers help unlock the maximum price quote, but laptops without chargers are also accepted with a slight deduction."],
  ["How do you ensure my data security?", "We enforce mandatory drive formatting and NIST 800-88 compliant zero-fill wipes on all collected laptops."],
  ["Can I sell non-working or dead laptops?", "Yes, we accept laptops with battery, screen, or motherboard issues for recycling and spare parts."],
];

export default function SellLaptopPage() {
  return (
    <SellCategory
      name="Laptop"
      emoji="💻"
      title="Sell Your Old Laptop or MacBook at the Best Price"
      subtitle="Select your laptop brand, view your guaranteed price quote, and book free doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
