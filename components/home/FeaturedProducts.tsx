"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import ProductCard from "@/components/ui/ProductCard";
import { getProductImage, getProductName } from "@/lib/productImages";

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
  category: { name: string };
}

const fallback: Product[] = [
  { _id: "1", name: "Magic Lip Gloss", slug: "magic-lip-gloss", price: 12, images: ["/images/featured-gloss.png"], description: "High-shine lip gloss for a bold glossy finish.", isFeatured: true, stock: 100, category: { name: "Gloss" } },
  { _id: "2", name: "Magic Lip Liner", slug: "magic-lip-liner", price: 8, images: ["/images/featured-liner.png"], description: "Smooth lip liner to shape and define lips.", isFeatured: true, stock: 100, category: { name: "Liner" } },
  { _id: "3", name: "Labubu Keychain Gloss", slug: "labubu-keychain-gloss", price: 15, images: ["/images/featured-keychain.png"], description: "Cute keychain gloss with a playful beauty vibe.", isFeatured: true, stock: 50, category: { name: "Keychain Gloss" } },
  { _id: "4", name: "Gloss + Liner Bundle", slug: "gloss-liner-bundle", price: 17, originalPrice: 20, images: ["/images/featured-bundle.png"], description: "Buy lip gloss and liner — liner for only $5.", isFeatured: true, isBundle: true, stock: 50, category: { name: "Gloss" } },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=4")
      .then((r) => r.json())
      .then((d) => { setProducts(d.products?.length ? d.products : fallback); setLoading(false); })
      .catch(() => { setProducts(fallback); setLoading(false); });
  }, []);

  const handleAdd = (p: Product) => {
    addItem({
      id: p._id,
      name: getProductName(p),
      price: p.price,
      quantity: 1,
      image: getProductImage(p),
      slug: p.slug,
    });
    toast.success(`${getProductName(p)} added to cart!`);
  };

  return (
    <section className="py-16 sm:py-20 bg-white" id="featured">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Featured Products
          </h2>
          <p className="text-gray-500 text-sm">Our most-loved lip essentials</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
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

        <div className="text-center mt-10">
          <Link href="/shop" className="btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
