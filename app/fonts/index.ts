import localFont from "next/font/local";

/*
 * WOFF2, subset to Latin and its extensions (scripts/subset-fonts.sh builds
 * them from the TTF/OTF masters in each folder). Performance pass, 20 Nov
 * 2026: the masters shipped as-is were 10 files and 1.5 MB, all preloaded,
 * and on a phone they held the largest paint back by 8 to 14 seconds.
 *
 * Preloaded: only the heading face (SF Pro Display), so headings are in
 * their real font from the first paint and never re-wrap. The body face and
 * the mono labels aren't preloaded: the browser fetches just the weights a
 * page uses, as soon as its CSS asks for them, and next/font's size-matched
 * fallback shows the text meanwhile. Measured: fonts per page 1.5MB to
 * ~380KB, phone LCP 11-17s to ~5s.
 */

/**
 * SF Pro Display — display / headings face (self-hosted, no CDN). This is the
 * blocky, tight-set look used across Stripe / Lightdash headlines.
 */
export const sfPro = localFont({
  src: [
    { path: "./sfpro/SFProDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./sfpro/SFProDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./sfpro/SFProDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

/** Saans Mono — technical accent for eyebrow labels / stat captions. */
export const saansMono = localFont({
  src: [
    { path: "./saans/SaansMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./saans/SaansMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

/** Inter Display — body / paragraph face (optical size cut of Inter). */
export const inter = localFont({
  src: [
    { path: "./inter-display/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./inter-display/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./inter-display/InterDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./inter-display/InterDisplay-Italic.woff2", weight: "400", style: "italic" },
    { path: "./inter-display/InterDisplay-MediumItalic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
  preload: false,
});
