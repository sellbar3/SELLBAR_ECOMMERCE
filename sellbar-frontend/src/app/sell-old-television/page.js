import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old TV Online | Instant Doorstep Cash | Sellbar.in',
  description: 'Sell your used 32, 43, 55, or 65 Smart LED, OLED or QLED TV online with free doorstep dismount and instant payment across Bihar.',
};

export default function SellOldTelevisionPage() {
  return <UniversalDeviceSellView categoryKey="television" />;
}
