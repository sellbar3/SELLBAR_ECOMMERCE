'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import FoldText from '@/components/FoldText';
const FAQS_BY_CATEGORY = {
    SellSmart: [
        {
            q: 'What should I do if my Amazon voucher shows "Already Redeemed"?',
            a: 'If you encounter an error stating that your Amazon voucher has already been redeemed, please check your Amazon Pay balance first as the amount might already be credited. If not reflected, submit a complaint notice with your transaction ID and our customer escalations team will promptly coordinate with Amazon Pay fraud-desk to issue an instant replacement voucher.',
        },
        {
            q: 'What documents do you need to sell an old mobile phone or gadget?',
            a: 'To sell any device, you only need one government-issued photo ID (Aadhaar card, Driving License, or Voter ID) and the original invoice/bill of the phone (optional, but gets you a higher price quote). Our technician will verify the ID and snap a digital copy on the spot.',
        },
        {
            q: 'How and when do I get paid for my phone?',
            a: 'Payment is 100% instant and processed before you hand over the device. Our verified technician will inspect your phone at your doorstep and instantly transfer funds to your preferred payment method: UPI (Google Pay, PhonePe, Paytm), Instant Bank IMPS, or Amazon Pay gift cards with extra 5% bonus.',
        },
        {
            q: 'What happens to the personal data on my old phone?',
            a: 'We adhere strictly to NIST 800-88 military-grade data sanitization standards. Every device is professionally data-wiped with cryptographic sanitization tools so that your photos, documents, and accounts can never be recovered under any forensic tools.',
        },
        {
            q: 'Do I have to pay any charges for doorstep pickup or evaluation?',
            a: 'No! Doorstep pickup and evaluation are 100% free across 1500+ pin codes in India. Even if you decide not to sell after our technician evaluates your phone, zero cancellation charges apply.',
        },
    ],
    SmartBuy: [
        {
            q: 'What warranty is offered on Certified Refurbished phones and laptops?',
            a: 'Every refurbished phone and laptop comes with up to 12 months comprehensive warranty covering manufacturing and functional defects. In addition, you get a 15-day hassle-free replacement guarantee if anything fails.',
        },
        {
            q: 'What does "32-Point Quality Check" mean?',
            a: 'Our certified engineers run an automated diagnostic test across 32 critical hardware checkpoints, including screen touch response, battery health (>85%), cameras, microphones, speakers, fingerprint/FaceID sensors, Wi-Fi/Bluetooth, and charging ports.',
        },
        {
            q: 'What accessories are included in the refurbished package?',
            a: 'Every refurbished device arrives in a premium eco-friendly box with a compatible fast-charging adapter, braided USB charging cable, SIM ejector pin, and a stamped warranty card.',
        },
        {
            q: 'Can I pay via Cash on Delivery (COD) for refurbished devices?',
            a: 'Yes, we offer Cash on Delivery (COD), No-Cost EMI on major credit/debit cards, UPI, and net banking options across all pin codes in India.',
        },
    ],
    'Repair/Others': [
        {
            q: 'How does the 30-Minute Doorstep Mobile Repair service work?',
            a: 'You select your phone model and the required fix (Screen, Battery, Charging Port, Camera). Our trained mobile engineer visits your home or office with genuine OEM parts and completes the repair right before your eyes within 30 to 45 minutes.',
        },
        {
            q: 'What warranty is provided on mobile repairs?',
            a: 'All screen and component repairs come with up to 6 months warranty card and a 7-day money-back guarantee if you are not fully satisfied with touch sensitivity or performance.',
        },
        {
            q: 'Can I visit a physical store instead of doorstep service?',
            a: 'Yes! We have 200+ exclusive experience centers across major cities including Gurgaon, Delhi NCR, Bengaluru, Mumbai, and Hyderabad where you can walk in anytime from 11:00 AM to 10:00 PM for instant evaluation or repair.',
        },
    ],
};
export default function HomeFaq() {
    const [activeTab, setActiveTab] = useState('SellSmart');
    const [openFaq, setOpenFaq] = useState(0);
    const tabs = ['SellSmart', 'SmartBuy', 'Repair/Others'];
    const currentFaqs = FAQS_BY_CATEGORY[activeTab];
    return (<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-6 space-y-1">
        <span className="text-xs font-bold text-[#13b59b] uppercase tracking-wider flex items-center justify-center gap-1.5">
          <HelpCircle className="w-4 h-4"/>
          <span>Clear Answers, Zero Confusion</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          <FoldText text="Frequently Asked Questions" foldStyle="paper" splitBy="word" hinge="top" trigger="scroll" duration={0.65} stagger={0.04} fontSize="inherit" fontWeight="inherit" color="#111827"/>
        </h2>
      </div>

      {/* Category Tabs (Exact Cashify Tabs) */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="inline-flex p-1 bg-gray-100 rounded-2xl border border-gray-200">
          {tabs.map((tab) => (<button key={tab} onClick={() => {
                setActiveTab(tab);
                setOpenFaq(0);
            }} className={`text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 rounded-xl transition-all duration-200 ${activeTab === tab
                ? 'bg-white text-[#13b59b] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'}`}>
              {tab}
            </button>))}
        </div>
      </div>

      {/* Accordion Items */}
      <div className="space-y-3">
        {currentFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (<div key={idx} className="border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all shadow-xs">
              <button type="button" onClick={() => setOpenFaq(isOpen ? null : idx)} className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-gray-900 flex items-center justify-between gap-4 cursor-pointer hover:text-[#13b59b] transition">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#13b59b]' : ''}`}/>
              </button>
              {isOpen && (<div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>)}
            </div>);
        })}
      </div>
    </section>);
}
