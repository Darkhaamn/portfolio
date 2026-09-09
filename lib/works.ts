export type WorkId = 'cloudmn' | 'ttc' | 'ufe_aws' | 'mobilife_aws' | 'easysim' | 'medtech' | 'itrip' | 'streamkeep' | 'duutaa';

export type WorkLink = {
  label: string;
  href: string;
  /** Header call-to-action text. Defaults to `Visit {label}`, which is correct
   *  for the entries whose first label is a bare domain. */
  cta?: string;
};

export type WorkMetric = {
  value: string;
  label: string;
};

export type WorkArchNode = { label: string; sub?: string };

export type WorkArchitecture = {
  caption?: string;
  tiers: { label?: string; nodes: WorkArchNode[] }[];
};

export type WorkTheme = {
  accent: string;
  accentMuted: string;
  accentBar: string;
  label: string;
};

/** Selects the bespoke diagram for a project. It no longer affects page order. */
export type WorkLayout =
  | 'stack' // layered platform (Cloud.mn)
  | 'regions' // same platform, second country (TTC)
  | 'migration' // before -> after under time pressure (UFE)
  | 'flow' // request path through an HA topology (Mobilife)
  | 'pipeline' // linear automated fulfilment (EasySim)
  | 'topology' // many clients over shared services (MedOrder)
  | 'hub'; // one core, many integrations (iTrip)

export type WorkNode = { label: string; sub?: string };

/** How the detail page opens. */
export type WorkHero =
  | { kind: 'browser'; url: string }
  | { kind: 'split'; panes: { src: string; alt: string; url: string; caption: string }[] }
  | { kind: 'numeral'; value: string; unit: string; note: string; url: string }
  | { kind: 'none' };
export type WorkHub = {
  center: string;
  centerSub?: string;
  /** Suppliers, grouped by what they provide. */
  groups: { label: string; spokes: WorkNode[] }[];
  /** What the fragmented market becomes once it is behind one core. */
  outputs?: WorkNode[];
};
export type WorkRegion = { name: string; sub: string; items: string[] };
export type WorkBeforeAfter = {
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
};
export type WorkTopology = { clients: WorkNode[]; core: WorkNode; services: string[] };

/** A full cloud architecture: edge, VPC subnets across AZs, ops rail, DR. */
export type WorkCloudArch = {
  caption?: string;
  edge: WorkNode[];
  /** Sits beside the edge, outside the VPC (object storage, etc). */
  aside?: WorkNode;
  vpc: {
    label: string;
    zones: string[];
    rows: {
      subnet: string;
      kind: 'public' | 'private';
      /** One card per AZ when true, otherwise a single card spanning them. */
      perZone?: boolean;
      group?: string;
      nodes: WorkNode[];
      /** Draw a replication link between the two AZ copies. */
      replicated?: string;
    }[];
  };
  ops?: { label: string; nodes: WorkNode[] }[];
  dr?: { label: string; items: string[] };
};

/** A titled section of the write-up; renders as an h2 with prose and an optional list. */
/** A labelled block inside a section; renders as an h3 with its own prose and list. */
export type WorkSectionGroup = {
  label: string;
  paragraphs?: string[];
  list?: string[];
};

export type WorkSection = {
  heading: string;
  /** A short pull-quote shown before the paragraphs. */
  quote?: string;
  paragraphs?: string[];
  /** Rendered as a numbered list when `ordered`, otherwise bulleted. */
  list?: string[];
  ordered?: boolean;
  /** Sub-sections, for a section that covers several distinct decisions. */
  groups?: WorkSectionGroup[];
  /** A comparison table. Rendered full width of the reading column. */
  table?: { head: string[]; rows: string[][] };
  /** Closing paragraphs, after any list, groups or table. */
  outro?: string[];
  /** Pull one of the page blocks inline, after this section's content. */
  embed?: 'archify' | 'diagram' | 'metrics' | 'gallery';
};

export type Work = {
  id: WorkId;
  title: string;
  role?: string;
  period?: string;
  status?: string;
  launched?: string;
  featured?: boolean;
  thumbnail: { src: string; alt: string; objectPosition?: string };
  summary: string;
  metrics?: WorkMetric[];
  /** Small print under the metric band — where the numbers come from. */
  metricsNote?: string;
  architecture?: WorkArchitecture;
  /** Untitled opening paragraphs. */
  paragraphs: string[];
  /** Titled sections that follow the opening. */
  sections?: WorkSection[];
  highlights?: string[];
  stack?: string;
  links?: WorkLink[];
  gallery?: { src: string; alt: string }[];
  theme: WorkTheme;
  hero?: WorkHero;
  /** Tile weight on the /works index — drives the editorial rhythm. */
  size?: 'feature' | 'half' | 'third';
  layout?: WorkLayout;
  /** Overrides the layout diagram's built-in heading when a layout is reused.
   *  IGNORED when `archify` is set — archify wins (work-detail.tsx), so this and
   *  the layout data (pipeline / hub / regions / beforeAfter / topology / cloud)
   *  are dead on that project. Set one or the other. */
  diagram?: { title?: string; caption?: string };
  /** An Archify-authored diagram, delivered as a self-contained viewer under /diagrams. */
  archify?: {
    src: string;
    title: string;
    caption?: string;
    /** Tailwind height for the frame. Must clear the viewer's tallest layout at
     *  every page width, or it scrolls inside. Measured per diagram. */
    heightClass?: string;
  };
  pipeline?: WorkNode[];
  hub?: WorkHub;
  regions?: WorkRegion[];
  beforeAfter?: WorkBeforeAfter;
  topology?: WorkTopology;
  cloud?: WorkCloudArch;
};

export const works: Work[] = [
  {
    id: 'cloudmn',
    hero: { kind: 'browser', url: 'cloud.mn' },
    size: 'feature',
    layout: 'stack',
    title: 'Cloud.mn',
    role: 'System Architect',
    period: '2019–2024',
    launched: '2019',
    featured: true,
    thumbnail: { src: '/works/live/cloudmn.webp', alt: 'Cloud.mn — self-service public cloud portal' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'Public Cloud',
    },
    summary: "Mongolia's first public cloud platform — self-service virtual machines, storage, and networking built from the ground up.",
    metrics: [
      { value: '300+', label: 'enterprise clients' },
      { value: '99.95%', label: 'uptime' },
      { value: '90%', label: 'less manual provisioning' },
    ],
    architecture: {
      caption: 'Self-service portal on an OpenStack + KVM private cloud',
      tiers: [
        { label: 'Self-service', nodes: [{ label: 'Dashboard + API', sub: 'React · self-service portal' }] },
        { label: 'Application', nodes: [{ label: 'Backend services', sub: 'Python · Go · billing · auth' }] },
        {
          label: 'OpenStack APIs',
          nodes: [{ label: 'Compute' }, { label: 'Network' }, { label: 'Identity' }, { label: 'Storage' }],
        },
        { label: 'Infrastructure', nodes: [{ label: 'KVM hypervisors', sub: 'Ansible-provisioned hosts' }] },
      ],
    },
    paragraphs: [
      "Cloud.mn is Mongolia's first public cloud service, enabling users to register and create virtual machines, disks, networks, and other resources on demand — essentially a smaller-scale AWS for Mongolia.",
      'The goal was to establish a public cloud where none existed before. Our company built the first solution, and I was involved from day one — contributing across frontend, backend, DevOps, and integrations, then leading a team of 10+ engineers to scale it.',
      "The platform grew to serve 300+ of Mongolia's top companies, with Ansible-driven host provisioning replacing the manual build steps behind every new customer environment.",
    ],
    highlights: [
      'Self-service portal for provisioning virtual machines, storage disks, and private networks.',
      'Built-in billing, user management, and resource monitoring.',
      'API and dashboard for automation and integration.',
      'Production infrastructure on OpenStack, KVM, and Ansible.',
      'Contributed across the stack: frontend (React), backend (Python, Go), DevOps (OpenStack, KVM, Ansible), and integrations (payment, SMS, monitoring).',
    ],
    stack: 'OpenStack, Kubernetes, Docker, Ansible, Nginx, MariaDB, Redis, RabbitMQ, Python, Go, React, TypeScript',
    links: [{ label: 'cloud.mn', href: 'https://cloud.mn' }],
    gallery: [
      { src: '/works/cloudmn-live.webp', alt: 'Cloud.mn — the public site and enterprise customers' },
      { src: '/works/cloudmn.png', alt: 'Cloud.mn network management' },
      { src: '/works/cloudmn-2.png', alt: 'Cloud.mn billing' },
    ],
  },
  {
    id: 'ttc',
    hero: {
      kind: 'split',
      panes: [
        { src: '/works/live/cloudmn.webp', alt: 'Cloud.mn', url: 'cloud.mn', caption: 'Mongolia — the original' },
        { src: '/works/live/ttc.webp', alt: 'TTC Cloud', url: 'cloud.ttc.kz', caption: 'Kazakhstan — the export' },
      ],
    },
    size: 'half',
    layout: 'regions',
    regions: [
      {
        name: 'Cloud.mn — Mongolia',
        sub: 'The original platform',
        items: ['OpenStack + KVM private cloud', 'Self-service VMs, storage, networking', '300+ enterprise clients'],
      },
      {
        name: 'TTC Cloud — Kazakhstan',
        sub: 'Same platform, new market',
        items: [
          'Deployed on Transtelecom, the country’s largest datacenter',
          'Local payment gateways and financial systems',
          'Kazakh + Russian localization',
          'Regional data-residency compliance',
          'Broader service suite than the Mongolian cloud',
        ],
      },
    ],
    title: 'TTC Cloud',
    role: 'System Architect',
    period: '2022–2024',
    launched: '2021',
    thumbnail: { src: '/works/live/ttc.webp', alt: 'TTC Cloud — Transtelecom public cloud' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'Enterprise Cloud',
    },
    summary: 'Public cloud platform for Kazakhstan’s largest data center, Transtelecom — built for enterprise scale and regional compliance.',
    metrics: [
      { value: 'Transtelecom', label: 'Kazakhstan’s largest DC' },
      { value: '35%', label: 'faster time-to-market' },
      { value: '20+', label: 'engineers led' },
    ],
    paragraphs: [
      'TTC Cloud is the public cloud platform of Kazakhstan’s largest data center, Transtelecom (TTC). I led the team that built and operated it, delivering a broad suite of cloud services for businesses and developers across Kazakhstan.',
      'Unlike Mongolia’s cloud, TTC Cloud was designed to support a wider range of services and integrate deeply with local payment gateways and financial systems. My work spanned platform architecture, DevOps, and integration with the region’s unique infrastructure and compliance requirements.',
      'Through infrastructure automation and process improvements, we accelerated time-to-market for new services by 35% while serving a diverse set of enterprise clients with scalable compute, storage, and networking.',
    ],
    highlights: [
      'Launched for Transtelecom, including local payment integration and regional compliance.',
      'Self-service portal for provisioning virtual machines, block storage, and private networks.',
      'Advanced monitoring, user management, and automated billing.',
      'Localized for Kazakh and Russian users, compliant with regional data regulations.',
      'Led a 20+ person team of engineers, architects, and PMs; built a developer skills framework that raised recruitment efficiency 30%.',
    ],
    stack: 'OpenStack, Kubernetes, Docker, Nginx, MariaDB, Redis, RabbitMQ, Python, Go, React, TypeScript, Local Payment APIs',
    links: [
      { label: 'cloud.ttc.kz', href: 'https://cloud.ttc.kz/' },
      { label: 'ttc.kz', href: 'https://ttc.kz' },
    ],
    gallery: [
      { src: '/works/ttc-live.webp', alt: 'TTC Cloud — the Kazakh public cloud storefront' },
      { src: '/works/ttc.png', alt: 'TTC Cloud dashboard' },
      { src: '/works/ttc-1.jpeg', alt: 'TTC Cloud' },
      { src: '/works/ttc-2.jpeg', alt: 'TTC Cloud' },
      { src: '/works/ttc-3.jpeg', alt: 'TTC Cloud' },
    ],
  },
  {
    id: 'ufe_aws',
    hero: {
      kind: 'numeral',
      value: '10',
      unit: 'days',
      note: 'On-premises to AWS, zero downtime, mid-lockdown.',
      url: 'ufe.edu.mn',
    },
    size: 'half',
    layout: 'migration',
    cloud: {
      caption: 'Three-tier AWS deployment across two Availability Zones',
      edge: [
        { label: 'Route 53', sub: 'DNS + health checks' },
        { label: 'CloudFront', sub: 'CDN — edge caching' },
      ],
      aside: { label: 'S3', sub: 'static assets · versioned' },
      vpc: {
        label: 'VPC',
        zones: ['Availability Zone A', 'Availability Zone B'],
        rows: [
          {
            subnet: 'Public subnet',
            kind: 'public',
            nodes: [{ label: 'Elastic Load Balancer', sub: 'TLS termination · health checks' }],
          },
          {
            subnet: 'Private subnet — application',
            kind: 'private',
            perZone: true,
            group: 'EC2 Auto Scaling group',
            nodes: [{ label: 'EC2 — Nginx + PHP', sub: 'EBS volumes' }],
          },
          {
            subnet: 'Private subnet — cache',
            kind: 'private',
            nodes: [{ label: 'ElastiCache — Redis', sub: 'session + query cache' }],
          },
          {
            subnet: 'Private subnet — data',
            kind: 'private',
            perZone: true,
            replicated: 'synchronous replication',
            nodes: [{ label: 'RDS MySQL', sub: 'Multi-AZ' }],
          },
        ],
      },
      ops: [
        {
          label: 'Observability & security — across every tier',
          nodes: [
            { label: 'CloudWatch', sub: 'metrics · traffic patterns' },
            { label: 'CloudTrail', sub: 'audit log · MFA on all accounts' },
            { label: 'Inspector', sub: 'EC2 vulnerability scanning' },
          ],
        },
      ],
      dr: {
        label: 'Backup & disaster recovery',
        items: [
          'Automated RDS snapshots with point-in-time restore',
          'Standby promoted automatically on primary failure',
          'Versioned S3 copies of course content',
          'Documented restore runbook, rehearsed with UFE staff',
        ],
      },
    },
    beforeAfter: {
      before: {
        label: 'Before — on-premises',
        items: [
          'Two servers in a local university data center',
          'Overloaded past ~400 concurrent students — the whole LMS went offline',
          'Unreliable power; manual restart after every outage',
          'Nationwide lockdown closed every campus within a week',
        ],
      },
      after: {
        label: 'After — AWS, 10 days later',
        items: [
          'CloudFront, EC2 with EBS, and RDS for MySQL',
          'EC2 Auto Scaling absorbs exam-period peaks automatically',
          'Database in a private subnet; Inspector, CloudTrail and MFA across accounts',
          '99.99% service availability; 90% of students online daily',
        ],
      },
    },
    title: 'UFE Online Learning on AWS',
    role: 'AWS Migration Lead',
    period: '2020',
    thumbnail: { src: '/works/live/ufe.webp', alt: 'UFE — online learning platform' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'Cloud Migration',
    },
    summary:
      'Migrated one of Mongolia’s oldest universities to AWS in 10 days during the COVID-19 lockdown — delivered with Fibo Cloud as UFE’s AWS Partner, and published as an official AWS case study.',
    metrics: [
      { value: '10 days', label: 'full migration' },
      { value: '99.99%', label: 'service availability' },
      { value: '90%', label: 'of students online daily' },
    ],
    architecture: {
      caption: 'AWS high-availability architecture, migrated in 10 days',
      tiers: [
        { nodes: [{ label: 'Route 53', sub: 'DNS' }] },
        {
          nodes: [
            { label: 'CloudFront', sub: 'CDN' },
            { label: 'S3', sub: 'static assets' },
          ],
        },
        { nodes: [{ label: 'Elastic Load Balancer', sub: 'traffic distribution' }] },
        { nodes: [{ label: 'Auto Scaling — EC2', sub: 'web / app tier' }] },
        { nodes: [{ label: 'RDS', sub: 'MySQL database' }] },
      ],
    },
    paragraphs: [
      'The University of Finance and Economics, founded in 1924, is one of Mongolia’s oldest institutions — over 6,000 students and more than 300 employees, running some online courses on on-premises technology since 2015.',
      'That setup was two servers in a local data center. Past roughly 400 concurrent students the whole learning management system went offline, and an unreliable power supply meant someone had to restart the server manually after every outage.',
      'In late January 2020 the government announced a nationwide lockdown. Every educational institution closed within the space of a week and overseas students were recalled home. UFE decided to move its entire learning management system to AWS.',
      'Fibo Cloud was UFE’s AWS Partner for the migration. University IT engineers and IT professors worked alongside our team through the winter break — content migration alone took three days, and the full cutover landed in 10 days, ahead of the new semester. Procuring on-premises servers would have taken around 48 days.',
      'After the migration 80% of the university’s workloads ran on AWS. In October 2020 the Ministry of Education invited UFE — one of five universities — to present its digital transformation.',
    ],
    highlights: [
      'Delivered in 10 days, in time for the new semester — bypassing a server procurement cycle that would have taken around 48 days.',
      'Content migration completed in three days, with UFE IT staff and professors working alongside the Fibo Cloud team.',
      'Amazon CloudFront for content distribution, EC2 with EBS for the application tier, and Amazon RDS for MySQL.',
      'EC2 Auto Scaling absorbs exam-time peaks on its own, removing the need for manual intervention.',
      'Database isolated in a private subnet, reachable only from the application tier.',
      'Amazon Inspector for EC2 vulnerability visibility; AWS CloudTrail action logs with multi-factor authentication enforced across all accounts.',
      'Amazon CloudWatch gives departments traffic and usage data on when students are online and how they learn.',
      'Published as an official AWS case study; UFE presented the transformation to Mongolia’s Ministry of Education in October 2020.',
    ],
    stack: 'AWS (EC2, S3, CloudFront, RDS, ELB, Auto Scaling, Route 53), CloudWatch, Nginx, Redis, MySQL, PHP',
    links: [
      {
        label: 'AWS Case Study',
      cta: 'Read the AWS case study',
        href: 'https://web.archive.org/web/20210116032223/https://aws.amazon.com/solutions/case-studies/ufe-mongolia-case-study/',
      },
      { label: 'UFE Reference', href: 'https://www.ufe.edu.mn/widgetDetail/295' },
    ],
    gallery: [{ src: '/works/ufe.jpg', alt: 'UFE Online Learning Dashboard' }],
  },
  {
    id: 'mobilife_aws',
    hero: { kind: 'browser', url: 'mobilife.mn' },
    size: 'third',
    layout: 'flow',
    cloud: {
      caption: 'Multi-AZ EC2 platform behind a load balancer, with the runbook that operates it',
      edge: [
        { label: 'Route 53', sub: 'DNS + health checks' },
        { label: 'CloudFront', sub: 'CDN — edge caching' },
      ],
      aside: { label: 'S3 + ACM', sub: 'assets · TLS certificates' },
      vpc: {
        label: 'VPC',
        zones: ['Availability Zone A', 'Availability Zone B'],
        rows: [
          {
            subnet: 'Public subnet',
            kind: 'public',
            nodes: [{ label: 'Application Load Balancer', sub: 'TLS termination · target group routing' }],
          },
          {
            subnet: 'Private subnet — application',
            kind: 'private',
            perZone: true,
            group: 'Auto Scaling group — CPU target tracking',
            nodes: [{ label: 'EC2 — Docker', sub: 'Launch Template bootstrap' }],
          },
          {
            subnet: 'Private subnet — cache',
            kind: 'private',
            nodes: [{ label: 'Redis', sub: 'in-memory cache — cuts RDS load' }],
          },
          {
            subnet: 'Private subnet — data',
            kind: 'private',
            perZone: true,
            replicated: 'synchronous replication',
            nodes: [{ label: 'RDS — MySQL', sub: 'Multi-AZ' }],
          },
        ],
      },
      ops: [
        {
          label: 'Monitoring & alerting',
          nodes: [
            { label: 'Prometheus', sub: 'metrics collection' },
            { label: 'Grafana', sub: 'dashboards' },
            { label: 'Node Exporter', sub: 'host metrics' },
            { label: 'Blackbox Exporter', sub: 'endpoint probes' },
            { label: 'CloudWatch', sub: 'ASG lifecycle · RDS CPU' },
            { label: 'SNS', sub: 'alert delivery' },
          ],
        },
        {
          label: 'Config, secrets & delivery',
          nodes: [
            { label: 'ECR', sub: 'versioned container images' },
            { label: 'Secrets Manager', sub: 'runtime secrets' },
            { label: 'SSM', sub: 'parameters · secure access' },
          ],
        },
      ],
      dr: {
        label: 'Recovery & rollback',
        items: [
          'RDS standby promoted automatically when the primary fails',
          'Versioned images in ECR — roll back by redeploying the previous tag',
          'Launch Templates rebuild any instance from scratch, repeatably',
          'ASG health checks replace failed instances without intervention',
          'Route 53 and Blackbox probes catch degradation before users do',
          'Documented deployment, troubleshooting and rollback runbook',
        ],
      },
    },
    title: 'Mobilife AWS High-Availability Architecture',
    role: 'Cloud Architect',
    period: '2025–2026',
    status: 'Active',
    launched: '2025',
    thumbnail: { src: '/works/live/mobilife.webp', alt: 'Mobilife — production platform on AWS' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'AWS Operations',
    },
    summary: 'Designed a production-grade AWS architecture and operational runbook for Mobilife — scalable, observable, and safe to deploy.',
    metrics: [
      { value: '30%', label: 'lower change failure rate' },
      { value: 'Multi-AZ', label: 'high availability' },
      { value: 'Zero-downtime', label: 'rollouts' },
    ],
    architecture: {
      caption: 'Route 53 → CloudFront → ALB → Auto Scaling → EC2',
      tiers: [
        { nodes: [{ label: 'Route 53', sub: 'DNS + health checks' }] },
        { nodes: [{ label: 'CloudFront', sub: 'CDN / edge caching' }] },
        { nodes: [{ label: 'Application Load Balancer', sub: 'TLS termination + routing' }] },
        { nodes: [{ label: 'Auto Scaling Group', sub: 'CPU target tracking' }] },
        { nodes: [{ label: 'EC2', sub: 'Launch Template · Docker' }] },
        {
          label: 'Backing services',
          nodes: [
            { label: 'ECR', sub: 'container images' },
            { label: 'Redis', sub: 'in-memory cache' },
            { label: 'RDS — MySQL', sub: 'Multi-AZ' },
            { label: 'SSM', sub: 'params + secure access' },
          ],
        },
      ],
    },
    paragraphs: [
      'This work formalized a new AWS EC2-based production architecture for Mobilife and turned it into a practical handover document that infrastructure and operations teams can run with confidence.',
      'The setup uses Route 53, ACM, an Application Load Balancer, Target Groups, an Auto Scaling Group, and EC2 Launch Templates — replacing a fragile single-instance model with a scalable, high-availability deployment pattern.',
      'The runbook emphasizes professional operating practice: cache-aware design, right-sizing to reduce cost, secure secret delivery, repeatable Docker deployments, health checks, rollback procedures, and layered monitoring across infrastructure and application.',
    ],
    highlights: [
      'Route 53 → ALB → Target Group → Auto Scaling Group → EC2 architecture with TLS termination and API health checks.',
      'Launch Template bootstrap: Docker startup, ECR login, Secrets Manager loading, container replacement, repeatable provisioning.',
      'Caching strategy to cut database load, improve response times, and support efficient scaling under peak traffic.',
      'Cost optimization via Auto Scaling, instance right-sizing, and reducing idle capacity.',
      'Observability with Prometheus, Grafana, and Node Exporter; production health checks via Route 53 + Blackbox Exporter.',
      'CloudWatch + SNS alerting for ASG lifecycle events, service degradation, and RDS CPU thresholds.',
      'Documented deployment, troubleshooting, and rollback steps — reducing change failure rate by 30%.',
    ],
    stack:
      'AWS Route 53, ACM, ALB, EC2, Auto Scaling, Launch Templates, ECR, SSM, Secrets Manager, Docker, Prometheus, Grafana, Node Exporter, Blackbox Exporter, CloudWatch, SNS, RDS, S3',
    links: [{ label: 'mobilife.mn', href: 'https://mobilife.mn' }],
  },
  {
    id: 'easysim',
    hero: { kind: 'browser', url: 'easysim.mn' },
    size: 'third',
    layout: 'pipeline',
    pipeline: [
      { label: 'Purchase', sub: 'super app checkout' },
      { label: 'Payment', sub: 'gateway settlement' },
      { label: 'Supplier API', sub: 'catalog + order' },
      { label: 'QR generation', sub: 'automated delivery' },
      { label: 'Activation', sub: 'instant, no physical SIM' },
      { label: 'Usage dashboard', sub: 'manage + track' },
    ],
    title: 'EasySim.mn',
    role: 'Platform Engineer',
    period: '2025–2026',
    status: 'Active',
    launched: '2025',
    thumbnail: { src: '/works/live/easysim.webp', alt: 'EasySim.mn — international eSIM store' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'eSIM Platform',
    },
    summary: 'International eSIM service for travelers — instant data in 100+ countries, distributed through a Mongolian super app.',
    metrics: [
      { value: '100+', label: 'countries covered' },
      { value: 'Instant', label: 'eSIM activation' },
      { value: 'Super app', label: 'distribution' },
    ],
    paragraphs: [
      'EasySim Data Provider LLC is a technology company offering international eSIM services tailored for travelers.',
      'The core project was a digital platform that lets users instantly purchase and activate eSIM data packages — no physical SIM card required.',
      'Launched inside a popular Mongolian super app, the platform makes mobile internet more convenient, affordable, and accessible wherever travelers land.',
      'Customer support runs itself. An OpenAI-backed agent answers on social channels with retrieval over the product knowledge base and custom tools that can act on a real order — so the common questions resolve end to end without a human in the loop.',
    ],
    highlights: [
      'Seamless eSIM purchase and instant activation, with no physical SIM required.',
      'Integrated into a major Mongolian super app for maximum reach.',
      'Roaming data packages priced per destination, activated without a physical SIM.',
      'Automated QR code generation and delivery for eSIM installation.',
      'Secure payment integration and real-time order processing.',
      'User-friendly dashboard for managing eSIMs and tracking usage.',
      'Fully automated AI support on social channels, built on OpenAI with retrieval-augmented generation over the product knowledge base.',
      'Custom tools give the agent real capability — it can look things up and act on an order rather than only answering from text.',
    ],
    stack:
      'Docker, Nginx, PostgreSQL, Redis, Golang, React, TypeScript, REST API, OpenAI API, RAG, Function calling, Super App SDK',
    links: [{ label: 'easysim.mn', href: 'https://easysim.mn' }],
    gallery: [
      { src: '/works/easysim-live.webp', alt: 'EasySim.mn — data plans priced per destination country' },
      { src: '/works/easysim.png', alt: 'EasySim dashboard' },
      { src: '/works/easysim-1.png', alt: 'EasySim dashboard' },
    ],
  },
  {
    id: 'medtech',
    hero: { kind: 'browser', url: 'mrp.mn' },
    size: 'third',
    layout: 'topology',
    topology: {
      clients: [
        { label: 'Customer site', sub: 'mrp.mn' },
        { label: 'Admin Portal', sub: 'admin.mrp.mn' },
        { label: 'Supplier Portal', sub: 'supplier.mrp.mn' },
      ],
      core: { label: 'Go microservices', sub: 'REST API · Docker · Kubernetes' },
      services: ['Orders + real-time tracking', 'Products + catalog', 'Suppliers + marketing', 'Notifications', 'License Management API'],
    },
    title: 'MedOrder — MedTech Partner',
    role: 'Lead Engineer',
    period: '2021–2025',
    thumbnail: { src: '/works/live/medtech.webp', alt: 'MedOrder — pharmaceutical wholesale platform' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'Healthcare SaaS',
    },
    summary: 'A pharmaceutical SaaS ecosystem — customer, admin, and supplier portals with real-time order tracking on a microservices backend.',
    metrics: [
      { value: '45,952', label: 'orders processed' },
      { value: '1,305', label: 'pharmacies served' },
      { value: 'Microservices', label: 'architecture' },
    ],
    paragraphs: [
      'At MedTech Partner LLC, I built solutions for the pharmaceutical industry — enhancing medical supply management and streamlining operations to improve efficiency and sales.',
      'The platform now carries 8,501 medicines and medical supplies and has processed 45,952 orders for 1,305 pharmacies — figures the site publishes on its own home page.',
      'The MedOrder ecosystem consists of three web platforms: the customer-facing site, an Admin Portal, and a Supplier Portal, processing 40,000+ pharmaceutical orders with real-time tracking and License Management API compliance.',
    ],
    highlights: [
      'Admin Portal: manage suppliers, products, and marketing across the ecosystem.',
      'Supplier Portal: suppliers manage products, orders, and marketing in a dedicated portal.',
      'Real-time order tracking with updates and notifications.',
      'Scalable microservice architecture for modular scaling, rapid deployment, and fault tolerance.',
      'Connected to a License Management API for regulatory compliance.',
    ],
    stack: 'Kubernetes, Docker, PostgreSQL, Redis, Golang, Microservices, REST API, React, TypeScript, License Management API',
    links: [
      { label: 'mrp.mn', href: 'https://mrp.mn' },
      { label: 'admin.mrp.mn', href: 'https://admin.mrp.mn' },
      { label: 'supplier.mrp.mn', href: 'https://supplier.mrp.mn' },
    ],
    gallery: [
      { src: '/works/medtech-live.webp', alt: 'MedOrder — catalogue search across 8,501 medicines and supplies' },
      { src: '/works/medtech.png', alt: 'MedTech Partner LLC Dashboard' },
    ],
  },
  {
    id: 'itrip',
    hero: { kind: 'browser', url: 'itrip.mn' },
    size: 'feature',
    layout: 'hub',
    hub: {
      center: 'iTrip booking core',
      centerSub: 'Go · .NET microservices on AWS + Kubernetes',
      groups: [
        {
          label: 'Flights',
          spokes: [
            { label: 'Amadeus', sub: 'GDS' },
            { label: 'Route24', sub: 'GDS' },
          ],
        },
        {
          label: 'Hotels',
          spokes: [
            { label: 'Trip.com', sub: 'inventory' },
            { label: 'Ihotel.mn', sub: 'availability' },
          ],
        },
        {
          label: 'Tours',
          spokes: [{ label: 'Viator', sub: 'tours + attractions' }],
        },
        {
          label: 'Payments',
          spokes: [
            { label: 'Banks', sub: 'card gateways' },
            { label: 'Smart wallets', sub: 'digital' },
          ],
        },
      ],
      outputs: [
        { label: 'One search', sub: 'across every supplier' },
        { label: 'One checkout', sub: 'cards + smart wallets' },
        { label: 'One itinerary', sub: 'flights · hotels · tours' },
      ],
    },
    title: 'iTrip Travel Platform',
    role: 'Backend Architect',
    period: '2023',
    status: 'Live',
    thumbnail: { src: '/works/live/itrip.webp', alt: 'iTrip — all-in-one travel platform' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'Travel Platform',
    },
    summary: 'Mongolia’s all-in-one travel platform — flights, hotels, and tours in one place, powered by 8+ integrated third-party APIs.',
    metrics: [
      { value: '8+', label: 'integrated APIs' },
      { value: 'AWS + K8s', label: 'infrastructure' },
      { value: 'All-in-one', label: 'flights · hotels · tours' },
    ],
    paragraphs: [
      'iTrip is a comprehensive online travel platform, developed and launched in close collaboration with designers, engineers, and business stakeholders.',
      'Before iTrip, market services were fragmented and disconnected, making travel planning inconvenient. We built a unified solution to improve customer service efficiency and business profitability.',
      'With a customer-centric approach, iTrip was designed as a one-stop solution for hotel bookings, flight reservations, and tour packages.',
      'Customers can now browse and book travel services through a single platform — no more juggling multiple apps or websites — saving time and effort.',
    ],
    highlights: [
      'Microservices architecture for scalability and maintainability.',
      'Cloud, containers, and Kubernetes for reliable deployments.',
      'Airline GDS API connections (Amadeus, Route24) for real-time flight data.',
      'Travel API integration (Viator) for tours and attractions.',
      'Hotel API connections (Trip.com, Ihotel.mn) for availability and inventory.',
      'Online payment integration via banking systems and smart wallets.',
      'Unit and integration testing for stability.',
    ],
    stack:
      'AWS, Kubernetes, Docker, Nginx, RabbitMQ, MySQL, Redis, Golang, .NET, Microservices, React, Supplier APIs (Amadeus, Route24, Viator, Trip.com, Ihotel.mn), Payment Gateways',
    links: [{ label: 'itrip.mn', href: 'https://itrip.mn/' }],
    gallery: [
      { src: '/works/itrip-live.webp', alt: 'iTrip — unified search across flights, hotels and tours' },
      { src: '/works/itrip.png', alt: 'iTrip dashboard' },
      { src: '/works/itrip-2.png', alt: 'iTrip dashboard' },
    ],
  },
  {
    id: 'streamkeep',
    hero: { kind: 'browser', url: 'streamkeep.live' },
    size: 'half',
    layout: 'topology',
    archify: {
      src: '/diagrams/streamkeep.html',
      title: 'Archive and playback architecture',
      caption: 'Interactive — pan, trace a path, switch theme, or open the guided views',
      heightClass: 'h-[760px] lg:h-[660px]',
    },
    title: 'StreamKeep',
    role: 'Sole Engineer',
    period: '2026',
    status: 'Beta',
    launched: '2026',
    thumbnail: { src: '/works/live/streamkeep.webp', alt: 'StreamKeep — Kick VOD archive and live multiview' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'Streaming Infrastructure',
    },
    summary:
      'Kick deletes every broadcast 30 days after it airs — not even the streamer can get it back. StreamKeep archives the nights that matter and serves them from object storage.',
    metrics: [
      { value: '140', label: 'Mongolian channels tracked' },
      { value: '201.3K', label: 'hours watched' },
      { value: '246K', label: 'chat lines captured' },
    ],
    metricsNote: 'Live counters from streamkeep.live. The recorder samples Kick\u2019s Mongolian directory every minute; hours watched and viewer peaks count only sampled time.',
    paragraphs: [
      'StreamKeep is a livestream archive for the Mongolian community on Kick. Kick removes a broadcast 30 days after it airs, and the streamer who made it has no way to recover the file. StreamKeep lets a creator sign in with their own Kick account, select the broadcasts worth preserving, and keep the original video at source quality together with a synchronised chat replay. Playback is public and requires no account.',
      'It is a personal project, designed and built end to end, and running in production under my own operation. The engineering goals were reliability, predictable cost, and an operational surface small enough for one engineer to own. What follows is the architecture, the decisions behind it, and the trade-offs I accepted.',
    ],
    sections: [
      {
        heading: '1. Project overview',
        paragraphs: [
          'Livestreaming platforms treat past broadcasts as cache, not as archive. Kick applies a fixed 30-day retention window: after it closes the video object is deleted and cannot be restored on request. For a creator this means the work disappears on a schedule they do not control, and any moment they did not clip at the time is unrecoverable.',
          'StreamKeep addresses this narrowly and deliberately. It does not mirror an entire platform. It gives a creator a way to mark specific broadcasts for preservation before the retention window closes, stores the original rendition rather than a re-encode, and preserves the chat transcript alongside the video so the recording keeps its context.',
        ],
        list: [
          'Scope — a personal project, built end to end: product, backend, infrastructure, deployment and on-call.',
          'Current state — open beta. 32 broadcasts preserved across 8 channels, 158 hours of video retained.',
          'Design priorities — reliability first, then cost predictability, then capacity. Capacity last, because the workload does not yet justify paying for elasticity.',
        ],
      },
      {
        heading: '2. Problem and motivation',
        paragraphs: [
          'Before building anything I measured the scale of the problem. A recorder samples Kick’s Mongolian live directory once a minute and records viewership, airtime and chat volume per channel. Over a three-day window it produced the figures below, all of which sit inside the same 30-day deletion window.',
        ],
        embed: 'metrics',
        outro: [
          'That measurement framed four engineering constraints, and those constraints drove every decision that follows.',
        ],
        groups: [
          {
            label: 'Storage efficiency',
            paragraphs: [
              'Broadcasts are multi-hour source-quality video. Retaining them on compute-attached disk would mean growing the instance for storage rather than for load, and paying for provisioned capacity whether or not it is used. Storage had to be billed by consumption and decoupled from the application host.',
            ],
          },
          {
            label: 'Delivery must not touch the application',
            paragraphs: [
              'If video is streamed through the API, every concurrent viewer consumes an application connection and host bandwidth. A single popular archive would then degrade sign-in, browsing and job submission for everyone. Read traffic had to be served by infrastructure that scales independently of the API.',
            ],
          },
          {
            label: 'Long-running work cannot run in a request',
            paragraphs: [
              'Fetching and storing a multi-hour broadcast takes far longer than any acceptable HTTP timeout, and it is subject to upstream failures outside my control. This work had to be asynchronous, durable across restarts, and safely retryable.',
            ],
          },
          {
            label: 'Cost has to stay predictable',
            paragraphs: [
              'The project is funded by its users on hours-based plans. A cost model that grows with viewership rather than with stored hours would break that relationship, so the unit customers pay for and the unit I am billed for had to match.',
            ],
          },
        ],
      },
      {
        heading: '3. High-level architecture',
        paragraphs: [
          'The system separates three paths that have very different characteristics: a synchronous request path, an asynchronous archive path, and a delivery path that bypasses the application entirely. The diagram below traces all three and can be panned and stepped through.',
        ],
        embed: 'archify',
        groups: [
          {
            label: 'Component responsibilities',
            list: [
              'Next.js frontend — the three public surfaces: stream library, live multiview and channel statistics. Bilingual, with the language cookie read server-side so the first paint already matches the reader.',
              'Go API — authentication through Kick OAuth 2.0 with PKCE, authorisation, archive submission, and the live recorder that polls the public directory every 60 seconds. It serves metadata only; no video passes through it.',
              'PostgreSQL — the system of record: archives and their state, chat transcripts, channel statistics, and the migration ledger. Job status and failure reasons live here, which makes a broken archive a row I can query rather than a log line I have to find.',
              'Redis — the job broker and coordination layer, running Asynq. It holds queued and in-flight tasks, live per-archive progress snapshots, and rate-limiting counters.',
              'Archive worker — a separate process that consumes the queue and performs the long-running work: fetching the source rendition with yt-dlp and ffmpeg, writing it to object storage, and capturing the chat transcript.',
              'Cloudflare R2 — object storage for the original video files. Chosen for consumption-based pricing and, critically, zero egress charges.',
              'Cloudflare CDN — delivery on a dedicated domain, in front of R2. Viewers stream HLS from here; the API is never in the path of a byte of video.',
            ],
          },
        ],
      },
      {
        heading: '4. Technology stack',
        table: {
          head: ['Layer', 'Technology', 'Why'],
          rows: [
            ['Frontend', 'Next.js, TypeScript', 'Server rendering for first-paint correctness on a bilingual UI'],
            ['Backend', 'Go', 'One static binary per service; low memory footprint on a small VM'],
            ['Database', 'PostgreSQL 16', 'Transactional job state, relational statistics, versioned migrations'],
            ['Queue & cache', 'Redis 7, Asynq', 'Durable background jobs, retry semantics, live progress snapshots'],
            ['Object storage', 'Cloudflare R2', 'Consumption-based pricing with no egress fees'],
            ['Delivery', 'Cloudflare CDN, HLS, hls.js', 'Video served at the edge, independent of the application'],
            ['Media pipeline', 'yt-dlp, ffmpeg', 'Source-quality fetch with no transcode step'],
            ['Runtime', 'Docker Compose, Linux, Oracle Cloud', 'One host, one declarative file, no control plane to operate'],
            ['CI/CD', 'GitLab CI, self-hosted runner', 'Build, migrate and health-gate a release from a single pipeline'],
          ],
        },
        outro: [
          'Every choice here optimises for a single operator. Go and Compose keep the number of moving parts low; R2 and the CDN move the expensive, high-volume work onto managed infrastructure that needs no attention from me.',
        ],
      },
      {
        heading: '5. Production deployment',
        paragraphs: [
          'Production is five containers on one Linux VM, declared in a single Compose file and rolled out by the pipeline. Each service has a health check and a restart policy; container logs are capped so a runaway process cannot fill the disk.',
        ],
        list: [
          'Frontend — the Next.js application.',
          'Go API — REST surface plus the live directory recorder.',
          'Archive worker — the Asynq consumer that performs archive jobs.',
          'PostgreSQL — persistent state, on a named volume.',
          'Redis — the job broker and progress cache.',
        ],
        groups: [
          {
            label: 'Why this shape',
            paragraphs: [
              'An orchestrated cluster was the obvious alternative and I decided against it. At this workload it would add a control plane to patch, upgrade and debug, and it would buy elasticity the traffic does not need. The relevant question was not which architecture is most scalable, but which one a single engineer can operate correctly at 3am.',
            ],
            list: [
              'Operational simplicity — one host to patch, one file to read, no scheduler to reason about during an incident.',
              'Cost — a small VM plus consumption-priced storage, with no per-cluster or per-node overhead.',
              'Maintainability — the whole runtime is described in one Compose file that is versioned with the application.',
              'Sufficient capacity — the API is metadata-only and video is served by the CDN, so the host is not on the critical path for the traffic that actually scales.',
            ],
          },
          {
            label: 'The trade-off I accepted',
            paragraphs: [
              'One host and one database mean a host failure is downtime, not a failover, and a schema migration briefly pauses the worker. Both are acceptable at this stage and both are stated plainly rather than engineered around prematurely. The migration path out is described in section 11.',
            ],
          },
        ],
      },
      {
        heading: '6. Engineering decisions and trade-offs',
        paragraphs: [
          'Most production incidents I have seen come from the deployment, not from the code being deployed. The pipeline is therefore built to fail loudly and early rather than to deploy quickly.',
        ],
        groups: [
          {
            label: 'Deployment safety',
            paragraphs: [
              'The pipeline runs only on the default branch, on a self-hosted runner on the production host. A resource group and a file lock together make it impossible for two deployments to overlap, and the job is marked non-interruptible so a newer pipeline cannot terminate a release mid-rollout.',
            ],
            list: [
              'Backup first — every deployment takes a compressed pg_dump before it touches any running container.',
              'Validate the backup — the dump is checked for content and the deployment aborts if it comes back empty. An unverified backup is not a backup.',
              'Store it out of reach — dumps are written outside the CI checkout so the next pipeline’s clean checkout cannot delete them.',
              'Record the release — the commit and pipeline identity tag the images, and the last successful release is recorded on the host.',
            ],
          },
          {
            label: 'Migration safety',
            paragraphs: [
              'Schema migrations are embedded in the API binary, applied in filename order, and tracked in a migrations table so each runs exactly once. Sixteen have been applied so far.',
              'The ordering of the rollout is the important part. The old worker is stopped before the new API starts, so no process is executing against the old schema while a migration is in flight. Only once the API has started and migrated do the worker and frontend come up. This removes the class of race where a worker writes a row shaped for a schema that no longer exists.',
            ],
          },
          {
            label: 'Health checks',
            paragraphs: [
              'A release passes three independent gates, in order, and failing any one of them fails the pipeline:',
            ],
            list: [
              'Container health — the orchestrator waits on each service’s own health check with a bounded timeout before proceeding.',
              'Internal readiness — the API is probed on its readiness endpoint from inside the network, which confirms it reached a serving state rather than merely starting.',
              'External verification — the public API health URL and the site itself must both return HTTP 200 over the real network path, through DNS, TLS and the reverse proxy.',
            ],
          },
          {
            label: 'Background processing',
            paragraphs: [
              'Archive jobs run in a separate process from the API for two reasons: their duration has no relationship to a request lifecycle, and their failure modes are dominated by an upstream I do not control. Isolating them means a stalled download cannot consume an API worker or affect page latency.',
            ],
            list: [
              'Durable queue — jobs are held in Redis through Asynq, so a worker restart does not lose queued work.',
              'State in Postgres — every archive carries a status and an attempt counter in the database, incremented atomically. Redis holds the transient progress snapshot; the durable truth is relational.',
              'Retry without duplication — the task identifier is scoped by attempt number, so a retry is never mistaken for a duplicate of the original request, and a re-queued job cannot create a second copy of the same object.',
              'Independent sub-jobs — chat sync, metadata enrichment and storyboard generation are queued separately from the video fetch, each with its own claim guarded by attempt number, so partial failure degrades one asset instead of the whole archive.',
              'Upstream backoff — chat pagination applies exponential backoff when the platform throttles, rather than discarding pages already fetched.',
            ],
          },
        ],
      },
      {
        heading: '7. Video storage and delivery',
        paragraphs: [
          'This is the decision with the largest effect on both reliability and cost, and it is worth stating explicitly because it is easy to get wrong.',
        ],
        groups: [
          {
            label: 'The pattern being avoided',
            paragraphs: [
              'The naive design routes playback through the application: viewer to API server to storage. It is simple to implement and it fails badly. Every concurrent viewer holds an application connection for the duration of a multi-hour video, host bandwidth becomes the ceiling on audience size, and one popular archive degrades sign-in and job submission for every other user. The blast radius of a traffic spike is the entire product.',
            ],
          },
          {
            label: 'The pattern used',
            paragraphs: [
              'Playback goes viewer to CDN to object storage, on a dedicated domain. The API issues metadata and never touches a byte of video. HLS segments are requested directly from the edge by the player.',
            ],
            list: [
              'Application load is bounded — API concurrency tracks metadata requests, not viewer-hours.',
              'Bandwidth cost is bounded — R2 charges no egress, so a broadcast watched a thousand times costs the same to serve as one watched once.',
              'Delivery scales independently — audience growth is absorbed by the CDN, with no change to the host.',
              'Failure is isolated — a delivery problem does not take down archiving, and an application deploy does not interrupt playback.',
            ],
          },
          {
            label: 'One necessary exception',
            paragraphs: [
              'For live multiview, the master playlist is proxied, because that single file is the one whose CORS policy is restricted to the platform’s own origins. Variant playlists and video segments still stream directly from the upstream CDN. The proxy is scoped to the smallest object that requires it rather than to the whole stream.',
            ],
          },
        ],
      },
      {
        heading: '8. Cost optimisation',
        paragraphs: [
          'The cost model was designed alongside the architecture rather than reviewed after it. The requirement was that the unit a customer buys and the unit I am billed for should be the same unit, so that revenue and cost move together.',
        ],
        groups: [
          {
            label: 'Why object storage rather than instance disk',
            paragraphs: [
              'Block storage attached to a VM is provisioned and billed whether or not it is used, and growing it means resizing a host that is not otherwise under pressure. Object storage is billed by what is actually stored, needs no capacity planning, and separates the storage lifecycle from the compute lifecycle: I can rebuild the host without touching a single archived file.',
            ],
          },
          {
            label: 'Why a CDN, and why this one',
            paragraphs: [
              'Serving video from the origin makes bandwidth the dominant and least predictable line item, because it scales with popularity rather than with the catalogue. R2 charges no egress, so the marginal cost of an additional viewer is effectively zero and the bill is a function of hours retained.',
              'That is what makes hours-based pricing honest: customers pay for retained video, which is exactly the axis on which my cost grows. Viewership, the axis I cannot predict, does not appear on either side.',
            ],
          },
          {
            label: 'Why not scale the compute tier instead',
            paragraphs: [
              'Serving video from compute couples an unbounded, bursty workload to the tier that also handles authentication and job submission. It would require over-provisioning for peak, paying for that headroom continuously, and accepting that a traffic spike degrades the product rather than merely costing more. Moving the volume to managed infrastructure removed the need to buy elasticity at all.',
            ],
          },
        ],
        outro: [
          'The result is infrastructure that scales without unnecessary cost: one small VM plus storage billed by the gigabyte, with the high-volume path handled by services that need no capacity planning from me.',
        ],
      },
      {
        heading: '9. Monitoring and operations',
        paragraphs: [
          'Observability here is sized to the system: enough signal for one operator to detect a failure and identify its cause, without a monitoring stack that would itself need operating. I am describing what is actually in place, and naming what is not.',
        ],
        list: [
          'Application health — each service exposes a health check that the runtime evaluates continuously and the deployment pipeline gates on. The API separates liveness from readiness so a starting process is not mistaken for a serving one.',
          'Container supervision — services carry restart policies, so a crashed process is restarted without intervention while the underlying failure remains visible.',
          'Job-level visibility — every archive job records its status, attempt count and failure reason in PostgreSQL. A broken archive is a row I can query and re-queue, not a log line I have to search for.',
          'Logs — container logs use size-capped rotation, which bounds disk usage and prevents a chatty failure loop from filling the host.',
          'Database — Postgres runs its own readiness probe, and every deployment produces a verified dump, which doubles as a recurring integrity check on the data.',
          'Delivery — CDN-side analytics cover request volume and cache behaviour for the one layer I do not operate myself.',
        ],
        outro: [
          'What is deliberately absent: there is no metrics time series, no dashboard and no alerting pipeline on this project. At one host and one operator, health checks plus queryable job state answer the questions I actually ask. That is a considered trade-off rather than an oversight, and it is the first thing I would change if the system grew past a single node.',
        ],
      },
      {
        heading: '10. Challenges and lessons learned',
        groups: [
          {
            label: 'Large media is a storage problem, not an application problem',
            paragraphs: [
              'The instinct is to treat video as data the application owns. Treating it as an object the application only references, and keeping it entirely off the request path, removed the majority of the scaling and cost questions before they became problems.',
            ],
          },
          {
            label: 'Reliable workers need durable state, not just a queue',
            paragraphs: [
              'A queue alone does not survive contact with retries. Keeping the authoritative status and attempt count in the database, scoping task identity by attempt, and guarding each sub-job with its own claim is what makes a re-queued job safe instead of merely possible.',
            ],
          },
          {
            label: 'Most incidents come from the deploy',
            paragraphs: [
              'Adding a verified backup, a strict rollout order and three independent health gates cost an afternoon and removed the failure mode I was most likely to cause myself. The gates that matter are the ones that check the real network path, not just the process.',
            ],
          },
          {
            label: 'Simplicity is a capacity decision, not a shortcut',
            paragraphs: [
              'Choosing Compose over an orchestrator was a judgement about what one engineer can operate, not an admission of missing skill. The corresponding obligation is to know exactly which signal would invalidate that choice, and to have the migration path ready before it does.',
            ],
          },
          {
            label: 'Design the cost model with the architecture',
            paragraphs: [
              'Selecting storage with no egress charge was an architectural decision as much as a financial one. It is what allows viewing to be free and unauthenticated without the economics inverting as the audience grows.',
            ],
          },
        ],
      },
      {
        heading: '11. Future improvements',
        paragraphs: [
          'These are ordered by the signal that would trigger them, not by preference. Each has a concrete threshold.',
        ],
        ordered: true,
        list: [
          'Horizontal worker scaling — the queue already supports multiple consumers; the change is running more of them once archive latency, not download bandwidth, becomes the bottleneck.',
          'Orchestrated deployment — moving to Kubernetes once the system needs more than one node, which would also convert the current downtime-on-host-failure into a genuine failover.',
          'Event-driven processing — replacing the remaining synchronous fan-out with published events, so new consumers can be added without changing the producer.',
          'Advanced observability — metrics collection, dashboards and alert routing, which becomes necessary the moment there is more than one instance of anything to compare.',
          'Multi-region storage — replicating objects across regions for durability and for reader latency outside the current audience.',
          'AI-assisted highlight detection — using chat velocity and viewer deltas already recorded to propose candidate moments, so a creator is offered clips rather than having to find them.',
        ],
      },
      {
        heading: '12. Final reflection',
        quote:
          'This project represents my engineering approach: build simple systems, automate reliability, optimise cost, and design infrastructure that can evolve with future scale.',
        paragraphs: [
          'StreamKeep is deliberately not the most sophisticated architecture I could have built. It is the one I could build correctly, deploy safely, operate alone, and explain honestly, including its limits. Every decision above has a stated reason and a stated cost, and each is reversible along a path I have already thought through.',
        ],
      },
    ],
    stack:
      'Oracle Cloud, Docker Compose, GitLab CI, Cloudflare R2, Cloudflare CDN, PostgreSQL, Redis, Go, Next.js, TypeScript, HLS (hls.js), ffmpeg, yt-dlp, OAuth 2.0 (PKCE), Pusher, QPay',
    links: [{ label: 'streamkeep.live', href: 'https://streamkeep.live' }],
    gallery: [
      { src: '/works/streamkeep-multiview.webp', alt: 'StreamKeep — live multiview of Mongolian Kick channels' },
      { src: '/works/streamkeep-channels.webp', alt: 'StreamKeep — channel rankings built from minute-by-minute sampling' },
      { src: '/works/streamkeep-about.webp', alt: 'StreamKeep — published archive and measurement counters' },
    ],
  },
  {
    id: 'duutaa',
    hero: { kind: 'browser', url: 'duutaa.online' },
    size: 'half',
    layout: 'pipeline',
    archify: {
      src: '/diagrams/duutaa.html',
      title: 'System architecture',
      caption: 'Interactive — pan, trace a path, switch theme, or open the guided views',
      heightClass: 'h-[770px] lg:h-[740px]',
    },
    title: 'Duutaa',
    role: 'Sole Engineer',
    period: '2026',
    status: 'Live',
    launched: '2026',
    thumbnail: { src: '/works/duutaa-home.png', alt: 'Duutaa — a round in play: the waveform, the clip-length ladder and the round filters' },
    theme: {
      accent: 'text-zinc-900 dark:text-zinc-100',
      accentMuted: 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      accentBar: 'bg-zinc-200 dark:bg-zinc-800',
      label: 'Music Game',
    },
    summary:
      'A song-guessing game for Mongolian music. It plays 0.1 seconds of a track and asks you to name it — every miss buys you more of the song and less of the score.',
    metrics: [
      { value: '3,322', label: 'Mongolian songs' },
      { value: '0.1s', label: 'shortest clip' },
      { value: '116', label: 'artists' },
    ],
    paragraphs: [
      'Дуутаа is a guessing game built entirely around Mongolian music. It plays a tenth of a second of a song — one transient, barely a sound — and asks for the title. Miss and it gives you half a second, then two, then eight, then fifteen. Guess early and you keep the points.',
      'The catalogue runs to 3,322 songs by 116 artists, spanning 2005 to today. The five difficulty tiers are relative rather than absolute: every song is scored on artist familiarity, Apple Music’s own ranking, its place on the daily Apple Music Mongolia chart and how recently it came out, and the catalogue is then cut into five slices — from the standards everyone knows up to one called simply Impossible. Before a round starts you can narrow it by era, by genre, or down to a handful of specific artists.',
      'There is a party mode as well. The host sets the round up — how many songs, how long each one runs, which tier, era, genre and artists are in play — then shares a four-letter code. Everyone hears the same songs in the same order, and the scoreboard ranks players by who named each track earliest rather than by who simply got it.',
      'The catalogue is its own piece of engineering: every entry is cross-checked against the iTunes Search API so artist and title metadata stays honest as it grows, and the site publishes the date it was last refreshed. Search matches Cyrillic and Latin spellings of the same title, and tapping any cover plays that track’s full 30-second preview — so the catalogue doubles as a way to browse Mongolian music you have not heard. The audio never touches my server either; clips stream straight from Apple’s preview CDN to the player’s browser.',
      'It ships as a single Docker container behind a health-gated pipeline, sharing a VM with my other services, and reads in English or Mongolian from a toggle in the header. Progress, streaks and settings live in the browser, so there is nothing to sign up for, and the running costs are covered by a QPay donation page rather than a paywall.',
    ],
    highlights: [
      'Progressive reveal — 0.1s → 0.5s → 2s → 8s → 15s, with the score falling at every step.',
      'Difficulty is computed, not hand-assigned — artist familiarity, Apple Music ranking, the daily Apple Music Mongolia chart and release recency, cut into five tiers.',
      'Catalogue search matches both Cyrillic and Latin spellings of the same title.',
      'Rounds filterable by era (2000s / 2010s / 2020s), genre, or hand-picked artists.',
      'Multiplayer rooms: four-letter code, identical song order, shared scoreboard.',
      'Streak, win rate and score distribution tracked per player in the browser — no account to play.',
      'Catalogue audited against the iTunes Search API so artist and title metadata stays clean.',
      'Clips stream straight from Apple’s preview CDN — no audio is hosted or proxied.',
      'Bilingual interface (English / Mongolian) over an all-Mongolian catalogue.',
      'Host-configurable rooms: song count, clip length per song, tier, era, genre and artist selection.',
      'Single Docker container on a health-gated deploy, running alongside my other services on one VM.',
      'Running costs covered by a QPay donation page — no paywall on any part of the game.',
    ],
    stack: 'Docker, GitHub Actions, Node 24, Next.js, React, TypeScript, Web Audio API, iTunes Search API, GA4',
    links: [{ label: 'duutaa.online', href: 'https://duutaa.online' }],
    gallery: [
      { src: '/works/duutaa-guess.png', alt: 'Duutaa — a solved round: cover art, artist, year and a link to the full track on Apple Music' },
      { src: '/works/duutaa-catalogy.png', alt: 'Duutaa — the catalogue: 3,322 songs, five tiers and a release-year histogram' },
      { src: '/works/duutaa-room.png', alt: 'Duutaa — creating a private room: song count, clip length, tier, era, genre and artists' },
    ],
  },
];

export function getWorkById(id: string) {
  return works.find((w) => w.id === id);
}
