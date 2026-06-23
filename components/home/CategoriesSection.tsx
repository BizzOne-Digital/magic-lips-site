"use client";
import Link from "next/link";

const categories = [
  { name: "Lip Gloss", slug: "gloss", image: "/images/category-gloss.png", description: "High-shine glosses for bold, glossy lips." },
  { name: "Lip Liners", slug: "liner", image: "/images/category-liner.png", description: "Precision liners for clean, defined lips." },
  { name: "Labubu Keychain Gloss", slug: "keychain-gloss", image: "/images/category-keychain.png", description: "Adorable Labubu keychain gloss for touch-ups on the go." },
  { name: "Bags", slug: "bags", image: "/images/category-bags.png", description: "Stylish bags and pouches for beauty lovers." },
  { name: "Bundles", slug: "bundles", image: "/images/category-bundles.png", description: "Save more with our bundle deals." },
];

export default function CategoriesSection() {
  return (
    <section className="py-10 sm:py-14 bg-[#FCE7F3]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Shop by Category
          </h2>
          <p className="text-gray-500 text-sm">Find exactly what your lips need</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="card block hover:scale-[1.02] hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-[4/3] bg-[#F0ECFB] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#1F2937] mb-1">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
