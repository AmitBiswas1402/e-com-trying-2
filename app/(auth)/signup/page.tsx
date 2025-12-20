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
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* BIG BACKGROUND BLOCKS */}
      <div className="absolute -top-24 -left-24 h-80 w-80 bg-indigo-600 rounded-3xl rotate-12" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 bg-emerald-500 rounded-3xl -rotate-12" />
      <div className="absolute top-16 left-1/3 h-40 w-40 bg-orange-500 rounded-2xl rotate-6" />
      <div className="absolute bottom-10 left-10 h-36 w-36 bg-cyan-500 rounded-2xl -rotate-6" />

      {/* FORM */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md rounded-2xl
                     bg-white/10 backdrop-blur-xl
                     border border-white/20
                     p-8 space-y-5
                     shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
        >
          {/* Glass highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-transparent" />

          <div className="relative space-y-1">
            <h1 className="text-3xl font-bold text-white">Create account</h1>
            <p className="text-sm text-white/70">
              Start building something great
            </p>
          </div>

          <input
            name="name"
            placeholder="Full Name"
            className="w-full rounded-md bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/60 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full rounded-md bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/60 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full rounded-md bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2.5 text-sm text-white placeholder-white/60 outline-none"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-md bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2.5 text-sm text-white outline-none"
          >
            <option className="text-zinc-900" value="user">
              User
            </option>
            <option className="text-zinc-900" value="admin">
              Admin
            </option>
          </select>

          <button
            type="submit"
            className="w-full rounded-md 
             bg-white/90 text-zinc-900 
             py-2.5 text-sm font-semibold
             transition-all duration-300 ease-out
             hover:bg-blue-600 hover:text-white
             hover:scale-[1.03]
             active:scale-[0.98] cursor-pointer"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-white/70">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="cursor-pointer font-medium text-white hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>

      <div className="absolute top-[75%] left-1/2 -translate-x-1/2 h-24 w-24 bg-violet-500 rounded-xl rotate-45" />

      <div className="absolute top-[48%] right-[30%] h-36 w-36 bg-pink-500 rounded-2xl rotate-12" />
    </div>
  );
}
