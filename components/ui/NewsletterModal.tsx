"use client";
import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok || data.code) {
        setSubscribed(true);
        setDiscountCode(data.code || "MAGIC LIPS 12");
        toast.success("Welcome to Magic Lips!");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-white via-[#F0ECFB]/60 to-[#FCE7F3]/40 rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#F0ECFB] transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {!subscribed ? (
          <>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#9D8EC4]/30 text-[#6147A1] text-[10px] font-bold uppercase tracking-widest mb-5">
              Exclusive Offer
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-3 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Get <span className="text-[#9D8EC4]">10% Off</span> Your First Order
            </h2>
            <p className="text-gray-500 text-sm mb-7 max-w-xs mx-auto">
              Subscribe with your email and save on your first purchase.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-[#9D8EC4]/20 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200"
                  required
                  suppressHydrationWarning
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-3 text-sm whitespace-nowrap rounded-full disabled:opacity-60"
                suppressHydrationWarning
              >
                {loading ? "Joining..." : "Subscribe & Save"}
              </button>
            </form>

            <p className="text-gray-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              You&apos;re subscribed!
            </h3>
            <p className="text-gray-500 text-sm mb-4">Your exclusive discount code:</p>
            <p className="text-2xl font-bold tracking-widest font-mono text-[#6147A1] mb-2">{discountCode}</p>
            <p className="text-gray-400 text-xs mb-6">Use at checkout for 10% off your first order.</p>
            <button
              onClick={onClose}
              className="btn-primary px-8 py-2.5 text-sm"
            >
              Start Shopping
            </button>
          </>
        )}
      </div>
    </div>
  );
}
