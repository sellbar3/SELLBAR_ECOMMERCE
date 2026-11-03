import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell AirPods & TWS Earbuds Online | Sellbar.in',
  description: 'Sell your Apple AirPods Pro, Galaxy Buds, and Sony wireless earbuds for top cash with free doorstep pickup.',
};

export default function SellEarbudsPage() {
  return <UniversalDeviceSellView categoryKey="earbuds" />;
}
