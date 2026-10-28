import SellCategory from "@/components/SellCategory";

export const metadata = { title: "Sell your old tablet | SELLBAR" };

const brands = ["Apple", "Samsung", "Lenovo"];

const models = [
  { id: "ipad9", brand: "Apple", name: "Apple iPad 9th Gen (64GB)", specs: "Wi-Fi", max: 18000 },
  { id: "ipad-air", brand: "Apple", name: "Apple iPad Air 5th Gen", specs: "64GB Wi-Fi", max: 35000 },
  { id: "ipad-pro", brand: "Apple", name: "Apple iPad Pro 11 (M2)", specs: "128GB Wi-Fi", max: 52000 },
  { id: "tab-s8", brand: "Samsung", name: "Samsung Galaxy Tab S8", specs: "8GB / 128GB", max: 30000 },
  { id: "tab-a8", brand: "Samsung", name: "Samsung Galaxy Tab A8", specs: "4GB / 64GB", max: 9000 },
  { id: "lv-p11", brand: "Lenovo", name: "Lenovo Tab P11", specs: "4GB / 128GB", max: 8000 },
];

const faqs = [
  ["How is the price decided?", "The estimate depends on the model, its age and the condition you choose. The final price is confirmed after inspection."],
  ["Is the pickup free?", "Yes, there is no pickup fee."],
  ["What happens to my data?", "Back up your files and sign out of your accounts. The tablet is wiped before resale."],
];

export default function Page() {
  return (
    <SellCategory
      name="Tablet"
      emoji="📲"
      title="Sell your old tablet and get paid quickly"
      subtitle="Choose your model, check an estimate and book a free doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}