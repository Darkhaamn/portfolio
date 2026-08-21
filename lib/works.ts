export type WorkId = 'cloudmn' | 'ttc' | 'ufe_aws' | 'mobilife_aws' | 'easysim' | 'medtech' | 'itrip';

export type WorkLink = {
  label: string;
  href: string;
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

/** Each project gets a signature layout matching the shape of its engineering story. */
export type WorkLayout =
  | 'stack'      // layered platform (Cloud.mn)
  | 'regions'    // same platform, second country (TTC)
  | 'migration'  // before -> after under time pressure (UFE)
  | 'flow'       // request path through an HA topology (Mobilife)
  | 'pipeline'   // linear automated fulfilment (EasySim)
  | 'topology'   // many clients over shared services (MedOrder)
  | 'hub';       // one core, many integrations (iTrip)

export type WorkNode = { label: string; sub?: string };

/** How the detail page opens. */
export type WorkHero =
  | { kind: 'browser'; url: string; tabs?: string[] }
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
  architecture?: WorkArchitecture;
  paragraphs: string[];
  highlights?: string[];
  stack?: string;
  links?: WorkLink[];
  gallery?: { src: string; alt: string }[];
  theme: WorkTheme;
  hero?: WorkHero;
  /** Tile weight on the /works index — drives the editorial rhythm. */
  size?: 'feature' | 'half' | 'third';
  layout?: WorkLayout;
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
    role: 'Frontend Engineer → CTO',
    period: '2019–2024',
    status: 'Completed',
    launched: '2019',
    featured: true,
    thumbnail: { src: '/works/live/cloudmn.webp', alt: 'Cloud.mn — self-service public cloud portal' },
    theme: {
      accent: 'text-sky-500',
      accentMuted: 'bg-sky-500/10 border-sky-500/20',
      accentBar: 'bg-sky-500',
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
          nodes: [
            { label: 'Compute' },
            { label: 'Network' },
            { label: 'Identity' },
            { label: 'Storage' },
          ],
        },
        { label: 'Infrastructure', nodes: [{ label: 'KVM hypervisors', sub: 'Ansible-provisioned hosts' }] },
      ],
    },
    paragraphs: [
      "Cloud.mn is Mongolia's first public cloud service, enabling users to register and create virtual machines, disks, networks, and other resources on demand — essentially a smaller-scale AWS for Mongolia.",
      'The goal was to establish a public cloud where none existed before. Our company built the first solution, and I was involved from day one — contributing across frontend, backend, DevOps, and integrations, then leading a team of 10+ engineers to scale it.',
      "The platform grew to serve 300+ of Mongolia's top companies, maintaining 99.95% uptime and cutting manual provisioning time by 90% through infrastructure automation.",
    ],
    highlights: [
      'Self-service portal for provisioning virtual machines, storage disks, and private networks.',
      'Built-in billing, user management, and resource monitoring.',
      'API and dashboard for automation and integration.',
      'Production infrastructure on OpenStack, KVM, and Ansible at 99.95% uptime.',
      'Contributed across the stack: frontend (React), backend (Python, Go), DevOps (OpenStack, KVM, Ansible), and integrations (payment, SMS, monitoring).',
    ],
    stack: 'React, TypeScript, Python, Go, OpenStack, Docker, Kubernetes, MariaDB, Redis, RabbitMQ, Nginx, Ansible',
    links: [{ label: 'cloud.mn', href: 'https://cloud.mn' }],
    gallery: [
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
        items: [
          'OpenStack + KVM private cloud',
          'Self-service VMs, storage, networking',
          '300+ enterprise clients',
        ],
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
    role: 'CTO',
    period: '2022–2024',
    status: 'Completed',
    launched: '2021',
    thumbnail: { src: '/works/live/ttc.webp', alt: 'TTC Cloud — Transtelecom public cloud' },
    theme: {
      accent: 'text-amber-500',
      accentMuted: 'bg-amber-500/10 border-amber-500/20',
      accentBar: 'bg-amber-500',
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
    stack: 'React, TypeScript, Python, Go, OpenStack, Docker, Kubernetes, MariaDB, Redis, RabbitMQ, Nginx, Local Payment APIs',
    links: [
      { label: 'cloud.ttc.kz', href: 'https://cloud.ttc.kz/' },
      { label: 'ttc.kz', href: 'https://ttc.kz' },
    ],
    gallery: [
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
    status: 'Completed',
    thumbnail: { src: '/works/live/ufe.webp', alt: 'UFE — online learning platform' },
    theme: {
      accent: 'text-orange-500',
      accentMuted: 'bg-orange-500/10 border-orange-500/20',
      accentBar: 'bg-orange-500',
      label: 'AWS Migration',
    },
    summary: 'Migrated one of Mongolia’s oldest universities to AWS in 10 days during the COVID-19 lockdown — delivered with Fibo Cloud as UFE’s AWS Partner, and published as an official AWS case study.',
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
      'After the migration 90% of students used the online services daily and 80% of the university’s workloads ran on AWS, at 99.99% service availability. In October 2020 the Ministry of Education invited UFE — one of five universities — to present its digital transformation.',
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
    stack: 'AWS (EC2, S3, CloudFront, RDS, ELB, Auto Scaling, Route 53), Nginx, PHP, MySQL, Redis, CloudWatch',
    links: [
      {
        label: 'AWS Case Study',
        href: 'https://web.archive.org/web/20210116032223/https://aws.amazon.com/solutions/case-studies/ufe-mongolia-case-study/',
      },
      { label: 'UFE Reference', href: 'https://www.ufe.edu.mn/widgetDetail/295' },
    ],
    gallery: [{ src: '/works/ufe.jpg', alt: 'UFE Online Learning Dashboard' }],
  },
  {
    id: 'mobilife_aws',
    hero: { kind: 'none' },
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
      accent: 'text-emerald-500',
      accentMuted: 'bg-emerald-500/10 border-emerald-500/20',
      accentBar: 'bg-emerald-500',
      label: 'AWS Operations',
    },
    summary:
      'Designed a production-grade AWS architecture and operational runbook for Mobilife — scalable, observable, and safe to deploy.',
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
    role: 'Founder & Platform Engineer',
    period: '2025–2026',
    status: 'Active',
    launched: '2025',
    thumbnail: { src: '/works/live/easysim.webp', alt: 'EasySim.mn — international eSIM store' },
    theme: {
      accent: 'text-teal-500',
      accentMuted: 'bg-teal-500/10 border-teal-500/20',
      accentBar: 'bg-teal-500',
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
      'Launched inside a popular Mongolian super app, the platform makes mobile internet more convenient, affordable, and accessible across 100+ countries.',
      'Customer support runs itself. An OpenAI-backed agent answers on social channels with retrieval over the product knowledge base and custom tools that can act on a real order — so the common questions resolve end to end without a human in the loop.',
    ],
    highlights: [
      'Seamless eSIM purchase and instant activation, with no physical SIM required.',
      'Integrated into a major Mongolian super app for maximum reach.',
      'Coverage in 100+ countries with affordable roaming data packages.',
      'Automated QR code generation and delivery for eSIM installation.',
      'Secure payment integration and real-time order processing.',
      'User-friendly dashboard for managing eSIMs and tracking usage.',
      'Fully automated AI support on social channels, built on OpenAI with retrieval-augmented generation over the product knowledge base.',
      'Custom tools give the agent real capability — it can look things up and act on an order rather than only answering from text.',
    ],
    stack: 'React, TypeScript, Golang, PostgreSQL, Redis, Docker, Nginx, REST API, OpenAI API, RAG, Function calling, QR Code Automation, Payment Gateway Integration, Super App SDK',
    links: [{ label: 'easysim.mn', href: 'https://easysim.mn' }],
    gallery: [
      { src: '/works/easysim.png', alt: 'EasySim dashboard' },
      { src: '/works/easysim-1.png', alt: 'EasySim dashboard' },
    ],
  },
  {
    id: 'medtech',
    hero: { kind: 'browser', url: 'mrp.mn', tabs: ['mrp.mn', 'admin.mrp.mn', 'supplier.mrp.mn'] },
    size: 'third',
    layout: 'topology',
    topology: {
      clients: [
        { label: 'Customer site', sub: 'mrp.mn' },
        { label: 'Admin Portal', sub: 'admin.mrp.mn' },
        { label: 'Supplier Portal', sub: 'supplier.mrp.mn' },
      ],
      core: { label: 'Go microservices', sub: 'REST API · Docker · Kubernetes' },
      services: [
        'Orders + real-time tracking',
        'Products + catalog',
        'Suppliers + marketing',
        'Notifications',
        'License Management API',
      ],
    },
    title: 'MedOrder — MedTech Partner',
    role: 'Lead Engineer',
    period: '2021–2025',
    status: 'Completed',
    thumbnail: { src: '/works/live/medtech.webp', alt: 'MedOrder — pharmaceutical wholesale platform' },
    theme: {
      accent: 'text-blue-500',
      accentMuted: 'bg-blue-500/10 border-blue-500/20',
      accentBar: 'bg-blue-500',
      label: 'Healthcare SaaS',
    },
    summary: 'A pharmaceutical SaaS ecosystem — customer, admin, and supplier portals with real-time order tracking on a microservices backend.',
    metrics: [
      { value: '40,000+', label: 'orders processed' },
      { value: '3', label: 'connected portals' },
      { value: 'Microservices', label: 'architecture' },
    ],
    paragraphs: [
      'At MedTech Partner LLC, I built solutions for the pharmaceutical industry — enhancing medical supply management and streamlining operations to improve efficiency and sales.',
      'The MedOrder ecosystem consists of three web platforms: the customer-facing site, an Admin Portal, and a Supplier Portal, processing 40,000+ pharmaceutical orders with real-time tracking and License Management API compliance.',
    ],
    highlights: [
      'Admin Portal: manage suppliers, products, and marketing across the ecosystem.',
      'Supplier Portal: suppliers manage products, orders, and marketing in a dedicated portal.',
      'Real-time order tracking with updates and notifications.',
      'Scalable microservice architecture for modular scaling, rapid deployment, and fault tolerance.',
      'Connected to a License Management API for regulatory compliance.',
      '40,000+ orders processed through the system.',
    ],
    stack: 'React, TypeScript, Golang, PostgreSQL, Redis, Docker, Kubernetes, Microservices, REST API, License Management API',
    links: [
      { label: 'mrp.mn', href: 'https://mrp.mn' },
      { label: 'admin.mrp.mn', href: 'https://admin.mrp.mn' },
      { label: 'supplier.mrp.mn', href: 'https://supplier.mrp.mn' },
    ],
    gallery: [{ src: '/works/medtech.png', alt: 'MedTech Partner LLC Dashboard' }],
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
    status: 'Launched & Ongoing',
    thumbnail: { src: '/works/live/itrip.webp', alt: 'iTrip — all-in-one travel platform' },
    theme: {
      accent: 'text-violet-500',
      accentMuted: 'bg-violet-500/10 border-violet-500/20',
      accentBar: 'bg-violet-500',
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
      'React, Golang, .NET, Microservices, AWS, Docker, Kubernetes, Nginx, MySQL, Redis, Amadeus API, Route24 API, Viator API, Trip.com API, Ihotel.mn API, Payment Gateways, RabbitMQ',
    links: [{ label: 'itrip.mn', href: 'https://itrip.mn/' }],
    gallery: [
      { src: '/works/itrip.png', alt: 'iTrip dashboard' },
      { src: '/works/itrip-2.png', alt: 'iTrip dashboard' },
    ],
  },
];

export function getWorkById(id: string) {
  return works.find((w) => w.id === id);
}
