import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { works } from "@/lib/works";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBriefcase,
  IconExternalLink,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected works by Darkhanbayar Erdenebat: cloud platforms, eSIM services, healthcare and travel products.",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-zinc-950 dark:text-zinc-100 tracking-tight">
            Works
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            My previous projects and platforms.
          </p>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <IconArrowLeft data-icon="inline-start" />
            Home
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {works.map((work) => (
          <div
            key={work.id}
            className="group overflow-hidden bg-white/70 dark:bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-zinc-200/70 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/15 transition-colors"
          >
            <Link href={`/works/${work.id}`} className="block">
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={work.thumbnail.src}
                  alt={work.thumbnail.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 512px"
                  priority={work.id === "cloudmn"}
                />
                <div className="absolute inset-0 bg-linear-to-tr from-black/15 dark:from-black/45 to-transparent" />
              </div>
            </Link>

            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <IconBriefcase className="size-4" aria-hidden />
                    <span className="truncate">{work.period ?? "Selected work"}</span>
                  </div>
                  <h2 className="mt-1 text-base font-medium text-zinc-950 dark:text-zinc-100 tracking-tight">
                    {work.title}
                  </h2>
                </div>
                <IconArrowRight className="size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                {work.summary}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link href={`/works/${work.id}`}>
                    Details
                    <IconArrowRight data-icon="inline-end" />
                  </Link>
                </Button>

                {work.links?.[0]?.href ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                  >
                    <a
                      href={work.links[0].href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconExternalLink data-icon="inline-start" />
                      Visit
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

