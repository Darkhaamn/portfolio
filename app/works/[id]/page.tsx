import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getWorkById } from "@/lib/works";
import {
  IconArrowLeft,
  IconCalendar,
  IconExternalLink,
  IconPhoto,
  IconStack2,
  IconStatusChange,
} from "@tabler/icons-react";

export function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  return params.then(({ id }) => {
    const work = getWorkById(id);
    if (!work) return {};
    return {
      title: work.title,
      description: work.summary,
      alternates: { canonical: `/works/${work.id}` },
      openGraph: {
        title: work.title,
        description: work.summary,
        url: `/works/${work.id}`,
        images: [{ url: work.thumbnail.src }],
      },
    };
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = getWorkById(id);
  if (!work) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <Link
              href="/works"
              className="hover:text-zinc-950 dark:hover:text-zinc-200 transition-colors"
            >
              Works
            </Link>
            <span className="text-zinc-400 dark:text-zinc-600">/</span>
            <span className="text-zinc-800 dark:text-zinc-300">{work.id}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-medium text-zinc-950 dark:text-zinc-100 tracking-tight">
            {work.title}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {work.summary}
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="">
          <Link href="/works">
            <IconArrowLeft data-icon="inline-start" />
            Back
          </Link>
        </Button>
      </div>

      <div className=" bg-white/70 dark:bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-zinc-200/70 dark:border-white/10 overflow-hidden">
        {/* Hero image */}
        <div className="relative aspect-16/8 md:aspect-16/7 overflow-hidden">
          <Image
            src={work.thumbnail.src}
            alt={work.thumbnail.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-black/25 dark:from-black/55 to-transparent" />
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <div className="space-y-4">
            {work.paragraphs.map((p) => (
              <p
                key={p}
                className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
              >
                {p}
              </p>
            ))}

            {work.highlights?.length ? (
              <div className="pt-2">
                <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-3 flex items-center gap-2">
                  <span className="size-1.5  bg-emerald-500" />
                  Highlights
                </h2>
                <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {work.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 size-1.5  bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
            {work.logo || work.logoDark ? (
              <div className=" bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/70 dark:border-white/10 p-4 flex items-center justify-center">
                {work.logoDark ? (
                  <>
                    <Image
                      src={(work.logo ?? work.logoDark).src}
                      alt={(work.logo ?? work.logoDark).alt}
                      width={180}
                      height={56}
                      className="h-10 w-auto dark:hidden"
                    />
                    <Image
                      src={work.logoDark.src}
                      alt={work.logoDark.alt}
                      width={180}
                      height={56}
                      className="hidden h-10 w-auto dark:block"
                    />
                  </>
                ) : work.logo ? (
                  <Image
                    src={work.logo.src}
                    alt={work.logo.alt}
                    width={180}
                    height={56}
                    className="h-10 w-auto"
                  />
                ) : null}
              </div>
            ) : null}

            <div className=" bg-white/60 dark:bg-zinc-950/30 border border-zinc-200/70 dark:border-white/10 p-4 space-y-3">
              {work.period ? (
                <div className="flex items-start gap-2">
                  <IconCalendar className="size-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-zinc-500">Period</div>
                    <div className="text-sm text-zinc-800 dark:text-zinc-200">
                      {work.period}
                    </div>
                  </div>
                </div>
              ) : null}

              {work.launched ? (
                <div className="flex items-start gap-2">
                  <IconPhoto className="size-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-zinc-500">Launched</div>
                    <div className="text-sm text-zinc-800 dark:text-zinc-200">
                      {work.launched}
                    </div>
                  </div>
                </div>
              ) : null}

              {work.status ? (
                <div className="flex items-start gap-2">
                  <IconStatusChange className="size-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-zinc-500">Status</div>
                    <div className="text-sm text-zinc-800 dark:text-zinc-200">
                      {work.status}
                    </div>
                  </div>
                </div>
              ) : null}

              {work.stack ? (
                <div className="flex items-start gap-2">
                  <IconStack2 className="size-4 text-zinc-500 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-zinc-500">Stack</div>
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">
                      {work.stack}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {work.links?.length ? (
              <div className=" bg-white/60 dark:bg-zinc-950/30 border border-zinc-200/70 dark:border-white/10 p-4 space-y-2">
                <div className="text-[11px] text-zinc-500">Links</div>
                <div className="flex flex-col gap-2">
                  {work.links.map((l) => (
                    <Button
                      key={l.href}
                      asChild
                      variant="outline"
                      size="sm"
                      className=" justify-start"
                    >
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
        </div>

        {work.gallery?.length ? (
          <div className="border-t border-zinc-200/70 dark:border-white/10 p-6 md:p-8">
            <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <IconPhoto className="size-4 text-zinc-500" aria-hidden />
              Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {work.gallery.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-16/10 overflow-hidden border border-zinc-200/70 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950/30"
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
          </div>
        ) : null}
      </div>
    </main>
  );
}

