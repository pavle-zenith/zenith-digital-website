---
name: Zenith Digital
description: A drafting-table system of hairline-framed columns, near-black ink, and zero lift.
colors:
  bg: "#0a1020"
  surface: "#111a2e"
  surface-2: "#1a2540"
  border: "rgba(255, 255, 255, 0.09)"
  text: "#f6f8fc"
  text-muted: "#97a3bc"
  light-bg: "#ffffff"
  light-surface: "#f4f6fa"
  light-text: "#0a1020"
  light-muted: "#59637a"
  light-border: "#e6e9f1"
  accent: "#02013a"
  accent-hover: "#14134f"
  accent-ink: "#ffffff"
  accent-subtle: "rgba(2, 1, 58, 0.06)"
  accent-line: "rgba(2, 1, 58, 0.18)"
  positive: "#35c88c"
  positive-ink: "#187e55"
  negative: "#e5484d"
  negative-ink: "#c2262b"
  warning: "#f5a623"
  warning-ink: "#9f630a"
typography:
  display:
    fontFamily: "SF Pro Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "SF Pro Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "SF Pro Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Inter Display, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Saans Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  btn: "6px"
  card: "8px"
  pill: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
  24: "96px"
  32: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.btn}"
    padding: "12px 24px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-ink}"
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.btn}"
    padding: "12px 24px"
    typography: "{typography.body}"
  button-secondary-dark-hover:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text}"
  button-secondary-light:
    backgroundColor: "transparent"
    textColor: "{colors.light-text}"
    rounded: "{rounded.btn}"
    padding: "12px 24px"
    typography: "{typography.body}"
  button-secondary-light-hover:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-text}"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.light-muted}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    typography: "{typography.label}"
  pill-accent:
    backgroundColor: "{colors.accent-subtle}"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    typography: "{typography.label}"
  filter-tab:
    backgroundColor: "transparent"
    textColor: "{colors.light-text}"
    rounded: "{rounded.btn}"
    padding: "8px 16px"
    typography: "{typography.body}"
  filter-tab-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.btn}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.card}"
  input:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.btn}"
    padding: "12px 16px"
    typography: "{typography.body}"
  slider-arrow:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.btn}"
    height: "40px"
    width: "40px"
---

# Design System: Zenith Digital

## Overview

**Creative North Star: "The Drafting Table"**

Every section on this site is a measured column pinned between two visible rails, with a hairline rule drawn across the top. Nothing floats, nothing lifts, nothing casts a shadow. The frame is not decoration around the content; the frame is the evidence that the content was measured. A visitor scrolling the homepage is reading a drawing set, and the registration marks stay visible on purpose.

The palette is two grounds and one ink. White is the working ground and deep navy is the emphasis ground, spent deliberately rather than alternated on a beat: it marks the sections that carry proof and price. A near-black indigo does the pointing: a button fill, an active tab, the one figure in a section that matters. That ink is so dark it reads as authority rather than as color, which is exactly the register an agency selling checkable results should sit in. Where competitors reach for a bright accent to feel energetic, this system reaches for restraint and lets the numbers carry the volume.

Against all that geometry sits one material: a photographic studio texture, held at 28% and inverted on white, grounding the page heroes and the pricing band. It is the only softness in the system, and it works because everything around it is ruled and squared. Real client screenshots, real logos, real headshots do the rest. Nothing here is illustrated, stylized, or stood in for.

**Key Characteristics:**
- Hairline frame on every section: side rails plus a top rule, tone-aware so the lines read on navy and on white
- Absolute flatness at rest; depth is tonal fill and 1px borders, never elevation
- Two grounds, one ink (`#02013a`): white (`#ffffff`) is the default, navy (`#0a1020`) is reserved emphasis, not a rhythm
- SF Pro Display set tight (`-0.02em`) at Medium for headings; Saans Mono, uppercase, for labels only
- Restrained radii: 6px on controls, 8px on surfaces, full-round reserved for pills
- Numbers are typographic events, set in the display face at headline scale
- Motion is slow and mechanical: 35–70s marquees, 0.5s gradient pans, 0.3s arrow nudges

## Colors

Two full grounds and a single ink, plus faint tints for polish. The system carries no secondary or tertiary accent by design; where another palette would introduce a second hue, this one changes ground instead.

### Primary
- **Midnight Ink** (`#02013a`): The single accent. Button fills, active filter tabs, hover state on nav links and icon chips, and at most one key figure per section. So dark it functions as authoritative black-with-intent rather than as a color, which is why it can carry white text at full contrast and still never shout.
- **Midnight Ink Raised** (`#14134f`): The far end of the button hover pan only. Never a standalone fill.
- **Ink Wash** (`rgba(2,1,58,0.06)`) and **Ink Hairline** (`rgba(2,1,58,0.18)`): The polish layer. A near-invisible wash behind accent pills and a faint accent-tinted rule. These are the only permitted accent tints; there is no accent tonal scale.

### Neutral
- **Deep Navy** (`#0a1020`): The dark ground. Also serves as `light-text` on white sections, so the two grounds are literally the same two values inverted. That reciprocity is why the alternation feels engineered rather than decorative.
- **Navy Surface** (`#111a2e`) and **Navy Surface Raised** (`#1a2540`): Elevated and nested fills on dark. `surface-2` is the hover state for secondary buttons and slider arrows on navy.
- **Rail White** (`rgba(255,255,255,0.09)`): The hairline on dark. Every rail, rule, and grid gap on a navy section.
- **Near White** (`#f6f8fc`): Body ink on dark.
- **Cool Grey-Blue** (`#97a3bc`): Muted copy on dark. Section intros, stat captions, metadata.
- **Paper White** (`#ffffff`) and **Paper Grey** (`#f4f6fa`): The light ground and its elevated fill. `light-surface` is the hover for light secondary buttons and the fill behind nav mega-menu panels.
- **Paper Rule** (`#e6e9f1`) and **Slate Muted** (`#59637a`): The hairline and the muted copy on white.

### Feedback
- **Signal Green** (`#35c88c`) / **Signal Green Ink** (`#187e55`): Results-up marks. The base value is for fills and graphics only.
- **Signal Red** (`#e5484d`) / **Signal Red Ink** (`#c2262b`), **Signal Amber** (`#f5a623`) / **Signal Amber Ink** (`#9f630a`): Same split.

### Named Rules

**The One Ink Rule.** There is exactly one accent and it has no scale. Midnight Ink appears on the CTA, the active state, and one figure per section. If a design needs a second color to separate two things, it changes ground (navy to white) or changes weight, never hue.

**The -ink Split Rule.** Every feedback color ships as a pair: the base value clears 3:1 and is for fills and meaningful graphics; the `-ink` value is the only one permitted on text over a light fill. Using `#35c88c` for a word on white is a bug, not a style choice.

The `-ink` values clear 4.5:1 against **both** light grounds, white and `light-surface`. Measured (white / `#f4f6fa`): green 5.05 / 4.67, red 5.82 / 5.38, amber 4.93 / 4.55. That second ground is the part worth checking, because a value can pass on white and fail on the tinted surface: green (`#1e9e6a`) and amber (`#a2650a`) both did until they were darkened. Re-measure against both after any change.

**The Spent Ground Rule.** Navy is emphasis, not alternation. It is reserved for the sections that carry proof and price, and a long white run between them is the intended state rather than a defect: the emphasis only works because it is rare. A ground change is a decision about what the section is doing, never a decision about visual variety. Do not "restore alternation" by flipping sections to navy on a cadence.

**The Reciprocal Ground Rule.** `#0a1020` is the dark background and the light foreground; `#ffffff` is the light background. The two grounds are one relationship inverted, so a component written for one tone maps to the other by swapping token families (`bg`/`text`/`border` ↔ `light-bg`/`light-text`/`light-border`), never by inventing new values.

## Typography

**Display Font:** SF Pro Display (self-hosted, weights 400/500/700, fallback `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Inter Display (self-hosted, the optical-size cut of Inter, fallback `ui-sans-serif, system-ui, sans-serif`)
**Label/Mono Font:** Saans Mono (self-hosted, weights 400/500, fallback `ui-monospace, monospace`)

**Character:** SF Pro Display set at Medium with `-0.02em` tracking gives headings a blocky, tightly-packed silhouette that reads as engineered rather than expressive. Inter Display keeps body copy neutral and highly legible beneath it. Saans Mono appears only in small uppercase captions, where it acts as the drafting annotation on the drawing: it labels, it never speaks.

### Hierarchy
- **Display** (500, `clamp(2.75rem, 6vw, 5.5rem)`, 1.05): Hero headline only. One per page.
- **Headline** (500, `clamp(2.25rem, 4.5vw, 3.75rem)`, 1.08): Page-level H1 on interior pages, and the value in every `StatBlock`, which is why a metric reads with the same weight as a page title.
- **Title** (600, `clamp(1.75rem, 3vw, 2.5rem)`, 1.12): Section headings via `SectionHeader`. Set with `text-balance`.
- **Subtitle** (500, `1.5rem`, 1.2): Card and sub-section headings; also the mobile drawer's nav items.
- **Body Large** (400, `1.125rem`, 1.6): Section intros and lead paragraphs. Rendered in the muted token, never full-strength ink.
- **Body** (400, `1rem`, 1.6): Everything else, including all button and tab labels.
- **Label** (400, `0.8125rem`, `0.04em`, uppercase, mono): Eyebrows, stat captions, pill text, nav column headers. Measure caps at `68ch` (`--measure`).

### Named Rules

**The Annotation Rule.** Saans Mono is uppercase, small, and letterspaced, and it only ever labels something else. It never sets a heading, a paragraph, a button, or a tab. A control is something you click, so it takes the body face; a caption is something you read off a drawing, so it takes mono.

**The Earned Eyebrow Rule.** `Eyebrow` returns `null` when empty, and that is the default state. A label goes above a heading only when it genuinely orients the reader. "Our Services" above a services section is the exact failure this rule exists to prevent.

**The Numbers-Are-Headings Rule.** A metric is set in the display face at headline scale with `leading-none`, and its caption sits directly beneath in mono. Numbers are the loudest typography on the page after the hero, because the proof is the pitch.

## Layout

Content lives in a centered `.frame` column: `max-width: 1440px`, horizontal padding of `clamp(20px, 4vw, 64px)`, and a 1px border on both inline edges. Section dividers are a top rule on the same frame (`.frame-divide`), so the vertical rails and horizontal rules form one continuous drawing down the page. The rule color is set by the section's tone (`--rule`: `rgba(255,255,255,.1)` on dark, `rgba(10,16,32,.1)` on light) so lines read correctly against both grounds without being restated per component.

Vertical rhythm is `--section-py: clamp(56px, 10vw, 160px)`, overridden per-section through `frameClassName` (e.g. `!py-14 md:!py-24`) where a band should sit tighter. Mobile padding is always smaller than desktop; a section that uses one value at both ends is a bug.

Two bleed utilities cancel the frame's padding so a block can reach the rails. `.frame-bleed` applies at every viewport and is for continuous strips only: horizontal rules, logo marquees, image tracks, CTA banners. `.frame-bleed-md` bleeds from 768px up and keeps the site gutter on phones, and it is the correct choice for anything card-, tab-, or grid-shaped. Content inside a bled block re-applies the gutter with `px-[clamp(20px,4vw,64px)]`.

Grids are hairline grids: `grid gap-px` over a rule-colored background with solid-filled cells, so the 1px gaps become the rules. Spacing follows a 4px base (`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`). Breakpoints are Tailwind defaults; `md` (768px) is the significant one, where the nav swaps from drawer to inline and `frame-bleed-md` engages. Section headers cap at `max-w-3xl` with `mb-12`; heading-to-paragraph spacing stays tight at `mt-3`/`mt-4`.

### Named Rules

**The No Double Hairline Rule.** A band sitting on a section boundary draws only its top rule. The element below it owns the separator: the next section's `.frame-divide`, or a grid's `border-t`. `border-y` on a boundary band produces two 1px lines with a hair of ground between them, and it is always wrong.

**The Rails Are Always On Rule.** The side rails are not a section treatment; they are the page's spine. A full-bleed background may extend past them, but content does not, and no section opts out of the frame.

## Elevation & Depth

This system is flat. There is no shadow scale and no elevation ramp. The only `box-shadow` written by hand is an explicit `shadow-none` cancelling a default, though Tailwind `ring-*` also compiles to `box-shadow` and the system uses it as a hairline, not as lift: `ring-1 ring-white/60` gives the featured pricing card a defined edge against the dark section behind it, and `ring-2 ring-light-bg` separates the overlapping hero avatars. A ring at rest, in a rule colour, at hairline width is a border drawn where `border` cannot reach. It is not elevation, and nothing else in the system may use it. Depth is otherwise expressed two ways and only two: a change of tonal fill (`bg` → `surface` → `surface-2` on dark, `light-bg` → `light-surface` on light) and a 1px hairline border. A card is distinguished from its ground by its rule and its fill, never by lift.

The single escape hatch is overlay: content that genuinely floats above the page (the video lightbox, the testimonial modal, the mobile drawer, the scrolled nav) may use a scrim and a backdrop blur, which is a different mechanism from elevation. Those use `bg-black/70 backdrop-blur-xl` for full-screen scrims, `bg-bg/55 backdrop-blur-md` for glass bars over media, and `bg-light-bg/70 backdrop-blur-xl` for the nav once scrolled. Nothing else in the system is permitted to blur or float.

### Named Rules

**The Zero Lift Rule.** No component casts a shadow at rest or on hover. If a design feels like it needs elevation, it needs a hairline or a surface tint instead. The only things allowed above the page plane are true overlays, and they announce themselves with a scrim, not a shadow.

**The Glass Is For Media Rule.** `backdrop-blur` exists to keep text legible over a photograph or over scrolling content. It is never a surface treatment on a card, a section, or a panel over flat color.

## Shapes

Restrained and squared. Controls take a 6px radius (`--radius-btn`): buttons, filter tabs, slider arrows, icon chips, inputs, and the inline media frames inside nav panels. Surfaces take 8px (`--radius-card`): cards, form containers, comparison tables. Full-round is reserved for pills: badges, industry tags, service tags, and the glass caption bars over media, where the shape itself signals "this is a label, not a control."

Borders are 1px and a rule token by default, and there are no double borders anywhere in the system. Two deliberate departures, both load-bearing rather than decorative: the process steps take a `border-t-2` in the accent so the lit progress reads at a glance across five columns, and the chart grid behind them uses a dashed rule because it is a measurement grid rather than a divider. A 2px border marks state; it is never a style choice. Media inside cards is squared at the top by the card's own `overflow-hidden` and separated from the caption by a full-width `border-b`, so an image never floats inside padding.

Icons are inline Lucide SVG paths kept in a local `Record<string, ReactNode>` map per component; no icon packages are installed. Icon chips are `h-11 w-11` (or `h-8 w-8` in dense nav rows) 6px-radius bordered squares on a surface fill. Inline text arrows are always the body-face `&rarr;` glyph carrying `.btn-arrow` or `.arrow-glyph`. Never a `>` chevron, and never set in the display face, which renders the arrow as a thin chevron and breaks the family.

### Named Rules

**The Squares-Not-Circles Rule.** Interactive controls are rounded rectangles at 6px. Slider arrows in particular are bordered 40px squares with a solid section-background fill, so sliding content cannot show through them. Circular buttons read as consumer-app furniture and do not belong on this drawing. One exception, and only this one: the before/after comparison handle is a `rounded-full` 44px thumb, because it is a draggable affordance on a track rather than a button, and every platform draws that control round.

## Components

### Buttons
- **Shape:** 6px radius (`--radius-btn`), `px-6 py-3`, body face at Medium, `gap-2` to the arrow.
- **Primary:** `.btn-animated`, a single-hue linear gradient from Midnight Ink to Midnight Ink Raised at 220% background-size, resting at `0% 50%` and panning to `100% 50%` over 0.5s on hover. White text (`accent-ink`). This pan is the one gradient-like effect the system permits.
- **Secondary:** Transparent with a 1px rule and section-colored text; hover fills `surface-2` on dark, `light-surface` on light. Passed the section's tone, always.
- **Arrow behavior:** Every button carries a two-glyph arrow inside an `overflow-hidden` span. On hover the resting arrow translates out to `170%` while a second slides in from `-170%`, both over 0.3s ease-out. `active:scale-[.99]` on press.
- **Responsive:** `w-full` on phones so CTA pairs stack as a column with centered labels, `sm:w-auto` above.
- **On navy:** the accent fill is nearly invisible against `#0a1020`. Use a white-filled button (`bg-white text-bg hover:bg-white/90`) on dark sections instead.

### Pills
- **Style:** Fully rounded, `px-3 py-1`, mono label, uppercase, `0.04em` tracking.
- **Default:** transparent with a 1px rule and muted text, tone-aware.
- **Accent:** `accent-subtle` wash with Midnight Ink text. The only place the wash token appears.

### Filter Tabs
- **Style:** 6px radius (deliberately a control, not a pill), 1px border, `px-4 py-2`, body face at Medium, `shrink-0 whitespace-nowrap` so an overflowing row scrolls rather than compressing.
- **Active:** Midnight Ink border and fill with white text. **Inactive:** rule border, section text, `light-surface` on hover.
- **Accessibility:** carries `aria-pressed`. Shared by the case-study grid and the blog index so the two filter bars are one control.

### Cards
- **Corner:** 8px. **Background:** `light-bg`. **Border:** 1px `light-border`. **Shadow:** none, ever.
- **Media:** `aspect-[16/10]`, `overflow-hidden`, `border-b` to the body, `object-cover`. On group hover the image scales to `1.02` over 500ms, the only transform in the card.
- **Padding:** `p-6` on phones, `p-8` from `sm`.

### Inputs
- **Style:** Full width, 6px radius, 1px `light-border`, white fill, `px-4 py-3`, muted placeholder.
- **Focus:** border shifts to `light-muted`; the global `:focus-visible` rule additionally draws a 2px Midnight Ink outline at 2px offset. **Label:** body face at Medium, `mb-1.5` above the field.
- **Error:** message in Signal Red Ink beneath the field with `role="alert"`, plus `aria-invalid` and `aria-describedby` on the input. The error names the problem and the recovery ("That doesn't look like a web address. Try yourwebsite.com"), never just "invalid".
- **Spam:** the three server-action forms (`contact`, `audit`, `partner`) carry an offscreen honeypot field and a per-IP rate limit. The inline single-field prompts that only route to a full form, like the homepage audit bar, do not: they submit nothing, so there is nothing to protect.

### Navigation
- **Style:** Sticky, `h-16`, 1px bottom rule, always light tone. Solid `light-bg` at rest; once scrolled it becomes `light-bg/70` with `backdrop-blur-xl` over a 300ms color transition. Solid again while the mobile drawer is open, so the bar never shows page content through the blur.
- **Logo:** display face, `body-lg`, Medium, lowercase, tight tracking.
- **Links:** body face at Medium in `light-text`; hover goes to Midnight Ink. Mega-menu rows pair a 6px icon chip with a title and a `0.8125rem` muted description; the chip's border and the title both go to Midnight Ink on row hover.
- **Mobile:** a three-bar button below `md` opens a full-height drawer. Items are display-face `text-h3` rows separated by rules; CTAs stack full-width at the bottom.

### Divided List
- **Style:** A vertical stack where every `<li>` takes a `border-t`, including the first, so the group reads as ruled rows with a line above the stack. Tone-aware. This is the recurring row pattern across services, pricing features, and FAQ lists, and it is preferred over card grids for anything list-shaped.

### Slider Arrows
- **Style:** 40px bordered squares at 6px radius with a solid section-background fill, `gap-2` between them.
- **Behavior:** Steps one card width plus the track gap. Arrows stay static; only the slides move. Tracks are `flex snap-x snap-mandatory overflow-x-auto` with the scrollbar hidden, slides `shrink-0 snap-start`. Sliders loop rather than dead-ending.
- **Accessibility:** `aria-label` of "Previous/Next {label}" plus `aria-controls` pointing at the track id.

### Verified Check
- **Style:** A scalloped 18px badge in `currentColor`, sitting beside every testimonial name on the site. Defaults to dark-section ink; a passed color class overrides it. This is the system's one piece of iconographic branding and it appears in exactly one context.

### Studio Texture
- **Style:** `/textures/studio-texture.jpg` at `opacity-[0.28]`, `invert` on light sections, `object-cover`, `aria-hidden`, `pointer-events-none`, confined to the frame column via `frame-bleed`.
- **Where:** page heroes and the pricing band. On light sections it carries a left-to-right `color-mix` gradient scrim (92% → 55% → 20% ground) so headline copy stays legible against the busy side.
- **Rule:** content over the texture is never transparent. Cards sitting on a textured band take a solid fill.

## Do's and Don'ts

### Do:
- **Do** wrap every section in `Section` with a tone, and put content in the `.frame` column. Override rhythm through `frameClassName`, never by abandoning the frame.
- **Do** express depth with a surface tint and a 1px hairline. `bg` → `surface` → `surface-2` on dark; `light-bg` → `light-surface` on light.
- **Do** build grids as `grid gap-px` over a rule-colored background with solid-filled cells, so the gaps become the rules.
- **Do** use `.frame-bleed` for continuous strips (rules, marquees, image tracks, CTA banners) and `.frame-bleed-md` for anything card-, tab-, or grid-shaped, so phones keep the gutter.
- **Do** pass `tone` down to every component that renders on both grounds. A component with hardcoded light colors will break the moment it lands on navy.
- **Do** reference tokens through Tailwind utilities (`bg-bg`, `text-text-muted`, `border-light-border`) or `var(--token)`. In Tailwind v4 arbitrary values, use parens (`px-(--gutter)`), never brackets, which silently emit nothing.
- **Do** set metrics in the display face at headline scale with a mono caption beneath.
- **Do** use a white-filled button on navy sections, where the Midnight Ink fill is invisible.
- **Do** ship the `-ink` variant of any feedback color the moment it becomes text on a light fill.
- **Do** inline icons as Lucide SVG paths in a local map per component.

### Don't:
- **Don't** add a `box-shadow`. Not on cards, not on hover, not "subtle." Overlays get a scrim and a blur; everything else stays flat.
- **Don't** use decorative gradients: no multi-stop or purple/blue "AI" gradients, no gradient text, no mesh gradients, no glowing orbs, no aurora or starfield grounds, no glassmorphism as a surface treatment. The single-hue button pan and the texture's ground scrim are the only exceptions.
- **Don't** put `border-y` on a band that sits at a section boundary. Top rule only; the element below owns the separator.
- **Don't** default to three equal cards in a row. Vary composition, use the divided-list row pattern where the content is list-shaped, and prefer editorial asymmetry over centered-everything.
- **Don't** ship stock-AI visuals: no floating 3D shapes, isometric illustrations, neon grids, generic stock hero photography, or emoji as icons. Real client screenshots, real logos, real team photos only.
- **Don't** put an eyebrow above a section by reflex. `Eyebrow` renders nothing when empty and that is the intended default.
- **Don't** set mono anywhere except small uppercase labels and captions. Buttons, tabs, headings, and paragraphs take the body or display face.
- **Don't** use a `>` chevron for an inline arrow, and don't set an arrow in the display face. Always the body-face `&rarr;` with `.btn-arrow` or `.arrow-glyph`.
- **Don't** make interactive controls circular. 6px squares, including slider arrows.
- **Don't** introduce a second accent hue or an accent tonal scale. Change ground or change weight instead.
- **Don't** let a section use the same vertical padding on phone and desktop.
