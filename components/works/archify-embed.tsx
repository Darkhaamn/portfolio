import { IconArrowUpRight } from "@tabler/icons-react";

import type { Work } from "@/lib/works";
import { cn } from "@/lib/utils";

/**
 * An Archify diagram, authored as a typed JSON spec under `diagrams/src/` and
 * delivered to `public/diagrams/` as a self-contained viewer. It ships its own
 * pan/zoom, tracing, theme switch and export, so it is embedded rather than
 * re-implemented — and lazily, because each artifact is a few hundred KB.
 *
 * The viewer draws its own title bar, so this block deliberately carries no
 * heading of its own; a second one would restate the page title. The caption
 * sits underneath, where it reads as a figure note rather than a section head.
 */
export function ArchifyEmbed({ work }: { work: Work }) {
  const a = work.archify;
  if (!a) return null;

  return (
    <section className="mt-12">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <span className={cn("block h-1 w-full", work.theme.accentBar)} aria-hidden />
        <iframe
          src={a.src}
          title={a.title}
          loading="lazy"
          /* The frame must be tall enough that the viewer never scrolls inside it.
             Widening does not help — the viewer scales the diagram with its width,
             so a wider frame needs a taller one. 740px clears the tallest layout
             measured across page widths; a diagram that needs less overrides it. */
          className={cn("block w-full border-0", a.heightClass ?? "h-[740px]")}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        {a.caption ? <p className="font-mono text-xs text-zinc-500">{a.caption}</p> : null}
        <a
          href={a.src}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider transition-opacity hover:opacity-70",
            work.theme.accent,
          )}
        >
          Open full size
          <IconArrowUpRight className="size-3.5" />
        </a>
      </div>
    </section>
  );
}
