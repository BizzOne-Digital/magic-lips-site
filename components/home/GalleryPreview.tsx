"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { resolveGalleryMedia, toStaticGallery, type GalleryMediaItem } from "@/lib/galleryImages";

const PREVIEW_COUNT = 6;

export default function GalleryPreview() {
  const [items, setItems] = useState<GalleryMediaItem[]>(() => toStaticGallery(PREVIEW_COUNT));

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setItems(resolveGalleryMedia(d.media, PREVIEW_COUNT)))
      .catch(() => setItems(toStaticGallery(PREVIEW_COUNT)));
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#DBEAFE]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Beauty Gallery
          </h2>
          <p className="text-gray-500 text-sm">A glimpse into the Magic Lips world</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {items.map((item) => (
            <Link
              key={item._id}
              href="/gallery"
              className="group aspect-square rounded-xl overflow-hidden relative border border-[#9D8EC4]/10 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {item.url && (
                <Image
                  src={item.url}
                  alt={item.title || "Gallery"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              )}
              {item.title && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/gallery" className="btn-secondary gap-2">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
