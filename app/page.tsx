import Image from "next/image";
import Link from "next/link";

import {
  IconArrowUpRight,
  IconCertificate,
  IconExternalLink,
  IconMail,
  IconUsersGroup,
} from "@tabler/icons-react";

import { siteLinks } from "@/lib/site-links";
import { getWorkById } from "@/lib/works";

const techTags = [
  "AWS",
  "Kubernetes",
  "Docker",
  "CI/CD",
  "OpenStack",
  "Prometheus",
  "Grafana",
  "Nginx",
  "Linux",
  "Golang",
  "Python",
  "Node.js",
  "React",
  "Next.js",
  "PostgreSQL",
] as const;

const featuredWorks = [
  { id: "cloudmn", title: "Cloud.mn", metric: "300+", sub: "enterprise clients" },
  { id: "ufe_aws", title: "UFE on AWS", metric: "10-day", sub: "zero-downtime migration" },
  { id: "mobilife_aws", title: "Mobilife AWS HA", metric: "30%", sub: "fewer deploy incidents" },
] as const;

const timeline: {
  range: string;
  title: string;
  company: string;
  active?: boolean;
}[] = [
  { range: "OCT 2025 — JUN 2026", title: "Senior DevOps / Cloud Engineer", company: "Tech Partners", active: true },
  { range: "APR 2022 — MAR 2024", title: "Chief Technology Officer", company: "Fibo Cloud" },
  { range: "OCT 2021 — APR 2022", title: "Senior Software Engineer / Team Lead", company: "Fibo Cloud" },
  { range: "JUN 2021 — FEB 2025", title: "Senior Engineer (Part-time)", company: "Tech Partners" },
  { range: "MAR 2019 — OCT 2021", title: "Frontend Engineer", company: "Fibo Cloud" },
];

const community = {
  name: "AWS Community Mongolia",
  role: "Organizer",
  location: "Ulaanbaatar",
  tagline: "Building Mongolia’s Cloud Future",
  href: "https://www.aws.mn/",
  stats: [
    { value: "1,200+", label: "members" },
    { value: "50+", label: "events" },
    { value: "5+", label: "years" },
    { value: "20+", label: "certified" },
  ],
};

const certifications = [
  {
    src: "/aws.svg",
    title: "AWS Certified Developer",
    meta: "Associate · May 2020",
    href: "https://cp.certmetrics.com/amazon/en/public/verify/credential/PX0DJTMC3EEQ123V",
  },
  {
    src: "/kubernetes.svg",
    title: "CKA: Kubernetes Administrator",
    meta: "Linux Foundation · Mar 2022",
    href: "https://www.credly.com/badges/e2a30bdf-bfdc-4817-9d2d-588b294a3c7a",
  },
] as const;

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-20">
      {/* Hero */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800">
            <Image
              src="/profile.jpg"
              alt="Darkhanbayar Erdenebat"
              fill
              priority
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Cloud &amp; DevOps Engineer
            </p>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              ● Open to remote &amp; relocation · Fairfield, Iowa
            </p>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-medium text-zinc-950 dark:text-zinc-100 tracking-tight leading-[1.1]">
          Darkhanbayar Erdenebat
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          DevOps / Cloud engineer with 7+ years across full-stack development, cloud infrastructure,
          and platform engineering. Built and launched Cloud.mn — Mongolia&apos;s first public cloud
          platform.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/works"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-sm font-medium transition-opacity hover:opacity-90"
          >
            View Works
            <IconArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/timeline"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Full timeline
          </Link>
          <a
            href={`mailto:${siteLinks.email}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <IconMail className="size-4" />
            Email
          </a>
        </div>
      </section>

      {/* Selected work */}
      <section className="mb-10">
        <div className="flex items-end justify-between gap-4 mb-3">
          <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-100">Selected work</h2>
          <Link
            href="/works"
            className="group flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors shrink-0"
          >
            All works
            <IconArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredWorks.map(({ id, title, metric, sub }) => {
            const work = getWorkById(id);
            if (!work) return null;
            return (
              <Link
                key={id}
                href={`/works/${id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div className={`h-1 w-full ${work.theme.accentBar}`} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      {work.theme.label}
                    </span>
                    <IconArrowUpRight className="size-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="mt-2 truncate text-base font-medium text-zinc-950 dark:text-zinc-100">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{metric}</span>{" "}
                    {sub}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-3">
          Tech stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {techTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Career + Community/Certs */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8">
        {/* Career */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-3">
            <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-100">Career</h2>
            <Link
              href="/timeline"
              className="group flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors shrink-0"
            >
              Details
              <IconArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 divide-y divide-zinc-100 dark:divide-zinc-900">
            {timeline.map((item) => (
              <div
                key={`${item.range}-${item.title}`}
                className="flex items-center justify-between gap-4 px-4 py-2.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={
                      item.active
                        ? "size-2 shrink-0 rounded-full bg-emerald-500"
                        : "size-2 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-700"
                    }
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-200">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500">{item.company}</p>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {item.range}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Community + Certifications */}
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <IconUsersGroup className="size-5 text-zinc-500" aria-hidden />
              Community
            </h2>
            <a
              href={community.href}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors hover:border-amber-500/40"
            >
              <div className="h-1 w-full bg-[#FF9900]" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                      <Image src="/aws.svg" alt="AWS" width={24} height={24} className="object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 truncate">
                        {community.name}
                      </h3>
                      <p className="text-xs text-zinc-500 truncate">
                        <span className="text-amber-600 dark:text-amber-400">{community.role}</span> ·{" "}
                        {community.location}
                      </p>
                    </div>
                  </div>
                  <IconArrowUpRight className="size-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <p className="mt-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {community.tagline}
                </p>

                <div className="mt-3 grid grid-cols-4 gap-2 border-t border-zinc-100 dark:border-zinc-900 pt-3">
                  {community.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-base font-semibold tracking-tight text-amber-600 dark:text-amber-400">
                        {s.value}
                      </div>
                      <div className="text-[10px] text-zinc-500">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </section>

          <section>
            <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-3 flex items-center gap-2">
              <IconCertificate className="size-5 text-zinc-500" aria-hidden />
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <a
                  key={cert.title}
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <div className="flex items-center justify-center size-9 rounded-lg bg-white border border-zinc-200 shrink-0">
                    <Image src={cert.src} alt={cert.title} width={22} height={22} className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 truncate">{cert.title}</h3>
                    <p className="text-xs text-zinc-500">{cert.meta}</p>
                  </div>
                  <IconExternalLink className="size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
