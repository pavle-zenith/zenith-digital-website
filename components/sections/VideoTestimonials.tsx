"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { videoTestimonials } from "@/content/home";

/**
 * Video testimonials on a faint textured navy background with the white hairline
 * frame. Heading left, intro right, then 3 portrait cards: company logo top-left,
 * play button top-right, the person's video/poster filling the card, and a bottom
 * panel with the quote, name + verified check, and role - company. Clicking a card
 * opens a blurred full-screen overlay that plays the portrait video (placeholders
 * until real posters/videos land).
 */
export function VideoTestimonials() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const activeItem = active !== null ? videoTestimonials.items[active] : null;

  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/bg-texture.png"
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
      </div>

      <Section tone="dark" className="bg-transparent" frameClassName="!py-20">
        {/* Header: heading left, intro right */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {videoTestimonials.heading}
          </h2>
          <p className="text-body-lg font-medium text-text-muted">{videoTestimonials.intro}</p>
        </div>

        {/* 3 portrait cards — taller */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {videoTestimonials.items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(i)}
              className="group relative flex aspect-[3/4.4] flex-col overflow-hidden rounded-[8px] border border-border text-left"
            >
              {/* Poster / video first-frame area */}
              {item.poster ? (
                <Image
                  src={item.poster}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : item.video ? (
                <video
                  src={item.video}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  aria-hidden
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-surface-2 to-surface" />
              )}

              {/* Legibility gradient — hard at the bottom for the text, clear up top.
                  Base #010020 matches the case-study panel gradient. */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#010020] via-[#010020]/80 to-transparent" />

              {/* Top row: logo left, play right */}
              <div className="relative flex items-start justify-between p-5">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={160}
                    height={40}
                    className="h-7 w-auto object-contain"
                  />
                ) : (
                  <span className="font-display font-medium">{item.company}</span>
                )}
                <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-black/40 backdrop-blur transition group-hover:bg-black/60">
                  <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
                </span>
              </div>

              {/* Bottom panel: quote, name + check, role - company */}
              <div className="relative mt-auto flex flex-col gap-4 p-5">
                <p className="text-body leading-relaxed">{item.quote}</p>
                <div>
                  <div className="flex items-center gap-1.5 font-display text-body-lg font-medium">
                    {item.name}
                    <VerifiedCheck />
                  </div>
                  <div className="text-body text-text-muted">
                    {item.role} - {item.company}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Blurred video overlay */}
      {activeItem ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-xl"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-text hover:bg-white/10"
            onClick={() => setActive(null)}
          >
            ✕
          </button>
          <div
            className="relative aspect-[9/16] h-[80vh] max-w-full overflow-hidden rounded-[8px] border border-white/15 bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.video ? (
              <video src={activeItem.video} controls autoPlay playsInline className="h-full w-full object-cover" />
            ) : activeItem.poster ? (
              <Image src={activeItem.poster} alt={activeItem.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                <div className="font-display text-h3 font-medium">{activeItem.name}</div>
                <div className="text-body text-text-muted">{activeItem.company}</div>
                <p className="mt-4 text-body text-text-muted">Video testimonial coming soon.</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VerifiedCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 text-text"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" />
    </svg>
  );
}
