import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Tablet,
  ShieldCheck,
  Sparkles,
  Zap,
  ShoppingBag,
  Tag,
  Star,
  Flame,
  Award,
  ArrowRight,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { getCloudinaryUrl } from '@/lib/cloudinary';

export const PROMOTIONAL_ANNOUNCEMENTS = [
  {
    text: '🔥 Super Exchange Bonanza: Get up to ₹1,500 extra on old phones!',
    link: '/sell-old-mobile-phone',
  },
  {
    text: '⚡ Free Express Doorstep Delivery Across West Champaran & Bihar!',
    link: '/shipping-policy',
  },
  {
    text: '🛡️ 12-Month Comprehensive Warranty on Certified Refurbished Gadgets',
    link: '/buy-refurbished',
  },
];

export const BRAND_ITEMS = [
  {
    name: 'Apple',
    slug: 'apple',
    href: '/shop/brands?brand=apple',
    sellHref: '/sell-old-mobile-phone/apple',
    badge: 'Flagship',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=100&auto=format&fit=crop&q=80',
    count: '28+ Models',
  },
  {
    name: 'Samsung',
    slug: 'samsung',
    href: '/shop/brands?brand=samsung',
    sellHref: '/sell-old-mobile-phone/samsung',
    badge: 'Popular',
    logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&auto=format&fit=crop&q=80',
    count: '42+ Models',
  },
  {
    name: 'OnePlus',
    slug: 'oneplus',
    href: '/shop/brands?brand=oneplus',
    sellHref: '/sell-old-mobile-phone/oneplus',
    badge: 'Speed',
    logo: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&auto=format&fit=crop&q=80',
    count: '19+ Models',
  },
  {
    name: 'Xiaomi',
    slug: 'xiaomi',
    href: '/shop/brands?brand=xiaomi',
    sellHref: '/sell-old-mobile-phone/xiaomi',
    badge: 'Value',
    logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&auto=format&fit=crop&q=80',
    count: '35+ Models',
  },
  {
    name: 'Vivo',
    slug: 'vivo',
    href: '/shop/brands?brand=vivo',
    sellHref: '/sell-old-mobile-phone/vivo',
    badge: 'Camera',
    logo: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&auto=format&fit=crop&q=80',
    count: '22+ Models',
  },
  {
    name: 'Oppo',
    slug: 'oppo',
    href: '/shop/brands?brand=oppo',
    sellHref: '/sell-old-mobile-phone/oppo',
    badge: 'Portrait',
    logo: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=100&auto=format&fit=crop&q=80',
    count: '20+ Models',
  },
  {
    name: 'Realme',
    slug: 'realme',
    href: '/shop/brands?brand=realme',
    sellHref: '/sell-old-mobile-phone/realme',
    badge: 'Budget',
    logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&auto=format&fit=crop&q=80',
    count: '25+ Models',
  },
  {
    name: 'Motorola',
    slug: 'motorola',
    href: '/shop/brands?brand=motorola',
    sellHref: '/sell-old-mobile-phone/motorola',
    badge: 'Clean UI',
    logo: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=100&auto=format&fit=crop&q=80',
    count: '16+ Models',
  },
  {
    name: 'Google Pixel',
    slug: 'google-pixel',
    href: '/shop/brands?brand=google',
    sellHref: '/sell-old-mobile-phone/google',
    badge: 'AI Phone',
    logo: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=100&auto=format&fit=crop&q=80',
    count: '12+ Models',
  },
];

export const CATEGORIES_MEGA_MENU = {
  columns: [
    {
      title: 'Mobiles',
      icon: Smartphone,
      links: [
        { label: 'All Smartphones', href: '/buy-refurbished-mobile-phones', badge: 'Popular' },
        { label: 'Android Phones', href: '/shop/categories/mobiles?os=android' },
        { label: '5G Smartphones', href: '/shop/categories/mobiles?network=5g', badge: 'Fast' },
        { label: 'Refurbished Mobiles', href: '/buy-refurbished-mobile-phones' },
        { label: 'Budget Phones Under ₹15k', href: '/buy-refurbished-mobile-phones?price=under-15000' },
      ],
    },
    {
      title: 'Electronics',
      icon: Laptop,
      links: [
        { label: 'Refurbished Laptops', href: '/buy-refurbished-laptops', badge: 'Hot' },
        { label: 'Tablets & iPads', href: '/buy-refurbished-tablets' },
        { label: 'Smart Watches', href: '/buy-refurbished-smart-watches' },
        { label: 'Audio & Earbuds', href: '/buy-accessories?type=earbuds' },
        { label: 'DSLR Cameras', href: '/buy-refurbished-dslr-cameras' },
        { label: 'Gaming Consoles', href: '/buy-refurbished-gaming-consoles' },
      ],
    },
    {
      title: 'Accessories',
      icon: Headphones,
      links: [
        { label: 'Mobile Phone Covers', href: '/buy-accessories?type=covers' },
        { label: 'Fast Chargers (OEM)', href: '/buy-accessories?type=chargers', badge: 'Best' },
        { label: 'Braided Type-C Cables', href: '/buy-accessories?type=cables' },
        { label: 'Earphones & TWS', href: '/buy-accessories?type=earphones' },
        { label: 'Power Banks (20000mAh)', href: '/buy-accessories?type=powerbanks' },
      ],
    },
  ],
  featured: {
    tag: 'LIMITED TIME DEAL',
    title: 'Certified Renewed Flagships',
    subtitle: 'Save up to 55% on iPhone 13, 14 & Galaxy S-Series with 1-Year Doorstep Warranty.',
    image: getCloudinaryUrl('/cashify/guide-iphone13-mini.webp'),
    ctaText: 'Explore Certified Stock',
    ctaHref: '/shop?filter=featured-deals',
  },
};

export const SHOP_MENU_ITEMS = [
  {
    title: 'All Products',
    desc: 'Browse entire certified refurbished catalog',
    href: '/shop',
    icon: ShoppingBag,
    badge: 'Catalog',
  },
  {
    title: 'New Arrivals',
    desc: 'Freshly audited gadgets added this week',
    href: '/shop?filter=new-arrivals',
    icon: Sparkles,
    badge: 'New',
  },
  {
    title: 'Best Sellers',
    desc: 'Top-rated flagships loved by 50,000+ buyers',
    href: '/shop?filter=best-sellers',
    icon: Flame,
    badge: 'Popular',
  },
  {
    title: 'Trending Products',
    desc: 'Most viewed electronics in your region',
    href: '/shop?filter=trending',
    icon: TrendingUp,
  },
  {
    title: 'Featured Deals',
    desc: 'Special price drops on laptops and tablets',
    href: '/shop?filter=featured-deals',
    icon: Tag,
    badge: 'Save 50%',
  },
  {
    title: 'Recommended Products',
    desc: 'Handpicked devices with highest battery health',
    href: '/shop?filter=recommended',
    icon: Award,
  },
];

export const SELL_OLD_MOBILE_MENU = {
  brands: [
    { label: 'Sell Old iPhone', href: '/sell-old-mobile-phone/apple', max: '₹68,000' },
    { label: 'Sell Old Samsung', href: '/sell-old-mobile-phone/samsung', max: '₹52,000' },
    { label: 'Sell Old Vivo', href: '/sell-old-mobile-phone/vivo', max: '₹34,000' },
    { label: 'Sell Old Oppo', href: '/sell-old-mobile-phone/oppo', max: '₹28,000' },
    { label: 'Sell Old Xiaomi', href: '/sell-old-mobile-phone/xiaomi', max: '₹22,000' },
    { label: 'Sell Old OnePlus', href: '/sell-old-mobile-phone/oneplus', max: '₹38,000' },
    { label: 'Sell Any Smartphone', href: '/sell-old-mobile-phone', max: 'Instant Cash' },
    { label: 'View All Mobile Brands', href: '/sell-old-mobile-phone', max: '30+ Brands' },
  ],
  promo: {
    heading: 'Sell Your Old Phone',
    desc: 'Get the best estimated resale value for your smartphone with 100% free doorstep pickup & instant UPI payout.',
    cta: 'Sell Now',
    href: '/sell-old-mobile-phone',
  },
};

export const NEW_ARRIVALS_MENU = [
  {
    label: 'Recently Added Devices',
    desc: 'Inspected and certified in the last 48 hours',
    href: '/shop?filter=new-arrivals',
  },
  {
    label: 'Latest Smartphones',
    desc: 'iPhone 14, Galaxy S23, OnePlus 12R & Pixel 8',
    href: '/buy-refurbished-mobile-phones?sort=newest',
  },
  {
    label: 'Latest Electronics',
    desc: 'MacBook M2, ThinkPad series, and iPad Air',
    href: '/buy-refurbished-laptops?sort=newest',
  },
];

export const BEST_DEALS_MENU = [
  {
    label: "Today's Supersale Deals",
    desc: 'Flash discounts updated every 12 hours',
    href: '/supersale',
    badge: 'Hot',
  },
  {
    label: 'Discounted Products (Min 40% Off)',
    desc: 'Deep savings on premium flagship electronics',
    href: '/shop?discount=min-40',
  },
  {
    label: 'Special Clearance Offers',
    desc: 'Limited stock refurbished units priced to move',
    href: '/supersale?filter=clearance',
    badge: 'Extra ₹500',
  },
  {
    label: 'Limited-Time Student Offers',
    desc: 'Additional discounts on laptops with student ID',
    href: '/shop?filter=student-deal',
  },
];

export const SEARCH_SUGGESTIONS = [
  {
    type: 'phone',
    title: 'Apple iPhone 13 (128GB)',
    category: 'Mobiles',
    price: '₹34,999',
    href: '/product/apple-iphone-13',
    grade: 'Flawless',
  },
  {
    type: 'phone',
    title: 'Apple iPhone 14 (128GB)',
    category: 'Mobiles',
    price: '₹42,999',
    href: '/product/apple-iphone-14',
    grade: 'Superb',
  },
  {
    type: 'phone',
    title: 'Samsung Galaxy S22 Ultra 5G',
    category: 'Mobiles',
    price: '₹45,999',
    href: '/product/samsung-galaxy-s22-ultra',
    grade: 'Flawless',
  },
  {
    type: 'laptop',
    title: 'Apple MacBook Air M1 (8GB / 256GB)',
    category: 'Laptops',
    price: '₹47,999',
    href: '/buy-refurbished-laptops',
    grade: 'Superb',
  },
  {
    type: 'phone',
    title: 'OnePlus 11 5G (16GB / 256GB)',
    category: 'Mobiles',
    price: '₹32,499',
    href: '/product/oneplus-11-5g',
    grade: 'Superb',
  },
];

export const TRENDING_TAGS = [
  'iPhone 15 Pro',
  'iPhone 13',
  'Galaxy S24',
  'MacBook Air M1',
  'OnePlus 12',
  'Refurbished Laptops',
  'Sell iPhone 12',
  '5G Mobiles',
];
