'use client';
import React from 'react';
import Link from 'next/link';
export default function BrandPartnersSlider() {
    const brands = [
        {
            name: 'Apple',
            category: 'Phone',
            href: '/sell',
            icon: (<svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.92.04-2.08.62-2.73 1.37-.58.66-1.09 1.74-.96 2.78 1.03.08 2.13-.53 2.77-1.28"/>
        </svg>),
        },
        {
            name: 'SAMSUNG',
            category: 'Phone',
            href: '/sell',
            icon: (<span className="font-black tracking-[0.2em] text-base uppercase">SAMSUNG</span>),
        },
        {
            name: 'HP',
            category: 'Laptop',
            href: '/sell/laptops',
            icon: (<div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-black italic text-sm tracking-tighter">
          hp
        </div>),
        },
        {
            name: 'Paytm',
            category: 'Partner',
            href: '/sell',
            icon: (<span className="font-black text-lg tracking-tight lowercase">
          pay<span className="uppercase text-white">tm</span>
        </span>),
        },
        {
            name: 'NOKIA',
            category: 'Phone',
            href: '/sell',
            icon: (<span className="font-black tracking-[0.25em] text-sm uppercase">NOKIA</span>),
        },
        {
            name: 'ONEPLUS',
            category: 'Phone',
            href: '/sell',
            icon: (<div className="flex items-center gap-1.5 font-bold">
          <div className="w-5 h-5 border-2 border-white rounded-xs flex items-center justify-center text-[11px] font-black leading-none">
            1+
          </div>
          <span className="tracking-wider uppercase text-sm font-black">ONEPLUS</span>
        </div>),
        },
        {
            name: 'DELL',
            category: 'Laptop',
            href: '/sell/laptops',
            icon: (<div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-black text-[11px] tracking-wider">
          DELL
        </div>),
        },
        {
            name: 'Reliance Digital',
            category: 'Partner',
            href: '/sell',
            icon: (<div className="flex items-center gap-1 text-xs font-black tracking-tight">
          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
          <span className="lowercase font-bold">reliance</span>
          <span className="font-black uppercase">digital</span>
        </div>),
        },
        {
            name: 'Xiaomi',
            category: 'Phone',
            href: '/sell',
            icon: (<div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-white text-[#13b59b] font-black text-xs flex items-center justify-center">
            mi
          </div>
          <span className="font-bold text-sm">Xiaomi</span>
        </div>),
        },
        {
            name: 'Google Pixel',
            category: 'Phone',
            href: '/sell',
            icon: (<div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center font-black text-xs">
            G
          </div>
          <span className="font-bold text-sm tracking-tight">Google Pixel</span>
        </div>),
        },
        {
            name: 'Lenovo',
            category: 'Laptop',
            href: '/sell/laptops',
            icon: (<div className="px-2 py-0.5 border border-white font-black text-xs tracking-wider uppercase">
          Lenovo
        </div>),
        },
        {
            name: 'ASUS',
            category: 'Laptop',
            href: '/sell/laptops',
            icon: (<span className="font-black tracking-[0.2em] text-sm uppercase">ASUS</span>),
        },
        {
            name: 'acer',
            category: 'Laptop',
            href: '/sell/laptops',
            icon: (<span className="font-bold text-sm tracking-widest lowercase">acer</span>),
        },
        {
            name: 'vivo',
            category: 'Phone',
            href: '/sell',
            icon: (<span className="font-black tracking-widest text-base lowercase">vivo</span>),
        },
        {
            name: 'OPPO',
            category: 'Phone',
            href: '/sell',
            icon: (<span className="font-black tracking-[0.25em] text-sm uppercase">OPPO</span>),
        },
        {
            name: 'motorola',
            category: 'Phone',
            href: '/sell',
            icon: (<div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center font-black text-sm">
            M
          </div>
          <span className="font-semibold text-xs tracking-wider lowercase">motorola</span>
        </div>),
        },
        {
            name: 'realme',
            category: 'Phone',
            href: '/sell',
            icon: (<span className="font-black text-sm lowercase tracking-wider">realme</span>),
        },
    ];
    // We repeat the array 2 times to ensure seamless infinite looping without gaps
    const repeatedBrands = [...brands, ...brands];
    return (<div className="w-full bg-[#13b59b] py-3.5 sm:py-4.5 overflow-hidden shadow-xs relative select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left-to-right {
          display: flex;
          width: max-content;
          animation: marquee-ltr 32s linear infinite;
        }
        .animate-marquee-left-to-right:hover {
          animation-play-state: paused;
        }
      ` }}/>

      <div className="animate-marquee-left-to-right items-center gap-10 sm:gap-14 text-white">
        {repeatedBrands.map((brand, index) => (<Link key={index} href={brand.href} className="flex items-center gap-2 hover:opacity-85 transition-opacity shrink-0 px-2 group cursor-pointer" title={`${brand.name} - Sell & Buy Refurbished`}>
            <div className="transition-transform duration-200 group-hover:scale-110 flex items-center justify-center">
              {brand.icon}
            </div>
            {/* If the icon does not already contain the full name, show the name text */}
            {brand.name === 'HP' && (<span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Hewlett-Packard</span>)}
            {brand.name === 'DELL' && (<span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Dell Technologies</span>)}
          </Link>))}
      </div>
    </div>);
}
