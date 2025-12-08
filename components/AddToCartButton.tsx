"use client";

import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  return (
    <button
      onClick={() => useCartStore.getState().addToCart(product)}
      className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
    >
      Add to Cart
    </button>
  );
}
