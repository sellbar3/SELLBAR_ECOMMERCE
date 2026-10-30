'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCloudinaryUrl } from '@/lib/cloudinary';

const HERO_BANNERS = [
  {
    id: 1,
    image: getCloudinaryUrl('/banners/hero-banner-1.webp'),
    alt: 'Sell Old Phone with Instant Doorstep Cash',
    href: '/sell',
  },
  {
    id: 2,
    image: getCloudinaryUrl('/banners/hero-banner-2.webp'),
    alt: 'Buy Refurbished Phones Up to 50% Off',
    href: '/buy-refurbished',
  },
  {
    id: 3,
    image: getCloudinaryUrl('/banners/hero-banner-3.webp'),
    alt: 'Sell Old Laptops & MacBooks at Best Value',
    href: '/sell/laptops',
  },
  {
    id: 4,
    image: getCloudinaryUrl('/banners/hero-banner-4.webp'),
    alt: 'Doorstep Phone Repair in 30 Minutes',
    href: '/repair',
  },
  {
    id: 5,
    image: getCloudinaryUrl('/banners/hero-banner-5.webp'),
    alt: 'Mega Exchange Bonus and Discount Offers',
    href: '/sell',
  },
  {
    id: 6,
    image: getCloudinaryUrl('/banners/hero-banner-6.webp'),
    alt: 'Sellbar Assured Refurbished 12M Warranty',
    href: '/buy-refurbished',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_BANNERS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlide, isPaused]);

  return (
    <section
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-sm border border-gray-200/80 bg-gray-100">
        {/* Banner Link & Image Container */}
        <Link
          href={HERO_BANNERS[currentSlide].href}
          className="block w-full aspect-21/9 sm:aspect-24/9 md:aspect-3/1 max-h-95 relative overflow-hidden"
        >
          <img
            src={HERO_BANNERS[currentSlide].image}
            alt={HERO_BANNERS[currentSlide].alt}
            className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-[1.01]"
          />
        </Link>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition border border-gray-200 z-20 cursor-pointer"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition border border-gray-200 z-20 cursor-pointer"
          aria-label="Next banner"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicators at bottom */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
          {HERO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide(idx);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? 'w-7 sm:w-8 h-2 sm:h-2.5 bg-[#13b59b]'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/70 hover:bg-white shadow-xs'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
