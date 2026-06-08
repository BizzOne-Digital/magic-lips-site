"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  const overlay = isHome && !scrolled;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navClass = overlay
    ? "text-white/90 hover:text-white hover:bg-white/10"
    : "text-gray-600 hover:text-[#6147A1]";

  const iconClass = overlay ? "text-white" : "text-gray-600";
  const iconHover = overlay ? "hover:bg-white/10" : "hover:bg-[#EBE6F7]";

  return (
    <>
      <div className="bg-[#6147A1] text-white text-center text-xs sm:text-sm py-2 px-4 relative z-[60]">
        New subscribers get 10% off their first order — use code <strong>MAGIC10</strong>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          overlay
            ? "bg-transparent border-b border-transparent shadow-none"
            : `bg-white border-b border-[#EBE6F7] ${scrolled ? "shadow-md" : "shadow-sm"}`
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Magic Lips"
              width={36}
              height={36}
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = "/logo.svg"; }}
            />
            <span
              className={`font-bold text-lg hidden sm:block ${overlay ? "text-white" : "text-[#6147A1]"}`}
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Magic Lips
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${navClass}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cart" className={`relative p-2 rounded-lg transition-colors duration-200 ${iconHover}`}>
              <ShoppingBag className={`w-5 h-5 ${iconClass}`} />
              {mounted && itemCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center ${overlay ? "bg-[#D4AF37] text-[#1F2937]" : "bg-[#6147A1]"}`}>
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {overlay ? (
              <>
                <Link
                  href="/shop"
                  className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-[#1F2937] bg-[#D4AF37] hover:bg-[#c9a430] transition-all duration-200"
                >
                  Shop Now
                </Link>
                <Link
                  href="/contact"
                  className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold text-white border border-white/35 bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link href="/contact" className="hidden sm:inline-flex btn-primary text-sm px-4 py-2">
                  Contact
                </Link>
                <Link href="/shop" className="hidden md:inline-flex btn-secondary text-sm px-4 py-2">
                  Shop
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${iconHover}`}
              aria-label="Menu"
            >
              {mobileOpen ? <X className={`w-5 h-5 ${iconClass}`} /> : <Menu className={`w-5 h-5 ${iconClass}`} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />
            <nav className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-[#EBE6F7] shadow-md z-50 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-[#EBE6F7] hover:text-[#6147A1] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-[#EBE6F7]"
              >
                Cart {mounted && itemCount > 0 ? `(${itemCount})` : ""}
              </Link>
            </nav>
          </>
        )}
      </header>
    </>
  );
}
