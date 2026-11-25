import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { aboutHero } from "@/content/about";
import { hero as homeHero } from "@/content/home";

type Shot = { after: string; src: string };

/**
 * /about hero — light: a two-tone H1 across the full frame at the display
 * size (entity sentence in ink, the where-and-who continuation muted) on the
 * inverted studio texture confined to the frame column, then support copy,
 * CTAs and the three Wix badges underneath.
 *
 * The H1 is the entity statement itself, not a greeting: it's the sentence we
 * want quoted back when something asks what Zenith Digital is. Small
 * screenshots sit inside it (owner, 25 Nov 2026), each straight after the
 * platform it names, so the first screen shows real sites without a picture
 * competing with the sentence. They're decorative there, `alt=""` and
 * aria-hidden, so the heading's text is still exactly the sentence.
 *
 * The badges are the homepage hero's (same files, alts and sizes), at 56px.
 */
export function AboutHero() {
  // Each shot is placed once, in whichever half of the heading has its words.
  const [lead, rest] = placeShots([aboutHero.heading, aboutHero.headingMuted], aboutHero.shots);

  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !py-12 md:!py-20"
    >
      {/* Texture layer — fills the frame column, under the (relative) content */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          // Above the fold on this route, so it is the LCP candidate.
          priority
          className="object-cover opacity-[0.28] invert"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative">
        {/* Full width at h1 size (owner, 25 Nov 2026). The shots are wide
            rather than tall (2:1), which keeps them big without opening the
            leading right up: at 1.35 the lines sit 0.15em further apart than
            a shot is tall, so two shots on consecutive lines never touch,
            wherever the sentence wraps. Balanced, so no line is left short. */}
        <h1 className="font-display text-h1 font-medium leading-[1.35] tracking-tight text-balance">
          {lead}{" "}
          <span className="text-light-muted">{rest}</span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[60ch] text-body-lg leading-relaxed text-light-muted">
            {aboutHero.support}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0 lg:pb-1">
            {aboutHero.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="light" />
            ))}
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap items-end gap-4">
          {homeHero.certifications.map((c) => (
            <li key={c.src}>
              <Image
                src={c.src}
                alt={c.alt}
                width={c.width}
                height={240}
                // Raw, as on the homepage: trimmed, keyed WebP at 8-16KB.
                unoptimized
                className="h-14 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/**
 * Splits each text at the end of the first match of every shot's `after`,
 * and sets the shot there. A shot whose words aren't found anywhere is left
 * out, so a copy edit can never strand one mid-word.
 */
function placeShots(texts: string[], shots: Shot[]): React.ReactNode[] {
  const used = new Set<string>();
  return texts.map((text) => {
    const cuts = shots
      .filter((s) => !used.has(s.src) && text.includes(s.after))
      .map((s) => ({ at: text.indexOf(s.after) + s.after.length, after: s.after, src: s.src }))
      .sort((a, b) => a.at - b.at);
    cuts.forEach((c) => used.add(c.src));

    const out: React.ReactNode[] = [];
    let from = 0;
    for (const c of cuts) {
      // The shot is held to the words it follows (no break inside them or
      // before the picture), so "Wix Studio," never splits and a line can't
      // start with a picture of the line above's platform.
      const anchor = c.at - c.after.length;
      out.push(
        text.slice(from, anchor),
        <span key={c.src} className="whitespace-nowrap">
          {text.slice(anchor, c.at)} <ShotChip src={c.src} />
        </span>,
      );
      from = c.at;
    }
    out.push(text.slice(from));
    return out;
  });
}

/**
 * One screenshot, sized in ems so it scales with the heading: 1.2em tall at
 * 2:1 (a centre crop of the 16:10 file), centred on the line, in a white mat with a hairline edge like a
 * mounted print. Its negative vertical margins take it out of the line-height
 * sum, so a line holding a shot sits exactly as far from its neighbours as
 * one without.
 */
function ShotChip({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="-my-[0.2em] inline-block h-[1.2em] w-[2.4em] rounded-[10px] border border-light-text/15 bg-light-bg p-[3px] align-middle"
    >
      <span className="relative block h-full w-full overflow-hidden rounded-[7px] bg-light-surface">
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1024px) 160px, 80px"
          loading="eager"
          className="object-cover"
        />
      </span>
    </span>
  );
}
