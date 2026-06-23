import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Work } from "@/lib/works";
import {
  IconArrowLeft,
  IconChevronDown,
  IconExternalLink,
  IconPhoto,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type WorkDetailProps = {
  work: Work;
};

function MetricBand({ work }: WorkDetailProps) {
  if (!work.metrics?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
      {work.metrics.map((m) => (
        <div key={m.label} className="px-5 py-5 sm:px-6">
          <div className={cn("text-2xl md:text-3xl font-semibold tracking-tight", work.theme.accent)}>
            {m.value}
          </div>
          <div className="mt-1 text-xs text-zinc-500">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

function WorkArchitecture({ work }: WorkDetailProps) {
  const arch = work.architecture;
  if (!arch?.tiers?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100">Architecture</h2>
      {arch.caption ? (
        <p className="mt-1 mb-5 text-xs font-mono text-zinc-500">{arch.caption}</p>
      ) : (
        <div className="mb-5" />
      )}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-col items-center">
          {arch.tiers.map((tier, i) => (
            <div key={tier.label ?? i} className="flex w-full flex-col items-center">
              {tier.label ? (
                <span className="mb-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  {tier.label}
                </span>
              ) : null}
              <div className="flex w-full flex-wrap justify-center gap-3">
                {tier.nodes.map((node) => (
                  <div
                    key={node.label}
                    className="min-w-[160px] max-w-[280px] flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-center shadow-sm"
                  >
                    <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {node.label}
                    </div>
                    {node.sub ? (
                      <div className="mt-0.5 text-[11px] font-mono text-zinc-500">{node.sub}</div>
                    ) : null}
                  </div>
                ))}
              </div>
              {i < arch.tiers.length - 1 ? (
                <IconChevronDown className={cn("my-2 size-4", work.theme.accent)} aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-zinc-100 dark:border-zinc-900 last:border-0">
      <span className="text-[11px] uppercase tracking-wide text-zinc-500 shrink-0">{label}</span>
      <span className="text-sm text-zinc-800 dark:text-zinc-200 text-right">{value}</span>
    </div>
  );
}

function WorkMeta({ work }: WorkDetailProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 px-5 py-2 bg-white dark:bg-zinc-950">
        {work.role ? <MetaRow label="Role" value={work.role} /> : null}
        {work.period ? <MetaRow label="Period" value={work.period} /> : null}
        {work.launched ? <MetaRow label="Launched" value={work.launched} /> : null}
        {work.status ? <MetaRow label="Status" value={work.status} /> : null}
      </div>

      {work.stack ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
          <div className="text-[11px] uppercase tracking-wide text-zinc-500 mb-2.5">Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {work.stack.split(",").map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {work.links?.length ? (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 space-y-2 bg-white dark:bg-zinc-950">
          <div className="text-[11px] uppercase tracking-wide text-zinc-500">Links</div>
          <div className="flex flex-col gap-2">
            {work.links.map((l) => (
              <Button key={l.href} asChild variant="outline" size="sm" className="justify-start">
                <a href={l.href} target="_blank" rel="noreferrer">
                  <IconExternalLink data-icon="inline-start" />
                  {l.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}

function WorkGallery({ work }: WorkDetailProps) {
  if (!work.gallery?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-950 dark:text-zinc-100">
        <IconPhoto className="size-4 text-zinc-500" aria-hidden />
        Screenshots
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {work.gallery.map((img) => (
          <div
            key={img.src}
            className="relative aspect-16/10 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 512px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkHighlights({ work }: WorkDetailProps) {
  if (!work.highlights?.length) return null;

  return (
    <div className="pt-2">
      <h2 className="mb-4 text-sm font-medium text-zinc-950 dark:text-zinc-100">Highlights</h2>
      <ul className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {work.highlights.map((item) => (
          <li key={item} className="flex gap-3">
            <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", work.theme.accentBar)} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WorkDetail({ work }: WorkDetailProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-28">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="-ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
          <Link href="/works">
            <IconArrowLeft data-icon="inline-start" />
            All works
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className="mb-8">
        <span className={cn("text-[10px] font-mono uppercase tracking-widest", work.theme.accent)}>
          {work.theme.label}
        </span>
        <h1 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-zinc-950 dark:text-zinc-100 leading-[1.1]">
          {work.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {work.summary}
        </p>
      </header>

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className={cn("h-1 w-full", work.theme.accentBar)} />
        <div className="relative aspect-16/8 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={work.thumbnail.src}
            alt={work.thumbnail.alt}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      </div>

      {/* Metrics band */}
      <div className="mt-6">
        <MetricBand work={work} />
      </div>

      {/* Architecture diagram */}
      <WorkArchitecture work={work} />

      {/* Body: narrative + sticky meta */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        <div className="space-y-5">
          <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100">Overview</h2>
          {work.paragraphs.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
              {p}
            </p>
          ))}
          <div className="pt-4">
            <WorkHighlights work={work} />
          </div>
        </div>
        <WorkMeta work={work} />
      </div>

      <WorkGallery work={work} />
    </main>
  );
}
