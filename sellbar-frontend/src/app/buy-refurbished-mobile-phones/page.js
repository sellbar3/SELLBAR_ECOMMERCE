'use client';

import React from 'react';
import { Smartphone } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyRefurbishedMobilePhonesPage() {
  return (
    <EcommerceCatalogView
      categoryKey="mobile-phones"
      categoryTitle="Buy Refurbished Mobile Phones & Flagships"
      categorySubtitle="Top deals on certified Apple iPhones, Samsung Galaxy, OnePlus, Pixel and Xiaomi. Every phone is 32-point tested with guaranteed 85%+ battery health and 12-month warranty."
      breadcrumbCategory="Refurbished Mobile Phones"
      categoryIcon={Smartphone}
      heroBadge="Flagships at Unbeatable Prices"
    />
  );
}
