'use client';

import React from 'react';
import Link from 'next/link';
import './HotDeals.css';

const FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="100%" height="100%" fill="%23edf7f5"/></svg>';

const deals = [
  {
    id: 1,
    title: 'Mega Exchange Carnival',
    subtitle: 'Extra ₹3,000 Bonus on Exchange',
    image: '/deals/hot-deal-1.webp',
    href: '/sell',
  },
  {
    id: 2,
    title: 'Refurbished iPhone Bonanza',
    subtitle: 'Up to 60% OFF + 12M Warranty',
    image: '/deals/hot-deal-2.webp',
    href: '/buy-refurbished?category=phones',
  },
  {
    id: 3,
    title: 'Doorstep Repair Special',
    subtitle: 'Free Screen Protector on Every Repair',
    image: '/deals/hot-deal-3.webp',
    href: '/repair',
  },
  {
    id: 4,
    title: 'Laptops & MacBooks Sale',
    subtitle: 'Premium Core i5 & M-Series From ₹24,499',
    image: '/deals/hot-deal-4.webp',
    href: '/buy-refurbished?category=laptops',
  },
];

export default function HotDealsSection() {
  return (
    <section className="hd-wrap">
      <div className="hd-head">
        <div>
          <div className="hd-tag">✨ Limited Period Offers</div>
          <h2 className="hd-title">Hot Deals</h2>
          <p className="hd-sub">Exciting offers for more value</p>
        </div>
        <Link href="/buy-refurbished" className="hd-all">
          View All Deals →
        </Link>
      </div>

      <div className="hd-grid">
        {deals.map((deal) => (
          <Link key={deal.id} href={deal.href} className="hd-card">
            <div className="hd-img">
              <img
                src={deal.image}
                alt={deal.title}
                width={640}
                height={360}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK;
                }}
              />
            </div>
            <div className="hd-body">
              <h3>{deal.title}</h3>
              <p>{deal.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}