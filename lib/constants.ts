import {
  GraduationCap,
  UtensilsCrossed,
  Hospital,
  Building2,
  ShoppingCart,
  Brain,
  Zap,
  Palette,
  Smartphone,
  Search,
  TrendingUp,
  HeadphonesIcon,
  Code,
  Briefcase,
  MessageCircle,
  Camera,
  Globe,
  Shield,
  Clock,
  Users,
  Award,
  Layers,
  Cloud,
  Cpu,
  type LucideIcon,
} from "lucide-react";

// ── Navigation ──────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#brand" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Why SK Digital", href: "#why-choose" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

// ── Stats ───────────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 2, suffix: "+", label: "Projects Delivered" },
  { value: 2, suffix: "+", label: "Happy Clients" },
  { value: 4, suffix: "+", label: "Months Experience" },
  { value: 99.9, suffix: "%", label: "Uptime Guarantee" },
];

// ── Typewriter Words ────────────────────────────────────────
export const TYPEWRITER_WORDS = [
  "Healthcare Systems",
  "EdTech Platforms",
  "Enterprise Solutions",
  "SaaS Products",
  "Fintech Apps",
  "E-Commerce",
];

// ── Trusted By Companies ────────────────────────────────────
export const TRUSTED_COMPANIES = [
  "Modern International School",
  "Spice Garden Restaurant",
  "City Care Hospital",
  "TechNova AI",
  "Greenfield Realty",
  "UrbanBites Delivery",
  "NexGen Pharma",
  "BrightPath Academy",
  "MediConnect Health",
  "CloudSpark Solutions",
  "BlueVista Hotels",
  "Pinnacle Ventures",
];

// ── Services ────────────────────────────────────────────────
export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  gradient: string;
  accentColor: string;
}

export const SERVICES: Service[] = [
  {
    title: "Web Development",
    description:
      "Full-stack web applications built with Next.js, React, and modern frameworks. From marketing sites to complex SaaS platforms.",
    icon: Globe,
    benefits: [
      "Custom CMS & Admin Panels",
      "Progressive Web Apps",
      "API-First Architecture",
      "Performance Optimization",
    ],
    gradient: "from-violet-500/20 to-purple-500/5",
    accentColor: "#8b5cf6",
  },
  {
    title: "Mobile Applications",
    description:
      "Cross-platform mobile apps using React Native and Flutter. Native-feel performance with single codebase efficiency.",
    icon: Smartphone,
    benefits: [
      "iOS & Android Apps",
      "Push Notifications",
      "Offline-First Design",
      "App Store Deployment",
    ],
    gradient: "from-cyan-500/20 to-blue-500/5",
    accentColor: "#06b6d4",
  },
  {
    title: "UI/UX Design",
    description:
      "Research-driven design systems and interfaces that convert. From wireframes to pixel-perfect prototypes.",
    icon: Palette,
    benefits: [
      "User Research & Testing",
      "Design Systems",
      "Interactive Prototypes",
      "Accessibility Compliance",
    ],
    gradient: "from-pink-500/20 to-rose-500/5",
    accentColor: "#ec4899",
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable cloud infrastructure on AWS, GCP, and Azure. CI/CD pipelines, containerization, and monitoring.",
    icon: Cloud,
    benefits: [
      "Auto-Scaling Infrastructure",
      "Docker & Kubernetes",
      "CI/CD Pipelines",
      "24/7 Monitoring",
    ],
    gradient: "from-emerald-500/20 to-teal-500/5",
    accentColor: "#10b981",
  },
  {
    title: "AI Integration",
    description:
      "Intelligent features powered by machine learning. Chatbots, recommendation engines, and natural language processing.",
    icon: Brain,
    benefits: [
      "Custom AI Models",
      "Chatbot Development",
      "Data Analytics",
      "Predictive Insights",
    ],
    gradient: "from-amber-500/20 to-orange-500/5",
    accentColor: "#f59e0b",
  },
  {
    title: "Digital Strategy",
    description:
      "End-to-end digital transformation consulting. SEO, analytics, and growth engineering to maximize ROI.",
    icon: TrendingUp,
    benefits: [
      "SEO & SEM Strategy",
      "Analytics Dashboard",
      "Conversion Optimization",
      "Growth Engineering",
    ],
    gradient: "from-indigo-500/20 to-blue-500/5",
    accentColor: "#6366f1",
  },
];

// ── Projects ────────────────────────────────────────────────
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  gradient: string;
}

export const PROJECT_CATEGORIES = ["All", "Education", "Healthcare", "Hospitality", "Technology"];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Modern International School",
    category: "Education",
    image: "/images/school-mockup.png",
    challenge:
      "Low online enrollment rates and poor parent engagement due to an outdated website that didn't reflect the school's premium standards.",
    solution:
      "Built a modern, interactive website with an integrated admissions portal, virtual campus tour, parent-teacher communication hub, and event management system.",
    results: [
      "40% increase in online enrollments",
      "65% more parent engagement",
      "3x more website traffic",
      "50% reduction in admin workload",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Firebase", "Stripe"],
    gradient: "from-violet-500/20 to-purple-500/5",
  },
  {
    id: 2,
    title: "Spice Garden Restaurant",
    category: "Hospitality",
    image: "/images/restaurant-mockup.png",
    challenge:
      "No online presence and losing customers to competitors with modern ordering systems and digital menus.",
    solution:
      "Designed a visually rich restaurant website with real-time table reservations, an integrated online ordering system, dynamic menu management, and Google Maps integration.",
    results: [
      "60% increase in online reservations",
      "35% growth in delivery orders",
      "4.8★ Google rating maintained",
      "2x social media followers",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Google Maps API"],
    gradient: "from-orange-500/20 to-amber-500/5",
  },
  {
    id: 3,
    title: "City Care Hospital",
    category: "Healthcare",
    image: "/images/hospital-mockup.png",
    challenge:
      "Complex patient management workflow, long wait times, and no digital appointment booking system.",
    solution:
      "Developed a comprehensive hospital management portal with online appointment booking, patient records, doctor dashboard, prescription management, and real-time queue updates.",
    results: [
      "35% reduction in patient wait times",
      "70% of appointments booked online",
      "45% improved staff efficiency",
      "98% patient satisfaction score",
    ],
    technologies: ["React", "Spring Boot", "MySQL", "Docker", "Redis"],
    gradient: "from-cyan-500/20 to-teal-500/5",
  },
  {
    id: 4,
    title: "TechNova AI Platform",
    category: "Technology",
    image: "/images/ai-mockup.png",
    challenge:
      "Needed a conversion-focused landing page for an AI product launch with complex feature explanations and pricing tiers.",
    solution:
      "Created a stunning product showcase with interactive demos, animated feature walkthroughs, tiered pricing calculator, and integrated analytics dashboard for lead tracking.",
    results: [
      "Featured on ProductHunt (#3)",
      "45% improvement in conversion rate",
      "12,000+ signups in first month",
      "80% reduction in support queries",
    ],
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Vercel", "Supabase"],
    gradient: "from-emerald-500/20 to-green-500/5",
  },
];

// ── Process Steps ───────────────────────────────────────────
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your business goals, target audience, and competitive landscape to define the project blueprint.",
    icon: Search,
    color: "#8b5cf6",
  },
  {
    number: "02",
    title: "Design",
    description: "Craft wireframes, prototypes, and visual designs that align with your brand identity and user expectations.",
    icon: Palette,
    color: "#ec4899",
  },
  {
    number: "03",
    title: "Develop",
    description: "Build with modern tech stacks, clean architecture, and rigorous testing. Every line of code optimized for performance.",
    icon: Code,
    color: "#06b6d4",
  },
  {
    number: "04",
    title: "Deploy & Scale",
    description: "Launch with CI/CD pipelines, monitoring, and ongoing support. Your product grows as your business grows.",
    icon: Zap,
    color: "#10b981",
  },
];

// ── Why Choose Us ───────────────────────────────────────────
export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
  stat: string;
  gradient: string;
}

export const BENEFITS: Benefit[] = [
  {
    title: "Rapid Delivery",
    description:
      "Agile sprints with transparent timelines. Your MVP goes live in as little as 2 weeks without compromising quality.",
    icon: Zap,
    stat: "2-Week Sprints",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
  {
    title: "Enterprise Security",
    description:
      "SOC2-aligned practices, encrypted data pipelines, and regular security audits to protect your business.",
    icon: Shield,
    stat: "99.9% Uptime SLA",
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "Dedicated Team",
    description:
      "A cross-functional team of designers, developers, and strategists assigned exclusively to your project.",
    icon: Users,
    stat: "24/7 Support",
    gradient: "from-violet-500/20 to-purple-500/5",
  },
  {
    title: "Award-Winning Design",
    description:
      "UI/UX that wins hearts and converts users. Research-driven design systems that scale with your brand.",
    icon: Award,
    stat: "4.9★ Average Rating",
    gradient: "from-pink-500/20 to-rose-500/5",
  },
  {
    title: "Scalable Architecture",
    description:
      "Cloud-native solutions built to handle 10x traffic surges. Microservices, CDN, and auto-scaling from day one.",
    icon: Layers,
    stat: "10x Scale Ready",
    gradient: "from-cyan-500/20 to-blue-500/5",
  },
  {
    title: "Proven Track Record",
    description:
      "150+ successful projects across education, healthcare, fintech, and e-commerce. Trusted by industry leaders.",
    icon: TrendingUp,
    stat: "150+ Projects",
    gradient: "from-indigo-500/20 to-blue-500/5",
  },
];

// ── Skills ──────────────────────────────────────────────────
export interface Skill {
  name: string;
  percentage: number;
  category: "Frontend" | "Backend" | "Database" | "Emerging";
  color: string;
}

export const SKILLS: Skill[] = [
  { name: "Next.js", percentage: 95, category: "Frontend", color: "#ffffff" },
  { name: "React", percentage: 95, category: "Frontend", color: "#61dafb" },
  {
    name: "TypeScript",
    percentage: 90,
    category: "Frontend",
    color: "#3178c6",
  },
  {
    name: "Tailwind CSS",
    percentage: 95,
    category: "Frontend",
    color: "#38bdf8",
  },
  { name: "Node.js", percentage: 85, category: "Backend", color: "#68a063" },
  {
    name: "Spring Boot",
    percentage: 80,
    category: "Backend",
    color: "#6db33f",
  },
  { name: "MySQL", percentage: 85, category: "Database", color: "#00758f" },
  {
    name: "PostgreSQL",
    percentage: 80,
    category: "Database",
    color: "#336791",
  },
  {
    name: "Firebase",
    percentage: 85,
    category: "Database",
    color: "#ffca28",
  },
  {
    name: "AI Integration",
    percentage: 75,
    category: "Emerging",
    color: "#a855f7",
  },
];

// ── Testimonials ────────────────────────────────────────────
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Principal",
    company: "Modern International School",
    quote:
      "SK Digital transformed our school's digital presence completely. The new website increased our enrollment by 40% and parents love the communication portal. Their attention to detail and understanding of our needs was exceptional.",
    rating: 5,
    avatar: "RS",
  },
  {
    name: "Priya Patel",
    role: "Owner",
    company: "Spice Garden Restaurant",
    quote:
      "Our restaurant website is absolutely stunning! Since launching, online reservations have increased by 60% and our online ordering system has been a game-changer. SK Digital delivered beyond our expectations.",
    rating: 5,
    avatar: "PP",
  },
  {
    name: "Dr. Anand Reddy",
    role: "Administrator",
    company: "City Care Hospital",
    quote:
      "The hospital management portal SK Digital built has revolutionized our operations. Patient wait times dropped by 35% and the online booking system has been incredibly efficient. Truly professional work.",
    rating: 5,
    avatar: "AR",
  },
  {
    name: "Vikram Singh",
    role: "Founder & CEO",
    company: "TechNova AI",
    quote:
      "SK Digital built our AI platform's landing page and it was featured on ProductHunt! The conversion rate improved by 45% and the design perfectly communicates our complex product. Highly recommended!",
    rating: 5,
    avatar: "VS",
  },
];

// ── Social Links ────────────────────────────────────────────
export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/sravankumar", icon: Code },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/sravankumar",
    icon: Briefcase,
  },
  { name: "Twitter", url: "https://twitter.com/sravankumar", icon: MessageCircle },
  {
    name: "Instagram",
    url: "https://instagram.com/sravankumar",
    icon: Camera,
  },
];

// ── Contact Info ────────────────────────────────────────────
export const CONTACT_INFO = {
  email: "naredlasravankumar29@gmail.com",
  phone: "+91 81069 70384",
  whatsapp: "https://wa.me/918106970384",
  location: "Hyderabad, India",
} as const;

// ── Business Types for form ─────────────────────────────────
export const BUSINESS_TYPES = [
  "School / Education",
  "Restaurant / Hospitality",
  "Hospital / Healthcare",
  "Real Estate",
  "Startup / Tech",
  "E-Commerce",
  "Local Business",
  "Enterprise / Corporate",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹2,50,000",
  "₹2,50,000 - ₹5,00,000",
  "₹5,00,000 - ₹10,00,000",
  "₹10,00,000+",
] as const;
