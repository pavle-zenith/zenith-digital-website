import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * The written story — challenge, approach, and achievements. Each is its own
 * section, so each gets its own full-width divider rule and breathing room,
 * with the label left and the text right. A block with no data renders
 * nothing at all.
 */
export function CaseStudyStory({ study }: { study: CaseStudyDetail }) {
  return (
    <>
      {study.challenge.length > 0 ? (
        <StoryBlock title="The challenge">
          <div className="flex flex-col gap-4">
            {study.challenge.map((paragraph) => (
              <p key={paragraph} className="text-body-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </StoryBlock>
      ) : null}

      {study.approach.length > 0 ? (
        <StoryBlock title="Approach">
          <div className="flex flex-col gap-8">
            {study.approach.map((move) => (
              <div key={move.heading}>
                <h3 className="font-display text-body-lg font-medium">
                  {move.heading}
                </h3>
                <p className="mt-2 text-body-lg leading-relaxed text-light-muted">
                  {move.body}
                </p>
              </div>
            ))}
          </div>
        </StoryBlock>
      ) : null}

      {study.results.length > 0 || study.resultsNote ? (
        <StoryBlock title="Achievements">
          {study.results.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {study.results.map((r) => (
                <li
                  key={r.label}
                  className="flex flex-wrap items-baseline gap-x-3"
                >
                  <span
                    className={cn(
                      "font-display text-body-lg font-medium",
                      r.positive && "text-positive",
                    )}
                  >
                    {r.isQuote ? <>&ldquo;{r.value}&rdquo;</> : r.value}
                  </span>
                  <span className="text-body-lg text-light-muted">
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {study.resultsNote ? (
            <p className="mt-6 text-body-lg leading-relaxed text-light-muted">
              {study.resultsNote}
            </p>
          ) : null}
        </StoryBlock>
      ) : null}
    </>
  );
}

function StoryBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
        <h2 className="font-display text-h3 font-medium leading-tight tracking-tight">
          {title}
        </h2>
        <div className="max-w-2xl">{children}</div>
      </div>
    </Section>
  );
}
