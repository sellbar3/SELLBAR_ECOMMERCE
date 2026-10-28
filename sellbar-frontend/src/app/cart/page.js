
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "../../lib/auth";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../lib/cart";

export default function CartPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCart = useCallback(async (currentToken) => {
    try {
      setError("");
      const data = await getCart(currentToken);
      setCart(data);
    } catch (err) {
      setError(err.message || "Cart load nahi hua.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const session = getSession();

    if (!session?.token) {
      setError("Cart dekhne ke liye pehle login karein.");
      setLoading(false);
      return;
    }

    setToken(session.token);
    loadCart(session.token);
  }, [loadCart]);

  async function changeQuantity(productId, quantity) {
    try {
      setError("");
      await updateCartItem(productId, quantity, token);
      await loadCart(token);
    } catch (err) {
      setError(err.message || "Quantity update nahi hui.");
    }
  }

  async function removeItem(productId) {
    try {
      setError("");
      await removeCartItem(productId, token);
      await loadCart(token);
    } catch (err) {
      setError(err.message || "Product remove nahi hua.");
    }
  }

  if (loading) return <main className="sellbar-page"><p>Loading cart...</p></main>;

  return (
    <main className="sellbar-page">
      <h1>My Shopping Cart</h1>

      {error && <p className="sellbar-checkout-error">{error}</p>}

      {!token && (
        <p>
          <Link href="/">Homepage par jaakar login karein.</Link>
        </p>
      )}

      {cart.items.length === 0 ? (
        <p>
          Cart empty hai. <Link href="/">Shopping continue karein</Link>
        </p>
      ) : (
        <>
          <div className="sellbar-cart-list">
            {cart.items.map((item) => {
              const product = item.product || {};
              const id = product.id || product._id;

              return (
                <article className="sellbar-cart-item" key={id}>
                  <div>
                    <h3>{product.name || "Product"}</h3>
                    <p>
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </p>
                    <p>
                      Line total: ₹
                      {Number(item.lineTotal || 0).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="sellbar-cart-actions">
                    <button
                      type="button"
                      onClick={() => changeQuantity(id, item.quantity - 1)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => changeQuantity(id, item.quantity + 1)}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => removeItem(id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <h2>
            Subtotal: ₹
            {Number(cart.subtotal || 0).toLocaleString("en-IN")}
          </h2>

          <button
            type="button"
            className="sellbar-place-order"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </main>
  );
}
