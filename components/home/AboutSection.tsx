"use client";
import Image from "next/image";
import Link from "next/link";

const features = [
  { title: "Premium Formula", desc: "Long-lasting, high-shine gloss that stays all day" },
  { title: "Cruelty Free", desc: "100% cruelty-free and vegan-friendly beauty" },
  { title: "Beautiful Shine", desc: "Soft shimmer for everyday and special occasions" },
  { title: "Made with Love", desc: "Crafted for confident beauty lovers everywhere" },
];

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden bg-[#F0ECFB] border border-[#9D8EC4]/10">
            <Image
              src="/images/about-circle.png"
              alt="Magic Lips — Gloss. Shine. Magic."
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-[#F0ECFB] text-[#9D8EC4]">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              About Magic Lips
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-base">
              Magic Lips was born from a love of bold, glamorous beauty. We believe every person deserves lips that shine and feel confident — no matter the occasion.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
              From high-shine lip glosses to precision lip liners and adorable keychain accessories — every product is crafted for the beauty lover who wants simple, polished results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {features.map((f) => (
                <div key={f.title} className="p-4 rounded-lg bg-[#FCE7F3]/30 border border-[#9D8EC4]/10">
                  <p className="text-[#1F2937] font-semibold text-sm">{f.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link href="/about" className="btn-primary px-6 py-2.5 text-sm">Learn More</Link>
              <Link href="/contact" className="btn-secondary px-6 py-2.5 text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
