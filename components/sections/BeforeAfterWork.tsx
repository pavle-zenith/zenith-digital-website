import { Section } from "@/components/ui/Section";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { beforeAfter } from "@/content/book-a-call";

/**
 * Before/after work — light section. Centered heading, then a 2x2 grid of
 * draggable before/after sliders, one per project.
 */
export function BeforeAfterWork() {
  return (
    <Section tone="light" frameClassName="!py-24">
      <h2 className="mx-auto mb-12 max-w-2xl text-center font-display text-h2 font-medium leading-tight tracking-tight text-balance">
        {beforeAfter.heading}
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {beforeAfter.items.map((item) => (
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
