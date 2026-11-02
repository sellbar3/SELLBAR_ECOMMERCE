'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * AppShellWrapper:
 * Conditionally isolates the Storefront (Customer) chrome from the Enterprise Admin & Vendor portals.
 * When browsing /admin or /vendor, Navbar and Footer are completely omitted so that no customer
 * storefront markup flashes or renders during initial page loads or hard reloads.
 */
export default function AppShellWrapper({ children }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith('/admin') || pathname?.startsWith('/vendor');

  if (isPortal) {
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
    </>
  );
}
