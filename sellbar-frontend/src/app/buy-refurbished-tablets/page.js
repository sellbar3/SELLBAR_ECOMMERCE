import React from 'react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Refurbished Apple iPads & Android Tablets',
  description: 'Certified Apple iPads, iPad Air, iPad Pro, and Samsung Galaxy Tab devices at unbeatable prices with 12 months warranty on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-refurbished-tablets' },
};

export default function BuyRefurbishedTabletsPage() {
  return (
    <EcommerceCatalogView
      categoryKey="tablets"
      categoryTitle="Buy Refurbished Apple iPads & Android Tablets"
      categorySubtitle="Certified iPads, iPad Pro M2, iPad Air, and Samsung Galaxy Tab models with stylus support, spotless displays, and 12-Month Doorstep Replacement Warranty."
      breadcrumbCategory="Refurbished Tablets & iPads"
      heroBadge="Tablets & Creative Workstations"
    />
  );
}
