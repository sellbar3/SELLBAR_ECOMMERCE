import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Laptop & MacBook Online for Instant Cash',
  description: 'Sell your used laptop, ThinkPad, Dell, HP or Apple MacBook online with guaranteed highest valuation and doorstep pickup across Bihar on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-laptop' },
};

export default function SellOldLaptopPage() {
  return <UniversalDeviceSellView categoryKey="laptop" />;
}
