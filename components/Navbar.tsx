"use client";

import Image from "next/image";
import { ShoppingCart, MapPin, Search } from "lucide-react";

const Navbar = () => {
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
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-2 bg-red-600 text-xs px-1.5 rounded-full">
            2
          </span>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700 cursor-pointer">
          <Image
            src="/avatar.png"
            alt="User"
            width={36}
            height={36}
          />
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
