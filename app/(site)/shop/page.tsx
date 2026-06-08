"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { getProductImage, getProductName } from "@/lib/productImages";
import ProductCard from "@/components/ui/ProductCard";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  isFeatured: boolean;
  isBundle?: boolean;
  stock: number;
  category: { name: string; slug: string };
  createdAt?: string;
}
interface Category { _id: string; name: string; slug: string; }

const fallback: Product[] = [
  { _id: "1", name: "Magic Lip Gloss", slug: "magic-lip-gloss", price: 12, images: ["/images/category-gloss.png"], description: "High-shine lip gloss for a bold glossy finish.", isFeatured: true, stock: 100, category: { name: "Gloss", slug: "gloss" } },
  { _id: "2", name: "Magic Lip Liner", slug: "magic-lip-liner", price: 8, images: ["/images/category-liner.png"], description: "Smooth lip liner to shape and define lips.", isFeatured: true, stock: 100, category: { name: "Liner", slug: "liner" } },
  { _id: "3", name: "Labubu Keychain Gloss", slug: "labubu-keychain-gloss", price: 15, images: ["/images/featured-keychain.png"], description: "Adorable keychain gloss — a playful beauty essential.", isFeatured: true, stock: 50, category: { name: "Keychain Gloss", slug: "keychain-gloss" } },
  { _id: "4", name: "Gloss + Liner Bundle", slug: "gloss-liner-bundle", price: 17, originalPrice: 20, images: ["/images/category-bundles.png"], description: "Buy lip gloss and liner — liner for only $5.", isFeatured: true, isBundle: true, stock: 50, category: { name: "Gloss", slug: "gloss" } },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"latest" | "price-asc" | "price-desc">("latest");
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories || [])).catch(() => {});
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => { setProducts(d.products?.length ? d.products : fallback); setLoading(false); })
      .catch(() => { setProducts(fallback); setLoading(false); });
  }, []);

  const filtered = products
    .filter((p) => {
      const matchCat =
        activeCategory === "all" ||
        (activeCategory === "bundles" && p.isBundle) ||
        p.category?.slug === activeCategory;
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleAdd = (p: Product) => {
    addItem({ id: p._id, name: getProductName(p), price: p.price, quantity: 1, image: getProductImage(p), slug: p.slug });
    toast.success(`${getProductName(p)} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-20">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Shop
          </h1>
          <p className="text-gray-500 text-sm">Premium lip gloss and beauty essentials</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#9D8EC4]/20 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="px-4 py-2.5 rounded-lg border border-[#9D8EC4]/20 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200"
          >
            <option value="latest">Sort: Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-8">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {["all", ...categories.map((c) => c.slug).filter((s) => s !== "accessories"), "bundles"].map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            const label = slug === "all" ? "All" : slug === "bundles" ? "Bundles" : cat?.name || slug;
            const active = activeCategory === slug;
            return (
              <button
                key={slug}
                onClick={() => setActiveCategory(slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#9D8EC4] text-white"
                    : "bg-white text-gray-600 border border-[#9D8EC4]/20 hover:border-[#9D8EC4]/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p._id}
                slug={p.slug}
                name={getProductName(p)}
                price={p.price}
                originalPrice={p.originalPrice}
                description={p.description}
                image={getProductImage(p)}
                stock={p.stock}
                onAddToCart={() => handleAdd(p)}
              />
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
