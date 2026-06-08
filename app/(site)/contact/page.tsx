import ContactSection from "@/components/home/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 bg-[#F0ECFB]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Get In Touch
          </h1>
          <p className="text-gray-500 text-sm">We&apos;d love to hear from you.</p>
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
