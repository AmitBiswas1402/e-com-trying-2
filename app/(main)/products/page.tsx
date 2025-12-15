"use client"
import { useCartStore } from '@/store/cartStore'
import { products } from '@/utils/products'
import Image from 'next/image'

const ProductsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-6 py-10">
      {products.map((product) => (
        <a
          key={product.id}
          href={`/products/${product.id}`}
          className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 p-5 flex flex-col cursor-pointer"
        >
          {/* IMAGE */}
          <div className="w-full h-56 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={240}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="mt-4 flex flex-col gap-1 flex-1">
            <h2 className="font-semibold text-lg text-gray-900 leading-tight">
              {product.name}
            </h2>

            <span className="text-gray-500 text-sm">by {product.seller}</span>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1 text-sm">
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md font-medium text-xs">
                ★ {product.rating}
              </span>
              <span className="text-gray-500 text-xs">{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">&#8377;{product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through text-sm">&#8377;{product.oldPrice}</span>
              )}
            </div>

            {/* Delivery */}
            <div className={`mt-2 text-xs font-medium ${
              product.inStock ? "text-green-600" : "text-red-600"
            }`}>
              {product.inStock
                ? product.deliveryDate
                : "Out of stock"}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-4 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 font-medium transition text-sm"
            type="button"
            tabIndex={-1}
            onClick={() => useCartStore.getState().addToCart(product)}
          >
            Add to Cart
          </button>
        </a>
      ))}
    </div>
  )
}

export default ProductsPage
