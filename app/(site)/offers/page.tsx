"use client";
import { useState } from "react";
import Link from "next/link";
import NewsletterModal from "@/components/ui/NewsletterModal";
import NewsletterSection from "@/components/home/NewsletterSection";
import { usePageContent } from "@/lib/useCmsContent";
import { PAGE_CONTENT_DEFAULTS, OfferCardContent } from "@/lib/pageContentDefaults";

type OffersPageContent = {
  title: string;
  subtitle: string;
  cards: OfferCardContent[];
};

export default function OffersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content } = usePageContent<OffersPageContent>(
    "offers",
    PAGE_CONTENT_DEFAULTS.offers as unknown as OffersPageContent
  );
  const offers = Array.isArray(content.cards) ? content.cards : [];

  return (
    <div className="min-h-screen bg-white">
      <NewsletterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#F0ECFB] to-[#FCE7F3]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            {content.title}
          </h1>
          <p className="text-gray-500 text-sm">{content.subtitle}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          {offers.map((offer) => {
            const details = (offer.details || "")
              .split("\n")
              .map((d) => d.trim())
              .filter(Boolean);
            const link = (offer.link || "").trim();
            return (
              <article key={offer.title} className={`${offer.bg || "bg-[#F0ECFB]"} rounded-xl p-6 border border-[#9D8EC4]/10 hover:shadow-md transition-all duration-200`}>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9D8EC4] block mb-2">{offer.badge}</span>
                <h2 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{offer.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                {details.length > 0 && (
                  <ul className="space-y-1 mb-5">
                    {details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-gray-500 text-sm">
                        <span className="text-[#9D8EC4]">✓</span> {d}
                      </li>
                    ))}
                  </ul>
                )}
                {!link ? (
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="btn-primary text-sm px-6"
                  >
                    {offer.cta}
                  </button>
                ) : (
                  <Link href={link} className="btn-primary text-sm px-6">
                    {offer.cta}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}
