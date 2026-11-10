import React from 'react';
import { Sparkles } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Mobile Accessories, Fast Chargers & Adapters',
  description: 'Shop genuine Apple 20W adapters, Samsung chargers, MagSafe cases and accessories with fast doorstep delivery on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-accessories' },
};

export default function BuyAccessoriesPage() {
  return (
    <EcommerceCatalogView
      categoryKey="accessories"
      categoryTitle="Original Electronics Accessories & Fast Chargers"
      categorySubtitle="100% Genuine Apple 20W adapters, Samsung PD chargers, MagSafe cases, braided USB-C cables and certified tempered glass with doorstep delivery."
      breadcrumbCategory="Electronics Accessories"
      heroBadge="OEM Certified Accessories"
    />
  );
}
