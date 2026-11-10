import React from 'react';
import { Sparkles } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Certified Refurbished Gadgets & Electronics',
  description: 'Shop certified refurbished Apple iPhones, MacBooks, Dell laptops, tablets & smartwatches at up to 70% off with 12 months warranty on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-refurbished' },
};

export default function BuyRefurbishedPage() {
  return (
    <EcommerceCatalogView
      categoryKey="all"
      categoryTitle="Certified Refurbished Electronics & Gadgets"
      categorySubtitle="Save up to 70% on Apple iPhones, MacBooks, Samsung flagships, tablets and smartwatches. 100% genuine with 32-point hardware inspection & 1-Year Doorstep Warranty."
      breadcrumbCategory="All Refurbished Electronics"
      heroBadge="Sellbar Official Certified Store"
    />
  );
}
