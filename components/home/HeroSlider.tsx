"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "Magic Lips | Premium Lip Beauty",
    title: "Glossy Looks Made Simple",
    subtitle: "Shop lip gloss, liners, and cute keychain gloss from Magic Lips — soft shine, everyday confidence.",
    btn: "Shop Now",
    btnSecondary: "Explore Shop",
    href: "/shop",
    hrefSecondary: "/shop",
    image: "/images/hero-slide-1-welcome.png",
    overlay: "linear-gradient(105deg, rgba(97,71,161,0.90) 0%, rgba(126,107,173,0.75) 45%, rgba(126,107,173,0.42) 100%)",
  },
  {
    id: 2,
    tag: "Exclusive Offer | Subscribe & Save",
    title: "10% Off Your First Order",
    subtitle: "Subscribe with your email and save on your first purchase. Join our beauty list today.",
    btn: "Subscribe & Save",
    btnSecondary: "View Offers",
    href: "/#newsletter",
    hrefSecondary: "/offers",
    image: "/images/hero-slide-2-offer.png",
    overlay: "linear-gradient(105deg, rgba(110,85,170,0.90) 0%, rgba(126,107,173,0.74) 50%, rgba(219,39,119,0.28) 100%)",
  },
  {
    id: 3,
    tag: "Bundle Deal | Save on Lip Essentials",
    title: "Gloss + Liner Bundle",
    subtitle: "Buy lip gloss and liner together and get the liner for only $5. The perfect lip duo.",
    btn: "View Offer",
    btnSecondary: "Shop All",
    href: "/offers",
    hrefSecondary: "/shop",
    image: "/images/hero-slide-4-bundle.png",
    overlay: "linear-gradient(105deg, rgba(97,71,161,0.87) 0%, rgba(168,146,208,0.65) 50%, rgba(126,107,173,0.35) 100%)",
  },
  {
    id: 4,
    tag: "Our Collection | Lip Gloss & More",
    title: "Your Destination for Lip Beauty",
    subtitle: "Discover glosses, liners, keychain gloss, and bundles — crafted for a clean, polished look.",
    btn: "Shop Collection",
    btnSecondary: "About Us",
    href: "/shop",
    hrefSecondary: "/about",
    image: "/images/hero-slide-3-collection.png",
    overlay: "linear-gradient(105deg, rgba(97,71,161,0.89) 0%, rgba(126,107,173,0.70) 48%, rgba(59,130,246,0.28) 100%)",
  },
];

export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [fade, setFade] = useState(true);

  const go = useCallback((dir: 1 | -1) => {
    setFade(false);
    setTimeout(() => {
      setCur((c) => (c + dir + slides.length) % slides.length);
      setFade(true);
    }, 250);
  }, []);

  const goTo = useCallback((index: number) => {
    if (index === cur) return;
    setFade(false);
    setTimeout(() => {
      setCur(index);
      setFade(true);
    }, 250);
  }, [cur]);

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [go]);

  const slide = slides[cur];

  return (
    <section className="relative -mt-16 overflow-hidden min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center pb-8 sm:pb-10">
      {/* Background image */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === cur && fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              className="object-cover object-center scale-105"
              priority={i === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: s.overlay }} />
          </div>
        ))}
      </div>

      {/* Bottom fade — merges hero into white section below */}
      <div
        className="absolute inset-x-0 bottom-0 z-[5] h-[45%] min-h-[160px] max-h-[280px] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.85) 75%, #ffffff 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/90 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-5 sm:mb-6 backdrop-blur-sm">
          {slide.tag}
        </span>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white mb-4 sm:mb-5 leading-[1.15] max-w-2xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {slide.title}
        </h1>

        <p className="text-white/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-7 sm:mb-9">
          {slide.subtitle}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-sm font-semibold text-[#1F2937] bg-[#D4AF37] hover:bg-[#c9a430] transition-all duration-200 shadow-sm"
          >
            {slide.btn}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={slide.hrefSecondary}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-sm font-semibold text-white bg-white/15 border border-white/35 hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
          >
            {slide.btnSecondary}
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/15 border border-white/25 text-white hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/15 border border-white/25 text-white hover:bg-white/25 backdrop-blur-sm transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-200 ${
              i === cur ? "w-7 bg-[#6147A1]" : "w-2 bg-[#6147A1]/35 hover:bg-[#6147A1]/55"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
