import Image from "next/image";

import type { Work } from "@/lib/works";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* browser chrome — these are real captures of the live products,      */
/* so framing them as browser windows is both honest and legible.      */
/* ------------------------------------------------------------------ */

function Chrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="block truncate rounded-md bg-white px-3 py-1 font-mono text-[11px] text-zinc-500 shadow-sm dark:bg-zinc-950 dark:text-zinc-400">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

function Shot({
  work,
  src,
  alt,
  priority,
  sizes,
  className,
}: {
  work: Work;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("relative bg-zinc-100 dark:bg-zinc-900", className)}>
      <Image
        src={src ?? work.thumbnail.src}
        alt={alt ?? work.thumbnail.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function WorkHeroBlock({ work }: { work: Work }) {
  const hero = work.hero ?? { kind: "browser" as const, url: work.links?.[0]?.label ?? "" };

  if (hero.kind === "none") return null;

  /* ---- two products side by side: same platform, two markets ---- */
  if (hero.kind === "split") {
    return (
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {hero.panes.map((pane, i) => (
          <figure key={pane.url} className="flex flex-col">
            <Chrome url={pane.url}>
              <Shot
                work={work}
                src={pane.src}
                alt={pane.alt}
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 46vw"
                className="aspect-16/10"
              />
            </Chrome>
            <figcaption className="mt-2.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {pane.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  /* ---- the clock is the story ---- */
  if (hero.kind === "numeral") {
    return (
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,300px)_1fr] md:items-stretch">
        <div
          className={cn(
            "flex flex-col justify-center rounded-2xl border p-7",
            work.theme.accentMuted,
          )}
        >
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "text-7xl font-semibold leading-none tracking-tighter tabular-nums",
                work.theme.accent,
              )}
            >
              {hero.value}
            </span>
            <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">
              {hero.unit}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {hero.note}
          </p>
        </div>
        <Chrome url={hero.url}>
          <Shot
            work={work}
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="aspect-16/9 md:aspect-auto md:h-[calc(100%-2.75rem)]"
          />
        </Chrome>
      </div>
    );
  }

  /* ---- default: the live product, framed ---- */
  return (
    <div className="mt-8">
      <Chrome url={hero.url}>
        <Shot work={work} priority sizes="(max-width: 1024px) 100vw, 896px" className="aspect-16/9" />
      </Chrome>
    </div>
  );
}
