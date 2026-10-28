
import { apiRequest } from "./api";

function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay load nahi hua."));
    document.body.appendChild(script);
  });
}

export async function payWithRazorpay({
  checkoutGroupId,
  token,
  onDismiss,
}) {
  const order = await apiRequest("/payments/create-order", {
    method: "POST",
    token,
    body: { checkoutGroupId },
  });

  await loadRazorpay();

  return new Promise((resolve, reject) => {
    let settled = false;

    const checkout = new window.Razorpay({
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "SELLBAR",
      description: "SELLBAR purchase",

      handler: async (response) => {
        try {
          const result = await apiRequest("/payments/verify", {
            method: "POST",
            token,
            body: {
              checkoutGroupId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
          });

          settled = true;
          resolve(result);
        } catch (error) {
          settled = true;
          reject(error);
        }
      },

      modal: {
        ondismiss: () => {
          if (!settled) {
            settled = true;
            onDismiss?.();
            resolve({ dismissed: true });
          }
        },
      },
    });

    checkout.on("payment.failed", (event) => {
      if (!settled) {
        settled = true;
        reject(
          new Error(
            event.error?.description || "Payment fail hua. Dobara try karein."
          )
        );
      }
    });

    checkout.open();
  });
}
