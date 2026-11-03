import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Smart Watch | Instant Doorstep Payout | Sellbar.in',
  description: 'Sell your used Apple Watch, Samsung Galaxy Watch, or Fossil smartwatch for instant cash with free doorstep pickup in Bettiah and Bihar.',
};

export default function SellSmartWatchPage() {
  return <UniversalDeviceSellView categoryKey="smart-watch" />;
}
