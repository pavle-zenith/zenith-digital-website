import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn } from "@/lib/utils";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Block 7 — the page-unique differentiator, dark and textured. Three shapes
 * cover the four pages: a comparison of alternatives, a set of
 * platform-specific blocks, or a two-concept explainer. The shape is chosen in
 * content, so no page can accidentally end up with a sibling's layout.
 */
export function ServicePageUnique({ data }: { data: ServicePageContent }) {
  const { unique } = data;

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
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {unique.heading}
          </h2>
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-text-muted">
            {unique.intro}
          </p>
        </div>

        {unique.kind === "comparison" ? (
          <>
            <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 md:grid-cols-3">
              {unique.columns.map((col, i) => {
                const ours = i === unique.columns.length - 1;
                return (
                  <div
                    key={col.name}
                    className={cn(
                      "flex flex-col p-8",
                      ours ? "bg-white text-light-text" : "bg-bg/70 backdrop-blur-md",
                    )}
                  >
                    <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                      {col.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-body",
                        ours ? "text-light-muted" : "text-text-muted",
                      )}
                    >
                      {col.note}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {col.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          {ours ? (
                            <VerifiedCheck className="mt-0.5 text-positive-ink" />
                          ) : (
                            <span
                              aria-hidden
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted"
                            />
                          )}
                          <span
                            className={cn(
                              "text-body leading-snug",
                              ours ? "text-light-text" : "text-text-muted",
                            )}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 max-w-2xl border-t border-border pt-8">
              <h3 className="font-display text-body-lg font-medium">
                {unique.footnote.title}
              </h3>
              <p className="mt-2 text-body leading-relaxed text-text-muted">
                {unique.footnote.body}
              </p>
            </div>
          </>
        ) : null}

        {unique.kind === "platforms" ? (
          <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 md:grid-cols-2">
            {unique.items.map((item) => (
              <article
                key={item.name}
                className="bg-bg/70 p-8 backdrop-blur-md"
              >
                <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-4 font-mono text-label uppercase track-label text-text-muted">
                  Why people leave
                </p>
                <p className="mt-2 text-body leading-relaxed text-text-muted">
                  {item.pains}
                </p>
                <p className="mt-5 font-mono text-label uppercase track-label text-text-muted">
                  What carries over
                </p>
                <p className="mt-2 text-body leading-relaxed text-text-muted">
                  {item.carries}
                </p>
              </article>
            ))}
          </div>
        ) : null}

        {unique.kind === "explainer" ? (
          <>
            <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 md:grid-cols-2">
              {[unique.left, unique.right].map((side) => (
                <div key={side.title} className="bg-bg/70 p-8 backdrop-blur-md">
                  <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                    {side.title}
                  </h3>
                  <p className="mt-4 text-body leading-relaxed text-text-muted">
                    {side.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl border-t border-border pt-8 text-body-lg leading-relaxed text-text-muted">
              {unique.closing}
            </p>
          </>
        ) : null}
      </Section>
    </div>
  );
}
