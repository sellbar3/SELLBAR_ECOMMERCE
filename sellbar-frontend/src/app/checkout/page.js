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
import { getProductImageUrl } from "@/lib/productImageHelper";

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
        image: getProductImageUrl(item, item.category),
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

            <a
              href={`https://wa.me/917717517777?text=${encodeURIComponent(
                `Hello Sellbar! I want to complete my order without login:\n` +
                cartItems.map((it) => `• ${it.name} (Qty: ${it.quantity}) - ₹${(Number(it.price) * Number(it.quantity)).toLocaleString('en-IN')}`).join('\n') +
                `\n\nPlease confirm availability and payment/delivery details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs rounded-xl shadow flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Instant Order on WhatsApp (+91 77175 17777)</span>
            </a>

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
