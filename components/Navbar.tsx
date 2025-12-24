"use client";

import Image from "next/image";
import { ShoppingCart, MapPin, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UserDropdown from "./UserDropdown";

interface DecodedToken {
  name: string;
  email: string;
  role: string;
}

const getFirstNameFromToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.name?.split(" ")[0] || null;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [firstName, setFirstName] = useState<string | null>(() =>
    getFirstNameFromToken()
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateFirstName = () => {
      setFirstName(getFirstNameFromToken());
    };

    window.addEventListener("storage", updateFirstName);
    return () => window.removeEventListener("storage", updateFirstName);
  }, []);

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

        {/* User Section */}
        <div className="flex items-center text-sm">
          {firstName ? (
            <span className="text-gray-300">
              Welcome,{" "}
              <span className="font-semibold text-white">{firstName}</span>
              <UserDropdown />
            </span>
          ) : (
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
