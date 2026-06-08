"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Tag } from "lucide-react";
import toast from "react-hot-toast";

export default function OfferStrip() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

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
        setCode(data.code || "MAGIC10");
        setEmail("");
        toast.success("You're in! Check your discount code below ✨");
      } else {
        toast.error(data.error || "Already subscribed or invalid email");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-5 px-4">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #4a3482 0%, #6147A1 35%, #1e3a8a 65%, #7E6BAD 100%)",
        }}
      />
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Offer copy */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-yellow-200" />
            </motion.div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-400/20 border border-yellow-300/40 text-yellow-100 text-[10px] font-bold uppercase tracking-wider">
                  <Tag className="w-3 h-3" /> New Subscriber Offer
                </span>
                <span className="text-white/90 text-sm font-semibold">
                  Get <span className="text-yellow-200 font-bold">10% OFF</span> your first order
                </span>
              </div>
              <p className="text-white/60 text-xs sm:text-sm">
                Join the Magic Lips beauty list — use code{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/15 border border-white/20 text-yellow-200 font-mono font-bold text-xs tracking-wider">
                  MAGIC10
                </span>{" "}
                at checkout
              </p>
            </div>
          </div>

          {/* Email form or success code */}
          {!code ? (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col sm:flex-row gap-2 flex-shrink-0"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-yellow-300/50 focus:bg-white/15 transition-all backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-sm font-bold text-purple-900 bg-gradient-to-r from-yellow-200 via-yellow-100 to-amber-200 hover:from-yellow-100 hover:to-yellow-200 shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Joining..." : "Subscribe & Save ✨"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/15 border border-yellow-300/30 backdrop-blur-sm"
            >
              <span className="text-white/80 text-sm">Your code:</span>
              <span className="text-yellow-200 font-mono font-bold text-lg tracking-widest">{code}</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
