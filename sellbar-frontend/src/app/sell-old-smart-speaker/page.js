import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Smart Speaker | Instant Cash for Echo & HomePod | Sellbar.in',
  description: 'Sell your used Amazon Echo, Echo Dot, Echo Show, or Apple HomePod for the highest resale value with free doorstep pickup.',
};

export default function SellSmartSpeakerPage() {
  return <UniversalDeviceSellView categoryKey="smart-speaker" />;
}
