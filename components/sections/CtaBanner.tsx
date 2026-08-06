import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";

type BannerData = {
  heading: string[];
  paragraph: string;
  checks?: string[];
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  image: string;
};

/**
 * Full-bleed image CTA banner (Stripe Sessions style). The image spans the full
 * max-width column edge-to-edge (flush to the frame rails, no vertical padding).
 * All content sits at the bottom: heading + paragraph bottom-left, a filled
 * white button bottom-right, over a bottom-heavy scrim for legibility.
 * Reused for the case-studies banner and the general banner below the process.
 */
export function CtaBanner({ data }: { data: BannerData }) {
  return (
    <Section tone="light" frameClassName="!py-0">
      <div className="frame-bleed relative overflow-hidden">
        {/* Background image */}
        <Image
          src={data.image}
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
          aria-hidden
        />
        {/* Bottom-heavy scrim so the bottom-anchored content reads */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
          aria-hidden
        />

        {/* Content pinned to the bottom: text left, button right */}
        <div className="relative flex min-h-[440px] flex-col justify-end p-10 md:p-14 lg:min-h-[480px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-display text-h2 font-medium leading-[1.1] tracking-tight text-balance text-white">
                {data.heading.join(" ")}
              </h2>
              <p className="mt-4 max-w-xl text-body-lg font-medium text-white/75">{data.paragraph}</p>
              {data.checks ? (
                <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {data.checks.map((check) => (
                    <li key={check} className="flex items-center gap-2 text-body font-medium text-white">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-bg">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M5 13l4 4 10-10" />
                        </svg>
                      </span>
                      {check}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap gap-3 self-start md:self-end">
              <Link
                href={data.cta.href}
                className="inline-flex items-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90"
              >
                {data.cta.label} <span aria-hidden>&rsaquo;</span>
              </Link>
              {data.ctaSecondary ? (
                <Link
                  href={data.ctaSecondary.href}
                  className="inline-flex items-center gap-2 rounded-[6px] border border-white/30 px-6 py-3 text-body font-medium text-white transition hover:bg-white/10"
                >
                  {data.ctaSecondary.label} <span aria-hidden>&rsaquo;</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
