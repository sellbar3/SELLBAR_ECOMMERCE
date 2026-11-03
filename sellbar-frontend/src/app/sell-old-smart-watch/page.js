import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Apple Watch & Smartwatch for Instant Cash',
  description: 'Sell your used Apple Watch, Samsung Galaxy Watch, or Fossil smartwatch for instant cash with free doorstep pickup on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-smart-watch' },
};

export default function SellSmartWatchPage() {
  return <UniversalDeviceSellView categoryKey="smart-watch" />;
}
