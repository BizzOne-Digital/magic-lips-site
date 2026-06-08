import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magic Lips — Premium Lip Gloss & Beauty",
  description:
    "Shop premium lip gloss, lip liners, and keychain gloss accessories at Magic Lips. Bold, glamorous, magical beauty for every look.",
  keywords: "lip gloss, lip liner, magic lips, beauty, makeup, keychain gloss, Toronto",
  openGraph: {
    title: "Magic Lips — Premium Lip Gloss & Beauty",
    description: "Bold, glamorous, magical beauty.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dancing.variable}`}>
      <body className="bg-white text-gray-900 font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "white",
              color: "#1e1a2e",
              border: "1px solid rgba(196,181,253,0.4)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(196,181,253,0.25)",
            },
            success: {
              iconTheme: { primary: "#7E6BAD", secondary: "white" },
            },
          }}
        />
      </body>
    </html>
  );
}
