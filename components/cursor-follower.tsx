"use client";

import * as React from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function CursorFollower() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    // Respect reduced motion and touch devices.
    const mediaReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mediaCoarse = window.matchMedia?.("(pointer: coarse)");
    if (mediaReduce?.matches || mediaCoarse?.matches) return;

    const el = ref.current;
    if (!el) return;

    // Start hidden until we get first pointer event.
    el.dataset.visible = "false";

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      targetX = e.clientX;
      targetY = e.clientY;
      el.dataset.visible = "true";
    };

    const onLeave = () => {
      el.dataset.visible = "false";
    };
    const onVisibility = () => {
      if (document.visibilityState !== "visible") onLeave();
    };

    // Smooth follow; small lerp keeps it responsive.
    const tick = () => {
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * 0.18;
      y += dy * 0.18;

      // Sub-pixel transforms can shimmer; clamp to reasonable precision.
      const tx = Math.round(x * 10) / 10;
      const ty = Math.round(y * 10) / 10;

      el.style.setProperty("--cursor-x", `${tx}px`);
      el.style.setProperty("--cursor-y", `${ty}px`);

      // Slight scale change based on velocity (nice “alive” feel).
      const v = Math.hypot(dx, dy);
      const scale = 1 + clamp(v / 600, 0, 0.12);
      el.style.setProperty("--cursor-scale", scale.toFixed(3));

      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="cursor-follower"
      aria-hidden="true"
    >
      <div className="cursor-follower__ring" />
      <div className="cursor-follower__dot" />
    </div>
  );
}

