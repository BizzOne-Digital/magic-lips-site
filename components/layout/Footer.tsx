"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok || data.code) {
        toast.success(`Subscribed! Your code: ${data.code || "MAGIC10"}`);
        setEmail("");
      } else {
        toast.error(data.error || "Already subscribed");
      }
    } catch {
      toast.error("Could not subscribe. Try again.");
    }
  };

  return (
    <footer className="bg-[#F0ECFB] border-t border-[#9D8EC4]/10 text-[#1F2937]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Magic Lips" width={40} height={40} className="object-contain" />
              <span className="font-bold text-lg text-[#9D8EC4]" style={{ fontFamily: "var(--font-dancing)" }}>
                Magic Lips
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your premier destination for premium lip beauty.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#9D8EC4] mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="mailto:magiclips2013@gmail.com" className="flex items-center gap-2 hover:text-[#9D8EC4] transition-colors duration-200">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  magiclips2013@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+16474950299" className="flex items-center gap-2 hover:text-[#9D8EC4] transition-colors duration-200">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +1 647 495 0299
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>3735 Dundas St W, York, ON M6S 2T6, Canada</span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#9D8EC4] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#9D8EC4] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + social */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#9D8EC4] mb-4">Stay in Touch</h3>
            <form onSubmit={handleSubscribe} className="space-y-2 mb-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm border border-[#9D8EC4]/20 bg-white focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200"
                required
              />
              <button type="submit" className="w-full btn-primary text-sm py-2.5">
                Subscribe & Save
              </button>
            </form>
            <div className="flex gap-3 text-sm">
              <a href="https://instagram.com/magiclips2013" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#9D8EC4] transition-colors duration-200">
                Instagram
              </a>
              <a href="https://tiktok.com/@magiclips02" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#9D8EC4] transition-colors duration-200">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#9D8EC4]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Magic Lips. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-[#9D8EC4] transition-colors duration-200">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
