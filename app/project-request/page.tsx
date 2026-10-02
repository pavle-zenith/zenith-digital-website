import type { Metadata } from "next";
import Image from "next/image";

import { ProjectRequestForm } from "@/components/forms/ProjectRequestForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { founderCore } from "@/content/founder";
import { projectRequest as c } from "@/content/project-request";
import { defaultShareImages } from "@/lib/shareImage";

/**
 * /project-request: a short intake form Pavle sends by hand to people who are
 * already warm, so he can reply with a price range and a timeline without a
 * discovery call. Built from Docs/Project_Request_Handoff.md.
 *
 * FOUR PRIVACY LAYERS, as on /partner-showcase:
 *   1. the robots metadata below;
 *   2. `X-Robots-Tag: noindex, nofollow` for `/project-request` in
 *      next.config.ts;
 *   3. absence from app/sitemap.ts, which is an explicit allowlist;
 *   4. no link to `/project-request` anywhere on the site.
 *
 * Deliberately NO robots.txt Disallow, for the reason given in next.config.ts,
 * and no JSON-LD. The share image stays: the link travels by WhatsApp and
 * email, where the preview card is the first thing the person sees.
 */
export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  // The root layout's `canonical: "/"` would declare this page a duplicate of
  // the homepage. Null clears it.
  alternates: { canonical: null },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    images: defaultShareImages.openGraph,
  },
  twitter: {
    title: c.meta.title,
    description: c.meta.description,
    images: defaultShareImages.twitter,
  },
};

/**
 * One column, about 640px, on white: the intro, then the form card. No studio
 * texture and no second section; the page is a tool someone was sent, and the
 * form is the whole of it.
 */
export default function ProjectRequestPage() {
  // The success screen's two contact links, from the founder content.
  const link = (label: string) => founderCore.links.find((l) => l.label === label)?.href ?? "";
  const contact = { email: link("Email"), whatsapp: link("WhatsApp") };

  return (
    <Section tone="light" divide={false} frameClassName="!pt-10 !pb-16 sm:!pt-14 md:!pt-20 md:!pb-28">
      <div className="mx-auto max-w-[640px]">
        <Eyebrow>{c.intro.eyebrow}</Eyebrow>
        <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {c.intro.heading}
        </h1>
        <p className="mt-4 text-body-lg text-light-muted">{c.intro.lead}</p>
        <div className="mt-6 flex items-center gap-3">
          <Image
            src={founderCore.image}
            alt=""
            width={80}
            height={100}
            className="h-10 w-10 shrink-0 rounded-[6px] object-cover object-top"
          />
          <p className="text-body text-light-text">{c.intro.byline}</p>
        </div>

        <ProjectRequestForm contact={contact} />
      </div>
    </Section>
  );
}
