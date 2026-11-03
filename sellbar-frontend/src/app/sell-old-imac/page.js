import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Apple iMac & Mac Mini | Best Resale Rates | Sellbar.in',
  description: 'Sell your used Apple iMac 21.5, 24 M1/M3, or 27 5K Retina desktop computer online for immediate cash payout with free doorstep inspection.',
};

export default function SellOldImacPage() {
  return <UniversalDeviceSellView categoryKey="imac" />;
}
