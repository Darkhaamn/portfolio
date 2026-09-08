import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Work, WorkSection } from "@/lib/works";
import { IconArrowLeft, IconArrowUpRight, IconExternalLink } from "@tabler/icons-react";

import { ArchifyEmbed } from "@/components/works/archify-embed";
import { WorkDiagram } from "@/components/works/diagrams";
import { WorkHeroBlock } from "@/components/works/hero";
import { WorkGallery as GalleryCarousel } from "@/components/works/gallery";
import { H2 } from "@/lib/typography";
import { cn } from "@/lib/utils";

type WorkDetailProps = {
  work: Work;
};

/** Reading column: 672px, centred inside main's 848px media column. */
const PROSE = "mx-auto w-full max-w-2xl";

function MetricBand({ work }: WorkDetailProps) {
  if (!work.metrics?.length) return null;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
        {work.metrics.map((m) => (
          <div key={m.label} className="px-5 py-5 sm:px-6">
            <div className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">
              {m.value}
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{m.label}</div>
          </div>
        ))}
      </div>
      {work.metricsNote ? (
        <p className="mt-3 max-w-2xl text-xs text-zinc-500 dark:text-zinc-400">{work.metricsNote}</p>
      ) : null}
    </div>
  );
}

function WorkHighlights({ work }: WorkDetailProps) {
  if (!work.highlights?.length) return null;

  return (
    <div className={cn(PROSE, "mt-14")}>
      <h2 className={cn(H2, "mb-4")}>Highlights</h2>
      <ul className="space-y-4 text-[17px] leading-[1.65] text-zinc-800 dark:text-zinc-200">
        {work.highlights.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-zinc-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** `Term — explanation` bullets read as a spec table; a mid-sentence em dash
 *  must not, so a long or many-worded lead is left alone. */
function SpecItem({ item }: { item: string }) {
  const i = item.indexOf(" — ");
  const term = i > 0 ? item.slice(0, i) : "";
  if (!term || term.length > 24 || term.split(/\s+/).length > 3) return <>{item}</>;
  return (
    <>
      <span className="font-semibold text-zinc-950 dark:text-zinc-100">{term}</span>
      {item.slice(i)}
    </>
  );
}

/** The stack as one quiet meta line, rendered verbatim so parenthesised groups
 *  like `AWS (EC2, S3, ...)` stay intact - splitting on the comma broke them. */
function StackRow({ work }: WorkDetailProps) {
  if (!work.stack) return null;
  return (
    <p className="mt-5 text-[13px] leading-6 text-zinc-600 dark:text-zinc-400">{work.stack}</p>
  );
}

/** The live product is the highest-value action on the page, so it sits in the
 *  header. Secondary links stay beside it, deliberately quieter. */
function WorkActions({ work }: WorkDetailProps) {
  if (!work.links?.length) return null;
  const [primary, ...rest] = work.links;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
      <Button asChild size="lg" className="px-4 text-sm">
        <a href={primary.href} target="_blank" rel="noreferrer">
          {primary.cta ?? `Visit ${primary.label}`}
          <IconArrowUpRight data-icon="inline-end" />
        </a>
      </Button>
      {rest.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {l.label}
          <IconExternalLink className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

export function WorkDetail({ work }: WorkDetailProps) {
  const embedded = new Set(work.sections?.map((s) => s.embed).filter(Boolean));
  /* One order for every project: the live product, the numbers, the architecture,
     then the write-up. A project with titled sections pulls the blocks its text
     calls for inline (`embed`) and they drop out of this list. */
  const order = ["hero", "metrics", "diagram", "archify", "body", "gallery"].filter(
    (k) => !embedded.has(k as never),
  );

  // archify and the layout-diagram data are mutually exclusive; flag the loser in dev.
  if (process.env.NODE_ENV !== "production" && work.archify) {
    const dead = (
      ["pipeline", "hub", "regions", "beforeAfter", "topology", "cloud", "diagram"] as const
    ).filter((k) => work[k]);
    if (dead.length) {
      console.warn(
        `[works] ${work.id}: archify is set, so ${dead.join(", ")} never render. Delete one.`,
      );
    }
  }

  // Blocks a section may pull inline; defined first so `body` can reference them.
  const blocks: Record<NonNullable<WorkSection["embed"]>, React.ReactNode> = {
    metrics: (
      <div key="metrics" className="mt-8">
        <MetricBand work={work} />
      </div>
    ),
    // A project either tells its story through the bespoke diagram or through
    // an Archify artifact - never both, or the page states the same system twice.
    diagram: work.archify ? null : <WorkDiagram key="diagram" work={work} />,
    archify: <ArchifyEmbed key="archify" work={work} />,
    // The hero already renders work.thumbnail on every kind but 'none', so the
    // gallery lists only images the reader has not seen yet.
    gallery: <GalleryCarousel key="gallery" images={work.gallery ?? []} />,
  };

  const sections: Record<string, React.ReactNode> = {
    ...blocks,
    hero: <WorkHeroBlock key="hero" work={work} />,
    body: (
      // Full width by design: the text children carry PROSE, so an inline embed
      // is main's content box by construction - no negative margins.
      <article key="body" className="mt-16">
        <div className={cn(PROSE, "space-y-6")}>
          {work.paragraphs.map((p) => (
            <p key={p} className="text-[17px] leading-[1.65] text-zinc-800 dark:text-zinc-200">
              {p}
            </p>
          ))}
        </div>
        {work.sections?.map((section) => {
          const hasQuote = Boolean(section.quote);
          const hasParagraphs = Boolean(section.paragraphs?.length);
          const listGap = hasParagraphs ? "mt-5" : hasQuote ? "mt-6" : "mt-3";
          return (
            <section key={section.heading} className="mt-14">
              <div className={PROSE}>
                {/* No bottom margin on the h2: every child owns its own top
                    margin, so no gap depends on margin collapsing. */}
                <h2 className={H2}>{section.heading}</h2>
                {section.quote ? (
                  <blockquote className="mt-3 border-l border-zinc-200 pl-5 text-[20px] leading-[1.4] tracking-tight text-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
                    {section.quote}
                  </blockquote>
                ) : null}
                {section.paragraphs?.map((p, i) => (
                  <p
                    key={p}
                    className={cn(
                      !hasQuote && i === 0 ? "mt-3" : "mt-6",
                      "text-[17px] leading-[1.65] text-zinc-800 dark:text-zinc-200",
                    )}
                  >
                    {p}
                  </p>
                ))}
                {section.list?.length ? (
                  section.ordered ? (
                    <ol
                      className={cn(
                        listGap,
                        "list-decimal space-y-4 pl-6 text-[17px] leading-[1.65] text-zinc-800 dark:text-zinc-200 marker:text-zinc-400",
                      )}
                    >
                      {section.list.map((item) => (
                        <li key={item} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul
                      className={cn(
                        listGap,
                        "list-disc space-y-4 pl-6 text-[17px] leading-[1.65] text-zinc-800 dark:text-zinc-200 marker:text-zinc-400",
                      )}
                    >
                      {section.list.map((item) => (
                        <li key={item} className="pl-1">
                          <SpecItem item={item} />
                        </li>
                      ))}
                    </ul>
                  )
                ) : null}
              </div>
              {section.embed ? blocks[section.embed] : null}
            </section>
          );
        })}
        <WorkHighlights work={work} />
      </article>
    ),
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-28">
      <div className={cn(PROSE, "mb-8")}>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <Link href="/projects">
            <IconArrowLeft data-icon="inline-start" />
            All projects
          </Link>
        </Button>
      </div>

      <header className={PROSE}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <span className="text-zinc-900 dark:text-zinc-100">{work.theme.label}</span>
          {work.role ? <> &middot; {work.role}</> : null}
          {work.period ? (
            <>
              {" · "}
              <span className="tabular-nums">{work.period}</span>
            </>
          ) : null}
          {work.status ? <> &middot; {work.status}</> : null}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-950 dark:text-zinc-100 md:text-4xl">
          {work.title}
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
          {work.summary}
        </p>
        <WorkActions work={work} />
        <StackRow work={work} />
      </header>

      {order.map((key) => sections[key])}
    </main>
  );
}
