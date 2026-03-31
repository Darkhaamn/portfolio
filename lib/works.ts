export type WorkId = 'cloudmn' | 'ttc' | 'ufe_aws' | 'mobilife_aws' | 'easysim' | 'medtech' | 'itrip';

export type WorkLink = {
  label: string;
  href: string;
};

export type Work = {
  id: WorkId;
  title: string;
  period?: string;
  status?: string;
  launched?: string;
  logo?: { src: string; alt: string };
  logoDark?: { src: string; alt: string };
  thumbnail: { src: string; alt: string };
  summary: string;
  paragraphs: string[];
  highlights?: string[];
  stack?: string;
  links?: WorkLink[];
  gallery?: { src: string; alt: string }[];
};

export const works: Work[] = [
  {
    id: 'cloudmn',
    title: 'Cloud.mn',
    period: '2019–2025',
    status: 'Completed',
    launched: '2019',
    logo: { src: '/works/cloudmn.svg', alt: 'Cloud.mn logo' },
    thumbnail: { src: '/works/svg/cloudmn.svg', alt: 'Cloud.mn dashboard' },
    summary: "Mongolia's first public cloud platform, allowing users to create and manage virtual machines, storage, and networks.",
    paragraphs: [
      "Cloud.mn is Mongolia's first public cloud service, enabling users to register and create virtual machines, disks, networks, and other resources as needed—essentially a smaller-scale AWS for Mongolia.",
      'The project’s goal was to establish a public cloud service in Mongolia, where none existed previously. Our company developed the first solution, and I was directly involved from the start, contributing to the frontend, backend, DevOps, and integrations.',
      "We already include Mongolia's top +3000 companies among our customers, demonstrating the platform's reliability and trust within the local business community.",
    ],
    highlights: [
      'Users can provision and manage virtual machines, storage disks, and private networks via a self-service portal.',
      'Built-in billing, user management, and resource monitoring.',
      'API and dashboard for automation and integration.',
      'Localized for Mongolian users and infrastructure.',
      'I contributed across the stack: frontend (React), backend (Python, Go), DevOps (KVM, OpenStack, Ansible), and integrations (payment, SMS, monitoring).',
    ],
    stack: 'React, TypeScript, Python, Go, OpenStack, Docker, Kubernetes, MariaDB, Redis, RabbitMQ, Nginx, AWS',
    links: [{ label: 'cloud.mn', href: 'https://cloud.mn' }],
    gallery: [
      { src: '/works/cloudmn.png', alt: 'Cloud.mn network management' },
      { src: '/works/cloudmn-2.png', alt: 'Cloud.mn billing' },
    ],
  },
  {
    id: 'ttc',
    title: 'TTC Cloud',
    period: '2022–2025',
    status: 'Completed',
    launched: '2021',
    logo: { src: '/works/ttc.svg', alt: 'TTC Cloud logo' },
    thumbnail: { src: '/works/svg/ttc.svg', alt: 'TTC Cloud dashboard' },
    summary: 'Kazakhstan’s leading public cloud platform for enterprises.',
    paragraphs: [
      'TTC Cloud is the public cloud platform of Kazakhstan’s largest data center, Transtelecom (TTC). I contributed to the development of this platform, which offers a broad suite of cloud services for businesses and developers across Kazakhstan.',
      'Unlike Mongolia’s cloud, TTC Cloud was designed to support a wider range of services and integrate deeply with local payment gateways and financial systems. My work spanned frontend, backend, DevOps, and integration with Kazakhstan’s unique infrastructure and compliance requirements.',
      'The platform serves a diverse set of enterprise clients, providing scalable compute, storage, and networking, as well as advanced features tailored for the Kazakhstani market.',
    ],
    highlights: [
      'Self-service portal for provisioning and managing virtual machines, block storage, and private networks.',
      'Integration with local payment systems and financial reporting tools.',
      'Advanced monitoring, user management, and automated billing.',
      'API and dashboard for automation, orchestration, and third-party integrations.',
      'Localized for Kazakh and Russian users, with compliance to regional data regulations.',
      'My contributions included frontend (React), backend (Python, Go), DevOps (OpenStack, KVM, Ansible), and integrations (payment, monitoring, security).',
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
    period: '2020',
    status: 'Completed',
    logo: { src: '/works/ufe-logo.png', alt: 'UFE logo' },
    thumbnail: { src: '/works/svg/ufe.svg', alt: 'UFE Online Learning Dashboard' },
    summary: 'Migrated one of Mongolia’s largest universities to AWS during COVID-19, ensuring reliable online learning for thousands of students.',
    paragraphs: [
      'In late January 2020, Mongolia announced a nationwide lockdown, closing all educational institutions within a week. The University of Finance and Economics (UFE) faced the urgent challenge of maintaining uninterrupted, high-quality education for its students.',
      'To address this, UFE made the critical decision to migrate its entire online learning management system to AWS cloud infrastructure, ensuring accessibility and reliability for thousands of students and staff.',
      'The migration was completed in just 10 days through close collaboration between UFE and AWS engineers. This rapid, seamless transition was accomplished without any downtime.',
    ],
    highlights: [
      "Successfully migrated UFE's online learning management system to AWS cloud infrastructure with zero downtime.",
      'Delivered a reliable and accessible online educational system, fully compatible with AWS, providing uninterrupted access to learning resources.',
      'Developed a streamlined process for data backup and recovery, ensuring secure storage and easy retrieval of critical data.',
      'Provided comprehensive training for UFE staff and instructors on AWS cloud basics and the new learning management system.',
      'Ongoing support and maintenance from AWS engineers to ensure optimal system performance.',
    ],
    stack: 'AWS (EC2, S3, CloudFront, RDS, Elastic Load Balancer, Auto Scaling, Route 53), Nginx, PHP, MySQL, Redis, CloudWatch',
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
    title: 'Mobilife AWS High Availability Architecture',
    period: '2025',
    status: 'Completed',
    launched: '2025',
    thumbnail: {
      src: '/works/svg/mobilife.svg',
      alt: 'Mobilife AWS architecture overview',
    },
    summary:
      'Designed a production-grade AWS runbook for Mobilife focused on scalability, caching, cost optimization, secure deployments, and operational readiness.',
    paragraphs: [
      'This work focused on formalizing a new AWS EC2-based production architecture for Mobilife and turning it into a practical handover document that infrastructure and operations teams can run with confidence.',
      'The target setup uses Route 53, ACM, an Application Load Balancer, Target Groups, an Auto Scaling Group, and EC2 Launch Templates to replace a more fragile single-instance model with a scalable, high-availability deployment pattern.',
      'The runbook also emphasizes professional operating practices such as cache-aware application design, resource right-sizing to reduce monthly cost, secure secret delivery, repeatable Docker-based deployments, health checks, rollback procedures, and layered monitoring for infrastructure and application availability.',
    ],
    highlights: [
      'Defined a Route 53 -> ALB -> Target Group -> Auto Scaling Group -> EC2 deployment architecture with TLS termination and API health checks.',
      'Documented Launch Template bootstrap flow for Docker startup, ECR login, Secrets Manager environment loading, container replacement, and repeatable instance provisioning.',
      'Included caching considerations for reducing database and application load, improving response times, and supporting more efficient scaling under peak traffic.',
      'Outlined cost-optimization guidance through Auto Scaling, instance right-sizing, minimizing idle capacity, and reducing operational waste in the deployment flow.',
      'Specified scaling policy recommendations using ASG target tracking with CPU-based scale-out behavior and safer deregistration for graceful traffic draining.',
      'Added security and operational hardening guidance around TLS termination, controlled network access, secret handling, and SSM-based administration.',
      'Added testing server observability guidance with Prometheus, Grafana, and Node Exporter for CPU, memory, disk, and network visibility.',
      'Included production domain health-check strategy using Route 53 Health Checks and Prometheus Blackbox Exporter.',
      'Specified AWS alerting patterns for ASG lifecycle events, service health degradation, and RDS CPU thresholds using CloudWatch and SNS.',
      'Documented deployment, troubleshooting, and rollback steps so releases can be executed faster with lower operational risk.',
    ],
    stack:
      'AWS Route 53, ACM, Application Load Balancer, EC2, Auto Scaling, Launch Templates, ECR, SSM, Secrets Manager, Docker, Prometheus, Grafana, Node Exporter, Blackbox Exporter, CloudWatch, SNS, RDS, S3',
    links: [{ label: 'mobilife.mn', href: 'https://mobilife.mn' }],
  },
  {
    id: 'easysim',
    title: 'EasySim.mn',
    period: '2025–Present',
    status: 'Active',
    launched: '2025',
    logo: { src: '/works/easysim.svg', alt: 'EasySim logo' },
    thumbnail: { src: '/works/svg/easysim.svg', alt: 'EasySim dashboard' },
    summary: 'International eSIM services for travelers, powered by a Mongolian super app.',
    paragraphs: [
      'EasySim Data Provider LLC is a technology-driven company offering international eSIM services tailored for travelers.',
      'The core project involved building a digital platform that allows users to instantly purchase and activate eSIM data packages without the need for physical SIM cards.',
      'Launched inside a popular Mongolian super app, the platform aims to make mobile internet access more convenient, affordable, and accessible across 100+ countries.',
    ],
    highlights: [
      'Seamless eSIM purchase and instant activation for travelers, with no physical SIM required.',
      'Integration with a major Mongolian super app for maximum reach and user convenience.',
      'Coverage in 100+ countries, with affordable data packages for international roaming.',
      'Automated QR code generation and delivery for eSIM installation.',
      'Secure payment integration and real-time order processing.',
      'User-friendly dashboard for managing purchased eSIMs and tracking usage.',
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
    title: 'MedTech Partner LLC',
    period: '2021–2025',
    status: 'Completed',
    logo: { src: '/works/medtech.svg', alt: 'MedTech Partner LLC logo' },
    thumbnail: { src: '/works/svg/mrp.svg', alt: 'MedTech Partner LLC Dashboard' },
    summary: 'MedOrder ecosystem: admin & supplier portals with real-time order tracking and scalable microservices.',
    paragraphs: [
      'At MedTech Partner LLC, I take pride in my contributions to the pharmaceutical industry. I’ve developed innovative solutions to enhance medical supply management and streamline operations, leading to significant improvements in efficiency and sales.',
      'The MedOrder ecosystem consists of three main web platforms: the main customer-facing site, an Admin Portal, and a Supplier Portal.',
    ],
    highlights: [
      'Admin Portal: manage suppliers, products, and marketing activities across the ecosystem.',
      'Supplier Portal: suppliers manage products, orders, and marketing initiatives in a dedicated portal.',
      'Real-time order tracking system with updates and notifications.',
      'Scalable microservice architecture for modular scaling, rapid deployment, and fault tolerance.',
      'Connection to License Management API for regulatory compliance.',
      '40,123+ orders processed through the system.',
    ],
    stack: 'React, TypeScript, Golang, PostgreSQL, Redis, Docker, Kubernetes, Microservices, REST API, IOT, License Management API integration',
    links: [
      { label: 'mrp.mn', href: 'https://mrp.mn' },
      { label: 'admin.mrp.mn', href: 'https://admin.mrp.mn' },
      { label: 'supplier.mrp.mn', href: 'https://supplier.mrp.mn' },
    ],
    gallery: [{ src: '/works/medtech.png', alt: 'MedTech Partner LLC Dashboard' }],
  },
  {
    id: 'itrip',
    title: 'iTrip Online Travel Platform',
    period: '2023',
    status: 'Launched & Ongoing',
    logo: { src: '/works/itrip.svg', alt: 'iTrip logo' },
    logoDark: { src: '/works/itrip-white.svg', alt: 'iTrip logo (dark)' },
    thumbnail: { src: '/works/svg/itrip.svg', alt: 'iTrip dashboard' },
    summary: 'Mongolia’s all-in-one travel booking platform.',
    paragraphs: [
      'iTrip is a comprehensive online travel platform developed and launched by our IT agency in close collaboration with a talented team of designers, engineers, and business stakeholders.',
      'Prior to iTrip, available services in the market were fragmented and lacked integration, making travel planning inconvenient for customers. Recognizing the need for a unified solution, our team worked together to improve customer service efficiency and increase profitability for the business.',
      'With a customer-centric approach, the iTrip platform was designed and built as a one-stop solution for hotel bookings, flight reservations, and tour packages.',
      'The result is an enhanced travel booking experience. Customers can now seamlessly browse and book various travel services through a single platform, eliminating the need for multiple applications or websites and saving precious time and effort.',
    ],
    highlights: [
      'UX/UI design sprint: user research, prototyping, and iterative design.',
      'Microservices architecture for scalability and maintainability.',
      'Cloud, containers & Kubernetes for reliable deployments.',
      'Airticket GDS API connections (Amadeus, Route24) for real-time flight data.',
      'Travel API integration (Viator) for tours and attractions.',
      'Hotel API connections (Trip.com, Ihotel.mn) for availability and inventory.',
      'Online payment integration via banking systems and smart wallets.',
      'Unit and integration testing for stability.',
    ],
    stack:
      'React, Golang, DotNet, Microservices, AWS, Docker, Kubernetes, Nginx, MySQL, Redis, Amadeus API, Route24 API, Viator API, Airalab API, Trip.com API, Ihotel.mn API, Payment Gateways, RabbitMQ',
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
