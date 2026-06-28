import { profile, skillGroups, experience, projects } from "./profile";

export type ChatOption = {
  label: string;
  nextNodeId: string;
};

export type ChatContent =
  | { type: "text"; data: { heading?: string; bullets?: string[] } }
  | { type: "skills"; data: string[] }
  | { type: "experience"; data: typeof import("./profile").experience }
  | { type: "projects"; data: typeof import("./profile").projects };

export type ChatNode = {
  id: string;
  message: string;
  options: ChatOption[];
  content?: ChatContent;
};

// Map projects into categories
const backendProjects = projects.filter(p => !p.title.includes("AI"));
const aiProjects = projects.filter(p => p.title.includes("AI"));

export const chatNodes: Record<string, ChatNode> = {
  root: {
    id: "root",
    message: "Hi! What would you like to know about me?",
    options: [
      { label: "About Me", nextNodeId: "about_me" },
      { label: "Skills", nextNodeId: "skills" },
      { label: "Experience", nextNodeId: "experience" },
      { label: "Projects", nextNodeId: "projects" },
    ],
  },
  
  about_me: {
    id: "about_me",
    message: profile.summary,
    content: {
      type: "text",
      data: {
        heading: "My Focus Areas",
        bullets: profile.focus
      }
    },
    options: [
      { label: "View Skills", nextNodeId: "skills" },
      { label: "View Experience", nextNodeId: "experience" },
      { label: "Back to Start", nextNodeId: "root" },
    ],
  },

  skills: {
    id: "skills",
    message: "I work across the full stack, but my core strength is Backend & Systems. Which area are you interested in?",
    options: skillGroups.map((group) => ({
      label: group.title,
      nextNodeId: `skills_${group.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
    })).concat([{ label: "Back to Start", nextNodeId: "root" }]),
  },

  // Dynamically create skill nodes
  ...skillGroups.reduce((acc, group) => {
    const id = `skills_${group.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    acc[id] = {
      id,
      message: `Here are my skills in ${group.title}:`,
      content: {
        type: "skills",
        data: group.skills
      },
      options: [
        { label: "Other Skills", nextNodeId: "skills" },
        { label: "View Projects", nextNodeId: "projects" },
        { label: "Back to Start", nextNodeId: "root" },
      ]
    };
    return acc;
  }, {} as Record<string, ChatNode>),

  experience: {
    id: "experience",
    message: `I currently work as a ${experience.role} at ${experience.company} (${experience.period}).`,
    content: {
      type: "experience",
      data: experience
    },
    options: [
      { label: "View Projects", nextNodeId: "projects" },
      { label: "Back to Start", nextNodeId: "root" },
    ]
  },

  projects: {
    id: "projects",
    message: "I've built systems across different domains. What type of projects would you like to see?",
    options: [
      { label: "Backend & Microservices", nextNodeId: "projects_backend" },
      { label: "AI Agent Workflows", nextNodeId: "projects_ai" },
      { label: "Back to Start", nextNodeId: "root" },
    ]
  },

  projects_backend: {
    id: "projects_backend",
    message: "Here are some of my key backend and microservices projects:",
    content: {
      type: "projects",
      data: backendProjects
    },
    options: [
      { label: "Other Projects", nextNodeId: "projects" },
      { label: "Back to Start", nextNodeId: "root" },
    ]
  },

  projects_ai: {
    id: "projects_ai",
    message: "Here are my projects involving AI workflows and prompt engineering:",
    content: {
      type: "projects",
      data: aiProjects
    },
    options: [
      { label: "Other Projects", nextNodeId: "projects" },
      { label: "Back to Start", nextNodeId: "root" },
    ]
  }
};
