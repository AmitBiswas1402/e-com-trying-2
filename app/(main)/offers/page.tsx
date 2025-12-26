"use client";
import { banners } from "@/utils/offers";
import Image from "next/image";

const OfferCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className={`
            bg-linear-to-r ${banner.gradient}
            rounded-xl p-4
            flex items-center justify-between
            h-[130px]
            text-white shadow-md
          `}
        >
          {/* Left: Text */}
          <div className="flex flex-col gap-1.5 max-w-[65%]">
            <h2 className="text-xl font-semibold leading-tight">
              {banner.title}
            </h2>

            <p className="text-sm text-gray-200 leading-snug">
              {banner.subtitle}
            </p>

            <a
              href={banner.ctaLink}
              className="
                mt-1 inline-block w-fit
                bg-white text-black
                px-3 py-1 rounded
                font-semibold text-sm
                shadow-sm
                hover:scale-105 transition
              "
            >
              {banner.cta}
            </a>
          </div>

          {/* Right: Image */}
          <div className="shrink-0">
            <Image
              className="object-cover rounded-lg"
              src={banner.image}
              alt={banner.category}
              width={72}
              height={72}
              priority
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferCards;
