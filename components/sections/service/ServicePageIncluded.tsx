import Image from "next/image";

import { Section } from "@/components/ui/Section";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * "What's included" — dark, textured. The depth section: every deliverable
 * gets a numbered row and one or two sentences of explanation, as
 * hairline-divided rows rather than a card grid.
 */
export function ServicePageIncluded({ data }: { data: ServicePageContent }) {
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
            {data.included.heading}
          </h2>
          <p className="max-w-md text-body-lg font-medium text-text-muted md:justify-self-end md:text-right">
            {data.included.intro}
          </p>
        </div>

        <ol className="mt-10 divide-y divide-border border-t border-border md:mt-12">
          {data.included.items.map((item, i) => (
            <li
              key={item.title}
              className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12 md:py-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-label text-text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-body-lg font-medium">
                  {item.title}
                </h3>
              </div>
              <p className="max-w-2xl text-body leading-relaxed text-text-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
