
"use client";

import { useState } from "react";

const initialAddress = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

export default function CheckoutForm({
  cartData,
  loading,
  error,
  onSubmit,
}) {
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const items = cartData?.items || [];
  const subtotal = Number(cartData?.subtotal || 0);

  function changeAddress(event) {
    const { name, value } = event.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit({ shippingAddress: address, paymentMethod });
  }

  return (
    <form className="sellbar-checkout-form" onSubmit={submit}>
      <h2>Delivery Address</h2>

      <div className="sellbar-form-grid">
        <label>
          Full Name
          <input
            name="fullName"
            value={address.fullName}
            onChange={changeAddress}
            autoComplete="name"
            required
          />
        </label>

        <label>
          Mobile Number
          <input
            name="phone"
            type="tel"
            value={address.phone}
            onChange={changeAddress}
            autoComplete="tel"
            pattern="[0-9+\-\s]{10,15}"
            required
          />
        </label>

        <label className="sellbar-full-width">
          Address
          <input
            name="addressLine1"
            value={address.addressLine1}
            onChange={changeAddress}
            autoComplete="address-line1"
            required
          />
        </label>

        <label className="sellbar-full-width">
          Apartment, Landmark (optional)
          <input
            name="addressLine2"
            value={address.addressLine2}
            onChange={changeAddress}
            autoComplete="address-line2"
          />
        </label>

        <label>
          City
          <input
            name="city"
            value={address.city}
            onChange={changeAddress}
            autoComplete="address-level2"
            required
          />
        </label>

        <label>
          State
          <input
            name="state"
            value={address.state}
            onChange={changeAddress}
            autoComplete="address-level1"
            required
          />
        </label>

        <label>
          PIN Code
          <input
            name="postalCode"
            value={address.postalCode}
            onChange={changeAddress}
            autoComplete="postal-code"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            required
          />
        </label>

        <label>
          Country
          <input
            name="country"
            value={address.country}
            onChange={changeAddress}
            autoComplete="country-name"
            required
          />
        </label>
      </div>

      <h2>Payment Method</h2>

      <label className="sellbar-payment-option">
        <input
          type="radio"
          name="paymentMethod"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={(event) => setPaymentMethod(event.target.value)}
        />
        Cash on Delivery (COD)
      </label>

      <label className="sellbar-payment-option">
        <input
          type="radio"
          name="paymentMethod"
          value="online"
          checked={paymentMethod === "online"}
          onChange={(event) => setPaymentMethod(event.target.value)}
        />
        Pay Online with Razorpay
      </label>

      <div className="sellbar-checkout-summary">
        <h3>Order Summary</h3>

        {items.map((item) => (
          <div
            className="sellbar-summary-row"
            key={item.product?.id || item.product?._id}
          >
            <span>
              {item.product?.name || "Product"} × {item.quantity}
            </span>
            <span>
              ₹{Number(item.lineTotal || 0).toLocaleString("en-IN")}
            </span>
          </div>
        ))}

        <div className="sellbar-summary-row sellbar-summary-total">
          <strong>Subtotal</strong>
          <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
        </div>

        <small>Final payable amount is confirmed by the server.</small>
      </div>

      {error && (
        <p className="sellbar-checkout-error" role="alert">
          {error}
        </p>
      )}

      <button
        className="sellbar-place-order"
        type="submit"
        disabled={loading || items.length === 0}
      >
        {loading
          ? "Please wait..."
          : paymentMethod === "cod"
            ? "Place COD Order"
            : "Continue to Payment"}
      </button>
    </form>
  );
}
