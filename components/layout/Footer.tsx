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
                suppressHydrationWarning
              />
              <button type="submit" className="w-full btn-primary text-sm py-2.5" suppressHydrationWarning>
                Subscribe & Save
              </button>
            </form>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/magiclips2013"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#6147A1] transition-colors duration-200"
              >
                {/* Instagram icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.74 2.014 2.081.673 3.422.09 5.264.005 7.119-.053 8.399-.067 8.808 0 12c0 3.192.014 3.601.072 4.881.085 1.855.668 3.697 2.009 5.038 1.341 1.341 3.183 1.924 5.038 2.009C8.399 23.986 8.808 24 12 24s3.601-.014 4.881-.072c1.855-.085 3.697-.668 5.038-2.009 1.341-1.341 1.924-3.183 2.009-5.038.058-1.28.072-1.689.072-4.881 0-3.192-.014-3.601-.072-4.881-.085-1.855-.668-3.697-2.009-5.038C20.578.74 18.736.157 16.881.072 15.601.014 15.192 0 12 0z"/>
                  <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://tiktok.com/@magiclips02"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#6147A1] transition-colors duration-200"
              >
                {/* TikTok icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
                </svg>
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
