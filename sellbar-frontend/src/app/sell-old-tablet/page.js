import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old iPad & Tablet Online for Instant Doorstep Cash',
  description: 'Sell your used Apple iPad, Samsung Galaxy Tab or Android tablet online with instant valuation and free doorstep pickup on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-tablet' },
};

export default function SellOldTabletPage() {
  return <UniversalDeviceSellView categoryKey="tablet" />;
}
