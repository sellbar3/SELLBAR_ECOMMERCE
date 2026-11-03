import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Apple iMac & Mac Mini for Best Resale Cash',
  description: 'Sell your used Apple iMac 24 M1/M3, 27 5K Retina or Mac Mini desktop online for immediate cash payout on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-imac' },
};

export default function SellOldImacPage() {
  return <UniversalDeviceSellView categoryKey="imac" />;
}
