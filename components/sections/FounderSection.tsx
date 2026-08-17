import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CtaLink } from "@/lib/types";
import type { FounderLink } from "@/content/founder";

/**
 * Pavle's signature. Decorative in both placements (the name and role are
 * always stated in text beside it), so it ships with an empty alt.
 * `brightness-0` flattens the source file's blue gradient to black through its
 * alpha, so the asset itself stays untouched.
 */
const SIGNATURE = { src: "/signature-pavle.png", width: 473, height: 255 };

type FounderData = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  stats: { value: string; label: string }[];
  links: FounderLink[];
  heading: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  whyHeading?: string;
  whyPoints?: string[];
};

/**
 * A link only renders when it points somewhere real. The Wix Partner and
 * Clutch URLs are still `[bracketed]` in content — a dead link is worse than a
 * missing one, and the same filter keeps placeholders out of `sameAs`.
 */
const isResolvable = (l: FounderLink) => !l.href.includes("[");

/**
 * Founder block. Two layouts, both LIGHT (owner decision, Aug 2026 — there is
 * no navy variant).
 *
 * `size="full"`: the trust section on the service pages. Text left, portrait
 * right with the translucent stat bar across the photo's bottom edge, profile
 * links, and a CTA.
 *
 * `size="expert"`: the byCrawford-style block on /book-a-call and
 * /free-website-audit. Badged portrait left, then heading, paragraph, and the
 * "why" checklist right. No CTA by design: the calendar and the audit form sit
 * directly beside it and own the conversion.
 *
 * `surface` tints the block with --light-surface where two light sections
 * would otherwise run together. The tint sits on the frame column, not the
 * section element, so the grey band stops at the side rails instead of running
 * the full viewport width.
 */
export function FounderSection({
  data,
  size = "full",
  surface = false,
}: {
  data: FounderData;
  size?: "full" | "expert";
  surface?: boolean;
}) {
  const tint = surface ? "bg-light-surface" : undefined;

  if (size === "expert") {
    return (
      <Section tone="light" frameClassName={cn("!py-14 md:!py-24", tint)}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <BadgedPortrait data={data} />

          <div>
            <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
              {data.heading}
            </h2>
            {data.paragraphs.map((p) => (
              <p
                key={p}
                className="mt-5 max-w-[68ch] text-body-lg leading-relaxed text-light-muted"
              >
                {p}
              </p>
            ))}

            {data.whyHeading ? (
              <h3 className="mt-10 font-display text-h3 font-medium leading-tight tracking-tight">
                {data.whyHeading}
              </h3>
            ) : null}

            {data.whyPoints && data.whyPoints.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-4">
                {data.whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckMark />
                    <span className="text-body leading-relaxed text-light-text">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-8 text-body font-medium">
              {data.name}
              <span className="font-normal text-light-muted">
                {" "}
                · {data.role}
              </span>
            </p>
          </div>
        </div>
      </Section>
    );
  }

  const links = data.links.filter(isResolvable);

  return (
    <Section tone="light" frameClassName={cn("!py-14 md:!py-24", tint)}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
        {/* Portrait first on phones: the face is the point of the section. */}
        <div className="order-1 lg:order-2">
          <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-light-border bg-light-bg">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />

            {/* Stat bar over the photo's bottom edge. Values never retyped —
                they come from founderCore.stats. */}
            <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-bg/55 backdrop-blur-md">
              <dl className="grid grid-cols-3 divide-x divide-white/15 text-white">
                {data.stats.map((s) => (
                  <div key={s.label} className="px-3 py-4 text-center sm:px-4">
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-body-lg font-medium leading-none sm:text-h3">
                        {s.value}
                      </span>
                      <span className="mt-1.5 block font-mono text-[11px] uppercase track-label leading-tight text-white/70">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        </div>

        {/* Text column */}
        <div className="order-2 lg:order-1">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {data.heading}
          </h2>

          {data.paragraphs.map((p) => (
            <p
              key={p}
              className="mt-5 max-w-[68ch] text-body leading-relaxed text-light-muted"
            >
              {p}
            </p>
          ))}

          <p className="mt-6 text-body font-medium">
            {data.name}
            <span className="font-normal text-light-muted"> · {data.role}</span>
          </p>

          {links.length > 0 ? (
            <ul className="mt-5 flex flex-wrap items-center gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <FounderProfileLink link={l} />
                </li>
              ))}
            </ul>
          ) : null}

          {/* items-start on the stacked layout: a column flex container
              stretches children across, which would override the signature's
              auto width and blow it up to the button's. */}
          {data.cta ? (
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Button
                cta={{ ...data.cta, variant: "primary" } as CtaLink}
                tone="light"
              />
              {/* Faded back here so it reads as an ink mark beside the button
                  rather than a second logo. */}
              <Image
                src={SIGNATURE.src}
                alt=""
                width={SIGNATURE.width}
                height={SIGNATURE.height}
                className="h-16 w-auto opacity-50 brightness-0 sm:h-[70px]"
                aria-hidden
              />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

/**
 * Portrait with the signature over its bottom-right corner (owner decision,
 * Aug 2026: the three floating navy chips came off, the signature replaced
 * them). Only the right side is inset, so the photo still sits flush with the
 * column's left edge while the chip overhangs.
 */
function BadgedPortrait({ data }: { data: FounderData }) {
  return (
    <div className="relative mx-auto w-full max-w-md pr-5 sm:pr-8 lg:mx-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-light-border bg-light-bg">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
      </div>

      {/* White glass so the ink reads against the photo underneath it. */}
      <div className="absolute bottom-8 right-0 rounded-[6px] border border-white/60 bg-white/70 px-4 py-2 backdrop-blur-md">
        <Image
          src={SIGNATURE.src}
          alt=""
          width={SIGNATURE.width}
          height={SIGNATURE.height}
          className="h-12 w-auto brightness-0 opacity-80 sm:h-14"
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Filled accent check for the "why" list. */
function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.03 7.53-6 6a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 1 1 1.06 1.06z" />
    </svg>
  );
}

/**
 * Profile marks, keyed off the link label so content stays plain data. The
 * fallback is a generic external-link glyph, so adding a profile to
 * founderCore.links never renders an empty chip.
 */
const PROFILE_ICONS: Record<string, React.ReactNode> = {
  // simple-icons:linkedin
  LinkedIn: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
  ),
  // lucide:mail
  Email: (
    <path
      d="M22 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 16.5v-9A2.5 2.5 0 0 1 4.5 5h15A2.5 2.5 0 0 1 22 7.5zm-2 .5-8 5-8-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  // simple-icons:whatsapp
  WhatsApp: (
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12 12 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
  ),
};

const EXTERNAL_ICON = (
  <path
    d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

/**
 * Icon chips rather than a text row. The label survives as the accessible
 * name, so screen readers still hear "LinkedIn" rather than "link".
 */
function FounderProfileLink({ link }: { link: FounderLink }) {
  const cls =
    "flex h-10 w-10 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition hover:border-accent hover:text-accent";
  const icon = (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden
    >
      {PROFILE_ICONS[link.label] ?? EXTERNAL_ICON}
    </svg>
  );

  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={cls} aria-label={link.label}>
        {icon}
      </Link>
    );
  }
  const external = link.href.startsWith("http");
  return (
    <a
      href={link.href}
      className={cls}
      aria-label={link.label}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {icon}
    </a>
  );
}
