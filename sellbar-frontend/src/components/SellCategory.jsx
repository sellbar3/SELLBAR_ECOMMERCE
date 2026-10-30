"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import "@/css/Refurb.css";
import "@/css/Sell.css";

const CONDITIONS = [
  ["flawless", "Flawless", 1],
  ["good", "Good", 0.88],
  ["average", "Average", 0.72],
];

const STEPS = [
  ["Check your price", "Pick your model and choose its condition to see an estimate."],
  ["Book a free pickup", "Choose a date and time. A verified agent visits your home or office."],
  ["Get paid on the spot", "After an inspection, the money is sent by UPI or bank transfer."],
];

const WHY = [
  ["💰", "Fair price", "Estimates follow current market demand for your device."],
  ["⚡", "Fast payment", "Get paid by UPI or bank transfer once the check is done."],
  ["🚚", "Free pickup", "No travel and no pickup fee."],
  ["🛡️", "Data wipe", "Your files and accounts are erased before resale."],
];

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function SellCategory({ name, emoji, title, subtitle, brands, models, faqs }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [condition, setCondition] = useState("flawless");
  const [picked, setPicked] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const factor = CONDITIONS.find(([key]) => key === condition)[2];

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    return models.filter(
      (m) =>
        (brand === "All" || m.brand === brand) &&
        (!q || m.name.toLowerCase().includes(q) || m.brand.toLowerCase().includes(q))
    );
  }, [models, brand, search]);

  const price = (m) => Math.round(m.max * factor);
  const chosen = models.find((m) => m.id === picked);

  return (
    <main className="rf">
      <div className="rf-top">
        <div>
          <Link href="/"><b>SELLBAR</b></Link>
          <Link href="/">← Back to store</Link>
        </div>
      </div>

      <div className="rf-wrap rf-crumbs">
        <Link href="/">Home</Link> / <Link href="/sell">Sell old device</Link> / <b>{name}</b>
      </div>

      <section className="rf-hero">
        <div className="rf-wrap">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <input
            className="sl-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search your ${name.toLowerCase()} model`}
            aria-label={`Search ${name} model`}
          />
        </div>
      </section>

      <div className="rf-wrap">
        <section className="rf-sec">
          <h2>Select brand</h2>
          <p>{brands.length} brands available</p>
          <div className="sl-brands">
            {["All", ...brands].map((b) => (
              <button
                key={b}
                className={`sl-brand ${brand === b ? "on" : ""}`}
                aria-pressed={brand === b}
                onClick={() => setBrand(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </section>

        <section className="rf-sec">
          <div className="sl-head">
            <div>
              <h2>Popular {brand === "All" ? name : brand} models</h2>
              <p style={{ margin: 0 }}>{list.length} models. Prices are estimates.</p>
            </div>

            <div className="rf-tabs" role="tablist" aria-label="Device condition" style={{ margin: 0 }}>
              {CONDITIONS.map(([key, label, f]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={condition === key}
                  className={condition === key ? "on" : ""}
                  onClick={() => setCondition(key)}
                >
                  {label} ({Math.round(f * 100)}%)
                </button>
              ))}
            </div>
          </div>

          {list.length ? (
            <div className="rf-grid">
              {list.map((m) => (
                <button
                  key={m.id}
                  className={`sl-model ${picked === m.id ? "on" : ""}`}
                  onClick={() => setPicked(m.id)}
                  aria-pressed={picked === m.id}
                >
                  <span className="rf-pic"><span className="rf-emoji" aria-hidden="true">{emoji}</span></span>
                  <span className="rf-small">{m.brand}</span>
                  <b>{m.name}</b>
                  {m.specs && <span className="rf-small">{m.specs}</span>}
                  <span className="rf-small">Get up to</span>
                  <strong>{inr(price(m))}</strong>
                </button>
              ))}
            </div>
          ) : (
            <div className="rf-state">
              <span>🔎</span>
              <h3>No models match your search</h3>
              <button className="rf-btn" onClick={() => { setSearch(""); setBrand("All"); }}>
                Reset search
              </button>
            </div>
          )}

          {chosen && (
            <div className="sl-quote" role="status">
              <h3>{chosen.name}</h3>
              <span className="rf-small">
                Estimated price for {CONDITIONS.find(([k]) => k === condition)[1]} condition
              </span>
              <strong>{inr(price(chosen))}</strong>
              <span className="rf-small">
                The final price is confirmed after the device is inspected.
              </span>
            </div>
          )}
        </section>

        <section className="rf-sec">
          <h2>How to sell your old {name.toLowerCase()}</h2>
          <p>Three steps, usually done within a day</p>
          <div className="sl-steps">
            {STEPS.map(([t, d], i) => (
              <div className="rf-box" key={t}>
                <span className="sl-no">{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rf-sec">
          <h2>Why sell on SELLBAR</h2>
          <p>&nbsp;</p>
          <div className="rf-checks">
            {WHY.map(([icon, t, d]) => (
              <div className="rf-box" key={t}>
                <h3>{icon} {t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rf-sec">
          <h2>Frequently asked questions</h2>
          <p>&nbsp;</p>
          <div className="sl-faq">
            {faqs.map(([q, a], i) => (
              <div key={q}>
                <button
                  className="sl-q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{q}</span>
                  <span aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="sl-a">{a}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}