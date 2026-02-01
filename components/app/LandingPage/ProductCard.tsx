"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = FILTER_PRODUCTS_BY_NAME_QUERYResult[number];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const images = product.images ?? [];
  const mainImageUrl = images[0]?.asset?.url;

  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;

  return (
    <div
      className="group flex flex-col
        w-60
        overflow-hidden rounded-lg
        bg-white shadow-sm
        ring-1 ring-zinc-200
        transition-all duration-200
        hover:shadow-md
        dark:bg-zinc-900 dark:ring-zinc-800
      "
    >
      {/* Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            alt={product.name ?? "Product image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-12 w-12 text-zinc-300 dark:text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 bg-white/90 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-300"
          >
            {product.category.title}
          </Badge>
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <Badge
            variant="destructive"
            className="absolute right-2 top-2 text-xs"
          >
            Out of Stock
          </Badge>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-3 p-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {product.name}
          </h3>
        </Link>

        <p className="text-base font-semibold text-zinc-900 dark:text-white">
          {formatPrice(product.price)}
        </p>

        {/* Add to Basket Button - Always Visible */}
        <Button size="sm" className="w-full gap-2" disabled={isOutOfStock}>
          <ShoppingBag className="h-4 w-4" />
          Add to Basket
        </Button>
      </div>
    </div>
  );
}
