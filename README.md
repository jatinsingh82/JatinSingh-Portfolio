# Jatin Singh — Cloud & DevOps Portfolio

> Professional engineering portfolio of **Jatin Singh**, Aspiring Cloud & DevOps Engineer focused on AWS, Azure, CI/CD pipelines, Git workflows, and modern software development.

---

## 🚀 Overview

This repository contains the source code for Jatin Singh's personal portfolio website, engineered with a cloud-first, high-availability mindset. It showcases practical full-stack projects, cloud infrastructure fundamentals, CI/CD delivery pipelines, verified certifications (OCI, Cisco CCNA, Python), and academic background.

### 🛠️ Tech Stack

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons
* **Build System:** Vite 6
* **Cloud & DevOps Focus:**
  * **Cloud:** AWS (EC2, S3, IAM) & Microsoft Azure (VMs, Resource Groups)
  * **CI/CD & Automation:** Git/GitHub workflows, automated build & testing pipelines
  * **Core Foundations:** Computer Networking (CCNA), DBMS, Linux/Unix, Object-Oriented Programming

---

## 💻 Local Development

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18+ recommended)
* `npm` or `pnpm` / `yarn`

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jatinsingh82/jatin-singh-portfolio.git
   cd jatin-singh-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build & Verification:**
   ```bash
   npm run lint   # Run TypeScript compilation checks
   npm run build  # Generate production bundle in dist/
   npm run preview # Preview the production bundle locally
   ```

---

## 📁 Project Structure

```text
├── index.html                   # HTML entry point with SEO & Open Graph meta
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── App.tsx                  # Main app component & section layout
    ├── index.css                # Global Tailwind CSS & print optimizations
    ├── data/
    │   └── portfolioData.ts     # Centralized engineering profile & project data
    └── components/
        ├── Navbar.tsx           # Responsive sticky navigation & mobile drawer
        ├── Hero.tsx             # Hero section with engineering headline & CTAs
        ├── CloudHeroVisual.tsx  # Interactive cloud infrastructure diagram
        ├── About.tsx            # Academic background & engineering profile
        ├── Skills.tsx           # Filterable technical competencies & tools
        ├── CloudFundamentals.tsx# Compute, Storage, and Networking pillars
        ├── CloudPlatforms.tsx   # AWS & Microsoft Azure portal overview
        ├── Experience.tsx       # Internship & training timeline
        ├── Projects.tsx         # Featured engineering projects & data flows
        ├── DevOpsPipeline.tsx   # Interactive 6-stage DevOps lifecycle pipeline
        ├── CicdTerminal.tsx     # Simulated CI/CD terminal runner
        ├── Certifications.tsx   # Verified credentials (OCI, Cisco, Python)
        ├── Education.tsx        # B.Tech degree & academic coursework
        ├── Activities.tsx       # Leadership & event coordination
        ├── Contact.tsx          # Direct message & inquiry form
        ├── Footer.tsx           # Social links & back-to-top navigation
        ├── ResumeModal.tsx      # Printable modal with PDF & text export
        └── DevOpsControlWidget.tsx # Floating pipeline readiness widget
```

---

## 📬 Contact & Connect

* **Email:** [rjsinghtarkar@gmail.com](mailto:rjsinghtarkar@gmail.com)
* **LinkedIn:** [linkedin.com/in/jatin-singh-4685b0253](https://www.linkedin.com/in/jatin-singh-4685b0253)
* **GitHub:** [github.com/jatinsingh82](https://github.com/jatinsingh82)
* **Location:** Mathura, Uttar Pradesh, India
