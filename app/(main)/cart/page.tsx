"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCartStore();

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-6 bg-gray-100 p-4 rounded-xl shadow-sm"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={70}
              className="rounded-md object-cover"
            />
          ) : (
            <div className="w-20 h-[70px] bg-gray-300 rounded-md flex items-center justify-center text-gray-500 text-xs">
              No Image
            </div>
          )}

          <div className="flex-1">
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-gray-500 text-sm">{item.seller}</p>

            {/* PRICE */}
            <p className="font-bold text-lg mt-1">₹{item.price}</p>

            {/* QUANTITY BUTTONS */}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                -
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* REMOVE BUTTON */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={clearCart}
        className="bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Clear Cart
      </button>
    </div>
  );
}

