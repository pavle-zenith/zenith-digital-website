"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { DividedList, DividedRow } from "@/components/ui/DividedList";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import { nav, servicesMenu } from "@/content/home";

export function Nav() {
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
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-display text-body-lg font-medium lowercase tracking-tight"
            aria-label="Zenith Digital home"
          >
            zenith digital
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {nav.items.map((item) => {
              const hasMenu = "menu" in item && item.menu === "services";
              return (
                <li
                  key={item.href}
                  onMouseEnter={() => setMenuOpen(hasMenu ? true : false)}
                >
                  <Link
                    href={item.href}
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

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-light-text" />
          <span className="block h-0.5 w-6 bg-light-text" />
          <span className="block h-0.5 w-6 bg-light-text" />
        </button>
      </div>

      {/* Services mega-dropdown */}
      <div
        className={cn(
          "absolute inset-x-0 top-full hidden overflow-hidden border-b border-[var(--rule)] bg-light-bg transition-[max-height,opacity] duration-200 md:block",
          menuOpen
            ? "max-h-[520px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto grid max-w-[var(--container-site)] grid-cols-3 divide-x divide-light-border border-x border-light-border">
          {/* Cols 1 and 2 — the services themselves. No horizontal padding on
              the column so the row hairlines run edge to edge, touching the
              vertical dividers. */}
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
      <div
        className={cn(
          "absolute inset-x-0 top-full z-40 flex h-[calc(100dvh-4rem)] flex-col bg-light-bg transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col overflow-y-auto border-t border-light-border px-[clamp(20px,4vw,64px)]">
          {nav.items.map((item) => (
            <li key={item.href} className="border-b border-light-border">
              <Link
                href={item.href}
                className="block py-5 font-display text-h3 font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign-off + CTAs pinned to the bottom */}
        <div className="mt-auto flex flex-col gap-4 border-t border-light-border px-[clamp(20px,4vw,64px)] py-8">
          <p className="font-display text-h3 font-medium leading-tight text-balance">
            {nav.drawerTagline}
          </p>
          {nav.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" className="w-full" />
          ))}
        </div>
      </div>
    </header>
  );
}
