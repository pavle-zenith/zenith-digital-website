import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AuditPage } from "@/content/audits/types";

/**
 * The screenshots. Deliberately asymmetric: the Google result is the one that
 * carries the argument, so it runs large on the left and the two site captures
 * stack beside it, rather than three equal tiles that would rank them the same.
 *
 * Captures are `unoptimized`: they are already sized WebP served from
 * `/audits/`, and that path carries the noindex header, so the optimizer would
 * re-serve them from `/_next/image` where the header does not apply.
 */
export function AuditEvidence({
  evidence,
}: {
  evidence: AuditPage["evidence"];
}) {
  const [lead, ...rest] = evidence.items;
  if (!lead) return null;

  return (
    <Section tone="light" className="bg-light-surface" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={evidence.heading} tone="light" />

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
        <Figure item={lead} />
        {rest.length ? (
          <div className="grid content-start gap-6 lg:gap-8">
            {rest.map((item) => (
              <Figure key={item.src} item={item} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

function Figure({ item }: { item: AuditPage["evidence"]["items"][number] }) {
  return (
    <figure className="flex flex-col">
      <div className="overflow-hidden rounded-[6px] border border-light-border bg-light-bg">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          unoptimized
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-label tracking-normal text-light-muted">
        {item.caption}
      </figcaption>
    </figure>
  );
}
