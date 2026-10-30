'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
export default function AboutClient() {
    // Stepper / History data matching Cashify exactly
    const historyData = [
        {
            year: '2022',
            desc: 'Raised $90 million in its Series E funding from NewQuest Capital Partners and Prosus. In March, Sellbar inaugurated its 100th offline store.',
        },
        {
            year: '2021',
            desc: 'Raised Series D funding of $15 million led by New York-based Olympus Capital Asia’s clean energy and sustainability arm, Asia Environmental Partners.',
        },
        {
            year: '2020',
            desc: 'Launched Donate for Education campaign. As schools shifted online, with this drive, Sellbar donated free refurbished mobile phones to support children attend online classes.',
        },
        {
            year: '2019',
            desc: 'Launched first brick and mortar store in Faridabad, expanding physical retail touchpoints across NCR.',
        },
        {
            year: '2018',
            desc: 'Raised a funding of $12 million, led by Chinese private equity firm CDH Investments and Morningside Venture, along with strategic investor AiHuiShou.',
        },
        {
            year: '2017',
            desc: 'Received its Series A funding led by Shunwei Capital and existing investors Bessemer Venture Partners and Blume Ventures.',
        },
        {
            year: '2016',
            desc: 'Raised funding from Bessemer Venture Partners and Blume Ventures.',
        },
        {
            year: '2013',
            desc: 'Became the official buyback partner for various original equipment manufacturers (OEMs) including Apple, Amazon, and Samsung.',
        },
        {
            year: '2009',
            desc: 'Started sustainable e-waste consultancy and consumer trade-in operations in India.',
        },
    ];
    // Default to 2016 as shown in screenshot
    const [activeIndex, setActiveIndex] = useState(6);
    const handlePrevHistory = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : historyData.length - 1));
    };
    const handleNextHistory = () => {
        setActiveIndex((prev) => (prev < historyData.length - 1 ? prev + 1 : 0));
    };
    return (<div className="bg-white text-gray-900 font-sans antialiased selection:bg-[#42c8b7] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Teal background, Big typography, Recycling Girl Graphic) */}
      {/* ========================================================================= */}
      <section className="bg-linear-to-r from-[#2ebaa5] via-[#38c2ab] to-[#42c8b7] text-white pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Reuse &amp; Reduce.
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/95 leading-snug max-w-2xl">
              Our grandparents lived a sustainable life, long before sustainability was even a concept!
            </h2>
            <p className="text-sm sm:text-base text-white/85 max-w-xl font-normal leading-relaxed pt-2">
              Let’s mindfully bring a few sustainable choices back to our current lifestyle, starting with technology!
            </p>
          </div>

          {/* Right Image Column (Cashify Hero Recycling Girl with Bag) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative max-w-md w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://s3ng.cashify.in/builder/3aee7019720a41f2877cfcb169293de4.png" alt="Sustainable Lifestyle - Reuse & Reduce" className="w-full h-auto object-contain drop-shadow-2xl"/>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION: OUR PASSION                                                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left 3D Rendering (Silver Coins Stack, Globe, Smartphone, Watch, Controller) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://s3ng.cashify.in/builder/c1d6aa789e0840bb8992a6f86501c859.png" alt="Tech doesn't need to cost the pocket or the planet" className="w-full h-auto object-contain drop-shadow-lg"/>
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs sm:text-sm font-bold text-[#42c8b7] uppercase tracking-wider">
              OUR PASSION
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
              Building a world where tech doesn’t need to cost the pocket or the planet.
            </h2>
            <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-1">
              <p>To change the lifecycle of every gadget</p>
              <p>By redefining what we choose to do with it</p>
            </div>

            {/* Circular icon graphic matching Cashify */}
            <div className="pt-4 flex justify-end">
              <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center p-3 opacity-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://s3ng.cashify.in/builder/531fe662540e4dfea2e09956b8eaa9f7.png" alt="Recycle icon" className="w-full h-full object-contain"/>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee text below Our Passion */}
        <div className="mt-12 bg-[#42c8b7] text-white py-3 overflow-hidden rounded-xl">
          <div className="inline-flex gap-8 items-center text-xs sm:text-sm font-black tracking-widest uppercase animate-marquee">
            <span>BUY. REPAIR. SELL. REFURBISH. REUSE. REPEAT.</span>
            <span>★</span>
            <span>BUY. REPAIR. SELL. REFURBISH. REUSE. REPEAT.</span>
            <span>★</span>
            <span>BUY. REPAIR. SELL. REFURBISH. REUSE. REPEAT.</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: OUR PROMISE                                                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs sm:text-sm font-bold text-[#42c8b7] uppercase tracking-wider">
              OUR PROMISE
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
              Adding “right way” to business for the planet and the people who live on it.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              To fulfill your everyday tech needs and dreams... sustainably, affordably and easily!
            </p>
          </div>

          {/* Right Hand Holding Island Showcase Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-md flex items-center justify-center border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://s3ng.cashify.in/builder/54bdc441ebc54173800fb553a16fe327.png" alt="Our Promise" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: OUR PRINCIPLE (Center Card Layout with Side Artwork)          */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-linear-to-r from-gray-50 via-[#f0fbf9] to-gray-50 rounded-3xl p-8 sm:p-16 text-center border border-gray-200/80 shadow-xs max-w-4xl mx-auto space-y-3 relative overflow-hidden">
          <div className="text-xs sm:text-sm font-bold text-[#42c8b7] uppercase tracking-wider">
            OUR PRINCIPLE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Somebody’s waste is someone else’s resource
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Making every tech dream count!
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. BE A PART OF SOLUTION NOT POLLUTION (Teal Banner + Black Stat Cards)   */}
      {/* ========================================================================= */}
      <section className="relative">
        {/* Top Banner (Teal) */}
        <div className="bg-[#42c8b7] text-white py-12 px-4 sm:px-8 text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-wide">
            BE A PART OF SOLUTION NOT POLLUTION
          </h2>
          <p className="text-base sm:text-xl font-medium text-white/95">
            When you reuse just one phone:
          </p>
        </div>

        {/* Bottom Black Strip with 3 Impact Numbers and Cashify 3D Visuals */}
        <div className="bg-black text-white py-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-start">
            {/* Card 1: Water */}
            <div className="p-6 space-y-3 flex flex-col items-center">
              <div className="w-24 h-24 mb-2 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://s3ng.cashify.in/builder/6e5856854de242b9bde0dbab12cabec5.png" alt="Water Drop" className="max-h-full max-w-full object-contain"/>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#42c8b7]">
                909
              </div>
              <div className="text-xl font-bold text-white">liters of water</div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xs mx-auto leading-relaxed">
                save people from staying thirsty for 100 years
              </p>
            </div>

            {/* Card 2: Raw Material */}
            <div className="p-6 space-y-3 flex flex-col items-center">
              <div className="w-24 h-24 mb-2 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://s3ng.cashify.in/builder/df34927acf55458d8c95554f77405802.png" alt="Raw Material" className="max-h-full max-w-full object-contain"/>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#42c8b7]">
                258 kg
              </div>
              <div className="text-xl font-bold text-white">of raw material</div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xs mx-auto leading-relaxed">
                saved from landing in landfill
              </p>
            </div>

            {/* Card 3: CO2 Emissions */}
            <div className="p-6 space-y-3 flex flex-col items-center">
              <div className="w-24 h-24 mb-2 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://s3ng.cashify.in/builder/5d4deb55f30a4dc4bf1ddb8926b20eb2.png" alt="CO2 emissions" className="max-h-full max-w-full object-contain"/>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#42c8b7]">
                80 kg
              </div>
              <div className="text-xl font-bold text-white">of CO2 emissions</div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xs mx-auto leading-relaxed">
                prevented from entering our atmosphere
              </p>
            </div>
          </div>

          {/* Bottom tag & Button */}
          <div className="max-w-3xl mx-auto text-center pt-8 border-t border-gray-800 space-y-4">
            <p className="text-sm sm:text-base text-gray-300">
              Let’s switch to tech that’s better for planet &amp; better for pocket.
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Let’s make refurbished the only new.
            </h3>
            <div className="pt-2">
              <Link href="/what-is-refurbished" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#42c8b7] hover:bg-[#38b2a0] text-black font-bold text-xs uppercase tracking-wider transition-colors">
                <span>What is Refurbished?</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION: OUR HISTORY (Horizontal Stepper Line matching Cashify)        */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-12">
        <div className="space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight uppercase">
            OUR HISTORY
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            We have grown from a team of 3 to an organization of 2000, but our vision remains the same -
          </p>
          <div className="text-xl sm:text-2xl font-black text-[#42c8b7] uppercase tracking-wider">
            ROBUST SUSTAINABILITY
          </div>
        </div>

        {/* Stepper Line Container */}
        <div className="relative py-8">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-gray-200 via-[#42c8b7] to-gray-200 -translate-y-1/2 z-0"/>

          {/* Stepper Active Node in Center */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white border-4 border-[#42c8b7] shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-[#42c8b7]"/>
            </div>
          </div>
        </div>

        {/* 3 Years Display (Left: Previous, Center: Active, Right: Next) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
          {/* Previous Year */}
          {(() => {
            const prevIdx = activeIndex > 0 ? activeIndex - 1 : historyData.length - 1;
            const prevItem = historyData[prevIdx];
            return (<button type="button" onClick={handlePrevHistory} className="opacity-70 hover:opacity-100 transition-opacity text-center p-4 cursor-pointer">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-2">
                  {prevItem.year}
                </div>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {prevItem.desc}
                </p>
              </button>);
        })()}

          {/* Active Center Year */}
          <div className="text-center p-6 bg-white rounded-2xl border-2 border-[#42c8b7]/40 shadow-xl scale-105 transition-all">
            <div className="text-4xl sm:text-6xl font-black text-gray-900 mb-3 tracking-tight">
              {historyData[activeIndex].year}
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
              {historyData[activeIndex].desc}
            </p>
          </div>

          {/* Next Year */}
          {(() => {
            const nextIdx = activeIndex < historyData.length - 1 ? activeIndex + 1 : 0;
            const nextItem = historyData[nextIdx];
            return (<button type="button" onClick={handleNextHistory} className="opacity-70 hover:opacity-100 transition-opacity text-center p-4 cursor-pointer">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-2">
                  {nextItem.year}
                </div>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {nextItem.desc}
                </p>
              </button>);
        })()}
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button type="button" onClick={handlePrevHistory} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#42c8b7] hover:text-white flex items-center justify-center transition-colors text-gray-800 shadow-xs cursor-pointer" aria-label="Previous Year">
            <ChevronLeft className="w-5 h-5"/>
          </button>
          <button type="button" onClick={handleNextHistory} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#42c8b7] hover:text-white flex items-center justify-center transition-colors text-gray-800 shadow-xs cursor-pointer" aria-label="Next Year">
            <ChevronRight className="w-5 h-5"/>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OUR PLATFORMS (Solid Charcoal Slate Background + 3 White Cards + 1 Wide) */}
      {/* ========================================================================= */}
      <section className="bg-[#616365] py-20 sm:py-28 px-4 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-3xl sm:text-5xl font-black text-center tracking-tight uppercase">
            OUR PLATFORMS
          </h2>

          {/* Top Row: 3 White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Platform 1: SELL */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div>
                  <span className="text-2xl font-black text-[#42c8b7] block">SELL</span>
                  <span className="text-xl font-bold text-gray-900 block">Old Device</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Gift yourself a chance to upgrade. Gift your device a new home. Gift someone else a smile.
                </p>
                <div className="pt-2 border-t border-dashed border-gray-200 space-y-2 text-xs font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>Get Best Price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>Avail Doorstep Pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>Instant Payment</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Link href="/sell" className="w-10 h-10 rounded-full bg-black hover:bg-[#42c8b7] text-white flex items-center justify-center transition-colors" aria-label="Sell Old Device">
                  <ArrowRight className="w-5 h-5"/>
                </Link>
              </div>
            </div>

            {/* Platform 2: BUY */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div>
                  <span className="text-2xl font-black text-[#42c8b7] block">BUY</span>
                  <span className="text-xl font-bold text-gray-900 block">Refurbished Device</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Buy your dream phone at almost half price. Better for pocket. Better for Planet
                </p>
                <div className="pt-2 border-t border-dashed border-gray-200 space-y-2 text-xs font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>32 point quality check</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>6 months warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>Easy No-Cost EMIs</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Link href="/buy-refurbished" className="w-10 h-10 rounded-full bg-black hover:bg-[#42c8b7] text-white flex items-center justify-center transition-colors" aria-label="Buy Refurbished">
                  <ArrowRight className="w-5 h-5"/>
                </Link>
              </div>
            </div>

            {/* Platform 3: REPAIR */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div>
                  <span className="text-2xl font-black text-[#42c8b7] block">REPAIR</span>
                  <span className="text-xl font-bold text-gray-900 block">Phone</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Cracked screen, battery troubles, mic or speaker glitches? Get everything repaired at rocket-speed.
                </p>
                <div className="pt-2 border-t border-dashed border-gray-200 space-y-2 text-xs font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>Doorstep service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>7 Days Refund</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>6 months warranty</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <Link href="/repair" className="w-10 h-10 rounded-full bg-black hover:bg-[#42c8b7] text-white flex items-center justify-center transition-colors" aria-label="Repair Phone">
                  <ArrowRight className="w-5 h-5"/>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row: 1 Full-width White Card (Experience IN-STORE) */}
          <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:-translate-y-1 transition-transform">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                  Experience
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#42c8b7] block">
                  IN-STORE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                Not an online person? Walk into any Sellbar store near you
              </p>
              <div className="flex flex-wrap gap-6 pt-1 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>200+ stores</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#42c8b7]/20 text-[#42c8b7] flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Across 70+ cities</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex sm:self-center">
              <Link href="/contact" className="w-10 h-10 rounded-full bg-black hover:bg-[#42c8b7] text-white flex items-center justify-center transition-colors" aria-label="Find Stores">
                <ArrowRight className="w-5 h-5"/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SECTION: OUR PEOPLE (With Real Founder Photos + Teal First-Letter)     */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-12">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight uppercase">
            OUR PEOPLE
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            We’re in the business of efficiency and collaboration. <br className="hidden sm:inline"/>
            Get to know the founders and team leaders making it all happen.
          </p>
        </div>

        {/* 4 People Columns matching Cashify with Real Portraits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {/* Person 1: Mandeep Manocha */}
          <div className="flex flex-col space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://s3ng.cashify.in/builder/23a74583d4e84a20afac32f2079003e8.png" alt="Mandeep Manocha" className="w-full h-full object-contain"/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                <span className="text-[#42c8b7] font-black text-2xl">M</span>andeep Manocha
              </h3>
              <p className="text-xs text-gray-500 font-medium pt-0.5">Co-Founder, CEO</p>
            </div>
          </div>

          {/* Person 2: Amit Sethi */}
          <div className="flex flex-col space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://s3ng.cashify.in/builder/a9b4256d77c94feeb81bf622699c2658.png" alt="Amit Sethi" className="w-full h-full object-contain"/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                <span className="text-[#42c8b7] font-black text-2xl">A</span>mit Sethi
              </h3>
              <p className="text-xs text-gray-500 font-medium pt-0.5">Co-Founder</p>
            </div>
          </div>

          {/* Person 3: Nakul Kumar */}
          <div className="flex flex-col space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://s3ng.cashify.in/builder/82283d93128944e5b4b1e13b581ffc06.png" alt="Nakul Kumar" className="w-full h-full object-contain"/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                <span className="text-[#42c8b7] font-black text-2xl">N</span>akul Kumar
              </h3>
              <p className="text-xs text-gray-500 font-medium pt-0.5">Co-Founder, Chief Marketing Officer</p>
            </div>
          </div>

          {/* Person 4: Siddhant Dhingra */}
          <div className="flex flex-col space-y-3">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://s3ng.cashify.in/builder/6d494746821e4217a9233f7172c417ea.png" alt="Siddhant Dhingra" className="w-full h-full object-contain"/>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                <span className="text-[#42c8b7] font-black text-2xl">S</span>iddhant Dhingra
              </h3>
              <p className="text-xs text-gray-500 font-medium pt-0.5">
                Co-Founder, Chief Business Officer, Global Markets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. JOIN THE CIRCLE MARQUEE & JOIN US CTA                                  */}
      {/* ========================================================================= */}
      <section className="border-t border-gray-100">
        {/* Black Marquee Ribbon with Outline */}
        <div className="bg-black text-white py-3 overflow-hidden whitespace-nowrap">
          <div className="inline-flex gap-8 items-center text-sm sm:text-base font-black tracking-widest uppercase animate-marquee">
            <span>REFURBISH. RENEW. RECYCLE. REFURBISH. RENEW. RECYCLE. REFURBISH. RENEW. RECYCLE. REFURBISH.</span>
            <span>★</span>
            <span>REFURBISH. RENEW. RECYCLE. REFURBISH. RENEW. RECYCLE. REFURBISH. RENEW. RECYCLE. REFURBISH.</span>
          </div>
        </div>

        {/* Teal Marquee Ribbon */}
        <div className="bg-[#42c8b7] text-white py-3 overflow-hidden whitespace-nowrap">
          <div className="inline-flex gap-8 items-center text-sm sm:text-base font-black tracking-widest uppercase animate-marquee">
            <span>JOIN THE CIRCLE. JOIN THE CIRCLE. JOIN THE CIRCLE. JOIN THE CIRCLE. JOIN THE CIRCLE.</span>
            <span>★</span>
            <span>JOIN THE CIRCLE. JOIN THE CIRCLE. JOIN THE CIRCLE. JOIN THE CIRCLE. JOIN THE CIRCLE.</span>
          </div>
        </div>

        {/* White CTA Section with Graphic & Black Pill Button */}
        <div className="py-16 sm:py-24 px-4 sm:px-8 text-center max-w-3xl mx-auto space-y-6">
          <div className="w-28 h-28 mx-auto flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://s3ng.cashify.in/builder/100407fd89734aacb21200be1d680cd8.png" alt="Join the circle" className="max-h-full max-w-full object-contain"/>
          </div>

          <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
            Join us in the business of change. Let’s redefine how we treat our old gadgets. Let’s create a no-waste world that is smarter and more sustainable.
          </p>

          <div>
            <Link href="/career" className="inline-flex items-center justify-center px-10 py-3 rounded-full bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md">
              Join Us
            </Link>
          </div>
        </div>
      </section>
    </div>);
}
