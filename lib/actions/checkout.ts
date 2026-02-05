"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_BY_IDS_QUERY } from "@/lib/sanity/queries/products";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay keys are not defined");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Types
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutResult {
  success: boolean;
  orderId?: string;
  amount?: number;
  currency?: string;
  error?: string;
}

/**
 * CREATE RAZORPAY ORDER
 * Sanity-based product validation
 */
export async function createCheckoutSession(
  items: CartItem[]
): Promise<CheckoutResult> {
  try {
    // 1. Auth
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return { success: false, error: "Please sign in to checkout" };
    }

    if (!items || items.length === 0) {
      return { success: false, error: "Your cart is empty" };
    }

    // 2. Fetch products from Sanity
    const productIds = items.map((i) => i.productId);
    const products = await client.fetch(PRODUCTS_BY_IDS_QUERY, {
      ids: productIds,
    });

    let totalAmount = 0;
    const notes: Record<string, string> = {};

    for (const item of items) {
      const product = products.find(
        (p: { _id: string }) => p._id === item.productId
      );

      if (!product) {
        return { success: false, error: "Product not available" };
      }

      if ((product.stock ?? 0) < item.quantity) {
        return {
          success: false,
          error: `Only ${product.stock} of ${product.name} available`,
        };
      }

      totalAmount += (product.price ?? 0) * item.quantity;
      notes[item.productId] = String(item.quantity);
    }

    // 3. Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        clerkUserId: userId,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        ...notes,
      },
    });

    return {
      success: true,
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
    };
  } catch (error) {
    console.error("Razorpay order error:", error);
    return { success: false, error: "Payment initialization failed" };
  }
}

/**
 * VERIFY RAZORPAY PAYMENT
 * (CRITICAL SECURITY STEP)
 */
export async function verifyRazorpayPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const body = `${orderId}|${paymentId}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return { success: false, error: "Invalid payment signature" };
    }

    return { success: true };
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return { success: false, error: "Payment verification failed" };
  }
}
