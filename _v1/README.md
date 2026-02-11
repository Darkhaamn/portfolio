# 👨‍💻 Darkhanbayar Erdenebat - Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.8-319795?style=for-the-badge&logo=chakra-ui)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**A modern, interactive portfolio showcasing cloud engineering expertise and full-stack development projects**

[View Live Demo](https://darkhaa.vercel.app) • [Report Bug](https://github.com/darkhaamn/portfolio/issues) • [Request Feature](https://github.com/darkhaamn/portfolio/issues)

</div>

---

## 🌟 About Me

**Cloud Engineer (Architect / Developer / DevOps) & Full-Stack Developer**  
📍 Based in Ulaanbaatar, Mongolia 🇲🇳

- 🎓 Bachelor's in Information Technology - Mongolia University of Science and Technology (MUST), 2018
- 💼 Working at **FIBO CLOUD** since 2019
- 🎮 Passionate about Gaming, Coding, and DevOps Engineering
- 🏆 **CKA: Certified Kubernetes Administrator** (The Linux Foundation)
- ☁️ **AWS Certified Developer – Associate**
- 🚀 Currently pursuing **AWS Certified Solutions Architect – Professional**

---

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, dark-themed design with light mode toggle
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🎭 **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 🐕 **Interactive 3D Elements** - Three.js powered 3D Shiba Inu model
- ⚡ **Lightning Fast** - Built with Next.js 13 for optimal performance
- 🎯 **SEO Optimized** - Enhanced discoverability and search rankings
- 📊 **Analytics Ready** - Integrated Vercel Analytics & Speed Insights
- 🌓 **Theme Toggle** - Seamless dark/light mode switching

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js](https://nextjs.org/) 13
- **Library:** [React](https://react.dev/) 18
- **UI Framework:** [Chakra UI](https://chakra-ui.com/) 2.8
- **Animations:** [Framer Motion](https://www.framer.com/motion/) 10
- **Styling:** [Emotion](https://emotion.sh/)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

### DevOps & Deployment

- **Hosting:** [Vercel](https://vercel.com/)
- **Containerization:** [Docker](https://www.docker.com/)
- **Web Server:** [Nginx](https://nginx.org/)
- **Analytics:** Vercel Analytics & Speed Insights

### Development Tools

- **Linting:** ESLint
- **Code Formatting:** Prettier
- **Version Control:** Git & GitHub

---

## 🚀 Featured Projects

### 🌩️ [Cloud.mn](https://cloud.mn)

**Mongolia's First Public Cloud Platform**

- Serving **3000+ companies** with VM management, storage, and networking
- **Tech Stack:** Python, Django, OpenStack, Ceph, Kubernetes, Terraform
- Role: Cloud Architect & Lead Developer

### ☁️ [TTC Cloud](https://ttc.kz)

**Kazakhstan's Leading Public Cloud Platform**

- Enterprise-level cloud services with local payment integration
- Compliance with Kazakhstan's regulatory requirements
- **Tech Stack:** OpenStack, Kubernetes, Python, Django

### ✈️ [EasySim.mn](https://easysim.mn)

**International eSIM Services Platform**

- Seamless eSIM provisioning for travelers
- Integrated with Mongolia's leading super app
- **Tech Stack:** Full-stack development with modern frameworks

### 🏥 MedOrder Ecosystem

**Healthcare Technology Solutions**

- Medical supply management and ordering system
- Pharmaceutical industry optimization
- **Tech Stack:** Modern web technologies with cloud infrastructure

### 🏨 [iTrip.mn](https://itrip.mn)

**Comprehensive Travel Booking Platform**

- Unified platform for hotels, flights, and tours in Mongolia
- **Tech Stack:** Full-stack development with payment integration

### 🎓 UFE Online Learning on AWS

**COVID-19 Emergency Migration**

- Migrated one of Mongolia's largest universities to AWS in **10 days**
- Enabled remote learning during pandemic lockdown
- **Tech Stack:** AWS (EC2, S3, RDS, CloudFront), Nginx, PHP, MySQL, Redis

---

## 📂 Project Structure

```
portfolio/
├── components/          # Reusable React components
│   ├── layouts/        # Page layout components
│   ├── icons/          # Custom icon components
│   ├── navbar.js       # Navigation bar
│   ├── footer.js       # Footer component
│   ├── voxel-dog.js    # 3D Shiba Inu model
│   └── ...
├── pages/              # Next.js pages
│   ├── index.js        # Home page
│   ├── works.js        # Projects showcase
│   ├── posts.js        # Blog posts
│   └── works/          # Individual project pages
├── public/             # Static assets
├── lib/                # Utility functions and theme
├── Dockerfile          # Docker configuration
├── nginx.conf          # Nginx configuration
└── package.json        # Dependencies
```

---

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ (specified in `.nvmrc`)
- Yarn or npm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/darkhaamn/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn prettier     # Format code with Prettier
```

---

## 🐳 Docker Deployment

### Build and run with Docker

```bash
# Build the Docker image
docker build -t portfolio .

# Run the container
docker run -p 80:80 portfolio
```

The application will be available at `http://localhost`

---

## 🎨 Customization

### Theme Configuration

The theme is configured in `lib/theme.js` using Chakra UI's theming system. You can customize:

- Color schemes
- Typography
- Component styles
- Breakpoints

### Adding New Projects

1. Create a new file in `pages/works/your-project.js`
2. Add the project to the works listing in `pages/works.js`
3. Include project thumbnail in `public/images/works/`

---

## 📊 Performance

- ⚡ **Lighthouse Score:** 95+ across all metrics
- 🚀 **First Contentful Paint:** < 1.5s
- 📦 **Optimized Bundle Size:** Code splitting with Next.js
- 🖼️ **Image Optimization:** Automatic with Next.js Image component

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Connect With Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/darkhanbayar-erdenebat/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/darkhaamn)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/darhanbayr)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:darkhanbayarr@gmail.com)

</div>

---

## 🙏 Acknowledgments

- 3D Dog model inspired by the Shiba Inu community
- Design inspiration from modern portfolio trends
- Built with love in Mongolia 🇲🇳

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

© 2026 Darkhanbayar Erdenebat. All Rights Reserved.

</div>
