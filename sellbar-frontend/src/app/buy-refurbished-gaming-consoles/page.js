'use client';

import React from 'react';
import { Gamepad2 } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyRefurbishedGamingConsolesPage() {
  return (
    <EcommerceCatalogView
      categoryKey="gaming-consoles"
      categoryTitle="Buy Refurbished PS5, Xbox & Gaming Consoles"
      categorySubtitle="Sony PS5, Microsoft Xbox Series X/S, and Nintendo Switch OLED. HDMI port, cooling fans, and DualSense controllers 100% stress-tested with 12-Month Warranty."
      breadcrumbCategory="Refurbished Gaming Consoles"
      categoryIcon={Gamepad2}
      heroBadge="Next-Gen Gaming Gear"
    />
  );
}
