'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBar from './navbar/AnnouncementBar';
import MainHeader from './navbar/MainHeader';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileMenuDrawer from './navbar/MobileMenuDrawer';
import LocationModal from './navbar/LocationModal';
import LoginModal from './LoginModal';
import { getLocalCart } from '@/lib/cart';
import { getSession, clearSession } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname() || '/';

  // Do not render storefront navbar within Admin or Vendor enterprise portals
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor')) {
    return null;
  }

  // Active mega menu state ('shop', 'categories', 'brands', 'sell-old-mobile', 'new-arrivals', 'best-deals')
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);

  // Modals & drawers
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // City & Pincode state (West Champaran)
  const [selectedCity, setSelectedCity] = useState('Bettiah');
  const [selectedPincode, setSelectedPincode] = useState('845438');

  // Auth & Badges
  const [currentUser, setCurrentUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Sync state on load and on route change
  useEffect(() => {
    // 1. Sync User
    async function syncAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.success && data.user) {
          setCurrentUser(data.user);
          return;
        }
      } catch {
        // fallback
      }
      const s = getSession();
      if (s?.user) {
        setCurrentUser(s.user);
      } else {
        setCurrentUser(null);
      }
    }
    syncAuth();

    // 2. Sync Location
    try {
      const savedLoc = localStorage.getItem('sellbar-selected-location');
      if (savedLoc) {
        const parsed = JSON.parse(savedLoc);
        if (parsed.city) setSelectedCity(parsed.city);
        if (parsed.pincode) setSelectedPincode(parsed.pincode);
      }
    } catch {
      // ignore
    }

    // 3. Sync Cart Count
    const syncCart = () => {
      const items = getLocalCart();
      const count = items.reduce((acc, it) => acc + (it.quantity || 1), 0);
      setCartCount(count);
    };
    syncCart();

    // 4. Sync Wishlist Count
    const syncWishlist = () => {
      try {
        const raw = localStorage.getItem('sellbar_wishlist');
        const list = raw ? JSON.parse(raw) : [];
        setWishlistCount(Array.isArray(list) ? list.length : 0);
      } catch {
        setWishlistCount(0);
      }
    };
    syncWishlist();

    // Listeners
    window.addEventListener('sellbar-cart-updated', syncCart);
    window.addEventListener('sellbar-wishlist-updated', syncWishlist);
    window.addEventListener('sellbar-auth-changed', syncAuth);

    return () => {
      window.removeEventListener('sellbar-cart-updated', syncCart);
      window.removeEventListener('sellbar-wishlist-updated', syncWishlist);
      window.removeEventListener('sellbar-auth-changed', syncAuth);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileDrawerOpen(false);
  }, [pathname]);

  // Anti-flicker hover handlers
  const handleMenuEnter = (menuId) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleMenuToggle = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuId);
    }
  };

  const handleSelectLocation = (city, pincode) => {
    setSelectedCity(city);
    setSelectedPincode(pincode);
    try {
      localStorage.setItem('sellbar-selected-location', JSON.stringify({ city, pincode }));
      window.dispatchEvent(new CustomEvent('sellbar-location-changed', { detail: { city, pincode } }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-xs font-sans antialiased">
        {/* Level 1: Top Announcement Bar */}
        <AnnouncementBar />

        {/* Level 2: Main Header with Logo, Search, Location & Actions */}
        <MainHeader
          onOpenMobileMenu={() => setMobileDrawerOpen(true)}
          onOpenLocationModal={() => setLocationModalOpen(true)}
          selectedCity={selectedCity}
          currentUser={currentUser}
          onOpenLogin={() => setLoginModalOpen(true)}
          onLogout={handleLogout}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
        />

        {/* Level 3: Main Desktop Navigation Bar & Mega Menus */}
        <DesktopNavigation
          activeMenu={activeMenu}
          onMenuEnter={handleMenuEnter}
          onMenuLeave={handleMenuLeave}
          onMenuToggle={handleMenuToggle}
          onClose={() => setActiveMenu(null)}
        />
      </header>

      {/* Mobile Drawer (Slide in from Left with Body-Lock) */}
      <MobileMenuDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
        selectedCity={selectedCity}
        onOpenLocationModal={() => setLocationModalOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* Location Pincode Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        selectedCity={selectedCity}
        onSelectLocation={handleSelectLocation}
      />

      {/* Login / Auth Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
