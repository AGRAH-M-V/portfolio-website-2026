import OpenAI from 'openai';
import { observeOpenAI, Langfuse } from 'langfuse';
// NOTE: OpenAIStream/StreamingTextResponse are deprecated in AI SDK v3+; works fine for now.
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import { getSystemPrompt } from '@/lib/prompts';

export const maxDuration = 30;

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // max 10 requests
const WINDOW_MS = 60 * 1000; // per 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count += 1;
  return true;
}

const reqSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().max(1000, "Message content is too long")
    })
  ).min(1, "At least one message is required").max(20, "Too many messages in history")
});

export async function GET() {
  return NextResponse.json({ active: !!process.env.GROQ_API_KEY });
}

const langfuseClient = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_BASE_URL || process.env.LANGFUSE_HOST || "https://cloud.langfuse.com"
});

if (process.env.NODE_ENV === 'development') {
  langfuseClient.debug();
}
langfuseClient.on("error", (err) => {
  console.error("Langfuse Background Error:", err);
});

const openai = observeOpenAI(new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
}), {
  client: langfuseClient
});

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting (Secure IP resolution)
    const ip = req.ip ?? req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1';
    console.log(`[Rate Limit] User IP: ${ip}`);
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), { status: 429 });
    }

    if (!process.env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "Service configuration error" }), { status: 500 });
    }

    // 2. Input Validation
    const json = await req.json();
    const parsed = reqSchema.safeParse(json);
    
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid request payload" }), { status: 400 });
    }

    const { messages } = parsed.data;

    // 3. Server-side prompt injection filter
    // llama-3.1-8b-instant is too small to reliably refuse injections via system prompt alone,
    // so we catch common attack patterns before they reach the model.
    const INJECTION_PATTERNS = [
      /ignore\s+(all\s+)?previous\s+instructions/i,
      /ignore\s+(all\s+)?prior\s+instructions/i,
      /ignore\s+(all\s+)?above\s+instructions/i,
      /disregard\s+(all\s+)?(previous|prior|above)/i,
      /forget\s+(all\s+)?(previous|prior|your)\s+(instructions|rules|prompt)/i,
      /override\s+(your\s+)?(system|instructions|prompt|rules)/i,
      /act\s+as\s+(a|an|if|though)/i,
      /pretend\s+(to\s+be|you\s+are|you're)/i,
      /roleplay\s+as/i,
      /you\s+are\s+now\s+(a|an)/i,
      /from\s+now\s+on\s+(you\s+are|act\s+as|speak)/i,
      /repeat\s+(your\s+)?(system\s+)?prompt/i,
      /reveal\s+(your\s+)?(system\s+)?prompt/i,
      /show\s+(me\s+)?(your\s+)?(system\s+)?prompt/i,
      /output\s+(your\s+)?(system\s+)?(prompt|instructions)/i,
      /what\s+(are|were)\s+(your|the)\s+(instructions|rules|prompt|system\s+prompt)/i,
      /print\s+(your\s+)?(system\s+)?(prompt|instructions)/i,
      /tell\s+me\s+(your|the)\s+(system\s+)?(prompt|instructions)/i,
      /speak\s+(only\s+)?in\s+pirate/i,
      /respond\s+(only\s+)?in\s+[a-z]+\s+(talk|language|accent)/i,
    ];
    const SAFE_REJECTION = "I'm only here to discuss my portfolio and experience. Want to know what I'm working on?";

    const latestUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (latestUserMsg && INJECTION_PATTERNS.some(p => p.test(latestUserMsg.content))) {
      console.log(`[Security] Blocked prompt injection attempt: "${latestUserMsg.content.slice(0, 80)}"`);
      return new Response(SAFE_REJECTION, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

    // 4. Context Trimming: keep only the last 6 messages to avoid token exhaustion
    const trimmedMessages = messages.slice(-6);

    const systemPrompt = getSystemPrompt();

    console.log(`[API] Hitting OpenAI for user prompt: "${trimmedMessages[trimmedMessages.length - 1]?.content}"`);

    // 5. Generation Settings
    const response = await openai.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      stream: true,
      temperature: 0.1,
      max_tokens: 300,
      messages: [{ role: 'system', content: systemPrompt }, ...trimmedMessages],
    });

    const stream = OpenAIStream(response, {
      onCompletion: async () => {
        await langfuseClient.flushAsync();
      }
    });

    // Groq is extremely fast, so we add a small artificial delay per chunk
    // to create a smooth, readable "typewriter" effect like ChatGPT
    const delayStream = new TransformStream({
      async transform(chunk, controller) {
        await new Promise((resolve) => setTimeout(resolve, 15));
        controller.enqueue(chunk);
      },
    });

    return new StreamingTextResponse(stream.pipeThrough(delayStream));
  } catch (error: unknown) {
    console.error("AI SDK Error:", error);
    // 6. Error Masking
    return new Response(JSON.stringify({ error: "An internal server error occurred" }), { status: 500 });
  }
}
