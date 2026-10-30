'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export default function Navbar() {
  const router = useRouter();

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Active hover states inside dropdowns
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
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs font-sans">
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
                        My Account & Orders
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
        <div className="border-t border-gray-200 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              ref={navBarRef}
              className="hidden lg:flex items-center justify-between text-sm py-2.5 font-bold text-gray-900"
            >
              {/* ===================================================== */}
              {/* ITEM 1: ALL ∨ (Exact Menu from User Uploaded Screenshot) */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('all')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === 'all' ? null : 'all');
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'all'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>All</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'all'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {/* Dropdown for All: Exact layout from uploaded image */}
                {activeDropdown === 'all' && (
                  <div
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Main Menu Card: EXACT MATCH TO USER'S IMAGE */}
                    <div className="w-[285px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2.5 space-y-0.5 text-gray-900 font-sans">
                        {/* Section: Sell (Bold title) */}
                        <div className="px-3.5 pt-2 pb-1.5 text-[15px] font-bold text-gray-950 tracking-tight">
                          Sell
                        </div>

                        {/* Subitems under Sell (Indented, regular font, right chevron) */}
                        <div className="space-y-0.5">
                          {ALL_SUB_ITEMS.filter((i) => i.parent === 'sell').map(
                            (item) => {
                              const isHovered = allHoveredId === item.id;
                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  onMouseEnter={() => setAllHoveredId(item.id)}
                                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] transition text-left cursor-pointer ${
                                    isHovered
                                      ? 'bg-[#EAF8F5] text-[#13b59b] font-medium'
                                      : 'text-gray-800 font-normal hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="pl-3.5">{item.label}</span>
                                  <ChevronRight
                                    className={`w-4 h-4 stroke-[2] transition-colors ${
                                      isHovered
                                        ? 'text-[#13b59b]'
                                        : 'text-gray-400'
                                    }`}
                                  />
                                </Link>
                              );
                            }
                          )}
                        </div>

                        {/* Root Categories under Sell (Bold font, aligned directly with Sell) */}
                        <div className="pt-1 space-y-0.5">
                          {ALL_SUB_ITEMS.filter((i) => i.isRoot).map(
                            (item) => {
                              const isHovered = allHoveredId === item.id;
                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  onMouseEnter={() =>
                                    setAllHoveredId(item.id)
                                  }
                                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] font-bold transition text-left cursor-pointer ${
                                    isHovered
                                      ? 'bg-[#EAF8F5] text-[#13b59b]'
                                      : 'text-gray-950 hover:bg-gray-50'
                                  }`}
                                >
                                  <span>{item.label}</span>
                                  <ChevronRight
                                    className={`w-4 h-4 stroke-[2] transition-colors ${
                                      isHovered
                                        ? 'text-[#13b59b]'
                                        : 'text-gray-700'
                                    }`}
                                  />
                                </Link>
                              );
                            }
                          )}
                        </div>
                      </div>
                  </div>
                )}
              </div>

              {/* ===================================================== */}
              {/* ITEM 2: SELL PHONE ∨                                  */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('sell-phone')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === 'sell-phone' ? null : 'sell-phone'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'sell-phone'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>Sell Phone</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'sell-phone'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {activeDropdown === 'sell-phone' && (
                  <div
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="relative flex items-start">
                      {/* Left Menu Card (Matches Second Image) */}
                      <div className="w-[285px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2.5 space-y-0.5 text-gray-900 font-sans shrink-0">
                        <div className="px-3.5 pt-2 pb-1.5 text-[15px] font-bold text-gray-950 tracking-tight">
                          Sell Phone
                        </div>
                        <div className="space-y-0.5">
                          {PHONE_BRANDS.map((b) => {
                            const isHovered = sellPhoneBrand === b.id;
                            return (
                              <Link
                                key={b.id}
                                href={b.href}
                                onMouseEnter={() => setSellPhoneBrand(b.id)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] transition text-left cursor-pointer ${
                                  isHovered
                                    ? 'bg-[#EAF8F5] text-[#13b59b] font-medium'
                                    : 'text-gray-800 font-normal hover:bg-gray-50'
                                }`}
                              >
                                <span className="pl-3.5">{b.name}</span>
                                <ChevronRight
                                  className={`w-4 h-4 stroke-[2] transition-colors ${
                                    isHovered ? 'text-[#13b59b]' : 'text-gray-400'
                                  }`}
                                />
                              </Link>
                            );
                          })}
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <Link
                            href="/sell-old-mobile-phone"
                            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[13px] font-bold text-[#13b59b] hover:bg-[#EAF8F5] transition"
                          >
                            <span>View All Phone Brands</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right Submenu Flyout for Phone Brand */}
                      {currentPhoneBrand && (
                        <div
                          className="ml-2 w-[420px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-5 shrink-0 flex flex-col justify-between font-sans min-h-[380px] animate-in fade-in-0 duration-150"
                          onMouseEnter={() => {
                            if (dropdownTimeoutRef.current)
                              clearTimeout(dropdownTimeoutRef.current);
                          }}
                        >
                          <div>
                            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                              <h4 className="text-sm font-bold text-gray-900">
                                Top Selling {currentPhoneBrand.name} Models
                              </h4>
                              <Link
                                href={currentPhoneBrand.href}
                                className="text-xs font-bold text-[#13b59b] hover:underline"
                              >
                                All Models →
                              </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {currentPhoneBrand.models.map((m, idx) => (
                                <Link
                                  key={idx}
                                  href={currentPhoneBrand.href}
                                  className="p-2.5 rounded-xl border border-gray-100 hover:border-[#13b59b] hover:bg-[#EAF8F5] transition flex items-center justify-between text-xs"
                                >
                                  <span className="font-medium text-gray-800 truncate">
                                    {m.name}
                                  </span>
                                  <span className="font-bold text-[#13b59b] text-[11px] shrink-0 ml-1">
                                    Up to {m.max}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <span>Instant UPI cash payment at doorstep</span>
                            <Link
                              href="/sell-old-mobile-phone"
                              className="font-bold text-[#13b59b] hover:underline"
                            >
                              Search Phone →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ===================================================== */}
              {/* ITEM 3: SELL GADGETS ∨                                */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('sell-gadgets')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === 'sell-gadgets' ? null : 'sell-gadgets'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'sell-gadgets'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>Sell Gadgets</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'sell-gadgets'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {activeDropdown === 'sell-gadgets' && (
                  <div
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="w-[285px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2.5 space-y-0.5 text-gray-900 font-sans">
                      <div className="px-3.5 pt-2 pb-1.5 text-[15px] font-bold text-gray-950 tracking-tight">
                        Sell Gadgets
                      </div>
                      <div className="space-y-0.5">
                        {GADGET_TYPES.map((g) => {
                          const isHovered = gadgetType === g.id;
                          return (
                            <Link
                              key={g.id}
                              href={g.href}
                              onMouseEnter={() => setGadgetType(g.id)}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] transition text-left cursor-pointer ${
                                isHovered
                                  ? 'bg-[#EAF8F5] text-[#13b59b] font-medium'
                                  : 'text-gray-800 font-normal hover:bg-gray-50'
                              }`}
                            >
                              <span className="pl-3.5">{g.label}</span>
                              <ChevronRight
                                className={`w-4 h-4 stroke-[2] transition-colors ${
                                  isHovered ? 'text-[#13b59b]' : 'text-gray-400'
                                }`}
                              />
                            </Link>
                          );
                        })}
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          href="/sell"
                          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[13px] font-bold text-[#13b59b] hover:bg-[#EAF8F5] transition"
                        >
                          <span>Explore All Gadgets</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ===================================================== */}
              {/* ITEM 4: BUY REFURBISHED DEVICES ∨                     */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('buy-refurbished')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === 'buy-refurbished'
                        ? null
                        : 'buy-refurbished'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'buy-refurbished'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>Buy Refurbished Devices</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'buy-refurbished'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {activeDropdown === 'buy-refurbished' && (
                  <div
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="w-[285px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2.5 space-y-0.5 text-gray-900 font-sans">
                      <div className="px-3.5 pt-2 pb-1.5 text-[15px] font-bold text-gray-950 tracking-tight">
                        Buy Gadgets
                      </div>
                      <div className="space-y-0.5">
                        {BUY_REFURB_CATEGORIES.map((c) => {
                          const isHovered = buyRefurbCat === c.id;
                          return (
                            <Link
                              key={c.id}
                              href={c.href}
                              onMouseEnter={() => setBuyRefurbCat(c.id)}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] transition text-left cursor-pointer ${
                                isHovered
                                  ? 'bg-[#EAF8F5] text-[#13b59b] font-medium'
                                  : 'text-gray-800 font-normal hover:bg-gray-50'
                              }`}
                            >
                              <span className="pl-3.5">{c.label}</span>
                              <ChevronRight
                                className={`w-4 h-4 stroke-[2] transition-colors ${
                                  isHovered ? 'text-[#13b59b]' : 'text-gray-400'
                                }`}
                              />
                            </Link>
                          );
                        })}
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          href="/buy-refurbished"
                          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[13px] font-bold text-[#13b59b] hover:bg-[#EAF8F5] transition"
                        >
                          <span>Explore Refurbished Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ===================================================== */}
              {/* ITEM 5: FIND NEW GADGET ∨                             */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('find-new')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === 'find-new' ? null : 'find-new'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'find-new'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>Find New Gadget</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'find-new'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {activeDropdown === 'find-new' && (
                  <div
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="bg-white border border-gray-200/90 rounded-2xl shadow-2xl p-3 w-[260px] text-gray-900 font-sans space-y-1">
                      <Link
                        href="/find-new-phone"
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-800 hover:bg-[#f0faf8] hover:text-[#13b59b] transition"
                      >
                        <span>Find New Phone</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                      <Link
                        href="/find-new-phone"
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-800 hover:bg-[#f0faf8] hover:text-[#13b59b] transition"
                      >
                        <span>Find New Laptop</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                      <Link
                        href="/find-new-phone"
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-gray-800 hover:bg-[#f0faf8] hover:text-[#13b59b] transition"
                      >
                        <span>Compare Mobile Phones</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          href="/articles"
                          className="block px-3 py-1.5 text-xs text-gray-600 hover:text-[#13b59b]"
                        >
                          Smartphone Reviews &amp; News
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ===================================================== */}
              {/* ITEM 6: BUY LAPTOP ∨                                  */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('buy-laptop')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === 'buy-laptop' ? null : 'buy-laptop'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'buy-laptop'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>Buy Laptop</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'buy-laptop'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {activeDropdown === 'buy-laptop' && (
                  <div
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="relative flex items-start">
                      {/* Left Menu Card (Matches Second Image) */}
                      <div className="w-[285px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2.5 space-y-0.5 text-gray-900 font-sans shrink-0">
                        <div className="px-3.5 pt-2 pb-1.5 text-[15px] font-bold text-gray-950 tracking-tight">
                          Buy Laptop
                        </div>
                        <div className="space-y-0.5">
                          {LAPTOP_BRANDS.map((lb) => {
                            const isHovered = laptopBrand === lb.id;
                            return (
                              <Link
                                key={lb.id}
                                href="/buy-refurbished-laptops"
                                onMouseEnter={() => setLaptopBrand(lb.id)}
                                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] transition text-left cursor-pointer ${
                                  isHovered
                                    ? 'bg-[#EAF8F5] text-[#13b59b] font-medium'
                                    : 'text-gray-800 font-normal hover:bg-gray-50'
                                }`}
                              >
                                <span className="pl-3.5">{lb.name}</span>
                                <ChevronRight
                                  className={`w-4 h-4 stroke-[2] transition-colors ${
                                    isHovered ? 'text-[#13b59b]' : 'text-gray-400'
                                  }`}
                                />
                              </Link>
                            );
                          })}
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <Link
                            href="/buy-refurbished-laptops"
                            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[13px] font-bold text-[#13b59b] hover:bg-[#EAF8F5] transition"
                          >
                            <span>Browse All Laptops</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Right Submenu Flyout for Laptop Brand */}
                      {currentLaptopBrand && (
                        <div
                          className="ml-2 w-[380px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-5 shrink-0 flex flex-col justify-between font-sans min-h-[340px] animate-in fade-in-0 duration-150"
                          onMouseEnter={() => {
                            if (dropdownTimeoutRef.current)
                              clearTimeout(dropdownTimeoutRef.current);
                          }}
                        >
                          <div>
                            <div className="border-b border-gray-100 pb-2 mb-3 flex items-center justify-between">
                              <h4 className="text-sm font-bold text-gray-900">
                                Certified {currentLaptopBrand.name} Laptops
                              </h4>
                              <span className="text-xs text-[#13b59b] font-bold">
                                12M Warranty
                              </span>
                            </div>
                            <div className="space-y-1.5 text-xs text-gray-800">
                              {currentLaptopBrand.models.map((m, idx) => (
                                <Link
                                  key={idx}
                                  href="/buy-refurbished-laptops"
                                  className="block p-2.5 rounded-xl border border-gray-100 hover:border-[#13b59b] hover:bg-[#EAF8F5] transition"
                                >
                                  {m}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-100">
                            <Link
                              href="/buy-refurbished-laptops"
                              className="text-xs font-bold text-[#13b59b] hover:underline"
                            >
                              Explore All {currentLaptopBrand.name} →
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ===================================================== */}
              {/* ITEM 7: SELLBAR STORE ∨                               */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('store')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === 'store' ? null : 'store'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition pb-1 border-b-2 cursor-pointer ${
                    activeDropdown === 'store'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>Sellbar Store</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'store'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {activeDropdown === 'store' && (
                  <div
                    className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="w-[285px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2.5 space-y-0.5 text-gray-900 font-sans">
                      <div className="px-3.5 pt-2 pb-1.5 text-[15px] font-bold text-gray-950 tracking-tight">
                        Sellbar Store
                      </div>
                      <div className="space-y-0.5">
                        {STORE_CITIES.map((sc, i) => (
                          <Link
                            key={i}
                            href="/about-us"
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] text-gray-800 font-normal hover:bg-[#EAF8F5] hover:text-[#13b59b] hover:font-medium transition cursor-pointer"
                          >
                            <span className="pl-3.5">{sc.name}</span>
                            <ChevronRight className="w-4 h-4 stroke-[2] text-gray-400" />
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          href="/about-us"
                          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[13px] font-bold text-[#13b59b] hover:bg-[#EAF8F5] transition"
                        >
                          <span>Find All Experience Centers</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ===================================================== */}
              {/* ITEM 8: MORE ∨                                        */}
              {/* ===================================================== */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('more')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveDropdown(
                      activeDropdown === 'more' ? null : 'more'
                    );
                  }}
                  className={`flex items-center gap-1 font-bold text-[14px] transition cursor-pointer pb-1 border-b-2 ${
                    activeDropdown === 'more'
                      ? 'text-[#13b59b] border-[#13b59b]'
                      : 'text-gray-900 hover:text-[#13b59b] border-transparent'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'more'
                        ? 'rotate-180 text-[#13b59b]'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {activeDropdown === 'more' && (
                  <div
                    className="absolute right-0 top-full pt-1.5 z-50 animate-in fade-in-0 slide-in-from-top-1.5 duration-150"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current)
                        clearTimeout(dropdownTimeoutRef.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="w-[285px] bg-white border border-gray-100 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2.5 space-y-0.5 text-gray-900 font-sans">
                      <div className="px-3.5 pt-2 pb-1.5 text-[15px] font-bold text-gray-950 tracking-tight">
                        More Services
                      </div>
                      <div className="space-y-0.5">
                        {[
                          { label: 'Device Repair Service', href: '/repair' },
                          { label: 'Certified Recycling', href: '/recycle-old-mobile-phone' },
                          { label: 'Partner With Us', href: '/partner-with-us' },
                          { label: 'Vendor Portal Login', href: '/vendor/login' },
                          { label: 'Warranty Policy', href: '/warranty-policy' },
                          { label: 'About Sellbar', href: '/about-us' },
                          { label: 'Contact Us', href: '/contact' },
                        ].map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[14px] text-gray-800 font-normal hover:bg-[#EAF8F5] hover:text-[#13b59b] hover:font-medium transition cursor-pointer"
                          >
                            <span className="pl-3.5">{item.label}</span>
                            <ChevronRight className="w-4 h-4 stroke-[2] text-gray-400" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile horizontal scrollable pill bar */}
            <div className="lg:hidden flex items-center gap-2 py-2 overflow-x-auto no-scrollbar text-xs font-semibold text-gray-700">
              <Link
                href="/sell"
                className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white"
              >
                All
              </Link>
              <Link
                href="/sell-old-mobile-phone"
                className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white"
              >
                Sell Phone
              </Link>
              <Link
                href="/sell-old-laptop"
                className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white"
              >
                Sell Laptop
              </Link>
              <Link
                href="/buy-refurbished"
                className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white"
              >
                Buy Refurbished
              </Link>
              <Link
                href="/buy-refurbished-laptops"
                className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white"
              >
                Buy Laptop
              </Link>
              <Link
                href="/repair"
                className="px-3 py-1 bg-gray-100 rounded-full shrink-0 hover:bg-[#13b59b] hover:text-white"
              >
                Repair
              </Link>
            </div>
          </div>
        </div>

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
