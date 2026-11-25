import { Section } from "@/components/ui/Section";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * The honest limits of the platform a page sells (custom website development
 * brief, 25 Nov 2026): three cards, each sourced to the vendor's own pages,
 * then the promise to say when the platform is the wrong choice. Rendered
 * after the comparison block, and only on a page that carries `tradeoffs`.
 *
 * No new visual language: the band, header and card grid are the stakes
 * section's (ServicePageStakes), minus its icons, which these cards don't
 * have. Each card's source sits at its foot, so the links share a line
 * across the row. The promise closes the band the way the pricing pull quote
 * closes pricing: a short accent rule, then one centred line, the title in
 * full ink and the body after it.
 */
export function ServicePageTradeoffs({ data }: { data: ServicePageContent }) {
  const t = data.tradeoffs;
  if (!t) return null;

  return (
    <Section tone="light" frameClassName="!py-0">
      <div className="frame-bleed bg-light-surface px-[clamp(20px,4vw,64px)] py-14 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {t.heading}
          </h2>
          <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
            {t.intro}
          </p>
        </div>

        <div className="type-card mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-3">
          {t.items.map((item) => (
            <article key={item.title} className="type-card flex flex-col bg-light-bg p-8">
              <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-body leading-relaxed text-light-muted">{item.body}</p>
              {item.source ? (
                // mt-auto drops the source to the foot of the cell, so the
                // three links sit on one line however long the bodies run.
                <p className="mt-auto pt-6 text-body text-light-muted">
                  Source:{" "}
                  <a
                    href={item.source.href}
                    target="_blank"
                    rel="noopener nofollow"
                    className="group inline-flex items-baseline gap-1.5 font-display font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
                  >
                    {item.source.label}
                    <span aria-hidden className="btn-arrow">
                      &rarr;
                    </span>
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center md:mt-16">
          <div aria-hidden className="mx-auto w-10 border-t-2 border-accent" />
          <p className="mt-6 font-display text-body-lg font-medium leading-snug tracking-tight text-balance text-light-muted sm:text-h3">
            <strong className="font-semibold text-light-text">
              {withStop(t.promise.title)}
            </strong>{" "}
            {t.promise.body}
          </p>
        </div>
      </div>
    </Section>
  );
}

/** The title runs into the body as one sentence, so it needs its full stop. */
function withStop(text: string) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}
