"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, MapPin, ShoppingBag, Mail } from "lucide-react";

const values = [
  { title: "Premium Quality", description: "Every product is carefully formulated for the best gloss and wear." },
  { title: "Cruelty Free", description: "100% cruelty-free and vegan. Beauty without harm." },
  { title: "Beautiful Shine", description: "Our formula delivers soft shine and long-lasting wear." },
  { title: "Made with Love", description: "Crafted with passion for every confident beauty lover." },
  { title: "Bold Colors", description: "From classic nudes to vibrant pops — express yourself." },
  { title: "Canadian Brand", description: "Proudly based in York, Ontario. Made for Canadians." },
];

const stats = [
  { value: "500+", label: "Happy Customers", icon: Heart },
  { value: "100%", label: "Cruelty Free", icon: Leaf },
  { value: "York, ON", label: "Canadian Made", icon: MapPin },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 bg-[#F0ECFB]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Image
            src="/logo.png"
            alt="Magic Lips"
            width={120}
            height={120}
            className="object-contain mx-auto mb-6"
            priority
            onError={(e) => { (e.target as HTMLImageElement).src = "/logo.svg"; }}
          />
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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-2 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#9D8EC4]/10 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-[#F0ECFB] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#9D8EC4]" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#1F2937]">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden bg-[#F0ECFB] border border-[#9D8EC4]/10">
              <Image src="/images/about-circle.png" alt="Magic Lips" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F2937] mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                The Magic Lips Story
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Magic Lips started with a simple belief: everyone deserves to feel glamorous. Our founder Junie created the brand from a passion for bold beauty and the power of a perfect lip gloss.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Based in York, Ontario, we hand-select every product — from high-shine glosses to precision liners and adorable keychain accessories.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Whether you want a subtle everyday shine or a bold statement, Magic Lips has what you need.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/shop" className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Shop Collection
                </Link>
                <Link href="/contact" className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#FCE7F3]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl p-6 sm:p-8 bg-white border border-[#9D8EC4]/10 text-center">
            <Image src="/logo.png" alt="Magic Lips" width={80} height={80} className="object-contain mx-auto mb-4" onError={(e) => { (e.target as HTMLImageElement).src = "/logo.svg"; }} />
            <h3 className="text-2xl font-bold text-[#1F2937] mb-1" style={{ fontFamily: "var(--font-dancing)" }}>Junie</h3>
            <p className="text-[#9D8EC4] text-sm font-semibold mb-3">Founder & Beauty Expert</p>
            <p className="text-gray-500 text-sm italic" style={{ fontFamily: "var(--font-playfair)" }}>
              &ldquo;Every lip deserves to shine with magic.&rdquo;
            </p>
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
            <Link href="/gallery" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white border border-white/40 hover:bg-white/10 transition-all duration-200">
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
