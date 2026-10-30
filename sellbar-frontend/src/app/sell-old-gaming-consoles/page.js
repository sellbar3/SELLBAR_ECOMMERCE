import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old Gaming Console (PS5, PS4, Xbox, Switch) | Sellbar.in",
  description: "Get highest instant cash for your Sony PlayStation 5, PS4 Pro, Xbox Series X/S, or Nintendo Switch.",
};

const brands = ["Sony PlayStation", "Microsoft Xbox", "Nintendo"];

const models = [
  { id: "ps5-disc", brand: "Sony PlayStation", name: "PlayStation 5 Disc Edition (825GB)", specs: "With DualSense", max: 32000 },
  { id: "ps5-dig", brand: "Sony PlayStation", name: "PlayStation 5 Digital Edition", specs: "With DualSense", max: 28000 },
  { id: "ps4-pro", brand: "Sony PlayStation", name: "PlayStation 4 Pro (1TB)", specs: "4K Gaming", max: 14000 },
  { id: "ps4-slim", brand: "Sony PlayStation", name: "PlayStation 4 Slim (500GB)", specs: "With Controller", max: 10500 },
  { id: "xb-sx", brand: "Microsoft Xbox", name: "Xbox Series X (1TB)", specs: "4K / 120FPS", max: 30000 },
  { id: "xb-ss", brand: "Microsoft Xbox", name: "Xbox Series S (512GB)", specs: "All-Digital", max: 15000 },
  { id: "nin-oled", brand: "Nintendo", name: "Nintendo Switch OLED Model", specs: "64GB / Joy-Cons", max: 16000 },
];

const faqs = [
  ["Can I sell extra game discs and controllers?", "Yes! Extra controllers, games, and headsets can be bundled for a higher total cash offer."],
  ["Does the console need to be factory reset?", "Yes, please log out of PSN, Xbox Live, or Nintendo Network accounts before handover."],
];

export default function SellGamingConsolesPage() {
  return (
    <SellCategory
      name="Gaming Console"
      emoji="🎮"
      title="Sell Your Old PlayStation, Xbox, or Switch for Top Cash"
      subtitle="Instant price estimates and fast doorstep collection for used consoles and gaming accessories."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
