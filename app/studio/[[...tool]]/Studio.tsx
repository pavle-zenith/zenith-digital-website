"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

/**
 * The client boundary the Studio needs.
 *
 * `sanity.config.ts` pulls in the Studio's plugins, which call React APIs that
 * only exist on the client (`createContext` among them). Importing it from a
 * server component makes Next evaluate that graph while collecting page data
 * and the build fails. Behind a "use client" module the server only ever holds
 * a reference, so the config is never evaluated server-side, and the route
 * file above stays a server component and can keep exporting metadata.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
