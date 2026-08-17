import type { WhoForAnim } from "@/content/service-pages";

import { AgencyScene, LaunchScene, TemplateScene } from "./wix";
import { AdSpendScene, AiAnswerScene, SerpScene } from "./seo";
import { EditQueueScene, StackCostScene, UpkeepScene } from "./migration";
import { AdMismatchScene, CampaignDateScene, CapacityScene } from "./landing";
import {
  ManualHandlingScene,
  NoButtonScene,
  QuotedStackScene,
} from "./development";

/**
 * Animated scenes for the "Who this is for" panel — one custom vignette per
 * situation, replacing the static diagnostic card where content names one.
 * Pure CSS keyframes (wf-* in globals.css), no libraries.
 *
 * Each scene plays once per tab reveal (the parent remounts it on tab change)
 * and settles into its end state, which is also every element's base style,
 * so reduced motion — and any animation that never runs — shows the finished
 * composition rather than a blank frame. Scenes run inside ~5s, under the
 * panel's 6s auto-cycle, so none is cut off mid-play.
 *
 * The record is keyed by the union, so adding a name to WhoForAnim without a
 * scene is a type error rather than an empty panel.
 */
const SCENES: Record<WhoForAnim, () => React.ReactElement> = {
  // /services/wix-studio-website-design
  template: TemplateScene,
  agency: AgencyScene,
  launch: LaunchScene,
  // /services/seo-aeo-ppc
  serp: SerpScene,
  adspend: AdSpendScene,
  "ai-answer": AiAnswerScene,
  // /services/website-migration
  upkeep: UpkeepScene,
  "stack-cost": StackCostScene,
  "edit-queue": EditQueueScene,
  // /services/landing-pages
  "ad-mismatch": AdMismatchScene,
  "campaign-date": CampaignDateScene,
  "build-queue": CapacityScene,
  // /services/wix-studio-development
  "no-button": NoButtonScene,
  "quoted-stack": QuotedStackScene,
  "manual-handling": ManualHandlingScene,
};

export function WhoForScene({ name }: { name: WhoForAnim }) {
  const Scene = SCENES[name];
  return <Scene />;
}
