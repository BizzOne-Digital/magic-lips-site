"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { resolveGalleryMedia, toStaticGallery, type GalleryMediaItem } from "@/lib/galleryImages";

export default function GalleryPage() {
  const [media, setMedia] = useState<GalleryMediaItem[]>(() => toStaticGallery());

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setMedia(resolveGalleryMedia(d.media)))
      .catch(() => setMedia(toStaticGallery()));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-16 bg-[#DBEAFE]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Beauty Gallery
          </h1>
          <p className="text-gray-500 text-sm">A glimpse into the Magic Lips world</p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <div
                key={item._id}
                className="group aspect-square rounded-xl overflow-hidden relative border border-[#9D8EC4]/10 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {item.url && item.type === "video" ? (
                  <video src={item.url} className="w-full h-full object-cover" muted loop playsInline />
                ) : item.url ? (
                  <Image
                    src={item.url}
                    alt={item.title || "Gallery"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : null}
                {item.title && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
