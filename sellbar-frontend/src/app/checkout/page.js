
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "../../components/CheckoutForm";
import { getSession } from "../../lib/auth";
import { getCart } from "../../lib/cart";
import { createOrder } from "../../lib/checkout";
import { payWithRazorpay } from "../../lib/payment";

export default function CheckoutPage() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingCheckoutGroupId, setPendingCheckoutGroupId] = useState("");

  const loadCart = useCallback(async (token) => {
    const data = await getCart(token);
    setCart(data);
  }, []);

  useEffect(() => {
    const currentSession = getSession();

    if (!currentSession?.token) {
      setError("Checkout ke liye login karna zaroori hai.");
      setPageLoading(false);
      return;
    }

    setSession(currentSession);

    loadCart(currentSession.token)
      .catch((err) => setError(err.message || "Cart load nahi hua."))
      .finally(() => setPageLoading(false));
  }, [loadCart]);

  async function handleCheckout({ shippingAddress, paymentMethod }) {
    if (!session?.token) {
      setError("Login session nahi mila. Dobara login karein.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let checkoutGroupId = pendingCheckoutGroupId;

      if (!checkoutGroupId) {
        const order = await createOrder({
          shippingAddress,
          paymentMethod,
          token: session.token,
        });

        if (paymentMethod === "cod") {
          alert(
            `Order successfully placed! Total: ₹${Number(
              order.totalAmount || 0
            ).toLocaleString("en-IN")}`
          );

          router.push("/orders");
          return;
        }

        checkoutGroupId = order.checkoutGroupId;

        if (!checkoutGroupId) {
          throw new Error(
            "Order create hua, lekin checkoutGroupId nahi mila. My Orders check karein."
          );
        }

        setPendingCheckoutGroupId(checkoutGroupId);
      }

      const paymentResult = await payWithRazorpay({
        checkoutGroupId,
        token: session.token,
        onDismiss: () => {
          setError(
            "Payment window band hui. Pending order saved hai. Payment retry karne ke liye isi checkout page par rahein."
          );
        },
      });

      if (paymentResult?.dismissed) return;

      setPendingCheckoutGroupId("");
      alert("Payment verified! Aapka order confirm ho gaya.");
      router.push("/orders");
    } catch (err) {
      setError(err.message || "Checkout complete nahi hua.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return <main className="sellbar-page"><p>Loading checkout...</p></main>;
  }

  if (!session) {
    return (
      <main className="sellbar-page">
        <h1>Login Required</h1>
        <p>{error}</p>
        <button
          className="sellbar-place-order"
          onClick={() => router.push("/")}
        >
          Go to Homepage
        </button>
      </main>
    );
  }

  return (
    <main className="sellbar-page sellbar-checkout-page">
      <button
        className="sellbar-back-button"
        onClick={() => router.push("/cart")}
      >
        ← Back to Cart
      </button>

      <h1>Checkout</h1>

      <CheckoutForm
        cartData={cart}
        loading={loading}
        error={error}
        onSubmit={handleCheckout}
      />
    </main>
  );
}
