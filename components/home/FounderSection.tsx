import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="py-10 sm:py-14 bg-[#FDF6F9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Image */}
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#9D8EC4]/10">
              <Image
                src="/images/founder-story.jpg"
                alt="Magic Lips founder — where gloss meets confidence"
                width={800}
                height={900}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-[55%]">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#9D8EC4] mb-3 block">
              Our Story
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#1F2937] leading-[1.18] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Where gloss meets<br className="hidden sm:block" /> confidence.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              My goal is to create lip glosses that make people feel confident, comfortable, and unique.
              Every idea, color, and detail is chosen with care. Because I believe beauty should be fun,
              inspiring, and personal. This business is not just about selling lip gloss. It&apos;s about
              turning a dream into reality and encouraging others to shine in their own way.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
