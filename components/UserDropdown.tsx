"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name?: string;
  role?: string;
}

export default function UserDropdown() {
  const [firstName, setFirstName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.name?.split(" ")[0] || null;
    } catch {
      return null;
    }
  });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    setOpen(false);
    router.push("/login");
  };

  // Not logged in
  if (!firstName) {
    return (
      <Link
        href="/login"
        className="text-gray-300 hover:text-white transition text-sm"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition"
      >
        Welcome,
        <span className="font-semibold text-white">{firstName}</span>
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
          <Link
            href="/orders"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            My Orders
          </Link>

          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
