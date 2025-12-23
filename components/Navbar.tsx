"use client";

import Image from "next/image";
import { ShoppingCart, MapPin, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

const Navbar = () => {
  const cart = useCartStore((state) => state.cart); // dynamic subscription

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-black text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Logo + Location */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          <span className="text-xl font-bold">ShopX</span>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-300 cursor-pointer hover:text-white">
          <MapPin size={16} />
          <span>Deliver to Kolkata</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-4xl mx-6 hidden md:flex">
        <div className="w-full flex items-center bg-gray-900 rounded-xl px-3 py-2 border border-gray-700">
          <Search size={22} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none text-sm px-2 w-full"
          />
        </div>
      </div>

      {/* Right: Cart + Avatar */}
      <div className="flex items-center gap-6">
        {/* Cart */}
        <div className="relative cursor-pointer">
          <Link href="/cart" className="relative">
            <ShoppingCart size={26} />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Avatar */}
        <div className="flex mt-2">
          Welcome,
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700 cursor-pointer">
          <Link href="/login" className="hover:opacity-80 transition">
            <Image
              src="/avatar.png"
              alt="User"
              width={36}
              height={36}
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
