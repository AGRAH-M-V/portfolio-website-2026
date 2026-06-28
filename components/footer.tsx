"use client";

import { FadeIn } from "./ui/scroll-animate";

export function Footer() {

  return (
    <FadeIn>
      <footer className="border-t-4 border-ink bg-paper mt-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 flex justify-center">
            <div className="w-full h-1 bg-ink max-w-[200px]" />
          </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left mx-auto">
              <span className="font-mono text-xs font-bold text-ink">
                © {new Date().getFullYear()} Agrah M V
              </span>
              <span className="hidden sm:inline text-ink font-black">·</span>
              <span className="font-mono text-[11px] font-bold text-ink/80">
                Built with Next.js
              </span>
            </div>
          </div>
      </footer>
    </FadeIn>
  );
}
