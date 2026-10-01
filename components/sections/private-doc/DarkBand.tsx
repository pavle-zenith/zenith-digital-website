import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The navy, studio-textured ground the private documents put under their cover
 * and their price: the same ground the site's pricing band uses, spent only on
 * the sections that carry the verdict and the money (DESIGN.md, The Spent
 * Ground Rule). Wrap a `<Section tone="dark" className="bg-transparent">`.
 */
export function DarkBand({
  id,
  className,
  priority = false,
  children,
}: {
  id?: string;
  className?: string;
  /** Above the fold (a hero): load the texture eagerly. */
  priority?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className={cn("relative isolate overflow-hidden", className)}>
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          priority={priority}
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>
      {children}
    </div>
  );
}
