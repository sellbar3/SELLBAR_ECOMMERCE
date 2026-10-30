import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Mobile Phone | Instant Cash & Doorstep Pickup | Sellbar.in",
  description: "Sell your used smartphone online at the best price. Free doorstep evaluation and instant bank/UPI payout.",
};

const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Realme", "Google", "Motorola"];

const models = [
  { id: "ip16p", brand: "Apple", name: "Apple iPhone 16 Pro (128GB)", specs: "128GB", max: 82000 },
  { id: "ip15", brand: "Apple", name: "Apple iPhone 15 (128GB)", specs: "128GB", max: 48000 },
  { id: "ip14", brand: "Apple", name: "Apple iPhone 14 (128GB)", specs: "128GB", max: 36000 },
  { id: "ip13", brand: "Apple", name: "Apple iPhone 13 (128GB)", specs: "128GB", max: 30000 },
  { id: "s24u", brand: "Samsung", name: "Samsung Galaxy S24 Ultra 5G", specs: "12GB / 256GB", max: 68000 },
  { id: "s23", brand: "Samsung", name: "Samsung Galaxy S23 5G", specs: "8GB / 256GB", max: 33000 },
  { id: "op12", brand: "OnePlus", name: "OnePlus 12 5G", specs: "12GB / 256GB", max: 38000 },
  { id: "rn13", brand: "Xiaomi", name: "Redmi Note 13 Pro 5G", specs: "8GB / 256GB", max: 15000 },
  { id: "v29", brand: "Vivo", name: "Vivo V29 5G", specs: "8GB / 128GB", max: 17000 },
  { id: "px8", brand: "Google", name: "Google Pixel 8", specs: "8GB / 128GB", max: 31000 },
];

const faqs = [
  ["How is the phone valuation calculated?", "The price is based on the phone model, market demand, screen condition, body scratches, battery health, and functional sensors."],
  ["Is doorstep pickup free?", "Yes, doorstep pickup and physical evaluation are 100% free with zero cancellation charges."],
  ["When do I receive payment?", "Immediately! Once the technician completes physical verification on-site, cash/UPI is transferred in front of you."],
  ["What if my phone has scratches or a cracked screen?", "We accept phones in all conditions (Flawless, Good, Average, Broken Screen). The price estimate will adjust transparently."],
];

export default function SellMobilePhonePage() {
  return (
    <SellCategory
      name="Mobile Phone"
      emoji="📱"
      title="Sell Your Old Mobile Phone for Instant Cash"
      subtitle="Select your phone brand, check live valuation, and schedule free doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
