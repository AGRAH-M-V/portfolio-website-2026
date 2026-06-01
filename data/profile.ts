import {
  Activity,
  Bot,
  Code2,
  Database,
  GitBranch,
  Linkedin,
  Mail,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

export const profile = {
  name: "Agrah M V",
  role: "Full Stack Developer",
  location: "Kerala, India",
  email: "agrahmv@gmail.com",
  phone: "9946803371",
  linkedin: "https://linkedin.com/in/agrah-mv",
  github: "https://github.com/AGRAH-M-V",
  summary:
    "Full Stack Developer with 2+ years of experience building scalable Spring Boot microservices, REST APIs, and production-grade distributed systems. Focused on reliability, clean architecture, and practical problem-solving.",
  focus: [
    "Building systems that are easy to support",
    "Production debugging and reliability",
    "Clear service boundaries and RESTful design",
    "Automating repetitive engineering effort",
  ],
};

export const socials = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "GitHub", href: profile.github, icon: GitBranch },
];

export const skillGroups = [
  {
    title: "Full Stack Development",
    icon: ServerCog,
    skills: ["Java", "Spring Boot", "REST APIs", "Microservices", "gRPC", "JPA", "Authentication & Security", "JUnit5"],
  },
  {
    title: "AI & Python",
    icon: Bot,
    skills: ["Python (Basics)", "Pandas", "API Integration", "Prompt Engineering (LLMs)", "AI Agent Workflows (Learning)"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Frontend",
    icon: Code2,
    skills: ["Angular", "React", "TypeScript", "JavaScript"],
  },
  {
    title: "Dev Tools",
    icon: TerminalSquare,
    skills: ["Git", "GitHub", "GitLab", "Azure DevOps", "Swagger", "Jira"],
  },
  {
    title: "Other",
    icon: Activity,
    skills: ["CI/CD Basics", "Debugging", "Production Support (L2/L3)", "Monitoring (Portainer)", "Agile Practices"],
  },
];

export const experience = {
  company: "ThinkPalm Technologies",
  location: "Kochi",
  role: "Software Engineer",
  period: "2023 - Present",
  highlights: [
    "Developed and maintained scalable backend systems using Spring Boot, REST APIs, microservices, and gRPC.",
    "Owned feature delivery from design and implementation through unit testing and deployment.",
    "Handled L2/L3 production support with incident triage, root-cause analysis, and fixes across distributed systems.",
    "Executed production SQL across shore systems and 24 ships to resolve data inconsistencies.",
    "Built scheduled jobs, health checks, notifications, and backend automation to improve operational efficiency.",
    "Collaborated with frontend, QA, and DevOps teams through Agile planning, reviews, and delivery cycles.",
  ],
};

export const projects = [
  {
    title: "Cargo Planning Decision Support System",
    eyebrow: "Microservices Platform",
    icon: ShieldCheck,
    stack: ["Java", "Spring Boot", "Microservices", "gRPC", "PostgreSQL", "Angular"],
    bullets: [
      "Developed backend services using Spring Boot and gRPC for cargo, vessel, and voyage management.",
      "Built orchestrator service aggregating data from multiple microservices.",
      "Handled production bug fixes, root-cause analysis, and system enhancements across distributed environments.",
      "Executed SQL queries on live systems to troubleshoot operational issues.",
      "Monitored logs and resolved production issues using Portainer.",
    ],
  },
  {
    title: "Crew Management Application",
    eyebrow: "Operations Software",
    icon: Activity,
    stack: ["Spring Boot", "MySQL", "React", "GraphQL"],
    bullets: [
      "Developed backend modules for crew operations including activity logs, medical events, and compliance tracking.",
      "Designed and implemented secure CRUD APIs with role-based access control.",
      "Built scheduled jobs and email automation to streamline workflows.",
      "Collaborated with frontend teams to integrate APIs effectively.",
    ],
  },
  {
    title: "Billing Application",
    eyebrow: "Workflow Analytics",
    icon: Database,
    stack: ["Spring Boot", "MongoDB", "Angular"],
    bullets: [
      "Developed backend APIs using Spring Boot and MongoDB for billing workflows and approvals.",
      "Built analytics APIs for dashboard insights (status tracking, approvals, reports).",
      "Implemented RBAC ensuring secure access for multiple users.",
    ],
  },
  {
    title: "AI YouTube Shorts Generator",
    eyebrow: "AI Agent Workflows",
    icon: Sparkles,
    stack: ["Python", "CrewAI", "Streamlit", "Groq API", "Prompt Engineering"],
    bullets: [
      "Built a multi-agent AI workflow using CrewAI for automated YouTube Shorts content generation.",
      "Designed specialized agents for research, script writing, SEO optimization, and review workflows.",
      "Developed a Streamlit-based interface for topic input and generated script visualization.",
      "Implemented retry handling and sequential task orchestration for stable AI execution.",
      "Integrated Groq/OpenAI APIs for prompt-based content generation workflows.",
    ],
  },
];

export const principles = [
  "Build systems that remain understandable.",
  "Prefer reliability over unnecessary complexity.",
  "Automate repetitive work.",
  "Design for maintainability first."
];

export const education = [
  {
    title: "Bachelor of Technology",
    subtitle: "Electronics and Communication Engineering",
    meta: "APJ Abdul Kalam Technological University | 2019 - 2023",
    detail: "CGPA: 8.86/10",
  },
  {
    title: "Full Stack Java Developer Certification",
    subtitle: "Udemy",
    meta: "Built full-stack applications using Spring Boot, React, and REST APIs",
    detail: "Backend-first full-stack training",
  },
];

export const contributions = [
  "Reduced recurring production issues with backend fixes and better monitoring visibility.",
  "Improved reliability and data consistency across distributed microservices.",
  "Enhanced operational efficiency through automation, scheduled jobs, and support tooling.",
];

export const currentlyExploring = [
  "AI workflow orchestration",
  "Prompt evaluation systems",
  "Backend observability patterns",
  "gRPC service optimization"
];
