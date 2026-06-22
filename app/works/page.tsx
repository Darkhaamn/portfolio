import type { Metadata } from "next";

import { WorkCard } from "@/components/works/work-card";
import { works } from "@/lib/works";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Cloud and DevOps projects by Darkhanbayar Erdenebat: AWS architectures, Kubernetes platforms, and public cloud infrastructure.",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-28">
      <div className="mb-10">
        <p className="mb-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
          Selected Work · {works.length} projects
        </p>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-950 dark:text-zinc-100 leading-[1.1] max-w-2xl">
          Cloud platforms, AWS architectures, and the systems behind them.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Public clouds serving hundreds of enterprises, zero-downtime migrations, and
          production-grade infrastructure — built end to end.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {works.map((work, i) => (
          <WorkCard key={work.id} work={work} priority={i === 0} />
        ))}
      </div>
    </main>
  );
}
