import React from 'react';
import { Camera } from 'lucide-react';
import EcommerceCatalogView from '@/components/catalog/EcommerceCatalogView';

export const metadata = {
  title: 'Buy Refurbished DSLR, Mirrorless Cameras & Lenses',
  description: 'Certified Sony Alpha, Canon EOS, and Nikon DSLR & mirrorless cameras with verified shutter counts and 12-month warranty on Sellbar.in.',
  alternates: { canonical: 'https://sellbar.in/buy-refurbished-dslr-cameras' },
};

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
