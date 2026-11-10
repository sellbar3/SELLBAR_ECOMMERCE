import React from 'react';
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
      heroBadge="Guaranteed Like New Condition"
    />
  );
}
