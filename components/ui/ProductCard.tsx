"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  stock?: number;
  onAddToCart?: () => void;
}

export default function ProductCard({
  slug,
  name,
  price,
  originalPrice,
  description,
  image,
  stock = 100,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="card flex flex-col h-full">
      <Link href={`/shop/${slug}`} className="block">
        <div className="relative aspect-square bg-[#F0ECFB] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
        <Link href={`/shop/${slug}`}>
          <h3 className="font-semibold text-[#1F2937] text-sm sm:text-base hover:text-[#9D8EC4] transition-colors duration-200">
            {name}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 flex-1">{description}</p>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-[#1F2937]">${price}</span>
          <span className="text-xs text-gray-400">CAD</span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
          )}
        </div>
        <div className="flex gap-2 pt-2">
          {onAddToCart && (
            <button
              type="button"
              onClick={onAddToCart}
              disabled={stock === 0}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#9D8EC4] hover:bg-[#9D8EC4] transition-all duration-200 disabled:opacity-50"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
          )}
          <Link
            href={`/shop/${slug}`}
            className="flex-1 inline-flex items-center justify-center px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-[#9D8EC4] border border-[#9D8EC4]/30 hover:bg-[#F0ECFB] transition-all duration-200 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
