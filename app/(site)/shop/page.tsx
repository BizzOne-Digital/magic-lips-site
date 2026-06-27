"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductImage, getProductName } from "@/lib/productImages";

interface Variant { name: string; image?: string; stock: number; }
interface Product {
  _id: string; name: string; slug: string; price: number; originalPrice?: number;
  images: string[]; description: string; isFeatured: boolean; isBundle?: boolean;
  stock: number; category: { name: string; slug: string }; variants?: Variant[];
}
interface Category { _id: string; name: string; slug: string; image?: string; }

// Category images map (same as CategoriesSection)
const CAT_IMAGES: Record<string, string> = {
  gloss:          "/images/category-gloss.png",
  liner:          "/images/category-liner.png",
  "keychain-gloss": "/images/category-keychain.png",
  bags:           "/images/category-bags.png",
  bundles:        "/images/category-bundles.png",
};

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories || [])).catch(() => {});
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => { setProducts(d.products?.length ? d.products : []); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  const catProducts = activeCategory
    ? products.filter((p) => p.category?.slug === activeCategory)
    : [];

  const activeCat = categories.find((c) => c.slug === activeCategory);

  // ── Category grid (no category selected) ──────────────────────
  if (!activeCategory) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Shop
            </h1>
            <p className="text-gray-500 text-sm">Choose a category to browse</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[1,2,3,4,5].map((i) => <div key={i} className="h-52 rounded-xl bg-gray-100 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className="card block hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                >
                  <div className="aspect-[4/3] bg-[#F0ECFB] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={CAT_IMAGES[cat.slug] || "/images/category-gloss.png"} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1F2937]">{cat.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Category product listing ───────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16">

        {/* Back + heading */}
        <div className="mb-8">
          <button onClick={() => router.push("/shop")} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#6147A1] text-sm mb-4 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" /> All Categories
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937]" style={{ fontFamily: "var(--font-playfair)" }}>
            {activeCat?.name || activeCategory}
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => <div key={i} className="h-64 rounded-xl bg-gray-100 animate-pulse" />)}
          </div>
        ) : catProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {catProducts.map((p) => (
              <Link
                key={p._id}
                href={`/shop/${p.slug}`}
                className="card flex flex-col h-full group"
              >
                <div className="aspect-square bg-[#F0ECFB] overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getProductImage(p)}
                    alt={getProductName(p)}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                  />
                  {p.variants && p.variants.length > 0 && (
                    <span className="absolute top-2 right-2 bg-white/90 text-[#6147A1] text-[10px] font-semibold px-2 py-1 rounded-full border border-[#6147A1]/20">
                      {p.variants.length} styles
                    </span>
                  )}
                  {p.isBundle && (
                    <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      Bundle
                    </span>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-1 gap-1">
                  <h3 className="font-semibold text-[#1F2937] text-sm">{getProductName(p)}</h3>
                  <p className="text-[#1F2937] font-bold text-sm mt-1">
                    ${p.price} <span className="text-gray-400 font-normal text-xs">CAD</span>
                    {p.originalPrice && p.originalPrice > p.price && (
                      <span className="text-xs text-gray-400 line-through ml-1">${p.originalPrice}</span>
                    )}
                  </p>
                  {p.variants && p.variants.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {p.variants.map((v) => (
                        <li key={v.name} className="text-xs text-gray-500 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#9D8EC4] flex-shrink-0" />
                          {v.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3 w-full py-2 rounded-lg text-xs font-semibold text-center text-white bg-[#6147A1] hover:bg-[#4f3a87] transition-colors duration-200">
                    View Product →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-400">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
