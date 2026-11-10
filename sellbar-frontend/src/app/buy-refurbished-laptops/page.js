import React from 'react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Refurbished Laptops & Apple MacBooks',
  description: 'Shop certified refurbished Apple MacBooks, Dell Latitude, Lenovo ThinkPad & HP laptops with 12 months warranty and doorstep delivery on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-refurbished-laptops' },
};

export default function BuyRefurbishedLaptopsPage() {
  return (
    <EcommerceCatalogView
      categoryKey="laptop"
      categoryTitle="Buy Refurbished Laptops & Apple MacBooks"
      categorySubtitle="Enterprise-grade Dell Latitude, Lenovo ThinkPad, HP Envy and Apple MacBook Air & Pro. Pre-tested, cleaned, re-pasted and backed by 1-Year Doorstep Warranty."
      breadcrumbCategory="Refurbished Laptops"
      heroBadge="Business & Gaming Laptops"
    />
  );
}
