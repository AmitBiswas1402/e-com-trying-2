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
      className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 ease-out hover:scale-[1.03]
              active:scale-[0.98] cursor-pointer"
    >
      Add to Cart
    </button>
  );
}
