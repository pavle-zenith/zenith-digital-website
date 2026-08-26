# Case study assets — one folder per client

Every case study detail page reads its images from `/case-studies/<slug>/`,
where `<slug>` matches the study's slug in `content/case-studies.ts`.

## Files per folder

| File | Used by | Format |
|---|---|---|
| `card.webp` | Card thumbnail on the /case-studies grid | 4:3, export 3840x2880, committed at 1920x1440 |
| `hero.webp` | Full-bleed band under the meta strip | 2:1, export 5760x2880, committed at 2880x1440 |
| `full-page.webp` | Scrolling laptop frame | RAW full-page capture at 1440 viewport, DPR 1, no browser chrome |
| `supporting-1.webp`, `-2.webp`, ... | Slider below the introduction | 4:3, export 3840x2880, committed at 1920 wide |

## Adding images to a study

1. Drop exports in this folder tree under the study's slug, following the
   names above. Numbering continues from the highest existing number.
2. Register each supporting image in the study's `gallery` array in
   `content/case-studies.ts` with a real `alt`. Nothing renders until it is
   registered; the file alone does nothing.
3. Downsample before committing (hero to 2880 wide, supporting to 1920 wide,
   full-page to 1440 wide, WebP q80-82). Source exports stay out of git.

## New study checklist

`card.webp` + `hero.webp` + `full-page.webp` + 3-5 supporting images,
registered in the card's `thumb` and the study's `heroShot`, `scrollShot`,
and `gallery` fields respectively.
