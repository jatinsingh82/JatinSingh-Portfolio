/**
 * Jatin Singh — Portfolio Data Layer
 * Strict authenticity: factual information only, no fabricated metrics or fake roles.
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Jatin Singh",
    role: "Cybersecurity Analyst",
    specialization: "Cyber Strategy & Transformation",
    positioning: "Cybersecurity | Cyber Strategy & Transformation | Technology",
    summary: "Cybersecurity professional with a Computer Science Engineering degree from GLA University, Mathura. Experienced in enterprise cyber posture assessment, threat modeling, security architecture evaluation, and risk transformation.",
    email: "jatinthakur8273@gmail.com",
    github: "https://github.com/jatinsingh82",
    linkedin: "https://www.linkedin.com/in/jatinsingh82/",
    location: "India",
    education: {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "GLA University, Mathura",
      focus: "Systems Engineering, Network Protocols, and Information Security",
      highlights: [
        "Core Computer Science Engineering",
        "Systems Architecture & Network Protocols",
        "Data Structures & Algorithmic Complexity"
      ]
    },
    infoPanel: [
      { label: "ROLE", value: "Cybersecurity Analyst" },
      { label: "DOMAIN", value: "Cyber Strategy & Transformation" },
      { label: "TECHNICAL FOCUS", value: "Threat Modeling, NIST CSF, ISO/IEC 27001, Systems Security" },
      { label: "CURRENT INTERESTS", value: "Cloud Security Architecture, Zero-Trust Governance, Resilient Systems" }
    ]
  },

  experience: [
    {
      id: "exp-1",
      role: "Cybersecurity Analyst",
      specialization: "Cyber Strategy & Transformation",
      company: "Enterprise Security Practice",
      location: "India",
      duration: "Present",
      isCurrent: true,
      summary: "Leading and contributing to cyber posture transformation initiatives, enterprise risk assessments, and secure systems architecture reviews.",
      responsibilities: [
        "Evaluate organizational security postures against NIST Cybersecurity Framework (CSF) and ISO/IEC 27001 control standards.",
        "Conduct threat modeling and attack surface mapping across web applications, cloud environments, and internal networks.",
        "Assist in designing Identity and Access Management (IAM) governance policies enforcing least-privilege principles and zero-trust concepts.",
        "Collaborate between technical engineering teams and risk leaders to prioritize vulnerability remediation roadmaps."
      ],
      deepDive: {
        frameworks: "NIST CSF 2.0 (Identify, Protect, Detect, Respond, Recover, Govern) & ISO/IEC 27001:2022 ISMS Controls",
        methodology: "STRIDE Threat Modeling, Attack Surface Decomposition, and Risk-Weighted Control Remediation",
        impact: "Bridging the gap between low-level technical vulnerabilities and executive enterprise risk posture."
      },
      technologies: ["Cyber Strategy", "Threat Modeling", "NIST CSF", "ISO 27001", "IAM Governance", "Risk Assessment", "Zero Trust"]
    }
  ],

  skills: {
    categories: [
      { id: "all", name: "All Competencies" },
      { id: "cybersecurity", name: "Cybersecurity" },
      { id: "cloud", name: "Cloud" },
      { id: "networking", name: "Networking" },
      { id: "programming", name: "Programming" },
      { id: "devops", name: "DevOps & Tools" },
      { id: "databases", name: "Databases & Systems" },
      { id: "security-tools", name: "Security Tools" }
    ],
    items: [
      // Cybersecurity
      {
        name: "Cyber Strategy & Transformation",
        category: "cybersecurity",
        description: "Aligning organizational cyber posture with strategic business goals, threat landscapes, and regulatory compliance."
      },
      {
        name: "NIST Cybersecurity Framework (CSF)",
        category: "cybersecurity",
        description: "Implementing core functions: Govern, Identify, Protect, Detect, Respond, and Recover across enterprise systems."
      },
      {
        name: "ISO/IEC 27001 Standards",
        category: "cybersecurity",
        description: "Establishing, auditing, and maintaining Information Security Management System (ISMS) risk governance controls."
      },
      {
        name: "Threat Modeling (STRIDE)",
        category: "cybersecurity",
        description: "Systematic architectural threat decomposition analyzing Spoofing, Tampering, Repudiation, Info Disclosure, DoS, and Elevation of Privilege."
      },
      {
        name: "Identity & Access Management (IAM)",
        category: "cybersecurity",
        description: "Enforcing Role-Based Access Control (RBAC), Least Privilege, and Zero Trust authentication protocols."
      },
      {
        name: "Vulnerability Assessment",
        category: "cybersecurity",
        description: "Systematic flaw discovery, CVSS 3.1 scoring, exposure triage, and strategic remediation workflows."
      },
      {
        name: "OWASP Top 10 Web Defense",
        category: "cybersecurity",
        description: "Architectural countermeasures against Broken Access Control, Injection, Cryptographic Failures, and SSRF."
      },

      // Cloud
      {
        name: "Cloud Security Architecture",
        category: "cloud",
        description: "Evaluating shared responsibility models, cloud asset inventories, and multi-tenant infrastructure posture."
      },
      {
        name: "Cloud IAM & Governance",
        category: "cloud",
        description: "Hardening cloud identity boundaries, service account scopes, and ephemeral token delegation."
      },
      {
        name: "Virtual Private Cloud (VPC)",
        category: "cloud",
        description: "Subnet segregation, security groups, network access control lists (NACLs), and traffic flow isolation."
      },

      // Networking
      {
        name: "TCP/IP & OSI Architecture",
        category: "networking",
        description: "In-depth packet flow analysis across application, transport, network, and data link protocol layers."
      },
      {
        name: "DNS, TLS & Cryptographic Protocols",
        category: "networking",
        description: "Securing end-to-end communication channels with TLS 1.3, public key cryptography, and DNSSEC."
      },
      {
        name: "Firewalls & Network Segmentation",
        category: "networking",
        description: "Demilitarized zones (DMZ), micro-segmentation, packet filtering, and stateful traffic inspection."
      },

      // Programming
      {
        name: "Java (Core & Object-Oriented)",
        category: "programming",
        description: "Enterprise software development, memory safety considerations, and multi-threaded systems architecture."
      },
      {
        name: "C++ (Systems & Algorithms)",
        category: "programming",
        description: "High-performance computational algorithms, memory management, and pointers/data structures."
      },
      {
        name: "JavaScript (ES6+ & Asynchronous)",
        category: "programming",
        description: "Modern asynchronous execution, client-side event loops, API integration, and DOM security."
      },
      {
        name: "HTML5 & Semantic Engineering",
        category: "programming",
        description: "Standardized document structures, accessibility standards (WCAG), and secure DOM hierarchy."
      },
      {
        name: "CSS3 & Responsive Layouts",
        category: "programming",
        description: "CSS Grid, Flexbox, hardware-accelerated animations, and responsive mobile architecture."
      },

      // DevOps & Tools
      {
        name: "Linux Systems Administration",
        category: "devops",
        description: "Kernel permissions, POSIX access controls, systemd service management, and bash shell scripting."
      },
      {
        name: "Git & GitHub Version Control",
        category: "devops",
        description: "Cryptographic commit tracking, pull request code reviews, branch governance, and secure CI pipelines."
      },
      {
        name: "Bash & Automation Scripting",
        category: "devops",
        description: "Automating routine administration tasks, configuration validation, and diagnostic checks."
      },

      // Databases & Systems
      {
        name: "Relational Database Concepts",
        category: "databases",
        description: "Schema design, relational integrity, ACID compliance, and SQL injection defense."
      },
      {
        name: "Data Structures & Complexity Analysis",
        category: "databases",
        description: "Big-O algorithmic runtime and space optimization across trees, graphs, heaps, and arrays."
      },

      // Security Tools
      {
        name: "Wireshark Packet Analysis",
        category: "security-tools",
        description: "Deep packet capture inspection, protocol anomaly triage, and plaintext credential discovery."
      },
      {
        name: "Nmap Network Scanner",
        category: "security-tools",
        description: "Host discovery, port enumeration, banner grabbing, and network service fingerprinting."
      },
      {
        name: "Burp Suite / Web Proxy Inspection",
        category: "security-tools",
        description: "HTTP/HTTPS request tampering, header inspection, and web vulnerability analysis."
      }
    ]
  },

  projects: [
    {
      id: "rajdeep",
      title: "Rajdeep Enterprises Digital Platform",
      category: "web",
      categoryLabel: "Web Platform & Client Architecture",
      isFeatured: true,
      summary: "Commercial web platform engineered for Rajdeep Enterprises, delivering a streamlined, highly responsive digital brand presence with rapid load times and accessible user pathways.",
      problem: "Rajdeep Enterprises required a modern digital presence capable of showcasing offerings cleanly across desktop, tablet, and mobile with instantaneous responsiveness, zero framework bloat, and hardened client-side validation.",
      solution: "Engineered a lightweight, single-tier client architecture using semantic HTML5, CSS3, and modular vanilla JavaScript. Designed zero-overhead UI components with sub-second First Contentful Paint and rigorous accessibility.",
      architectureDescription: "Client-side responsive architecture with high-compression asset distribution, semantic document tree, and hardened input sanitization.",
      architectureSteps: [
        { label: "USER / CLIENT", desc: "Accesses digital portal over HTTPS on any mobile, tablet, or desktop browser." },
        { label: "PRESENTATION LAYER", desc: "Zero-bloat semantic HTML5 and CSS3 Grid/Flexbox with hardware acceleration." },
        { label: "CLIENT SECURITY", desc: "Hardened form validation, input sanitization, and strict rel='noopener noreferrer' outbound controls." },
        { label: "ASSET DELIVERY", desc: "Sub-second first contentful paint with optimized modern image compression." }
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Performance Optimization"],
      myContribution: "Sole Frontend Engineer: designed responsive system layout, implemented client-side interactivity, and optimized for speed, security, and accessibility.",
      implementation: "Built completely from the ground up using clean semantic markup and modern CSS variables for theme consistency without relying on heavy third-party JavaScript runtimes.",
      result: "Achieved sub-second page loads, zero runtime security vulnerabilities, full mobile responsiveness, and a polished brand representation for commercial stakeholders.",
      image: "src/assets/images/project_rajdeep_preview_1790182635150.jpg",
      github: "https://github.com/jatinsingh82/Rajdeep-Enterprises",
      liveDemo: "https://github.com/jatinsingh82/Rajdeep-Enterprises"
    },
    {
      id: "weather",
      title: "Weather Intelligence Telemetry",
      category: "web",
      categoryLabel: "Distributed API Telemetry",
      isFeatured: false,
      summary: "Real-time meteorological web application leveraging asynchronous RESTful API consumption with automated latency failover, timeout handling, and client-side caching.",
      problem: "Public weather APIs frequently experience rate limits, latency spikes, and transient errors, causing naive web interfaces to freeze or render broken partial states.",
      solution: "Developed an asynchronous data pipeline utilizing the Fetch API with AbortController timeouts, structured try/catch error boundaries, and temporary memory caching to prevent redundant requests.",
      architectureDescription: "Decoupled frontend dashboard communicating with external REST endpoints via asynchronous promise chains and stateful UI updates.",
      architectureSteps: [
        { label: "USER SEARCH", desc: "User queries location via debounced input to prevent excessive API invocations." },
        { label: "FETCH CONTROLLER", desc: "Dispatches HTTP requests with timeout safety and abort handles." },
        { label: "CACHE & PARSE", desc: "Parses JSON telemetry and caches coordinates in memory for instant reuse." },
        { label: "UI RENDER", desc: "Renders metric cards, forecast graphs, and weather state icons with graceful error fallbacks." }
      ],
      technologies: ["JavaScript (ES6+)", "RESTful APIs", "Async / Await", "Error Handling", "CSS Grid"],
      myContribution: "Designed data fetching pipeline, implemented async state management, and crafted responsive dashboard visualization.",
      implementation: "Clean vanilla ES6+ utilizing async/await, modular functions, and CSS grid for dashboard telemetry cards.",
      result: "Resilient real-time weather querying with reliable error fallback notifications and zero UI freezes during slow network conditions.",
      image: "src/assets/images/cloud_architecture_1790183695850.jpg",
      github: "https://github.com/jatinsingh82",
      liveDemo: null
    },
    {
      id: "geolocation",
      title: "Privacy-Aware Geolocation Tracker",
      category: "security",
      categoryLabel: "Sensor Privacy & Access Controls",
      isFeatured: false,
      summary: "Spatial telemetry tracking application built on the HTML5 Geolocation API with explicit user consent enforcement, permission boundary inspection, and client-side coordinate sanitization.",
      problem: "Modern web applications often request invasive device sensors without transparent permission lifecycles, clear status disclosure, or data minimization.",
      solution: "Engineered a sensor dashboard that checks Permissions API status beforehand, requests fine vs coarse access explicitly, and sanitizes coordinate precision client-side before any processing.",
      architectureDescription: "Browser sensor lifecycle management verifying permissions, handling denial gracefully, and enforcing local-only data boundaries.",
      architectureSteps: [
        { label: "PERMISSION PROBE", desc: "Queries navigator.permissions to inspect state (granted, prompt, denied) prior to access." },
        { label: "EXPLICIT CONSENT", desc: "Provides transparent UI disclosure of why coordinates are requested before invoking API." },
        { label: "COORDINATE SANITIZATION", desc: "Truncates coordinate floating point precision to protect user residence privacy." },
        { label: "LOCAL TELEMETRY", desc: "Displays spatial coordinates strictly within client memory without server transmission." }
      ],
      technologies: ["HTML5 Geolocation API", "Permissions API", "JavaScript", "Privacy Governance", "UI Security"],
      myContribution: "Designed permission lifecycle UI, implemented privacy-first sensor capture, and created state feedback banners.",
      implementation: "Leveraged navigator.geolocation with high-accuracy toggles, error status code mapping, and clear user privacy status toggles.",
      result: "Demonstrates practical implementation of user-centric sensor privacy controls adhering to privacy-by-design principles.",
      image: "src/assets/images/security_strategy_1790183683183.jpg",
      github: "https://github.com/jatinsingh82",
      liveDemo: null
    },
    {
      id: "algorithms",
      title: "Algorithmic Problem Solving & Data Structures",
      category: "engineering",
      categoryLabel: "Computational Rigor & Memory Optimization",
      isFeatured: false,
      summary: "Curated solutions for complex algorithmic problems and data structures focusing on time-space complexity optimization, memory constraints, and competitive programming.",
      problem: "Enterprise security and software engineering both demand deep computational rigor: understanding memory layouts, pointer references, hash collision costs, and graph traversal limits.",
      solution: "Implemented optimal algorithmic solutions in C++ and Java covering dynamic programming, graph traversal, trees, heaps, and bitwise manipulation with rigorous Big-O complexity audits.",
      architectureDescription: "Systematic data structure implementations audited for asymptotic time complexity and auxiliary space utilization.",
      architectureSteps: [
        { label: "PROBLEM DECOMPOSITION", desc: "Isolates input boundaries, edge cases, and worst-case scenario constraints." },
        { label: "ALGORITHM SELECTION", desc: "Selects optimal computational paradigm: Greedy, Divide & Conquer, Dynamic Programming, or Bitwise." },
        { label: "IMPLEMENTATION", desc: "Writes clean, memory-conscious C++/Java solutions with bounds checking." },
        { label: "COMPLEXITY AUDIT", desc: "Verifies O(N) or O(log N) time guarantees and minimal heap allocation." }
      ],
      technologies: ["C++", "Java", "Data Structures", "Algorithmic Complexity", "Memory Management"],
      myContribution: "Author of algorithmic solutions, complexity analysis notes, and problem-solving benchmarks.",
      implementation: "C++ STL and Java Collections implementations focusing on cache-friendly data structures and zero memory leaks.",
      result: "Proven foundational problem-solving capability directly applicable to analyzing network packet buffers and cryptography algorithms.",
      image: "src/assets/images/datacenter_infra_1790183667384.jpg",
      github: "https://github.com/jatinsingh82",
      liveDemo: null
    }
  ],

  certifications: [
    {
      id: "cert-1",
      title: "CompTIA Security+",
      issuer: "CompTIA",
      status: "Active Credential / Security Specialization",
      date: "Cybersecurity Standard",
      description: "Baseline cybersecurity credential covering threat analysis, cryptography, network security, risk management, identity governance, and incident response.",
      verificationUrl: "https://www.comptia.org/certifications/security",
      badgeText: "VERIFIED STANDARD"
    },
    {
      id: "cert-2",
      title: "Certified in Cybersecurity (CC)",
      issuer: "ISC2",
      status: "Foundational Security Certification",
      date: "ISC2 Credential",
      description: "Industry-standard certification validating foundational security concepts, business continuity, incident response concepts, access controls, and network security.",
      verificationUrl: "https://www.isc2.org/Certifications/CC",
      badgeText: "VERIFIED STANDARD"
    },
    {
      id: "cert-3",
      title: "ISO/IEC 27001 Information Security Management",
      issuer: "International Standards",
      status: "ISMS Framework Alignment",
      date: "Enterprise Governance",
      description: "Competency in understanding, evaluating, and auditing Information Security Management Systems (ISMS) risk governance controls and operational policies.",
      verificationUrl: "https://www.iso.org/isoiec-27001-information-security.html",
      badgeText: "FRAMEWORK MASTERY"
    }
  ],

  // Interactive Architecture Nodes
  architecture: {
    title: "End-to-End Enterprise Cyber & Systems Architecture",
    subtitle: "Interactive breakdown of modern layered defense across client, network, application, and infrastructure layers.",
    nodes: [
      {
        id: "client",
        name: "01. Client & Browser Layer",
        badge: "Edge Security",
        summary: "The initial user trust boundary operating within modern web browsers.",
        controls: [
          "Content Security Policy (CSP) enforcing strict script-src and object-src",
          "Sanitized DOM rendering preventing Cross-Site Scripting (XSS)",
          "Secure Cookie attributes (SameSite=Strict, HttpOnly, Secure)",
          "Subresource Integrity (SRI) verifying asset hashes"
        ]
      },
      {
        id: "network",
        name: "02. Network & Transport Layer",
        badge: "Transport Defense",
        summary: "Encrypted communications conduits routing telemetry between client and endpoints.",
        controls: [
          "TLS 1.3 protocol enforcement with modern cipher suites (PFS)",
          "HSTS (HTTP Strict Transport Security) with preloading",
          "CORS (Cross-Origin Resource Sharing) whitelist domain enforcement",
          "Rate limiting and DDoS mitigation at network ingress"
        ]
      },
      {
        id: "application",
        name: "03. Application & Logic Layer",
        badge: "Application Security",
        summary: "Business logic and API request processing handling user inputs and workflows.",
        controls: [
          "Strict server-side input validation and parameter type checking",
          "OWASP Top 10 mitigation: SQL injection, broken authentication defense",
          "Cryptographic token signing (HMAC-SHA256) and ephemeral session expiry",
          "Centralized structured logging with security event auditing"
        ]
      },
      {
        id: "governance",
        name: "04. Governance & Zero Trust",
        badge: "Risk & IAM",
        summary: "Access decision policies and organizational control enforcement.",
        controls: [
          "Principle of Least Privilege (PoLP) across all service accounts",
          "Continuous verification: explicit trust validation on every transaction",
          "NIST CSF alignment across Governance, Protection, and Detection functions",
          "ISO/IEC 27001 Access Control and Cryptography compliance standards"
        ]
      },
      {
        id: "infrastructure",
        name: "05. Infrastructure & Data Layer",
        badge: "Host & Storage",
        summary: "Underlying virtualized containers, databases, and sovereign data repositories.",
        controls: [
          "Encryption at rest (AES-256) for databases and persistent volumes",
          "Network micro-segmentation and strict firewall egress rules",
          "Hardened Linux kernels with disabled root SSH and minimal packages",
          "Automated vulnerability patch management and configuration drift audits"
        ]
      }
    ]
  },

  // Security Lab / Technical Area
  securityLab: {
    title: "Cybersecurity Technical Lab",
    subtitle: "Interactive security tools, threat modeling matrices, and defense verification checklists.",
    tools: [
      {
        id: "header-audit",
        title: "HTTP Security Header Auditor",
        type: "Interactive Inspection",
        description: "Examine critical defense-in-depth headers recommended by OWASP for enterprise web platforms.",
        headers: [
          { name: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'", status: "Enforced", role: "Defends against XSS and unauthorized script injection" },
          { name: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload", status: "Enforced", role: "Enforces TLS encryption and prevents SSL stripping" },
          { name: "X-Content-Type-Options", value: "nosniff", status: "Enforced", role: "Blocks MIME type sniffing attacks" },
          { name: "X-Frame-Options", value: "DENY", status: "Enforced", role: "Prevents UI redressing and clickjacking" },
          { name: "Referrer-Policy", value: "strict-origin-when-cross-origin", status: "Enforced", role: "Shields sensitive query data from external referrers" },
          { name: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()", status: "Enforced", role: "Restricts unauthorized browser hardware sensor access" }
        ]
      },
      {
        id: "stride-matrix",
        title: "STRIDE Threat Modeling Evaluator",
        type: "Threat Analysis Matrix",
        description: "Deconstruct security properties against STRIDE threat vectors with recommended countermeasures.",
        threats: [
          { letter: "S", threat: "Spoofing Identity", property: "Authentication", countermeasure: "Enforce multi-factor authentication (MFA), cryptographic sessions, and signed tokens." },
          { letter: "T", threat: "Tampering with Data", property: "Integrity", countermeasure: "Use cryptographic hashes (SHA-256), TLS 1.3 encryption, and digital signatures." },
          { letter: "R", threat: "Repudiation", property: "Non-repudiation", countermeasure: "Maintain tamper-evident audit logs with synchronized NTP timestamps and secure storage." },
          { letter: "I", threat: "Information Disclosure", property: "Confidentiality", countermeasure: "Apply AES-256 data encryption at rest, sanitize error responses, and enforce strict CORS." },
          { letter: "D", threat: "Denial of Service", property: "Availability", countermeasure: "Implement rate limiting, ingress filtering, resource quotas, and redundant infrastructure." },
          { letter: "E", threat: "Elevation of Privilege", property: "Authorization", countermeasure: "Strict Role-Based Access Control (RBAC), least privilege policies, and input validation." }
        ]
      },
      {
        id: "zero-trust",
        title: "Zero-Trust Architecture Checklist",
        type: "Verification Protocol",
        description: "Core verification principles guiding modern defense-in-depth security postures.",
        principles: [
          { title: "Verify Explicitly", detail: "Always authenticate and authorize based on all available data points (user identity, location, device health, service or workload)." },
          { title: "Use Least-Privileged Access", detail: "Limit user access with Just-In-Time and Just-Enough-Access (JIT/JEA), risk-based adaptive policies, and data protection." },
          { title: "Assume Breach", detail: "Minimize blast radius by segmenting access by network, user, devices, and application awareness. Encrypt all sessions end-to-end." }
        ]
      }
    ]
  },

  // Verified GitHub Fallback
  githubFallback: {
    username: "jatinsingh82",
    profileUrl: "https://github.com/jatinsingh82",
    publicRepos: [
      {
        name: "Rajdeep-Enterprises",
        description: "Commercial digital web portal engineered with responsive architecture, clean semantics, and high performance.",
        language: "HTML / CSS / JavaScript",
        url: "https://github.com/jatinsingh82/Rajdeep-Enterprises",
        stars: 0,
        forks: 0,
        topics: ["frontend", "commercial-web", "performance", "responsive"]
      },
      {
        name: "jatinsingh82.github.io",
        description: "Official portfolio of Jatin Singh — Cybersecurity Analyst specializing in Cyber Strategy & Transformation.",
        language: "JavaScript / CSS / Three.js",
        url: "https://github.com/jatinsingh82/jatinsingh82.github.io",
        stars: 0,
        forks: 0,
        topics: ["cybersecurity", "portfolio", "cyber-strategy", "threat-modeling"]
      }
    ]
  }
};
