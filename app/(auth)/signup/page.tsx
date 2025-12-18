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
      router.push("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden px-4">
      {/* Abstract blocks */}
      <div className="absolute -top-24 -left-24 h-80 w-80 bg-indigo-600 rounded-3xl rotate-12" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 bg-emerald-500 rounded-3xl -rotate-12" />
      <div className="absolute bottom-0 left-1/4 h-64 w-64 bg-orange-500 rounded-3xl rotate-6" />

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white rounded-2xl p-8 shadow-xl space-y-5"
      >
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-zinc-900">
            Create account
          </h1>
          <p className="text-sm text-zinc-500">
            Start building something great
          </p>
        </div>

        {/* Inputs */}
        <input
          name="name"
          placeholder="Full Name"
          className="w-full rounded-md border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          className="w-full rounded-md border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded-md border border-zinc-300 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition"
          onChange={handleChange}
          required
        />

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition active:scale-[0.98]"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer font-medium text-zinc-900 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
