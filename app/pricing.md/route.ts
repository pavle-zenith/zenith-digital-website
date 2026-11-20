import {
  PRICING_UPDATED,
  includedMatrix,
  otherServices,
  pricePackages,
  pricingPage,
} from "@/content/pricing";
import { SITE } from "@/lib/schema";

/**
 * /pricing.md: the /pricing data as plain markdown for AI agents (pricing
 * page brief, 20 Nov 2026). Built from content/pricing.ts, the same reads as
 * the page, so a tier changed in content/home.ts changes both. Prerendered
 * at build like the page, and refreshed with it.
 */
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    "# Zenith Digital pricing",
    "",
    `Source: ${SITE}/pricing. Updated ${PRICING_UPDATED}. All prices in EUR unless marked.`,
    "",
    `> ${pricingPage.inShort.text}`,
    "",
    "## Website packages",
    "",
  ];

  for (const p of pricePackages) {
    lines.push(
      `### ${p.name}${p.badge ? ` (${p.badge})` : ""}`,
      "",
      `- Price: ${p.price}`,
      `- Billing: ${p.priceNote}`,
      `- Timeline: ${p.timeline}`,
      `- Scope: ${p.summary}`,
      `- ${p.featuresLabel.replace(/:$/, "")}:`,
      ...p.features.map((f) => `  - ${f}`),
      ...(p.href ? [`- More: ${SITE}${p.href}`] : []),
      "",
    );
  }

  lines.push(
    "## What's included, by package",
    "",
    `| | ${includedMatrix.columns.join(" | ")} |`,
    `| --- | ${includedMatrix.columns.map(() => "---").join(" | ")} |`,
    ...includedMatrix.rows.map(
      (r) =>
        `| ${r.label} | ${r.cells.map((v) => (typeof v === "string" ? v : v ? "Yes" : "No")).join(" | ")} |`,
    ),
    "",
    "## Other services",
    "",
    ...otherServices.rows.flatMap((r) => [
      `### ${r.service}`,
      "",
      `- Price: ${r.price}${r.priceNote ? ` (${r.priceNote})` : ""}`,
      `- ${"driversLabel" in r && r.driversLabel ? r.driversLabel : otherServices.driversLabel}:`,
      ...r.drivers.map((d) => `  - ${d}`),
      `- More: ${SITE}${r.href}`,
      "",
    ]),
    "",
    `## ${pricingPage.notIncluded.heading}`,
    "",
    pricingPage.notIncluded.intro,
    "",
    ...pricingPage.notIncluded.items.map((i) => `- ${i.title}: ${i.body}`),
    "",
    `## ${pricingPage.payment.heading}`,
    "",
    pricingPage.payment.scopeRule,
    "",
    ...pricingPage.payment.schedule.map((s) => `- ${s.name} (${s.note}): ${s.due}`),
    "",
    "## Questions",
    "",
    ...pricingPage.faq.items.flatMap((f) => [`**${f.q}**`, "", f.a, ""]),
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
