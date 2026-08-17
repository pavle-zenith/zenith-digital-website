/**
 * 404 copy. The page a visitor lands on after a dead link is a navigation
 * problem, not a joke opportunity: say what happened in one line, then get out
 * of the way with the routes people actually wanted.
 *
 * The links below are the site's four highest-intent destinations. If the IA
 * changes, change them here.
 */
export const notFound = {
  code: "404",
  heading: "That page isn't here",
  body: "The link is either out of date or was never right. Nothing is broken on your end. Here's where most people are heading.",
  links: [
    {
      label: "Case studies",
      desc: "Named clients, real numbers",
      href: "/case-studies",
    },
    {
      label: "Services",
      desc: "What we build, and what it costs",
      href: "/services",
    },
    {
      label: "About",
      desc: "Who runs Zenith Digital",
      href: "/about",
    },
    {
      label: "Free website audit",
      desc: "A hand-reviewed look at your site",
      href: "/free-website-audit",
    },
  ],
  cta: { label: "Book a call", href: "/book-a-call", variant: "primary" as const },
  ctaSecondary: {
    label: "Back to the homepage",
    href: "/",
    variant: "secondary" as const,
  },
};
