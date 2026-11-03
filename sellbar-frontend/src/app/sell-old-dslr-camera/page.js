import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell DSLR & Mirrorless Cameras Online for Top Cash',
  description: 'Sell your used Canon, Sony, Nikon, or Fujifilm camera body & lenses for maximum valuation with verified doorstep pickup on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/sell-old-dslr-camera' },
};

export default function SellDslrCameraPage() {
  return <UniversalDeviceSellView categoryKey="dslr-camera" />;
}
