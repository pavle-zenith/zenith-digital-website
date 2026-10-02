import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import SiteNotFound from "./(site)/not-found";

export { metadata } from "./(site)/not-found";

/**
 * 404 for a URL that matches no route, and for an unknown slug on a route
 * with `dynamicParams = false` (/audit/nope). It renders under the root layout
 * alone, outside the (site) group, so it brings the site chrome with it and
 * is prerendered as a complete page. A 404 raised by notFound() inside a site
 * route uses app/(site)/not-found.tsx, which the (site) layout already wraps.
 *
 * Next serialises this root boundary into every page's payload, so the page
 * source of /partner-showcase carries this tree as data too. It is never
 * rendered there. A catch-all route that sent every unknown URL into the
 * (site) group would avoid that, but it makes those 404s render on demand,
 * and Next ships an on-demand 404 with an empty body that only fills in with
 * JavaScript. A complete 404 for every visitor and crawler wins.
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main">
        <SiteNotFound />
      </main>
      <Footer />
    </>
  );
}
