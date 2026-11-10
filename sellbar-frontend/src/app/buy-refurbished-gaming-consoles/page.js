import React from 'react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Refurbished PS5, Xbox & Gaming Consoles',
  description: 'Certified Sony PlayStation 5, Xbox Series X/S, and Nintendo Switch consoles with 12 months warranty and doorstep delivery on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-refurbished-gaming-consoles' },
};

export default function BuyRefurbishedGamingConsolesPage() {
  return (
    <EcommerceCatalogView
      categoryKey="gaming-consoles"
      categoryTitle="Buy Refurbished PS5, Xbox & Gaming Consoles"
      categorySubtitle="Sony PS5, Microsoft Xbox Series X/S, and Nintendo Switch OLED. HDMI port, cooling fans, and DualSense controllers 100% stress-tested with 12-Month Warranty."
      breadcrumbCategory="Refurbished Gaming Consoles"
      heroBadge="Next-Gen Gaming Gear"
    />
  );
}
