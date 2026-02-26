"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaModal } from "@/components/media-modal";
import type { MediaItem } from "@/data/experience";

interface Props {
  items: MediaItem[];
}

export function MediaGallery({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-border transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 focus-visible:outline-accent"
          >
            {item.type === "video" ? (
              <>
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="h-full w-full object-cover"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a0a0a" stroke="none">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <Image
                src={item.src}
                alt={item.alt || ""}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized={item.src.endsWith(".svg") || item.src.endsWith(".gif")}
              />
            )}

            {/* Expand icon */}
            <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" x2="14" y1="3" y2="10" />
                <line x1="3" x2="10" y1="21" y2="14" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <MediaModal
        items={items}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((c) => c !== null ? (c - 1 + items.length) % items.length : null)}
        onNext={() => setActiveIndex((c) => c !== null ? (c + 1) % items.length : null)}
      />
    </>
  );
}
