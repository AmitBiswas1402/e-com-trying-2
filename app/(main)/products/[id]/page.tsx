import { products } from "@/utils/products";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-600 text-xl font-semibold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      {/* MAIN WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGE SECTION */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-xl w-full h-[330px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {product.name}
          </h1>

          <p className="text-gray-600 text-sm">
            Sold by:{" "}
            <span className="font-semibold text-white">{product.seller}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-semibold">
              ★ {product.rating}
            </span>
            <span className="text-white text-sm">
              {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-bold text-white">
              ₹{product.price}
            </span>
            <span className="text-white line-through text-lg">
              ₹{product.oldPrice}
            </span>
          </div>

          <p className="text-green-600 text-sm font-medium">
            {product.deliveryDate}
          </p>

          {/* Features */}
          <div className="mt-3">
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="space-y-1 text-white text-sm list-disc list-inside">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
