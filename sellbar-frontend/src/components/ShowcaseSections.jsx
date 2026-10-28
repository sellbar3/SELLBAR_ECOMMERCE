"use client";

import { useState } from "react";
import Link from "next/link";
import "./ShowcaseSections.css";

/* Image with an emoji fallback, so a missing file never leaves a blank box */
function Pic({ src, alt, emoji }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return <span className="sc-emoji" aria-hidden="true">{emoji}</span>;
  }

  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

/* ---------- Sell your old device ---------- */

const SELL = [
  ["Sell Phone", "/sell", "sell-phone.webp", "📱"],
  ["Sell Laptop", "/sell/laptops", "sell-laptop.webp", "💻"],
  ["Sell TV", "/sell", "sell-tv.webp", "📺"],
  ["Sell Tablet", "/sell/tablets", "sell-tablet.webp", "📲"],
  ["Sell Gaming Consoles", "/sell", "sell-gaming.webp", "🎮"],
  ["Sell Smartwatch", "/sell", "sell-smartwatch.webp", "⌚"],
  ["Sell Smart Speakers", "/sell", "sell-smart-speaker.webp", "🔊"],
  ["Sell More", "/sell", "sell-more.webp", "➕"],
];

export function SellDeviceSection() {
  return (
    <section className="sc">
      <h2 className="sc-title">Sell your old device now</h2>
      <div className="sc-sell">
        {SELL.map(([title, href, icon, emoji]) => (
          <Link href={href} className="sc-sell-card" key={title}>
            <span className="sc-sell-img">
              <Pic src={`/sell-icons/${icon}`} alt={title} emoji={emoji} />
            </span>
            <span>{title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------- Refurbished phones & laptops ---------- */

const PHONE_TABS = ["All", "iPhones", "Samsung Galaxy", "OnePlus", "Under ₹20,000", "Under ₹40,000"];

const PHONES = [
  { id: "oppo", title: "OPPO Reno15 Pro 5G", cat: "Under ₹40,000", price: "₹54,999", mrp: "₹79,999", off: "₹25,000 OFF", rating: 4.2, tag: "Lowest price", img: "phone-oppo-reno15.jpg" },
  { id: "s21", title: "Samsung Galaxy S21 Ultra 5G", cat: "Samsung Galaxy", price: "₹36,699", mrp: "₹73,600", off: "₹36,901 OFF", rating: 4.5, tag: "Bestseller", img: "phone-samsung-s21.jpg" },
  { id: "s24", title: "Samsung Galaxy S24 Ultra 5G", cat: "Samsung Galaxy", price: "₹67,299", mrp: "₹1,34,999", off: "₹67,700 OFF", rating: 4.8, tag: "Flagship deal", img: "phone-samsung-s24.jpg" },
  { id: "nord2", title: "OnePlus Nord 2 5G", cat: "Under ₹20,000", price: "₹16,699", mrp: "₹30,899", off: "₹14,200 OFF", rating: 4.3, tag: "Budget pick", img: "phone-oneplus-nord2.jpg" },
  { id: "op12", title: "OnePlus 12", cat: "OnePlus", price: "₹41,399", mrp: "₹69,999", off: "₹28,600 OFF", rating: 4.6, tag: "Hot seller", img: "phone-oneplus-12.jpg" },
  { id: "fold5", title: "Samsung Galaxy Z Fold5", cat: "Samsung Galaxy", price: "₹69,499", mrp: "₹1,54,999", off: "₹85,500 OFF", rating: 4.7, tag: "Foldable deal", img: "phone-samsung-fold5.jpg" },
];

const LAPTOPS = [
  { id: "t14", title: "Lenovo ThinkPad T14 Gen 1 (Ryzen 5 Pro)", spec: "16GB / 512GB SSD", price: "₹27,299", mrp: "₹47,849", off: "₹20,550 OFF", rating: 4.4, tag: "Best value", img: "laptop-lenovo-thinkpad.webp" },
  { id: "d3410", title: "Dell Latitude 3410 (Core i5 10th Gen)", spec: "8GB / 256GB SSD", price: "₹24,499", mrp: "₹39,999", off: "₹15,500 OFF", rating: 4.3, tag: "Top pick", img: "laptop-dell-3410-i5.png" },
  { id: "d5310", title: "Dell Latitude 5310 (Core i5 10th Gen)", spec: "16GB / 512GB SSD", price: "₹29,799", mrp: "₹34,999", off: "₹5,200 OFF", rating: 4.5, tag: "Business class", img: "laptop-dell-5310.png" },
  { id: "mbp", title: "Apple MacBook Pro 2023 (M3 Max, 16 inch)", spec: "36GB / 1TB SSD", price: "₹2,18,499", mrp: "₹3,65,399", off: "₹1,46,900 OFF", rating: 4.9, tag: "Pro grade", img: "laptop-macbook-pro-m3.webp" },
  { id: "d3410i7", title: "Dell Latitude 3410 (Core i7 10th Gen)", spec: "16GB / 512GB SSD", price: "₹30,199", mrp: "₹44,999", off: "₹14,800 OFF", rating: 4.4, tag: "Core i7", img: "laptop-dell-3410-i7.png" },
  { id: "d5320", title: "Dell Latitude 5320 (Core i5 11th Gen)", spec: "16GB / 512GB SSD", price: "₹31,499", mrp: "₹44,999", off: "₹13,500 OFF", rating: 4.6, tag: "11th Gen", img: "laptop-dell-5320.png" },
];

function ProductCard({ item, emoji, cta }) {
  return (
    <article className="sc-card">
      <div className="sc-card-top">
        <span className="sc-assured">✔ Assured</span>
        <span className="sc-off">{item.off}</span>
      </div>

      <div className="sc-card-img">
        <Pic src={`/products/${item.img}`} alt={item.title} emoji={emoji} />
      </div>

      <h3 title={item.title}>{item.title}</h3>
      {item.spec && <p className="sc-spec">{item.spec}</p>}

      <div className="sc-meta">
        <span className="sc-tag">{item.tag}</span>
        <span className="sc-rating">{item.rating} ★</span>
      </div>

      <div className="sc-price">
        <b>{item.price}</b>
        <del>{item.mrp}</del>
      </div>

      <Link href="/buy-refurbished" className="sc-buy">🛍 {cta}</Link>
    </article>
  );
}

function SectionHead({ title, note, link, linkText }) {
  return (
    <div className="sc-head">
      <div>
        <h2 className="sc-title left">{title}</h2>
        <p>{note}</p>
      </div>
      <Link href={link}>{linkText} →</Link>
    </div>
  );
}

function PhonesSection() {
  const [tab, setTab] = useState("All");
  const list = tab === "All" ? PHONES : PHONES.filter((p) => p.cat === tab || p.title.toLowerCase().includes(tab.toLowerCase()));

  return (
    <section className="sc">
      <SectionHead
        title="Buy refurbished phones"
        note="Certified refurbished smartphones with warranty"
        link="/buy-refurbished"
        linkText="View all phones"
      />

      <div className="sc-tabs" role="tablist">
        {PHONE_TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="sc-grid">
          {list.map((p) => <ProductCard key={p.id} item={p} emoji="📱" cta="Buy now" />)}
        </div>
      ) : (
        <p className="sc-empty">No phones in this group yet.</p>
      )}
    </section>
  );
}

function LaptopsSection() {
  return (
    <section className="sc">
      <SectionHead
        title="Refurbished laptops"
        note="MacBooks, ThinkPads and Dell Latitudes with warranty"
        link="/buy-refurbished"
        linkText="View all laptops"
      />
      <div className="sc-grid">
        {LAPTOPS.map((l) => <ProductCard key={l.id} item={l} emoji="💻" cta="Buy laptop" />)}
      </div>
    </section>
  );
}

/* ---------- Articles & news ---------- */

const ARTICLES = [
  { title: "All details about Apple MacBook Ultra launching in 2026", date: "13 Mar 2026", text: "A look at the expected OLED display, chip performance and price predictions.", img: "article-macbook-ultra.webp" },
  { title: "iQOO Z11x vs OPPO K13: which is better under ₹20,000", date: "11 Mar 2026", text: "Display, processor, battery and camera compared side by side.", img: "article-iqoo-oppo.webp" },
];

const NEWS = [
  { title: "iPhone Fold repair cost in India: screen replacement priced at ₹1,49,900", date: "17 Oct 2026", img: "news-iphone-repair.png", href: "/repair" },
  { title: "MacBook Pro leak hints at October launch, OLED display and price hike", date: "17 Oct 2026", img: "news-macbook-leak.png", href: "/buy-refurbished" },
  { title: "Nothing Phone 4a deal: get the phone at ₹36,999 with bank offers", date: "16 Oct 2026", img: "news-nothing-phone.png", href: "/buy-refurbished" },
];

function ArticlesSection() {
  return (
    <section className="sc sc-news">
      <div>
        <SectionHead title="Trending articles" note="Tech analysis and comparisons" link="/blog" linkText="See all articles" />
        <div className="sc-list">
          {ARTICLES.map((a) => (
            <Link href="/blog" className="sc-row big" key={a.title}>
              <span className="sc-thumb"><Pic src={`/articles/${a.img}`} alt={a.title} emoji="📰" /></span>
              <span>
                <small>{a.date}</small>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <SectionHead title="Recent news" note="Latest updates" link="/blog" linkText="See all news" />
        <div className="sc-list">
          {NEWS.map((n) => (
            <Link href={n.href} className="sc-row" key={n.title}>
              <span className="sc-thumb small"><Pic src={`/articles/${n.img}`} alt={n.title} emoji="🗞️" /></span>
              <span>
                <small>{n.date}</small>
                <h3>{n.title}</h3>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShowcaseSections() {
  return (
    <>
      <PhonesSection />
      <LaptopsSection />
      <ArticlesSection />
    </>
  );
}