"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { FilterTab } from "@/components/ui/FilterTab";
import { ResourceCard, type TypeMeta } from "@/components/sections/resources/ResourceCard";
import type { ResourceEntry, ResourceTopic, ResourceType } from "@/content/resources/types";

type Copy = {
  topicsLabel: string;
  allTopics: string;
  typeLabel: string;
  allTypes: string;
  allLine: string;
  count: { one: string; many: string };
  empty: string;
  reset: string;
  updated: string;
};

type Props = {
  entries: ResourceEntry[];
  topics: { key: ResourceTopic; label: string; line: string }[];
  types: ({ key: ResourceType } & TypeMeta)[];
  copy: Copy;
};

/**
 * The hub's filter and grid (resources hub brief, 23 Nov 2026): topic chips
 * first, because visitors arrive with a problem rather than a content type,
 * and a type select beside them. Both live in the URL (?topic=moving&
 * type=checklist) so a filtered view can be shared; the page's canonical
 * stays /resources, because these are views, not pages.
 *
 * CRAWLABLE WITHOUT JAVASCRIPT. Reading the URL needs a Suspense boundary,
 * and its fallback is the same grid with nothing filtered: that is what the
 * server renders, so with JavaScript off every card shows. Same pattern as
 * the case-study grid.
 */
export function ResourceFilter(props: Props) {
  return (
    <Suspense fallback={<Inner {...props} topic={null} type={null} onChange={null} />}>
      <UrlFilter {...props} />
    </Suspense>
  );
}

function UrlFilter(props: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const topicParam = params.get("topic");
  const typeParam = params.get("type");
  // Unknown values in a pasted URL fall back to "all" rather than an empty grid.
  const topic = props.topics.some((t) => t.key === topicParam) ? (topicParam as ResourceTopic) : null;
  const type = props.types.some((t) => t.key === typeParam) ? (typeParam as ResourceType) : null;

  const onChange = (next: { topic: ResourceTopic | null; type: ResourceType | null }) => {
    const q = new URLSearchParams();
    if (next.topic) q.set("topic", next.topic);
    if (next.type) q.set("type", next.type);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return <Inner {...props} topic={topic} type={type} onChange={onChange} />;
}

function Inner({
  entries,
  topics,
  types,
  copy,
  topic,
  type,
  onChange,
}: Props & {
  topic: ResourceTopic | null;
  type: ResourceType | null;
  onChange: ((next: { topic: ResourceTopic | null; type: ResourceType | null }) => void) | null;
}) {
  const shown = entries.filter((e) => (!topic || e.topics.includes(topic)) && (!type || e.type === type));
  // Only types that exist on the hub, in the copy's order.
  const presentTypes = types.filter((t) => entries.some((e) => e.type === t.key));
  const meta = (key: ResourceType) => types.find((t) => t.key === key) ?? { label: key, icon: "answer" };
  const line = topic ? topics.find((t) => t.key === topic)?.line : copy.allLine;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        {/* One row of chips; on phones it scrolls in its own lane rather than
            wrapping or widening the page. */}
        <div
          role="group"
          aria-label={copy.topicsLabel}
          className="-mx-[clamp(20px,4vw,64px)] flex gap-2 overflow-x-auto px-[clamp(20px,4vw,64px)] pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <FilterTab active={topic === null} onClick={() => onChange?.({ topic: null, type })}>
            {copy.allTopics}
          </FilterTab>
          {topics.map((t) => (
            <FilterTab key={t.key} active={topic === t.key} onClick={() => onChange?.({ topic: t.key, type })}>
              {t.label}
            </FilterTab>
          ))}
        </div>

        <label className="flex shrink-0 items-center gap-3">
          <span className="font-mono text-label uppercase track-label text-light-muted">{copy.typeLabel}</span>
          <select
            value={type ?? ""}
            onChange={(e) => onChange?.({ topic, type: (e.target.value || null) as ResourceType | null })}
            className="rounded-[6px] border border-light-border bg-light-bg px-3 py-2 text-body font-medium text-light-text"
          >
            <option value="">{copy.allTypes}</option>
            {presentTypes.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-body leading-relaxed text-light-muted">{line}</span>
        <span className="font-mono text-label uppercase track-label text-light-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? copy.count.one : copy.count.many}
        </span>
      </p>

      {shown.length ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.href}>
              <ResourceCard entry={e} type={meta(e.type)} updatedLabel={copy.updated} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-light-border px-6 py-12 text-center">
          <p className="text-body-lg text-light-muted">{copy.empty}</p>
          <button
            type="button"
            onClick={() => onChange?.({ topic: null, type: null })}
            className="mt-3 inline-flex items-center gap-1.5 text-body font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text"
          >
            {copy.reset}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
