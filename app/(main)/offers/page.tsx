"use client"
import { banners } from "@/utils/offers";
import Image from "next/image";

const OfferCards = () => {
  return (
    <div className="w-full max-w-8xl mx-auto p-4 rounded flex flex-wrap gap-6 justify-center">
      {banners.map((banner) => (
        <section
          key={banner.id}
          className="flex justify-center items-center my-4"
        >
          {/* Portrait Card - Text Top Left, Image Bottom Right, flex-wrap */}
          <div
            className={`
              bg-linear-to-b ${banner.gradient} 
              rounded-2xl p-6 
              flex flex-col flex-wrap
              w-full max-w-xs min-h-[360px] aspect-3/5
              text-white relative shadow-lg
            `}
            style={{ minHeight: "360px" }}
          >
            {/* Top Left: Text */}
            <div className="flex flex-col gap-2 absolute top-6 left-6 z-10 max-w-[70%]">
              <h2 className="text-xl md:text-2xl font-bold">{banner.title}</h2>
              <p className="text-gray-200 text-sm">{banner.subtitle}</p>
              <a
                href={banner.ctaLink}
                className="mt-2 inline-block bg-white text-black px-3 py-1.5 rounded-md font-semibold text-sm shadow"
              >
                {banner.cta}
              </a>
            </div>
            {/* Bottom Right: Image */}
            <div className="absolute bottom-4 right-4 z-0">
              <Image
                className="object-cover rounded-lg shadow-md"
                src={banner.image}
                alt={banner.category}
                width={120}
                height={140}
                style={{
                  width: "120px",
                  height: "140px",
                  objectFit: "cover",
                }}
                priority
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default OfferCards;
