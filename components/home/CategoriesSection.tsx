"use client";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Lip Gloss", slug: "gloss", image: "/images/category-gloss.png", description: "High-shine glosses for bold, glossy lips." },
  { name: "Lip Liners", slug: "liner", image: "/images/category-liner.png", description: "Precision liners for clean, defined lips." },
  { name: "Keychain Gloss", slug: "keychain-gloss", image: "/images/category-keychain.png", description: "Portable keychain gloss for touch-ups on the go." },
  { name: "Bundles", slug: "bundles", image: "/images/category-bundles.png", description: "Save more with gloss and liner bundles." },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#FCE7F3]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Shop by Category
          </h2>
          <p className="text-gray-500 text-sm">Find exactly what your lips need</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="card block hover:scale-[1.02] hover:shadow-md transition-all duration-200"
            >
              <div className="relative aspect-[4/3] bg-[#F0ECFB] overflow-hidden">
                <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#1F2937] mb-1">{cat.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
