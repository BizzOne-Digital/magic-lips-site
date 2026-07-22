"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useSiteSettings, usePageContent } from "@/lib/useCmsContent";
import { PAGE_CONTENT_DEFAULTS } from "@/lib/pageContentDefaults";

type ContactCopy = {
  contactTitle?: string;
  contactSubtitle?: string;
  contactIntro?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  intro?: string;
  title?: string;
  subtitle?: string;
};

export default function ContactSection({ pageKey = "home" }: { pageKey?: "home" | "contact" }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { settings } = useSiteSettings();
  const defaults =
    pageKey === "contact"
      ? (PAGE_CONTENT_DEFAULTS.contact as unknown as ContactCopy)
      : (PAGE_CONTENT_DEFAULTS.home as unknown as ContactCopy);
  const { content } = usePageContent<ContactCopy>(pageKey, defaults);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-lg bg-white border border-[#9D8EC4]/20 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200";

  const noHydWarn = { suppressHydrationWarning: true } as const;
  const title = content.sectionTitle || content.contactTitle || "Contact Us";
  const subtitle = content.sectionSubtitle || content.contactSubtitle || "Have a question? We'd love to hear from you.";
  const intro = content.intro || content.contactIntro || "We're here to help with product questions, orders, and anything beauty-related.";
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  return (
    <section id="contact" className="py-10 sm:py-14 bg-[#F0ECFB]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            {title}
          </h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <p className="text-gray-600 text-sm leading-relaxed">{intro}</p>

            {[
              { icon: Phone, label: "Phone", value: settings.phone, href: phoneHref },
              { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
              { icon: MapPin, label: "Address", value: settings.address, href: null as string | null },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#9D8EC4]/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-[#9D8EC4]" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-gray-700 hover:text-[#9D8EC4] text-sm transition-colors duration-200">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 sm:p-6 border border-[#9D8EC4]/10 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Name *</label>
                <input {...noHydWarn} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Email *</label>
                <input {...noHydWarn} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Phone</label>
              <input {...noHydWarn} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Message *</label>
              <textarea {...noHydWarn} required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full gap-2" {...noHydWarn}>
              <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
