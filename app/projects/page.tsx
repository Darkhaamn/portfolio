import type { Metadata } from "next";

import { WorkCard } from "@/components/works/work-card";
import { works, type Work } from "@/lib/works";

export const metadata: Metadata = {
  title: "Works",
  description:
    "DevOps and cloud projects by Darkhanbayar Erdenebat: CI/CD pipelines, infrastructure as code, Kubernetes platforms, and public cloud infrastructure.",
  alternates: { canonical: "/works" },
};

type Size = NonNullable<Work["size"]>;
type Row = { size: Size; items: Work[] };

/** Batch consecutive works of the same weight so the page reads as editorial rows. */
function toRows(list: Work[]): Row[] {
  return list.reduce<Row[]>((rows, work) => {
    const size = work.size ?? "third";
    const last = rows.at(-1);
    if (last && last.size === size && size !== "feature") last.items.push(work);
    else rows.push({ size, items: [work] });
    return rows;
  }, []);
}

const GRID: Record<Size, string> = {
  feature: "grid-cols-1",
  half: "grid-cols-1 md:grid-cols-2",
  third: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export default function WorksPage() {
  const rows = toRows(works);
  let featureIndex = 0;
  let cardIndex = 0;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-28 pt-16 sm:px-6 sm:pt-24">
      <header className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
          Selected work · {works.length} projects
        </p>
        <h1 className="max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-4xl">
          Delivery pipelines, cloud platforms, and the systems behind them.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Automated delivery, zero-downtime migrations, and production-grade infrastructure — from
          public clouds serving hundreds of enterprises down to services I run solo.
        </p>
      </header>

      <div className="space-y-5">
        {rows.map((row) => (
          <div
            key={row.items.map((w) => w.id).join("-")}
            className={`grid gap-5 ${GRID[row.size]}`}
          >
            {row.items.map((work) => {
              const priority = cardIndex++ === 0;
              const flip = row.size === "feature" && featureIndex++ % 2 === 1;
              return (
                <WorkCard
                  key={work.id}
                  work={work}
                  size={row.size}
                  priority={priority}
                  flip={flip}
                />
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}
