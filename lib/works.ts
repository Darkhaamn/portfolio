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
export type WorkSection = {
  heading: string;
  /** A short pull-quote shown before the paragraphs. */
  quote?: string;
  paragraphs?: string[];
  /** Rendered as a numbered list when `ordered`, otherwise bulleted. */
  list?: string[];
  ordered?: boolean;
  /** Pull one of the page blocks inline, after this section's text. */
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
      { value: '116', label: 'Mongolian channels tracked' },
      { value: '71.6K', label: 'hours watched' },
      { value: '154.5K', label: 'chat lines captured' },
    ],
    metricsNote: 'Public counters from streamkeep.live, first weeks of open beta.',
    paragraphs: [
      'Kick is a live-streaming platform in the same market as Twitch, and Mongolia has an active scene on it — more than a hundred channels. Nothing that scene broadcasts survives past a month: Kick\u2019s retention window is the entire archive, and the streamers have no say in it.',
      'StreamKeep is a selective archive for that scene. A streamer signs in with their own Kick account, picks the broadcasts worth keeping, and StreamKeep stores the original video together with the chat that ran alongside it — then serves it back to anyone, with no account required. I designed and built it alone, and I am the one who runs it in production.',
    ],
    sections: [
      {
        heading: 'What gets lost in 30 days',
        quote: 'The scene had 116 channels and no way to keep a single night.',
        paragraphs: [
          'Kick\u2019s 30-day retention means the moments that matter to a streamer and their community — a first big raid, a tournament win, a night the chat will not stop talking about — are deleted on a schedule. There is no export, no \u201ckeep this one\u201d button, and no way to ask for a file after the window closes. For a growing scene with no local tooling, the history of Mongolian streaming was simply disappearing month by month.',
        ],
      },
      {
        heading: 'Three surfaces, one dataset',
        paragraphs: [
          'StreamKeep does not try to hoard everything a channel has ever broadcast. It lets the streamer keep the handful of nights that mattered, at source quality, with the chat replay intact, and makes them watchable years from now. Three public surfaces grew out of the same data:',
        ],
        list: [
          'Stream library — every archived broadcast, public and free to watch, with chat replaying in sync and a one-click MP4 export.',
          'Live multiview — every Mongolian Kick channel currently on air, several playable side by side with a shared chat panel.',
          'Channel stats — hours watched, peak and average viewers, follower and subscriber curves, category share and a weekly schedule heatmap. Kick publishes none of this.',
        ],
      },
      {
        heading: 'How a broadcast gets archived',
        paragraphs: [
          'One Go binary serves both the REST API and the live recorder that samples Kick every minute; a second process, the archive worker, runs the downloads. Go for one static binary and one runtime to deploy, watch and restart instead of two — the deciding factor when the on-call rotation is one person. Video never passes through the API: originals live in Cloudflare R2 and are served from a dedicated CDN domain, so the server only ever handles metadata, auth and the job queue.',
          'The three surfaces are bilingual, English and Mongolian, with the language cookie read on the server so the first paint already matches the reader\u2019s choice. For live multiview only Kick\u2019s CORS-restricted master playlist is proxied — variant playlists and segments stream straight from Kick\u2019s CDN. The numbered steps below are the archive path; the interactive diagram traces both it and playback.',
        ],
        ordered: true,
        list: [
          'The streamer signs in through Kick OAuth (PKCE) and sees only broadcasts they own.',
          'They select a broadcast — nothing is archived automatically.',
          'The worker pulls the VOD at source quality with yt-dlp and ffmpeg — no transcode, no re-encode, no quality loss, and no lower-bitrate rendition either.',
          'The original file is written to R2; playback is HLS through hls.js straight from the CDN.',
          'Chat captured during the broadcast is stored with it and replayed in sync with the video.',
          'MP4 export is assembled in the browser from the HLS segments, so the server never re-muxes a file and export capacity scales with the viewer\u2019s device, not my one VM.',
        ],
        embed: 'archify',
      },
      {
        heading: 'Running it in production',
        paragraphs: [
          'Five containers on one VM: Postgres, Redis, the API, the worker and the web front end. That ceiling is deliberate — the operational surface is sized so a single engineer can deploy it, tell when it broke, and repair it without a platform team behind him. What follows is what the pipeline actually does on every push to the default branch.',
        ],
        list: [
          'Deploys — GitLab CI on a self-hosted runner on the production host. A resource group plus a file lock means two deployments can never overlap, and the job is marked non-interruptible so a newer pipeline cannot kill a release mid-rollout.',
          'Release safety — every deploy takes a compressed pg_dump before it touches a running container, writes it outside the CI checkout so the next checkout cannot delete it, and aborts if the dump comes back empty. A rollback has a database to roll back to, not just an older image.',
          'Ordered rollout — all three images build before anything is replaced. Postgres and Redis come up first, then the old worker is stopped so it cannot race the migration, then the API starts and applies its 16 embedded SQL migrations, then worker and web follow.',
          'Health gates — three of them, in order: Compose waits on each container\u2019s health check with a timeout, then the API is probed on its internal readiness endpoint, then the public API health URL and the site itself must both answer 200. Any one failing fails the pipeline, so a broken release is never reported green.',
          'Observability — every job\u2019s status and failure reason is a row in Postgres, so a broken archive is something I query rather than a log line I hunt for. Container health checks cover the services, log rotation is capped per container so a runaway process cannot fill the disk, and Cloudflare analytics cover delivery — the one layer I do not run myself.',
          'Secrets — injected as a protected CI file variable, written with a restrictive umask and removed in the job\u2019s cleanup step, so credentials never reach the repository or survive the build.',
          'Known limits — one VM and one database mean a host failure is downtime, not a failover, and Kick sits upstream of everything: when their API or CDN is unavailable, archiving stops until it returns. Both are accepted at this scale rather than overlooked.',
          'Cost — the bill is one small VM plus R2 storage by the gigabyte, and R2 charges no egress, so a broadcast watched a thousand times costs the same to serve as one watched once. That is why plans are sold in hours of retained video: the unit the streamer buys is the unit I pay for.',
        ],
      },
      {
        heading: 'Who can archive what',
        paragraphs: [
          'Ownership is enforced rather than assumed. Every archive request is recorded with the account that made it, but that record grants no write access: only the broadcast\u2019s owner can create, retry or enrich an archive. Viewing is public by design — the streamer pays for storage, so there is no viewer paywall and no advertising.',
        ],
      },
      {
        heading: 'What it has archived so far',
        paragraphs: [
          'StreamKeep is in open beta at streamkeep.live. Streamers have archived 28 broadcasts from 8 channels so far, kept at source quality with the chat replay intact. Measurement runs wider than the archive — the live recorder samples every Mongolian channel on Kick, whether anyone has archived that channel or not, which is why the counters at the top of this page are so much larger than the archive itself.',
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
