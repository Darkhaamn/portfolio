import { Fragment } from "react";

import type { Work } from "@/lib/works";
import { cn } from "@/lib/utils";
import { Canvas, DiagramSection, Fan } from "@/components/works/diagram-kit";

/**
 * A full cloud architecture: edge tier, a VPC boundary with subnet rows laid
 * out across Availability Zones, a cross-cutting ops rail, and the recovery
 * story. Everything rendered here comes from the project's documented stack.
 */

type Props = { work: Work };

function Box({
  label,
  sub,
  className,
}: {
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 bg-white px-3 py-2 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900",
        className,
      )}
    >
      <div className="text-[13px] font-medium leading-tight text-zinc-900 dark:text-zinc-100">
        {label}
      </div>
      {sub ? (
        <div className="mt-0.5 font-mono text-[10px] leading-tight text-zinc-500">{sub}</div>
      ) : null}
    </div>
  );
}

/** Dashed boundary with a label notched into the top-left corner. */
function Boundary({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "vpc" | "public" | "private";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-dashed p-3.5 pt-5",
        tone === "vpc"
          ? "border-zinc-400 dark:border-zinc-600"
          : tone === "public"
            ? "border-zinc-400/70 dark:border-zinc-600/70"
            : "border-zinc-300 dark:border-zinc-700",
      )}
    >
      <span
        className={cn(
          "absolute -top-[7px] left-3 bg-white px-1.5 font-mono text-[9px] uppercase tracking-widest dark:bg-zinc-950",
          tone === "private" ? "text-zinc-400" : "text-zinc-500",
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

export function CloudArchitecture({ work }: Props) {
  const arch = work.cloud;
  if (!arch) return null;

  const zoneCount = arch.vpc.zones.length;

  return (
    <DiagramSection title="Architecture" caption={arch.caption}>
      <Canvas className="p-4 sm:p-6">
        <div className="mx-auto max-w-[680px]">
          {/* ---------- edge ---------- */}
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${arch.edge.length}, minmax(0,1fr))` }}>
            {arch.edge.map((n) => (
              <Box key={n.label} label={n.label} sub={n.sub} />
            ))}
          </div>

          {arch.aside ? (
            <div className="mt-3 flex items-center gap-3">
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" aria-hidden />
              <div className="w-[190px]">
                <Box label={arch.aside.label} sub={arch.aside.sub} className="border-dashed" />
              </div>
              <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" aria-hidden />
            </div>
          ) : null}

          <Fan count={1} accent={work.theme.accent} height={26} />

          {/* ---------- VPC ---------- */}
          <Boundary label={arch.vpc.label} tone="vpc">
            {/* AZ column headers */}
            <div
              className="mb-2 grid gap-3"
              style={{ gridTemplateColumns: `repeat(${zoneCount}, minmax(0,1fr))` }}
            >
              {arch.vpc.zones.map((z) => (
                <span
                  key={z}
                  className="text-center font-mono text-[9px] uppercase tracking-widest text-zinc-400"
                >
                  {z}
                </span>
              ))}
            </div>

            {arch.vpc.rows.map((row, ri) => (
              <Fragment key={row.subnet}>
                {ri > 0 ? <Fan count={1} accent={work.theme.accent} height={22} /> : null}
                <Boundary label={row.subnet} tone={row.kind}>
                  {row.group ? (
                    <div className="mb-2 text-center font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                      {row.group}
                    </div>
                  ) : null}

                  {row.perZone ? (
                    <div className="relative">
                      <div
                        className="grid gap-3"
                        style={{ gridTemplateColumns: `repeat(${zoneCount}, minmax(0,1fr))` }}
                      >
                        {arch.vpc.zones.map((z, zi) =>
                          row.nodes.map((n) => (
                            <Box
                              key={`${z}-${n.label}`}
                              label={n.label}
                              sub={zi === 0 ? n.sub : row.replicated ? "standby" : n.sub}
                            />
                          )),
                        )}
                      </div>
                      {row.replicated && zoneCount === 2 ? (
                        <div
                          className={cn(
                            "pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center",
                            work.theme.accent,
                          )}
                          aria-hidden
                        >
                          <span className="rounded-full bg-white px-2 font-mono text-[9px] uppercase tracking-widest dark:bg-zinc-900">
                            ↔ {row.replicated}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="mx-auto max-w-[300px]">
                      {row.nodes.map((n) => (
                        <Box key={n.label} label={n.label} sub={n.sub} />
                      ))}
                    </div>
                  )}
                </Boundary>
              </Fragment>
            ))}
          </Boundary>

          {/* ---------- cross-cutting ---------- */}
          {arch.ops?.length ? (
            <div className="mt-5">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                Observability &amp; security — across every tier
              </div>
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: `repeat(${arch.ops.length}, minmax(0,1fr))` }}
              >
                {arch.ops.map((n) => (
                  <Box key={n.label} label={n.label} sub={n.sub} className="border-dashed shadow-none" />
                ))}
              </div>
            </div>
          ) : null}

          {/* ---------- recovery ---------- */}
          {arch.dr ? (
            <div className={cn("mt-4 rounded-xl border p-4", work.theme.accentMuted)}>
              <div
                className={cn(
                  "font-mono text-[9px] uppercase tracking-widest",
                  work.theme.accent,
                )}
              >
                {arch.dr.label}
              </div>
              <ul className="mt-2.5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {arch.dr.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300"
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
          ) : null}
        </div>
      </Canvas>
    </DiagramSection>
  );
}
