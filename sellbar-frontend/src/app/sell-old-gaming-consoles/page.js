import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old PlayStation, Xbox & Nintendo Consoles Online',
  description: 'Sell used Sony PS5, PS4 Pro, Xbox Series X/S, and Nintendo Switch consoles with instant online valuation and free doorstep pickup on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-gaming-consoles' },
};

export default function SellOldGamingConsolesPage() {
  return <UniversalDeviceSellView categoryKey="gaming-consoles" />;
}
