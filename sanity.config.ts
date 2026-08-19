import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioBasePath } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

/**
 * The embedded Studio, mounted at /studio (CLAUDE.md §4). One workspace, one
 * dataset, one document type: the owner opens it, sees "Blog post", and never
 * meets a concept the blog does not use.
 *
 * The route is noindexed and kept out of sitemap.ts, so the Studio cannot end
 * up in search results alongside the site it edits.
 */
export default defineConfig({
  name: "default",
  title: "Zenith Digital",
  basePath: studioBasePath,
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
  apiVersion,
});
