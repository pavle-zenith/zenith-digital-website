import {
  ShowcaseFooter,
  ShowcaseHeader,
} from "@/components/sections/partner-showcase/ShowcaseChrome";
import { partnerShowcaseSrUi } from "@/content/partner-showcase-sr";

/**
 * /izrada-sajtova: the Serbian showcase. Like /partner-showcase it sits
 * outside the (site) group, so the English site Nav and Footer never render
 * here, with the same chrome in Serbian. The whole page is marked Serbian
 * (Latin script) on its wrapper, as the Woodstone proposal does: the root
 * <html lang="en"> is shared by every route.
 */
export default function ShowcaseSrLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="sr-Latn">
      <ShowcaseHeader ui={partnerShowcaseSrUi} />
      <main id="main">{children}</main>
      <ShowcaseFooter ui={partnerShowcaseSrUi} />
    </div>
  );
}
