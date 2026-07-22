export type PageKey = "home" | "about" | "contact" | "offers";

export interface OfferCardContent {
  badge: string;
  title: string;
  description: string;
  details: string;
  cta: string;
  link: string;
  bg: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export const PAGE_CONTENT_DEFAULTS: Record<PageKey, Record<string, unknown>> = {
  home: {
    heroTitle: "Glossy Looks Made Simple",
    heroSubtitle:
      "Shop lip gloss, liners, Labubu keychain gloss and bags from Magic Lips. Soft shine, everyday confidence.",
    heroCtaText: "Shop Now",
    heroCtaLink: "/shop",
    newsletterTitle: "Join the Magic",
    newsletterSubtitle: "Subscribe for beauty tips, new drops, and an exclusive first-order discount.",
    offersTitle: "Exclusive Offers",
    offersSubtitle: "Beautiful products at even better prices",
    contactTitle: "Contact Us",
    contactSubtitle: "Have a question? We'd love to hear from you.",
    contactIntro: "We're here to help with product questions, orders, and anything beauty-related.",
    footerTagline: "Your premier destination for premium lip beauty.",
  },
  about: {
    title: "About Magic Lips",
    intro:
      "Bold, glamorous beauty for every look. We believe every person deserves lips that shine and feel confident.",
    tagline: "Gloss. Shine. Magic.",
    founderLabel: "Our Story",
    founderTitle: "Where gloss meets confidence.",
    founderBody:
      "My goal is to create lip glosses that make people feel confident, comfortable, and unique. Every idea, color, and detail is chosen with care. Because I believe beauty should be fun, inspiring, and personal. This business is not just about selling lip gloss. It's about turning a dream into reality and encouraging others to shine in their own way.",
    quoteName: "Destiny",
    quoteText: "Every lip deserves to shine with magic.",
    valuesTitle: "Our Values",
    values: [
      { title: "Premium Quality", description: "Every product is carefully formulated for the best gloss and wear." },
      { title: "Cruelty Free", description: "100% cruelty-free and vegan. Beauty without harm." },
      { title: "Beautiful Shine", description: "Our formula delivers soft shine and long-lasting wear." },
      { title: "Made with Love", description: "Crafted with passion for every confident beauty lover." },
      { title: "Bold Colors", description: "From classic nudes to vibrant pops. Express yourself." },
      { title: "Canadian Brand", description: "Proudly based in York, Ontario. Made for Canadians." },
    ] as ValueItem[],
    ctaTitle: "Ready to Shop?",
    ctaSubtitle: "Explore our glosses, liners, keychain accessories, and bundles.",
    ctaButtonText: "Shop Now",
  },
  contact: {
    title: "Get In Touch",
    subtitle: "We'd love to hear from you.",
    sectionTitle: "Contact Us",
    sectionSubtitle: "Have a question? We'd love to hear from you.",
    intro: "We're here to help with product questions, orders, and anything beauty-related.",
  },
  offers: {
    title: "Exclusive Offers",
    subtitle: "Deals and discounts just for you",
    cards: [
      {
        badge: "New Subscribers Only",
        title: "10% Off Your First Order",
        description:
          "Subscribe to our newsletter and get an exclusive 10% discount code for your first order.",
        details: "Valid on all products\nOne-time use per subscriber\nNo minimum purchase required",
        cta: "Subscribe & Get Code",
        link: "",
        bg: "bg-[#F0ECFB]",
      },
      {
        badge: "Bundle & Save",
        title: "Gloss + Liner Bundle Deal",
        description:
          "Buy Magic Lip Gloss ($12) and get a Lip Liner for just $5. Save $3 off the regular liner price.",
        details: "Lip Gloss at regular $12 price\nLip Liner discounted to just $5\nPerfect complete lip look",
        cta: "View Offer",
        link: "/shop?category=bundles",
        bg: "bg-[#FCE7F3]",
      },
      {
        badge: "Shipping Offer",
        title: "Free Shipping on Orders $30+",
        description: "Enjoy free shipping across Canada on orders over $30.",
        details: "Available across Canada\nNo code needed, auto-applied\nFast and reliable delivery",
        cta: "Shop Now",
        link: "/shop",
        bg: "bg-[#DBEAFE]",
      },
    ] as OfferCardContent[],
  },
};

export function mergePageContent(
  pageKey: PageKey,
  stored?: Record<string, unknown> | null
): Record<string, unknown> {
  return { ...PAGE_CONTENT_DEFAULTS[pageKey], ...(stored || {}) };
}
