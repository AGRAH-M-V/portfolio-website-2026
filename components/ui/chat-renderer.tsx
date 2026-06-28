import { ChatContent } from "@/data/chat-nodes";

export function ChatRenderer({ content }: { content: ChatContent }) {
  switch (content.type) {
    case "text":
      return (
        <div className="mt-2 space-y-2">
          {content.data.heading && <strong className="block text-ink">{content.data.heading}</strong>}
          <ul className="list-disc list-inside space-y-1 text-sm text-ink/80">
            {content.data.bullets?.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      );
    case "skills":
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {content.data.map((skill: string, i: number) => (
            <span key={i} className="px-2 py-1 bg-surface border-2 border-ink text-ink font-mono uppercase text-[10px] tracking-wide shadow-[2px_2px_0px_0px_var(--color-ink)]">
              {skill}
            </span>
          ))}
        </div>
      );
    case "experience":
      return (
        <div className="mt-2 panel p-4 card-hover bg-accent/10">
          <h4 className="font-display text-lg font-black uppercase text-ink">{content.data.company}</h4>
          <p className="font-mono text-[10px] tracking-widest uppercase text-ink font-bold mb-3 border-b-2 border-ink inline-block pb-1">{content.data.location} • {content.data.period}</p>
          <ul className="list-disc list-inside text-sm text-ink font-medium space-y-1 mt-2">
            {content.data.highlights?.slice(0, 3).map((h: string, i: number) => (
              <li key={i} className="truncate">{h}</li>
            ))}
          </ul>
        </div>
      );
    case "projects":
      return (
        <div className="mt-2 space-y-3">
          {content.data.map((p, i: number) => (
            <div key={i} className="panel p-4 card-hover bg-paper">
              <h4 className="font-display font-black text-ink text-base uppercase">{p.title}</h4>
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink font-bold mb-3 border-b-2 border-ink inline-block pb-1">{p.eyebrow}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.stack?.slice(0, 3).map((s: string, j: number) => (
                  <span key={j} className="px-2 py-1 bg-surface border-2 border-ink text-ink font-mono uppercase text-[10px] shadow-[2px_2px_0px_0px_var(--color-ink)]">
                    {s}
                  </span>
                ))}
                {p.stack?.length > 3 && (
                  <span className="px-2 py-1 bg-surface border-2 border-ink text-ink font-mono uppercase text-[10px] shadow-[2px_2px_0px_0px_var(--color-ink)]">
                    +{p.stack.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
