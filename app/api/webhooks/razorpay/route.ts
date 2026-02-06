import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { writeClient } from "@/sanity/lib/client";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

interface RazorpayPaymentEntity {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  email: string;
  contact: string;
  notes: Record<string, string>;
}

interface RazorpayWebhookPayload {
  event: string;
  payload: {
    payment: {
      entity: RazorpayPaymentEntity;
    };
  };
}

/**
 * Verify Razorpay webhook signature
 */
function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Generate a unique order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

/**
 * POST /api/webhooks/razorpay
 * Handles Razorpay payment webhooks
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      console.error("Missing Razorpay signature");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(body, signature, RAZORPAY_WEBHOOK_SECRET);

    if (!isValid) {
      console.error("Invalid Razorpay webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload: RazorpayWebhookPayload = JSON.parse(body);
    const event = payload.event;

    console.log(`Received Razorpay webhook: ${event}`);

    // Handle payment.captured event
    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const { id: paymentId, order_id: orderId, amount, notes, email } = payment;

      // Extract clerkUserId and product quantities from notes
      const { clerkUserId, email: noteEmail, ...productNotes } = notes;

      // Check if order already exists (idempotency)
      const existingOrder = await writeClient.fetch(
        `*[_type == "order" && razorpayOrderId == $orderId][0]`,
        { orderId }
      );

      if (existingOrder) {
        console.log(`Order already exists for Razorpay order: ${orderId}`);
        return NextResponse.json({ received: true, status: "duplicate" });
      }

      // Build order items and deduct stock
      const orderItems: Array<{
        _key: string;
        product: { _type: "reference"; _ref: string };
        quantity: number;
        priceAtPurchase: number;
      }> = [];

      for (const [productId, quantityStr] of Object.entries(productNotes)) {
        const quantity = parseInt(quantityStr, 10);
        
        // Fetch product to get current price and stock
        const product = await writeClient.fetch(
          `*[_type == "product" && _id == $productId][0]{ _id, price, stock }`,
          { productId }
        );

        if (!product) {
          console.error(`Product not found: ${productId}`);
          continue;
        }

        // Add to order items
        orderItems.push({
          _key: crypto.randomUUID(),
          product: { _type: "reference", _ref: productId },
          quantity,
          priceAtPurchase: product.price,
        });

        // Deduct stock
        const newStock = Math.max(0, (product.stock ?? 0) - quantity);
        await writeClient
          .patch(productId)
          .set({ stock: newStock })
          .commit();

        console.log(`Deducted ${quantity} from product ${productId}, new stock: ${newStock}`);
      }

      // Create order in Sanity
      const orderNumber = generateOrderNumber();
      const totalAmount = amount / 100; // Convert from paise to rupees

      const order = await writeClient.create({
        _type: "order",
        orderNumber,
        items: orderItems,
        total: totalAmount,
        status: "paid",
        clerkUserId,
        email: email || noteEmail,
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        createdAt: new Date().toISOString(),
      });

      console.log(`Created order: ${order._id} (${orderNumber})`);

      return NextResponse.json({
        received: true,
        orderId: order._id,
        orderNumber,
      });
    }

    // Handle payment.failed event
    if (event === "payment.failed") {
      const payment = payload.payload.payment.entity;
      console.log(`Payment failed for order: ${payment.order_id}`);
      // You could log this to a failed_payments collection if needed
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
