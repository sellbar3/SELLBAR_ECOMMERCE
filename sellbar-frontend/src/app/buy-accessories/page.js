'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyAccessoriesPage() {
  return (
    <EcommerceCatalogView
      categoryKey="accessories"
      categoryTitle="Original Electronics Accessories & Fast Chargers"
      categorySubtitle="100% Genuine Apple 20W adapters, Samsung PD chargers, MagSafe cases, braided USB-C cables and certified tempered glass with doorstep delivery."
      breadcrumbCategory="Electronics Accessories"
      categoryIcon={Sparkles}
      heroBadge="OEM Certified Accessories"
    />
  );
}
