import React from 'react';
import UniversalDeviceSellView from '@/components/sell/UniversalDeviceSellView';

export const metadata = {
  title: 'Sell DSLR & Mirrorless Camera Online | Instant Cash | Sellbar.in',
  description: 'Sell your used Canon, Sony, Nikon, or Fujifilm camera body & lenses for maximum valuation with verified doorstep pickup.',
};

export default function SellDslrCameraPage() {
  return <UniversalDeviceSellView categoryKey="dslr-camera" />;
}
