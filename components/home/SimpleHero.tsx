"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePageContent } from "@/lib/useCmsContent";
import { PAGE_CONTENT_DEFAULTS } from "@/lib/pageContentDefaults";

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
};

export default function SimpleHero() {
  const { content } = usePageContent<HomeContent>(
    "home",
    PAGE_CONTENT_DEFAULTS.home as unknown as HomeContent
  );

  return (
    <section className="bg-[#F0ECFB] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-5 leading-tight whitespace-pre-line"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {content.heroTitle}
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          {content.heroSubtitle}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href={content.heroCtaLink || "/shop"}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white bg-[#6147A1] hover:bg-[#4f3a87] transition-all duration-200"
          >
            {content.heroCtaText || "Shop Now"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
