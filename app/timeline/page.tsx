import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteLinks } from "@/lib/site-links";
import {
  IconArrowLeft,
  IconBriefcase,
  IconFileText
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Detailed timeline and resume highlights for Darkhanbayar Erdenebat.",
};

// Content below is sourced from `public/resume.pdf` (rendered as text).
const professionalSummary =
  "System Architect with 8+ years designing cloud and DevOps solutions. Leads teams in AWS, Kubernetes, and Golang to improve reliability, automation, and delivery speed.";

const employment = [
  {
    range: "OCT 2025 — Present",
    location: "Ulaanbaatar, Mongolia",
    title: "System Architect",
    company: "Tech Partners",
    highlights: [
      "Designed the system architecture for TESO’s vending machine platform (1,000+ devices) and integrated supporting services across multiple systems.",
      "Led cloud architecture improvements to increase reliability, scalability, and service availability.",
      "Standardized CI/CD pipelines across products, improving deployment speed and consistency.",
      "Implemented security and quality controls (OWASP practices, SonarQube, automated scanning) and strengthened overall platform stability by ~30%.",
      "Mentored engineers and guided architecture decisions across backend, DevOps, and infrastructure teams.",
      "Successfully launched cloud services in Kazakhstan’s TTC Datacenter and Uzbekistan’s Uztelecom Datacenter, expanding the company’s regional presence.",
    ],
  },
  {
    range: "APR 2022 — MAR 2024",
    location: "Ulaanbaatar, Mongolia",
    title: "Chief Technology Officer",
    company: "Fibo Cloud",
    highlights: [
      "Directed cloud infrastructure strategy, achieving 99.7% uptime and ensuring compliance with top-tier enterprise requirements.",
      "Designed and implemented a developer skills measurement framework, increasing recruitment efficiency by 30% and improving team performance evaluations by 25%.",
      "Provided executive leadership in technology vision and product roadmap, accelerating time-to-market for new services by 35%.",
      "Led the development of Mongolia’s first public cloud platform (Cloud.mn), building and delivering full-stack features using React and Python/Go.",
      "Designed and deployed production-grade cloud infrastructure using OpenStack, KVM, and Ansible, ensuring 99.6% uptime and stable service operations.",
      "Delivered cloud consulting for top Mongolian enterprises, helping teams plan cloud adoption, optimize infrastructure architecture, improve reliability, and reduce operational risk.",
    ],
  },
  {
    range: "OCT 2021 — APR 2022",
    location: "Ulaanbaatar, Mongolia",
    title: "Senior Software Engineer Team Lead",
    company: "Fibo Cloud",
    highlights: [],
  },
  {
    range: "JUN 2021 — FEB 2025",
    location: "Ulaanbaatar, Mongolia",
    title: "Senior Engineer",
    company: "Tech Partners",
    highlights: [
      "Designed and developed scalable full-stack applications, enhancing business growth and user engagement.",
      "Led automation initiatives that streamlined workflows, significantly reducing manual tasks and errors.",
      "Implemented CI/CD pipelines, ensuring fast and reliable software delivery with zero downtime.",
      "Collaborated with cross-functional teams to deliver high-impact features, optimizing performance and cost-efficiency.",
    ],
  },
  {
    range: "APR 2018 — MAR 2019",
    location: "Ulaanbaatar, Mongolia",
    title: "Frontend Developer",
    company: "Z24 LLC",
    highlights: [
      "Studied and applied React.js (components, hooks, routing, state management).",
      "Developed UI pages for a flight ordering system and an internal backoffice panel.",
      "Collaborated with backend team to integrate APIs and display real-time data.",
    ],
  },
] as const;



export default function TimelinePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-950 dark:text-zinc-100">
              Timeline details
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
              {professionalSummary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
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

        <section className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-950 dark:text-zinc-100 flex items-center gap-2">
            <IconBriefcase className="size-4 text-zinc-500" aria-hidden />
            Employment history
          </h2>
          <div className="space-y-4">
            {employment.map((job) => (
              <div
                key={`${job.range}-${job.title}-${job.company}`}
                className="p-4 sm:p-5 bg-white/70 dark:bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-zinc-200/70 dark:border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-zinc-950 dark:text-zinc-100 font-medium tracking-tight">
                      {job.title}, {job.company}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{job.location}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 w-fit">
                    {job.range}
                  </span>
                </div>

                {job.highlights.length > 0 ? (
                  <ul className="mt-3 text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed list-disc list-inside space-y-2">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    Details available in the PDF resume.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

