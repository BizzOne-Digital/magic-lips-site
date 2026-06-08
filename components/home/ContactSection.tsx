"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

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

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#F0ECFB]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Contact Us
          </h2>
          <p className="text-gray-500 text-sm">Have a question? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <p className="text-gray-600 text-sm leading-relaxed">
              We&apos;re here to help with product questions, orders, and anything beauty-related.
            </p>

            {[
              { icon: Phone, label: "Phone", value: "+1 647 495 0299", href: "tel:+16474950299" },
              { icon: Mail, label: "Email", value: "magiclips2013@gmail.com", href: "mailto:magiclips2013@gmail.com" },
              { icon: MapPin, label: "Address", value: "3735 Dundas St W, York, ON M6S 2T6, Canada", href: null },
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
                <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} required />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Phone</label>
                <input type="tel" placeholder="Your phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Email *</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} required />
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Message *</label>
              <textarea placeholder="How can we help?" value={form.message} rows={4} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputCls} resize-none`} required />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 gap-2 disabled:opacity-60">
              {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
