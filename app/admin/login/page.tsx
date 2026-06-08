"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.token) localStorage.setItem("admin_token", data.token);
        toast.success("Welcome back!");
        router.push("/admin/dashboard");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07051A] via-[#1E1050] to-[#07051A] flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(157,142,196,0.8) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(29,78,216,0.8) 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md px-4 sm:px-6"
      >
        <div className="glass-dark rounded-3xl p-10 border border-purple-500/30 shadow-[0_0_60px_rgba(157,142,196,0.3)]">
          <div className="text-center mb-8">
            <Image
              src="/logo.png"
              alt="Magic Lips"
              width={120}
              height={120}
              className="mx-auto mb-4 object-contain drop-shadow-[0_0_24px_rgba(168,85,247,0.5)]"
              priority
              onError={(e) => { (e.target as HTMLImageElement).src = "/logo.svg"; }}
            />
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Admin Panel</h1>
            <p className="text-white/40 text-sm mt-1">Magic Lips Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-all"
                  placeholder="admin@magiclips.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-4 mt-2 disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <><Lock className="w-4 h-4 mr-2" /> Sign In</>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
