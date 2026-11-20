import { readFileSync } from "node:fs";
import { join } from "node:path";

import { COST_CALCULATOR_PATH, costCalculatorLive } from "@/content/tools/status";
import { SITE } from "@/lib/schema";

/**
 * /llms.txt. The text lives in content/llms.txt (edit it there); this route
 * serves it, adding lines for pages behind a publish switch only once they
 * are live. A static file in /public can't read a switch, which is why it
 * moved here (cost calculator brief, 20 Nov 2026). Prerendered at build.
 */
export const dynamic = "force-static";

/** Lines that join the file once their page is published, each after its anchor line. */
const gated = [
  {
    live: costCalculatorLive,
    after: /^- \[Pricing\]\(/,
    line: `  - [Website cost calculator](${SITE}${COST_CALCULATOR_PATH}): the year-one cost of a website with Zenith Digital, build price plus the platform plan on Wix Studio, custom code or Shopify, in EUR, GBP or USD, next to published UK market ranges`,
  },
];

export function GET() {
  let lines = readFileSync(join(process.cwd(), "content/llms.txt"), "utf8").split("\n");
  for (const g of gated) {
    if (!g.live) continue;
    const i = lines.findIndex((l) => g.after.test(l));
    if (i === -1) throw new Error(`llms.txt: no anchor line for ${g.line.slice(0, 40)}`);
    lines = [...lines.slice(0, i + 1), g.line, ...lines.slice(i + 1)];
  }
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
