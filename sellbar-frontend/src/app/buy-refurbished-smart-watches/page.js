'use client';

import React from 'react';
import { Watch } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyRefurbishedSmartWatchesPage() {
  return (
    <EcommerceCatalogView
      categoryKey="smart-watches"
      categoryTitle="Buy Refurbished Apple Watch & Smartwatches"
      categorySubtitle="Certified Apple Watch Ultra, Series 9, Samsung Galaxy Watch and Garmin GPS wearables. ECG and sensors tested with guaranteed 90%+ battery life."
      breadcrumbCategory="Refurbished Smartwatches"
      categoryIcon={Watch}
      heroBadge="Health & Fitness Wearables"
    />
  );
}
