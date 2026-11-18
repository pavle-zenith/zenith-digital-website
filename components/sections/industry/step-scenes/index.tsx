import type { StepSceneName } from "@/content/industries";

import { BookingScene, DesignScene, PagesScene, SyncScene } from "./travel";
import { LaunchScene } from "./launch";
import {
  EcommerceCatalogueScene,
  EcommerceCheckoutScene,
  EcommerceDesignScene,
  EcommercePlatformScene,
} from "./ecommerce";
import {
  SaasConversionScene,
  SaasDesignScene,
  SaasPlatformScene,
  SaasPositioningScene,
} from "./saas";
import {
  CoachesBookingScene,
  CoachesHandoverScene,
  CoachesLeadScene,
  CoachesOfferScene,
  CoachesProofScene,
} from "./coaches";
import {
  CoursesLaunchPageScene,
  CoursesLibraryScene,
  CoursesOfferScene,
  CoursesPlatformScene,
} from "./courses";
import {
  PropertyAudienceScene,
  PropertyDesignScene,
  PropertyEnquiriesScene,
  PropertyListingsScene,
} from "./property";
import {
  MarineDesignScene,
  MarineEnquiriesScene,
  MarineListingsScene,
  MarineModelScene,
} from "./marine";
import {
  TradesProofScene,
  TradesQuoteScene,
  TradesSearchScene,
  TradesServicesScene,
} from "./trades";
import {
  ProFirstStepScene,
  ProLanguageScene,
  ProOfferScene,
  ProTrustScene,
} from "./professional-services";
import {
  CreativeEnquiryScene,
  CreativePortfolioScene,
  CreativeVideoScene,
  CreativeWorkScene,
} from "./creative";
import {
  LocalBookingScene,
  LocalEssentialsScene,
  LocalMenuScene,
  LocalSearchScene,
} from "./local-business";

/**
 * The animated vignettes beside each industry page's build steps, one per
 * step, showing what the step does. Pure CSS keyframes (wf-* in globals.css),
 * the same grammar as the service pages' "who this is for" scenes.
 *
 * GuideTabs mounts the active tab's scene only once the section is in view,
 * and remounts it whenever its tab is opened, so it plays from the start
 * each time. Every element's base style is its end state, so reduced motion
 * shows the finished frame.
 *
 * Keyed by the StepSceneName union, so adding a name without a scene is a
 * type error rather than an empty box.
 */

/**
 * The launch steps share one scene (./launch.tsx). Deadline pages name the
 * date the launch has to beat; the four "switch over without taking the
 * site down" pages use the switch-over variant.
 */
const TravelLaunch = () => <LaunchScene />;
const EcommerceLaunch = () => <LaunchScene milestone="Drop day" />;
const SaasLaunch = () => <LaunchScene milestone="Investor meeting" />;
const CoursesLaunch = () => <LaunchScene milestone="Enrolment opens" />;
const PropertyLaunch = () => <LaunchScene milestone="Sales release" />;
const MarineLaunch = () => <LaunchScene milestone="Boat show" />;
const TradesLaunch = () => <LaunchScene milestone="Switch-over" switchOver />;
const ProLaunch = () => <LaunchScene milestone="Go live" switchOver />;
const CreativeLaunch = () => <LaunchScene milestone="Go live" switchOver />;
const LocalLaunch = () => <LaunchScene milestone="Go live" switchOver />;

const SCENES: Record<StepSceneName, () => React.ReactElement> = {
  "travel-booking": BookingScene,
  "travel-sync": SyncScene,
  "travel-pages": PagesScene,
  "travel-design": DesignScene,
  "travel-launch": TravelLaunch,

  "ecommerce-platform": EcommercePlatformScene,
  "ecommerce-catalogue": EcommerceCatalogueScene,
  "ecommerce-design": EcommerceDesignScene,
  "ecommerce-checkout": EcommerceCheckoutScene,
  "ecommerce-launch": EcommerceLaunch,

  "saas-positioning": SaasPositioningScene,
  "saas-platform": SaasPlatformScene,
  "saas-design": SaasDesignScene,
  "saas-conversion": SaasConversionScene,
  "saas-launch": SaasLaunch,

  "coaches-offer": CoachesOfferScene,
  "coaches-proof": CoachesProofScene,
  "coaches-booking": CoachesBookingScene,
  "coaches-leadcapture": CoachesLeadScene,
  "coaches-handover": CoachesHandoverScene,

  "courses-offer": CoursesOfferScene,
  "courses-platform": CoursesPlatformScene,
  "courses-launchpages": CoursesLaunchPageScene,
  "courses-library": CoursesLibraryScene,
  "courses-launch": CoursesLaunch,

  "property-audience": PropertyAudienceScene,
  "property-listings": PropertyListingsScene,
  "property-design": PropertyDesignScene,
  "property-enquiries": PropertyEnquiriesScene,
  "property-launch": PropertyLaunch,

  "marine-model": MarineModelScene,
  "marine-listings": MarineListingsScene,
  "marine-enquiries": MarineEnquiriesScene,
  "marine-design": MarineDesignScene,
  "marine-launch": MarineLaunch,

  "trades-services": TradesServicesScene,
  "trades-quote": TradesQuoteScene,
  "trades-proof": TradesProofScene,
  "trades-localsearch": TradesSearchScene,
  "trades-launch": TradesLaunch,

  "pro-offer": ProOfferScene,
  "pro-trust": ProTrustScene,
  "pro-firststep": ProFirstStepScene,
  "pro-language": ProLanguageScene,
  "pro-launch": ProLaunch,

  "creative-work": CreativeWorkScene,
  "creative-video": CreativeVideoScene,
  "creative-portfolio": CreativePortfolioScene,
  "creative-enquiries": CreativeEnquiryScene,
  "creative-launch": CreativeLaunch,

  "local-essentials": LocalEssentialsScene,
  "local-booking": LocalBookingScene,
  "local-menu": LocalMenuScene,
  "local-localsearch": LocalSearchScene,
  "local-launch": LocalLaunch,
};

export function StepScene({ name }: { name: StepSceneName }) {
  const Scene = SCENES[name];
  return <Scene />;
}
