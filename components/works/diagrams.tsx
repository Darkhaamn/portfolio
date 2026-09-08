import { Fragment } from "react";

import type { Work } from "@/lib/works";
import { cn } from "@/lib/utils";
import { Canvas, DiagramSection, Fan, Lead, Merge, Node } from "@/components/works/diagram-kit";
import { CloudArchitecture } from "@/components/works/cloud-architecture";

type Props = { work: Work };

/* ------------------------------------------------------------------ */
/* flow — a request falling through tiers (Mobilife, UFE)              */
/* ------------------------------------------------------------------ */

export function FlowDiagram({ work }: Props) {
  const tiers = work.architecture?.tiers;
  if (!tiers?.length) return null;

  return (
    <DiagramSection title="Request path" caption={work.architecture?.caption}>
      <Canvas>
        <div className="mx-auto max-w-[560px]">
          {tiers.map((tier, i) => (
            <Fragment key={tier.label ?? i}>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: `repeat(${tier.nodes.length}, minmax(0,1fr))` }}
              >
                {tier.nodes.map((node) => (
                  <div
                    key={node.label}
                    className={tier.nodes.length === 1 ? "mx-auto w-full max-w-[280px]" : ""}
                  >
                    <Node
                      label={node.label}
                      sub={node.sub}
                      tone={i === 0 ? "accent" : "default"}
                      accent={work.theme.accent}
                      accentBar={work.theme.accentBar}
                    />
                  </div>
                ))}
              </div>
              {i < tiers.length - 1 ? (
                <Fan
                  count={tiers[i + 1].nodes.length}
                  accent={work.theme.accent}
                  label={tiers[i + 1].label}
                />
              ) : null}
            </Fragment>
          ))}
        </div>
      </Canvas>
    </DiagramSection>
  );
}

/* ------------------------------------------------------------------ */
/* stack — layered platform on a spine (Cloud.mn)                      */
/* ------------------------------------------------------------------ */

export function StackDiagram({ work }: Props) {
  const tiers = work.architecture?.tiers;
  if (!tiers?.length) return null;

  return (
    <DiagramSection title="Platform stack" caption={work.architecture?.caption}>
      <Canvas>
        <div className="relative pl-6 sm:pl-8">
          {/* spine */}
          <span
            className={cn("absolute bottom-4 left-[5px] top-4 w-px", work.theme.accentBar)}
            style={{ opacity: 0.45 }}
            aria-hidden
          />
          <div className="space-y-4">
            {tiers.map((tier, i) => (
              <div key={tier.label ?? i} className="relative">
                <span
                  className={cn(
                    "absolute -left-6 top-3 size-2.5 rounded-full ring-4 ring-white sm:-left-8 dark:ring-zinc-950",
                    work.theme.accentBar,
                  )}
                  style={{ opacity: 0.3 + i * 0.22 }}
                  aria-hidden
                />
                <div className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white/80 p-3.5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 dark:border-zinc-800 dark:bg-zinc-900/60">
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400 sm:w-32">
                    {tier.label ?? `Layer ${i + 1}`}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {tier.nodes.map((node) => (
                      <span
                        key={node.label}
                        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                      >
                        {node.label}
                        {node.sub ? (
                          <span className="ml-2 font-mono text-[11px] text-zinc-500">
                            {node.sub}
                          </span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Canvas>
    </DiagramSection>
  );
}

/* ------------------------------------------------------------------ */
/* regions — same platform, second country (TTC)                       */
/* ------------------------------------------------------------------ */

export function RegionsDiagram({ work }: Props) {
  if (!work.regions?.length) return null;

  return (
    <DiagramSection
      title="One platform, two markets"
      caption="What carried over, and what had to be rebuilt for Kazakhstan"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        {work.regions.map((region, i) => (
          <Fragment key={region.name}>
            {i > 0 ? (
              <div className="flex items-center justify-center py-1 md:w-14 md:py-0">
                <div className="flex w-full rotate-90 items-center md:rotate-0">
                  <Lead accent={work.theme.accent} />
                </div>
              </div>
            ) : null}
            <div
              className={cn(
                "rounded-2xl border p-5",
                i === 0
                  ? "border-dashed border-zinc-300 bg-zinc-50/60 dark:border-zinc-700 dark:bg-white/[0.02]"
                  : cn("bg-white dark:bg-zinc-950", work.theme.accentMuted),
              )}
            >
              <div
                className={cn(
                  "text-sm font-medium",
                  i === 0 ? "text-zinc-900 dark:text-zinc-100" : work.theme.accent,
                )}
              >
                {region.name}
              </div>
              <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                {region.sub}
              </div>
              <ul className="mt-4 space-y-2">
                {region.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <span
                      className={cn("mt-[7px] size-1 shrink-0 rounded-full", work.theme.accentBar)}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </div>
    </DiagramSection>
  );
}

/* ------------------------------------------------------------------ */
/* migration — before / after under time pressure (UFE)                */
/* ------------------------------------------------------------------ */

export function MigrationDiagram({ work }: Props) {
  const ba = work.beforeAfter;
  if (!ba) return null;

  const column = (side: { label: string; items: string[] }, tone: "before" | "after") => (
    <div
      className={cn(
        "rounded-2xl border p-5",
        tone === "before"
          ? "border-dashed border-zinc-300 bg-zinc-50/60 dark:border-zinc-700 dark:bg-white/[0.02]"
          : cn("bg-white dark:bg-zinc-950", work.theme.accentMuted),
      )}
    >
      <div
        className={cn(
          "font-mono text-[11px] uppercase tracking-widest",
          tone === "before" ? "text-zinc-400" : work.theme.accent,
        )}
      >
        {side.label}
      </div>
      <ul className="mt-4 space-y-2.5">
        {side.items.map((item) => (
          <li
            key={item}
            className={cn(
              "flex gap-2.5 text-sm leading-relaxed",
              tone === "before" ? "text-zinc-500" : "text-zinc-700 dark:text-zinc-300",
            )}
          >
            <span
              className={cn(
                "mt-[7px] size-1 shrink-0 rounded-full",
                tone === "before" ? "bg-zinc-400" : work.theme.accentBar,
              )}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <DiagramSection
      title="The cutover"
      caption="A nationwide lockdown gave the university one week’s notice"
    >
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {column(ba.before, "before")}
        <div className="flex items-center justify-center md:w-14">
          <div className="flex w-full rotate-90 items-center md:rotate-0">
            <Lead accent={work.theme.accent} />
          </div>
        </div>
        {column(ba.after, "after")}
      </div>
    </DiagramSection>
  );
}

/* ------------------------------------------------------------------ */
/* pipeline — an order walking itself to done (EasySim)                */
/* ------------------------------------------------------------------ */

export function PipelineDiagram({ work }: Props) {
  if (!work.pipeline?.length) return null;

  return (
    <DiagramSection
      title={work.diagram?.title ?? "Order pipeline"}
      caption={
        work.diagram?.caption ??
        "Purchase to working data connection — no manual step anywhere in the path"
      }
    >
      <Canvas>
        <ol className="relative pl-10">
          <span
            className={cn("absolute bottom-6 left-[13px] top-6 w-px", work.theme.accentBar)}
            style={{ opacity: 0.35 }}
            aria-hidden
          />
          {work.pipeline.map((step, i) => (
            <li key={step.label} className={cn("relative", i > 0 && "mt-3")}>
              <span
                className={cn(
                  "absolute -left-10 top-1.5 flex size-[27px] items-center justify-center rounded-full border bg-white font-mono text-[10px] tabular-nums dark:bg-zinc-950",
                  work.theme.accentMuted,
                  work.theme.accent,
                )}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {step.label}
                </div>
                {step.sub ? (
                  <div className="mt-0.5 font-mono text-[11px] text-zinc-500">{step.sub}</div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Canvas>
    </DiagramSection>
  );
}

/* ------------------------------------------------------------------ */
/* topology — many clients over shared services (MedOrder)             */
/* ------------------------------------------------------------------ */

export function TopologyDiagram({ work }: Props) {
  const t = work.topology;
  if (!t) return null;

  return (
    <DiagramSection
      title={work.diagram?.title ?? "System topology"}
      caption={work.diagram?.caption ?? "Three portals, one service layer"}
    >
      <Canvas>
        <div className="mx-auto max-w-[620px]">
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${t.clients.length}, minmax(0,1fr))` }}
          >
            {t.clients.map((c) => (
              <Node
                key={c.label}
                label={c.label}
                sub={c.sub}
                accent={work.theme.accent}
                accentBar={work.theme.accentBar}
              />
            ))}
          </div>

          <Merge count={t.clients.length} accent={work.theme.accent} />

          <div className="mx-auto max-w-[340px]">
            <Node
              label={t.core.label}
              sub={t.core.sub}
              tone="accent"
              accent={work.theme.accent}
              accentBar={work.theme.accentBar}
            />
          </div>

          <Fan count={1} accent={work.theme.accent} />

          <div className="flex flex-wrap justify-center gap-2">
            {t.services.map((svc) => (
              <span
                key={svc}
                className="rounded-lg border border-dashed border-zinc-300 bg-white px-3 py-1.5 text-[13px] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>
      </Canvas>
    </DiagramSection>
  );
}

/* ------------------------------------------------------------------ */
/* hub — one core, many integrations (iTrip)                           */
/* ------------------------------------------------------------------ */

export function HubDiagram({ work }: Props) {
  const hub = work.hub;
  if (!hub) return null;

  return (
    <DiagramSection
      title="Integration surface"
      caption="A market split across a dozen suppliers, put behind one booking core"
    >
      <Canvas>
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_minmax(0,215px)_auto_minmax(0,180px)] lg:gap-0">
          {/* suppliers, grouped by what they provide */}
          <div className="space-y-3">
            {hub.groups.map((group) => (
              <div key={group.label} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-right font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  {group.label}
                </span>
                <div className="grid flex-1 grid-cols-2 gap-2">
                  {group.spokes.map((s) => (
                    <div
                      key={s.label}
                      className={cn(
                        "rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
                        group.spokes.length === 1 && "col-span-2",
                      )}
                    >
                      <div className="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                        {s.label}
                      </div>
                      {s.sub ? (
                        <div className="font-mono text-[10px] text-zinc-500">{s.sub}</div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* collector bus: many suppliers onto one line */}
          <div className="relative hidden h-full w-10 lg:block" aria-hidden>
            <span
              className={cn("absolute left-1/2 top-[10%] h-[80%] w-px", work.theme.accentBar)}
              style={{ opacity: 0.6 }}
            />
            <span
              className={cn("absolute left-1/2 top-1/2 h-px w-1/2", work.theme.accentBar)}
              style={{ opacity: 0.6 }}
            />
            {[10, 36.7, 63.3, 90].map((t) => (
              <span
                key={t}
                className={cn("absolute left-1/2 h-px w-1/2 -translate-x-full", work.theme.accentBar)}
                style={{ top: `${t}%`, opacity: 0.45 }}
              />
            ))}
          </div>

          <div
            className={cn(
              "mx-auto w-full rounded-2xl border px-4 py-6 text-center shadow-sm",
              work.theme.accentMuted,
            )}
          >
            <div className={cn("text-base font-semibold tracking-tight", work.theme.accent)}>
              {hub.center}
            </div>
            {hub.centerSub ? (
              <div className="mt-1 font-mono text-[10px] leading-snug text-zinc-500">
                {hub.centerSub}
              </div>
            ) : null}
            <div className="mt-3 border-t border-current/15 pt-2.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              search · normalize · orchestrate
            </div>
          </div>

          {/* one core out to one product */}
          <div className="hidden w-10 items-center lg:flex" aria-hidden>
            <Lead accent={work.theme.accent} />
          </div>

          {hub.outputs?.length ? (
            <div className="space-y-2.5">
              {hub.outputs.map((o) => (
                <div
                  key={o.label}
                  className={cn(
                    "rounded-lg border bg-white px-3 py-2 dark:bg-zinc-950",
                    work.theme.accentMuted,
                  )}
                >
                  <div className={cn("text-[13px] font-medium", work.theme.accent)}>{o.label}</div>
                  {o.sub ? (
                    <div className="font-mono text-[10px] text-zinc-500">{o.sub}</div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Canvas>
    </DiagramSection>
  );
}

/* ------------------------------------------------------------------ */
/* router                                                              */
/* ------------------------------------------------------------------ */

export function WorkDiagram({ work }: Props) {
  switch (work.layout) {
    case "stack":
      return <StackDiagram work={work} />;
    case "regions":
      return <RegionsDiagram work={work} />;
    case "migration":
      return (
        <>
          <MigrationDiagram work={work} />
          {work.cloud ? <CloudArchitecture work={work} /> : <FlowDiagram work={work} />}
        </>
      );
    case "pipeline":
      return <PipelineDiagram work={work} />;
    case "topology":
      return <TopologyDiagram work={work} />;
    case "hub":
      return <HubDiagram work={work} />;
    case "flow":
    default:
      return work.cloud ? <CloudArchitecture work={work} /> : <FlowDiagram work={work} />;
  }
}
