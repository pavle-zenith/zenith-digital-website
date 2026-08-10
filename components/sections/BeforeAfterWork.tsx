import { Section } from "@/components/ui/Section";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { beforeAfter } from "@/content/book-a-call";
import type { Tone } from "@/lib/types";

type BeforeAfterData = {
  heading: string;
  support?: string;
  items: { title: string; before: string; after: string }[];
};

/**
 * Before/after work — centered heading (+ optional support line), then a 2x2
 * grid of draggable before/after sliders. Defaults to the /book-a-call data;
 * /case-studies passes its own header + tone.
 */
export function BeforeAfterWork({
  data = beforeAfter,
  tone = "light",
}: {
  data?: BeforeAfterData;
  tone?: Tone;
}) {
  const muted = tone === "dark" ? "text-text-muted" : "text-light-muted";

  return (
    <Section tone={tone} frameClassName="!py-14 md:!py-24">
      <h2 className="mx-auto mb-4 max-w-2xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {data.heading}
      </h2>
      {data.support ? (
        <p
          className={`mx-auto mb-8 max-w-xl md:mb-12 text-center text-body-lg font-medium ${muted}`}
        >
          {data.support}
        </p>
      ) : (
        <div className="mb-12" />
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {data.items.map((item) => (
          <BeforeAfterSlider
            key={item.title}
            title={item.title}
            before={item.before}
            after={item.after}
          />
        ))}
      </div>
    </Section>
  );
}
