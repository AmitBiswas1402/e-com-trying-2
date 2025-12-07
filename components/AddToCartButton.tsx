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
      className="mt-5 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-800 transition font-medium text-lg"
    >
      Add to Cart
    </button>
  );
}

