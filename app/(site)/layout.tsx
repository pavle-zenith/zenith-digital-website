import { Nav } from "@/components/layout/Nav";
import { industryMenu } from "@/content/industries";
import { getResourcesMenu } from "@/lib/resources-menu";
import { Footer } from "@/components/layout/Footer";

/**
 * Site chrome for every public route. A route group, so the URLs are
 * untouched: app/(site)/about is still /about. It exists so that one route,
 * /partner-showcase, can sit outside it with its own header and footer
 * (see that route's layout).
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The Resources menu's compare column and latest post (server-side, like
  // the Industries menu).
  const resources = await getResourcesMenu();
  return (
    <>
      <Nav industryMenu={industryMenu()} resources={resources} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
