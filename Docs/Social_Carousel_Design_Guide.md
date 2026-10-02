# Zenith Digital carousel design guide

**For:** Claude Design, when making Instagram and LinkedIn carousel posts for Zenith Digital.
**Source of truth:** the live site at thezenithdigital.com. Every rule here comes from how that site is actually built (its `DESIGN.md`, tokens and components), moved from a web page to a 1080 × 1350 slide.
**Read order:** §1 to §6 once, then use §7 to §9 to build, and run §12 before exporting.

---

## 0. Before you design anything

1. **Ask for the facts first.** A carousel is built from real numbers, real client names and real screenshots. If the brief doesn't supply them, ask. If you still don't have them, ship a visible `[bracketed placeholder]`. Never invent a metric, a client, a quote or a result.
2. **Load the assets in §13.** The textures, fonts, logos, headshots and screenshots are real files. Do not redraw, approximate or generate them.
3. **Pick one recipe from §9** before placing a single element. The recipe fixes the slide count, the order and which slides get the navy ground.

---

## 1. The brand in one minute

**Zenith Digital** is a Wix Studio web design agency based in Belgrade, Serbia, serving the UK, EU and US. It is a **Wix Legend Partner**, the top partner tier, roughly the top 1% of Wix builders. It builds custom sites when a client outgrows Wix, and its own site is the proof of that custom work. Founder: Pavle Maodus.

**Who reads the carousels:** owners and decision-makers at small and mid-sized businesses. They aren't technical, they check claims, and they're scrolling on a phone. Agencies buying white-label work are a second audience.

**What every carousel must do:** make one specific point a stranger can check, then point to one next step, either a call or the free website audit.

### Facts you may use (confirmed on the live site)

| Fact | Wording |
|---|---|
| Partner tier | Wix Legend Partner (lead with this; "top 1%" is secondary) |
| Volume | 100+ websites shipped |
| Revenue | €1M+ tracked client revenue |
| Ads | 5.96x average ROAS |
| Speed | 3–4 week average launch |
| Reliability | Zero downtime since 2019 |
| Scottish Luxury Experience | $521k in 7 months. Live in 4 weeks |
| Bel'Istria | 257% more impressions, year on year. Migrated off Wix Classic, 70+ pages ranking, top spot in AI answers |
| Fort Lauderdale Dock Rentals | 30+ warm leads |
| Hunting Brook Gardens | €140k in course sales |
| MOD Digital | 15+ landing pages driving €1M+ in client campaign revenue |
| Knode AI | Raising a Series A |
| Public pricing | The Minimum from €1,750 (2 weeks) · The Studio €3,750 (5 weeks) · The Zenith, custom |

### Never print

- Any dollar amount for Knode AI's raise. The client asked for it to be hidden. "Raising a Series A" only.
- White-label or partner wholesale prices. They're private.
- A number that isn't in the table above or in the brief you were given.

---

## 2. The idea: a drawing set

The website's design system is called **The Drafting Table**. Every section is a measured column between two visible rails, with a hairline rule across the top. Nothing floats, nothing casts a shadow, and the frame is the evidence that the content was measured.

A carousel takes that one step further: **each slide is one sheet from the same drawing set.** The rails sit in the same place on every sheet, and the two horizontal rules run edge to edge, so when someone swipes, the lines join up across the cut. The reader feels the continuity before they read a word. That is the signature. Protect it on every slide.

Three consequences:

- **The frame is never optional.** Every slide has the rails and both rules (§3).
- **The grounds are spent, not alternated.** White is the working ground. Navy is used for the slides that carry the proof and the price, and its weight comes from being rare.
- **The numbers do the shouting.** Results are set huge in the display face. Adjectives never are.

---

## 3. Canvas, frame and grid

### Canvas

- **1080 × 1350 px (4:5)** for both Instagram and LinkedIn.
- **6 to 10 slides.** Seven is the default.
- **Export:** one PNG per slide for Instagram, one PDF of all slides for a LinkedIn document post.

### The frame (identical on every slide)

| Element | Position | Spec |
|---|---|---|
| Left rail | x = 64 | 2px vertical line, full height |
| Right rail | x = 1016 | 2px vertical line, full height |
| Top rule | y = 120 | 2px horizontal line, **full width 0 to 1080** |
| Bottom rule | y = 1230 | 2px horizontal line, **full width 0 to 1080** |
| Header band | y 0 to 120 | Wordmark left, slide counter right |
| Footer band | y 1230 to 1350 | Series label left, swipe cue or URL right |
| Content column | x 112 to 968 (856px) | Everything you design lives here |
| Live area | y 168 to 1182 | 48px clear of each rule |

**Why 2px:** Instagram and LinkedIn show the slide at about a third of its size, so a 2px canvas line reads like the site's 1px hairline on a phone. A 1px line disappears.

**Rule colour:** `rgba(10,16,32,0.12)` on white and grey grounds, `rgba(255,255,255,0.12)` on navy.

**Header band:** at the left, the wordmark **zenith digital**, lowercase, SF Pro Display Medium 34px, tracking -0.02em. At the right, the counter `02 / 07` in Saans Mono 22px, uppercase, tracking 0.08em, muted colour.

**Footer band:** at the left, the series label in Saans Mono 22px uppercase, for example `CASE STUDY · BEL'ISTRIA`. At the right, `SWIPE →` on the cover only, nothing on middle slides, and `THEZENITHDIGITAL.COM` on the last slide. The arrow is always the body-face `→` (Inter), never `>`, `»` or a chevron icon.

### Grid

- 6 columns across the 856px content column, 24px gutters.
- 8px spacing base. Steps: `8, 16, 24, 32, 48, 64, 96, 128`.
- More space above a heading than below it. Heading to its paragraph: 24px. Section to section inside a slide: 64 to 96px.
- **Left-aligned, always.** No centred text blocks. Anchor the main block to the top third or the bottom third of the live area, never dead centre.
- At least 30% of the live area stays empty.

### The bridge (the swipe cue)

Once or twice per carousel, one horizontal element **crosses the slide edge** and continues on the next slide at exactly the same y: a hairline, a week track (§7.13) or a row of the stat band. It is the only thing allowed past the right rail, and it replaces "swipe" text on middle slides. Never more than two bridges per carousel.

### Platform safe zones

- Instagram's profile grid crops the cover to 3:4, losing about 34px each side. The rails at x = 64 / 1016 already clear that, so keep the cover headline inside the content column.
- LinkedIn overlays the document title across the top on hover. The header band absorbs it; never put content above y = 168.

---

## 4. Colour

Two grounds and one ink. No second accent, no gradients.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FFFFFF` | Default ground |
| `paper-grey` | `#F4F6FA` | Second light ground, panel fills on white |
| `paper-rule` | `#E6E9F1` | Solid rule colour where opacity isn't available |
| `navy` | `#0A1020` | Dark ground. Also the text colour on light grounds |
| `navy-surface` | `#111A2E` | Panels on navy |
| `navy-surface-2` | `#1A2540` | Nested panels on navy |
| `text-on-navy` | `#F6F8FC` | Body text on navy |
| `muted-on-navy` | `#97A3BC` | Secondary text on navy |
| `muted-on-paper` | `#59637A` | Secondary text on white and grey |
| `ink` | `#02013A` | **The one accent.** Buttons, the active item, one key figure per slide |
| `ink-wash` | `rgba(2,1,58,0.06)` | Fill behind an accent pill. Nothing else |
| `positive` / `positive-ink` | `#35C88C` / `#187E55` | Results up, ticks, "good" |
| `negative` / `negative-ink` | `#E5484D` / `#C2262B` | Critical issues, "poor" |
| `warning` / `warning-ink` | `#F5A623` / `#9F630A` | High-priority issues, "needs work" |

### Rules

- **One ink per slide.** The ink colour appears at most once per slide: the button, or the one number that matters. If you need to separate two things, change the ground or the weight, never the hue.
- **On navy, the ink is invisible.** Navy slides use white as their "accent": a white-filled button, or one figure in pure white against muted text.
- **The -ink split.** On white or grey, signal colours set as text always use the `-ink` value (`#187E55`, `#C2262B`, `#9F630A`). The bright base values are for dots, bars, ticks and fills only. On navy, the bright base value is the one that's readable as text.
- **Spent ground.** At most 3 navy slides per carousel, and only for the cover, the proof slide and the close. Never alternate navy and white every slide.
- **Colour is never the only signal.** Every coloured pill prints its word ("Critical", "Good").

---

## 5. Type

### Faces

| Role | Face | Fallback if the file can't be loaded |
|---|---|---|
| Display: headlines, numbers, wordmark | **SF Pro Display** (Regular 400, Medium 500, Bold 700) | Geist, then Inter Tight |
| Body: paragraphs, lists, buttons | **Inter Display** (Regular 400, Medium 500, SemiBold 600) | Inter |
| Labels: captions, counters, pills | **Saans Mono** (Regular 400, Medium 500) | Geist Mono, then JetBrains Mono |

Use the uploaded font files (§13). Fall back only if they genuinely can't be loaded, and keep the scale and tracking below either way.

### Scale (px on the 1080 canvas)

| Role | Face | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Numeral (hero metric) | SF Pro Display | 240 (range 200–300) | 500 | 0.9 | -0.04em |
| Display (cover headline) | SF Pro Display | 128 (range 112–144) | 500 | 1.0 | -0.035em |
| Headline (slide heading) | SF Pro Display | 80 (range 72–88) | 500 | 1.05 | -0.025em |
| Title (panel, step, card) | SF Pro Display | 52 (range 46–56) | 500 | 1.12 | -0.02em |
| Lead (sub-headline) | Inter Display | 40 | 400 | 1.35 | 0 |
| Body | Inter Display | 34 (never below 30) | 400 | 1.45 | 0 |
| Label (annotation) | Saans Mono | 26 (never below 24) | 400 | 1.3 | 0.06em, UPPERCASE |
| Chrome (header, footer) | Saans Mono | 22 | 400 | 1 | 0.08em, UPPERCASE |

### Rules

- **Sentence case everywhere.** No Title Case Headlines.
- Headlines are SF Pro Display **Medium**, set tight. Never bold body text to fake a heading.
- **Mono only labels.** Saans Mono is small, uppercase and letterspaced, and it only ever labels something else. It never sets a headline, a paragraph or a button.
- **Lead paragraphs are muted**, never full-strength ink. The headline carries the weight.
- **A metric is a heading.** Set it at numeral or headline size in the display face, with its caption in mono directly beneath.
- Use tabular figures for any column of numbers or prices.
- **Line length:** body never wider than the 856px column, and keep a lead to 2 lines.
- **Balance headlines.** No single word left alone on the last line.

---

## 6. Backgrounds

Every background below is something the website uses today. Use these and only these.

### B1 · Paper

Flat `#FFFFFF`. The default for most body slides.

### B2 · Paper grey

Flat `#F4F6FA`. Use it for a run of body slides, or to set a white panel apart.

### B3 · Navy

Flat `#0A1020`. Proof and price slides that already carry a busy element, such as a stat grid or a screenshot.

### B4 · Navy studio (the cover and close register)

- **Layers:** navy `#0A1020` ground, then `studio-texture.jpg` cover-fit at **16% opacity**.
- **On the site:** the audit and proposal heroes, the pricing band and the testimonial bands.
- **On a slide:** soft diagonal light streaks across deep navy. For a single big moment, such as a number cover, raise it to 22–28%.
- **Placement:** keep the brightest streaks away from the headline, flipping or offsetting the crop if needed. Use a different crop on each slide that carries it, so the texture never looks tiled.

### B5 · Paper studio (the light cover register)

- **Layers:**
  1. white ground;
  2. `studio-texture.jpg` with `filter: invert(1)` at **28% opacity**;
  3. a left-to-right white scrim: `linear-gradient(90deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.55) 60%, rgba(255,255,255,.20) 100%)`.
- **On the site:** the homepage and interior page heroes.
- **Text placement:** text always sits on the left, scrimmed side. The texture shows through on the right.

### B6 · The peak (reserved)

- **Layers:** navy ground, then `zenith-texture.jpg` (the snow-covered mountain) at **30% opacity**.
- **On the site:** only on The Zenith, the custom top pricing tier.
- **Where you may use it:** only for custom-build content, the top tier, or the brand name story. At most once per carousel, and never on a case study about a Wix Studio build.

### B7 · Glass bar (over media only)

- **Style:** `rgba(10,16,32,0.55)` with a 16px backdrop blur, white text, 14px radius or fully rounded.
- **On the site:** the stat bars that sit over case-study images.
- **Where you may use it:** only over a real screenshot or photo, to keep a stat readable. Never as a card style on a flat background.

### Do not use

- **`bg-texture.png` and `bg-texture-invert.jpg`**, the electric-blue ribbed-glass textures. They're in the repo but not used on the site, and they read as exactly the purple-blue "AI gradient" this brand bans.
- **`case-study-texture.jpg`**, the landscape photo. It isn't a brand asset.
- Any gradient, mesh, glow, orb, aurora, starfield, noise overlay, dot grid or graph-paper pattern. The hairline frame is the pattern.

---

## 7. Components

All of these are moved from the website. The radii are scaled up from web (6px controls, 8px cards) because the slide is shown at about a third of its size.

**7.1 Wordmark.** **zenith digital**, lowercase, SF Pro Display Medium, tracking -0.02em. There is no icon or logomark. Never uppercase it, outline it, add a gradient or lock it up with a tagline.

**7.2 Label.** Saans Mono, 26px, uppercase, 0.06em, muted colour. It captions a number, names a column or dates a finding. It never sits above a headline as a kicker.

**7.3 Pill.**
- **Shape:** fully rounded, 2px border, 10px × 22px padding, label type.
- **Default:** rule-colour border and muted text.
- **Accent:** `ink-wash` fill with `ink` text, no border; once per slide at most, light grounds only. The canonical accent pill is **Wix Legend Partner**.

**7.4 Status pill.**
- **Shape:** a pill with a 12px dot before the word.
- **Fill and text by status:**

| Status | Border | Text |
|---|---|---|
| Critical | `negative` at 40% | `negative-ink` |
| High | `warning` at 55% | `warning-ink` |
| Medium | `paper-rule` (grey fill) | `muted-on-paper` |
| Good | `positive` | `positive-ink` |

- **Dot:** always the bright base colour of its status.
- **Word:** always printed.

**7.5 Number chip.** A 72 × 72 square with a 10px radius, a 2px rule border and a `paper-grey` fill (`navy-surface` on navy). The numeral sits inside in SF Pro Display Medium 34px. Use it only when the order carries information: steps, ranked findings, the order of a handover. Never decorative 01 / 02 / 03.

**7.6 Hairline grid.** Cells are separated by 2px gaps showing the rule colour, with solid-filled cells. On white, use grey `#E6E9F1` gaps with white cells; on navy, `rgba(255,255,255,0.12)` gaps with navy cells. Use it for stat grids, comparisons and step sets. **Never** floating cards with shadows or gaps of bare background.

**7.7 Divided list.** Every row takes a 2px top rule, including the first. Rows have 28–32px vertical padding and body text at 34px. The icon leads each row at 40px:
- tick (`positive-ink` on white, `positive` on navy);
- cross (muted, never red, because a "no" is information, not an alarm).

Icons are Lucide outline paths at stroke 2 in a 24 viewBox.

**7.8 Stat block.** The numeral sits at 200–300px, with its mono caption 16px beneath. Only one stat per slide may take the ink (on white) or pure white against muted text (on navy).

**7.9 Stat band.**
- **Layout:** 2–4 stats in one hairline-grid row, each cell with a numeral at 120–150px plus its caption.
- **Canonical set:** 100+ websites shipped · €1M+ tracked client revenue · 5.96x average ROAS · 3–4 week launch.

**7.10 Screenshot.**
- **Frame:** a real client screenshot with a 2px `paper-rule` border, a 14px radius, a white backing and no tilt.
- **Placement:** inside the content column, or rail to rail (x 64 to 1016) as an image strip.
- **Caption:** below, in Inter Display 26px muted.
- **Phone screenshots:** never wider than half the column (416px). Set two side by side to compare.

**7.11 Testimonial.**
- **Client logo:** at the top, 44px tall, using the white mark on navy or the dark mark on white.
- **Quote:** SF Pro Display Regular 400 at 56px, line height 1.2, with real curly quotes.
- **Attribution:**
  - a headshot at 96 × 96 with a 14px radius (a rounded square, never a circle);
  - the name in Inter Display Medium 32px, followed by the scalloped verified tick (`verified.svg`, 28px, the colour of the text);
  - then role · company in 28px muted.
- **Exclusive mark:** the verified tick appears only on testimonial names.

**7.12 Price.**
- **Old price:** struck through, muted, 40px, with the new price beside it in SF Pro Display Medium.
- **Saving:** in a status pill (`positive-ink` on white, `positive` on navy).
- **Monthly plans:** always on their own panel, never in the same rows as one-time prices.

**7.13 Week track.** For a timeline row, draw N small segments (56 × 16px, 4px radius, 8px apart), one per week. Fill the active weeks with `ink` and leave the rest `paper-rule`. The track is decorative; the "Weeks 2 to 3" label is the content.

**7.14 Score gauge.** Use it on audit and teardown slides.
- **Arc:** a semicircle with a `rgba(255,255,255,0.10)` track on navy, and the arc filled to the score in the band colour (`positive` 75+, `warning` 40–74, `negative` under 40).
- **Score:** centred in the display face.
- **Band word:** under the score with a coloured dot, the word in near-white.

**7.15 Scorecard bar.** A row with the name, the score, a band pill and a 12px bar on a `paper-rule` track, filled to the score in the band's base colour.

**7.16 Button (close slide only).**
- **On white:** an `ink` fill with a white label, 10px radius, 28 × 56px padding, Inter Display Medium 34px, followed by `→`.
- **On navy:** a white fill with a navy label.
- **One per carousel.** Never a pill-shaped button.

**7.17 Founder sign-off.**
- **Elements:** Pavle's headshot (rounded square, 120px), `signature-pavle.png` beside it (inverted to white on navy), and `PAVLE MAODUS · FOUNDER` in mono.
- **Use:** on close slides only.

---

## 8. Slide templates

Coordinates are inside the live area (x 112–968, y 168–1182) unless stated.

### T1 · Cover, statement (B5 paper studio)

- **Headline:** Display 128px fits about 13 characters per line, so keep it to 6 words (about 40 characters). For up to 9 words, drop to 112px. Never more than 3 lines. Bottom-anchored to y ≈ 1100.
- **Lead:** 40px muted directly under it, at most 2 lines.
- **Top-left of the live area:** empty, or one proof pill (**Wix Legend Partner**) at y = 168.
- **Footer right:** `SWIPE →`.

### T2 · Cover, number (B4 navy studio at 22–28%)

- **Numeral:** 260px white, top-anchored at y ≈ 260.
- **Mono caption:** under the numeral, for example `MORE IMPRESSIONS, YEAR ON YEAR`.
- **Headline:** 72px, at most 8 words, bottom-anchored.
- **Client logo:** the white mark, 48px tall, bottom-left above the bottom rule.

### T3 · Cover, proof (B1 paper)

- **Screenshot:** a real screenshot as a rail-to-rail strip from y = 168 to about 780.
- **Glass bar:** a B7 bar over its bottom-left corner with one stat.
- **Headline:** 80px below it, at most 9 words.

### T4 · Point

- **Number chip:** at the top left, only if the slide is part of a sequence.
- **Headline:** 80px from y ≈ 300, at most 10 words.
- **Rule and body:** a 2px rule, then 34px body, at most 35 words.
- **Lower third:** empty, or one small supporting element such as a pill, a mini stat or a tiny screenshot.

### T5 · List

- **Headline:** 80px, at most 8 words.
- **List:** a divided list of 3 to 5 rows, at most 12 words per row, ticks or crosses (§7.7).

### T6 · Compare

- **Headline:** 72px.
- **Grid:** a two-column hairline grid with a Title-size header per column, then 3 to 5 rows of mark plus a short phrase.
- **Recommended side:** on the right, with full-strength text. The other side's text is muted, never red.

### T7 · Stats (B3 or B4)

- **Headline:** 64–72px.
- **Grid:** a 2 × 2 hairline grid of stat blocks, numerals at 150–180px with captions.
- **Highlight:** one numeral may be pure white; the rest are near-white.

### T8 · Teardown

- **Screenshot:** a real screenshot taking the top 55% of the live area.
- **Markers:** numbered markers pinned on it as 56px navy squares with white numerals and a 10px radius, each with a 2px hairline leader to the exact spot.
- **List:** underneath, a divided list where each row has the matching number, a status pill and one plain-language line.

### T9 · Quote (B1 or B4)

The testimonial component (§7.11) at full slide scale, with the quote at most 30 words, using the client's exact words. Never trim a quote so it says something they didn't.

### T10 · Process

- **Steps:** 4 to 5 rows, each a number chip plus a Title-size step name plus one body line.
- **Connector:** a 2px vertical rule joins the chips.
- **Alternative:** for a timeline, use rows of `WEEK 1` labels with week tracks (§7.13).

### T11 · Price (B4)

- **Tiers:** in rows: tier name (Title), what it is (body muted), timeline (label) and price (Headline size, tabular).
- **Featured tier:** may sit on a white panel inside the navy slide.
- **Limit:** public prices only (§1).

### T12 · Close (B4 or B1)

- **Headline:** 88px, at most 8 words.
- **Next step:** one line naming it (a call or the free audit) and its URL.
- **Button:** one (§7.16).
- **Sign-off:** the founder sign-off (§7.17) at the bottom.
- **Footer right:** `THEZENITHDIGITAL.COM`.

**Vary composition.** No two consecutive slides use the same template unless the second is a continuation (point 02 after point 01). Mix weights: a heavy slide (a stat, a screenshot) is followed by a light one (a point, a quote).

---

## 9. Recipes

Pick one. Grounds are marked **N** for navy (B3, B4 or B6) and **W** for white or grey (B1, B2 or B5).

| Recipe | Slides | Sequence |
|---|---|---|
| **Case study** | 7 | T2 N cover · T4 W the starting point · T5 W what we did · T3-style screenshot W · T7 N results · T9 W quote · T12 N close |
| **Teardown / audit** | 8 | T1 W cover · gauge slide N · T8 W finding 1 · T8 W finding 2 · T8 W finding 3 · T5 W what's working · T5 W the fix list · T12 N close (free audit) |
| **Opinion / myth** | 6 | T1 W cover · T4 W point 01 · T4 W point 02 · T6 W compare · T7 N proof · T12 W close |
| **How-to / checklist** | 7 | T1 W cover · T10 W the steps · T4 W × 3 detail · T5 W checklist · T12 N close |
| **Offer / pricing** | 6 | T1 W cover · T6 W compare · T11 N tiers · T10 W timeline · T9 W quote · T12 N close |

### Worked example A · Case study, Bel'Istria (7 slides)

| # | Template | Ground | Copy |
|---|---|---|---|
| 1 | T2 | B4 | Numeral **257%** · caption `MORE IMPRESSIONS, YEAR ON YEAR` · headline **Bel'Istria left Wix Classic. Search followed.** · Bel'Istria white logo |
| 2 | T4 | B1 | Headline **Where they started** · body **[Owner to supply: the problem with the old Wix Classic site, in one or two sentences.]** |
| 3 | T5 | B1 | Headline **What we did** · rows: **Migrated the site off Wix Classic** · **Built 70+ pages to rank on their own** · **Structured it to be quoted in AI answers** |
| 4 | T3-style | B1 | Screenshot `portfolio-blocky/belistria.webp` as a rail-to-rail strip · glass bar `70+ PAGES RANKING` · headline **The site that does the work now** |
| 5 | T7 | B3 | Headline **The result** · 2-cell stat band: **257%** `IMPRESSIONS, YEAR ON YEAR` · **70+** `PAGES RANKING` · one line under it: **Top spot in AI answers.** |
| 6 | T9 | B1 | Ivan Belobrajdic, Director, Bel'Istria: "Our collaboration on redesigning Bel'Istria was the beginning of a long-term partnership. Their composure and communication exceeded all standards." |
| 7 | T12 | B4 | Headline **Stuck on Wix Classic?** · line **We'll show you what moving would change. Free website audit at thezenithdigital.com/free-website-audit** · white button **Get the free audit →** · founder sign-off |

Footer series label on every slide: `CASE STUDY · BEL'ISTRIA`. The bridge runs between slides 4 and 5: the screenshot strip's bottom hairline continues into the stat band's top rule.

### Worked example B · Opinion, Wix Studio or custom (6 slides)

| # | Template | Ground | Copy |
|---|---|---|---|
| 1 | T1 | B5 | Headline **Wix Studio or custom?** · lead **Most businesses need the first. We build both. Here's how we decide.** · accent pill **Wix Legend Partner** |
| 2 | T4 | B1 | Chip **1** · headline **Wix Studio wins when your team edits weekly** · body **New pages, posts and case studies go live without a developer. Average launch: 3–4 weeks.** |
| 3 | T4 | B1 | Chip **2** · headline **Custom wins when the site is the product** · body **Complex integrations, unusual interactions, or code you need to own outright.** |
| 4 | T6 | B2 | Headline **Side by side** · columns **Custom** / **Wix Studio** · rows: Edit without a developer · Hosting included · Any layout or interaction · You own the code (ticks and crosses per column, Wix Studio on the right) |
| 5 | T7 | B4 | Headline **This website is our custom work** · stat band **100+** `WEBSITES SHIPPED` · **€1M+** `TRACKED CLIENT REVENUE` · pill **Wix Legend Partner** in its outline style |
| 6 | T12 | B1 | Headline **Not sure which you need?** · line **Ask us. We'll tell you straight, even if the answer is the cheaper one. thezenithdigital.com/book-a-call** · ink button **Book a call →** · founder sign-off |

Footer series label: `WIX STUDIO OR CUSTOM`. Bridge: a hairline between slides 2 and 3, where the rule under each headline sits at the same y and runs off the edge.

---

## 10. Copy rules

The voice is confident, direct and specific: the adults in the room. Lead with numbers and outcomes, never adjectives.

- **Limits:**
  - cover headline 6 words at 128px, 9 words at 112px, never more than 3 lines;
  - slide headline 10 words max;
  - body 35 words max per slide;
  - list rows 12 words max;
  - one idea per slide.
- **Every claim carries a number, a named client, or a checkable fact.** If it can't, cut it.
- **Sentence case, UK English** ("colours", "optimise"), contractions welcome.
- **No em dashes.** Use a full stop, a comma or a colon. Use an en dash only in number ranges (3–4).
- **No exclamation marks. No emoji. No hashtags on slides.**
- **No hedging:** never "we strive to", "we aim to", "we try to".
- **No forced rule of three.** "Faster, smarter, better" is a tell.
- **Banned words and phrases:** elevate, unlock, unleash, seamless, cutting-edge, robust, leverage, empower, delve, game-changer, bespoke, tailored solutions, one-stop shop, take your business to the next level, in today's fast-paced digital landscape, we're passionate about, at the end of the day.
- **Hooks that are banned:** "Stop doing X", "Nobody talks about this", "Here's why 👇", "Save this for later", "You won't believe", "Most people get this wrong" (unless followed on the same slide by the number that proves it).
- **Close:** name exactly one next step and its URL. Book a call: `thezenithdigital.com/book-a-call`. Free website audit: `thezenithdigital.com/free-website-audit`.
- **Captions** (if asked):
  - the first line repeats the cover's number or claim;
  - 2 to 4 short sentences;
  - one call to action;
  - at most 3 hashtags at the very end.

---

## 11. Anti-slop

If a slide shows any of these, it's wrong. Fix it before export.

### Visual

- Drop shadows, glows or "soft elevation" on anything. Depth is a fill change plus a hairline.
- Gradients of any kind: gradient text, purple-blue backgrounds, mesh, aurora, orbs, bokeh. The only exceptions are the B5 scrim and the B7 glass bar, both used exactly as specified.
- Glassmorphism cards on flat colour.
- 3D renders, floating shapes, isometric illustrations, neon grids, abstract "tech" art.
- Stock photography, AI-generated people, AI-generated "website screenshots", fake dashboards.
- Tilted device mockups, phones at an angle, laptops floating in space. Screenshots sit flat in their frame.
- Emoji or Unicode symbols used as icons. Icons are Lucide outline paths only.
- Circles where the system uses squares: round avatars, round icon chips, round buttons.
- Every slide the same layout. Every slide centred. Three identical cards in a row.
- An eyebrow label stacked above every headline.
- Decorative numbering (01 / 02 / 03) on things that aren't a sequence.
- Bright signal colours as text on white (`#35C88C` words are a bug; use `#187E55`).
- More than one ink element on a slide, or ink on navy where it vanishes.
- Text over the busy side of a texture.

### Copy

- Any invented figure, client, quote or result.
- Adjectives doing the job of a number ("amazing results", "stunning site").
- Em dashes, exclamation marks, emoji, Title Case, hype words (§10).
- A close with three different calls to action.

---

## 12. Export checklist

Run all of this on every carousel.

- [ ] Every slide is 1080 × 1350.
- [ ] Rails at x 64 / 1016, rules at y 120 / 1230, full width, 2px, rule colour.
- [ ] Wordmark top left, counter top right (`03 / 07`), footer label on every slide.
- [ ] Nothing outside x 112–968 except a bridge, a rail-to-rail image strip or the frame.
- [ ] At most 3 navy slides, and none used just for variety.
- [ ] At most one ink element per slide; none on navy.
- [ ] Signal colours set as text on light grounds use the `-ink` values.
- [ ] Every number appears in §1 or the brief. Every unknown is a visible `[placeholder]`.
- [ ] Every quote is verbatim and attributed with headshot, name, verified tick, role and company.
- [ ] Body text 30px or larger, labels 24px or larger, at most 35 body words per slide.
- [ ] No em dashes, exclamation marks, emoji or banned words.
- [ ] One next step on the close, with its URL.
- [ ] Viewed at 360px wide (phone size): the headline reads in one glance, and no text falls under 9pt.
- [ ] PNGs for Instagram, a single PDF for LinkedIn.

---

## 13. Assets to load

All paths are in the Zenith website repo. Upload them; don't recreate them.

| Asset | Path | Notes |
|---|---|---|
| Studio texture | `public/textures/studio-texture.jpg` | B4 (16–28% on navy), B5 (inverted, 28% on white) |
| Peak texture | `public/textures/zenith-texture.jpg` | B6 only, 30% on navy |
| Verified tick | `public/icons/verified.svg` | Testimonial names only, recolour to the text colour |
| Wix Legend badge | `public/certifications/wix-partner-legend.webp` | Proof slides, small, never as decoration |
| Wix Studio certifications | `public/certifications/wix-studio-web-designer.webp`, `wix-studio-developer.webp` | Same rule |
| Founder headshot | `public/team/pavle.jpg` | Rounded square |
| Founder signature | `public/signature-pavle.png` | Dark ink on transparent: invert to white on navy |
| Client logos, white | `public/logos-white/` | For navy grounds |
| Client logos, dark | `public/logos-dark/` | For white grounds (`belistria-white.png` in there is white, so use it on navy) |
| Testimonial headshots | `public/avatars/` | Filename matches the person, e.g. `ivan-belobrajdic.jpg` |
| Testimonial quotes | `content/testimonials-data.ts` | Copy quotes verbatim from here |
| Case study screenshots | `public/case-studies/<slug>/` (`hero.webp`, `full-page.webp`, `supporting-*.webp`), `public/portfolio-blocky/` | Real work only |
| Case study facts | `content/case-studies.ts` | Headline metric and one-line story per client |
| Fonts, display | `app/fonts/sfpro/SFProDisplay-Regular.otf`, `-Medium.otf`, `-Bold.otf` | |
| Fonts, body | `app/fonts/inter-display/InterDisplay-Regular.ttf`, `-Medium.ttf`, `-SemiBold.ttf` | |
| Fonts, labels | `app/fonts/saans/SaansMono-Regular.otf`, `SaansMono-Medium.otf` | |

---

## Appendix · Tokens and slide skeleton

Use this as the starting point for every slide. Change the ground class, keep the frame.

```html
<style>
  @font-face { font-family: "SF Pro Display"; src: url(SFProDisplay-Medium.otf); font-weight: 500; }
  @font-face { font-family: "SF Pro Display"; src: url(SFProDisplay-Regular.otf); font-weight: 400; }
  @font-face { font-family: "Inter Display"; src: url(InterDisplay-Regular.ttf); font-weight: 400; }
  @font-face { font-family: "Inter Display"; src: url(InterDisplay-Medium.ttf); font-weight: 500; }
  @font-face { font-family: "Saans Mono"; src: url(SaansMono-Regular.otf); font-weight: 400; }

  :root {
    --navy: #0A1020; --navy-surface: #111A2E; --navy-surface-2: #1A2540;
    --paper: #FFFFFF; --paper-grey: #F4F6FA; --paper-rule: #E6E9F1;
    --ink: #02013A; --ink-wash: rgba(2,1,58,.06);
    --positive: #35C88C; --positive-ink: #187E55;
    --negative: #E5484D; --negative-ink: #C2262B;
    --warning: #F5A623; --warning-ink: #9F630A;
    --display: "SF Pro Display", Geist, "Inter Tight", system-ui, sans-serif;
    --body: "Inter Display", Inter, system-ui, sans-serif;
    --mono: "Saans Mono", "Geist Mono", "JetBrains Mono", monospace;
  }

  /* Grounds set three variables; everything else reads them. */
  .w  { --ground: var(--paper);      --text: var(--navy);  --muted: #59637A; --rule: rgba(10,16,32,.12); }
  .g  { --ground: var(--paper-grey); --text: var(--navy);  --muted: #59637A; --rule: rgba(10,16,32,.12); }
  .n  { --ground: var(--navy);       --text: #F6F8FC;      --muted: #97A3BC; --rule: rgba(255,255,255,.12); }

  .slide { position: relative; width: 1080px; height: 1350px; overflow: hidden;
           background: var(--ground); color: var(--text); font-family: var(--body); }

  /* Texture layers sit under the frame. */
  .tex   { position: absolute; inset: 0; background: center / cover no-repeat; }
  .studio-dark  { background-image: url(studio-texture.jpg); opacity: .16; }
  .studio-light { background-image: url(studio-texture.jpg); opacity: .28; filter: invert(1); }
  .peak         { background-image: url(zenith-texture.jpg); opacity: .30; }
  .scrim { position: absolute; inset: 0; background: linear-gradient(90deg,
           rgba(255,255,255,.92) 0%, rgba(255,255,255,.55) 60%, rgba(255,255,255,.20) 100%); }

  /* The frame: rails full height, rules full width so they join across slides. */
  .rails { position: absolute; inset: 0 64px; border-inline: 2px solid var(--rule); }
  .rules { position: absolute; left: 0; right: 0; top: 120px; bottom: 120px;
           border-block: 2px solid var(--rule); }

  .band  { position: absolute; left: 112px; right: 112px; height: 120px;
           display: flex; align-items: center; justify-content: space-between; }
  .head  { top: 0; } .foot { bottom: 0; }
  .wordmark { font: 500 34px/1 var(--display); letter-spacing: -.02em; text-transform: lowercase; }
  .chrome { font: 400 22px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
  .arrow  { font-family: var(--body); }

  .live { position: absolute; left: 112px; right: 112px; top: 168px; bottom: 168px; }

  .display  { font: 500 128px/1.0 var(--display); letter-spacing: -.035em; text-wrap: balance; }
  .headline { font: 500 80px/1.05 var(--display); letter-spacing: -.025em; text-wrap: balance; }
  .title    { font: 500 52px/1.12 var(--display); letter-spacing: -.02em; }
  .numeral  { font: 500 240px/.9 var(--display); letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
  .lead     { font: 400 40px/1.35 var(--body); color: var(--muted); }
  .body     { font: 400 34px/1.45 var(--body); }
  .label    { font: 400 26px/1.3 var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
</style>

<!-- Example: T1 cover, B5 paper studio -->
<section class="slide w">
  <div class="tex studio-light"></div>
  <div class="scrim"></div>
  <div class="rails"></div>
  <div class="rules"></div>
  <div class="band head"><span class="wordmark">zenith digital</span><span class="chrome">01 / 06</span></div>
  <div class="live" style="display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:72px">
    <h1 class="display" style="margin:0">Wix Studio or custom?</h1>
    <p class="lead" style="margin:32px 0 0">Most businesses need the first. We build both. Here's how we decide.</p>
  </div>
  <div class="band foot"><span class="chrome">Wix Studio or custom</span><span class="chrome">Swipe <span class="arrow">→</span></span></div>
</section>
```
