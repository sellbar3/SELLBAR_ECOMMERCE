import React from 'react';
import { Zap } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Refurbished Gadgets & Pre-Owned Electronics',
  description: 'Explore certified pre-owned smartphones, laptops, audio, tablets and gaming gear tested for 100% functionality with 12 months warranty on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-refurbished-gadgets' },
};

export default function BuyRefurbishedGadgetsPage() {
  return (
    <EcommerceCatalogView
      categoryKey="all"
      categoryTitle="Certified Refurbished Gadgets & Electronics"
      categorySubtitle="Explore verified pre-owned smartphones, laptops, audio, tablets and gaming gear tested for 100% functionality with doorstep delivery across India."
      breadcrumbCategory="Refurbished Gadgets"
      categoryIcon={Zap}
      heroBadge="Guaranteed Like New Condition"
    />
  );
}
