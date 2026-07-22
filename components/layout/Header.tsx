"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useSiteSettings } from "@/lib/useCmsContent";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const { settings } = useSiteSettings();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {settings.announcementBarActive && settings.announcementBarText && (
        <div className="bg-[#6147A1] text-white text-center text-xs sm:text-sm py-2 px-4">
          {settings.announcementBarText}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#EBE6F7] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src={settings.logoUrl || "/logo.png"}
              alt={settings.businessName || "Magic Lips"}
              width={36}
              height={36}
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = "/logo.svg"; }}
            />
            <span
              className="font-bold text-lg hidden sm:block text-[#6147A1]"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              {settings.businessName || "Magic Lips"}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#6147A1] bg-[#EBE6F7]"
                    : "text-gray-600 hover:text-[#6147A1] hover:bg-[#EBE6F7]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-[#EBE6F7] transition-colors duration-200">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#6147A1] text-white text-[9px] font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <Link href="/contact" className="hidden sm:inline-flex btn-primary text-sm px-4 py-2">
              Contact
            </Link>
            <Link href="/shop" className="hidden md:inline-flex btn-secondary text-sm px-4 py-2">
              Shop
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#EBE6F7] transition-colors duration-200"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />
            <nav className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 lg:hidden flex flex-col pt-20 pb-6 px-4 overflow-y-auto">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#EBE6F7]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 mb-1 ${
                    pathname === link.href
                      ? "text-[#6147A1] bg-[#EBE6F7]"
                      : "text-gray-700 hover:bg-[#EBE6F7] hover:text-[#6147A1]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#EBE6F7] mt-1"
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
