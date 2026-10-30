"use client";

import { useState } from "react";
import Link from "next/link";
import "@/css/Refurb.css";

function Pic({ src, alt, emoji }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="rf-pic">
      {failed || !src ? (
        <span className="rf-emoji" aria-hidden="true">{emoji}</span>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

const CATEGORIES = [
  ["Refurbished Phones", "/buy-refurbished?category=phones", "/services/buy-phone.webp", "📱", "Up to 70% off"],
  ["Refurbished Laptops", "/buy-refurbished?category=laptops", "/services/buy-laptops.webp", "💻", "Starting ₹16,999"],
  ["Smartwatches", "/buy-refurbished?category=smartwatches", "/services/buy-smartwatches.webp", "⌚", "Up to 65% off"],
  ["Tablets", "/buy-refurbished?category=tablets", "/services/buy-tablets.webp", "📲", "Starting ₹11,999"],
  ["Gaming Consoles", "/buy-refurbished?category=gaming", "/services/buy-gaming.webp", "🎮", "Up to 45% off"],
  ["Cameras", "/buy-refurbished?category=cameras", "/services/buy-cameras.webp", "📷", "Tested optics"],
];

const DEALS = [
  { id: "ip14", name: "Apple iPhone 14 (128 GB)", brand: "APPLE", grade: "Flawless", tag: "Super deal", price: 38999, mrp: 69900, img: "/products/iphone-14.webp", emoji: "📱" },
  { id: "s24", name: "Samsung Galaxy S24 5G (8GB/256GB)", brand: "SAMSUNG", grade: "Flawless", tag: "Best seller", price: 48499, mrp: 79999, img: "/products/phone-samsung-s24.jpg", emoji: "📱" },
  { id: "ip13", name: "Apple iPhone 13 (128 GB)", brand: "APPLE", grade: "Superb", tag: "Top pick", price: 32999, mrp: 59900, img: "/products/iphone-13.webp", emoji: "📱" },
  { id: "op12", name: "OnePlus 12 5G (16GB/512GB)", brand: "ONEPLUS", grade: "Flawless", tag: "36% off", price: 44999, mrp: 69999, img: "/products/phone-oneplus-12.jpg", emoji: "📱" },
  { id: "fold5", name: "Samsung Galaxy Z Fold 5 (512GB)", brand: "SAMSUNG", grade: "Superb", tag: "52% off", price: 79999, mrp: 164999, img: "/products/phone-samsung-fold5.jpg", emoji: "📱" },
  { id: "mbp", name: 'Apple MacBook Pro 14" M3 (512GB)', brand: "LAPTOPS", grade: "Flawless", tag: "Pro tech", price: 114999, mrp: 169900, img: "/products/laptop-macbook-pro-m3.webp", emoji: "💻" },
  { id: "d5320", name: "Dell Latitude 5320 Core i7 (16GB/512GB)", brand: "LAPTOPS", grade: "Superb", tag: "Big saving", price: 28499, mrp: 89999, img: "/products/laptop-dell-5320.png", emoji: "💻" },
  { id: "px7", name: "Google Pixel 7 5G (128GB)", brand: "GOOGLE", grade: "Good", tag: "55% off", price: 26999, mrp: 59999, img: "/products/google-pixel-7.webp", emoji: "📱" },
];

const TABS = [
  ["ALL", "All gadgets"],
  ["APPLE", "Apple iPhones"],
  ["SAMSUNG", "Samsung Galaxy"],
  ["ONEPLUS", "OnePlus"],
  ["LAPTOPS", "Laptops"],
];

const GRADES = [
  ["Flawless", "Grade A", "Like new", "Looks identical to a freshly unboxed device with no visible marks.", ["No visible scratches", "Battery health 90%+", "12-month warranty"]],
  ["Superb", "Grade B", "Best value", "Faint hairline marks on the body that are hard to see at arm's length.", ["Display glass is clean", "Fully tested hardware", "Up to 12-month warranty"]],
  ["Good", "Grade C", "Pocket saver", "Visible scuffs along the edges. Ideal if you use a case anyway.", ["Passed full inspection", "6-month warranty", "Biggest savings"]],
];

const CHECKS = [
  ["📱 Screen & touch", ["Multi-touch response", "Dead pixel check", "Backlight uniformity", "Refresh rate test"]],
  ["🔋 Battery & heat", ["Battery health above 85%", "Fast charge input", "Swelling check", "Thermal stress test"]],
  ["📷 Camera & audio", ["Autofocus test", "Front and rear cameras", "Speaker and mic clarity", "No crackling or distortion"]],
  ["🛡️ Network & security", ["4G / 5G calling", "Wi-Fi, Bluetooth and GPS", "Face and fingerprint unlock", "Clean IMEI check"]],
];

const PERKS = [
  ["🚚", "Insured doorstep delivery", "Sealed, tamper-evident packaging with express dispatch."],
  ["↩️", "7-day replacement", "Not happy with the look or feel? Ask for a replacement or refund within 7 days."],
  ["💳", "No-cost EMI", "0% interest EMI on selected credit and debit cards."],
];

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function BuyRefurbishedGadgetsPage() {
  const [brand, setBrand] = useState("ALL");
  const [grade, setGrade] = useState("Flawless");
  const [saved, setSaved] = useState([]);

  const deals = brand === "ALL" ? DEALS : DEALS.filter((d) => d.brand === brand);

  const toggleSave = (id) =>
    setSaved((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <main className="rf">
      <div className="rf-top">
        <div>
          <Link href="/"><b>SELLBAR</b></Link>
          <Link href="/">← Back to store</Link>
        </div>
      </div>

      <div className="rf-wrap rf-crumbs">
        <Link href="/">Home</Link> / <b>Buy refurbished gadgets</b>
      </div>

      <section className="rf-hero">
        <div className="rf-wrap">
          <h1>Refurbished tech that feels brand new, at up to 70% off</h1>
          <p>
            Buy certified smartphones, laptops, tablets and smartwatches. Every
            gadget goes through a 32-point hardware inspection before it is sold.
          </p>
          <div className="rf-trust">
            <div><b>Warranty</b>Up to 12 months</div>
            <div><b>Testing</b>32-point check</div>
            <div><b>Returns</b>7-day replacement</div>
            <div><b>Payment</b>EMI and COD</div>
          </div>
        </div>
      </section>

      <div className="rf-wrap">
        <section className="rf-sec">
          <h2>Explore categories</h2>
          <p>Working condition guaranteed, with genuine accessories</p>
          <div className="rf-cats">
            {CATEGORIES.map(([title, href, img, emoji, note]) => (
              <Link href={href} className="rf-cat" key={title}>
                <Pic src={img} alt={title} emoji={emoji} />
                <b>{title}</b>
                <small>{note}</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="rf-sec">
          <h2>Trending deals</h2>
          <p>Handpicked refurbished gadgets</p>

          <div className="rf-tabs" role="tablist">
            {TABS.map(([value, label]) => (
              <button
                key={value}
                role="tab"
                aria-selected={brand === value}
                className={brand === value ? "on" : ""}
                onClick={() => setBrand(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {deals.length ? (
            <div className="rf-grid">
              {deals.map((d) => {
                const off = Math.round(((d.mrp - d.price) / d.mrp) * 100);
                return (
                  <article className="rf-card" key={d.id}>
                    <span className="rf-badge">{d.tag}</span>
                    <Pic src={d.img} alt={d.name} emoji={d.emoji} />
                    <span className="rf-small">Grade: {d.grade}</span>
                    <h3>{d.name}</h3>
                    <div className="rf-price">
                      <b>{inr(d.price)}</b>
                      <del>{inr(d.mrp)}</del>
                      <span>{off}% off</span>
                    </div>
                    <Link href="/buy-refurbished" className="rf-btn">Buy certified</Link>
                    <button
                      className="rf-chip"
                      aria-pressed={saved.includes(d.id)}
                      onClick={() => toggleSave(d.id)}
                    >
                      {saved.includes(d.id) ? "♥ Saved" : "♡ Save"}
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rf-state"><h3>No deals in this group yet</h3></div>
          )}
        </section>

        <section className="rf-sec">
          <h2>Understanding cosmetic grades</h2>
          <p>Every device is fully tested. Grades only describe the outer finish.</p>

          <div className="rf-tabs" role="tablist">
            {GRADES.map(([name, letter]) => (
              <button
                key={name}
                role="tab"
                aria-selected={grade === name}
                className={grade === name ? "on" : ""}
                onClick={() => setGrade(name)}
              >
                {letter}: {name}
              </button>
            ))}
          </div>

          <div className="rf-grades">
            {GRADES.map(([name, letter, label, text, points]) => (
              <div className={`rf-box ${grade === name ? "on" : ""}`} key={name}>
                <h3>{letter}: {name} <span className="rf-small">({label})</span></h3>
                <p>{text}</p>
                <ul>{points.map((p) => <li key={p}>✔ {p}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rf-sec rf-dark">
          <h2>32-point technical inspection</h2>
          <p>Every device is tested by hardware engineers before it is listed</p>
          <div className="rf-checks">
            {CHECKS.map(([title, items]) => (
              <div className="rf-box" key={title}>
                <h3>{title}</h3>
                <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rf-sec">
          <div className="rf-perks">
            {PERKS.map(([icon, title, text]) => (
              <div className="rf-box" key={title}>
                <h3>{icon} {title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}