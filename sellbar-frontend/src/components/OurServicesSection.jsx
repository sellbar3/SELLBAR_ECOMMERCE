'use client';
import React from 'react';
import FoldText from '@/components/FoldText';
import Link from 'next/link';
const SERVICES = [
    // Row 1 (8 Items from the reference)
    {
        id: 'sell-phone',
        title: 'Sell Phone',
        href: '/sell-old-mobile-phone',
        imageSrc: '/services/sell-phone.webp',
    },
    {
        id: 'buy-gadgets',
        title: 'Buy Gadgets',
        href: '/buy-refurbished-gadgets',
        imageSrc: '/services/buy-gadgets.webp',
    },
    {
        id: 'buy-phone',
        title: 'Buy Phone',
        href: '/buy-refurbished-mobile-phones',
        imageSrc: '/services/buy-phone.webp',
    },
    {
        id: 'buy-laptops',
        title: 'Buy Laptops',
        href: '/buy-refurbished-laptops',
        imageSrc: '/services/buy-laptops.webp',
    },
    {
        id: 'rent-ps5',
        title: 'Rent PS5',
        href: '/rent-ps5',
        imageSrc: '/services/rent-ps5.gif',
    },
    {
        id: 'buy-cameras',
        title: 'Buy Cameras & Lenses',
        href: '/buy-refurbished-dslr-cameras',
        imageSrc: '/services/buy-cameras.webp',
    },
    {
        id: 'pixel-upgrade',
        title: 'Pixel Upgrade',
        href: '/sell-old-mobile-phone',
        imageSrc: '/services/pixel-upgrade.webp',
    },
    {
        id: 'buy-gaming',
        title: 'Buy Gaming Consoles',
        href: '/buy-refurbished-gaming-consoles',
        imageSrc: '/services/buy-gaming.webp',
    },
    // Row 2 (9 Items)
    {
        id: 'repair-phone',
        title: 'Repair Phone',
        href: '/repair',
        imageSrc: '/services/repair-phone.webp',
    },
    {
        id: 'repair-laptop',
        title: 'Repair Laptop',
        href: '/laptop-repair',
        imageSrc: '/services/repair-laptop.webp',
    },
    {
        id: 'find-new-phone',
        title: 'Find New Phone',
        href: '/find-new-phone',
        imageSrc: '/services/find-new-phone.webp',
    },
    {
        id: 'nearby-stores',
        title: 'Nearby Stores',
        href: '/offline-stores',
        imageSrc: '/services/nearby-stores.webp',
    },
    {
        id: 'new-accessories',
        title: 'New Accessories',
        href: '/buy-accessories',
        imageSrc: '/services/new-accessories.webp',
    },
    {
        id: 'buy-smartwatches',
        title: 'Buy Smartwatches',
        href: '/buy-refurbished-smart-watches',
        imageSrc: '/services/buy-smartwatches.webp',
    },
    {
        id: 'recycle',
        title: 'Recycle',
        href: '/recycle-old-mobile-phone',
        imageSrc: '/services/recycle.webp',
    },
    {
        id: 'buy-tablets',
        title: 'Buy Tablets',
        href: '/buy-refurbished-tablets',
        imageSrc: '/services/buy-tablets.webp',
    },
    {
        id: 'sell-car',
        title: 'Sell Your Car',
        href: '/sell-used-car',
        imageSrc: 'https://s3ng.cashify.in/builder/59ac716944da403faf28ddc15e188ac3.gif?w=300',
    },
];
export default function OurServicesSection() {
    return (<section className="bg-white py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading: "Our Services" */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-4">
          <FoldText text="Our Services" foldStyle="paper" splitBy="word" hinge="top" trigger="scroll" duration={0.65} stagger={0.05} fontSize="inherit" fontWeight="inherit" color="#111827"/>
        </h2>

        {/* Services Grid: 8 items per row on desktop (lg), 4 on tablet, 2-3 on mobile */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
          {SERVICES.map((service) => (<Link key={service.id} href={service.href} className="group flex flex-col items-center text-center focus:outline-none">
              {/* Card Container: Soft mint/cyan background matching Cashify */}
              <div className="w-full h-24 sm:h-28 bg-[#edf7f5] hover:bg-[#e4f3ef] border border-[#d8ece7] group-hover:border-[#13b59b]/50 rounded-2xl flex items-center justify-center p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.imageSrc} alt={service.title} loading="lazy" className="max-h-16 sm:max-h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"/>
              </div>

              {/* Service Title Label */}
              <span className="mt-2 text-xs sm:text-[13px] font-bold text-gray-800 group-hover:text-[#13b59b] transition-colors leading-snug px-1 text-center line-clamp-2">
                {service.title}
              </span>
            </Link>))}
        </div>
      </div>
    </section>);
}
