# Migration guide layout spec — long-form vs highlight sections

**Addendum to `Migration_Hub_Handoff.md`.** Written 19 August 2026.
**Reference:** Flow Ninja's `/migrations/wix-to-webflow` step-by-step section.

Claude Code implements this. Copy is supplied.

---

## The principle

The page alternates between two treatments. Long stretches of reading sit in a **single vertical column at reading measure**, like a good article. Between them, **designed sections** break the rhythm and carry the things worth looking at.

That contrast is the layout. Wall-to-wall cards reads as a brochure; wall-to-wall prose reads as a wiki. Neither converts.

---

## Which sections get which treatment

| Section | Treatment |
|---|---|
| `hero` | Highlight |
| `fit` | Highlight — two-column split |
| `transfers` | Highlight — the signature component |
| `steps` | **Long-form vertical** |
| `seoMechanics` | **Long-form vertical** |
| `mistakes` | **Long-form vertical** |
| `logistics` | Highlight — price and timeline card |
| `proof` | Highlight — existing `WorkStrip` |
| `sources` | Highlight — compact list |
| `faq` | Highlight — existing `Faq` accordion |
| `finalCta` | Highlight — existing `CtaBanner` |

Alternate navy and white across these per CLAUDE.md §7.3. The three long-form sections should not all land on the same background.

---

## Long-form vertical treatment

One column. No cards, no grid, no borders around items. It should read like a page of a book, not a dashboard.

**Measure and rhythm**

- Text column max-width `68ch` (CLAUDE.md §7), left-aligned within the container, **not** centred
- Section heading (`heading`) at `h2`
- Section `intro` at `body-lg`, muted
- Each item's `title` at `h3`
- Item `body` at `body`, leading `1.6`
- Vertical gap between items ~`64px`. Whitespace is the separator, not a rule or a card

**Steps get numbered by the component**, not in the content. Render as `Step 1 — Audit your existing site` using the item's index. The content file supplies only the title, so renumbering never requires a copy edit.

**`duration` renders as a small chip** beside or beneath the `h3`, using the existing `Pill` component. Present on steps only.

### The `points` array

This is the new part and it's what makes a long section scannable.

```ts
type Point = { label: string; body: string };
```

Render as a list where the `label` is **bold, inline**, followed by the `body` in normal weight on the same line, wrapping naturally:

> ● **Pull the ranking data:** Export every URL from Search Console with its impressions, clicks and average position over the last twelve months.

Specifics:

- Small accent-coloured bullet marker, not a default disc
- Label in `--text` at medium weight; body in `--text-muted` on dark, `--light-text` on light
- Insert the colon in the component. The content file does not include trailing punctuation on `label`
- Item spacing ~`16px`, tighter than the gap between blocks
- `lead` (when present) renders as a short line above the list, at `body`, muted

`points` is optional. `mistakes` and `seoMechanics` currently ship prose-only so the three long-form sections don't read identically. Handle both cases.

---

## Highlight sections

### `transfers` — the signature component

The one thing on this page nobody else has. Give it the most design attention.

- Full container width, wider than the reading measure
- One row per item: `item` on the left, a **status chip**, then `note`
- Four status states with distinct treatment:
  - `carries` — positive (`--positive`)
  - `rebuilt` — accent
  - `replaced` — neutral
  - `lost` — muted, and deliberately not alarming red. These are facts, not errors
- Notes are one sentence. If a row wraps past two lines at desktop width, the copy is too long: tell me rather than shrinking the type
- Rows separated by 1px hairlines, no card borders, no shadows
- **Mobile:** stack to `item` + chip on one line, `note` beneath. Never a horizontally scrolling table
- Sort order is authored deliberately (`carries` rows lead). Do not re-sort in the component
- A legend above the rows explaining the four states, since this vocabulary is ours

### `fit`

Two columns: `goodFit` and `notAFit`. Different markers, not colour alone (accessibility). `footnote` spans full width beneath. On mobile the good-fit column comes first.

### `sources`

Compact. Label as an external link, `note` beneath in muted small text. This section is credibility furniture, so it should look deliberate but never compete with the content above it.

---

## Definition of done

- [ ] Long-form sections render single-column at `68ch`, no cards
- [ ] Steps auto-numbered from index; `duration` renders as a `Pill`
- [ ] `points` render as bold-label bullets; colon inserted by the component
- [ ] Sections handle `points` being absent
- [ ] Transfers table full-width with four distinct status treatments and a legend
- [ ] Transfers stacks on mobile, never scrolls horizontally
- [ ] Navy and white alternate; the three long-form sections don't share a background
- [ ] Tokens only, no hardcoded hex, no shadows (CLAUDE.md §7 and §14)
- [ ] Keyboard navigable, visible focus rings, `prefers-reduced-motion` respected
