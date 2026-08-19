/**
 * Studio shell.
 *
 * The Studio is a full-screen application, and the site's root layout wraps
 * every route in the nav and footer. Rather than restructure all 15 routes
 * into a `(site)` group with a second root layout just to exempt one internal
 * tool, the Studio takes the viewport with a fixed overlay above the site
 * chrome. Same result for the owner, no churn across the rest of the app.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-white">
      {children}
    </div>
  );
}
