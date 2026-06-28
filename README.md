# Agrah M V - Portfolio

A bold, neo-brutalist personal portfolio built to showcase backend engineering experience, operating principles, and technical arsenal. It features an intelligent AI Chat Assistant trained on the profile data to interactively answer visitor questions.

## Tech Stack
- **Framework:** Next.js (App Router), TypeScript
- **Styling & UI:** Tailwind CSS, Framer Motion, Lucide React
- **AI Chat Assistant:** Vercel AI SDK, Groq API (llama-3.1-8b-instant)
- **Observability:** Langfuse
- **Security Testing:** Promptfoo (Automated Red Teaming)

## Key Features
- **AI Chat Assistant:** A highly capable AI assistant that knows everything about the portfolio, ready to answer questions about experience, skills, and projects in a conversational manner.
- **Robust Security:** Implemented production-grade LLM safeguards to prevent prompt injection and ensure data privacy.
- **Scroll Animations:** Smooth viewport-triggered fade-in animations for a premium reading experience.
- **Neo-Brutalist Aesthetic:** Bold, high-contrast light theme with heavy borders, neon yellow accents, and terminal-style typography.

## Setup & Development

1. **Install dependencies:**
```bash
npm install
```

2. **Environment Variables:**
Create a `.env.local` file in the root directory and add the following keys:
```env
# AI Model Provider
GROQ_API_KEY=your_groq_api_key

# Observability (Optional)
LANGFUSE_SECRET_KEY=your_langfuse_secret_key
LANGFUSE_PUBLIC_KEY=your_langfuse_public_key
LANGFUSE_BASE_URL=https://cloud.langfuse.com
```

3. **Run the development server:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Automated Security Testing (Promptfoo)

This project uses Promptfoo for automated AI Red Teaming to validate LLM security and behavior.

To run the security tests locally:
```bash
npx promptfoo redteam eval -c redteam.yaml
npx promptfoo view
```

## Structure
- `data/profile.ts`: Centralized content for experience, projects, skills, and education.
- `data/chat-nodes.ts`: Structured conversational data and type definitions for the fallback chat.
- `lib/prompts.ts`: Hardened system prompt and logic for the AI assistant.
- `app/api/chat/route.ts`: API endpoint with rate limiting and Groq streaming.
- `components/`: Reusable UI components, including the floating AI `chat-widget.tsx`.
- `app/globals.css`: Core design system and theme variables.
