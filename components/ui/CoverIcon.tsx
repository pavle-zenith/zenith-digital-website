/**
 * Lucide line icons (sourced via Iconify), keyed by name. Used by the
 * "what the call covers" grid on /book-a-call and the "what you'll get"
 * grid on /free-website-audit.
 */
export function CoverIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    // lucide:search-check
    audit: (
      <>
        <path d="m8 11 2 2 4-4" />
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    // lucide:filter
    leaks: <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />,
    // lucide:file-check-2
    proposal: (
      <>
        <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4M3 15l2 2 4-4" />
      </>
    ),
    // lucide:sparkles
    seo: (
      <>
        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4" />
        <circle cx="4" cy="20" r="2" />
      </>
    ),
    // lucide:bar-chart-3
    competitor: <path d="M3 3v18h18m-3-4V9m-5 8V5M8 17v-3" />,
    // lucide:gauge
    speed: <path d="m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0" />,
    // lucide:layout-template
    design: (
      <>
        <rect width="18" height="7" x="3" y="3" rx="1" />
        <rect width="9" height="7" x="3" y="14" rx="1" />
        <rect width="5" height="7" x="16" y="14" rx="1" />
      </>
    ),
    // lucide:message-square-text
    copy: (
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2zM7 11h10M7 15h6M7 7h8" />
    ),
    // lucide:gift
    keep: (
      <>
        <path d="M12 7v14m8-10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8m3.5-4a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" />
        <rect width="18" height="4" x="3" y="7" rx="1" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
