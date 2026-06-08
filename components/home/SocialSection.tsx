"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const socialPosts = [
  { image: "/images/social-1-gloss-drop.png",      label: "New gloss drop! ✨",        alt: "Magic Lips lip gloss drop" },
  { image: "/images/social-2-behind-scenes.png", label: "Behind the scenes 💖",     alt: "Magic Lips behind the scenes sparkle" },
  { image: "/images/social-3-liner-look.png",    label: "Perfect liner look",       alt: "Magic Lips lip liner pencil" },
  { image: "/images/social-4-keychain.png",      label: "Keychain gloss cuteness",  alt: "Magic Lips keychain gloss" },
  { image: "/images/social-5-shine-bright.png",  label: "Shine bright collection",  alt: "Magic Lips sparkle shine collection" },
  { image: "/images/social-6-gloss-obsessed.png", label: "Gloss obsessed 💜",       alt: "Magic Lips glossy lips" },
];

export default function SocialSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07051A] to-[#0F0A2E]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pink-500/30 text-pink-300 text-sm mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Follow Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Our <span className="text-gradient">Social World</span>
          </h2>
          <p className="text-white/50">
            Follow us for daily beauty inspiration, new drops, and behind-the-scenes content.
          </p>
        </motion.div>

        {/* Social platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <a
              href="https://instagram.com/magiclips2013"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-5 sm:p-6 overflow-hidden border border-pink-500/20 hover:border-pink-500/50 transition-all hover:shadow-[0_0_40px_rgba(249,168,212,0.2)] flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              style={{ background: "linear-gradient(135deg, rgba(131,58,180,0.2) 0%, rgba(253,29,29,0.1) 50%, rgba(252,176,69,0.1) 100%)" }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">@magiclips2013</h3>
                <p className="text-white/50 text-sm">Follow us on Instagram for daily lip gloss inspo!</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
            </a>
          </motion.div>

          {/* TikTok */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <a
              href="https://tiktok.com/@magiclips02"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl p-5 sm:p-6 overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-[0_0_40px_rgba(157,142,196,0.2)] flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(50,0,100,0.3) 100%)" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">@magiclips02</h3>
                <p className="text-white/50 text-sm">Watch our beauty tutorials and new product reveals on TikTok!</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" />
            </a>
          </motion.div>
        </div>

        {/* Mock feed grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3"
        >
          {socialPosts.map((post) => (
            <div
              key={post.image}
              className="aspect-square rounded-xl border border-white/10 overflow-hidden relative shadow-sm select-none"
              aria-hidden
            >
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 768px) 33vw, 16vw"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
