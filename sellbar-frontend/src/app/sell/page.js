import SellCategory from "@/components/SellCategory";

export const metadata = { title: "Sell your old phone | SELLBAR" };

const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Realme", "Google"];

const models = [
  { id: "ip15", brand: "Apple", name: "Apple iPhone 15 (128GB)", specs: "128GB", max: 48000 },
  { id: "ip14", brand: "Apple", name: "Apple iPhone 14 (128GB)", specs: "128GB", max: 36000 },
  { id: "ip13", brand: "Apple", name: "Apple iPhone 13 (128GB)", specs: "128GB", max: 30000 },
  { id: "ip12", brand: "Apple", name: "Apple iPhone 12 (64GB)", specs: "64GB", max: 20000 },
  { id: "s24", brand: "Samsung", name: "Samsung Galaxy S24 5G", specs: "8GB / 256GB", max: 42000 },
  { id: "s23", brand: "Samsung", name: "Samsung Galaxy S23 5G", specs: "8GB / 256GB", max: 33000 },
  { id: "m34", brand: "Samsung", name: "Samsung Galaxy M34 5G", specs: "6GB / 128GB", max: 11000 },
  { id: "op12", brand: "OnePlus", name: "OnePlus 12 5G", specs: "12GB / 256GB", max: 38000 },
  { id: "op11", brand: "OnePlus", name: "OnePlus 11R 5G", specs: "8GB / 128GB", max: 22000 },
  { id: "rn13", brand: "Xiaomi", name: "Redmi Note 13 Pro 5G", specs: "8GB / 256GB", max: 15000 },
  { id: "v29", brand: "Vivo", name: "Vivo V29 5G", specs: "8GB / 128GB", max: 17000 },
  { id: "px7", brand: "Google", name: "Google Pixel 7", specs: "8GB / 128GB", max: 21000 },
];

const faqs = [
  ["How is the price decided?", "The estimate depends on the model, its age and the condition you choose. The final price is confirmed after the device is inspected."],
  ["Do I have to pay for pickup?", "No. Pickup is free."],
  ["How do I get paid?", "After the inspection, the money is sent to your UPI ID or bank account."],
  ["What happens to my data?", "Back up your files, sign out of your accounts and reset the phone. The device is also wiped before resale."],
];

export default function Page() {
  return (
    <SellCategory
      name="Phone"
      emoji="📱"
      title="Sell your old phone and get paid on the spot"
      subtitle="Pick your model, check an estimated price and book a free doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}