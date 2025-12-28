"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import type { Product } from "@/types";

interface ProductFromDB {
  _id: string;
  name: string;
  seller: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  deliveryDate: string;
  category?: string;
  features?: string[];
}

const ProductsPage = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [products, setProducts] = useState<ProductFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return Response.json(
            { success: false, error: error.message },
            { status: 500 }
          );
        }
        return Response.json(
          { success: false, error: "Unknown error" },
          { status: 500 }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">Loading products...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-6 py-10">
      {products.map((product) => (
        <a
          key={product._id}
          href={`/products/${product._id}`}
          className="
            rounded-2xl bg-linear-to-br from-white via-gray-50 to-gray-100
            border border-gray-200 p-5 flex flex-col cursor-pointer
            shadow-[0_4px_14px_rgba(0,0,0,0.08)]
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.16)]
          "
        >
          {/* IMAGE */}
          <div className="w-full h-56 bg-white rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={240}
              className="object-cover w-full h-full hover:scale-105 transition"
            />
          </div>

          {/* INFO */}
          <div className="mt-4 flex flex-col gap-1 flex-1">
            <h2 className="font-semibold text-lg text-gray-900">
              {product.name}
            </h2>
            <span className="text-gray-500 text-sm">by {product.seller}</span>

            <div className="flex gap-2 mt-1 text-xs">
              <span className="bg-yellow-100 text-yellow-700 px-2 rounded">
                ★ {product.rating}
              </span>
              <span className="text-gray-500">{product.reviews} reviews</span>
            </div>

            <div className="mt-3 flex gap-2">
              <span className="text-xl font-bold">₹{product.price}</span>
              {product.oldPrice && (
                <span className="line-through text-gray-400">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            <div
              className={`mt-2 text-xs font-medium ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? product.deliveryDate : "Out of stock"}
            </div>
          </div>

          {/* CART */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const cartProduct: Product = {
                id: parseInt(product._id.slice(-8), 16) || Date.now(),
                name: product.name,
                seller: product.seller,
                price: product.price,
                oldPrice: product.oldPrice || 0,
                rating: product.rating,
                reviews: product.reviews,
                category: product.category || "",
                image: product.image,
                features: product.features || [],
                deliveryDate: product.deliveryDate,
                inStock: product.inStock,
              };
              addToCart(cartProduct);
            }}
            className="mt-4 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </a>
      ))}
    </div>
  );
};

export default ProductsPage;
