import localFont from "next/font/local";

/**
 * SF Pro Display — display / headings face (self-hosted, no CDN). This is the
 * blocky, tight-set look used across Stripe / Lightdash headlines.
 */
export const sfPro = localFont({
  src: [
    { path: "./sfpro/SFProDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "./sfpro/SFProDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "./sfpro/SFProDisplay-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

/** Saans Mono — technical accent for eyebrow labels / stat captions. */
export const saansMono = localFont({
  src: [
    { path: "./saans/SaansMono-Regular.otf", weight: "400", style: "normal" },
    { path: "./saans/SaansMono-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

/** Inter — body / UI face. Single variable file covers the full weight axis. */
export const inter = localFont({
  src: [
    { path: "./inter/InterVariable.ttf", weight: "100 900", style: "normal" },
    { path: "./inter/InterVariable-Italic.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});
