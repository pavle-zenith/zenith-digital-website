import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn } from "@/lib/utils";
import {
  INDUSTRIES,
  caseStudyCards,
  detailSlugs,
} from "@/content/case-studies";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Proof — dark, textured. Two case cards pulled from the shared case-study
 * data (never duplicated here) plus one matching testimonial. Cards link to
 * the detail page where one has shipped and to the live site until then.
 */
export function ServicePageProof({ data }: { data: ServicePageContent }) {
  const cases = data.proof.caseSlugs
    .map((slug) => caseStudyCards.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const { testimonial } = data.proof;

  return (
    <div className="relative isolate overflow-hidden">
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
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {data.proof.heading}
          </h2>
          <p className="max-w-md text-body-lg font-medium text-text-muted md:justify-self-end md:text-right">
            {data.proof.intro}
          </p>
        </div>

        {cases.length > 0 ? (
          <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
            {cases.map((c) => {
              const href = detailSlugs.has(c.slug)
                ? `/case-studies/${c.slug}`
                : c.liveUrl;
              const body = (
                <>
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface">
                    {c.thumb ? (
                      <Image
                        src={c.thumb}
                        alt={`${c.client} website`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                      />
                    ) : c.logo ? (
                      <div className="flex h-full w-full items-center justify-center">
                        <Image
                          src={c.logo}
                          alt={c.client}
                          width={220}
                          height={56}
                          className="h-8 w-auto max-w-[60%] object-contain opacity-90"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-body-lg font-medium">
                        {c.client}
                      </h3>
                      <span className="shrink-0 font-mono text-label uppercase track-label text-text-muted">
                        {INDUSTRIES[c.industry]}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-3 font-display text-h3 font-medium leading-tight",
                        c.metricPending && "italic text-text-muted",
                      )}
                    >
                      {c.metricIsQuote ? (
                        <>&ldquo;{c.metric}&rdquo;</>
                      ) : (
                        c.metric
                      )}
                    </p>
                    <p className="mt-2 text-body leading-snug text-text-muted">
                      {c.story}
                    </p>
                  </div>
                </>
              );

              const shell =
                "group flex flex-col overflow-hidden rounded-card border border-border bg-bg/60 backdrop-blur-md";

              if (!href) {
                return (
                  <article key={c.slug} className={shell}>
                    {body}
                  </article>
                );
              }
              return href.startsWith("/") ? (
                <Link key={c.slug} href={href} className={shell}>
                  {body}
                </Link>
              ) : (
                <a
                  key={c.slug}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className={shell}
                >
                  {body}
                </a>
              );
            })}
          </div>
        ) : null}

        <figure className="mt-12 border-t border-border pt-10 md:mt-16">
          <blockquote className="max-w-3xl font-display text-h3 font-medium leading-snug tracking-tight">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            {testimonial.avatar ? (
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[6px] border border-border">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
            ) : null}
            <span>
              <span className="flex items-center gap-1.5 font-display font-medium">
                {testimonial.name}
                <VerifiedCheck />
              </span>
              <span className="block text-body text-text-muted">
                {testimonial.role}
              </span>
            </span>
          </figcaption>
        </figure>
      </Section>
    </div>
  );
}
