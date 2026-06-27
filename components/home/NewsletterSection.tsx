"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

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

  return (
    <section
      id="newsletter"
      className="relative z-10 py-10 sm:py-14 bg-gradient-to-b from-white via-[#F0ECFB]/50 to-[#FCE7F3]/40"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center animate-fade-in">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-white/80 text-[#9D8EC4] border border-[#9D8EC4]/20">
          Exclusive Offer
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Get <span className="text-[#9D8EC4]">10% Off</span> Your First Order
        </h2>
        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
          Subscribe with your email and save on your first purchase.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-[#9D8EC4]/20 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200"
                required
                suppressHydrationWarning
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary px-6 py-3 text-sm whitespace-nowrap disabled:opacity-60" suppressHydrationWarning>
              {loading ? "Joining..." : "Subscribe & Save"}
            </button>
          </form>
        ) : (
          <div className="max-w-sm mx-auto rounded-xl p-6 bg-white border border-[#9D8EC4]/20 shadow-sm">
            <h3 className="text-lg font-bold text-[#1F2937] mb-1">You&apos;re subscribed!</h3>
            <p className="text-gray-500 text-sm mb-4">Your discount code:</p>
            <p className="text-2xl font-bold tracking-widest font-mono text-[#9D8EC4] mb-2">{discountCode}</p>
            <p className="text-gray-400 text-xs">Use at checkout for 10% off your first order.</p>
          </div>
        )}

        <p className="text-gray-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
