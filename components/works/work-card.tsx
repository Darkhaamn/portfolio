import Image from "next/image";
import Link from "next/link";

import { IconArrowUpRight } from "@tabler/icons-react";

import type { Work } from "@/lib/works";
import { cn } from "@/lib/utils";

type Size = NonNullable<Work["size"]>;

function Eyebrow({ work }: { work: Work }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn("h-px w-6 shrink-0", work.theme.accentBar)} aria-hidden />
      <span
        className={cn(
          "truncate text-[10px] font-mono uppercase tracking-widest",
          work.theme.accent,
        )}
      >
        {work.theme.label}
      </span>
    </div>
  );
}

function Metrics({ work, max }: { work: Work; max: number }) {
  if (!work.metrics?.length) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
      {work.metrics.slice(0, max).map((m) => (
        <div key={m.label} className="flex items-baseline gap-1.5">
          <span className={cn("text-sm font-semibold tracking-tight", work.theme.accent)}>
            {m.value}
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

function Shot({
  work,
  priority,
  className,
  sizes,
}: {
  work: Work;
  priority?: boolean;
  className?: string;
  sizes: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-zinc-100 dark:bg-zinc-900", className)}>
      <Image
        src={work.thumbnail.src}
        alt={work.thumbnail.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <span
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-zinc-950/5 dark:ring-white/10"
        aria-hidden
      />
    </div>
  );
}

const shell =
  "group relative flex overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700";

export function WorkCard({
  work,
  size = "third",
  priority,
  flip,
}: {
  work: Work;
  size?: Size;
  priority?: boolean;
  flip?: boolean;
}) {
  const href = `/projects/${work.id}`;

  /* ---------- feature: editorial split, alternating side ---------- */
  if (size === "feature") {
    return (
      <Link href={href} className={cn(shell, "flex-col md:min-h-[320px] md:flex-row")}>
        <span className={cn("h-1 w-full md:h-auto md:w-1", work.theme.accentBar)} aria-hidden />
        <Shot
          work={work}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 55vw"
          className={cn(
            "aspect-16/9 w-full md:aspect-auto md:w-[55%]",
            flip && "md:order-2",
          )}
        />
        <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
          <div>
            <Eyebrow work={work} />
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-zinc-950 dark:text-zinc-100">
              {work.title}
            </h2>
            {work.role || work.period ? (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                {[work.role, work.period].filter(Boolean).join(" · ")}
              </p>
            ) : null}
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {work.summary}
            </p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <Metrics work={work} max={3} />
            <IconArrowUpRight className="size-5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    );
  }

  /* ---------- half / third: image over content ---------- */
  const isHalf = size === "half";
  return (
    <Link href={href} className={cn(shell, "flex-col")}>
      <span className={cn("h-1 w-full", work.theme.accentBar)} aria-hidden />
      <Shot
        work={work}
        priority={priority}
        sizes={isHalf ? "(max-width: 768px) 100vw, 46vw" : "(max-width: 768px) 100vw, 30vw"}
        className={isHalf ? "aspect-16/9 w-full" : "aspect-16/10 w-full"}
      />
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <Eyebrow work={work} />
          <h2
            className={cn(
              "mt-2.5 font-medium tracking-tight text-zinc-950 dark:text-zinc-100",
              isHalf ? "text-lg" : "text-base",
            )}
          >
            {work.title}
          </h2>
          {work.role || work.period ? (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              {[work.role, work.period].filter(Boolean).join(" · ")}
            </p>
          ) : null}
          {isHalf ? (
            <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {work.summary}
            </p>
          ) : null}
        </div>
        <div className="flex items-end justify-between gap-3">
          <Metrics work={work} max={isHalf ? 2 : 1} />
          <IconArrowUpRight className="size-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
