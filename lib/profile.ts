/**
 * Single source of truth for résumé-derived content.
 *
 * Keep this in sync with `resume/resume.docx`, which is exported to
 * `resume/resume.pdf` — the file the site serves at /resume.pdf, copied into
 * `public/` at build time by `scripts/sync-resume.mjs`. Both the home page and
 * the timeline page read from here, so the two can never drift apart again.
 */

export const identity = {
  name: 'Darkhanbayar Erdenebat',
  tagline: 'DevOps & Cloud Engineer',
  location: 'Fairfield, Iowa',
  availability: 'Open to remote & relocation',
} as const;

/** Home page hero — leads with DevOps practice, cloud second. */
export const heroSummary =
  'DevOps and Cloud Engineer with 7 years in software engineering, 5 of them automating delivery and running production infrastructure — CI/CD, infrastructure as code, Kubernetes, and observability across AWS and OpenStack.';

/** Longer form for the timeline page. */
export const professionalSummary =
  'DevOps and Cloud Engineer with 7 years in software engineering, 5 of them building and operating production cloud infrastructure. Built Cloud.mn — Mongolia’s first public cloud platform — from the ground up to 300+ enterprise clients, and led its expansion into Kazakhstan. AWS Certified Solutions Architect – Professional.';

export type Employment = {
  range: string;
  start: string;
  end: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  note?: string;
  highlights: string[];
};

/** Reverse-chronological. Mirrors the résumé exactly. */
export const employment: Employment[] = [
  {
    range: 'MAR 2024 — JAN 2026',
    start: '2024-03',
    end: '2026-01',
    title: 'Senior DevOps / Cloud Engineer',
    company: 'Tech Partners',
    companyUrl: 'https://techpartners.asia/',
    location: 'Ulaanbaatar, Mongolia',
    highlights: [
      'Architected and codified a multi-AZ AWS platform in Terraform (VPC, ALB, Auto Scaling, EC2 Launch Templates, RDS Multi-AZ, Route 53, ACM, ECR, Secrets Manager, SSM), replacing a fragile single-instance production setup with a highly available environment supporting zero-downtime releases.',
      'Standardized CI/CD across 5+ products on GitHub Actions and GitLab CI — build, test, OWASP-aligned scanning (SonarQube, Snyk), push to ECR, rolling deploy — reducing change failure rate by 30%.',
      'Established the production observability stack (Prometheus, Grafana, Node Exporter, Blackbox Exporter, CloudWatch, SNS) with alerting on ASG lifecycle events, RDS CPU, and endpoint health; authored the runbook that let the operations team own deploys and incident response independently.',
      'Reduced monthly AWS spend by 40% via instance right-sizing, Auto Scaling target tracking, caching to cut RDS load, and elimination of idle capacity.',
      'Delivered MedOrder, a healthcare SaaS platform (Go, PostgreSQL, Redis, Kubernetes) processing 40,000+ pharmaceutical orders under full regulatory compliance — owning both the application and its production infrastructure.',
    ],
  },
  {
    range: 'MAR 2025 — JUN 2026',
    start: '2025-03',
    end: '2026-06',
    title: 'Platform Engineer',
    company: 'EasySim.mn',
    companyUrl: 'https://easysim.mn',
    location: 'Remote · Ulaanbaatar, Mongolia',
    note: 'Built and operated solo alongside full-time engineering work.',
    highlights: [
      'Ran the entire production platform single-handed — containerized services behind Nginx with TLS termination, centralized logging, health checks, and uptime monitoring. No ops team, no downtime budget.',
      'Integrated multiple international eSIM supplier APIs for catalog sync, ordering, QR-code delivery, and activation tracking, enabling fully automated 24/7 fulfillment with zero manual steps in the purchase path.',
      'Built the platform on Go, TypeScript, Node.js, PostgreSQL, Redis, and Docker, automating product, pricing, and data-plan management to remove manual catalog maintenance entirely.',
    ],
  },
  {
    range: 'APR 2022 — MAR 2024',
    start: '2022-04',
    end: '2024-03',
    title: 'System Architect',
    company: 'Fibo Cloud',
    companyUrl: 'https://fibo.cloud/',
    location: 'Ulaanbaatar, Mongolia',
    note: 'Cloud provider behind Cloud.mn — Mongolia’s first public cloud platform.',
    highlights: [
      'Directed platform engineering for Cloud.mn and TTC Cloud (OpenStack, KVM, Kubernetes, Docker, MariaDB, Redis, RabbitMQ), leading 20+ engineers, architects, and PMs.',
      'Took the company’s own cloud platform international, launching TTC Cloud on Transtelecom — Kazakhstan’s largest datacenter — coordinating datacenter operations, local payment providers, and regional compliance.',
      'Owned platform reliability and the production on-call rotation, sustaining 99.95% uptime.',
      'Automated infrastructure provisioning and deployment workflows (Ansible, CI/CD), accelerating time-to-market for new cloud services by 35%.',
    ],
  },
  {
    range: 'OCT 2021 — APR 2022',
    start: '2021-10',
    end: '2022-04',
    title: 'Senior Software Engineer / Team Lead',
    company: 'Fibo Cloud',
    companyUrl: 'https://fibo.cloud/',
    location: 'Ulaanbaatar, Mongolia',
    highlights: [
      'Led a full AWS migration (EC2, S3, CloudFront, RDS, ELB, Auto Scaling, Route 53) of UFE’s online learning system during a COVID-19 lockdown sprint — delivered in 10 days with zero downtime for 15,000 students. Published as an official AWS case study.',
      'Led the infrastructure build-out of Cloud.mn with 10+ engineers (OpenStack, KVM, Ansible), building the provisioning automation that made customer onboarding self-service and cut manual provisioning time by 90%.',
      'Built backend services on OpenStack APIs (Compute, Networking, Identity, Storage) with Kubernetes orchestration, enabling self-service multi-tenant resource management at scale.',
    ],
  },
  {
    range: 'MAR 2019 — OCT 2021',
    start: '2019-03',
    end: '2021-10',
    title: 'Frontend Engineer',
    company: 'Fibo Cloud',
    companyUrl: 'https://fibo.cloud/',
    location: 'Ulaanbaatar, Mongolia',
    highlights: [
      'Built the Cloud.mn control panel (React, TypeScript) from the platform’s earliest stage — the user-facing layer of Mongolia’s first public cloud.',
      'Moved into infrastructure through self-directed work on Ansible and the OpenStack APIs, transitioning into full-stack and then platform engineering within two years.',
    ],
  },
];

/** DevOps practice first, cloud second. */
export const skillGroups = [
  {
    label: 'CI/CD & IaC',
    items: ['GitHub Actions', 'GitLab CI', 'Terraform', 'Ansible', 'Zero-downtime deploys'],
  },
  {
    label: 'Containers',
    items: ['Kubernetes', 'Docker', 'Helm', 'ECR'],
  },
  {
    label: 'Cloud',
    items: ['AWS', 'OpenStack', 'KVM'],
  },
  {
    label: 'Observability',
    items: ['Prometheus', 'Grafana', 'Node Exporter', 'Blackbox Exporter', 'CloudWatch'],
  },
  {
    label: 'Security',
    items: ['OWASP', 'SonarQube', 'Snyk', 'IAM least-privilege'],
  },
  {
    label: 'Languages & Data',
    items: ['Go', 'Python', 'TypeScript', 'Bash', 'PostgreSQL', 'Redis'],
  },
  {
    label: 'Systems',
    items: ['Linux', 'Nginx', 'TLS', 'DNS'],
  },
] as const;

/** Detailed variant for the timeline page. */
export const skillDetail = [
  {
    label: 'CI/CD & IaC',
    items:
      'GitHub Actions, GitLab CI, Terraform, Ansible, container build & scan pipelines, rolling & zero-downtime deploys',
  },
  { label: 'Containers', items: 'Kubernetes, Docker, Helm, ECR' },
  {
    label: 'Cloud',
    items:
      'AWS (EC2, ECS, ECR, Auto Scaling, Launch Templates, VPC, ALB/ELB, Route 53, CloudFront, ACM, RDS Multi-AZ, S3, CloudWatch, SNS, IAM, Secrets Manager, SSM), OpenStack, KVM',
  },
  {
    label: 'Observability',
    items: 'Prometheus, Grafana, Node Exporter, Blackbox Exporter, CloudWatch, SNS',
  },
  { label: 'Security', items: 'OWASP, SonarQube, Snyk, IAM least-privilege' },
  {
    label: 'Languages & Data',
    items: 'Go, Python, TypeScript, Bash, PostgreSQL, MySQL/MariaDB, Redis, RabbitMQ',
  },
  { label: 'Systems', items: 'Linux, Nginx, TLS, DNS, Distributed Systems, Microservices' },
] as const;

/**
 * Only currently-valid certifications are listed.
 * CKA (Mar 2022) and AWS Developer – Associate (May 2020) have both lapsed.
 */
export const certifications = [
  {
    src: '/solution-architect-pro.webp',
    title: 'AWS Certified Solutions Architect – Professional',
    meta: 'Amazon Web Services · Jun 2026',
    href: 'https://www.credly.com/badges/072e1564-888f-4be4-bc17-bb8cc1c598f2',
  },
] as const;

export const community = {
  name: 'AWS Community Mongolia',
  role: 'Organizer',
  location: 'Ulaanbaatar',
  href: 'https://www.aws.mn/',
  stats: [
    { value: '1,200+', label: 'members' },
    { value: '50+', label: 'events' },
    { value: '5+', label: 'years' },
    { value: '20+', label: 'certified' },
  ],
} as const;

export const education = [
  {
    range: 'FEB 2026 — OCT 2028',
    degree: 'M.S., Computer Science',
    school: 'Maharishi International University, Fairfield, Iowa',
    note: 'Expected',
  },
  {
    range: '2014 — 2018',
    degree: 'B.S., Information Technology',
    school: 'Mongolian University of Science and Technology',
  },
] as const;
