"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Lock } from "lucide-react";
import { getSession } from "../../lib/auth";
import {
  getLocalCart,
  removeFromLocalCart,
  updateLocalCart,
  getCart,
} from "../../lib/cart";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import LoginModal from "@/components/LoginModal";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Sync cart data
  function refreshCart() {
    const session = getSession();
    setIsLoggedIn(!!session?.token);

    const localItems = getLocalCart();
    setItems(localItems);
    setLoading(false);
  }

  useEffect(() => {
    refreshCart();

    const handleCartUpdate = () => refreshCart();
    window.addEventListener("sellbar-cart-updated", handleCartUpdate);
    window.addEventListener("sellbar-user-logged-in", handleCartUpdate);

    return () => {
      window.removeEventListener("sellbar-cart-updated", handleCartUpdate);
      window.removeEventListener("sellbar-user-logged-in", handleCartUpdate);
    };
  }, []);

  function handleQuantity(id, newQty) {
    if (newQty <= 0) {
      removeFromLocalCart(id);
    } else {
      updateLocalCart(id, newQty);
    }
    refreshCart();
  }

  function handleRemove(id) {
    removeFromLocalCart(id);
    refreshCart();
  }

  function handleProceedToCheckout() {
    const session = getSession();
    if (!session?.token) {
      // User is not logged in -> Open Login Modal Popup!
      setShowLoginModal(true);
      return;
    }
    // User is logged in -> Navigate directly to checkout
    router.push("/checkout");
  }

  const subtotal = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  const shipping = 0; // Free delivery
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <p className="text-sm font-semibold text-gray-500 animate-pulse">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2bbda3] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Shopping Cart</h1>
              <p className="text-xs text-gray-500">
                {items.length} {items.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
          <Link
            href="/buy-refurbished"
            className="text-xs font-semibold text-[#2bbda3] hover:text-[#249e88] transition-colors"
          >
            + Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-lg mx-auto space-y-4 my-8">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your Cart is Empty</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore certified refurbished iPhones, MacBooks, laptops, and tablets tested with 32-point inspection and 12 months warranty.
            </p>
            <Link
              href="/buy-refurbished"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-semibold text-xs transition-colors shadow-md"
            >
              Browse Refurbished Deals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const id = item.id || item.productId;
                return (
                  <div
                    key={id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        {item.image ? (
                          <img
                            src={getCloudinaryUrl(item.image)}
                            alt={item.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <ShoppingBag className="w-8 h-8 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-[#2bbda3] font-bold mt-0.5">
                          ₹{Number(item.price || 0).toLocaleString("en-IN")}
                        </p>
                        <span className="text-[10px] text-gray-400 block mt-0.5">
                          12 Months Warranty Included
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          type="button"
                          onClick={() => handleQuantity(id, (item.quantity || 1) - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-800">
                          {item.quantity || 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantity(id, (item.quantity || 1) + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900 block">
                          ₹{(Number(item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemove(id)}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 mt-1"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-xs flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2bbda3] shrink-0" /> 12M Comprehensive Warranty
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-xs flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                  <Truck className="w-4 h-4 text-[#2bbda3] shrink-0" /> Free Doorstep Delivery
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-xs flex items-center gap-2.5 text-xs text-gray-600 font-medium col-span-2 sm:col-span-1">
                  <Lock className="w-4 h-4 text-[#2bbda3] shrink-0" /> 100% Safe &amp; Verified Payment
                </div>
              </div>
            </div>

            {/* Order Summary & Checkout Action */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
              <h2 className="font-bold text-base text-gray-900 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Cart Items ({items.length})</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping &amp; Delivery</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% Included)</span>
                  <span className="font-semibold text-gray-900">₹{Math.round(subtotal * 0.18).toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-sm font-bold text-gray-900">
                  <span>Total Payable</span>
                  <span className="text-[#2bbda3] text-lg">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-[#2bbda3] hover:bg-[#249e88] text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              {!isLoggedIn && (
                <p className="text-[11px] text-gray-400 text-center">
                  * You will be prompted to login to secure your order and warranty.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Login Popup Modal (Triggered when user is not logged in) */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          router.push("/checkout");
        }}
      />
    </div>
  );
}
