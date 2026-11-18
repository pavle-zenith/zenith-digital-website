"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { DividedList, DividedRow } from "@/components/ui/DividedList";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import { nav, servicesMenu } from "@/content/home";
import type { IndustryMenu } from "@/content/industries";

/**
 * `industryMenu` is the Services menu's "By industry" column, resolved on the
 * server by the layout (content/industries industryMenu). Null until the
 * /industries hub has a route, and the menu is then exactly the two service
 * columns, so the gate lives in one place.
 */
export function Nav({
  industryMenu = null,
}: {
  industryMenu?: IndustryMenu | null;
}) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the full-screen drawer is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "tone-light sticky top-0 z-50 border-b border-light-border text-light-text transition-colors duration-300",
        // Solid while the drawer is open so the bar never shows page content
        // through the blur above the opaque drawer.
        scrolled && !open ? "bg-light-bg/70 backdrop-blur-xl" : "bg-light-bg",
      )}
      onMouseLeave={() => setMenuOpen(false)}
    >
      {/* Bar sits in the max-width column, inset by the frame gutter so the
          logo lines up with section content on every breakpoint. */}
      <div className="mx-auto flex h-16 max-w-[var(--container-site)] items-center justify-between px-[clamp(20px,4vw,64px)] md:px-0">
        {/* Left cluster: logo + nav items sitting next to it */}
        {/* Tighter between the logo and the links from md to lg, full spacing
            from lg. Six nav items plus two CTAs is exactly at the limit of a
            768px row: measured, the header overflowed the viewport by 22px and
            scrolled the whole page sideways. */}
        <div className="flex items-center gap-5 lg:gap-8">
          <Link
            href="/"
            className="font-display text-body-lg font-medium lowercase tracking-tight"
            aria-label="Zenith Digital home"
          >
            zenith digital
          </Link>

          {/* Wrapped in <nav> so primary navigation is exposed as a landmark;
              the header alone is not one. */}
          <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-6">
            {nav.items.map((item) => {
              const hasMenu = "menu" in item && item.menu === "services";
              return (
                <li
                  key={item.href}
                  onMouseEnter={() => setMenuOpen(hasMenu ? true : false)}
                >
                  <Link
                    href={item.href}
                    // onFocus mirrors onMouseEnter: the panel was mouse-only, so
                    // a keyboard user tabbing to Services never saw its contents.
                    onFocus={() => setMenuOpen(hasMenu ? true : false)}
                    aria-expanded={hasMenu ? menuOpen : undefined}
                    className="flex items-center gap-1.5 py-2 text-body font-medium text-light-text transition hover:text-accent"
                  >
                    {item.label}
                    {hasMenu ? (
                      <svg
                        viewBox="0 0 24 24"
                        className={cn(
                          "h-4 w-4 transition-transform",
                          menuOpen && "rotate-180",
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          </nav>
        </div>

        {/* Right cluster: CTAs. Free audit = filled white, Get a quote = accent. */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={nav.ctas[0].href}
            className="group inline-flex items-center gap-2 rounded-[6px] border border-light-border bg-light-surface px-4 py-2 text-body font-medium text-light-text transition hover:bg-light-border"
          >
            {nav.ctas[0].label}{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
          <Button
            cta={nav.ctas[1]}
            tone="light"
            className="!px-4 !py-2 text-body"
          />
        </div>

        {/* 44px hit area around a 24px glyph; the negative margin keeps the
            bars aligned to the gutter where the bare glyph used to sit. */}
        <button
          type="button"
          className="-mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-[6px] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-light-text" />
          <span className="block h-0.5 w-6 bg-light-text" />
          <span className="block h-0.5 w-6 bg-light-text" />
        </button>
      </div>

      {/* Services mega-dropdown.
          `inert` while closed. max-h-0 + opacity-0 clips the panel visually but
          leaves its eight links in the tab order, so a keyboard user collected
          eight stops on things they could not see. pointer-events-none never
          blocked the keyboard. inert removes the subtree from both the tab
          order and the accessibility tree, which is what closed actually means. */}
      <div
        inert={!menuOpen}
        className={cn(
          "absolute inset-x-0 top-full hidden overflow-hidden border-b border-[var(--rule)] bg-light-bg transition-[max-height,opacity] duration-200 md:block",
          menuOpen
            ? "max-h-[620px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[var(--container-site)] divide-x divide-light-border border-x border-light-border",
            industryMenu ? "grid-cols-4" : "grid-cols-3",
          )}
        >
          {/* The link columns (the two service columns, plus "By industry"
              once the hub is live), closed off by a single full-width row. */}
          <div
            className={cn(
              "flex flex-col",
              industryMenu ? "col-span-3" : "col-span-2",
            )}
          >
            <div
              className={cn(
                "grid flex-1 divide-x divide-light-border",
                industryMenu ? "grid-cols-3" : "grid-cols-2",
              )}
            >
              {/* No horizontal padding on the column so the row hairlines run
                  edge to edge, touching the vertical dividers. */}
              {(
                [
                  { label: "Design & build", items: servicesMenu.build },
                  { label: "Grow & scale", items: servicesMenu.grow },
                ] as const
              ).map((col) => (
                <div key={col.label} className="py-8">
                  <p className="mb-4 px-6 font-mono text-label uppercase track-label text-light-muted">
                    {col.label}
                  </p>
                  <DividedList tone="light">
                    {col.items.map((it) => (
                      <DividedRow key={it.href} className="px-6">
                        <Link
                          href={it.href}
                          className="group flex items-start gap-3"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text transition group-hover:border-accent group-hover:text-accent">
                            <FeatureIcon name={it.icon} className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display font-medium group-hover:text-accent">
                              {it.label}
                            </span>
                            <span className="mt-0.5 block text-[0.8125rem] tracking-normal text-light-muted">
                              {it.desc}
                            </span>
                          </span>
                        </Link>
                      </DividedRow>
                    ))}
                  </DividedList>
                </div>
              ))}

              {/* "By industry": compact rows (icon and label, no description
                  line) so five of them stand about as tall as three service
                  rows. Same chips and hover as the services. */}
              {industryMenu ? (
                <div className="py-8">
                  <p className="mb-4 px-6 font-mono text-label uppercase track-label text-light-muted">
                    {industryMenu.heading}
                  </p>
                  <DividedList tone="light">
                    {industryMenu.items.map((it) => (
                      <DividedRow key={it.href} className="px-6 py-3">
                        <Link
                          href={it.href}
                          className="group flex items-center gap-3"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text transition group-hover:border-accent group-hover:text-accent">
                            <FeatureIcon name={it.icon} className="h-4 w-4" />
                          </span>
                          <span className="font-display font-medium group-hover:text-accent">
                            {it.label}
                          </span>
                        </Link>
                      </DividedRow>
                    ))}
                  </DividedList>
                </div>
              ) : null}
            </div>

            {/* Secondary CTAs closing the columns, side by side once the
                industries link joins. The row owns its top rule; the
                dropdown's bottom border sits under it. */}
            <div className="flex divide-x divide-light-border border-t border-light-border">
              {[
                servicesMenu.viewAll,
                ...(industryMenu ? [industryMenu.viewAll] : []),
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-1 items-center justify-center gap-2 bg-light-surface px-6 py-4 text-body font-medium text-light-text transition hover:bg-light-border"
                  onClick={() => setMenuOpen(false)}
                >
                  <FeatureIcon
                    name={link.icon}
                    className="h-4 w-4 shrink-0 text-light-muted transition group-hover:text-light-text"
                  />
                  {link.label}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 — Featured case study. Image fills the column height, caption pins bottom. */}
          <Link
            href={servicesMenu.featured.href}
            className="group flex flex-col bg-light-surface p-8"
            onClick={() => setMenuOpen(false)}
          >
            <p className="mb-4 font-mono text-label uppercase track-label text-light-muted">
              {servicesMenu.featured.label}
            </p>
            <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-[6px] border border-light-border">
              <Image
                src={servicesMenu.featured.image}
                alt=""
                fill
                sizes="420px"
                className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-4 flex items-start gap-2 font-display font-medium group-hover:text-accent">
              <span className="text-accent">+</span>
              {servicesMenu.featured.title}
            </p>
          </Link>
        </div>
      </div>

      {/* Mobile drawer — full-screen overlay below the bar, so opening it never
          pushes the page down. Positioned absolute with an explicit viewport
          height (NOT fixed: the bar's backdrop-filter makes the header the
          containing block for fixed children, which collapsed the drawer to
          zero height). Hairline-divided rows up top, sign-off + CTAs pinned
          to the bottom. */}
      {/* `inert` rather than aria-hidden. The drawer is hidden by opacity alone,
          so its eight links stayed focusable while closed: aria-hidden over
          focusable descendants is the axe `aria-hidden-focus` violation, and on
          phones it also meant eight tab stops on an invisible panel. inert
          covers both, so aria-hidden is no longer needed here. */}
      <div
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full z-40 flex h-[calc(100dvh-4rem)] flex-col bg-light-bg transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Same landmark label as the desktop list: the two are mutually
            exclusive by viewport (this is md:hidden, that one is hidden md:block)
            and this one is inert while closed, so exactly one is ever exposed
            to the accessibility tree. */}
        <nav aria-label="Primary" className="min-h-0 flex-1 overflow-y-auto">
          <ul className="flex flex-col border-t border-light-border px-[clamp(20px,4vw,64px)]">
            {nav.items.map((item) => (
              <li key={item.href} className="border-b border-light-border">
                <Link
                  href={item.href}
                  className="block py-4 font-display text-body-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {/* The Services group's "By industry" sub-group: the same
                    five links as the desktop column, plus the hub. Same gate. */}
                {"menu" in item && item.menu === "services" && industryMenu ? (
                  <div className="-mt-1 pb-5">
                    <p className="font-mono text-label uppercase track-label text-light-muted">
                      {industryMenu.heading}
                    </p>
                    <ul className="mt-2 grid grid-cols-2 gap-x-4">
                      {industryMenu.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            className="flex min-h-11 items-center gap-2.5 text-body font-medium"
                            onClick={() => setOpen(false)}
                          >
                            <FeatureIcon
                              name={it.icon}
                              className="h-4 w-4 shrink-0 text-light-muted"
                            />
                            {it.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={industryMenu.allShort.href}
                          className="group flex min-h-11 items-center gap-2.5 text-body font-medium"
                          onClick={() => setOpen(false)}
                        >
                          <FeatureIcon
                            name={industryMenu.allShort.icon}
                            className="h-4 w-4 shrink-0 text-light-muted"
                          />
                          {industryMenu.allShort.label}
                          <span aria-hidden className="btn-arrow">
                            &rarr;
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign-off + CTAs pinned to the bottom */}
        <div className="mt-auto shrink-0 flex flex-col gap-3 border-t border-light-border bg-light-bg px-[clamp(20px,4vw,64px)] pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <p className="font-display text-body-lg font-medium leading-tight text-balance">
            {nav.drawerTagline}
          </p>
          {/* FIX: these routed but left the drawer open, landing the visitor on
              the new page with the menu still covering it. */}
          {nav.ctas.map((cta) => (
            <Button
              key={cta.href}
              cta={cta}
              tone="light"
              className="w-full"
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
