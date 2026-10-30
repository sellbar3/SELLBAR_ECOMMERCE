"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, LogIn } from "lucide-react";
import { Checkout } from "@/components/ui/checkout-block";
import { getSession } from "@/lib/auth";
import { getLocalCart } from "@/lib/cart";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function verifyAuth() {
      // 1. Check local session
      const session = getSession();
      if (session?.token) {
        setIsAuthenticated(true);
        setCheckingAuth(false);
        return;
      }

      // 2. Check /api/auth/me
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Auto-trigger login modal if directly accessed without login
          setShowLoginModal(true);
        }
      } catch {
        setIsAuthenticated(false);
        setShowLoginModal(true);
      } finally {
        setCheckingAuth(false);
      }
    }

    verifyAuth();

    // Map local cart items to Checkout format
    const local = getLocalCart();
    if (local && local.length > 0) {
      const formatted = local.map((item) => ({
        id: item.id || item.productId,
        name: item.name || "Refurbished Tech",
        price: Number(item.price) || 0,
        originalPrice: Math.round((Number(item.price) || 0) * 1.5),
        image:
          item.image ||
          "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80",
        quantity: item.quantity || 1,
      }));
      setCartItems(formatted);
    }
  }, []);

  function handleLoginSuccess() {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <p className="text-sm font-semibold text-gray-500 animate-pulse">
          Verifying secure checkout session...
        </p>
      </div>
    );
  }

  // Without login, checkout page will NOT open
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-md text-center max-w-md w-full space-y-6 animate-fade-in">
          <div className="w-16 h-16 bg-teal-50 text-[#2bbda3] rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-gray-900">
              Login Required for Checkout
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              To activate your 12-month Sellbar warranty, track live delivery, and protect your payment, please login to your Sellbar account.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => setShowLoginModal(true)}
              className="w-full py-3.5 bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Login with Mobile / OTP
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/cart")}
              className="w-full text-xs text-gray-600"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Cart
            </Button>
          </div>
        </div>

        {/* Login Modal Popup */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // User is authenticated -> Render full shadcn/ui Checkout block
  return (
    <div className="min-h-screen bg-[#f8fafc] py-6">
      <Checkout initialItems={cartItems.length > 0 ? cartItems : undefined} />
    </div>
  );
}
