import Link from "next/link";

import { Section } from "@/components/ui/Section";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Introduction — sits directly under the shot band. Two labelled columns: the
 * client in plain terms set large on the left, the engagement scope as a
 * hairline-divided list on the right. Either column falls away when its data
 * is missing, and the section renders nothing without both.
 */
export function CaseStudyIntro({ study }: { study: CaseStudyDetail }) {
  const scope = study.techUsed ?? [];
  const stats = study.stats ?? [];
  if (!study.introduction && scope.length === 0 && stats.length === 0) {
    return null;
  }

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-20">
        {study.introduction || stats.length > 0 ? (
          <div>
            <h2 className="font-mono text-label uppercase track-label text-light-muted">
              Introduction
            </h2>
            {study.introduction ? (
              // The h2 treatment (display face, tight tracking) held below
              // full h2 size so it leads the section without shouting.
              <p className="mt-5 max-w-3xl font-display text-h3 font-medium leading-snug tracking-tight md:text-[1.75rem]">
                {study.introduction}
              </p>
            ) : null}
            {/* Phones get the same hairline-divided column as the meta strip;
                sm and up it becomes the inline stat row. */}
            {stats.length > 0 ? (
              <div className="mt-10 flex flex-col divide-y divide-light-border sm:flex-row sm:flex-wrap sm:divide-x sm:divide-y-0 md:mt-12">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-6 py-3 first:pt-0 sm:block sm:py-0 sm:px-10 sm:first:pl-0 sm:last:pr-0"
                  >
                    <div className="font-display text-h3 font-medium leading-none">
                      {s.value}
                    </div>
                    <div className="max-w-[20ch] text-right text-body leading-snug text-light-muted sm:mt-2 sm:text-left">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {scope.length > 0 ? (
          <div>
            <h2 className="font-mono text-label uppercase track-label text-light-muted">
              Scope
            </h2>
            <ul className="mt-6 border-t border-light-border">
              {scope.map((item) => {
                const label = typeof item === "string" ? item : item.label;
                const href = typeof item === "string" ? null : item.href;
                return (
                  <li
                    key={label}
                    className="border-b border-light-border py-3.5 font-display font-medium"
                  >
                    {href ? (
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-1.5 transition hover:text-accent"
                      >
                        {label}
                        <span aria-hidden className="btn-arrow">
                          &rarr;
                        </span>
                      </Link>
                    ) : (
                      label
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
