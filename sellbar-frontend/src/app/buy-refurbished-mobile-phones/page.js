import React from 'react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Refurbished Mobile Phones & Smartphones',
  description: 'Shop certified refurbished Apple iPhones, Samsung Galaxy, OnePlus and Pixel 5G phones with 32-point inspection and 12-month warranty on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-refurbished-mobile-phones' },
};

export default function BuyRefurbishedMobilePhonesPage() {
  return (
    <EcommerceCatalogView
      categoryKey="mobile-phones"
      categoryTitle="Buy Refurbished Mobile Phones & Flagships"
      categorySubtitle="Top deals on certified Apple iPhones, Samsung Galaxy, OnePlus, Pixel and Xiaomi. Every phone is 32-point tested with guaranteed 85%+ battery health and 12-month warranty."
      breadcrumbCategory="Refurbished Mobile Phones"
      heroBadge="Flagships at Unbeatable Prices"
    />
  );
}
