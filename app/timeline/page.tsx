import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteLinks } from "@/lib/site-links";
import {
  certifications,
  education,
  employment,
  professionalSummary,
  skillDetail,
} from "@/lib/profile";
import {
  IconArrowLeft,
  IconBriefcase,
  IconCertificate,
  IconExternalLink,
  IconFileText,
  IconSchool,
  IconStack2,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Detailed timeline and resume highlights for Darkhanbayar Erdenebat.",
};


export default function TimelinePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-28">
      <div className="flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Resume · Full timeline
            </p>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-100">
              Darkhanbayar Erdenebat
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {professionalSummary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <IconArrowLeft data-icon="inline-start" />
                Back
              </Link>
            </Button>
            <Button asChild size="sm">
              <a href={siteLinks.resume} target="_blank" rel="noreferrer">
                <IconFileText data-icon="inline-start" />
                Open resume (PDF)
              </a>
            </Button>
          </div>
        </div>

        {/* Employment */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
            <IconBriefcase className="size-4 text-zinc-500" aria-hidden />
            Experience
          </h2>
          <div className="relative ml-1.5 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
            {employment.map((job) => (
              <div key={`${job.range}-${job.title}-${job.company}`} className="relative pl-6 sm:pl-7">
                <span className="absolute -left-[5px] top-2 size-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                    <div>
                      <h3 className="text-zinc-950 dark:text-zinc-100 font-medium tracking-tight">
                        {job.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 w-fit shrink-0">
                      {job.range}
                    </span>
                  </div>

                  {job.note ? (
                    <p className="mt-2 text-xs italic text-zinc-500 dark:text-zinc-400">{job.note}</p>
                  ) : null}

                  <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
            <IconStack2 className="size-4 text-zinc-500" aria-hidden />
            Technical skills
          </h2>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 divide-y divide-zinc-100 dark:divide-zinc-900">
            {skillDetail.map((group) => (
              <div key={group.label} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 px-5 py-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 pt-0.5">
                  {group.label}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{group.items}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
            <IconCertificate className="size-4 text-zinc-500" aria-hidden />
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div className="flex items-center justify-center size-11 rounded-lg bg-white border border-zinc-200 shrink-0">
                  <Image src={cert.src} alt={cert.title} width={26} height={26} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{cert.title}</h3>
                  <p className="text-xs text-zinc-500">{cert.meta}</p>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300 shrink-0">
                  Verify
                  <IconExternalLink className="size-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
            <IconSchool className="size-4 text-zinc-500" aria-hidden />
            Education
          </h2>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 divide-y divide-zinc-100 dark:divide-zinc-900">
            {education.map((ed) => (
              <div key={ed.degree} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{ed.degree}</h3>
                  <p className="text-xs text-zinc-500">{ed.school}</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 shrink-0">
                  {ed.range}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
