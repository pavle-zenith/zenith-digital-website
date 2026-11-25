import Link from "next/link";
import { Fragment } from "react";

/**
 * The page trail in the guides' style: small mono caps, slash-separated,
 * the current page in full ink. An item without `href` (a parent that has no
 * page yet) is plain text, so the trail never links a 404.
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: { label: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center justify-center gap-y-1 font-mono text-label uppercase track-label text-light-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.label}>
              <li>
                {item.href && !last ? (
                  <Link href={item.href} className="transition hover:text-light-text">
                    {item.label}
                  </Link>
                ) : (
                  <span className={last ? "text-light-text" : undefined} aria-current={last ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
              {last ? null : (
                <li aria-hidden className="mx-2">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
