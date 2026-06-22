import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteLinks } from "@/lib/site-links";
import {
  IconArrowLeft,
  IconBriefcase,
  IconCertificate,
  IconFileText,
  IconSchool,
  IconStack2,
} from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Detailed timeline and resume highlights for Darkhanbayar Erdenebat.",
};

// Content below is sourced from `public/resume.pdf` (rendered as text).
const professionalSummary =
  "DevOps and Cloud Engineer with 7+ years across cloud infrastructure, platform engineering, and full-stack development. Built and launched Cloud.mn — Mongolia’s first public cloud platform — growing it to 300+ enterprise clients and expanding to Kazakhstan. Hands-on with AWS, Kubernetes, OpenStack, and CI/CD automation.";

const employment = [
  {
    range: "OCT 2025 — JUN 2026",
    location: "Ulaanbaatar, Mongolia",
    title: "Senior DevOps / Cloud Engineer",
    company: "Tech Partners",
    active: true,
    highlights: [
      "Designed and deployed an AWS high-availability architecture (Route 53 → ALB → Auto Scaling Group → EC2) for Mobilife, replacing a single-instance setup with a scalable production system using Launch Templates, ECR, and Secrets Manager.",
      "Built an infrastructure runbook covering deployment, rollback, cost optimization, and observability with Prometheus, Grafana, CloudWatch, and SNS alerting.",
      "Standardized CI/CD pipelines across products using Docker and ECR, reducing deployment friction and improving release consistency.",
      "Implemented OWASP-aligned security controls (SonarQube, automated scanning), reducing deployment incidents by 30%.",
    ],
  },
  {
    range: "APR 2022 — MAR 2024",
    location: "Ulaanbaatar, Mongolia",
    title: "Chief Technology Officer",
    company: "Fibo Cloud",
    highlights: [
      "Led a team of 20+ (engineers, system architects, and PMs) to build and operate Cloud.mn and TTC Cloud — public cloud platforms on OpenStack, Kubernetes, Docker, MariaDB, Redis, and RabbitMQ.",
      "Launched TTC Cloud for Kazakhstan’s largest datacenter (Transtelecom), including local payment integration and regional compliance.",
      "Designed a developer skills measurement framework, increasing recruitment efficiency by 30% and improving team performance evaluations by 25%.",
      "Accelerated time-to-market for new services by 35% through infrastructure automation and process improvements.",
    ],
  },
  {
    range: "OCT 2021 — APR 2022",
    location: "Ulaanbaatar, Mongolia",
    title: "Senior Software Engineer / Team Lead",
    company: "Fibo Cloud",
    highlights: [
      "Led the AWS migration of the University of Finance and Economics (UFE) online learning system during COVID-19 — completed in 10 days with zero downtime using EC2, S3, CloudFront, RDS, ELB, Auto Scaling, and Route 53. Featured as an official AWS case study.",
      "Led a team of 10+ engineers to scale Cloud.mn to 300+ top Mongolian companies, reducing manual provisioning time by 90%.",
      "Architected and deployed production infrastructure using OpenStack, KVM, and Ansible, maintaining 99.95% uptime.",
      "Built backend services integrating OpenStack APIs (Compute, Networking, Identity, Storage) and implemented Kubernetes orchestration for multi-tenant workloads.",
    ],
  },
  {
    range: "JUN 2021 — FEB 2025",
    location: "Ulaanbaatar, Mongolia",
    title: "Senior Engineer (Part-time)",
    company: "Tech Partners",
    highlights: [
      "Built MedOrder — a healthcare SaaS ecosystem (customer, admin, and supplier portals) for MedTech Partner — processing 40,000+ pharmaceutical orders with real-time tracking and License Management API compliance.",
      "Architected the microservices backend for iTrip, Mongolia’s all-in-one travel platform, integrating 8+ third-party APIs (Amadeus, Route24, Viator, Trip.com) and multiple payment gateways on AWS + Kubernetes.",
      "Delivered software and digital platform solutions across healthcare and travel verticals, contributing to CI/CD automation and zero-downtime deployments.",
    ],
  },
  {
    range: "MAR 2019 — OCT 2021",
    location: "Ulaanbaatar, Mongolia",
    title: "Frontend Engineer",
    company: "Fibo Cloud",
    highlights: [
      "Contributed to early-stage development of Cloud.mn, building frontend interfaces for cloud resource management dashboards.",
      "Transitioned into backend and DevOps, picking up infrastructure automation, Ansible, and API integration alongside frontend work.",
    ],
  },
] as const;

const skillGroups = [
  { label: "Languages", items: "Python, Bash, JavaScript, Go (working knowledge)" },
  {
    label: "Cloud",
    items:
      "AWS (EC2, S3, RDS, CloudFront, Route 53, ALB, Auto Scaling, CloudWatch, ECR, Secrets Manager, SSM), OpenStack",
  },
  { label: "Containers", items: "Kubernetes (CKA certified), Docker" },
  { label: "Databases", items: "PostgreSQL, Redis" },
  { label: "Observability", items: "Prometheus, Grafana" },
  {
    label: "Practices",
    items: "Microservices, Distributed Systems, CI/CD, Infrastructure as Code, GitOps",
  },
  { label: "Security", items: "OWASP, Automated Security Scanning, Snyk" },
] as const;

const certifications = [
  {
    src: "/kubernetes.svg",
    title: "CKA: Certified Kubernetes Administrator",
    meta: "The Linux Foundation · Mar 2022",
  },
  {
    src: "/aws.svg",
    title: "AWS Certified Developer — Associate",
    meta: "Amazon Web Services · May 2020",
  },
] as const;

const education = [
  {
    range: "FEB 2026 — OCT 2028",
    degree: "M.S., Computer Science",
    school: "Maharishi International University, Fairfield, Iowa",
  },
  {
    range: "2014 — 2018",
    degree: "B.S., Information Technology",
    school: "Mongolian University of Science and Technology",
  },
] as const;

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
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
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
                <span
                  className={
                    "active" in job && job.active
                      ? "absolute -left-[5px] top-2 size-2.5 rounded-full bg-emerald-500"
                      : "absolute -left-[5px] top-2 size-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950"
                  }
                />
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
                    <span
                      className={
                        "active" in job && job.active
                          ? "text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 w-fit shrink-0"
                          : "text-[10px] font-mono uppercase tracking-wider text-zinc-500 w-fit shrink-0"
                      }
                    >
                      {job.range}
                    </span>
                  </div>

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
            {skillGroups.map((group) => (
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
              <div
                key={cert.title}
                className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <div className="flex items-center justify-center size-11 rounded-lg bg-white border border-zinc-200 shrink-0">
                  <Image src={cert.src} alt={cert.title} width={26} height={26} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{cert.title}</h3>
                  <p className="text-xs text-zinc-500">{cert.meta}</p>
                </div>
              </div>
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
