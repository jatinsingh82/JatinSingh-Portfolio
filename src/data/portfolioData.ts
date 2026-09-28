export interface SkillItem {
  name: string;
  category: 'Cloud & DevOps' | 'Programming' | 'Web Development' | 'Databases' | 'Core Concepts' | 'Tools';
  level: string; // e.g. 'Foundations', 'Proficient', 'Core'
  iconName: string;
  description: string;
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Internship' | 'Traineeship' | 'Value Added Course';
  highlights: string[];
  skillsUsed: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  architectureNodes: { step: number; label: string; desc: string; icon: string }[];
  deploymentConsiderations: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: 'Cloud' | 'DevOps' | 'Networking' | 'Security' | 'Programming';
  status: 'Completed' | 'Verified';
  description: string;
  credentialNote: string;
  skillsGained: string[];
}

export const PERSONAL_INFO = {
  name: 'JATIN SINGH',
  displayName: 'Jatin Singh',
  title: 'Aspiring Cloud & DevOps Engineer',
  subtitle: 'Cloud & DevOps Engineer',
  rolePill: 'CLOUD • DEVOPS • SOFTWARE ENGINEERING',
  heroHeadline: 'Building Reliable Software & Exploring the Cloud.',
  heroSupporting: 'Computer Science Engineer focused on Cloud Computing, DevOps fundamentals, CI/CD, and modern software development.',
  heroBio: 'Jatin is a Computer Science Engineering graduate with hands-on exposure to web development, cloud platforms, version control, APIs, databases, and deployment concepts.',
  brandTagline: 'Learning, building, and deploying with a cloud-first mindset.',
  email: 'rjsinghtarkar@gmail.com',
  phone: '+918273324743',
  location: 'Mathura, Uttar Pradesh, India',
  githubUrl: 'https://github.com/jatinsingh82',
  linkedinUrl: 'https://www.linkedin.com/in/jatin-singh-4685b0253',
  linkedinDisplay: 'www.linkedin.com/in/jatin-singh-4685b0253',
  statusBadge: 'AVAILABLE FOR CLOUD & DEVOPS ROLES',
  careerObjective: 'Motivated Computer Science undergraduate with a strong foundation in cloud computing fundamentals, DevOps basics, and software development. Seeking an entry-level Azure/AWS DevOps Engineer – Analyst role where I can contribute to cloud operations, CI/CD processes, and infrastructure support while continuously learning enterprise cloud and DevOps best practices.'
};

export const ENGINEERING_PROFILE = {
  focus: 'Cloud & DevOps',
  cloudPlatforms: 'AWS / Azure',
  development: 'React / Node.js',
  versionControl: 'Git / GitHub',
  databases: 'MySQL / MongoDB',
  core: 'Networking / DBMS / Cloud'
};

export const CLOUD_FUNDAMENTALS = [
  {
    id: 'compute',
    title: 'COMPUTE',
    tagline: 'Compute → Virtual Machines → Applications',
    icon: 'Cpu',
    description: 'Understanding virtualization, compute instances, lifecycle management, and scalable application workloads across cloud platforms.',
    keyPoints: [
      'Virtual Machine (VM) provisioning & instance management',
      'Compute resource scaling and workload optimization',
      'Deploying backend microservices and containerized runtimes'
    ],
    status: 'FOUNDATIONS VERIFIED'
  },
  {
    id: 'storage',
    title: 'STORAGE',
    tagline: 'Storage → Data → Availability',
    icon: 'HardDrive',
    description: 'Managing structured databases, object storage, persistence layers, data redundancy, and high-availability concepts.',
    keyPoints: [
      'Relational (MySQL) and Document-based (MongoDB) storage',
      'Data persistence, backup strategies, and availability models',
      'Storage tiering and reliable data access patterns'
    ],
    status: 'DATA PERSISTENCE'
  },
  {
    id: 'networking',
    title: 'NETWORKING',
    tagline: 'Networking → Connectivity → Security',
    icon: 'Network',
    description: 'Implementing IP routing, subnetting, network protocols (HTTP/HTTPS, TCP/IP), security groups, and traffic flow.',
    keyPoints: [
      'TCP/IP networking, subnets, and routing protocols',
      'REST API gateway communications and firewall security',
      'CCNA-certified enterprise networking foundations'
    ],
    status: 'SECURE CONNECTIVITY'
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // Cloud & DevOps
  { name: 'Cloud Computing', category: 'Cloud & DevOps', level: 'Foundations', iconName: 'Cloud', description: 'Core principles of cloud models (IaaS, PaaS, SaaS), high availability, scalability, and virtualization.', badge: 'Core Focus' },
  { name: 'AWS (Amazon Web Services)', category: 'Cloud & DevOps', level: 'Familiarity', iconName: 'CloudRain', description: 'Hands-on familiarity with AWS portal, EC2 compute concepts, S3 storage, and foundational services.', badge: 'Portal Exposure' },
  { name: 'Microsoft Azure', category: 'Cloud & DevOps', level: 'Familiarity', iconName: 'Server', description: 'Familiarity with Azure Portal, virtual machines, resource groups, and cloud infrastructure management.', badge: 'Portal Exposure' },
  { name: 'CI/CD Fundamentals', category: 'Cloud & DevOps', level: 'Foundations', iconName: 'Workflow', description: 'Continuous integration and continuous deployment pipelines, automated build triggers, and release automation concepts.', badge: 'DevOps' },
  { name: 'Git', category: 'Cloud & DevOps', level: 'Proficient', iconName: 'GitBranch', description: 'Distributed version control, branching strategies, merge conflicts, commit tracking, and code history.' },
  { name: 'GitHub', category: 'Cloud & DevOps', level: 'Proficient', iconName: 'Github', description: 'Remote repositories, collaborative workflows, pull requests, code reviews, and project management.' },
  { name: 'Deployment Workflows', category: 'Cloud & DevOps', level: 'Foundations', iconName: 'Rocket', description: 'Application build packaging, environment variable management, server provisioning, and live rollout concepts.' },
  { name: 'Monitoring Workflows', category: 'Cloud & DevOps', level: 'Foundations', iconName: 'Activity', description: 'System health observation, application logging, metric collection, and uptime verification concepts.' },

  // Programming
  { name: 'Python', category: 'Programming', level: 'Proficient', iconName: 'Terminal', description: 'Scripting, algorithmic logic, data processing, Cisco Python Essentials certified.' },
  { name: 'Java', category: 'Programming', level: 'Proficient', iconName: 'Code2', description: 'Object-Oriented Programming (Inheritance, Polymorphism, Encapsulation), Data Structures & Algorithms.' },
  { name: 'JavaScript', category: 'Programming', level: 'Proficient', iconName: 'Braces', description: 'ES6+ syntax, asynchronous programming, DOM manipulation, full-stack web applications.' },

  // Web Development
  { name: 'React', category: 'Web Development', level: 'Proficient', iconName: 'Layers', description: 'Component-based architecture, state management, hooks, responsive modern UI development.' },
  { name: 'Node.js', category: 'Web Development', level: 'Proficient', iconName: 'Cpu', description: 'Asynchronous event-driven runtime, server-side REST API development, backend execution.' },
  { name: 'Express.js', category: 'Web Development', level: 'Proficient', iconName: 'Server', description: 'Lightweight web application framework, middleware configuration, routing, and API endpoints.' },
  { name: 'HTML5 & CSS3', category: 'Web Development', level: 'Proficient', iconName: 'Layout', description: 'Semantic page structuring, modern layouts (Flexbox, Grid), responsive mobile-first styling.' },

  // Databases
  { name: 'MySQL', category: 'Databases', level: 'Proficient', iconName: 'Database', description: 'Relational database management, table schema design, SQL queries, joins, and data integrity.' },
  { name: 'MongoDB', category: 'Databases', level: 'Proficient', iconName: 'HardDrive', description: 'NoSQL document database, Mongoose ODM, JSON schema validation, CRUD operations.' },

  // Core Concepts
  { name: 'Data Structures & Algorithms', category: 'Core Concepts', level: 'Proficient', iconName: 'Binary', description: 'Arrays, Linked Lists, Stacks, Queues, Trees, algorithmic problem solving and time complexity.' },
  { name: 'Database Management Systems (DBMS)', category: 'Core Concepts', level: 'Core', iconName: 'Database', description: 'ACID properties, normalization (1NF-3NF), indexing, transactions, and relational algebra.' },
  { name: 'Computer Networking', category: 'Core Concepts', level: 'Core', iconName: 'Network', description: 'OSI & TCP/IP layers, routing, switching, IP addressing, DNS, HTTP/HTTPS protocols, CCNA certified.' },

  // Tools
  { name: 'VS Code', category: 'Tools', level: 'Proficient', iconName: 'Code', description: 'Primary development environment with Git extensions, terminal integration, and debugging tools.' },
  { name: 'Eclipse', category: 'Tools', level: 'Proficient', iconName: 'TerminalSquare', description: 'Java IDE for enterprise application development, debugging, and class structure exploration.' }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Web Development Intern',
    company: 'Zidio Development',
    location: 'Remote',
    period: 'Feb 2024 – Mar 2024',
    type: 'Internship',
    highlights: [
      'Assisted in developing and testing static and dynamic web pages using HTML, CSS, and JavaScript.',
      'Used Git and GitHub for version control, commit tracking, and collaborative code updates.',
      'Followed defined development processes and documented changes while working in a remote team environment.'
    ],
    skillsUsed: ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'Version Control', 'Documentation', 'Remote Teamwork']
  },
  {
    id: 'exp-2',
    role: 'Web Development Trainee',
    company: 'Edu-versity',
    location: 'Remote',
    period: 'June 2024 – July 2024',
    type: 'Traineeship',
    highlights: [
      'Assisted in building and maintaining web applications using React, Node.js, and MongoDB.',
      'Supported API integration and basic database operations.',
      'Gained exposure to application hosting concepts, debugging steps, and performance checks.'
    ],
    skillsUsed: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Database Operations', 'Hosting Concepts', 'Debugging']
  },
  {
    id: 'exp-3',
    role: 'DSA: Deep Dive Using Java',
    company: 'GLA University (Value Added Course)',
    location: 'Mathura, India',
    period: 'June 2024 – July 2024',
    type: 'Value Added Course',
    highlights: [
      'Built strong fundamentals in OOP concepts including inheritance, encapsulation, and abstraction.',
      'Practiced Data Structures and Algorithms for analytical and problem-solving skills.',
      'Applied theoretical concepts to mini-projects, improving debugging and logical thinking.'
    ],
    skillsUsed: ['Java', 'OOP', 'Data Structures', 'Algorithms', 'Inheritance', 'Encapsulation', 'Problem Solving']
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'bus-booking',
    title: 'Online Bus Booking System',
    subtitle: 'Scalable Web Application & Reservation System',
    category: 'Full-Stack & Cloud Architecture Concepts',
    year: '2024',
    description: 'A web-based ticket booking application focused on streamlined user workflows, backend logic, UI responsiveness, deployment considerations, and system availability concepts relevant to cloud systems.',
    highlights: [
      'Developed a scalable web-based ticket booking application with optimized user workflows.',
      'Improved booking efficiency by streamlining backend logic and UI responsiveness.',
      'Understood deployment considerations and system availability concepts relevant to cloud systems.'
    ],
    techStack: ['Web Application', 'Backend Logic', 'Database Management', 'UI Responsiveness', 'Deployment Concepts', 'Availability'],
    githubUrl: 'https://github.com/jatinsingh82/online-bus-booking-system',
    architectureNodes: [
      { step: 1, label: 'USER', desc: 'Client browser initiating seat search and booking request', icon: 'User' },
      { step: 2, label: 'WEB INTERFACE', desc: 'Responsive user interface rendering available routes & seats', icon: 'Layout' },
      { step: 3, label: 'BOOKING SYSTEM', desc: 'Core validation engine managing seat reservations & state', icon: 'Cpu' },
      { step: 4, label: 'BACKEND', desc: 'Server handling business logic, authentication & API calls', icon: 'Server' },
      { step: 5, label: 'DATABASE', desc: 'Persistent storage ensuring transactional integrity & availability', icon: 'Database' }
    ],
    deploymentConsiderations: [
      'Availability: Architected state verification to prevent double-booking collisions.',
      'Scalability: Modular backend endpoints structured for decoupled cloud hosting.',
      'User Experience: Fast client-side rendering with instant feedback during checkout.'
    ]
  },
  {
    id: 'job-portal',
    title: 'Job Portal Application (MERN Stack)',
    subtitle: 'Full-Stack Recruitment & Search Platform',
    category: 'MERN Stack Web Development',
    year: '2024',
    description: 'A full-stack recruitment portal handling user authentication, job postings, and search filters with RESTful API integration, MongoDB database operations, and deployment optimization concepts.',
    highlights: [
      'Built a full-stack job portal handling user authentication, job postings, and search filters.',
      'Worked with REST APIs, databases, and frontend-backend integration.',
      'Gained exposure to server deployment concepts and performance optimization techniques.'
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'User Authentication', 'Deployment Workflows'],
    githubUrl: 'https://github.com/jatinsingh82/mern-job-portal',
    architectureNodes: [
      { step: 1, label: 'USER', desc: 'Job seeker or employer accessing portal features', icon: 'User' },
      { step: 2, label: 'REACT', desc: 'Interactive SPA with dynamic filters and form validation', icon: 'Layers' },
      { step: 3, label: 'REST API', desc: 'Standardized HTTP endpoints for auth, listings, and applications', icon: 'Network' },
      { step: 4, label: 'NODE / EXPRESS', desc: 'Backend runtime executing business logic and security rules', icon: 'Server' },
      { step: 5, label: 'MONGODB', desc: 'Document database storing user profiles and job records', icon: 'HardDrive' }
    ],
    deploymentConsiderations: [
      'API Security: Protected routes with token-based authentication and input sanitization.',
      'Database Indexing: Optimized MongoDB query filters for fast search by role/location.',
      'Deployment Flow: Production bundling and separation of API & static asset delivery.'
    ]
  }
];

export const DEVOPS_PIPELINE_STAGES = [
  {
    id: 'code',
    stage: '01',
    name: 'CODE',
    title: 'Code Creation',
    shortDesc: 'Developer writes application code and scripts.',
    description: 'Writing modular code in JavaScript/React, Node.js, Python, or Java adhering to clean code principles, modularity, and environment separation.',
    icon: 'Code2',
    tooling: 'VS Code, Git, Clean Code'
  },
  {
    id: 'git',
    stage: '02',
    name: 'GIT',
    title: 'Version Control',
    shortDesc: 'Version control using Git and GitHub.',
    description: 'Committing code, branch management, pull request reviews, and tracking incremental revisions collaboratively on GitHub.',
    icon: 'GitBranch',
    tooling: 'Git, GitHub, PR Workflows'
  },
  {
    id: 'build',
    stage: '03',
    name: 'BUILD',
    title: 'Build Process',
    shortDesc: 'Application build packaging and dependencies.',
    description: 'Resolving dependencies, compiling TypeScript/React bundles, and packaging artifacts ready for distribution.',
    icon: 'Package',
    tooling: 'npm, Vite, Artifact Packaging'
  },
  {
    id: 'test',
    stage: '04',
    name: 'TEST',
    title: 'Test & Validation',
    shortDesc: 'Basic validation and testing checks.',
    description: 'Running unit checks, API schema validations, linting rules, and smoke tests to guarantee software integrity.',
    icon: 'ShieldCheck',
    tooling: 'Linting, API Checks, Validation'
  },
  {
    id: 'deploy',
    stage: '05',
    name: 'DEPLOY',
    title: 'Cloud Deployment',
    shortDesc: 'Application rollout to cloud hosting.',
    description: 'Deploying application builds to target hosting environments, configuring environment variables, and verifying endpoints.',
    icon: 'Rocket',
    tooling: 'Cloud Hosting, Containers, Portals'
  },
  {
    id: 'monitor',
    stage: '06',
    name: 'MONITOR',
    title: 'Monitoring & Health',
    shortDesc: 'Monitor application and system behavior.',
    description: 'Observing server uptime, response latencies, error logging, and system health to ensure reliable availability.',
    icon: 'Activity',
    tooling: 'Health Checks, Logs, Uptime'
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'cert-oci-foundations',
    title: 'Oracle Cloud Infrastructure Foundations',
    issuer: 'Oracle',
    category: 'Cloud',
    status: 'Verified',
    description: 'Foundational grasp of Oracle Cloud Infrastructure core services, IAM, compute, networking, storage, and cloud governance principles.',
    credentialNote: 'Certificate details available on request',
    skillsGained: ['Cloud Computing', 'OCI Services', 'IAM', 'Compute & Storage', 'Security']
  },
  {
    id: 'cert-oci-devops',
    title: 'Oracle Cloud Infrastructure DevOps',
    issuer: 'Oracle',
    category: 'DevOps',
    status: 'Verified',
    description: 'DevOps fundamentals within OCI ecosystem, continuous integration/continuous delivery concepts, deployment pipelines, and code repositories.',
    credentialNote: 'Certificate details available on request',
    skillsGained: ['DevOps Fundamentals', 'CI/CD Pipelines', 'Deployment Strategies', 'Cloud Automation']
  },
  {
    id: 'cert-ccna',
    title: 'CCNA: Introduction to Networks, Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Networking Academy',
    category: 'Networking',
    status: 'Verified',
    description: 'Comprehensive networking fundamentals covering IPv4/IPv6 addressing, routing protocols, switching, network security, and network automation concepts.',
    credentialNote: 'Certificate details available on request',
    skillsGained: ['Computer Networking', 'TCP/IP & OSI', 'Routing & Switching', 'Network Security', 'Subnetting']
  },
  {
    id: 'cert-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    category: 'Security',
    status: 'Verified',
    description: 'Core cybersecurity principles, threat defense, confidentiality/integrity/availability (CIA triad), and security compliance best practices.',
    credentialNote: 'Certificate details available on request',
    skillsGained: ['Cybersecurity', 'Threat Analysis', 'CIA Triad', 'Security Best Practices']
  },
  {
    id: 'cert-python',
    title: 'Python Essentials 1 & Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    category: 'Programming',
    status: 'Verified',
    description: 'Comprehensive Python programming including procedural & object-oriented programming, data structures, exceptions, and file processing.',
    credentialNote: 'Certificate details available on request',
    skillsGained: ['Python Scripting', 'OOP in Python', 'Data Processing', 'Modules & Packages']
  }
];

export const EDUCATION_DATA = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology (B.Tech) – Computer Science Engineering',
    institution: 'GLA University',
    location: 'Mathura, Uttar Pradesh',
    period: 'Expected May 2026',
    score: 'CGPA: 6.82 / 10',
    type: 'Undergraduate Degree',
    highlight: 'Core focus on Cloud Computing, Computer Networks, Database Management Systems, Data Structures & Algorithms, and Software Engineering.',
    courses: ['Cloud Computing', 'Computer Networking', 'DBMS', 'Data Structures & Algorithms', 'Operating Systems', 'Object Oriented Programming']
  },
  {
    id: 'twelfth',
    degree: 'Intermediate (Class XII)',
    institution: 'Kanha Makhan Public School',
    location: 'Mathura, Uttar Pradesh',
    period: 'May 2022',
    score: 'Percentage: 69.4%',
    type: 'Senior Secondary',
    highlight: 'Senior secondary education with focus on Science and Mathematics foundation.',
    courses: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English']
  }
];

export const CO_CURRICULAR_DATA = {
  role: 'Event Coordinator',
  event: 'SRIJAN & SPANDAN',
  institution: 'GLA University',
  year: '2025',
  description: 'Demonstrated teamwork, responsibility, and event coordination skills by organizing large-scale university cultural and technical festivals.',
  skillsDemonstrated: ['Teamwork', 'Responsibility', 'Event Coordination', 'Communication', 'Problem Solving']
};

export const CLOUD_PLATFORMS_DATA = [
  {
    id: 'aws',
    name: 'AWS',
    fullName: 'Amazon Web Services',
    description: 'Familiarity with AWS cloud concepts and portal-based cloud services.',
    icon: 'Cloud',
    color: '#FF9900',
    badge: 'Portal Familiarity',
    pillars: [
      { name: 'Compute', desc: 'Virtual machine compute instances & execution concepts' },
      { name: 'Storage', desc: 'Scalable object storage and data persistence' },
      { name: 'Networking', desc: 'Virtual private clouds, subnets, and routing' }
    ]
  },
  {
    id: 'azure',
    name: 'Azure',
    fullName: 'Microsoft Azure',
    description: 'Familiarity with Azure portal and foundational cloud concepts.',
    icon: 'Server',
    color: '#0089D6',
    badge: 'Portal Familiarity',
    pillars: [
      { name: 'Compute', desc: 'Azure Virtual Machines and app hosting services' },
      { name: 'Storage', desc: 'Blob storage, file shares, and database services' },
      { name: 'Networking', desc: 'Virtual Networks, Network Security Groups, and DNS' }
    ]
  }
];
