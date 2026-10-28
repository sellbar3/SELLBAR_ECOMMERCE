import SellCategory from "@/components/SellCategory";

export const metadata = { title: "Sell your old laptop | SELLBAR" };

const brands = ["Apple", "Dell", "HP", "Lenovo", "Asus"];

const models = [
  { id: "mba-m2", brand: "Apple", name: "Apple MacBook Air M2 (2022)", specs: "8GB / 256GB", max: 65000 },
  { id: "mba-m1", brand: "Apple", name: "Apple MacBook Air M1 (2020)", specs: "8GB / 256GB", max: 48000 },
  { id: "mbp-14", brand: "Apple", name: "Apple MacBook Pro 14 M3", specs: "16GB / 512GB", max: 110000 },
  { id: "d5420", brand: "Dell", name: "Dell Latitude 5420 (Core i5)", specs: "16GB / 512GB", max: 22000 },
  { id: "hp-pav", brand: "HP", name: "HP Pavilion 15 (Core i5)", specs: "8GB / 512GB", max: 24000 },
  { id: "tp-t14", brand: "Lenovo", name: "Lenovo ThinkPad T14 (Ryzen 5)", specs: "16GB / 512GB", max: 20000 },
  { id: "as-vb", brand: "Asus", name: "Asus Vivobook 15 (Core i5)", specs: "8GB / 512GB", max: 21000 },
];

const faqs = [
  ["How is the price decided?", "The estimate depends on the model, its age and the condition you choose. The final price is confirmed after inspection."],
  ["Do I need the charger and box?", "They help, but they are not required. Missing items can lower the final price."],
  ["What happens to my data?", "Back up your files and sign out of your accounts. The drive is wiped before resale."],
];

export default function Page() {
  return (
    <SellCategory
      name="Laptop"
      emoji="💻"
      title="Sell your old laptop at a fair price"
      subtitle="Choose your model, check an estimate and book a free doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}