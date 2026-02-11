import { siteLinks } from "@/lib/site-links";
import {
  IconArrowUpRight,
  IconBriefcase,
  IconHeart,
  IconMapPin,
  IconSchool,
  IconTimeline,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
      <section id="about" className="mb-12 sm:mb-16 scroll-mt-24">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start md:items-center justify-between">
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-emerald-500" />
              </span>
              Available for new projects
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-950 dark:text-zinc-100 tracking-tight leading-[1.1]">
              Architecting digital <br />
              <span className="text-zinc-600 dark:text-zinc-500">infrastructure.</span>
            </h1>

            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              I&apos;m <span className="text-zinc-950 dark:text-zinc-200">Darkhanbayar Erdenebat</span>, a System Architect focused on
              Cloud &amp; DevOps. I design AWS/Kubernetes platforms, build Golang services, and lead teams to improve
              reliability, automation, and delivery speed.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/works"
                className="group flex items-center gap-2 text-sm text-zinc-950 dark:text-zinc-100 border-b border-zinc-300 dark:border-zinc-700 pb-0.5 w-fit hover:border-zinc-950 dark:hover:border-zinc-100 transition-colors"
              >
                View Works
                <IconArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  href={siteLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300 transition-colors"
                  aria-label="GitHub"
                >
                  GitHub
                </a>
                <a
                  href={siteLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={siteLinks.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300 transition-colors"
                  aria-label="Resume PDF"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>

          <div className="hidden sm:hidden md:block rounded-2xl relative w-full aspect-square max-w-[200px] sm:max-w-none sm:w-56 sm:h-56 shrink-0 overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sm:rotate-3 sm:hover:rotate-0 transition-transform duration-500">
            <Image
              src="/profile.jpg"
              alt="Darkhanbayar Erdenebat"
              fill
              priority
              sizes="(min-width: 768px) 224px, 0px"
              className="object-contain hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-black/10 dark:from-zinc-950/80 to-transparent" />
          </div>
        </div>
      </section>

      <section
        id="works"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 scroll-mt-24"
      >
        <div className="p-4 sm:p-6 md:col-span-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] flex flex-col justify-between h-full bg-white/70 dark:bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-zinc-200/70 dark:border-white/10">
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-100">
              <IconBriefcase className="size-5" aria-hidden />
            </div>
            <span className="text-xs font-mono text-zinc-500">OCT 2025 — PRESENT</span>
          </div>
          <div>
            <h3 className="text-zinc-950 dark:text-zinc-200 font-medium text-lg tracking-tight mb-1">TECH PARTNERS</h3>
            <p className="text-sm text-zinc-500 mb-4">System Architect</p>
            <ul className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-inside space-y-2">
              <li>
                Led cloud architecture improvements to increase reliability, scalability, and service availability.
              </li>
              <li>
                Standardized CI/CD pipelines across products, improving deployment speed and consistency.
              </li>
              <li>
                Implemented security and quality controls (OWASP practices, SonarQube, automated scanning) and strengthened overall platform stability by ~30%.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex flex-col justify-between bg-white/70 dark:bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-zinc-200/70 dark:border-white/10">
          <div>
            <h3 className="text-zinc-950 dark:text-zinc-200 font-medium text-sm mb-4 flex items-center gap-2">
              <IconHeart className="size-4 text-rose-500/80" aria-hidden />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "DevOps",
                "Cloud Architecture",
                "AWS",
                "Kubernetes",
                "Golang",
                "CI/CD",
                "Containerization",
                "Orchestration",
                "Team Mentoring",
              ].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-zinc-950 dark:text-zinc-200 font-medium text-sm mb-3">Location</h3>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <IconMapPin className="size-4 text-zinc-500" aria-hidden />
              Fairfield, Iowa
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        <section id="timeline" className="scroll-mt-24">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
              <IconTimeline className="size-5 text-zinc-500" aria-hidden />
              Timeline
            </h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/timeline">Show details</Link>
            </Button>
          </div>
          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-8 pb-4">
            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
              <span className="text-xs font-mono text-zinc-500 mb-1 block">
                2014 — 2018
              </span>
              <h4 className="text-zinc-900 dark:text-zinc-300 text-sm font-medium">
                B.S. Information Technology
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Mongolian University of Science and Technology (Ulaanbaatar)
              </p>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
              <span className="text-xs font-mono text-zinc-500 mb-1 block">
                APR 2018 — MAR 2019
              </span>
              <h4 className="text-zinc-900 dark:text-zinc-300 text-sm font-medium">
                Frontend Developer, Z24 LLC
              </h4>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
              <span className="text-xs font-mono text-zinc-500 mb-1 block">
                JUN 2021 — FEB 2025
              </span>
              <h4 className="text-zinc-900 dark:text-zinc-300 text-sm font-medium">
                Senior Engineer, TECH PARTNERS
              </h4>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
              <span className="text-xs font-mono text-zinc-500 mb-1 block">
                OCT 2021 — APR 2022
              </span>
              <h4 className="text-zinc-900 dark:text-zinc-300 text-sm font-medium">
                Senior Software Engineer Team Lead, FIBO CLOUD
              </h4>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950" />
              <span className="text-xs font-mono text-zinc-500 mb-1 block">
                APR 2022 — MAR 2024
              </span>
              <h4 className="text-zinc-900 dark:text-zinc-300 text-sm font-medium">
                Chief Technology Officer, FIBO CLOUD
              </h4>
            </div>

            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 border border-zinc-400 dark:border-zinc-500 bg-zinc-950 dark:bg-zinc-100" />
              <span className="text-xs font-mono text-emerald-500 mb-1 block">
                OCT 2025 — Present
              </span>
              <h4 className="text-zinc-950 dark:text-zinc-200 text-sm font-medium">
                System Architect, TECH PARTNERS
              </h4>
            </div>
          </div>
        </section>

        <section id="certs" className="scroll-mt-24">
          <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-6 flex items-center gap-2">
            <IconSchool className="size-5 text-zinc-500" aria-hidden />
            Certifications
          </h2>
          <div className="space-y-3 sm:space-y-4 grid grid-cols-2 md:grid-cols-1 gap-4">
            <div className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 border hover:bg-zinc-100/60 transition-colors">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/aws.jpeg" alt="AWS" width={30} height={30} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-300 truncate">
                  AWS Certified Developer
                </h4>
                <p className="text-xs text-zinc-500">Associate Level</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800">
                MAY 2020
              </span>
            </div>

            <div className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-white/70 dark:bg-zinc-900/20 border border-zinc-200/70 dark:border-zinc-800/60">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/linux.png" alt="Linux" width={30} height={30} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-zinc-950 dark:text-zinc-200 truncate">
                  CKA: Kubernetes Admin
                </h4>
                <p className="text-xs text-zinc-500">
                  The Linux Foundation
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800">
                MAR 2022
              </span>
            </div>

            <div className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-white/70 dark:bg-zinc-900/20 border border-zinc-200/70 dark:border-zinc-800/60">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/aws-pro.png" alt="AWS_PRO" width={30} height={30} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-zinc-950 dark:text-zinc-200 truncate">
                  Solutions Architect Professional
                </h4>
                <p className="text-xs text-zinc-500">
                  Amazon Web Services
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800">
                SOON...
              </span>
            </div>

            <div className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-white/70 dark:bg-zinc-900/20 border border-zinc-200/70 dark:border-zinc-800/60">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image src="/kubestronaut.png" alt="Linux" width={30} height={30} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-zinc-950 dark:text-zinc-200 truncate">
                  Kubestronaut (CKA, CKAD, CKS, KCNA, KCSA)
                </h4>
                <p className="text-xs text-zinc-500">
                  The Linux Foundation
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800">
                SOON...
              </span>
            </div>
          </div>

          {/* <div className="mt-10">
              <h3 className="text-lg font-medium text-zinc-950 dark:text-zinc-100 mb-6 flex items-center gap-2">
                <IconSchool className="size-5 text-zinc-500" aria-hidden />
                Education
              </h3>
              <div className="space-y-4">
                <div className="group flex items-center gap-4 p-3 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/50 transition-colors border border-zinc-200/70 dark:border-transparent hover:border-zinc-300 dark:hover:border-zinc-800/50 bg-white/70 dark:bg-transparent">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-200 dark:border-zinc-800">
                    <IconSchool className="size-5" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-300 truncate">
                      Master&apos;s degree, Maharishi International University
                    </h4>
                    <p className="text-xs text-zinc-500">Fairfield (Currently studying)</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800">
                    FEB 2026
                  </span>
                </div>

                <div className="group flex items-center gap-4 p-3 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/50 transition-colors border border-zinc-200/70 dark:border-transparent hover:border-zinc-300 dark:hover:border-zinc-800/50 bg-white/70 dark:bg-transparent">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-200 dark:border-zinc-800">
                    <IconSchool className="size-5" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-300 truncate">
                      Bachelor&apos;s degree, Mongolian University of Science and Technology
                    </h4>
                    <p className="text-xs text-zinc-500">Information Technology</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800">
                    2014 — 2018
                  </span>
                </div>
              </div>
            </div> */}
        </section>
      </div>

    </main>
  );
}