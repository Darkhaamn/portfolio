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
};

export const works: Work[] = [
  {
    id: 'cloudmn',
    title: 'Cloud.mn',
    role: 'Founding Engineer → Team Lead',
    period: '2019–2025',
    status: 'Completed',
    launched: '2019',
    featured: true,
    thumbnail: { src: '/works/cloudmn.png', alt: 'Cloud.mn dashboard' },
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
        { nodes: [{ label: 'Dashboard + API', sub: 'React · self-service portal' }] },
        { nodes: [{ label: 'Backend services', sub: 'Python · Go · billing · auth' }] },
        {
          label: 'OpenStack APIs',
          nodes: [
            { label: 'Compute' },
            { label: 'Network' },
            { label: 'Identity' },
            { label: 'Storage' },
          ],
        },
        { nodes: [{ label: 'KVM hypervisors', sub: 'Ansible-provisioned hosts' }] },
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
    title: 'TTC Cloud',
    role: 'CTO → Platform Lead',
    period: '2022–2025',
    status: 'Completed',
    launched: '2021',
    thumbnail: { src: '/works/ttc.png', alt: 'TTC Cloud dashboard' },
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
    title: 'UFE Online Learning on AWS',
    role: 'AWS Migration Lead',
    period: '2020',
    status: 'Completed',
    thumbnail: { src: '/works/ufe.jpg', alt: 'UFE Online Learning Dashboard' },
    theme: {
      accent: 'text-orange-500',
      accentMuted: 'bg-orange-500/10 border-orange-500/20',
      accentBar: 'bg-orange-500',
      label: 'AWS Migration',
    },
    summary: 'Migrated one of Mongolia’s largest universities to AWS in 10 days during COVID-19 — zero downtime, and an official AWS case study.',
    metrics: [
      { value: '10 days', label: 'full migration' },
      { value: 'Zero', label: 'downtime' },
      { value: 'AWS', label: 'official case study' },
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
      'In early 2020, Mongolia announced a nationwide lockdown, closing all educational institutions within a week. The University of Finance and Economics (UFE) faced the urgent challenge of keeping education running for thousands of students.',
      'UFE made the critical decision to migrate its entire online learning management system to AWS, ensuring accessibility and reliability for thousands of students and staff.',
      'The migration was completed in just 10 days through close collaboration between UFE and AWS engineers — a rapid, seamless transition accomplished with zero downtime, later featured as an official AWS case study.',
    ],
    highlights: [
      'Migrated the learning management system to AWS with zero downtime, using EC2, S3, CloudFront, RDS, ELB, Auto Scaling, and Route 53.',
      'Delivered a reliable, accessible online learning system with uninterrupted access to resources.',
      'Built a streamlined data backup and recovery process for secure storage and fast retrieval.',
      'Trained UFE staff and instructors on AWS basics and the new learning system.',
      'Featured as an official AWS case study.',
    ],
    stack: 'AWS (EC2, S3, CloudFront, RDS, ELB, Auto Scaling, Route 53), Nginx, PHP, MySQL, Redis, CloudWatch',
    links: [
      {
        label: 'AWS Case Study',
        href: 'https://aws.amazon.com/solutions/case-studies/ufe-mongolia-case-study/',
      },
      { label: 'UFE Reference', href: 'https://www.ufe.edu.mn/widgetDetail/295' },
    ],
    gallery: [{ src: '/works/ufe.jpg', alt: 'UFE Online Learning Dashboard' }],
  },
  {
    id: 'mobilife_aws',
    title: 'Mobilife AWS High-Availability Architecture',
    role: 'Senior DevOps / Cloud Engineer',
    period: '2025–2026',
    status: 'Active',
    launched: '2025',
    thumbnail: {
      src: '/works/mobilife.png',
      alt: 'Mobilife AWS architecture overview',
    },
    theme: {
      accent: 'text-emerald-500',
      accentMuted: 'bg-emerald-500/10 border-emerald-500/20',
      accentBar: 'bg-emerald-500',
      label: 'AWS Operations',
    },
    summary:
      'Designed a production-grade AWS architecture and operational runbook for Mobilife — scalable, observable, and safe to deploy.',
    metrics: [
      { value: '30%', label: 'fewer deploy incidents' },
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
      'Documented deployment, troubleshooting, and rollback steps — reducing deployment incidents by 30%.',
    ],
    stack:
      'AWS Route 53, ACM, ALB, EC2, Auto Scaling, Launch Templates, ECR, SSM, Secrets Manager, Docker, Prometheus, Grafana, Node Exporter, Blackbox Exporter, CloudWatch, SNS, RDS, S3',
    links: [{ label: 'mobilife.mn', href: 'https://mobilife.mn' }],
  },
  {
    id: 'easysim',
    title: 'EasySim.mn',
    role: 'Platform Engineer',
    period: '2025–Present',
    status: 'Active',
    launched: '2025',
    thumbnail: { src: '/works/easysim.png', alt: 'EasySim dashboard' },
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
    ],
    highlights: [
      'Seamless eSIM purchase and instant activation, with no physical SIM required.',
      'Integrated into a major Mongolian super app for maximum reach.',
      'Coverage in 100+ countries with affordable roaming data packages.',
      'Automated QR code generation and delivery for eSIM installation.',
      'Secure payment integration and real-time order processing.',
      'User-friendly dashboard for managing eSIMs and tracking usage.',
    ],
    stack: 'React, TypeScript, Golang, PostgreSQL, REST API, QR Code Automation, Payment Gateway Integration, Super App SDK',
    links: [{ label: 'easysim.mn', href: 'https://easysim.mn' }],
    gallery: [
      { src: '/works/easysim.png', alt: 'EasySim dashboard' },
      { src: '/works/easysim-1.png', alt: 'EasySim dashboard' },
    ],
  },
  {
    id: 'medtech',
    title: 'MedOrder — MedTech Partner',
    role: 'Lead Engineer',
    period: '2021–2025',
    status: 'Completed',
    thumbnail: { src: '/works/medtech.png', alt: 'MedTech Partner LLC Dashboard' },
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
    title: 'iTrip Travel Platform',
    role: 'Backend Architect',
    period: '2023',
    status: 'Launched & Ongoing',
    thumbnail: { src: '/works/itrip.png', alt: 'iTrip dashboard' },
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
