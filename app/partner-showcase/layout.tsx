import {
  ShowcaseFooter,
  ShowcaseHeader,
} from "@/components/sections/partner-showcase/ShowcaseChrome";

/**
 * /partner-showcase sits outside the (site) group so the site Nav and Footer
 * never render here: they lead to public pricing and to the booking form,
 * which this page must not (see the page's own comment). The cookie banner
 * and analytics come from the root layout as on every route.
 */
export default function PartnerShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShowcaseHeader />
      <main id="main">{children}</main>
      <ShowcaseFooter />
    </>
  );
}
