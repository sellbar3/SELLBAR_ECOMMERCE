'use client';

import React from 'react';
import { Tablet } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyRefurbishedTabletsPage() {
  return (
    <EcommerceCatalogView
      categoryKey="tablets"
      categoryTitle="Buy Refurbished Apple iPads & Android Tablets"
      categorySubtitle="Certified iPads, iPad Pro M2, iPad Air, and Samsung Galaxy Tab models with stylus support, spotless displays, and 12-Month Doorstep Replacement Warranty."
      breadcrumbCategory="Refurbished Tablets & iPads"
      categoryIcon={Tablet}
      heroBadge="Tablets & Creative Workstations"
    />
  );
}
