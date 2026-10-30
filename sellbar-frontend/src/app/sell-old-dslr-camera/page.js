import SellCategory from "@/components/SellCategory";

export const metadata = {
  title: "Sell Old DSLR & Mirrorless Camera | Sellbar.in",
  description: "Sell your used Canon, Sony, Nikon camera body and lenses for instant cash payout.",
};

const brands = ["Canon", "Sony", "Nikon", "Fujifilm", "Panasonic"];

const models = [
  { id: "sony-a74", brand: "Sony", name: "Sony Alpha A7 IV Mirrorless Body", specs: "33MP / 4K 60p", max: 110000 },
  { id: "sony-a73", brand: "Sony", name: "Sony Alpha A7 III Mirrorless Body", specs: "24.2MP / Full Frame", max: 62000 },
  { id: "canon-r6", brand: "Canon", name: "Canon EOS R6 Mark II Body", specs: "24.2MP / 4K 60p", max: 120000 },
  { id: "canon-200d", brand: "Canon", name: "Canon EOS 200D II with 18-55mm Kit", specs: "24.1MP / 4K", max: 28000 },
  { id: "nik-z6", brand: "Nikon", name: "Nikon Z6 II Mirrorless Body", specs: "24.5MP / Dual EXPEED 6", max: 70000 },
  { id: "nik-d5600", brand: "Nikon", name: "Nikon D5600 DSLR with Kit Lens", specs: "24.2MP / Full HD", max: 21000 },
];

const faqs = [
  ["How does shutter count affect camera valuation?", "Cameras with lower shutter counts (under 20,000 actuations) receive the highest condition grade."],
  ["Can I sell extra zoom and prime lenses?", "Yes, you can bundle individual lenses or kit accessories for a complete camera kit valuation."],
];

export default function SellDslrCameraPage() {
  return (
    <SellCategory
      name="DSLR & Mirrorless"
      emoji="📷"
      title="Sell Your Old DSLR or Mirrorless Camera for Top Cash"
      subtitle="Select your camera brand, get an instant evaluation, and book free doorstep pickup."
      brands={brands}
      models={models}
      faqs={faqs}
    />
  );
}
