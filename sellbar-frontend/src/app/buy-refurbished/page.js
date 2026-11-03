'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyRefurbishedPage() {
  return (
    <EcommerceCatalogView
      categoryKey="all"
      categoryTitle="Certified Refurbished Electronics & Gadgets"
      categorySubtitle="Save up to 70% on Apple iPhones, MacBooks, Samsung flagships, tablets and smartwatches. 100% genuine with 32-point hardware inspection & 1-Year Doorstep Warranty."
      breadcrumbCategory="All Refurbished Electronics"
      categoryIcon={Sparkles}
      heroBadge="Sellbar Official Certified Store"
    />
  );
}
