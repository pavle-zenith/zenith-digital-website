/**
 * Test-only module resolution, loaded by `npm test` through `--import`.
 *
 * Node runs the .ts sources directly (type stripping), but it does not read
 * tsconfig: it knows neither the `@/` path alias nor extensionless relative
 * imports, both of which the app code uses because the bundler resolves them.
 * This hook maps `@/x` to the repo root and retries a missing relative or
 * aliased import with `.ts`, which is all the tested modules need. No
 * dependency, nothing shipped.
 */
import { registerHooks } from "node:module";

const root = new URL("../", import.meta.url);

registerHooks({
  resolve(specifier, context, nextResolve) {
    const aliased = specifier.startsWith("@/") ? new URL(specifier.slice(2), root).href : specifier;
    try {
      return nextResolve(aliased, context);
    } catch (error) {
      const local = aliased !== specifier || aliased.startsWith(".") || aliased.startsWith("file:");
      if (!local || /\.[cm]?[jt]sx?$/.test(aliased)) throw error;
      return nextResolve(`${aliased}.ts`, context);
    }
  },
});
