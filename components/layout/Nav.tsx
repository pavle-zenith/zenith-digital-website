"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { DividedList, DividedRow } from "@/components/ui/DividedList";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import { nav, servicesMenu } from "@/content/home";
import type { IndustryMenu } from "@/content/industries";

type MenuName = "services" | "industries";

/**
 * `industryMenu` is the Industries tab's dropdown (and the drawer's matching
 * sub-group), resolved on the server by the layout (content/industries
 * industryMenu). Null until the /industries hub has a route, and the
 * Industries tab is then left out entirely, so the gate lives in one place.
 */
export function Nav({
  industryMenu = null,
}: {
  industryMenu?: IndustryMenu | null;
}) {
  const [open, setOpen] = useState(false);
  // Which dropdown is open, if any. One at a time: hovering or focusing
  // another top-level item switches (or closes) it.
  const [menu, setMenu] = useState<MenuName | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setMenu(null);

  // Phone drawer: which submenu screen is showing, if any. Services and
  // Industries open their own screen over the main list (owner, 19 Nov
  // 2026) rather than expanding in place.
  const [sub, setSub] = useState<MenuName | null>(null);
  const triggers = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});
  const backs = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});
  const lastSub = useRef<MenuName | null>(null);
  // Focus follows the screen: into a submenu, its back button; back out,
  // the item that opened it. preventScroll, because the target is still
  // sliding in when it takes focus.
  useEffect(() => {
    if (sub) {
      lastSub.current = sub;
      backs.current[sub]?.focus({ preventScroll: true });
    } else if (lastSub.current) {
      triggers.current[lastSub.current]?.focus({ preventScroll: true });
      lastSub.current = null;
    }
  }, [sub]);
  const closeDrawer = () => {
    lastSub.current = null;
    setSub(null);
    setOpen(false);
  };
  const labelFor = (name: MenuName) =>
    items.find((item) => "menu" in item && item.menu === name)?.label ?? "";

  const items = nav.items.filter(
    (item) => !("menu" in item && item.menu === "industries") || industryMenu,
  );

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
      onMouseLeave={close}
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
            {items.map((item) => {
              const itemMenu: MenuName | null =
                ("menu" in item && item.menu) || null;
              return (
                <li
                  key={item.href}
                  onMouseEnter={() => setMenu(itemMenu)}
                  className={cn(
                    "wideOnly" in item && item.wideOnly && "hidden xl:block",
                  )}
                >
                  <Link
                    href={item.href}
                    // onFocus mirrors onMouseEnter: the panel was mouse-only, so
                    // a keyboard user tabbing to Services never saw its contents.
                    onFocus={() => setMenu(itemMenu)}
                    aria-expanded={itemMenu ? menu === itemMenu : undefined}
                    className="flex items-center gap-1.5 py-2 text-body font-medium text-light-text transition hover:text-accent"
                  >
                    {item.label}
                    {itemMenu ? (
                      <svg
                        viewBox="0 0 24 24"
                        className={cn(
                          "h-4 w-4 transition-transform",
                          menu === itemMenu && "rotate-180",
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
          onClick={() => (open ? closeDrawer() : setOpen(true))}
        >
          <span className="block h-0.5 w-6 bg-light-text" />
          <span className="block h-0.5 w-6 bg-light-text" />
          <span className="block h-0.5 w-6 bg-light-text" />
        </button>
      </div>

      {/* Services mega-dropdown: two service columns closed off by a
          full-width row, and a featured case study in the last column. */}
      <MenuPanel open={menu === "services"}>
        <div className="mx-auto grid max-w-[var(--container-site)] grid-cols-3 divide-x divide-light-border border-x border-light-border">
          <div className="col-span-2 flex flex-col">
            <div className="grid flex-1 grid-cols-2 divide-x divide-light-border">
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
                          onClick={close}
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
            </div>
            <MenuViewAll link={servicesMenu.viewAll} onNavigate={close} />
          </div>
          <MenuFeatured
            featured={servicesMenu.featured}
            onNavigate={close}
          />
        </div>
      </MenuPanel>

      {/* Industries mega-dropdown (its own tab since 19 Nov 2026): every
          hub row as a compact icon row (no description line, so twelve fit
          in three short columns), the "View all industries" row, and a
          featured industry page in the last column. Same chips, hover and
          rules as the Services panel. */}
      {industryMenu ? (
        <MenuPanel open={menu === "industries"}>
          <div className="mx-auto grid max-w-[var(--container-site)] grid-cols-4 divide-x divide-light-border border-x border-light-border">
            <div className="col-span-3 flex flex-col">
              <p className="px-6 pb-4 pt-8 font-mono text-label uppercase track-label text-light-muted">
                {industryMenu.heading}
              </p>
              <div className="grid flex-1 grid-cols-3 divide-x divide-light-border pb-6">
                {columns(industryMenu.items, 3).map((col, c) => (
                  <DividedList key={c} tone="light">
                    {col.map((it) => (
                      <DividedRow key={it.href} className="px-6 py-3">
                        <Link
                          href={it.href}
                          className="group flex items-center gap-3"
                          onClick={close}
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
                ))}
              </div>
              <MenuViewAll link={industryMenu.viewAll} onNavigate={close} />
            </div>
            {industryMenu.featured ? (
              <MenuFeatured featured={industryMenu.featured} onNavigate={close} />
            ) : (
              <div className="bg-light-surface" />
            )}
          </div>
        </MenuPanel>
      ) : null}

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
            to the accessibility tree.

            Three screens share the area: the main list, and a submenu each for
            Services and Industries that slides in over it. Only the showing
            screen is interactive; the others are inert. */}
        <nav
          aria-label="Primary"
          // overflow-clip, not hidden: a hidden box can still be scrolled by
          // the browser, and focusing the back button mid-slide scrolled
          // the screens 232px sideways and left them there.
          className="relative min-h-0 flex-1 overflow-clip border-t border-light-border"
        >
          <div
            inert={sub !== null}
            className={cn(
              "absolute inset-0 overflow-y-auto transition-transform duration-300 ease-out",
              sub ? "-translate-x-full" : "translate-x-0",
            )}
          >
            <ul className="flex flex-col px-[clamp(20px,4vw,64px)]">
              {items.map((item) => {
                const itemMenu: MenuName | null =
                  ("menu" in item && item.menu) || null;
                return (
                  <li key={item.href} className="border-b border-light-border">
                    {itemMenu ? (
                      <button
                        type="button"
                        ref={(el) => {
                          triggers.current[itemMenu] = el;
                        }}
                        aria-expanded={sub === itemMenu}
                        aria-controls={`drawer-${itemMenu}`}
                        onClick={() => setSub(itemMenu)}
                        className="flex w-full items-center justify-between py-3.5 text-left font-display text-body-lg font-medium"
                      >
                        {item.label}
                        <Chevron className="-rotate-90 text-light-muted" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3.5 font-display text-body-lg font-medium"
                        onClick={closeDrawer}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <DrawerSub
            id="drawer-services"
            title={labelFor("services")}
            backLabel={nav.drawerBack}
            open={sub === "services"}
            onBack={() => setSub(null)}
            backRef={(el) => {
              backs.current.services = el;
            }}
          >
            <ul className="mt-3 border-t border-light-border">
              {[...servicesMenu.build, ...servicesMenu.grow].map((it) => (
                <li key={it.href} className="border-b border-light-border">
                  <Link
                    href={it.href}
                    className="flex items-center gap-3 py-2.5 font-display text-body font-medium"
                    onClick={closeDrawer}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text">
                      <FeatureIcon name={it.icon} className="h-4 w-4" />
                    </span>
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
            <DrawerViewAll link={servicesMenu.viewAll} onNavigate={closeDrawer} />
          </DrawerSub>

          {industryMenu ? (
            <DrawerSub
              id="drawer-industries"
              title={labelFor("industries")}
              backLabel={nav.drawerBack}
              open={sub === "industries"}
              onBack={() => setSub(null)}
              backRef={(el) => {
                backs.current.industries = el;
              }}
            >
              <ul className="mt-3 grid grid-cols-2 gap-x-4 border-t border-light-border pt-1">
                {industryMenu.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="flex min-h-11 items-center gap-2.5 text-body font-medium"
                      onClick={closeDrawer}
                    >
                      <FeatureIcon
                        name={it.icon}
                        className="h-4 w-4 shrink-0 text-light-muted"
                      />
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <DrawerViewAll link={industryMenu.viewAll} onNavigate={closeDrawer} />
            </DrawerSub>
          ) : null}
        </nav>

        {/* Sign-off + CTAs pinned to the bottom */}
        <div className="mt-auto shrink-0 flex flex-col gap-2.5 border-t border-light-border bg-light-bg px-[clamp(20px,4vw,64px)] pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="font-display text-body font-medium leading-tight text-balance">
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
              onClick={closeDrawer}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

/** Split a list into `n` columns, filled top to bottom. */
function columns<T>(list: T[], n: number): T[][] {
  const per = Math.ceil(list.length / n);
  return Array.from({ length: n }, (_, i) => list.slice(i * per, (i + 1) * per));
}

/**
 * One desktop dropdown panel under the bar.
 * `inert` while closed. max-h-0 + opacity-0 clips the panel visually but
 * leaves its links in the tab order, so a keyboard user collected stops on
 * things they could not see. pointer-events-none never blocked the
 * keyboard. inert removes the subtree from both the tab order and the
 * accessibility tree, which is what closed actually means.
 */
function MenuPanel({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      inert={!open}
      className={cn(
        // top: 100% + 1px. `top-full` resolves against the header's padding
        // box, so the panel started on its 1px bottom border and hid the
        // full-width rule under the bar whenever a menu was open.
        "absolute inset-x-0 top-[calc(100%+1px)] hidden overflow-hidden border-b border-[var(--rule)] bg-light-bg transition-[max-height,opacity] duration-200 md:block",
        open ? "max-h-[620px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

/**
 * The full-width secondary row closing off a panel's link columns. It owns
 * its top rule; the dropdown's bottom border sits under it.
 */
function MenuViewAll({
  link,
  onNavigate,
}: {
  link: { label: string; href: string; icon: string };
  onNavigate: () => void;
}) {
  return (
    <Link
      href={link.href}
      className="group flex items-center justify-center gap-2 border-t border-light-border bg-light-surface px-6 py-4 text-body font-medium text-light-text transition hover:bg-light-border"
      onClick={onNavigate}
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
  );
}

/**
 * A panel's last column: one featured page, the image filling the column
 * height and the caption pinned to the bottom.
 */
function MenuFeatured({
  featured,
  onNavigate,
}: {
  featured: { label: string; title: string; href: string; image: string };
  onNavigate: () => void;
}) {
  return (
    <Link
      href={featured.href}
      className="group flex flex-col bg-light-surface p-8"
      onClick={onNavigate}
    >
      <p className="mb-4 font-mono text-label uppercase track-label text-light-muted">
        {featured.label}
      </p>
      <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-[6px] border border-light-border">
        <Image
          src={featured.image}
          alt=""
          fill
          sizes="420px"
          className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <p className="mt-4 flex items-start gap-2 font-display font-medium group-hover:text-accent">
        <span className="text-accent">+</span>
        {featured.title}
      </p>
    </Link>
  );
}

/** The nav's chevron (points down; rotate it for left or right). */
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/**
 * One submenu screen in the phone drawer: a back button, the title, and its
 * links. Slides in from the right over the main list; off-screen and inert
 * while closed.
 */
function DrawerSub({
  id,
  title,
  backLabel,
  open,
  onBack,
  backRef,
  children,
}: {
  id: string;
  title: string;
  backLabel: string;
  open: boolean;
  onBack: () => void;
  backRef: (el: HTMLButtonElement | null) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      inert={!open}
      className={cn(
        "absolute inset-0 overflow-y-auto bg-light-bg transition-transform duration-300 ease-out",
        open ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="px-[clamp(20px,4vw,64px)] pb-4 pt-2">
        <button
          ref={backRef}
          type="button"
          onClick={onBack}
          className="-ml-1 flex min-h-11 items-center gap-1.5 text-body font-medium text-light-muted"
        >
          <Chevron className="rotate-90" />
          {backLabel}
        </button>
        <p className="font-display text-h3 font-medium tracking-tight">{title}</p>
        {children}
      </div>
    </div>
  );
}

/** A drawer submenu's closing "View all" link. */
function DrawerViewAll({
  link,
  onNavigate,
}: {
  link: { label: string; href: string; icon: string };
  onNavigate: () => void;
}) {
  return (
    <Link
      href={link.href}
      className="group mt-2 flex min-h-11 items-center gap-2 text-body font-medium"
      onClick={onNavigate}
    >
      <FeatureIcon name={link.icon} className="h-4 w-4 shrink-0 text-light-muted" />
      {link.label}
      <span aria-hidden className="btn-arrow">
        &rarr;
      </span>
    </Link>
  );
}
