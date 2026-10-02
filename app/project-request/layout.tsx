import {
  RequestFooter,
  RequestHeader,
} from "@/components/sections/project-request/RequestChrome";

/**
 * /project-request sits outside the (site) group, like /partner-showcase, so
 * the site Nav and Footer never render here: the page is a link Pavle sends to
 * one person, and the nav's pricing and booking routes would only pull them
 * out of the form. The cookie banner and analytics come from the root layout
 * as on every route.
 */
export default function ProjectRequestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RequestHeader />
      <main id="main">{children}</main>
      <RequestFooter />
    </>
  );
}
