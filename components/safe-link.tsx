import type { ComponentPropsWithoutRef } from "react";

type SafeLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
};

/**
 * Uses the browser's native navigation path.
 *
 * The current Vinext production client bundle can fail while dynamically
 * resolving its client-side router. A real anchor keeps every route usable,
 * supports fragments and query strings, and remains crawlable without JS.
 */
export default function SafeLink({ href, children, ...props }: SafeLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
