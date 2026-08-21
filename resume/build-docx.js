const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  LevelFormat, Tab, TabStopType, ExternalHyperlink,
} = require('docx');

// text column width: 12240 page - 800 left - 800 right
const TABS = [{ type: TabStopType.RIGHT, position: 10640 }];
const fs = require('fs');

const ACCENT = '0F3D4A';
const INK = '1A1A1A';
const MUTED = '4A4A4A';
const FONT = 'Calibri';

const BODY = 19;   // half-points -> 9.5pt
const SMALL = 17;  // 8.5pt

/** Parse "plain **bold** plain" into TextRun[] */
function rich(text, opts = {}) {
  const base = { font: FONT, size: opts.size || BODY, color: opts.color || INK, italics: opts.italics || false };
  return text.split('**').map((chunk, i) =>
    new TextRun({ ...base, text: chunk, bold: i % 2 === 1 })
  ).filter(r => r);
}

/** right-aligned tail on the same line */
function rtab() {
  return new TextRun({ children: [new Tab()] });
}

function heading(text) {
  return new Paragraph({
    spacing: { before: 260, after: 110 },
    border: { bottom: { color: ACCENT, style: BorderStyle.SINGLE, size: 10, space: 2 } },
    children: [new TextRun({
      text: text.toUpperCase(), bold: true, font: FONT,
      size: 18, color: ACCENT, characterSpacing: 24,
    })],
  });
}

/** left text + right text on one line */
function splitLine(left, right, o = {}) {
  const leftRuns = Array.isArray(left)
    ? left
    : rich(left, { size: o.leftSize || BODY, color: o.leftColor || INK });
  return new Paragraph({
    tabStops: TABS,
    spacing: { before: o.before || 60, after: o.after || 60 },
    children: [
      ...leftRuns,
      rtab(),
      new TextRun({ text: right, font: FONT, size: SMALL, color: MUTED, italics: o.rightItalic !== false }),
    ],
  });
}

/** Accepts a markdown-ish string, or an array mixing strings with { text, bold, link }. */
function bullet(content) {
  const parts = Array.isArray(content) ? content : [content];
  const children = parts.flatMap((part) => {
    if (typeof part === 'string') return rich(part);
    const run = new TextRun({
      text: part.text,
      bold: !!part.bold,
      font: FONT,
      size: BODY,
      color: part.link ? ACCENT : INK,
    });
    return part.link ? [new ExternalHyperlink({ link: part.link, children: [run] })] : [run];
  });
  return new Paragraph({
    numbering: { reference: 'b', level: 0 },
    spacing: { after: 60, line: 250 },
    children,
  });
}

function descriptor(text) {
  return new Paragraph({
    spacing: { before: 20, after: 40 },
    children: [new TextRun({ text, font: FONT, size: SMALL, color: MUTED, italics: true })],
  });
}

/** full role block */
function role({ title, dates, company, companyUrl, location, note, bullets }) {
  const companyRun = new TextRun({ text: company, bold: true, font: FONT, size: BODY, color: ACCENT });
  const companyEl = companyUrl ? new ExternalHyperlink({ link: companyUrl, children: [companyRun] }) : companyRun;
  const out = [
    new Paragraph({
      tabStops: TABS,
      spacing: { before: 220, after: 0 },
      children: [
        new TextRun({ text: title.toUpperCase(), bold: true, font: FONT, size: 20, color: INK }),
        rtab(),
        new TextRun({ text: dates, font: FONT, size: SMALL, color: MUTED }),
      ],
    }),
    new Paragraph({
      tabStops: TABS,
      spacing: { before: 20, after: 40 },
      children: [
        companyEl,
        rtab(),
        new TextRun({ text: location, font: FONT, size: SMALL, color: MUTED, italics: true }),
      ],
    }),
  ];
  if (note) out.push(descriptor(note));
  out.push(...bullets.map(bullet));
  return out;
}

const link = (text, href) => new ExternalHyperlink({
  link: href,
  children: [new TextRun({ text, font: FONT, size: SMALL, color: ACCENT })],
});
const sep = () => new TextRun({ text: '  •  ', font: FONT, size: SMALL, color: MUTED });

const doc = new Document({
  numbering: {
    config: [{
      reference: 'b',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 250, hanging: 180 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 720, right: 800, bottom: 720, left: 800 },
      },
    },
    children: [
      // ---------- header ----------
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: 'Darkhanbayar Erdenebat', bold: true, font: FONT, size: 42, color: ACCENT })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: 'DevOps Engineer  |  AWS Cloud Engineer', font: FONT, size: 21, color: MUTED })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 30 },
        children: [
          new TextRun({ text: 'Fairfield, Iowa, USA', font: FONT, size: SMALL, color: MUTED }),
          sep(),
          link('darkhanbayarr@gmail.com', 'mailto:darkhanbayarr@gmail.com'),
          sep(),
          new TextRun({ text: '+1 (641) 233-9944', font: FONT, size: SMALL, color: MUTED }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [
          link('linkedin.com/in/darkhanbayar-erdenebat', 'https://linkedin.com/in/darkhanbayar-erdenebat'),
          sep(),
          link('github.com/darkhaamn', 'https://github.com/darkhaamn'),
          sep(),
          link('darkhaa.tech', 'https://darkhaa.tech'),
        ],
      }),

      // ---------- summary ----------
      heading('Summary'),
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { line: 250 },
        children: rich(
          'DevOps and Cloud Engineer with 7 years in software engineering, 5 of them building and operating ' +
          'production cloud infrastructure. Built **Cloud.mn — Mongolia’s first public cloud platform** — from the ' +
          'ground up to 300+ enterprise clients, and led its expansion into Kazakhstan. AWS Certified Solutions ' +
          'Architect – Professional. Hands-on across AWS, Terraform, Kubernetes, OpenStack, CI/CD, and production observability.'
        ),
      }),

      // ---------- skills ----------
      heading('Technical Skills'),
      ...[
        '**AWS:** EC2, ECS, ECR, Auto Scaling, Launch Templates, VPC, ALB/ELB, Route 53, CloudFront, ACM, RDS (Multi-AZ), S3, CloudWatch, SNS, IAM, Secrets Manager, SSM — and others across compute, networking, data, and security',
        '**Private Cloud & Virtualization:** OpenStack, KVM',
        '**IaC & CI/CD:** Terraform, Ansible, GitHub Actions, GitLab CI, container build & scan pipelines, rolling & zero-downtime deploys',
        '**Containers & Orchestration:** Kubernetes, Docker, Helm',
        '**Observability & Security:** Prometheus, Grafana, Node Exporter, Blackbox Exporter, OWASP, SonarQube, Snyk, IAM least-privilege',
        '**Languages & Data:** Go, Python, TypeScript, Bash, PostgreSQL, MySQL/MariaDB, Redis, RabbitMQ',
        '**Systems:** Linux, Nginx, TLS, DNS, Distributed Systems, Microservices',
      ].map(t => new Paragraph({ spacing: { after: 70, line: 250 }, children: rich(t) })),

      // ---------- experience ----------
      heading('Experience'),

      ...role({
        title: 'Senior DevOps / Cloud Engineer',
        dates: 'Mar 2024 – Jan 2026',
        company: 'Tech Partners',
        companyUrl: 'https://techpartners.asia/',
        location: 'Ulaanbaatar, Mongolia',
        bullets: [
          'Architected and codified a **multi-AZ AWS platform in Terraform** (VPC, ALB, Auto Scaling, EC2 Launch Templates, RDS Multi-AZ, Route 53, ACM, ECR, Secrets Manager, SSM), replacing a fragile single-instance production setup with a highly available environment supporting zero-downtime releases.',
          'Standardized CI/CD across **5+ products** on **GitHub Actions and GitLab CI** — build, test, OWASP-aligned scanning (SonarQube, Snyk), push to ECR, rolling deploy — reducing change failure rate by **30%**.',
          'Established the production observability stack (Prometheus, Grafana, Node Exporter, Blackbox Exporter, CloudWatch, SNS) with alerting on ASG lifecycle events, RDS CPU, and endpoint health; authored the runbook that let the operations team own deploys and incident response independently.',
          'Reduced monthly AWS spend by **40%** via instance right-sizing, Auto Scaling target tracking, caching to cut RDS load, and elimination of idle capacity.',
          'Delivered **MedOrder**, a healthcare SaaS platform (Go, PostgreSQL, Redis, Kubernetes) processing **40,000+ pharmaceutical orders** under full regulatory compliance — owning both the application and its production infrastructure.',
        ],
      }),

      ...role({
        title: 'Founder & Platform Engineer',
        dates: 'Mar 2025 – Jun 2026',
        company: 'EasySim.mn',
        companyUrl: 'https://easysim.mn',
        location: 'Remote · Ulaanbaatar, Mongolia',
        note: 'Independent venture, built and operated solo alongside full-time engineering work — international eSIM service delivering mobile data in 100+ countries through a Mongolian super app.',
        bullets: [
          '**Ran the entire production platform single-handed** — containerized services behind Nginx with TLS termination, centralized logging, health checks, and uptime monitoring. No ops team, no downtime budget.',
          'Integrated multiple international eSIM supplier APIs for catalog sync, ordering, QR-code delivery, and activation tracking, enabling **fully automated 24/7 fulfillment** with zero manual steps in the purchase path.',
          'Built the platform on Go, TypeScript, Node.js, PostgreSQL, Redis, and Docker, automating product, pricing, and data-plan management to remove manual catalog maintenance entirely.',
        ],
      }),

      ...role({
        title: 'Chief Technology Officer',
        dates: 'Apr 2022 – Mar 2024',
        company: 'Fibo Cloud',
        companyUrl: 'https://fibo.cloud/',
        location: 'Ulaanbaatar, Mongolia',
        note: 'Cloud provider behind Cloud.mn — Mongolia’s first public cloud platform.',
        bullets: [
          'Directed platform engineering for **Cloud.mn and TTC Cloud** (OpenStack, KVM, Kubernetes, Docker, MariaDB, Redis, RabbitMQ), leading **20+ engineers, architects, and PMs**.',
          'Took the company’s own cloud platform international, launching **TTC Cloud on Transtelecom — Kazakhstan’s largest datacenter** — coordinating datacenter operations, local payment providers, and regional compliance.',
          'Owned platform reliability and the production on-call rotation, sustaining **99.95% uptime**.',
          'Automated infrastructure provisioning and deployment workflows (Ansible, CI/CD), accelerating time-to-market for new cloud services by **35%**.',
        ],
      }),

      ...role({
        title: 'Senior Software Engineer / Team Lead',
        dates: 'Oct 2021 – Apr 2022',
        company: 'Fibo Cloud',
        companyUrl: 'https://fibo.cloud/',
        location: 'Ulaanbaatar, Mongolia',
        bullets: [
          'Led the infrastructure build-out of **Cloud.mn** with **10+ engineers** (OpenStack, KVM, Ansible), building the provisioning automation that made customer onboarding self-service and cut manual provisioning time by **90%**.',
          'Built backend services on OpenStack APIs (Compute, Networking, Identity, Storage) with Kubernetes orchestration, enabling self-service multi-tenant resource management at scale.',
        ],
      }),

      ...role({
        title: 'Frontend Engineer',
        dates: 'Mar 2019 – Oct 2021',
        company: 'Fibo Cloud',
        companyUrl: 'https://fibo.cloud/',
        location: 'Ulaanbaatar, Mongolia',
        bullets: [
          'Built the Cloud.mn control panel (React, TypeScript) from the platform’s earliest stage — the user-facing layer of Mongolia’s first public cloud.',
          'Moved into infrastructure through self-directed work on Ansible and the OpenStack APIs, taking on cloud delivery alongside frontend work and transitioning into platform engineering within two years.',
          [
            'Led UFE’s migration to **AWS** (CloudFront, EC2, EBS, RDS for MySQL, Auto Scaling) during Mongolia’s COVID-19 lockdown — delivered in **10 days** for **6,000+ students**, since sustaining **99.99% availability**. ',
            { text: 'Published as an official AWS case study', bold: true, link: 'https://web.archive.org/web/20210116032223/https://aws.amazon.com/solutions/case-studies/ufe-mongolia-case-study/' },
            '.',
          ],
        ],
      }),

      // ---------- certifications ----------
      heading('Certifications'),
      splitLine([
        new ExternalHyperlink({
          link: 'https://www.credly.com/badges/072e1564-888f-4be4-bc17-bb8cc1c598f2',
          children: [new TextRun({ text: 'AWS Certified Solutions Architect – Professional', bold: true, font: FONT, size: BODY, color: ACCENT })],
        }),
        new TextRun({ text: '  ·  Amazon Web Services', font: FONT, size: SMALL, color: MUTED, italics: true }),
      ], 'Jun 2026', { rightItalic: false }),

      // ---------- community ----------
      heading('Community'),
      splitLine([
        new ExternalHyperlink({
          link: 'https://www.aws.mn/',
          children: [new TextRun({ text: 'AWS Community Mongolia', bold: true, font: FONT, size: BODY, color: ACCENT })],
        }),
        new TextRun({ text: ' — Organizer', font: FONT, size: BODY, color: INK }),
      ], '2019 – Present', { rightItalic: false }),
      bullet('Grew Mongolia’s AWS user community to **1,200+ members**, ran **50+ technical events**, and mentored **20+ engineers** to AWS certification.'),

      // ---------- education ----------
      heading('Education'),
      splitLine('**M.S., Computer Science**  ·  Maharishi International University, Fairfield, Iowa', 'Feb 2026 – Oct 2028 (expected)', { after: 70, rightItalic: false }),
      splitLine('**B.S., Information Technology**  ·  Mongolian University of Science and Technology', '2014 – 2018', { rightItalic: false }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(process.argv[2] || 'resume.docx', buf);
  console.log('wrote', process.argv[2] || 'resume.docx');
});
