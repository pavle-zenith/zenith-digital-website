"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";
import { nav, resourcesMenu, servicesMenu } from "@/content/home";
import type { IndustryMenu } from "@/content/industries";
import type { ResourcesMenu } from "@/lib/resources-menu";

type MenuName = "services" | "industries" | "resources";

/**
 * Panels with a featured card: the columns before it share the width equally,
 * and the featured column is a fixed width, so its image shows whole at its
 * own aspect ratio rather than cropped to the row height (owner, 20 Nov 2026).
 */
const FEATURED_COLS =
  "grid-cols-[minmax(0,1fr)_minmax(0,1fr)_16rem] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_22rem]";
type MenuLink = { label: string; href: string; icon: string };
/** One icon-and-label row. `badge` replaces the icon ("VS"). */
type MenuItem = {
  label: string;
  href: string;
  icon?: string;
  desc?: string;
  badge?: string;
};

/**
 * Site header: the bar, the desktop mega menus, and the phone drawer.
 *
 * Structure and sizes follow DesignMe's nav (owner, 19 Nov 2026), in
 * Zenith's own light tokens. Desktop: a + on each menu item that turns into
 * an × on a soft pill while its panel is open; panels segmented into
 * labelled columns whose header rows share one rule, icon-and-label rows,
 * and a row of quick links along the bottom; the page under an open panel
 * is dimmed. Phone: big rows with a + for a submenu and an arrow for a
 * link; a submenu replaces the list with its own titled screen and an ×
 * back; one CTA pinned to the bottom.
 *
 * `industryMenu` is the Industries tab's content, resolved on the server by
 * the layout (content/industries industryMenu). Null until the /industries
 * hub has a route, and the Industries tab is then left out entirely, so the
 * gate lives in one place. `resources` is the Resources menu's server-side
 * part (lib/resources-menu): the compare column, gated on the /compare hub,
 * and the latest blog post.
 */
export function Nav({
  industryMenu = null,
  resources = null,
}: {
  industryMenu?: IndustryMenu | null;
  resources?: ResourcesMenu | null;
}) {
  const [open, setOpen] = useState(false);
  // Where the header's bottom edge sits when the drawer opens. With the
  // announcement bar above it, that's 36px lower at the top of the page, so
  // a fixed 100dvh-4rem would push the drawer's pinned CTA off the screen.
  // Measured on open; the page can't scroll while the drawer is up.
  const [drawerTop, setDrawerTop] = useState<number | null>(null);
  // Which desktop panel is open, if any. One at a time: hovering or
  // focusing another top-level item switches (or closes) it.
  const [menu, setMenu] = useState<MenuName | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setMenu(null);
  const headerRef = useRef<HTMLElement>(null);
  // Set while Escape hands focus back to a tab, so that focus doesn't
  // reopen the panel it just closed.
  const skipFocusOpen = useRef(false);
  // Escape dismisses the open panel and returns focus to its tab (WCAG
  // 1.4.13: content shown on hover or focus can be dismissed).
  const onHeaderKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Escape" || !menu) return;
    const name = menu;
    close();
    const trigger = headerRef.current?.querySelector<HTMLElement>(`[data-menu-trigger="${name}"]`);
    if (trigger && trigger !== document.activeElement) {
      skipFocusOpen.current = true;
      trigger.focus();
    }
  };

  const items = nav.items.filter(
    (item) => !("menu" in item && item.menu === "industries") || industryMenu,
  );
  const menuOf = (item: (typeof items)[number]): MenuName | null =>
    ("menu" in item && item.menu) || null;
  const labelFor = (name: MenuName) =>
    items.find((item) => menuOf(item) === name)?.label ?? "";

  // Phone drawer: which submenu screen is showing, if any.
  const [sub, setSub] = useState<MenuName | null>(null);
  const triggers = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});
  const backs = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});
  const lastSub = useRef<MenuName | null>(null);
  // Focus follows the screen: into a submenu, its close button; back out,
  // the item that opened it. preventScroll, because the screen is still
  // fading in when it takes focus, and a scroll there shifted the drawer.
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

  const [audit, quote] = nav.ctas;
  // Resources > Learn, with the comparisons hub link once the /compare hub is live.
  const learnItems: MenuItem[] = [
    ...resourcesMenu.learn.items,
    ...(resources?.compare ? [resources.compare.viewAll] : []),
  ];

  return (
    <header
      className={cn(
        "tone-light sticky top-[var(--announce-h)] z-50 border-b border-light-border text-light-text transition-colors duration-300",
        // Solid while the drawer is open so the bar never shows page content
        // through the blur above the opaque drawer.
        scrolled && !open ? "bg-light-bg/70 backdrop-blur-xl" : "bg-light-bg",
      )}
      ref={headerRef}
      onMouseLeave={close}
      onKeyDown={onHeaderKeyDown}
      // Tabbing out of the header closes the panel, as leaving it does.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      {/* Bar sits in the max-width column, inset by the frame gutter so the
          logo lines up with section content on every breakpoint. */}
      <div className="mx-auto flex h-16 max-w-[var(--container-site)] items-center justify-between px-[clamp(20px,4vw,64px)] md:px-0">
        {/* Left cluster: logo + nav items sitting next to it. Tighter between
            the logo and the links from md to lg, full spacing from lg. */}
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
                const itemMenu = menuOf(item);
                const active = itemMenu !== null && menu === itemMenu;
                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => setMenu(itemMenu)}
                    className={cn(
                      "wideOnly" in item && item.wideOnly === true && "hidden xl:block",
                    )}
                  >
                    <Link
                      href={item.href}
                      // onFocus mirrors onMouseEnter, so a keyboard user
                      // tabbing to a menu item sees its panel too.
                      onFocus={() => {
                        if (skipFocusOpen.current) {
                          skipFocusOpen.current = false;
                          return;
                        }
                        setMenu(itemMenu);
                      }}
                      data-menu-trigger={itemMenu ?? undefined}
                      aria-expanded={itemMenu ? active : undefined}
                      // -mx-3/px-3: the open pill's padding takes no room in
                      // the row, which is already tight at tablet widths.
                      className={cn(
                        "-mx-3 flex items-center gap-1.5 rounded-[6px] px-3 py-2 text-body font-medium text-light-text transition hover:text-accent",
                        active && "bg-light-surface",
                      )}
                    >
                      {item.label}
                      {itemMenu ? (
                        <PlusIcon
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            active && "rotate-45",
                          )}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right cluster: CTAs. Free audit = soft fill, Get a quote = accent. */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={audit.href}
            className="group inline-flex items-center gap-2 rounded-[6px] border border-light-border bg-light-surface px-4 py-2 text-body font-medium text-light-text transition hover:bg-light-border"
          >
            {audit.label}{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
          <Button cta={quote} tone="light" className="!px-4 !py-2 text-body" />
        </div>

        {/* 44px hit area; an × on a soft square while the drawer is open.
            The negative margin keeps the glyph on the gutter. */}
        <button
          type="button"
          className={cn(
            "-mr-2.5 flex h-11 w-11 items-center justify-center rounded-[6px] transition-colors md:hidden",
            open && "bg-light-surface",
          )}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => {
            if (open) {
              closeDrawer();
              return;
            }
            setDrawerTop(headerRef.current?.getBoundingClientRect().bottom ?? null);
            setOpen(true);
          }}
        >
          {open ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-6 bg-light-text" />
              <span className="block h-0.5 w-6 bg-light-text" />
              <span className="block h-0.5 w-6 bg-light-text" />
            </span>
          )}
        </button>
      </div>

      {/* Desktop: dims the page under an open panel, so the menu has the
          focus. Never takes the pointer, so moving onto the page still
          leaves the header and closes the menu. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-[calc(100%+1px)] hidden h-[100dvh] bg-bg/25 transition-opacity duration-200 md:block",
          menu ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Services: Design & build | Grow & scale | featured case study,
          then the quick links. */}
      <MenuPanel open={menu === "services"}>
        <div className={cn("grid divide-x divide-light-border", FEATURED_COLS)}>
          <MenuColumn label={servicesMenu.groups.build}>
            <MenuLinks items={servicesMenu.build} onNavigate={close} />
          </MenuColumn>
          <MenuColumn label={servicesMenu.groups.grow}>
            <MenuLinks items={servicesMenu.grow} onNavigate={close} />
          </MenuColumn>
          <MenuColumn label={servicesMenu.featured.label}>
            <MenuFeatured featured={servicesMenu.featured} onNavigate={close} />
          </MenuColumn>
        </div>
        <MenuQuickLinks
          viewAll={servicesMenu.viewAll}
          links={servicesMenu.quickLinks}
          onNavigate={close}
        />
      </MenuPanel>

      {/* Industries: three groups of four | featured industry page, then the
          quick links. */}
      {industryMenu ? (
        <MenuPanel open={menu === "industries"}>
          <div
            className={cn(
              "grid divide-x divide-light-border",
              industryMenu.featured
                ? "grid-cols-[repeat(3,minmax(0,1fr))_16rem] xl:grid-cols-[repeat(3,minmax(0,1fr))_22rem]"
                : "grid-cols-3",
            )}
          >
            {industryMenu.groups.map((group) => (
              <MenuColumn key={group.label} label={group.label}>
                <MenuLinks items={group.items} onNavigate={close} />
              </MenuColumn>
            ))}
            {industryMenu.featured ? (
              <MenuColumn label={industryMenu.featured.label}>
                <MenuFeatured featured={industryMenu.featured} onNavigate={close} />
              </MenuColumn>
            ) : null}
          </div>
          <MenuQuickLinks
            viewAll={industryMenu.viewAll}
            links={industryMenu.quickLinks}
            onNavigate={close}
          />
        </MenuPanel>
      ) : null}

      {/* Resources: Learn (two thirds) | the latest article, then the quick
          links. Learn is plain links, no descriptions, and the comparisons
          appear as one link to the /compare hub once it has a
          route (owner, 20 Nov 2026: no per-comparison links for now). */}
      <MenuPanel open={menu === "resources"}>
        <div className={cn("grid divide-x divide-light-border", FEATURED_COLS)}>
          <MenuColumn label={resourcesMenu.learn.label} className="col-span-2">
            <MenuLinks items={learnItems} columns={2} onNavigate={close} />
          </MenuColumn>
          {resources?.featured ? (
            <MenuColumn label={resources.featured.label}>
              <MenuFeatured featured={resources.featured} onNavigate={close} />
            </MenuColumn>
          ) : null}
        </div>
        <MenuQuickLinks
          viewAll={resourcesMenu.viewAll}
          links={resourcesMenu.quickLinks}
          onNavigate={close}
        />
      </MenuPanel>

      {/* Phone drawer: full-screen overlay below the bar, so opening it never
          pushes the page down. Positioned absolute with an explicit viewport
          height (NOT fixed: the bar's backdrop-filter makes the header the
          containing block for fixed children, which collapsed the drawer to
          zero height). `inert` while closed, so its links are neither
          focusable nor in the accessibility tree. */}
      <div
        inert={!open}
        style={drawerTop !== null ? { height: `calc(100dvh - ${drawerTop}px)` } : undefined}
        className={cn(
          "absolute inset-x-0 top-full z-40 flex h-[calc(100dvh-4rem)] flex-col bg-light-bg transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Same landmark label as the desktop list: the two are mutually
            exclusive by viewport, and this one is inert while closed, so
            exactly one is ever exposed. Three screens share the area: the
            main list, and Services and Industries, each replacing it when
            opened. Only the showing screen is interactive. overflow-clip,
            not hidden: a hidden box can still be scrolled by the browser. */}
        <nav aria-label="Primary" className="relative min-h-0 flex-1 overflow-clip">
          <div
            inert={sub !== null}
            className={cn(
              "absolute inset-0 overflow-y-auto transition-[opacity,translate] duration-200",
              sub ? "pointer-events-none -translate-y-1 opacity-0" : "opacity-100",
            )}
          >
            <ul className="px-[clamp(20px,4vw,64px)]">
              {items.map((item) => {
                const itemMenu = menuOf(item);
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
                        className={drawerRow}
                      >
                        {item.label}
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    ) : (
                      <Link href={item.href} className={drawerRow} onClick={closeDrawer}>
                        {item.label}
                        <DrawerArrow />
                      </Link>
                    )}
                  </li>
                );
              })}
              {/* The secondary CTA lives in the list; the primary one is
                  pinned below. */}
              <li>
                <Link href={audit.href} className={drawerRow} onClick={closeDrawer}>
                  {audit.label}
                  <DrawerArrow />
                </Link>
              </li>
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
            <DrawerGroup
              label={servicesMenu.groups.build}
              items={servicesMenu.build}
              onNavigate={closeDrawer}
            />
            <DrawerGroup
              label={servicesMenu.groups.grow}
              items={servicesMenu.grow}
              onNavigate={closeDrawer}
            />
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
              {industryMenu.groups.map((group) => (
                <DrawerGroup
                  key={group.label}
                  label={group.label}
                  items={group.items}
                  onNavigate={closeDrawer}
                />
              ))}
              <DrawerViewAll link={industryMenu.viewAll} onNavigate={closeDrawer} />
            </DrawerSub>
          ) : null}

          <DrawerSub
            id="drawer-resources"
            title={labelFor("resources")}
            backLabel={nav.drawerBack}
            open={sub === "resources"}
            onBack={() => setSub(null)}
            backRef={(el) => {
              backs.current.resources = el;
            }}
          >
            {/* The same Learn links as on desktop. */}
            <DrawerGroup
              label={resourcesMenu.learn.label}
              items={learnItems}
              onNavigate={closeDrawer}
            />
            <DrawerViewAll link={resourcesMenu.viewAll} onNavigate={closeDrawer} />
          </DrawerSub>
        </nav>

        {/* The one primary CTA, pinned to the bottom. */}
        <div className="shrink-0 border-t border-light-border bg-light-bg px-[clamp(20px,4vw,64px)] pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button cta={quote} tone="light" className="w-full" onClick={closeDrawer} />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ *
 * Desktop panels
 * ------------------------------------------------------------------ */

/**
 * One desktop mega panel under the bar.
 *
 * top: 100% + 1px. `top-full` resolves against the header's padding box, so
 * the panel would start on the header's 1px bottom border and hide the
 * full-width rule under the bar whenever a menu was open.
 *
 * `inert` while closed. max-h-0 + opacity-0 clips the panel visually but
 * leaves its links in the tab order; inert removes the subtree from both the
 * tab order and the accessibility tree, which is what closed actually means.
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
        "absolute inset-x-0 top-[calc(100%+1px)] hidden overflow-hidden border-b border-[var(--rule)] bg-light-bg transition-[max-height,opacity] duration-200 md:block",
        open ? "max-h-[620px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
      )}
    >
      <div className="mx-auto max-w-[var(--container-site)] border-x border-light-border">
        {children}
      </div>
    </div>
  );
}

/**
 * A labelled panel column. Every column's header row is the same height, so
 * their bottom rules read as one line across the panel.
 */
function MenuColumn({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <p className="border-b border-light-border px-6 py-4 font-mono text-label uppercase track-label text-light-muted">
        {label}
      </p>
      <div className="flex-1 px-6 py-5">{children}</div>
    </div>
  );
}

/**
 * Icon-and-label rows: a bordered square (an icon, or a badge such as "VS"),
 * then the name, with an optional one-line description under it.
 */
function MenuLinks({
  items,
  columns = 1,
  onNavigate,
}: {
  items: MenuItem[];
  /** 2: rows fill left to right, for a column twice the usual width. */
  columns?: 1 | 2;
  onNavigate: () => void;
}) {
  return (
    <ul className={columns === 2 ? "grid grid-cols-2 gap-x-8 gap-y-1" : "flex flex-col gap-1"}>
      {items.map((it) => (
        <li key={it.href}>
          <Link
            href={it.href}
            className="group flex items-center gap-3 py-1.5"
            onClick={onNavigate}
          >
            <MenuChip item={it} large={Boolean(it.desc)} />
            <span className="min-w-0">
              <span className="block font-display text-body-lg font-medium leading-tight transition group-hover:text-accent">
                {it.label}
              </span>
              {it.desc ? (
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-light-muted">
                  {it.desc}
                </span>
              ) : null}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * The bordered square at the start of a menu row. `large` (44px, the site's
 * icon-chip size) for rows with a description line, so the label and its
 * description never stand taller than the square beside them; 32px for
 * single-line rows.
 */
function MenuChip({ item, large = false }: { item: MenuItem; large?: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text transition group-hover:border-accent group-hover:text-accent",
        large ? "h-11 w-11" : "h-8 w-8",
      )}
    >
      {item.badge ? (
        <span className="font-mono text-[10px] font-medium uppercase leading-none tracking-wide">
          {item.badge}
        </span>
      ) : item.icon ? (
        <FeatureIcon name={item.icon} className={large ? "h-5 w-5" : "h-4 w-4"} />
      ) : null}
    </span>
  );
}

/**
 * A panel's featured page: the image, then its title (and, for an article,
 * its "Read the article" line). No image, no frame: the title stands alone.
 */
function MenuFeatured({
  featured,
  onNavigate,
}: {
  featured: {
    title: string;
    href: string;
    image: string | null;
    /** CSS aspect-ratio of the image ("2 / 1"): shown whole, never cropped. */
    aspect?: string;
    cta?: string;
  };
  onNavigate: () => void;
}) {
  return (
    <Link href={featured.href} className="group flex flex-col" onClick={onNavigate}>
      {featured.image ? (
        <div
          className="relative mb-3 w-full overflow-hidden rounded-[6px] border border-light-border"
          style={{ aspectRatio: featured.aspect ?? "16 / 10" }}
        >
          <Image
            src={featured.image}
            alt=""
            fill
            sizes="(max-width: 1279px) 256px, 352px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : null}
      <p className="flex items-start gap-2 font-display font-medium leading-snug group-hover:text-accent">
        {featured.cta ? null : <span className="text-accent">+</span>}
        {featured.title}
      </p>
      {featured.cta ? (
        <span className="mt-2 inline-flex items-center gap-2 text-body font-medium text-light-muted transition group-hover:text-accent">
          {featured.cta}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </span>
      ) : null}
    </Link>
  );
}

/**
 * The row of quick links along a panel's bottom: "All …" with its arrow
 * first, then the related pages, each with a muted icon.
 */
function MenuQuickLinks({
  viewAll,
  links,
  onNavigate,
}: {
  viewAll: MenuLink;
  links: MenuLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-2 border-t border-light-border px-6 py-4">
      {[viewAll, ...links].map((link, i) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          className="group flex items-center gap-2 text-body font-medium text-light-text transition hover:text-accent"
          onClick={onNavigate}
        >
          <FeatureIcon
            name={link.icon}
            className="h-4 w-4 shrink-0 text-light-muted transition group-hover:text-accent"
          />
          {link.label}
          {i === 0 ? (
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Phone drawer
 * ------------------------------------------------------------------ */

/** One main row: big label, indicator on the right. */
const drawerRow =
  "flex w-full items-center justify-between gap-4 py-5 text-left font-display text-h3 font-medium leading-tight";

/** A link row's indicator. */
function DrawerArrow() {
  return (
    <span aria-hidden className="text-body-lg text-light-muted">
      &rarr;
    </span>
  );
}

/**
 * A submenu screen: its title with an × back to the list, then its links.
 * Replaces the main list in place (a short fade), and is inert while
 * another screen is showing.
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
        "absolute inset-0 overflow-y-auto bg-light-bg transition-[opacity,translate] duration-200",
        open ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0",
      )}
    >
      <div className="px-[clamp(20px,4vw,64px)] pb-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <p className="font-display text-h3 font-medium leading-tight">{title}</p>
          <button
            ref={backRef}
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className="-mr-2.5 flex h-11 w-11 items-center justify-center rounded-[6px] text-light-text"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** A labelled group of icon-and-label links on a submenu screen. */
function DrawerGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: MenuItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="mb-1.5 font-mono text-label uppercase track-label text-light-muted">
        {label}
      </p>
      <ul>
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="flex items-center gap-3 py-1.5 text-body-lg font-medium"
              onClick={onNavigate}
            >
              <MenuChip item={it} />
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A submenu screen's closing "All …" link. */
function DrawerViewAll({
  link,
  onNavigate,
}: {
  link: MenuLink;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={link.href}
      className="group mt-4 flex min-h-11 items-center gap-2 border-t border-light-border pt-3 text-body font-medium"
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

/* ------------------------------------------------------------------ *
 * Icons (inline Lucide, CLAUDE.md §15)
 * ------------------------------------------------------------------ */

/** Lucide "plus"; rotated 45° it reads as the × of an open menu. */
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

/** Lucide "x". */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
