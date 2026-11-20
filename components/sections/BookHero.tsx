import Image from "next/image";
import { servesRaw } from "@/lib/utils";

import { Section } from "@/components/ui/Section";
import { BookingCalendar } from "@/components/ui/BookingCalendar";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactIntro } from "@/components/sections/ContactSection";
import { bookHero } from "@/content/book-a-call";

/**
 * /book-a-call hero — light, single centered column: badge pill, H1, three
 * check items, then the Cal.com embed as a bordered card. Below the calendar
 * (live-site order): overlapping avatar proof row + label, the subhead, and
 * the partner logo strip.
 *
 * Calendar and contact form side by side from lg (owner, 20 Nov 2026, a
 * conversion test): the calendar keeps the wider column, the form sits right
 * with its intro and direct routes. Stacked below lg, calendar first; the
 * line under the calendar then skips past it to the form (`#contact`), and
 * doubles as the way out if the iframe ever fails to load.
 */
export function BookHero() {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pt-10 md:!pt-14 !pb-12 md:!pb-20"
    >
      {/* Inverted studio texture, confined to the frame column and the top of
          the section; fades to solid before the calendar card. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden"
        aria-hidden
      >
        <Image
          src="/textures/studio-texture.jpg"
          // The hero texture is the largest paint on a phone: load it first.
          priority
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.28] invert"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 45%, var(--color-light-bg) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <span className="inline-flex items-center rounded-full bg-light-surface px-3 py-1.5 font-mono text-label uppercase track-label text-light-muted">
          {bookHero.badge}
        </span>

        <h1 className="mt-6 font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {bookHero.heading}
        </h1>

        {/* Check items */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {bookHero.checks.map((check) => (
            <li
              key={check}
              className="flex items-center gap-2 text-body text-light-muted"
            >
              <Check />
              {check}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
        <div>
          {/* Cal.com embed: anchor target for every "Book a call" CTA */}
          <div
            id="calendar"
            className="min-h-[480px] scroll-mt-[calc(6rem+var(--announce-h))] overflow-hidden rounded-card border border-light-border bg-white p-2 sm:p-4 md:min-h-[640px]"
          >
            <BookingCalendar calLink={bookHero.calLink} />
          </div>

          {/* Phones and tablets only: the form is right beside it from lg. */}
          <p className="mt-4 text-center text-body text-light-muted lg:hidden">
            {bookHero.fallback.text}{" "}
            <a
              href={bookHero.fallback.href}
              className="font-medium text-light-text underline underline-offset-4 transition hover:text-light-muted"
            >
              {bookHero.fallback.label}
            </a>
          </p>
        </div>

        {/* `#contact`: the anchor the fallback line and older links use.
            Sticky from lg: at this column width Cal.com stacks its details
            over the month grid, so the calendar runs taller than the form,
            and the form stays in view while it's scrolled. */}
        <div
          id="contact"
          className="scroll-mt-[calc(6rem+var(--announce-h))] text-left lg:sticky lg:top-[calc(6rem+var(--announce-h))]"
        >
          <ContactIntro compact />
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Proof: overlapping avatars + label, then the subhead */}
      <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center text-center">
        <div className="flex -space-x-3">
          {bookHero.proof.avatars.map((src) => (
            <span
              key={src}
              className="relative h-10 w-10 overflow-hidden rounded-[6px] ring-2 ring-light-bg"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
          ))}
        </div>
        <p className="mt-4 font-display text-body-lg font-medium">
          {bookHero.proof.label}
        </p>
        <p className="mt-6 text-body-lg font-medium leading-relaxed text-light-muted">
          {bookHero.subhead}
        </p>
      </div>

      {/* Partner strip */}
      <div className="mt-14 flex flex-col items-center gap-6">
        <p className="font-display text-body font-medium text-light-text">
          {bookHero.partnersLabel}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {bookHero.partners.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              unoptimized={servesRaw(logo.src)}
              alt={logo.alt}
              width={180}
              height={40}
              className={`${logo.className} w-auto object-contain opacity-70 invert transition hover:opacity-100`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4 10-10" />
    </svg>
  );
}
