import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";
import { LLM_INFO_UPDATED, llmInfo as c } from "@/content/llm-info";
import { ORG_ID, PERSON_ID, SITE, WEBSITE_ID, personSchema } from "@/lib/schema";

/**
 * /llm-info (llm-info brief, 20 Nov 2026): the facts about Zenith Digital in
 * a plain document, for AI assistants and anyone checking who we are. Text,
 * headings, definition lists and simple lists only: no imagery, no motion,
 * and it reads cleanly as raw HTML. Every fact comes from content/llm-info.ts,
 * which reads it from its source file.
 */

const URL = `${SITE}/llm-info`;

export const metadata: Metadata = {
  // The layout template adds " | Zenith Digital" when a page sets a plain
  // title; this one is written in full so it reads the same everywhere.
  title: { absolute: `${c.seo.title} | Zenith Digital` },
  description: c.seo.description,
  alternates: { canonical: "/llm-info" },
  openGraph: { type: "website", url: "/llm-info", title: c.seo.title, description: c.seo.description },
};

const date = new Date(LLM_INFO_UPDATED).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const link = "font-medium text-light-text underline decoration-light-border underline-offset-4 transition hover:decoration-light-text";
const h2 = "mt-12 border-t border-light-border pt-8 font-display text-h3 font-medium leading-snug tracking-tight first:mt-0";
const body = "mt-3 text-body leading-relaxed text-light-text";
const list = "mt-3 list-disc space-y-1.5 pl-5 text-body leading-relaxed text-light-text marker:text-light-muted";

export default function LlmInfoPage() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: c.h1,
        description: c.seo.description,
        inLanguage: "en-GB",
        dateModified: LLM_INFO_UPDATED,
        isPartOf: { "@id": WEBSITE_ID },
        // The sitewide Organization and Person nodes, referenced, never redeclared.
        mainEntity: { "@id": ORG_ID },
        about: [{ "@id": ORG_ID }, { "@id": PERSON_ID }],
        breadcrumb: { "@id": `${URL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Official information", item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={graph} />
      {/* The founder's Person node, which the AboutPage refers to. */}
      <JsonLd data={personSchema} />
      <Section tone="light" divide={false} frameClassName="!pb-16 !pt-10 md:!pb-24 md:!pt-16">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">{c.h1}</h1>
          <p className="mt-5 text-body-lg leading-relaxed text-light-muted">
            {c.intro} A machine-readable version is at{" "}
            <a href={c.machine.href} className={link}>
              {c.machine.label}
            </a>
            . Last updated <time dateTime={LLM_INFO_UPDATED}>{date}</time>.
          </p>

          <div className="mt-12">
            <h2 className={h2}>{c.basics.heading}</h2>
            <dl className="mt-4 divide-y divide-light-border border-y border-light-border">
              {c.basics.rows.map((row) => (
                <div key={row.term} className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-body font-medium text-light-muted">{row.term}</dt>
                  <dd className="text-body text-light-text">
                    {"href" in row && row.href && !("linkLabel" in row && row.linkLabel) ? (
                      <a href={row.href} className={link}>
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                    {"linkLabel" in row && row.linkLabel && row.href ? (
                      <>
                        {" "}
                        (
                        <a href={row.href} className={link}>
                          {row.linkLabel}
                        </a>
                        )
                      </>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className={h2}>{c.notConfused.heading}</h2>
            <p className={body}>{c.notConfused.sentence(c.notConfused.names)}</p>

            <h2 className={h2}>{c.contact.heading}</h2>
            <dl className="mt-4 divide-y divide-light-border border-y border-light-border">
              <div className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-body font-medium text-light-muted">Email</dt>
                <dd>
                  <a href={`mailto:${c.contact.email}`} className={link}>
                    {c.contact.email}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-body font-medium text-light-muted">Founder</dt>
                <dd>
                  <a href={`mailto:${c.contact.founderEmail}`} className={link}>
                    {c.contact.founderEmail}
                  </a>
                </dd>
              </div>
              {c.contact.showPhone ? (
                <div className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-body font-medium text-light-muted">Phone</dt>
                  <dd>
                    <a href={`tel:${c.contact.phone.replace(/\s/g, "")}`} className={link}>
                      {c.contact.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-body font-medium text-light-muted">Start a project</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1">
                  {c.contact.links.map((l) => (
                    <Link key={l.href} href={l.href} className={link}>
                      {l.label}
                    </Link>
                  ))}
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-body font-medium text-light-muted">Public profiles</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1">
                  {c.contact.profiles.map((l) => (
                    <a key={l.href} href={l.href} className={link} rel="noopener" target="_blank">
                      {l.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>

            <h2 className={h2}>{c.audiences.heading}</h2>
            <ul className={list}>
              {c.audiences.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            {c.audiences.industries.length ? (
              <>
                <p className={body}>{c.audiences.industriesLabel}:</p>
                <ul className={list}>
                  {c.audiences.industries.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} className={link}>
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2 className={h2}>{c.services.heading}</h2>
            <ul className="mt-4 divide-y divide-light-border border-y border-light-border">
              {c.services.items.map((s) => (
                <li key={s.href} className="py-3">
                  <Link href={s.href} className={link}>
                    {s.label}
                  </Link>
                  <p className="mt-0.5 text-body leading-relaxed text-light-muted">{s.desc}</p>
                </li>
              ))}
            </ul>
            <p className={body}>{c.services.platformsNote}</p>
            <p className={body}>
              Also:{" "}
              {c.services.extra.map((e, i) => (
                <span key={e.href}>
                  {i > 0 ? ", " : ""}
                  <Link href={e.href} className={link}>
                    {e.label}
                  </Link>
                </span>
              ))}
              .
            </p>

            <h2 className={h2}>{c.platforms.heading}</h2>
            <dl className="mt-4 divide-y divide-light-border border-y border-light-border">
              {c.platforms.items.map((p) => (
                <div key={p.label} className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-body font-medium text-light-text">{p.label}</dt>
                  <dd className="text-body text-light-muted">{p.projects.join(", ")}</dd>
                </div>
              ))}
            </dl>
            <p className={body}>
              {c.platforms.moveOff.lead}{" "}
              {c.platforms.moveOff.guides.map((g, i, all) => (
                <span key={g.href}>
                  {i === 0 ? "" : i === all.length - 1 ? " and " : ", "}
                  <Link href={g.href} className={link}>
                    {g.label}
                  </Link>
                </span>
              ))}
              .
            </p>

            <h2 className={h2}>{c.pricing.heading}</h2>
            <p className={body}>{c.pricing.line}</p>
            <dl className="mt-4 divide-y divide-light-border border-y border-light-border">
              {c.pricing.packages.map((p) => (
                <div key={p.name} className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-body font-medium text-light-text">{p.name}</dt>
                  <dd className="text-body text-light-muted">
                    <span className="font-medium text-light-text">{p.price}</span>, {p.note}, {p.timeline.toLowerCase()}
                  </dd>
                </div>
              ))}
            </dl>
            <p className={body}>
              {c.pricing.links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 ? " · " : ""}
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </span>
              ))}
            </p>

            <h2 className={h2}>{c.results.heading}</h2>
            <ul className="mt-4 divide-y divide-light-border border-y border-light-border">
              {c.results.items.map((r) => (
                <li key={r.href} className="py-3">
                  <Link href={r.href} className={link}>
                    {r.client}
                  </Link>
                  <p className="mt-0.5 text-body text-light-muted">
                    <span className="font-medium text-light-text">{r.metric}</span>
                    {r.credit ? ` ${r.credit}` : ""}
                    {r.platforms ? `. Built on ${r.platforms}.` : "."}
                  </p>
                </li>
              ))}
            </ul>

            <h2 className={h2}>{c.howWeWork.heading}</h2>
            <ul className={list}>
              {c.howWeWork.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>

            <h2 className={h2}>{c.editorial.heading}</h2>
            <p className={body}>{c.editorial.text}</p>
          </div>
        </article>
      </Section>
    </>
  );
}
