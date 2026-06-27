import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import HeroSlide from "@/models/HeroSlide";
import SiteSettings from "@/models/SiteSettings";
import Offer from "@/models/Offer";
import GalleryMedia from "@/models/GalleryMedia";
import { galleryImages } from "@/lib/galleryImages";

export async function POST() {
  try {
    await connectDB();

    // Categories
    const categories = await Category.insertMany([
      { name: "Lip Gloss", slug: "gloss", description: "Premium lip glosses", order: 1 },
      { name: "Lip Liners", slug: "liner", description: "Smooth lip liners", order: 2 },
      { name: "Labubu Keychain Gloss", slug: "keychain-gloss", description: "Cute Labubu keychain gloss accessories", order: 3 },
      { name: "Bags", slug: "bags", description: "Stylish bags and pouches", order: 4 },
      { name: "Bundles", slug: "bundles", description: "Save more with our bundle deals", order: 5 },
    ]);

    const glossCat = categories[0];
    const linerCat = categories[1];
    const keychainCat = categories[2];
    const bagsCat = categories[3];
    const bundlesCat = categories[4];

    // Products
    await Product.insertMany([
      // ── Lip Gloss ──────────────────────────────────────────────
      { name: "Syrup Glow", slug: "lip-gloss-syrup-glow", description: "A rich, syrupy gloss with a high-shine finish. Long-lasting formula for a bold glossy look.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: true, isActive: true, sku: "ML-GLOSS-001", tags: ["gloss", "lip", "shine"] },
      { name: "Cherry Amour", slug: "lip-gloss-cherry-amour", description: "Sweet cherry-tinted gloss with a beautiful shimmer and lasting shine.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: true, isActive: true, sku: "ML-GLOSS-002", tags: ["gloss", "lip", "cherry"] },
      { name: "Juicy Berry", slug: "lip-gloss-juicy-berry", description: "Bold berry gloss packed with shine and a juicy pop of colour.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-003", tags: ["gloss", "lip", "berry"] },
      { name: "Sugar High", slug: "lip-gloss-sugar-high", description: "Sweet, glittery gloss for a playful, candy-inspired look.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-004", tags: ["gloss", "lip", "glitter"] },
      { name: "Lip Gloss", slug: "lip-gloss-5", description: "High-shine lip gloss for a bold, glossy finish.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-005", tags: ["gloss", "lip"] },
      { name: "Lip Gloss", slug: "lip-gloss-6", description: "High-shine lip gloss for a bold, glossy finish.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-006", tags: ["gloss", "lip"] },
      { name: "Lip Gloss", slug: "lip-gloss-7", description: "High-shine lip gloss for a bold, glossy finish.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-007", tags: ["gloss", "lip"] },
      { name: "Lip Gloss", slug: "lip-gloss-8", description: "High-shine lip gloss for a bold, glossy finish.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-008", tags: ["gloss", "lip"] },
      { name: "Lip Gloss", slug: "lip-gloss-9", description: "High-shine lip gloss for a bold, glossy finish.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-009", tags: ["gloss", "lip"] },
      { name: "Lip Gloss", slug: "lip-gloss-10", description: "High-shine lip gloss for a bold, glossy finish.", price: 12, category: glossCat._id, images: ["/images/category-gloss.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-GLOSS-010", tags: ["gloss", "lip"] },

      // ── Lip Liners ─────────────────────────────────────────────
      { name: "Goddess", slug: "lip-liner-goddess", description: "Smooth, creamy lip liner with a rich pigment to define and shape your lips perfectly.", price: 8, category: linerCat._id, images: ["/images/category-liner.png"], stock: 100, isFeatured: true, isActive: true, sku: "ML-LINER-001", tags: ["liner", "lip", "define"] },
      { name: "Blossom", slug: "lip-liner-blossom", description: "Soft blossom-toned liner for a natural, everyday lip look.", price: 8, category: linerCat._id, images: ["/images/category-liner.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-LINER-002", tags: ["liner", "lip", "blossom"] },
      { name: "Kiss Me Thru the Phone", slug: "lip-liner-kiss-me-thru-the-phone", description: "Bold, statement liner for a dramatic, unforgettable lip look.", price: 8, category: linerCat._id, images: ["/images/category-liner.png"], stock: 100, isFeatured: false, isActive: true, sku: "ML-LINER-003", tags: ["liner", "lip", "bold"] },

      // ── Labubu Keychain Gloss ──────────────────────────────────
      { name: "Sugar High Labubu Lip Gloss Keychain", slug: "labubu-keychain-sugar-high", description: "Adorable Labubu keychain with Sugar High lip gloss — a playful beauty essential and cute accessory.", price: 15, category: keychainCat._id, images: ["/images/category-keychain.png"], stock: 50, isFeatured: true, isActive: true, sku: "ML-KEY-001", tags: ["keychain", "gloss", "labubu", "sugar high"] },
      { name: "Syrup Glow Labubu Lip Gloss Keychain", slug: "labubu-keychain-syrup-glow", description: "Adorable Labubu keychain with Syrup Glow lip gloss — the perfect gift for beauty lovers.", price: 15, category: keychainCat._id, images: ["/images/category-keychain.png"], stock: 50, isFeatured: true, isActive: true, sku: "ML-KEY-002", tags: ["keychain", "gloss", "labubu", "syrup glow"] },

      // ── Bags ───────────────────────────────────────────────────
      { name: "Wallet 1", slug: "bags-wallet-1", description: "Stylish compact wallet — perfect for everyday carry.", price: 20, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 30, isFeatured: false, isActive: true, sku: "ML-BAG-W01", tags: ["bag", "wallet"] },
      { name: "Wallet 2", slug: "bags-wallet-2", description: "Stylish compact wallet — perfect for everyday carry.", price: 20, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 30, isFeatured: false, isActive: true, sku: "ML-BAG-W02", tags: ["bag", "wallet"] },
      { name: "Wallet 3", slug: "bags-wallet-3", description: "Stylish compact wallet — perfect for everyday carry.", price: 20, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 30, isFeatured: false, isActive: true, sku: "ML-BAG-W03", tags: ["bag", "wallet"] },
      { name: "Wallet 4", slug: "bags-wallet-4", description: "Stylish compact wallet — perfect for everyday carry.", price: 20, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 30, isFeatured: false, isActive: true, sku: "ML-BAG-W04", tags: ["bag", "wallet"] },
      { name: "Purse 1", slug: "bags-purse-1", description: "Elegant purse with a chic design for every occasion.", price: 35, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 20, isFeatured: true, isActive: true, sku: "ML-BAG-P01", tags: ["bag", "purse"] },
      { name: "Purse 2", slug: "bags-purse-2", description: "Elegant purse with a chic design for every occasion.", price: 35, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 20, isFeatured: false, isActive: true, sku: "ML-BAG-P02", tags: ["bag", "purse"] },
      { name: "Purse 3", slug: "bags-purse-3", description: "Elegant purse with a chic design for every occasion.", price: 35, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 20, isFeatured: false, isActive: true, sku: "ML-BAG-P03", tags: ["bag", "purse"] },
      { name: "Backpack 1", slug: "bags-backpack-1", description: "Stylish backpack with a fun, girly design — perfect for school or everyday use.", price: 45, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 15, isFeatured: true, isActive: true, sku: "ML-BAG-B01", tags: ["bag", "backpack"] },
      { name: "Backpack 2", slug: "bags-backpack-2", description: "Stylish backpack with a fun, girly design — perfect for school or everyday use.", price: 45, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 15, isFeatured: false, isActive: true, sku: "ML-BAG-B02", tags: ["bag", "backpack"] },
      { name: "Backpack 3", slug: "bags-backpack-3", description: "Stylish backpack with a fun, girly design — perfect for school or everyday use.", price: 45, category: bagsCat._id, images: ["/images/category-bags.png"], stock: 15, isFeatured: false, isActive: true, sku: "ML-BAG-B03", tags: ["bag", "backpack"] },

      // ── Bundles ────────────────────────────────────────────────
      { name: "Labubu Keychain with Lip Liner", slug: "bundle-labubu-keychain-lip-liner", description: "Get a Labubu Keychain Lip Gloss bundled with a Lip Liner — the perfect gift set for beauty lovers.", price: 20, category: bundlesCat._id, images: ["/images/category-keychain.png"], stock: 30, isFeatured: true, isBundle: true, isActive: true, sku: "ML-BNDL-001", tags: ["bundle", "keychain", "liner", "labubu"] },
      { name: "Lip Gloss with Lip Liner", slug: "bundle-lip-gloss-lip-liner", description: "Buy a Magic Lip Gloss and get a Lip Liner — the perfect duo for a bold, glossy look.", price: 17, originalPrice: 20, category: bundlesCat._id, images: ["/images/category-gloss.png"], stock: 50, isFeatured: true, isBundle: true, isActive: true, sku: "ML-BNDL-002", tags: ["bundle", "gloss", "liner", "deal"] },
    ]);

    // Hero Slides
    await HeroSlide.insertMany([
      {
        heading: "Welcome to Magic Lips",
        subheading: "Gloss that shines, sparkles, and makes every look unforgettable.",
        buttonText: "Shop Now",
        buttonLink: "/shop",
        secondaryButtonText: "Explore",
        secondaryButtonLink: "/about",
        image: "/images/hero-slide-1-welcome.png",
        order: 1,
        isActive: true,
      },
      {
        heading: "10% Off for New Subscribers",
        subheading: "Join our beauty list and get 10% off your very first order.",
        buttonText: "Subscribe & Save",
        buttonLink: "#newsletter",
        secondaryButtonText: "Learn More",
        secondaryButtonLink: "/offers",
        image: "/images/hero-slide-2-offer.png",
        order: 2,
        isActive: true,
      },
      {
        heading: "Gloss, Liners & Cute Keychain Gloss",
        subheading: "Pretty lip essentials made for bold, glossy looks.",
        buttonText: "View Products",
        buttonLink: "/shop",
        image: "/images/hero-slide-3-collection.png",
        order: 3,
        isActive: true,
      },
      {
        heading: "Bundle & Save!",
        subheading: "Buy lip gloss and liner together — get the liner for only $5.",
        buttonText: "Shop Bundle",
        buttonLink: "/shop",
        image: "/images/hero-slide-4-bundle.png",
        order: 4,
        isActive: true,
      },
    ]);

    // Site Settings
    await SiteSettings.findOneAndUpdate(
      {},
      {
        businessName: "Magic Lips",
        phone: "+1 647 495 0299",
        email: "magiclips2013@gmail.com",
        address: "3735 Dundas St W, York, ON M6S 2T6, Canada",
        instagramHandle: "magiclips2013",
        tiktokHandle: "magiclips02",
        announcementBarText: "✨ New subscribers get 10% off their first order! Use code: MAGIC LIPS 12 ✨",
        announcementBarActive: true,
        footerCopyright: "© 2024 Magic Lips. All rights reserved.",
        metaTitle: "Magic Lips — Premium Lip Gloss & Beauty",
        metaDescription: "Shop premium lip gloss, lip liners, and keychain gloss accessories at Magic Lips. Bold, glamorous, magical beauty.",
      },
      { upsert: true, new: true }
    );

    // Offers
    await Offer.insertMany([
      {
        title: "New Subscriber Discount",
        description: "10% off for new newsletter subscribers",
        type: "percentage",
        discountValue: 10,
        couponCode: "MAGIC LIPS 12",
        isActive: true,
      },
      {
        title: "Bundle Deal",
        description: "Buy lip gloss and get liner for only $5",
        type: "bundle",
        discountValue: 3,
        isActive: true,
      },
    ]);

    // Gallery
    await GalleryMedia.insertMany(
      galleryImages.map((g, i) => ({
        title: g.title,
        url: g.url,
        type: g.type,
        order: i + 1,
        isActive: true,
      }))
    );

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed", details: String(error) }, { status: 500 });
  }
}
