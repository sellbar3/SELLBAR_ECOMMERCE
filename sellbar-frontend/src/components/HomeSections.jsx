"use client";

import Link from "next/link";
import "./HomeSections.css";

const reviews = [
  {
    name: "Aman Verma",
    city: "Gurgaon",
    title: "Got cash in 20 minutes at my doorstep",
    review:
      "The technician arrived on time with an ID card, ran the quick diagnostics in front of me, and the money reached my UPI account instantly.",
  },
  {
    name: "Priya Sundaram",
    city: "Bengaluru",
    title: "Refurbished laptop looks brand new",
    review:
      "I was unsure about buying refurbished, but the battery health and condition were excellent. The warranty gave me peace of mind.",
  },
  {
    name: "Rohit Kulkarni",
    city: "Mumbai",
    title: "Screen replaced in 30 minutes",
    review:
      "I dropped my phone and cracked the glass. The engineer fixed it at my office and gave me a warranty card.",
  },
];

const repairItems = [
  ["📱", "Screen glass fix", "From ₹1,499"],
  ["🔋", "Battery replacement", "From ₹999"],
  ["🔌", "Charging port fix", "From ₹599"],
  ["🎧", "Mic & speaker", "From ₹699"],
];

const steps = [
  ["Check your price", "Pick your model and answer a few questions to get a quote in a minute."],
  ["Book a free pickup", "Choose a date and time. A verified agent visits your home or office."],
  ["Get paid on the spot", "After a quick check, the money is sent by UPI or bank transfer."],
];

const pillars = [
  ["⚡", "Instant price quote", "Get a price for your device based on current market demand."],
  ["🚚", "Free doorstep pickup", "No trips to crowded markets. We come to you."],
  ["💳", "Instant payment", "Receive the money in your UPI or bank account on handover."],
  ["🛡️", "Certified data wipe", "Your photos and documents are erased before resale."],
];

const compareRows = [
  ["Price transparency", "Fair quote", "Unrealistic lowballs", "Arbitrary cuts"],
  ["Convenience", "Free doorstep pickup", "Meet strangers in public", "Travel to a market"],
  ["Payment", "Instant UPI / IMPS", "Fake cheque / UPI fraud risk", "Cash haggling"],
  ["Data safety", "Certified data wipe", "High privacy risk", "No guarantee"],
];

export function HomeMoreSections() {
  return (
    <div className="hs">
      {/* Doorstep repair */}
      <section className="hs-repair">
        <div className="hs-repair-copy">
          <span className="hs-pill">⏱ 30-minute doorstep fix</span>
          <h2>Broken screen or battery? We repair at your doorstep</h2>
          <p>
            A trained technician brings OEM parts and fixes your phone in front
            of you. Includes a 6-month warranty and free diagnostics.
          </p>
          <ul className="hs-ticks">
            <li>✔ 6 months repair warranty</li>
            <li>✔ Live repair in front of you</li>
            <li>✔ Pay after you are satisfied</li>
          </ul>
          <Link href="/repair" className="hs-btn">
            🛠 Book doorstep repair
          </Link>
        </div>

        <div className="hs-repair-grid">
          {repairItems.map(([icon, title, cost]) => (
            <div className="hs-repair-card" key={title}>
              <span>{icon}</span>
              <b>{title}</b>
              <small>{cost}</small>
            </div>
          ))}
        </div>
      </section>

      {/* How to sell */}
      <section className="hs-block">
        <h2 className="hs-title">How to sell your old phone in 3 steps</h2>
        <div className="hs-steps">
          {steps.map(([title, text], i) => (
            <div className="hs-step" key={title}>
              <span className="hs-step-no">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="hs-block">
        <h2 className="hs-title">Why customers choose us</h2>
        <div className="hs-pillars">
          {pillars.map(([icon, title, text]) => (
            <div className="hs-pillar" key={title}>
              <span className="hs-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="hs-block">
        <h2 className="hs-title">Selling on SELLBAR vs other channels</h2>
        <div className="hs-table-wrap">
          <table className="hs-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="hs-us">SELLBAR</th>
                <th>Online classifieds</th>
                <th>Local stores</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(([feature, us, a, b]) => (
                <tr key={feature}>
                  <td className="hs-feature">{feature}</td>
                  <td className="hs-us hs-yes">✔ {us}</td>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <section className="hs-block">
        <h2 className="hs-title">What customers say</h2>
        <div className="hs-reviews">
          {reviews.map((r) => (
            <article className="hs-review" key={r.name}>
              <div className="hs-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <h3>{r.title}</h3>
              <p>{r.review}</p>
              <footer>
                <b>{r.name}</b>
                <small>{r.city}</small>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* Store banner */}
      <section className="hs-store">
        <div>
          <h2>Prefer in-person evaluation? Visit a SELLBAR store</h2>
          <p>
            Walk in for instant payment, a free screen inspection and hands-on
            refurbished demos.
          </p>
        </div>
        <Link href="/about" className="hs-btn">
          🏪 Find nearest store
        </Link>
      </section>
    </div>
  );
}