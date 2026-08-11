"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
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
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        className="bg-transparent"
        frameClassName="!py-12 md:!py-20"
      >
        {/* Header: heading left, intro right */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {videoTestimonials.heading}
          </h2>
          <p className="text-body-lg font-medium text-text-muted">
            {videoTestimonials.intro}
          </p>
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
                  <span className="font-display font-medium">
                    {item.company}
                  </span>
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
              <video
                src={activeItem.video}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : activeItem.poster ? (
              <Image
                src={activeItem.poster}
                alt={activeItem.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8 text-center">
                <div className="font-display text-h3 font-medium">
                  {activeItem.name}
                </div>
                <div className="text-body text-text-muted">
                  {activeItem.company}
                </div>
                <p className="mt-4 text-body text-text-muted">
                  Video testimonial coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

