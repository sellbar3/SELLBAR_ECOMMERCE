'use client';

import React from 'react';
import { Laptop } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyRefurbishedLaptopsPage() {
  return (
    <EcommerceCatalogView
      categoryKey="laptop"
      categoryTitle="Buy Refurbished Laptops & Apple MacBooks"
      categorySubtitle="Enterprise-grade Dell Latitude, Lenovo ThinkPad, HP Envy and Apple MacBook Air & Pro. Pre-tested, cleaned, re-pasted and backed by 1-Year Doorstep Warranty."
      breadcrumbCategory="Refurbished Laptops"
      categoryIcon={Laptop}
      heroBadge="Business & Gaming Laptops"
    />
  );
}
