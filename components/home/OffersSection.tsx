"use client";
import { useState } from "react";
import Link from "next/link";
import NewsletterModal from "@/components/ui/NewsletterModal";

const offers = [
  {
    badge: "Newsletter",
    title: "10% Off First Order",
    description: "Subscribe to our beauty list and receive a 10% discount code for your first order.",
    cta: "Subscribe & Save",
    link: null, // opens modal
    bg: "bg-[#F0ECFB]",
  },
  {
    badge: "Bundle Deal",
    title: "Gloss + Liner Bundle",
    description: "Buy Magic Lip Gloss ($12) and get a Lip Liner for just $5. The perfect lip duo!",
    cta: "View Offer",
    link: "/shop?category=bundles",
    bg: "bg-[#FCE7F3]",
  },
  {
    badge: "Free Shipping",
    title: "Free on Orders $30+",
    description: "Orders over $30 across Canada ship free. Add a little extra and save on delivery!",
    cta: "Shop Now",
    link: "/shop",
    bg: "bg-[#DBEAFE]",
  },
];

export default function OffersSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <NewsletterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Exclusive Offers
            </h2>
            <p className="text-gray-500 text-sm">Beautiful products at even better prices</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <article
                key={offer.title}
                className={`${offer.bg} rounded-xl p-6 border border-[#9D8EC4]/10 hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex flex-col h-full`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[#9D8EC4]">
                  {offer.badge}
                </span>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                  {offer.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{offer.description}</p>
                {offer.link === null ? (
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-sm font-semibold text-[#9D8EC4] hover:underline text-left cursor-pointer"
                  >
                    {offer.cta} →
                  </button>
                ) : (
                  <Link href={offer.link} className="text-sm font-semibold text-[#9D8EC4] hover:underline">
                    {offer.cta} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
