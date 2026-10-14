'use client';

import { useRef, type ReactNode, type PointerEvent } from 'react';
import Link from 'next/link';

export function PortalTilt({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const frame = useRef(0);
  function reset(e: PointerEvent<HTMLAnchorElement>) {
    cancelAnimationFrame(frame.current);
    e.currentTarget.style.removeProperty('--tilt-x');
    e.currentTarget.style.removeProperty('--tilt-y');
  }
  function move(e: PointerEvent<HTMLAnchorElement>) {
    if (
      !matchMedia('(hover: hover) and (pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const card = e.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      card.style.setProperty('--tilt-x', `${-y * 7}deg`);
      card.style.setProperty('--tilt-y', `${x * 7}deg`);
    });
  }
  return (
    <Link
      href={href}
      className={className}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </Link>
  );
}
