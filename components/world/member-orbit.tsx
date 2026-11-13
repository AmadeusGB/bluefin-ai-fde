'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Twelve real DOM buttons remain searchable, focusable and readable without animation. */
export function MemberOrbit({
  children,
  paused,
  list,
  pageKey,
}: {
  children: ReactNode;
  paused: boolean;
  list: boolean;
  pageKey: string;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  useEffect(() => {
    const element = scene.current;
    if (!element || list) return;
    const nodes = Array.from(
      element.querySelectorAll<HTMLElement>('.member-node'),
    );
    if (!nodes.length) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const small = matchMedia('(max-width: 760px)');
    let width = element.clientWidth,
      height = element.clientHeight;
    let frame = 0,
      last = 0,
      hovering = false,
      focused = false,
      visible = true;
    function draw() {
      if (small.matches) {
        nodes.forEach((node) => {
          node.style.transform = '';
          node.style.zIndex = '';
        });
        return;
      }
      nodes.forEach((node, index) => {
        const phase =
          (index / nodes.length) * Math.PI * 2 + angle.current - Math.PI / 2;
        const depth = Math.sin(phase);
        const x = Math.cos(phase) * width * 0.405;
        const y = depth * height * 0.34;
        node.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${0.9 + 0.12 * depth})`;
        node.style.zIndex = String(10 + Math.round(depth * 5));
      });
    }
    function tick(time: number) {
      if (last)
        angle.current += ((Math.min(time - last, 40) / 1000) * Math.PI) / 48;
      last = time;
      draw();
      frame = requestAnimationFrame(tick);
    }
    function update() {
      cancelAnimationFrame(frame);
      last = 0;
      draw();
      if (
        !paused &&
        !reduced.matches &&
        !small.matches &&
        !hovering &&
        !focused &&
        visible &&
        !document.hidden
      )
        frame = requestAnimationFrame(tick);
    }
    const resize = new ResizeObserver(() => {
      width = element.clientWidth;
      height = element.clientHeight;
      update();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const enter = () => {
      hovering = true;
      update();
    };
    const leave = () => {
      hovering = false;
      update();
    };
    const focus = () => {
      focused = true;
      update();
    };
    const blur = (event: FocusEvent) => {
      focused = element.contains(event.relatedTarget as Node);
      update();
    };
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('focusin', focus);
    element.addEventListener('focusout', blur);
    document.addEventListener('visibilitychange', update);
    reduced.addEventListener('change', update);
    small.addEventListener('change', update);
    resize.observe(element);
    intersection.observe(element);
    update();
    return () => {
      cancelAnimationFrame(frame);
      nodes.forEach((node) => {
        node.style.removeProperty('transform');
        node.style.removeProperty('z-index');
      });
      resize.disconnect();
      intersection.disconnect();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('focusin', focus);
      element.removeEventListener('focusout', blur);
      document.removeEventListener('visibilitychange', update);
      reduced.removeEventListener('change', update);
      small.removeEventListener('change', update);
    };
  }, [paused, list, pageKey]);
  return (
    <div ref={scene} className={list ? 'member-list' : 'member-universe'}>
      {children}
    </div>
  );
}
