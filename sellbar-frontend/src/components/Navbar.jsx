'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, MapPin, ChevronDown, ChevronRight, ShoppingCart, Menu, X,
  Smartphone, Laptop, Wrench, ShieldCheck, RotateCcw, Sparkles,
  User as UserIcon, LogOut, Building2, CheckCircle2, Tag, Compass,
} from 'lucide-react';
import { getCart } from '@/lib/cart';
import { SESSION_KEY } from '@/lib/auth';
import { lookupPincode } from '@/lib/pincodes';
import './Navbar.css';

/* ------------------------------ DATA ------------------------------ */

const q = (s) => `/search?q=${encodeURIComponent(s)}`;

const POPULAR_CITIES = [
  { name: 'Gurgaon', pincode: '122001' },
  { name: 'Delhi NCR', pincode: '110001' },
  { name: 'Noida', pincode: '201301' },
  { name: 'Bengaluru', pincode: '560001' },
  { name: 'Mumbai', pincode: '400001' },
  { name: 'Pune', pincode: '411001' },
  { name: 'Hyderabad', pincode: '500001' },
  { name: 'Chennai', pincode: '600001' },
  { name: 'Kolkata', pincode: '700001' },
  { name: 'Ahmedabad', pincode: '380001' },
];

const TRENDING_SEARCHES = [
  'iPhone 15 Pro', 'iPhone 14', 'iPhone 13', 'Samsung Galaxy S24',
  'MacBook Air M2', 'OnePlus 12R', 'Refurbished iPhone', 'Sell iPhone 12',
];

// NOTE: sample data. Live karne se pehle asli brands/models daalein.
// direct: true = right panel nahi hota (arrow nahi dikhta)
const SELL_CATS = [
  { key: 'phone', label: 'Phone', href: '/sell', more: 'More Phone Brands',
    brands: ['Apple', 'Xiaomi', 'Samsung', 'Oneplus', 'Nokia', 'Poco'],
    models: ['Apple iPhone 12', 'Apple iPhone 11', 'Samsung Galaxy Note 20', 'One Plus 9 Pro', 'Xiaomi Redmi Note 4', 'Apple iPhone 6'] },
  { key: 'laptop', label: 'Laptop', href: '/sell/laptops', more: 'More Laptop Brands',
    brands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer'],
    models: ['MacBook Air M1', 'MacBook Pro 2019', 'Dell XPS 13', 'HP Pavilion 15', 'Lenovo ThinkPad T480', 'Asus ZenBook 14'] },
  { key: 'speaker', label: 'Smart Speaker', href: '/sell', more: 'More Speaker Brands',
    brands: ['Amazon Echo', 'Google Nest', 'Apple HomePod', 'JBL', 'Sonos'],
    models: ['Echo Dot 3rd Gen', 'Google Nest Mini', 'HomePod Mini', 'JBL Link Portable'] },
  { key: 'tablet', label: 'Tablet', href: '/sell/tablets', more: 'More Tablet Brands',
    brands: ['Apple', 'Samsung', 'Lenovo', 'Xiaomi', 'Realme'],
    models: ['Apple iPad 9th Gen', 'iPad Air 4', 'Samsung Galaxy Tab S6 Lite', 'Lenovo Tab M10'] },
  { key: 'console', label: 'Gaming Consoles', href: '/sell', more: 'More Console Brands',
    brands: ['Sony PlayStation', 'Microsoft Xbox', 'Nintendo'],
    models: ['PlayStation 4 Slim', 'PlayStation 5', 'Xbox One S', 'Nintendo Switch'] },
  { key: 'imac', label: 'iMac', href: '/sell', more: '', brands: [], models: [], direct: true },
  { key: 'watch', label: 'Smartwatch', href: '/sell', more: 'More Watch Brands',
    brands: ['Apple', 'Samsung', 'Noise', 'boAt', 'Fitbit'],
    models: ['Apple Watch Series 6', 'Apple Watch SE', 'Galaxy Watch 4', 'Fitbit Versa 3'] },
  { key: 'tv', label: 'TV', href: '/sell', more: 'More TV Brands',
    brands: ['Samsung', 'LG', 'Sony', 'Mi', 'OnePlus'],
    models: ['Mi TV 4A 43"', 'Samsung 43" Smart TV', 'LG 43" 4K', 'Sony Bravia 43"'] },
  { key: 'earbuds', label: 'Earbuds', href: '/sell', more: 'More Earbud Brands',
    brands: ['Apple', 'Samsung', 'OnePlus', 'boAt', 'Realme'],
    models: ['AirPods Pro', 'AirPods 2nd Gen', 'Galaxy Buds Pro', 'OnePlus Buds Z2'] },
  { key: 'dslr', label: 'DSLR Camera', href: '/sell', more: 'More Camera Brands',
    brands: ['Canon', 'Nikon', 'Sony', 'Fujifilm'],
    models: ['Canon EOS 1500D', 'Canon EOS 200D', 'Nikon D3500', 'Sony Alpha A6000'] },
  { key: 'ac', label: 'AC', href: '/sell', more: 'More AC Brands',
    brands: ['Voltas', 'LG', 'Daikin', 'Blue Star', 'Hitachi'],
    models: ['Voltas 1.5 Ton 3 Star', 'LG 1.5 Ton Dual Inverter', 'Daikin 1.5 Ton 5 Star'] },
];

const ALL_LEFT = [
  { key: 'phone', label: 'Phone', sub: true },
  { key: 'laptop', label: 'Laptop', sub: true },
  { key: 'watch', label: 'Smartwatch', sub: true },
  { key: 'tablet', label: 'Tablet', sub: true },
  { key: 'more', label: 'More', sub: true },
  { key: 'repair', label: 'Repair' },
  { key: 'gadgets', label: 'Sell Gadgets' },
  { key: 'buy', label: 'Buy Gadgets' },
  { key: 'recycle', label: 'Recycle' },
  { key: 'newphone', label: 'Find New Phone' },
  { key: 'store', label: 'Sellbar Store' },
];

const ALL_LINKS = {
  more: {
    title: 'More Devices to Sell',
    links: SELL_CATS
      .filter((c) => ['speaker', 'console', 'imac', 'tv', 'earbuds', 'dslr', 'ac'].includes(c.key))
      .map((c) => [`Sell ${c.label}`, c.href]),
  },
  repair: { title: 'Repair Services', links: [['Screen Replacement', '/repair'], ['Battery Replacement', '/repair'], ['Charging Port Fix', '/repair'], ['Book Doorstep Repair', '/repair']] },
  gadgets: { title: 'Sell Gadgets', links: [['Sell Laptop', '/sell/laptops'], ['Sell Tablet', '/sell/tablets'], ['Sell Smartwatch', '/sell'], ['Sell Earbuds', '/sell']] },
  buy: { title: 'Buy Gadgets', links: [['Refurbished Phones', '/buy-refurbished?category=phones'], ['Refurbished Laptops', '/buy-refurbished?category=laptops'], ['All Refurbished Gadgets', '/buy-refurbished-gadgets']] },
  recycle: { title: 'Recycle', links: [['Recycle Old Phone', '/sell'], ['Recycle Old Laptop', '/sell/laptops'], ['Corporate Buyback', '/about']] },
  newphone: { title: 'Find New Phone', links: [['Compare Phones', q('compare phones')], ['Upcoming Phones', q('upcoming phones')], ['Best 5G Phones', q('best 5g phones')]] },
  store: { title: 'Sellbar Store', links: [['Find a Store', '/about'], ['Book In-Store Valuation', '/about']] },
};

const REFURB_LINKS = [
  ['Refurbished Phones', '/buy-refurbished?category=phones'],
  ['Refurbished Laptops', '/buy-refurbished?category=laptops'],
  ['Refurbished Smart Watches', '/buy-refurbished?category=smartwatches'],
  ['Refurbished Tablets', '/buy-refurbished?category=tablets'],
  ['Refurbished Gaming Consoles', q('refurbished gaming console')],
  ['Refurbished Cameras', q('refurbished camera')],
  ['Audio Devices', q('audio devices')],
  ['Amazon Devices', q('amazon devices')],
];
const REFURB_BRANDS = ['Apple', 'Xiaomi', 'Samsung', 'Oneplus', 'Google', 'Oppo', 'Vivo'];

const NEW_GADGET_MAIN = ['Find New Phone', 'Find New Laptop', 'Find New Smartwatch', 'Find New Tablet'];
const NEW_GADGET_EXPLORE = ['Videos', 'News', 'Reviews', 'Articles', 'QnA', 'Tips and Tricks', 'Tech News'];

const LAPTOP_BRANDS = ['Apple MacBook', 'Dell Laptops', 'Lenovo ThinkPad', 'HP Laptops', 'Acer Laptops', 'Asus ZenBook'];
const LAPTOP_MODELS = [
  'Apple MacBook Air Mid 2017 Refurbished',
  'Apple MacBook Air Early 2015 Refurbished',
  'Apple MacBook Air 2020 M1 Refurbished',
  'Lenovo ThinkPad T490 16GB',
  'Dell Latitude 7490 Core i7',
];

const STORE_CITIES = ['Delhi', 'Gurgaon', 'Noida', 'Bengaluru', 'Chennai', 'Pune', 'Agra', 'Patna', 'Ghaziabad', 'Meerut', 'Mohali', 'Thane'];

const MORE_LINKS = [
  { label: 'New Offers', href: '/buy-refurbished', icon: Tag, color: '#13b59b' },
  { label: 'Partner with Us', href: '/contact', icon: Sparkles, color: '#f59e0b' },
  { label: 'Contact Us', href: '/contact', icon: MapPin, color: '#f43f5e' },
  { label: 'Warranty Policy', href: '/faq', icon: ShieldCheck, color: '#059669' },
  { label: 'About Us', href: '/about', icon: Building2, color: '#6366f1' },
  { label: 'Careers', href: '/about', icon: UserIcon, color: '#3b82f6' },
  { label: 'Articles & TechByte', href: q('articles'), icon: Compass, color: '#06b6d4' },
  { label: 'Corporate Information', href: '/about', icon: Building2, color: '#64748b' },
  { label: 'Become a Sellbar Partner', href: '/contact', icon: Sparkles, color: '#13b59b' },
  { label: 'Press Releases', href: '/about', icon: RotateCcw, color: '#a855f7' },
  { label: 'Terms & Conditions', href: '/faq', icon: ShieldCheck, color: '#6b7280' },
];

/* ---------------------------- SMALL PARTS ---------------------------- */

function BrandsAndModels({ cat, bold = false }) {
  const h = bold ? 'sb-heading bold' : 'sb-heading';
  return (
    <div className="sb-cols2">
      <div>
        <div className={h}>Top Brands</div>
        {cat.brands.map((b) => (
          <Link key={b} href={cat.href} className="sb-link">{b}</Link>
        ))}
        {cat.more && (
          <Link href={cat.href} className="sb-more-link">{cat.more} →</Link>
        )}
      </div>
      <div>
        <div className={h}>Top Selling {cat.label}s</div>
        {cat.models.map((m) => (
          <Link key={m} href={q(m)} className="sb-link">{m}</Link>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- COMPONENT ---------------------------- */

export default function Navbar() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const [allActive, setAllActive] = useState('phone');
  const [gadgetActive, setGadgetActive] = useState('phone');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Gurgaon');
  const [selectedPincode, setSelectedPincode] = useState('122001');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeError, setPincodeError] = useState('');

  const readSession = () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return { token: raw };
      }
    } catch {
      return null;
    }
  };

  const syncState = async () => {
    const session = readSession();
    const token = session?.token || null;
    setCurrentUser(session?.user || null);

    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const cart = await getCart(token);
      const items = Array.isArray(cart) ? cart : cart?.items || cart?.cart?.items || [];
      setCartCount(items.reduce((sum, item) => sum + (item.quantity || 1), 0));
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    syncState();
    const handleCartUpdate = () => syncState();
    window.addEventListener('sellbar-cart-updated', handleCartUpdate);
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('sellbar-cart-updated', handleCartUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownEnter = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };
  const closeMenus = () => setActiveDropdown(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(q(searchQuery.trim()));
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
    } else {
      setPincodeError('Please enter a valid 6-digit Indian PIN Code');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setCartCount(0);
    setUserMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  /* ---------- nav item wrapper ---------- */
  const renderNavItem = ({ id, label, href, mega = false, align = 'left', width, children }) => {
    const open = activeDropdown === id;
    const inner = (
      <>
        <span>{label}</span>
        <ChevronDown size={14} />
      </>
    );
    const cls = `sb-trigger ${open ? 'open' : ''}`;
    return (
      <div
        key={id}
        className={`sb-item ${mega ? 'mega' : ''}`}
        onMouseEnter={() => handleDropdownEnter(id)}
        onMouseLeave={handleDropdownLeave}
      >
        {href ? (
          <Link href={href} className={cls} onClick={closeMenus}>{inner}</Link>
        ) : (
          <button type="button" className={cls}>{inner}</button>
        )}
        {open && (
          <div className={`sb-dd ${align === 'right' ? 'right' : ''}`} style={{ width }}>
            <div className="sb-card" onClick={closeMenus}>{children}</div>
          </div>
        )}
      </div>
    );
  };

  const allCat = SELL_CATS.find((c) => c.key === allActive);
  const gadgetCat = SELL_CATS.find((c) => c.key === gadgetActive) || SELL_CATS[0];

  return (
    <>
      <header className="sb-header">
        {/* ============ TOP ROW ============ */}
        <div className="sb-wrap">
          <div className="sb-top">
            <Link href="/" className="sb-logo">
              <div className="sb-logo-mark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="sb-logo-text">SELLBAR</span>
            </Link>

            {/* SEARCH */}
            <div ref={searchContainerRef} className="sb-search">
              <form onSubmit={handleSearchSubmit}>
                <div className="sb-search-box">
                  <div className="sb-search-icon"><Search size={16} /></div>
                  <input
                    type="text"
                    className="sb-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search for mobiles, accessories & More"
                  />
                  {searchQuery && (
                    <button type="button" className="sb-clear" onClick={() => setSearchQuery('')}>Clear</button>
                  )}
                </div>
              </form>

              {searchFocused && (
                <div className="sb-suggest">
                  <div className="sb-suggest-title">Trending Searches</div>
                  <div className="sb-chips">
                    {TRENDING_SEARCHES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="sb-chip"
                        onClick={() => {
                          setSearchQuery(item);
                          router.push(q(item));
                          setSearchFocused(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="sb-suggest-foot">
                    <span>Sell old phone or buy refurbished with warranty</span>
                    <Link href="/buy-refurbished" onClick={() => setSearchFocused(false)}>Explore All</Link>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="sb-actions">
              <button type="button" className="sb-loc" onClick={() => setLocationModalOpen(true)} title="Change location">
                <div className="sb-loc-ring"><div className="sb-loc-dot" /></div>
                <span>{selectedCity}</span>
                <ChevronDown size={14} />
              </button>

              <Link href="/cart" className="sb-cart" aria-label="View Cart">
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="sb-badge">{cartCount}</span>}
              </Link>

              {currentUser ? (
                <div className="sb-user">
                  <button type="button" className="sb-user-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    <div className="sb-avatar">{currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}</div>
                    <span>{currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}</span>
                    <ChevronDown size={12} />
                  </button>
                  {userMenuOpen && (
                    <div className="sb-user-menu">
                      <div className="sb-user-head">
                        <b>{currentUser.name}</b>
                        <span>{currentUser.email || currentUser.phone}</span>
                      </div>
                      <Link href="/account" className="sb-user-item" onClick={() => setUserMenuOpen(false)}>
                        <UserIcon size={16} /> My Account &amp; Orders
                      </Link>
                      {currentUser.role === 'ADMIN' && (
                        <Link href="/admin" className="sb-user-item admin" onClick={() => setUserMenuOpen(false)}>
                          <ShieldCheck size={16} /> Admin Portal
                        </Link>
                      )}
                      <button type="button" className="sb-user-item out" onClick={handleLogout}>
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="sb-login">Login</Link>
              )}

              <button type="button" className="sb-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ============ CATEGORY BAR ============ */}
        <div className="sb-catbar">
          <div className="sb-wrap">
            <nav className="sb-nav">

              {/* 1. ALL */}
              {renderNavItem({
                id: 'all', label: 'All', href: '/sell', mega: true, width: 880,
                children: (
                  <div className="sb-mega-body" style={{ minHeight: 420 }}>
                    <ul className="sb-mega-left">
                      <li><div className="sb-li-static">Sell</div></li>
                      {ALL_LEFT.map((it) => (
                        <li key={it.key}>
                          <button
                            type="button"
                            onMouseEnter={() => setAllActive(it.key)}
                            className={`sb-li gray ${it.sub ? 'sub' : ''} ${allActive === it.key ? 'active' : ''}`}
                          >
                            {it.label}
                            <ChevronRight size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="sb-mega-right">
                      {allCat && !allCat.direct && !ALL_LINKS[allActive] ? (
                        <>
                          <div className="sb-heading">More in Sell</div>
                          <BrandsAndModels cat={allCat} bold />
                        </>
                      ) : (
                        <>
                          <div className="sb-heading">{ALL_LINKS[allActive]?.title}</div>
                          {ALL_LINKS[allActive]?.links.map(([label, href]) => (
                            <Link key={label} href={href} className="sb-link">{label}</Link>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                ),
              })}

              {/* 2. SELL PHONE */}
              {renderNavItem({
                id: 'sell-phone', label: 'Sell Phone', href: '/sell', width: 640,
                children: (
                  <div className="sb-pad"><BrandsAndModels cat={SELL_CATS[0]} bold /></div>
                ),
              })}

              {/* 3. SELL GADGETS */}
              {renderNavItem({
                id: 'sell-gadgets', label: 'Sell Gadgets', href: '/sell', mega: true, width: 860,
                children: (
                  <div className="sb-mega-body">
                    <ul className="sb-mega-left">
                      {SELL_CATS.map((c) => (
                        <li key={c.key}>
                          <Link
                            href={c.href}
                            onMouseEnter={() => setGadgetActive(c.key)}
                            className={`sb-li ${gadgetActive === c.key ? 'active' : ''}`}
                          >
                            {c.label}
                            {!c.direct && <ChevronRight size={16} />}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="sb-mega-right">
                      {!gadgetCat.direct && <BrandsAndModels cat={gadgetCat} />}
                    </div>
                  </div>
                ),
              })}

              {/* 4. BUY REFURBISHED DEVICES */}
              {renderNavItem({
                id: 'buy-refurbished', label: 'Buy Refurbished Devices', href: '/buy-refurbished', width: 288,
                children: (
                  <div className="sb-pad-sm">
                    {REFURB_LINKS.map(([label, href]) => (
                      <Link key={label} href={href} className="sb-link pad">{label}</Link>
                    ))}
                    <div className="sb-divider" />
                    <div className="sb-sub">Top Brands</div>
                    {REFURB_BRANDS.map((b) => (
                      <Link key={b} href={q(`refurbished ${b}`)} className="sb-link pad">{b}</Link>
                    ))}
                    <Link href="/buy-refurbished" className="sb-link pad teal">All Brands</Link>
                  </div>
                ),
              })}

              {/* 5. FIND NEW GADGET */}
              {renderNavItem({
                id: 'find-new', label: 'Find New Gadget', href: '/buy-refurbished', width: 288,
                children: (
                  <div className="sb-pad-sm">
                    {NEW_GADGET_MAIN.map((label) => (
                      <Link key={label} href={q(label)} className="sb-link row strong">
                        {label}
                        <ChevronRight size={16} color="#9ca3af" />
                      </Link>
                    ))}
                    <div className="sb-divider" />
                    <div className="sb-sub">Explore</div>
                    {NEW_GADGET_EXPLORE.map((label) => (
                      <Link key={label} href={q(label)} className="sb-link pad">{label}</Link>
                    ))}
                  </div>
                ),
              })}

              {/* 6. BUY LAPTOP */}
              {renderNavItem({
                id: 'buy-laptop', label: 'Buy Laptop', href: '/buy-refurbished?category=laptops', align: 'right', width: 640,
                children: (
                  <div className="sb-pad sb-cols2">
                    <div>
                      <div className="sb-heading">Top Brands</div>
                      {LAPTOP_BRANDS.map((b) => (
                        <Link key={b} href={q(b)} className="sb-link">{b}</Link>
                      ))}
                    </div>
                    <div>
                      <div className="sb-heading">Best Selling Certified Models</div>
                      {LAPTOP_MODELS.map((m) => (
                        <Link key={m} href={q(m)} className="sb-link">{m}</Link>
                      ))}
                    </div>
                  </div>
                ),
              })}

              {/* 7. SELLBAR STORE */}
              {renderNavItem({
                id: 'store', label: 'Sellbar Store', href: '/about', align: 'right', width: 460,
                children: (
                  <div style={{ padding: 20 }}>
                    <div className="sb-store-head">
                      <Building2 size={16} color="#13b59b" /> Find Stores by City
                    </div>
                    <div className="sb-store-grid">
                      {STORE_CITIES.map((c) => (
                        <Link key={c} href="/about" className="sb-link">{c}</Link>
                      ))}
                    </div>
                    <div className="sb-store-foot">
                      <Link href="/about" className="sb-link teal">Explore All Experience Stores</Link>
                    </div>
                  </div>
                ),
              })}

              {/* 8. MORE */}
              {renderNavItem({
                id: 'more', label: 'More', align: 'right', width: 288,
                children: (
                  <ul className="sb-more-list">
                    {MORE_LINKS.map(({ label, href, icon: Icon, color }) => (
                      <li key={label}>
                        <Link href={href} className="sb-link icon">
                          <Icon size={16} color={color} /> {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ),
              })}
            </nav>

            {/* mobile pill bar */}
            <div className="sb-pills">
              {[
                ['All', '/sell'], ['Sell Phone', '/sell'], ['Sell Gadgets', '/sell/laptops'],
                ['Buy Refurbished', '/buy-refurbished'], ['Buy Laptop', '/buy-refurbished?category=laptops'], ['Repair', '/repair'],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="sb-pill">{label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* ============ MOBILE DRAWER ============ */}
        {mobileMenuOpen && (
          <div className="sb-drawer">
            <div className="sb-drawer-row">
              <button type="button" onClick={() => { setLocationModalOpen(true); setMobileMenuOpen(false); }}>
                <MapPin size={16} color="#13b59b" />
                <span>Location: {selectedCity}</span>
              </button>
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                <ShoppingCart size={16} color="#13b59b" />
                <span>Cart ({cartCount})</span>
              </Link>
            </div>

            <div className="sb-drawer-grid">
              {[
                ['Sell Phone', '/sell', Smartphone, '#13b59b'],
                ['Sell Laptop', '/sell/laptops', Laptop, '#0891b2'],
                ['Buy Refurbished', '/buy-refurbished', Sparkles, '#f59e0b'],
                ['Repair Phone', '/repair', Wrench, '#059669'],
              ].map(([label, href, Icon, color]) => (
                <Link key={label} href={href} onClick={() => setMobileMenuOpen(false)}>
                  <Icon size={16} color={color} /> <span>{label}</span>
                </Link>
              ))}
            </div>

            <div className="sb-drawer-foot">
              {currentUser ? (
                <div className="sb-drawer-user">
                  <span>Logged in as {currentUser.name}</span>
                  <button type="button" onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <Link href="/login" className="sb-login" onClick={() => setMobileMenuOpen(false)}>
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ============ LOCATION MODAL ============ */}
      {locationModalOpen && (
        <div className="sb-overlay">
          <div className="sb-modal">
            <div className="sb-modal-head">
              <div className="sb-modal-title">
                <div className="ic"><MapPin size={16} /></div>
                <div>
                  <h3>Select Your Location</h3>
                  <p>To check instant doorstep pickup &amp; delivery</p>
                </div>
              </div>
              <button type="button" className="sb-x" onClick={() => setLocationModalOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePincodeSubmit}>
              <label className="sb-label">Enter 6-digit Pincode</label>
              <div className="sb-pin-row">
                <input
                  type="text"
                  className="sb-pin-input"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => { setPincodeInput(e.target.value.replace(/\D/g, '')); setPincodeError(''); }}
                  placeholder="e.g. 122001, 110001, 560001"
                  autoFocus
                />
                <button type="submit" className="sb-apply">Apply</button>
              </div>
              {pincodeError && <p className="sb-err">{pincodeError}</p>}
            </form>

            <div style={{ marginTop: 20 }}>
              <div className="sb-heading" style={{ marginBottom: 0 }}>Popular Cities</div>
              <div className="sb-cities">
                {POPULAR_CITIES.map((city) => {
                  const on = selectedCity.toLowerCase() === city.name.toLowerCase();
                  return (
                    <button
                      key={city.name}
                      type="button"
                      className={`sb-city ${on ? 'on' : ''}`}
                      onClick={() => handleSelectCity(city.name, city.pincode)}
                    >
                      <span>{city.name}</span>
                      {on && <CheckCircle2 size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sb-modal-foot">
              <span>Currently selected: <strong style={{ color: '#111827' }}>{selectedCity} ({selectedPincode})</strong></span>
              <button type="button" onClick={() => setLocationModalOpen(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}