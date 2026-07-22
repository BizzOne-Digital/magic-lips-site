"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import FounderSection from "@/components/home/FounderSection";
import { usePageContent } from "@/lib/useCmsContent";
import { PAGE_CONTENT_DEFAULTS, ValueItem } from "@/lib/pageContentDefaults";

type AboutContentData = {
  title: string;
  intro: string;
  tagline: string;
  quoteName: string;
  quoteText: string;
  valuesTitle: string;
  values: ValueItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
  founderLabel: string;
  founderTitle: string;
  founderBody: string;
};

export default function AboutContent() {
  const { content } = usePageContent<AboutContentData>(
    "about",
    PAGE_CONTENT_DEFAULTS.about as unknown as AboutContentData
  );
  const values = Array.isArray(content.values) ? content.values : [];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 bg-[#F0ECFB]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            {content.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {content.intro}
          </p>
          <p className="mt-3 text-base font-semibold text-[#9D8EC4]" style={{ fontFamily: "var(--font-dancing)" }}>
            {content.tagline}
          </p>
        </div>
      </section>

      <FounderSection
        label={content.founderLabel}
        title={content.founderTitle}
        body={content.founderBody}
      />

      <section className="py-12 sm:py-16 bg-[#FCE7F3]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl p-6 sm:p-8 bg-white border border-[#9D8EC4]/10 text-center">
            <Image src="/logo.png" alt="Magic Lips" width={80} height={80} className="object-contain mx-auto mb-4" onError={(e) => { (e.target as HTMLImageElement).src = "/logo.svg"; }} />
            <h3 className="text-2xl font-bold text-[#1F2937] mb-1" style={{ fontFamily: "var(--font-dancing)" }}>{content.quoteName}</h3>
            <p className="text-gray-500 text-sm italic" style={{ fontFamily: "var(--font-playfair)" }}>
              &ldquo;{content.quoteText}&rdquo;
            </p>
          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-[#9D8EC4]/10 shadow-sm max-w-md mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-circle.png"
              alt="Magic Lips"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937]" style={{ fontFamily: "var(--font-playfair)" }}>
              {content.valuesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v) => (
              <div key={v.title} className="p-5 rounded-xl bg-white border border-[#9D8EC4]/10 shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-[#1F2937] font-semibold mb-1 text-sm">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#9D8EC4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            {content.ctaTitle}
          </h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
            {content.ctaSubtitle}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-[#9D8EC4] bg-white hover:bg-[#F0ECFB] transition-all duration-200">
              <ShoppingBag className="w-4 h-4" /> {content.ctaButtonText || "Shop Now"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
