import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Apple AirPods & TWS Wireless Earbuds Online',
  description: 'Sell your Apple AirPods Pro, Galaxy Buds, and Sony wireless earbuds for top cash with free doorstep pickup on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-earbuds' },
};

export default function SellEarbudsPage() {
  return <UniversalDeviceSellView categoryKey="earbuds" />;
}
