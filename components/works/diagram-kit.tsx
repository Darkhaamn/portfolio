import { cn } from "@/lib/utils";

/**
 * Shared visual language for the project diagrams.
 *
 * The rule: connections are drawn as real lines, never as icons between
 * stacked cards. A tier fans out to the next one through a stem, a crossbar
 * and a drop per node, so the geometry reads as a diagram rather than a list.
 */

/* ------------------------------------------------------------------ */
/* canvas                                                              */
/* ------------------------------------------------------------------ */

export function Canvas({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      {/* blueprint dot grid */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 text-zinc-300 dark:text-zinc-700"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          opacity: 0.35,
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* nodes                                                               */
/* ------------------------------------------------------------------ */

export type NodeTone = "default" | "accent" | "muted";

export function Node({
  label,
  sub,
  tone = "default",
  accent,
  accentBar,
  className,
}: {
  label: string;
  sub?: string;
  tone?: NodeTone;
  accent: string;
  accentBar: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-white px-4 py-2.5 text-center shadow-sm dark:bg-zinc-900",
        tone === "accent"
          ? "border-transparent ring-1 ring-inset"
          : tone === "muted"
            ? "border-dashed border-zinc-300 bg-zinc-50 shadow-none dark:border-zinc-700 dark:bg-zinc-900/50"
            : "border-zinc-200 dark:border-zinc-700",
        className,
      )}
      style={
        tone === "accent"
          ? { boxShadow: "inset 0 0 0 1px currentColor" }
          : undefined
      }
    >
      {tone === "accent" ? (
        <span className={cn("absolute inset-x-0 top-0 h-[2px]", accentBar)} aria-hidden />
      ) : null}
      <div
        className={cn(
          "text-sm font-medium leading-tight",
          tone === "accent" ? accent : "text-zinc-900 dark:text-zinc-100",
        )}
      >
        {label}
      </div>
      {sub ? (
        <div className="mt-0.5 font-mono text-[11px] leading-tight text-zinc-500">{sub}</div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* connectors                                                          */
/* ------------------------------------------------------------------ */

const LINE = "bg-current";

/**
 * Stem -> crossbar -> one drop per node in the tier below.
 * `count` must match the number of equal-width columns underneath.
 */
export function Fan({
  count,
  accent,
  label,
  height = 34,
}: {
  count: number;
  accent: string;
  /** Rendered as a chip sitting on the crossbar, the way a bus is labelled. */
  label?: string;
  height?: number;
}) {
  const inset = count > 1 ? `${100 / (count * 2)}%` : "50%";
  const half = height / 2;
  const line = { opacity: 0.45 };

  return (
    <div className={cn("relative w-full", accent)} style={{ height }} aria-hidden>
      {/* stem down from the node above */}
      <span
        className={cn("absolute left-1/2 top-0 w-px -translate-x-1/2", LINE)}
        style={{ height: half, ...line }}
      />
      {/* crossbar spanning the outer column centres */}
      {count > 1 ? (
        <span
          className={cn("absolute h-px", LINE)}
          style={{ top: half, left: inset, right: inset, ...line }}
        />
      ) : null}
      {/* one drop per column */}
      <div className="absolute inset-x-0 flex" style={{ top: half, height: half }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative flex-1">
            <span
              className={cn("absolute left-1/2 h-full w-px -translate-x-1/2", LINE)}
              style={line}
            />
            <span
              className={cn(
                "absolute bottom-0 left-1/2 size-1 -translate-x-1/2 translate-y-1/2 rounded-full",
                LINE,
              )}
              style={line}
            />
          </div>
        ))}
      </div>
      {/* bus label, seated on the crossbar at full strength */}
      {label ? (
        <span
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:bg-zinc-950"
          style={{ top: half }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

/**
 * The inverse of `Fan`: many columns above converge onto a single node below.
 */
export function Merge({
  count,
  accent,
  height = 34,
}: {
  count: number;
  accent: string;
  height?: number;
}) {
  const inset = count > 1 ? `${100 / (count * 2)}%` : "50%";
  const half = height / 2;
  const line = { opacity: 0.45 };

  return (
    <div className={cn("relative w-full", accent)} style={{ height }} aria-hidden>
      {/* one riser per column, up to the crossbar */}
      <div className="absolute inset-x-0 top-0 flex" style={{ height: half }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative flex-1">
            <span
              className={cn("absolute left-1/2 h-full w-px -translate-x-1/2", LINE)}
              style={line}
            />
            <span
              className={cn(
                "absolute left-1/2 top-0 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full",
                LINE,
              )}
              style={line}
            />
          </div>
        ))}
      </div>
      {/* crossbar */}
      {count > 1 ? (
        <span
          className={cn("absolute h-px", LINE)}
          style={{ top: half, left: inset, right: inset, ...line }}
        />
      ) : null}
      {/* single stem down to the node below */}
      <span
        className={cn("absolute left-1/2 w-px -translate-x-1/2", LINE)}
        style={{ top: half, height: half, ...line }}
      />
    </div>
  );
}

/** A horizontal connector for left/right layouts. */
export function Lead({
  accent,
  dir = "right",
  className,
}: {
  accent: string;
  dir?: "left" | "right";
  className?: string;
}) {
  return (
    <div className={cn("relative h-px flex-1", accent, className)} style={{ opacity: 0.45 }} aria-hidden>
      <span className={cn("absolute inset-0", LINE)} />
      <span
        className={cn(
          "absolute top-1/2 size-1.5 -translate-y-1/2 rotate-45 border-current",
          dir === "right" ? "right-0 border-r border-t" : "left-0 border-b border-l",
        )}
      />
    </div>
  );
}

/** Section heading shared by every diagram. */
export function DiagramSection({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100">{title}</h2>
      {caption ? <p className="mt-1 font-mono text-xs text-zinc-500">{caption}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}
