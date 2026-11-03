import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Smart LED TV Online for Instant Cash',
  description: 'Sell your used 32, 43, 55, or 65 Smart LED, OLED or QLED TV online with free doorstep pickup and instant payment on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-television' },
};

export default function SellOldTelevisionPage() {
  return <UniversalDeviceSellView categoryKey="television" />;
}
