"use client";

import { useState, useTransition } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartItems } from "@/lib/store/cart-store-provider";
import {
  createCheckoutSession,
  verifyRazorpayPayment,
} from "@/lib/actions/checkout";
import { loadRazorpayScript } from "@/lib/razorpay/loadRazorpay";

interface CheckoutButtonProps {
  disabled?: boolean;
}

export function CheckoutButton({ disabled }: CheckoutButtonProps) {
  const items = useCartItems();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    setError(null);

    startTransition(async () => {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        toast.error("Razorpay failed to load");
        return;
      }

      const result = await createCheckoutSession(items);

      if (!result.success || !result.orderId) {
        setError(result.error ?? "Checkout failed");
        toast.error(result.error ?? "Checkout failed");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        order_id: result.orderId,
        amount: result.amount,
        currency: result.currency,
        name: "Your Store",
        description: "Order payment",
        handler: async function (response: any) {
          const verify = await verifyRazorpayPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
          );

          if (verify.success) {
            toast.success("Payment successful 🎉");
            window.location.href = "/checkout/success";
          } else {
            toast.error("Payment verification failed");
          }
        },
        theme: {
          color: "#000000",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    });
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleCheckout}
        disabled={disabled || isPending || items.length === 0}
        size="lg"
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Pay with Razorpay
          </>
        )}
      </Button>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
