import Image from "next/image";
import Link from "next/link";

import type { Work } from "@/lib/works";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type WorkCardProps = {
  work: Work;
  priority?: boolean;
};

function MetricRow({ work }: { work: Work }) {
  if (!work.metrics?.length) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-zinc-100 dark:border-zinc-900 pt-3">
      {work.metrics.map((m) => (
        <div key={m.label} className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {m.value}
          </span>
          <span className="text-[11px] text-zinc-500 leading-tight">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

export function WorkCard({ work, priority }: WorkCardProps) {
  const { theme } = work;

  if (work.featured) {
    return (
      <Link
        href={`/works/${work.id}`}
        className="group relative block sm:col-span-2 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
      >
        <div className={cn("h-1 w-full", theme.accentBar)} />
        <div className="grid sm:grid-cols-2">
          <div className="relative aspect-16/10 sm:aspect-auto sm:min-h-[280px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={work.thumbnail.src}
              alt={work.thumbnail.alt}
              fill
              priority={priority}
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className={cn("text-[10px] font-mono uppercase tracking-widest", theme.accent)}>
                {theme.label}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                · Featured
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-medium tracking-tight text-zinc-950 dark:text-zinc-100">
              {work.title}
            </h2>
            {work.role ? (
              <p className="mt-1 text-xs font-mono text-zinc-500">
                {work.role} · {work.period}
              </p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {work.summary}
            </p>
            <MetricRow work={work} />
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors group-hover:text-zinc-950 dark:group-hover:text-zinc-100">
              View project
              <IconArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/works/${work.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={work.thumbnail.src}
          alt={work.thumbnail.alt}
          fill
          priority={priority}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 448px"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/50 to-transparent" />
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm",
            theme.accentMuted,
            theme.accent
          )}
        >
          {theme.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-medium tracking-tight text-zinc-950 dark:text-zinc-100">
            {work.title}
          </h2>
          <IconArrowUpRight className="size-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        {work.role ? (
          <p className="mt-0.5 text-[11px] font-mono text-zinc-500">
            {work.role} · {work.period}
          </p>
        ) : (
          <p className="mt-0.5 text-[11px] font-mono text-zinc-500">{work.period}</p>
        )}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {work.summary}
        </p>
        <div className="mt-auto">
          <MetricRow work={work} />
        </div>
      </div>
    </Link>
  );
}
