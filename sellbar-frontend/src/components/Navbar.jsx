'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Search,
  MapPin,
  ChevronDown,
  ShoppingCart,
  Menu,
  X,
  Smartphone,
  Laptop,
  Store,
  Wrench,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Compass,
  Tag,
  User as UserIcon,
  LogOut,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { getLocalCart } from '@/lib/cart';
import {
  lookupPincode,
  searchLocations,
  POPULAR_CITIES,
  WEST_CHAMPARAN_BLOCKS,
  isServiceablePincode,
} from '@/lib/pincodes';
import LoginModal from './LoginModal';

// Trending search recommendations
const TRENDING_SEARCHES = [
  'iPhone 15 Pro',
  'iPhone 14',
  'iPhone 13',
  'Samsung Galaxy S24',
  'MacBook Air M2',
  'OnePlus 12R',
  'Refurbished iPhone',
  'Sell iPhone 12',
];

// =========================================================================
// 1. ALL DROPDOWN CATEGORIES (Exact Structure from Cashify Reference Image)
// =========================================================================
const ALL_SUB_ITEMS = [
  // SELL NESTED ITEMS
  { id: 'phone', label: 'Phone', parent: 'sell', href: '/sell-old-mobile-phone' },
  { id: 'laptop', label: 'Laptop', parent: 'sell', href: '/sell-old-laptop' },
  { id: 'smartwatch', label: 'Smartwatch', parent: 'sell', href: '/sell-old-smart-watch' },
  { id: 'tablet', label: 'Tablet', parent: 'sell', href: '/sell-old-tablet' },
  { id: 'more-sell', label: 'More', parent: 'sell', href: '/sell' },
  // ROOT MAIN CATEGORIES
  { id: 'repair', label: 'Repair', isRoot: true, href: '/repair' },
  { id: 'sell-gadgets', label: 'Sell Gadgets', isRoot: true, href: '/sell' },
  { id: 'buy-gadgets', label: 'Buy Gadgets', isRoot: true, href: '/buy-refurbished' },
  { id: 'recycle', label: 'Recycle', isRoot: true, href: '/recycle-old-mobile-phone' },
  { id: 'find-new-phone', label: 'Find New Phone', isRoot: true, href: '/find-new-phone' },
  { id: 'stores', label: 'Sellbar Store', isRoot: true, href: '/about-us' },
];

// =========================================================================
// 2. SELL PHONE BRANDS & MODELS
// =========================================================================
const PHONE_BRANDS = [
  {
    id: 'apple',
    name: 'Apple',
    href: '/sell-old-mobile-phone/sell-apple',
    models: [
      { name: 'Apple iPhone 15 Pro', max: '₹68,000' },
      { name: 'Apple iPhone 14', max: '₹36,000' },
      { name: 'Apple iPhone 13', max: '₹30,000' },
      { name: 'Apple iPhone 12', max: '₹22,000' },
      { name: 'Apple iPhone 11', max: '₹17,000' },
      { name: 'Apple iPhone XR', max: '₹12,500' },
    ],
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    href: '/sell-old-mobile-phone/sell-xiaomi',
    models: [
      { name: 'Redmi Note 13 Pro', max: '₹15,000' },
      { name: 'Redmi Note 12 Pro', max: '₹12,000' },
      { name: 'Redmi Note 11', max: '₹9,500' },
      { name: 'Redmi Note 4', max: '₹3,500' },
    ],
  },
  {
    id: 'samsung',
    name: 'Samsung',
    href: '/sell-old-mobile-phone/sell-samsung',
    models: [
      { name: 'Samsung Galaxy S24 Ultra', max: '₹68,000' },
      { name: 'Samsung Galaxy S23', max: '₹33,000' },
      { name: 'Samsung Galaxy Note 20', max: '₹21,000' },
      { name: 'Samsung Galaxy A54', max: '₹16,000' },
    ],
  },
  {
    id: 'oneplus',
    name: 'Oneplus',
    href: '/sell-old-mobile-phone/sell-oneplus',
    models: [
      { name: 'OnePlus 12 5G', max: '₹38,000' },
      { name: 'OnePlus 11 5G', max: '₹28,000' },
      { name: 'One Plus 9 Pro', max: '₹17,000' },
      { name: 'OnePlus Nord 3', max: '₹14,500' },
    ],
  },
  {
    id: 'vivo',
    name: 'Vivo',
    href: '/sell-old-mobile-phone/sell-vivo',
    models: [
      { name: 'Vivo X100 Pro', max: '₹42,000' },
      { name: 'Vivo V29 5G', max: '₹17,000' },
      { name: 'Vivo V27 5G', max: '₹14,000' },
    ],
  },
  {
    id: 'oppo',
    name: 'Oppo',
    href: '/sell-old-mobile-phone/sell-oppo',
    models: [
      { name: 'Oppo Reno 11 Pro', max: '₹22,000' },
      { name: 'Oppo Reno 10 Pro', max: '₹18,000' },
      { name: 'Oppo F25 Pro', max: '₹13,500' },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    href: '/sell-old-mobile-phone/sell-google',
    models: [
      { name: 'Google Pixel 8 Pro', max: '₹46,000' },
      { name: 'Google Pixel 8', max: '₹31,000' },
      { name: 'Google Pixel 7a', max: '₹19,000' },
    ],
  },
  {
    id: 'realme',
    name: 'Realme',
    href: '/sell-old-mobile-phone/sell-realme',
    models: [
      { name: 'Realme 12 Pro+', max: '₹16,500' },
      { name: 'Realme 11 Pro', max: '₹12,000' },
      { name: 'Realme GT 2 Pro', max: '₹17,000' },
    ],
  },
  {
    id: 'motorola',
    name: 'Motorola',
    href: '/sell-old-mobile-phone/sell-motorola',
    models: [
      { name: 'Moto Edge 50 Pro', max: '₹18,000' },
      { name: 'Moto G84 5G', max: '₹10,500' },
    ],
  },
  {
    id: 'nokia',
    name: 'Nokia',
    href: '/sell-old-mobile-phone',
    models: [
      { name: 'Nokia G42 5G', max: '₹7,500' },
      { name: 'Nokia X30 5G', max: '₹14,000' },
    ],
  },
  {
    id: 'poco',
    name: 'Poco',
    href: '/sell-old-mobile-phone',
    models: [
      { name: 'Poco X6 Pro', max: '₹15,000' },
      { name: 'Poco F5 5G', max: '₹14,000' },
    ],
  },
];

// =========================================================================
// 3. SELL GADGETS DATA
// =========================================================================
const GADGET_TYPES = [
  { id: 'phone', label: 'Phone', href: '/sell-old-mobile-phone' },
  { id: 'laptop', label: 'Laptop', href: '/sell-old-laptop' },
  { id: 'smartwatch', label: 'Smartwatch', href: '/sell-old-smart-watch' },
  { id: 'tablet', label: 'Tablet', href: '/sell-old-tablet' },
  { id: 'gaming', label: 'Gaming Consoles', href: '/sell-old-gaming-consoles' },
  { id: 'imac', label: 'iMac', href: '/sell-old-imac' },
  { id: 'tv', label: 'TV', href: '/sell-old-television' },
  { id: 'speaker', label: 'Smart Speaker', href: '/sell-old-smart-speaker' },
  { id: 'dslr', label: 'DSLR Camera', href: '/sell-old-dslr-camera' },
  { id: 'earbuds', label: 'Earbuds', href: '/sell-old-earbuds' },
  { id: 'ac', label: 'AC', href: '/sell-old-air-conditioner' },
];

// =========================================================================
// 4. BUY REFURBISHED CATEGORIES
// =========================================================================
const BUY_REFURB_CATEGORIES = [
  { id: 'phones', label: 'Refurbished Phones', href: '/buy-refurbished-mobile-phones' },
  { id: 'laptops', label: 'Refurbished Laptops', href: '/buy-refurbished-laptops' },
  { id: 'smart-watches', label: 'Refurbished Smart Watches', href: '/buy-refurbished?category=smart-watches' },
  { id: 'tablets', label: 'Refurbished Tablets', href: '/buy-refurbished?category=tablets' },
  { id: 'gaming', label: 'Refurbished Gaming Consoles', href: '/buy-refurbished?category=gaming-consoles' },
  { id: 'cameras', label: 'Refurbished Cameras', href: '/buy-refurbished?category=cameras' },
  { id: 'audio', label: 'Audio Devices', href: '/buy-refurbished' },
  { id: 'amazon', label: 'Amazon Devices', href: '/buy-refurbished' },
];

// =========================================================================
// 5. BUY LAPTOP BRANDS
// =========================================================================
const LAPTOP_BRANDS = [
  {
    id: 'apple',
    name: 'Apple MacBook',
    models: ['MacBook Air M2 (2022)', 'MacBook Air M1 (2020)', 'MacBook Pro 14 M1', 'MacBook Air Mid 2017'],
  },
  {
    id: 'dell',
    name: 'Dell Laptops',
    models: ['Dell Latitude 7490 Core i7', 'Dell XPS 13 Core i7', 'Dell Inspiron 15', 'Dell Vostro 3400'],
  },
  {
    id: 'lenovo',
    name: 'Lenovo ThinkPad',
    models: ['ThinkPad T490 16GB', 'ThinkPad X1 Carbon Gen 9', 'IdeaPad Slim 3 15', 'ThinkPad L390 Yoga'],
  },
  {
    id: 'hp',
    name: 'HP Laptops',
    models: ['HP Pavilion 15 Core i5', 'HP Envy x360 Ryzen 7', 'HP EliteBook 840 G6', 'HP ProBook 440'],
  },
  {
    id: 'budget',
    name: 'Budget Under ₹25,000',
    models: ['Lenovo ThinkPad T480 Core i5', 'Dell Latitude 7480 8GB', 'HP ProBook 430 G5', 'MacBook Air 2015'],
  },
];

// =========================================================================
// 6. STORE LOCATIONS
// =========================================================================
const STORE_CITIES = [
  { name: 'Bettiah City Hub', desc: 'Hospital Road, Supriya Chowk, Bettiah' },
  { name: 'Bagaha Retail Point', desc: 'Station Road, Overbridge, Bagaha' },
  { name: 'Patna Flagship', desc: 'Boring Road Crossing, Patna' },
  { name: 'Delhi NCR Hub', desc: 'Nehru Place & Noida Sector 18' },
  { name: 'Bengaluru Tech Store', desc: 'Indiranagar 100ft Road, Bengaluru' },
  { name: 'Pune Experience Hub', desc: 'FC Road, Shivajinagar, Pune' },
];


function catLabel(cat) {
  if (!cat) return 'Gadgets';
  return cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Bulletproof path detection: Do not render storefront navbar within Admin or Vendor enterprise portals
  const currentPath =
    pathname ||
    (typeof window !== 'undefined' ? window.location.pathname : '');

  if (currentPath.startsWith('/admin') || currentPath.startsWith('/vendor')) {
    return null;
  }

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Active hover states inside dropdowns
  const [allActiveSub, setAllActiveSub] = useState('sell');
  const [allSellNestedSub, setAllSellNestedSub] = useState('phone');
  const [gadgetActiveSub, setGadgetActiveSub] = useState('phone');
  const [buyRefurbishedSub, setBuyRefurbishedSub] = useState('phones');
  const [findGadgetSub, setFindGadgetSub] = useState('phone');
  const [allHoveredId, setAllHoveredId] = useState('phone');
  const [sellPhoneBrand, setSellPhoneBrand] = useState('apple');
  const [gadgetType, setGadgetType] = useState('phone');
  const [buyRefurbCat, setBuyRefurbCat] = useState('phones');
  const [laptopBrand, setLaptopBrand] = useState('apple');

  const dropdownTimeoutRef = useRef(null);
  const navBarRef = useRef(null);

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // User & Cart states
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Location selector states
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Bettiah');
  const [selectedPincode, setSelectedPincode] = useState('845438');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [locationTab, setLocationTab] = useState('towns');

  // Login Modal state
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Sync cart & user auth on load
  const syncState = async () => {
    try {
      const items = getLocalCart();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.user) {
        setCurrentUser(data.user);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    syncState();
    try {
      const saved = localStorage.getItem('sellbar-selected-location');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.pincode && isServiceablePincode(parsed.pincode)) {
          setSelectedCity(parsed.city || 'Bettiah');
          setSelectedPincode(parsed.pincode);
        }
      }
    } catch {
      // ignore
    }

    const handleCartUpdate = () => syncState();
    const handleOpenLogin = () => setLoginModalOpen(true);
    window.addEventListener('sellbar-cart-updated', handleCartUpdate);
    window.addEventListener('open-login-modal', handleOpenLogin);

    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchFocused(false);
      }
      if (navBarRef.current && !navBarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setSearchFocused(false);
        setUserMenuOpen(false);
        setLocationModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('sellbar-cart-updated', handleCartUpdate);
      window.removeEventListener('open-login-modal', handleOpenLogin);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Safe mouse hover handlers with anti-flicker timeout
  const handleDropdownEnter = (menuName) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuName);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setMobileMenuOpen(false);
    }
  };

  const handleSelectCity = (city, pin) => {
    const info = lookupPincode(pin);
    if (!info.isServiceable) {
      setPincodeError(
        `Delivery is not available in ${city} (${pin}). Sellbar delivers exclusively to West Champaran, Bihar.`
      );
      return;
    }
    setSelectedCity(city);
    setSelectedPincode(pin);
    setLocationModalOpen(false);
    setPincodeError('');
    setPincodeInput('');
    try {
      localStorage.setItem(
        'sellbar-selected-location',
        JSON.stringify({ city, pincode: pin })
      );
      window.dispatchEvent(
        new CustomEvent('sellbar-location-changed', {
          detail: { city, pincode: pin },
        })
      );
    } catch {
      // ignore
    }
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    const pin = pincodeInput.trim();
    if (!pin) return;
    const cleanPin = pin.replace(/\D/g, '');

    if (!/^\d+$/.test(pin)) {
      const matches = searchLocations(pin);
      if (matches.length > 0) {
        handleSelectCity(matches[0].name, matches[0].pincode);
        return;
      }
      setPincodeError(
        `Location "${pin}" not found in West Champaran. Please select from the list.`
      );
      return;
    }

    if (cleanPin.length !== 6) {
      setPincodeError('Please enter a valid 6-digit PIN code.');
      return;
    }

    const info = lookupPincode(cleanPin);
    if (info.isServiceable) {
      setSelectedPincode(info.pincode);
      setSelectedCity(info.city);
      setLocationModalOpen(false);
      setPincodeInput('');
      setPincodeError('');
      try {
        localStorage.setItem(
          'sellbar-selected-location',
          JSON.stringify({ city: info.city, pincode: info.pincode })
        );
        window.dispatchEvent(
          new CustomEvent('sellbar-location-changed', {
            detail: { city: info.city, pincode: info.pincode },
          })
        );
      } catch {
        // ignore
      }
    } else {
      setPincodeError(
        `Delivery Not Available for PIN ${cleanPin}. Sellbar delivers exclusively to West Champaran (Bihar).`
      );
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  // Currently active objects
  const currentPhoneBrand =
    PHONE_BRANDS.find((b) => b.id === sellPhoneBrand) || PHONE_BRANDS[0];
  const currentLaptopBrand =
    LAPTOP_BRANDS.find((l) => l.id === laptopBrand) || LAPTOP_BRANDS[0];

  return (
    <>
      <header className="storefront-header sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs font-sans">
        {/* ========================================================= */}
        {/* 1. TOP MAIN ROW (Logo, Large Search, Location, Login/Cart) */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-3 md:gap-6">
            {/* BRAND LOGO */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-9 h-9 rounded-full bg-[#13b59b] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <svg
                  className="w-5 h-5 text-white stroke-[2.8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-[#13b59b]">
                  SELLBAR
                </span>
              </div>
            </Link>

            {/* SEARCH BAR */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center bg-[#f4f6f8] hover:bg-[#eef1f4] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#13b59b]/25 border border-transparent focus-within:border-[#13b59b] rounded-md transition duration-150">
                  <div className="pl-3.5 pr-2 text-gray-400">
                    <Search className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search for mobiles, accessories & More"
                    className="w-full bg-transparent py-2.5 pr-4 text-sm text-gray-800 placeholder:text-gray-400 font-normal focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="pr-3 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>

              {/* Instant Search Suggestions Popover */}
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 text-sm">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                    Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {TRENDING_SEARCHES.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSearchQuery(item);
                          router.push(`/search?q=${encodeURIComponent(item)}`);
                          setSearchFocused(false);
                        }}
                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-[#13b59b]/10 hover:text-[#13b59b] text-gray-700 rounded-full transition cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#13b59b]" />
                      Sell old phone or buy refurbished with 12M warranty
                    </span>
                    <Link
                      href="/buy-refurbished"
                      onClick={() => setSearchFocused(false)}
                      className="text-[#13b59b] font-semibold hover:underline"
                    >
                      Explore All
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE ACTIONS: Location Selector & Login Button */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              {/* Location Selector */}
              <button
                type="button"
                onClick={() => setLocationModalOpen(true)}
                className="flex items-center gap-1.5 text-gray-800 hover:text-[#13b59b] transition py-1 cursor-pointer group"
                title="Change location"
              >
                <div className="w-5 h-5 rounded-full border border-gray-800 group-hover:border-[#13b59b] flex items-center justify-center transition">
                  <div className="w-2 h-2 rounded-full bg-[#13b59b]" />
                </div>
                <span
                  className="text-sm font-semibold tracking-tight"
                  suppressHydrationWarning
                >
                  {selectedCity}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#13b59b] transition" />
              </button>

              {/* Shopping Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 text-gray-700 hover:text-[#13b59b] transition rounded-lg hover:bg-gray-100"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5 stroke-2" />
                {cartCount > 0 && (
                  <span
                    suppressHydrationWarning
                    className="absolute -top-1 -right-1 bg-[#13b59b] text-white text-[11px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Login / User Profile Button */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-md text-sm font-semibold transition cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#13b59b] text-white flex items-center justify-center text-xs font-bold">
                      {currentUser.name
                        ? currentUser.name[0].toUpperCase()
                        : 'U'}
                    </div>
                    <span className="hidden sm:inline">
                      {currentUser.name
                        ? currentUser.name.split(' ')[0]
                        : 'Account'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1.5 text-sm animate-in fade-in-50 duration-150">
                      <div className="px-3.5 py-2 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">
                          {currentUser.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {currentUser.email || currentUser.phone}
                        </div>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <UserIcon className="w-4 h-4 text-gray-500" />
                        My Account &amp; Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <Tag className="w-4 h-4 text-rose-500" />
                        Saved Wishlist
                      </Link>
                      <Link
                        href="/account/sell-orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        <Smartphone className="w-4 h-4 text-[#13b59b]" />
                        Sell Phone Requests
                      </Link>
                      {currentUser.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3.5 py-2 text-cyan-600 hover:bg-cyan-50 font-medium"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Admin Portal
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(true)}
                  className="bg-[#2bbb9e] hover:bg-[#24a88e] active:scale-[0.98] text-white text-sm font-semibold px-5.5 py-2 rounded-md transition shadow-xs inline-flex items-center justify-center cursor-pointer"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SECONDARY CATEGORY BAR (Cashify 8 Menu Items With ∨)    */}
        {/* ========================================================= */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav ref={navBarRef} className="hidden lg:flex items-center justify-between text-sm py-2.5">
              
              {/* ITEM 1: All ∨ (Exact Cashify Mega-Menu from Reference Images) */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('all')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'all' ? null : 'all');
                  }}
                  className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'all'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>All</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'all' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {/* Dropdown Menu for All: Matching Reference Images 1 & 2 */}
                {activeDropdown === 'all' && (
                  <div className="absolute left-0 top-full pt-1.5 z-50 w-[780px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden flex min-h-[440px]">
                      {/* Left categories list */}
                      <div className="w-[230px] bg-white border-r border-gray-100 py-3 px-2 flex flex-col justify-start shrink-0 space-y-0.5">
                        {/* Sell Section Header */}
                        <div className="px-3 pt-1 pb-1 text-sm font-bold text-gray-900 tracking-tight">
                          Sell
                        </div>

                        {/* Nested items under Sell */}
                        {[
                          { id: 'phone', label: 'Phone', href: '/sell-old-mobile-phone' },
                          { id: 'laptop', label: 'Laptop', href: '/sell-old-laptop' },
                          { id: 'smartwatch', label: 'Smartwatch', href: '/sell-old-smart-watch' },
                          { id: 'tablet', label: 'Tablet', href: '/sell-old-tablet' },
                          { id: 'more', label: 'More', href: '/sell' },
                        ].map((item) => {
                          const isSelected = allActiveSub === 'sell' && allSellNestedSub === item.id;
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              onMouseEnter={() => {
                                setAllActiveSub('sell');
                                setAllSellNestedSub(item.id);
                              }}
                              className={`w-full flex items-center justify-between pl-5 pr-3 py-2 rounded-xl text-xs transition cursor-pointer ${
                                isSelected
                                  ? 'bg-[#e8f7f4] text-[#12a38c] font-semibold'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium'
                              }`}
                            >
                              <span>{item.label}</span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-[#12a38c]' : 'text-gray-400'}`} />
                            </Link>
                          );
                        })}

                        {/* Main Categories following Sell */}
                        {[
                          { id: 'repair', label: 'Repair', href: '/repair' },
                          { id: 'sell-gadgets', label: 'Sell Gadgets', href: '/sell' },
                          { id: 'buy-gadgets', label: 'Buy Gadgets', href: '/buy-refurbished' },
                          { id: 'recycle', label: 'Recycle', href: '/recycle-old-mobile-phone' },
                          { id: 'find-new-phone', label: 'Find New Phone', href: '/find-new-phone' },
                          { id: 'stores', label: 'Sellbar Store', href: '/about-us' },
                        ].map((cat) => {
                          const isSelected = allActiveSub === cat.id;
                          return (
                            <Link
                              key={cat.id}
                              href={cat.href}
                              onClick={() => setActiveDropdown(null)}
                              onMouseEnter={() => setAllActiveSub(cat.id)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer mt-0.5 ${
                                isSelected
                                  ? 'bg-[#e8f7f4] text-[#12a38c]'
                                  : 'text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              <span>{cat.label}</span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-colors ${isSelected ? 'text-[#12a38c]' : 'text-gray-400'}`} />
                            </Link>
                          );
                        })}
                      </div>

                      {/* Right dynamic content */}
                      <div className="flex-1 p-6 flex flex-col justify-between bg-white">
                        <div className="flex-1">
                          {/* 1. SELL -> PHONE (Exact Image 2 Reference) */}
                          {allActiveSub === 'sell' && allSellNestedSub === 'phone' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Sell
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-mobile-phone/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple</Link>
                                    <Link href="/sell-old-mobile-phone/sell-xiaomi" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Xiaomi</Link>
                                    <Link href="/sell-old-mobile-phone/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung</Link>
                                    <Link href="/sell-old-mobile-phone/sell-oneplus" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Oneplus</Link>
                                    <Link href="/sell-old-mobile-phone/sell-nokia" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Nokia</Link>
                                    <Link href="/sell-old-mobile-phone/sell-poco" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Poco</Link>
                                    <Link href="/sell-old-mobile-phone?brand=1" onClick={() => setActiveDropdown(null)} className="block text-[#12a38c] font-semibold hover:underline pt-1.5">More Phone Brands →</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Selling Phones</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-mobile-phone/used-apple-iphone-12" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 12</Link>
                                    <Link href="/sell-old-mobile-phone/used-apple-iphone-11" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 11</Link>
                                    <Link href="/sell-old-mobile-phone/used-samsung-galaxy-note-20-8-gb-256-gb" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Galaxy Note 20</Link>
                                    <Link href="/sell-old-mobile-phone/used-oneplus-9-pro-5g" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">One Plus 9 Pro</Link>
                                    <Link href="/sell-old-mobile-phone/used-redmi-note-4" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Xiaomi Redmi Note 4</Link>
                                    <Link href="/sell-old-mobile-phone/used-iphone-6" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 6</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 2. SELL -> LAPTOP */}
                          {allActiveSub === 'sell' && allSellNestedSub === 'laptop' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Sell
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-laptop/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple</Link>
                                    <Link href="/sell-old-laptop/sell-hp-compaq" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">HP</Link>
                                    <Link href="/sell-old-laptop/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung</Link>
                                    <Link href="/sell-old-laptop/sell-lenovo" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Lenovo</Link>
                                    <Link href="/sell-old-laptop/sell-dell" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Dell</Link>
                                    <Link href="/sell-old-laptop/sell-honor" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Honor</Link>
                                    <Link href="/sell-old-laptop?brand=1" onClick={() => setActiveDropdown(null)} className="block text-[#12a38c] font-semibold hover:underline pt-1.5">More Laptop Brands →</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Selling Models</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-laptop/used-pavilion-series" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Pavilion Series</Link>
                                    <Link href="/sell-old-laptop/used-vostro-series" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Vostro Series</Link>
                                    <Link href="/sell-old-laptop/used-inspiron-series" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Inspiron Series</Link>
                                    <Link href="/sell-old-laptop/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">MacBook Air M1 / M2</Link>
                                    <Link href="/sell-old-laptop/sell-lenovo" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">ThinkPad Series</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 3. SELL -> SMARTWATCH */}
                          {allActiveSub === 'sell' && allSellNestedSub === 'smartwatch' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Sell
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-smart-watch/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple Watch</Link>
                                    <Link href="/sell-old-smart-watch/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Galaxy Watch</Link>
                                    <Link href="/sell-old-smart-watch/sell-oneplus" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">OnePlus Watch</Link>
                                    <Link href="/sell-old-smart-watch/sell-xiaomi" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Xiaomi / Amazfit</Link>
                                    <Link href="/sell-old-smart-watch" onClick={() => setActiveDropdown(null)} className="block text-[#12a38c] font-semibold hover:underline pt-1.5">More Smartwatch Brands →</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Popular Models</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-smart-watch/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple Watch Series 9</Link>
                                    <Link href="/sell-old-smart-watch/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple Watch Ultra</Link>
                                    <Link href="/sell-old-smart-watch/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Galaxy Watch 6</Link>
                                    <Link href="/sell-old-smart-watch/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple Watch SE 2</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 4. SELL -> TABLET */}
                          {allActiveSub === 'sell' && allSellNestedSub === 'tablet' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Sell
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-tablet/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPad</Link>
                                    <Link href="/sell-old-tablet/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Tab</Link>
                                    <Link href="/sell-old-tablet/sell-lenovo" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Lenovo Tab</Link>
                                    <Link href="/sell-old-tablet/sell-honor" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Honor Pad</Link>
                                    <Link href="/sell-old-tablet" onClick={() => setActiveDropdown(null)} className="block text-[#12a38c] font-semibold hover:underline pt-1.5">More Tablet Brands →</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Popular Tablets</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-tablet/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPad Air 5th Gen</Link>
                                    <Link href="/sell-old-tablet/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPad 10th Gen</Link>
                                    <Link href="/sell-old-tablet/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Galaxy Tab S9</Link>
                                    <Link href="/sell-old-tablet/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPad Pro 11</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 5. SELL -> MORE */}
                          {allActiveSub === 'sell' && allSellNestedSub === 'more' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Sell
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-medium text-gray-700">
                                {[
                                  { title: 'Smart Speaker', href: '/sell-old-smart-speaker' },
                                  { title: 'Television', href: '/sell-old-television' },
                                  { title: 'DSLR Camera', href: '/sell-old-dslr-camera' },
                                  { title: 'Earbuds', href: '/sell-old-earbuds' },
                                  { title: 'iMac', href: '/sell-old-imac' },
                                  { title: 'Gaming Consoles', href: '/sell-old-gaming-consoles' },
                                  { title: 'Air Conditioner', href: '/sell-old-air-conditioner' },
                                ].map((item, idx) => (
                                  <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="p-3 rounded-xl border border-gray-100 hover:bg-[#e8f7f4] hover:text-[#12a38c] hover:border-[#12a38c]/20 transition flex items-center justify-between group"
                                  >
                                    <span>{item.title}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#12a38c] transition" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 6. REPAIR */}
                          {allActiveSub === 'repair' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Repair
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Repair Services</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/screen-repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Screen Replacement</Link>
                                    <Link href="/battery-repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Battery Replacement</Link>
                                    <Link href="/mic-repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Mic &amp; Speaker Repair</Link>
                                    <Link href="/back-panel-repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Back Panel Replacement</Link>
                                    <Link href="/charging-jack-repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Charging Port Repair</Link>
                                    <Link href="/repair" onClick={() => setActiveDropdown(null)} className="block text-[#12a38c] font-semibold hover:underline pt-1.5">More in Repair →</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Repaired Models</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 11</Link>
                                    <Link href="/repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 12</Link>
                                    <Link href="/repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Xiaomi Redmi Note 10 Pro</Link>
                                    <Link href="/repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">OnePlus 9R 5G</Link>
                                    <Link href="/repair" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Galaxy M31</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 7. SELL GADGETS */}
                          {allActiveSub === 'sell-gadgets' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Sell Gadgets
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-medium text-gray-700">
                                {[
                                  { title: 'Phone', href: '/sell-old-mobile-phone' },
                                  { title: 'Laptop', href: '/sell-old-laptop' },
                                  { title: 'Smartwatch', href: '/sell-old-smart-watch' },
                                  { title: 'Tablet', href: '/sell-old-tablet' },
                                  { title: 'Television', href: '/sell-old-television' },
                                  { title: 'Gaming Consoles', href: '/sell-old-gaming-consoles' },
                                  { title: 'Smart Speaker', href: '/sell-old-smart-speaker' },
                                  { title: 'DSLR Camera', href: '/sell-old-dslr-camera' },
                                  { title: 'Earbuds', href: '/sell-old-earbuds' },
                                ].map((g, idx) => (
                                  <Link
                                    key={idx}
                                    href={g.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="p-2.5 rounded-xl border border-gray-100 hover:bg-[#e8f7f4] hover:text-[#12a38c] hover:border-[#12a38c]/20 transition flex items-center justify-between group"
                                  >
                                    <span>{g.title}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#12a38c] transition" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 8. BUY GADGETS */}
                          {allActiveSub === 'buy-gadgets' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Buy Gadgets
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-medium text-gray-700">
                                {[
                                  { title: 'Refurbished Phones', href: '/buy-refurbished-mobile-phones' },
                                  { title: 'Refurbished Laptops', href: '/buy-refurbished-laptops' },
                                  { title: 'Refurbished Smartwatches', href: '/buy-refurbished-smart-watches' },
                                  { title: 'Refurbished Tablets', href: '/buy-refurbished-tablets' },
                                  { title: 'Gaming Consoles', href: '/buy-refurbished-gaming-consoles' },
                                  { title: 'DSLR Cameras', href: '/buy-refurbished-dslr-cameras' },
                                  { title: 'Audio & Speakers', href: '/buy-refurbished' },
                                  { title: 'Apple MacBooks', href: '/buy-refurbished-laptops' },
                                  { title: 'Open Box Deals', href: '/buy-refurbished' },
                                ].map((b, idx) => (
                                  <Link
                                    key={idx}
                                    href={b.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="p-2.5 rounded-xl border border-gray-100 hover:bg-[#e8f7f4] hover:text-[#12a38c] hover:border-[#12a38c]/20 transition flex items-center justify-between group"
                                  >
                                    <span>{b.title}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#12a38c] transition" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 9. RECYCLE */}
                          {allActiveSub === 'recycle' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Recycle
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">E-Waste Recycling</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/recycle-old-mobile-phone" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Recycle Old Phone</Link>
                                    <Link href="/recycle-old-mobile-phone" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Recycle Dead Laptop</Link>
                                    <Link href="/recycle-old-mobile-phone" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Recycle Smartwatch / Accessories</Link>
                                    <Link href="/e-waste-policy" onClick={() => setActiveDropdown(null)} className="block text-[#12a38c] font-semibold hover:underline pt-1.5">Sellbar Green Mission &amp; Policy →</Link>
                                  </div>
                                </div>
                                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100/60">
                                  <div className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    Zero Landfill Pledge
                                  </div>
                                  <p className="text-xs text-emerald-800 leading-relaxed">
                                    Sellbar guarantees 100% certified e-waste recycling and non-recoverable electronic shredding with free doorstep pickup across West Champaran.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 10. FIND NEW PHONE */}
                          {allActiveSub === 'find-new-phone' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                More in Find New Phone
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Research Tools</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Phone Finder 2026</Link>
                                    <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Compare Smartphones</Link>
                                    <Link href="/articles" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">In-Depth Reviews &amp; Benchmarks</Link>
                                    <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Upcoming 5G Launches</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone</Link>
                                    <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Galaxy</Link>
                                    <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">OnePlus Flagships</Link>
                                    <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Xiaomi &amp; Redmi Series</Link>
                                    <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Google Pixel</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 11. SELLBAR STORE */}
                          {allActiveSub === 'stores' && (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Sellbar Experience Hubs
                              </div>
                              <div className="grid grid-cols-3 gap-2.5 text-xs font-medium text-gray-700">
                                {[
                                  'Bettiah Main Market', 'Motihari Hub', 'Bagaha Center',
                                  'Narkatiaganj Store', 'Patna Central', 'Muzaffarpur Hub',
                                  'Delhi NCR Flagship', 'Noida Experience Center', 'Gurgaon Hub',
                                ].map((city, i) => (
                                  <Link
                                    key={i}
                                    href="/about-us"
                                    onClick={() => setActiveDropdown(null)}
                                    className="p-2.5 rounded-xl border border-gray-100 hover:bg-[#e8f7f4] hover:text-[#12a38c] hover:border-[#12a38c]/20 transition flex items-center gap-2"
                                  >
                                    <Store className="w-3.5 h-3.5 text-[#12a38c]" />
                                    <span>{city}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom Footer Bar (Matching Image 2 Reference) */}
                        <div className="pt-3.5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-[#12a38c]" />
                            <span>Free doorstep pickup &amp; instant cash in West Champaran</span>
                          </div>
                          <Link
                            href="/about-us"
                            onClick={() => setActiveDropdown(null)}
                            className="font-semibold text-[#12a38c] hover:underline"
                          >
                            Find Nearest Store →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ITEM 2: Sell Phone ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('sell-phone')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'sell-phone' ? null : 'sell-phone');
                  }}
                  className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'sell-phone'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>Sell Phone</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sell-phone' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'sell-phone' && (
                  <div className="absolute left-0 top-full pt-1.5 z-50 w-[580px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 overflow-hidden flex flex-col justify-between min-h-[380px]">
                      <div className="flex-1">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                          More in Sell Phone
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                            <div className="space-y-1.5 text-xs font-medium text-gray-700">
                              <Link href="/sell-old-mobile-phone/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Apple</Link>
                              <Link href="/sell-old-mobile-phone/sell-xiaomi" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Xiaomi</Link>
                              <Link href="/sell-old-mobile-phone/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Samsung</Link>
                              <Link href="/sell-old-mobile-phone/sell-oneplus" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Oneplus</Link>
                              <Link href="/sell-old-mobile-phone/sell-nokia" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Nokia</Link>
                              <Link href="/sell-old-mobile-phone/sell-poco" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Poco</Link>
                              <Link href="/sell-old-mobile-phone?brand=1" onClick={() => setActiveDropdown(null)} className="block text-xs font-semibold text-[#12a38c] hover:underline pt-2">
                                More Phone Brands →
                              </Link>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 mb-3">Top Selling Phones</div>
                            <div className="space-y-1.5 text-xs font-medium text-gray-700">
                              <Link href="/sell-old-mobile-phone/used-apple-iphone-12" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Apple iPhone 12</Link>
                              <Link href="/sell-old-mobile-phone/used-apple-iphone-11" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Apple iPhone 11</Link>
                              <Link href="/sell-old-mobile-phone/used-samsung-galaxy-note-20-8-gb-256-gb" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Samsung Galaxy Note 20</Link>
                              <Link href="/sell-old-mobile-phone/used-oneplus-9-pro-5g" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">One Plus 9 Pro</Link>
                              <Link href="/sell-old-mobile-phone/used-redmi-note-4" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Xiaomi Redmi Note 4</Link>
                              <Link href="/sell-old-mobile-phone/used-iphone-6" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Apple iPhone 6</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3.5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-[#12a38c]" />
                          <span>Free doorstep pickup &amp; instant cash in West Champaran</span>
                        </div>
                        <Link href="/about-us" onClick={() => setActiveDropdown(null)} className="font-semibold text-[#12a38c] hover:underline">
                          Find Nearest Store →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ITEM 3: Sell Gadgets ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('sell-gadgets')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'sell-gadgets' ? null : 'sell-gadgets');
                  }}
                  className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'sell-gadgets'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>Sell Gadgets</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sell-gadgets' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'sell-gadgets' && (
                  <div className="absolute left-0 top-full pt-1.5 z-50 w-[740px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden flex min-h-[420px]">
                      {/* Left categories list */}
                      <div className="w-52 bg-white border-r border-gray-100 p-2.5 space-y-1 shrink-0">
                        {[
                          { id: 'phone', label: 'Phone', hasArrow: true, href: '/sell-old-mobile-phone' },
                          { id: 'laptop', label: 'Laptop', hasArrow: true, href: '/sell-old-laptop' },
                          { id: 'tv', label: 'TV', hasArrow: false, href: '/sell-old-television' },
                          { id: 'smart-speaker', label: 'Smart Speaker', hasArrow: false, href: '/sell-old-smart-speaker' },
                          { id: 'tablet', label: 'Tablet', hasArrow: false, href: '/sell-old-tablet' },
                          { id: 'gaming-consoles', label: 'Gaming Consoles', hasArrow: false, href: '/sell-old-gaming-consoles' },
                          { id: 'imac', label: 'iMac', hasArrow: false, href: '/sell-old-imac' },
                          { id: 'smartwatch', label: 'Smartwatch', hasArrow: false, href: '/sell-old-smart-watch' },
                          { id: 'dslr-camera', label: 'DSLR Camera', hasArrow: false, href: '/sell-old-dslr-camera' },
                          { id: 'ac', label: 'AC', hasArrow: false, href: '/sell-old-air-conditioner' },
                        ].map((cat) => {
                          const isSelected = gadgetActiveSub === cat.id;
                          return (
                            <div
                              key={cat.id}
                              onMouseEnter={() => setGadgetActiveSub(cat.id)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                isSelected
                                  ? 'bg-[#e8f7f4] text-[#12a38c]'
                                  : 'text-gray-800 hover:bg-gray-50'
                              }`}
                            >
                              <Link href={cat.href} onClick={() => setActiveDropdown(null)} className="flex-1">
                                {cat.label}
                              </Link>
                              {cat.hasArrow && (
                                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#12a38c]' : 'text-gray-400'}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Brands & Models */}
                      <div className="flex-1 p-6 flex flex-col justify-between bg-white">
                        <div className="flex-1">
                          {gadgetActiveSub === 'phone' ? (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Top Phone Brands &amp; Models
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-mobile-phone/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple</Link>
                                    <Link href="/sell-old-mobile-phone/sell-xiaomi" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Xiaomi</Link>
                                    <Link href="/sell-old-mobile-phone/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung</Link>
                                    <Link href="/sell-old-mobile-phone/sell-oneplus" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Oneplus</Link>
                                    <Link href="/sell-old-mobile-phone/sell-nokia" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Nokia</Link>
                                    <Link href="/sell-old-mobile-phone/sell-poco" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Poco</Link>
                                    <Link href="/sell-old-mobile-phone?brand=1" onClick={() => setActiveDropdown(null)} className="block text-xs font-semibold text-[#12a38c] hover:underline pt-1.5">More Phone Brands →</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Selling Phones</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-mobile-phone/used-apple-iphone-12" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 12</Link>
                                    <Link href="/sell-old-mobile-phone/used-apple-iphone-11" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 11</Link>
                                    <Link href="/sell-old-mobile-phone/used-samsung-galaxy-note-20-8-gb-256-gb" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Galaxy Note 20</Link>
                                    <Link href="/sell-old-mobile-phone/used-oneplus-9-pro-5g" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">One Plus 9 Pro</Link>
                                    <Link href="/sell-old-mobile-phone/used-redmi-note-4" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Xiaomi Redmi Note 4</Link>
                                    <Link href="/sell-old-mobile-phone/used-iphone-6" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone 6</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : gadgetActiveSub === 'laptop' ? (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Top Laptop Brands &amp; Models
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Laptop Brands</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-laptop/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple</Link>
                                    <Link href="/sell-old-laptop/sell-hp-compaq" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">HP</Link>
                                    <Link href="/sell-old-laptop/sell-samsung" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung</Link>
                                    <Link href="/sell-old-laptop/sell-lenovo" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Lenovo</Link>
                                    <Link href="/sell-old-laptop/sell-dell" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Dell</Link>
                                    <Link href="/sell-old-laptop/sell-honor" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Honor</Link>
                                    <Link href="/sell-old-laptop?brand=1" onClick={() => setActiveDropdown(null)} className="block text-xs font-semibold text-[#12a38c] hover:underline pt-1.5">More Laptop Brands →</Link>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-gray-900 mb-3">Top Selling Models</div>
                                  <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                    <Link href="/sell-old-laptop/used-pavilion-series" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Pavilion Series</Link>
                                    <Link href="/sell-old-laptop/used-vostro-series" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Vostro Series</Link>
                                    <Link href="/sell-old-laptop/used-inspiron-series" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Inspiron Series</Link>
                                    <Link href="/sell-old-laptop/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">MacBook Air</Link>
                                    <Link href="/sell-old-laptop/sell-apple" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">MacBook Pro</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Instant Quote For {catLabel(gadgetActiveSub)}
                              </div>
                              <p className="text-xs text-gray-600 mb-4">
                                Get the highest guaranteed resale valuation and complimentary doorstep pickup across West Champaran.
                              </p>
                              <Link
                                href={`/sell-old-${gadgetActiveSub}`}
                                onClick={() => setActiveDropdown(null)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#12a38c] text-white rounded-xl text-xs font-semibold hover:bg-[#0e8a76] transition shadow-sm"
                              >
                                <span>Get Instant Price For {catLabel(gadgetActiveSub)}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className="pt-3.5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                            <Sparkles className="w-3.5 h-3.5 text-[#12a38c]" />
                            <span>Free doorstep pickup &amp; instant cash in West Champaran</span>
                          </div>
                          <Link href="/about-us" onClick={() => setActiveDropdown(null)} className="font-semibold text-[#12a38c] hover:underline">
                            Find Nearest Store →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ITEM 4: Buy Refurbished Devices ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('buy-refurbished')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'buy-refurbished' ? null : 'buy-refurbished');
                  }}
                  className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'buy-refurbished'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>Buy Refurbished Devices</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'buy-refurbished' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'buy-refurbished' && (
                  <div className="absolute left-0 top-full pt-1.5 z-50 w-[740px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden flex min-h-[420px]">
                      {/* Left categories list */}
                      <div className="w-56 bg-white border-r border-gray-100 p-2.5 space-y-1 shrink-0">
                        {[
                          { id: 'phones', label: 'Refurbished Phones', href: '/buy-refurbished-mobile-phones' },
                          { id: 'laptops', label: 'Refurbished Laptops', href: '/buy-refurbished-laptops' },
                          { id: 'smartwatches', label: 'Smart Watches', href: '/buy-refurbished-smart-watches' },
                          { id: 'tablets', label: 'Tablets', href: '/buy-refurbished-tablets' },
                          { id: 'consoles', label: 'Gaming Consoles', href: '/buy-refurbished-gaming-consoles' },
                          { id: 'cameras', label: 'DSLR Cameras', href: '/buy-refurbished-dslr-cameras' },
                        ].map((sub) => {
                          const isSelected = buyRefurbishedSub === sub.id;
                          return (
                            <div
                              key={sub.id}
                              onMouseEnter={() => setBuyRefurbishedSub(sub.id)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                                isSelected
                                  ? 'bg-[#e8f7f4] text-[#12a38c]'
                                  : 'text-gray-800 hover:bg-gray-50'
                              }`}
                            >
                              <Link href={sub.href} onClick={() => setActiveDropdown(null)} className="flex-1">
                                {sub.label}
                              </Link>
                              <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#12a38c]' : 'text-gray-400'}`} />
                            </div>
                          );
                        })}
                      </div>

                      {/* Right dynamic content */}
                      <div className="flex-1 p-6 flex flex-col justify-between bg-white">
                        <div className="flex-1">
                          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                            32-Point Quality Inspected Devices
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                              <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Apple iPhone / iPad</Link>
                                <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Samsung Galaxy</Link>
                                <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">OnePlus Premium</Link>
                                <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">HP Pavilion &amp; Envy</Link>
                                <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Lenovo ThinkPad</Link>
                                <Link href="/buy-refurbished" onClick={() => setActiveDropdown(null)} className="block text-xs font-semibold text-[#12a38c] hover:underline pt-1.5">View All Categories →</Link>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 mb-3">Best Sellers</div>
                              <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">iPhone 13 (128GB) - Flawless</Link>
                                <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">iPhone 12 - Superb Condition</Link>
                                <Link href="/buy-refurbished-mobile-phones" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Galaxy S22 5G</Link>
                                <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">MacBook Air M1</Link>
                                <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-0.5 hover:text-[#12a38c] transition">Dell Latitude Business</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="pt-3.5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#12a38c]" />
                            <span>Up to 12 Months Warranty + 7 Days Replacement</span>
                          </div>
                          <Link href="/warranty-policy" onClick={() => setActiveDropdown(null)} className="font-semibold text-[#12a38c] hover:underline">
                            Warranty Info →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ITEM 5: Find New Gadget ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('find-new')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'find-new' ? null : 'find-new');
                  }}
                  className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'find-new'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>Find New Gadget</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'find-new' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'find-new' && (
                  <div className="absolute left-0 top-full pt-1.5 z-50 w-[580px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 overflow-hidden flex flex-col justify-between min-h-[380px]">
                      <div className="flex-1">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                          Smartphone Intelligence &amp; Reviews
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <div className="text-sm font-bold text-gray-900 mb-3">Tools &amp; Content</div>
                            <div className="space-y-1.5 text-xs font-medium text-gray-700">
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Phone Finder 2026</Link>
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Compare Phones</Link>
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Latest Launches</Link>
                              <Link href="/articles" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Tech Reviews &amp; News</Link>
                              <Link href="/faq" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Buyer Q&amp;A Guide</Link>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                            <div className="space-y-1.5 text-xs font-medium text-gray-700">
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Apple iPhone 15 &amp; 16</Link>
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Samsung Galaxy S24</Link>
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">OnePlus 12 &amp; 12R</Link>
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Xiaomi Redmi 13 Series</Link>
                              <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Google Pixel 8 &amp; 9</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3.5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-[#12a38c]" />
                          <span>Compare prices &amp; check live trade-in values</span>
                        </div>
                        <Link href="/find-new-phone" onClick={() => setActiveDropdown(null)} className="font-semibold text-[#12a38c] hover:underline">
                          Compare Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ITEM 6: Buy Laptop ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('buy-laptop')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'buy-laptop' ? null : 'buy-laptop');
                  }}
                  className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'buy-laptop'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>Buy Laptop</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'buy-laptop' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'buy-laptop' && (
                  <div className="absolute left-0 top-full pt-1.5 z-50 w-[580px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 overflow-hidden flex flex-col justify-between min-h-[380px]">
                      <div className="flex-1">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                          Certified Refurbished Laptops
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <div className="text-sm font-bold text-gray-900 mb-3">Top Brands</div>
                            <div className="space-y-1.5 text-xs font-medium text-gray-700">
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Apple MacBook</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">HP</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Dell</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Lenovo ThinkPad</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Asus</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block text-xs font-semibold text-[#12a38c] hover:underline pt-1.5">View All Laptops →</Link>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 mb-3">Top Selling Models</div>
                            <div className="space-y-1.5 text-xs font-medium text-gray-700">
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">MacBook Air M1 (2020)</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">HP EliteBook i5 8th Gen</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">Dell Latitude 7490</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">ThinkPad T480s</Link>
                              <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="block py-1 hover:text-[#12a38c] transition">MacBook Pro 13 TouchBar</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3.5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#12a38c]" />
                          <span>Includes 6-12 Months Warranty + Original Charger</span>
                        </div>
                        <Link href="/buy-refurbished-laptops" onClick={() => setActiveDropdown(null)} className="font-semibold text-[#12a38c] hover:underline">
                          Shop Laptops →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ITEM 7: Sellbar Store ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('store')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'store' ? null : 'store');
                  }}
                  className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'store'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>Sellbar Store</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'store' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'store' && (
                  <div className="absolute left-0 top-full pt-1.5 z-50 w-[580px]">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 overflow-hidden flex flex-col justify-between min-h-[360px]">
                      <div className="flex-1">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                          Retail Experience Hubs &amp; Drop Points
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs font-medium text-gray-700">
                          {[
                            { name: 'Bettiah Main Market', dist: 'West Champaran', time: '10 AM - 8 PM' },
                            { name: 'Motihari Road Center', dist: 'East Champaran', time: '10 AM - 8 PM' },
                            { name: 'Bagaha Bazaar Point', dist: 'West Champaran', time: '10 AM - 7 PM' },
                            { name: 'Narkatiaganj Hub', dist: 'West Champaran', time: '10 AM - 7 PM' },
                            { name: 'Patna Central Flagship', dist: 'Patna', time: '10 AM - 9 PM' },
                            { name: 'Muzaffarpur Hub', dist: 'Muzaffarpur', time: '10 AM - 8 PM' },
                          ].map((st, i) => (
                            <div key={i} className="p-3 rounded-xl border border-gray-100 hover:bg-[#e8f7f4] transition">
                              <div className="font-bold text-gray-900 flex items-center gap-1.5 mb-0.5">
                                <Store className="w-3.5 h-3.5 text-[#12a38c]" />
                                <span>{st.name}</span>
                              </div>
                              <div className="text-[11px] text-gray-500">{st.dist} • {st.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3.5 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-500">Visit for live testing, instant cash &amp; free diagnostics</span>
                        <Link href="/about-us" onClick={() => setActiveDropdown(null)} className="font-semibold text-[#12a38c] hover:underline">
                          View All Outlets →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ITEM 8: More ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('more')} onMouseLeave={handleDropdownLeave}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'more' ? null : 'more');
                  }}
                  className={`flex items-center gap-1 font-semibold transition cursor-pointer pb-1 border-b-2 ${
                    activeDropdown === 'more'
                      ? 'text-[#12a38c] border-[#12a38c]'
                      : 'text-gray-800 hover:text-[#12a38c] border-transparent'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180 text-[#12a38c]' : 'text-gray-500'}`} />
                </button>

                {activeDropdown === 'more' && (
                  <div className="absolute right-0 top-full pt-1.5 z-50 w-72">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-3 text-xs font-semibold text-gray-700 space-y-0.5">
                      <Link href="/about-us" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                        <span>About Us</span>
                      </Link>
                      <Link href="/careers" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <UserIcon className="w-3.5 h-3.5 text-blue-500" />
                        <span>Careers</span>
                      </Link>
                      <Link href="/articles" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <Compass className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Articles &amp; TechByte</span>
                      </Link>
                      <Link href="/corporate-information" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <Building2 className="w-3.5 h-3.5 text-gray-500" />
                        <span>Corporate Information</span>
                      </Link>
                      <Link href="/supersale" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <Sparkles className="w-3.5 h-3.5 text-[#12a38c]" />
                        <span>Become Supersale Partner</span>
                      </Link>
                      <Link href="/press-releases" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <RotateCcw className="w-3.5 h-3.5 text-purple-500" />
                        <span>Press Releases</span>
                      </Link>
                      <Link href="/terms-conditions" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                        <span>Terms &amp; Conditions</span>
                      </Link>
                      <Link href="/privacy-policy" onClick={() => setActiveDropdown(null)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#e8f7f4] hover:text-[#12a38c] transition">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                        <span>Privacy Policy</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile horizontal scrollable pill bar */}
            <div className="lg:hidden flex items-center gap-2 py-2 overflow-x-auto no-scrollbar text-xs font-semibold text-gray-700">
              <Link href="/sell" className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white">
                All
              </Link>
              <Link href="/sell-old-mobile-phone" className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white">
                Sell Phone
              </Link>
              <Link href="/sell" className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white">
                Sell Gadgets
              </Link>
              <Link href="/buy-refurbished" className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white">
                Buy Refurbished
              </Link>
              <Link href="/buy-refurbished-laptops" className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white">
                Buy Laptop
              </Link>
              <Link href="/repair" className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white">
                Repair
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
                {/* ========================================================= */}
        {/* MOBILE NAVIGATION DRAWER                                   */}
        {/* ========================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <button
                onClick={() => {
                  setLocationModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#13b59b]" />
                <span suppressHydrationWarning>Location: {selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-800"
              >
                <ShoppingCart className="w-4 h-4 text-[#13b59b]" />
                <span suppressHydrationWarning>Cart ({cartCount})</span>
              </Link>
            </div>

            {/* Mobile Category Accordions */}
            <div className="space-y-1.5 text-sm font-medium">
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveTab(
                      mobileActiveTab === 'sell-phone' ? null : 'sell-phone'
                    )
                  }
                  className="w-full flex items-center justify-between p-3 bg-gray-50/70 text-gray-800 font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#13b59b]" />
                    Sell Phone
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      mobileActiveTab === 'sell-phone' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileActiveTab === 'sell-phone' && (
                  <div className="p-3 bg-white space-y-1 border-t border-gray-100 text-xs">
                    {PHONE_BRANDS.map((b) => (
                      <Link
                        key={b.id}
                        href={b.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-2 text-gray-700 hover:text-[#13b59b]"
                      >
                        Sell {b.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveTab(
                      mobileActiveTab === 'sell-gadgets' ? null : 'sell-gadgets'
                    )
                  }
                  className="w-full flex items-center justify-between p-3 bg-gray-50/70 text-gray-800 font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-600" />
                    Sell Gadgets
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      mobileActiveTab === 'sell-gadgets' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileActiveTab === 'sell-gadgets' && (
                  <div className="p-3 bg-white space-y-1 border-t border-gray-100 text-xs">
                    {GADGET_TYPES.map((g) => (
                      <Link
                        key={g.id}
                        href={g.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-2 text-gray-700 hover:text-[#13b59b]"
                      >
                        Sell {g.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setMobileActiveTab(
                      mobileActiveTab === 'buy-refurb' ? null : 'buy-refurb'
                    )
                  }
                  className="w-full flex items-center justify-between p-3 bg-gray-50/70 text-gray-800 font-bold cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Buy Refurbished
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      mobileActiveTab === 'buy-refurb' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileActiveTab === 'buy-refurb' && (
                  <div className="p-3 bg-white space-y-1 border-t border-gray-100 text-xs">
                    {BUY_REFURB_CATEGORIES.map((r) => (
                      <Link
                        key={r.id}
                        href={r.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-2 text-gray-700 hover:text-[#13b59b]"
                      >
                        {r.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/repair"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 bg-gray-50/70 rounded-xl text-gray-800 font-bold hover:text-[#13b59b]"
              >
                <Wrench className="w-4 h-4 text-emerald-600" />
                <span>Doorstep Mobile Repair</span>
              </Link>
            </div>

            {/* User Auth in Mobile Drawer */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              {currentUser ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-semibold text-gray-800">
                    Logged in as {currentUser.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="w-full text-center bg-[#2bbb9e] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 3. LOCATION PICKER MODAL                                   */}
      {/* ========================================================= */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#13b59b]/15 text-[#13b59b] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">
                    Select Delivery Location
                  </h3>
                  <p className="text-xs text-gray-500">
                    Exclusively for West Champaran (Pashchim Champaran), Bihar
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLocationModalOpen(false);
                  setPincodeError('');
                  setPincodeInput('');
                }}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 bg-teal-50 border border-teal-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs text-teal-800">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#13b59b]" />
                18 Blocks • 19 Serviceable PIN Codes
              </span>
              <span className="text-[11px] bg-white text-[#13b59b] font-bold px-2 py-0.5 rounded-md border border-teal-200">
                Active Delivery Zone
              </span>
            </div>

            <form onSubmit={handlePincodeSubmit} className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Search Town, Block, Locality or 6-digit PIN Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    suppressHydrationWarning
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => {
                      setPincodeInput(e.target.value);
                      setPincodeError('');
                    }}
                    placeholder="e.g. Bettiah, Bagaha, Lauriya, 845438, 845101"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#13b59b] focus:bg-white"
                    autoFocus
                  />
                  {pincodeInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setPincodeInput('');
                        setPincodeError('');
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2bbb9e] hover:bg-[#23a58c] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {pincodeError && (
                <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-600">
                  {pincodeError}
                </div>
              )}
            </form>

            {pincodeInput.trim().length > 0 ? (
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Matching West Champaran Locations
                </div>
                <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5">
                  {searchLocations(pincodeInput).length > 0 ? (
                    searchLocations(pincodeInput).map((res, idx) => {
                      const isSelected =
                        selectedPincode === res.pincode &&
                        selectedCity.toLowerCase() ===
                          res.name.toLowerCase();
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectCity(res.name, res.pincode)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                            isSelected
                              ? 'border-[#13b59b] bg-[#13b59b]/5 text-[#13b59b]'
                              : 'border-gray-200 hover:border-gray-300 text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-gray-900">
                              {res.name}
                            </div>
                            <div className="text-[11px] text-gray-500 font-normal">
                              PIN:{' '}
                              <strong className="text-gray-700">
                                {res.pincode}
                              </strong>{' '}
                              • {res.detail || `${res.block} Block`}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#13b59b]">
                            <span>Select</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-xl text-center text-xs text-gray-500">
                      No matching location found in West Champaran for &quot;
                      {pincodeInput}&quot;.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 mb-3 border-b border-gray-100 pb-2">
                  <button
                    type="button"
                    onClick={() => setLocationTab('towns')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      locationTab === 'towns'
                        ? 'bg-[#13b59b] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Major Towns ({POPULAR_CITIES.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocationTab('blocks')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      locationTab === 'blocks'
                        ? 'bg-[#13b59b] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All 18 Blocks ({WEST_CHAMPARAN_BLOCKS.length})
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                  {locationTab === 'towns'
                    ? POPULAR_CITIES.map((city, idx) => {
                        const isSelected =
                          selectedPincode === city.pincode &&
                          selectedCity.toLowerCase() ===
                            city.name.toLowerCase();
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              handleSelectCity(city.name, city.pincode)
                            }
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                              isSelected
                                ? 'border-[#13b59b] bg-[#13b59b]/5 text-[#13b59b]'
                                : 'border-gray-200 hover:border-gray-300 text-gray-800 hover:bg-gray-50'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-gray-900">
                                {city.name}
                              </div>
                              <div className="text-[10px] text-gray-500 font-normal">
                                {city.pincode}
                              </div>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b] shrink-0" />
                            )}
                          </button>
                        );
                      })
                    : WEST_CHAMPARAN_BLOCKS.map((blk, idx) => {
                        const isSelected =
                          selectedCity.toLowerCase() ===
                          blk.name.toLowerCase();
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              handleSelectCity(blk.name, blk.defaultPincode)
                            }
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                              isSelected
                                ? 'border-[#13b59b] bg-[#13b59b]/5 text-[#13b59b]'
                                : 'border-gray-200 hover:border-gray-300 text-gray-800 hover:bg-gray-50'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-gray-900">
                                {blk.name}
                              </div>
                              <div className="text-[10px] text-gray-500 font-normal">
                                {blk.defaultPincode} • {blk.subdivision}
                              </div>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>
                Delivery location:{' '}
                <strong className="text-gray-900">
                  {selectedCity} ({selectedPincode})
                </strong>
              </span>
              <button
                type="button"
                onClick={() => setLocationModalOpen(false)}
                className="text-[#13b59b] font-bold hover:underline cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. CASHIFY LOGIN / SIGNUP MODAL                           */}
      {/* ========================================================= */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          syncState();
        }}
      />
    </>
  );
}
