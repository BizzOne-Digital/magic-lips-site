"use client";

import ContactSection from "@/components/home/ContactSection";
import { usePageContent } from "@/lib/useCmsContent";
import { PAGE_CONTENT_DEFAULTS } from "@/lib/pageContentDefaults";

type ContactPageContent = {
  title: string;
  subtitle: string;
};

export default function ContactPage() {
  const { content } = usePageContent<ContactPageContent>(
    "contact",
    PAGE_CONTENT_DEFAULTS.contact as unknown as ContactPageContent
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 bg-[#F0ECFB]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            {content.title}
          </h1>
          <p className="text-gray-500 text-sm">{content.subtitle}</p>
        </div>
      </section>
      <ContactSection pageKey="contact" />
    </div>
  );
}
