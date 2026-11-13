'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import DesktopOnlyGuard from './DesktopOnlyGuard';
import MobileBottomNav from './MobileBottomNav';

/**
 * AppShellWrapper:
 * Conditionally isolates the Storefront (Customer) chrome from the Enterprise Admin & Vendor portals.
 * When browsing /admin or /vendor, Navbar and Footer are completely omitted so that no customer
 * storefront markup flashes or renders during initial page loads or hard reloads.
 * Also enforces Desktop Display constraint on mobile browsers.
 */
export default function AppShellWrapper({ children }) {
  const pathname = usePathname() || '';

  const isPortal =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/vendor') ||
    pathname.startsWith('/panel-login');

  const isAccountPortal = pathname.startsWith('/account');

  // Enterprise Portals (Admin & Vendor) - Enforce desktop constraint
  if (isPortal) {
    const portalTitle = pathname.startsWith('/vendor') ? 'Vendor Dashboard' : 'Admin Dashboard';
    return (
      <DesktopOnlyGuard portalTitle={portalTitle}>
        <main className="flex-1 flex flex-col min-h-screen w-full" suppressHydrationWarning>
          {children}
        </main>
      </DesktopOnlyGuard>
    );
  }

  // Customer Account Portal - Standalone sidebar dashboard (No public Navbar/Footer/MobileBottomNav)
  if (isAccountPortal) {
    return (
      <main className="flex-1 flex flex-col min-h-screen w-full" suppressHydrationWarning>
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col" suppressHydrationWarning>
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
