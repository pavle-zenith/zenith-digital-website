import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
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
        frameClassName="!py-14 md:!py-24"
      >
        <h2 className="mx-auto mb-8 md:mb-12 max-w-2xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-3">
          {data.items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col bg-surface p-8"
            >
              <Image
                src={item.logo}
                alt={item.logoAlt}
                width={160}
                height={40}
                className={cn(
                  "w-auto self-start object-contain",
                  "logoClass" in item && item.logoClass
                    ? item.logoClass
                    : "h-5",
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
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-display font-medium">
                    {item.name}
                    <VerifiedCheck />
                  </span>
                  <span className="block text-body text-text-muted">
                    {item.role}
                  </span>
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
              {data.link.label}{" "}
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </Link>
          </p>
        ) : null}
      </Section>
    </div>
  );
}

