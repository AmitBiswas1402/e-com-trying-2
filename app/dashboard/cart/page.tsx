"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    seller: "",
    price: "",
    oldPrice: "",
    rating: "",
    reviews: "",
    category: "",
    image: "",
    features: "",
    deliveryDate: "",
    inStock: "true",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      inStock: form.inStock === "true",
      features: form.features.split(",").map((f) => f.trim()),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Product added successfully");
      router.push("/admin/products");
    } else {
      toast.error(data.error || "Failed to add product");
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="
    w-full max-w-md
    rounded-2xl
    bg-zinc-900/80
    backdrop-blur-xl
    border border-white/10
    p-8
    space-y-4
    shadow-[0_30px_80px_rgba(0,0,0,0.6)]
  "
        >
          <h1 className="text-2xl font-bold text-white">Add New Product</h1>

          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="seller"
            placeholder="Seller Name"
            onChange={handleChange}
            required
          />

          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            onChange={handleChange}
          />

          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            onChange={handleChange}
          />
          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="reviews"
            type="number"
            placeholder="Reviews Count"
            onChange={handleChange}
          />

          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />

          {/* IMAGE DROPDOWN */}
          <select name="image" onChange={handleChange} required>
            <option value="">Select Product Image</option>
            <option value="https://images.unsplash.com/photo-1580894741074-1afc82dbd5a5">
              Headphones
            </option>
            <option value="https://images.unsplash.com/photo-1580906855280-3dc1e59c07c7">
              Fitness Band
            </option>
            <option value="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab">
              T-Shirt
            </option>
          </select>

          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="features"
            placeholder="Features (comma separated)"
            onChange={handleChange}
          />

          <input
            className="
  w-full
  rounded-lg
  bg-zinc-800
  border border-zinc-700
  px-4 py-2.5
  text-sm text-white
  placeholder-zinc-400
  outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  transition
"
            name="deliveryDate"
            placeholder="Delivery Date"
            onChange={handleChange}
          />

          {/* IN STOCK */}
          <select name="inStock" onChange={handleChange}>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
