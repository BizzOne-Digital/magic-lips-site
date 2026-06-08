"use client";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function SiteEffects({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
