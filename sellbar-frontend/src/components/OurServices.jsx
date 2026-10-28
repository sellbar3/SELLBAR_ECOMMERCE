"use client";

import { useState } from "react";
import Link from "next/link";
import "./OurServices.css";

const SERVICES = [
  ["Sell Phone", "/sell", "sell-phone.webp", "📱"],
  ["Buy Gadgets", "/buy-refurbished-gadgets", "buy-gadgets.webp", "🎧"],
  ["Buy Phone", "/buy-refurbished?category=phones", "buy-phone.webp", "📱"],
  ["Buy Laptops", "/buy-refurbished?category=laptops", "buy-laptops.webp", "💻"],
  ["Rent PS5", "/buy-refurbished?category=gaming", "rent-ps5.gif", "🎮"],
  ["Buy Cameras & Lenses", "/buy-refurbished?category=cameras", "buy-cameras.webp", "📷"],
  ["Pixel Upgrade", "/sell", "pixel-upgrade.webp", "📲"],
  ["Buy Gaming Consoles", "/buy-refurbished?category=gaming", "buy-gaming.webp", "🕹️"],
  ["Repair Phone", "/repair", "repair-phone.webp", "🛠️"],
  ["Repair Laptop", "/repair", "repair-laptop.webp", "🔧"],
  ["Find New Phone", "/find-new-phone", "find-new-phone.webp", "🔎"],
  ["Nearby Stores", "/about", "nearby-stores.webp", "🏪"],
  ["New Accessories", "/buy-refurbished", "new-accessories.webp", "🔌"],
  ["Buy Smartwatches", "/buy-refurbished?category=smartwatches", "buy-smartwatches.webp", "⌚"],
  ["Recycle", "/recycle-old-mobile-phone", "recycle.webp", "♻️"],
  ["Buy Tablets", "/buy-refurbished?category=tablets", "buy-tablets.webp", "📲"],
];

function ServiceCard({ title, href, image, emoji }) {
  const [failed, setFailed] = useState(false);

  return (
    <Link href={href} className="os-card">
      <span className="os-img">
        {failed ? (
          <span className="os-emoji" aria-hidden="true">{emoji}</span>
        ) : (
          <img
            src={`/services/${image}`}
            alt={title}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className="os-name">{title}</span>
    </Link>
  );
}

export default function OurServices() {
  return (
    <section className="os" aria-labelledby="os-title">
      <h2 id="os-title">Our Services</h2>

      <div className="os-grid">
        {SERVICES.map(([title, href, image, emoji]) => (
          <ServiceCard key={title} title={title} href={href} image={image} emoji={emoji} />
        ))}
      </div>
    </section>
  );
}