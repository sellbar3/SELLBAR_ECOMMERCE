'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export default function BuyRefurbishedDslrCamerasPage() {
  return (
    <EcommerceCatalogView
      categoryKey="cameras"
      categoryTitle="Buy Refurbished DSLR, Mirrorless Cameras & Lenses"
      categorySubtitle="Sony Alpha, Canon EOS, Nikon Z mirrorless cameras and prime/zoom lenses. Tested sensor, clean glass, shutter count verified with 12-Month Doorstep Warranty."
      breadcrumbCategory="Refurbished DSLR & Mirrorless Cameras"
      categoryIcon={Camera}
      heroBadge="Pro Photography Gear"
    />
  );
}
