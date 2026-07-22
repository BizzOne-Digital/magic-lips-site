export interface ProductLike {
  slug: string;
  name?: string;
  images?: string[];
  isBundle?: boolean;
  category?: { name?: string; slug?: string };
}

export const productImagesBySlug: Record<string, string> = {
  "magic-lip-gloss": "/images/featured-gloss.png",
  "magic-lip-liner": "/images/featured-liner.png",
  "labubu-keychain-gloss": "/images/featured-keychain.png",
  "gloss-liner-bundle": "/images/featured-bundle.png",
};

export const categoryImagesBySlug: Record<string, string> = {
  "magic-lip-gloss": "/images/category-gloss.png",
  "magic-lip-liner": "/images/category-liner.png",
  "gloss-liner-bundle": "/images/category-bundles.png",
};

export const categoryImagesByCategorySlug: Record<string, string> = {
  gloss: "/images/category-gloss.png",
  liner: "/images/category-liner.png",
  "keychain-gloss": "/images/category-keychain.png",
  bundles: "/images/category-bundles.png",
};

export const productNamesBySlug: Record<string, string> = {
  "labubu-keychain-gloss": "Labubu Lip Oil Keychain",
};

export function getProductImage(product: ProductLike): string {
  if (product.images?.[0]) return product.images[0];
  if (product.isBundle) {
    return productImagesBySlug["gloss-liner-bundle"] || "/images/featured-bundle.png";
  }
  return (
    productImagesBySlug[product.slug] ||
    categoryImagesBySlug[product.slug] ||
    categoryImagesByCategorySlug[product.category?.slug || ""] ||
    "/images/category-gloss.png"
  );
}

export function getProductName(product: ProductLike): string {
  return productNamesBySlug[product.slug] || product.name || "Product";
}
