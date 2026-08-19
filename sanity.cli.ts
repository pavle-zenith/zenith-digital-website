import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

/**
 * CLI config, used by `npx sanity schema deploy` and `npx sanity manage`.
 * Reads the same env module the app and the Studio read, so the three can
 * never point at different datasets.
 */
export default defineCliConfig({
  api: { projectId, dataset },
});
