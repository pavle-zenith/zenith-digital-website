import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AuditPage } from "@/content/audits/types";
import { CheckIcon } from "./icons";

/**
 * What already works, before anything that doesn't.
 *
 * This section is why the rest of the page is readable as help rather than as
 * a sales pitch: a stranger telling you what is wrong with your website has to
 * establish they looked properly first.
 *
 * The check is `positive-ink`, not `positive`. It sits on a light ground and
 * the -ink value is the one that clears 4.5:1 there (DESIGN.md, The -ink Split
 * Rule).
 */
export function AuditWorking({ working }: { working: AuditPage["working"] }) {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={working.heading} tone="light" />
      <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
        {working.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckIcon className="mt-1 h-[18px] w-[18px] shrink-0 text-positive-ink" />
            <span className="text-body-lg text-light-text">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
