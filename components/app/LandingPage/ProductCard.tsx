"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockBadge } from "./StockBadge";

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
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-zinc-200 transition-all duration-200 hover:shadow-md hover:ring-zinc-300 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-zinc-700">
      {/* Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
        style={{ paddingBottom: "100%" }}
      >
        <div className="absolute inset-0">
          {/* IMAGE LAYER */}
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt={product.name ?? "Product image"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
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

          {/* CATEGORY BADGE */}
          {product.category && !isOutOfStock && (
            <Badge className="pointer-events-none absolute left-2 top-2 z-10 border-0 bg-zinc-100/90 px-2 py-0.5 text-[11px] font-medium text-zinc-700 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-300">
              {product.category.title}
            </Badge>
          )}

          {/* OUT OF STOCK BADGE */}
          {isOutOfStock && (
            <Badge
              variant="destructive"
              className="pointer-events-none absolute left-2 top-2 z-10 px-2 py-0.5 text-[11px] font-medium"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center gap-2">
          <p className="text-xl font-bold text-zinc-900 dark:text-white">
            {formatPrice(product.price)}
          </p>
          
          {/* Stock Availability - only show if low stock */}
          {!isOutOfStock && (
            <StockBadge
              productId={product._id}
              stock={stock}
              className="text-[11px] px-0 py-0 bg-transparent"
            />
          )}
        </div>

        <Button
          size="sm"
          className="mt-auto h-9 w-full gap-2 text-xs font-medium"
          disabled={isOutOfStock}
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Basket
        </Button>
      </div>
    </div>
  );
}
