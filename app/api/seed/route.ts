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
      // ── Lip Gloss (Tube + Bottle, same 4 shade names) ───────────
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
          { name: "Syrup Glow", image: "/images/products/gloss-bottle-syrup-glow.jpg", stock: 100 },
          { name: "Cherry Amour", image: "/images/products/gloss-bottle-cherry-amour.jpg", stock: 100 },
          { name: "Juicy Berry", image: "/images/products/gloss-bottle-juicy-berry.jpg", stock: 100 },
          { name: "Sugar High", image: "/images/products/gloss-bottle-sugar-high.jpg", stock: 100 },
        ],
      },
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
          { name: "Sugar High", image: "/images/products/gloss-tube-sugar-high.jpg", stock: 100 },
          { name: "Cherry Amour", image: "/images/products/gloss-tube-cherry-amour.jpg", stock: 100 },
          { name: "Juicy Berry", image: "/images/products/gloss-tube-juicy-berry.jpg", stock: 100 },
          { name: "Syrup Glow", image: "/images/products/gloss-tube-syrup-glow.jpg", stock: 100 },
        ],
      },

      // ── Lip Liners ─────────────────────────────────────────────
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
          { name: "Goddess", image: "/images/products/liner-goddess.jpg", stock: 100 },
          { name: "Blossom", image: "/images/products/liner-blossom.jpg", stock: 100 },
          { name: "Kiss Me Thru the Phone", image: "/images/products/liner-kiss-me-thru-the-phone.jpg", stock: 100 },
        ],
      },

      // ── Labubu Keychain Lip Oil ────────────────────────────────
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
          { name: "Boom", image: "/images/products/keychain-syrup-glow.jpg", stock: 50 },
        ],
      },

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
