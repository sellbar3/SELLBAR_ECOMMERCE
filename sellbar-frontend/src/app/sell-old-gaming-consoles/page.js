import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell PlayStation, Xbox & Nintendo Consoles | Best Price | Sellbar.in',
  description: 'Sell used Sony PS5, PS4 Pro, Xbox Series X/S, and Nintendo Switch consoles with instant online valuation and free doorstep pickup in Bihar.',
};

export default function SellOldGamingConsolesPage() {
  return <UniversalDeviceSellView categoryKey="gaming-consoles" />;
}
