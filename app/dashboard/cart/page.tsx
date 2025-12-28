"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

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
    image: null as File | null,
    features: "",
    deliveryDate: "",
    inStock: "true",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: null }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      name: form.name,
      seller: form.seller,
      category: form.category,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      inStock: form.inStock === "true",
      features: form.features.split(",").map((f) => f.trim()),
      deliveryDate: form.deliveryDate,
    };

    const res = await fetch("/api/products/create", {
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
      // router.push("/admin/products");
    } else {
      toast.error(data.error || "Failed to add product");
    }
  };

  const inputClass = `
    w-full rounded-lg
    bg-zinc-800 border border-zinc-700
    px-4 py-2.5 text-sm text-white
    placeholder-zinc-400 outline-none
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-500/20
    transition
  `;

  return (
    <div className="relative min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-6xl
          rounded-2xl bg-zinc-900/80
          backdrop-blur-xl
          border border-white/10
          p-8
          shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        "
      >
        <h1 className="text-2xl font-bold text-white mb-6">Add New Product</h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1 */}
          <input
            className={inputClass}
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            name="seller"
            placeholder="Seller Name"
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />

          {/* Column 2 */}
          <input
            className={inputClass}
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            name="oldPrice"
            type="number"
            placeholder="Old Price"
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            onChange={handleChange}
          />

          {/* Column 3 */}
          <input
            className={inputClass}
            name="reviews"
            type="number"
            placeholder="Reviews Count"
            onChange={handleChange}
          />
          <input
            className={inputClass}
            name="deliveryDate"
            placeholder="Delivery Date"
            onChange={handleChange}
          />
          <select className={inputClass} name="inStock" onChange={handleChange}>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>

          {/* FEATURES + IMAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 col-span-1 md:col-span-2 lg:col-span-3">
            {/* FEATURES */}
            <textarea
              name="features"
              placeholder="Features (comma separated)"
              onChange={handleChange}
              className={`${inputClass} resize-none min-h-[160px]`}
            />

            {/* IMAGE UPLOAD */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-300 font-medium">
                Product Image
              </label>

              <div className="relative w-full h-[160px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />

                <div
                  className="
                  relative w-full h-full
                  rounded-lg border-2 border-dashed border-zinc-700
                  bg-zinc-800 overflow-hidden
                  flex items-center justify-center
                  hover:border-blue-500 transition
                "
                >
                  {form.image ? (
                    <>
                      <Image
                        src={URL.createObjectURL(form.image)}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={removeImage}
                        className="
                          absolute top-2 right-2 z-20
                          h-7 w-7 rounded-full
                          bg-black/70 text-white
                          flex items-center justify-center
                          text-sm font-bold
                          hover:bg-red-600 transition
                        "
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <div className="text-center text-zinc-400 text-sm">
                      <p className="font-medium">Click to upload image</p>
                      <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              col-span-1 md:col-span-2 lg:col-span-3
              w-full bg-white text-black
              py-2.5 rounded-md font-semibold
              hover:bg-blue-600 hover:text-white
              transition
            "
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
