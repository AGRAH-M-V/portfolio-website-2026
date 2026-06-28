"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, RotateCcw, CornerDownLeft, Zap } from "lucide-react";
import { chatNodes, ChatOption, ChatContent } from "@/data/chat-nodes";
import { useChat } from "ai/react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { ChatRenderer } from "./ui/chat-renderer";

type FallbackMessage = {
  id: string;
  sender: "assistant" | "user";
  text?: string;
  content?: ChatContent;
  options?: ChatOption[];
};

const QUICK_PROMPTS = [
  { label: "Tech stack", prompt: "What technologies does Agrah work with?" },
  { label: "Top projects", prompt: "Tell me about his best projects" },
  { label: "Work experience", prompt: "What is his work experience?" },
  { label: "Available to hire?", prompt: "Is Agrah open to new opportunities?" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true);

  // Default to closed so it doesn't block the massive brutalist hero text
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // -- JSON Fallback State --
  const [history, setHistory] = useState<FallbackMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // -- AI SDK State --
  const { messages: aiMessages, append, error: aiError, setMessages: setAiMessages, isLoading } = useChat({
    api: "/api/chat",
  });
  const [localInput, setLocalInput] = useState("");

  // Check AI availability on mount
  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => {
        if (!data.active) {
          setIsAiMode(false);
        }
      })
      .catch(() => setIsAiMode(false));
  }, []);

  // Watch for AI Errors to trigger fallback
  useEffect(() => {
    if (aiError) {
      console.warn("AI Chat error, falling back to guided flow:", aiError);
      setIsAiMode(false);
    }
  }, [aiError]);

  // Initialize JSON flow if we ever enter fallback mode
  useEffect(() => {
    if (!isAiMode && history.length === 0) {
      const rootNode = chatNodes["root"];
      setHistory([
        {
          id: Date.now().toString(),
          sender: "assistant",
          text: rootNode.message,
          content: rootNode.content,
          options: rootNode.options,
        },
      ]);
    }
  }, [isAiMode, history.length]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, aiMessages]);

  // Lock body scroll when chat is open
  useBodyScrollLock(isOpen);

  const handleOptionClick = (option: ChatOption) => {
    const userMsg: FallbackMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: option.label,
    };

    const nextNode = chatNodes[option.nextNodeId];
    if (!nextNode) return;

    const assistantMsg: FallbackMessage = {
      id: (Date.now() + 1).toString(),
      sender: "assistant",
      text: nextNode.message,
      content: nextNode.content,
      options: nextNode.options,
    };

    setHistory((prev) => {
      const newHistory = [...prev];
      if (newHistory.length > 0) {
        newHistory[newHistory.length - 1].options = undefined;
      }
      return [...newHistory, userMsg, assistantMsg];
    });
  };

  const handleRestart = () => {
    if (isAiMode) {
      setAiMessages([]);
    } else {
      const rootNode = chatNodes["root"];
      setHistory([
        {
          id: Date.now().toString(),
          sender: "assistant",
          text: rootNode.message,
          content: rootNode.content,
          options: rootNode.options,
        },
      ]);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    append({ role: "user", content: prompt });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim()) return;
    append({ role: "user", content: localInput });
    setLocalInput("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 inset-0 md:inset-auto md:bottom-6 md:right-6 w-full h-full md:w-[400px] md:h-[600px] md:max-h-[calc(100vh-140px)] panel shadow-none md:shadow-[8px_8px_0px_0px_var(--color-ink)] flex flex-col overflow-hidden border-0 md:border-4 border-ink bg-paper origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-accent border-b-4 border-ink shrink-0">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-ink fill-ink" />
                <span className="font-mono text-sm font-black tracking-widest uppercase text-ink">SYS.ASSISTANT</span>
                {!isAiMode && (
                  <span className="ml-2 px-2 py-1 bg-surface text-ink text-[10px] font-mono font-bold tracking-widest uppercase border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)]">
                    Fallback
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleRestart}
                  className="p-1.5 text-ink hover:bg-surface border-2 border-transparent hover:border-ink hover:shadow-[2px_2px_0px_0px_var(--color-ink)] transition-all"
                  title="Restart Conversation"
                  aria-label="Restart Conversation"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-ink hover:bg-surface border-2 border-transparent hover:border-ink hover:shadow-[2px_2px_0px_0px_var(--color-ink)] transition-all"
                  title="Close"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div aria-live="polite" className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 scrollbar-thin scrollbar-thumb-ink scrollbar-track-transparent">

              {/* AI Welcome Screen (shown before any messages) */}
              {isAiMode && aiMessages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="text-base font-display font-black text-ink leading-relaxed uppercase border-l-4 border-accent pl-3">
                    I know everything about Agrah. Ask me anything — or pick one below.
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {QUICK_PROMPTS.map((qp) => (
                      <motion.button
                        key={qp.label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleQuickPrompt(qp.prompt)}
                        className="flex items-center px-4 py-3 bg-surface border-2 border-ink hover:bg-accent text-ink text-xs font-mono font-bold text-left transition-all shadow-[2px_2px_0px_0px_var(--color-ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                      >
                        <span className="leading-tight uppercase">{qp.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* AI Messages */}
              {isAiMode && aiMessages.map((msg, index) => {
                const displayContent = msg.role === "user" 
                  ? (QUICK_PROMPTS.find(qp => qp.prompt === msg.content)?.label || msg.content)
                  : msg.content;
                
                // Add a block cursor to the last assistant message if it is currently streaming
                const isLastAssistantMessage = index === aiMessages.length - 1 && msg.role === "assistant";
                const isStreamingThisMessage = isLastAssistantMessage && isLoading;
                const textWithCursor = isStreamingThisMessage ? `${displayContent} ▍` : displayContent;

                return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] px-4 py-3 text-sm font-mono whitespace-pre-wrap leading-relaxed border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] ${
                      msg.role === "user"
                        ? "bg-accent text-ink font-bold"
                        : "bg-surface text-ink font-medium"
                    }`}
                  >
                    <div className="space-y-2 [&_ul]:list-square [&_ul]:pl-5 [&_a]:text-ink [&_a]:underline [&_a]:decoration-accent [&_a]:decoration-[3px] [&_a]:underline-offset-2 [&_a]:font-bold hover:[&_a]:bg-accent transition-colors">
                      <ReactMarkdown>
                        {textWithCursor as string}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </div>
              )})}

              {/* Typing indicator bubble before first token */}
              {isAiMode && isLoading && aiMessages.length > 0 && aiMessages[aiMessages.length - 1].role === "user" && (
                <div className="flex flex-col items-start mt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-3 bg-surface border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear", delay: 0 }}
                      className="w-2 h-4 bg-ink"
                    />
                  </motion.div>
                </div>
              )}

              {/* Fallback Mode */}
              {!isAiMode && history.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] px-4 py-3 text-sm font-mono border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] ${
                      msg.sender === "user"
                        ? "bg-accent text-ink font-bold"
                        : "bg-surface text-ink font-medium"
                    }`}
                  >
                    {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                    {msg.content && <ChatRenderer content={msg.content} />}
                  </motion.div>

                  {/* Fallback Options */}
                  {msg.options && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 flex flex-wrap gap-2"
                    >
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt)}
                          className="px-4 py-2 font-mono text-xs font-black tracking-widest uppercase text-ink bg-surface border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-accent hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--color-ink)] transition-all"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Quick follow-up chips — shown after AI has replied */}
              {isAiMode && aiMessages.length > 0 && aiMessages[aiMessages.length - 1]?.role === "assistant" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {QUICK_PROMPTS.filter(
                    (qp) => !aiMessages.some((m) => m.role === "user" && m.content === qp.prompt)
                  ).slice(0, 2).map((qp) => (
                    <button
                      key={qp.label}
                      onClick={() => handleQuickPrompt(qp.prompt)}
                      className="px-3 py-1.5 font-mono text-[10px] font-black tracking-widest uppercase text-ink bg-surface border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)] hover:bg-accent hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--color-ink)] transition-all"
                    >
                      {qp.label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form (Only in AI Mode) */}
            {isAiMode && (
              <div className="p-4 bg-surface border-t-4 border-ink shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={localInput}
                    onChange={(e) => setLocalInput(e.target.value)}
                    placeholder="ENTER COMMAND..."
                    className="flex-1 bg-paper border-2 border-ink px-4 py-3 text-sm font-mono font-bold text-ink focus:outline-none focus:bg-accent transition-colors placeholder:text-ink/40"
                  />
                  <button
                    type="submit"
                    disabled={!localInput.trim()}
                    className="p-3 bg-accent border-2 border-ink text-ink shadow-[4px_4px_0px_0px_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--color-ink)] disabled:opacity-50 transition-all"
                  >
                    <CornerDownLeft className="w-5 h-5 stroke-[3]" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Chat"
            className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center gap-2 font-display text-sm font-black tracking-widest uppercase text-ink bg-accent px-8 py-4 pill-hover group"
          >
            <div className="relative flex items-center justify-center">
              <MessageCircle size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-paper border-[1.5px] border-ink animate-pulse rounded-full" />
            </div>
            Sys.Assistant
          </button>
        )}
      </AnimatePresence>
    </>
  );
}
