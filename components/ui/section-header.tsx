"use client";

import { FadeIn } from "./scroll-animate";

export function SectionHeader({ title, id, number }: { title: string; id?: string; number?: string }) {
  return (
    <FadeIn>
      <div className="flex items-center gap-4 mb-12">
        {number && (
          <span className="font-mono text-sm font-black text-ink px-3 py-1 bg-accent border-2 border-ink shadow-[2px_2px_0px_0px_var(--color-ink)]">{number}</span>
        )}
        <h2 id={id} className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-ink scroll-mt-24 uppercase">
          {title}
        </h2>
      </div>
    </FadeIn>
  );
}
