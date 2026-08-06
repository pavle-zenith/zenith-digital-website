import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { quoteBand } from "@/content/book-a-call";

type QuoteItem = {
  quote: string;
  placeholder?: boolean;
  name: string;
  role: string;
  avatar: string;
  logo: string;
  logoAlt: string;
  logoClass?: string;
};

type QuoteBandData = {
  heading: string;
  items: QuoteItem[];
  link?: { label: string; href: string };
};

/**
 * Testimonial band — dark section on the faint navy texture. Three quote cards
 * in the shared hairline grid (white logo top, quote, avatar + name with a
 * verified tick + role pinned bottom). Defaults to the /book-a-call picks;
 * other pages (e.g. /case-studies) pass their own `data`.
 */
export function QuoteBand({ data = quoteBand }: { data?: QuoteBandData }) {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Faint texture background (same register as pricing / video testimonials) */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/bg-texture.png"
          alt=""
          fill
          className="object-cover opacity-[0.14]"
          aria-hidden
        />
      </div>

      <Section tone="dark" className="bg-transparent" frameClassName="!py-24">
        <h2 className="mx-auto mb-12 max-w-2xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-3">
          {data.items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col bg-surface bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent p-8"
            >
              <Image
                src={item.logo}
                alt={item.logoAlt}
                width={160}
                height={40}
                className={cn(
                  "w-auto self-start object-contain",
                  "logoClass" in item && item.logoClass ? item.logoClass : "h-5",
                )}
              />
              {"placeholder" in item && item.placeholder ? (
                <p className="mt-8 text-body-lg italic leading-snug text-text-muted">
                  {item.quote}
                </p>
              ) : (
                <blockquote className="mt-8 text-body-lg leading-snug text-text">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              )}
              <figcaption className="mt-auto flex items-center gap-3 pt-8">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[6px] border border-border">
                  <Image src={item.avatar} alt={item.name} fill sizes="44px" className="object-cover" />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-display font-medium">
                    {item.name}
                    <VerifiedCheck />
                  </span>
                  <span className="block text-body text-text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {data.link ? (
          <p className="mt-10 text-center">
            <Link
              href={data.link.href}
              className="group inline-flex items-center gap-2 font-display font-medium transition hover:text-text-muted"
            >
              {data.link.label} <span aria-hidden className="btn-arrow">&rarr;</span>
            </Link>
          </p>
        ) : null}
      </Section>
    </div>
  );
}

/** Scalloped verified badge (same mark as the video testimonial cards). */
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
