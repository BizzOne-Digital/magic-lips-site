import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

export async function POST() {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Category.deleteMany({});

    // ── Categories ─────────────────────────────────────────────
    const categories = await Category.insertMany([
      { name: "Lip Gloss",             slug: "gloss",          description: "Premium lip glosses",                    order: 1 },
      { name: "Lip Liners",            slug: "liner",          description: "Smooth lip liners",                      order: 2 },
      { name: "Labubu Keychain Lip Oil", slug: "keychain-gloss", description: "Cute Labubu keychain lip oil accessories", order: 3 },
      { name: "Juicy Couture Bags",      slug: "bags",           description: "Juicy Couture bags, purses & wallets",       order: 4 },
      { name: "Bundles",               slug: "bundles",        description: "Save more with our bundle deals",        order: 5 },
    ]);

    const glossCat    = categories[0];
    const linerCat    = categories[1];
    const keychainCat = categories[2];
    const bagsCat     = categories[3];
    const bundlesCat  = categories[4];

    await Product.insertMany([

      // ── LIP GLOSS ── 2 products (Tube + Bottle), same 4 shade names ──
      // Insert Bottle first so Tube sorts first (API uses createdAt desc).

      // 1. Lip Gloss – Bottle (4 shades — same names as Tube)
      {
        name: "Lip Gloss – Bottle",
        slug: "lip-gloss-bottle",
        description: "High-shine bottle lip gloss with a beautiful heart-cap design. Long-lasting, non-sticky formula. Available in 4 shades.",
        price: 12,
        category: glossCat._id,
        images: ["/images/products/gloss-bottle-syrup-glow.jpg"],
        stock: 400,
        isFeatured: true,
        isActive: true,
        sku: "ML-GLOSS-BTL",
        tags: ["gloss", "lip", "bottle", "shine"],
        variants: [
          { name: "Syrup Glow",   image: "/images/products/gloss-bottle-syrup-glow.jpg",   stock: 100 },
          { name: "Cherry Amour", image: "/images/products/gloss-bottle-cherry-amour.jpg", stock: 100 },
          { name: "Juicy Berry",  image: "/images/products/gloss-bottle-juicy-berry.jpg",  stock: 100 },
          { name: "Sugar High",   image: "/images/products/gloss-bottle-sugar-high.jpg",   stock: 100 },
        ],
      },

      // 2. Lip Gloss – Tube (4 shades)
      {
        name: "Lip Gloss – Tube",
        slug: "lip-gloss-tube",
        description: "Smooth, hydrating tube lip gloss for a bold glossy finish. High-shine formula in 4 beautiful shades.",
        price: 12,
        category: glossCat._id,
        images: ["/images/products/gloss-tube-sugar-high.jpg"],
        stock: 400,
        isFeatured: true,
        isActive: true,
        sku: "ML-GLOSS-TUBE",
        tags: ["gloss", "lip", "tube", "shine"],
        variants: [
          { name: "Sugar High",   image: "/images/products/gloss-tube-sugar-high.jpg",   stock: 100 },
          { name: "Cherry Amour", image: "/images/products/gloss-tube-cherry-amour.jpg", stock: 100 },
          { name: "Juicy Berry",  image: "/images/products/gloss-tube-juicy-berry.jpg",  stock: 100 },
          { name: "Syrup Glow",   image: "/images/products/gloss-tube-syrup-glow.jpg",   stock: 100 },
        ],
      },

      // ── LIP LINERS ── 1 product, 3 shades ───────────────────
      {
        name: "Lip Liner",
        slug: "lip-liner",
        description: "Smooth, creamy lip liner that defines and shapes your lips perfectly. Long-wearing formula in 3 shades.",
        price: 8,
        category: linerCat._id,
        images: ["/images/products/liner-goddess.jpg"],
        stock: 300,
        isFeatured: true,
        isActive: true,
        sku: "ML-LINER",
        tags: ["liner", "lip", "define"],
        variants: [
          { name: "Goddess",                image: "/images/products/liner-goddess.jpg",               stock: 100 },
          { name: "Blossom",                image: "/images/products/liner-blossom.jpg",               stock: 100 },
          { name: "Kiss Me Thru the Phone", image: "/images/products/liner-kiss-me-thru-the-phone.jpg",stock: 100 },
        ],
      },

      // ── LABUBU KEYCHAIN GLOSS ── 1 product, 2 styles ────────
      {
        name: "Labubu Lip Oil Keychain",
        slug: "labubu-keychain-gloss",
        description: "Adorable Labubu character keychain with lip oil — the perfect cute accessory and gift. Available in 2 styles.",
        price: 15,
        category: keychainCat._id,
        images: ["/images/products/keychain-sugar-high.jpg"],
        stock: 100,
        isFeatured: true,
        isActive: true,
        sku: "ML-KEY",
        tags: ["keychain", "gloss", "labubu", "gift"],
        variants: [
          { name: "Happy Time", image: "/images/products/keychain-sugar-high.jpg", stock: 50 },
          { name: "Boom",       image: "/images/products/keychain-syrup-glow.jpg", stock: 50 },
        ],
      },

      // ── BAGS ── 3 products ───────────────────────────────────

      // Juicy Couture Mini Backpacks (3 styles)
      {
        name: "Juicy Couture Mini Backpack",
        slug: "bags-mini-backpack",
        description: "Cute & compact Juicy Couture mini backpack — perfect for everyday use. Available in 3 adorable styles.",
        price: 45,
        category: bagsCat._id,
        images: ["/images/products/bag-backpack-1.jpg"],
        stock: 45,
        isFeatured: true,
        isActive: true,
        sku: "ML-BAG-BP",
        tags: ["bag", "backpack", "juicy couture"],
        variants: [
          { name: "Pink Cherry",  image: "/images/products/bag-backpack-1.jpg", stock: 15 },
          { name: "Love Heart",   image: "/images/products/bag-backpack-3.jpg", stock: 15 },
          { name: "Ivory Paris",  image: "/images/products/bag-backpack-2.jpg", stock: 15 },
        ],
      },

      // Juicy Couture Shoulder / Crossbody Bags (3 styles)
      {
        name: "Juicy Couture Shoulder / Crossbody Bag",
        slug: "bags-shoulder-crossbody",
        description: "Lightweight, stylish Juicy Couture shoulder bag — perfect for on-the-go. Available in 3 fun styles.",
        price: 35,
        category: bagsCat._id,
        images: ["/images/products/bag-purse-1.jpg"],
        stock: 60,
        isFeatured: true,
        isActive: true,
        sku: "ML-BAG-SB",
        tags: ["bag", "purse", "crossbody", "juicy couture"],
        variants: [
          { name: "Fruits Embroidery", image: "/images/products/bag-purse-1.jpg", stock: 20 },
          { name: "Mint Stripe",       image: "/images/products/bag-purse-2.jpg", stock: 20 },
          { name: "Juicy Couture",     image: "/images/products/bag-purse-3.jpg", stock: 20 },
        ],
      },

      // Juicy Couture Wallets & Mini Cases (4 styles)
      {
        name: "Juicy Couture Wallet & Mini Case",
        slug: "bags-wallet-mini-case",
        description: "Small, cute Juicy Couture wallet & mini case — keeps your essentials organized in style. Available in 4 styles.",
        price: 20,
        category: bagsCat._id,
        images: ["/images/products/bag-wallet-3.jpg"],
        stock: 120,
        isFeatured: false,
        isActive: true,
        sku: "ML-BAG-WL",
        tags: ["bag", "wallet", "juicy couture"],
        variants: [
          { name: "Pink Strawberry", image: "/images/products/bag-wallet-3.jpg", stock: 30 },
          { name: "Juicy Couture",   image: "/images/products/bag-wallet-2.jpg", stock: 30 },
          { name: "Black Check",     image: "/images/products/bag-wallet-1.jpg", stock: 30 },
          { name: "Pink Velvet",     image: "/images/products/bag-wallet-4.jpg", stock: 30 },
        ],
      },

      // ── BUNDLES ── 2 products ────────────────────────────────

      // Lip Gloss + Lip Liner Bundle (2 styles)
      {
        name: "Lip Gloss + Lip Liner Bundle",
        slug: "bundle-lip-gloss-lip-liner",
        description: "Magic Lip Gloss + Lip Liner — the perfect duo for a bold, glossy look. Save when you bundle!",
        price: 17,
        originalPrice: 20,
        category: bundlesCat._id,
        images: ["/images/products/bundle-gloss-liner-1.jpg"],
        stock: 100,
        isFeatured: true,
        isBundle: true,
        isActive: true,
        sku: "ML-BNDL-GL",
        tags: ["bundle", "gloss", "liner", "deal"],
        variants: [
          { name: "Style 1", image: "/images/products/bundle-gloss-liner-1.jpg", stock: 50 },
          { name: "Style 2", image: "/images/products/bundle-gloss-liner-2.jpg", stock: 50 },
        ],
      },

      // Labubu Keychain + Lip Liner Bundle (2 styles)
      {
        name: "Labubu Keychain + Lip Liner Bundle",
        slug: "bundle-labubu-keychain-lip-liner",
        description: "Adorable Labubu Keychain Lip Gloss + Lip Liner — the perfect gift set for beauty lovers!",
        price: 20,
        category: bundlesCat._id,
        images: ["/images/products/bundle-labubu-liner-1.jpg"],
        stock: 60,
        isFeatured: true,
        isBundle: true,
        isActive: true,
        sku: "ML-BNDL-KL",
        tags: ["bundle", "keychain", "liner", "labubu", "gift"],
        variants: [
          { name: "Style 1", image: "/images/products/bundle-labubu-liner-1.jpg", stock: 30 },
          { name: "Style 2", image: "/images/products/bundle-labubu-liner-2.jpg", stock: 30 },
        ],
      },

    ]);

    return NextResponse.json({
      success: true,
      message: "Products reset successfully!",
      summary: {
        categories: 5,
        products: 9,
        breakdown: {
          lipGloss: "2 (Bottle × 4 shades, Tube × 4 shades)",
          lipLiners: "1 (3 shades)",
          labubuKeychain: "1 (2 styles)",
          bags: "3 (Backpacks × 3, Crossbody × 3, Wallets × 4)",
          bundles: "2 (Gloss+Liner × 2, Labubu+Liner × 2)",
        },
      },
    });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json({ error: "Reset failed", details: String(error) }, { status: 500 });
  }
}
