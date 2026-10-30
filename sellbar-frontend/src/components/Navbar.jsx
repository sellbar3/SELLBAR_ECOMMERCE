'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown, ShoppingCart, Menu, X, Smartphone, Laptop, Store, Wrench, ShieldCheck, RotateCcw, Sparkles, ArrowRight, ChevronRight, Compass, Tag, User as UserIcon, LogOut, Building2, CheckCircle2, } from 'lucide-react';
import { getLocalCart } from '@/lib/cart';
import { lookupPincode } from '@/lib/pincodes';
import LoginModal from './LoginModal';
// Popular Indian Cities for quick location selection
const POPULAR_CITIES = [
    { name: 'Gurgaon', pincode: '122001', state: 'Haryana' },
    { name: 'Delhi NCR', pincode: '110001', state: 'Delhi' },
    { name: 'Noida', pincode: '201301', state: 'Uttar Pradesh' },
    { name: 'Bengaluru', pincode: '560001', state: 'Karnataka' },
    { name: 'Mumbai', pincode: '400001', state: 'Maharashtra' },
    { name: 'Pune', pincode: '411001', state: 'Maharashtra' },
    { name: 'Hyderabad', pincode: '500001', state: 'Telangana' },
    { name: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
    { name: 'Kolkata', pincode: '700001', state: 'West Bengal' },
    { name: 'Ahmedabad', pincode: '380001', state: 'Gujarat' },
];
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
export default function Navbar() {
    const router = useRouter();
    // Navigation states
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [allActiveSub, setAllActiveSub] = useState('sell');
    const [allSellNestedSub, setAllSellNestedSub] = useState('phone');
    const [gadgetActiveSub, setGadgetActiveSub] = useState('phone');
    const [buyRefurbishedSub, setBuyRefurbishedSub] = useState('phones');
    const [findGadgetSub, setFindGadgetSub] = useState('phone');
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
    // Location selector states (Defaulting to 'Gurgaon' as in Cashify reference)
    const [locationModalOpen, setLocationModalOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Gurgaon');
    const [selectedPincode, setSelectedPincode] = useState('122001');
    const [pincodeInput, setPincodeInput] = useState('');
    const [pincodeError, setPincodeError] = useState('');
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
        }
        catch {
            // ignore
        }
    };
    useEffect(() => {
        syncState();
        const handleCartUpdate = () => syncState();
        const handleOpenLogin = () => setLoginModalOpen(true);
        window.addEventListener('sellbar-cart-updated', handleCartUpdate);
        window.addEventListener('open-login-modal', handleOpenLogin);
        const handleClickOutside = (event) => {
            if (searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)) {
                setSearchFocused(false);
            }
            if (navBarRef.current &&
                !navBarRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('sellbar-cart-updated', handleCartUpdate);
            window.removeEventListener('open-login-modal', handleOpenLogin);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleDropdownEnter = (menuName) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setActiveDropdown(menuName);
    };
    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
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
        setSelectedCity(city);
        setSelectedPincode(pin);
        setLocationModalOpen(false);
        setPincodeError('');
    };
    const handlePincodeSubmit = (e) => {
        e.preventDefault();
        if (pincodeInput.trim().length === 6) {
            const info = lookupPincode(pincodeInput.trim());
            setSelectedPincode(info.pincode);
            setSelectedCity(info.city.split('(')[0].trim());
            setLocationModalOpen(false);
            setPincodeInput('');
            setPincodeError('');
        }
        else {
            setPincodeError('Please enter a valid 6-digit Indian PIN Code');
        }
    };
    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        }
        catch {
            // ignore
        }
        setCurrentUser(null);
        setUserMenuOpen(false);
        router.push('/');
        router.refresh();
    };
    return (<>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs font-sans">
        {/* ========================================================= */}
        {/* 1. TOP MAIN ROW (Logo, Large Search, Location, Login/Cart) */}
        {/* ========================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-3 md:gap-6">
            
            {/* BRAND LOGO (Cashify Style: Teal Circular Tick Mark + Bold Name) */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-9 h-9 rounded-full bg-[#13b59b] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <svg className="w-5 h-5 text-white stroke-[2.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-[#13b59b]">
                  SELLBAR
                </span>
              </div>
            </Link>

            {/* SEARCH BAR (Wide light gray input with search icon & trending dropdown) */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center bg-[#f4f6f8] hover:bg-[#eef1f4] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#13b59b]/25 border border-transparent focus-within:border-[#13b59b] rounded-md transition duration-150">
                  <div className="pl-3.5 pr-2 text-gray-400">
                    <Search className="w-4 h-4 stroke-[2.2]"/>
                  </div>
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setSearchFocused(true)} placeholder="Search for mobiles, accessories & More" className="w-full bg-transparent py-2.5 pr-4 text-sm text-gray-800 placeholder:text-gray-400 font-normal focus:outline-none"/>
                  {searchQuery && (<button type="button" onClick={() => setSearchQuery('')} className="pr-3 text-gray-400 hover:text-gray-600 text-xs">
                      Clear
                    </button>)}
                </div>
              </form>

              {/* Instant Search Suggestions Popover */}
              {searchFocused && (<div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4 text-sm">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                    Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {TRENDING_SEARCHES.map((item, idx) => (<button key={idx} type="button" onClick={() => {
                    setSearchQuery(item);
                    router.push(`/search?q=${encodeURIComponent(item)}`);
                    setSearchFocused(false);
                }} className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-[#13b59b]/10 hover:text-[#13b59b] text-gray-700 rounded-full transition cursor-pointer">
                        {item}
                      </button>))}
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#13b59b]"/>
                      Sell old phone or buy refurbished with 12M warranty
                    </span>
                    <Link href="/buy-refurbished" onClick={() => setSearchFocused(false)} className="text-[#13b59b] font-semibold hover:underline">
                      Explore All
                    </Link>
                  </div>
                </div>)}
            </div>

            {/* RIGHT SIDE ACTIONS: Location Selector & Login Button */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              
              {/* Location Selector (e.g. Gurgaon ∨) */}
              <button type="button" onClick={() => setLocationModalOpen(true)} className="flex items-center gap-1.5 text-gray-800 hover:text-[#13b59b] transition py-1 cursor-pointer group" title="Change location">
                <div className="w-5 h-5 rounded-full border border-gray-800 group-hover:border-[#13b59b] flex items-center justify-center transition">
                  <div className="w-2 h-2 rounded-full bg-[#13b59b]"/>
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  {selectedCity}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-600 group-hover:text-[#13b59b] transition"/>
              </button>

              {/* Shopping Cart Icon (clean & minimalist) */}
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[#13b59b] transition rounded-lg hover:bg-gray-100" aria-label="View Cart">
                <ShoppingCart className="w-5 h-5 stroke-2"/>
                {cartCount > 0 && (<span className="absolute -top-1 -right-1 bg-[#13b59b] text-white text-[11px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>)}
              </Link>

              {/* Login / User Profile Button (Teal Pill Button like Cashify) */}
              {currentUser ? (<div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-md text-sm font-semibold transition">
                    <div className="w-6 h-6 rounded-full bg-[#13b59b] text-white flex items-center justify-center text-xs font-bold">
                      {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline">
                      {currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500"/>
                  </button>

                  {userMenuOpen && (<div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1.5 text-sm">
                      <div className="px-3.5 py-2 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">{currentUser.name}</div>
                        <div className="text-xs text-gray-500 truncate">{currentUser.email || currentUser.phone}</div>
                      </div>
                      <Link href="/account" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3.5 py-2 text-gray-700 hover:bg-gray-50">
                        <UserIcon className="w-4 h-4 text-gray-500"/>
                        My Account & Orders
                      </Link>
                      {currentUser.role === 'ADMIN' && (<Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3.5 py-2 text-cyan-600 hover:bg-cyan-50 font-medium">
                          <ShieldCheck className="w-4 h-4"/>
                          Admin Portal
                        </Link>)}
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 text-left">
                        <LogOut className="w-4 h-4"/>
                        Sign Out
                      </button>
                    </div>)}
                </div>) : (<button type="button" onClick={() => setLoginModalOpen(true)} className="bg-[#2bbb9e] hover:bg-[#24a88e] active:scale-[0.98] text-white text-sm font-semibold px-5.5 py-2 rounded-md transition shadow-xs inline-flex items-center justify-center cursor-pointer">
                  Login
                </button>)}

              {/* Mobile Menu Hamburger */}
              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-1.5 text-gray-700 hover:text-gray-900 focus:outline-none" aria-label="Toggle menu">
                {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
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
              
              {/* ITEM 1: All ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('all')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'all' ? null : 'all');
        }} className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${activeDropdown === 'all'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>All</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'all' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown Menu for All: Matching Cashify Image 1 exactly */}
                {activeDropdown === 'all' && (<div className="absolute left-0 top-full pt-2 z-50 w-200">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex">
                      {/* Left categories list */}
                      <div className="w-56 bg-white border-r border-gray-100 p-2.5 space-y-1 shrink-0">
                        {/* Sell Section Header */}
                        <div className="bg-[#e6f9f6] text-[#13b59b] font-bold px-3 py-2 text-xs rounded-lg mb-1">
                          Sell
                        </div>

                        {/* Nested items under Sell */}
                        {[
                { id: 'phone', label: 'Phone' },
                { id: 'laptop', label: 'Laptop' },
                { id: 'smartwatch', label: 'Smartwatch' },
                { id: 'tablet', label: 'Tablet' },
                { id: 'more', label: 'More' },
            ].map((item) => {
                const isSelected = allActiveSub === 'sell' && allSellNestedSub === item.id;
                return (<button key={item.id} type="button" onMouseEnter={() => {
                        setAllActiveSub('sell');
                        setAllSellNestedSub(item.id);
                    }} className={`w-full flex items-center justify-between pl-4 pr-3 py-2 rounded-lg text-xs font-semibold transition text-left cursor-pointer ${isSelected
                        ? 'bg-gray-100/90 text-[#13b59b]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}>
                              <span>{item.label}</span>
                              <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#13b59b]' : 'text-gray-400'}`}/>
                            </button>);
            })}

                        {/* Main Categories following Sell */}
                        {[
                { id: 'repair', label: 'Repair' },
                { id: 'sell-gadgets', label: 'Sell Gadgets' },
                { id: 'buy-gadgets', label: 'Buy Gadgets' },
                { id: 'recycle', label: 'Recycle' },
                { id: 'find-new-phone', label: 'Find New Phone' },
                { id: 'stores', label: 'Sellbar Store' },
            ].map((cat) => {
                const isSelected = allActiveSub === cat.id;
                return (<button key={cat.id} type="button" onMouseEnter={() => setAllActiveSub(cat.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition text-left mt-1 cursor-pointer ${isSelected
                        ? 'bg-[#e6f9f6] text-[#13b59b]'
                        : 'text-gray-800 hover:bg-gray-50'}`}>
                              <span>{cat.label}</span>
                              <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#13b59b]' : 'text-gray-400'}`}/>
                            </button>);
            })}
                      </div>

                      {/* Right dynamic content */}
                      <div className="flex-1 p-5 min-h-100 bg-white">
                        {/* 1. SELL -> PHONE */}
                        {allActiveSub === 'sell' && allSellNestedSub === 'phone' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Sell
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Brands</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/sell-old-mobile-phone/sell-apple" className="block hover:text-[#13b59b] py-0.5">Apple</Link>
                                  <Link href="/sell-old-mobile-phone/sell-xiaomi" className="block hover:text-[#13b59b] py-0.5">Xiaomi</Link>
                                  <Link href="/sell-old-mobile-phone/sell-samsung" className="block hover:text-[#13b59b] py-0.5">Samsung</Link>
                                  <Link href="/sell-old-mobile-phone/sell-oneplus" className="block hover:text-[#13b59b] py-0.5">Oneplus</Link>
                                  <Link href="/sell-old-mobile-phone/sell-nokia" className="block hover:text-[#13b59b] py-0.5">Nokia</Link>
                                  <Link href="/sell-old-mobile-phone/sell-poco" className="block hover:text-[#13b59b] py-0.5">Poco</Link>
                                  <Link href="/sell-old-mobile-phone?brand=1" className="block text-[#13b59b] font-bold hover:underline pt-1">More Phone Brands →</Link>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Selling Phones</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/sell-old-mobile-phone/used-apple-iphone-12" className="block hover:text-[#13b59b] py-0.5">Apple iPhone 12</Link>
                                  <Link href="/sell-old-mobile-phone/used-apple-iphone-11" className="block hover:text-[#13b59b] py-0.5">Apple iPhone 11</Link>
                                  <Link href="/sell-old-mobile-phone/used-samsung-galaxy-note-20-8-gb-256-gb" className="block hover:text-[#13b59b] py-0.5">Samsung Galaxy Note 20</Link>
                                  <Link href="/sell-old-mobile-phone/used-oneplus-9-pro-5g" className="block hover:text-[#13b59b] py-0.5">One Plus 9 Pro</Link>
                                  <Link href="/sell-old-mobile-phone/used-redmi-note-4" className="block hover:text-[#13b59b] py-0.5">Xiaomi Redmi Note 4</Link>
                                  <Link href="/sell-old-mobile-phone/used-iphone-6" className="block hover:text-[#13b59b] py-0.5">Apple iPhone 6</Link>
                                </div>
                              </div>
                            </div>
                          </div>)}

                        {/* 2. SELL -> LAPTOP */}
                        {allActiveSub === 'sell' && allSellNestedSub === 'laptop' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Sell
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Brands</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/sell-old-laptop/sell-apple" className="block hover:text-[#13b59b] py-0.5">Apple</Link>
                                  <Link href="/sell-old-laptop/sell-hp-compaq" className="block hover:text-[#13b59b] py-0.5">HP</Link>
                                  <Link href="/sell-old-laptop/sell-samsung" className="block hover:text-[#13b59b] py-0.5">Samsung</Link>
                                  <Link href="/sell-old-laptop/sell-lenovo" className="block hover:text-[#13b59b] py-0.5">Lenovo</Link>
                                  <Link href="/sell-old-laptop/sell-dell" className="block hover:text-[#13b59b] py-0.5">Dell</Link>
                                  <Link href="/sell-old-laptop/sell-honor" className="block hover:text-[#13b59b] py-0.5">Honor</Link>
                                  <Link href="/sell-old-laptop?brand=1" className="block text-[#13b59b] font-bold hover:underline pt-1">More Laptop Brands →</Link>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Selling Models</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/sell-old-laptop/used-pavilion-series" className="block hover:text-[#13b59b] py-0.5">Pavilion Series</Link>
                                  <Link href="/sell-old-laptop/used-vostro-series" className="block hover:text-[#13b59b] py-0.5">Vostro Series</Link>
                                  <Link href="/sell-old-laptop/used-inspiron-series" className="block hover:text-[#13b59b] py-0.5">Inspiron Series</Link>
                                </div>
                              </div>
                            </div>
                          </div>)}

                        {/* 3. SELL -> SMARTWATCH */}
                        {allActiveSub === 'sell' && allSellNestedSub === 'smartwatch' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Sell
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 mb-2.5">Top Brands</div>
                              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
                                <Link href="/sell-old-smart-watch/sell-apple" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Apple</Link>
                                <Link href="/sell-old-smart-watch/sell-xiaomi" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Xiaomi</Link>
                                <Link href="/sell-old-smart-watch/sell-samsung" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Samsung</Link>
                                <Link href="/sell-old-smart-watch/sell-oneplus" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">OnePlus</Link>
                              </div>
                              <div className="mt-4">
                                <Link href="/sell-old-smart-watch" className="text-xs font-bold text-[#13b59b] hover:underline">
                                  More Smartwatch Brands →
                                </Link>
                              </div>
                            </div>
                          </div>)}

                        {/* 4. SELL -> TABLET */}
                        {allActiveSub === 'sell' && allSellNestedSub === 'tablet' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Sell
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 mb-2.5">Top Brands</div>
                              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
                                <Link href="/sell-old-tablet/sell-apple" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Apple</Link>
                                <Link href="/sell-old-tablet/sell-lenovo" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Lenovo</Link>
                                <Link href="/sell-old-tablet/sell-samsung" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Samsung</Link>
                                <Link href="/sell-old-tablet/sell-honor" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Honor</Link>
                              </div>
                              <div className="mt-4">
                                <Link href="/sell-old-tablet" className="text-xs font-bold text-[#13b59b] hover:underline">
                                  More Tablet Brands →
                                </Link>
                              </div>
                            </div>
                          </div>)}

                        {/* 5. SELL -> MORE */}
                        {allActiveSub === 'sell' && allSellNestedSub === 'more' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Sell
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
                              {[
                    { title: 'Smart Speaker', href: '/sell-old-smart-speaker' },
                    { title: 'TV', href: '/sell-old-television' },
                    { title: 'DSLR Camera', href: '/sell-old-dslr-camera' },
                    { title: 'Earbuds', href: '/sell-old-earbuds' },
                    { title: 'iMac', href: '/sell-old-imac' },
                    { title: 'Gaming Consoles', href: '/sell-old-gaming-consoles' },
                    { title: 'AC', href: '/sell-old-air-conditioner' },
                ].map((item, idx) => (<Link key={idx} href={item.href} className="p-3 rounded-xl border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition flex items-center justify-between">
                                  <span>{item.title}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-gray-400"/>
                                </Link>))}
                            </div>
                          </div>)}

                        {/* 6. REPAIR */}
                        {allActiveSub === 'repair' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Repair
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Repair Services</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/screen-repair" className="block hover:text-[#13b59b] py-0.5">Screen</Link>
                                  <Link href="/battery-repair" className="block hover:text-[#13b59b] py-0.5">Battery</Link>
                                  <Link href="/mic-repair" className="block hover:text-[#13b59b] py-0.5">Mic</Link>
                                  <Link href="/back-panel-repair" className="block hover:text-[#13b59b] py-0.5">Back Panel</Link>
                                  <Link href="/proximity-sensor-repair" className="block hover:text-[#13b59b] py-0.5">Proximity Sensor</Link>
                                  <Link href="/charging-jack-repair" className="block hover:text-[#13b59b] py-0.5">Charging Jack</Link>
                                  <Link href="/aux-jack-repair" className="block hover:text-[#13b59b] py-0.5">Aux Jack</Link>
                                  <Link href="/repair" className="block text-[#13b59b] font-bold hover:underline pt-1">More in Repair →</Link>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Repaired Phones</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/charging-jack-repair/xiaomi/redmi-note-4" className="block hover:text-[#13b59b] py-0.5">Xiaomi Redmi Note 4</Link>
                                  <Link href="/screen-repair/xiaomi/redmi-note-3" className="block hover:text-[#13b59b] py-0.5">Xiaomi Redmi Note 3</Link>
                                  <Link href="/screen-repair/apple/iphone-6" className="block hover:text-[#13b59b] py-0.5">Apple iPhone 6</Link>
                                  <Link href="/screen-repair/xiaomi/xiaomi-redmi-note-4-4-gb-64-gb" className="block hover:text-[#13b59b] py-0.5">Redmi Note 4</Link>
                                </div>
                              </div>
                            </div>
                          </div>)}

                        {/* 7. SELL GADGETS */}
                        {allActiveSub === 'sell-gadgets' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Sell Gadgets
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-gray-700">
                              {[
                    { title: 'Phone', href: '/sell-old-mobile-phone' },
                    { title: 'Laptop', href: '/sell-old-laptop' },
                    { title: 'TV', href: '/sell-old-television' },
                    { title: 'Smart Speaker', href: '/sell-old-smart-speaker' },
                    { title: 'Tablet', href: '/sell-old-tablet' },
                    { title: 'Gaming Consoles', href: '/sell-old-gaming-consoles' },
                    { title: 'iMac', href: '/sell-old-imac' },
                    { title: 'Smartwatch', href: '/sell-old-smart-watch' },
                    { title: 'DSLR Camera', href: '/sell-old-dslr-camera' },
                    { title: 'Earbuds', href: '/sell-old-earbuds' },
                    { title: 'AC', href: '/sell-old-air-conditioner' },
                ].map((g, idx) => (<Link key={idx} href={g.href} className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition flex items-center justify-between">
                                  <span>{g.title}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-gray-400"/>
                                </Link>))}
                            </div>
                          </div>)}

                        {/* 8. BUY GADGETS */}
                        {allActiveSub === 'buy-gadgets' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Buy Gadgets
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
                              {[
                    { title: 'Refurbished Phones', href: '/buy-refurbished-mobile-phones' },
                    { title: 'Refurbished Laptops', href: '/buy-refurbished-laptops' },
                    { title: 'Refurbished Smart Watches', href: '/buy-refurbished-smart-watches' },
                    { title: 'Refurbished Tablets', href: '/buy-refurbished-tablets' },
                    { title: 'Refurbished Gaming Consoles', href: '/buy-refurbished-gaming-consoles' },
                    { title: 'Refurbished Cameras', href: '/buy-refurbished-dslr-cameras' },
                    { title: 'Speakers', href: '/buy-openbox-audio-devices' },
                    { title: 'Amazon Devices', href: '/buy-refurbished-amazon-devices' },
                ].map((b, idx) => (<Link key={idx} href={b.href} className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition flex items-center justify-between">
                                  <span>{b.title}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-gray-400"/>
                                </Link>))}
                            </div>
                          </div>)}

                        {/* 9. RECYCLE */}
                        {allActiveSub === 'recycle' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Recycle
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Brands</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/recycle-old-mobile-phone/recycle-apple" className="block hover:text-[#13b59b] py-0.5">Apple</Link>
                                  <Link href="/recycle-old-mobile-phone/recycle-xiaomi" className="block hover:text-[#13b59b] py-0.5">Xiaomi</Link>
                                  <Link href="/recycle-old-mobile-phone/recycle-samsung" className="block hover:text-[#13b59b] py-0.5">Samsung</Link>
                                  <Link href="/recycle-old-mobile-phone/recycle-realme" className="block hover:text-[#13b59b] py-0.5">Realme</Link>
                                  <Link href="/recycle-old-mobile-phone/recycle-oneplus" className="block hover:text-[#13b59b] py-0.5">One Plus</Link>
                                  <Link href="/recycle-old-mobile-phone/recycle-poco" className="block hover:text-[#13b59b] py-0.5">Poco</Link>
                                  <Link href="/recycle-old-mobile-phone" className="block text-[#13b59b] font-bold hover:underline pt-1">Other Brands →</Link>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Recycled Phones</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/recycle-old-mobile-phone/reuse-redmi-note-4" className="block hover:text-[#13b59b] py-0.5">Xiaomi Redmi Note 4</Link>
                                  <Link href="/recycle-old-mobile-phone/reuse-redmi-note-3" className="block hover:text-[#13b59b] py-0.5">Xiaomi Redmi Note 3</Link>
                                  <Link href="/recycle-old-mobile-phone/reuse-iphone-6" className="block hover:text-[#13b59b] py-0.5">Apple iPhone 6</Link>
                                  <Link href="/recycle-old-mobile-phone/reuse-xiaomi-redmi-note-4-4-gb-64-gb" className="block hover:text-[#13b59b] py-0.5">Redmi Note 4</Link>
                                </div>
                              </div>
                            </div>
                          </div>)}

                        {/* 10. FIND NEW PHONE */}
                        {allActiveSub === 'find-new-phone' && (<div className="space-y-4">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              More in Find New Phone
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Tools &amp; Content</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/find-new-phone" className="block hover:text-[#13b59b] py-0.5">Phone Finder</Link>
                                  <Link href="/compare-mobile-phones" className="block hover:text-[#13b59b] py-0.5">Compare Phones</Link>
                                  <Link href="/new-smartphone-launches" className="block hover:text-[#13b59b] py-0.5">Latest Phones</Link>
                                  <Link href="/category/videos" className="block hover:text-[#13b59b] py-0.5">Videos</Link>
                                  <Link href="/news" className="block hover:text-[#13b59b] py-0.5">News</Link>
                                  <Link href="/smartphone-reviews" className="block hover:text-[#13b59b] py-0.5">Reviews</Link>
                                  <Link href="/articles" className="block hover:text-[#13b59b] py-0.5">Articles</Link>
                                  <Link href="/questions" className="block hover:text-[#13b59b] py-0.5">QnA</Link>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-gray-900 mb-2">Top Selling Phones</div>
                                <div className="space-y-1.5 text-xs font-medium text-gray-700">
                                  <Link href="/apple-mobile-price-list-in-india" className="block hover:text-[#13b59b] py-0.5">Apple</Link>
                                  <Link href="/xiaomi-mobile-price-list-in-india" className="block hover:text-[#13b59b] py-0.5">Xiaomi</Link>
                                  <Link href="/samsung-mobile-price-list-in-india" className="block hover:text-[#13b59b] py-0.5">Samsung</Link>
                                  <Link href="/oneplus-mobile-price-list-in-india" className="block hover:text-[#13b59b] py-0.5">Oneplus</Link>
                                  <Link href="/google-mobile-price-list-in-india" className="block hover:text-[#13b59b] py-0.5">Google</Link>
                                  <Link href="/poco-mobile-price-list-in-india" className="block hover:text-[#13b59b] py-0.5">Poco</Link>
                                </div>
                              </div>
                            </div>
                          </div>)}

                        {/* 11. SELLBAR STORES */}
                        {allActiveSub === 'stores' && (<div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                              Sellbar Experience Hubs pan-India
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-700">
                              {[
                    'Delhi NCR', 'Gurgaon', 'Noida', 'Bengaluru',
                    'Chennai', 'Pune', 'Agra', 'Patna',
                    'Ghaziabad', 'Faridabad', 'Meerut', 'Mohali'
                ].map((city, i) => (<Link key={i} href="/about-us" className="px-2.5 py-2 rounded-md hover:bg-[#f0faf8] hover:text-[#13b59b] transition flex items-center gap-1.5">
                                  <Store className="w-3.5 h-3.5 text-[#13b59b]"/>
                                  <span>{city}</span>
                                </Link>))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                              <span className="text-gray-500">200+ Retail Outlets Across India</span>
                              <Link href="/about-us" className="font-bold text-[#13b59b] hover:underline">
                                Find Nearest Store →
                              </Link>
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* ITEM 2: Sell Phone ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('sell-phone')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'sell-phone' ? null : 'sell-phone');
        }} className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${activeDropdown === 'sell-phone'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>Sell Phone</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sell-phone' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown for Sell Phone: 2-column layout matching Cashify Image 2 */}
                {activeDropdown === 'sell-phone' && (<div className="absolute left-0 top-full pt-2 z-50 w-130">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-bold text-gray-900 mb-2.5">
                          Top Brands
                        </div>
                        <div className="space-y-1.5 text-xs font-medium text-gray-700">
                          <Link href="/sell-old-mobile-phone/sell-apple" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple</Link>
                          <Link href="/sell-old-mobile-phone/sell-xiaomi" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Xiaomi</Link>
                          <Link href="/sell-old-mobile-phone/sell-samsung" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Samsung</Link>
                          <Link href="/sell-old-mobile-phone/sell-oneplus" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Oneplus</Link>
                          <Link href="/sell-old-mobile-phone/sell-nokia" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Nokia</Link>
                          <Link href="/sell-old-mobile-phone/sell-poco" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Poco</Link>
                          <Link href="/sell-old-mobile-phone?brand=1" className="block px-2 py-1 text-xs font-bold text-[#13b59b] hover:underline pt-1">
                            More Phone Brands
                          </Link>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-bold text-gray-900 mb-2.5">
                          Top Selling Phones
                        </div>
                        <div className="space-y-1.5 text-xs font-medium text-gray-700">
                          <Link href="/sell-old-mobile-phone/used-apple-iphone-12" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple iPhone 12</Link>
                          <Link href="/sell-old-mobile-phone/used-samsung-galaxy-note-20-8-gb-256-gb" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Samsung Galaxy Note 20</Link>
                          <Link href="/sell-old-mobile-phone/used-apple-iphone-11" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple iPhone 11</Link>
                          <Link href="/sell-old-mobile-phone/used-oneplus-9-pro-5g" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">One Plus 9 Pro</Link>
                          <Link href="/sell-old-mobile-phone/used-redmi-note-4" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Xiaomi Redmi Note 4</Link>
                          <Link href="/sell-old-mobile-phone/used-iphone-6" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple iPhone 6</Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* ITEM 3: Sell Gadgets ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('sell-gadgets')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'sell-gadgets' ? null : 'sell-gadgets');
        }} className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${activeDropdown === 'sell-gadgets'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>Sell Gadgets</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sell-gadgets' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown for Sell Gadgets matching Image 3 */}
                {activeDropdown === 'sell-gadgets' && (<div className="absolute left-0 top-full pt-2 z-50 w-180">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex">
                      {/* Left list matching Image 3 exactly */}
                      <div className="w-56 bg-white border-r border-gray-100 p-2.5 space-y-1 shrink-0">
                        {[
                { id: 'phone', label: 'Phone', hasArrow: true, href: '/sell-old-mobile-phone' },
                { id: 'laptop', label: 'Laptop', hasArrow: true, href: '/sell-old-laptop' },
                { id: 'speaker', label: 'Smart Speaker', hasArrow: true, href: '/sell-old-smart-speaker' },
                { id: 'tablet', label: 'Tablet', hasArrow: true, href: '/sell-old-tablet' },
                { id: 'gaming', label: 'Gaming Consoles', hasArrow: true, href: '/sell-old-gaming-consoles' },
                { id: 'imac', label: 'iMac', hasArrow: false, href: '/sell-old-imac' },
                { id: 'smartwatch', label: 'Smartwatch', hasArrow: true, href: '/sell-old-smart-watch' },
                { id: 'tv', label: 'TV', hasArrow: true, href: '/sell-old-television' },
                { id: 'earbuds', label: 'Earbuds', hasArrow: true, href: '/sell-old-earbuds' },
                { id: 'dslr', label: 'DSLR Camera', hasArrow: true, href: '/sell-old-dslr-camera' },
                { id: 'ac', label: 'AC', hasArrow: true, href: '/sell-old-air-conditioner' },
            ].map((cat) => {
                const isSelected = gadgetActiveSub === cat.id;
                return (<div key={cat.id} onMouseEnter={() => setGadgetActiveSub(cat.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition text-left cursor-pointer ${isSelected
                        ? 'bg-[#e6f9f6] text-[#13b59b]'
                        : 'text-gray-900 hover:bg-gray-50'}`}>
                              <Link href={cat.href} className="flex-1">
                                {cat.label}
                              </Link>
                              {cat.hasArrow && (<ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#13b59b]' : 'text-gray-400'}`}/>)}
                            </div>);
            })}
                      </div>

                      {/* Right Brands & Models */}
                      <div className="flex-1 p-5 bg-white min-h-95">
                        {gadgetActiveSub === 'phone' ? (<div className="grid grid-cols-2 gap-6">
                            <div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                                Top Brands
                              </div>
                              <div className="space-y-1 text-xs font-medium text-gray-700">
                                <Link href="/sell-old-mobile-phone/sell-apple" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple</Link>
                                <Link href="/sell-old-mobile-phone/sell-xiaomi" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Xiaomi</Link>
                                <Link href="/sell-old-mobile-phone/sell-samsung" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Samsung</Link>
                                <Link href="/sell-old-mobile-phone/sell-oneplus" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Oneplus</Link>
                                <Link href="/sell-old-mobile-phone/sell-nokia" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Nokia</Link>
                                <Link href="/sell-old-mobile-phone/sell-poco" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Poco</Link>
                                <Link href="/sell-old-mobile-phone?brand=1" className="block px-2 py-1 text-xs font-bold text-[#13b59b] hover:underline pt-1">More Phone Brands →</Link>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                                Top Selling Phones
                              </div>
                              <div className="space-y-1 text-xs font-medium text-gray-700">
                                <Link href="/sell-old-mobile-phone/used-apple-iphone-12" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple iPhone 12</Link>
                                <Link href="/sell-old-mobile-phone/used-apple-iphone-11" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple iPhone 11</Link>
                                <Link href="/sell-old-mobile-phone/used-samsung-galaxy-note-20-8-gb-256-gb" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Samsung Galaxy Note 20</Link>
                                <Link href="/sell-old-mobile-phone/used-oneplus-9-pro-5g" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">One Plus 9 Pro</Link>
                                <Link href="/sell-old-mobile-phone/used-redmi-note-4" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Xiaomi Redmi Note 4</Link>
                                <Link href="/sell-old-mobile-phone/used-iphone-6" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple iPhone 6</Link>
                              </div>
                            </div>
                          </div>) : gadgetActiveSub === 'laptop' ? (<div className="grid grid-cols-2 gap-6">
                            <div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                                Top Laptop Brands
                              </div>
                              <div className="space-y-1 text-xs font-medium text-gray-700">
                                <Link href="/sell-old-laptop/sell-apple" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Apple</Link>
                                <Link href="/sell-old-laptop/sell-hp-compaq" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">HP</Link>
                                <Link href="/sell-old-laptop/sell-samsung" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Samsung</Link>
                                <Link href="/sell-old-laptop/sell-lenovo" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Lenovo</Link>
                                <Link href="/sell-old-laptop/sell-dell" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Dell</Link>
                                <Link href="/sell-old-laptop/sell-honor" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Honor</Link>
                                <Link href="/sell-old-laptop?brand=1" className="block px-2 py-1 text-xs font-bold text-[#13b59b] hover:underline pt-1">More Laptop Brands →</Link>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                                Top Selling Models
                              </div>
                              <div className="space-y-1 text-xs font-medium text-gray-700">
                                <Link href="/sell-old-laptop/used-pavilion-series" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Pavilion Series</Link>
                                <Link href="/sell-old-laptop/used-vostro-series" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Vostro Series</Link>
                                <Link href="/sell-old-laptop/used-inspiron-series" className="block px-2 py-1 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">Inspiron Series</Link>
                              </div>
                            </div>
                          </div>) : gadgetActiveSub === 'smartwatch' ? (<div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                              Sell Old Smartwatch
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
                              <Link href="/sell-old-smart-watch/sell-apple" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Apple</Link>
                              <Link href="/sell-old-smart-watch/sell-xiaomi" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Xiaomi</Link>
                              <Link href="/sell-old-smart-watch/sell-samsung" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Samsung</Link>
                              <Link href="/sell-old-smart-watch/sell-oneplus" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">OnePlus</Link>
                            </div>
                            <div className="mt-4">
                              <Link href="/sell-old-smart-watch" className="text-xs font-bold text-[#13b59b] hover:underline">More Smartwatch Brands →</Link>
                            </div>
                          </div>) : gadgetActiveSub === 'tablet' ? (<div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                              Sell Old Tablet
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-700">
                              <Link href="/sell-old-tablet/sell-apple" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Apple</Link>
                              <Link href="/sell-old-tablet/sell-lenovo" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Lenovo</Link>
                              <Link href="/sell-old-tablet/sell-samsung" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Samsung</Link>
                              <Link href="/sell-old-tablet/sell-honor" className="p-2.5 rounded-lg border border-gray-100 hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Honor</Link>
                            </div>
                            <div className="mt-4">
                              <Link href="/sell-old-tablet" className="text-xs font-bold text-[#13b59b] hover:underline">More Tablet Brands →</Link>
                            </div>
                          </div>) : (<div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                              Sell Your {gadgetActiveSub === 'ac' ? 'Air Conditioner' : gadgetActiveSub.toUpperCase()}
                            </div>
                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                              Get best price quote, free doorstep inspection, and instant cash payment on Sellbar.
                            </p>
                            <Link href={gadgetActiveSub === 'speaker'
                    ? '/sell-old-smart-speaker'
                    : gadgetActiveSub === 'tv'
                        ? '/sell-old-television'
                        : gadgetActiveSub === 'dslr'
                            ? '/sell-old-dslr-camera'
                            : gadgetActiveSub === 'earbuds'
                                ? '/sell-old-earbuds'
                                : gadgetActiveSub === 'imac'
                                    ? '/sell-old-imac'
                                    : gadgetActiveSub === 'gaming'
                                        ? '/sell-old-gaming-consoles'
                                        : '/sell-old-air-conditioner'} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#13b59b] text-white rounded-xl text-xs font-bold hover:bg-[#0fa088] transition">
                              Get Valuation Now <ArrowRight className="w-3.5 h-3.5"/>
                            </Link>
                          </div>)}
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* ITEM 4: Buy Refurbished Devices ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('buy-refurbished')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'buy-refurbished' ? null : 'buy-refurbished');
        }} className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${activeDropdown === 'buy-refurbished'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>Buy Refurbished Devices</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'buy-refurbished' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown for Buy Refurbished Devices matching Image 4 */}
                {activeDropdown === 'buy-refurbished' && (<div className="absolute left-0 top-full pt-2 z-50 w-64">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 text-xs font-medium text-gray-700 space-y-1">
                      <Link href="/buy-refurbished-mobile-phones" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Refurbished Phones</Link>
                      <Link href="/buy-refurbished-laptops" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Refurbished Laptops</Link>
                      <Link href="/buy-refurbished-smart-watches" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Refurbished Smart Watches</Link>
                      <Link href="/buy-refurbished-tablets" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Refurbished Tablets</Link>
                      <Link href="/buy-refurbished-gaming-consoles" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Refurbished Gaming Consoles</Link>
                      <Link href="/buy-refurbished-dslr-cameras" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Refurbished Cameras</Link>
                      <Link href="/buy-openbox-audio-devices" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Audio Devices</Link>
                      <Link href="/buy-refurbished-amazon-devices" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Amazon Devices</Link>

                      <div className="pt-2 mt-2 border-t border-gray-100 font-bold text-gray-900 px-2.5">
                        Top Brands
                      </div>
                      <Link href="/buy-refurbished-mobile-phones?brand=apple" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Apple</Link>
                      <Link href="/buy-refurbished-mobile-phones?brand=xiaomi" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Xiaomi</Link>
                      <Link href="/buy-refurbished-mobile-phones?brand=samsung" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Samsung</Link>
                      <Link href="/buy-refurbished-mobile-phones?brand=oneplus" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Oneplus</Link>
                      <Link href="/buy-refurbished-mobile-phones?brand=google" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Google</Link>
                      <Link href="/buy-refurbished-mobile-phones?brand=oppo" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Oppo</Link>
                      <Link href="/buy-refurbished-mobile-phones?brand=vivo" className="block px-2.5 py-1.5 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">Vivo</Link>
                      <Link href="/buy-refurbished" className="block px-2.5 py-1.5 rounded-lg text-[#13b59b] font-bold hover:underline">All Brands</Link>
                    </div>
                  </div>)}
              </div>

              {/* ITEM 5: Find New Gadget ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('find-new')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'find-new' ? null : 'find-new');
        }} className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${activeDropdown === 'find-new'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>Find New Gadget</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'find-new' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown for Find New Gadget matching Image 5 */}
                {activeDropdown === 'find-new' && (<div className="absolute left-0 top-full pt-2 z-50 w-64">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 text-xs font-semibold text-gray-800 space-y-1">
                      <Link href="/find-new-phone" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <span>Find New Phone</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
                      </Link>
                      <Link href="/find-new-laptop" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <span>Find New Laptop</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
                      </Link>
                      <Link href="/find-new-smartwatch" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <span>Find New Smartwatch</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
                      </Link>
                      <Link href="/find-new-tablet" className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <span>Find New Tablet</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
                      </Link>

                      <div className="pt-2 mt-2 border-t border-gray-100 font-bold text-gray-900 px-3 text-xs">
                        Explore
                      </div>
                      <Link href="/category/videos" className="block px-3 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        Videos
                      </Link>
                      <Link href="/news" className="block px-3 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        News
                      </Link>
                      <Link href="/smartphone-reviews" className="block px-3 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        Reviews
                      </Link>
                      <Link href="/articles" className="block px-3 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        Articles
                      </Link>
                      <Link href="/questions" className="block px-3 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        QnA
                      </Link>
                      <Link href="/tips-and-tricks" className="block px-3 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        Tips and Tricks
                      </Link>
                      <Link href="/tech-news" className="block px-3 py-1.5 rounded-lg text-gray-600 font-medium hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        Tech News
                      </Link>
                    </div>
                  </div>)}
              </div>

              {/* ITEM 6: Buy Laptop ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('buy-laptop')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'buy-laptop' ? null : 'buy-laptop');
        }} className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${activeDropdown === 'buy-laptop'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>Buy Laptop</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'buy-laptop' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown for Buy Laptop: Top Brands + Best Selling Models */}
                {activeDropdown === 'buy-laptop' && (<div className="absolute left-0 top-full pt-2 z-50 w-135">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-5 grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                          Top Brands
                        </div>
                        <div className="space-y-1 text-xs font-medium text-gray-700">
                          {['Apple MacBook', 'Dell Laptops', 'Lenovo ThinkPad', 'HP Laptops', 'Acer Laptops', 'Asus ZenBook'].map((b, i) => (<Link key={i} href="/buy-refurbished" className="block px-2.5 py-1.5 rounded-md hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                                {b}
                              </Link>))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                          Best Selling Certified Models
                        </div>
                        <div className="space-y-1 text-xs font-medium text-gray-700">
                          {[
                'Apple MacBook Air Mid 2017 Refurbished',
                'Apple MacBook Air Early 2015 Refurbished',
                'Apple MacBook Air 2020 M1 Refurbished',
                'Lenovo ThinkPad T490 16GB',
                'Dell Latitude 7490 Core i7',
            ].map((model, i) => (<Link key={i} href="/buy-refurbished" className="block px-2.5 py-1.5 rounded-md hover:bg-[#f0faf8] hover:text-[#13b59b] transition leading-snug">
                              {model}
                            </Link>))}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* ITEM 7: Sellbar Store ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('store')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'store' ? null : 'store');
        }} className={`flex items-center gap-1 font-semibold transition pb-1 border-b-2 cursor-pointer ${activeDropdown === 'store'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>Sellbar Store</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'store' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown for Sellbar Store */}
                {activeDropdown === 'store' && (<div className="absolute left-0 top-full pt-2 z-50 w-110">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-4">
                      <div className="p-2 border-b border-gray-100 font-bold text-gray-900 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <Store className="w-4 h-4 text-[#13b59b]"/>
                          <span>Find Stores by City</span>
                        </div>
                        <span className="text-[11px] text-gray-400">200+ pan-India</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 pt-3 text-xs font-medium text-gray-700">
                        {[
                'Delhi',
                'Gurgaon',
                'Noida',
                'Bengaluru',
                'Chennai',
                'Pune',
                'Agra',
                'Patna',
                'Ghaziabad',
                'Meerut',
                'Mohali',
                'Thane',
            ].map((city, idx) => (<Link key={idx} href="/about-us" className="px-2.5 py-1.5 hover:bg-[#f0faf8] hover:text-[#13b59b] rounded-md transition">
                            {city}
                          </Link>))}
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-gray-100">
                        <Link href="/about-us" className="text-xs font-bold text-[#13b59b] hover:underline flex items-center justify-between">
                          <span>Explore All 200+ Experience Stores</span>
                          <ArrowRight className="w-3 h-3"/>
                        </Link>
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* ITEM 8: More ∨ */}
              <div className="relative" onMouseEnter={() => handleDropdownEnter('more')} onMouseLeave={handleDropdownLeave}>
                <button type="button" onClick={(e) => {
            e.preventDefault();
            setActiveDropdown(activeDropdown === 'more' ? null : 'more');
        }} className={`flex items-center gap-1 font-semibold transition cursor-pointer pb-1 border-b-2 ${activeDropdown === 'more'
            ? 'text-[#13b59b] border-[#13b59b]'
            : 'text-gray-800 hover:text-[#13b59b] border-transparent'}`}>
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180 text-[#13b59b]' : 'text-gray-500'}`}/>
                </button>

                {/* Dropdown for More matching Cashify exact list */}
                {activeDropdown === 'more' && (<div className="absolute right-0 top-full pt-2 z-50 w-64">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-2.5 text-xs font-medium text-gray-700 space-y-0.5">
                      <Link href="/offers" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <Tag className="w-3.5 h-3.5 text-[#13b59b]"/>
                        <span>New Offers</span>
                      </Link>
                      <Link href="/partner-with-us" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500"/>
                        <span>Partner with Us</span>
                      </Link>
                      <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <MapPin className="w-3.5 h-3.5 text-rose-500"/>
                        <span>Contact Us</span>
                      </Link>
                      <Link href="/warranty-policy" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500"/>
                        <span>Warranty Policy</span>
                      </Link>
                      <Link href="/about-us" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <Building2 className="w-3.5 h-3.5 text-indigo-500"/>
                        <span>About Us</span>
                      </Link>
                      <Link href="/career" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <UserIcon className="w-3.5 h-3.5 text-blue-500"/>
                        <span>Careers</span>
                      </Link>
                      <Link href="/articles" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <Compass className="w-3.5 h-3.5 text-cyan-500"/>
                        <span>Articles &amp; TechByte</span>
                      </Link>
                      <Link href="/corporate-information" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <Building2 className="w-3.5 h-3.5 text-gray-500"/>
                        <span>Corporate Information</span>
                      </Link>
                      <Link href="/supersale" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <Sparkles className="w-3.5 h-3.5 text-[#13b59b]"/>
                        <span>Become Supersale Partner</span>
                      </Link>
                      <Link href="/press-releases" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <RotateCcw className="w-3.5 h-3.5 text-purple-500"/>
                        <span>Press Releases</span>
                      </Link>
                      <Link href="/terms-conditions" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f0faf8] hover:text-[#13b59b] transition">
                        <ShieldCheck className="w-3.5 h-3.5 text-gray-400"/>
                        <span>Terms &amp; Conditions</span>
                      </Link>
                    </div>
                  </div>)}
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
        {/* MOBILE NAVIGATION DRAWER (Slide-down Menu on Mobile)       */}
        {/* ========================================================= */}
        {mobileMenuOpen && (<div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <button onClick={() => {
                setLocationModalOpen(true);
                setMobileMenuOpen(false);
            }} className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <MapPin className="w-4 h-4 text-[#13b59b]"/>
                <span>Location: {selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400"/>
              </button>

              <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                <ShoppingCart className="w-4 h-4 text-[#13b59b]"/>
                <span>Cart ({cartCount})</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link href="/sell-old-mobile-phone" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-800 hover:text-[#13b59b]">
                <Smartphone className="w-4 h-4 text-[#13b59b]"/>
                <span>Sell Phone</span>
              </Link>
              <Link href="/sell-old-laptop" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-800 hover:text-[#13b59b]">
                <Laptop className="w-4 h-4 text-cyan-600"/>
                <span>Sell Laptop</span>
              </Link>
              <Link href="/buy-refurbished" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-800 hover:text-[#13b59b]">
                <Sparkles className="w-4 h-4 text-amber-500"/>
                <span>Buy Refurbished</span>
              </Link>
              <Link href="/repair" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-800 hover:text-[#13b59b]">
                <Wrench className="w-4 h-4 text-emerald-600"/>
                <span>Repair Phone</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              {currentUser ? (<div className="flex items-center justify-between w-full">
                  <span className="text-sm font-semibold text-gray-800">
                    Logged in as {currentUser.name}
                  </span>
                  <button onClick={handleLogout} className="text-xs text-rose-600 font-semibold hover:underline">
                    Logout
                  </button>
                </div>) : (<button type="button" onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                }} className="w-full text-center bg-[#2bbb9e] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer">
                  Login / Sign Up
                </button>)}
            </div>
          </div>)}
      </header>

      {/* ========================================================= */}
      {/* 3. LOCATION PICKER MODAL (Choose City or Enter Pincode)   */}
      {/* ========================================================= */}
      {locationModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#13b59b]/15 text-[#13b59b] flex items-center justify-center">
                  <MapPin className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Select Your Location</h3>
                  <p className="text-xs text-gray-500">To check instant doorstep pickup &amp; delivery</p>
                </div>
              </div>
              <button type="button" onClick={() => setLocationModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-md">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Pincode Search Input */}
            <form onSubmit={handlePincodeSubmit} className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Enter 6-digit Pincode
              </label>
              <div className="flex gap-2">
                <input type="text" maxLength={6} value={pincodeInput} onChange={(e) => {
                setPincodeInput(e.target.value.replace(/\D/g, ''));
                setPincodeError('');
            }} placeholder="e.g. 122001, 110001, 560001" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#13b59b] focus:bg-white" autoFocus/>
                <button type="submit" className="px-4 py-2 bg-[#2bbb9e] hover:bg-[#23a58c] text-white text-xs font-bold rounded-lg transition">
                  Apply
                </button>
              </div>
              {pincodeError && (<p className="text-xs text-rose-600 mt-1">{pincodeError}</p>)}
            </form>

            {/* Popular Cities Grid */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                Popular Cities
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {POPULAR_CITIES.map((city, idx) => {
                const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                return (<button key={idx} type="button" onClick={() => handleSelectCity(city.name, city.pincode)} className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-semibold text-left transition cursor-pointer ${isSelected
                        ? 'border-[#13b59b] bg-[#13b59b]/5 text-[#13b59b]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-800 hover:bg-gray-50'}`}>
                      <span>{city.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#13b59b]"/>}
                    </button>);
            })}
              </div>
            </div>

            {/* Active Pincode indicator */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>
                Currently selected: <strong className="text-gray-900">{selectedCity} ({selectedPincode})</strong>
              </span>
              <button type="button" onClick={() => setLocationModalOpen(false)} className="text-[#13b59b] font-semibold hover:underline">
                Confirm
              </button>
            </div>
          </div>
        </div>)}

      {/* ========================================================= */}
      {/* 4. CASHIFY CLONE LOGIN / SIGNUP MODAL                     */}
      {/* ========================================================= */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} onSuccess={(user) => {
            setCurrentUser(user);
            syncState();
        }}/>
    </>);
}
