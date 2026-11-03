import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell Old Smart Speakers, Echo & HomePod for Cash',
  description: 'Sell your used Amazon Echo, Echo Dot, Echo Show, or Apple HomePod for the highest resale value with free doorstep pickup on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-smart-speaker' },
};

export default function SellSmartSpeakerPage() {
  return <UniversalDeviceSellView categoryKey="smart-speaker" />;
}
