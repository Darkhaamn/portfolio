import type { Metadata } from "next";

import { WorkCard } from "@/components/works/work-card";
import { works, type Work } from "@/lib/works";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "DevOps and cloud projects by Darkhanbayar Erdenebat: CI/CD pipelines, infrastructure as code, Kubernetes platforms, and public cloud infrastructure.",
  alternates: { canonical: "/projects" },
};

/** "2019–2024" → [2019, 2024]; "2026" → [2026, 2026]. */
function years(period?: string): [number, number] {
  const y = period?.match(/\d{4}/g)?.map(Number) ?? [0];
  return [y[0], y[y.length - 1]];
}

/** Newest first: by end year, then by start year, both descending. */
function newestFirst(a: Work, b: Work) {
  const [aStart, aEnd] = years(a.period);
  const [bStart, bEnd] = years(b.period);
  return bEnd - aEnd || bStart - aStart;
}

export default function WorksPage() {
  const sorted = [...works].sort(newestFirst);

  return (
    <main className="mx-auto max-w-5xl px-4 pb-28 pt-16 sm:px-6 sm:pt-24">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Cloud platforms, migrations, and production infrastructure — from public clouds serving
          hundreds of enterprises to services I run solo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((work, i) => (
          <WorkCard key={work.id} work={work} priority={i < 3} />
        ))}
      </div>
    </main>
  );
}
