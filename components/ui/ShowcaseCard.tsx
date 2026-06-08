"use client";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode, SyntheticEvent } from "react";
import { ArrowRight } from "lucide-react";

interface ShowcaseCardProps {
  href: string;
  image: string;
  title: string;
  description: string;
  imageAlt?: string;
  accent?: string;
  onImageError?: (e: SyntheticEvent<HTMLImageElement>) => void;
  badges?: ReactNode;
}

export default function ShowcaseCard({
  href,
  image,
  title,
  description,
  imageAlt,
  accent = "#7E6BAD",
  onImageError,
  badges,
}: ShowcaseCardProps) {
  return (
    <Link
      href={href}
      className="showcase-card group relative block overflow-hidden rounded-2xl sm:rounded-3xl min-h-[300px] sm:min-h-[380px] md:min-h-[480px] shadow-sm hover:shadow-xl transition-shadow duration-300"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <Image
        src={image}
        alt={imageAlt || title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        onError={onImageError}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {badges && (
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">{badges}</div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-7 z-10">
        <h3 className="text-white font-bold uppercase tracking-wide text-sm sm:text-base md:text-lg mb-2 sm:mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed line-clamp-4 mb-6">
          {description}
        </p>

        <span className="showcase-arrow-btn inline-flex items-center justify-center w-11 h-11 rounded-full bg-white shadow-md transition-all duration-300 group-hover:scale-110">
          <ArrowRight className="w-5 h-5 transition-colors duration-300" style={{ color: accent }} />
        </span>
      </div>
    </Link>
  );
}
