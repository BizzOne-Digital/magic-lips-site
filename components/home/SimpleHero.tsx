import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SimpleHero() {
  return (
    <section className="bg-[#F0ECFB] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2937] mb-5 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Glossy Looks <br className="hidden sm:block" />
          Made Simple
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Shop lip gloss, liners, Labubu keychain gloss and bags from Magic Lips. Soft shine, everyday confidence.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold text-white bg-[#6147A1] hover:bg-[#4f3a87] transition-all duration-200"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
