"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import FounderSection from "@/components/home/FounderSection";

const values = [
  { title: "Premium Quality", description: "Every product is carefully formulated for the best gloss and wear." },
  { title: "Cruelty Free", description: "100% cruelty-free and vegan. Beauty without harm." },
  { title: "Beautiful Shine", description: "Our formula delivers soft shine and long-lasting wear." },
  { title: "Made with Love", description: "Crafted with passion for every confident beauty lover." },
  { title: "Bold Colors", description: "From classic nudes to vibrant pops. Express yourself." },
  { title: "Canadian Brand", description: "Proudly based in York, Ontario. Made for Canadians." },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 bg-[#F0ECFB]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            About Magic Lips
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Bold, glamorous beauty for every look. We believe every person deserves lips that shine and feel confident.
          </p>
          <p className="mt-3 text-base font-semibold text-[#9D8EC4]" style={{ fontFamily: "var(--font-dancing)" }}>
            Gloss. Shine. Magic.
          </p>
        </div>
      </section>

      <FounderSection />

      <section className="py-12 sm:py-16 bg-[#FCE7F3]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl p-6 sm:p-8 bg-white border border-[#9D8EC4]/10 text-center">
            <Image src="/logo.png" alt="Magic Lips" width={80} height={80} className="object-contain mx-auto mb-4" onError={(e) => { (e.target as HTMLImageElement).src = "/logo.svg"; }} />
            <h3 className="text-2xl font-bold text-[#1F2937] mb-1" style={{ fontFamily: "var(--font-dancing)" }}>Destiny</h3>
            <p className="text-gray-500 text-sm italic" style={{ fontFamily: "var(--font-playfair)" }}>
              &ldquo;Every lip deserves to shine with magic.&rdquo;
            </p>
          </div>

          {/* About image */}
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
              Our Values
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
            Ready to Shop?
          </h2>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
            Explore our glosses, liners, keychain accessories, and bundles.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-[#9D8EC4] bg-white hover:bg-[#F0ECFB] transition-all duration-200">
              <ShoppingBag className="w-4 h-4" /> Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
