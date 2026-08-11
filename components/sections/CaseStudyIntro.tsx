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
            {stats.length > 0 ? (
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:flex sm:flex-wrap sm:gap-0 sm:divide-x sm:divide-light-border md:mt-12">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="sm:px-10 sm:first:pl-0 sm:last:pr-0"
                  >
                    <div className="font-display text-h3 font-medium leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 max-w-[20ch] text-body leading-snug text-light-muted">
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
              {scope.map((item) => (
                <li
                  key={item}
                  className="border-b border-light-border py-3.5 font-display font-medium"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
