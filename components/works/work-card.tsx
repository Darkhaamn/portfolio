import Image from "next/image";
import Link from "next/link";

import type { Work } from "@/lib/works";

/** Uniform post card: image, tag, title, excerpt, then role and date. */
export function WorkCard({ work, priority }: { work: Work; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${work.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={work.thumbnail.src}
          alt={work.thumbnail.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {work.theme.label}
        </p>
        <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-zinc-950 group-hover:underline underline-offset-4 dark:text-zinc-100">
          {work.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {work.summary}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-zinc-500">
          <span className="truncate">{work.role}</span>
          {work.period ? <time className="shrink-0 tabular-nums">{work.period}</time> : null}
        </div>
      </div>
    </Link>
  );
}
