"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { getProductImage, getProductName } from "@/lib/productImages";
import toast from "react-hot-toast";

interface Variant {
  name: string;
  image?: string;
  stock: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  stock: number;
  isBundle?: boolean;
  isFeatured: boolean;
  category: { name: string; slug: string };
  tags?: string[];
  variants?: Variant[];
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-400">Loading...</div>}>
      <ProductDetail />
    </Suspense>
  );
}

function ProductDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const variantParam = searchParams.get("variant");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [imgSrc, setImgSrc] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!params.slug) return;
    fetch(`/api/products/${params.slug}`)
      .then((r) => r.json())
      .then((d) => {
        setProduct(d.product);
        if (d.product) {
          setImgSrc(getProductImage(d.product));
          if (d.product.variants?.length) {
            const preSelected = variantParam
              ? d.product.variants.find((v: Variant) => v.name === variantParam)
              : d.product.variants[0];
            setSelectedVariant(preSelected || d.product.variants[0]);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.slug]);

  // When variant changes, update displayed image if variant has one
  useEffect(() => {
    if (selectedVariant?.image) setImgSrc(selectedVariant.image);
    else if (product) setImgSrc(getProductImage(product));
  }, [selectedVariant, product]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.variants?.length && !selectedVariant) {
      toast.error("Please select a shade first");
      return;
    }
    const image = selectedVariant?.image || getProductImage(product);
    const name = getProductName(product);
    const cartName = selectedVariant ? `${name} — ${selectedVariant.name}` : name;
    const cartId = selectedVariant ? `${product._id}-${selectedVariant.name}` : product._id;
    addItem({
      id: cartId,
      name: cartName,
      price: product.price,
      quantity: qty,
      image,
      slug: product.slug,
      variant: selectedVariant?.name,
    });
    toast.success(`${cartName} × ${qty} added to cart!`);
  };

  const availableStock = selectedVariant ? selectedVariant.stock : (product?.stock ?? 0);
  const hasVariants = product?.variants && product.variants.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Product not found</h2>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const displayName = getProductName(product);
  const displayImage = imgSrc || getProductImage(product);

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#6147A1] mb-6 transition-colors duration-200 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden border border-[#9D8EC4]/10 relative bg-[#F0ECFB]">
            <Image
              src={displayImage}
              alt={displayName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={() => setImgSrc("/images/category-gloss.png")}
            />
            {product.isBundle && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D4AF37] text-white text-xs font-bold z-10">
                Bundle Deal
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div>
              <p className="text-[#6147A1] text-xs font-semibold uppercase tracking-wider mb-1">
                {product.category?.name}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                {displayName}
              </h1>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1F2937]">${product.price}</span>
              <span className="text-gray-400">CAD</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>

            {/* Variant selector */}
            {hasVariants && (
              <div>
                <p className="text-sm font-semibold text-[#1F2937] mb-2">
                  Shade: <span className="text-[#6147A1]">{selectedVariant?.name}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants!.map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => { setSelectedVariant(v); setQty(1); }}
                      disabled={v.stock === 0}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                        selectedVariant?.name === v.name
                          ? "bg-[#6147A1] text-white border-[#6147A1]"
                          : "bg-white text-gray-700 border-[#9D8EC4]/40 hover:border-[#6147A1]"
                      }`}
                    >
                      {v.name}
                      {v.stock === 0 && " (sold out)"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.isBundle && (
              <div className="rounded-lg p-4 bg-[#FCE7F3]/50 border border-[#D4AF37]/30">
                <p className="text-[#1F2937] font-semibold text-sm mb-1">Bundle Deal</p>
                <p className="text-gray-600 text-sm">Includes Lip Gloss + Lip Liner at a special bundle price.</p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${availableStock > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm text-gray-500">
                {availableStock > 0 ? (availableStock > 10 ? "In Stock" : `Only ${availableStock} left`) : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">Quantity</span>
              <div className="flex items-center border border-[#9D8EC4]/20 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-[#F0ECFB] rounded-l-lg transition-colors duration-200">
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="px-4 text-sm font-semibold min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(availableStock, qty + 1))} className="p-2.5 hover:bg-[#F0ECFB] rounded-r-lg transition-colors duration-200">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={availableStock === 0}
              className="w-full sm:w-auto btn-primary py-3 px-8 gap-2 disabled:opacity-50"
            >
              <ShoppingBag className="w-5 h-5" />
              {availableStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

