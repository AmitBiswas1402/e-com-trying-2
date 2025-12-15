"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur p-8 shadow-2xl space-y-5"
      >
        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">Join us and get started</p>
        </div>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
          onChange={handleChange}
          required
        />

        {/* Role */}
        <select
          name="role"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm bg-white outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer font-medium text-black hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
