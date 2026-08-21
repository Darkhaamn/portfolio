import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Work } from "@/lib/works";
import {
  IconArrowLeft,
  IconExternalLink,
  IconPhoto,
} from "@tabler/icons-react";

import { WorkDiagram } from "@/components/works/diagrams";
import { WorkHeroBlock } from "@/components/works/hero";
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

/** Each layout tells its story in a different order. */
const SECTION_ORDER: Record<string, string[]> = {
  // the emergency is the story: lead with the clock, then before/after
  migration: ["hero", "diagram", "metrics", "body", "gallery"],
  // the integration surface *is* the product
  hub: ["diagram", "hero", "metrics", "body", "gallery"],
  // the second market is the point; show the comparison first
  regions: ["diagram", "metrics", "hero", "body", "gallery"],
  // consumer product: show it, then how it fulfils itself
  pipeline: ["hero", "diagram", "metrics", "body", "gallery"],
  topology: ["hero", "diagram", "metrics", "body", "gallery"],
  // platform work: scale numbers first, then the stack underneath
  stack: ["hero", "metrics", "diagram", "body", "gallery"],
  flow: ["hero", "metrics", "diagram", "body", "gallery"],
};

export function WorkDetail({ work }: WorkDetailProps) {
  const order = SECTION_ORDER[work.layout ?? "flow"] ?? SECTION_ORDER.flow;

  const sections: Record<string, React.ReactNode> = {
    hero: <WorkHeroBlock key="hero" work={work} />,
    metrics: (
      <div key="metrics" className="mt-8">
        <MetricBand work={work} />
      </div>
    ),
    diagram: <WorkDiagram key="diagram" work={work} />,
    body: (
      <div key="body" className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
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
    ),
    gallery: <WorkGallery key="gallery" work={work} />,
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-28">
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Link href="/works">
            <IconArrowLeft data-icon="inline-start" />
            All works
          </Link>
        </Button>
      </div>

      <header>
        <div className="flex items-center gap-3">
          <span className={cn("h-px w-8", work.theme.accentBar)} aria-hidden />
          <span className={cn("text-[10px] font-mono uppercase tracking-widest", work.theme.accent)}>
            {work.theme.label}
          </span>
          {work.role ? (
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              · {work.role}
            </span>
          ) : null}
        </div>
        <h1 className="mt-3 text-3xl font-medium leading-[1.1] tracking-tight text-zinc-950 dark:text-zinc-100 md:text-4xl">
          {work.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {work.summary}
        </p>
      </header>

      {order.map((key) => sections[key])}
    </main>
  );
}
