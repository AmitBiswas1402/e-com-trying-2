import { products } from '@/utils/products'
import Image from 'next/image'

const ProductsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 py-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg flex flex-col gap-3 p-5 border border-gray-100 hover:shadow-xl transition duration-200"
        >
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            {/* If product.image is a URL string */}
            <Image
            width={50}
            height={80}                                
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="mt-3 flex flex-col gap-1 flex-1">
            <h2 className="font-semibold text-lg text-slate-900">{product.name}</h2>
            <span className="text-gray-600 text-sm">
              by {product.seller}
            </span>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <span className="font-medium text-yellow-500">&#9733; {product.rating}</span>
              <span className="text-gray-500">{product.reviews} reviews</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xl font-bold text-black">&#8377;{product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through text-sm">&#8377;{product.oldPrice}</span>
              )}
            </div>
            <div className="text-green-700 mt-2 text-xs">
              {product.deliveryDate ? `Delivery by ${product.deliveryDate}` : ''}
            </div>
          </div>
          <button
            className="mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-medium transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductsPage